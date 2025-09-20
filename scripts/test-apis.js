const mysql = require('mysql2/promise');

async function testAPIs() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'REDACTED',
    database: 'partjava_notes',
    charset: 'utf8mb4'
  });

  try {
    console.log('🔍 测试数据库连接和查询...');
    
    // 测试成就查询
    const achievements = await connection.execute(`
      SELECT 
        a.id,
        a.name,
        a.description,
        a.icon,
        a.category,
        a.max_progress,
        ua.unlocked,
        ua.unlocked_at,
        ua.progress
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
      ORDER BY a.category, a.sort_order
    `, ['test-user-id']);
    
    console.log('✅ 成就查询成功:', achievements[0].length, '个成就');
    
    // 测试学习统计查询
    const todayStats = await connection.execute(`
      SELECT COALESCE(SUM(duration_minutes), 0) as minutes
      FROM learning_sessions
      WHERE user_id = ? AND DATE(created_at) = CURDATE()
    `, ['test-user-id']);
    
    console.log('✅ 学习统计查询成功');
    
    // 测试插入一些示例数据
    await connection.execute(`
      INSERT IGNORE INTO learning_sessions (user_id, duration_minutes, activity_type)
      VALUES ('test-user-id', 30, 'reading')
    `);
    
    await connection.execute(`
      INSERT IGNORE INTO user_streaks (user_id, current_streak, longest_streak, last_study_date)
      VALUES ('test-user-id', 5, 10, CURDATE())
      ON DUPLICATE KEY UPDATE
      current_streak = 5,
      longest_streak = 10,
      last_study_date = CURDATE()
    `);
    
    console.log('✅ 示例数据插入成功');
    
    // 再次测试查询
    const stats = await connection.execute(`
      SELECT COALESCE(SUM(duration_minutes), 0) as minutes
      FROM learning_sessions
      WHERE user_id = ? AND DATE(created_at) = CURDATE()
    `, ['test-user-id']);
    
    console.log('📊 今日学习时间:', stats[0][0].minutes, '分钟');
    
    const streak = await connection.execute(`
      SELECT current_streak, longest_streak FROM user_streaks WHERE user_id = ?
    `, ['test-user-id']);
    
    if (streak[0].length > 0) {
      console.log('🔥 连续学习:', streak[0][0].current_streak, '天，最长:', streak[0][0].longest_streak, '天');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  } finally {
    await connection.end();
  }
}

testAPIs(); 