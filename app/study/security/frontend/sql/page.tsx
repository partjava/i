"use client";
import { useState } from "react";
import Link from "next/link";

export default function SQLInjectionPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">SQL注入防护</h1>
      
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
            <h3 className="text-xl font-semibold mb-3">SQL注入攻击概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. SQL注入定义</h4>
              <p className="mb-4">
                SQL注入是一种常见的Web安全漏洞，攻击者通过在用户输入中插入SQL代码，使应用程序执行非预期的SQL命令，从而获取、修改或删除数据库中的数据。这种攻击方式利用了应用程序对用户输入处理不当的漏洞。
              </p>

              <h4 className="font-semibold">2. 攻击特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>攻击者可以绕过身份验证，直接访问系统</li>
                  <li>攻击者可以获取敏感数据，如用户密码、个人信息等</li>
                  <li>攻击者可以修改数据库内容，如篡改数据、删除数据等</li>
                  <li>攻击者可以执行任意SQL命令，如创建表、删除表等</li>
                  <li>攻击者可以获取数据库结构信息，如表名、字段名等</li>
                  <li>攻击者可以执行系统命令，如读写文件、执行程序等</li>
                  <li>攻击者可以获取服务器信息，如操作系统版本、数据库版本等</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 常见攻击场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>登录表单：通过注入SQL语句绕过密码验证</li>
                  <li>搜索功能：通过注入SQL语句获取敏感数据</li>
                  <li>用户资料修改：通过注入SQL语句修改其他用户资料</li>
                  <li>数据查询接口：通过注入SQL语句获取未授权数据</li>
                  <li>文件上传功能：通过注入SQL语句上传恶意文件</li>
                  <li>评论系统：通过注入SQL语句获取用户信息</li>
                  <li>订单系统：通过注入SQL语句修改订单信息</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. 攻击危害</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>数据泄露：敏感信息被窃取</li>
                  <li>数据篡改：数据被恶意修改</li>
                  <li>系统破坏：数据库被破坏或删除</li>
                  <li>权限提升：获取更高权限</li>
                  <li>系统入侵：获取系统控制权</li>
                  <li>经济损失：造成直接经济损失</li>
                  <li>声誉损害：影响企业声誉</li>
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
                  <li>攻击者发现存在SQL注入漏洞的输入点</li>
                  <li>攻击者构造恶意的SQL语句</li>
                  <li>攻击者将恶意SQL语句注入到应用程序</li>
                  <li>应用程序将恶意SQL语句拼接到查询中</li>
                  <li>数据库执行恶意SQL语句</li>
                  <li>攻击者获取非预期的结果</li>
                </ol>
              </div>

              <h4 className="font-semibold">2. 常见注入点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>URL参数：如查询字符串、路径参数等</li>
                  <li>表单输入：如文本框、下拉框、复选框等</li>
                  <li>URL参数</li>
                  <li>表单输入</li>
                  <li>Cookie值</li>
                  <li>HTTP头信息</li>
                  <li>文件上传</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "defense" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方案</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 参数化查询</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 不安全的查询
const query = 'SELECT * FROM users WHERE username = \\'' + username + '\\' AND password = \\'' + password + '\\'';

// 安全的参数化查询
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
const params = [username, password];
db.query(query, params);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 输入验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 输入验证函数
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
const password = validateInput(req.body.password);`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 使用ORM</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Sequelize ORM
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
              <h4 className="font-semibold">1. 登录功能防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 前端实现
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });
      const data = await response.json();
      if (data.success) {
        // 登录成功
      }
    } catch (error) {
      // 处理错误
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        pattern="[a-zA-Z0-9_]+"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">登录</button>
    </form>
  );
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 搜索功能防护</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 后端实现
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

// 搜索接口
app.get('/api/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    // 参数化查询
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE name LIKE ?',
      ['%' + keyword + '%']
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
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
          href="/study/security/frontend/clickjacking"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 点击劫持防护
        </Link>
        <Link
          href="/study/security/frontend/upload"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          文件上传安全 →
        </Link>
      </div>
    </div>
  );
} 