const mysql = require('mysql2/promise');

async function setupDatabase() {
  try {
    // 首先连接到MySQL服务器（不指定数据库）
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'ecs-user',
      password: '123456'
    });

    // 创建数据库
    await conn.execute('CREATE DATABASE IF NOT EXISTS partjava CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ 数据库 partjava 创建成功');

    // 切换到新数据库
    await conn.execute('USE partjava');

    // 创建用户表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        location VARCHAR(255),
        website VARCHAR(255),
        github VARCHAR(255),
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ 用户表创建成功');

    // 创建笔记表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content TEXT,
        category VARCHAR(100),
        technology VARCHAR(100),
        subcategory VARCHAR(100),
        tags JSON,
        is_public BOOLEAN DEFAULT FALSE,
        author_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_author_id (author_id),
        INDEX idx_category (category),
        INDEX idx_technology (technology),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ 笔记表创建成功');

    // 创建收藏表
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        note_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        UNIQUE KEY unique_favorite (user_id, note_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ 收藏表创建成功');

    await conn.end();
    console.log('🎉 数据库设置完成!');
  } catch (error) {
    console.error('❌ 数据库设置失败:', error);
  }
}

setupDatabase();