'use client';

import { useState } from 'react';

const tabs = [
  { key: 'map', label: 'Map基础' },
  { key: 'struct', label: '结构体基础' },
  { key: 'method', label: '结构体方法与嵌套' },
  { key: 'combine', label: 'Map与结构体结合' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoMapStructPage() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言Map与结构体</h1>
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
        {activeTab === 'map' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Map基础</h2>
            <p>Map是Go内置的无序键值对集合，常用于字典、索引等场景。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 声明和初始化
var m1 map[string]int           // nil map，需先make
m2 := make(map[string]int)      // 空map
m3 := map[string]int{"Tom": 18, "Jerry": 20}

// 增删改查
m2["Alice"] = 25               // 添加或修改
age := m2["Alice"]              // 查询
v, ok := m2["Bob"]              // 判断key是否存在
if ok {
    fmt.Println("Bob的年龄：", v)
}
delete(m2, "Alice")             // 删除key

// 遍历
for k, v := range m3 {
    fmt.Println(k, v)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Map是引用类型，赋值和传参不会复制底层数据。</li>
              <li>查询不存在的key返回零值。</li>
              <li>用delete删除key。</li>
            </ul>
          </div>
        )}
        {activeTab === 'struct' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">结构体基础</h2>
            <p>结构体是用户自定义的复合数据类型，用于描述一组属性。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 定义结构体
type Person struct {
    Name string
    Age  int
}

// 初始化
var p1 Person
p1.Name = "Tom"
p1.Age = 18
p2 := Person{"Jerry", 20}
p3 := Person{Name: "Alice"}

// 访问字段
fmt.Println(p2.Name, p2.Age)

// 结构体数组
var people = [2]Person{
    {"A", 10},
    {"B", 20},
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>结构体字段首字母大写可导出（包外可见）。</li>
              <li>支持匿名字段和嵌套结构体。</li>
            </ul>
          </div>
        )}
        {activeTab === 'method' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">结构体方法与嵌套</h2>
            <p>结构体可定义方法，支持嵌套和组合，实现面向对象风格。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Address struct {
    City string
}

type User struct {
    Name string
    Address // 匿名嵌套
}

// 方法
func (u User) SayHi() {
    fmt.Println("Hi, I am", u.Name, "from", u.City)
}

u := User{Name: "Tom", Address: Address{City: "Beijing"}}
u.SayHi() // Hi, I am Tom from Beijing`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>嵌套结构体可直接访问匿名字段。</li>
              <li>方法接收者可为值或指针。</li>
            </ul>
          </div>
        )}
        {activeTab === 'combine' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Map与结构体结合</h2>
            <p>Map与结构体结合可实现更复杂的数据结构，如学生信息表。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Student struct {
    Name string
    Score int
}

// 学号到学生信息的映射
students := map[string]Student{
    "1001": {Name: "小明", Score: 90},
    "1002": {Name: "小红", Score: 95},
}

// 查询和遍历
stu, ok := students["1001"]
if ok {
    fmt.Println(stu.Name, stu.Score)
}
for id, s := range students {
    fmt.Println(id, s.Name, s.Score)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Map的value可为结构体，实现复杂映射。</li>
              <li>结构体可嵌套Map，实现多级数据。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：统计字符串中每个字符出现次数</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func charCount(s string) map[rune]int {
    m := make(map[rune]int)
    for _, ch := range s {
        m[ch]++
    }
    return m
}

fmt.Println(charCount("hello")) // map[e:1 h:1 l:2 o:1]`}
            </pre>
            <p className="mb-2 font-semibold">例题2：定义结构体并实现方法，输出学生信息</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type Student struct {
    Name string
    Score int
}

func (s Student) Info() string {
    return fmt.Sprintf("%s的分数是%d", s.Name, s.Score)
}

stu := Student{"小明", 95}
fmt.Println(stu.Info()) // 小明的分数是95`}
            </pre>
            <p className="mb-2 font-semibold">练习：用Map统计一组学生的平均分</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`students := map[string]int{"小明": 90, "小红": 95, "小刚": 88}
sum := 0
for _, score := range students {
    sum += score
}
avg := float64(sum) / float64(len(students))
fmt.Println("平均分：", avg)`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: Map的key可以用哪些类型？</b><br />
                A: 支持可比较类型，如int、string、bool、数组等，不能用切片、Map、函数等。
              </li>
              <li>
                <b>Q: 结构体能否比较？</b><br />
                A: 字段均可比较时可直接==，否则需自定义比较函数。
              </li>
              <li>
                <b>Q: 结构体能否作为Map的key？</b><br />
                A: 可以，但字段必须都是可比较类型。
              </li>
              <li>
                <b>Q: Map并发安全吗？</b><br />
                A: 内置Map不是并发安全的，需用sync.Map或加锁。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/arrays-slices"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数组与切片
          </a>
          <a
            href="/study/go/interfaces"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：接口与类型系统
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}