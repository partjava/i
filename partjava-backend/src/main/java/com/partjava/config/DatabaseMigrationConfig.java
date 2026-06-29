package com.partjava.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Slf4j
@Configuration
public class DatabaseMigrationConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void migrate() {
        log.info("开始执行数据库 DDL 自动迁移...");
        try {
            // 1. 创建 challenge_quizzes 表
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS challenge_quizzes (\n" +
                    "  id INT AUTO_INCREMENT PRIMARY KEY,\n" +
                    "  challenge_id VARCHAR(64) NOT NULL,\n" +
                    "  question TEXT NOT NULL,\n" +
                    "  options JSON NOT NULL,\n" +
                    "  correct_index INT NOT NULL,\n" +
                    "  explanation TEXT,\n" +
                    "  INDEX idx_challenge_id (challenge_id)\n" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
            log.info("challenge_quizzes 表迁移成功");

            // 2. 创建 challenge_drafts 表
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS challenge_drafts (\n" +
                    "  id INT AUTO_INCREMENT PRIMARY KEY,\n" +
                    "  user_id INT NOT NULL,\n" +
                    "  stage_id INT NOT NULL,\n" +
                    "  topic_name VARCHAR(100) NOT NULL,\n" +
                    "  subtopic_name VARCHAR(100) NOT NULL,\n" +
                    "  level_title VARCHAR(255) NOT NULL,\n" +
                    "  theory_content TEXT,\n" +
                    "  latex_formulas JSON,\n" +
                    "  starter_code TEXT,\n" +
                    "  solution_code TEXT,\n" +
                    "  quizzes JSON,\n" +
                    "  thinking_question TEXT,\n" +
                    "  ai_prompt TEXT,\n" +
                    "  status VARCHAR(20) DEFAULT 'pending',\n" +
                    "  review_comment TEXT,\n" +
                    "  reviewer_id INT DEFAULT NULL,\n" +
                    "  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n" +
                    "  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n" +
                    "  INDEX idx_user_id (user_id),\n" +
                    "  INDEX idx_status (status)\n" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
            log.info("challenge_drafts 表迁移成功");

            // 3. 扩充 user_challenge_records 表
            try {
                jdbcTemplate.execute("ALTER TABLE user_challenge_records ADD COLUMN quiz_answers JSON DEFAULT NULL COMMENT '用户选择题作答选项';");
                log.info("user_challenge_records 扩展 quiz_answers 字段成功");
            } catch (Exception e) {
                log.debug("user_challenge_records quiz_answers 字段可能已存在: {}", e.getMessage());
            }

            // 4. 扩充 users 表
            String[] userColumns = {
                    "ALTER TABLE users ADD COLUMN vip TINYINT(1) DEFAULT 0 COMMENT '是否为VIP: 0=否, 1=是';",
                    "ALTER TABLE users ADD COLUMN vip_level INT DEFAULT 0 COMMENT '会员等级';",
                    "ALTER TABLE users ADD COLUMN vip_expire_time TIMESTAMP NULL DEFAULT NULL COMMENT '会员到期时间';",
                    "ALTER TABLE users ADD COLUMN draft_count INT DEFAULT 0 COMMENT '当月已出题数';"
            };
            for (String colSql : userColumns) {
                try {
                    jdbcTemplate.execute(colSql);
                } catch (Exception e) {
                    log.debug("users 表字段扩展可能已存在: {}", e.getMessage());
                }
            }
            log.info("users 表字段扩展处理完成");

            // 5. 扩充 comments 表以支持 parent_id 树形自关联
            try {
                jdbcTemplate.execute("ALTER TABLE comments ADD COLUMN parent_id INT DEFAULT NULL COMMENT '父级评论ID';");
                log.info("comments 扩展 parent_id 字段成功");
            } catch (Exception e) {
                log.debug("comments parent_id 字段可能已存在: {}", e.getMessage());
            }

            // 6. 扩充 challenges 表以匹配出题与关卡管理属性
            String[] challengeColumns = {
                    "ALTER TABLE challenges ADD COLUMN topic_name VARCHAR(100) NOT NULL DEFAULT '其它' COMMENT '所属主题';",
                    "ALTER TABLE challenges ADD COLUMN subtopic_name VARCHAR(100) NOT NULL DEFAULT '未分类' COMMENT '所属小节';",
                    "ALTER TABLE challenges ADD COLUMN level_index INT NOT NULL DEFAULT 1 COMMENT '关卡序号';",
                    "ALTER TABLE challenges ADD COLUMN access_level VARCHAR(20) DEFAULT 'member' COMMENT '权限要求';",
                    "ALTER TABLE challenges ADD COLUMN status VARCHAR(20) DEFAULT 'published' COMMENT '发布状态';"
            };
            for (String colSql : challengeColumns) {
                try {
                    jdbcTemplate.execute(colSql);
                } catch (Exception e) {
                    log.debug("challenges 表字段扩展可能已存在: {}", e.getMessage());
                }
            }
            log.info("challenges 表字段扩展处理完成");

            log.info("数据库 DDL 自动迁移成功！");
        } catch (Exception e) {
            log.error("数据库 DDL 迁移失败", e);
        }
    }
}
