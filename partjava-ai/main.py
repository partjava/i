"""
PartJava 3D 黑猫 × DeepSeek-V4 四大智能体 FastAPI 服务入口
监听端口: 8000
提供端点:
1. GET  /api/ai/agent/health         -> 健康检查与四大智能体状态
2. POST /api/ai/agent/stream         -> 四大智能体协同 SSE 流式输出（驱动 3D 猫嘴同步、站内导航、联网深搜、自动写笔记）
3. POST /api/ai/agent/summarize-note -> 智能体二独立生成结构化 Markdown 笔记 JSON
"""

from typing import List, Dict, Any, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from config import settings
from agents.router import supervisor
from agents.agent1_navigator import site_navigator_agent
from agents.agent2_notewriter import note_writer_agent
from agents.agent4_websearch import web_search_pro_agent

app = FastAPI(
    title="PartJava 3D Black Cat Multi-Agent Service (DeepSeek-V4)",
    version="1.0.0",
    description="四大专职智能体：1.站内310+页面领航与伴读 2.自动总结写笔记 3.3D黑猫情绪与编程导师 4.DeepSeek-V4-Pro联网深搜与权威引证",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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
    enableWebSearch: bool = Field(default=False, description="是否开启智能体四 (deepseek-v4-pro 联网深搜)")
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
        "indexedSiteRoutes": len(site_navigator_agent.routes),
        "agents": [
            "agent1_navigator (站内310+页面领航与伴读)",
            "agent2_notewriter (自动提炼总结写笔记)",
            "agent3_companion (3D黑猫神态动作与编程解题)",
            "agent4_websearch (DeepSeek-V4-Pro 联网深搜与权威外链)",
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
    note = await note_writer_agent.generate_note(
        conversation_text=req.conversationText,
        page_context=req.pageContext,
        custom_topic=req.customTopic,
    )
    return {"ok": True, "note": note}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=False)
