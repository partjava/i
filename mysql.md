# 数据库结构说明文档

## 数据库概述

本项目使用 MySQL 数据库，采用 InnoDB 引擎，字符集为 utf8mb4_unicode_ci。

数据库名称：`partjava_notes`

## 数据库表结构

### 1. users - 用户表

用户基本信息表，存储账号和基础资料（展示名、头像等），更详细的个人资料放在 `user_profiles` 表中。

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  location VARCHAR(255),
  website VARCHAR(500),
  github VARCHAR(255),
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| name | VARCHAR(255) | 用户名称 | NOT NULL |
| email | VARCHAR(255) | 邮箱地址 | UNIQUE, NOT NULL |
| password | VARCHAR(255) | 密码（加密） | NOT NULL |
| bio | TEXT | 个人简介（用于公共资料） | |
| location | VARCHAR(255) | 所在地 | |
| website | VARCHAR(500) | 个人网站 | |
| github | VARCHAR(255) | GitHub用户名 | |
| avatar | VARCHAR(500) | 头像图片URL | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `idx_email`: email字段索引
- `idx_created_at`: created_at字段索引

---

### 1.1 user_profiles - 用户扩展资料表

存放用户更详细的个人资料（职位、公司、技能标签、社交链接等），与 `users` 表通过 `user_id` 一一对应。

```sql
CREATE TABLE user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255),
  job_title VARCHAR(255),
  company VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  website VARCHAR(500),
  github VARCHAR(255),
  skills JSON,
  social_links JSON,
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_id (user_id),
  INDEX idx_user_id (user_id)
);
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| user_id | INT | 关联的用户ID | NOT NULL, UNIQUE |
| name | VARCHAR(255) | 显示名称（可覆盖 users.name） | |
| job_title | VARCHAR(255) | 职位，如“后端工程师” | |
| company | VARCHAR(255) | 公司/学校 | |
| bio | TEXT | 个人简介（更长的介绍） | |
| location | VARCHAR(255) | 所在地 | |
| website | VARCHAR(500) | 个人网站 | |
| github | VARCHAR(255) | GitHub 用户名 | |
| skills | JSON | 技能标签数组 | |
| social_links | JSON | 社交链接（微信、微博、LinkedIn 等） | |
| avatar | VARCHAR(500) | 头像图片URL | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `unique_user_id`: 保证每个用户最多一条扩展资料
- `idx_user_id`: user_id字段索引

---

### 2. notes - 笔记表

存储用户创建的所有笔记。

```sql
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(255),
  technology VARCHAR(255),
  subcategory VARCHAR(255),
  tags JSON,
  is_public BOOLEAN DEFAULT FALSE,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_author_id (author_id),
  INDEX idx_is_public (is_public),
  INDEX idx_category (category),
  INDEX idx_technology (technology),
  INDEX idx_created_at (created_at),
  INDEX idx_updated_at (updated_at),
  FULLTEXT KEY ft_title (title),
  FULLTEXT KEY ft_content (content),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| title | VARCHAR(500) | 笔记标题 | NOT NULL |
| content | LONGTEXT | 笔记内容（Markdown） | NOT NULL |
| category | VARCHAR(255) | 笔记分类 | |
| technology | VARCHAR(255) | 技术标签 | |
| subcategory | VARCHAR(255) | 子分类 | |
| tags | JSON | 标签数组 | |
| is_public | BOOLEAN | 是否公开 | DEFAULT FALSE |
| author_id | INT | 作者ID | NOT NULL, FK |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `idx_author_id`: author_id字段索引
- `idx_is_public`: is_public字段索引
- `idx_category`: category字段索引
- `idx_technology`: technology字段索引
- `idx_created_at`: created_at字段索引
- `idx_updated_at`: updated_at字段索引
- `ft_title`: title字段全文索引
- `ft_content`: content字段全文索引

**外键：**
- `author_id` → `users(id)` ON DELETE CASCADE

**注意：** 
- 点赞数和收藏数通过子查询动态计算，不存储在表中
- 查询时使用：`(SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count`

---

### 3. note_likes - 笔记点赞表

记录用户对笔记的点赞。

```sql
CREATE TABLE note_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (note_id, user_id),
  INDEX idx_note_id (note_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| note_id | INT | 被点赞笔记ID | NOT NULL, FK |
| user_id | INT | 点赞用户ID | NOT NULL, FK |
| created_at | TIMESTAMP | 点赞时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `unique_like`: (note_id, user_id) 唯一索引，防止重复点赞
- `idx_note_id`: note_id字段索引
- `idx_user_id`: user_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `note_id` → `notes(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 4. note_bookmarks - 笔记收藏表

记录用户收藏的笔记。

```sql
CREATE TABLE note_bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_bookmark (note_id, user_id),
  INDEX idx_note_id (note_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| note_id | INT | 被收藏笔记ID | NOT NULL, FK |
| user_id | INT | 收藏用户ID | NOT NULL, FK |
| created_at | TIMESTAMP | 收藏时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `unique_bookmark`: (note_id, user_id) 唯一索引，防止重复收藏
- `idx_note_id`: note_id字段索引
- `idx_user_id`: user_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `note_id` → `notes(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 5. comments - 评论表

存储用户对笔记的评论，支持嵌套评论。

```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  parent_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_note_id (note_id),
  INDEX idx_user_id (user_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| note_id | INT | 被评论笔记ID | NOT NULL, FK |
| user_id | INT | 评论用户ID | NOT NULL, FK |
| content | TEXT | 评论内容 | NOT NULL |
| parent_id | INT | 父评论ID（嵌套评论） | DEFAULT NULL, FK |
| created_at | TIMESTAMP | 评论时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `idx_note_id`: note_id字段索引
- `idx_user_id`: user_id字段索引
- `idx_parent_id`: parent_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `note_id` → `notes(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE
- `parent_id` → `comments(id)` ON DELETE CASCADE

---

### 6. comment_likes - 评论点赞表

记录用户对评论的点赞。

```sql
CREATE TABLE comment_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_comment_like (comment_id, user_id),
  INDEX idx_comment_id (comment_id),
  INDEX idx_user_id (user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| comment_id | INT | 评论ID | NOT NULL, FK |
| user_id | INT | 用户ID | NOT NULL, FK |
| created_at | TIMESTAMP | 点赞时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `unique_comment_like`: (comment_id, user_id) 唯一索引
- `idx_comment_id`: comment_id字段索引
- `idx_user_id`: user_id字段索引

**外键：**
- `comment_id` → `comments(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 7. search_history - 搜索历史表

记录用户的搜索历史记录。

```sql
CREATE TABLE search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  query VARCHAR(500) NOT NULL,
  results_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| user_id | INT | 用户ID | NOT NULL, FK |
| query | VARCHAR(500) | 搜索关键词 | NOT NULL |
| results_count | INT | 搜索结果数量 | DEFAULT 0 |
| created_at | TIMESTAMP | 搜索时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `idx_user_id`: user_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 8. learning_stats - 学习统计表

记录用户学习活动和统计数据。

```sql
CREATE TABLE learning_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity VARCHAR(255),
  points INT DEFAULT 0,
  study_time INT DEFAULT 0,
  category VARCHAR(100),
  technology VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| user_id | INT | 用户ID | NOT NULL, FK |
| activity | VARCHAR(255) | 学习活动名称 | |
| points | INT | 积分 | DEFAULT 0 |
| study_time | INT | 学习时间(分钟) | DEFAULT 0 |
| category | VARCHAR(100) | 学习分类 | |
| technology | VARCHAR(100) | 学习技术 | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `idx_user_id`: user_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 9. study_sessions - 学习会话表

记录用户实时学习时间和会话信息。

```sql
CREATE TABLE study_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  study_time INT NOT NULL,
  category VARCHAR(255),
  technology VARCHAR(255),
  activity VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| user_id | INT | 用户ID | NOT NULL, FK |
| study_time | INT | 学习时间(分钟) | NOT NULL |
| category | VARCHAR(255) | 学习分类 | |
| technology | VARCHAR(255) | 学习技术 | |
| activity | VARCHAR(255) | 学习活动名称 | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `idx_user_id`: user_id字段索引
- `idx_created_at`: created_at字段索引

**外键：**
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 10. user_achievements - 用户成就表

记录用户获得的成就和进度。

```sql
CREATE TABLE user_achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_achievement (user_id, achievement_id),
  INDEX idx_user_id (user_id),
  INDEX idx_achievement_id (achievement_id),
  INDEX idx_earned_at (earned_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| user_id | INT | 用户ID | NOT NULL, FK |
| achievement_id | VARCHAR(100) | 成就ID | NOT NULL |
| title | VARCHAR(255) | 成就名称 | NOT NULL |
| description | TEXT | 成就描述 | |
| earned_at | TIMESTAMP | 解锁时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `unique_user_achievement`: (user_id, achievement_id) 唯一索引
- `idx_user_id`: user_id字段索引
- `idx_achievement_id`: achievement_id字段索引
- `idx_earned_at`: earned_at字段索引

**外键：**
- `user_id` → `users(id)` ON DELETE CASCADE

---

### 11. challenges - 编程挑战表

存储编程挑战题目。

```sql
CREATE TABLE challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  category VARCHAR(255),
  points INT DEFAULT 0,
  test_cases JSON,
  starter_code TEXT,
  solution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_difficulty (difficulty),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| title | VARCHAR(500) | 挑战标题 | NOT NULL |
| description | TEXT | 挑战描述 | NOT NULL |
| difficulty | ENUM | 难度等级 | 'easy', 'medium', 'hard' |
| category | VARCHAR(255) | 挑战分类 | |
| points | INT | 积分奖励 | DEFAULT 0 |
| test_cases | JSON | 测试用例 | |
| starter_code | TEXT | 起始代码 | |
| solution | TEXT | 参考答案 | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新时间 | ON UPDATE CURRENT_TIMESTAMP |

**索引：**
- `idx_difficulty`: difficulty字段索引
- `idx_category`: category字段索引
- `idx_created_at`: created_at字段索引

---

### 12. challenge_submissions - 挑战提交记录表

记录用户提交的挑战答案。

```sql
CREATE TABLE challenge_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  user_id INT NOT NULL,
  code TEXT NOT NULL,
  language VARCHAR(50) NOT NULL,
  status ENUM('pending', 'passed', 'failed') DEFAULT 'pending',
  score INT DEFAULT 0,
  execution_time INT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_challenge_id (challenge_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_submitted_at (submitted_at),
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
```

| 字段名 | 类型 | 说明 | 约束 |
|-------|------|------|------|
| id | INT | 主键，自增 | PRIMARY KEY |
| challenge_id | INT | 挑战ID | NOT NULL, FK |
| user_id | INT | 用户ID | NOT NULL, FK |
| code | TEXT | 提交的代码 | NOT NULL |
| language | VARCHAR(50) | 编程语言 | NOT NULL |
| status | ENUM | 提交状态 | 'pending', 'passed', 'failed' |
| score | INT | 得分 | DEFAULT 0 |
| execution_time | INT | 执行时间(ms) | |
| submitted_at | TIMESTAMP | 提交时间 | DEFAULT CURRENT_TIMESTAMP |

**索引：**
- `idx_challenge_id`: challenge_id字段索引
- `idx_user_id`: user_id字段索引
- `idx_status`: status字段索引
- `idx_submitted_at`: submitted_at字段索引

**外键：**
- `challenge_id` → `challenges(id)` ON DELETE CASCADE
- `user_id` → `users(id)` ON DELETE CASCADE

---

## 表关系图

```
users (用户表)
  ├─→ notes (笔记表) [author_id]
  │    ├─→ note_likes (点赞表) [note_id]
  │    ├─→ note_bookmarks (收藏表) [note_id]
  │    └─→ comments (评论表) [note_id]
  │         └─→ comment_likes (评论点赞表) [comment_id]
  ├─→ search_history (搜索历史表) [user_id]
  ├─→ learning_stats (学习统计表) [user_id]
  ├─→ study_sessions (学习会话表) [user_id]
  ├─→ user_achievements (用户成就表) [user_id]
  └─→ challenge_submissions (挑战提交表) [user_id]

challenges (编程挑战表)
  └─→ challenge_submissions (挑战提交表) [challenge_id]
```

---

## 重要说明

### 1. 字段命名规范
- 表名：小写+下划线（snake_case）
- 字段名：小写+下划线（snake_case）
- 外键字段：`表名_id` 格式
- 时间字段：`created_at`, `updated_at`

### 2. 数据完整性
- 所有外键都设置了 `ON DELETE CASCADE`，删除父记录时自动删除子记录
- 使用唯一索引防止重复数据（如重复点赞、重复收藏）
- 使用 ENUM 类型限制字段值范围

### 3. 性能优化
- 为常用查询字段添加索引
- 笔记表的 title 和 content 字段使用全文索引支持搜索
- 点赞数和收藏数通过子查询动态计算，避免数据不一致

### 4. 字段不一致问题（已修复）
- ✅ 笔记表使用 `author_id` 而不是 `user_id`
- ✅ 点赞表统一使用 `note_likes`
- ✅ 收藏表统一使用 `note_bookmarks`
- ✅ 用户头像字段统一使用 `avatar`

### 5. 动态计算字段
以下字段不存储在数据库中，而是通过子查询动态计算：
- `like_count`: 笔记的点赞数
- `bookmark_count`: 笔记的收藏数
- `comment_count`: 笔记的评论数

查询示例：
```sql
SELECT n.*, 
       (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
       (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
       (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
FROM notes n
WHERE n.id = ?
```

---

## 数据库初始化

运行以下命令初始化数据库：

```bash
node scripts/init-database.js
```

该脚本会：
1. 创建所有表结构
2. 添加必要的索引
3. 设置外键约束
4. 验证表创建状态

---

## 数据库连接配置

在 `.env` 文件中配置数据库连接：

```env
DB_HOST=localhost
DB_USER=ecs-user
DB_PASSWORD=123456
DB_NAME=partjava_notes
```

---

## 常用查询示例

### 获取用户的所有笔记（包含统计）
```sql
SELECT n.*, 
       (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
       (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
       (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
FROM notes n
WHERE n.author_id = ?
ORDER BY n.created_at DESC
```

### 获取平台统计数据
```sql
-- 用户总数
SELECT COUNT(*) as total_users FROM users;

-- 笔记总数
SELECT COUNT(*) as total_notes FROM notes;

-- 公开笔记数
SELECT COUNT(*) as public_notes FROM notes WHERE is_public = 1;

-- 总点赞数
SELECT COUNT(*) as total_likes FROM note_likes;

-- 总学习时间
SELECT SUM(study_time) as total_study_time FROM study_sessions;
```

### 获取热门笔记
```sql
SELECT n.*, 
       u.name as author_name,
       (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
       (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = n.id) as bookmark_count,
       (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
FROM notes n
LEFT JOIN users u ON n.author_id = u.id
WHERE n.is_public = 1
ORDER BY like_count DESC, bookmark_count DESC
LIMIT 10
```

---

## 版本历史

- **v1.0** (2024-03): 初始数据库结构
- **v1.1** (2024-06): 添加评论点赞功能
- **v1.2** (2024-09): 添加编程挑战功能
- **v1.3** (2024-12): 优化索引和查询性能
- **v2.0** (2026-03): 完善文档，修复字段不一致问题，添加平台统计API

---

## 数据库性能优化

### 索引优化
- 为常用查询字段添加索引
- 使用复合索引优化多字段查询
- 定期分析和优化索引使用情况

### 查询优化
```sql
-- 使用EXPLAIN分析查询性能
EXPLAIN SELECT * FROM notes WHERE author_id = ? AND is_public = 1;

-- 避免SELECT *，只查询需要的字段
SELECT id, title, created_at FROM notes WHERE author_id = ?;

-- 使用JOIN优化关联查询
SELECT n.*, u.name as author_name 
FROM notes n 
INNER JOIN users u ON n.author_id = u.id 
WHERE n.is_public = 1;
```

### 连接池配置
```javascript
// 数据库连接池配置
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

---

## 数据库备份与恢复

### 备份命令
```bash
# 备份整个数据库
mysqldump -u ecs-user -p partjava_notes > backup_$(date +%Y%m%d).sql

# 备份特定表
mysqldump -u ecs-user -p partjava_notes users notes > backup_users_notes.sql

# 压缩备份
mysqldump -u ecs-user -p partjava_notes | gzip > backup_$(date +%Y%m%d).sql.gz
```

### 恢复命令
```bash
# 恢复数据库
mysql -u ecs-user -p partjava_notes < backup_20260307.sql

# 从压缩文件恢复
gunzip < backup_20260307.sql.gz | mysql -u ecs-user -p partjava_notes
```

---

## 数据库监控

### 性能监控查询
```sql
-- 查看慢查询
SHOW VARIABLES LIKE 'slow_query%';

-- 查看连接数
SHOW STATUS LIKE 'Threads_connected';

-- 查看表大小
SELECT 
  table_name AS 'Table',
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'partjava_notes'
ORDER BY (data_length + index_length) DESC;
```

---

最后更新：2026年3月7日
