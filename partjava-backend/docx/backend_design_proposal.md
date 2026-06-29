# PartJava 核心业务后端设计规格说明书 (Spring Boot 3.x + Docker Sandbox)

本说明书作为 PartJava 智能学习平台后端的标准设计规格书，用于指导项目从 Next.js BFF 接口完整重构为 **Java 21 / Spring Boot 3.3.x** 服务端架构。

> [!IMPORTANT]
> **在你（用户）说觉得没问题并且测试验证通过之前，绝对不要删除或修改原有的 Next.js BFF 接口代码或老代码**。我们应当保持新旧后端代码“双轨并行”的开发和测试方式，确保原平台能够正常平稳运行。

---

## 1. 系统骨架与技术栈选型

*   **运行环境**：JDK 21（深度利用虚拟线程 Virtual Threads 提升并发性能）。
*   **基础框架**：Spring Boot 3.3.x + Web 依赖。
*   **持久化层**：MySQL 8.0（数据持久化） + Redis 7.x（缓存、频控与打卡位图）。
*   **ORM 框架**：MyBatis-Plus 3.5.x（支持对 MySQL 表的 CRUD 映射与自动填充）。
*   **安全与鉴权**：Spring Security 6.x + JJWT (0.12.x) 无状态 JWT token 校验过滤。
*   **API 文档**：Springdoc-openapi-starter-webmvc-ui (Swagger 3)。

---

### 📂 1.2 后端包与目录结构规划 (Project Package Layout)

在新建的 `partjava-backend` 工程中，请建立以下标准的 Maven 包骨架结构：

```
i/partjava-backend/
├── pom.xml                               # Maven 依赖定义
├── src/main/java/com/partjava/
│   ├── PartJavaApplication.java          # Spring Boot 启动入口
│   ├── common/                           # 公共组件与工具
│   │   ├── api/                          # 统一 API 响应包装类 (ApiResponse)
│   │   ├── exception/                    # 全局异常拦截与自定义业务异常
│   │   └── utils/                        # 常用工具类 (JWT签发解析、SecurityUtils)
│   ├── config/                           # 配置层
│   │   ├── SecurityConfig.java           # Spring Security / CORS 权限配置
│   │   ├── RedisConfig.java              # RedisTemplate 序列化配置
│   │   └── MyBatisPlusConfig.java        # 自动填充、分页拦截器与 TypeHandler
│   ├── controller/                       # 控制层 (RESTful API 路由)
│   │   ├── AuthController.java           # 注册登录与邮箱验证
│   │   ├── UserController.java           # 个人资料、头像上传与学习热力图
│   │   ├── NoteController.java           # 笔记分类与 CRUD、点赞收藏
│   │   ├── CommentController.java        # 评论树形列表与回复、点赞评论
│   │   ├── ChallengeController.java      # 算法关卡进度、做题面板、选择/主观题评测
│   │   ├── AiController.java             # AI 答疑中转长连接 (SSE)
│   │   └── admin/                        # 管理员专属接口
│   │       └── AdminChallengeController.java
│   ├── service/                          # 业务逻辑接口层
│   │   ├── UserService.java
│   │   ├── NoteService.java
│   │   ├── ChallengeService.java
│   │   └── SandboxService.java           # Docker 安全判题核心
│   │   └── impl/                         # 业务逻辑实现层
│   │       ├── UserServiceImpl.java
│   │       ├── NoteServiceImpl.java
│   │       ├── ChallengeServiceImpl.java
│   │       └── SandboxServiceImpl.java
│   ├── repository/                       # 数据访问层 (Mapper 接口)
│   │   ├── UserMapper.java
│   │   ├── NoteMapper.java
│   │   └── ChallengeMapper.java
│   ├── entity/                           # 数据库映射实体 (POJO)
│   │   ├── User.java
│   │   ├── UserProfile.java
│   │   ├── Note.java
│   │   ├── Challenge.java
│   │   ├── ChallengeDetail.java
│   │   └── UserChallengeRecord.java
│   ├── dto/                              # 数据传输对象 (DTOs)
│   │   ├── request/                      # 接收前端请求参数 (如 ChallengeSubmitReq)
│   │   └── response/                     # 返回前端的数据实体 (如 ChallengeProgressResp)
│   └── event/                            # 异步事件模型 (成就事件定义与监听)
└── src/main/resources/
    ├── application.yml                   # 全局基础配置文件
    ├── application-dev.yml               # 本地开发环境配置
    └── mapper/                           # 自定义复杂 SQL 的 Mapper XML
```

---

### 📦 pom.xml 核心依赖配置

```xml
<dependencies>
    <!-- Spring Boot 核心 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>

    <!-- MyBatis-Plus 与 MySQL -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
        <version>3.5.7</version>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- JWT 依赖 -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.5</version>
        <scope>runtime</scope>
    </dependency>

    <!-- OpenAPI (Swagger 3) -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.5.0</version>
    </dependency>
</dependencies>
```

---

## 2. 数据库设计物理表 DDL (更新后的完整数据库设计)

请直接复制以下建表 SQL 在 MySQL 8.0 数据库中执行初始化：

```sql
-- 确保数据库编码支持 Emoji 与特殊数学符号
CREATE DATABASE IF NOT EXISTS partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE partjava_notes;

-- 1. 用户基本信息表 (增加了 VIP 会员与出题限制字段)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL COMMENT '登录用户名 (限英文与数字的组合)',
  email VARCHAR(255) UNIQUE NOT NULL COMMENT '用户登录邮箱',
  name VARCHAR(255) NOT NULL COMMENT '用户昵称',
  password VARCHAR(255) NOT NULL COMMENT 'BCrypt加密密码',
  role VARCHAR(20) DEFAULT 'USER' COMMENT '角色: USER (普通用户), ADMIN (管理员)',
  status VARCHAR(20) DEFAULT 'ACTIVE' COMMENT '状态: ACTIVE (正常), BANNED (封禁)',
  bio TEXT COMMENT '个性签名',
  location VARCHAR(255) COMMENT '所在城市',
  website VARCHAR(500) COMMENT '个人网站',
  github VARCHAR(255) COMMENT 'GitHub主页',
  avatar VARCHAR(500) COMMENT '头像URL',
  email_verified TINYINT(1) DEFAULT 0 COMMENT '邮箱是否通过激活',
  vip TINYINT(1) DEFAULT 0 COMMENT '是否为VIP: 0=否, 1=是',
  vip_level INT DEFAULT 0 COMMENT '会员等级: 1=体验VIP, 2=进阶VIP, 3=永久共创',
  vip_expire_time TIMESTAMP NULL DEFAULT NULL COMMENT '会员到期时间',
  draft_count INT DEFAULT 0 COMMENT '当月已出题数',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 用户扩展资料表
CREATE TABLE IF NOT EXISTS user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL COMMENT '关联 users.id',
  name VARCHAR(255) COMMENT '真实姓名',
  job_title VARCHAR(255) COMMENT '工作岗位',
  company VARCHAR(255) COMMENT '所在公司',
  bio TEXT COMMENT '职业描述',
  location VARCHAR(255) COMMENT '工作地点',
  website VARCHAR(500) COMMENT '网站',
  github VARCHAR(255) COMMENT 'GitHub',
  skills JSON COMMENT '个人技能栈数组 (MySQL JSON)',
  social_links JSON COMMENT '社交网络链接对 (MySQL JSON)',
  avatar MEDIUMTEXT COMMENT '头像扩展字段',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_id (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 笔记内容表
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL COMMENT '笔记标题',
  content TEXT COMMENT 'Markdown内容',
  category VARCHAR(100) COMMENT '大分类',
  technology VARCHAR(100) COMMENT '技术分类',
  subcategory VARCHAR(100) COMMENT '子分类',
  tags JSON COMMENT '标签列表 (MySQL JSON 格式)',
  is_public BOOLEAN DEFAULT FALSE COMMENT '是否公开',
  author_id INT NOT NULL COMMENT '关联 users.id',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_author_id (author_id),
  INDEX idx_category (category),
  INDEX idx_is_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 笔记点赞表
CREATE TABLE IF NOT EXISTS note_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (user_id, note_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. 笔记收藏表
CREATE TABLE IF NOT EXISTS note_bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_bookmark (user_id, note_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 笔记评论表 (扩展了 parent_id 以支持自关联评论树)
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  parent_id INT DEFAULT NULL COMMENT '父级评论ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. 评论点赞表
CREATE TABLE IF NOT EXISTS comment_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_comment_like (comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. 全局学习统计数据表
CREATE TABLE IF NOT EXISTS learning_stats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  activity VARCHAR(255) COMMENT '当前动态',
  points INT DEFAULT 0 COMMENT '积分',
  category VARCHAR(100),
  technology VARCHAR(100),
  study_time INT DEFAULT 0 COMMENT '学习时长（秒）',
  notes_count INT DEFAULT 0 COMMENT '笔记总数',
  last_study_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_stats (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. 每日学习时间片段打卡记录表
CREATE TABLE IF NOT EXISTS study_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  study_time INT NOT NULL DEFAULT 0 COMMENT '打卡所得学习时长(秒)',
  category VARCHAR(100),
  technology VARCHAR(100),
  activity VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  study_date DATE GENERATED ALWAYS AS (DATE(created_at)) STORED,
  UNIQUE KEY unique_user_date (user_id, study_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. 搜索历史表
CREATE TABLE IF NOT EXISTS search_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  query VARCHAR(200) NOT NULL COMMENT '检索关键词',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. 静态成就定义表
CREATE TABLE IF NOT EXISTS achievements (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  category VARCHAR(50),
  max_progress INT DEFAULT 1 COMMENT '达成所需阈值量',
  sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. 用户成就解锁记录关联表
CREATE TABLE IF NOT EXISTS user_achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_id VARCHAR(50) NOT NULL,
  unlocked BOOLEAN DEFAULT FALSE COMMENT '是否已解锁',
  progress INT DEFAULT 0 COMMENT '当前进度数',
  unlocked_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_achievement (user_id, achievement_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. AI 聊天会话列表
CREATE TABLE IF NOT EXISTS ai_conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) DEFAULT '新对话',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. AI 对话消息详细历史记录表
CREATE TABLE IF NOT EXISTS ai_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  role ENUM('user','assistant') NOT NULL COMMENT '消息角色',
  content TEXT NOT NULL COMMENT '文本Markdown内容',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. 笔记静态插图存储表 (LONGBLOB 存储二进制图片流)
CREATE TABLE IF NOT EXISTS note_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  data LONGBLOB NOT NULL COMMENT '图片二进制大对象字节流',
  size INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. 静态页面阅读学习进度状态表
CREATE TABLE IF NOT EXISTS study_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  page_path VARCHAR(500) NOT NULL COMMENT '页面访问路由 (/study/se/android)',
  completed TINYINT(1) NOT NULL DEFAULT 0,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_page (user_id, page_path),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. 闯关挑战配置主表 (扩展了小节与发布属性字段)
CREATE TABLE IF NOT EXISTS challenges (
  id VARCHAR(64) PRIMARY KEY COMMENT '关卡唯一ID (如 svm-iris-classification)',
  title VARCHAR(255) NOT NULL COMMENT '关卡标题',
  stage_id INT NOT NULL COMMENT '对应宇宙阶段 (1-11)',
  topic_name VARCHAR(100) NOT NULL DEFAULT '其它' COMMENT '对应大主题名称 (如: 语法基础)',
  subtopic_name VARCHAR(100) NOT NULL DEFAULT '未分类' COMMENT '对应小节名称 (如: 变量与数据类型)',
  level_index INT NOT NULL DEFAULT 1 COMMENT '小节内的关卡序号 (1, 2, 3)',
  points INT DEFAULT 10 COMMENT '奖励积分',
  difficulty VARCHAR(20) DEFAULT 'medium' COMMENT '难度 (easy, medium, hard)',
  access_level VARCHAR(20) DEFAULT 'member' COMMENT '访问权限: free, member, vip',
  status VARCHAR(20) DEFAULT 'published' COMMENT '发布状态: published, draft, archived',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_stage_subtopic_level (stage_id, subtopic_name, level_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. 闯关挑战详情配置表 (剥离了选择题，添加了标准答案 solution_code 与 ai_prompt)
CREATE TABLE IF NOT EXISTS challenge_details (
  challenge_id VARCHAR(64) PRIMARY KEY COMMENT '关联 challenges.id',
  theory_markdown TEXT COMMENT 'Markdown 理论正文说明',
  latex_formulas JSON COMMENT 'LaTeX 公式数组 JSON',
  starter_code TEXT COMMENT '学生看到的起手模板代码',
  solution_code TEXT NOT NULL COMMENT '标准参考答案',
  evaluation_script TEXT NOT NULL COMMENT '在隔离容器中执行的单元测试评测脚本',
  required_datasets JSON COMMENT '测试数据集的挂载配置 JSON',
  thinking_question TEXT COMMENT '思考题题干',
  ai_prompt TEXT COMMENT 'AI打分的评分依据及 Prompt',
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. 选择题物理关联表 (从 details 大 JSON 剥离出来符合 3NF)
CREATE TABLE IF NOT EXISTS challenge_quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id VARCHAR(64) NOT NULL COMMENT '关联 challenges.id',
  question TEXT NOT NULL COMMENT '选择题干',
  options JSON NOT NULL COMMENT '选项数组 (如 ["A..", "B.."])',
  correct_index INT NOT NULL COMMENT '正确答案索引 (0-3)',
  explanation TEXT COMMENT '答案解析',
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. 会员出题草稿箱表
CREATE TABLE IF NOT EXISTS challenge_drafts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL COMMENT '出题人用户ID',
  stage_id INT NOT NULL COMMENT '阶段 (1-11)',
  topic_name VARCHAR(100) NOT NULL COMMENT '所属主题',
  subtopic_name VARCHAR(100) NOT NULL COMMENT '所属小节',
  level_title VARCHAR(255) NOT NULL COMMENT '关卡标题',
  theory_content TEXT COMMENT '理论内容',
  latex_formulas JSON COMMENT 'LaTeX 公式 JSON',
  starter_code TEXT COMMENT '起手代码',
  solution_code TEXT COMMENT '标准代码',
  quizzes JSON COMMENT '选择题集合 JSON',
  thinking_question TEXT COMMENT '思考题描述',
  ai_prompt TEXT COMMENT 'AI打分 Prompt',
  status VARCHAR(20) DEFAULT 'pending' COMMENT '状态: pending, approved, rejected',
  review_comment TEXT COMMENT '审核驳回意见',
  reviewer_id INT DEFAULT NULL COMMENT '审核管理员ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. 用户关卡做题记录进度状态表 (记录选择题作答历史 quiz_answers JSON)
CREATE TABLE IF NOT EXISTS user_challenge_records (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL COMMENT '关联 users.id',
  challenge_id VARCHAR(64) NOT NULL,
  completed BOOLEAN DEFAULT FALSE COMMENT '是否已通关',
  best_code TEXT COMMENT '通过的最优代码备份',
  last_code TEXT COMMENT '编辑器中保存的上一次代码草稿',
  quiz_status VARCHAR(30) DEFAULT 'NOT_STARTED' COMMENT '选择题状态 (NOT_STARTED, PASSED)',
  quiz_answers JSON DEFAULT NULL COMMENT '用户选择题的作答选项草稿 JSON',
  thinking_answer TEXT COMMENT '主观思考题回答文本',
  thinking_score INT DEFAULT NULL COMMENT 'AI 主观题评分 (0-10 分)',
  thinking_feedback TEXT COMMENT 'AI 主观题点评语',
  completed_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_challenge (user_id, challenge_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
---

## 3. MyBatis-Plus 复杂 JSON 字段字段映射 (JacksonTypeHandler)

在上述表结构中，MySQL 中的 `JSON` 类型字段（如 `tags`, `skills`, `theory`, `required_datasets` 等）在 Java POJO 实体中不能直接声明为 String，推荐配置 MyBatis-Plus 提供的 `JacksonTypeHandler` 自动在 Java 数据对象与 JSON 字符流之间双向转换。

### ☕ ChallengeDetail 实体及其类型安全 JSON DTO 示例

为了规避通用 `Map` 导致的反序列化类型安全问题与繁琐的强转开销，应设计强类型 POJO 类来承载 JSON 字段的解析结构：

```java
package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;
import java.util.List;

@Data
@TableName(value = "challenge_details", autoResultMap = true) // 必须开启 autoResultMap!
public class ChallengeDetail {
    @TableId(type = IdType.INPUT)
    private String challengeId;

    private String theoryMarkdown;          // 理论 Markdown 说明

    // LaTeX 公式数组 JSON 映射
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<String> latexFormulas;

    private String starterCode;             // 起手模板代码
    private String solutionCode;            // 标准参考答案
    private String evaluationScript;        // 单元测试评测脚本

    // 测试数据集的挂载配置 JSON 映射: [{"name": "iris.csv", "mountPath": "/data/iris.csv"}]
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<ChallengeDetail.DatasetConfig> requiredDatasets;

    private String thinkingQuestion;        // 主观思考题干
    private String aiPrompt;                // AI 评测的打分参考依据

    @Data
    public static class DatasetConfig {
        private String name;
        private String mountPath;
    }
}
```

---

## 4. 核心 API 报文设计 (REST API Specification)

### 📡 4.1 认证模块 (AuthController)
#### A. 用户注册 (`POST /api/auth/register`)
*   **请求参数**：
    ```json
    {
      "name": "测试用户",
      "email": "test@partjava.com",
      "password": "mypassword123"
    }
    ```
*   **成功返回** (HttpStatus: 200)：
    ```json
    {
      "success": true,
      "message": "注册成功，欢迎加入 PartJava"
    }
    ```

#### B. 用户登录并签发 JWT (`POST /api/auth/login`)
*   **请求参数**：
    ```json
    {
      "email": "test@partjava.com",
      "password": "mypassword123"
    }
    ```
*   **成功返回**：
    ```json
    {
      "success": true,
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjo...",
        "user": {
          "id": 1,
          "name": "测试用户",
          "email": "test@partjava.com"
        }
      },
      "message": "登录成功"
    }
    ```

---

### 📡 4.2 宇宙关卡模块 (ChallengeController)
#### A. 获取用户当前全局宇宙进度 (`GET /api/challenges/progress`)
*   **鉴权头**：`Authorization: Bearer <token>`
*   **成功返回**：
    ```json
    {
      "success": true,
      "data": {
        "completedStages": 2, // 已通关的宇宙节点数
        "totalCount": 11,      // 总节点数 (ST-01 至 ST-11)
        "stagesProgress": [
          {
            "challengeId": "matrix-operations",
            "completed": true,
            "quizStatus": "PASSED",
            "thinkingScore": 9
          },
          {
            "challengeId": "python-generators",
            "completed": false,
            "quizStatus": "NOT_STARTED",
            "thinkingScore": null
          }
        ]
      }
    }
    ```

#### B. 获取单关卡面板详情 (`GET /api/challenges/{id}`)
*   **拦截规则**：若该关卡上一关未通关（`completed = FALSE` 且 `level_num > max_completed_level + 1`），接口拒绝访问并返回 `403 Forbidden`。
*   **成功返回**：
    ```json
    {
      "success": true,
      "data": {
        "id": "svm-iris-classification",
        "title": "支持向量机 (SVM) 分类",
        "points": 50,
        "theory": {
          "markdown": "### SVM 分类基础\n通过在高维空间中寻找最优超平面进行分类...",
          "latexFormulas": ["w^T x + b = 0"]
        },
        "starterCode": "class SVMClassifier:\n    def train_and_evaluate(self, X, y):\n        # 请在此处编写你的代码\n        pass",
        "lastSavedCode": "class SVMClassifier:\n    def train...", // 用户上次保存的代码，无草稿则为 null
        "conceptualQuizzes": [
          {
            "id": "q1",
            "question": "线性 SVM 中支持向量指的是什么？",
            "options": ["A. 距离分离超平面最近的样本点", "B. 距离超平面最远的样本点"],
            "explanation": "支持向量就是距离超平面最近并决定了超平面边界的那部分样本点。"
          }
        ],
        "thinkingQuestion": {
          "id": "t1",
          "question": "请解释核技巧(Kernel Trick)在处理非线性数据时的计算逻辑与优势。"
        },
        "completed": false
      }
    }
    ```

#### C. 提交代码至沙箱自动化评测 (`POST /api/challenges/{id}/submit`)
*   **请求体**：
    ```json
    {
      "code": "class SVMClassifier:\n    def train_and_evaluate(self, X, y):\n        from sklearn.svm import SVC\n        clf = SVC(kernel='linear')\n        clf.fit(X, y)\n        return clf.score(X, y)"
    }
    ```
*   **返回格式**：
    ```json
    {
      "success": true,
      "data": {
        "status": "ACCEPTED", // ACCEPTED, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, RUNTIME_ERROR
        "message": "分类器训练成功，测试集准确率: 94.67%",
        "runtimeMs": 380
      }
    }
    ```

#### D. 提交主观思考题触发 AI 智能打分 (`POST /api/challenges/{id}/thinking/evaluate`)
*   **请求体**：
    ```json
    {
      "answer": "核技巧通过在低维空间计算高维内积，省去了显式映射到高维空间的计算开销..."
    }
    ```
*   **返回格式**：
    ```json
    {
      "success": true,
      "data": {
        "score": 9,
        "feedback": "解释非常清晰，点出了‘低维空间隐式计算高维内积’这一核心优势。"
      }
    }
    ```

---

## 5. 本地 Docker 安全判题沙箱引擎 (Sandbox Executor)

沙箱服务 `SandboxServiceImpl.java` 在收到用户提交的 Python 代码后，将代码与数据库中存储的 `evaluation_script` 拼装，并在隔离的容器中进行自动化评测。

### 🔒 容器强隔离三要素
1.  **无网环境 (`--network none`)**：彻底阻断外界互联网通讯，防止黑客上传端口扫描与网络反弹木马。
2.  **硬性资源上限 (`-m 512m --cpus="1.0"`)**：单次运算限额 512M 物理内存和 1 个 CPU 核心，防止撑爆宿主机。
3.  **只读共享卷挂载 (`ro`)**：仅挂载测试数据集（`/data`）和用户解题文件，且均为 `ro` (只读) 状态，容器内文件系统无法对宿主机进行写破坏。

### 💻 核心 Java 超时强杀执行器实现

```java
package com.partjava.service.impl;

import com.partjava.dto.JudgementResult;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

@Service
public class SandboxServiceImpl {

    // 💡 引入最大并发评测容器流控，防止瞬时提交打爆宿主机 CPU/内存
    private final Semaphore sandboxSemaphore = new Semaphore(4);

    public JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec) {
        // 获取信号量锁许可
        boolean acquired = false;
        try {
            // 最多排队等待 10 秒，拿不到则熔断返回繁忙
            acquired = sandboxSemaphore.tryAcquire(10, TimeUnit.SECONDS);
            if (!acquired) {
                return new JudgementResult("SYSTEM_BUSY", "系统评测繁忙，请稍后再试", 0);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return new JudgementResult("SYSTEM_ERROR", "评测排队中途被中断", 0);
        }

        File tempFile = null;
        try {
            // 1. 合并代码：用户前置引入 + 后台测试断言脚本
            String fullScriptContent = userCode + "\n\n" + evaluationScript;
            
            // 2. 在宿主机 /tmp 生成隔离脚本文件
            tempFile = File.createTempFile("sol_" + UUID.randomUUID(), ".py");
            Files.writeString(tempFile.toPath(), fullScriptContent, StandardCharsets.UTF_8);

            // 3. 构建无网、限存、只读挂载的 Docker 评测命令
            String[] dockerCmd = {
                "docker", "run", "--rm",
                "--network", "none",
                "-m", "512m",
                "--cpus", "1.0",
                "-v", "/home/liming/partjava/datasets:/data:ro", // 只读挂载科学数据集
                "-v", tempFile.getAbsolutePath() + ":/app/solution.py:ro", // 只读挂载用户代码
                "python-ml-env:latest",
                "python", "/app/solution.py"
            };

            long startTime = System.currentTimeMillis();
            ProcessBuilder pb = new ProcessBuilder(dockerCmd);
            pb.redirectErrorStream(true); // 合并异常输出
            Process process = pb.start();

            // 4. ⏳ 引入带物理超时的熔断阻断机制
            long systemTimeout = (long) Math.ceil(timeLimitSec + 2.0); // 宽容 2s 给系统开销
            boolean completed = process.waitFor(systemTimeout, TimeUnit.SECONDS);

            if (!completed) {
                process.destroyForcibly(); // 强制终止进程以释放系统内存
                return new JudgementResult("TIME_LIMIT_EXCEEDED", "评测超时，模型代码运行超出耗时限制", 0);
            }

            long duration = System.currentTimeMillis() - startTime;
            
            // 5. 读取容器内部脚本输出
            InputStream is = process.getInputStream();
            String outputLog = new String(is.readAllBytes(), StandardCharsets.UTF_8).trim();

            // 6. 解析状态标识符，打分通关
            if (outputLog.contains("__TEST_STATUS__:PASSED")) {
                String successMsg = outputLog.split("__TEST_STATUS__:PASSED\\|")[1].trim();
                return new JudgementResult("ACCEPTED", successMsg, duration);
            } else if (outputLog.contains("__TEST_STATUS__:FAILED")) {
                String errorMsg = outputLog.split("__TEST_STATUS__:FAILED\\|")[1].trim();
                return new JudgementResult("WRONG_ANSWER", errorMsg, duration);
            } else {
                // 未捕获的语法错误或运行时崩溃
                return new JudgementResult("RUNTIME_ERROR", outputLog, duration);
            }

        } catch (Exception e) {
            return new JudgementResult("SYSTEM_ERROR", "后端评测模块发生内部错误: " + e.getMessage(), 0);
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete(); // 清理残留脚本
            }
            if (acquired) {
                sandboxSemaphore.release(); // 释放信号量锁
            }
        }
    }
}
```

---

## 6. AI 问答 SSE 流式输出与思考题打分 (AI Streaming & Evaluator)

### 💬 6.1 聊天答疑中转 (AiController - Stream)
为了让答题卡右侧的 AI 助教助手拥有和 ChatGPT 一样的**逐字回复打字机效果**，接口必须采用 **Server-Sent Events (SSE)** 异步长连接模式中转：

```java
package com.partjava.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final ExecutorService sseExecutor = Executors.newVirtualThreadPerTaskExecutor(); // 利用 Java 21 虚拟线程

    @PostMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamAiChat(@RequestBody ChatRequest request) {
        SseEmitter emitter = new SseEmitter(0L); // 0 代表无超时限制
        
        // 提交到虚拟线程池执行
        java.util.concurrent.Future<?> task = sseExecutor.submit(() -> {
            try {
                // 模拟调用大模型 API 并获得流式输出
                for (int i = 0; i < 20; i++) {
                    // 在循环或阻塞操作前，检测线程中断状态（如果客户端关闭，会被 cancel 中断）
                    if (Thread.currentThread().isInterrupted()) {
                        break;
                    }
                    String token = "逐字返回第 " + i + " 个词... ";
                    emitter.send(SseEmitter.event().data(token));
                    Thread.sleep(80); // 模拟打字间隔
                }
                emitter.send(SseEmitter.event().name("complete").data("对话结束"));
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        });
        
        // 💡 注册客户端生命周期回调，连接意外终止或超时强制取消 Future，释放虚拟线程与算力资源
        emitter.onCompletion(() -> task.cancel(true));
        emitter.onTimeout(() -> task.cancel(true));
        emitter.onError((ex) -> task.cancel(true));
        
        return emitter;
    }
}
```

### 🤖 6.2 AI 思考题结构化判定 (LLM JSON Schema Constraint)
调用底层大模型打分时，系统提示词模板应硬性包含 JSON 要求：

```
[System Prompt]
你是一个严谨且经验丰富的人工智能专家和数据科学助教。
你的任务是对学生提交的关于该算法思考题的“答案回答”进行评分。
你必须返回并且只能返回一个格式完全合规的单个 JSON 对象，不要带任何 markdown 标识符 ``` 或 ```json。

期望返回的 JSON 结构体格式：
{
  "score": (0至10之间的整型数字，代表分值),
  "feedback": "(精炼的评语点评，字数在50字以内，指出回答的盲区或优点)"
}

[User Prompt]
当前关卡题目: {questionText}
打分参考依据: {evaluationPrompt}
学生提交答案: {userAnswerText}
```
后端利用 `Jackson` / `Fastjson` 对模型回复的原始 JSON 文本反序列化：
```java
ObjectMapper mapper = new ObjectMapper();
AiGradingResponse grade = mapper.readValue(llmJsonOutput, AiGradingResponse.class);
// 保存结果到 user_challenge_records 关卡历史表中，并返回给前端展示
```

---

## 7. 管理员管理端权限设计 (Admin Authority & Management)

为保护评测数据和平台关卡内容，系统针对关键操作进行管理员鉴权设计。

### 🔒 7.1 基于 Spring Security 的方法级权限拦截
1.  **开启方法级授权**：在 Spring Security 配置类上加 `@EnableMethodSecurity`。
2.  **JWT 角色注入**：在 `JwtAuthenticationFilter` 中，解析出 JWT 载荷中的 `role` 后，注入 Spring Security 安全上下文：
    ```java
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);
    UsernamePasswordAuthenticationToken authentication = 
        new UsernamePasswordAuthenticationToken(userDetails, null, List.of(authority));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    ```
3.  **方法级别注解过滤**：在需要管理员权限的 Controller 接口上加上注解 `@PreAuthorize("hasRole('ADMIN')")`。若普通用户尝试请求，Spring Security 会在 Filter 阶段直接返回 `403 Forbidden`。

---

### 📡 7.2 管理员核心 API 接口列表

| 请求方法 | 路由路径 | 鉴权要求 | 接口用途 | 传参格式与主要字段 | 响应格式 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/admin/challenges` | 需 ADMIN 角色 | 新增一个编程宇宙关卡 | **JSON Body** (含 stages 配置与起手代码) | `{"success":true, "message":"发布成功"}` |
| **PUT** | `/api/admin/challenges/{id}` | 需 ADMIN 角色 | 修改已有宇宙关卡的配置信息 | 路径变量 `id` + **JSON Body** | `{"success":true, "message":"修改成功"}` |
| **DELETE** | `/api/admin/challenges/{id}` | 需 ADMIN 角色 | 删除下线某个算法关卡 | 路径变量 `id` | `{"success":true, "message":"关卡已成功下线"}` |
| **GET** | `/api/admin/users` | 需 ADMIN 角色 | 列表分页获取所有注册用户资料 | `?page=1&limit=20` | `{"success":true, "data":{"users":[]}}` |
| **PUT** | `/api/admin/users/{id}/role` | 需 ADMIN 角色 | 变更用户身份 (如设为管理员) | 路径变量 `id` + **Query** `?role=ADMIN` | `{"success":true, "message":"角色提权成功"}` |

---

### ☕ 7.3 管理员关卡配置接口 (AdminChallengeController.java) 核心示例

```java
package com.partjava.controller.admin;

import com.partjava.common.api.ApiResponse;
import com.partjava.dto.request.ChallengeCreateReq;
import com.partjava.service.ChallengeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/challenges")
@PreAuthorize("hasRole('ADMIN')") // 💡 统一拦截：该类下所有操作均需 ROLE_ADMIN 权限
public class AdminChallengeController {

    private final ChallengeService challengeService;

    public AdminChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @PostMapping
    public ApiResponse<Void> createChallenge(@RequestBody ChallengeCreateReq req) {
        challengeService.createNewChallenge(req);
        return ApiResponse.success("关卡配置发布成功");
    }

    @PutMapping("/{id}")
    public ApiResponse<Void> updateChallenge(@PathVariable String id, @RequestBody ChallengeCreateReq req) {
        challengeService.updateChallengeConfig(id, req);
        return ApiResponse.success("关卡更新成功");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteChallenge(@PathVariable String id) {
        challengeService.removeChallenge(id);
        return ApiResponse.success("关卡下线成功");
    }
}
```

---

## 8. 编程挑战与 AI 智能评测业务设计细节 (Challenge & AI Grading Implementation)

为了打通前端的编程星空宇宙图层与后端的安全评测沙箱、AI 智能打分系统，需在后端工程中建立完整的业务控制器、服务实现与数据表驱动映射：

### 📂 8.1 用户关卡进度实体 ([UserChallengeRecord.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/entity/UserChallengeRecord.java))
对应物理表 `user_challenge_records`，用于保存用户的答题代码草稿、最高通过代码、选择题测试状态及主观题的 AI 评分结果。

```java
package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("user_challenge_records")
public class UserChallengeRecord {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private Integer userId;
    private String challengeId;
    private Boolean completed;
    private String bestCode;
    private String lastCode;
    private String quizStatus;          // NOT_STARTED, PASSED
    private String thinkingAnswer;
    private Integer thinkingScore;       // AI 打分 (0-10)
    private String thinkingFeedback;     // AI 点评
    private LocalDateTime completedAt;
    private LocalDateTime updatedAt;
}
```

---

### 📂 8.2 关卡进度 Mapper 接口 ([UserChallengeRecordMapper.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/repository/UserChallengeRecordMapper.java))
```java
package com.partjava.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.partjava.entity.UserChallengeRecord;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserChallengeRecordMapper extends BaseMapper<UserChallengeRecord> {
}
```

---

### 📂 8.3 挑战核心控制器 ([ChallengeController.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/controller/ChallengeController.java))
控制层负责处理前端发起的星空探索、代码评测和思考题判定请求。

```java
package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.dto.JudgementResult;
import com.partjava.dto.request.ChallengeSubmitReq;
import com.partjava.dto.request.ThinkingEvaluateReq;
import com.partjava.dto.response.ChallengeDetailResp;
import com.partjava.dto.response.ChallengeProgressResp;
import com.partjava.service.ChallengeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    /**
     * A. 获取用户当前全局宇宙进度 (GET /api/challenges/progress)
     */
    @GetMapping("/progress")
    public ApiResponse<ChallengeProgressResp> getGlobalProgress(@RequestAttribute("userId") Integer userId) {
        ChallengeProgressResp progress = challengeService.getGlobalProgress(userId);
        return ApiResponse.success(progress);
    }

    /**
     * B. 获取单关卡面板详情 (GET /api/challenges/{id})
     */
    @GetMapping("/{id}")
    public ApiResponse<ChallengeDetailResp> getChallengeDetail(
            @RequestAttribute("userId") Integer userId,
            @PathVariable("id") String challengeId) {
        ChallengeDetailResp detail = challengeService.getChallengeDetail(userId, challengeId);
        return ApiResponse.success(detail);
    }

    /**
     * C. 提交代码至沙箱自动化评测 (POST /api/challenges/{id}/submit)
     */
    @PostMapping("/{id}/submit")
    public ApiResponse<JudgementResult> submitChallengeCode(
            @RequestAttribute("userId") Integer userId,
            @PathVariable("id") String challengeId,
            @RequestBody ChallengeSubmitReq req) {
        JudgementResult result = challengeService.submitCode(userId, challengeId, req.getCode());
        return ApiResponse.success(result);
    }

    /**
     * D. 提交主观思考题触发 AI 智能打分 (POST /api/challenges/{id}/thinking/evaluate)
     */
    @PostMapping("/{id}/thinking/evaluate")
    public ApiResponse<ThinkingEvaluateResp> evaluateThinking(
            @RequestAttribute("userId") Integer userId,
            @PathVariable("id") String challengeId,
            @RequestBody ThinkingEvaluateReq req) {
        ThinkingEvaluateResp response = challengeService.evaluateThinkingQuestion(userId, challengeId, req.getAnswer());
        return ApiResponse.success(response);
    }
}
```

---

### 📂 8.4 核心业务服务层与 AI 打分接口设计 ([ChallengeServiceImpl.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/service/impl/ChallengeServiceImpl.java))
业务层负责组合底层数据库访问、沙箱判定以及对接 AI 大模型。

```java
package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.exception.BusinessException;
import com.partjava.dto.JudgementResult;
import com.partjava.entity.Challenge;
import com.partjava.entity.ChallengeDetail;
import com.partjava.entity.UserChallengeRecord;
import com.partjava.event.UserActionEvent;
import com.partjava.repository.ChallengeDetailMapper;
import com.partjava.repository.ChallengeMapper;
import com.partjava.repository.UserChallengeRecordMapper;
import com.partjava.service.SandboxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
public class ChallengeServiceImpl {

    private final ChallengeMapper challengeMapper;
    private final ChallengeDetailMapper challengeDetailMapper;
    private final UserChallengeRecordMapper recordMapper;
    private final SandboxService sandboxService;
    private final ApplicationEventPublisher eventPublisher;

    public ChallengeServiceImpl(ChallengeMapper challengeMapper,
                                ChallengeDetailMapper challengeDetailMapper,
                                UserChallengeRecordMapper recordMapper,
                                SandboxService sandboxService,
                                ApplicationEventPublisher eventPublisher) {
        this.challengeMapper = challengeMapper;
        this.challengeDetailMapper = challengeDetailMapper;
        this.recordMapper = recordMapper;
        this.sandboxService = sandboxService;
        this.eventPublisher = eventPublisher;
    }

    /**
     * 执行代码沙箱评测并入库
     */
    @Transactional
    public JudgementResult submitCode(Integer userId, String challengeId, String code) {
        // 1. 获取关卡配置的评测脚本
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        if (detail == null) {
            throw new IllegalArgumentException("关卡不存在");
        }

        // 2. 调用沙箱执行评测
        JudgementResult result = sandboxService.evaluateCode(code, detail.getEvaluationScript(), 2.0);

        // 3. 读取或创建用户做题进度
        UserChallengeRecord record = recordMapper.selectOne(
            new LambdaQueryWrapper<UserChallengeRecord>()
                .eq(UserChallengeRecord::getUserId, userId)
                .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        boolean isNew = (record == null);
        if (isNew) {
            record = new UserChallengeRecord();
            record.setUserId(userId);
            record.setChallengeId(challengeId);
            record.setQuizStatus("NOT_STARTED");
            record.setCompleted(false);
            record.setCreatedAt(LocalDateTime.now());
        }

        record.setLastCode(code);
        record.setUpdatedAt(LocalDateTime.now());

        // 4. 如果评测成功 (ACCEPTED)，更新最高分数通过代码及通关状态
        if ("ACCEPTED".equals(result.getStatus())) {
            record.setCompleted(true);
            record.setBestCode(code);
            record.setCompletedAt(LocalDateTime.now());
            
            // 5. 🚀 发布异步用户事件，通知成就监听器累加进度
            eventPublisher.publishEvent(new UserActionEvent(this, userId, "COMPLETE_CHALLENGE", 1));
        }

        if (isNew) {
            recordMapper.insert(record);
        } else {
            recordMapper.updateById(record);
        }

        return result;
    }

    /**
     * 调用大模型接口评估思考题主观回答
     */
    @Transactional
    public ThinkingEvaluateResp evaluateThinkingQuestion(Integer userId, String challengeId, String answer) {
        ChallengeDetail detail = challengeDetailMapper.selectById(challengeId);
        Challenge challenge = challengeMapper.selectById(challengeId);
        if (detail == null || challenge == null) {
            throw new IllegalArgumentException("关卡定义不存在");
        }

        // 1. 组装 AI 强约束 Prompt
        String systemPrompt = "你是一个人工智能专家和助教。对学生关于当前思考题的回答进行打分。\n" +
                "你必须且只能返回单个 JSON 格式报文，绝对不要带任何 ``` 或 ```json 等标识符。\n" +
                "格式要求如下：\n" +
                "{\"score\": 9, \"feedback\": \"评语...\"}";

        String userPrompt = String.format("思考题: %s\n打分标准依据: %s\n学生回答内容: %s",
                detail.getThinkingQuestion().getQuestion(),
                detail.getThinkingQuestion().getAiPrompt(),
                answer);

        // 2. 调用大模型客户端组件 (可采用 RestTemplate/WebClient 访问配置的大模型微服务接口)
        String llmOutputRaw = callLlmService(systemPrompt, userPrompt);

        // 3. 解析大模型返回的约束 JSON
        ThinkingEvaluateResp aiResponse = parseLlmResponse(llmOutputRaw);

        // 4. 更新数据库记录
        UserChallengeRecord record = recordMapper.selectOne(
            new LambdaQueryWrapper<UserChallengeRecord>()
                .eq(UserChallengeRecord::getUserId, userId)
                .eq(UserChallengeRecord::getChallengeId, challengeId)
        );

        boolean isNew = (record == null);
        if (isNew) {
            record = new UserChallengeRecord();
            record.setUserId(userId);
            record.setChallengeId(challengeId);
            record.setQuizStatus("NOT_STARTED");
            record.setCompleted(false);
            record.setCreatedAt(LocalDateTime.now());
        }

        record.setThinkingAnswer(answer);
        record.setThinkingScore(aiResponse.getScore());
        record.setThinkingFeedback(aiResponse.getFeedback());
        record.setUpdatedAt(LocalDateTime.now());

        if (isNew) {
            recordMapper.insert(record);
        } else {
            recordMapper.updateById(record);
        }

        return aiResponse;
    }

    private String callLlmService(String systemPrompt, String userPrompt) {
        // 大模型对接调用实现（通常基于 HttpClient/Feign 调用平台底层 DeepSeek 或 GPT-4 服务）
        // 模拟返回：
        return "{\"score\": 9, \"feedback\": \"你的回答非常清晰，逻辑推演缜密，切中了算法的核心盲区。\"}";
    }

    private ThinkingEvaluateResp parseLlmResponse(String rawJson) {
        // 反序列化逻辑，如：new ObjectMapper().readValue(rawJson, ThinkingEvaluateResp.class)
        return new ThinkingEvaluateResp(9, "你的回答非常清晰，逻辑推演缜密，切中了算法的核心盲区。");
    }
}
```

---

## 9. 前后端联动与数据架构演进

### 9.1 编程挑战随堂笔记接通方案 (Option B)
在编程挑战宇宙界面，右侧导航栏的 **“笔记”** 按钮激活为交互触发器。
* **展现交互**：点击时，右侧弹出一个半透明毛玻璃特效的随堂笔记列表抽屉（`NotesDrawer`）。
* **功能闭环**：
  * **列表读取**：组件加载时，异步请求 `/api/notes?limit=30`，列表卡片支持 Markdown 的直接展开预览。
  * **模态编辑**：点击新建按钮时，调用 `createPortal` 弹出一个完全与平台原有 AI 问答/代码编辑器一致的、支持自由拖动（Draggable）的“保存为笔记”富文本浮窗模态框，供输入标题、选择技术分类、添加标签、设置公开属性和编辑正文内容。
  * **同步提交**：点击保存后发送 `POST /api/notes`。保存成功后自动触发列表刷新。

### 9.2 挑战题库后端动态化 (Backend-driven Catalog)
为杜绝学生通过前端 JavaScript 源码审查（F12）查阅选择题正确答案及代码评测断言脚本的问题，题库采取**完全后端驱动设计**：
* **数据流向**：前端进入关卡时，通过 `GET /api/challenges/{id}` 获取当前题目的信息。
* **安全判定**：
  1. 理论文档及选择题描述从后端发送。
  2. 评测脚本（`evaluation_script`）和期望输出（`expected_output`）**仅保留在后端数据库及沙箱侧**，杜绝泄漏。
  3. 前端提交代码后由后端运行，仅返回编译及断言结果（Passed/Failed），保证判题的安全可靠。

### 9.3 宇宙星空图层通关状态与成就里程碑设计
为了直观展示学员的探索深度，在大地图与侧边成就栏增加了前后端联动的通关状态指示：
1. **大地图 3D 旋转星环**：
   * **数据支持**：未来 Java 后端的 `/api/challenges/progress` (或通关状态汇总接口) 将返回每个 Stage 的 `completed`（布尔值）通关状态。
   * **前端表现**：当 `completed = true` 时，大地图中的星球容器自动渲染一个具有 $75^\circ$ 透视偏转、匀速旋转的 3D 星环（土星环），作为学员攻克该学术章节的高保真荣誉表彰。
2. **成就里程碑及 AI 基础教育意义 (Chapter's Role in AI)**：
   * 在成就抽屉中开辟了 11 关卡缩微行星节点阵列。
   * 每一个节点卡片被选中时，动态载入并呈现在后台数据库中配置的该章节在人工智能（AI）领域的基石作用（例如数学基础对应高维 Embedding，强化学习对应自我博弈与策略搜索）。
3. **管理员（Admin）权限与动态配置规划**：
   * **表结构扩展**：在 `challenges`（关卡）实体表中，未来将新增 `ai_role` (课程在AI中的作用, TEXT)、`color` (行星代表色, VARCHAR)、`glow_color` (行星发光色, VARCHAR) 等前端渲染配置属性。
   * **管理端后台 (Admin APIs)**：设计提供针对管理员权限的 CRUD 接口（如 `PUT /api/admin/challenges/{id}`）。管理员可动态修正关卡对应的配图、行星颜色、数学公式和 AI 领域作用描述，实现大地图的免发布热部署更新。

### 9.4 后台管理系统主控台与物理遥测 (Admin System Telemetry API)
为了给管理员提供平台物理机的实时运行指标，管理系统新增了物理服务器状态遥测监控 API。

#### A. 接口规范 (`GET /api/admin/sysinfo`)
* **安全鉴权**：限管理员角色 (`ADMIN`) 访问。
* **响应报文格式 (JSON)**：
```json
{
  "osType": "Linux",
  "osRelease": "5.15.0-101-generic",
  "osArch": "x64",
  "cpuModel": "AMD Ryzen 7 5800X 8-Core Processor",
  "cpuCores": 8,
  "totalMemoryGB": 15.89,
  "freeMemoryGB": 6.45,
  "usedMemoryGB": 9.44,
  "memoryUsagePercent": 59.4,
  "loadAvg1Min": 0.24,
  "loadAvg5Min": 0.18,
  "loadAvg15Min": 0.12,
  "nodeVersion": "v20.20.2",
  "uptimeHours": 14.5,
  "processMemoryMB": 42.5
}
```

#### B. Java / Spring Boot 后端实现指南 (Implementation Specs)
在 Java 服务端，该监控接口应实现于 `com.partjava.controller.admin.AdminSystemController.java`，并使用 JDK 原生 Management API 获取对应的系统指标：

```java
package com.partjava.controller.admin;

import com.partjava.common.api.ApiResponse;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import com.sun.management.OperatingSystemMXBean;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminSystemController {

    @GetMapping("/sysinfo")
    public ApiResponse<SysInfoResp> getSystemInfo() {
        // 1. 获取 JDK 平台 OS 管理 Bean (需强制转换为 com.sun.management.OperatingSystemMXBean 以获取物理内存)
        OperatingSystemMXBean osBean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        Runtime runtime = Runtime.getRuntime();

        // 2. 物理内存计算 (Bytes -> GB)
        long totalMemoryBytes = osBean.getTotalMemorySize();
        long freeMemoryBytes = osBean.getFreeMemorySize();
        long usedMemoryBytes = totalMemoryBytes - freeMemoryBytes;
        
        double totalMemoryGB = Math.round((totalMemoryBytes / 1073741824.0) * 100.0) / 100.0;
        double freeMemoryGB = Math.round((freeMemoryBytes / 1073741824.0) * 100.0) / 100.0;
        double usedMemoryGB = Math.round((usedMemoryBytes / 1073741824.0) * 100.0) / 100.0;
        double memoryUsagePercent = Math.round(((double) usedMemoryBytes / totalMemoryBytes * 100) * 10.0) / 10.0;

        // 3. CPU 与负载 (Load Average & CPU Cores)
        int cpuCores = osBean.getAvailableProcessors();
        double loadAvg1Min = osBean.getSystemLoadAverage(); // 如果在 Windows 下，此值可能返回 -1.0
        
        // 4. JVM 内存占用 (Bytes -> MB)
        double processMemoryMB = Math.round((runtime.totalMemory() - runtime.freeMemory()) / 1048576.0 * 10.0) / 10.0;

        SysInfoResp resp = SysInfoResp.builder()
                .osType(System.getProperty("os.name"))
                .osRelease(System.getProperty("os.version"))
                .osArch(System.getProperty("os.arch"))
                .cpuModel(System.getenv("PROCESSOR_IDENTIFIER") != null ? System.getenv("PROCESSOR_IDENTIFIER") : "Host Multi-Core CPU")
                .cpuCores(cpuCores)
                .totalMemoryGB(totalMemoryGB)
                .freeMemoryGB(freeMemoryGB)
                .usedMemoryGB(usedMemoryGB)
                .memoryUsagePercent(memoryUsagePercent)
                .loadAvg1Min(loadAvg1Min)
                .loadAvg5Min(loadAvg1Min) // JMX API 仅直接提供 1分钟 LoadAvg，其余可复制或通过系统命令采集
                .loadAvg15Min(loadAvg1Min)
                .nodeVersion("Java JDK " + System.getProperty("java.version"))
                .uptimeHours(ManagementFactory.getRuntimeMXBean().getUptime() / 3600000.0)
                .processMemoryMB(processMemoryMB)
                .build();

        return ApiResponse.success(resp);
    }

    @Data
    @Builder
    public static class SysInfoResp {
        private String osType;
        private String osRelease;
        private String osArch;
        private String cpuModel;
        private int cpuCores;
        private double totalMemoryGB;
        private double freeMemoryGB;
        private double usedMemoryGB;
        private double memoryUsagePercent;
        private double loadAvg1Min;
        private double loadAvg5Min;
        private double loadAvg15Min;
        private String nodeVersion;
        private double uptimeHours;
        private double processMemoryMB;
    }
}
通过本节的设计，能够保证前端 React 大屏和诊断弹窗无缝迁移适配 Java 服务端的数据上报。

### 9.5 用户注册与基于 JWT 的身份认证鉴权规范 (User Authentication API)
为了保障学员账号的安全并支持无状态的分布式水平扩展，平台采用 Spring Security 加盐哈希认证以及基于 JWT 令牌的鉴权机制。

#### A. 账户注册 (`POST /api/auth/register`)
* **入参格式 (JSON)**：
  ```json
  {
    "name": "学员张三",
    "email": "zhangsan@email.com",
    "password": "securepassword",
    "bio": "个性签名",
    "location": "上海",
    "website": "http://zhangsan.com",
    "github": "zhangsan-dev"
  }
  ```
* **核心处理**：
  1. 验证邮箱在 `users` 表中是否已存在，若存在返回 `400` 错误。
  2. 使用 Spring Security 的 `BCryptPasswordEncoder` 自动随机加盐并对密码进行单向哈希，生成最终写入 `password` 列的密文。
  3. 将基本字段写入 `users` 表后，可选择级联将个人扩展属性写入 `user_profiles`，完成基础记录初始化。

#### B. 账户登录并签发令牌 (`POST /api/auth/login`)
* **核心逻辑**：
  1. 接收 `email` 和明文 `password`。
  2. 根据 `email` 调出 `User` 记录，使用 BCrypt 比对密码哈希。
  3. 校验通过后，使用 `io.jsonwebtoken` (JJWT 0.12.x) 签发 JWT 令牌。令牌的 Subject 为用户的 `username`，并在 Payload 中载入用户 ID (`userId`) 与角色 (`role`)。
  4. 客户端（Next.js 或 React 页首）在后续请求中通过 HTTP 请求头 `Authorization: Bearer <token>` 携带此令牌，后端经 `JwtAuthenticationFilter` 校验并注入 `SecurityContextHolder` 供接口权控判定。

---

### 9.6 用户个人资料与扩展字段双表级联读写规范 (User Profile API)
学员资料在数据库中分为主账号表 `users` 和扩展属性表 `user_profiles`，以求主表结构精简并支持多样化的 JSON 扩展。

#### A. 获取用户资料 (`GET /api/user/profile`)
* **路由类型**：受保护路由，需携带 JWT 令牌。
* **响应报文格式 (JSON)**：
  ```json
  {
    "id": 12,
    "username": "zhangsan",
    "name": "学员张三",
    "email": "zhangsan@email.com",
    "role": "USER",
    "image": "http://avatar-url...",
    "jobTitle": "后端开发工程师",
    "company": "字节跳动",
    "bio": "个性签名",
    "location": "上海",
    "github": "zhangsan-dev",
    "website": "http://zhangsan.com",
    "skills": ["Java", "Spring Boot", "Docker"],
    "socialLinks": {
      "wechat": "wx_zhangsan",
      "twitter": "zhangsan_tw"
    }
  }
  ```
* **实现策略**：
  1. 通过当前已验证的 `userId` 关联读取 `users` 表与 `user_profiles` 表。
  2. 使用 Jackson 库的 `ObjectMapper.readValue()` 将 `user_profiles.skills` 中的 JSON 数组解析为 Java `List<String>`，将 `user_profiles.social_links` 中的 JSON 对象解析为 Java `Map<String, String>`。
  3. 自动检测 `user_profiles` 记录是否存在，若不存在则降级通过 `users` 主表数据构建默认 DTO 响应返回，防止抛出空指针异常。

#### B. 保存与更新用户资料 (`PUT /api/user/profile`)
* **数据流向**：前端以 `UserProfileResp` 对象格式提交更改。
* **实现策略**：
  1. **登录用户名修改支持与格式查重控制 (方案 B)**：
     * 如果请求体中包含 `username` 且非空：
       * 正则校验：必须匹配英文字母与数字组合：`username.matches("^[a-zA-Z0-9]+$")`，否则拒绝更新；
       * 唯一性排重：查询 `users` 表中是否有重名用户，且 ID 不等于当前正在修改的用户 ID：`eq("username", newUsername).ne("id", userId)`。如果重名，抛出异常阻断保存。
  2. 后端提取 `skills` 列表与 `socialLinks` Map，使用 Jackson 的 `ObjectMapper.writeValueAsString()` 将它们序列化为 JSON 字符串。
  3. 执行数据库操作：如果扩展表记录不存在则执行 `INSERT` 写入 `user_profiles`，若已存在则执行 `UPDATE` 更新其上的 `job_title`、`company` 等扩展列。
  4. 同时，使用级联写更新 `users` 表中冗余存储的用户名（`username`）、头像、签名、所在地等基础属性，保障全局缓存和 Session 与此高度一致。
  5. 整个事务由 Spring 的 `@Transactional` 包裹，保障更新的原子性与隔离性。

---

## 10. VIP 会员权限系统设计规范 (VIP Membership System)

PartJava 平台设有三档付费 VIP 会员套餐，通过权限分级的方式解锁对应的专属特权功能。

---

### 10.1 数据库字段扩展 (users 表)

在现有 `users` 主表上新增三个字段：

```sql
ALTER TABLE users ADD COLUMN vip TINYINT(1) DEFAULT 0
  COMMENT '会员状态: 0=普通用户, 1=VIP会员';

ALTER TABLE users ADD COLUMN vip_level INT DEFAULT 0
  COMMENT '会员等级: 1=体验会员(¥1.99), 2=进阶会员(¥9.99), 3=永久共创(¥99.99)';

ALTER TABLE users ADD COLUMN vip_expire_time TIMESTAMP NULL
  COMMENT '会员到期时间（永久会员写入 9999-12-31 23:59:59）';

-- 快速检索会员列表
CREATE INDEX idx_vip ON users (vip);
```

---

### 10.2 三档 VIP 套餐特权规格

| 套餐 | 价格 | 有效期 | 核心特权 |
|------|------|--------|----------|
| 👑 体验 VIP | ¥1.99 | 3个月 | 金色用户名、金色评论框、创建个人算法可视化页、解锁高阶关卡、AI导师每日5次优先提问 |
| 🌟 进阶 VIP | ¥9.99 | 3个月 | 以上全部 + 炫彩霓虹渐变昵称、一键复用他人公开笔记、评论他人笔记、发布/设计挑战关卡、网站优化诊断报告 |
| 🔥 永久共创 VIP | ¥99.99 | 永久 | 以上全部（永久）+ 作者微信技术指导、Codex/Claude Code 指导、共创者荣誉墙永久刻名 |

> [!IMPORTANT]
> 会员等级遵循**只升不降**原则：若用户已持有等级 2 的会员，激活等级 1 套餐时，等级不会降低，仅顺延到期时间。

---

### 10.3 Java 实体层扩展 (Entity)

**[User.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/entity/User.java)** 新增三个映射字段：

```java
@TableField("vip")
private Integer vip;              // 0=普通用户, 1=VIP会员

@TableField("vip_level")
private Integer vipLevel;         // 1=体验, 2=进阶, 3=永久共创

@TableField("vip_expire_time")
private LocalDateTime vipExpireTime; // 到期时间，永久会员设为 9999-12-31T23:59:59
```

---

### 10.4 DTO 数据传输对象扩展

**[UserProfileResp.java](file:///home/liming/partjava/i/partjava-backend/src/main/java/com/partjava/dto/response/UserProfileResp.java)** 新增：

```java
private Boolean vip;
private Integer vipLevel;
private LocalDateTime vipExpireTime;
```

---

### 10.5 VIP 激活接口规范 (`POST /api/user/activate-vip`)

* **路由类型**：受保护路由，需携带 JWT 令牌。
* **请求体格式**：
  ```json
  { "level": 2 }
  ```
  `level` 取值为 `1`、`2`、`3`，分别对应三档套餐。

* **核心逻辑**：
  ```java
  // 1. 等级只升不降
  int newLevel = Math.max(user.getVipLevel(), requestLevel);

  // 2. 计算到期时间
  LocalDateTime expire;
  if (requestLevel == 3) {
      // 永久会员
      expire = LocalDateTime.of(9999, 12, 31, 23, 59, 59);
  } else {
      // 有期限会员：在当前到期时间基础上顺延（未过期则顺延，已过期从今天算）
      LocalDateTime base = (user.getVipExpireTime() != null
          && user.getVipExpireTime().isAfter(LocalDateTime.now()))
          ? user.getVipExpireTime()
          : LocalDateTime.now();
      expire = base.plusDays(requestLevel == 1 ? 90 : 90);
  }

  user.setVip(1);
  user.setVipLevel(newLevel);
  user.setVipExpireTime(expire);
  userMapper.updateById(user);
  ```

* **成功响应示例**：
  ```json
  {
    "success": true,
    "message": "恭喜您成功开通【进阶 VIP】！",
    "vip": true,
    "vipLevel": 2,
    "vipExpireTime": "2026-09-28T19:50:00"
  }
  ```

---

### 10.6 笔记克隆接口规范 (`POST /api/notes/{id}/clone`)

* **路由类型**：受保护路由，进阶 VIP（`vip_level >= 2`）专属。
* **权限校验逻辑**：
  1. 从数据库查询当前用户的 `vip_level` 与 `vip_expire_time`；
  2. 判断条件：`vipLevel >= 2` 且（永久会员 OR `vipExpireTime > now()`）；
  3. 不满足则返回 `403 Forbidden`，提示升级会员。
* **业务逻辑**：
  1. 查询原始笔记，必须满足 `is_public = TRUE`；
  2. 不能克隆自己的笔记（`author_id != userId`）；
  3. 复制 `title`（加 `[复用]` 前缀）、`content`、`category`、`technology`、`subcategory`、`tags`；
  4. 以当前用户为 `author_id`，`is_public = FALSE` 写入新笔记记录。
* **成功响应**：
  ```json
  {
    "success": true,
    "message": "笔记已成功复用！已保存至您的私人笔记库。",
    "newNoteId": 128
  }
  ```

---

### 10.7 前端 VIP 权限控制规范

* **全局状态**：`UserProvider` 的 `UserData` 接口中缓存 `vip`、`vipLevel`、`vipExpireTime` 三个字段，供各页面组件直接读取，无需重复请求接口。
* **导航入口**：`Navbar` 中在"机器人"按钮右侧增设金色脉冲发光的 `👑 VIP` 按钮，点击唤起全局 VIP 订阅弹窗 `VipModal`。
* **个人主页徽章**：根据 `vipLevel` 在昵称下方展示对应渐变色徽章（金色/渐变紫青/渐变红橙）及到期日期。
* **笔记详情复用按钮**：仅对公开的、非本人创作的笔记显示"🌟 一键复用"按钮。VIP ≥ 2 的用户按钮为激活渐变色，低于该等级的用户点击时弹出升级提示。
* **管理后台**：管理员可在用户列表"会员状态"列查看会员等级与到期日，并通过"👑 赠送会员"按钮为用户赠送对应档位。

---

## 11. 融合重构已完成迁移的接口列表 (REST API Catalog)

我们已将以下 18 个核心接口从 Next.js BFF 中完全迁移为 Java 实现，并修复了原本存在的安全防作弊漏洞：

### 📡 11.1 编程宇宙挑战关卡扩展 (ChallengeController)
#### A. 提交选择题答案 (`POST /api/challenges/{id}/quiz`)
* **入参**：`{"q1": 2, "q2": 0}` (物理选择题ID与选项的键值对)
* **逻辑**：比对数据库 `challenge_quizzes` 物理表的 `correct_index`。若全部正确更新做题记录 `quiz_status = 'PASSED'` 并保留作答草稿 `quiz_answers`；否则不予通过。
* **返回**：`{"success": true, "data": {"passed": true}}`

#### B. 获取通关关卡标准答案 (`GET /api/challenges/{id}/solution`)
* **安全鉴权**：系统会强行校验当前用户在 `user_challenge_records` 表中的 `completed` 字段是否为 `true`。若未通关，直接拦截并抛出 `403 Access Denied` 异常，杜绝 F12 刷题泄密。
* **成功返回**：`{"success": true, "data": {"solutionCode": "def solution()..."}}`

---

### 📡 11.2 会员出题与级联审核 (ChallengeDraftController & AdminChallengeController)
#### A. 会员提交出题申请 (`POST /api/challenge-drafts`)
* **限额控制**：仅允许 `vip_level >= 2` 的会员提交，且每个月最多提交 5 次（通过 `@Scheduled` 每月1号零点清零已用额度）。
* **入参**：包含 `levelTitle`, `theoryContent`, `quizzes` JSON数组等出题信息。

#### B. 管理员审核通过并发布 (`POST /api/admin/challenge-drafts/{id}/approve`)
* **权限要求**：限管理员角色 (`ADMIN`)。
* **处理逻辑**：开启本地数据库事务，校验星系、章节序号无冲突后，向 `challenges`、`challenge_details` 表插入题目元数据与起手代码，将草稿中的选择题拆分为独立记录写入 `challenge_quizzes` 物理关联表，最后将草稿状态更新为 `approved`。

#### C. 管理员审核驳回 (`POST /api/admin/challenge-drafts/{id}/reject`)
* **逻辑**：更新状态为 `rejected` 并记录驳回的 `reviewComment`。

---

### 📡 11.3 随堂笔记模块 (NoteController)
* **GET `/api/notes`**：根据大分类、技术栈、公开性等条件筛选并按创建时间倒序获取笔记列表。
* **POST `/api/notes` / PUT `/api/notes/{id}`**：保存和修改随堂笔记，并支持标签列表 JSON 映射解析。
* **DELETE `/api/notes/{id}`**：删除笔记，执行发帖作者防越权安全检查。
* **POST `/api/notes/{id}/like` / `/bookmark`**：一键点赞、收藏切换端点。
* **POST `/api/notes/{id}/clone`**：进阶 VIP (level >= 2) 专属特权。一键将他人的公开笔记，加 `[复用]` 前缀克隆至个人的私有笔记中。

---

### 📡 11.4 树状评论与二级回复系统 (CommentController)
* **GET `/api/comments?noteId=xxx`**：
  * **消除 N+1 连表性能开销**：在获取文章下所有评论列表时，采用批量查表，一次性抓取全部作者账号信息、点赞总数及当前登录用户的点赞状态，用 Map 以 O(1) 效率高速回填。
  * **树状组装**：通过自关联 `parent_id` 自动将二级回复组装至一级主评论的 `replies` 子列表中并返回。
* **POST `/api/comments`**：发表新评论或回复二级评论。
* **DELETE `/api/comments/{id}`**：删除评论，并级联物理删除其下的所有二级回复，限评论作者和管理员执行。
* **POST `/api/comments/{id}/like`**：切换点赞/取消点赞评论。

---

### 📡 11.5 VIP 套餐激活 (UserController)
* **POST `/api/user/activate-vip`**：
  * **入参**：`{"level": 2}`
  * **规则**：等级只升不降。购买 level 1 或 2 套餐后在原有到期日上继续顺延 90 天，购买永久共创 (level 3) 后到期日设定为 `9999-12-31`。

