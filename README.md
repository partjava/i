# 禾桔书房 · AI 伴学平台（PartJava）

<!-- 首页全景图：待新截图后放回 public/images/images/ 并恢复此行 -->

> **2026 传智杯 · AI Web 网页开发挑战赛参赛作品** —— AI Native 伴学平台：3D AI 伴侣「禾桔」以 Function Calling Agent 驱动站内 RAG 检索、联网深搜、笔记提炼与 3D 神态控制。

## 团队信息

| 项目 | 内容 |
|------|------|
| 团队名称 | **Syntora** |
| 队长 | 贺思涵 |
| 组员 | 宋维维、周子轩 |
| 所属院校 | 武汉晴川学院 |
| 参赛编号 | 1952552 |

## 项目信息

| 项目 | 内容 |
|------|------|
| 在线地址 | [https://www.partjava.com](https://www.partjava.com) |
| 评审测试账号 | `example@qq.com` / `123456` |
| 前端 | Next.js 14（App Router）· React 18 · TypeScript · Tailwind CSS · Ant Design |
| 后端 | Java 21 · Spring Boot 3.3 · MySQL 8 · Redis |
| AI 服务 | Python FastAPI · DeepSeek · MCP 协议 |

---

## 🌟 项目亮点

- **🤖 Function Calling AI Agent**：3D 黑猫「禾桔」由 plan → act → observe 自主决策循环驱动，站内领航 / 联网深搜 / 自动写笔记 / 3D 神态控制四大工具由 LLM 自主调度，执行轨迹实时可视化
- **🔍 端云协同 RAG**：全站课程页向量化（特征哈希 TF-IDF）构建检索索引，混合打分（余弦 + 标题词面），Next.js 与 Python 双端共享同一向量空间
- **🔌 MCP 协议支持**：四大 AI 工具同时以 MCP 标准 Server 暴露（`partjava-ai/mcp_server.py`），可被 Claude Desktop / Cursor 等任意 MCP 客户端挂载
- **🎙️ 多模态交互**：Web Speech API 语音输入 + TTS 朗读；Transformers.js 浏览器端语义缓存（相似问题离线秒回）
- **💻 在线代码执行**：Judge0 CE + Spring Boot 代理，多语言沙箱运行
- **🐾 3D 算法可视化**：排序 / 数学曲面 / AI 算法的 Three.js 3D 动态演示
- **🏆 成就徽章系统**：事件驱动架构，学习行为自动解锁成就
- **📈 数据可视化大屏**：ECharts 实时统计 + 学习热力图
- **🎨 中国水墨画 UI**：纯 SVG 山水 / 云雾 / 墨竹 / 飞鸟装饰
- **🔐 多层安全防护**：密钥全环境变量化 + 速率限制 + HTTP 安全头 + 输入校验 + 优雅降级

---

## 主要功能

### 1. Function Calling Agent 助手（3D 黑猫「禾桔」）

全站悬浮的 3D 像素黑猫，双引擎驱动（Python FastAPI + Next.js 内置引擎互为冗余）：

- **自主决策**：LLM 通过 Function Calling 自主决定调用哪些工具、传什么参数，循环执行直到信息充分
- **四大工具**：站内课程 RAG 检索 / 联网权威检索与正文抓取 / 结构化笔记提炼 / 3D 猫神态控制
- **执行轨迹可视化**：每一步 plan（💭）→ act（⚡）→ observe（✓）实时展示在前端面板
- **三级降级**：FastAPI → 内置引擎 → 离线本地回复，每级无缝切换且 UI 诚实标注

### 2. 端云协同 RAG 知识检索

- **索引构建**：构建脚本扫描全站课程页 → 中文 bigram + 英文分词 → FNV-1a 特征哈希 → TF-IDF 加权归一化
- **混合检索**：向量余弦 + 标题词面联合打分，低置信自动回落关键词层
- **端侧语义缓存**：浏览器内 Transformers.js 对历史问答做语义匹配，命中即离线秒回

### 3. MCP 标准工具服务

```bash
cd partjava-ai && python mcp_server.py   # stdio 传输的 MCP Server
```

- **工具同源**：`search_site_pages` / `web_search` / `draft_note` / `set_companion_state` 与 Web 端 Function Calling 完全一致
- **标准协议**：配置到 Claude Desktop / Cursor 等任意 MCP 客户端即可调用

### 4. 在线代码执行

- **编辑器**：Monaco Editor（VS Code 同款内核）
- **沙箱**：Spring Boot 代理 Judge0 CE，异步轮询取结果，支持标准输入与多种语言

### 5. 智能笔记系统

- **管理**：三级分类 + 多标签、Markdown 编辑、公开/私有、实时搜索、收藏评论
- **AI 闭环**：一句话把当前页面/对话提炼为结构化笔记草稿，预览微调后一键入库

### 6. 编程挑战宇宙

- **星图关卡**：多阶段挑战地图 + 排行榜激励
- **AI 评分**：思考题由后端调用大模型输出结构化分数与评语

### 7. 其他

- **成就系统**（事件驱动解锁）、**学习内容**（进度追踪）、**数据大屏**、**移动端**（手势 + PWA + 触觉反馈）

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

#### 首页与 Sanctuary 开屏

- **独立 WebGL 应用**：开屏是 `public/sanctuary/` 下的单页应用，按场景 / 音频 / 全息书 / 桌面配饰 / 导演控制器模块化组织，iframe 嵌入首页
- **postMessage 通信**：滚轮事件穿透到外层滚动容器；`IntersectionObserver` 检测滚出视口后通知内层暂停渲染、释放 GPU
- **容错设计**：统计卡接口失败自动隐藏
- **桌面隐喻导航**：工具导航做成可拖拽调整宽度与内容密度的「桌面文件夹」舞台
- **程序化水墨**：SVG 生成的山水 / 云雾 / 墨竹 / 飞鸟贯穿页首页尾

#### 学习内容（四大领域课程体系）

- **数据驱动课程**：内容以结构化数据常量描述，由书籍 UI 体系（封面 / 翻页 / 正文版式 / 主题令牌）统一渲染——新增课程只需加数据、无需写布局
- **时长可靠上报**：学习追踪器定时轮询上报，页面关闭用 `sendBeacon` 兜底，时长不丢失
- **截图标注编辑器**：html2canvas 采集 + **Canvas 命令栈**模式——每步操作是栈上的命令对象，撤销 / 重做是栈操作的天然结果；画笔 / 图形 / 文字 / 剪贴板粘贴皆为实现该接口的命令

#### AI 书房（3D 伴侣「禾桔」）

- **原生 Three.js**：不依赖 react-three-fiber；受限 OrbitControls + ACES 色调映射 + 双侧轮廓光摄影棚布光
- **shader 级动画**：呼吸 / 转头 / 动耳 / 摇尾全部在**顶点着色器**按蒙皮权重变形完成；绒毛簇是 InstancedMesh，材质注入同一套变形——毛根与身体逐顶点同步、毛向随旋转矩阵转动
- **灯光情绪**：灯光颜色 / 强度 / 曝光作为情绪参数，随对话状态（思考 / 联网 / 发言 / 庆祝）逐帧插值
- **灵气系统**：注意力状态机（输入看输入框、语音侧耳、久无操作打瞌睡）、空闲微动作导演、射线检测摸猫分区、localStorage 亲密度记忆（影响行为并注入对话上下文）
- **过程可视化**：SSE 流式渲染；执行轨迹面板 + 嘴部三维坐标实时投影定位的思维气泡

#### 3D 算法可视化实验室（`visualizer/` 插件体系）

- **执行 / 渲染解耦**：每个算法 = 两个纯函数——`generateSteps` 预生成步骤序列（数据），`render` 渲染单步到 THREE.Group（视图）
- **场景托管**：`SceneManager` 管理场景 / 光照 / 阴影 / 相机生命周期；HUD 徽章与光效用 Canvas 纹理精灵缓存
- **播放即游标**：步进 / 暂停 / 变速只是步骤数组上的游标操作
- **领域模块**：排序查找 / 数据结构（AVL、BST、图遍历、动态规划）/ 数学参数曲面（Mandelbrot、Lorenz、环面、Klein 瓶）/ 机器学习（K-Means、梯度下降、神经网络、决策树、SVM、PCA、Transformer），嵌入代码沙箱页边学边验证

#### 编程挑战宇宙

- **星图渲染**：DOM 变换布局的关卡地图 + 两层 Canvas 粒子星空 / 星尘
- **内容与视图分离**：题目体系为结构化数据文件；渲染层含知识树、测验工作台、Monaco 面板、AI 导师侧栏、SVM 等可视化组件
- **AI 评分**：思考题由后端按题目自带评分 Prompt 调用大模型，输出结构化分数与评语；公式经 remark-math / rehype-katex 渲染

#### 在线代码沙箱

- **链路**：Monaco 受控组件 → Spring Boot 代理 Judge0 CE（异步轮询 + Base64 解码）→ stdout / 耗时 / 内存

#### 笔记系统

- **三段式**：列表 / 详情 / 编辑，ReactMarkdown 全程渲染，三级分类 + 多标签
- **AI 闭环**：模型产出标题 / 分类 / 标签（多层 JSON 容错解析）→ 预览微调 → 一键入库，「学 → 问 → 记」最短路径

#### 个人中心与数据可视化

- **可视化**：ECharts 学习热力图（类 GitHub 贡献图）+ 折线 / 饼 / 雷达多维统计
- **事件驱动成就**：用户行为发布为 Spring 事件，监听器判定解锁并落库，前端只消费结果

#### 游戏中心（服务端权威架构）

- **逻辑在服务端**：`GameEngine` 基类派生实时 / 回合制引擎——实时类按 tick 演进并经 SSE 逐帧下发，回合类按步计算校验
- **前端只管渲染**：Canvas 渲染 + 输入采集，配 TypeScript 物理模块处理本地手感
- **架构收益**：天然防作弊；同一引擎可服务任意客户端

#### 管理后台

- **分 Tab 管理**：Dashboard / 用户 / 挑战 / 笔记
- **运维能力**：系统健康监控 + 服务端终端控制台（ADMIN 角色专用接口）

#### 移动端与 PWA

- **交互**：底部导航 + 边缘手势（滑动返回 / 呼出菜单）+ Vibration API 触觉反馈
- **缓存策略**：Service Worker 版本化——静态资源缓存优先、页面网络优先、API 永不缓存、离线页预缓存

### 服务端实现

#### Next.js API 层（TypeScript）

- **双引擎热切换**：`/api/ai/agent/stream` 先代理 FastAPI（超时快速失败），不可用无缝切到内置引擎；两套引擎共用工具 Schema、SSE 协议与 RAG 向量空间
- **纯逻辑层可测**：`lib.ts` 承载 RAG 检索 / 工具执行器，接受单测；`agent-engine.ts` 为无 Next 依赖的引擎本体
- **端侧不进构建**：Transformers.js 经 `webpackIgnore` 的运行时 CDN import 加载

#### Python FastAPI Agent 服务（`partjava-ai/`）

- **模块化**：调度循环（router）/ 站内领航（navigator）/ 笔记提炼（notewriter）/ 联网检索（websearch）/ 3D 伴侣（companion）/ 向量检索（rag_index）
- **MCP 双出口**：工具层同时以 MCP Server（stdio，兼容 SDK 两代 API）暴露
- **密钥治理**：统一从私有数据仓 dotenv 加载，代码零硬编码

#### Spring Boot 后端（Java 21）

- **经典分层**：controller / service / repository + MyBatis-Plus
- **默认拒绝安全**：JWT 无状态认证 + BCrypt + 显式放行公开只读接口；生产环境环境变量关闭 Swagger
- **解耦设计**：成就走 Spring 事件；游戏包独立成 controller / engine / model / service / store 完整子系统；启动期执行数据库结构迁移

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
| react-markdown + remark/rehype 系 | 对话流、笔记、课程内容的 Markdown / 公式 / 代码高亮渲染 |
| html2canvas / qrcode | 截图编辑器采集 / 笔记分享二维码 |
| fastapi / uvicorn / httpx / mcp | Python Agent 服务与 MCP Server |
| spring-boot / mybatis-plus / jjwt / spring-security | 后端框架、ORM、JWT、安全 |

---

## 安装与运行

### 前提条件

- **Node.js** 18+（建议 20）、**JDK** 21+、**Maven** 3.8+、**MySQL** 8.0+、**Redis** 7.x
- （可选）**Python** 3.10+ —— FastAPI Agent 服务

### 步骤

```bash
# 1. 克隆
git clone https://github.com/partjava/i.git && cd i

# 2. 初始化数据库
mysql -u root -p -e "CREATE DATABASE partjava_notes DEFAULT CHARACTER SET utf8mb4"
mysql -u root -p partjava_notes < scripts/schema.sql

# 3. 启动后端（Spring Boot，:8080）
cd partjava-backend
DB_USER=root DB_PASSWORD=你的密码 JWT_SECRET=至少32字节随机串 mvn spring-boot:run

# 4. 启动前端（Next.js，:3000）
cd ..
npm install
cp .env.example .env.local   # 填入 DEEPSEEK_API_KEY 等
npm run dev

# 5.（可选）Python Agent 服务（:8000）
cd partjava-ai && pip install -r requirements.txt && python main.py
#    或 MCP Server：python mcp_server.py
```

> 未启动 FastAPI 时前端自动走内置 Agent 引擎，功能完整等价（双引擎冗余设计）。

### 环境变量

完整模板见 [`.env.example`](.env.example)：数据库、`JWT_SECRET`、`DEEPSEEK_API_KEY`、`FASTAPI_AGENT_URL`、`JUDGE0_API_KEY` 等。
**所有密钥仅通过环境变量注入，源码与仓库中不含任何真实密钥。**

---

## 测试

共 **45 个自动化用例**，三层覆盖：

```bash
# 前端逻辑层（Vitest）：RAG 检索相关性 / 工具参数容错 / 哈希一致性锚点 / Agent 循环端到端（mock LLM）
npx vitest run

# 前端模块（node:test）：街机物理 / 个人中心客户端逻辑
node --test scripts/arcade-physics.test.cjs scripts/profile-client.test.cjs

# 后端（JUnit）：JWT 签发/篡改拒绝/过期判定、注册不泄漏密码哈希、登录透传
cd partjava-backend && mvn test
```

---

## API 架构

- **业务接口**：Next.js Rewrites 将 `/api/*` 透明代理到 Spring Boot
- **AI 接口**：`/api/ai/agent/stream` 优先转发 FastAPI，失败由内置 Agent 引擎接管
- **完整文档**：[docs/backend-api.md](docs/backend-api.md)

---

## 版权声明

本项目为**私有原创作品**，著作权归 Syntora 团队所有，仅授权本次大赛组委会评审使用。

- **禁止**复制、转载、搬运本仓库全部或部分内容到任何平台
- **禁止**对代码进行复制粘贴、二次开发或用于其他作品
- **禁止**任何形式的商业使用与传播分发

未经著作权人书面许可实施上述行为均属侵权，我们将依法保留追究法律责任的权利。

Copyright © 2024-2026 Syntora · PartJava · All Rights Reserved
