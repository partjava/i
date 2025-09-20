# Judge0 API 配置指南

## 🚀 快速设置

### 1. 获取 RapidAPI 密钥

1. 访问 [Judge0 CE on RapidAPI](https://rapidapi.com/judge0-official/api/judge0-ce/)
2. 点击 "Subscribe to Test" 或 "Subscribe"
3. 选择 "Basic" 计划（免费）
4. 复制你的 API 密钥

### 2. 配置环境变量

在项目根目录创建或编辑 `.env.local` 文件：

```env
# RapidAPI Configuration for Judge0
RAPIDAPI_KEY=your-rapidapi-key-here
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
```

### 3. 测试配置

重启开发服务器，然后访问：
- GET `https://www.partjava.com/api/execute-code` - 查看支持的语言
- POST `https://www.partjava.com/api/execute-code` - 执行代码

## 📝 API 使用示例

### 请求格式

```json
{
  "code": "print('Hello, World!')",
  "language": "python"
}
```

### 响应格式

```json
{
  "success": true,
  "output": "Hello, World!\n",
  "error": "",
  "status": "Accepted",
  "time": 0.123,
  "memory": 1024
}
```

## 🔧 支持的语言

- JavaScript (Node.js)
- Python 3
- Java
- C++
- C
- C#
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin
- TypeScript

## 🎯 免费额度

Judge0 CE 免费计划提供：
- 每月 50 次请求
- 每次执行限制 2 秒
- 支持所有主流编程语言

## 🛠️ 故障排除

### 常见错误

1. **"请配置 RAPIDAPI_KEY 环境变量"**
   - 检查 `.env.local` 文件是否存在
   - 确认 `RAPIDAPI_KEY` 已正确设置

2. **"Judge0 API 错误"**
   - 检查 API 密钥是否有效
   - 确认还有剩余的免费额度

3. **"不支持的语言"**
   - 检查语言名称是否正确（小写）
   - 参考支持的语言列表

### 调试步骤

1. 访问 `GET /api/execute-code` 检查服务状态
2. 查看浏览器开发者工具的 Network 选项卡
3. 检查服务器日志中的错误信息