#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 检查基础环境
async function checkBasicEnvironment() {
  log('\n=== 检查基础环境 ===', 'blue');
  
  const checks = [
    {
      name: 'Node.js',
      command: 'node --version',
      required: true
    },
    {
      name: 'npm',
      command: 'npm --version',
      required: true
    },
    {
      name: 'MySQL',
      command: 'mysql --version',
      required: true
    },
    {
      name: 'Git',
      command: 'git --version',
      required: false
    }
  ];

  const results = [];
  
  for (const check of checks) {
    try {
      const { stdout } = await execAsync(check.command, { timeout: 5000 });
      const version = stdout.trim();
      log(`✓ ${check.name}: ${version}`, 'green');
      results.push({ ...check, status: 'ok', version });
    } catch (error) {
      if (check.required) {
        log(`✗ ${check.name}: 未安装或不可用`, 'red');
        results.push({ ...check, status: 'error', error: error.message });
      } else {
        log(`⚠ ${check.name}: 未安装（可选）`, 'yellow');
        results.push({ ...check, status: 'warning', error: error.message });
      }
    }
  }
  
  return results;
}

// 检查编程语言环境
async function checkProgrammingLanguages() {
  log('\n=== 检查编程语言环境 ===', 'blue');
  
  const languages = [
    {
      name: 'Python',
      commands: ['python3 --version', 'python --version'],
      required: false
    },
    {
      name: 'Java',
      commands: ['java -version', 'javac -version'],
      required: false
    },
    {
      name: 'C/C++',
      commands: ['gcc --version', 'g++ --version'],
      required: false
    },
    {
      name: 'Go',
      commands: ['go version'],
      required: false
    },
    {
      name: 'PHP',
      commands: ['php --version'],
      required: false
    }
  ];

  const results = [];
  
  for (const lang of languages) {
    let success = false;
    let version = '';
    
    for (const command of lang.commands) {
      try {
        const { stdout, stderr } = await execAsync(command, { timeout: 5000 });
        version = (stdout || stderr).trim().split('\n')[0];
        success = true;
        break;
      } catch (error) {
        // 继续尝试下一个命令
      }
    }
    
    if (success) {
      log(`✓ ${lang.name}: ${version}`, 'green');
      results.push({ ...lang, status: 'ok', version });
    } else {
      log(`✗ ${lang.name}: 未安装`, 'yellow');
      results.push({ ...lang, status: 'missing' });
    }
  }
  
  return results;
}

// 检查系统资源
async function checkSystemResources() {
  log('\n=== 检查系统资源 ===', 'blue');
  
  const results = {};
  
  try {
    // 检查内存
    if (process.platform === 'linux') {
      const { stdout } = await execAsync('free -h', { timeout: 5000 });
      const memInfo = stdout.split('\n')[1].split(/\s+/);
      const totalMem = memInfo[1];
      const freeMem = memInfo[3];
      log(`✓ 内存: 总计 ${totalMem}, 可用 ${freeMem}`, 'green');
      results.memory = { total: totalMem, free: freeMem };
    }
    
    // 检查磁盘空间
    const { stdout: diskInfo } = await execAsync('df -h .', { timeout: 5000 });
    const diskLine = diskInfo.split('\n')[1].split(/\s+/);
    const totalDisk = diskLine[1];
    const freeDisk = diskLine[3];
    log(`✓ 磁盘空间: 总计 ${totalDisk}, 可用 ${freeDisk}`, 'green');
    results.disk = { total: totalDisk, free: freeDisk };
    
    // 检查CPU信息
    if (process.platform === 'linux') {
      const { stdout: cpuInfo } = await execAsync('nproc', { timeout: 5000 });
      const cpuCores = cpuInfo.trim();
      log(`✓ CPU核心数: ${cpuCores}`, 'green');
      results.cpu = { cores: cpuCores };
    }
    
  } catch (error) {
    log(`⚠ 无法获取系统资源信息: ${error.message}`, 'yellow');
    results.error = error.message;
  }
  
  return results;
}

// 检查网络和端口
async function checkNetworkAndPorts() {
  log('\n=== 检查网络和端口 ===', 'blue');
  
  const ports = [3000, 3306]; // Next.js 和 MySQL 默认端口
  const results = [];
  
  for (const port of ports) {
    try {
      if (process.platform === 'win32') {
        const { stdout } = await execAsync(`netstat -an | findstr :${port}`, { timeout: 5000 });
        if (stdout.trim()) {
          log(`⚠ 端口 ${port} 已被占用`, 'yellow');
          results.push({ port, status: 'occupied', details: stdout.trim() });
        } else {
          log(`✓ 端口 ${port} 可用`, 'green');
          results.push({ port, status: 'available' });
        }
      } else {
        const { stdout } = await execAsync(`netstat -tuln | grep :${port}`, { timeout: 5000 });
        if (stdout.trim()) {
          log(`⚠ 端口 ${port} 已被占用`, 'yellow');
          results.push({ port, status: 'occupied', details: stdout.trim() });
        } else {
          log(`✓ 端口 ${port} 可用`, 'green');
          results.push({ port, status: 'available' });
        }
      }
    } catch (error) {
      log(`✓ 端口 ${port} 可用`, 'green');
      results.push({ port, status: 'available' });
    }
  }
  
  return results;
}

// 检查项目配置
async function checkProjectConfiguration() {
  log('\n=== 检查项目配置 ===', 'blue');
  
  const results = {};
  
  try {
    // 检查 package.json
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageData = await fs.readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageData);
    log(`✓ package.json 存在，项目名称: ${packageJson.name}`, 'green');
    results.package = { name: packageJson.name, version: packageJson.version };
    
    // 检查环境变量文件
    const envPath = path.join(process.cwd(), '.env.local');
    try {
      await fs.access(envPath);
      log(`✓ .env.local 文件存在`, 'green');
      results.env = { status: 'exists' };
    } catch {
      log(`⚠ .env.local 文件不存在，需要创建`, 'yellow');
      results.env = { status: 'missing' };
    }
    
    // 检查 next.config.js
    const nextConfigPath = path.join(process.cwd(), 'next.config.js');
    try {
      await fs.access(nextConfigPath);
      log(`✓ next.config.js 文件存在`, 'green');
      results.nextConfig = { status: 'exists' };
    } catch {
      log(`⚠ next.config.js 文件不存在`, 'yellow');
      results.nextConfig = { status: 'missing' };
    }
    
    // 检查 node_modules
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    try {
      await fs.access(nodeModulesPath);
      log(`✓ node_modules 目录存在`, 'green');
      results.nodeModules = { status: 'exists' };
    } catch {
      log(`⚠ node_modules 目录不存在，需要运行 npm install`, 'yellow');
      results.nodeModules = { status: 'missing' };
    }
    
  } catch (error) {
    log(`✗ 项目配置检查失败: ${error.message}`, 'red');
    results.error = error.message;
  }
  
  return results;
}

// 生成报告
function generateReport(results) {
  log('\n=== 环境检测报告 ===', 'blue');
  
  const report = {
    timestamp: new Date().toISOString(),
    platform: process.platform,
    nodeVersion: process.version,
    ...results
  };
  
  // 统计结果
  const basicIssues = results.basic?.filter(item => item.status === 'error').length || 0;
  const languageCount = results.languages?.filter(item => item.status === 'ok').length || 0;
  const totalLanguages = results.languages?.length || 0;
  
  log(`\n系统平台: ${process.platform}`, 'blue');
  log(`Node.js 版本: ${process.version}`, 'blue');
  log(`基础环境问题: ${basicIssues} 个`, basicIssues > 0 ? 'red' : 'green');
  log(`支持的编程语言: ${languageCount}/${totalLanguages}`, 'blue');
  
  if (basicIssues > 0) {
    log('\n⚠ 发现基础环境问题，请先解决这些问题再进行部署。', 'yellow');
  } else {
    log('\n✓ 基础环境检查通过，可以进行部署。', 'green');
  }
  
  if (languageCount === 0) {
    log('⚠ 没有检测到编程语言环境，代码执行功能将不可用。', 'yellow');
  } else {
    log(`✓ 检测到 ${languageCount} 种编程语言环境，代码执行功能部分可用。`, 'green');
  }
  
  return report;
}

// 主函数
async function main() {
  log('开始检查服务器环境...', 'blue');
  
  try {
    const results = {
      basic: await checkBasicEnvironment(),
      languages: await checkProgrammingLanguages(),
      system: await checkSystemResources(),
      network: await checkNetworkAndPorts(),
      project: await checkProjectConfiguration()
    };
    
    const report = generateReport(results);
    
    // 保存报告
    const reportPath = path.join(process.cwd(), 'environment-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    log(`\n报告已保存至: ${reportPath}`, 'green');
    
    // 提供建议
    log('\n=== 部署建议 ===', 'blue');
    
    if (results.basic.some(item => item.status === 'error')) {
      log('1. 请先安装缺失的基础环境', 'yellow');
    }
    
    if (results.project.nodeModules?.status === 'missing') {
      log('2. 运行 npm install 安装依赖', 'yellow');
    }
    
    if (results.project.env?.status === 'missing') {
      log('3. 创建 .env.local 文件并配置环境变量', 'yellow');
    }
    
    if (results.languages.filter(item => item.status === 'ok').length < results.languages.length) {
      log('4. 根据需要安装编程语言环境（可选）', 'yellow');
    }
    
    log('5. 参考 docs/DEPLOYMENT_GUIDE.md 进行完整部署', 'blue');
    
  } catch (error) {
    log(`环境检查失败: ${error.message}`, 'red');
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  checkBasicEnvironment,
  checkProgrammingLanguages,
  checkSystemResources,
  checkNetworkAndPorts,
  checkProjectConfiguration
}; 