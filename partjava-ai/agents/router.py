"""
四大智能体总控调度器 (Multi-Agent Supervisor Router) — Function Calling 驱动
=============================================================================

核心机制（plan → act → observe 自主决策循环）：
1. 把四大智能体能力注册为 OpenAI Function Calling 兼容的工具（见 agents/tools.py）；
2. LLM 在对话中自主决策是否调用工具、以什么参数调用（plan）；
3. Supervisor 执行工具并把 observation 回填消息列表（act / observe）；
4. 循环直到 LLM 认为信息充分，最终以流式输出回答（驱动 3D 猫嘴同步）；
5. 每一步决策与执行都通过 `agent_step` SSE 事件实时推送到前端执行轨迹面板。

确定性兜底：
- 用户显式操作（点「总结写笔记」按钮 / 打开「联网深搜」开关）→ 跳过 LLM 决策直调工具，保证 UI 可靠性；
- 未配置 API Key 或接口异常 → 降级为关键词意图路由 + 本地智能回复（并在前端标注「离线降级模式」）。
"""

import json
import asyncio
from typing import AsyncGenerator, Dict, Any, List, Optional
import httpx
from config import settings
from agents.agent1_navigator import site_navigator_agent
from agents.agent3_companion import companion_3d_agent
from agents.tools import (
    TOOL_SCHEMAS,
    TOOL_LABELS,
    ToolExecutor,
    build_agency_system_instructions,
    parse_tool_arguments,
    summarize_tool_result,
)


def format_sse(event: str, data: Any) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


class MultiAgentSupervisor:
    """Function Calling 驱动的多智能体调度器。"""

    # 单轮对话内最多允许的工具决策轮数（防止无限循环刷 API）
    MAX_TOOL_STEPS = 4
    # 工具执行 → 前端「激活智能体」胶囊的映射
    TOOL_AGENT_BADGE = {
        "search_site_pages": "🧭 智能体一·站内领航伴读",
        "web_search": "🌐 智能体四·Pro联网深搜",
        "draft_note": "📝 智能体二·自动写笔记",
        "set_companion_state": "🐾 智能体三·3D灵动伴侣",
    }

    def detect_intent(self, message: str, enable_web_search: bool, explicit_agent: Optional[str] = None) -> Dict[str, bool]:
        """关键词意图识别（仅用于离线降级与统计，在线模式由 LLM 自主决策取代）。"""
        msg = (message or "").lower()
        is_note = (
            explicit_agent == "agent2_note"
            or any(kw in msg for kw in ["写笔记", "生成笔记", "保存笔记", "总结成笔记", "总结本页", "记笔记", "存为笔记"])
        )
        is_web_search = (
            enable_web_search
            or explicit_agent == "agent4_search"
            or any(kw in msg for kw in ["联网", "搜索", "上网查", "官网链接", "专业网站", "权威网站", "外部链接", "最新文档"])
        )
        return {
            "use_agent1_navigator": True,
            "use_agent2_note": is_note,
            "use_agent3_companion": True,
            "use_agent4_search": is_web_search,
        }

    async def stream_dispatch(
        self,
        message: str,
        history: List[Dict[str, str]],
        page_context: str = "",
        current_pathname: str = "",
        enable_web_search: bool = False,
        explicit_agent: Optional[str] = None,
    ) -> AsyncGenerator[str, None]:
        conv_str = "\n".join(
            [f"{m.get('role', 'user')}: {m.get('content', '')}" for m in history[-8:]]
        )
        api_key = settings.DEEPSEEK_API_KEY
        has_key = bool(api_key and not api_key.startswith("your_"))

        # 前端副作用事件队列：工具执行时推入，由本生成器在安全时机 yield
        pending: List[str] = []

        def emit(event: str, data: Dict[str, Any]) -> None:
            pending.append(format_sse(event, data))

        executor = ToolExecutor(emit=emit, conversation_text=conv_str, page_context=page_context)

        # 【智能体三】率先计算 3D 黑猫的基线情绪/姿态（确定性，零延迟）
        base_reaction = companion_3d_agent.analyze_3d_reaction(message)
        active_agents: List[str] = ["🐾 智能体三·3D灵动伴侣", "🧭 智能体一·站内领航伴读"]
        current_model = settings.DEEPSEEK_MODEL_FLASH

        def merged_reaction() -> Dict[str, Any]:
            return executor.reaction or base_reaction

        def push_meta(offline: bool = False) -> None:
            pending.append(
                format_sse(
                    "agent_meta",
                    {
                        "reaction": merged_reaction(),
                        "activeAgents": active_agents,
                        "model": current_model,
                        "offline": offline,
                    },
                )
            )

        # 【智能体一】零成本本地领航：直接解析 navigation.ts 检索站内页面（不耗 API）
        nav_frag, site_links = site_navigator_agent.build_system_prompt_fragment(message, page_context)
        executor.site_links = site_links
        if site_links:
            yield format_sse("site_links", {"links": site_links})

        # ============ 离线降级模式（未配置 Key）============
        if not has_key:
            async for chunk in self._offline_flow(
                message=message,
                executor=executor,
                pending=pending,
                push_meta=push_meta,
                active_agents=active_agents,
                explicit_agent=explicit_agent,
                enable_web_search=enable_web_search,
            ):
                yield chunk
            return

        # ============ 在线 Function Calling Agent 循环 ============
        yield format_sse(
            "agent_meta",
            {
                "reaction": merged_reaction(),
                "activeAgents": active_agents,
                "model": current_model,
                "offline": False,
            },
        )

        # 组装初始消息：人设 + 自主决策说明 + 站内导航片段（含当前页伴读上下文）
        system_content = (
            companion_3d_agent.SYSTEM_PERSONA
            + "\n"
            + build_agency_system_instructions()
            + "\n"
            + nav_frag
        )
        llm_messages: List[Dict[str, Any]] = [{"role": "system", "content": system_content}]
        for h in history[-6:]:
            if h.get("content"):
                llm_messages.append(
                    {"role": "assistant" if h.get("role") in ("ai", "assistant") else "user", "content": h["content"]}
                )
        llm_messages.append({"role": "user", "content": message})

        streamed_any = False
        try:
            async with httpx.AsyncClient(timeout=httpx.Timeout(60.0)) as client:
                headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

                # ---- 用户显式操作 → 确定性直调工具（保住按钮/开关的可靠体验）----
                forced_calls: List[Dict[str, str]] = []
                if explicit_agent == "agent2_note":
                    forced_calls.append(("draft_note", {"topic": message}))
                if enable_web_search or explicit_agent == "agent4_search":
                    forced_calls.append(("web_search", {"query": message}))
                if forced_calls:
                    synthesized = []
                    for idx, (fname, fargs) in enumerate(forced_calls):
                        call_id = f"forced-{idx}"
                        synthesized.append(
                            {
                                "id": call_id,
                                "type": "function",
                                "function": {"name": fname, "arguments": json.dumps(fargs, ensure_ascii=False)},
                            }
                        )
                        meta = TOOL_LABELS.get(fname, {"label": fname, "desc": ""})
                        yield format_sse(
                            "agent_step",
                            {
                                "phase": "act",
                                "tool": fname,
                                "label": meta["label"],
                                "detail": "用户显式指令，直接执行",
                                "status": "running",
                            },
                        )
                        result = await executor.execute(fname, fargs)
                        current_model = self._maybe_upgrade_model(fname)
                        self._badge_tool(fname, active_agents)
                        push_meta()
                        while pending:
                            yield pending.pop(0)
                        yield format_sse(
                            "agent_step",
                            {
                                "phase": "observe",
                                "tool": fname,
                                "label": meta["label"],
                                "detail": summarize_tool_result(fname, result),
                                "status": "done",
                            },
                        )
                        llm_messages.append(
                            {
                                "role": "tool",
                                "tool_call_id": call_id,
                                "content": json.dumps(result, ensure_ascii=False)[:4000],
                            }
                        )
                    llm_messages.insert(
                        len(llm_messages) - len(forced_calls) * 2,
                        {"role": "assistant", "content": "", "tool_calls": synthesized},
                    )

                # ---- plan → act → observe 自主决策循环 ----
                tools_enabled = True
                for _step in range(self.MAX_TOOL_STEPS):
                    payload: Dict[str, Any] = {
                        "model": settings.DEEPSEEK_MODEL_FLASH,
                        "messages": llm_messages,
                        "stream": False,
                        "temperature": 0.3,
                    }
                    if tools_enabled:
                        payload["tools"] = TOOL_SCHEMAS
                        payload["tool_choice"] = "auto"

                    resp = await client.post(
                        f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
                        headers=headers,
                        json=payload,
                    )
                    if resp.status_code != 200:
                        if tools_enabled:
                            # 可能是不支持 function calling 的模型/网关，去掉 tools 重试一次
                            tools_enabled = False
                            continue
                        raise RuntimeError(f"planning call failed: {resp.status_code} {resp.text[:200]}")

                    msg = resp.json().get("choices", [{}])[0].get("message", {})
                    tool_calls = msg.get("tool_calls") or []
                    if not tool_calls:
                        break  # 模型认为信息充分，直接进入最终流式回答

                    llm_messages.append(
                        {"role": "assistant", "content": msg.get("content") or "", "tool_calls": tool_calls}
                    )
                    if msg.get("content"):
                        yield format_sse(
                            "agent_step",
                            {
                                "phase": "plan",
                                "label": "💭 分析任务",
                                "detail": str(msg["content"])[:160],
                                "status": "done",
                            },
                        )

                    for tc in tool_calls:
                        func_spec = tc.get("function") or {}
                        fname = func_spec.get("name", "")
                        fargs = parse_tool_arguments(func_spec.get("arguments"))
                        meta = TOOL_LABELS.get(fname, {"label": fname, "desc": ""})
                        yield format_sse(
                            "agent_step",
                            {
                                "phase": "act",
                                "tool": fname,
                                "label": meta["label"],
                                "detail": str(fargs.get("query") or fargs.get("topic") or meta.get("desc", ""))[:120],
                                "status": "running",
                            },
                        )
                        result = await executor.execute(fname, fargs)
                        current_model = self._maybe_upgrade_model(fname)
                        self._badge_tool(fname, active_agents)
                        push_meta()
                        while pending:
                            yield pending.pop(0)
                        yield format_sse(
                            "agent_step",
                            {
                                "phase": "observe",
                                "tool": fname,
                                "label": meta["label"],
                                "detail": summarize_tool_result(fname, result),
                                "status": "done",
                            },
                        )
                        llm_messages.append(
                            {
                                "role": "tool",
                                "tool_call_id": tc.get("id", f"call-{_step}"),
                                "content": json.dumps(result, ensure_ascii=False)[:4000],
                            }
                        )

                # ---- 最终流式回答（不携带 tools，模型专注作答）----
                final_model = (
                    settings.DEEPSEEK_MODEL_PRO if executor.citations else settings.DEEPSEEK_MODEL_FLASH
                )
                current_model = final_model
                push_meta()
                while pending:
                    yield pending.pop(0)

                async with client.stream(
                    "POST",
                    f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
                    headers=headers,
                    json={
                        "model": final_model,
                        "messages": llm_messages,
                        "stream": True,
                        "temperature": 0.6,
                    },
                ) as resp:
                    if resp.status_code == 200:
                        async for line in resp.aiter_lines():
                            if not line or not line.startswith("data:"):
                                continue
                            data_str = line[5:].strip()
                            if data_str == "[DONE]":
                                break
                            try:
                                chunk = json.loads(data_str)
                                delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                if delta:
                                    streamed_any = True
                                    yield format_sse("token", {"text": delta})
                            except Exception:
                                continue

        except Exception as e:
            print(f"[MultiAgentSupervisor] Agent 循环异常，回退离线智能引擎: {e}")

        # 流式失败（Key 失效/接口异常/返回空）→ 融合工具结果的本地智能回复（打字机推送，保持猫嘴同步）
        if not streamed_any:
            yield format_sse(
                "agent_meta",
                {
                    "reaction": merged_reaction(),
                    "activeAgents": active_agents,
                    "model": "offline-smart-fallback",
                    "offline": True,
                },
            )
            fallback_reply = self._build_smart_fallback_reply(
                message=message,
                site_links=executor.site_links,
                citations=executor.citations,
                page_context=page_context,
                is_note=bool(executor.note_draft),
                is_search=bool(executor.citations),
            )
            chunk_size = 6
            for i in range(0, len(fallback_reply), chunk_size):
                yield format_sse("token", {"text": fallback_reply[i : i + chunk_size]})
                await asyncio.sleep(0.035)

        yield format_sse("done", {"ok": True})

    # ------------------------------------------------------------------
    # 离线降级流程：关键词意图路由 + 工具层（精选权威索引/本地笔记提炼）+ 本地智能回复
    # ------------------------------------------------------------------
    async def _offline_flow(
        self,
        *,
        message: str,
        executor: ToolExecutor,
        pending: List[str],
        push_meta,
        active_agents: List[str],
        explicit_agent: Optional[str],
        enable_web_search: bool,
    ) -> AsyncGenerator[str, None]:
        intents = self.detect_intent(message, enable_web_search, explicit_agent)

        yield format_sse(
            "agent_meta",
            {
                "reaction": executor.reaction or {"mood": "normal", "action": "talk"},
                "activeAgents": active_agents,
                "model": "offline-smart-fallback",
                "offline": True,
            },
        )

        keyword_jobs: List[Dict[str, str]] = []
        if intents["use_agent4_search"]:
            keyword_jobs.append(("web_search", {"query": message}, "联网深搜（离线精选权威索引）"))
        if intents["use_agent2_note"]:
            keyword_jobs.append(("draft_note", {"topic": message}, "提炼写笔记（本地结构化提炼）"))

        for fname, fargs, reason in keyword_jobs:
            meta = TOOL_LABELS.get(fname, {"label": fname, "desc": ""})
            yield format_sse(
                "agent_step",
                {"phase": "act", "tool": fname, "label": meta["label"], "detail": reason, "status": "running"},
            )
            await executor.execute(fname, fargs)
            self._badge_tool(fname, active_agents)
            push_meta(offline=True)
            while pending:
                yield pending.pop(0)
            yield format_sse(
                "agent_step",
                {"phase": "observe", "tool": fname, "label": meta["label"], "detail": "离线降级完成", "status": "done"},
            )

        fallback_reply = self._build_smart_fallback_reply(
            message=message,
            site_links=executor.site_links,
            citations=executor.citations,
            page_context=executor.page_context,
            is_note=intents["use_agent2_note"],
            is_search=intents["use_agent4_search"],
        )
        chunk_size = 6
        for i in range(0, len(fallback_reply), chunk_size):
            yield format_sse("token", {"text": fallback_reply[i : i + chunk_size]})
            await asyncio.sleep(0.035)

        yield format_sse("done", {"ok": True, "offline": True})

    # ------------------------------------------------------------------
    # 辅助方法
    # ------------------------------------------------------------------
    def _maybe_upgrade_model(self, tool_name: str) -> str:
        """联网深搜执行后，最终回答升级到 Pro 模型以获得更强的综合能力。"""
        if tool_name == "web_search":
            return settings.DEEPSEEK_MODEL_PRO
        return settings.DEEPSEEK_MODEL_FLASH

    def _badge_tool(self, tool_name: str, active_agents: List[str]) -> None:
        badge = self.TOOL_AGENT_BADGE.get(tool_name)
        if badge and badge not in active_agents:
            active_agents.append(badge)

    def _build_smart_fallback_reply(
        self,
        message: str,
        site_links: List[Dict[str, str]],
        citations: List[Dict[str, Any]],
        page_context: str,
        is_note: bool,
        is_search: bool,
    ) -> str:
        parts: List[str] = []
        if is_note:
            parts.append(
                "喵呜~ 🐾 **【智能体二 · 自动写笔记】** 已经帮你把核心内容提炼成一篇结构化 Markdown 笔记啦！\n\n"
                "你可以直接点击下方气泡里的 **「⚡ 一键存入我的笔记」** 写入数据库，或者点 **「✏️ 打开预览器微调」** 编辑后再保存哦！"
            )
        elif is_search and citations:
            parts.append(
                f"喵~ 🐾 **【智能体四 · 联网深搜】** 已围绕「**{message}**」检索并抓取了 {len(citations)} 个专业权威技术站点：\n"
            )
            for c in citations:
                parts.append(f"- **[{c['index']}] {c['title']}** (`{c['domain']}`)\n  > {c['snippet']}")
            parts.append("\n你可以直接点击气泡底部的 **🌐 权威网站外链卡片** 跳转到对应官网阅读原文！")
        elif page_context.strip():
            first_lines = [ln.strip() for ln in page_context.splitlines() if ln.strip()][:4]
            header_summary = " | ".join(first_lines[:2])
            parts.append(
                f"喵~ 🐾 **【智能体一 · 页面伴读】** 检测到你正在学习：\n> {header_summary}\n\n"
                f"针对你的问题「**{message}**」：\n"
                "1. **核心机制**：本节重点在于理解底层数据结构/协议流转与边界条件处理；\n"
                "2. **实战建议**：看完理论后，可以点击下方 **「📝 总结本页写笔记」** 让我帮你生成复习笔记，或去代码沙箱动手验证！"
            )
        else:
            parts.append(
                f"喵呜~ 我是温暖书房的 3D 像素绒毛黑猫 **袋子** 🐾！收到你的问题：「**{message}**」。\n\n"
                "我现在由 **四大专职智能体** 协同驱动：\n"
                "- 🧭 **站内领航**：为你检索了 PartJava 站内最相关的课程页面（见下方直达胶囊）；\n"
                "- 📝 **自动写笔记**：随时点「总结写笔记」，我会将对话或当前页面提炼存入你的笔记库；\n"
                "- 🌐 **Pro 联网深搜**：点亮下方「🌐 联网深搜 (Pro)」按钮，即可检索外部权威技术文档！"
            )

        if site_links:
            link_md = " 、 ".join([f"[{l['name']}]({l['href']})" for l in site_links[:3]])
            parts.append(f"\n\n📌 **站内推荐直达**：{link_md}")

        return "\n".join(parts)


supervisor = MultiAgentSupervisor()
