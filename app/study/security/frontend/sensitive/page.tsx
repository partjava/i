"use client";
import { useState } from "react";
import Link from "next/link";

export default function SensitiveInfoProtectionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">敏感信息保护</h1>
      
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
            <h3 className="text-xl font-semibold mb-3">敏感信息保护概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 敏感信息定义</h4>
              <p className="mb-4">
                敏感信息是指那些一旦泄露可能会对个人、组织或系统造成损害的信息，包括但不限于个人身份信息、财务信息、医疗记录、商业机密等。
              </p>

              <h4 className="font-semibold">2. 敏感信息类型</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>个人身份信息（PII）</li>
                  <li>支付卡信息（PCI）</li>
                  <li>医疗健康信息（PHI）</li>
                  <li>商业机密信息</li>
                  <li>系统配置信息</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见泄露场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>源代码泄露</li>
                  <li>配置文件泄露</li>
                  <li>日志信息泄露</li>
                  <li>错误信息泄露</li>
                  <li>注释信息泄露</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "principle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">攻击原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 信息泄露途径</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>源代码注释</li>
                  <li>错误信息</li>
                  <li>调试信息</li>
                  <li>配置文件</li>
                  <li>日志文件</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 攻击方式</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 源代码注释泄露
// TODO: 使用生产环境数据库连接
// const dbUrl = 'mongodb://admin:password@prod-db:27017';

// 2. 错误信息泄露
try {
  // 业务逻辑
} catch (error) {
  console.error('数据库连接失败:', error);
  // 错误信息可能包含敏感信息
}

// 3. 调试信息泄露
console.log('用户信息:', user);
// 可能泄露用户敏感数据

// 4. 配置文件泄露
{
  "database": {
    "host": "prod-db.example.com",
    "user": "admin",
    "password": "secret123"
  }
}

// 5. 日志信息泄露
logger.info('用户登录成功', { userId: 123, ip: '192.168.1.1' });`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 代码层面防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 移除敏感注释
// 不安全的注释
// const dbUrl = 'mongodb://admin:password@prod-db:27017';

// 安全的注释
// 使用环境变量配置数据库连接

// 2. 错误处理
try {
  // 业务逻辑
} catch (error) {
  // 不安全的错误处理
  // console.error('数据库连接失败:', error);
  
  // 安全的错误处理
  console.error('操作失败');
  logger.error('数据库连接失败', { error: error.message });
}

// 3. 日志处理
// 不安全的日志
logger.info('用户登录', { userId: 123, password: 'hashed' });

// 安全的日志
logger.info('用户登录', { userId: 123 });`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 配置管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 使用环境变量
// 不安全的配置
const config = {
  db: {
    host: 'prod-db.example.com',
    user: 'admin',
    password: 'secret123'
  }
};

// 安全的配置
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

// 2. 使用配置文件
// config.dev.js
module.exports = {
  db: {
    host: 'localhost',
    user: 'dev',
    password: 'dev123'
  }
};

// config.prod.js
module.exports = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 数据脱敏</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 手机号脱敏
function maskPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

// 2. 身份证号脱敏
function maskIdCard(idCard) {
  return idCard.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2');
}

// 3. 邮箱脱敏
function maskEmail(email) {
  const [name, domain] = email.split('@');
  return \`\${name.charAt(0)}***@\${domain}\`;
}

// 4. 银行卡号脱敏
function maskBankCard(cardNo) {
  return cardNo.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实战案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 用户信息展示</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 前端实现
function UserProfile({ user }) {
  return (
    <div>
      <h2>用户信息</h2>
      <p>姓名: {maskName(user.name)}</p>
      <p>手机: {maskPhone(user.phone)}</p>
      <p>邮箱: {maskEmail(user.email)}</p>
      <p>身份证: {maskIdCard(user.idCard)}</p>
    </div>
  );
}

// 2. 后端实现
app.get('/api/user/profile', async (req, res) => {
  try {
    const user = await db.users.findById(req.user.id);
    
    // 脱敏处理
    const safeUser = {
      name: maskName(user.name),
      phone: maskPhone(user.phone),
      email: maskEmail(user.email),
      idCard: maskIdCard(user.idCard)
    };
    
    res.json(safeUser);
  } catch (error) {
    logger.error('获取用户信息失败', { error: error.message });
    res.status(500).json({ error: '获取用户信息失败' });
  }
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 日志记录</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 日志中间件
const logMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // 安全的日志记录
    logger.info('请求完成', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      ip: req.ip
    });
  });
  
  next();
};

// 2. 错误日志
app.use((err, req, res, next) => {
  // 安全的错误日志
  logger.error('请求错误', {
    method: req.method,
    url: req.url,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  
  res.status(500).json({ error: '服务器错误' });
});`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 配置文件管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 环境变量配置
// .env
DB_HOST=localhost
DB_USER=dev
DB_PASSWORD=dev123
JWT_SECRET=your-secret-key

// 2. 配置文件
// config/index.js
require('dotenv').config();

module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
};

// 3. 配置验证
const Joi = require('joi');

const schema = Joi.object({
  database: Joi.object({
    host: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required()
  }),
  jwt: Joi.object({
    secret: Joi.string().required()
  })
});

const { error, value } = schema.validate(config);
if (error) {
  throw new Error(\`配置验证失败: \${error.message}\`);
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/upload"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 文件上传安全
        </Link>
        <Link
          href="/study/security/frontend/encryption"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          前端加密 →
        </Link>
      </div>
    </div>
  );
} 