# 在线代码编辑器配置指南

## 概述

这个在线代码编辑器基于 Judge0 CE (Community Edition) 构建，支持13种编程语言的在线编译和执行。

## 功能特性

### 🚀 支持的编程语言
- **Python** 3.8.1
- **JavaScript** (Node.js 12.14.0)
- **Java** (OpenJDK 13.0.1)
- **C++** (GCC 9.2.0)
- **C** (GCC 9.2.0)
- **Go** 1.13.5
- **PHP** 7.4.1
- **C#** (Mono 6.6.0.161)
- **Ruby** 2.7.0
- **Rust** 1.40.0
- **Kotlin** 1.3.70
- **Swift** 5.2.3
- **TypeScript** 3.7.4

### 🔧 核心功能
- 实时代码编译和执行
- 语法高亮和智能提示
- 执行时间和内存使用统计
- 多行输入输出支持
- 代码模板和示例
- 文件下载功能
- 错误提示和调试信息

## 生产环境配置

### 1. 获取 RapidAPI 密钥

1. 访问 [Judge0 CE API](https://rapidapi.com/judge0-official/api/judge0-ce/)
2. 注册或登录 RapidAPI 账户
3. 订阅 Judge0 CE 服务（有免费额度）
4. 复制您的 API 密钥

### 2. 配置环境变量

在项目根目录创建或更新 `.env.local` 文件：

```bash
# Judge0 CE API 配置
RAPIDAPI_KEY=your-rapidapi-key-here

# 其他现有配置...
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://www.partjava.com
# ...
```

### 3. 部署配置

#### Vercel 部署
```bash
# 设置环境变量
vercel env add RAPIDAPI_KEY

# 部署
vercel --prod
```

#### Docker 部署
```dockerfile
# 在 Dockerfile 中添加环境变量
ENV RAPIDAPI_KEY=your-rapidapi-key-here
```

#### 其他云平台
在相应平台的环境变量设置中添加 `RAPIDAPI_KEY`。

## 本地开发

### 演示模式
如果没有配置 `RAPIDAPI_KEY`，编辑器将在演示模式下运行：
- 显示模拟的执行结果
- 提供基本的代码编辑功能
- 显示演示模式标识

### 完整模式
配置 `RAPIDAPI_KEY` 后，编辑器将提供完整功能：
- 真实的代码编译和执行
- 准确的性能统计
- 完整的错误信息
- 支持所有13种编程语言

## API 使用限制

### 免费额度
- 每月 1000 次请求
- 每次执行最多 5 秒
- 内存限制 128MB

### 付费计划
- 更高的请求限制
- 更长的执行时间
- 更大的内存限制
- 优先级执行

## 安全特性

### 沙箱环境
- 代码在隔离的容器中执行
- 无法访问系统文件
- 网络访问受限
- 自动清理临时文件

### 执行限制
- 时间限制：最多 10 秒
- 内存限制：最多 128MB
- 输出限制：最多 1MB
- 并发限制：防止资源滥用

## 故障排除

### 常见问题

1. **API 密钥无效**
   - 检查 `.env.local` 文件中的 `RAPIDAPI_KEY`
   - 确认 RapidAPI 账户状态
   - 验证 Judge0 CE 服务订阅

2. **执行超时**
   - 检查代码是否有无限循环
   - 优化算法复杂度
   - 减少输入数据量

3. **内存不足**
   - 减少数据结构大小
   - 优化内存使用
   - 避免大量递归

4. **编译错误**
   - 检查语法错误
   - 确认语言版本兼容性
   - 查看错误信息详情

### 调试技巧

1. **查看详细错误**
   - 切换到"错误信息"标签页
   - 查看编译输出
   - 检查运行时错误

2. **使用模板**
   - 点击"加载模板"获取示例代码
   - 基于模板修改代码
   - 学习最佳实践

3. **分步调试**
   - 简化代码逻辑
   - 添加调试输出
   - 逐步增加功能

## 扩展开发

### 添加新语言支持

1. 在 `LANGUAGE_IDS` 中添加新语言：
```typescript
const LANGUAGE_IDS = {
  // 现有语言...
  'python': 71,
  // 新语言
  'scala': 81,
};
```

2. 更新前端语言列表：
```typescript
const languages = [
  // 现有语言...
  { value: 'scala', label: '🎭 Scala', color: '#dc322f' },
];
```

3. 添加代码模板：
```typescript
const templates = {
  // 现有模板...
  scala: `// Scala 示例
object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}`,
};
```

### 自定义主题

修改 `AdvancedCodeEditor.tsx` 中的主题配置：
```typescript
const themes = {
  dark: {
    background: 'bg-gray-900',
    text: 'text-green-400',
    border: 'border-gray-700'
  },
  light: {
    background: 'bg-white',
    text: 'text-gray-800',
    border: 'border-gray-300'
  }
};
```

## 性能优化

### 前端优化
- 使用 React.memo 减少重渲染
- 实现代码编辑器的懒加载
- 优化大文件的处理

### 后端优化
- 实现请求缓存
- 添加请求限流
- 优化 API 调用频率

### 用户体验
- 添加加载状态指示
- 实现离线模式
- 提供快捷键支持

## 许可证

本项目基于 MIT 许可证开源。Judge0 CE 基于 GNU General Public License v3.0。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系支持

如有问题，请通过以下方式联系：
- GitHub Issues
- 项目文档
- 社区论坛