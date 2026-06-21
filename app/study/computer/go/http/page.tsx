'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: 'HTTP基础' },
  { key: 'router', label: '路由与处理器' },
  { key: 'middleware', label: '中间件' },
  { key: 'file', label: '文件上传下载' },
  { key: 'auth', label: '认证与安全' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoHttpPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言HTTP服务开发</h1>
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
            <h2 className="text-2xl font-bold mb-4">HTTP基础</h2>
            <p>Go内置net/http包，支持高效的HTTP服务开发。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net/http"
    "fmt"
)

// 最简单的HTTP服务器
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello, World!")
    })
    http.ListenAndServe(":8080", nil)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>http.HandleFunc注册路由。</li>
              <li>http.ListenAndServe启动服务。</li>
              <li>支持GET、POST等多种HTTP方法。</li>
            </ul>
          </div>
        )}
        {activeTab === 'router' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">路由与处理器</h2>
            <p>Go原生支持简单路由，复杂路由可用第三方库（如gorilla/mux）。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import (
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/user/{id}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        w.Write([]byte("User ID: " + vars["id"]))
    })
    http.ListenAndServe(":8080", r)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>原生http.HandleFunc适合简单路由。</li>
              <li>gorilla/mux支持RESTful、参数、正则等。</li>
            </ul>
          </div>
        )}
        {activeTab === 'middleware' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">中间件</h2>
            <p>中间件用于统一处理日志、认证、跨域等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 日志中间件示例
func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func main() {
    r := mux.NewRouter()
    r.Use(logging)
    r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Home"))
    })
    http.ListenAndServe(":8080", r)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>中间件本质是对Handler的包装。</li>
              <li>可链式组合多个中间件。</li>
            </ul>
          </div>
        )}
        {activeTab === 'file' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">文件上传下载</h2>
            <p>Go支持高效的文件上传与下载。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 文件上传
func uploadHandler(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(10 << 20) // 10MB
    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    defer file.Close()
    f, err := os.Create("./uploads/" + handler.Filename)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer f.Close()
    io.Copy(f, file)
    w.Write([]byte("上传成功"))
}

// 文件下载
func downloadHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./uploads/test.txt")
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>r.FormFile获取上传文件。</li>
              <li>http.ServeFile实现文件下载。</li>
            </ul>
          </div>
        )}
        {activeTab === 'auth' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">认证与安全</h2>
            <p>常见认证方式有Basic Auth、Token、JWT等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// Basic Auth示例
func basicAuth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        user, pass, ok := r.BasicAuth()
        if !ok || user != "admin" || pass != "123456" {
            w.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>可结合中间件实现统一认证。</li>
              <li>生产环境建议使用HTTPS。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现RESTful风格的用户API</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// GET /user/{id} 返回用户信息
// POST /user 创建新用户
// PUT /user/{id} 更新用户
// DELETE /user/{id} 删除用户
// 可用mux路由实现`}
            </pre>
            <p className="mb-2 font-semibold">例题2：实现带认证的文件下载接口</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 结合Basic Auth和http.ServeFile实现安全下载`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个简单的中间件链</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 编写日志、认证等中间件并组合使用`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 如何优雅关闭HTTP服务？</b><br />
                A: 使用http.Server的Shutdown方法。
              </li>
              <li>
                <b>Q: 如何处理跨域请求？</b><br />
                A: 设置CORS相关Header或用中间件。
              </li>
              <li>
                <b>Q: 如何处理大文件上传？</b><br />
                A: 增大ParseMultipartForm参数，分块处理。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/networking"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：网络编程
          </a>
          <a
            href="/study/go/rest"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：RESTful API开发
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 