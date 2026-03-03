const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createPartJavaUser() {
  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'ecs-user',
      password: '123456',
      database: 'partjava_notes'
    });

    console.log('🔗 数据库连接成功');

    const email = 'partjava@qq.com';
    const password = '123456';
    const name = 'PartJava用户';

    // 检查用户是否已存在
    const [existingUsers] = await connection.execute(
      'SELECT id, email, name FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      console.log('⚠️  用户已存在:');
      console.log(`   ID: ${existingUsers[0].id}`);
      console.log(`   姓名: ${existingUsers[0].name}`);
      console.log(`   邮箱: ${existingUsers[0].email}`);
      
      // 更新密码
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, email]
      );
      console.log('✅ 密码已更新为: 123456');
      
      await connection.end();
      return;
    }

    // 创建新用户
    console.log(`\n📝 创建新用户:`);
    console.log(`   邮箱: ${email}`);
    console.log(`   姓名: ${name}`);
    console.log(`   密码: ${password}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await connection.execute(
      'INSERT INTO users (email, name, password) VALUES (?, ?, ?)',
      [email, name, hashedPassword]
    );

    console.log(`\n✅ 用户创建成功！`);
    console.log(`   ID: ${result.insertId}`);
    console.log(`   邮箱: ${email}`);
    console.log(`   姓名: ${name}`);
    console.log(`   密码: ${password}`);

    await connection.end();
    console.log('\n🔗 数据库连接已关闭');

  } catch (error) {
    console.error('❌ 创建用户失败:', error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('💡 用户已存在（邮箱重复）');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 数据库连接被拒绝，请检查 MySQL 服务是否运行');
    }
  }
}

createPartJavaUser();

