const mysql = require('mysql2/promise');

async function checkNotesStructure() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'partjava'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 查看所有表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 数据库中的所有表:');
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`  ${tableName}`);
    });
    
    // 查找包含"note"的表
    const noteTable = tables.find(table => {
      const tableName = Object.values(table)[0].toLowerCase();
      return tableName.includes('note');
    });
    
    if (noteTable) {
      const tableName = Object.values(noteTable)[0];
      console.log(`\n📝 检查表: ${tableName}`);
      const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
      columns.forEach(col => {
        console.log(`  ${col.Field} - ${col.Type} ${col.Null === 'YES' ? '(可为空)' : '(不为空)'} ${col.Key ? `[${col.Key}]` : ''}`);
      });
      
      // 查看几条数据示例
      const [rows] = await connection.execute(`SELECT * FROM ${tableName} LIMIT 3`);
      console.log(`\n📄 ${tableName}表数据示例:`);
      rows.forEach((row, index) => {
        console.log(`  ${index + 1}. ${JSON.stringify(row)}`);
      });
    }
    
    // 检查users表结构  
    const [userColumns] = await connection.execute('DESCRIBE users');
    console.log('\n👤 users表结构:');
    userColumns.forEach(col => {
      console.log(`  ${col.Field} - ${col.Type} ${col.Null === 'YES' ? '(可为空)' : '(不为空)'} ${col.Key ? `[${col.Key}]` : ''}`);
    });
    
  } catch (error) {
    console.error('❌ 数据库操作失败:', error.message);
  } finally {
    await connection.end();
  }
}

checkNotesStructure(); 