const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createTestUser() {
  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'dbuser',
      password: 'REDACTED',
      database: 'partjava_notes'
    });

    console.log('🔗 数据库连接成功');

    // 创建测试用户
    const testEmail = 'admin@partjava.com';
    const testPassword = '123456';
    const testName = '管理员';

    // 检查用户是否已存在
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );

    if (existingUsers.length > 0) {
      console.log('⚠️ 用户已存在，删除旧用户...');
      await connection.execute('DELETE FROM users WHERE email = ?', [testEmail]);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    console.log(`🔐 密码已加密: ${hashedPassword}`);

    // 插入新用户
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [testName, testEmail, hashedPassword]
    );

    console.log(`✅ 用户创建成功!`);
    console.log(`👤 用户名: ${testName}`);
    console.log(`📧 邮箱: ${testEmail}`);
    console.log(`🔑 密码: ${testPassword}`);
    console.log(`🆔 用户ID: ${result.insertId}`);

    // 验证登录
    console.log('\n🔍 验证登录...');
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );

    if (users.length > 0) {
      const isValidPassword = await bcrypt.compare(testPassword, users[0].password);
      console.log(`🔑 密码验证: ${isValidPassword ? '✅ 成功' : '❌ 失败'}`);
    }

    await connection.end();
    console.log('🔗 数据库连接已关闭');

  } catch (error) {
    console.error('❌ 创建用户失败:', error);
  }
}

createTestUser();
