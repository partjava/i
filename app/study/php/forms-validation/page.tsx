'use client';

import { useState } from 'react';

const tabs = [
  { key: 'form-basic', label: '表单基础' },
  { key: 'get-post', label: 'GET与POST' },
  { key: 'validation', label: '数据验证' },
  { key: 'file-upload', label: '文件上传' },
  { key: 'security', label: '安全防护' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpFormsValidationPage() {
  const [activeTab, setActiveTab] = useState('form-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">表单处理与数据验证</h1>
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
        {activeTab === 'form-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">表单基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>HTML表单是用户与服务器交互的主要方式。</li>
              <li>表单元素包括：文本框、密码框、单选按钮、复选框等。</li>
              <li>使用<code>$_POST</code>和<code>$_GET</code>获取表单数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<!-- HTML表单示例 -->',
  '<form action="process.php" method="post">',
  '  <div>',
  '    <label for="username">用户名：</label>',
  '    <input type="text" id="username" name="username" required>',
  '  </div>',
  '  <div>',
  '    <label for="email">邮箱：</label>',
  '    <input type="email" id="email" name="email" required>',
  '  </div>',
  '  <div>',
  '    <label for="password">密码：</label>',
  '    <input type="password" id="password" name="password" required>',
  '  </div>',
  '  <div>',
  '    <label>性别：</label>',
  '    <input type="radio" name="gender" value="male"> 男',
  '    <input type="radio" name="gender" value="female"> 女',
  '  </div>',
  '  <div>',
  '    <label>爱好：</label>',
  '    <input type="checkbox" name="hobbies[]" value="reading"> 阅读',
  '    <input type="checkbox" name="hobbies[]" value="music"> 音乐',
  '    <input type="checkbox" name="hobbies[]" value="sports"> 运动',
  '  </div>',
  '  <button type="submit">提交</button>',
  '</form>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'get-post' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">GET与POST</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>GET方法将数据附加到URL，适合非敏感数据。</li>
              <li>POST方法将数据放在请求体中，适合敏感数据。</li>
              <li>使用<code>$_REQUEST</code>可以同时获取GET和POST数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 处理GET请求',
  'if ($_SERVER["REQUEST_METHOD"] === "GET") {',
  '  $search = isset($_GET["search"]) ? $_GET["search"] : "";',
  '  echo "搜索关键词: " . htmlspecialchars($search);',
  '}',
  '',
  '// 处理POST请求',
  'if ($_SERVER["REQUEST_METHOD"] === "POST") {',
  '  $username = isset($_POST["username"]) ? $_POST["username"] : "";',
  '  $password = isset($_POST["password"]) ? $_POST["password"] : "";',
  '  // 处理登录逻辑',
  '}',
  '',
  '// 使用$_REQUEST（不推荐，存在安全风险）',
  '$data = $_REQUEST["data"];',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'validation' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据验证</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>验证用户输入是防止安全漏洞的重要步骤。</li>
              <li>使用<code>filter_var()</code>函数进行数据过滤。</li>
              <li>使用正则表达式进行复杂验证。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  'function validate_form($data) {',
  '  $errors = [];',
  '',
  '  // 验证用户名',
  '  if (empty($data["username"])) {',
  '    $errors["username"] = "用户名不能为空";',
  '  } elseif (strlen($data["username"]) < 3) {',
  '    $errors["username"] = "用户名至少3个字符";',
  '  }',
  '',
  '  // 验证邮箱',
  '  if (empty($data["email"])) {',
  '    $errors["email"] = "邮箱不能为空";',
  '  } elseif (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {',
  '    $errors["email"] = "邮箱格式不正确";',
  '  }',
  '',
  '  // 验证密码',
  '  if (empty($data["password"])) {',
  '    $errors["password"] = "密码不能为空";',
  '  } elseif (strlen($data["password"]) < 6) {',
  '    $errors["password"] = "密码至少6个字符";',
  '  }',
  '',
  '  // 验证手机号（使用正则表达式）',
  '  if (!empty($data["phone"])) {',
  '    if (!preg_match("/^1[3-9]\\d{9}$/", $data["phone"])) {',
  '      $errors["phone"] = "手机号格式不正确";',
  '    }',
  '  }',
  '',
  '  return $errors;',
  '}',
  '',
  '// 使用示例',
  'if ($_SERVER["REQUEST_METHOD"] === "POST") {',
  '  $errors = validate_form($_POST);',
  '  if (empty($errors)) {',
  '    // 处理表单数据',
  '  } else {',
  '    // 显示错误信息',
  '    foreach ($errors as $field => $message) {',
  '      echo "$field: $message<br>";',
  '    }',
  '  }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'file-upload' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件上传</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用<code>$_FILES</code>超全局数组处理文件上传。</li>
              <li>需要设置表单的<code>enctype="multipart/form-data"</code>。</li>
              <li>注意文件类型、大小限制和安全验证。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 文件上传处理函数',
  'function handle_file_upload($file) {',
  '  $allowed_types = ["image/jpeg", "image/png", "image/gif"];',
  '  $max_size = 2 * 1024 * 1024; // 2MB',
  '',
  '  // 检查错误',
  '  if ($file["error"] !== UPLOAD_ERR_OK) {',
  '    return ["error" => "上传失败"];',
  '  }',
  '',
  '  // 检查文件类型',
  '  if (!in_array($file["type"], $allowed_types)) {',
  '    return ["error" => "不支持的文件类型"];',
  '  }',
  '',
  '  // 检查文件大小',
  '  if ($file["size"] > $max_size) {',
  '    return ["error" => "文件太大"];',
  '  }',
  '',
  '  // 生成唯一文件名',
  '  $extension = pathinfo($file["name"], PATHINFO_EXTENSION);',
  '  $filename = uniqid() . "." . $extension;',
  '  $upload_path = "uploads/" . $filename;',
  '',
  '  // 移动文件',
  '  if (move_uploaded_file($file["tmp_name"], $upload_path)) {',
  '    return ["success" => true, "filename" => $filename];',
  '  } else {',
  '    return ["error" => "文件保存失败"];',
  '  }',
  '}',
  '',
  '// 处理上传',
  'if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["avatar"])) {',
  '  $result = handle_file_upload($_FILES["avatar"]);',
  '  if (isset($result["error"])) {',
  '    echo "错误: " . $result["error"];',
  '  } else {',
  '    echo "文件上传成功: " . $result["filename"];',
  '  }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全防护</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>防止XSS（跨站脚本）攻击。</li>
              <li>防止CSRF（跨站请求伪造）攻击。</li>
              <li>使用预处理语句防止SQL注入。</li>
              <li>验证和过滤所有用户输入。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 防止XSS攻击',
  'function sanitize_input($data) {',
  '  $data = trim($data);',
  '  $data = stripslashes($data);',
  '  $data = htmlspecialchars($data);',
  '  return $data;',
  '}',
  '',
  '// 生成CSRF令牌',
  'function generate_csrf_token() {',
  '  if (empty($_SESSION["csrf_token"])) {',
  '    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));',
  '  }',
  '  return $_SESSION["csrf_token"];',
  '}',
  '',
  '// 验证CSRF令牌',
  'function validate_csrf_token($token) {',
  '  return isset($_SESSION["csrf_token"]) && hash_equals($_SESSION["csrf_token"], $token);',
  '}',
  '',
  '// 安全地处理用户输入',
  'function process_form() {',
  '  // 验证CSRF令牌',
  '  if (!validate_csrf_token($_POST["csrf_token"])) {',
  '    die("CSRF验证失败");',
  '  }',
  '',
  '  // 清理输入',
  '  $username = sanitize_input($_POST["username"]);',
  '  $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);',
  '',
  '  // 使用预处理语句防止SQL注入',
  '  $stmt = $pdo->prepare("INSERT INTO users (username, email) VALUES (?, ?)");',
  '  $stmt->execute([$username, $email]);',
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
              <li><b>Q: 如何处理文件上传大小限制？</b><br />A: 修改php.ini中的upload_max_filesize和post_max_size。</li>
              <li><b>Q: 如何防止表单重复提交？</b><br />A: 使用令牌机制或重定向到成功页面。</li>
              <li><b>Q: 表单验证应该在客户端还是服务器端？</b><br />A: 两者都需要，客户端提供即时反馈，服务器端确保安全。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>创建一个用户注册表单，包含完整的验证。</li>
              <li>实现一个文件上传功能，支持图片预览。</li>
              <li>开发一个留言板系统，包含防XSS和CSRF保护。</li>
              <li>创建一个多步骤表单，使用会话保存中间数据。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/session-cookie"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：会话管理与Cookie
          </a>
          <a
            href="/study/php/extensions-composer"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：常用扩展与包管理
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 