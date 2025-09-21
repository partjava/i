const mysql = require('mysql2/promise');

async function testDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'ecs-user',
      password: '123456',
      database: 'partjava_notes'
    });

    console.log('✅ 数据库连接成功');

    // 检查用户表
    const [users] = await connection.execute('SELECT * FROM users');
    console.log(`📊 用户数量: ${users.length}`);
    
    if (users.length > 0) {
      console.log('👥 用户列表:');
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email})`);
      });
    } else {
      console.log('⚠️ 没有用户，需要创建测试用户');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ 数据库测试失败:', error);
  }
}

testDatabase();
