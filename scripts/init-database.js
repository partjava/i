const mysql = require('mysql2/promise');
require('dotenv').config();

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dbuser',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'partjava_notes'
};

async function initDatabase() {
  let connection;
  
  try {
    console.log('🔗 连接数据库...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ 数据库连接成功');

    // 创建用户表
    console.log('📋 创建用户表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建笔记表
    console.log('📝 创建笔记表...');
    await connection.execute(`
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
        INDEX idx_updated_at (updated_at),
        FULLTEXT KEY ft_title (title),
        FULLTEXT KEY ft_content (content),
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建笔记点赞表
    console.log('👍 创建点赞表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS note_likes (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建笔记收藏表
    console.log('🔖 创建收藏表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS note_bookmarks (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建评论表
    console.log('💬 创建评论表...');
    await connection.execute(`
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
        INDEX idx_parent_id (parent_id),
        INDEX idx_created_at (created_at),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建搜索历史表
    console.log('🔍 创建搜索历史表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS search_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        query VARCHAR(500) NOT NULL,
        results_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建学习统计表
    console.log('📊 创建学习统计表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS learning_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        activity VARCHAR(255),
        points INT DEFAULT 0,
        category VARCHAR(100),
        technology VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建用户成就表
    console.log('🏆 创建成就表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_achievements (
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ 所有表创建完成');

    // 检查表状态
    console.log('🔍 检查表状态...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📋 共创建 ${tables.length} 个表:`);
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  ✓ ${tableName}`);
    });

    // 显示索引信息
    console.log('🔍 验证关键索引...');
    const [noteIndexes] = await connection.execute('SHOW INDEX FROM notes');
    const noteIndexNames = [...new Set(noteIndexes.map(idx => idx.Key_name))];
    console.log(`📝 notes表索引: ${noteIndexNames.join(', ')}`);

    console.log('🎉 数据库初始化完成！');

  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔗 数据库连接已关闭');
    }
  }
}

// 运行初始化
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };