"""
四大智能体工具层 (Function Calling Tool Layer)
将站内领航 / 自动写笔记 / 联网深搜 / 3D 神态控制四大能力封装为
OpenAI Function Calling 兼容的工具 schema 与执行器，供
Multi-Agent Supervisor 在 plan → act → observe 循环中由 LLM 自主决策调用。

设计约定：
- 每个工具执行产生的"前端副作用"（site_links / citations / note_draft /
  cat_command 等 SSE 事件）通过构造时注入的 emit 回调推入待发送队列，
  由上层异步生成器在合适的时机 yield 给客户端；
- 工具的返回值（dict）始终回填给 LLM 作为 observation，驱动下一轮决策。
"""

import json
from typing import Any, Callable, Dict, List, Optional

from agents.agent1_navigator import site_navigator_agent
from agents.agent2_notewriter import note_writer_agent
from agents.agent3_companion import companion_3d_agent
from agents.agent4_websearch import web_search_pro_agent

# 工具的人类可读标签与一句话说明（用于前端执行轨迹展示）
TOOL_LABELS: Dict[str, Dict[str, str]] = {
    "search_site_pages": {
        "label": "🧭 站内课程检索",
        "desc": "在 PartJava 310+ 站内页面中检索最相关的课程",
    },
    "web_search": {
        "label": "🌐 联网深搜",
        "desc": "调用搜索引擎检索并抓取权威外部资料",
    },
    "draft_note": {
        "label": "📝 提炼写笔记",
        "desc": "把对话或当前页面提炼为结构化 Markdown 笔记草稿",
    },
    "set_companion_state": {
        "label": "🐾 3D 神态控制",
        "desc": "控制 3D 黑猫袋子的情绪、动作与姿态",
    },
}

# OpenAI Function Calling 兼容的工具 schema（供 chat/completions 的 tools 参数使用）
TOOL_SCHEMAS: List[Dict[str, Any]] = [
    {
        "type": "function",
        "function": {
            "name": "search_site_pages",
            "description": (
                "在 PartJava 平台 310+ 个站内课程页面中检索与用户问题最相关的页面，"
                "返回可点击直达的课程链接列表。当用户想找学习资源、课程、教程，"
                "或问题与站内某一门课程强相关时调用。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "检索关键词，从用户问题中提炼出的技术主题词",
                    }
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": (
                "联网检索外部权威技术资料（官方文档、规范、教程）并抓取正文供回答引用。"
                "当问题涉及最新版本特性、官方规范、站内未覆盖的知识，"
                "或用户要求联网搜索/给出权威来源时调用。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "面向搜索引擎的专业检索词（可为英文）",
                    }
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "draft_note",
            "description": (
                "把当前对话与页面内容提炼为一篇结构化 Markdown 学习笔记草稿"
                "（自动分类、打标签，用户可一键保存入库）。"
                "当用户表达『写笔记 / 总结一下 / 记下来』等意图时调用。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "topic": {
                        "type": "string",
                        "description": "笔记主题，默认取用户当前的问题",
                    }
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "set_companion_state",
            "description": (
                "控制 3D 黑猫助教『袋子』的神态与动作。当用户撸猫、夸奖、"
                "要求坐下/站起来/跳一下，或回答场景值得庆祝时调用，增强陪伴感。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "mood": {
                        "type": "string",
                        "enum": ["happy", "curious", "normal"],
                        "description": "情绪：开心/好奇/平静",
                    },
                    "action": {
                        "type": "string",
                        "enum": ["jump", "tilt_head", "wag_tail", "talk"],
                        "description": "动作：跳跃/歪头/摇尾/说话",
                    },
                    "posture": {
                        "type": "string",
                        "enum": ["standing", "crouching"],
                        "description": "姿态切换：乖巧坐姿/爬起站姿",
                    },
                },
                "required": ["mood"],
            },
        },
    },
]


def summarize_tool_result(name: str, result: Dict[str, Any]) -> str:
    """把工具返回的 observation 压缩成一句话，用于前端执行轨迹展示。"""
    try:
        if name == "search_site_pages":
            return f"命中 {len(result.get('links', []))} 个站内课程页"
        if name == "web_search":
            return f"检索到 {len(result.get('citations', []))} 条权威资料并抓取正文"
        if name == "draft_note":
            return f"已生成笔记草稿《{result.get('title', '')}》"
        if name == "set_companion_state":
            return f"袋子已切换神态：{result.get('state', '')}"
    except Exception:
        pass
    return "执行完成"


class ToolExecutor:
    """
    执行 LLM 决策出的工具调用。

    emit(event, data) 回调用于把前端副作用事件推入上层队列；
    执行后工具自身的结果状态（site_links / citations / rag_fragments /
    note_draft / reaction）沉淀在实例字段上，供最终回答的上下文组装。
    """

    def __init__(
        self,
        emit: Callable[[str, Dict[str, Any]], None],
        conversation_text: str = "",
        page_context: str = "",
    ) -> None:
        self.emit = emit
        self.conversation_text = conversation_text
        self.page_context = page_context
        self.site_links: List[Dict[str, str]] = []
        self.citations: List[Dict[str, Any]] = []
        self.rag_fragments: List[str] = []
        self.note_draft: Optional[Dict[str, Any]] = None
        self.reaction: Dict[str, Any] = {}

    async def execute(self, name: str, arguments: Optional[Dict[str, Any]]) -> Dict[str, Any]:
        args = arguments or {}
        handler = getattr(self, f"_tool_{name}", None)
        if handler is None:
            return {"ok": False, "error": f"未知工具: {name}"}
        try:
            return await handler(args)
        except Exception as exc:  # 单个工具失败不应中断 Agent 循环
            return {"ok": False, "error": f"工具执行异常: {exc}"}

    async def _tool_search_site_pages(self, args: Dict[str, Any]) -> Dict[str, Any]:
        query = str(args.get("query") or "").strip()
        if not query:
            return {"ok": False, "error": "缺少检索关键词 query"}
        links = site_navigator_agent.match_site_links(query, top_k=4)
        if links:
            self.site_links = links
            self.emit("site_links", {"links": links})
            return {
                "ok": True,
                "count": len(links),
                "links": [
                    {"name": l["name"], "href": l["href"], "category": l.get("category", "")}
                    for l in links
                ],
            }
        return {"ok": True, "count": 0, "links": [], "note": "站内暂无强相关页面"}

    async def _tool_web_search(self, args: Dict[str, Any]) -> Dict[str, Any]:
        query = str(args.get("query") or "").strip()
        if not query:
            return {"ok": False, "error": "缺少检索词 query"}
        citations, rag_context = await web_search_pro_agent.search_and_fetch(query)
        self.citations = citations
        if rag_context:
            self.rag_fragments.append(rag_context)
        self.emit(
            "citations",
            {"stage": "completed", "citations": citations},
        )
        return {
            "ok": True,
            "count": len(citations),
            "citations": [
                {"index": c["index"], "title": c["title"], "url": c["url"], "domain": c["domain"]}
                for c in citations
            ],
            "note": "权威资料正文已注入上下文，回答时请用 [编号] 角标引用",
        }

    async def _tool_draft_note(self, args: Dict[str, Any]) -> Dict[str, Any]:
        topic = str(args.get("topic") or "").strip()
        note = await note_writer_agent.generate_note(
            conversation_text=self.conversation_text,
            page_context=self.page_context,
            custom_topic=topic,
        )
        self.note_draft = note
        self.emit("note_draft", {"note": note})
        return {
            "ok": True,
            "title": note.get("title", ""),
            "category": note.get("category", ""),
            "technology": note.get("technology", ""),
            "note": "笔记草稿已推送给用户预览，可在回答中提示用户点击保存",
        }

    async def _tool_set_companion_state(self, args: Dict[str, Any]) -> Dict[str, Any]:
        mood = args.get("mood") or "normal"
        action = args.get("action") or "talk"
        posture = args.get("posture")
        reaction = {"mood": mood, "action": action}
        if posture:
            reaction["posture"] = posture
        self.reaction = reaction
        self.emit("cat_command", reaction)
        return {"ok": True, "state": f"{mood} / {action}" + (f" / {posture}" if posture else "")}


def build_agency_system_instructions() -> str:
    """注入 System Prompt 的自主决策说明：告诉 LLM 它可以调用哪些工具、何时调用。"""
    return (
        "\n【自主决策与工具使用说明】\n"
        "你是一个具备工具调用能力的智能体（Agent），可以在回答前自主决定调用下列工具获取信息：\n"
        "- search_site_pages：检索站内课程页面（找学习资源/课程时用）\n"
        "- web_search：联网检索权威外部资料（最新特性/官方规范/用户要求权威来源时用）\n"
        "- draft_note：为用户生成结构化笔记草稿（用户表达『写笔记/总结/记下来』意图时必须调用）\n"
        "- set_companion_state：控制你的 3D 猫咪神态（用户撸猫/夸奖/要求动作时调用）\n"
        "规则：需要信息就先调用工具再回答，不需要就直接回答；"
        "一次可以调用多个工具；引用检索结果时使用 [编号] 角标或 Markdown 链接。\n"
    )


def parse_tool_arguments(raw_arguments: Optional[str]) -> Dict[str, Any]:
    """容错解析模型输出的工具参数 JSON 字符串。"""
    if not raw_arguments:
        return {}
    try:
        parsed = json.loads(raw_arguments)
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        # 尝试截取最外层花括号再解析一次
        start, end = raw_arguments.find("{"), raw_arguments.rfind("}")
        if start >= 0 and end > start:
            try:
                parsed = json.loads(raw_arguments[start : end + 1])
                return parsed if isinstance(parsed, dict) else {}
            except Exception:
                pass
    return {}
