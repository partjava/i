# PartJava 核心业务后端设计规格说明书 (Spring Boot 3.x + Docker Sandbox)

本说明书作为 PartJava 智能学习平台后端的标准设计规格书，用于指导项目从 Next.js BFF 接口完整重构为 **Java 21 / Spring Boot 3.3.x** 服务端架构。

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

## 2. 数据库设计物理表 DDL (15张核心业务表)

请直接复制以下建表 SQL 在 MySQL 8.0 数据库中执行初始化：

```sql
-- 确保数据库编码支持 Emoji 与特殊数学符号
CREATE DATABASE IF NOT EXISTS partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE partjava_notes;

-- 1. 用户基本信息表
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL COMMENT '用户登录邮箱',
  name VARCHAR(255) NOT NULL COMMENT '用户昵称',
  password VARCHAR(255) NOT NULL COMMENT 'BCrypt加密密码',
  role VARCHAR(20) DEFAULT 'USER' COMMENT '角色: USER (普通用户), ADMIN (管理员)',
  bio TEXT COMMENT '个性签名',
  location VARCHAR(255) COMMENT '所在城市',
  website VARCHAR(500) COMMENT '个人网站',
  github VARCHAR(255) COMMENT 'GitHub主页',
  avatar VARCHAR(500) COMMENT '头像URL',
  email_verified TINYINT(1) DEFAULT 0 COMMENT '邮箱是否通过激活',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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

-- 5. 笔记收藏表 (替代 favorites 表)
CREATE TABLE IF NOT EXISTS note_bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_bookmark (user_id, note_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. 笔记评论表
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
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

-- 9. 每日学习时间片段打卡记录表 (限制同一人同一天仅能打卡一次)
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

-- 17. 闯关挑战配置主表
CREATE TABLE IF NOT EXISTS challenges (
  id VARCHAR(64) PRIMARY KEY COMMENT '关卡ID (如 svm-iris-classification)',
  title VARCHAR(255) NOT NULL COMMENT '关卡标题',
  stage_id INT NOT NULL COMMENT '对应宇宙阶段 (1-11)',
  topic_id VARCHAR(100) NOT NULL COMMENT '对应知识点主题ID',
  points INT DEFAULT 10 COMMENT '奖励积分',
  difficulty VARCHAR(20) DEFAULT 'medium' COMMENT '难度 (easy, medium, hard)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 18. 闯关挑战详情配置表 (一对一关联，存储 LaTeX、Monaco 模板及沙箱测试脚本)
CREATE TABLE IF NOT EXISTS challenge_details (
  challenge_id VARCHAR(64) PRIMARY KEY,
  theory JSON COMMENT '理论文档 ({"markdown": "...", "latexFormulas": []})',
  starter_code TEXT COMMENT 'Python 起手模板代码',
  evaluation_script TEXT COMMENT '在 Docker 中运行的 Python 单元测试评测脚本',
  required_datasets JSON COMMENT '数据集挂载列表 [{"name": "iris.csv", "mountPath": "/data/iris.csv"}]',
  conceptual_quizzes JSON COMMENT '选择题列表 JSON',
  thinking_question JSON COMMENT '主观思考题定义与打分 Prompt {"id": "t1", "question": "...", "aiPrompt": "..."}',
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 19. 用户关卡做题记录进度状态表 (存储做题草稿、最优代码及思考题打分)
CREATE TABLE IF NOT EXISTS user_challenge_records (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL COMMENT '关联 users.id',
  challenge_id VARCHAR(64) NOT NULL,
  completed BOOLEAN DEFAULT FALSE COMMENT '是否已通关',
  best_code TEXT COMMENT '通过的最优代码备份',
  last_code TEXT COMMENT '编辑器中保存的上一次代码草稿',
  quiz_status VARCHAR(30) DEFAULT 'NOT_STARTED' COMMENT '选择题状态 (NOT_STARTED, PASSED)',
  thinking_answer TEXT COMMENT '主观思考题回答文本',
  thinking_score INT DEFAULT NULL COMMENT 'AI 主观题评分 (0-10 分)',
  thinking_feedback TEXT COMMENT 'AI 主观题点评语',
  completed_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_challenge (user_id, challenge_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 3. MyBatis-Plus 复杂 JSON 字段字段映射 (JacksonTypeHandler)

在上述表结构中，MySQL 中的 `JSON` 类型字段（如 `tags`, `skills`, `theory`, `required_datasets` 等）在 Java POJO 实体中不能直接声明为 String，推荐配置 MyBatis-Plus 提供的 `JacksonTypeHandler` 自动在 Java 数据对象与 JSON 字符流之间双向转换。

### ☕ ChallengeDetail 实体配置示例

```java
package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@TableName(value = "challenge_details", autoResultMap = true) // 必须开启 autoResultMap!
public class ChallengeDetail {
    @TableId(type = IdType.INPUT)
    private String challengeId;

    // 映射 JSON: {"markdown": "...", "latexFormulas": ["..."]}
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> theory;

    private String starterCode;
    
    private String evaluationScript;

    // 映射 JSON: [{"name": "iris.csv", "mountPath": "/data/iris.csv"}]
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<Map<String, String>> requiredDatasets;

    // 映射 JSON 选择题
    @TableField(typeHandler = JacksonTypeHandler.class)
    private List<Map<String, Object>> conceptualQuizzes;

    // 映射 JSON 主观题打分配置
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, Object> thinkingQuestion;
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
import java.util.concurrent.TimeUnit;

@Service
public class SandboxServiceImpl {

    public JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec) {
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
        
        sseExecutor.submit(() -> {
            try {
                // 模拟调用大模型 API 并获得流式输出
                for (int i = 0; i < 20; i++) {
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
