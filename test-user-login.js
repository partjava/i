const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function testUserLogin() {
  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'ecs-user',
      password: '123456',
      database: 'partjava_notes'
    });

    console.log('🔗 数据库连接成功');

    // 测试用户登录
    const testEmail = 'partjava@qq.com';
    const testPassword = '123456';

    console.log(`\n🔍 查找用户: ${testEmail}`);
    
    const [users] = await connection.execute(
      'SELECT id, email, name, password, avatar FROM users WHERE email = ?',
      [testEmail]
    );

    if (users.length === 0) {
      console.log('❌ 用户不存在');
      console.log('💡 需要创建该用户吗？');
      await connection.end();
      return;
    }

    const user = users[0];
    console.log(`✅ 找到用户:`);
    console.log(`   ID: ${user.id}`);
    console.log(`   姓名: ${user.name || '未设置'}`);
    console.log(`   邮箱: ${user.email}`);
    console.log(`   头像: ${user.avatar || '未设置'}`);
    console.log(`   密码哈希: ${user.password.substring(0, 20)}...`);

    // 测试密码验证
    console.log(`\n🔑 验证密码: ${testPassword}`);
    const isValidPassword = await bcrypt.compare(testPassword, user.password);
    console.log(`   验证结果: ${isValidPassword ? '✅ 密码正确' : '❌ 密码错误'}`);

    if (isValidPassword) {
      console.log('\n✅ 登录信息验证成功！');
      console.log('   用户信息:');
      console.log(`   - ID: ${user.id}`);
      console.log(`   - 姓名: ${user.name || user.email.split('@')[0]}`);
      console.log(`   - 邮箱: ${user.email}`);
    } else {
      console.log('\n❌ 密码验证失败');
      console.log('💡 尝试其他常见密码...');
      const commonPasswords = ['password', 'test', 'admin', '123456', 'test123', 'partjava'];
      
      for (const pwd of commonPasswords) {
        const isValid = await bcrypt.compare(pwd, user.password);
        if (isValid) {
          console.log(`✅ 找到正确密码: ${pwd}`);
          break;
        }
      }
    }

    await connection.end();
    console.log('\n🔗 数据库连接已关闭');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 数据库连接被拒绝，请检查 MySQL 服务是否运行');
    }
  }
}

testUserLogin();

