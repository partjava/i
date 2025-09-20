import * as mysql from 'mysql2/promise'

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'ecs-user',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'partjava_notes',
  charset: 'utf8mb4',
  timezone: '+08:00',
  typeCast: function (field: any, next: any): any {
    if (field.type === 'TINY' && field.length === 1) {
      return field.string() === '1'; // '1' -> true, '0' -> false
    }
    return next();
  }
}

// 创建连接池
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  idleTimeout: 60000,
  maxIdle: 5,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})

// 跟踪已初始化的表
const initializedTables = new Set<string>();

// 确保表存在的通用函数
export async function ensureTableExists(tableName: string, createTableSQL: string) {
  if (initializedTables.has(tableName)) {
    return;
  }
  
  try {
    await executeQuery(createTableSQL);
    initializedTables.add(tableName);
  } catch (error) {
    // 表可能已存在，标记为已初始化
    initializedTables.add(tableName);
  }
}

// 获取数据库连接
export async function getConnection() {
  try {
    const connection = await pool.getConnection()
    return connection
  } catch (error) {
    console.error('数据库连接失败:', error)
    throw error
  }
}

// 执行查询（带重试机制）
export async function executeQuery(sql: string, params: any[] = [], retries: number = 3) {
  let lastError: any;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    let connection;
    try {
      connection = await getConnection()
      const [results] = await connection.execute(sql, params)
      return results
    } catch (error) {
      lastError = error;
      console.error(`SQL查询失败 (尝试 ${attempt}/${retries}):`, sql, params, error)
      
      // 如果是连接错误且还有重试次数，等待后重试
      if (attempt < retries && (
        error instanceof Error && (
          error.message.includes('ECONNREFUSED') ||
          error.message.includes('ENOTFOUND') ||
          error.message.includes('ETIMEDOUT')
        )
      )) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        continue
      }
      
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
  
  throw lastError
}

// 初始化数据库表
export async function initDatabase() {
  try {
    // 创建用户表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        bio TEXT,
        location VARCHAR(255),
        website VARCHAR(500),
        github VARCHAR(255),
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建笔记表
    await executeQuery(`
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
        INDEX idx_author_id (author_id),
        INDEX idx_category (category),
        INDEX idx_technology (technology),
        INDEX idx_created_at (created_at),
        INDEX idx_is_public (is_public)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建点赞表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS note_likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        note_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_like (user_id, note_id),
        INDEX idx_note_id (note_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建收藏表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS note_bookmarks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        note_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_bookmark (user_id, note_id),
        INDEX idx_note_id (note_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建评论表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        note_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_note_id (note_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建学习统计表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS learning_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        category VARCHAR(100),
        technology VARCHAR(100),
        activity VARCHAR(255),
        points INT DEFAULT 0,
        study_time INT DEFAULT 0,
        notes_count INT DEFAULT 0,
        last_study_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_tech (user_id, category, technology),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 创建用户资料表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255),
        bio TEXT,
        location VARCHAR(255),
        website VARCHAR(500),
        github VARCHAR(255),
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_id (user_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)
    
    // 创建学习会话表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS study_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        study_time INT NOT NULL DEFAULT 0,
        category VARCHAR(100),
        technology VARCHAR(100),
        activity VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)
    
    // 创建搜索历史表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS search_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        query VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)
    
    // 创建成就表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        category VARCHAR(50),
        max_progress INT DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)
    
    // 创建用户成就表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        achievement_id VARCHAR(50) NOT NULL,
        unlocked BOOLEAN DEFAULT FALSE,
        progress INT DEFAULT 0,
        unlocked_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_achievement (user_id, achievement_id),
        INDEX idx_user_id (user_id),
        INDEX idx_achievement_id (achievement_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)
    
    // 注意: 收藏功能使用note_bookmarks表，不需要单独的favorites表
    
    // 创建评论点赞表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS comment_likes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_comment_like (comment_id, user_id),
        INDEX idx_comment_id (comment_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

  } catch (error) {
    console.error('❌ 数据库初始化失败:', error)
    throw error
  }
}

export default pool