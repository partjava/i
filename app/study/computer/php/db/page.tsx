'use client';

import { useState } from 'react';

const tabs = [
  { key: 'mysql-basic', label: 'MySQL基础' },
  { key: 'connect', label: '连接数据库' },
  { key: 'crud', label: '增删改查' },
  { key: 'secure', label: '预处理与安全' },
  { key: 'pdo', label: 'PDO用法' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpDbPage() {
  const [activeTab, setActiveTab] = useState('mysql-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">数据库操作</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'mysql-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">MySQL基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>MySQL是最常用的开源关系型数据库，适合Web开发。</li>
              <li>常用数据类型：INT、VARCHAR、TEXT、DATE、FLOAT等。</li>
              <li>基本操作：创建数据库、表，插入、查询、更新、删除数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '-- 创建数据库',
  'CREATE DATABASE testdb;',
  '',
  '-- 创建表',
  'CREATE TABLE users (',
  '  id INT PRIMARY KEY AUTO_INCREMENT,',
  '  name VARCHAR(50),',
  '  age INT',
  ');',
  '',
  '-- 插入数据',
  'INSERT INTO users (name, age) VALUES ("Tom", 20);',
  '',
  '-- 查询数据',
  'SELECT * FROM users;',
  '',
  '-- 更新数据',
  'UPDATE users SET age=21 WHERE name="Tom";',
  '',
  '-- 删除数据',
  'DELETE FROM users WHERE name="Tom";',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'connect' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">连接数据库</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP常用<code>mysqli</code>或<code>PDO</code>扩展连接MySQL。</li>
              <li>连接时需指定主机、用户名、密码、数据库名。</li>
              <li>连接失败要有错误处理。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// mysqli方式',
  '$conn = new mysqli("localhost", "root", "", "testdb");',
  'if ($conn->connect_error) {',
  '  die("连接失败: " . $conn->connect_error);',
  '}',
  '',
  '// PDO方式',
  'try {',
  '  $pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");',
  '  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);',
  '} catch (PDOException $e) {',
  '  echo "连接失败: " . $e->getMessage();',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'crud' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">增删改查（CRUD）</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>CRUD即创建（Create）、读取（Read）、更新（Update）、删除（Delete）。</li>
              <li>PHP可用SQL语句操作数据库。</li>
              <li>注意SQL注入风险，推荐用预处理。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '$conn = new mysqli("localhost", "root", "", "testdb");',
  '',
  '// 插入',
  '$conn->query("INSERT INTO users (name, age) VALUES (\"Alice\", 22)");',
  '',
  '// 查询',
  '$result = $conn->query("SELECT * FROM users");',
  'while ($row = $result->fetch_assoc()) {',
  '  echo $row["name"] . ", " . $row["age"] . "<br>";',
  '}',
  '',
  '// 更新',
  '$conn->query("UPDATE users SET age=23 WHERE name=\"Alice\"");',
  '',
  '// 删除',
  '$conn->query("DELETE FROM users WHERE name=\"Alice\"");',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'secure' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">预处理与安全</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>预处理语句可防止SQL注入。</li>
              <li>推荐使用<code>mysqli</code>或<code>PDO</code>的预处理功能。</li>
              <li>参数绑定可自动转义特殊字符。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// mysqli预处理',
  '$conn = new mysqli("localhost", "root", "", "testdb");',
  '$stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");',
  '$stmt->bind_param("s", $name);',
  '$name = "Bob";',
  '$stmt->execute();',
  '$result = $stmt->get_result();',
  'while ($row = $result->fetch_assoc()) {',
  '  echo $row["name"];',
  '}',
  '',
  '// PDO预处理',
  '$pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");',
  '$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");',
  '$stmt->execute(["Bob"]);',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'pdo' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">PDO用法</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PDO（PHP Data Objects）是通用数据库访问接口。</li>
              <li>支持多种数据库，推荐用异常处理。</li>
              <li>常用方法：<code>prepare</code>、<code>execute</code>、<code>fetch</code>、<code>fetchAll</code>。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  'try {',
  '  $pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");',
  '  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);',
  '',
  '  // 插入',
  '  $stmt = $pdo->prepare("INSERT INTO users (name, age) VALUES (?, ?)");',
  '  $stmt->execute(["Eve", 25]);',
  '',
  '  // 查询',
  '  $stmt = $pdo->query("SELECT * FROM users");',
  '  foreach ($stmt as $row) {',
  '    echo $row["name"] . ", " . $row["age"] . "<br>";',
  '  }',
  '',
  '  // 更新',
  '  $stmt = $pdo->prepare("UPDATE users SET age=? WHERE name=?");',
  '  $stmt->execute([26, "Eve"]);',
  '',
  '  // 删除',
  '  $stmt = $pdo->prepare("DELETE FROM users WHERE name=?");',
  '  $stmt->execute(["Eve"]);',
  '} catch (PDOException $e) {',
  '  echo $e->getMessage();',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 连接数据库报错怎么办？</b><br />A: 检查主机、端口、用户名、密码、数据库名是否正确。</li>
              <li><b>Q: 如何防止SQL注入？</b><br />A: 一定要用预处理语句，不要拼接SQL。</li>
              <li><b>Q: 查询结果乱码？</b><br />A: 设置数据库和连接编码为utf8mb4。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>用mysqli实现用户信息的增删改查。</li>
              <li>用PDO实现留言板功能。</li>
              <li>实现安全的登录验证（防SQL注入）。</li>
              <li>尝试捕获并处理数据库异常。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/web"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：Web开发基础
          </a>
          <a
            href="/study/php/session-cookie"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：会话管理与Cookie
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 