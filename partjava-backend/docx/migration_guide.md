# PartJava 后端迁移指南：从 Next.js BFF 到 Spring Boot

本指南详细梳理了当前 [i](file:///home/liming/partjava/i) 目录下需要迁移到 [partjava-backend](file:///home/liming/partjava/partjava-backend) 的所有核心模块、文件映射以及具体的代码转换逻辑。

> [!IMPORTANT]
> **在你（用户）说觉得没问题并且测试验证通过之前，绝对不要删除或修改原有的 Next.js BFF 接口代码或老代码**。我们应当保持新旧后端代码“双轨并行”的开发和测试方式，确保原平台能够正常平稳运行。

---

## 1. 核心模块迁移概览

| 模块名称 | 前端/BFF 源文件位置 (在 `i/` 下) | 转换目标后端组件 (Spring Boot) | 迁移难度 |
| :--- | :--- | :--- | :--- |
| **用户与鉴权** | `app/api/auth/register/route.ts`<br>`app/lib/auth.ts`<br>`app/lib/services/UserService.ts` | `AuthController.java`<br>`JwtFilter.java`<br>`UserService.impl` | 中等 (需用 JWT 代替 NextAuth 容器) |
| **笔记系统** | `app/api/notes/**/route.ts`<br>`app/lib/services/NoteService.ts`<br>`app/lib/repositories/NoteRepository.ts` | `NoteController.java`<br>`NoteService.java`<br>`NoteMapper.java` | 简单 (直观的 CRUD) |
| **评论与点赞** | `app/api/comments/**/route.ts`<br>`app/lib/services/CommentService.ts` | `CommentController.java`<br>`CommentService.java` | 简单 (包含父子级自关联) |
| **学习统计与打卡** | `app/api/study/**/route.ts`<br>`app/lib/services/StatsService.ts` | `StudyController.java`<br>`StudySessionService.java` | 中等 (需用 Redis 优化打卡) |
| **编程挑战宇宙** | `app/challenges/page.tsx` (大页面)<br>`app/challenges/data/stages.ts` (11大关卡数据) | `ChallengeController.java`<br>`user_challenge_records` 数据库驱动 | 中等 (由表结构驱动星系状态) |
| **沙箱评测执行** | `app/challenges/components/QuizWorkspace.tsx` (前端执行对接点) | `SandboxService.java` (本地隔离 Docker 评测引擎) | 较高 (涉及多进程超时阻断与隔离) |
| **主观思考题 AI 评分** | `app/challenges/components/QuizWorkspace.tsx` (思考题模块) | `AiGradingService.java` (对接 DeepSeek/GPT API 返回结构化 JSON) | 中等 (提示词强约束) |
| **异步成就引擎** | `app/api/user/achievements/route.ts`<br>前端散落在各处的成就触发点 | `UserAchievementController.java`<br>`UserActionEvent` (Spring 内部事件异步监听) | 较高 (异步解耦计算) |

---

## 2. 详细文件映射与转换对照

### 2.1 鉴权与用户模块 (Auth & User)
*   **源文件**：
    *   [i/app/lib/auth.ts](file:///home/liming/partjava/i/app/lib/auth.ts)（NextAuth 凭证配置与密码 compare）
    *   [i/app/lib/services/UserService.ts](file:///home/liming/partjava/i/app/lib/services/UserService.ts)（注册、修改资料、上传头像）
*   **目标文件**：
    *   `com.partjava.controller.AuthController` (处理 `/api/auth/register` 和 `/api/auth/login`)
    *   `com.partjava.config.SecurityConfig` (配置 `BCryptPasswordEncoder` 与接口鉴权白名单)
    *   `com.partjava.common.utils.JwtUtils` (JWT Token 签发与解析)

### 2.2 笔记与评论模块 (Notes & Comments)
*   **源文件**：
    *   [i/app/api/notes/route.ts](file:///home/liming/partjava/i/app/api/notes/route.ts)（获取笔记列表、创建笔记）
    *   [i/app/lib/repositories/NoteRepository.ts](file:///home/liming/partjava/i/app/lib/repositories/NoteRepository.ts)（拼装 SQL，处理 JSON 标签）
*   **目标文件**：
    *   `com.partjava.controller.NoteController`
    *   `com.partjava.service.NoteService`
    *   `com.partjava.repository.NoteMapper`
*   **JSON 字段映射**：
    *   MySQL 中的 `tags` 字段类型是 `JSON`。
    *   在 MyBatis-Plus 的 Java 实体中配置 `@TableField(typeHandler = JacksonTypeHandler.class)`，声明为 `List<String> tags` 即可全自动双向反序列化映射。

### 2.3 学习进度与打卡 (Study Progress & Sessions)
*   **源文件**：
    *   [i/app/api/study/progress/route.ts](file:///home/liming/partjava/i/app/api/study/progress/route.ts)（记录和读取用户页面已读状态）
    *   [i/app/lib/services/StatsService.ts](file:///home/liming/partjava/i/app/lib/services/StatsService.ts)（打卡统计与热力图计算）
*   **目标文件**：
    *   `com.partjava.controller.StudyController`
    *   `com.partjava.service.UserStreakService`
*   **迁移重构点**：
    *   原 BFF 每次打卡都需要计算全年的连续天数，产生大量的数据库聚合 SQL 开销。
    *   重构后，打卡行为存入 Redis Bitmap（`setbit user:streak:{userId}:{year} {dayOfYear} 1`），查询全年活跃度时通过读 Redis 一次性返回，并将连续天数更新写入 `user_streaks` 表。

### 2.4 在线编程沙箱评测 (Python Local Docker Sandbox)
*   **源文件**：
    *   `app/challenges/components/QuizWorkspace.tsx`（前端 Monaco 运行代码触发点，原本通过 mock 定时器打印模拟日志）
*   **目标文件**：
    *   `com.partjava.controller.SandboxController`（接收用户提交代码 `/api/challenges/{id}/submit`）
    *   `com.partjava.service.SandboxService`（本地 Docker 安全评测模块）
*   **评测迁移要点**：
    *   后端将用户的 Python 解法代码与数据库中存储的 `evaluation_script` 评测脚本进行字符串横向拼接，写入本地临时文件 `user_solution.py`。
    *   利用 Java 的 `ProcessBuilder` 执行 Docker 命令：
        ```bash
        docker run --rm --network none -m 512m --cpus="1.0" \
          -v /home/liming/partjava/datasets:/data:ro \
          -v /tmp/user_solution.py:/app/solution.py:ro \
          python-ml-env:latest \
          python /app/solution.py
        ```
    *   在 Java 代码中使用 `process.waitFor(timeout, TimeUnit.SECONDS)` 对运行耗时进行阻断。若容器超时，强行执行 `process.destroyForcibly()` 终止容器以防止无限循环。
    *   读取进程 stdout 的特定控制标识符 `__TEST_STATUS__`（如 `PASSED` 或 `FAILED`）判断是否通关，并返回详细的测试信息。

### 2.5 异步成就引擎 (Achievement Engine)
*   **源文件**：
    *   [i/app/api/user/achievements/route.ts](file:///home/liming/partjava/i/app/api/user/achievements/route.ts)（同步判定，逻辑分散）
*   **目标文件**：
    *   `com.partjava.event.UserActionEvent` (包含 userId 和动作类型 CREATE_NOTE, SUBMIT_CODE 等)
    *   `com.partjava.event.AchievementListener` (异步监听服务)
*   **转换逻辑**：
    *   在发笔记、成功打卡、通过编程挑战等主要业务完成后，利用 `applicationEventPublisher.publishEvent()` 抛出事件。
    *   在 `AchievementListener` 中用 `@EventListener` 结合 `@Async` 注解，异步统计并解锁用户成就，解耦核心业务，保证 API 极速响应。

---

## 3. 前端通信适配方案 (How Frontend Adapts)

迁移到独立后端后，前端 Next.js 调用接口有两种方案：

### 方案一：Next.js Rewrites 网关中转（前端代码零改动）
编辑 [i/next.config.js](file:///home/liming/partjava/i/next.config.js)，添加重写规则。当浏览器请求 `/api/**` 时，Next.js 会在后台默默地将其转发给 Spring Boot 后端：

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // 转发给 Spring Boot 后端
      },
    ]
  },
}
```
*   **优点**：前端 React 页面里的所有 `fetch('/api/...')` 逻辑不需要修改任何一行代码，全自动穿透！

### 方案二：独立配置 BaseURL
前端页面或全局 Fetch 请求封装统一读取 `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'` 进行全局转发。
