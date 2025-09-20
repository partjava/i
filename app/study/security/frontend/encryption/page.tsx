"use client";
import { useState } from "react";
import Link from "next/link";

export default function FrontendEncryptionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">前端加密</h1>
      
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
          加密概述
        </button>
        <button
          onClick={() => setActiveTab("principle")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "principle"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          加密原理
        </button>
        <button
          onClick={() => setActiveTab("solution")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "solution"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          加密方案
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
            <h3 className="text-xl font-semibold mb-3">前端加密概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 前端加密定义</h4>
              <p className="mb-4">
                前端加密是指在浏览器端对数据进行加密处理，以保护数据在传输和存储过程中的安全性。主要包括数据传输加密、数据存储加密和密码加密等。
              </p>

              <h4 className="font-semibold">2. 加密类型</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>对称加密（AES、DES）</li>
                  <li>非对称加密（RSA、ECC）</li>
                  <li>哈希算法（MD5、SHA）</li>
                  <li>Base64编码</li>
                  <li>自定义加密</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>用户密码加密</li>
                  <li>敏感数据传输</li>
                  <li>本地存储加密</li>
                  <li>API请求加密</li>
                  <li>文件加密</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "principle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 对称加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// AES加密示例
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
const decrypted = decrypt(encrypted, key);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 非对称加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// RSA加密示例
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
const decrypted = decrypt(encrypted, privateKey);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 哈希算法</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 哈希加密示例
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
    .update(data + salt)
    .digest('hex');
}

// 使用示例
const password = 'password123';
const salt = crypto.randomBytes(16).toString('hex');
const hashedPassword = hashWithSalt(password, salt);`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "solution" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加密方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 密码加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 密码加密方案
const bcrypt = require('bcrypt');

// 密码加密
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// 密码验证
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// 使用示例
async function registerUser(username, password) {
  const hashedPassword = await hashPassword(password);
  // 存储用户名和加密后的密码
  await db.users.create({
    username,
    password: hashedPassword
  });
}

async function loginUser(username, password) {
  const user = await db.users.findOne({ username });
  if (!user) return false;
  
  return await verifyPassword(password, user.password);
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 数据传输加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 数据传输加密方案
const CryptoJS = require('crypto-js');

// 生成随机密钥
function generateKey() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

// 加密数据
function encryptData(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// 解密数据
function decryptData(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// API请求加密
async function secureRequest(url, data) {
  const key = generateKey();
  const encryptedData = encryptData(data, key);
  
  // 使用RSA加密密钥
  const encryptedKey = encryptKey(key, publicKey);
  
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: encryptedData,
      key: encryptedKey
    })
  });
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 本地存储加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 本地存储加密方案
const CryptoJS = require('crypto-js');

// 加密存储
function secureStorage(key, value) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    'storage-key'
  ).toString();
  localStorage.setItem(key, encrypted);
}

// 解密读取
function secureRetrieve(key) {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  
  const bytes = CryptoJS.AES.decrypt(encrypted, 'storage-key');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// 使用示例
// 存储用户信息
secureStorage('user', {
  id: 1,
  name: 'John',
  email: 'john@example.com'
});

// 读取用户信息
const user = secureRetrieve('user');`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 登录表单加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 登录表单加密
import CryptoJS from 'crypto-js';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 密码加密
    const hashedPassword = CryptoJS.SHA256(password).toString();
    
    // 发送加密后的数据
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password: hashedPassword
      })
    });
    
    // 处理响应
    const data = await response.json();
    if (data.success) {
      // 登录成功
      localStorage.setItem('token', data.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">登录</button>
    </form>
  );
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 文件上传加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 文件上传加密
import CryptoJS from 'crypto-js';

function FileUpload() {
  const handleFileUpload = async (file) => {
    // 读取文件内容
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      
      // 加密文件内容
      const encrypted = CryptoJS.AES.encrypt(
        fileContent,
        'file-key'
      ).toString();
      
      // 创建加密后的文件
      const encryptedFile = new Blob([encrypted], {
        type: 'application/octet-stream'
      });
      
      // 上传加密文件
      const formData = new FormData();
      formData.append('file', encryptedFile);
      
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
    };
    
    reader.readAsText(file);
  };

  return (
    <input
      type="file"
      onChange={(e) => handleFileUpload(e.target.files[0])}
    />
  );
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. API请求加密</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// API请求加密
import CryptoJS from 'crypto-js';

// 生成请求签名
function generateSignature(params, secret) {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});
  
  const signStr = Object.entries(sortedParams)
    .map(([key, value]) => \`\${key}=\${value}\`)
    .join('&');
  
  return CryptoJS.HmacSHA256(signStr, secret).toString();
}

// 加密请求数据
async function secureRequest(url, data) {
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(7);
  
  const params = {
    ...data,
    timestamp,
    nonce
  };
  
  // 添加签名
  params.sign = generateSignature(params, 'api-secret');
  
  // 加密数据
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(params),
    'request-key'
  ).toString();
  
  // 发送请求
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
}

// 使用示例
const data = {
  userId: 123,
  action: 'update',
  data: { name: 'John' }
};

const result = await secureRequest('/api/user', data);`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/sensitive"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 敏感信息保护
        </Link>
        <Link
          href="/study/security/frontend/coding"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全编码实践 →
        </Link>
      </div>
    </div>
  );
} 