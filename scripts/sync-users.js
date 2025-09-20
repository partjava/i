const mysql = require('mysql2/promise');

async function syncUsers() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'partjava'
  });

  try {
    console.log('🔗 连接数据库成功');
    
    // 获取partjava_notes中的用户数据
    const [notesUsers] = await connection.execute(`
      SELECT id, name, email, password, created_at 
      FROM partjava_notes.users 
      ORDER BY id
    `);
    
    console.log('\n📝 partjava_notes数据库中的用户:');
    notesUsers.forEach(user => {
      console.log(`  ID: ${user.id}, 姓名: ${user.name}, 邮箱: ${user.email}`);
    });
    
    // 获取partjava中的用户数据
    const [partjavaUsers] = await connection.execute(`
      SELECT id, name, email 
      FROM users 
      ORDER BY id
    `);
    
    console.log('\n🏆 partjava数据库中的用户:');
    partjavaUsers.forEach(user => {
      console.log(`  ID: ${user.id}, 姓名: ${user.name}, 邮箱: ${user.email}`);
    });
    
    // 同步用户数据到partjava数据库
    console.log('\n🔄 开始同步用户数据...');
    for (const notesUser of notesUsers) {
      // 检查用户是否已存在
      const [existing] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [notesUser.email]
      );
      
      if (existing.length === 0) {
        // 插入新用户，保持相同的ID
        await connection.execute(
          'INSERT INTO users (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)',
          [notesUser.id, notesUser.name, notesUser.email, notesUser.password, notesUser.created_at]
        );
        console.log(`✅ 新增用户: ${notesUser.name} (${notesUser.email})`);
      } else {
        // 更新现有用户的ID以保持一致性
        if (existing[0].id !== notesUser.id) {
          await connection.execute(
            'UPDATE users SET id = ?, name = ?, password = ?, created_at = ? WHERE email = ?',
            [notesUser.id, notesUser.name, notesUser.password, notesUser.created_at, notesUser.email]
          );
          console.log(`🔄 更新用户ID: ${notesUser.name} (${existing[0].id} -> ${notesUser.id})`);
        } else {
          console.log(`ℹ️  用户已存在且ID一致: ${notesUser.name}`);
        }
      }
    }
    
    // 再次查看同步后的用户数据
    const [finalUsers] = await connection.execute(`
      SELECT id, name, email 
      FROM users 
      ORDER BY id
    `);
    
    console.log('\n✅ 同步后的partjava用户数据:');
    finalUsers.forEach(user => {
      console.log(`  ID: ${user.id}, 姓名: ${user.name}, 邮箱: ${user.email}`);
    });
    
  } catch (error) {
    console.error('❌ 同步失败:', error.message);
  } finally {
    await connection.end();
  }
}

syncUsers(); 