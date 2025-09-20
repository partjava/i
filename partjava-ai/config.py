import os
from typing import List, Optional
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# 加载环境变量
load_dotenv()

class Settings(BaseSettings):
    """应用配置"""
    
    # OpenAI 配置
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-3.5-turbo"
    OPENAI_BASE_URL: Optional[str] = None
    
    # DeepSeek 配置
    DEEPSEEK_API_KEY: Optional[str] ="sk-4c17bb74c3454a54bf44487190def552" 
    DEEPSEEK_MODEL: str = "deepseek-chat"
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    
    # 默认使用哪个 AI 服务
    AI_PROVIDER: str = "deepseek"  # "openai" 或 "deepseek"
    
    # 通用配置
    MAX_TOKENS: int = 1000
    TEMPERATURE: float = 0.7
    TOP_P: float = 1.0
    FREQUENCY_PENALTY: float = 0.0
    PRESENCE_PENALTY: float = 0.0
    
    # 服务器配置
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = True  # 强制设置为True，方便开发调试
    
    # 数据库配置
    DATABASE_PATH: str = os.getenv("DATABASE_PATH", "data/conversations.db")
    
    # CORS配置
    CORS_ORIGINS: List[str] = ["*"]  # 允许所有来源访问，生产环境应该设置为特定域名
    
    class Config:
        env_file = ".env"

settings = Settings() 