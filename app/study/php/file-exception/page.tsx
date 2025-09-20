'use client';

import { useState } from 'react';

const tabs = [
  { key: 'file-basic', label: '文件操作基础' },
  { key: 'file-rw', label: '文件读写' },
  { key: 'exception', label: '异常处理' },
  { key: 'file-exception', label: '文件与异常结合' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpFileExceptionPage() {
  const [activeTab, setActiveTab] = useState('file-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">文件与异常处理</h1>
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
        {activeTab === 'file-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件操作基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP通过内置函数进行文件操作，如<code>fopen</code>、<code>fclose</code>、<code>fread</code>、<code>fwrite</code>等。</li>
              <li>常用模式：<code>r</code>（只读）、<code>w</code>（只写）、<code>a</code>（追加）、<code>r+</code>（读写）。</li>
              <li>文件操作前建议判断文件是否存在：<code>file_exists</code>。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 检查文件是否存在',
  'if (file_exists("test.txt")) {',
  '  echo "文件存在";',
  '} else {',
  '  echo "文件不存在";',
  '}',
  '',
  '// 打开文件（只读）',
  '$handle = fopen("test.txt", "r");',
  'if ($handle) {',
  '  // 关闭文件',
  '  fclose($handle);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'file-rw' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件读写</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>读取文件内容：<code>fread</code>、<code>file_get_contents</code>。</li>
              <li>写入文件内容：<code>fwrite</code>、<code>file_put_contents</code>。</li>
              <li>逐行读取：<code>fgets</code>。</li>
              <li>文件指针操作：<code>feof</code>、<code>rewind</code>。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 读取整个文件内容',
  '$content = file_get_contents("test.txt");',
  'echo $content;',
  '',
  '// 逐行读取文件',
  '$handle = fopen("test.txt", "r");',
  'if ($handle) {',
  '  while (($line = fgets($handle)) !== false) {',
  '    echo $line;',
  '  }',
  '  fclose($handle);',
  '}',
  '',
  '// 写入文件',
  '$handle = fopen("test.txt", "w");',
  'if ($handle) {',
  '  fwrite($handle, "Hello, world!\n");',
  '  fclose($handle);',
  '}',
  '',
  '// 追加内容',
  'file_put_contents("test.txt", "追加内容\n", FILE_APPEND);',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'exception' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">异常处理</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP通过<code>try...catch</code>结构进行异常捕获。</li>
              <li>抛出异常用<code>throw new Exception()</code>。</li>
              <li>可自定义异常类继承自<code>Exception</code>。</li>
              <li>finally块用于收尾操作。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  'try {',
  '  // 可能抛出异常的代码',
  '  throw new Exception("发生错误");',
  '} catch (Exception $e) {',
  '  echo "捕获异常: " . $e->getMessage();',
  '} finally {',
  '  echo "无论如何都会执行";',
  '}',
  '',
  '// 自定义异常类',
  'class MyException extends Exception {}',
  'try {',
  '  throw new MyException("自定义异常");',
  '} catch (MyException $e) {',
  '  echo $e->getMessage();',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'file-exception' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件与异常结合</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>文件操作时应结合异常处理，提升健壮性。</li>
              <li>可针对文件不存在、权限不足等情况抛出异常。</li>
              <li>资源释放建议放在<code>finally</code>中。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  'function readFileSafe($filename) {',
  '  if (!file_exists($filename)) {',
  '    throw new Exception("文件不存在");',
  '  }',
  '  $handle = fopen($filename, "r");',
  '  if (!$handle) {',
  '    throw new Exception("无法打开文件");',
  '  }',
  '  try {',
  '    $content = fread($handle, filesize($filename));',
  '    return $content;',
  '  } finally {',
  '    fclose($handle); // 保证资源释放',
  '  }',
  '}',
  '',
  'try {',
  '  $data = readFileSafe("test.txt");',
  '  echo $data;',
  '} catch (Exception $e) {',
  '  echo $e->getMessage();',
  '}',
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
  '// 读取文件并处理异常，带详细注释',
  'function loadConfig($file) {',
  '  // 检查文件是否存在',
  '  if (!file_exists($file)) {',
  '    throw new Exception("配置文件不存在");',
  '  }',
  '  $handle = fopen($file, "r");',
  '  if (!$handle) {',
  '    throw new Exception("无法打开配置文件");',
  '  }',
  '  $config = "";',
  '  try {',
  '    while (($line = fgets($handle)) !== false) {',
  '      $config .= $line;',
  '    }',
  '    if (!feof($handle)) {',
  '      throw new Exception("读取配置文件出错");',
  '    }',
  '    return $config;',
  '  } finally {',
  '    fclose($handle); // 关闭文件句柄',
  '  }',
  '}',
  '',
  'try {',
  '  $cfg = loadConfig("config.ini");',
  '  echo $cfg;',
  '} catch (Exception $e) {',
  '  echo "错误: " . $e->getMessage();',
  '}',
  '',
  '// 写文件并处理异常',
  'function saveLog($msg) {',
  '  $file = "log.txt";',
  '  $handle = fopen($file, "a");',
  '  if (!$handle) {',
  '    throw new Exception("无法写入日志");',
  '  }',
  '  try {',
  '    fwrite($handle, date("Y-m-d H:i:s ") . $msg . "\n");',
  '  } finally {',
  '    fclose($handle);',
  '  }',
  '}',
  'try {',
  '  saveLog("用户登录");',
  '} catch (Exception $e) {',
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
              <li><b>Q: 文件操作失败时如何处理？</b><br />A: 建议结合异常处理，及时抛出并捕获异常，避免程序崩溃。</li>
              <li><b>Q: 如何优雅关闭文件？</b><br />A: 推荐用<code>finally</code>块关闭文件句柄，确保资源释放。</li>
              <li><b>Q: PHP7+的异常处理和早期有何不同？</b><br />A: PHP7引入<code>Throwable</code>接口，<code>Error</code>和<code>Exception</code>都可被catch。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>编写一个函数，安全读取指定文件内容，要求用异常处理。</li>
              <li>实现一个日志写入函数，写入失败时抛出异常。</li>
              <li>模拟文件不存在、权限不足等异常场景并处理。</li>
              <li>用finally块确保文件资源被正确释放。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/oop"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：面向对象编程
          </a>
          <a
            href="/study/php/web"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：Web开发基础
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 