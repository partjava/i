const mysql = require('mysql2/promise');

async function fixLearningData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'REDACTED',
    database: 'partjava_notes'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 查看当前的学习记录
    const [currentSessions] = await connection.execute(`
      SELECT user_id, duration_minutes, created_at 
      FROM learning_sessions 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
    
    console.log('\n📊 当前的学习记录:');
    currentSessions.forEach((session, index) => {
      console.log(`  ${index + 1}. 用户${session.user_id}: ${session.duration_minutes}分钟 - ${session.created_at}`);
    });
    
    // 删除今天的异常数据（时间过长的记录）
    const today = new Date().toISOString().split('T')[0];
    const [deleted] = await connection.execute(`
      DELETE FROM learning_sessions 
      WHERE DATE(created_at) = ? AND duration_minutes > 60
    `, [today]);
    
    console.log(`\n🗑️  删除了今天 ${deleted.affectedRows} 条异常记录（超过60分钟的）`);
    
    // 重置连续学习记录到合理的值
    await connection.execute(`
      UPDATE user_streaks 
      SET current_streak = 1, longest_streak = 1 
      WHERE current_streak > 7
    `);
    
    console.log('🔄 重置了异常的连续学习记录');
    
    // 查看清理后的数据
    const [finalSessions] = await connection.execute(`
      SELECT user_id, SUM(duration_minutes) as total_minutes, COUNT(*) as session_count
      FROM learning_sessions 
      WHERE DATE(created_at) = ?
      GROUP BY user_id
    `, [today]);
    
    console.log('\n✅ 清理后今日学习统计:');
    finalSessions.forEach(session => {
      console.log(`  用户${session.user_id}: ${session.total_minutes}分钟 (${session.session_count}个会话)`);
    });
    
  } catch (error) {
    console.error('❌ 修复失败:', error.message);
  } finally {
    await connection.end();
  }
}

fixLearningData(); 