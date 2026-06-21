'use client';

import { useState } from 'react';

const tabs = [
  { key: 'def', label: '函数定义与调用' },
  { key: 'param', label: '参数与返回值' },
  { key: 'method', label: '方法与接收者' },
  { key: 'closure', label: '匿名函数与闭包' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoFunctionsPage() {
  const [activeTab, setActiveTab] = useState('def');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言函数与方法</h1>
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
        {activeTab === 'def' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">函数定义与调用</h2>
            <p>Go语言用<code>func</code>关键字定义函数，函数可以有多个参数和返回值。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 定义一个无参无返回值的函数
func sayHello() {
    fmt.Println("Hello, Go!")
}

// 定义有参有返回值的函数
func add(a int, b int) int {
    return a + b
}

// 调用函数
sayHello()
sum := add(3, 5)
fmt.Println(sum) // 输出8`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>函数名建议用小写字母开头（包外可见用大写）。</li>
              <li>参数类型可合并：<code>func add(a, b int)</code></li>
              <li>Go支持多返回值。</li>
            </ul>
          </div>
        )}
        {activeTab === 'param' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">参数与返回值</h2>
            <p>Go函数支持多种参数和返回值写法：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 多返回值
func swap(a, b int) (int, int) {
    return b, a
}
x, y := swap(1, 2) // x=2, y=1

// 命名返回值
func calc(a, b int) (sum int, diff int) {
    sum = a + b
    diff = a - b
    return // 直接返回
}

// 可变参数
func sumAll(nums ...int) int {
    total := 0
    for _, v := range nums {
        total += v
    }
    return total
}
s := sumAll(1, 2, 3, 4) // s=10`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>多返回值常用于返回结果和错误。</li>
              <li>可变参数用<code>...类型</code>，接收多个同类型参数。</li>
              <li>命名返回值可直接return。</li>
            </ul>
          </div>
        )}
        {activeTab === 'method' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">方法与接收者</h2>
            <p>Go支持为自定义类型（如结构体）定义方法，方法和函数的区别在于有接收者。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Person struct {
    Name string
}

// 为Person类型定义方法
func (p Person) SayHi() {
    fmt.Println("Hi, I am", p.Name)
}

// 指针接收者
func (p *Person) SetName(name string) {
    p.Name = name
}

p := Person{Name: "Tom"}
p.SayHi() // Hi, I am Tom
p.SetName("Jerry")
p.SayHi() // Hi, I am Jerry`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>方法接收者可以是值或指针。</li>
              <li>指针接收者可修改对象内容。</li>
              <li>方法调用语法：<code>对象.方法()</code></li>
            </ul>
          </div>
        )}
        {activeTab === 'closure' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">匿名函数与闭包</h2>
            <p>Go支持匿名函数和闭包，常用于回调、延迟执行等场景。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 匿名函数直接调用
func() {
    fmt.Println("匿名函数")
}()

// 赋值给变量
add := func(a, b int) int {
    return a + b
}
fmt.Println(add(2, 3)) // 5

// 闭包：返回一个函数
func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}
c := makeCounter()
fmt.Println(c()) // 1
fmt.Println(c()) // 2`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>匿名函数可直接调用或赋值给变量。</li>
              <li>闭包可捕获外部变量状态。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现一个函数，计算一组整数的最大值。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// maxInt 返回一组整数中的最大值
func maxInt(nums ...int) int {
    if len(nums) == 0 {
        panic("参数不能为空")
    }
    max := nums[0]
    for _, v := range nums {
        if v > max {
            max = v
        }
    }
    return max
}

fmt.Println(maxInt(1, 5, 3, 9, 2)) // 输出9`}
            </pre>
            <p className="mb-2 font-semibold">例题2：实现一个方法，给定结构体Person，返回自我介绍字符串。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Person struct {
    Name string
    Age  int
}

func (p Person) Intro() string {
    return fmt.Sprintf("大家好，我叫%s，今年%d岁。", p.Name, p.Age)
}

p := Person{"小明", 20}
fmt.Println(p.Intro()) // 大家好，我叫小明，今年20岁。`}
            </pre>
            <p className="mb-2 font-semibold">练习：写一个函数，判断一个整数是否为素数。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func isPrime(n int) bool {
    if n <= 1 {
        return false
    }
    for i := 2; i*i <= n; i++ {
        if n%i == 0 {
            return false
        }
    }
    return true
}

fmt.Println(isPrime(7))  // true
fmt.Println(isPrime(10)) // false`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: Go函数能否嵌套定义？</b><br />
                A: 可以，支持在函数内部定义匿名函数。
              </li>
              <li>
                <b>Q: 返回值可以省略类型吗？</b><br />
                A: 不可以，所有返回值都必须显式声明类型。
              </li>
              <li>
                <b>Q: 方法和函数的区别？</b><br />
                A: 方法有接收者，函数没有。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/control"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：流程控制
          </a>
          <a
            href="/study/go/arrays-slices"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数组与切片
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}