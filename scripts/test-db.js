const mysql = require('mysql2/promise');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

// 测试数据库连接
async function testConnection() {
  console.log('🧪 测试MySQL数据库连接...\n');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'partjava_notes'
  };

  console.log('📋 连接配置：');
  console.log(`   主机: ${config.host}`);
  console.log(`   端口: ${config.port}`);
  console.log(`   用户: ${config.user}`);
  console.log(`   数据库: ${config.database}`);
  console.log('');

  try {
    // 测试连接
    console.log('🔌 正在连接...');
    const connection = await mysql.createConnection(config);
    console.log('✅ 数据库连接成功！');

    // 测试查询
    console.log('📊 测试基本查询...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ 找到 ${tables.length} 个表：`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
    });

    // 测试用户表
    if (tables.some(table => Object.values(table)[0] === 'users')) {
      const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
      console.log(`👥 用户表记录数: ${users[0].count}`);
    }

    // 测试笔记表
    if (tables.some(table => Object.values(table)[0] === 'notes')) {
      const [notes] = await connection.execute('SELECT COUNT(*) as count FROM notes');
      console.log(`📝 笔记表记录数: ${notes[0].count}`);
    }

    await connection.end();
    console.log('\n🎉 数据库测试完成，一切正常！');

  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    console.error('\n🔧 解决方案：');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('  • MySQL服务未启动，请启动MySQL服务');
      console.error('  • 如果使用XAMPP，请在控制面板启动MySQL');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('  • 用户名或密码错误');
      console.error('  • 请检查.env.local文件中的数据库配置');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('  • 数据库不存在，请先运行: node scripts/init-db.js');
    } else {
      console.error('  • 检查网络连接');
      console.error('  • 确认MySQL安装正确');
    }
    
    process.exit(1);
  }
}

testConnection(); 