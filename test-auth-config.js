// 测试NextAuth配置
const { authOptions } = require('./lib/auth');

console.log('🔍 检查NextAuth配置...');
console.log('📋 配置信息:');
console.log('- Secret:', authOptions.secret ? '✅ 已设置' : '❌ 未设置');
console.log('- Providers:', authOptions.providers?.length || 0);
console.log('- Pages:', authOptions.pages);
console.log('- Session Strategy:', authOptions.session?.strategy);

// 测试数据库连接
const { executeQuery } = require('./lib/database');

async function testAuth() {
  try {
    console.log('\n🔗 测试数据库连接...');
    const users = await executeQuery('SELECT COUNT(*) as count FROM users');
    console.log(`✅ 数据库连接正常，用户数量: ${users[0].count}`);
    
    // 测试用户查询
    const testUser = await executeQuery('SELECT * FROM users WHERE email = ?', ['admin@partjava.com']);
    if (testUser.length > 0) {
      console.log(`✅ 测试用户存在: ${testUser[0].name}`);
    } else {
      console.log('❌ 测试用户不存在');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testAuth();
