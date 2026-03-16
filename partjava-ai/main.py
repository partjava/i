from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder
import aiofiles
import os
from datetime import datetime
import traceback
import json
from typing import Dict, Any, Optional

from config import settings
from models import (
    QuestionRequest, AIResponse, HealthCheck, ErrorResponse,
    Conversation, ConversationMessage, ContentBlock, ContentType
)
from services.ai_service import AIService

# 创建FastAPI应用
app = FastAPI(
    title="AI智能问答系统",
    description="基于OpenAI的智能问答API，支持结构化内容和代码块",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，生产环境应该设置为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化AI服务
ai_service = AIService()

# 静态文件服务
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    """根路径，返回简单的HTML页面"""
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>AI智能问答系统</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .container { background: #f5f5f5; padding: 20px; border-radius: 10px; }
            .api-link { color: #007bff; text-decoration: none; }
            .api-link:hover { text-decoration: underline; }
            .feature-new { color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 AI智能问答系统</h1>
            <p>欢迎使用AI智能问答系统！</p>
            <h2>API文档</h2>
            <ul>
                <li><a href="/docs" class="api-link">Swagger UI文档</a></li>
                <li><a href="/redoc" class="api-link">ReDoc文档</a></li>
            </ul>
            <h2>主要功能</h2>
            <ul>
                <li>智能问答</li>
                <li>多轮对话</li>
                <li class="feature-new">结构化内容响应（代码块、表格等）</li>
                <li>对话历史管理</li>
                <li>健康检查</li>
            </ul>
            <h2>快速开始</h2>
            <p>发送POST请求到 <code>/ask</code> 端点开始对话：</p>
            <pre>
{
    "question": "你好，请介绍一下自己",
    "conversation_id": "可选，用于多轮对话"
}
            </pre>
            <p>返回的响应现在支持结构化内容：</p>
            <pre>
{
    "answer": "你好，我是AI助手",
    "content_blocks": [
        {
            "type": "text",
            "content": "你好，我是AI助手"
        },
        {
            "type": "code",
            "content": {
                "code": "print('Hello, World!')",
                "language": "python"
            }
        }
    ],
    "has_code": true
}
            </pre>
        </div>
    </body>
    </html>
    """
    return html_content

@app.get("/health", response_model=HealthCheck)
async def health_check():
    """健康检查端点"""
    try:
        # 根据当前AI提供商构建模型信息
        if settings.AI_PROVIDER == "deepseek":
            model_info = {
                "provider": "DeepSeek",
                "model": settings.DEEPSEEK_MODEL,
                "api_key_configured": bool(settings.DEEPSEEK_API_KEY)
            }
        else:
            model_info = {
                "provider": "OpenAI",
                "model": settings.OPENAI_MODEL,
                "api_key_configured": bool(settings.OPENAI_API_KEY)
            }
        
        return HealthCheck(
            status="ok",
            version="1.1.0",
            model_info=model_info
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@app.post("/ask", response_model=AIResponse)
async def ask_question(request: QuestionRequest):
    """
    发送问题给AI并获取回答
    
    - **question**: 用户的问题
    - **context**: 可选的上下文信息
    - **conversation_id**: 可选的对话ID，用于多轮对话
    - **user_id**: 可选的用户ID
    
    返回结构化的AI响应，包括纯文本答案和结构化内容块
    """
    try:
        # 如果没有提供conversation_id，创建一个新的对话
        conversation_id = request.conversation_id
        if not conversation_id:
            conversation_id = ai_service.create_conversation(request.user_id)
        
        # 生成AI响应
        result = await ai_service.generate_response(
            question=request.question,
            conversation_id=conversation_id,
            user_id=request.user_id,
            context=request.context
        )
        
        # 创建响应对象并返回
        return AIResponse(**result)
        
    except Exception as e:
        print("ASK ERROR:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/conversations", response_model=dict)
async def create_conversation(user_id: Optional[str] = None):
    """创建新的对话"""
    try:
        conversation_id = ai_service.create_conversation(user_id)
        return {
            "conversation_id": conversation_id,
            "message": "对话创建成功"
        }
    except Exception as e:
        print("CREATE CONVERSATION ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation(conversation_id: str):
    """获取对话记录"""
    conversation = ai_service.get_conversation(conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="对话不存在")
    return conversation

@app.get("/conversations/{conversation_id}/history", response_model=list[Dict[str, Any]])
async def get_conversation_history(conversation_id: str):
    """获取对话历史"""
    history = ai_service.get_conversation_history(conversation_id)
    if not history:
        raise HTTPException(status_code=404, detail="对话不存在或没有历史记录")
    return history

@app.get("/users/{user_id}/conversations")
async def get_user_conversations(user_id: str):
    """获取用户的所有对话"""
    try:
        conversations = ai_service.get_user_conversations(user_id)
        return {
            "user_id": user_id,
            "conversations": conversations
        }
    except Exception as e:
        print(f"获取用户对话列表错误: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversations")
async def list_recent_conversations(limit: int = 10, skip: int = 0):
    """获取最近的对话列表"""
    try:
        # 实际应用中应该实现分页查询
        conversations = ai_service.get_recent_conversations(limit, skip)
        return {
            "total": len(conversations),
            "skip": skip,
            "limit": limit,
            "conversations": conversations
        }
    except Exception as e:
        print(f"获取对话列表错误: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    """删除对话"""
    success = ai_service.delete_conversation(conversation_id)
    if not success:
        raise HTTPException(status_code=404, detail="对话不存在")
    return {"message": "对话删除成功"}

@app.get("/models")
async def get_models():
    """获取可用的模型信息"""
    return {
        "current_model": ai_service._get_current_model(),
        "available_models": [
            "gpt-3.5-turbo",
            "gpt-4",
            "gpt-4-turbo-preview",
            "deepseek-chat"
        ],
        "model_config": {
            "max_tokens": settings.MAX_TOKENS,
            "temperature": settings.TEMPERATURE,
            "top_p": settings.TOP_P
        }
    }

@app.post("/execute-code")
async def execute_code(code_data: dict):
    """
    执行代码（目前仅支持Python代码）
    
    - **code**: 要执行的代码
    - **language**: 编程语言（当前仅支持python）
    """
    try:
        code = code_data.get("code")
        language = code_data.get("language", "python").lower()
        
        if not code:
            raise HTTPException(status_code=400, detail="代码不能为空")
            
        if language != "python":
            raise HTTPException(status_code=400, detail="当前仅支持Python代码执行")
        
        # 这里简单演示，生产环境应该使用沙箱或Docker容器执行代码
        import sys
        from io import StringIO
        import contextlib
        
        # 捕获标准输出和错误
        output = StringIO()
        error = StringIO()
        
        @contextlib.contextmanager
        def redirect_stdout_stderr():
            old_stdout, old_stderr = sys.stdout, sys.stderr
            sys.stdout, sys.stderr = output, error
            try:
                yield
            finally:
                sys.stdout, sys.stderr = old_stdout, old_stderr
                
        # 执行代码并捕获输出
        with redirect_stdout_stderr():
            try:
                exec(code)
                result = output.getvalue()
                error_msg = error.getvalue()
            except Exception as e:
                error_msg = f"{type(e).__name__}: {str(e)}"
                result = ""
        
        return {
            "success": not error_msg,
            "result": result,
            "error": error_msg
        }
    
    except Exception as e:
        print("CODE EXECUTION ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/debug/database", include_in_schema=False)
async def debug_database():
    """调试数据库状态（仅开发环境使用）"""
    if not settings.DEBUG:
        raise HTTPException(status_code=403, detail="仅在DEBUG模式下可用")
    
    try:
        # 收集数据库信息
        db_info = {}
        
        # 获取对话数量
        conversations = ai_service.get_recent_conversations(100)
        db_info["conversations_count"] = len(conversations)
        db_info["conversations"] = conversations[:5]  # 只返回前5个用于调试
        
        # 获取数据库文件信息
        if hasattr(ai_service.db, 'db_path') and ai_service.db.db_path != ":memory:":
            db_path = ai_service.db.db_path
            if os.path.exists(db_path):
                db_info["db_file_size"] = os.path.getsize(db_path)
                db_info["db_file_path"] = db_path
                db_info["db_file_exists"] = True
            else:
                db_info["db_file_exists"] = False
        
        return db_info
    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }

@app.post("/debug/create-test-conversation", include_in_schema=False)
async def create_test_conversation():
    """创建测试对话（仅开发环境使用）"""
    if not settings.DEBUG:
        raise HTTPException(status_code=403, detail="仅在DEBUG模式下可用")
    
    try:
        # 创建一个测试对话
        conversation_id = ai_service.create_conversation("test_user")
        
        # 添加几条测试消息
        ai_service._save_conversation(
            conversation_id=conversation_id,
            user_id="test_user",
            question="这是一个测试问题",
            answer="这是一个测试回答"
        )
        
        # 再添加一轮对话
        ai_service._save_conversation(
            conversation_id=conversation_id,
            user_id="test_user",
            question="第二个测试问题",
            answer="第二个测试回答，包含一些代码：\n```python\nprint('Hello, World!')\n```"
        )
        
        return {
            "success": True,
            "conversation_id": conversation_id,
            "message": "测试对话创建成功"
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc()
        }

# 错误处理
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content=jsonable_encoder(ErrorResponse(
            error="Not Found",
            detail="请求的资源不存在"
        ))
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content=jsonable_encoder(ErrorResponse(
            error="Internal Server Error",
            detail=str(exc) if hasattr(exc, "detail") else "服务器内部错误"
        ))
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    ) 