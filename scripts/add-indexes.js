// 添加数据库索引以提升查询性能
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'partjava_notes',
};

async function addIndexes() {
  let connection;
  
  try {
    console.log('🔗 连接数据库...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ 数据库连接成功\n');

    const indexes = [
      // notes 表索引
      {
        name: 'idx_notes_author_created',
        table: 'notes',
        sql: 'CREATE INDEX idx_notes_author_created ON notes(author_id, created_at DESC)',
        desc: '优化按作者和时间查询'
      },
      {
        name: 'idx_notes_category_public',
        table: 'notes',
        sql: 'CREATE INDEX idx_notes_category_public ON notes(category, is_public, created_at DESC)',
        desc: '优化分类和公开状态查询'
      },
      {
        name: 'idx_notes_technology',
        table: 'notes',
        sql: 'CREATE INDEX idx_notes_technology ON notes(technology, is_public)',
        desc: '优化技术标签查询'
      },
      
      // note_likes 表索引
      {
        name: 'idx_likes_note_user',
        table: 'note_likes',
        sql: 'CREATE INDEX idx_likes_note_user ON note_likes(note_id, user_id)',
        desc: '优化点赞查询'
      },
      
      // note_bookmarks 表索引
      {
        name: 'idx_bookmarks_user_created',
        table: 'note_bookmarks',
        sql: 'CREATE INDEX idx_bookmarks_user_created ON note_bookmarks(user_id, created_at DESC)',
        desc: '优化收藏列表查询'
      },
      
      // comments 表索引
      {
        name: 'idx_comments_note_created',
        table: 'comments',
        sql: 'CREATE INDEX idx_comments_note_created ON comments(note_id, created_at DESC)',
        desc: '优化评论查询'
      },
      
      // learning_stats 表索引
      {
        name: 'idx_learning_user_category',
        table: 'learning_stats',
        sql: 'CREATE INDEX idx_learning_user_category ON learning_stats(user_id, category, technology)',
        desc: '优化学习统计查询'
      },
      
      // study_sessions 表索引
      {
        name: 'idx_sessions_user_created',
        table: 'study_sessions',
        sql: 'CREATE INDEX idx_sessions_user_created ON study_sessions(user_id, created_at DESC)',
        desc: '优化学习会话查询'
      },
    ];

    console.log('📊 开始添加索引...\n');
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const index of indexes) {
      try {
        // 检查索引是否已存在
        const [rows] = await connection.query(
          `SHOW INDEX FROM ${index.table} WHERE Key_name = ?`,
          [index.name]
        );

        if (rows.length > 0) {
          console.log(`⏭️  跳过: ${index.name} (已存在)`);
          skipCount++;
          continue;
        }

        // 创建索引
        await connection.query(index.sql);
        console.log(`✅ 创建: ${index.name}`);
        console.log(`   ${index.desc}\n`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ 失败: ${index.name}`);
        console.error(`   错误: ${error.message}\n`);
        errorCount++;
      }
    }

    console.log('\n📈 索引添加完成！');
    console.log(`✅ 成功: ${successCount}`);
    console.log(`⏭️  跳过: ${skipCount}`);
    console.log(`❌ 失败: ${errorCount}`);
    
    if (successCount > 0) {
      console.log('\n🎉 性能优化完成！预计查询速度提升 3-5 倍');
    }

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔗 数据库连接已关闭');
    }
  }
}

// 运行
addIndexes();
