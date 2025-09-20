const mysql = require('mysql2/promise');

async function testAchievements() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'REDACTED',
    database: 'partjava_notes'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 测试查询笔记数据
    console.log('\n📝 测试查询笔记数据:');
    const [noteCount] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM notes 
      WHERE author_id = ?
    `, ['1']);
    
    console.log(`用户ID 1 的笔记数量: ${noteCount[0].count}`);
    
    // 查看用户信息
    const [users] = await connection.execute(`
      SELECT id, name, email 
      FROM users 
      ORDER BY id
    `);
    
    console.log('\n👥 用户列表:');
    users.forEach(user => {
      console.log(`  ID: ${user.id}, 姓名: ${user.name}, 邮箱: ${user.email}`);
    });
    
    // 检查成就表是否存在
    console.log('\n🏆 检查成就系统表:');
    const [achievements] = await connection.execute('SELECT COUNT(*) as count FROM achievements');
    console.log(`成就总数: ${achievements[0].count}`);
    
    const [userAchievements] = await connection.execute('SELECT COUNT(*) as count FROM user_achievements');
    console.log(`用户成就记录数: ${userAchievements[0].count}`);
    
    // 测试查询所有用户的笔记
    console.log('\n🔄 测试查询所有用户的笔记:');
    for (const user of users) {
      const [count] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM notes 
        WHERE author_id = ?
      `, [user.id.toString()]);
      
      console.log(`${user.name} (ID: ${user.id}) 的笔记数量: ${count[0].count}`);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    await connection.end();
  }
}

testAchievements(); 