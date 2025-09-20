'use client';

import { useState } from 'react';

const tabs = [
  { key: 'session-basic', label: '会话基础' },
  { key: 'cookie-basic', label: 'Cookie基础' },
  { key: 'security', label: '会话安全' },
  { key: 'practice', label: '实战应用' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpSessionCookiePage() {
  const [activeTab, setActiveTab] = useState('session-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">会话管理与Cookie</h1>
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
        {activeTab === 'session-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">会话基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>会话（Session）用于在服务器端存储用户信息。</li>
              <li>PHP使用<code>session_start()</code>开启会话。</li>
              <li>通过<code>$_SESSION</code>超全局数组访问会话数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 开启会话',
  'session_start();',
  '',
  '// 存储会话数据',
  '$_SESSION["username"] = "admin";',
  '$_SESSION["login_time"] = time();',
  '',
  '// 读取会话数据',
  'echo "欢迎, " . $_SESSION["username"];',
  '',
  '// 删除会话数据',
  'unset($_SESSION["username"]);',
  '',
  '// 销毁整个会话',
  'session_destroy();',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'cookie-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Cookie基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cookie用于在客户端存储用户信息。</li>
              <li>使用<code>setcookie()</code>函数设置Cookie。</li>
              <li>通过<code>$_COOKIE</code>超全局数组访问Cookie数据。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 设置Cookie',
  'setcookie("username", "admin", time() + 3600, "/");',
  'setcookie("theme", "dark", time() + 86400, "/");',
  '',
  '// 读取Cookie',
  'if (isset($_COOKIE["username"])) {',
  '  echo "欢迎回来, " . $_COOKIE["username"];',
  '}',
  '',
  '// 删除Cookie',
  'setcookie("username", "", time() - 3600, "/");',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">会话安全</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>会话劫持和会话固定是常见的安全威胁。</li>
              <li>使用HTTPS传输会话数据。</li>
              <li>设置适当的会话过期时间。</li>
              <li>使用安全的Cookie设置。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 安全的会话配置',
  'ini_set("session.cookie_httponly", 1);',
  'ini_set("session.cookie_secure", 1);',
  'ini_set("session.cookie_samesite", "Strict");',
  '',
  '// 设置会话过期时间',
  'ini_set("session.gc_maxlifetime", 3600);',
  '',
  '// 生成新的会话ID',
  'session_regenerate_id(true);',
  '',
  '// 存储用户IP和User-Agent',
  '$_SESSION["user_ip"] = $_SERVER["REMOTE_ADDR"];',
  '$_SESSION["user_agent"] = $_SERVER["HTTP_USER_AGENT"];',
  '',
  '// 验证会话',
  'function validate_session() {',
  '  if ($_SESSION["user_ip"] !== $_SERVER["REMOTE_ADDR"] ||',
  '      $_SESSION["user_agent"] !== $_SERVER["HTTP_USER_AGENT"]) {',
  '    session_destroy();',
  '    return false;',
  '  }',
  '  return true;',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实战应用</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>实现用户登录系统。</li>
              <li>记住登录状态功能。</li>
              <li>购物车功能。</li>
              <li>多语言切换。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 用户登录示例',
  'session_start();',
  '',
  'function login($username, $password) {',
  '  // 验证用户凭据',
  '  if (validate_credentials($username, $password)) {',
  '    $_SESSION["logged_in"] = true;',
  '    $_SESSION["username"] = $username;',
  '    $_SESSION["last_activity"] = time();',
  '    return true;',
  '  }',
  '  return false;',
  '}',
  '',
  '// 记住登录状态',
  'function remember_login($username) {',
  '  $token = bin2hex(random_bytes(32));',
  '  setcookie("remember_token", $token, time() + 86400 * 30, "/", "", true, true);',
  '  // 存储token到数据库',
  '  store_token($username, $token);',
  '}',
  '',
  '// 购物车功能',
  'function add_to_cart($product_id, $quantity) {',
  '  if (!isset($_SESSION["cart"])) {',
  '    $_SESSION["cart"] = [];',
  '  }',
  '  $_SESSION["cart"][$product_id] = $quantity;',
  '}',
  '',
  '// 语言切换',
  'function set_language($lang) {',
  '  setcookie("language", $lang, time() + 86400 * 365, "/");',
  '  $_SESSION["language"] = $lang;',
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
              <li><b>Q: 会话和Cookie有什么区别？</b><br />A: 会话数据存储在服务器端，Cookie存储在客户端。会话更安全，但Cookie可以持久化。</li>
              <li><b>Q: 如何防止会话劫持？</b><br />A: 使用HTTPS、设置HttpOnly和Secure标志、验证用户IP和User-Agent。</li>
              <li><b>Q: Cookie的最大存储限制是多少？</b><br />A: 通常为4KB，不同浏览器可能有差异。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个简单的用户登录系统，包含会话管理。</li>
              <li>添加"记住我"功能，使用安全的Cookie实现。</li>
              <li>创建一个购物车系统，使用会话存储商品信息。</li>
              <li>实现多语言切换功能，使用Cookie记住用户的语言偏好。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/db"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数据库操作
          </a>
          <a
            href="/study/php/forms-validation"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：表单处理与数据验证
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 