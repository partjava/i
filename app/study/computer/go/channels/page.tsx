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
  chapterTitle: 'Channel与Goroutine',
  chapterNumber: 11,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '并发编程', href: '/study/computer/go/concurrency' },
  nextChapter: { label: '错误处理', href: '/study/computer/go/error-handling' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Channel基础',
    left: (
      <div className="space-y-4">
        <PageTitle>Channel基础</PageTitle>
        <BookParagraph>Channel是Go并发模型的核心，用于goroutine间的通信。</BookParagraph>
        <BookCode language="go" code={`// 创建无缓冲channel
ch := make(chan int)
// 创建有缓冲channel
ch2 := make(chan string, 3)

// 发送和接收
ch <- 10
x := <-ch

// 关闭channel
close(ch)`} />
        <BookList items={[
          '无缓冲channel发送和接收必须同步',
          '有缓冲channel可异步发送，缓冲满时阻塞',
          '关闭channel后不能再发送数据',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Goroutine调度</SectionTitle>
        <BookParagraph>Go运行时调度器负责管理Goroutine的执行，支持GOMAXPROCS设置并发核数。</BookParagraph>
        <BookCode language="go" code={`import "runtime"

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
fmt.Scanln(&input)`} />
        <BookList items={[
          'GOMAXPROCS控制并发线程数，默认等于CPU核数',
          'Goroutine调度是抢占式的，自动切换',
        ]} />
      </div>
    ),
  },
  {
    label: 'Channel高级与并发案例',
    left: (
      <div className="space-y-4">
        <PageTitle>Channel高级用法</PageTitle>
        <BookParagraph>Channel支持单向通道、select多路复用、超时、广播等高级用法。</BookParagraph>
        <BookCode language="go" code={`// 单向通道
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
}`} />
        <BookList items={[
          '单向通道用于限制只读或只写',
          'select可实现超时、广播等并发模式',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>并发案例</SectionTitle>
        <BookParagraph>常见并发案例：任务池、定时器、并发爬虫等。</BookParagraph>
        <BookCode language="go" code={`// 任务池示例
jobs := make(chan int, 5)
results := make(chan int, 5)

for w := 1; w <= 3; w++ {
    go func(id int) {
        for j := range jobs {
            fmt.Printf("worker %d 处理任务 %d\\n", id, j)
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
}`} />
        <BookList items={[
          '任务池可提升并发处理效率',
          '定时器、广播等可用channel和select实现',
        ]} />
        <TagGrid items={['单向通道', 'select', '超时', '任务池', 'worker']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>例题1：用channel实现斐波那契数列生成</b></BookParagraph>
        <BookCode language="go" code={`func fibonacci(n int, ch chan int) {
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
}`} />
        <BookParagraph><b>例题2：用select和channel实现超时控制</b></BookParagraph>
        <BookCode language="go" code={`ch := make(chan int)
go func() {
    time.Sleep(time.Second)
    ch <- 1
}()
select {
case v := <-ch:
    fmt.Println("收到：", v)
case <-time.After(time.Millisecond * 500):
    fmt.Println("超时")
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>练习：实现一个并发安全的队列</b></BookParagraph>
        <BookCode language="go" code={`type SafeQueue struct {
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
fmt.Println(q.Dequeue()) // 1`} />
        <TagGrid items={['斐波那契', '超时控制', '安全队列', 'channel', 'select']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: channel关闭后还能接收吗？</b><br />A: 可以，接收到零值，遍历时自动退出。</BookParagraph>
        <BookParagraph><b>Q: Goroutine泄漏是什么？</b><br />A: 未正常退出的Goroutine会造成内存泄漏。</BookParagraph>
        <BookParagraph><b>Q: select能否监听多个channel写？</b><br />A: 可以，case支持写操作。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', '关闭channel', '泄漏', 'select', '写操作']} />
      </div>
    ),
  },
]

export default function GoChannelsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
