'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全编码实践',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '前端加密', href: '/study/security/frontend/encryption' },
  nextChapter: { label: '安全测试方法', href: '/study/security/frontend/testing' },
  theme: THEMES.security,
}

const leastPrivilegeCode = `// 不安全的代码
function processUserData(user) {
  return {
    id: user.id, name: user.name, email: user.email,
    password: user.password, role: user.role
  };
}

// 安全的代码 - 只返回必要的字段
function processUserData(user, requiredFields) {
  return requiredFields.reduce((acc, field) => {
    if (user.hasOwnProperty(field)) acc[field] = user[field];
    return acc;
  }, {});
}

// 使用示例
const userData = processUserData(user, ['id', 'name', 'email']);`

const defensiveCode = `// 不安全的代码
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

try {
  const total = calculateTotal([{ price: 10 }, { price: 20 }]);
} catch (error) {
  console.error('计算总价失败:', error.message);
}`

const inputValidationCode = `function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validateInput(input, type) {
  switch (type) {
    case 'email': return validateEmail(input);
    case 'phone': return validatePhone(input);
    case 'number': return !isNaN(input) && isFinite(input);
    case 'string': return typeof input === 'string' && input.length > 0;
    default: return false;
  }
}`

const namingCode = `// 不安全的命名
const pwd = 'password123';
const usr = { name: 'John' };
const tmp = 'temporary';

// 安全的命名
const password = 'password123';
const user = { name: 'John' };
const temporaryData = 'temporary';

// 常量命名
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;`

const functionCode = `/**
 * 计算数字的两倍
 * @param {number} number - 要计算的数字
 * @returns {number} 计算结果
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
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`

const errorHandlingCode = `class ValidationError extends Error {
  constructor(message) { super(message); this.name = 'ValidationError'; }
}

class NetworkError extends Error {
  constructor(message) { super(message); this.name = 'NetworkError'; }
}

async function processData(data) {
  try {
    if (!data) throw new ValidationError('Data is required');
    const result = await processData(data);
    return result;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}`

const formCaseCode = `import { useState } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    username: '', email: '', password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = '用户名不能为空';
    if (!validateInput(formData.email, 'email')) newErrors.email = '邮箱格式不正确';
    if (formData.password.length < 8) newErrors.password = '密码长度至少为8位';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('提交失败');
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})} />
      {errors.username && <span>{errors.username}</span>}
      <input type="email" value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})} />
      {errors.email && <span>{errors.email}</span>}
      <input type="password" value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})} />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">提交</button>
    </form>
  );
}`

const apiCaseCode = `import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: window.location.href = '/login'; break;
        case 403: console.error('权限不足'); break;
        case 500: console.error('服务器错误'); break;
      }
    }
    return Promise.reject(error);
  }
);

async function fetchUserData(userId) {
  try {
    return await api.get(\`/users/\${userId}\`);
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}`

const SPREADS = [
  {
    label: '编码概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全编码概述</PageTitle>
        <SectionTitle>1. 安全编码定义</SectionTitle>
        <BookParagraph>
          安全编码是指在软件开发过程中，通过遵循特定的编码规范和最佳实践，来预防和减少安全漏洞的产生。它涵盖了代码编写、审查、测试和维护的各个环节。
        </BookParagraph>
        <SectionTitle>2. 安全编码目标</SectionTitle>
        <BookList items={['预防安全漏洞', '提高代码质量', '降低维护成本', '保护用户数据', '确保系统安全']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见安全问题</SectionTitle>
        <BookList items={['输入验证不足', '输出编码不当', '错误处理不当', '配置管理不当', '依赖管理不当']} />
      </div>
    ),
  },
  {
    label: '编码原则',
    left: (
      <div className="space-y-4">
        <PageTitle>编码原则</PageTitle>
        <SectionTitle>1. 最小权限原则</SectionTitle>
        <BookCode language="javascript" code={leastPrivilegeCode} />
        <SectionTitle>2. 防御性编程</SectionTitle>
        <BookCode language="javascript" code={defensiveCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 输入验证</SectionTitle>
        <BookCode language="javascript" code={inputValidationCode} />
      </div>
    ),
  },
  {
    label: '编码规范',
    left: (
      <div className="space-y-4">
        <PageTitle>编码规范</PageTitle>
        <SectionTitle>1. 变量命名规范</SectionTitle>
        <BookCode language="javascript" code={namingCode} />
        <SectionTitle>2. 函数编写规范</SectionTitle>
        <BookCode language="javascript" code={functionCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 错误处理规范</SectionTitle>
        <BookCode language="javascript" code={errorHandlingCode} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>表单处理</PageTitle>
        <BookCode language="javascript" code={formCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>API调用</PageTitle>
        <BookCode language="javascript" code={apiCaseCode} />
      </div>
    ),
  },
]

export default function SecureCodingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
