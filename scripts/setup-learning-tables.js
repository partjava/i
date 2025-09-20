require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function setupTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: 'REDACTED', // 使用检测到的密码
    database: process.env.DB_NAME || 'partjava_notes',
    charset: 'utf8mb4'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 检查现有表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 现有表:', tables.map(t => Object.values(t)[0]));

    // 创建成就定义表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(10),
        category ENUM('notes', 'learning', 'social', 'special') NOT NULL,
        max_progress INT DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ 创建成就定义表');

    // 创建用户成就表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        user_id VARCHAR(255) NOT NULL,
        achievement_id VARCHAR(50) NOT NULL,
        unlocked BOOLEAN DEFAULT FALSE,
        unlocked_at TIMESTAMP NULL,
        progress INT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, achievement_id),
        FOREIGN KEY (achievement_id) REFERENCES achievements(id)
      )
    `);
    console.log('✅ 创建用户成就表');

    // 创建学习会话表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS learning_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        duration_minutes INT NOT NULL,
        note_id INT,
        activity_type ENUM('reading', 'writing', 'reviewing') DEFAULT 'reading',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_date (user_id, created_at)
      )
    `);
    console.log('✅ 创建学习会话表');

    // 创建用户连续学习记录表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_streaks (
        user_id VARCHAR(255) PRIMARY KEY,
        current_streak INT DEFAULT 0,
        longest_streak INT DEFAULT 0,
        last_study_date DATE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ 创建用户连续学习记录表');

    // 检查是否已有成就数据
    const [achievementCount] = await connection.execute('SELECT COUNT(*) as count FROM achievements');
    if (achievementCount[0].count === 0) {
      // 插入预定义的成就
      await connection.execute(`
        INSERT INTO achievements (id, name, description, icon, category, max_progress, sort_order) VALUES
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
      console.log('✅ 插入预定义成就数据');
    } else {
      console.log('ℹ️  成就数据已存在，跳过插入');
    }

    // 检查最终状态
    const [finalTables] = await connection.execute('SHOW TABLES');
    console.log('📋 最终表列表:', finalTables.map(t => Object.values(t)[0]));
    
    const [achievementsList] = await connection.execute('SELECT COUNT(*) as count FROM achievements');
    console.log('🏆 成就总数:', achievementsList[0].count);

  } catch (error) {
    console.error('❌ 设置失败:', error);
  } finally {
    await connection.end();
  }
}

setupTables(); 