# PartJava 智能学习平台

![平台首页全貌](https://github.com/partjava/i/blob/main/public/images/images/homepage-overview.png)

**个人学习项目，仅供学习参考，禁止商业用途**

| 项目 | 状态 |
|------|------|
| 在线地址 | [https://www.partjava.com](https://www.partjava.com) |
| 部署状态 | ✅ 生产环境运行中 |
| HTTPS | ✅ Let's Encrypt SSL |
| 服务器 | Linux + Nginx + PM2 |
| 数据库 | MySQL 8.0 + Redis |
| 后端 | Java 21 + Spring Boot 3.3 |

---

## 🌟 项目亮点

- **🤖 AI 3D 机器人**：Three.js + WebGL 原创史迪奇风格机器人
- **🐾 EyePet 虚拟宠物**：纯 SVG + CSS 实现，眼睛实时追踪鼠标
- **📊 3D 算法可视化**：覆盖 21 种算法的 Three.js 3D 动态演示
- **💻 在线代码执行**：Judge0 CE + Spring Boot 代理，支持 10 种语言沙箱运行
- **🏆 成就徽章系统**：15 个成就，数据驱动自动解锁
- **📈 数据可视化大屏**：ECharts 实时统计 + 学习热力图
- **🎨 中国水墨画 UI**：纯 SVG 山水/云雾/墨竹/飞鸟装饰
- **🔐 多层安全防护**：速率限制 + HTTP 安全头 + 输入校验

---

## 主要功能

### 1. 原创 AI 3D 机器人 & EyePet 虚拟宠物

AI 3D 机器人基于 Three.js + WebGL 原创实现，支持动画与交互控制面板。EyePet 纯 SVG 原创，眼睛追踪鼠标、随机眨眼、三种心情状态。

### 2. 3D 算法可视化系统

- **排序与搜索**：冒泡、快速、归并、堆排序、二分搜索等
- **数学与几何**：Mandelbrot 集、Lorenz 吸引子、Klein 瓶等
- **AI / ML 算法**：K-Means 聚类、线性回归、神经网络、决策树

### 3. 在线代码执行

基于 Monaco Editor（VS Code 同款内核），通过 Spring Boot 后端代理 Judge0 CE 云端执行引擎，支持 Python、JavaScript、Java、C++、Go 等 10 种语言。

### 4. 智能笔记系统

三级分类系统（主分类 → 技术分类 → 子分类）+ 多标签管理，Markdown 编辑、公开/私有设置、实时搜索、收藏评论、批量管理。

### 5. AI 智能助手

集成 DeepSeek API，全站右下角悬浮窗，支持 Markdown 渲染回复、历史会话持久化、一键保存为笔记。

### 6. 编程挑战宇宙

11 个阶段、星图关卡，包含选择题、代码题、AI 评分的思考题，排行榜系统激励学习。

### 7. 成就徽章系统

15 个成就，覆盖笔记撰写、连续打卡、社交互动等多个维度，后端自动分析行为数据解锁。

### 8. 四大学科学习内容

覆盖 **计算机基础、人工智能、软件工程、网络安全** 四大领域，每科数十个章节的图文学习内容，支持学习进度追踪。

### 9. 数据可视化大屏

ECharts 实时数据大屏 + 学习热力图（类 GitHub 贡献图风格），多维度展示学习行为。

### 10. 移动端体验

手势操作 + 底部导航 + PWA 支持 + 触觉反馈，接近原生 App 体验。

---

## 技术栈

### 前端
- **框架**：Next.js 14 (App Router) + React 18 + TypeScript
- **UI**：Ant Design 5.x + Tailwind CSS 3.x
- **3D**：Three.js + WebGL
- **代码编辑器**：Monaco Editor
- **可视化**：ECharts + D3.js
- **字体图标**：FontAwesome + Lucide React + Heroicons

### 后端
- **主后端**：Java 21 + Spring Boot 3.3
- **ORM**：MyBatis-Plus
- **安全**：Spring Security + JWT
- **数据库**：MySQL 8.0 + Redis
- **AI 服务**：Spring Boot 代理 DeepSeek API

### 部署
- **Web 服务器**：Nginx 反向代理
- **后端进程**：Spring Boot JAR（systemd）
- **前端进程**：PM2 管理 Next.js
- **SSL**：Let's Encrypt 自动续期

---

## 项目结构

```
partjava/
├── app/                          # Next.js 前端页面
│   ├── admin/                    # 管理后台
│   ├── auth/                     # 登录/注册/找回密码
│   ├── challenges/               # 编程挑战宇宙
│   ├── code/                     # 在线代码编辑器
│   ├── notes/                    # 智能笔记系统
│   ├── profile/                  # 个人中心
│   ├── study/                    # 四大学科学习内容
│   ├── components/               # 全局共享组件
│   └── _shared/                  # 内部共享组件/样式
├── partjava-backend/             # Spring Boot 后端
│   └── src/main/java/com/partjava/
│       ├── controller/           # REST API 控制器
│       ├── service/              # 业务逻辑层
│       ├── repository/           # 数据访问层 (MyBatis Mapper)
│       ├── entity/               # 数据库实体
│       ├── dto/                  # 数据传输对象
│       ├── common/               # 通用工具类
│       ├── config/               # 配置类 (Security/Redis/MyBatis)
│       └── game/                 # 小游戏模块 (井字棋/2048/五子棋)
├── scripts/                      # 数据库脚本
├── docs/                         # 设计文档
│   ├── frontend-design.md        # 前端设计方案
│   ├── backend-api.md            # 后端 API 接口文档
│   ├── database-fields.md        # 数据库字段文档
│   └── COLOR-SYSTEM.md           # 配色体系
└── public/                       # 静态资源
```

---

## 安装与运行

### 前提条件
- **Node.js** 18+
- **JDK** 21+
- **MySQL** 8.0+
- **Redis** 7.x

### 1. 克隆仓库
```bash
git clone https://github.com/partjava/i.git
cd i
```

### 2. 启动后端 (Spring Boot)
```bash
cd partjava-backend
./mvnw spring-boot:run
```
后端默认运行在 `http://localhost:8080`

### 3. 启动前端 (Next.js)
```bash
# 新开终端
cd i
npm install
npm run dev
```
前端默认运行在 `http://localhost:3000`

### 4. 环境变量

创建 `.env.local`：
```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=partjava_notes

# AI API
DEEPSEEK_API_KEY=your-deepseek-key

# Judge0 CE (在线代码执行)
JUDGE0_API_KEY=your-judge0-key
```

后端配置见 `partjava-backend/src/main/resources/application.yml`

### 5. 初始化数据库
```bash
node scripts/init-database.js
```

---

## API 架构

前端通过 Next.js Rewrites 将 `/api/*` 请求透明代理到 Spring Boot 后端（`localhost:8080`），前端代码无需感知后端地址。

所有 API 接口的完整文档见 [docs/backend-api.md](docs/backend-api.md)。

---

## 许可说明

**本项目为个人学习项目，仅供学习和参考使用。未经作者明确许可，禁止用于商业目的。**

Copyright © 2024-2026 PartJava

---

*最后更新：2026-06-30*
