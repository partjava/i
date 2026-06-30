'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '前端加密',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '敏感信息保护', href: '/study/security/frontend/sensitive' },
  nextChapter: { label: '安全编码实践', href: '/study/security/frontend/coding' },
  theme: THEMES.security,
}

const aesCode = `// AES加密示例
const CryptoJS = require('crypto-js');

// 加密
function encrypt(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

// 解密
function decrypt(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// 使用示例
const data = 'Hello World';
const key = 'secret-key-123';
const encrypted = encrypt(data, key);
const decrypted = decrypt(encrypted, key);`

const rsaCode = `// RSA加密示例
const NodeRSA = require('node-rsa');

// 生成密钥对
const key = new NodeRSA({b: 512});
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

// 加密
function encrypt(data, publicKey) {
  const key = new NodeRSA(publicKey);
  return key.encrypt(data, 'base64');
}

// 解密
function decrypt(ciphertext, privateKey) {
  const key = new NodeRSA(privateKey);
  return key.decrypt(ciphertext, 'utf8');
}

// 使用示例
const data = 'Hello World';
const encrypted = encrypt(data, publicKey);
const decrypted = decrypt(encrypted, privateKey);`

const hashCode = `// 哈希加密示例
const crypto = require('crypto');

// MD5哈希
function md5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

// SHA256哈希
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// 加盐哈希
function hashWithSalt(data, salt) {
  return crypto.createHash('sha256')
    .update(data + salt).digest('hex');
}

// 使用示例
const password = 'password123';
const salt = crypto.randomBytes(16).toString('hex');
const hashedPassword = hashWithSalt(password, salt);`

const passwordEncrypt = `// 密码加密方案
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function registerUser(username, password) {
  const hashedPassword = await hashPassword(password);
  await db.users.create({ username, password: hashedPassword });
}

async function loginUser(username, password) {
  const user = await db.users.findOne({ username });
  if (!user) return false;
  return await verifyPassword(password, user.password);
}`

const transportEncrypt = `// 数据传输加密方案
const CryptoJS = require('crypto-js');

function generateKey() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

function encryptData(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// API请求加密
async function secureRequest(url, data) {
  const key = generateKey();
  const encryptedData = encryptData(data, key);
  const encryptedKey = encryptKey(key, publicKey);

  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: encryptedData, key: encryptedKey })
  });
}`

const localEncrypt = `// 本地存储加密方案
const CryptoJS = require('crypto-js');

function secureStorage(key, value) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value), 'storage-key'
  ).toString();
  localStorage.setItem(key, encrypted);
}

function secureRetrieve(key) {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  const bytes = CryptoJS.AES.decrypt(encrypted, 'storage-key');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// 使用示例
secureStorage('user', { id: 1, name: 'John', email: 'john@example.com' });
const user = secureRetrieve('user');`

const loginCaseCode = `// 登录表单加密
import CryptoJS from 'crypto-js';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: hashedPassword })
    });

    const data = await response.json();
    if (data.success) localStorage.setItem('token', data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">登录</button>
    </form>
  );
}`

const apiSignCode = `// API请求加密与签名
import CryptoJS from 'crypto-js';

function generateSignature(params, secret) {
  const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key]; return acc;
  }, {});
  const signStr = Object.entries(sortedParams)
    .map(([key, value]) => \`\${key}=\${value}\`).join('&');
  return CryptoJS.HmacSHA256(signStr, secret).toString();
}

async function secureRequest(url, data) {
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(7);
  const params = { ...data, timestamp, nonce };

  params.sign = generateSignature(params, 'api-secret');

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(params), 'request-key'
  ).toString();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Time': timestamp,
      'X-Request-Nonce': nonce
    },
    body: JSON.stringify({ data: encrypted })
  });
  return response.json();
}`

const SPREADS = [
  {
    label: '加密概述',
    left: (
      <div className="space-y-4">
        <PageTitle>前端加密概述</PageTitle>
        <SectionTitle>1. 前端加密定义</SectionTitle>
        <BookParagraph>
          前端加密是指在浏览器端对数据进行加密处理，以保护数据在传输和存储过程中的安全性。主要包括数据传输加密、数据存储加密和密码加密等。
        </BookParagraph>
        <SectionTitle>2. 加密类型</SectionTitle>
        <BookList items={['对称加密（AES、DES）', '非对称加密（RSA、ECC）', '哈希算法（MD5、SHA）', 'Base64编码', '自定义加密']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 应用场景</SectionTitle>
        <BookList items={['用户密码加密', '敏感数据传输', '本地存储加密', 'API请求加密', '文件加密']} />
      </div>
    ),
  },
  {
    label: '加密原理',
    left: (
      <div className="space-y-4">
        <PageTitle>加密原理</PageTitle>
        <SectionTitle>1. 对称加密（AES）</SectionTitle>
        <BookCode language="javascript" code={aesCode} />
        <SectionTitle>2. 非对称加密（RSA）</SectionTitle>
        <BookCode language="javascript" code={rsaCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 哈希算法</SectionTitle>
        <BookCode language="javascript" code={hashCode} />
      </div>
    ),
  },
  {
    label: '加密方案',
    left: (
      <div className="space-y-4">
        <PageTitle>加密方案</PageTitle>
        <SectionTitle>1. 密码加密</SectionTitle>
        <BookCode language="javascript" code={passwordEncrypt} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 数据传输加密</SectionTitle>
        <BookCode language="javascript" code={transportEncrypt} />
        <SectionTitle>3. 本地存储加密</SectionTitle>
        <BookCode language="javascript" code={localEncrypt} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>登录表单加密</PageTitle>
        <BookCode language="javascript" code={loginCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>API请求加密与签名</PageTitle>
        <BookCode language="javascript" code={apiSignCode} />
      </div>
    ),
  },
]

export default function FrontendEncryptionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
