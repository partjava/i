# 在线代码执行服务配置指南

## 概述

为了在没有安装编程语言环境的服务器上运行代码，我们使用 **Judge0** 在线代码执行API。这是最合理的解决方案。

## 方案对比

### ❌ 传统方案（不推荐）
- 在服务器上安装所有编程语言环境
- 需要大量存储空间和维护成本
- 安全风险高
- 配置复杂

### ✅ Judge0 在线API（推荐）
- 无需在服务器上安装任何编程语言
- 支持60+种编程语言
- 安全沙箱执行
- 免费使用（有限制）
- 配置简单

## 配置步骤

### 1. 获取 RapidAPI 密钥

1. 访问 [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce/)
2. 注册/登录 RapidAPI 账户
3. 订阅 Judge0 CE（免费版本）
4. 复制你的 API 密钥

### 2. 配置环境变量

在你的 `.env.local` 文件中添加：

```env
# 在线代码执行服务配置
RAPIDAPI_KEY=your-rapidapi-key-here
```

### 3. 重启应用

```bash
npm run dev  # 开发环境
# 或
npm start    # 生产环境
```

## 使用限制

### 免费版限制
- 每月 1000 次请求
- 每个请求最大 20KB 代码
- 执行时间限制 10 秒
- 内存限制 128MB

### 付费版本
- 更高的请求限制
- 更大的代码大小限制
- 更长的执行时间
- 更多内存

## 支持的编程语言

Judge0 支持以下语言（部分列表）：

- **Python** 3.8.1
- **JavaScript** (Node.js 12.14.0)
- **Java** (OpenJDK 13.0.1)
- **C++** (GCC 9.2.0)
- **C** (GCC 9.2.0)
- **Go** 1.13.5
- **PHP** 7.4.1
- **C#** (.NET Core 3.1.201)
- **Ruby** 2.7.0
- **Rust** 1.40.0
- 还有50+种其他语言...

## 降级方案

如果没有配置 RapidAPI 密钥，系统会自动降级到本地执行：

- **支持**：Python、JavaScript（如果服务器上已安装）
- **不支持**：Java、C++、C、Go、PHP等（会显示错误提示）

## 错误处理

### 常见错误及解决方案

1. **"需要配置 RapidAPI 密钥"**
   - 按照上述步骤配置 RAPIDAPI_KEY

2. **"API 请求失败"**
   - 检查网络连接
   - 验证 API 密钥是否正确
   - 检查是否超出请求限制

3. **"代码执行超时"**
   - 优化代码逻辑
   - 避免无限循环
   - 减少计算复杂度

## 安全特性

- **沙箱执行**：代码在隔离环境中运行
- **资源限制**：自动限制内存和执行时间
- **网络隔离**：无法访问外部网络
- **文件系统隔离**：无法访问服务器文件

## 成本估算

### 免费使用
- 适合个人学习和小型项目
- 每月1000次请求通常足够

### 付费升级
- Basic: $10/月 - 10,000次请求
- Pro: $50/月 - 100,000次请求
- Enterprise: 联系定价

## 部署建议

### 开发环境
```bash
# 1. 配置环境变量
echo "RAPIDAPI_KEY=your-key-here" >> .env.local

# 2. 重启开发服务器
npm run dev
```

### 生产环境
```bash
# 1. 在服务器上设置环境变量
export RAPIDAPI_KEY=your-key-here

# 2. 或在 .env.local 中配置
echo "RAPIDAPI_KEY=your-key-here" >> .env.local

# 3. 重启应用
pm2 restart partjava
```

## 监控和维护

### 监控 API 使用量
1. 登录 RapidAPI 控制台
2. 查看 Judge0 API 使用统计
3. 设置使用量警报

### 性能优化
- 缓存常见代码执行结果
- 实现请求队列避免并发限制
- 监控响应时间

## 故障排除

### 检查配置
访问 `/api/execute-code` (GET) 查看当前配置：

```json
{
  "execution_mode": "online",
  "rapidapi_configured": true,
  "available_languages": ["python", "javascript", "java", "cpp", "c", "go", "php"],
  "note": "使用 Judge0 在线代码执行服务，支持所有语言"
}
```

### 测试连接
```bash
curl -X GET "https://your-domain.com/api/execute-code"
```

## 总结

使用 Judge0 在线API是最合理的解决方案：

✅ **优点**
- 无需服务器配置
- 支持所有主流语言
- 安全可靠
- 配置简单

❌ **缺点**
- 依赖外部服务
- 有使用限制
- 需要网络连接

**推荐指数：⭐⭐⭐⭐⭐**

这是目前最佳的在线代码执行解决方案！ 