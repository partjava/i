'use client';

import { useState } from 'react';

const tabs = [
  { key: 'if', label: 'if/else' },
  { key: 'for', label: 'for循环' },
  { key: 'switch', label: 'switch语句' },
  { key: 'other', label: 'break/continue/goto' },
  { key: 'faq', label: '常见问题' },
];

export default function GoControlPage() {
  const [activeTab, setActiveTab] = useState('if');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言流程控制</h1>
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
            <h2 className="text-2xl font-bold mb-4">if/else 条件判断</h2>
            <p>Go语言的if语句支持条件判断和变量简短声明，else if/else用法与C/Java类似。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 基本用法
if a > 0 {
    fmt.Println("正数")
} else if a == 0 {
    fmt.Println("零")
} else {
    fmt.Println("负数")
}

// 支持在if中声明变量
if b := 10; b > 5 {
    fmt.Println("b大于5")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>if后条件无需括号，代码块必须用{}</li>
              <li>支持在if语句内声明并初始化变量</li>
              <li>else if/else用法与主流语言一致</li>
            </ul>
          </div>
        )}
        {activeTab === 'for' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">for循环</h2>
            <p>Go只有for一种循环语句，可实现C语言的for、while、do-while所有功能。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 经典for循环
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// 作为while用法
n := 1
for n < 5 {
    fmt.Println(n)
    n++
}

// 无限循环
for {
    fmt.Println("无限循环")
    break
}

// 遍历数组/切片/字符串/Map
arr := []int{1, 2, 3}
for idx, val := range arr {
    fmt.Println(idx, val)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>for可省略任意部分，支持多种写法</li>
              <li>range用于遍历数组、切片、字符串、Map等</li>
              <li>没有while和do-while，全部用for实现</li>
            </ul>
          </div>
        )}
        {activeTab === 'switch' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">switch语句</h2>
            <p>Go的switch语句功能强大，支持多分支、表达式、类型分支等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 基本用法
switch day := 3; day {
case 1:
    fmt.Println("Monday")
case 2:
    fmt.Println("Tuesday")
case 3, 4, 5:
    fmt.Println("Midweek")
default:
    fmt.Println("Other")
}

// 类型switch
var x interface{} = 10
switch v := x.(type) {
case int:
    fmt.Println("int", v)
case string:
    fmt.Println("string", v)
default:
    fmt.Println("other")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>case可合并，支持逗号分隔多个值</li>
              <li>支持表达式和类型switch</li>
              <li>case后无需break，自动终止分支</li>
            </ul>
          </div>
        )}
        {activeTab === 'other' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">break / continue / goto</h2>
            <p>Go支持break、continue控制循环流程，goto用于跳转（不推荐频繁使用）。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// break跳出循环
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i)
}

// continue跳过本次循环
for i := 0; i < 5; i++ {
    if i%2 == 0 {
        continue
    }
    fmt.Println(i)
}

// goto跳转
var n = 0
LOOP:
    fmt.Println(n)
    n++
    if n < 3 {
        goto LOOP
    }`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>break跳出最近一层循环</li>
              <li>continue跳过本次循环</li>
              <li>goto可实现跳转，但不推荐滥用</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: for能否实现死循环？</b><br />
                A: 可以，for{}就是死循环。
              </li>
              <li>
                <b>Q: switch能否省略表达式？</b><br />
                A: 可以，switch后无表达式时等价于switch true。
              </li>
              <li>
                <b>Q: goto会不会影响代码可读性？</b><br />
                A: 滥用goto会降低可读性，建议仅用于异常跳转。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/datatypes"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数据类型
          </a>
          <a
            href="/study/go/functions"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：函数与方法
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}