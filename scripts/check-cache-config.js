// 检查缓存配置是否正确
const fs = require('fs');
const path = require('path');

console.log('🔍 检查缓存配置...\n');

let hasIssues = false;

// 1. 检查 next.config.js
console.log('1️⃣ 检查 Next.js 配置...');
try {
  const configPath = path.join(process.cwd(), 'next.config.js');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('generateBuildId')) {
    console.log('   ✅ generateBuildId 已配置');
  } else {
    console.log('   ❌ 缺少 generateBuildId 配置');
    hasIssues = true;
  }
  
  if (configContent.includes('isDev') || configContent.includes('NODE_ENV')) {
    console.log('   ✅ 环境区分缓存策略已配置');
  } else {
    console.log('   ⚠️  建议添加环境区分的缓存策略');
  }
  
} catch (error) {
  console.log('   ❌ 无法读取 next.config.js');
  hasIssues = true;
}

// 2. 检查 Service Worker
console.log('\n2️⃣ 检查 Service Worker...');
try {
  const swPath = path.join(process.cwd(), 'public', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  
  // 提取版本号
  const versionMatch = swContent.match(/CACHE_VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (versionMatch) {
    console.log(`   ✅ Service Worker 版本: ${versionMatch[1]}`);
  } else {
    console.log('   ❌ 未找到 CACHE_VERSION');
    hasIssues = true;
  }
  
  if (swContent.includes('skipWaiting')) {
    console.log('   ✅ skipWaiting 已配置');
  } else {
    console.log('   ⚠️  建议添加 skipWaiting');
  }
  
  if (swContent.includes('clients.claim')) {
    console.log('   ✅ clients.claim 已配置');
  } else {
    console.log('   ⚠️  建议添加 clients.claim');
  }
  
} catch (error) {
  console.log('   ⚠️  未找到 Service Worker (可选)');
}

// 3. 检查环境变量
console.log('\n3️⃣ 检查环境配置...');
console.log(`   当前环境: ${process.env.NODE_ENV || 'development'}`);

if (process.env.NODE_ENV === 'production') {
  console.log('   ✅ 生产环境 - 将使用优化的缓存策略');
} else {
  console.log('   ✅ 开发环境 - 将禁用缓存');
}

// 4. 检查 .next 目录
console.log('\n4️⃣ 检查构建状态...');
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  const buildIdPath = path.join(nextDir, 'BUILD_ID');
  if (fs.existsSync(buildIdPath)) {
    const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
    console.log(`   ✅ 当前 Build ID: ${buildId}`);
    
    if (buildId.startsWith('build-')) {
      console.log('   ✅ Build ID 格式正确（基于时间戳）');
    } else {
      console.log('   ⚠️  Build ID 不是基于时间戳');
    }
  } else {
    console.log('   ⚠️  未找到 BUILD_ID 文件');
  }
} else {
  console.log('   ⚠️  项目未构建，运行 npm run build');
}

// 总结
console.log('\n' + '='.repeat(50));
if (hasIssues) {
  console.log('❌ 发现配置问题，请查看上面的提示');
  console.log('\n💡 修复建议:');
  console.log('   1. 确保 next.config.js 包含 generateBuildId');
  console.log('   2. 确保 Service Worker 有版本号系统');
  console.log('   3. 运行 npm run build 重新构建');
  process.exit(1);
} else {
  console.log('✅ 缓存配置正确！');
  console.log('\n📝 使用说明:');
  console.log('   开发: npm run dev (不缓存)');
  console.log('   构建: npm run build (生成新 Build ID)');
  console.log('   部署: npm start (用户刷新即可看到更新)');
  process.exit(0);
}
