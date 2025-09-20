'use client';

import { useState } from 'react';

const tabs = [
  { key: 'if', label: '条件判断' },
  { key: 'loop', label: '循环结构' },
  { key: 'func', label: '函数定义与调用' },
  { key: 'param', label: '参数与返回值' },
  { key: 'closure', label: '匿名函数与闭包' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpControlFunctionsPage() {
  const [activeTab, setActiveTab] = useState('if');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">控制流程与函数</h1>
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
        {activeTab === 'if' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">条件判断</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>if/else、elseif结构</li>
              <li>三元运算符 <code>?:</code></li>
              <li>switch多分支选择</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$a = 10;',
  'if ($a > 5) {',
  '  echo "大于5";',
  '} elseif ($a == 5) {',
  '  echo "等于5";',
  '} else {',
  '  echo "小于5";',
  '}',
  '$b = ($a > 0) ? "正数" : "非正数";',
  'switch ($a) {',
  '  case 1: echo "一"; break;',
  '  case 2: echo "二"; break;',
  '  default: echo "其他";',
  '}',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'loop' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">循环结构</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>for、while、do...while循环</li>
              <li>foreach遍历数组</li>
              <li>break、continue控制循环</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'for ($i = 0; $i < 3; $i++) { echo $i; }',
  '$j = 0;',
  'while ($j < 3) { echo $j; $j++; }',
  '$k = 0;',
  'do { echo $k; $k++; } while ($k < 3);',
  '$arr = [1,2,3];',
  'foreach ($arr as $v) { echo $v; }',
  'foreach ($arr as $i => $v) { echo "$i:$v "; }',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'func' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">函数定义与调用</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>用<code>function</code>定义函数</li>
              <li>函数名区分大小写</li>
              <li>函数可嵌套定义</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'function add($a, $b) {',
  '  return $a + $b;',
  '}',
  'echo add(2, 3);',
  '',
  'function outer() {',
  '  function inner() { return 42; }',
  '  return inner();',
  '}',
  'echo outer();',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'param' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">参数与返回值</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>参数默认值、可变参数</li>
              <li>按值/引用传递</li>
              <li>返回值类型声明（PHP7+）</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'function greet($name = "Tom") {',
  '  return "Hello, $name";',
  '}',
  'function sum(...$nums) {',
  '  return array_sum($nums);',
  '}',
  'function addRef(&$a) { $a++; }',
  '$x = 1; addRef($x);',
  'function foo(): int { return 123; }',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'closure' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">匿名函数与闭包</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>匿名函数可赋值给变量、作为参数传递</li>
              <li>闭包可用<code>use</code>引入外部变量</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '$f = function($x) { return $x * $x; };',
  'echo $f(5);',
  '$y = 10;',
  '$g = function($z) use ($y) { return $z + $y; };',
  'echo $g(2);',
  'function apply($fn, $v) { return $fn($v); }',
  'echo apply(function($n) { return $n*2; }, 6);',
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
  '// if/else',
  '$a = 5;',
  'if ($a > 0) { echo "正数"; }',
  '',
  '// for循环',
  'for ($i=0; $i<3; $i++) { echo $i; }',
  '',
  '// 函数定义与调用',
  'function square($x) { return $x*$x; }',
  'echo square(4);',
  '',
  '// 匿名函数',
  '$f = function($x) { return $x+1; };',
  'echo $f(10);',
  '',
  '// 闭包',
  '$y = 7;',
  '$g = function($z) use ($y) { return $z + $y; };',
  'echo $g(3);',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP函数可以嵌套定义吗？</b><br />A: 可以，函数内部可再定义函数。</li>
              <li><b>Q: 匿名函数和闭包有什么区别？</b><br />A: 闭包可捕获外部变量，匿名函数不一定。</li>
              <li><b>Q: 函数参数如何按引用传递？</b><br />A: 用<code>&amp;</code>修饰参数。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>写一个函数，判断一个数是否为偶数</li>
              <li>用for循环输出1~10的所有奇数</li>
              <li>定义一个匿名函数，实现数组每个元素加1</li>
              <li>用闭包实现累加器函数</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/datatypes"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数据类型与变量
          </a>
          <a
            href="/study/php/arrays-strings"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数组与字符串
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 