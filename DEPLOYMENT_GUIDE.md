# PartJava 新服务器部署指南

## 1. 系统环境准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装Python环境
sudo apt install -y python3 python3-pip python3-venv

# 安装MySQL 8.0
sudo apt install -y mysql-server

# 安装PM2
sudo npm install -g pm2
```

## 2. 配置MySQL数据库

```bash
# 运行安全配置
sudo mysql_secure_installation

# 创建数据库和用户
sudo mysql
```

在MySQL中执行：
```sql
CREATE DATABASE partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ecs-user'@'localhost' IDENTIFIED BY '你的数据库密码';
GRANT ALL PRIVILEGES ON partjava_notes.* TO 'ecs-user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 3. 克隆项目

```bash
cd ~
git clone https://github.com/你的GitHub用户名/i.git
cd i
```

## 4. 配置环境变量

创建 `.env.production` 文件：
```bash
nano .env.production
```

内容：
```env
# NextAuth配置
NEXTAUTH_URL=https://www.partjava.com
NEXTAUTH_SECRET=RZ7oSkZsSRDy2lps0apRw1/9Qh7ZSuBhCWf4N84ibKE=

# 数据库配置
DB_HOST=localhost
DB_USER=ecs-user
DB_PASSWORD=你的数据库密码
DB_NAME=partjava_notes

# RapidAPI Configuration for Judge0
RAPIDAPI_KEY=039e43b537msh40765032398a95ep1f61aajsn0321e61fa9d0
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com

# AI API Configuration
NEXT_PUBLIC_AI_API_URL=https://www.partjava.com/ai
```

## 5. 配置Python AI服务

创建 `partjava-ai/config.py` 文件：
```bash
nano partjava-ai/config.py
```

内容：
```python
import os
from typing import List, Optional
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    """应用配置"""
    
    # DeepSeek 配置
    DEEPSEEK_API_KEY: Optional[str] = "sk-4c17bb74c3454a54bf44487190def552"
    DEEPSEEK_MODEL: str = "deepseek-chat"
    DEEPSEEK_BASE_URL: str = "https://api.deepseek.com"
    
    # 默认使用哪个 AI 服务
    AI_PROVIDER: str = "deepseek"
    
    # 通用配置
    MAX_TOKENS: int = 1000
    TEMPERATURE: float = 0.7
    TOP_P: float = 1.0
    FREQUENCY_PENALTY: float = 0.0
    PRESENCE_PENALTY: float = 0.0
    
    # 服务器配置
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = True
    
    # CORS配置
    CORS_ORIGINS: List[str] = ["*"]
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## 6. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装Python后端依赖
cd partjava-ai
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

## 7. 给脚本执行权限

```bash
chmod +x deploy.sh start-services.sh
```

## 8. 部署启动

```bash
./deploy.sh
```

## 9. 检查服务状态

```bash
pm2 list
pm2 logs frontend
pm2 logs backend
```

## 10. 配置域名解析

将域名 `www.partjava.com` 的A记录指向新服务器IP

## 常用命令

```bash
# 查看服务状态
pm2 list

# 查看日志
pm2 logs frontend
pm2 logs backend

# 重启服务
pm2 restart frontend
pm2 restart backend

# 停止服务
pm2 stop all

# 快速重启（不重新构建）
./start-services.sh

# 完整部署（包含构建）
./deploy.sh

# 备份数据库
mysqldump -u ecs-user -p partjava_notes > backup_$(date +%Y%m%d).sql
```

## 注意事项

1. 记得修改数据库密码
2. 确保安全组开放了 80 和 443 端口
3. 定期备份数据库
4. 监控服务器资源使用情况
