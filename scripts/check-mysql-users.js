const mysql = require('mysql2/promise');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

async function checkMySQLUsers() {
  console.log('🔍 检查MySQL用户信息...\n');

  // 首先尝试不使用密码连接
  const configs = [
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      name: 'root (无密码)'
    },
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'REDACTED',
      name: 'root (密码: 123456)'
    },
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      name: 'root (密码: root)'
    },
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      name: 'root (密码: password)'
    }
  ];

  let successConfig = null;

  for (const config of configs) {
    try {
      console.log(`🔑 尝试连接: ${config.name}`);
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password
      });

      console.log(`✅ 连接成功: ${config.name}`);
      
      // 查看所有用户
      console.log('\n👥 MySQL用户列表:');
      const [users] = await connection.execute(
        "SELECT user, host, authentication_string FROM mysql.user"
      );
      
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. 用户: ${user.user}@${user.host}`);
        console.log(`      密码设置: ${user.authentication_string ? '是' : '否'}`);
      });

      // 查看当前用户权限
      console.log('\n🔐 当前用户权限:');
      const [privileges] = await connection.execute("SHOW GRANTS FOR CURRENT_USER()");
      privileges.forEach((priv, index) => {
        console.log(`   ${index + 1}. ${Object.values(priv)[0]}`);
      });

      await connection.end();
      successConfig = config;
      break;

    } catch (error) {
      console.log(`❌ 连接失败: ${config.name} - ${error.message}`);
    }
  }

  if (successConfig) {
    console.log(`\n🎉 找到正确的连接配置:`);
    console.log(`   用户名: ${successConfig.user}`);
    console.log(`   密码: ${successConfig.password || '(空密码)'}`);
    console.log(`\n📝 请更新你的 .env.local 文件:`);
    console.log(`   DB_USER=${successConfig.user}`);
    console.log(`   DB_PASSWORD=${successConfig.password}`);
  } else {
    console.log('\n❌ 所有连接尝试都失败了');
    console.log('💡 建议解决方案:');
    console.log('   1. 重新运行MySQL Configurator');
    console.log('   2. 或者重置root密码');
  }
}

checkMySQLUsers().catch(console.error); 