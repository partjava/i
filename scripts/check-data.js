const mysql = require('mysql2/promise');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

async function checkData() {
  let connection;
  
  try {
    console.log('📊 检查数据库数据...\n');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // 查看用户数据
    console.log('👥 用户数据:');
    const [users] = await connection.execute('SELECT id, name, email, created_at FROM users');
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ID: ${user.id}, 用户: ${user.name}, 邮箱: ${user.email}`);
    });

    console.log('\n📝 笔记数据:');
    const [notes] = await connection.execute('SELECT id, title, content, category, technology, author_id, is_public, created_at FROM notes');
    notes.forEach((note, index) => {
      console.log(`   ${index + 1}. ID: ${note.id}`);
      console.log(`      标题: ${note.title}`);
      console.log(`      分类: ${note.category || '无'}`);
      console.log(`      技术: ${note.technology || '无'}`);
      console.log(`      作者ID: ${note.author_id}`);
      console.log(`      公开: ${note.is_public ? '是' : '否'}`);
      console.log(`      内容预览: ${note.content.substring(0, 50)}...`);
      console.log(`      创建时间: ${note.created_at}`);
      console.log('');
    });

    console.log('🔗 数据关联检查:');
    const [userNotes] = await connection.execute(`
      SELECT u.name as user_name, u.email, COUNT(n.id) as note_count
      FROM users u 
      LEFT JOIN notes n ON u.id = n.author_id 
      GROUP BY u.id
    `);
    
    userNotes.forEach(row => {
      console.log(`   用户 ${row.user_name} (${row.email}) 有 ${row.note_count} 条笔记`);
    });

  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkData(); 