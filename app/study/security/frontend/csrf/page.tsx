"use client";
import { useState } from "react";
import Link from "next/link";

export default function CSRFProtectionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CSRF攻击防护</h1>
      
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
          onClick={() => setActiveTab("principle")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "principle"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          攻击原理
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
            <h3 className="text-xl font-semibold mb-3">CSRF攻击概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. CSRF攻击定义</h4>
              <p className="mb-4">
                CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种常见的Web安全漏洞，攻击者诱导用户访问恶意网站，在用户不知情的情况下，以用户身份向目标网站发送请求，执行未授权的操作。
              </p>

              <h4 className="font-semibold">2. 攻击特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>攻击者无法直接获取用户数据</li>
                  <li>攻击者利用用户的身份和权限</li>
                  <li>攻击者诱导用户访问恶意网站</li>
                  <li>攻击者利用用户的Cookie和会话信息</li>
                  <li>攻击者可以执行用户权限范围内的操作</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见攻击场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>银行转账</li>
                  <li>修改用户资料</li>
                  <li>发送邮件</li>
                  <li>购买商品</li>
                  <li>删除数据</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "principle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">攻击原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本攻击流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ol className="list-decimal pl-6 mb-4">
                  <li>用户登录目标网站</li>
                  <li>目标网站设置Cookie</li>
                  <li>用户访问恶意网站</li>
                  <li>恶意网站发送请求到目标网站</li>
                  <li>浏览器自动携带Cookie</li>
                  <li>目标网站执行请求</li>
                </ol>
              </div>

              <h4 className="font-semibold">2. 攻击条件</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>用户已登录目标网站</li>
                  <li>目标网站使用Cookie进行身份验证</li>
                  <li>目标网站没有CSRF防护措施</li>
                  <li>用户访问恶意网站</li>
                  <li>恶意网站可以发送请求到目标网站</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Token验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 生成CSRF Token
const csrfToken = crypto.randomBytes(32).toString('hex');
session.csrfToken = csrfToken;

// 2. 在表单中添加Token
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value={csrfToken} />
  <input type="text" name="amount" />
  <input type="text" name="to" />
  <button type="submit">转账</button>
</form>

// 3. 验证Token
app.post('/transfer', (req, res) => {
  const { _csrf, amount, to } = req.body;
  if (_csrf !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // 处理转账请求
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. SameSite Cookie</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 设置SameSite Cookie
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
  }
}));`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 验证Referer</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 验证Referer
app.use((req, res, next) => {
  const referer = req.headers.referer;
  if (!referer || !referer.startsWith('https://your-domain.com')) {
    return res.status(403).json({ error: 'Invalid referer' });
  }
  next();
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 转账功能防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 前端实现
function TransferForm() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // 获取CSRF Token
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ amount, to })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="_csrf"
        value={csrfToken}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button type="submit">转账</button>
    </form>
  );
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 用户资料修改防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 后端实现
const express = require('express');
const csrf = require('csurf');
const app = express();

// 配置CSRF保护
app.use(csrf({ cookie: true }));

// 获取CSRF Token
app.get('/api/csrf-token', (req, res) => {
  res.json({ token: req.csrfToken() });
});

// 更新用户资料
app.post('/api/profile', (req, res) => {
  const { name, email } = req.body;
  // 验证CSRF Token
  if (!req.csrfToken()) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // 更新用户资料
  // ...
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
          href="/study/security/frontend/xss"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← XSS攻击防护
        </Link>
        <Link
          href="/study/security/frontend/clickjacking"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          点击劫持防护 →
        </Link>
      </div>
    </div>
  );
} 