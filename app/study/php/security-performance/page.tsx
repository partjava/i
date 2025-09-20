'use client';

import { useState } from 'react';

const tabs = [
  { key: 'security-basic', label: '安全基础' },
  { key: 'vulnerabilities', label: '常见漏洞' },
  { key: 'performance', label: '性能优化' },
  { key: 'caching', label: '缓存策略' },
  { key: 'code-optimization', label: '代码优化' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpSecurityPerformancePage() {
  const [activeTab, setActiveTab] = useState('security-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">安全与性能优化</h1>
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
        {activeTab === 'security-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>输入验证和过滤是安全的基础。</li>
              <li>使用预处理语句防止SQL注入。</li>
              <li>实施适当的访问控制。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 安全基础示例',
  '',
  '// 1. 输入验证和过滤',
  'function sanitize_input($data) {',
  '  $data = trim($data);',
  '  $data = stripslashes($data);',
  '  $data = htmlspecialchars($data, ENT_QUOTES, "UTF-8");',
  '  return $data;',
  '}',
  '',
  '// 2. 使用预处理语句',
  'try {',
  '  $pdo = new PDO("mysql:host=localhost;dbname=test", "username", "password");',
  '  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);',
  '  ',
  '  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");',
  '  $stmt->bindParam(":username", $username, PDO::PARAM_STR);',
  '  $stmt->execute();',
  '} catch (PDOException $e) {',
  '  error_log("数据库错误: " . $e->getMessage());',
  '}',
  '',
  '// 3. 访问控制',
  'function check_permission($user, $required_role) {',
  '  if (!isset($_SESSION["user_role"]) || $_SESSION["user_role"] !== $required_role) {',
  '    header("HTTP/1.1 403 Forbidden");',
  '    exit("Access Denied");',
  '  }',
  '}',
  '',
  '// 4. 密码安全',
  'function hash_password($password) {',
  '  return password_hash($password, PASSWORD_BCRYPT, ["cost" => 12]);',
  '}',
  '',
  'function verify_password($password, $hash) {',
  '  return password_verify($password, $hash);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'vulnerabilities' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见漏洞</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>XSS（跨站脚本）攻击防护。</li>
              <li>CSRF（跨站请求伪造）防护。</li>
              <li>文件上传安全。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 常见漏洞防护示例',
  '',
  '// 1. XSS防护',
  'function xss_protection($data) {',
  '  return htmlspecialchars($data, ENT_QUOTES, "UTF-8");',
  '}',
  '',
  '// 2. CSRF防护',
  'function generate_csrf_token() {',
  '  if (empty($_SESSION["csrf_token"])) {',
  '    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));',
  '  }',
  '  return $_SESSION["csrf_token"];',
  '}',
  '',
  'function validate_csrf_token($token) {',
  '  return isset($_SESSION["csrf_token"]) && hash_equals($_SESSION["csrf_token"], $token);',
  '}',
  '',
  '// 3. 文件上传安全',
  'function secure_file_upload($file) {',
  '  $allowed_types = ["image/jpeg", "image/png"];',
  '  $max_size = 2 * 1024 * 1024; // 2MB',
  '',
  '  // 检查文件类型',
  '  $finfo = finfo_open(FILEINFO_MIME_TYPE);',
  '  $mime_type = finfo_file($finfo, $file["tmp_name"]);',
  '  finfo_close($finfo);',
  '',
  '  if (!in_array($mime_type, $allowed_types)) {',
  '    return false;',
  '  }',
  '',
  '  // 检查文件大小',
  '  if ($file["size"] > $max_size) {',
  '    return false;',
  '  }',
  '',
  '  // 生成安全文件名',
  '  $extension = pathinfo($file["name"], PATHINFO_EXTENSION);',
  '  $filename = bin2hex(random_bytes(16)) . "." . $extension;',
  '',
  '  return move_uploaded_file($file["tmp_name"], "uploads/" . $filename);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'performance' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能优化</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>数据库查询优化。</li>
              <li>代码执行效率优化。</li>
              <li>内存使用优化。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 性能优化示例',
  '',
  '// 1. 数据库查询优化',
  'function optimized_query($pdo) {',
  '  // 使用索引',
  '  $stmt = $pdo->prepare("SELECT * FROM users WHERE status = :status AND created_at > :date");',
  '  $stmt->execute([',
  '    "status" => "active",',
  '    "date" => date("Y-m-d", strtotime("-30 days"))',
  '  ]);',
  '',
  '  // 使用批量插入',
  '  $values = [];',
  '  $params = [];',
  '  foreach ($data as $row) {',
  '    $values[] = "(?, ?, ?)";',
  '    $params = array_merge($params, array_values($row));',
  '  }',
  '  $sql = "INSERT INTO users (name, email, status) VALUES " . implode(",", $values);',
  '  $stmt = $pdo->prepare($sql);',
  '  $stmt->execute($params);',
  '}',
  '',
  '// 2. 代码执行效率',
  'function optimized_loop($array) {',
  '  $count = count($array);',
  '  for ($i = 0; $i < $count; $i++) {',
  '    // 避免在循环中调用函数',
  '    $value = $array[$i];',
  '    // 处理逻辑',
  '  }',
  '}',
  '',
  '// 3. 内存使用优化',
  'function process_large_file($filename) {',
  '  $handle = fopen($filename, "r");',
  '  while (!feof($handle)) {',
  '    $line = fgets($handle);',
  '    // 逐行处理，避免加载整个文件到内存',
  '    process_line($line);',
  '  }',
  '  fclose($handle);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'caching' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">缓存策略</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用OPcache加速PHP执行。</li>
              <li>实现页面缓存。</li>
              <li>使用Redis缓存数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 缓存策略示例',
  '',
  '// 1. OPcache配置',
  '// php.ini',
  'opcache.enable=1',
  'opcache.memory_consumption=128',
  'opcache.interned_strings_buffer=8',
  'opcache.max_accelerated_files=4000',
  'opcache.revalidate_freq=60',
  '',
  '// 2. 页面缓存',
  'function cache_page($key, $content, $ttl = 3600) {',
  '  $cache_file = "cache/" . md5($key) . ".html";',
  '  file_put_contents($cache_file, $content);',
  '  touch($cache_file, time() + $ttl);',
  '}',
  '',
  'function get_cached_page($key) {',
  '  $cache_file = "cache/" . md5($key) . ".html";',
  '  if (file_exists($cache_file) && filemtime($cache_file) > time()) {',
  '    return file_get_contents($cache_file);',
  '  }',
  '  return false;',
  '}',
  '',
  '// 3. Redis缓存',
  'function cache_with_redis($redis) {',
  '  // 设置缓存',
  '  $redis->set("user:1", json_encode($user_data), 3600);',
  '',
  '  // 获取缓存',
  '  $user_data = json_decode($redis->get("user:1"), true);',
  '',
  '  // 使用管道批量操作',
  '  $redis->pipeline()',
  '    ->set("key1", "value1")',
  '    ->set("key2", "value2")',
  '    ->expire("key1", 3600)',
  '    ->expire("key2", 3600)',
  '    ->execute();',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'code-optimization' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">代码优化</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>避免不必要的函数调用。</li>
              <li>使用适当的数据结构。</li>
              <li>优化循环和条件语句。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 代码优化示例',
  '',
  '// 1. 避免不必要的函数调用',
  '// 不好的写法',
  'for ($i = 0; $i < count($array); $i++) {',
  '  // ...',
  '}',
  '',
  '// 好的写法',
  '$count = count($array);',
  'for ($i = 0; $i < $count; $i++) {',
  '  // ...',
  '}',
  '',
  '// 2. 使用适当的数据结构',
  '// 使用数组代替多个变量',
  '$user = [',
  '  "name" => "John",',
  '  "email" => "john@example.com",',
  '  "age" => 30',
  '];',
  '',
  '// 使用SplFixedArray处理固定大小的数组',
  '$array = new SplFixedArray(1000);',
  '',
  '// 3. 优化循环和条件语句',
  '// 提前返回',
  'function process_data($data) {',
  '  if (empty($data)) {',
  '    return false;',
  '  }',
  '',
  '  // 主要逻辑',
  '  return true;',
  '}',
  '',
  '// 使用switch代替多个if',
  'switch ($status) {',
  '  case "active":',
  '    // 处理活跃状态',
  '    break;',
  '  case "inactive":',
  '    // 处理非活跃状态',
  '    break;',
  '  default:',
  '    // 处理默认情况',
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
              <li><b>Q: 如何防止SQL注入？</b><br />A: 使用预处理语句，避免直接拼接SQL。</li>
              <li><b>Q: 如何优化数据库查询？</b><br />A: 使用索引，避免SELECT *，合理使用JOIN。</li>
              <li><b>Q: 如何选择缓存策略？</b><br />A: 根据数据访问频率和更新频率选择合适的缓存方案。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个安全的用户认证系统。</li>
              <li>优化一个存在性能问题的数据库查询。</li>
              <li>设计并实现一个缓存系统。</li>
              <li>重构一段低效的代码。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/extensions-composer"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：常用扩展与包管理
          </a>
          <a
            href="/study/php/testing-debugging"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：测试与调试
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 