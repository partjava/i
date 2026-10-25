# PartJava 智能学习平台

<!-- 首页全景图：待新截图后放回 public/images/images/ 并恢复此行 -->

> **2026 传智杯 · AI Web 网页开发挑战赛参赛作品** —— AI Native 编程学习平台：3D AI 伴侣「禾桔」以 Function Calling Agent 驱动站内 RAG 检索、联网深搜、笔记提炼与 3D 神态控制。

## 团队信息

| 项目 | 内容 |
|------|------|
| 团队名称 | **Syntora** |
| 队长 | 贺思涵 |
| 组员 | 宋维维、周子轩 |
| 所属院校 | 武汉晴川学院 |
| 参赛编号 | 1952552 |

## 项目状态

| 项目 | 状态 |
|------|------|
| 在线地址 | [https://www.partjava.com](https://www.partjava.com) |
| 评审测试账号 | `example@qq.com` / `123456` |
| 部署状态 | ✅ 生产环境运行中 |
| HTTPS | ✅ Let's Encrypt SSL |
| 服务器 | Linux + Nginx + PM2 |
| 数据库 | MySQL 8.0 + Redis |
| 后端 | Java 21 + Spring Boot 3.3 |

## 🌟 项目亮点

- **🤖 Function Calling AI Agent**：3D 黑猫「禾桔」由 plan → act → observe 自主决策循环驱动，站内领航 / 联网深搜 / 自动写笔记 / 3D 神态控制四大工具由 LLM 自主调度，执行轨迹实时可视化
- **🔍 端云协同 RAG**：全站课程页向量化（特征哈希 TF-IDF）构建检索索引，混合打分（0.6×余弦 + 0.4×标题词面），Next.js 与 Python 双端共享同一向量空间
- **🔌 MCP 协议支持**：四大 AI 工具同时以 MCP 标准 Server 暴露（`partjava-ai/mcp_server.py`），可被 Claude Desktop / Cursor 等任意 MCP 客户端挂载
- **🎙️ 多模态交互**：Web Speech API 语音输入 + TTS 朗读；Transformers.js 浏览器端语义缓存（相似问题离线秒回）
- **💻 在线代码执行**：Judge0 CE + Spring Boot 代理，支持 10 种语言沙箱运行
- **🐾 3D 算法可视化**：排序/数学曲面/AI 算法的 Three.js 3D 动态演示
- **🏆 成就徽章系统**：事件驱动架构，学习行为自动解锁成就
- **📈 数据可视化大屏**：ECharts 实时统计 + 学习热力图
- **🎨 中国水墨画 UI**：纯 SVG 山水/云雾/墨竹/飞鸟装饰
- **🔐 多层安全防护**：密钥全环境变量化 + 速率限制 + HTTP 安全头 + 输入校验 + 优雅降级

---

## 主要功能

### 1. Function Calling Agent 助手（3D 黑猫「禾桔」）

全站右下角悬浮的 3D 像素黑猫，由 `partjava-ai`（Python FastAPI）与 Next.js 内置 Agent 引擎双层驱动：
- **自主决策**：LLM 通过 Function Calling 自主决定调用哪些工具、什么参数，最多 4 轮工具循环
- **四大工具**：站内课程 RAG 检索 / 联网权威检索与正文抓取 / 结构化笔记提炼 / 3D 猫神态控制
- **执行轨迹可视化**：每一步 plan（💭）→ act（⚡）→ observe（✓）实时展示在前端面板
- **三级降级**：FastAPI 服务 → Next.js 内置引擎 → 离线本地智能回复（UI 明确标注「离线降级模式」）

### 2. 端云协同 RAG 知识检索

- **索引构建**：`node scripts/build-rag-index.mjs` 扫描全站课程页，抽取文本 → 中文 bigram + 英文词分词 → FNV-1a 特征哈希到 4096 维 → TF-IDF 加权归一化
- **混合检索**：0.6 × 向量余弦 + 0.4 × 标题词面匹配，低置信自动回落关键词层
- **端侧语义缓存**：浏览器内 Transformers.js（multilingual-e5-small）对问答对做语义匹配，命中即离线秒回

### 3. MCP 标准工具服务

```bash
cd partjava-ai && python mcp_server.py   # stdio 传输的 MCP Server
```
暴露 `search_site_pages` / `web_search` / `draft_note` / `set_companion_state` 四个工具，配置到任意 MCP 客户端即可调用。

### 4. 在线代码执行

基于 Monaco Editor（VS Code 同款内核），Spring Boot 后端代理 Judge0 CE 云端执行引擎，支持 Python、JavaScript、Java、C++、Go 等 10 种语言。

### 5. 智能笔记系统

三级分类 + 多标签管理，Markdown 编辑、公开/私有设置、实时搜索、收藏评论；AI 一键把当前页面/对话提炼为结构化笔记草稿。

### 6. 编程挑战宇宙

11 个阶段、星图关卡，包含选择题、代码题、AI 评分的思考题，排行榜系统激励学习。

### 7. 其他

成就徽章系统（15 个）、四大学科图文学习内容（进度追踪）、ECharts 数据大屏、学习热力图、移动端手势 + PWA + 触觉反馈。

---

## 技术架构

### 总体架构

```
浏览器
 ├─ Next.js 前端（App Router · React 18 · TypeScript strict）
 │   ├─ AI 书房：Three.js WebGL 渲染 + SSE 流式对话 + Web Speech 语音
 │   ├─ Sanctuary 开屏：iframe 嵌入独立 WebGL 单页应用
 │   └─ middleware：按 IP + 路径的内存限流、HTTPS 跳转
 ├─ Next.js API 层
 │   ├─ Agent 引擎：Function Calling 循环 + RAG 检索（SSE 输出）
 │   └─ /api/* 透明代理 → Spring Boot
 ├─ Python FastAPI Agent 服务（与内置引擎同构互备）+ MCP Server
 └─ Spring Boot 后端（业务 + JWT 安全 + 服务端权威游戏引擎）
      ├─ MySQL 8 / Redis
      └─ DeepSeek API · Judge0 代码沙箱
```

### 页面与模块的实现方式

**首页与 Sanctuary 开屏**
首屏是一个独立的 WebGL 单页应用（`public/sanctuary/`），按场景、音频、全息书、桌面配饰、导演控制器等模块组织，经 iframe 嵌入首页并与主站通过 postMessage 通信：滚轮事件穿透到外层滚动容器、`IntersectionObserver` 检测滚出视口后通知内层暂停渲染释放 GPU。首屏以下是统计卡（接口失败自动隐藏的容错设计）、学习分类 mega menu、全局快速搜索、以「桌面文件夹」为隐喻的工具导航舞台（容器支持拖拽调整宽度与内容密度），整体视觉由程序化生成的 SVG 水墨装饰（山水/云雾/墨竹/飞鸟）贯穿收尾。

**学习内容（四大领域课程体系）**
课程内容以结构化数据常量描述，由统一的书籍 UI 体系渲染——封面、翻页 spreads、正文版式、主题令牌分层组件，新增课程只需添加数据、无需编写布局。每个学习页由布局层自动注入学习追踪器：定时轮询上报学习时长，页面关闭时用 `sendBeacon` 兜底，保证时长统计不丢失；学习进度写入 `study_progress` 表驱动进度面板。课程页内置自研截图标注编辑器：html2canvas 采集 + Canvas 命令栈模式（每步操作是栈上的命令对象，天然支持撤销/重做），画笔、矩形、箭头、文字、剪贴板粘贴皆为实现该接口的命令。

**AI 书房（3D 伴侣「禾桔」）**
原生 Three.js 实现，不依赖 react-three-fiber：受限 OrbitControls + ACES 色调映射 + 双侧轮廓光构成摄影棚布光，灯光颜色/强度/曝光作为「情绪参数」随对话状态（思考/联网/发言/庆祝）逐帧插值。猫本体是 GLB 模型经 `buildRiggedCatFromGLB` 重装：自定义 shader 实现炭黑绒毛、Fresnel 逆光银边、Canvas 纹理绘制的像素五官；呼吸、转头、动耳、摇尾等动画全部在**顶点着色器**中按蒙皮权重变形完成，表面绒毛簇是 InstancedMesh，其材质注入同一套变形逻辑——毛根锚点与身体逐顶点同步，毛向随旋转矩阵转动。灵气系统包括：注意力状态机（输入时看输入框、语音时侧耳、无操作时打瞌睡被唤醒）、空闲微动作导演、射线检测的摸猫分区反馈、基于 localStorage 的亲密度记忆（影响微动作频率并注入对话上下文）。对话层为 SSE 流式渲染，Agent 的 plan → act → observe 每一步实时进入执行轨迹面板，思维气泡通过嘴部三维坐标的实时投影定位在猫头顶。

**3D 算法可视化实验室（`visualizer/` 插件体系）**
算法执行与渲染彻底解耦的注册表架构：每个算法实现为两个纯函数——`generateSteps` 把算法执行过程预生成为步骤序列（数据），`render` 把单个步骤渲染到 THREE.Group（视图）；`SceneManager` 独立管理场景/光照/阴影/相机的生命周期与自适应，HUD 徽章与光效由 Canvas 纹理精灵缓存提供。播放控制只是步骤数组上的游标（步进/暂停/变速），新增算法只需在领域模块里实现两个函数并注册。领域模块覆盖排序与查找、数据结构（AVL/BST/图遍历/动态规划）、数学曲面（Mandelbrot/Lorenz/环面/Klein 瓶等参数曲面网格）与机器学习（K-Means/梯度下降/神经网络/决策树/SVM/PCA/Transformer），嵌入代码沙箱页供边学边验证。

**编程挑战宇宙**
星图关卡地图采用 DOM 变换布局，星空与星尘是两层 Canvas 粒子（`StarBackground`/`SpaceDust`）；题目体系分离为数据文件（阶段/关卡/测验结构化定义），渲染层包含知识树、测验工作台、Monaco 代码面板、AI 导师侧栏与 SVM 等算法可视化组件；思考题由后端调用大模型按题目自带评分 Prompt 输出结构化分数与评语，数学公式经 remark-math/rehype-katex 渲染。

**在线代码沙箱**
Monaco Editor 封装为受控组件，运行链路为前端提交 → Spring Boot 代理 Judge0 CE（异步轮询取结果 + Base64 解码）→ 返回 stdout/耗时/内存，支持标准输入与多种语言。

**笔记系统**
列表/详情/编辑三段式，Markdown 全程 ReactMarkdown 渲染，三级分类 + 多标签筛选。特色在与 AI 的闭环：对话中一句话生成结构化笔记草稿（标题/分类/标签由模型产出并经多层 JSON 容错解析），预览弹窗微调后一键入库，形成「学 → 问 → 记」的最短路径。

**个人中心与数据可视化**
ECharts 驱动学习热力图（类 GitHub 贡献图）与折线/饼/雷达多维度统计；成就是事件驱动架构——用户行为发布为 Spring 事件，监听器自动判定解锁条件并落库，前端只消费结果。

**游戏中心（服务端权威架构）**
游戏逻辑全部运行在 Java 引擎层：`GameEngine` 基类派生实时与回合制两类引擎，实时类（贪吃蛇/俄罗斯方块等）由服务端按 tick 演进状态并经 SSE 逐帧下发，回合类（数独/五子棋等）按步计算校验；前端 Canvas 只负责渲染与输入采集，另配 TypeScript 物理模块处理本地手感。逻辑在服务端意味着天然防作弊，且同一引擎可服务任意客户端。

**管理后台**
按 Dashboard / 用户 / 挑战 / 笔记分 Tab，另有系统健康监控与服务端终端控制台（走 ADMIN 角色鉴权的专用接口）。

**移动端与 PWA**
底部导航 + 边缘手势（滑动返回/呼出菜单）+ Vibration API 触觉反馈；Service Worker 采用版本化缓存策略——静态资源缓存优先、动态页面网络优先、API 永不缓存、离线页预缓存，断网时可优雅降级到离线提示页。

### 服务端实现

**Next.js API 层（TypeScript）**
`/api/ai/agent/stream` 先代理 FastAPI 服务（超时快速失败），不可用时无缝切换到内置 Agent 引擎——两套引擎共用同一工具 Schema、SSE 事件协议与 RAG 向量空间（`lib.ts` 纯逻辑层，RAG 检索/工具执行器在此并接受单测）。RAG 索引由构建脚本扫描课程页生成：中文二元分词 + 英文词元 → FNV-1a 特征哈希到固定维度 → 次线性 TF-IDF 加权归一化，检索时混合「向量余弦 + 标题词面」打分，低置信自动回落关键词层。端侧模块通过 `webpackIgnore` 的运行时 CDN import 加载 Transformers.js，完全不进构建产物。

**Python FastAPI Agent 服务（`partjava-ai/`）**
模块化组织：调度循环（router）、站内领航（navigator）、笔记提炼（notewriter）、联网检索（websearch）、3D 伴侣状态（companion）、向量检索（rag_index）。工具层同时以 **MCP 标准 Server**（stdio 传输，兼容 MCP SDK 两代 API）暴露，可被 Claude Desktop / Cursor 等客户端直接挂载。密钥统一从私有数据仓的 dotenv 加载，代码零硬编码。

**Spring Boot 后端（Java 21）**
经典分层（controller / service / repository + MyBatis-Plus），安全上 JWT 无状态认证 + BCrypt + 默认拒绝的路由策略（显式放行公开只读接口）、生产环境经环境变量关闭 Swagger。成就系统用 Spring 事件解耦；游戏包独立成 controller/engine/model/service/store 完整子系统；数据库结构变更在启动期由迁移配置器执行。

### 数据与本地资产

- **MySQL**：业务库（建表语句见 `scripts/schema.sql`，与数据分离）
- **Redis**：高频查询缓存
- **RAG 索引**：`rag-index.json` 为构建产物，课程变更后一条命令重建
- **浏览器本地**：主题偏好、禾桔亲密度、端侧语义缓存（向量化的问答对）
- **密钥**：全部环境变量注入，真实值仅存于私有数据仓

### 关键依赖与用途

| 依赖 | 在项目中的用途 |
|------|----------------|
| next / react / typescript | App Router 框架与 strict 类型底座 |
| antd / tailwindcss | 企业级组件 + 原子化样式双体系；全局语义色彩令牌驱动主题 |
| three | AI 书房与 Sanctuary 的 WebGL 渲染 |
| @monaco-editor/react | 在线代码编辑器内核 |
| echarts | 热力图与统计大屏 |
| framer-motion | 界面过渡与微交互动画 |
| react-markdown + remark/rehype 系 | 对话流、笔记、课程内容的 Markdown 与公式、代码高亮渲染 |
| html2canvas / qrcode | 截图编辑器采集 / 笔记分享二维码 |
| fastapi / uvicorn / httpx / mcp | Python Agent 服务与 MCP Server |
| spring-boot / mybatis-plus / jjwt / spring-security | 后端框架、ORM、JWT、安全 |

---

## 安装与运行

### 前提条件
- **Node.js** 18+（建议 20）
- **JDK** 21+、**Maven** 3.8+
- **MySQL** 8.0+、**Redis** 7.x
- （可选）Python 3.10+ —— 启动 FastAPI 智能体服务

### 1. 克隆仓库
```bash
git clone https://github.com/partjava/i.git
cd i
```

### 2. 初始化数据库
```bash
mysql -u root -p -e "CREATE DATABASE partjava_notes DEFAULT CHARACTER SET utf8mb4"
mysql -u root -p partjava_notes < scripts/schema.sql
```

### 3. 启动后端（Spring Boot）
```bash
cd partjava-backend
DB_USER=root DB_PASSWORD=你的密码 JWT_SECRET=一个至少32字节的随机串 mvn spring-boot:run
```
后端默认运行在 `http://localhost:8080`。
> `JWT_SECRET` 未配置时也能启动（自动生成一次性随机密钥），但重启后登录态失效；生产环境必须显式配置。

### 4. 启动前端（Next.js）
```bash
# 新开终端，回到仓库根目录
npm install
cp .env.example .env.local   # 填入 DEEPSEEK_API_KEY 等
npm run dev
```
前端默认运行在 `http://localhost:3000`。

### 5. （可选）启动 Python 智能体服务
```bash
cd partjava-ai
pip install -r requirements.txt
python main.py               # FastAPI :8000
# 或 MCP Server：python mcp_server.py
```
> 未启动时前端自动走 Next.js 内置 Agent 引擎，功能完整等价（双层冗余设计）。

### 6. （可选）重建 RAG 索引
```bash
node scripts/build-rag-index.mjs
```
> 仓库已附带构建好的 `app/_shared/data/rag-index.json`，仅在课程内容变更后需要重建。

### 环境变量

完整模板见 [`.env.example`](.env.example)：数据库、`JWT_SECRET`、`DEEPSEEK_API_KEY`、`FASTAPI_AGENT_URL`、`JUDGE0_API_KEY` 等。
**所有密钥仅通过环境变量注入，源码与仓库中不含任何真实密钥。**

---

## 测试

共 **45 个自动化用例**，三层覆盖：

```bash
# 前端逻辑层（Vitest 19 个）：RAG 检索相关性 / 工具参数容错 / 哈希一致性锚点 / Agent 循环端到端（mock LLM 验证 plan→act→observe 与 SSE 事件序列）
npx vitest run

# 前端遗留模块（node:test 12 个）：街机物理 / 个人中心客户端逻辑
node --test scripts/arcade-physics.test.cjs scripts/profile-client.test.cjs

# 后端（JUnit 14 个）：JWT 签发/篡改拒绝/过期判定/随机密钥兜底、注册不泄漏密码哈希、登录透传
cd partjava-backend && mvn test
```

---

## API 架构

前端通过 Next.js Rewrites 将 `/api/*` 请求透明代理到 Spring Boot 后端（`localhost:8080`）；`/api/ai/agent/stream` 优先转发 FastAPI（`:8000`），失败时由内置 Agent 引擎接管。

完整接口文档见 [docs/backend-api.md](docs/backend-api.md)。

---

## 许可说明

本项目为 Syntora 团队参加 2026 传智杯 AI Web 网页开发挑战赛的原创参赛作品，代码仅供学习与评审参考，未经团队许可禁止用于商业目的。

Copyright © 2024-2026 Syntora · PartJava
