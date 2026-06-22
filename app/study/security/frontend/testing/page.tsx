'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全测试方法',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '安全编码实践', href: '/study/security/frontend/coding' },
  theme: THEMES.security,
}

const blackboxCode = `async function testLoginForm() {
  // 测试用例1：空用户名和密码
  const result1 = await testLogin('', '');
  console.assert(result1.error === '用户名和密码不能为空');

  // 测试用例2：SQL注入
  const result2 = await testLogin("' OR '1'='1", "' OR '1'='1");
  console.assert(result2.error === '用户名或密码错误');

  // 测试用例3：XSS攻击
  const result3 = await testLogin('<script>alert("xss")</script>', 'password');
  console.assert(result3.error === '用户名或密码错误');
}

async function testLogin(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}`

const whiteboxCode = `import { validateInput, sanitizeInput } from '../utils/security';

describe('安全工具测试', () => {
  test('validateInput应该正确验证输入', () => {
    expect(validateInput('test@example.com', 'email')).toBe(true);
    expect(validateInput('invalid-email', 'email')).toBe(false);
    expect(validateInput('13800138000', 'phone')).toBe(true);
    expect(validateInput('12345', 'phone')).toBe(false);
  });

  test('sanitizeInput应该正确净化输入', () => {
    const input = '<script>alert("xss")</script>';
    const expected = '&lt;script&gt;alert("xss")&lt;/script&gt;';
    expect(sanitizeInput(input, 'html')).toBe(expected);
  });
});`

const pentestCode = `async function penetrationTest() {
  // 1. 信息收集
  const targetInfo = await gatherTargetInfo('https://example.com');

  // 2. 漏洞扫描
  const vulnerabilities = await scanVulnerabilities(targetInfo);

  // 3. 漏洞利用
  for (const vuln of vulnerabilities) {
    await exploitVulnerability(vuln);
  }

  // 4. 后渗透测试
  const postExploit = await postExploitation();

  // 5. 生成报告
  return generateReport({ targetInfo, vulnerabilities, postExploit });
}

async function gatherTargetInfo(target) {
  return { domain: target, ip: '192.168.1.1',
    openPorts: [80, 443, 8080], technologies: ['React', 'Node.js'] };
}

async function scanVulnerabilities(targetInfo) {
  return [
    { type: 'XSS', severity: 'High', location: '/search?q=',
      description: '反射型XSS漏洞' },
    { type: 'CSRF', severity: 'Medium', location: '/api/update',
      description: '缺少CSRF令牌' }
  ];
}`

const automationCode = `const zap = require('zaproxy');

async function runZapScan() {
  const client = new zap({
    apiKey: process.env.ZAP_API_KEY,
    proxy: 'http://localhost:8080'
  });

  const scanId = await client.spider.scan({
    url: 'https://example.com',
    maxChildren: 10, recurse: true
  });

  while (true) {
    const progress = await client.spider.status(scanId);
    if (progress >= 100) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return await client.core.alerts();
}`

const eslintConfig = `module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-eval-with-expression': 'error'
  }
};`

const loginTestCode = `import { test, expect } from '@playwright/test';

test.describe('登录功能安全测试', () => {
  test('应该防止暴力破解', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.fill('#username', 'test');
      await page.fill('#password', 'wrong');
      await page.click('#login');
    }
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
});`

const uploadTestCode = `import { test, expect } from '@playwright/test';

test.describe('文件上传安全测试', () => {
  test('应该验证文件类型', async ({ page }) => {
    await page.setInputFiles('#file', {
      name: 'test.php', mimeType: 'application/x-httpd-php',
      buffer: Buffer.from('<?php echo "test"; ?>')
    });
    await page.click('#upload');
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('不支持的文件类型');
  });

  test('应该验证文件大小', async ({ page }) => {
    const largeFile = Buffer.alloc(10 * 1024 * 1024);
    await page.setInputFiles('#file', {
      name: 'large.jpg', mimeType: 'image/jpeg', buffer: largeFile
    });
    await page.click('#upload');
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('文件大小超出限制');
  });
});`

const apiTestCode = `import { test, expect } from '@playwright/test';

test.describe('API安全测试', () => {
  test('应该验证认证', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.status()).toBe(401);

    const response2 = await request.get('/api/users', {
      headers: { 'Authorization': 'Bearer invalid-token' }
    });
    expect(response2.status()).toBe(401);
  });

  test('应该验证授权', async ({ request }) => {
    const response = await request.get('/api/admin/users', {
      headers: { 'Authorization': 'Bearer user-token' }
    });
    expect(response.status()).toBe(403);
  });

  test('应该防止CSRF攻击', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'test', email: 'test@example.com' }
    });
    expect(response.status()).toBe(403);
  });
});`

const SPREADS = [
  {
    label: '测试概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全测试概述</PageTitle>
        <SectionTitle>1. 安全测试定义</SectionTitle>
        <BookParagraph>
          安全测试是指通过模拟各种攻击场景，对应用程序进行安全性评估的过程。它旨在发现潜在的安全漏洞，确保应用程序能够抵御各种安全威胁。
        </BookParagraph>
        <SectionTitle>2. 测试目标</SectionTitle>
        <BookList items={['发现安全漏洞', '验证安全措施', '评估安全风险', '提供改进建议', '确保合规性']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 测试范围</SectionTitle>
        <BookList items={['身份认证测试', '授权测试', '数据加密测试', '输入验证测试', '会话管理测试', '错误处理测试']} />
      </div>
    ),
  },
  {
    label: '测试方法',
    left: (
      <div className="space-y-4">
        <PageTitle>测试方法</PageTitle>
        <SectionTitle>1. 黑盒测试</SectionTitle>
        <BookCode language="javascript" code={blackboxCode} />
        <SectionTitle>2. 白盒测试</SectionTitle>
        <BookCode language="javascript" code={whiteboxCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 渗透测试</SectionTitle>
        <BookCode language="javascript" code={pentestCode} />
      </div>
    ),
  },
  {
    label: '测试工具',
    left: (
      <div className="space-y-4">
        <PageTitle>测试工具</PageTitle>
        <SectionTitle>1. 自动化测试工具</SectionTitle>
        <BookCode language="javascript" code={automationCode} />
        <SectionTitle>2. 代码分析工具</SectionTitle>
        <BookCode language="javascript" code={eslintConfig} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 漏洞扫描工具</SectionTitle>
        <BookList items={[
          'OWASP ZAP：Web应用安全扫描器',
          'Burp Suite：Web应用安全测试工具',
          'Nmap：网络端口扫描',
          'Nikto：Web服务器扫描',
          'SonarQube：代码质量与安全分析',
        ]} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>登录功能测试</PageTitle>
        <BookCode language="javascript" code={loginTestCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>文件上传测试</PageTitle>
        <BookCode language="javascript" code={uploadTestCode} />
        <PageTitle>API安全测试</PageTitle>
        <BookCode language="javascript" code={apiTestCode} />
      </div>
    ),
  },
]

export default function SecurityTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
