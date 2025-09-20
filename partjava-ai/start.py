#!/usr/bin/env python3
"""
AI智能问答系统启动脚本
"""

import os
import sys
import uvicorn
from pathlib import Path

def check_dependencies():
    """检查依赖是否安装"""
    try:
        import fastapi
        import openai
        import uvicorn
        print("✅ 所有依赖已安装")
        return True
    except ImportError as e:
        print(f"❌ 缺少依赖: {e}")
        print("请运行: pip install -r requirements.txt")
        return False

def check_config():
    """检查配置是否正确"""
    try:
        from config import settings
        
        if not settings.OPENAI_API_KEY:
            print("⚠️  警告: 未设置OpenAI API密钥")
            print("请在config.py中设置OPENAI_API_KEY或创建.env文件")
            return False
        
        print("✅ 配置检查通过")
        return True
    except Exception as e:
        print(f"❌ 配置错误: {e}")
        return False

def create_env_template():
    """创建.env模板文件"""
    env_template = """# OpenAI API配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# 服务器配置
HOST=0.0.0.0
PORT=8000
DEBUG=True

# 安全配置
CORS_ORIGINS=["https://www.partjava.com", "http://localhost:8080", "*"]
"""
    
    env_file = Path(".env")
    if not env_file.exists():
        with open(env_file, "w", encoding="utf-8") as f:
            f.write(env_template)
        print("📝 已创建.env模板文件，请编辑并填入你的OpenAI API密钥")
        return False
    return True

def main():
    """主函数"""
    print("🚀 AI智能问答系统启动中...")
    print("=" * 50)
    
    # 检查依赖
    if not check_dependencies():
        sys.exit(1)
    
    # 检查配置
    if not check_config():
        if not create_env_template():
            print("\n请按以下步骤操作：")
            print("1. 编辑.env文件，填入你的OpenAI API密钥")
            print("2. 重新运行此脚本")
            sys.exit(1)
    
    print("\n🌐 启动服务器...")
    print(f"📱 前端界面: https://www.partjava.com/static/index.html")
    print(f"📚 API文档: https://www.partjava.com/docs")
    print(f"💚 健康检查: https://www.partjava.com/health")
    print("=" * 50)
    print("按 Ctrl+C 停止服务器")
    print("=" * 50)
    
    try:
        # 启动服务器
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 服务器已停止")
    except Exception as e:
        print(f"\n❌ 启动失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()