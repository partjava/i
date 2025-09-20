'use client';

import { useState } from 'react';

const tabs = [
  { key: 'base', label: '接口基础' },
  { key: 'impl', label: '接口实现与多态' },
  { key: 'assert', label: '类型断言与类型判断' },
  { key: 'empty', label: '空接口与泛型' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoInterfacesPage() {
  const [activeTab, setActiveTab] = useState('base');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言接口与类型系统</h1>
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
            <h2 className="text-2xl font-bold mb-4">接口基础</h2>
            <p>接口（interface）是Go语言实现多态和解耦的重要机制。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 定义接口
type Speaker interface {
    Speak() string
}

// 实现接口
type Cat struct{}
func (c Cat) Speak() string { return "喵" }

type Dog struct{}
func (d Dog) Speak() string { return "汪" }

// 使用接口
func makeSound(s Speaker) {
    fmt.Println(s.Speak())
}

makeSound(Cat{}) // 喵
makeSound(Dog{}) // 汪`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>接口只定义方法签名，不实现具体功能。</li>
              <li>类型只要实现接口的所有方法即可视为实现该接口（隐式实现）。</li>
            </ul>
          </div>
        )}
        {activeTab === 'impl' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">接口实现与多态</h2>
            <p>Go接口实现是隐式的，支持多态和接口嵌套。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Animal interface {
    Speak() string
}

type Bird struct{}
func (b Bird) Speak() string { return "啾" }

// 多态
var a Animal

// 可以赋值为任何实现了Animal接口的类型
a = Bird{}
fmt.Println(a.Speak()) // 啾

a = Cat{}
fmt.Println(a.Speak()) // 喵

// 接口嵌套
type ReadWriter interface {
    Reader
    Writer
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>接口变量可存放任何实现了该接口的类型。</li>
              <li>接口可嵌套组合，形成更复杂的接口。</li>
            </ul>
          </div>
        )}
        {activeTab === 'assert' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">类型断言与类型判断</h2>
            <p>类型断言用于将接口类型转换为具体类型，类型判断用于分支处理。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`var i interface{} = "hello"
// 类型断言
s, ok := i.(string)
if ok {
    fmt.Println("字符串：", s)
}

// 类型switch
switch v := i.(type) {
case int:
    fmt.Println("int", v)
case string:
    fmt.Println("string", v)
default:
    fmt.Println("other")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>类型断言格式：<code>value, ok := i.(T)</code></li>
              <li>类型switch可判断接口变量的真实类型。</li>
            </ul>
          </div>
        )}
        {activeTab === 'empty' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">空接口与泛型</h2>
            <p>空接口<code>interface&#123;&#125;</code>可表示任意类型，Go1.18+支持泛型。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 空接口可以存放任意类型
defaultValue := func(val interface{}) {
    fmt.Println(val)
}
defaultValue(123)
defaultValue("abc")

type Any interface{}

// 泛型（Go1.18+）
func PrintSlice[T any](s []T) {
    for _, v := range s {
        fmt.Println(v)
    }
}
PrintSlice([]int{1,2,3})
PrintSlice([]string{"a","b"})`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>空接口可用于容器、反射等场景。</li>
              <li>泛型用<code>[T any]</code>定义类型参数。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现一个接口，支持不同形状计算面积</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Shape interface {
    Area() float64
}

type Circle struct{R float64}
func (c Circle) Area() float64 { return 3.14 * c.R * c.R }

type Rect struct{W, H float64}
func (r Rect) Area() float64 { return r.W * r.H }

func printArea(s Shape) {
    fmt.Println(s.Area())
}

printArea(Circle{2}) // 12.56
printArea(Rect{3,4}) // 12`}
            </pre>
            <p className="mb-2 font-semibold">例题2：用类型断言实现通用加法函数</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func add(a, b interface{}) interface{} {
    switch x := a.(type) {
    case int:
        return x + b.(int)
    case float64:
        return x + b.(float64)
    default:
        return nil
    }
}
fmt.Println(add(1,2))      // 3
fmt.Println(add(1.1,2.2))  // 3.3`}
            </pre>
            <p className="mb-2 font-semibold">练习：用泛型实现交换任意类型的两个元素</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func swap[T any](a, b T) (T, T) {
    return b, a
}
fmt.Println(swap(1,2))         // 2 1
fmt.Println(swap("a","b"))   // b a`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 一个类型能实现多个接口吗？</b><br />
                A: 可以，Go支持多接口实现。
              </li>
              <li>
                <b>Q: 接口变量为nil会怎样？</b><br />
                A: 接口变量未赋值时为nil，调用方法会panic。
              </li>
              <li>
                <b>Q: 泛型和空接口的区别？</b><br />
                A: 泛型有类型检查，空接口无类型检查，泛型更安全高效。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/map-struct"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：Map与结构体
          </a>
          <a
            href="/study/go/concurrency"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：并发编程
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}