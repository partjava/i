# PartJava 数据库字段文档

> 数据库: MySQL 8.0 | 库名: `partjava_notes` | 字符集: `utf8mb4_unicode_ci`
> 版本: 1.0 | 最后更新: 2026-06-30

---

## 一、用户系统

### users — 用户表

核心用户账户信息表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 用户ID |
| username | VARCHAR(255) | UNIQUE, NOT NULL | 用户名 (登录用) |
| name | VARCHAR(255) | nullable | 昵称 |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 邮箱 (登录用/找回密码) |
| password | VARCHAR(255) | NOT NULL | BCrypt 密码哈希 |
| role | VARCHAR(20) | default 'USER' | 角色: USER / ADMIN |
| status | VARCHAR(20) | default 'ACTIVE' | 状态: ACTIVE / BANNED |
| bio | VARCHAR(500) | nullable | 个人简介 |
| location | VARCHAR(255) | nullable | 所在地 |
| website | VARCHAR(255) | nullable | 个人网站 |
| github | VARCHAR(255) | nullable | GitHub 账号 |
| avatar | VARCHAR(500) | nullable | 头像 URL |
| vip | TINYINT(1) | default 0 | VIP标识: 0=普通, 1=VIP |
| vip_level | INT | default 0 | VIP等级: 0=无, 1=体验, 2=进阶, 3=永久共创 |
| vip_expire_time | DATETIME | nullable | VIP到期时间 |
| draft_count | INT | default 0 | 本月已出题数 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

### user_profiles — 用户扩展资料表

用户的职业、技能等扩展信息，与 users 一对一关系。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 主键 |
| user_id | BIGINT | UNIQUE, NOT NULL | 关联 users.id |
| name | VARCHAR(255) | nullable | 显示名称 |
| job_title | VARCHAR(255) | nullable | 职位头衔 |
| company | VARCHAR(255) | nullable | 公司 |
| bio | TEXT | nullable | 个人简介 |
| location | VARCHAR(255) | nullable | 所在地 |
| website | VARCHAR(255) | nullable | 个人网站 |
| github | VARCHAR(255) | nullable | GitHub |
| skills | TEXT | nullable | 技能列表 (JSON字符串) |
| social_links | TEXT | nullable | 社交链接 (JSON字符串) |
| avatar | VARCHAR(500) | nullable | 头像URL |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

---

## 二、笔记系统

### notes — 笔记表

核心笔记内容存储表。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 笔记ID |
| title | VARCHAR(500) | NOT NULL | 标题 |
| content | LONGTEXT | nullable | Markdown 正文内容 |
| category | VARCHAR(100) | nullable | 分类 (如: 计算机, AI, 安全) |
| technology | VARCHAR(100) | nullable | 技术领域 (如: Python, Java) |
| subcategory | VARCHAR(100) | nullable | 子分类 |
| tags | JSON | nullable | 标签列表 `["tag1","tag2"]` |
| is_public | TINYINT(1) | default 0 | 是否公开: 0=私密, 1=公开 |
| author_id | BIGINT | FK -> users.id, NOT NULL | 作者ID |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

**索引:** `idx_author_id` (author_id), `idx_category_tech` (category, technology), `idx_created_at` (created_at)

### note_likes — 笔记点赞表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 主键 |
| user_id | BIGINT | FK -> users.id, NOT NULL | 点赞用户ID |
| note_id | BIGINT | FK -> notes.id, NOT NULL | 被点赞笔记ID |
| created_at | DATETIME | NOT NULL | 点赞时间 |

**索引:** `UNIQUE KEY` (user_id, note_id)

### note_bookmarks — 笔记收藏表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 主键 |
| user_id | BIGINT | FK -> users.id, NOT NULL | 收藏用户ID |
| note_id | BIGINT | FK -> notes.id, NOT NULL | 被收藏笔记ID |
| created_at | DATETIME | NOT NULL | 收藏时间 |

**索引:** `UNIQUE KEY` (user_id, note_id)

### note_images — 笔记图片表 (LONGBLOB 存储)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 上传用户ID |
| filename | VARCHAR(255) | NOT NULL | UUID文件名 (含扩展名) |
| mime_type | VARCHAR(100) | NOT NULL | MIME类型 (image/png等) |
| data | LONGBLOB | NOT NULL | 二进制图片数据 |
| size | INT | NOT NULL | 文件大小 (bytes) |
| created_at | DATETIME | NOT NULL | 上传时间 |

---

## 三、评论系统

### comments — 评论表

支持父子级树形评论结构。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 评论ID |
| note_id | BIGINT | FK -> notes.id, NOT NULL | 所属笔记ID |
| user_id | BIGINT | FK -> users.id, NOT NULL | 评论作者ID |
| content | TEXT | NOT NULL | 评论内容 |
| parent_id | BIGINT | FK -> comments.id, nullable | 父评论ID (一级评论为NULL) |
| created_at | DATETIME | NOT NULL | 评论时间 |

**索引:** `idx_note_id` (note_id), `idx_parent_id` (parent_id)

### comment_likes — 评论点赞表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 主键 |
| comment_id | BIGINT | FK -> comments.id, NOT NULL | 被点赞评论ID |
| user_id | BIGINT | FK -> users.id, NOT NULL | 点赞用户ID |
| created_at | DATETIME | NOT NULL | 点赞时间 |

**索引:** `UNIQUE KEY` (comment_id, user_id)

---

## 四、学习追踪

### study_sessions — 学习计时打卡表

记录用户每次学习时段的计时数据。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | FK -> users.id, NOT NULL | 用户ID |
| study_time | INT | NOT NULL | 学习时长 (秒) |
| category | VARCHAR(100) | nullable | 学习分类 |
| technology | VARCHAR(100) | nullable | 技术领域 |
| activity | VARCHAR(100) | nullable | 活动类型 (阅读/编程等) |
| session_date | DATE | GENERATED COLUMN | 自动从 created_at 提取日期 |
| created_at | DATETIME | NOT NULL | 打卡时间 |

**索引:** `idx_user_date` (user_id, session_date)

### study_progress — 页面阅读进度表

记录用户对学习页面的已读/完成状态。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 用户ID |
| page_path | VARCHAR(500) | NOT NULL | 页面路径 (如 /study/computer/variables) |
| completed | TINYINT(1) | default 0 | 完成状态: 0=未完成, 1=已完成 |
| completed_at | DATETIME | nullable | 完成时间 |
| created_at | DATETIME | NOT NULL | 创建时间 |

**索引:** `UNIQUE KEY` (user_id, page_path)

### learning_stats — 学习统计汇总表

聚合用户的学习统计数据。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 用户ID |
| activity | VARCHAR(100) | nullable | 活动类型 |
| points | INT | default 0 | 获得积分 |
| category | VARCHAR(100) | nullable | 分类 |
| technology | VARCHAR(100) | nullable | 技术领域 |
| study_time | INT | default 0 | 累计学习时间 (秒) |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

---

## 五、挑战宇宙

### star_challenges — 挑战关卡定义表

每个关卡包含理论、代码、选择题、思考题等完整内容。

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 关卡ID |
| level_title | VARCHAR(255) | NOT NULL | 关卡标题 |
| stage_id | INT | NOT NULL | 宇宙阶段 (1-11) |
| topic_name | VARCHAR(255) | NOT NULL | 大主题名称 |
| subtopic_name | VARCHAR(255) | NOT NULL | 小节名称 |
| level_index | INT | NOT NULL | 小节内关卡序号 (1,2,3) |
| theory_content | LONGTEXT | nullable | Markdown理论正文 |
| latex_formulas | JSON | nullable | LaTeX公式数组 |
| starter_code | TEXT | nullable | 起手代码 |
| solution_code | TEXT | nullable | 标准参考答案 |
| test_cases | JSON | nullable | 可见测试样例 (学生可看) |
| evaluation_cases | JSON | nullable | 隐藏判题样例 (判题用) |
| thinking_question | TEXT | nullable | 主观思考题题干 |
| ai_prompt | TEXT | nullable | AI 评测Prompt |
| difficulty | VARCHAR(20) | nullable | 难度: easy/medium/hard |
| slug | VARCHAR(255) | nullable | URL别名标识 |
| access_level | VARCHAR(20) | default 'free' | 访问权限: free/member/vip |
| status | VARCHAR(20) | default 'draft' | 状态: published/draft/archived |
| author_id | INT | nullable | 出题人用户ID |
| is_public | TINYINT(1) | default 1 | 是否公开 |
| created_at | DATETIME | NOT NULL | 创建时间 |

### star_challenge_quizzes — 挑战选择题表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| challenge_id | INT | FK -> star_challenges.id, NOT NULL | 关联关卡ID |
| question_text | TEXT | NOT NULL | 题干 |
| options | JSON | NOT NULL | 选项列表 `["A","B","C","D"]` |
| correct_index | INT | NOT NULL | 正确答案索引 (0-based) |
| explanation | TEXT | nullable | 题目解析 |

### star_challenge_records — 用户挑战通关记录表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 用户ID |
| challenge_id | INT | FK -> star_challenges.id, NOT NULL | 关卡ID |
| code_passed | TINYINT(1) | default 0 | 代码是否通关 |
| quiz_answers | JSON | nullable | 选择题答案草稿 `{"0": 1}` |
| thinking_score | INT | nullable | AI思考题评分 |
| thinking_feedback | TEXT | nullable | AI思考题反馈 |
| completed_at | DATETIME | nullable | 通关时间 |

**索引:** `UNIQUE KEY` (user_id, challenge_id)

### challenge_drafts — 出题草稿表 (VIP会员自创题)

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 出题会员ID |
| stage_id | INT | NOT NULL | 阶段ID |
| topic_name | VARCHAR(255) | nullable | 主题名称 |
| subtopic_name | VARCHAR(255) | nullable | 小节名称 |
| level_title | VARCHAR(255) | nullable | 关卡标题 |
| level_index | INT | nullable | 关卡序号 |
| theory_content | LONGTEXT | nullable | Markdown理论正文 |
| latex_formulas | JSON | nullable | LaTeX公式数组 |
| starter_code | TEXT | nullable | 起手代码 |
| solution_code | TEXT | nullable | 参考答案 |
| quizzes | JSON | nullable | 选择题列表 |
| thinking_question | TEXT | nullable | 思考题题干 |
| ai_prompt | TEXT | nullable | AI评测提示词 |
| test_cases | JSON | nullable | 可见测试样例 |
| evaluation_cases | JSON | nullable | 隐藏判题样例 |
| difficulty | VARCHAR(20) | nullable | 难度 |
| access_level | VARCHAR(20) | nullable | 访问权限 |
| is_public | TINYINT(1) | nullable | 是否公开 |
| status | VARCHAR(20) | default 'pending' | 审核状态: pending/approved/rejected |
| review_comment | TEXT | nullable | 审核建议 |
| reviewer_id | INT | nullable | 审核人管理员ID |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

---

## 六、成就系统

### achievements — 成就定义表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | VARCHAR(50) | PK | 成就编码 (如: first_note, streak_7) |
| name | VARCHAR(100) | NOT NULL | 成就名称 |
| description | TEXT | nullable | 成就描述 |
| icon | VARCHAR(255) | nullable | 图标路径 |
| category | VARCHAR(50) | nullable | 分类 (study/note/challenge等) |
| max_progress | INT | default 1 | 达成所需进度值 |
| sort_order | INT | default 0 | 排序序号 |

### user_achievements — 用户已解锁成就表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 用户ID |
| achievement_id | VARCHAR(50) | FK -> achievements.id | 成就编码 |
| unlocked_at | DATETIME | nullable | 解锁时间 |
| created_at | DATETIME | NOT NULL | 记录创建时间 |

---

## 七、AI 对话

### ai_conversations — AI 对话会话表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 会话ID |
| user_id | BIGINT | FK -> users.id, NOT NULL | 用户ID |
| title | VARCHAR(255) | nullable | 对话标题 |
| created_at | DATETIME | NOT NULL | 创建时间 |
| updated_at | DATETIME | NOT NULL | 更新时间 |

### ai_messages — AI 对话消息表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 消息ID |
| conversation_id | BIGINT | FK -> ai_conversations.id, NOT NULL | 所属会话ID |
| role | VARCHAR(20) | NOT NULL | 角色: user / assistant |
| content | TEXT | NOT NULL | 消息内容 |
| created_at | DATETIME | NOT NULL | 发送时间 |

---

## 八、搜索

### search_history — 用户搜索历史表

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | NOT NULL | 用户ID |
| query | VARCHAR(500) | NOT NULL | 搜索关键词 |
| created_at | DATETIME | NOT NULL | 搜索时间 |

**索引:** `idx_user_query` (user_id, created_at)

---

## 九、小游戏 (游戏模块)

Game 模板块使用内存/Redis 存储游戏状态 (GameSessionStore), 不依赖数据库持久化。

游戏类型:
- 井字棋 (TicTacToe)
- 2048
- 五子棋 (Gomoku)

---

## 十、表关系总览

```
users (1) ──< (N) notes          (作者关系)
users (1) ──< (N) study_sessions (学习打卡)
users (1) ──< (N) study_progress (阅读进度)
users (1) ──< (N) star_challenge_records (挑战记录)
users (1) ──< (N) ai_conversations (AI对话)
users (1) ──< (N) user_achievements (成就)
users (1) ──< (N) search_history (搜索历史)
users (1) ──< (N) note_likes (点赞)
users (1) ──< (N) note_bookmarks (收藏)
users (1) ──< (N) comments (评论)
users (1) ──1 (1) user_profiles (扩展资料)

notes (1) ──< (N) note_likes     (笔记被点赞)
notes (1) ──< (N) note_bookmarks (笔记被收藏)
notes (1) ──< (N) comments       (笔记评论)

comments (1) ──< (N) comments (parent_id 自关联, 父子评论)
comments (1) ──< (N) comment_likes (评论被点赞)

star_challenges (1) ──< (N) star_challenge_quizzes   (关卡选择题)
star_challenges (1) ──< (N) star_challenge_records    (用户通关记录)
star_challenges (1) ──< (N) challenge_drafts           (出题草稿)
```
