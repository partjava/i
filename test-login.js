const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function testLogin() {
  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'dbuser',
      password: 'REDACTED',
      database: 'partjava_notes'
    });

    console.log('🔗 数据库连接成功');

    // 测试用户登录
    const testEmail = 'test@example.com';
    const testPassword = '123456'; // 假设这是测试密码

    console.log(`🔍 查找用户: ${testEmail}`);
    
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );

    if (users.length === 0) {
      console.log('❌ 用户不存在');
      return;
    }

    console.log(`✅ 找到用户: ${users[0].name}`);
    console.log(`📧 邮箱: ${users[0].email}`);
    console.log(`🔐 密码哈希: ${users[0].password}`);

    // 测试密码验证
    const isValidPassword = await bcrypt.compare(testPassword, users[0].password);
    console.log(`🔑 密码验证结果: ${isValidPassword ? '✅ 正确' : '❌ 错误'}`);

    if (!isValidPassword) {
      console.log('💡 尝试其他常见密码...');
      const commonPasswords = ['password', 'test', 'admin', '123456', 'test123'];
      
      for (const pwd of commonPasswords) {
        const isValid = await bcrypt.compare(pwd, users[0].password);
        if (isValid) {
          console.log(`✅ 找到正确密码: ${pwd}`);
          break;
        }
      }
    }

    await connection.end();
    console.log('🔗 数据库连接已关闭');

  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testLogin();
