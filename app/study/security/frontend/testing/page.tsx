"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityTestingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全测试方法</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          测试概述
        </button>
        <button
          onClick={() => setActiveTab("methods")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "methods"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          测试方法
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          测试工具
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "cases"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实战案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全测试概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全测试定义</h4>
              <p className="mb-4">
                安全测试是指通过模拟各种攻击场景，对应用程序进行安全性评估的过程。它旨在发现潜在的安全漏洞，确保应用程序能够抵御各种安全威胁。
              </p>

              <h4 className="font-semibold">2. 测试目标</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>发现安全漏洞</li>
                  <li>验证安全措施</li>
                  <li>评估安全风险</li>
                  <li>提供改进建议</li>
                  <li>确保合规性</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 测试范围</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>身份认证测试</li>
                  <li>授权测试</li>
                  <li>数据加密测试</li>
                  <li>输入验证测试</li>
                  <li>会话管理测试</li>
                  <li>错误处理测试</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "methods" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">测试方法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 黑盒测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 黑盒测试示例
async function testLoginForm() {
  // 测试用例1：空用户名和密码
  const result1 = await testLogin('', '');
  console.assert(result1.error === '用户名和密码不能为空');
  
  // 测试用例2：SQL注入
  const result2 = await testLogin(
    "' OR '1'='1",
    "' OR '1'='1"
  );
  console.assert(result2.error === '用户名或密码错误');
  
  // 测试用例3：XSS攻击
  const result3 = await testLogin(
    '<script>alert("xss")</script>',
    'password'
  );
  console.assert(result3.error === '用户名或密码错误');
}

async function testLogin(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 白盒测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 白盒测试示例
import { validateInput, sanitizeInput } from '../utils/security';

describe('安全工具测试', () => {
  // 测试输入验证
  test('validateInput应该正确验证输入', () => {
    // 测试邮箱验证
    expect(validateInput('test@example.com', 'email')).toBe(true);
    expect(validateInput('invalid-email', 'email')).toBe(false);
    
    // 测试手机号验证
    expect(validateInput('13800138000', 'phone')).toBe(true);
    expect(validateInput('12345', 'phone')).toBe(false);
  });
  
  // 测试输入净化
  test('sanitizeInput应该正确净化输入', () => {
    // 测试HTML转义
    const input = '<script>alert("xss")</script>';
    const expected = '&lt;script&gt;alert("xss")&lt;/script&gt;';
    expect(sanitizeInput(input, 'html')).toBe(expected);
    
    // 测试SQL注入防护
    const sqlInput = "' OR '1'='1";
    const sqlExpected = "\\' OR \\'1\\'=\\'1";
    expect(sanitizeInput(sqlInput, 'sql')).toBe(sqlExpected);
  });
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 渗透测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 渗透测试示例
async function penetrationTest() {
  // 1. 信息收集
  const targetInfo = await gatherTargetInfo('https://example.com');
  console.log('目标信息:', targetInfo);
  
  // 2. 漏洞扫描
  const vulnerabilities = await scanVulnerabilities(targetInfo);
  console.log('发现的漏洞:', vulnerabilities);
  
  // 3. 漏洞利用
  for (const vuln of vulnerabilities) {
    const result = await exploitVulnerability(vuln);
    console.log('漏洞利用结果:', result);
  }
  
  // 4. 后渗透测试
  const postExploit = await postExploitation();
  console.log('后渗透测试结果:', postExploit);
  
  // 5. 生成报告
  const report = generateReport({
    targetInfo,
    vulnerabilities,
    postExploit
  });
  console.log('测试报告:', report);
}

// 模拟信息收集
async function gatherTargetInfo(target) {
  return {
    domain: target,
    ip: '192.168.1.1',
    openPorts: [80, 443, 8080],
    technologies: ['React', 'Node.js', 'MongoDB']
  };
}

// 模拟漏洞扫描
async function scanVulnerabilities(targetInfo) {
  return [
    {
      type: 'XSS',
      severity: 'High',
      location: '/search?q=',
      description: '反射型XSS漏洞'
    },
    {
      type: 'CSRF',
      severity: 'Medium',
      location: '/api/update',
      description: '缺少CSRF令牌'
    }
  ];
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">测试工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 自动化测试工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用OWASP ZAP进行自动化测试
const zap = require('zaproxy');

async function runZapScan() {
  // 创建ZAP客户端
  const client = new zap({
    apiKey: process.env.ZAP_API_KEY,
    proxy: 'http://localhost:8080'
  });
  
  // 启动扫描
  const scanId = await client.spider.scan({
    url: 'https://example.com',
    maxChildren: 10,
    recurse: true
  });
  
  // 等待扫描完成
  while (true) {
    const progress = await client.spider.status(scanId);
    if (progress >= 100) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 获取扫描结果
  const alerts = await client.core.alerts();
  return alerts;
}

// 使用Selenium进行UI测试
const { Builder, By, until } = require('selenium-webdriver');

async function runSeleniumTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // 访问目标网站
    await driver.get('https://example.com');
    
    // 测试登录功能
    await driver.findElement(By.id('username')).sendKeys('test');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.id('login')).click();
    
    // 验证登录结果
    await driver.wait(until.elementLocated(By.id('welcome')), 5000);
    const welcomeText = await driver.findElement(By.id('welcome')).getText();
    console.assert(welcomeText.includes('Welcome'));
    
  } finally {
    await driver.quit();
  }
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 代码分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用ESLint进行代码分析
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error'
  }
};

// 使用SonarQube进行代码质量分析
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.sources': 'src',
    'sonar.tests': 'tests',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.testExecutionReportPaths': 'test-report.xml'
  }
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 漏洞扫描工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Nmap进行端口扫描
const nmap = require('node-nmap');

const scanner = new nmap.QuickScan('192.168.1.1');

scanner.on('complete', (data) => {
  console.log('扫描结果:', data);
});

scanner.on('error', (error) => {
  console.error('扫描错误:', error);
});

scanner.startScan();

// 使用Nikto进行Web服务器扫描
const { exec } = require('child_process');

function runNiktoScan(target) {
  return new Promise((resolve, reject) => {
    exec(\`nikto -h \${target}\`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

// 使用Burp Suite进行API测试
const burp = require('burp-suite-api');

async function runBurpScan() {
  const client = new burp({
    apiKey: process.env.BURP_API_KEY,
    proxy: 'http://localhost:8080'
  });
  
  // 配置扫描
  const config = {
    target: 'https://api.example.com',
    scope: {
      include: ['/api/.*'],
      exclude: ['/api/public/.*']
    }
  };
  
  // 启动扫描
  const scanId = await client.scan.start(config);
  
  // 获取扫描结果
  const results = await client.scan.results(scanId);
  return results;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 登录功能测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 登录功能安全测试
import { test, expect } from '@playwright/test';

test.describe('登录功能安全测试', () => {
  test('应该防止暴力破解', async ({ page }) => {
    // 尝试多次错误登录
    for (let i = 0; i < 5; i++) {
      await page.fill('#username', 'test');
      await page.fill('#password', 'wrong');
      await page.click('#login');
    }
    
    // 验证是否被锁定
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('账户已被锁定');
  });
  
  test('应该防止SQL注入', async ({ page }) => {
    await page.fill('#username', "' OR '1'='1");
    await page.fill('#password', "' OR '1'='1");
    await page.click('#login');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('用户名或密码错误');
  });
  
  test('应该防止XSS攻击', async ({ page }) => {
    await page.fill('#username', '<script>alert("xss")</script>');
    await page.fill('#password', 'password');
    await page.click('#login');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('用户名或密码错误');
  });
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 文件上传测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 文件上传安全测试
import { test, expect } from '@playwright/test';

test.describe('文件上传安全测试', () => {
  test('应该验证文件类型', async ({ page }) => {
    // 上传PHP文件
    await page.setInputFiles('#file', {
      name: 'test.php',
      mimeType: 'application/x-httpd-php',
      buffer: Buffer.from('<?php echo "test"; ?>')
    });
    
    await page.click('#upload');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('不支持的文件类型');
  });
  
  test('应该验证文件大小', async ({ page }) => {
    // 上传大文件
    const largeFile = Buffer.alloc(10 * 1024 * 1024); // 10MB
    await page.setInputFiles('#file', {
      name: 'large.jpg',
      mimeType: 'image/jpeg',
      buffer: largeFile
    });
    
    await page.click('#upload');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('文件大小超出限制');
  });
  
  test('应该验证文件内容', async ({ page }) => {
    // 上传包含恶意代码的图片
    const maliciousImage = Buffer.from(
      'GIF89a<?php system($_GET["cmd"]); ?>'
    );
    await page.setInputFiles('#file', {
      name: 'test.gif',
      mimeType: 'image/gif',
      buffer: maliciousImage
    });
    
    await page.click('#upload');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('文件内容不合法');
  });
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. API安全测试</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// API安全测试
import { test, expect } from '@playwright/test';

test.describe('API安全测试', () => {
  test('应该验证认证', async ({ request }) => {
    // 未认证请求
    const response = await request.get('/api/users');
    expect(response.status()).toBe(401);
    
    // 无效token
    const response2 = await request.get('/api/users', {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });
    expect(response2.status()).toBe(401);
  });
  
  test('应该验证授权', async ({ request }) => {
    // 普通用户访问管理员接口
    const response = await request.get('/api/admin/users', {
      headers: {
        'Authorization': 'Bearer user-token'
      }
    });
    expect(response.status()).toBe(403);
  });
  
  test('应该防止CSRF攻击', async ({ request }) => {
    // 缺少CSRF令牌
    const response = await request.post('/api/users', {
      data: {
        name: 'test',
        email: 'test@example.com'
      }
    });
    expect(response.status()).toBe(403);
    
    // 无效CSRF令牌
    const response2 = await request.post('/api/users', {
      headers: {
        'X-CSRF-Token': 'invalid-token'
      },
      data: {
        name: 'test',
        email: 'test@example.com'
      }
    });
    expect(response2.status()).toBe(403);
  });
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/coding"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全编码实践
        </Link>
        <Link
          href="/study/security/frontend/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          前端安全基础 →
        </Link>
      </div>
    </div>
  );
} 