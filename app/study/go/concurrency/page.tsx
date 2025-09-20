'use client';

import { useState } from 'react';

const tabs = [
  { key: 'goroutine', label: 'Goroutine基础' },
  { key: 'channel', label: 'Channel通信' },
  { key: 'select', label: '并发模式与select' },
  { key: 'sync', label: '并发安全与sync' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoConcurrencyPage() {
  const [activeTab, setActiveTab] = useState('goroutine');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言并发编程</h1>
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
        {activeTab === 'goroutine' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Goroutine基础</h2>
            <p>Goroutine是Go语言的轻量级线程，使用<code>go</code>关键字启动。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 启动一个goroutine
func sayHello() {
    fmt.Println("Hello from goroutine")
}
go sayHello()

// 主协程等待
fmt.Println("main end")
// 实际开发中常用sync.WaitGroup等待所有goroutine结束`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Goroutine非常轻量，数万个也不会崩溃。</li>
              <li>主协程退出会导致所有goroutine退出。</li>
            </ul>
          </div>
        )}
        {activeTab === 'channel' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Channel通信</h2>
            <p>Channel用于Goroutine间通信，保证数据安全传递。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 创建channel
ch := make(chan int)

// 发送和接收
ch <- 10         // 发送数据
x := <-ch        // 接收数据

// 启动goroutine并通信
func worker(ch chan int) {
    data := <-ch
    fmt.Println("worker收到：", data)
}
go worker(ch)
ch <- 42

// 关闭channel
close(ch)`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>channel类型：无缓冲、有缓冲</li>
              <li>关闭channel用<code>close</code>，接收端可检测</li>
            </ul>
          </div>
        )}
        {activeTab === 'select' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">并发模式与select</h2>
            <p>select语句可监听多个channel，实现多路复用和超时控制。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`ch1 := make(chan int)
ch2 := make(chan string)

go func() { ch1 <- 1 }()
go func() { ch2 <- "hi" }()

select {
case v := <-ch1:
    fmt.Println("ch1收到：", v)
case s := <-ch2:
    fmt.Println("ch2收到：", s)
default:
    fmt.Println("无数据可读")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>select可实现超时、广播、任务池等并发模式</li>
              <li>default分支可避免阻塞</li>
            </ul>
          </div>
        )}
        {activeTab === 'sync' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">并发安全与sync</h2>
            <p>Go标准库sync包提供多种并发安全工具，如互斥锁、WaitGroup等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "sync"

// 互斥锁
var mu sync.Mutex
mu.Lock()
// 临界区
mu.Unlock()

// WaitGroup等待多个goroutine结束
var wg sync.WaitGroup
wg.Add(2)
go func() {
    defer wg.Done()
    fmt.Println("任务1")
}()
go func() {
    defer wg.Done()
    fmt.Println("任务2")
}()
wg.Wait()`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>sync.Mutex用于保护共享资源</li>
              <li>sync.WaitGroup用于等待一组goroutine完成</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：启动10个goroutine并打印编号</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "sync"

var wg sync.WaitGroup
for i := 0; i < 10; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println("goroutine", n)
    }(i)
}
wg.Wait()`}
            </pre>
            <p className="mb-2 font-semibold">例题2：用channel实现生产者-消费者模型</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`ch := make(chan int)
// 生产者
go func() {
    for i := 1; i <= 5; i++ {
        ch <- i
    }
    close(ch)
}()
// 消费者
for v := range ch {
    fmt.Println("消费：", v)
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个安全的计数器（并发自增）</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "sync"

type Counter struct {
    mu sync.Mutex
    val int
}

func (c *Counter) Inc() {
    c.mu.Lock()
    c.val++
    c.mu.Unlock()
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.val
}

c := &Counter{}
var wg sync.WaitGroup
for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        c.Inc()
    }()
}
wg.Wait()
fmt.Println(c.Value()) // 1000`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: Goroutine和线程的区别？</b><br />
                A: Goroutine更轻量，调度由Go运行时管理。
              </li>
              <li>
                <b>Q: channel缓冲区满/空会怎样？</b><br />
                A: 发送到满的channel会阻塞，接收空的channel也会阻塞。
              </li>
              <li>
                <b>Q: sync.Map和普通map区别？</b><br />
                A: sync.Map是并发安全的，适合多协程读写。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/interfaces"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：接口与类型系统
          </a>
          <a
            href="/study/go/channels"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：Channel与Goroutine
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}