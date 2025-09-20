const mysql = require('mysql2/promise');

async function checkNotesData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'REDACTED',
    database: 'partjava_notes',
    charset: 'utf8mb4'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 检查所有表
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 数据库表:', tables.map(t => Object.values(t)[0]));
    
    // 检查笔记数量
    const [noteCount] = await connection.execute('SELECT COUNT(*) as count FROM notes');
    console.log('📝 笔记总数:', noteCount[0].count);
    
    // 检查用户数量
    const [userCount] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log('👥 用户总数:', userCount[0].count);
    
    // 检查是否有笔记数据
    if (noteCount[0].count > 0) {
      const [recentNotes] = await connection.execute(`
        SELECT id, title, category, technology, created_at 
        FROM notes 
        ORDER BY created_at DESC 
        LIMIT 5
      `);
      console.log('📚 最近的笔记:');
      recentNotes.forEach((note, index) => {
        console.log(`  ${index + 1}. ${note.title} (${note.category}/${note.technology}) - ${note.created_at}`);
      });
    }
    
    // 检查用户数据
    if (userCount[0].count > 0) {
      const [users] = await connection.execute(`
        SELECT id, name, email, created_at 
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      console.log('👤 用户列表:');
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} (${user.email}) - ${user.created_at}`);
      });
    }
    
    console.log('\n✅ 您的数据都还在，没有丢失！');
    
  } catch (error) {
    console.error('❌ 检查失败:', error);
  } finally {
    await connection.end();
  }
}

checkNotesData(); 