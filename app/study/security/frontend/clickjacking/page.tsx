"use client";
import { useState } from "react";
import Link from "next/link";

export default function ClickjackingProtectionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">点击劫持防护</h1>
      
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
            <h3 className="text-xl font-semibold mb-3">点击劫持概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 点击劫持定义</h4>
              <p className="mb-4">
                点击劫持（Clickjacking）是一种视觉欺骗攻击，攻击者将目标网站嵌入到恶意网站中，通过覆盖层诱导用户点击看似无害的元素，实际上点击的是目标网站上的敏感操作。
              </p>

              <h4 className="font-semibold">2. 攻击特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>利用iframe嵌入目标网站</li>
                  <li>使用CSS隐藏目标网站</li>
                  <li>诱导用户点击特定位置</li>
                  <li>用户不知情的情况下执行操作</li>
                  <li>可以绕过某些安全措施</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见攻击场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>社交媒体点赞</li>
                  <li>银行转账</li>
                  <li>关注/订阅操作</li>
                  <li>删除数据</li>
                  <li>修改隐私设置</li>
                </ul>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击场景示例
1. 社交媒体点赞
<div style="position: relative;">
  <iframe src="https://social.com/post/123" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 100px; left: 100px;">
    点击查看图片
  </button>
</div>

2. 银行转账
<div style="position: relative;">
  <iframe src="https://bank.com/transfer" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 200px; left: 200px;">
    领取优惠券
  </button>
</div>

3. 关注操作
<div style="position: relative;">
  <iframe src="https://social.com/follow/456" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 300px; left: 300px;">
    查看详情
  </button>
</div>`}</code>
                </pre>
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
                  <li>创建恶意网页</li>
                  <li>嵌入目标网站iframe</li>
                  <li>使用CSS隐藏目标网站</li>
                  <li>添加诱导性按钮或链接</li>
                  <li>用户点击时触发目标网站操作</li>
                </ol>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 攻击流程示例
1. 创建恶意网页
<!DOCTYPE html>
<html>
<head>
  <title>免费优惠券</title>
  <style>
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .target {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.1;
    }
  </style>
</head>
<body>
  <div style="position: relative;">
    <iframe src="https://bank.com/transfer" class="target"></iframe>
    <div class="overlay">
      <button>点击领取优惠券</button>
    </div>
  </div>
</body>
</html>`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 攻击条件</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>目标网站允许被嵌入iframe</li>
                  <li>目标网站没有X-Frame-Options头</li>
                  <li>目标网站没有Content-Security-Policy头</li>
                  <li>用户已登录目标网站</li>
                  <li>目标网站有敏感操作按钮</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 攻击方式</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 基本iframe嵌入
<iframe src="https://target.com" style="opacity: 0.1;"></iframe>

// 2. 使用z-index控制层级
<div style="position: relative;">
  <iframe src="https://target.com" style="z-index: 1;"></iframe>
  <div style="position: absolute; z-index: 2;">
    <button>点击按钮</button>
  </div>
</div>

// 3. 使用CSS transform
<div style="position: relative;">
  <iframe src="https://target.com" style="transform: scale(0.1);"></iframe>
  <div style="position: absolute;">
    <button>点击按钮</button>
  </div>
</div>

// 4. 使用CSS clip-path
<div style="position: relative;">
  <iframe src="https://target.com" style="clip-path: inset(0 0 0 0);"></iframe>
  <div style="position: absolute;">
    <button>点击按钮</button>
  </div>
</div>`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. X-Frame-Options</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 设置X-Frame-Options头
// 完全禁止嵌入
res.setHeader('X-Frame-Options', 'DENY');

// 只允许同源嵌入
res.setHeader('X-Frame-Options', 'SAMEORIGIN');

// 2. 使用中间件
const frameGuard = (req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
};

app.use(frameGuard);

// 3. 使用Helmet中间件
import helmet from 'helmet';

app.use(helmet.frameguard({
  action: 'sameorigin'
}));`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. Content-Security-Policy</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 设置Content-Security-Policy头
// 完全禁止嵌入
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'none'"
);

// 只允许同源嵌入
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'self'"
);

// 允许特定域名嵌入
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'self' https://trusted.com"
);

// 2. 使用Helmet中间件
import helmet from 'helmet';

app.use(helmet.contentSecurityPolicy({
  directives: {
    frameAncestors: ["'self'"]
  }
}));`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. JavaScript防御</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 检测是否被嵌入
if (window.self !== window.top) {
  // 被嵌入iframe中
  window.top.location = window.self.location;
}

// 2. 使用frame-busting代码
<style>
  html {
    display: none;
  }
</style>
<script>
  if (window.self === window.top) {
    document.documentElement.style.display = 'block';
  } else {
    window.top.location = window.self.location;
  }
</script>

// 3. 使用DOM事件检测
window.addEventListener('click', (e) => {
  if (window.self !== window.top) {
    e.preventDefault();
    window.top.location = window.self.location;
  }
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 其他防御措施</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 使用SameSite Cookie
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
}));

// 2. 使用验证码
app.post('/sensitive-action', (req, res) => {
  const { captcha } = req.body;
  if (!validateCaptcha(captcha)) {
    return res.status(400).json({ error: '验证码错误' });
  }
  // 处理敏感操作
});

// 3. 使用二次确认
app.post('/sensitive-action', (req, res) => {
  const { confirmation } = req.body;
  if (!confirmation) {
    return res.status(400).json({ error: '需要确认' });
  }
  // 处理敏感操作
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
              <h4 className="font-semibold">1. 银行转账防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import helmet from 'helmet';

const app = express();

// 设置安全头
app.use(helmet.frameguard({
  action: 'deny'
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    frameAncestors: ["'none'"]
  }
}));

// 转账接口
app.post('/api/transfer', async (req, res) => {
  // 验证用户身份
  if (!req.session.user) {
    return res.status(401).json({ error: '未登录' });
  }

  // 验证转账金额
  const { amount, to } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: '金额无效' });
  }

  // 验证收款人
  if (!to) {
    return res.status(400).json({ error: '收款人无效' });
  }

  // 处理转账
  try {
    await db.transfers.create({
      amount,
      to,
      userId: req.session.user.id
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '转账失败' });
  }
});

// 2. 前端实现
// 转账页面
<!DOCTYPE html>
<html>
<head>
  <title>转账</title>
  <script>
    // 检测是否被嵌入
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  </script>
</head>
<body>
  <form id="transfer-form">
    <input type="number" name="amount" required>
    <input type="text" name="to" required>
    <button type="submit">转账</button>
  </form>
  <script>
    document.getElementById('transfer-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: formData.get('amount'),
          to: formData.get('to')
        })
      });
      if (response.ok) {
        alert('转账成功');
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 社交媒体防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import helmet from 'helmet';

const app = express();

// 设置安全头
app.use(helmet.frameguard({
  action: 'sameorigin'
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    frameAncestors: ["'self'"]
  }
}));

// 点赞接口
app.post('/api/like/:postId', async (req, res) => {
  // 验证用户身份
  if (!req.session.user) {
    return res.status(401).json({ error: '未登录' });
  }

  // 验证帖子ID
  const { postId } = req.params;
  if (!postId) {
    return res.status(400).json({ error: '帖子ID无效' });
  }

  // 处理点赞
  try {
    await db.likes.create({
      postId,
      userId: req.session.user.id
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '点赞失败' });
  }
});

// 2. 前端实现
// 帖子页面
<!DOCTYPE html>
<html>
<head>
  <title>帖子</title>
  <script>
    // 检测是否被嵌入
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  </script>
</head>
<body>
  <div class="post">
    <h1>帖子标题</h1>
    <p>帖子内容</p>
    <button id="like-button">点赞</button>
  </div>
  <script>
    document.getElementById('like-button').addEventListener('click', async () => {
      const response = await fetch('/api/like/123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('点赞成功');
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 购物网站防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 后端实现
import express from 'express';
import helmet from 'helmet';

const app = express();

// 设置安全头
app.use(helmet.frameguard({
  action: 'sameorigin'
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    frameAncestors: ["'self'"]
  }
}));

// 购买接口
app.post('/api/purchase', async (req, res) => {
  // 验证用户身份
  if (!req.session.user) {
    return res.status(401).json({ error: '未登录' });
  }

  // 验证商品信息
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: '商品信息无效' });
  }

  // 处理购买
  try {
    await db.orders.create({
      productId,
      quantity,
      userId: req.session.user.id
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '购买失败' });
  }
});

// 2. 前端实现
// 商品页面
<!DOCTYPE html>
<html>
<head>
  <title>商品</title>
  <script>
    // 检测是否被嵌入
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  </script>
</head>
<body>
  <div class="product">
    <h1>商品名称</h1>
    <p>商品描述</p>
    <input type="number" id="quantity" value="1" min="1">
    <button id="buy-button">购买</button>
  </div>
  <script>
    document.getElementById('buy-button').addEventListener('click', async () => {
      const quantity = document.getElementById('quantity').value;
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: '123',
          quantity
        })
      });
      if (response.ok) {
        alert('购买成功');
      }
    });
  </script>
</body>
</html>`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/csrf"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← CSRF攻击防护
        </Link>
        <Link
          href="/study/security/frontend/sql"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          SQL注入防护 →
        </Link>
      </div>
    </div>
  );
} 