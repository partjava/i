"""
PartJava MCP Server（Model Context Protocol 工具服务）
============================================================
把站内检索/写笔记/联网深搜/3D 神态四大能力以 MCP 协议暴露为标准化工具，任何 MCP 客户端
（Claude Desktop / Cursor / 自研 Agent 等）都可直接挂载调用：

    {
      "mcpServers": {
        "partjava": {
          "command": "python",
          "args": ["partjava-ai/mcp_server.py"]
        }
      }
    }

暴露的工具（与 Web 端 Function Calling 一一对应）：
  - search_site_pages : RAG 向量检索站内 310+ 课程页面
  - web_search        : DeepSeek 搜索引擎联网检索 + 正文抓取
  - draft_note        : 对话/页面内容 → 结构化 Markdown 笔记草稿
  - set_companion_state : 3D 黑猫神态控制（Web 场景经 SSE 下发）

运行：python mcp_server.py （stdio 传输，标准 MCP 协议）
============================================================
"""

import asyncio
import json

from config import settings
from agents.navigator import navigator
from agents.notewriter import note_writer
from agents.websearch import web_search as web_search_engine

try:
    # mcp 1.x：FastMCP；mcp 2.x：更名为 MCPServer（API 兼容，装饰器与 run() 一致）
    try:
        from mcp.server.fastmcp import FastMCP as MCPServer
    except ImportError:
        from mcp.server.mcpserver import MCPServer
except ImportError:
    raise SystemExit(
        "未安装 mcp 依赖：请先执行 pip install -r requirements.txt "
        "（MCP server 为可选组件，不影响 Web 端正常运行）"
    )

mcp = MCPServer("partjava-tools")


@mcp.tool()
async def search_site_pages(query: str) -> str:
    """在 PartJava 平台 310+ 个站内课程页面中做 RAG 向量检索，
    返回与 query 语义最相关的课程页面列表（含可直达链接）。"""
    links = navigator.match_site_links(query, top_k=4)
    if not links:
        return json.dumps({"ok": True, "count": 0, "links": [], "note": "站内暂无强相关页面"}, ensure_ascii=False)
    return json.dumps(
        {
            "ok": True,
            "count": len(links),
            "links": [
                {"name": l["name"], "href": l["href"], "category": l.get("category", "")} for l in links
            ],
        },
        ensure_ascii=False,
    )


@mcp.tool()
async def web_search(query: str) -> str:
    """联网检索外部权威技术资料并抓取正文（DeepSeek /tools/search + /tools/fetch），
    返回带编号的权威来源引证列表。需要配置 DEEPSEEK_API_KEY。"""
    citations, rag_context = await web_search_engine.search_and_fetch(query)
    return json.dumps(
        {
            "ok": True,
            "count": len(citations),
            "citations": [
                {
                    "index": c["index"],
                    "title": c["title"],
                    "url": c["url"],
                    "domain": c["domain"],
                    "snippet": c.get("snippet", ""),
                    "source": c.get("source", "recommended"),
                    "contentFetched": bool(c.get("contentFetched", False)),
                }
                for c in citations
            ],
            "context_preview": rag_context[:1200],
        },
        ensure_ascii=False,
    )


@mcp.tool()
async def draft_note(topic: str, conversation_text: str = "", page_context: str = "") -> str:
    """把对话内容 / 页面正文提炼为一篇结构化 Markdown 学习笔记草稿
    （自动分类、打标签）。返回可直接入库的笔记 JSON。"""
    note = await note_writer.generate_note(
        conversation_text=conversation_text,
        page_context=page_context,
        custom_topic=topic,
    )
    return json.dumps({"ok": True, "note": note}, ensure_ascii=False)


@mcp.tool()
async def set_companion_state(mood: str, action: str = "talk", posture: str = "") -> str:
    """控制 3D 黑猫助教『禾桔』的神态（mood: happy/curious/normal；
    action: jump/tilt_head/wag_tail/talk；posture: standing/crouching）。
    Web 场景下经 SSE 实时下发，MCP 场景返回状态确认。"""
    state = {"mood": mood, "action": action}
    if posture:
        state["posture"] = posture
    return json.dumps({"ok": True, "state": state, "note": "Web 场景下该指令会实时驱动 3D 黑猫"}, ensure_ascii=False)


def main() -> None:
    # stdio 传输模式下 stdout 是 JSON-RPC 通道，日志必须走 stderr
    import sys
    print(
        f"[MCP] PartJava MCP Server 启动（stdio 传输，4 个工具）"
        f"｜DeepSeek Key: {'已配置' if settings.DEEPSEEK_API_KEY else '未配置（联网深搜将离线降级）'}",
        file=sys.stderr,
        flush=True,
    )
    mcp.run()


if __name__ == "__main__":
    main()
