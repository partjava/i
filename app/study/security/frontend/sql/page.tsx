'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: 'SQL注入防护',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '点击劫持防护', href: '/study/security/frontend/clickjacking' },
  nextChapter: { label: '文件上传安全', href: '/study/security/frontend/upload' },
  theme: THEMES.security,
}

const paramQueryCode = `// 不安全的查询
const query = 'SELECT * FROM users WHERE username = \\'' + username + '\\' AND password = \\'' + password + '\\'';

// 安全的参数化查询
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
const params = [username, password];
db.query(query, params);`

const inputValidationCode = `// 输入验证函数
function validateInput(input) {
  // 移除SQL注入相关的特殊字符
  const sanitized = input.replace(/['";]/g, '');
  // 验证输入格式
  if (!/^[a-zA-Z0-9_]+$/.test(sanitized)) {
    throw new Error('Invalid input');
  }
  return sanitized;
}

// 使用验证函数
const username = validateInput(req.body.username);
const password = validateInput(req.body.password);`

const ormCode = `// 使用Sequelize ORM
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// 安全的查询
const user = await User.findOne({
  where: {
    username: username,
    password: password
  }
});`

const loginCaseCode = `// 前端实现
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });
      const data = await response.json();
      if (data.success) { /* 登录成功 */ }
    } catch (error) { /* 处理错误 */ }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username}
        onChange={(e) => setUsername(e.target.value)}
        pattern="[a-zA-Z0-9_]+" required />
      <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">登录</button>
    </form>
  );
}`

const searchCaseCode = `// 后端实现
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost', user: 'root',
  password: 'password', database: 'mydb'
});

// 搜索接口 - 使用参数化查询
app.get('/api/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE name LIKE ?',
      ['%' + keyword + '%']
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});`

const SPREADS = [
  {
    label: '攻击概述',
    left: (
      <div className="space-y-4">
        <PageTitle>SQL注入攻击概述</PageTitle>
        <SectionTitle>1. SQL注入定义</SectionTitle>
        <BookParagraph>
          SQL注入是一种常见的Web安全漏洞，攻击者通过在用户输入中插入SQL代码，使应用程序执行非预期的SQL命令，从而获取、修改或删除数据库中的数据。这种攻击方式利用了应用程序对用户输入处理不当的漏洞。
        </BookParagraph>
        <SectionTitle>2. 攻击特点</SectionTitle>
        <BookList items={[
          '攻击者可以绕过身份验证，直接访问系统',
          '攻击者可以获取敏感数据，如用户密码、个人信息等',
          '攻击者可以修改数据库内容，如篡改数据、删除数据等',
          '攻击者可以执行任意SQL命令，如创建表、删除表等',
          '攻击者可以获取数据库结构信息',
          '攻击者可以执行系统命令，如读写文件、执行程序等',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见攻击场景</SectionTitle>
        <BookList items={[
          '登录表单：通过注入SQL语句绕过密码验证',
          '搜索功能：通过注入SQL语句获取敏感数据',
          '用户资料修改：通过注入SQL语句修改其他用户资料',
          '数据查询接口：通过注入SQL语句获取未授权数据',
          '文件上传功能：通过注入SQL语句上传恶意文件',
          '评论系统 / 订单系统',
        ]} />
        <SectionTitle>4. 攻击危害</SectionTitle>
        <BookList items={['数据泄露', '数据篡改', '系统破坏', '权限提升', '系统入侵', '经济损失', '声誉损害']} />
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
          '攻击者发现存在SQL注入漏洞的输入点',
          '攻击者构造恶意的SQL语句',
          '攻击者将恶意SQL语句注入到应用程序',
          '应用程序将恶意SQL语句拼接到查询中',
          '数据库执行恶意SQL语句',
          '攻击者获取非预期的结果',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 常见注入点</SectionTitle>
        <BookList items={[
          'URL参数：如查询字符串、路径参数等',
          '表单输入：如文本框、下拉框、复选框等',
          'Cookie值',
          'HTTP头信息',
          '文件上传',
        ]} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. 参数化查询</SectionTitle>
        <BookCode language="javascript" code={paramQueryCode} />
        <SectionTitle>2. 输入验证</SectionTitle>
        <BookCode language="javascript" code={inputValidationCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 使用ORM</SectionTitle>
        <BookCode language="javascript" code={ormCode} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>登录功能防护</PageTitle>
        <BookCode language="javascript" code={loginCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>搜索功能防护</PageTitle>
        <BookCode language="javascript" code={searchCaseCode} />
      </div>
    ),
  },
]

export default function SQLInjectionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
