const mysql = require('mysql2/promise');

async function listAllUsers() {
  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'ecs-user',
      password: '123456',
      database: 'partjava_notes'
    });

    console.log('🔗 数据库连接成功\n');

    // 查询所有用户
    const [users] = await connection.execute(
      'SELECT id, email, name, created_at, updated_at FROM users ORDER BY id ASC'
    );

    if (users.length === 0) {
      console.log('❌ 数据库中没有用户');
      await connection.end();
      return;
    }

    console.log(`📊 共找到 ${users.length} 个用户:\n`);
    console.log('┌────┬──────────────────────────────┬──────────────────────┬─────────────────────┐');
    console.log('│ ID │ 邮箱                        │ 姓名                 │ 创建时间            │');
    console.log('├────┼──────────────────────────────┼──────────────────────┼─────────────────────┤');

    users.forEach(user => {
      const id = String(user.id).padEnd(3);
      const email = (user.email || '').padEnd(28);
      const name = (user.name || '未设置').padEnd(20);
      const createdAt = user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '未知';
      console.log(`│ ${id} │ ${email} │ ${name} │ ${createdAt.padEnd(19)} │`);
    });

    console.log('└────┴──────────────────────────────┴──────────────────────┴─────────────────────┘');

    // 显示详细信息
    console.log('\n📋 用户详细信息:');
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. 用户 #${user.id}`);
      console.log(`   邮箱: ${user.email}`);
      console.log(`   姓名: ${user.name || '未设置'}`);
      console.log(`   创建时间: ${user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '未知'}`);
      console.log(`   更新时间: ${user.updated_at ? new Date(user.updated_at).toLocaleString('zh-CN') : '未知'}`);
    });

    await connection.end();
    console.log('\n🔗 数据库连接已关闭');

  } catch (error) {
    console.error('❌ 查询失败:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 数据库连接被拒绝，请检查 MySQL 服务是否运行');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 数据库访问被拒绝，请检查用户名和密码');
    }
  }
}

listAllUsers();

