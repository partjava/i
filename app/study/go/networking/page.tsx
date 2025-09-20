'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '网络基础' },
  { key: 'http', label: 'HTTP编程' },
  { key: 'tcpudp', label: 'TCP/UDP' },
  { key: 'ws', label: 'WebSocket' },
  { key: 'security', label: '网络安全' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoNetworkingPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言网络编程</h1>
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
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">网络基础</h2>
            <p>Go标准库提供了丰富的网络编程支持，包括TCP、UDP、HTTP、WebSocket等协议。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 导入常用网络包
import (
    "net"      // 低层网络接口
    "net/http" // HTTP协议
    "net/url"  // URL解析
    "time"
)

// 检查端口是否可用
func checkPort(addr string) bool {
    conn, err := net.DialTimeout("tcp", addr, time.Second)
    if err != nil {
        return false
    }
    conn.Close()
    return true
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>net包支持TCP/UDP等底层协议。</li>
              <li>net/http包支持Web开发。</li>
              <li>net/url包用于URL解析与构建。</li>
            </ul>
          </div>
        )}
        {activeTab === 'http' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">HTTP编程</h2>
            <p>Go内置http包，轻松实现HTTP服务器和客户端。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net/http"
    "fmt"
)

// HTTP服务器
func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Query().Get("name"))
    })
    http.ListenAndServe(":8080", nil)
}

// HTTP客户端
func getRequest() {
    resp, err := http.Get("https://httpbin.org/get")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>http.HandleFunc注册路由。</li>
              <li>http.ListenAndServe启动服务。</li>
              <li>http.Get、http.Post发起请求。</li>
            </ul>
          </div>
        )}
        {activeTab === 'tcpudp' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">TCP/UDP</h2>
            <p>Go通过net包支持TCP和UDP编程。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net"
    "fmt"
    "io"
)

// TCP服务器
func startTCPServer() {
    ln, err := net.Listen("tcp", ":9000")
    if err != nil {
        panic(err)
    }
    defer ln.Close()
    for {
        conn, err := ln.Accept()
        if err != nil {
            continue
        }
        go func(c net.Conn) {
            defer c.Close()
            buf := make([]byte, 1024)
            n, _ := c.Read(buf)
            c.Write([]byte("Echo: "))
            c.Write(buf[:n])
        }(conn)
    }
}

// UDP客户端
func sendUDP() {
    conn, err := net.Dial("udp", "localhost:9000")
    if err != nil {
        panic(err)
    }
    defer conn.Close()
    conn.Write([]byte("Hello UDP"))
    buf := make([]byte, 1024)
    n, _ := conn.Read(buf)
    fmt.Println(string(buf[:n]))
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>net.Listen监听端口。</li>
              <li>net.Dial连接远程主机。</li>
              <li>支持多连接并发处理。</li>
            </ul>
          </div>
        )}
        {activeTab === 'ws' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">WebSocket</h2>
            <p>Go可通过第三方包（如gorilla/websocket）实现WebSocket通信。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "github.com/gorilla/websocket"
    "net/http"
)

var upgrader = websocket.Upgrader{}

func wsHandler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        return
    }
    defer conn.Close()
    for {
        mt, message, err := conn.ReadMessage()
        if err != nil {
            break
        }
        conn.WriteMessage(mt, message) // 回显消息
    }
}

func main() {
    http.HandleFunc("/ws", wsHandler)
    http.ListenAndServe(":8080", nil)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>WebSocket适合实时通信场景。</li>
              <li>需引入第三方包：github.com/gorilla/websocket。</li>
              <li>支持消息推送、聊天室等应用。</li>
            </ul>
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">网络安全</h2>
            <p>Go支持TLS/SSL加密、请求认证等安全特性。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net/http"
    "crypto/tls"
)

// 启动HTTPS服务器
func main() {
    srv := &http.Server{
        Addr:    ":8443",
        Handler: http.DefaultServeMux,
        TLSConfig: &tls.Config{
            MinVersion: tls.VersionTLS12,
        },
    }
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello HTTPS"))
    })
    srv.ListenAndServeTLS("server.crt", "server.key")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>http.Server支持TLS配置。</li>
              <li>可自定义证书、加密算法。</li>
              <li>可结合中间件实现认证、限流等。</li>
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
    fs := http.FileServer(http.Dir("./static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Welcome to File Server"))
    })
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}
            </pre>
            <p className="mb-2 font-semibold">例题2：实现TCP并发回声服务器</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net"
    "log"
)

func main() {
    ln, err := net.Listen("tcp", ":9000")
    if err != nil {
        log.Fatal(err)
    }
    for {
        conn, err := ln.Accept()
        if err != nil {
            continue
        }
        go func(c net.Conn) {
            defer c.Close()
            buf := make([]byte, 1024)
            for {
                n, err := c.Read(buf)
                if err != nil {
                    break
                }
                c.Write(buf[:n])
            }
        }(conn)
    }
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现WebSocket聊天室</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 参考gorilla/websocket官方示例，实现广播和多客户端管理
// 可扩展为群聊、私聊等功能`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: Go如何实现高并发网络服务？</b><br />
                A: 利用goroutine和channel，结合net包的多连接处理。
              </li>
              <li>
                <b>Q: 如何处理HTTP请求超时？</b><br />
                A: 设置http.Server的ReadTimeout/WriteTimeout，或使用context。
              </li>
              <li>
                <b>Q: WebSocket如何做心跳检测？</b><br />
                A: 定时发送ping/pong帧，检测连接活跃。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/file-io"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：文件操作
          </a>
          <a
            href="/study/go/http"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：HTTP服务开发
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 