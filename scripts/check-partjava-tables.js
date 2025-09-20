const mysql = require('mysql2/promise');

async function checkTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'partjava'
  });

  try {
    console.log('🔗 连接partjava数据库成功');
    
    // 查看所有表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 partjava数据库中的表:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  ${tableName}`);
    });
    
    // 查看所有数据库
    console.log('\n💾 所有数据库:');
    const [databases] = await connection.execute('SHOW DATABASES');
    databases.forEach(db => {
      const dbName = Object.values(db)[0];
      console.log(`  ${dbName}`);
    });
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message);
  } finally {
    await connection.end();
  }
}

checkTables(); 