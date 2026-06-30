'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: '并发编程',
  chapterNumber: 10,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '接口与类型系统', href: '/study/computer/go/interfaces' },
  nextChapter: { label: 'Channel与Goroutine', href: '/study/computer/go/channels' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Goroutine与Channel',
    left: (
      <div className="space-y-4">
        <PageTitle>Goroutine基础</PageTitle>
        <BookParagraph>Goroutine是Go语言的轻量级线程，使用<code>go</code>关键字启动。</BookParagraph>
        <BookCode language="go" code={`// 启动一个goroutine
func sayHello() {
    fmt.Println("Hello from goroutine")
}
go sayHello()

// 主协程等待
fmt.Println("main end")
// 实际开发中常用sync.WaitGroup等待所有goroutine结束`} />
        <BookList items={[
          'Goroutine非常轻量，数万个也不会崩溃',
          '主协程退出会导致所有goroutine退出',
        ]} />
        <TagGrid items={['goroutine', 'go关键字', '并发', '轻量级']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Channel通信</SectionTitle>
        <BookParagraph>Channel用于Goroutine间通信，保证数据安全传递。</BookParagraph>
        <BookCode language="go" code={`// 创建channel
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
close(ch)`} />
        <BookList items={[
          'channel类型：无缓冲、有缓冲',
          '关闭channel用close，接收端可检测',
        ]} />
      </div>
    ),
  },
  {
    label: '并发模式与同步',
    left: (
      <div className="space-y-4">
        <PageTitle>并发模式与select</PageTitle>
        <BookParagraph>select语句可监听多个channel，实现多路复用和超时控制。</BookParagraph>
        <BookCode language="go" code={`ch1 := make(chan int)
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
}`} />
        <BookList items={[
          'select可实现超时、广播、任务池等并发模式',
          'default分支可避免阻塞',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>并发安全与sync</SectionTitle>
        <BookParagraph>Go标准库sync包提供多种并发安全工具，如互斥锁、WaitGroup等。</BookParagraph>
        <BookCode language="go" code={`import "sync"

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
wg.Wait()`} />
        <BookList items={[
          'sync.Mutex用于保护共享资源',
          'sync.WaitGroup用于等待一组goroutine完成',
        ]} />
        <TagGrid items={['select', 'Mutex', 'WaitGroup', '多路复用', '并发安全']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>例题1：启动10个goroutine并打印编号</b></BookParagraph>
        <BookCode language="go" code={`import "sync"

var wg sync.WaitGroup
for i := 0; i < 10; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println("goroutine", n)
    }(i)
}
wg.Wait()`} />
        <BookParagraph><b>例题2：用channel实现生产者-消费者模型</b></BookParagraph>
        <BookCode language="go" code={`ch := make(chan int)
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>练习：实现一个安全的计数器（并发自增）</b></BookParagraph>
        <BookCode language="go" code={`import "sync"

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
fmt.Println(c.Value()) // 1000`} />
        <TagGrid items={['goroutine', '生产者消费者', 'Counter', '并发安全', 'sync']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: Goroutine和线程的区别？</b><br />A: Goroutine更轻量，调度由Go运行时管理。</BookParagraph>
        <BookParagraph><b>Q: channel缓冲区满/空会怎样？</b><br />A: 发送到满的channel会阻塞，接收空的channel也会阻塞。</BookParagraph>
        <BookParagraph><b>Q: sync.Map和普通map区别？</b><br />A: sync.Map是并发安全的，适合多协程读写。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', 'goroutine vs 线程', '缓冲区', 'sync.Map', '并发安全']} />
      </div>
    ),
  },
]

export default function GoConcurrencyPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
