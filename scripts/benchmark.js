// 性能测试脚本
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'partjava_notes',
};

async function measureQuery(connection, name, sql, params = []) {
  const start = Date.now();
  const [rows] = await connection.query(sql, params);
  const duration = Date.now() - start;
  
  return {
    name,
    duration,
    rows: rows.length
  };
}

async function runBenchmark() {
  let connection;
  
  try {
    console.log('🔗 连接数据库...\n');
    connection = await mysql.createConnection(dbConfig);

    const tests = [
      {
        name: '查询所有笔记',
        sql: 'SELECT * FROM notes LIMIT 100'
      },
      {
        name: '按作者查询笔记',
        sql: 'SELECT * FROM notes WHERE author_id = 1 ORDER BY created_at DESC LIMIT 20'
      },
      {
        name: '按分类查询公开笔记',
        sql: 'SELECT * FROM notes WHERE category = "Java" AND is_public = 1 ORDER BY created_at DESC LIMIT 20'
      },
      {
        name: '查询笔记点赞数',
        sql: 'SELECT note_id, COUNT(*) as likes FROM note_likes GROUP BY note_id LIMIT 20'
      },
      {
        name: '查询用户收藏',
        sql: 'SELECT * FROM note_bookmarks WHERE user_id = 1 ORDER BY created_at DESC LIMIT 20'
      },
      {
        name: '查询笔记评论',
        sql: 'SELECT * FROM comments WHERE note_id = 1 ORDER BY created_at DESC'
      },
      {
        name: '查询学习统计',
        sql: 'SELECT * FROM learning_stats WHERE user_id = 1'
      },
    ];

    console.log('⏱️  开始性能测试...\n');
    console.log('┌─────────────────────────────┬──────────┬────────┐');
    console.log('│ 测试项目                    │ 耗时(ms) │ 行数   │');
    console.log('├─────────────────────────────┼──────────┼────────┤');

    let totalTime = 0;
    const results = [];

    for (const test of tests) {
      const result = await measureQuery(connection, test.name, test.sql);
      results.push(result);
      totalTime += result.duration;
      
      const name = test.name.padEnd(27);
      const duration = result.duration.toString().padStart(8);
      const rows = result.rows.toString().padStart(6);
      
      console.log(`│ ${name} │ ${duration} │ ${rows} │`);
    }

    console.log('└─────────────────────────────┴──────────┴────────┘');
    console.log(`\n总耗时: ${totalTime}ms`);
    console.log(`平均耗时: ${Math.round(totalTime / tests.length)}ms`);

    // 性能评估
    console.log('\n📊 性能评估:');
    const avgTime = totalTime / tests.length;
    
    if (avgTime < 50) {
      console.log('🎉 优秀！查询速度非常快');
    } else if (avgTime < 100) {
      console.log('✅ 良好！查询速度正常');
    } else if (avgTime < 200) {
      console.log('⚠️  一般，建议优化数据库索引');
    } else {
      console.log('❌ 较慢，强烈建议优化！');
      console.log('\n💡 优化建议:');
      console.log('1. 运行: node scripts/add-indexes.js');
      console.log('2. 添加缓存层');
      console.log('3. 使用分页查询');
    }

    // 慢查询警告
    const slowQueries = results.filter(r => r.duration > 100);
    if (slowQueries.length > 0) {
      console.log('\n⚠️  慢查询警告:');
      slowQueries.forEach(q => {
        console.log(`   - ${q.name}: ${q.duration}ms`);
      });
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
runBenchmark();
