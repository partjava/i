'use client';

import { useState } from 'react';

const tabs = [
  { key: 'web-basic', label: 'Web基础' },
  { key: 'form', label: '表单与请求' },
  { key: 'session', label: 'Session与Cookie' },
  { key: 'upload', label: '文件上传' },
  { key: 'security', label: '常用安全' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpWebPage() {
  const [activeTab, setActiveTab] = useState('web-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Web开发基础</h1>
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
        {activeTab === 'web-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Web基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP常用于开发动态Web页面，运行于Web服务器（如Apache、Nginx）上。</li>
              <li>通过<code>$_GET</code>、<code>$_POST</code>、<code>$_SERVER</code>等全局变量获取请求信息。</li>
              <li>输出HTML内容，结合前端实现交互。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 输出HTML页面',
  'echo "<h1>欢迎来到PHP Web开发</h1>";',
  '',
  '// 获取请求方法',
  'echo $_SERVER["REQUEST_METHOD"];',
  '',
  '// 获取URL参数',
  'if (isset($_GET["name"])) {',
  '  echo "Hello, " . htmlspecialchars($_GET["name"]);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'form' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">表单与请求</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>表单通过<code>method="get"</code>或<code>method="post"</code>提交数据。</li>
              <li>PHP用<code>$_GET</code>和<code>$_POST</code>接收表单数据。</li>
              <li>注意表单安全，防止XSS和CSRF。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<form method="post">',
  '  用户名: <input name="username" />',
  '  <button type="submit">提交</button>',
  '</form>',
  '',
  '<?php',
  '// 处理表单提交',
  'if ($_SERVER["REQUEST_METHOD"] === "POST") {',
  '  $user = $_POST["username"] ?? "";',
  '  // 防止XSS',
  '  $user = htmlspecialchars($user);',
  '  echo "欢迎, $user";',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'session' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Session与Cookie</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Session用于保存用户会话数据，需先<code>session_start()</code>。</li>
              <li>Cookie用于在客户端保存数据，用<code>setcookie</code>设置。</li>
              <li>可结合使用实现登录、购物车等功能。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 启动Session',
  'session_start();',
  '',
  '// 设置Session变量',
  '$_SESSION["user"] = "Tom";',
  '',
  '// 读取Session变量',
  'echo $_SESSION["user"];',
  '',
  '// 设置Cookie',
  'setcookie("token", "abc123", time()+3600);',
  '',
  '// 读取Cookie',
  'if (isset($_COOKIE["token"])) {',
  '  echo $_COOKIE["token"];',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'upload' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件上传</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>表单需<code>enctype="multipart/form-data"</code>，<code>input type="file"</code>。</li>
              <li>上传文件信息存储在<code>$_FILES</code>数组。</li>
              <li>需检查文件类型、大小，防止安全风险。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<form method="post" enctype="multipart/form-data">',
  '  <input type="file" name="myfile" />',
  '  <button type="submit">上传</button>',
  '</form>',
  '',
  '<?php',
  'if ($_SERVER["REQUEST_METHOD"] === "POST") {',
  '  // 检查文件是否上传成功',
  '  if (isset($_FILES["myfile"]) && $_FILES["myfile"]["error"] === 0) {',
  '    $tmp = $_FILES["myfile"]["tmp_name"];',
  '    $name = basename($_FILES["myfile"]["name"]);',
  '    // 检查文件类型和大小',
  '    if ($_FILES["myfile"]["size"] < 1024*1024) {',
  '      move_uploaded_file($tmp, "uploads/$name");',
  '      echo "上传成功";',
  '    } else {',
  '      echo "文件过大";',
  '    }',
  '  } else {',
  '    echo "上传失败";',
  '  }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常用安全</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>防止XSS：输出内容用<code>htmlspecialchars</code>转义。</li>
              <li>防止SQL注入：使用预处理语句（如PDO）。</li>
              <li>表单加CSRF Token防止跨站请求伪造。</li>
              <li>文件上传需严格校验类型和大小。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// XSS防护',
  '$input = "<script>alert(1)</script>";',
  'echo htmlspecialchars($input);',
  '',
  '// SQL注入防护（PDO）',
  '$pdo = new PDO("mysql:host=localhost;dbname=test", "root", "");',
  '$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");',
  '$stmt->execute([$_GET["name"] ?? ""]);',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'code' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">代码示例</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 登录表单处理示例',
  'session_start();',
  'if ($_SERVER["REQUEST_METHOD"] === "POST") {',
  '  $user = $_POST["user"] ?? "";',
  '  $pass = $_POST["pass"] ?? "";',
  '  // 简单校验',
  '  if ($user === "admin" && $pass === "123456") {',
  '    $_SESSION["login"] = true;',
  '    echo "登录成功";',
  '  } else {',
  '    echo "用户名或密码错误";',
  '  }',
  '}',
  '?>',
  '<form method="post">',
  '  用户名: <input name="user" />',
  '  密码: <input name="pass" type="password" />',
  '  <button type="submit">登录</button>',
  '</form>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何防止表单重复提交？</b><br />A: 可用Token机制或提交后跳转页面。</li>
              <li><b>Q: 文件上传如何限制类型？</b><br />A: 检查<code>$_FILES["type"]</code>或用<code>mime_content_type</code>。</li>
              <li><b>Q: Session和Cookie的区别？</b><br />A: Session存服务端，Cookie存客户端。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个简单的留言板，支持表单提交和显示。</li>
              <li>编写文件上传功能，限制文件大小和类型。</li>
              <li>用Session实现登录状态管理。</li>
              <li>实现XSS和SQL注入防护。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/file-exception"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：文件与异常处理
          </a>
          <a
            href="/study/php/db"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数据库操作
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 