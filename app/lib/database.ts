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

// 创建连接池 - 优化配置
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: process.env.NODE_ENV === 'production' ? 10 : 5, // 生产环境更多连接
  queueLimit: 0,
  idleTimeout: 60000,
  maxIdle: process.env.NODE_ENV === 'production' ? 3 : 2,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // 添加连接池事件监听
  ...(process.env.NODE_ENV === 'development' && {
    debug: false // 开发环境可选调试
  })
})

// 监控连接池状态（仅开发环境）
if (process.env.NODE_ENV === 'development') {
  pool.on('connection', () => {
    console.log('📊 新数据库连接已建立')
  })
  pool.on('release', () => {
    console.log('📊 数据库连接已释放')
  })
}

// 进程级标志位，确保 initDatabase 只执行一次
let dbInitialized = false;

// 确保表存在的通用函数（保留兼容性）
export async function ensureTableExists(tableName: string, createTableSQL: string) {
  try {
    await executeQuery(createTableSQL);
  } catch (error) {
    // 表已存在，忽略
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

// 执行查询（带重试机制和性能监控）
export async function executeQuery(sql: string, params: any[] = [], retries: number = 3) {
  let lastError: any;
  const startTime = Date.now();
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    let connection;
    try {
      connection = await getConnection()
      const [results] = await connection.execute(sql, params)
      
      // 性能监控（仅开发环境）
      if (process.env.NODE_ENV === 'development') {
        const duration = Date.now() - startTime;
        if (duration > 1000) {
          console.warn(`⚠️ 慢查询 (${duration}ms):`, sql.substring(0, 100))
        }
      }
      
      return results
    } catch (error) {
      lastError = error;
      
      // 仅在开发环境或首次失败时记录详细错误
      if (process.env.NODE_ENV === 'development' || attempt === 1) {
        console.error(`SQL查询失败 (尝试 ${attempt}/${retries}):`, sql.substring(0, 100), error)
      }
      
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

// 初始化数据库表（进程内只执行一次）
export async function initDatabase() {
  if (dbInitialized) return;
  dbInitialized = true;
  try {
    // 创建用户表（image字段用于存储头像）
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
        image MEDIUMTEXT,
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

    // 创建用户资料表（扩展字段存放在这里）
    await executeQuery(`
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
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `)

    // 兼容已有数据库：如果 user_profiles 表还没有新增的扩展字段，则按需补充
    const columnsToEnsure = [
      { name: 'job_title', type: 'VARCHAR(255)' },
      { name: 'company', type: 'VARCHAR(255)' },
      { name: 'skills', type: 'JSON' },
      { name: 'social_links', type: 'JSON' }
    ]

    for (const col of columnsToEnsure) {
      try {
        const existing = await executeQuery(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_SCHEMA = DATABASE() 
             AND TABLE_NAME = 'user_profiles' 
             AND COLUMN_NAME = ?`,
          [col.name]
        ) as any[]

        if (!Array.isArray(existing) || existing.length === 0) {
          await executeQuery(
            'ALTER TABLE user_profiles ADD COLUMN ' + col.name + ' ' + col.type + ' NULL'
          )
        }
      } catch (e) {
        console.error('检查/补充 user_profiles 列失败:', col.name, e)
      }
    }
    
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
    dbInitialized = false; // 失败时重置，允许下次重试
    console.error('❌ 数据库初始化失败:', error)
    throw error
  }
}

export default pool