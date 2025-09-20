'use client';

import { useState } from 'react';

const tabs = [
  { key: 'syntax', label: '语法基础' },
  { key: 'var', label: '变量与常量' },
  { key: 'type', label: '数据类型' },
  { key: 'cast', label: '类型转换' },
  { key: 'op', label: '运算符' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpBasicPage() {
  const [activeTab, setActiveTab] = useState('syntax');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">基础语法与数据类型</h1>
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
        {activeTab === 'syntax' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">语法基础</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>PHP脚本以<code>&lt;?php ... ?&gt;</code>包裹</li>
              <li>每条语句以分号<code>;</code>结尾</li>
              <li>注释：<code>// 单行</code>、<code>/* 多行 */</code></li>
              <li>区分大小写（变量、函数名区分，关键字不区分）</li>
            </ul>
          </div>
        )}
        {activeTab === 'var' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">变量与常量</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>变量以<code>$</code>开头，动态类型</li>
              <li>常量用<code>define('NAME', value)</code>或<code>const NAME = value</code>定义</li>
              <li>变量名区分大小写，不能以数字开头</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$name = "Tom";',
  'define("PI", 3.14);',
  'const VERSION = "1.0";',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'type' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据类型</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>标量类型：int、float、string、bool</li>
              <li>复合类型：array、object、callable、iterable</li>
              <li>特殊类型：null、resource</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = 123;',
  '$b = 3.14;',
  '$c = "hello";',
  '$d = true;',
  '$arr = [1, 2, 3];',
  '$obj = (object)["x" => 1];',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'cast' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">类型转换</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>自动类型转换：根据上下文自动转换</li>
              <li>强制类型转换：<code>(int)</code>、<code>(float)</code>、<code>(string)</code>等</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = "123";',
  '$b = (int)$a;',
  '$c = (float)"3.14";',
  '$d = (string)123;',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'op' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">运算符</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>算术：<code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code></li>
              <li>赋值：<code>=</code> <code>+=</code> <code>-=</code> <code>*=</code> <code>/=</code></li>
              <li>比较：<code>==</code> <code>===</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code></li>
              <li>逻辑：<code>&&</code> <code>||</code> <code>!</code></li>
              <li>字符串拼接：<code>.</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = 1 + 2;',
  '$b = $a * 3;',
  '$c = ($a == $b);',
  '$d = ($a === $b);',
  '$s = "hello" . " world";',
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
  '// 变量与类型',
  '$name = "Alice";',
  '$age = 20;',
  '$score = 88.5;',
  '$isVip = true;',
  '',
  '// 数组',
  '$arr = [1, 2, 3];',
  'foreach ($arr as $v) {',
  '  echo $v . ", ";',
  '}',
  '',
  '// 字符串拼接',
  'echo "Hello, " . $name;',
  '',
  '// 常量',
  'define("PI", 3.14);',
  'echo PI;',
  '',
  '// 类型转换',
  '$a = "123";',
  '$b = (int)$a;',
  'echo $b + 1;',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP变量需要声明类型吗？</b><br />A: 不需要，PHP为动态类型语言。</li>
              <li><b>Q: == 和 === 有什么区别？</b><br />A: == 比较值，=== 比较值和类型。</li>
              <li><b>Q: 如何查看变量类型？</b><br />A: 用 <code>var_dump($var)</code>。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>定义一个变量，赋值你的姓名，并输出</li>
              <li>定义一个数组，遍历输出所有元素</li>
              <li>尝试用类型转换将字符串"100"转为整数并加1</li>
              <li>用var_dump输出任意变量的类型和值</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/setup"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：开发环境配置
          </a>
          <a
            href="/study/php/datatypes"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数据类型与变量
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 