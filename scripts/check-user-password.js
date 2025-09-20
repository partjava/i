const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

async function checkUserPassword() {
  let connection;
  
  try {
    console.log('🔐 检查用户密码加密情况...\n');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // 查看用户密码
    const [users] = await connection.execute('SELECT id, name, email, password FROM users');
    
    for (const user of users) {
      console.log(`👤 用户: ${user.name} (${user.email})`);
      console.log(`   ID: ${user.id}`);
      console.log(`   密码哈希: ${user.password.substring(0, 20)}...`);
      console.log(`   密码长度: ${user.password.length}`);
      console.log(`   是否bcrypt格式: ${user.password.startsWith('$2') ? '是' : '否'}`);
      
      // 测试常见密码
      const testPasswords = ['123456', 'password', 'admin', '123', 'aaa'];
      console.log('   测试密码匹配:');
      
      for (const testPwd of testPasswords) {
        try {
          const isMatch = await bcrypt.compare(testPwd, user.password);
          if (isMatch) {
            console.log(`     ✅ "${testPwd}" - 匹配`);
          } else {
            console.log(`     ❌ "${testPwd}" - 不匹配`);
          }
        } catch (error) {
          console.log(`     ⚠️ "${testPwd}" - 验证错误: ${error.message}`);
        }
      }
      console.log('');
    }

  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserPassword(); 