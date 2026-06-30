'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '点击劫持防护',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: 'CSRF攻击防护', href: '/study/security/frontend/csrf' },
  nextChapter: { label: 'SQL注入防护', href: '/study/security/frontend/sql' },
  theme: THEMES.security,
}

const sceneCode = `// 攻击场景示例
1. 社交媒体点赞
<div style="position: relative;">
  <iframe src="https://social.com/post/123" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 100px; left: 100px;">点击查看图片</button>
</div>

2. 银行转账
<div style="position: relative;">
  <iframe src="https://bank.com/transfer" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 200px; left: 200px;">领取优惠券</button>
</div>

3. 关注操作
<div style="position: relative;">
  <iframe src="https://social.com/follow/456" style="opacity: 0.1;"></iframe>
  <button style="position: absolute; top: 300px; left: 300px;">查看详情</button>
</div>`

const attackFlowCode = `// 攻击流程示例
1. 创建恶意网页
<html>
<head>
  <title>免费优惠券</title>
  <style>
    .overlay {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; z-index: 1;
    }
    .target {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; z-index: 0;
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
</html>`

const attackMethodsCode = `// 1. 基本iframe嵌入
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
</div>`

const xFrameCode = `// 1. 设置X-Frame-Options头
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
app.use(helmet.frameguard({ action: 'sameorigin' }));`

const cspFrameCode = `// 1. 完全禁止嵌入
res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");

// 2. 只允许同源嵌入
res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");

// 3. 允许特定域名嵌入
res.setHeader(
  'Content-Security-Policy',
  "frame-ancestors 'self' https://trusted.com"
);

// 4. 使用Helmet中间件
import helmet from 'helmet';
app.use(helmet.contentSecurityPolicy({
  directives: { frameAncestors: ["'self'"] }
}));`

const jsDefenseCode = `// 1. 检测是否被嵌入
if (window.self !== window.top) {
  window.top.location = window.self.location;
}

// 2. 使用frame-busting代码
<style>html { display: none; }</style>
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
});`

const otherDefenseCode = `// 1. 使用SameSite Cookie
app.use(session({
  secret: 'your-secret-key',
  cookie: { httpOnly: true, secure: true, sameSite: 'strict' }
}));

// 2. 使用验证码
app.post('/sensitive-action', (req, res) => {
  const { captcha } = req.body;
  if (!validateCaptcha(captcha)) {
    return res.status(400).json({ error: '验证码错误' });
  }
});

// 3. 使用二次确认
app.post('/sensitive-action', (req, res) => {
  const { confirmation } = req.body;
  if (!confirmation) {
    return res.status(400).json({ error: '需要确认' });
  }
});`

const bankCaseCode = `// 后端实现
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.contentSecurityPolicy({
  directives: { frameAncestors: ["'none'"] }
}));

app.post('/api/transfer', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: '未登录' });
  }
  const { amount, to } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: '金额无效' });
  if (!to) return res.status(400).json({ error: '收款人无效' });

  await db.transfers.create({ amount, to, userId: req.session.user.id });
  res.json({ success: true });
});`

const socialCaseCode = `// 后端实现
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.contentSecurityPolicy({
  directives: { frameAncestors: ["'self'"] }
}));

app.post('/api/like/:postId', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: '未登录' });

  const { postId } = req.params;
  if (!postId) return res.status(400).json({ error: '帖子ID无效' });

  await db.likes.create({ postId, userId: req.session.user.id });
  res.json({ success: true });
});`

const SPREADS = [
  {
    label: '攻击概述',
    left: (
      <div className="space-y-4">
        <PageTitle>点击劫持概述</PageTitle>
        <SectionTitle>1. 点击劫持定义</SectionTitle>
        <BookParagraph>
          点击劫持（Clickjacking）是一种视觉欺骗攻击，攻击者将目标网站嵌入到恶意网站中，通过覆盖层诱导用户点击看似无害的元素，实际上点击的是目标网站上的敏感操作。
        </BookParagraph>
        <SectionTitle>2. 攻击特点</SectionTitle>
        <BookList items={[
          '利用iframe嵌入目标网站',
          '使用CSS隐藏目标网站',
          '诱导用户点击特定位置',
          '用户不知情的情况下执行操作',
          '可以绕过某些安全措施',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见攻击场景</SectionTitle>
        <BookList items={['社交媒体点赞', '银行转账', '关注/订阅操作', '删除数据', '修改隐私设置']} />
        <BookCode language="html" code={sceneCode} />
      </div>
    ),
  },
  {
    label: '攻击原理',
    left: (
      <div className="space-y-4">
        <PageTitle>攻击原理</PageTitle>
        <SectionTitle>1. 基本攻击流程</SectionTitle>
        <BookList items={[
          '创建恶意网页',
          '嵌入目标网站iframe',
          '使用CSS隐藏目标网站',
          '添加诱导性按钮或链接',
          '用户点击时触发目标网站操作',
        ]} />
        <BookCode language="html" code={attackFlowCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 攻击条件</SectionTitle>
        <BookList items={[
          '目标网站允许被嵌入iframe',
          '目标网站没有X-Frame-Options头',
          '目标网站没有Content-Security-Policy头',
          '用户已登录目标网站',
          '目标网站有敏感操作按钮',
        ]} />
        <SectionTitle>3. 攻击方式</SectionTitle>
        <BookCode language="html" code={attackMethodsCode} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. X-Frame-Options</SectionTitle>
        <BookCode language="javascript" code={xFrameCode} />
        <SectionTitle>2. Content-Security-Policy</SectionTitle>
        <BookCode language="javascript" code={cspFrameCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. JavaScript防御</SectionTitle>
        <BookCode language="javascript" code={jsDefenseCode} />
        <SectionTitle>4. 其他防御措施</SectionTitle>
        <BookCode language="javascript" code={otherDefenseCode} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>银行转账防护</PageTitle>
        <BookCode language="javascript" code={bankCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>社交媒体防护</PageTitle>
        <BookCode language="javascript" code={socialCaseCode} />
        <BookAlert type="info" message="此外购物网站防护同样适用：设置frameguard({ action: 'sameorigin' })以及frame-ancestors限制，并配合前端frame-busting代码双重保护。" />
      </div>
    ),
  },
]

export default function ClickjackingProtectionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
