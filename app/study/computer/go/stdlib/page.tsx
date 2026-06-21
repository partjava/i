'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: '标准库使用',
  chapterNumber: 14,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '包管理与模块', href: '/study/computer/go/packages' },
  nextChapter: { label: '文件操作', href: '/study/computer/go/file-io' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常用包介绍',
    left: (
      <div className="space-y-4">
        <PageTitle>常用包介绍</PageTitle>
        <BookParagraph>Go标准库提供了丰富的功能包：</BookParagraph>
        <BookCode language="go" code={`import (
    "fmt"     // 格式化输入输出
    "strings" // 字符串操作
    "time"    // 时间处理
    "math"    // 数学函数
    "net/http" // HTTP客户端/服务端
    "encoding/json" // JSON处理
)

// strings使用
strings.Contains("hello", "ll")
strings.Split("a,b,c", ",")
strings.Join([]string{"a","b"}, "-")

// time使用
now := time.Now()
fmt.Println(now.Format("2006-01-02 15:04:05"))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>文件与网络编程</SectionTitle>
        <BookCode language="go" code={`// 文件操作
data := []byte("hello")
os.WriteFile("test.txt", data, 0644)
content, _ := os.ReadFile("test.txt")

// HTTP服务器
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello")
})
http.ListenAndServe(":8080", nil)`} />
        <TagGrid items={['fmt', 'strings', 'time', 'encoding/json', 'net/http']} />
      </div>
    ),
  },
  {
    label: '练习与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>HTTP文件服务器：</b></BookParagraph>
        <BookCode language="go" code={`http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("."))))`} />
        <BookParagraph><b>原子计数器：</b></BookParagraph>
        <BookCode language="go" code={`var counter int64
atomic.AddInt64(&counter, 1)
fmt.Println(atomic.LoadInt64(&counter))`} />
        <BookParagraph><b>并发缓存：</b></BookParagraph>
        <BookCode language="go" code={`type Cache struct {
    data map[string]string; mu sync.RWMutex
}
func (c *Cache) Get(k string) string {
    c.mu.RLock(); defer c.mu.RUnlock()
    return c.data[k]
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>JSON序列化字段名小写问题？</b>用json:"fieldname" tag指定。</BookParagraph>
        <BookParagraph><b>time.Format为什么用2006-01-02？</b>这是Go的参考时间格式（1月2日下午3点4分5秒06年）。</BookParagraph>
        <TagGrid items={['atomic', 'sync.RWMutex', 'JSON', 'time', '练习']} />
      </div>
    ),
  },
]

export default function GoStdlibPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
