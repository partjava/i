"""
PartJava 3D 黑猫 AI Agent 服务（FastAPI）入口
监听端口: 8000
提供端点:
1. GET  /api/ai/agent/health         -> 健康检查与工具状态
2. POST /api/ai/agent/stream         -> Agent 工具循环 SSE 流式输出（驱动 3D 猫嘴同步、站内导航、联网深搜、自动写笔记）
3. POST /api/ai/agent/summarize-note -> 独立生成结构化 Markdown 笔记 JSON
"""

from typing import List, Dict, Any, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from config import settings
from agents.router import supervisor
from agents.navigator import navigator
from agents.notewriter import note_writer
from agents.websearch import web_search

app = FastAPI(
    title="PartJava 3D Black Cat AI Agent Service (DeepSeek)",
    version="1.0.0",
    description="Function Calling Agent：站内领航 / 笔记提炼 / 3D 伴侣 / 联网深搜四大工具，由 LLM 自主调度",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatHistoryItem(BaseModel):
    role: str = "user"
    content: str = ""


class AgentStreamRequest(BaseModel):
    message: str = Field(..., description="用户输入的问题或指令")
    history: List[ChatHistoryItem] = Field(default_factory=list, description="多轮对话历史")
    pageContext: str = Field(default="", description="当前正在浏览的页面正文上下文")
    currentPathname: str = Field(default="", description="当前页面路由路径")
    enableWebSearch: bool = Field(default=False, description="是否开启联网深搜")
    explicitAgent: Optional[str] = Field(default=None, description="指定唤醒的智能体 ID")


class SummarizeNoteRequest(BaseModel):
    conversationText: str = ""
    pageContext: str = ""
    customTopic: str = ""


@app.get("/api/ai/agent/health")
async def health_check() -> Dict[str, Any]:
    has_key = bool(settings.DEEPSEEK_API_KEY and not settings.DEEPSEEK_API_KEY.startswith("your_"))
    return {
        "status": "ok",
        "service": "partjava-ai-fastapi",
        "hasDeepSeekKey": has_key,
        "models": {
            "flash": settings.DEEPSEEK_MODEL_FLASH,
            "pro": settings.DEEPSEEK_MODEL_PRO,
        },
        "indexedSiteRoutes": len(navigator.routes),
        "tools": [
            "search_site_pages (站内课程 RAG 检索)",
            "draft_note (自动提炼写笔记)",
            "set_companion_state (3D黑猫神态控制)",
            "web_search (联网深搜与权威外链)",
        ],
    }


@app.post("/api/ai/agent/stream")
async def agent_stream(req: AgentStreamRequest) -> StreamingResponse:
    history_dicts = [{"role": h.role, "content": h.content} for h in req.history]
    generator = supervisor.stream_dispatch(
        message=req.message,
        history=history_dicts,
        page_context=req.pageContext,
        current_pathname=req.currentPathname,
        enable_web_search=req.enableWebSearch,
        explicit_agent=req.explicitAgent,
    )
    return StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.post("/api/ai/agent/summarize-note")
async def summarize_note(req: SummarizeNoteRequest) -> Dict[str, Any]:
    note = await note_writer.generate_note(
        conversation_text=req.conversationText,
        page_context=req.pageContext,
        custom_topic=req.customTopic,
    )
    return {"ok": True, "note": note}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=False)
