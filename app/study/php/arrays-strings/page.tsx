'use client';

import { useState } from 'react';

const tabs = [
  { key: 'array-basic', label: '数组基础' },
  { key: 'array-func', label: '数组操作函数' },
  { key: 'string-basic', label: '字符串基础' },
  { key: 'string-func', label: '字符串操作函数' },
  { key: 'convert', label: '数组与字符串互转' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpArraysStringsPage() {
  const [activeTab, setActiveTab] = useState('array-basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">数组与字符串</h1>
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
        {activeTab === 'array-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数组基础</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>索引数组、关联数组、二维数组</li>
              <li>数组声明与初始化</li>
              <li>数组遍历与访问</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$arr = [1, 2, 3];',
  '$assoc = ["name" => "Tom", "age" => 18];',
  '$matrix = [[1,2],[3,4]];',
  'foreach ($arr as $v) { echo $v; }',
  'foreach ($assoc as $k => $v) { echo "$k=$v "; }',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'array-func' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数组操作函数</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>常用函数：<code>count</code>、<code>array_push</code>、<code>array_pop</code>、<code>array_merge</code>、<code>in_array</code>、<code>array_map</code></li>
              <li>数组排序：<code>sort</code>、<code>asort</code>、<code>ksort</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$arr = [3,1,2];',
  'sort($arr);',
  'array_push($arr, 4);',
  '$last = array_pop($arr);',
  '$new = array_map(function($x){return $x*2;}, $arr);',
  'if (in_array(2, $arr)) { echo "有2"; }',
  '$merged = array_merge($arr, [5,6]);',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'string-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">字符串基础</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>单引号、双引号字符串</li>
              <li>转义字符与变量插值</li>
              <li>字符串拼接<code>.</code>与模板变量<code>"Hello, $name"</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$s1 = "hello";',
  '$s2 = "world";',
  '$s3 = $s1 . ", " . $s2;',
  '$name = "Tom";',
  'echo "Hello, $name";',
  'echo \\"转义\\";',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'string-func' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">字符串操作函数</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>常用函数：<code>strlen</code>、<code>strpos</code>、<code>substr</code>、<code>str_replace</code>、<code>explode</code>、<code>implode</code></li>
              <li>大小写转换：<code>strtolower</code>、<code>strtoupper</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$s = "Hello, World!";',
  'echo strlen($s);',
  'echo strpos($s, "World");',
  'echo substr($s, 0, 5);',
  'echo str_replace("World", "PHP", $s);',
  'echo strtolower($s);',
  'echo strtoupper($s);',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'convert' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数组与字符串互转</h2>
            <ul className="list-disc pl-6 mt-2">
              <li><code>explode</code>：字符串转数组</li>
              <li><code>implode</code>：数组转字符串</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$s = "a,b,c";',
  '$arr = explode(",", $s);',
  'echo implode("-", $arr);',
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
  '// 数组操作',
  '$arr = [1,2,3];',
  'array_push($arr, 4);',
  'sort($arr);',
  'foreach ($arr as $v) { echo $v; }',
  '',
  '// 字符串操作',
  '$s = "hello,php";',
  '$parts = explode(",", $s);',
  'echo implode("-", $parts);',
  'echo strtoupper($s);',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP数组和字符串能互转吗？</b><br />A: 用explode和implode即可实现。</li>
              <li><b>Q: 如何判断字符串中是否包含某子串？</b><br />A: 用strpos函数，返回不为false即包含。</li>
              <li><b>Q: 数组遍历时如何同时获得下标和值？</b><br />A: 用foreach($arr as $k =&gt; $v)。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>定义一个关联数组，输出所有键值对</li>
              <li>用sort对数组排序并输出</li>
              <li>将字符串"a,b,c"转为数组并用-连接输出</li>
              <li>统计字符串长度并将其全部转为大写</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/control-functions"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：控制流程与函数
          </a>
          <a
            href="/study/php/oop"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：面向对象编程
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 