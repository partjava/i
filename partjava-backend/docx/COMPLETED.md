# PartJava 已完成功能清单 (Completed Features)

> 本文档记录截至 2026-06-28 已实际编码落地、可在本地 `npm run dev` 中运行验证的全部功能模块。
> 
> 设计规格详见：[后端设计规格说明书](./docx/backend_design_proposal.md) | 数据库结构：[mysql.md](../mysql.md)

---

## ✅ 1. 用户账号与认证体系

### 1.1 用户名/邮箱双通道登录
- **文件**：[app/lib/auth.ts](../app/lib/auth.ts)
- **说明**：NextAuth Credentials Provider 支持用户通过**登录用户名（username）** 或**邮箱（email）**登录，SQL 查询为 `WHERE email = ? OR username = ?`。
- **会话透传**：`username` 与 `role` 字段通过 JWT Token → Session 回调全链路透传，前台任意组件可直接读取。

### 1.2 英数专属唯一用户名体系
- **文件**：[app/api/user/profile/route.ts](../app/api/user/profile/route.ts)、[UserProfileServiceImpl.java](./src/main/java/com/partjava/service/impl/UserProfileServiceImpl.java)
- **说明**：
  - 格式校验：正则 `^[a-zA-Z0-9]+$`，拒绝中文与特殊字符；
  - 全局排重：`SELECT id FROM users WHERE username = ? AND id != ?`，防止与他人冲突；
  - 前后台双重校验：Next.js BFF 层 + Java 服务层均已实现。
- **数据库**：`users.username VARCHAR(255) UNIQUE NOT NULL`

### 1.3 个人资料修改（方案 B）
- **文件**：[app/profile/page.tsx](../app/profile/page.tsx)
- **说明**：个人主页提供"登录用户名"修改输入框，修改时实时触发 `NextAuth update()` 广播刷新 Cookie 中的会话信息，保障全站显示同步。

---

## ✅ 2. VIP 会员权限系统

### 2.1 数据库字段
- **文件**：[mysql.md](../mysql.md)（§1 users 表）
- **新增字段**：
  ```sql
  vip              TINYINT(1) DEFAULT 0   -- 是否VIP
  vip_level        INT        DEFAULT 0   -- 1=体验/2=进阶/3=永久共创
  vip_expire_time  TIMESTAMP  NULL        -- 到期时间
  ```
  > ⚠️ 需手动在 MySQL 执行 ALTER TABLE 语句，应用代码已就绪。

### 2.2 VIP 激活接口
- **文件**：[app/api/user/activate-vip/route.ts](../app/api/user/activate-vip/route.ts)
- **路由**：`POST /api/user/activate-vip`
- **逻辑**：等级只升不降；体验/进阶套餐顺延 90 天；永久套餐写入 `9999-12-31 23:59:59`。

### 2.3 三档套餐弹窗 UI
- **文件**：[app/components/VipModal.tsx](../app/components/VipModal.tsx)
- **说明**：黄金琉璃玻璃态设计，展示三档套餐（¥1.99 / ¥9.99 / ¥99.99）及各自专属特权列表，底部附"永久共创者荣誉墙"展示区。

### 2.4 导航栏 VIP 入口
- **文件**：[app/components/Navbar.tsx](../app/components/Navbar.tsx)
- **说明**：在"机器人"按钮右侧新增金色脉冲发光的 `👑 VIP` 快捷入口按钮，点击全局唤起 VipModal 弹窗。

### 2.5 个人主页 VIP 徽章
- **文件**：[app/profile/page.tsx](../app/profile/page.tsx)
- **说明**：根据 `vipLevel` 在昵称 `@username` 下方展示对应渐变色徽章：
  - Level 1：`👑 体验会员`（金色渐变）
  - Level 2：`🌟 进阶会员`（紫青渐变）
  - Level 3：`🔥 永久共创者`（红橙渐变）
  - 同时展示有效期或"永久有效"文字。

### 2.6 全局 VIP 状态缓存
- **文件**：[app/providers/UserProvider.tsx](../app/providers/UserProvider.tsx)
- **说明**：`UserData` 接口增加 `vip`、`vipLevel`、`vipExpireTime` 字段，从 `/api/user/profile` 加载后缓存至 React Context，全站组件无需重复请求即可判断会员状态。

---

## ✅ 3. 笔记复用功能（进阶 VIP 专属）

### 3.1 克隆接口
- **文件**：[app/api/notes/[id]/clone/route.ts](../app/api/notes/%5Bid%5D/clone/route.ts)
- **路由**：`POST /api/notes/{id}/clone`
- **权限**：`vip_level >= 2` 且会员未过期方可调用；
- **逻辑**：复制目标公开笔记的全部内容，标题加 `[复用]` 前缀，以当前用户为作者、`is_public = FALSE` 写入新记录。

### 3.2 笔记详情页复用按钮
- **文件**：[app/notes/[id]/page.tsx](../app/notes/%5Bid%5D/page.tsx)
- **说明**：在公开笔记（非自己的）的操作侧边栏中展示"🌟 一键复用"按钮；进阶 VIP 显示为激活态（紫青渐变），普通用户点击时显示升级提示。

---

## ✅ 4. 管理员后台

### 4.1 水墨化主题
- **文件**：[app/admin/page.tsx](../app/admin/page.tsx)
- **说明**：Ant Design 自定义主题色（藏青底 `#0C1F3D`、荧光玉石绿高亮 `#BBFF5C`），引入水墨远山装饰背景 `InkWashDecoration`。

### 4.2 用户账号管理 + 会员管理
- **文件**：[app/admin/components/UserTab.tsx](../app/admin/components/UserTab.tsx)
- **说明**：
  - 用户列表新增"会员状态"列，展示会员等级 Tag（金色/紫色/火焰色）及到期日期；
  - 管理操作区增加"👑 赠送会员"按钮，可为用户直接升级会员档位。

---

## ✅ 5. 挑战星空页面视觉

### 5.1 纯黑宇宙背景 + 飘雪粒子
- **文件**：[app/challenges/components/StarBackground.tsx](../app/challenges/components/StarBackground.tsx)、[SpaceDust.tsx](../app/challenges/components/SpaceDust.tsx)
- **说明**：在纯黑 Canvas 背景上，叠加 60 颗径向羽化发光白色雪花粒子，使用正弦摆动模拟真实飘雪律动，打破静态画面的空洞感。

---

## ✅ 6. 宇宙探索关卡挑战系统 (Star Challenges System)

### 6.1 数据库驱动题库与关系设计
- **文件**：[app/lib/database.ts](../app/lib/database.ts) (§ initDatabase)
- **新增三张物理表**：
  - `star_challenges`：存放子话题的 Markdown 理论内容、公式、Python 起步代码和 AI Prompt；
  - `star_challenge_quizzes`：存放每个子话题的选择题干、选项、正确答案索引及解析；
  - `star_challenge_records`：记录用户代码通过状态、选择题答案映射与 AI 打分及建议。
- **自动初始化种子**：[app/lib/seedChallenges.ts](../app/lib/seedChallenges.ts)。首次访问自动向数据库插入 Stage 1 (计算机基础/网络/编码)、Stage 2 (Python语法/函数)、Stage 4 (SVM/K-Means) 与 Stage 8 (CoT/RAG) 的高质量官方挑战题目。

### 6.2 动态挑战与进度同步 API
- **文件**：[app/api/star-challenges/route.ts](../app/api/star-challenges/route.ts)、[app/api/star-challenges/[subtopic]/route.ts](../app/api/star-challenges/%5Bsubtopic%5D/route.ts)
- **说明**：
  - `GET /api/star-challenges` 返回用户各个星球关卡的真实通关比率与通过题数；
  - `GET /api/star-challenges/[subtopic]` 动态提取子话题题目及用户历史做题记录。

### 6.3 答题/代码/思考题Persist与AI评分
- **文件**：
  - [submit-code/route.ts](../app/api/star-challenges/%5Bsubtopic%5D/submit-code/route.ts) 保存代码通过记录
  - [submit-quiz/route.ts](../app/api/star-challenges/%5Bsubtopic%5D/submit-quiz/route.ts) 保存选择题答案
  - [submit-thinking/route.ts](../app/api/star-challenges/%5Bsubtopic%5D/submit-thinking/route.ts) 智能评估主观思考题（针对 SVM、操作系统等定制了核心关键字匹配，并给出综合建议）

### 6.4 游客答题模式与警示
- **文件**：[app/challenges/components/QuizWorkspace.tsx](../app/challenges/components/QuizWorkspace.tsx)
- **说明**：游客身份可进行理论阅读、选择题答题与 AI 模拟思考题评分；顶部栏展示黄色醒目警示“答题记录将不会被云端保存”，登录后无缝支持云端持久化。

### 6.5 VIP 用户自主出题与审核机制
- **文件**：[app/api/star-challenges/submit-topic/route.ts](../app/api/star-challenges/submit-topic/route.ts)
- **说明**：进阶 VIP (level >= 2) 及管理员具备出题权限。用户出题默认处于 `draft` 状态，需管理员审核发布后，正式自动排列在折叠栏中对应大分类的下方，并带上 `👤 @作者昵称 贡献` 的荣誉标识。


## 🔜 待办：Java 后端实现

以下功能已在 Next.js BFF 层完成，**Java Spring Boot 后端尚待对应实现**（双轨并行，不影响现有运行）：

| 功能 | Java 文件 | 状态 |
|------|-----------|------|
| 用户名修改排重校验 | `UserProfileServiceImpl.java` | ✅ 已实现 |
| `username` / `role` 字段映射 | `User.java`, `UserProfileResp.java` | ⏳ 待加 VIP 字段 |
| VIP 激活接口 | `UserController.java` | ⏳ 待实现 |
| 笔记克隆接口 | `NoteController.java` | ⏳ 待实现 |
