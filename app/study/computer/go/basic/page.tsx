'use client';

import { useState } from 'react';

const tabs = [
  { key: 'structure', label: 'Go程序结构' },
  { key: 'varconst', label: '变量与常量' },
  { key: 'types', label: '基本数据类型' },
  { key: 'ops', label: '运算符与表达式' },
  { key: 'io', label: '输入输出' },
  { key: 'faq', label: '常见问题' },
];

export default function GoBasicPage() {
  const [activeTab, setActiveTab] = useState('structure');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言基础语法</h1>
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
        {activeTab === 'structure' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Go程序结构</h2>
            <p>Go程序由包声明、导入、函数等组成，main包为程序入口。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>每个Go文件必须属于一个包（package）。</li>
              <li>main包和main函数是可执行程序的入口。</li>
              <li>import用于导入标准库或第三方包。</li>
            </ul>
          </div>
        )}
        {activeTab === 'varconst' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">变量与常量</h2>
            <p>Go支持多种变量声明方式和常量定义。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`var a int = 10
var b = 20 // 类型自动推断
c := 30    // 简短声明

const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>var声明变量，可指定类型或自动推断。</li>
              <li>:=为简短声明，只能在函数体内使用。</li>
              <li>const定义常量，值不可变。</li>
            </ul>
          </div>
        )}
        {activeTab === 'types' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">基本数据类型</h2>
            <p>Go内置多种基本类型。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 整型
var i int = 100
var u uint = 200

// 浮点型
var f float64 = 3.14

// 布尔型
var b bool = true

// 字符串
var s string = "Go语言"

// 零值
var x int    // 0
var y string // ""`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>int/uint/float/bool/string为常用类型。</li>
              <li>变量声明未赋值时有零值。</li>
            </ul>
          </div>
        )}
        {activeTab === 'ops' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">运算符与表达式</h2>
            <p>Go支持算术、关系、逻辑、位运算等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`a, b := 5, 2
sum := a + b      // 加法
sub := a - b      // 减法
mul := a * b      // 乘法
div := a / b      // 除法
mod := a % b      // 取余

eq := a == b      // 相等
neq := a != b     // 不等
and := a > 0 && b > 0 // 逻辑与
or := a > 0 || b > 0  // 逻辑或
not := !(a > 0)       // 逻辑非`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>支持常见算术、关系、逻辑运算。</li>
              <li>还支持位运算（&、|、^、&^、、）。</li>
            </ul>
          </div>
        )}
        {activeTab === 'io' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">输入输出</h2>
            <p>Go常用fmt包进行输入输出。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "fmt"

func main() {
    var name string
    fmt.Print("请输入姓名：")
    fmt.Scanln(&name)
    fmt.Println("你好，", name)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>fmt.Print/Println输出内容。</li>
              <li>fmt.Scan/Scanln读取输入。</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: Go变量必须先声明再使用吗？</b><br />A: 是的，Go是强类型语言，变量必须声明。</li>
              <li><b>Q: :=和var的区别？</b><br />A: :=只能在函数体内用，var可全局或局部。</li>
              <li><b>Q: 字符串能用单引号吗？</b><br />A: 不行，Go字符串必须用双引号，单引号用于rune。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/setup"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：环境搭建
          </a>
          <a
            href="/study/go/datatypes"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数据类型
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 