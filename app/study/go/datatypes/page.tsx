'use client';

import { useState } from 'react';

const tabs = [
  { key: 'base', label: '基本类型' },
  { key: 'composite', label: '复合类型' },
  { key: 'convert', label: '类型转换' },
  { key: 'zero', label: '零值与默认值' },
  { key: 'faq', label: '常见问题' },
];

export default function GoDatatypesPage() {
  const [activeTab, setActiveTab] = useState('base');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言数据类型</h1>
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
        {activeTab === 'base' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">基本类型</h2>
            <p>Go语言内置多种基本数据类型：</p>
            <ul className="list-disc pl-6 mb-2">
              <li>整型：int、int8、int16、int32、int64、uint、uint8、uint16、uint32、uint64</li>
              <li>浮点型：float32、float64</li>
              <li>布尔型：bool</li>
              <li>字符串型：string</li>
              <li>字节型：byte（uint8的别名）、rune（int32的别名，表示Unicode字符）</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 整型
var a int = 10
var b uint8 = 255

// 浮点型
var f1 float32 = 3.14
var f2 float64 = 2.71828

// 布尔型
var flag bool = true

// 字符串型
var s string = "Hello, Go!"

// 字节和rune
var ch byte = 'A'      // 单个字节
var uni rune = '中'    // Unicode字符

// 打印类型和值
fmt.Printf("%T %v\n", a, a) // int 10
fmt.Printf("%T %v\n", uni, uni) // int32 20013`}
            </pre>
          </div>
        )}
        {activeTab === 'composite' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">复合类型</h2>
            <p>Go支持多种复合数据类型：</p>
            <ul className="list-disc pl-6 mb-2">
              <li>数组（Array）</li>
              <li>切片（Slice）</li>
              <li>映射（Map）</li>
              <li>结构体（Struct）</li>
              <li>指针（Pointer）</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 数组
var arr [3]int = [3]int{1, 2, 3}
// 切片
s := []string{"Go", "Python", "Java"}
// Map
m := map[string]int{"Tom": 18, "Jerry": 20}
// 结构体
type Person struct {
    Name string
    Age  int
}
p := Person{Name: "Alice", Age: 25}
// 指针
var ptr *int = &arr[0] // 指向数组第一个元素的指针`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>数组长度固定，切片长度可变。</li>
              <li>Map是键值对集合，常用于字典。</li>
              <li>结构体可自定义复杂数据结构。</li>
              <li>指针用于存储变量地址，Go不支持指针运算。</li>
            </ul>
          </div>
        )}
        {activeTab === 'convert' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">类型转换</h2>
            <p>Go语言不支持隐式类型转换，必须显式转换：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`var a int = 10
var b float64 = float64(a) // int转float64
var c string = string('A') // rune转string，结果为"A"

// 字符串和数字互转
s := "123"
num, err := strconv.Atoi(s) // 字符串转int
s2 := strconv.Itoa(456)     // int转字符串

// 注意：类型不兼容时需用标准库函数转换
`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>基本类型间可用强制转换。</li>
              <li>字符串和数字转换需用 <code>strconv</code> 包。</li>
              <li>类型不兼容时编译报错。</li>
            </ul>
          </div>
        )}
        {activeTab === 'zero' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">零值与默认值</h2>
            <p>Go语言的变量声明后若未赋值，会自动赋予类型的零值：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`var a int        // 0
var b float64     // 0
var s string      // ""
var flag bool     // false
var arr [3]int    // [0 0 0]
var m map[string]int // nil
var p *int        // nil`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>数值类型零值为0，布尔型为false，字符串为""。</li>
              <li>切片、map、指针、接口等复合类型零值为nil。</li>
              <li>使用零值可避免未初始化带来的bug。</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: Go的字符串是可变的吗？</b><br />
                A: 不可变，字符串一旦创建内容不可更改。
              </li>
              <li>
                <b>Q: 切片和数组的区别？</b><br />
                A: 数组长度固定，切片长度可变且更常用。
              </li>
              <li>
                <b>Q: 如何判断map中key是否存在？</b><br />
                A: 用 <code>v, ok := m[key]</code> 判断ok值。
              </li>
              <li>
                <b>Q: 指针会不会有野指针？</b><br />
                A: Go的指针安全，不支持指针运算，野指针风险极低。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/basic"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：基础语法
          </a>
          <a
            href="/study/go/control"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：流程控制
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}