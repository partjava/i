from enum import Enum
from pydantic import BaseModel, Field, ConfigDict, validator
from typing import List, Optional, Dict, Any, Literal, Union
from datetime import datetime

class MessageRole(str, Enum):
    """消息角色枚举"""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class ContentType(str, Enum):
    """内容类型枚举"""
    TEXT = "text"
    CODE = "code"
    IMAGE = "image"
    TABLE = "table"
    MARKDOWN = "markdown"
    LINK = "link"

class CodeBlock(BaseModel):
    """代码块模型"""
    code: str = Field(..., description="代码内容")
    language: str = Field(..., description="编程语言")
    execute_result: Optional[str] = Field(default=None, description="代码执行结果")

class TableData(BaseModel):
    """表格数据模型"""
    headers: List[str] = Field(..., description="表头")
    rows: List[List[Any]] = Field(..., description="表格数据行")
    caption: Optional[str] = Field(None, description="表格标题")

class ContentBlock(BaseModel):
    """内容块模型"""
    type: ContentType = Field(..., description="内容类型")
    content: Union[str, CodeBlock, TableData, Dict[str, Any]] = Field(..., description="内容数据")

class QuestionRequest(BaseModel):
    """
    问题请求模型
    用于接收用户提交的问题及相关上下文
    """
    model_config = ConfigDict(protected_namespaces=())
    
    question: str = Field(..., description="用户的问题", min_length=1, max_length=2000)
    context: Optional[str] = Field(None, description="上下文信息")
    conversation_id: Optional[str] = Field(None, description="对话ID，用于多轮对话")
    user_id: Optional[str] = Field(None, description="用户ID")
    
    @validator('question')
    def question_not_empty(cls, v):
        """验证问题不能为空"""
        v = v.strip()
        if not v:
            raise ValueError('问题不能为空')
        return v
    
class AIResponse(BaseModel):
    """
    AI响应模型
    用于返回AI处理结果
    """
    model_config = ConfigDict(protected_namespaces=())
    
    answer: str = Field(..., description="AI的回答(纯文本格式，向后兼容)")
    content_blocks: Optional[List[ContentBlock]] = Field(None, description="结构化内容块")
    has_code: bool = Field(False, description="响应中是否包含代码")
    emotion: Optional[str] = Field(None, description="情感色彩")
    conversation_id: Optional[str] = Field(None, description="对话ID")
    tokens_used: Optional[int] = Field(None, description="使用的token数量", ge=0)
    model_used: Optional[str] = Field(None, description="使用的模型")
    response_time: Optional[float] = Field(None, description="响应时间（秒）", ge=0)
    timestamp: datetime = Field(default_factory=datetime.now, description="响应时间戳")
    
    def add_code_block(self, code: str, language: str) -> None:
        """添加代码块"""
        if self.content_blocks is None:
            self.content_blocks = []
        
        self.content_blocks.append(ContentBlock(
            type=ContentType.CODE,
            content=CodeBlock(
                code=code, 
                language=language,
                execute_result=None
            )
        ))
        self.has_code = True
    
    def add_text_block(self, text: str) -> None:
        """添加文本块"""
        if self.content_blocks is None:
            self.content_blocks = []
        
        self.content_blocks.append(ContentBlock(
            type=ContentType.TEXT,
            content=text
        ))
    
    def add_markdown_block(self, markdown: str) -> None:
        """添加Markdown块"""
        if self.content_blocks is None:
            self.content_blocks = []
        
        self.content_blocks.append(ContentBlock(
            type=ContentType.MARKDOWN,
            content=markdown
        ))
    
    def add_table(self, headers: List[str], rows: List[List[Any]], caption: Optional[str] = None) -> None:
        """添加表格"""
        if self.content_blocks is None:
            self.content_blocks = []
        
        self.content_blocks.append(ContentBlock(
            type=ContentType.TABLE,
            content=TableData(headers=headers, rows=rows, caption=caption)
        ))

class ConversationMessage(BaseModel):
    """
    对话消息模型
    表示对话中的单条消息
    """
    model_config = ConfigDict(protected_namespaces=())
    
    role: MessageRole = Field(..., description="消息角色：user或assistant")
    content: str = Field(..., description="消息内容")
    content_blocks: Optional[List[ContentBlock]] = Field(None, description="结构化内容块")
    timestamp: datetime = Field(default_factory=datetime.now, description="消息时间戳")

class Conversation(BaseModel):
    """
    对话模型
    表示一个完整的对话，包含多条消息
    """
    model_config = ConfigDict(protected_namespaces=())
    
    conversation_id: str = Field(..., description="对话ID")
    user_id: Optional[str] = Field(None, description="用户ID")
    messages: List[ConversationMessage] = Field(default_factory=list, description="对话消息列表")
    created_at: datetime = Field(default_factory=datetime.now, description="创建时间")
    updated_at: datetime = Field(default_factory=datetime.now, description="更新时间")
    
    def add_message(self, role: MessageRole, content: str, content_blocks: Optional[List[ContentBlock]] = None) -> None:
        """添加新消息到对话"""
        self.messages.append(
            ConversationMessage(role=role, content=content, content_blocks=content_blocks)
        )
        self.updated_at = datetime.now()

class HealthCheck(BaseModel):
    """
    健康检查响应模型
    用于API健康状态监控
    """
    model_config = ConfigDict(protected_namespaces=())
    
    status: Literal["ok", "error"] = Field(..., description="服务状态")
    timestamp: datetime = Field(default_factory=datetime.now, description="检查时间")
    version: str = Field(..., description="API版本")
    model_info: Optional[Dict[str, Any]] = Field(None, description="模型信息")

class ErrorResponse(BaseModel):
    """
    错误响应模型
    用于返回API错误信息
    """
    model_config = ConfigDict(protected_namespaces=())
    
    error: str = Field(..., description="错误信息")
    detail: Optional[str] = Field(None, description="详细错误信息")
    timestamp: datetime = Field(default_factory=datetime.now, description="错误时间戳") 