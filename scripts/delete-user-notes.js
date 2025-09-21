// 删除指定用户的所有笔记
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function deleteUserNotes(email) {
  // 创建数据库连接
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  try {
    console.log(`正在查找用户: ${email}`);
    
    // 查找用户ID
    const [users] = await connection.execute(
      'SELECT id, name FROM users WHERE email = ?',
      [email]
    );
    
    if (!users || users.length === 0) {
      console.log(`未找到用户: ${email}`);
      return;
    }
    
    const user = users[0];
    console.log(`找到用户: ${user.name} (ID: ${user.id})`);
    
    // 查询用户笔记数量
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM notes WHERE author_id = ?',
      [user.id]
    );
    
    const noteCount = countResult[0].count;
    console.log(`用户拥有 ${noteCount} 篇笔记`);
    
    if (noteCount > 0) {
      // 删除用户的所有笔记
      const [result] = await connection.execute(
        'DELETE FROM notes WHERE author_id = ?',
        [user.id]
      );
      
      console.log(`成功删除 ${result.affectedRows} 篇笔记`);
    } else {
      console.log('用户没有笔记，无需删除');
    }
    
  } catch (error) {
    console.error('删除笔记时出错:', error);
  } finally {
    await connection.end();
  }
}

// 执行脚本，传入用户邮箱
const userEmail = process.argv[2] || 'zoos@qq.com';
deleteUserNotes(userEmail)
  .then(() => console.log('操作完成'))
  .catch(err => console.error('操作失败:', err));
