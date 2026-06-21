'use client';

import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '标准库概述' },
  { key: 'common', label: '常用包介绍' },
  { key: 'file', label: '文件操作' },
  { key: 'net', label: '网络编程' },
  { key: 'concurrent', label: '并发处理' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoStdlibPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言标准库使用</h1>
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
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">标准库概述</h2>
            <p>Go标准库提供了丰富的功能，无需安装第三方包即可完成大部分开发任务。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 常用标准库包
import (
    "fmt"      // 格式化I/O
    "os"       // 操作系统接口
    "io"       // I/O原语
    "net"      // 网络接口
    "time"     // 时间处理
    "math"     // 数学函数
    "strings"  // 字符串处理
    "encoding" // 编码/解码
    "sync"     // 同步原语
    "context"  // 上下文管理
)

// 查看标准库文档
// https://pkg.go.dev/std`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>标准库随Go语言安装，无需额外下载。</li>
              <li>文档完善，示例丰富，性能优秀。</li>
            </ul>
          </div>
        )}
        {activeTab === 'common' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常用包介绍</h2>
            <p>介绍一些最常用的标准库包及其核心功能。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// strings包：字符串处理
import "strings"

s := "hello,world"
parts := strings.Split(s, ",")  // ["hello", "world"]
upper := strings.ToUpper(s)     // "HELLO,WORLD"
contains := strings.Contains(s, "hello") // true

// time包：时间处理
import "time"

now := time.Now()
fmt.Println(now.Format("2006-01-02 15:04:05"))
duration := time.Hour * 2
future := now.Add(duration)

// math包：数学函数
import "math"

fmt.Println(math.Pi)
fmt.Println(math.Sqrt(16))
fmt.Println(math.Max(10, 20))`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>strings：字符串分割、替换、查找等。</li>
              <li>time：时间格式化、计算、定时器等。</li>
              <li>math：数学计算、随机数等。</li>
            </ul>
          </div>
        )}
        {activeTab === 'file' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件操作</h2>
            <p>使用os、io、bufio等包进行文件读写操作。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 文件读写
import (
    "os"
    "io"
    "bufio"
)

// 读取文件
func readFile(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close()
    
    // 使用bufio提高性能
    reader := bufio.NewReader(f)
    content, err := io.ReadAll(reader)
    if err != nil {
        return "", err
    }
    return string(content), nil
}

// 写入文件
func writeFile(path, content string) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()
    
    writer := bufio.NewWriter(f)
    if _, err := writer.WriteString(content); err != nil {
        return err
    }
    return writer.Flush()
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>os：文件创建、删除、权限等。</li>
              <li>bufio：带缓冲的I/O，提高性能。</li>
              <li>io：I/O原语，如ReadAll、Copy等。</li>
            </ul>
          </div>
        )}
        {activeTab === 'net' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">网络编程</h2>
            <p>使用net、http等包进行网络编程。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// HTTP服务器
import (
    "net/http"
    "fmt"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}

// TCP客户端
import (
    "net"
    "io"
)

func tcpClient() {
    conn, err := net.Dial("tcp", "localhost:8080")
    if err != nil {
        panic(err)
    }
    defer conn.Close()
    
    io.WriteString(conn, "Hello Server")
    response, _ := io.ReadAll(conn)
    fmt.Println(string(response))
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>http：HTTP服务器和客户端。</li>
              <li>net：TCP/UDP网络编程。</li>
              <li>支持WebSocket、TLS等高级特性。</li>
            </ul>
          </div>
        )}
        {activeTab === 'concurrent' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">并发处理</h2>
            <p>使用sync、context等包处理并发。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 并发控制
import (
    "sync"
    "context"
    "time"
)

// WaitGroup示例
func process(items []string) {
    var wg sync.WaitGroup
    for _, item := range items {
        wg.Add(1)
        go func(i string) {
            defer wg.Done()
            // 处理item
        }(item)
    }
    wg.Wait()
}

// Context示例
func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return
        default:
            // 正常工作
        }
    }
}

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()
go worker(ctx)`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>sync：互斥锁、条件变量、WaitGroup等。</li>
              <li>context：上下文管理，用于取消、超时等。</li>
              <li>atomic：原子操作，用于无锁编程。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现一个简单的HTTP文件服务器</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net/http"
    "log"
)

func main() {
    // 静态文件服务
    fs := http.FileServer(http.Dir("./static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))
    
    // 自定义路由
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Welcome to File Server"))
    })
    
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            </pre>
            <p className="mb-2 font-semibold">例题2：使用sync包实现并发安全的计数器</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "sync"
    "sync/atomic"
)

type Counter struct {
    value int64
}

func (c *Counter) Inc() {
    atomic.AddInt64(&c.value, 1)
}

func (c *Counter) Value() int64 {
    return atomic.LoadInt64(&c.value)
}

func main() {
    var counter Counter
    var wg sync.WaitGroup
    
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Inc()
        }()
    }
    
    wg.Wait()
    fmt.Println(counter.Value()) // 1000
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个并发安全的缓存</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "sync"
    "time"
)

type Cache struct {
    data map[string]interface{}
    mu   sync.RWMutex
}

func NewCache() *Cache {
    return &Cache{
        data: make(map[string]interface{}),
    }
}

func (c *Cache) Set(key string, value interface{}) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = value
}

func (c *Cache) Get(key string) (interface{}, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    value, ok := c.data[key]
    return value, ok
}`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 如何选择标准库还是第三方库？</b><br />
                A: 优先使用标准库，除非标准库无法满足需求。
              </li>
              <li>
                <b>Q: 标准库的性能如何？</b><br />
                A: 标准库经过优化，性能通常很好，但某些场景可能需要第三方库。
              </li>
              <li>
                <b>Q: 如何查看标准库文档？</b><br />
                A: 使用go doc命令或访问pkg.go.dev/std。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/packages"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：包管理与模块
          </a>
          <a
            href="/study/go/file-io"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：文件操作
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}