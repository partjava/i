"""
四大智能体总控调度器 (Multi-Agent Supervisor Router)
负责串联：
- 智能体一 (`site_navigator_agent`)：站内 310+ 页面领航与当前页伴读
- 智能体二 (`note_writer_agent`)：知识提炼与自动写笔记
- 智能体三 (`companion_3d_agent`)：编程解题与 3D 黑猫情绪/姿态/品字嘴同步控制
- 智能体四 (`web_search_pro_agent`)：`deepseek-v4-pro` + `/v1/tools/search` & `/v1/tools/fetch` 联网权威引证
"""

import json
import asyncio
from typing import AsyncGenerator, Dict, Any, List, Optional
import httpx
from config import settings
from agents.agent1_navigator import site_navigator_agent
from agents.agent2_notewriter import note_writer_agent
from agents.agent3_companion import companion_3d_agent
from agents.agent4_websearch import web_search_pro_agent


def format_sse(event: str, data: Any) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


class MultiAgentSupervisor:
    def detect_intent(self, message: str, enable_web_search: bool, explicit_agent: Optional[str] = None) -> Dict[str, bool]:
        msg = (message or "").lower()
        is_note = (
            explicit_agent == "agent2_note"
            or any(
                kw in msg
                for kw in ["写笔记", "生成笔记", "保存笔记", "总结成笔记", "总结本页", "记笔记", "存为笔记"]
            )
        )
        is_web_search = (
            enable_web_search
            or explicit_agent == "agent4_search"
            or any(
                kw in msg
                for kw in ["联网", "搜索", "上网查", "官网链接", "专业网站", "权威网站", "外部链接", "最新文档"]
            )
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
        intents = self.detect_intent(message, enable_web_search, explicit_agent)

        # 1. 【智能体三】率先计算 3D 黑猫的情绪、歪头/跳跃动作与坐姿/站姿切换
        reaction = companion_3d_agent.analyze_3d_reaction(message)
        active_agents = ["🐾 智能体三·3D灵动伴侣"]
        if intents["use_agent1_navigator"]:
            active_agents.append("🧭 智能体一·站内领航伴读")
        if intents["use_agent4_search"]:
            active_agents.append("🌐 智能体四·Pro联网深搜")
        if intents["use_agent2_note"]:
            active_agents.append("📝 智能体二·自动写笔记")

        yield format_sse(
            "agent_meta",
            {
                "reaction": reaction,
                "activeAgents": active_agents,
                "model": settings.DEEPSEEK_MODEL_PRO
                if intents["use_agent4_search"]
                else settings.DEEPSEEK_MODEL_FLASH,
            },
        )

        # 2. 【智能体一】检索全站 310+ 页面路由 + 装配当前页面伴读上下文
        nav_prompt_frag, site_links = site_navigator_agent.build_system_prompt_fragment(
            message, page_context
        )
        if site_links:
            yield format_sse("site_links", {"links": site_links})

        # 3. 【智能体四】如果开启了 Pro 联网深搜，执行 /v1/tools/search -> /v1/tools/fetch
        citations: List[Dict[str, Any]] = []
        web_rag_frag = ""
        if intents["use_agent4_search"]:
            yield format_sse(
                "search_status",
                {
                    "stage": "searching",
                    "text": "🌐 智能体四 (deepseek-v4-pro) 正在调用 /v1/tools/search & /fetch 检索并抓取权威技术网站...",
                },
            )
            citations, web_rag_frag = await web_search_pro_agent.search_and_fetch(message)
            yield format_sse(
                "citations",
                {
                    "stage": "completed",
                    "citations": citations,
                },
            )

        # 4. 如果用户直接要求【智能体二：总结写笔记】，并行或随后生成结构化笔记草稿
        if intents["use_agent2_note"]:
            yield format_sse(
                "search_status",
                {
                    "stage": "writing_note",
                    "text": "📝 智能体二 (deepseek-flash) 正在提炼对话与当前页面，生成结构化 Markdown 笔记...",
                },
            )
            conv_str = "\n".join(
                [f"{m.get('role', 'user')}: {m.get('content', '')}" for m in history[-8:]]
            )
            note_draft = await note_writer_agent.generate_note(
                conversation_text=conv_str,
                page_context=page_context,
                custom_topic=message,
            )
            yield format_sse("note_draft", {"note": note_draft})

        # 5. 组装 System Prompt 并调用 DeepSeek (`deepseek-flash` 或 `deepseek-v4-pro`) 流式输出
        system_content = (
            companion_3d_agent.SYSTEM_PERSONA
            + "\n"
            + nav_prompt_frag
            + "\n"
            + web_rag_frag
        )

        target_model = (
            settings.DEEPSEEK_MODEL_PRO
            if intents["use_agent4_search"]
            else settings.DEEPSEEK_MODEL_FLASH
        )

        api_key = settings.DEEPSEEK_API_KEY
        streamed_any = False

        if api_key and not api_key.startswith("your_"):
            try:
                llm_messages = [{"role": "system", "content": system_content}]
                for h in history[-6:]:
                    if h.get("content"):
                        llm_messages.append(
                            {
                                "role": "assistant" if h.get("role") in ("ai", "assistant") else "user",
                                "content": h["content"],
                            }
                        )
                llm_messages.append({"role": "user", "content": message})

                req_payload: Dict[str, Any] = {
                    "model": target_model,
                    "messages": llm_messages,
                    "stream": True,
                    "temperature": 0.6,
                }
                # 当使用 deepseek-v4-pro 且开启联网搜索时，同时声明内置 web_search 工具支持
                if target_model == settings.DEEPSEEK_MODEL_PRO and intents["use_agent4_search"]:
                    req_payload["tools"] = [{"type": "web_search"}]

                async with httpx.AsyncClient(timeout=60.0) as client:
                    async with client.stream(
                        "POST",
                        f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
                        headers={
                            "Authorization": f"Bearer {api_key}",
                            "Content-Type": "application/json",
                        },
                        json=req_payload,
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
                                    delta = (
                                        chunk.get("choices", [{}])[0]
                                        .get("delta", {})
                                        .get("content", "")
                                    )
                                    if delta:
                                        streamed_any = True
                                        yield format_sse("token", {"text": delta})
                                except Exception:
                                    continue
            except Exception as e:
                print(f"[MultiAgentSupervisor] DeepSeek 流式请求回退至内置智能引擎: {e}")

        # 6. 如果尚未配置 DeepSeek API Key 或请求回退，使用融合了四大智能体结果的本地流式回复（保证猫嘴同步说话、站内导航、外链引证、笔记卡片 100% 可用！）
        if not streamed_any:
            fallback_reply = self._build_smart_fallback_reply(
                message=message,
                site_links=site_links,
                citations=citations,
                page_context=page_context,
                is_note=intents["use_agent2_note"],
                is_search=intents["use_agent4_search"],
            )
            # 模拟逼真的流式打字机推送，驱动 3D 黑猫“品”字嘴同步跳动
            chunk_size = 6
            for i in range(0, len(fallback_reply), chunk_size):
                piece = fallback_reply[i : i + chunk_size]
                yield format_sse("token", {"text": piece})
                await asyncio.sleep(0.035)

        yield format_sse("done", {"ok": True})

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
                f"喵~ 🐾 **【智能体四 · DeepSeek-V4-Pro 联网深搜】** 已围绕「**{message}**」检索并抓取了 {len(citations)} 个专业权威技术站点：\n"
            )
            for c in citations:
                parts.append(f"- **[{c['index']}] {c['title']}** (`{c['domain']}`)\n  > {c['snippet']}")
            parts.append("\n你可以直接点击气泡底部的 **🌐 权威网站外链卡片** 跳转到对应官网阅读原文！")
        elif page_context.strip():
            # 提取当前页标题
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
                "- 🌐 **Pro 联网深搜**：点亮下方「🌐 联网深搜 (Pro)」按钮，即可调用 `deepseek-v4-pro` 检索外部权威技术文档！"
            )

        if site_links:
            link_md = " 、 ".join([f"[{l['name']}]({l['href']})" for l in site_links[:3]])
            parts.append(f"\n\n📌 **站内推荐直达**：{link_md}")

        return "\n".join(parts)


supervisor = MultiAgentSupervisor()
