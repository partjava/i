"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecureCodingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全编码实践</h1>
      
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
          编码概述
        </button>
        <button
          onClick={() => setActiveTab("principle")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "principle"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          编码原则
        </button>
        <button
          onClick={() => setActiveTab("standard")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "standard"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          编码规范
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
            <h3 className="text-xl font-semibold mb-3">安全编码概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全编码定义</h4>
              <p className="mb-4">
                安全编码是指在软件开发过程中，通过遵循特定的编码规范和最佳实践，来预防和减少安全漏洞的产生。它涵盖了代码编写、审查、测试和维护的各个环节。
              </p>

              <h4 className="font-semibold">2. 安全编码目标</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>预防安全漏洞</li>
                  <li>提高代码质量</li>
                  <li>降低维护成本</li>
                  <li>保护用户数据</li>
                  <li>确保系统安全</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见安全问题</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>输入验证不足</li>
                  <li>输出编码不当</li>
                  <li>错误处理不当</li>
                  <li>配置管理不当</li>
                  <li>依赖管理不当</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "principle" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">编码原则</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 最小权限原则</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的代码
function processUserData(user) {
  // 直接访问所有用户数据
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role
  };
}

// 安全的代码
function processUserData(user, requiredFields) {
  // 只返回必要的字段
  return requiredFields.reduce((acc, field) => {
    if (user.hasOwnProperty(field)) {
      acc[field] = user[field];
    }
    return acc;
  }, {});
}

// 使用示例
const userData = processUserData(user, ['id', 'name', 'email']);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 防御性编程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的代码
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// 安全的代码
function calculateTotal(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  return items.reduce((total, item) => {
    if (typeof item.price !== 'number' || isNaN(item.price)) {
      throw new Error('Invalid price value');
    }
    return total + item.price;
  }, 0);
}

// 使用示例
try {
  const total = calculateTotal([
    { price: 10 },
    { price: 20 },
    { price: 30 }
  ]);
} catch (error) {
  console.error('计算总价失败:', error.message);
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 输入验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的代码
function processUserInput(input) {
  return input;
}

// 安全的代码
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validateInput(input, type) {
  switch (type) {
    case 'email':
      return validateEmail(input);
    case 'phone':
      return validatePhone(input);
    case 'number':
      return !isNaN(input) && isFinite(input);
    case 'string':
      return typeof input === 'string' && input.length > 0;
    default:
      return false;
  }
}

// 使用示例
const email = 'user@example.com';
if (validateInput(email, 'email')) {
  // 处理有效的邮箱
} else {
  // 处理无效的邮箱
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "standard" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">编码规范</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 变量命名规范</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的命名
const pwd = 'password123';
const usr = { name: 'John' };
const tmp = 'temporary';

// 安全的命名
const password = 'password123';
const user = { name: 'John' };
const temporaryData = 'temporary';

// 常量命名
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = 'https://api.example.com';

// 私有变量命名
const _internalState = {};
const #privateField = 'private';`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 函数编写规范</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的函数
function f(x) {
  return x * 2;
}

// 安全的函数
/**
 * 计算数字的两倍
 * @param {number} number - 要计算的数字
 * @returns {number} 计算结果
 * @throws {Error} 如果输入不是数字
 */
function calculateDouble(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    throw new Error('Input must be a valid number');
  }
  return number * 2;
}

// 异步函数规范
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 错误处理规范</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的错误处理
try {
  // 业务逻辑
} catch (e) {
  console.log(e);
}

// 安全的错误处理
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

async function processData(data) {
  try {
    // 验证输入
    if (!data) {
      throw new ValidationError('Data is required');
    }
    
    // 处理数据
    const result = await processData(data);
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      // 处理验证错误
      console.error('Validation error:', error.message);
    } else if (error instanceof NetworkError) {
      // 处理网络错误
      console.error('Network error:', error.message);
    } else {
      // 处理其他错误
      console.error('Unexpected error:', error);
    }
    throw error;
  }
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
              <h4 className="font-semibold">1. 表单处理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 安全的表单处理
import { useState } from 'react';
import { validateInput } from '../utils/validation';

function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // 验证用户名
    if (!validateInput(formData.username, 'string')) {
      newErrors.username = '用户名不能为空';
    }
    
    // 验证邮箱
    if (!validateInput(formData.email, 'email')) {
      newErrors.email = '邮箱格式不正确';
    }
    
    // 验证密码
    if (!validateInput(formData.password, 'string') || 
        formData.password.length < 8) {
      newErrors.password = '密码长度至少为8位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('提交失败');
      }
      
      // 处理成功响应
      const result = await response.json();
      console.log('提交成功:', result);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({
            ...formData,
            username: e.target.value
          })}
        />
        {errors.username && (
          <span className="error">{errors.username}</span>
        )}
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({
            ...formData,
            email: e.target.value
          })}
        />
        {errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({
            ...formData,
            password: e.target.value
          })}
        />
        {errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>
      
      <button type="submit">提交</button>
    </form>
  );
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. API调用</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 安全的API调用
import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 处理服务器错误
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          // 权限不足
          console.error('权限不足');
          break;
        case 404:
          // 资源不存在
          console.error('资源不存在');
          break;
        case 500:
          // 服务器错误
          console.error('服务器错误');
          break;
        default:
          console.error('请求失败');
      }
    } else if (error.request) {
      // 请求发送失败
      console.error('网络错误');
    } else {
      // 其他错误
      console.error('请求配置错误');
    }
    return Promise.reject(error);
  }
);

// 使用示例
async function fetchUserData(userId) {
  try {
    const data = await api.get(\`/users/\${userId}\`);
    return data;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 数据存储</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 安全的数据存储
import { encrypt, decrypt } from '../utils/crypto';

// 安全的本地存储
const secureStorage = {
  set(key, value) {
    try {
      const encrypted = encrypt(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('存储数据失败:', error);
      throw error;
    }
  },
  
  get(key) {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('读取数据失败:', error);
      return null;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('删除数据失败:', error);
      throw error;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('清空数据失败:', error);
      throw error;
    }
  }
};

// 使用示例
// 存储用户信息
secureStorage.set('user', {
  id: 1,
  name: 'John',
  email: 'john@example.com'
});

// 读取用户信息
const user = secureStorage.get('user');

// 删除用户信息
secureStorage.remove('user');`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/frontend/encryption"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 前端加密
        </Link>
        <Link
          href="/study/security/frontend/testing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全测试方法 →
        </Link>
      </div>
    </div>
  );
} 