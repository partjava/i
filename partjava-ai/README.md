# AI智能问答系统

一个基于FastAPI和OpenAI的智能问答系统，提供准确的AI回答功能，支持多轮对话和对话历史管理。

## 功能特性

- 🤖 智能问答：基于OpenAI GPT模型的智能回答
- 💬 多轮对话：支持上下文记忆的连续对话
- 📝 对话历史：保存和管理对话记录
- 🌐 RESTful API：完整的API接口
- 🎨 现代化UI：美观的前端界面
- 📱 响应式设计：支持移动端访问
- 🔧 易于部署：简单的配置和部署流程

## 项目结构
```
partjava-ai/
├── main.py                 # 主应用文件
├── config.py              # 配置文件
├── models.py              # 数据模型
├── requirements.txt       # 依赖包列表
├── README.md             # 项目说明
├── services/
│   └── ai_service.py     # AI服务模块
└── static/
    └── index.html        # 前端界面
```

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置OpenAI API

在项目根目录创建 `.env` 文件（或直接在 `config.py` 中修改）：

```env
# OpenAI API配置
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# 服务器配置
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### 3. 启动服务器

```bash
python main.py
```

或者使用uvicorn：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. 访问应用

- 前端界面：https://www.partjava.com/static/index.html
- API文档：https://www.partjava.com/docs
- 健康检查：https://www.partjava.com/health

## API接口

### 主要端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/` | 首页 |
| GET | `/health` | 健康检查 |
| POST | `/ask` | 发送问题给AI |
| POST | `/conversations` | 创建新对话 |
| GET | `/conversations/{id}` | 获取对话记录 |
| GET | `/conversations/{id}/history` | 获取对话历史 |
| DELETE | `/conversations/{id}` | 删除对话 |
| GET | `/models` | 获取模型信息 |

### 使用示例

#### 发送问题

```bash
curl -X POST "https://www.partjava.com/ask" \
     -H "Content-Type: application/json" \
     -d '{
       "question": "你好，请介绍一下自己",
       "conversation_id": "optional-conversation-id"
     }'
```

#### 创建新对话

```bash
curl -X POST "https://www.partjava.com/conversations"
```

#### 获取对话历史

```bash
curl -X GET "https://www.partjava.com/conversations/{conversation_id}/history"
```

## 前端使用

前端界面提供了完整的聊天功能：

1. **发送消息**：在输入框中输入问题，按回车或点击发送按钮
2. **新对话**：点击"新对话"按钮开始新的对话
3. **对话历史**：侧边栏显示当前对话
4. **响应式设计**：支持桌面和移动设备

## 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `OPENAI_API_KEY` | - | OpenAI API密钥（必需） |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | 使用的AI模型 |
| `HOST` | `0.0.0.0` | 服务器主机地址 |
| `PORT` | `8000` | 服务器端口 |
| `DEBUG` | `True` | 调试模式 |

### AI模型配置

在 `config.py` 中可以调整AI模型的参数：

```python
# AI配置
MAX_TOKENS: int = 1000          # 最大token数
TEMPERATURE: float = 0.7        # 创造性（0-1）
TOP_P: float = 1.0             # 核采样参数
FREQUENCY_PENALTY: float = 0.0  # 频率惩罚
PRESENCE_PENALTY: float = 0.0   # 存在惩罚
```

## 部署说明

### 本地部署

1. 确保Python 3.8+已安装
2. 安装依赖：`pip install -r requirements.txt`
3. 配置OpenAI API密钥
4. 启动服务器：`python main.py`

### 生产环境部署

#### 使用Docker

创建 `Dockerfile`：

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

构建和运行：

```bash
docker build -t ai-chat .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key ai-chat
```

#### 使用Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 开发说明

### 添加新功能

1. 在 `models.py` 中定义数据模型
2. 在 `services/` 目录下创建服务模块
3. 在 `main.py` 中添加API路由
4. 更新前端界面（如需要）

### 扩展AI服务

可以轻松替换OpenAI服务为其他AI提供商：

1. 修改 `services/ai_service.py` 中的API调用
2. 更新配置文件中的相关设置
3. 调整数据模型以适配新的API响应格式

## 故障排除

### 常见问题

1. **API密钥错误**
   - 检查 `.env` 文件中的 `OPENAI_API_KEY` 是否正确
   - 确保API密钥有效且有足够的余额

2. **连接超时**
   - 检查网络连接
   - 确认OpenAI API服务可用

3. **CORS错误**
   - 检查 `config.py` 中的 `CORS_ORIGINS` 配置
   - 确保前端域名在允许列表中

### 日志查看

启动时添加详细日志：

```bash
uvicorn main:app --log-level debug
```

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本的AI问答功能
- 提供完整的API接口
- 包含现代化前端界面