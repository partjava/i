# PartJava 前端设计方案

> 版本: 1.0 | 最后更新: 2026-06-30

---

## 一、技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript 5.x |
| 样式 | Tailwind CSS 3.x + Ant Design 5.x |
| 状态管理 | React Hooks + Context API |
| 认证 | JWT (通过后端 Spring Boot) |
| 代码编辑器 | Monaco Editor |
| 3D/可视化 | Three.js + D3.js + ECharts |
| 字体图标 | FontAwesome + Lucide React + Heroicons |

---

## 二、项目目录结构

```
app/
├── admin/              # 管理后台页面
├── auth/               # 认证页面 (登录/注册/找回密码)
├── challenges/         # 编程挑战宇宙
├── code/               # 在线代码编辑器 Playground
├── notes/              # 随堂笔记系统
├── profile/            # 个人中心
├── study/              # 学习内容 (四大科目)
│   ├── ai/             # 人工智能
│   ├── computer/       # 计算机基础
│   ├── se/             # 软件工程
│   └── security/       # 网络安全
├── api/                # (已废弃) 旧 Next.js API 路由，现已由 Spring Boot 取代
├── components/         # 全局共享组件
├── _shared/            # 内部共享组件/样式
├── layout.tsx          # 根布局
└── page.tsx            # 首页
```

---

## 三、页面路由总览

### 3.1 公开页面

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | HeroSection + 功能展示 |
| `/auth/login` | 登录 | JWT 登录表单 |
| `/auth/register` | 注册 | 新用户注册 |
| `/auth/forgot-password` | 找回密码 | 邮箱验证重置密码 |

### 3.2 笔记系统

| 路由 | 页面 | 说明 |
|------|------|------|
| `/notes` | 笔记列表 | 分类筛选、搜索、分页 |
| `/notes/[id]` | 笔记详情 | Markdown渲染、评论、点赞收藏 |
| `/notes/[id]/edit` | 笔记编辑 | Monaco编辑器 + Markdown |

### 3.3 编程挑战

| 路由 | 页面 | 说明 |
|------|------|------|
| `/challenges` | 挑战宇宙 | 星空关卡图、进度总览 |
| `/code` | 代码编辑器 | Playground模式 |
| `/code/editor` | 高级编辑器 | Monaco完整版 |

### 3.4 个人中心

| 路由 | 页面 | 说明 |
|------|------|------|
| `/profile` | 个人主页 | 学习统计、热力图、成就 |
| `/profile/[id]` | 他人主页 | 公开信息展示 |
| `/profile/bookmarks` | 收藏夹 | 收藏的笔记列表 |

### 3.5 学习内容 (四大学科)

| 路由模式 | 说明 |
|----------|------|
| `/study/computer/**` | 计算机基础 (约80+页面) |
| `/study/ai/**` | 人工智能 (ML/DL/NLP/CV/数据挖掘) |
| `/study/se/**` | 软件工程 (安卓/IoT/架构等) |
| `/study/security/**` | 网络安全 (密码学/逆向/区块链等) |

### 3.6 管理后台

| 路由 | 说明 |
|------|------|
| `/admin` | 用户管理、挑战审核、系统监控 |

---

## 四、核心组件架构

### 4.1 全局组件 (`app/components/`)

| 组件 | 功能 |
|------|------|
| `Navbar` | 顶部导航 |
| `BottomNavigation` | 移动端底部导航 |
| `Sidebar` | 桌面端侧栏 |
| `AIChat` | AI助手对话面板 |
| `AI3DRobot` | 3D AI机器人动画 |
| `GlobalSearch` | 全局搜索 |

### 4.2 笔记系统组件

| 组件 | 功能 |
|------|------|
| `MarkdownEditor` | Markdown编辑 + 预览 |
| `CommentSection` | 评论 + 回复树 |
| `FlipCard` | 翻转卡片效果 |
| `BookCover` | 书本封面组件 |
| `BookContent` | 书本内容页面 |

### 4.3 挑战系统组件

| 组件 | 功能 |
|------|------|
| `QuizWorkspace` | 关卡答题工作区 |
| `MonacoCodeEditor` | 代码编辑器 |
| `StarBackground` | 星空背景动画 |
| `SvmVisualizer` | SVM可视化 |
| `KnowledgeTree` | 知识树 |
| `LeaderboardDrawer` | 排行榜抽屉 |

### 4.4 学习追踪组件

| 组件 | 功能 |
|------|------|
| `LearningHeatmap` | 学习热力图 (类似GitHub贡献图) |
| `StudyProgressBar` | 学习进度条 |
| `RealTimeLearningTracker` | 实时学习追踪 |

### 4.5 学习页面共享组件 (`app/_shared/`)

| 组件/模块 | 功能 |
|-----------|------|
| `components/ui/book/` | 书本翻页动画组件 (BookCover, BookSpread, BookContent) |
| `components/ui/book/theme.ts` | 四大学科配色主题 |
| `styles/globals.css` | 全局样式 + 暗色模式 |

---

## 五、前端调用后端 API 方式

### 5.1 Rewrites 代理 (生产环境)

生产环境中通过 `next.config.js` 中的 rewrites，将 `/api/*` 请求透明转发到 Spring Boot 后端:

```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/api/:path*',
    },
  ]
}
```

### 5.2 开发环境

开发时前端通过 `localhost:3000` 访问，Next.js dev server 自动将 `/api/*` 请求代理至 `localhost:8080`。

### 5.3 认证方式

- 登录后从后端获取 JWT Token
- 前端将 Token 存储在 `localStorage`/`cookie` 中
- 后续请求在 `Authorization` 头携带 `Bearer <token>`
- 后端 JwtAuthenticationFilter 解析 token 并注入 `userId` 属性

---

## 六、状态管理策略

| 数据类型 | 管理方式 |
|----------|----------|
| 用户认证状态 | Context API + localStorage |
| 笔记数据 | 页面级 fetch，每次加载 |
| 挑战进度 | 页面级 fetch + 缓存 |
| 学习计时 | Context API (实时追踪) |
| UI 主题/暗色模式 | CSS 变量 + body.dark 选择器 |

---

## 七、路由与侧栏内容数据结构

四大学科的学习内容通过静态页面路由 + Sidebar JSON 数据驱动。教学内容页面使用 `BookContent` 组件统一渲染，支持:

- Markdown 正文渲染
- LaTeX 数学公式
- 代码语法高亮
- 导航翻页功能

---

## 八、前端构建与部署

```bash
# 开发
npm run dev

# 构建 standalone 产物
npm run build

# 启动 (需要 .next/standalone)
npm run start:standalone

# 代码检查
npm run lint
```
