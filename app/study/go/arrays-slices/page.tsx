'use client';

import { useState } from 'react';

const tabs = [
  { key: 'array', label: '数组基础' },
  { key: 'slice', label: '切片基础' },
  { key: 'sliceop', label: '切片操作' },
  { key: 'usage', label: '常见用法' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoArraysSlicesPage() {
  const [activeTab, setActiveTab] = useState('array');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言数组与切片</h1>
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
        {activeTab === 'array' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数组基础</h2>
            <p>数组是定长、同类型元素的序列，声明时需指定长度。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 声明数组
var arr1 [3]int           // [0 0 0]
var arr2 = [3]int{1, 2, 3}
arr3 := [...]string{"Go", "Python", "Java"}

// 访问和修改
arr2[0] = 10
fmt.Println(arr2[1]) // 2

// 遍历数组
for i, v := range arr2 {
    fmt.Println(i, v)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>数组长度是类型的一部分，<code>[3]int</code>和<code>[4]int</code>不同类型。</li>
              <li>数组是值类型，赋值和传参会复制整个数组。</li>
            </ul>
          </div>
        )}
        {activeTab === 'slice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">切片基础</h2>
            <p>切片是对数组的抽象，长度可变，更常用。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 声明切片
var s1 []int              // nil切片
s2 := []int{1, 2, 3}      // 字面量
s3 := make([]string, 2)   // 长度为2的字符串切片

// 访问和修改
s2[0] = 10
fmt.Println(s2[1]) // 2

// 遍历切片
for i, v := range s2 {
    fmt.Println(i, v)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>切片本身不存储数据，底层依赖数组。</li>
              <li>切片是引用类型，赋值和传参不会复制底层数据。</li>
            </ul>
          </div>
        )}
        {activeTab === 'sliceop' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">切片操作</h2>
            <p>切片支持多种操作，如追加、截取、复制等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`s := []int{1, 2, 3}
// 追加元素
s = append(s, 4, 5)
// 截取子切片
sub := s[1:4] // [2 3 4]
// 拷贝切片
copyS := make([]int, len(s))
copy(copyS, s)
// 删除元素（常用技巧）
s = append(s[:2], s[3:]...) // 删除下标2的元素`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>append返回新切片，原切片不变。</li>
              <li>切片截取语法<code>s[start:end]</code>，不包含end。</li>
              <li>删除元素需用<code>append</code>组合实现。</li>
            </ul>
          </div>
        )}
        {activeTab === 'usage' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见用法</h2>
            <p>切片常用于动态数组、栈、队列等场景。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 反转切片
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}

// 切片实现栈
stack := []int{}
stack = append(stack, 1) // 入栈
x := stack[len(stack)-1] // 取栈顶
stack = stack[:len(stack)-1] // 出栈

// 切片实现队列
queue := []int{1, 2, 3}
queue = append(queue, 4) // 入队
head := queue[0]         // 取队头
queue = queue[1:]        // 出队`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>切片可灵活实现多种数据结构。</li>
              <li>注意切片扩容和内存引用问题。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：计算切片元素之和</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func sumSlice(s []int) int {
    sum := 0
    for _, v := range s {
        sum += v
    }
    return sum
}

fmt.Println(sumSlice([]int{1, 2, 3, 4})) // 输出10`}
            </pre>
            <p className="mb-2 font-semibold">例题2：删除切片中指定元素</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func removeAt(s []int, idx int) []int {
    return append(s[:idx], s[idx+1:]...)
}

s := []int{1, 2, 3, 4}
s = removeAt(s, 2)
fmt.Println(s) // [1 2 4]`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个函数，找出切片中的最大值和最小值</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func minMax(s []int) (int, int) {
    if len(s) == 0 {
        panic("切片不能为空")
    }
    min, max := s[0], s[0]
    for _, v := range s {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return min, max
}

fmt.Println(minMax([]int{3, 1, 5, 2})) // 1 5`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 数组和切片的区别？</b><br />
                A: 数组长度固定，切片长度可变且更常用。
              </li>
              <li>
                <b>Q: 切片扩容机制？</b><br />
                A: append超出容量时自动扩容，底层新建更大数组。
              </li>
              <li>
                <b>Q: 切片赋值会不会复制数据？</b><br />
                A: 不会，赋值和传参只复制切片结构体，底层数据共享。
              </li>
              <li>
                <b>Q: 如何安全删除切片元素？</b><br />
                A: 用append组合切片实现，避免越界。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/functions"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：函数与方法
          </a>
          <a
            href="/study/go/map-struct"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：Map与结构体
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}