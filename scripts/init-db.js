const mysql = require('mysql2/promise');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

// 从环境变量读取配置
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'ecs-user',
  password: process.env.DB_PASSWORD || '',
  charset: 'utf8mb4'
};

async function initDatabase() {
  let connection;
  
  try {
    console.log('🔌 正在连接MySQL服务器...');
    connection = await mysql.createConnection(config);
    console.log('✅ MySQL连接成功！');

    // 创建数据库
    const dbName = process.env.DB_NAME || 'partjava_notes';
    console.log(`📁 创建数据库: ${dbName}`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.query(`USE \`${dbName}\``);
    
    console.log('✅ 数据库创建/选择成功！');

    // 创建用户表
    console.log('👥 创建用户表...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // 创建笔记表
    console.log('📝 创建笔记表...');
    await connection.execute(`
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

    // 创建收藏表
    console.log('⭐ 创建收藏表...');
    await connection.execute(`
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

    console.log('🎉 数据库初始化完成！');
    console.log('');
    console.log('📊 数据库结构：');
    console.log('  - users: 用户表');
    console.log('  - notes: 笔记表');
    console.log('  - favorites: 收藏表');
    console.log('');
    console.log('🚀 现在可以启动应用程序了：npm run dev');

  } catch (error) {
    console.error('❌ 数据库初始化失败:', error.message);
    console.error('');
    console.error('🔧 请检查：');
    console.error('  1. MySQL服务是否运行');
    console.error('  2. 用户名密码是否正确');
    console.error('  3. 网络连接是否正常');
    console.error('');
    console.error('💡 如果使用XAMPP，请确保MySQL已启动');
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 运行初始化
initDatabase();