const mysql = require('mysql2/promise');
require('dotenv').config();

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'ecs-user',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'partjava_notes'
};

// 项目中需要的所有表
const requiredTables = [
  'users',
  'notes',
  'note_likes',
  'note_bookmarks',
  'comments',
  'comment_likes',
  'search_history',
  'learning_stats',
  'study_sessions',
  'user_achievements',
  'challenges',
  'challenge_submissions'
];

async function checkTables() {
  let connection;
  
  try {
    console.log('🔗 连接数据库...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ 数据库连接成功\n');

    // 获取所有表
    const [tables] = await connection.execute('SHOW TABLES');
    const existingTables = tables.map(table => Object.values(table)[0]);

    console.log('📋 数据库表检查报告');
    console.log('='.repeat(50));
    
    // 检查每个必需的表
    const missingTables = [];
    const existingTablesList = [];
    
    for (const tableName of requiredTables) {
      if (existingTables.includes(tableName)) {
        // 获取表的行数
        const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
        const count = rows[0].count;
        console.log(`✅ ${tableName.padEnd(25)} (${count} 行)`);
        existingTablesList.push(tableName);
      } else {
        console.log(`❌ ${tableName.padEnd(25)} (缺失)`);
        missingTables.push(tableName);
      }
    }

    console.log('='.repeat(50));
    console.log(`\n📊 统计:`);
    console.log(`   总计: ${requiredTables.length} 个表`);
    console.log(`   存在: ${existingTablesList.length} 个表`);
    console.log(`   缺失: ${missingTables.length} 个表`);

    if (missingTables.length > 0) {
      console.log(`\n⚠️  缺失的表: ${missingTables.join(', ')}`);
      console.log(`\n💡 运行以下命令创建缺失的表:`);
      console.log(`   npm run db:init`);
      process.exit(1);
    } else {
      console.log(`\n✅ 所有必需的表都已存在！`);
      
      // 检查是否有示例数据
      const [challengeCount] = await connection.execute('SELECT COUNT(*) as count FROM challenges');
      if (challengeCount[0].count === 0) {
        console.log(`\n💡 提示: challenges 表为空，可以运行以下命令添加示例数据:`);
        console.log(`   npm run db:seed`);
      }
    }

  } catch (error) {
    console.error('❌ 检查失败:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔗 数据库连接已关闭');
    }
  }
}

// 运行检查
if (require.main === module) {
  checkTables();
}

module.exports = { checkTables };
