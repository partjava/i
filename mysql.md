# 数据库结构说明文档

## 数据库表结构

本项目使用MySQL数据库，包含以下主要表结构：

### 1. users - 用户表

用户基本信息表，存储用户账号和个人资料。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| name | VARCHAR(255) | 用户名称 |
| email | VARCHAR(255) | 邮箱地址，唯一 |
| password | VARCHAR(255) | 密码 |
| bio | TEXT | 个人简介 |
| location | VARCHAR(255) | 所在地 |
| website | VARCHAR(500) | 个人网站 |
| github | VARCHAR(255) | GitHub用户名 |
| image | VARCHAR(500) | 头像图片URL |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 2. notes - 笔记表

存储用户创建的所有笔记。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| title | VARCHAR(500) | 笔记标题 |
| content | TEXT | 笔记内容 |
| category | VARCHAR(100) | 笔记分类 |
| technology | VARCHAR(100) | 技术标签 |
| subcategory | VARCHAR(100) | 子分类 |
| tags | JSON | 标签数组 |
| is_public | BOOLEAN | 是否公开 |
| author_id | INT | 作者ID，关联users表 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 3. note_likes - 笔记点赞表

记录用户对笔记的点赞。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 点赞用户ID |
| note_id | INT | 被点赞笔记ID |
| created_at | TIMESTAMP | 点赞时间 |

### 4. note_bookmarks - 笔记收藏表

记录用户收藏的笔记。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 收藏用户ID |
| note_id | INT | 被收藏笔记ID |
| created_at | TIMESTAMP | 收藏时间 |

### 5. comments - 评论表

存储用户对笔记的评论。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| note_id | INT | 被评论笔记ID |
| user_id | INT | 评论用户ID |
| content | TEXT | 评论内容 |
| created_at | TIMESTAMP | 评论时间 |

### 6. learning_stats - 学习统计表

记录用户学习活动和统计数据。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID |
| category | VARCHAR(100) | 学习分类 |
| technology | VARCHAR(100) | 学习技术 |
| activity | VARCHAR(255) | 学习活动名称 |
| points | INT | 积分 |
| study_time | INT | 学习时间(分钟) |
| notes_count | INT | 笔记数量 |
| last_study_date | DATE | 最后学习日期 |

### 7. study_sessions - 学习会话表

记录用户实时学习时间和会话信息。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID |
| study_time | INT | 学习时间(分钟) |
| category | VARCHAR(100) | 学习分类 |
| technology | VARCHAR(100) | 学习技术 |
| activity | VARCHAR(255) | 学习活动名称 |
| created_at | TIMESTAMP | 创建时间 |

### 8. search_history - 搜索历史表

记录用户的搜索历史记录。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID |
| query | VARCHAR(200) | 搜索关键词 |
| created_at | TIMESTAMP | 搜索时间 |

### 9. achievements - 成就表

存储系统中的所有成就定义。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | VARCHAR(50) | 主键，成就唯一标识符 |
| name | VARCHAR(100) | 成就名称 |
| description | TEXT | 成就描述 |
| icon | VARCHAR(100) | 成就图标 |
| category | VARCHAR(50) | 成就分类 |
| max_progress | INT | 成就最大进度值 |
| sort_order | INT | 排序顺序 |
| created_at | TIMESTAMP | 创建时间 |

### 10. user_achievements - 用户成就表

记录用户获得的成就和进度。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID |
| achievement_id | VARCHAR(50) | 成就ID，关联achievements表 |
| unlocked | BOOLEAN | 是否解锁 |
| progress | INT | 当前进度 |
| unlocked_at | TIMESTAMP | 解锁时间 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |


### 11. comment_likes - 评论点赞表

记录用户对评论的点赞。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| comment_id | INT | 评论ID |
| user_id | INT | 用户ID |
| created_at | TIMESTAMP | 点赞时间 |

### 12. user_profiles - 用户资料表

存储用户的详细资料信息。

| 字段名 | 类型 | 说明 |
|-------|------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID，关联users表 |
| name | VARCHAR(255) | 用户名称 |
| bio | TEXT | 个人简介 |
| location | VARCHAR(255) | 所在地 |
| website | VARCHAR(500) | 个人网站 |
| github | VARCHAR(255) | GitHub用户名 |
| avatar | VARCHAR(500) | 头像图片URL |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 表关系说明

1. **用户与笔记**: 一对多关系
   - 一个用户(`users.id`)可以创建多个笔记(`notes.author_id`)

2. **笔记与点赞**: 一对多关系
   - 一个笔记(`notes.id`)可以被多个用户点赞(`note_likes.note_id`)

3. **笔记与收藏**: 一对多关系
   - 一个笔记(`notes.id`)可以被多个用户收藏(`note_bookmarks.note_id`)

4. **笔记与评论**: 一对多关系
   - 一个笔记(`notes.id`)可以有多条评论(`comments.note_id`)

5. **用户与学习统计**: 一对多关系
   - 一个用户(`users.id`)有多条学习记录(`learning_stats.user_id`)

## 字段名不一致问题修复

在项目中发现的字段名不一致问题：

1. 在API中错误使用了`user_id`而不是`author_id`来查询笔记表
2. 点赞表在不同地方使用了不同的表名：`likes`和`note_likes`
3. 收藏功能在不同地方使用了不同的表名：`favorites`和`note_bookmarks`

这些问题已经修复，确保所有查询都使用正确的表名和字段名。

## 注意事项

1. 所有表都使用了索引来优化查询性能
2. 笔记表的`is_public`字段用于控制笔记是否公开可见
3. `user_profiles`表用于存储用户的详细资料信息
2. 所有表都使用了索引来优化查询性能
3. 笔记表的`is_public`字段用于控制笔记是否公开可见
