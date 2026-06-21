'use client';

import { useState } from 'react';

const tabs = [
  { key: 'type', label: '数据类型详解' },
  { key: 'scope', label: '变量作用域' },
  { key: 'cast', label: '类型判断与转换' },
  { key: 'array', label: '数组操作' },
  { key: 'string', label: '字符串操作' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpDatatypesPage() {
  const [activeTab, setActiveTab] = useState('type');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">数据类型与变量</h1>
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
        {activeTab === 'type' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据类型详解</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>标量类型：int、float、string、bool</li>
              <li>复合类型：array、object、callable、iterable</li>
              <li>特殊类型：null、resource</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = 42;',
  '$b = 3.14;',
  '$c = "hello";',
  '$d = false;',
  '$arr = [1, 2, 3];',
  '$obj = (object)["x" => 1, "y" => 2];',
  '$f = function($x) { return $x * $x; };',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'scope' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">变量作用域</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>全局变量、局部变量、静态变量</li>
              <li>函数内访问全局变量需用<code>global</code>关键字或<code>$GLOBALS</code>数组</li>
              <li>静态变量用<code>static</code>声明，函数调用间保留值</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$x = 10;',
  'function foo() {',
  '  global $x;',
  '  static $count = 0;',
  '  $count++;',
  '  echo $x + $count;',
  '}',
  'foo(); // 输出11',
  'foo(); // 输出12',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'cast' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">类型判断与转换</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>类型判断：<code>is_int</code>、<code>is_string</code>、<code>is_array</code>等</li>
              <li>类型转换：<code>(int)</code>、<code>(string)</code>、<code>intval()</code>、<code>strval()</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = "123";',
  'if (is_string($a)) {',
  '  $b = (int)$a;',
  '  echo $b + 1;',
  '}',
  '$c = 3.14;',
  'echo intval($c); // 3',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'array' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数组操作</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>索引数组、关联数组、二维数组</li>
              <li>常用函数：<code>count</code>、<code>array_push</code>、<code>array_merge</code>、<code>in_array</code>、<code>array_map</code></li>
              <li>遍历：<code>foreach</code>、<code>for</code>、<code>while</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$arr = [1, 2, 3];',
  '$assoc = ["name" => "Tom", "age" => 18];',
  'array_push($arr, 4);',
  '$merged = array_merge($arr, [5, 6]);',
  'foreach ($assoc as $k => $v) {',
  '  echo "$k=$v ";',
  '}',
  'if (in_array(2, $arr)) { echo "有2"; }',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'string' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">字符串操作</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>拼接：<code>.</code>，模板变量<code>"Hello, $name"</code></li>
              <li>常用函数：<code>strlen</code>、<code>strpos</code>、<code>substr</code>、<code>str_replace</code>、<code>explode</code>、<code>implode</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$s = "Hello, world!";',
  'echo strlen($s); // 13',
  'echo strpos($s, "world"); // 7',
  'echo substr($s, 0, 5); // Hello',
  '$arr = explode(",", "a,b,c");',
  'echo implode("-", $arr); // a-b-c',
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
  '// 变量与作用域',
  '$g = 100;',
  'function test() {',
  '  global $g;',
  '  static $cnt = 0;',
  '  $cnt++;',
  '  echo $g + $cnt;',
  '}',
  'test(); // 101',
  'test(); // 102',
  '',
  '// 数组操作',
  '$arr = [1,2,3];',
  'array_push($arr, 4);',
  'foreach ($arr as $v) { echo $v; }',
  '',
  '// 字符串操作',
  '$s = "abc,def,ghi";',
  '$parts = explode(",", $s);',
  'echo implode("-", $parts);',
  '',
  '// 类型判断',
  '$x = "123";',
  'if (is_string($x)) { echo "字符串"; }',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP数组和Python列表有何区别？</b><br />A: PHP数组既可做索引数组也可做字典，功能更灵活。</li>
              <li><b>Q: 如何判断变量类型？</b><br />A: 用is_xxx函数，如is_array、is_string等。</li>
              <li><b>Q: 变量作用域如何理解？</b><br />A: 全局、局部、静态变量作用范围不同，注意global/static关键字。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>定义一个全局变量和一个函数，函数内累加并输出该变量</li>
              <li>定义一个关联数组，遍历输出所有键值对</li>
              <li>用explode和implode实现字符串与数组的互转</li>
              <li>判断一个变量是否为数组并输出结果</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/basic"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：基础语法与数据类型
          </a>
          <a
            href="/study/php/control-functions"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：控制流程与函数
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 