'use client';

import { useState } from 'react';

const tabs = [
  { key: 'channel', label: 'Channel基础' },
  { key: 'schedule', label: 'Goroutine调度' },
  { key: 'advanced', label: 'Channel高级用法' },
  { key: 'case', label: '并发案例' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoChannelsPage() {
  const [activeTab, setActiveTab] = useState('channel');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言Channel与Goroutine</h1>
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
        {activeTab === 'channel' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Channel基础</h2>
            <p>Channel是Go并发通信的核心，支持无缓冲和有缓冲两种模式。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 创建无缓冲channel
ch := make(chan int)
// 创建有缓冲channel
ch2 := make(chan string, 3)

// 发送和接收
ch <- 10
x := <-ch

// 关闭channel
close(ch)`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>无缓冲channel发送和接收必须同步。</li>
              <li>有缓冲channel可异步发送，缓冲满时阻塞。</li>
              <li>关闭channel后不能再发送数据。</li>
            </ul>
          </div>
        )}
        {activeTab === 'schedule' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Goroutine调度</h2>
            <p>Go运行时调度器负责管理Goroutine的执行，支持GOMAXPROCS设置并发核数。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "runtime"

// 设置最大CPU核数
runtime.GOMAXPROCS(4)

// Goroutine调度示例
for i := 0; i < 3; i++ {
    go func(n int) {
        fmt.Println("goroutine", n)
    }(i)
}

// 主协程等待
var input string
fmt.Scanln(&input)`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>GOMAXPROCS控制并发线程数，默认等于CPU核数。</li>
              <li>Goroutine调度是抢占式的，自动切换。</li>
            </ul>
          </div>
        )}
        {activeTab === 'advanced' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Channel高级用法</h2>
            <p>Channel支持单向通道、select多路复用、超时、广播等高级用法。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 单向通道
var send chan<- int = make(chan int)
var recv <-chan int = make(chan int)

// select实现超时
ch := make(chan int)
go func() {
    time.Sleep(time.Second)
    ch <- 1
}()
select {
case v := <-ch:
    fmt.Println("收到：", v)
case <-time.After(time.Millisecond * 500):
    fmt.Println("超时")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>单向通道用于限制只读或只写。</li>
              <li>select可实现超时、广播等并发模式。</li>
            </ul>
          </div>
        )}
        {activeTab === 'case' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">并发案例</h2>
            <p>常见并发案例：任务池、定时器、并发爬虫等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 任务池示例
jobs := make(chan int, 5)
results := make(chan int, 5)

for w := 1; w <= 3; w++ {
    go func(id int) {
        for j := range jobs {
            fmt.Printf("worker %d 处理任务 %d\n", id, j)
            results <- j * 2
        }
    }(w)
}
for j := 1; j <= 5; j++ {
    jobs <- j
}
close(jobs)
for a := 1; a <= 5; a++ {
    <-results
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>任务池可提升并发处理效率。</li>
              <li>定时器、广播等可用channel和select实现。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：用channel实现斐波那契数列生成</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func fibonacci(n int, ch chan int) {
    a, b := 0, 1
    for i := 0; i < n; i++ {
        ch <- a
        a, b = b, a+b
    }
    close(ch)
}

ch := make(chan int, 10)
go fibonacci(10, ch)
for v := range ch {
    fmt.Print(v, " ")
}`}
            </pre>
            <p className="mb-2 font-semibold">例题2：用select和channel实现超时控制</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`ch := make(chan int)
go func() {
    time.Sleep(time.Second)
    ch <- 1
}()
select {
case v := <-ch:
    fmt.Println("收到：", v)
case <-time.After(time.Millisecond * 500):
    fmt.Println("超时")
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个并发安全的队列</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type SafeQueue struct {
    ch chan int
}

func NewSafeQueue(size int) *SafeQueue {
    return &SafeQueue{ch: make(chan int, size)}
}

func (q *SafeQueue) Enqueue(v int) {
    q.ch <- v
}

func (q *SafeQueue) Dequeue() int {
    return <-q.ch
}

q := NewSafeQueue(3)
q.Enqueue(1)
q.Enqueue(2)
fmt.Println(q.Dequeue()) // 1`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: channel关闭后还能接收吗？</b><br />
                A: 可以，接收到零值，遍历时自动退出。
              </li>
              <li>
                <b>Q: Goroutine泄漏是什么？</b><br />
                A: 未正常退出的Goroutine会造成内存泄漏。
              </li>
              <li>
                <b>Q: select能否监听多个channel写？</b><br />
                A: 可以，case支持写操作。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/concurrency"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：并发编程
          </a>
          <a
            href="/study/go/error-handling"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：错误处理
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}