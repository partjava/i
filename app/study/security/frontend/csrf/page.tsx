'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: 'CSRF攻击防护',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: 'XSS攻击防护', href: '/study/security/frontend/xss' },
  nextChapter: { label: '点击劫持防护', href: '/study/security/frontend/clickjacking' },
  theme: THEMES.security,
}

const tokenCode = `// 1. 生成CSRF Token
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
});`

const sameSiteCode = `// 设置SameSite Cookie
app.use(session({
  secret: 'your-secret-key',
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
  }
}));`

const refererCode = `// 验证Referer
app.use((req, res, next) => {
  const referer = req.headers.referer;
  if (!referer || !referer.startsWith('https://your-domain.com')) {
    return res.status(403).json({ error: 'Invalid referer' });
  }
  next();
});`

const transferCaseCode = `// 前端实现
function TransferForm() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
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
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      <button type="submit">转账</button>
    </form>
  );
}`

const profileCaseCode = `// 后端实现
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
  if (!req.csrfToken()) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  // 更新用户资料
  // ...
});`

const SPREADS = [
  {
    label: '攻击概述',
    left: (
      <div className="space-y-4">
        <PageTitle>CSRF攻击概述</PageTitle>
        <SectionTitle>1. CSRF攻击定义</SectionTitle>
        <BookParagraph>
          CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种常见的Web安全漏洞，攻击者诱导用户访问恶意网站，在用户不知情的情况下，以用户身份向目标网站发送请求，执行未授权的操作。
        </BookParagraph>
        <SectionTitle>2. 攻击特点</SectionTitle>
        <BookList items={[
          '攻击者无法直接获取用户数据',
          '攻击者利用用户的身份和权限',
          '攻击者诱导用户访问恶意网站',
          '攻击者利用用户的Cookie和会话信息',
          '攻击者可以执行用户权限范围内的操作',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见攻击场景</SectionTitle>
        <BookList items={['银行转账', '修改用户资料', '发送邮件', '购买商品', '删除数据']} />
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
          '用户登录目标网站',
          '目标网站设置Cookie',
          '用户访问恶意网站',
          '恶意网站发送请求到目标网站',
          '浏览器自动携带Cookie',
          '目标网站执行请求',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 攻击条件</SectionTitle>
        <BookList items={[
          '用户已登录目标网站',
          '目标网站使用Cookie进行身份验证',
          '目标网站没有CSRF防护措施',
          '用户访问恶意网站',
          '恶意网站可以发送请求到目标网站',
        ]} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. Token验证</SectionTitle>
        <BookCode language="javascript" code={tokenCode} />
        <SectionTitle>2. SameSite Cookie</SectionTitle>
        <BookCode language="javascript" code={sameSiteCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 验证Referer</SectionTitle>
        <BookCode language="javascript" code={refererCode} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>转账功能防护</PageTitle>
        <BookCode language="javascript" code={transferCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>用户资料修改防护</PageTitle>
        <BookCode language="javascript" code={profileCaseCode} />
      </div>
    ),
  },
]

export default function CSRFProtectionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
