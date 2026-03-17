# PartJava 智能学习平台

![平台首页全貌](https://github.com/partjava/i/blob/main/public/images/images/homepage-overview.png)

**个人学习项目，仅供学习参考，禁止商业用途**

## 🔑 测试账号

- **账号**：example@qq.com
- **密码**：******
- **在线地址**：[https://partjava.com](https://partjava.com)

---

## 🌟 项目亮点

- **🤖 AI 3D 机器人**：基于 Three.js + WebGL 自主开发，袋子学长风格，通过代码构建
- **� 原创 EyePet 虚拟宠物**：纯 SVG + CSS 实现，眼睛实时追踪鼠标，随机眨眼，三种心情状态自动切换
- **📊 3D 算法可视化**：覆盖排序/搜索、数学曲线、AI/ML 共 20+ 种算法的 Three.js 3D 动态演示
- **� 真实在线代码执行**：集成 Judge0 CE，支持 Python、Java、C++、Go 等 10 种语言真实沙箱运行
- **🏆 成就徽章系统**：15 个成就，数据驱动自动解锁，覆盖笔记、打卡、社交多维度
- **📱 移动端手势交互**：左滑开菜单、右滑返回、双击回顶、触觉反馈，PWA 支持
- **📈 数据可视化大屏**：ECharts 实时统计 + 学习热力图（类 GitHub 贡献图风格）
- **🃏 翻转卡片工具导航**：桌面悬停/移动端点击翻转，15+ 技术领域工具直达

---

## 📖 项目简介

PartJava 智能学习平台是一个面向计算机学习者的综合性在线学习平台，集成了 AI 智能助手、3D 可视化、在线代码执行、智能笔记管理等核心功能，覆盖 15 个技术领域，通过现代化 Web 技术和人工智能为学习者提供系统化、沉浸式的编程学习体验。

---

## 主要功能

### 1. 原创 AI 3D 机器人 & EyePet 虚拟宠物

![3D机器人展示](https://github.com/partjava/i/blob/main/public/images/images/robot-3d.png)

![EyePet虚拟宠物](https://github.com/partjava/i/blob/main/public/images/images/eyepet.png)

- AI 3D 机器人：Three.js + WebGL 原创实现，史迪奇风格，流畅动画与交互控制面板
- EyePet：纯 SVG 原创，眼睛追踪鼠标、随机眨眼、三种心情（开心/好奇/困倦）、弹跳漂浮动画

### 2. 3D 算法可视化系统

![算法可视化](https://github.com/partjava/i/blob/main/public/images/images/algo-3d-demo.png)

- **排序与搜索**：冒泡、快速、归并、堆排序、插入、选择排序，二分搜索、线性搜索、斐波那契
- **数学与几何**：正弦波、螺旋线、Mandelbrot 集、Lorenz 吸引子、3D 波浪、环面、Klein 瓶
- **AI / ML 算法**：K-Means 聚类、线性回归、神经网络、梯度下降、决策树

### 3. 在线代码执行

![在线代码编辑器](https://github.com/partjava/i/blob/main/public/images/images/code-editor.png)

![代码执行结果](https://github.com/partjava/i/blob/main/public/images/images/code-execution-result.png)

集成 Judge0 CE 云端代码执行引擎，Monaco Editor（VS Code 同款内核），支持 Python、JavaScript、Java、C++、C、Go、PHP、Rust、C#、TypeScript 共 10 种语言，支持标准输入，返回运行时间与内存占用。

### 4. 智能笔记系统

![笔记管理](https://github.com/partjava/i/blob/main/public/images/images/notes-management.png)

- 三级分类系统（主分类 → 技术分类 → 子分类）+ 多标签管理
- Markdown 富文本编辑、公开/私有设置、实时搜索（防抖优化 + 结果高亮）
- 收藏、评论、批量删除、笔记同步

### 5. AI 智能助手

![AI聊天助手](https://github.com/partjava/i/blob/main/public/images/images/ai-chat.png)

集成 DeepSeek API，支持多轮对话，历史会话数据库持久化，Python FastAPI 服务 Docker 容器化独立部署。

### 6. 数据可视化大屏

![数据可视化大屏](https://github.com/partjava/i/blob/main/public/images/images/data-dashboard.png)

ECharts 实时数据大屏 + 学习热力图，多维度展示平台统计数据与用户学习行为。

### 7. 成就徽章系统

![成就系统](https://github.com/partjava/i/blob/main/public/images/images/achievements.png)

15 个成就，覆盖笔记（1/10/50/100篇）、连续打卡（7/30/100天）、早起鸟儿、夜猫子、社交互动、特殊成就，后端自动分析行为数据解锁。

### 8. 编程挑战

![编程挑战](https://github.com/partjava/i/blob/main/public/images/images/coding-challenges.png)

![排行榜](https://github.com/partjava/i/blob/main/public/images/images/leaderboard.png)

在线编程挑战题目 + 排行榜系统，激励持续学习。

### 9. 个人中心

![个人中心](https://github.com/partjava/i/blob/main/public/images/images/user-profile.png)

学习时长统计、成就徽章、笔记数量、学习热力图，支持头像上传（自动压缩）、资料修改、数据导出。

### 10. 移动端体验

![移动端界面](https://github.com/partjava/i/blob/main/public/images/images/mobile-view.png)

手势操作（左边缘右滑开菜单、右滑返回、双击顶部回顶）+ 触觉反馈 + 底部导航栏 + PWA 支持。

### 11. 15 个技术领域学习内容

![学习内容导航](https://github.com/partjava/i/blob/main/public/images/images/study-navigation.png)

Java、Python、C++、Go、PHP、前端、后端、数据库、人工智能、网络安全、软件工程、操作系统、网络技术、物联网、数据结构，每个领域配备独立学习页面与项目实战。

---

## 技术栈

### 前端
- **框架**：Next.js 14 App Router、React 18、TypeScript
- **UI**：Ant Design + Tailwind CSS
- **3D 渲染**：Three.js + WebGL
- **代码编辑器**：Monaco Editor
- **数据可视化**：ECharts
- **PWA**：Service Worker + Web App Manifest

### 后端
- **认证**：NextAuth.js（JWT 30天、bcrypt 加密）
- **数据库**：MySQL 8.0 + 连接池
- **缓存**：Redis
- **AI 服务**：Python FastAPI + DeepSeek API（Docker 容器化）
- **代码执行**：Judge0 CE API（RapidAPI）

### 部署
- **Web 服务器**：Nginx 反向代理
- **进程管理**：PM2
- **容器化**：Docker（AI 服务）
- **SSL**：Let's Encrypt 自动续期

---

## 安装与运行

### 前提条件
- Node.js 18+
- MySQL 8.0+
- Python 3.9+（AI 服务）

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/partjava/i.git
cd i
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量，创建 `.env.local`：
```env
DATABASE_URL="mysql://username:password@localhost:3306/partjava"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
DEEPSEEK_API_KEY="your-deepseek-api-key"
RAPIDAPI_KEY="your-rapidapi-key"
```

4. 初始化数据库
```bash
node scripts/init-database.js
```

5. 启动开发服务器
```bash
npm run dev
```

6. 启动 AI 服务（新终端）
```bash
cd partjava-ai
pip install -r requirements.txt
python main.py
```

---

## 📁 项目结构

```
partjava/
├── app/
│   ├── api/                # API 路由
│   ├── components/         # 共享组件
│   ├── lib/
│   │   ├── repositories/   # 数据访问层
│   │   └── services/       # 业务逻辑层
│   └── [各页面目录]/
├── partjava-ai/            # AI 服务（Python FastAPI）
├── public/                 # 静态资源
├── scripts/                # 数据库脚本
└── README.md
```

---

## 生产环境

| 项目 | 状态 |
|------|------|
| 在线地址 | https://www.partjava.com |
| 部署状态 | ✅ 生产环境运行中 |
| HTTPS | ✅ Let's Encrypt SSL（自动续期） |
| 服务器 | Linux + Nginx + PM2 |
| 数据库 | MySQL 8.0 |
| 版本 | v1.3.0 |

---

## 许可说明

**本项目为个人学习项目，仅供学习和参考使用。未经作者明确许可，禁止用于商业目的。**

Copyright © 2024-2026 PartJava

---

*最后更新：2026年3月17日*
