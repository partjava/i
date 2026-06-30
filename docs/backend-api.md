# PartJava 后端 API 接口文档

> 版本: 1.0 | 最后更新: 2026-06-30
> 基础路径: `http://localhost:8080/api`

---

## 一、认证与用户

### 1.1 用户注册

```
POST /api/auth/register
Content-Type: application/json
```

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

### 1.2 用户登录

```
POST /api/auth/login
Content-Type: application/json
```

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "jwt-token-string",
    "user": {
      "id": 1,
      "username": "string",
      "email": "string",
      "role": "USER",
      "vip": 0,
      "vipLevel": 0
    }
  }
}
```

### 1.3 获取学习统计 (热力图数据)

```
GET /api/user/learning-stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "code": 200,
  "data": {
    "heatmapData": [
      { "date": "2026-06-01", "count": 5, "level": 3 }
    ]
  }
}
```

### 1.4 修改密码

```
POST /api/user/change-password
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "oldPassword": "current_password",
  "newPassword": "new_password"
}
```

### 1.5 导出用户数据

```
GET /api/user/export-data
Authorization: Bearer <token>
```

**Response:** JSON 文件下载，包含用户信息、笔记、学习记录等。

### 1.6 VIP 激活

```
POST /api/user/activate-vip
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{ "level": 1 }
```
- level: 1=体验VIP, 2=进阶VIP, 3=永久共创

---

## 二、个人资料

### 2.1 获取个人资料

```
GET /api/user/profile
Authorization: Bearer <token>
```

### 2.2 更新个人资料

```
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "string",
  "jobTitle": "string",
  "company": "string",
  "bio": "string",
  "location": "string",
  "website": "string",
  "github": "string",
  "skills": "string",
  "socialLinks": "string"
}
```

---

## 三、笔记系统

### 3.1 获取笔记列表

```
GET /api/notes?category=分类&technology=技术&isPublic=true
Authorization: Bearer <token> (可选)
```

### 3.2 获取笔记详情

```
GET /api/notes/{id}
Authorization: Bearer <token> (可选)
```

### 3.3 创建笔记

```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "title": "笔记标题",
  "content": "Markdown内容",
  "category": "分类",
  "technology": "技术",
  "subcategory": "子分类",
  "tags": ["标签1", "标签2"],
  "isPublic": true
}
```

### 3.4 更新笔记

```
PUT /api/notes/{id}
Authorization: Bearer <token>
```

### 3.5 删除笔记

```
DELETE /api/notes/{id}
Authorization: Bearer <token>
```

### 3.6 点赞/取消点赞笔记

```
POST /api/notes/{id}/like
Authorization: Bearer <token>
```

### 3.7 收藏/取消收藏笔记

```
POST /api/notes/{id}/bookmark
Authorization: Bearer <token>
```

### 3.8 克隆笔记 (VIP)

```
POST /api/notes/{id}/clone
Authorization: Bearer <token>
```

### 3.9 额外笔记接口 (NoteExtendedController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/notes/public` | 获取公开笔记列表 |
| GET | `/api/notes/categories` | 获取所有分类和技术领域 |
| GET | `/api/notes/search?q=关键词` | 搜索笔记 |
| POST | `/api/notes/batch-delete` | 批量删除笔记 |
| DELETE | `/api/notes/{id}/like` | 取消点赞 (兼容旧版) |
| DELETE | `/api/notes/{id}/bookmark` | 取消收藏 (兼容旧版) |
| GET | `/api/notes/{id}/favorite` | 查询收藏状态 |
| POST | `/api/notes/{id}/favorite` | 切换收藏状态 |

---

## 四、评论系统

### 4.1 获取评论 (树形结构)

```
GET /api/comments?noteId=笔记ID
Authorization: Bearer <token> (可选)
```

### 4.2 发表评论

```
POST /api/comments
Authorization: Bearer <token>
```

```json
{
  "noteId": 1,
  "content": "评论内容",
  "parentId": null
}
```
- parentId: 回复某条评论时填写父评论ID，一级评论为 null

### 4.3 删除评论

```
DELETE /api/comments/{id}
Authorization: Bearer <token>
```

### 4.4 点赞评论

```
POST /api/comments/{id}/like
Authorization: Bearer <token>
```

---

## 五、学习追踪

### 5.1 同步学习时长

```
POST /api/study/sync-time
Authorization: Bearer <token>
```

```json
{
  "time": 600,
  "category": "计算机",
  "technology": "Python",
  "activity": "阅读"
}
```

### 5.2 更新页面阅读进度

```
POST /api/study/progress
Authorization: Bearer <token>
```

```json
{
  "pagePath": "/study/computer/basics/variables",
  "completed": true
}
```

### 5.3 获取学习统计

```
GET /api/study/stats
Authorization: Bearer <token>
```

### 5.4 获取页面进度列表

```
GET /api/study/progress
Authorization: Bearer <token>
```

---

## 六、挑战宇宙

### 6.1 获取全局进度

```
GET /api/challenges/progress
Authorization: Bearer <token> (可选)
```

### 6.2 获取所有挑战

```
GET /api/challenges
```

### 6.3 获取挑战详情

```
GET /api/challenges/{id}
Authorization: Bearer <token> (可选)
```

### 6.4 提交代码评测

```
POST /api/challenges/{id}/submit
Authorization: Bearer <token>
```

```json
{
  "code": "def solution():\\n    return 42"
}
```

### 6.5 提交主观思考题

```
POST /api/challenges/{id}/thinking/evaluate
Authorization: Bearer <token>
```

```json
{
  "answer": "用户的思考题答案"
}
```

### 6.6 提交选择题答案

```
POST /api/challenges/{id}/quiz
Authorization: Bearer <token>
```

```json
{
  "0": 1,
  "1": 0
}
```

### 6.7 获取标准答案

```
GET /api/challenges/{id}/solution
Authorization: Bearer <token>
```

### 6.8 排行榜

```
GET /api/challenges/leaderboard
Authorization: Bearer <token> (可选)
```

### 6.9 我的出题

```
GET /api/challenges/my
Authorization: Bearer <token>
```

### 6.10 提交出题草稿

```
POST /api/challenges/drafts
Authorization: Bearer <token>
```

### 6.11 兼容旧版前端 API (ChallengeController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/star-challenges` | 旧版挑战列表 |
| GET | `/api/star-challenges/{subtopicName}` | 旧版按小节获取 |
| POST | `/api/star-challenges/{subtopicName}/submit-code` | 旧版提交代码 |
| POST | `/api/star-challenges/{subtopicName}/submit-quiz` | 旧版提交选择题 |
| POST | `/api/star-challenges/{subtopicName}/submit-thinking` | 旧版提交思考题 |

### 6.12 出题草稿管理 (ChallengeDraftController)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/challenge-drafts` | 创建出题草稿 |
| GET | `/api/challenge-drafts/mine` | 查看我的出题草稿 |

---

## 七、搜索

### 7.1 全局搜索

```
GET /api/search/global?query=关键词
Authorization: Bearer <token> (可选)
```

### 7.2 搜索历史

```
GET /api/search/history
Authorization: Bearer <token>
```

### 7.3 清空搜索历史

```
DELETE /api/search/history
Authorization: Bearer <token>
```

### 7.4 保存搜索历史

```
POST /api/search/history
Authorization: Bearer <token>
```

---

## 八、AI 助手

### 8.1 AI 对话管理 (AiConversationController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/ai/conversations` | 获取对话列表 |
| POST | `/api/ai/conversations` | 创建新对话 |
| GET | `/api/ai/conversations/{id}/messages` | 获取对话消息 |
| POST | `/api/ai/conversations/{id}/messages` | 保存对话消息 |

### 8.2 AI 助手对话 (AiAssistantController)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/ai/chat` | AI 智能对话 (流式/非流式) |

### 8.3 AI 聊天 (AiChatController)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/ai/send` | 发送聊天消息 |
| GET | `/api/ai/history` | 获取聊天历史 |

---

## 九、代码执行 (Playground)

### 9.1 执行代码 (Judge0 在线编译)

```
POST /api/execute-code
```

```json
{
  "code": "print('Hello World')",
  "language": "python",
  "input": ""
}
```

支持语言: python, javascript, java, cpp, c, go, php, rust, csharp, typescript

---

## 十、图片上传

### 10.1 上传图片

```
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

参数: `file` (MultipartFile)

### 10.2 获取图片

```
GET /api/images/{filename}
```

---

## 十一、忘记密码

### 11.1 请求重置

```
POST /api/forgot-password
```

```json
{ "email": "user@example.com" }
```

### 11.2 重置密码

```
POST /api/forgot-password/reset
```

```json
{
  "email": "user@example.com",
  "token": "reset-token",
  "newPassword": "new_password"
}
```

### 11.3 验证 Token

```
GET /api/forgot-password?token=xxx&email=xxx
```

---

## 十二、平台统计

```
GET /api/stats/platform
```

返回用户数、笔记数、公开笔记数、挑战数。

---

## 十三、管理后台 API

### 13.1 用户管理 (AdminUserController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/users?page=1&limit=20&search=关键词` | 分页查询用户 |
| PUT | `/api/admin/users/{id}/role` | 修改用户角色/状态 |

### 13.2 挑战管理 (AdminChallengeController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/challenges` | 管理挑战列表 |
| PUT | `/api/admin/challenges/{id}` | 更新挑战状态 |
| DELETE | `/api/admin/challenges/{id}` | 删除挑战 |

### 13.3 挑战元数据 (AdminChallengeMetaController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/challenge-meta` | 挑战阶段/主题元数据管理 |

### 13.4 管理后台统计 (AdminStatsController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/stats` | 后台仪表盘统计 |

### 13.5 系统管理 (AdminSystemController)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/system/health` | 系统健康检查 |
| GET | `/api/admin/system/logs` | 查看系统日志 |

---

## 十四、小游戏 API (Game模块)

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/game/tic-tac-toe/move` | 井字棋落子 |
| POST | `/api/game/2048/move` | 2048 移动 |
| POST | `/api/game/gomoku/move` | 五子棋落子 |

---

## 十五、通用响应格式

所有接口统一返回格式:

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

- code: 200=成功, 其他=失败
- message: 错误信息或提示
- data: 具体响应数据
