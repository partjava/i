#!/usr/bin/env node
/**
 * 完整数据库初始化脚本
 * 运行: node scripts/mysql.js
 */

const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'ecs-user',
  password: '123456'
};

async function init() {
  let conn;
  try {
    console.log('🔗 连接 MySQL...');
    conn = await mysql.createConnection(config);

    // 创建数据库
    await conn.execute(`CREATE DATABASE IF NOT EXISTS partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await conn.end();

    // 重新连接，指定数据库
    conn = await mysql.createConnection({ ...config, database: 'partjava_notes' });
    console.log('✅ 数据库 partjava_notes 就绪');

    // 创建用户表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        location VARCHAR(255),
        website VARCHAR(500),
        github VARCHAR(255),
        image MEDIUMTEXT,
        email_verified TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ users');

    // 用户扩展资料表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_profiles (
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
        avatar MEDIUMTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_id (user_id),
        CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ user_profiles');

    // 笔记表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS notes (
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
        FULLTEXT KEY ft_title (title),
        FULLTEXT KEY ft_content (content),
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ notes');

    // 点赞表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS note_likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        note_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_like (note_id, user_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ note_likes');

    // 收藏表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS note_bookmarks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        note_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_bookmark (note_id, user_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ note_bookmarks');

    // 评论表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        note_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        parent_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_note_id (note_id),
        INDEX idx_user_id (user_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ comments');

    // 评论点赞表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS comment_likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_comment_like (comment_id, user_id),
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ comment_likes');

    // 搜索历史表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS search_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        query VARCHAR(500) NOT NULL,
        results_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ search_history');

    // 学习统计表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS learning_stats (
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
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ learning_stats');

    // 学习会话表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS study_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        study_time INT NOT NULL,
        category VARCHAR(255),
        technology VARCHAR(255),
        activity VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ study_sessions');

    // 学习会话表（learning_sessions）
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS learning_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        duration_minutes INT NOT NULL,
        note_id INT,
        activity_type ENUM('reading', 'writing', 'reviewing') DEFAULT 'reading',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_date (user_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ learning_sessions');

    // 连续学习记录表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_streaks (
        user_id VARCHAR(255) PRIMARY KEY,
        current_streak INT DEFAULT 0,
        longest_streak INT DEFAULT 0,
        last_study_date DATE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ user_streaks');

    // 成就定义表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(10),
        category ENUM('notes', 'learning', 'social', 'special') NOT NULL,
        max_progress INT DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ achievements');

    // 用户成就表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        achievement_id VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        unlocked BOOLEAN DEFAULT FALSE,
        unlocked_at TIMESTAMP NULL,
        progress INT DEFAULT 0,
        earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_achievement (user_id, achievement_id),
        INDEX idx_user_id (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ user_achievements');

    // 编程挑战表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS challenges (
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
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ challenges');

    // 挑战提交记录表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS challenge_submissions (
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
        FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ challenge_submissions');

    // AI 对话列表表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS ai_conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) DEFAULT '新对话',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_updated_at (updated_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ ai_conversations');

    // AI 消息记录表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS ai_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id INT NOT NULL,
        role ENUM('user','assistant') NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_conversation_id (conversation_id),
        FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ ai_messages');

    // 插入预定义成就数据
    await conn.execute(`
      INSERT IGNORE INTO achievements (id, name, description, icon, category, max_progress, sort_order) VALUES
      ('first_note', '初出茅庐', '发布第一篇笔记', '📝', 'notes', 1, 1),
      ('notes_10', '笔记新手', '发布10篇笔记', '📚', 'notes', 10, 2),
      ('notes_50', '笔记达人', '发布50篇笔记', '📖', 'notes', 50, 3),
      ('notes_100', '笔记大师', '发布100篇笔记', '🎓', 'notes', 100, 4),
      ('streak_7', '坚持一周', '连续7天学习', '🔥', 'learning', 7, 5),
      ('streak_30', '月度学霸', '连续30天学习', '💪', 'learning', 30, 6),
      ('streak_100', '百日筑基', '连续100天学习', '🏆', 'learning', 100, 7),
      ('early_bird', '早起鸟儿', '早上6点前开始学习10次', '🌅', 'learning', 10, 8),
      ('night_owl', '夜猫子', '晚上11点后还在学习10次', '🦉', 'learning', 10, 9),
      ('first_share', '分享新手', '第一次公开分享笔记', '🌟', 'social', 1, 10),
      ('popular_note', '人气作者', '单篇笔记浏览量超过100', '👁️', 'social', 100, 11),
      ('helpful_user', '乐于助人', '获得10个赞', '👍', 'social', 10, 12),
      ('perfectionist', '完美主义者', '连续7天每天学习超过2小时', '💎', 'special', 7, 13),
      ('knowledge_hunter', '知识猎人', '在5个不同领域发布笔记', '🎯', 'special', 5, 14),
      ('comeback_king', '王者归来', '中断后重新开始连续学习7天', '👑', 'special', 7, 15)
    `);
    console.log('✅ 成就数据已插入');

    // 显示所有表
    const [tables] = await conn.execute('SHOW TABLES');
    console.log(`\n🎉 完成！共创建 ${tables.length} 个表:`);
    tables.forEach(t => console.log(`  - ${Object.values(t)[0]}`));

  } catch (err) {
    console.error('❌ 失败:', err.message);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
}

init();
