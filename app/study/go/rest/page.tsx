'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: 'REST基础' },
  { key: 'router', label: '路由设计' },
  { key: 'reqres', label: '请求与响应' },
  { key: 'json', label: '数据序列化' },
  { key: 'status', label: '状态码与错误处理' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoRestPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言RESTful API开发</h1>
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
            <h2 className="text-2xl font-bold mb-4">REST基础</h2>
            <p>REST（Representational State Transfer）是一种常用Web API设计风格，强调资源、统一接口和无状态通信。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>资源用URL唯一标识，如<code>/users/1</code></li>
              <li>使用HTTP方法（GET/POST/PUT/DELETE）操作资源</li>
              <li>请求和响应通常用JSON格式</li>
              <li>无状态，每次请求都包含所有必要信息</li>
            </ul>
          </div>
        )}
        {activeTab === 'router' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">路由设计</h2>
            <p>RESTful API路由应简洁、语义化，常用gorilla/mux等库实现。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import (',
  '    "net/http"',
  '    "github.com/gorilla/mux"',
  ')',
  '',
  'func main() {',
  '    r := mux.NewRouter()',
  '    r.HandleFunc("/users", getUsers).Methods("GET")',
  '    r.HandleFunc("/users/{id}", getUser).Methods("GET")',
  '    r.HandleFunc("/users", createUser).Methods("POST")',
  '    r.HandleFunc("/users/{id}", updateUser).Methods("PUT")',
  '    r.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")',
  '    http.ListenAndServe(":8080", r)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>资源名用复数（如/users）</li>
              <li>用HTTP方法区分操作</li>
              <li>路径参数用大括号（如{'{id}'}）</li>
            </ul>
          </div>
        )}
        {activeTab === 'reqres' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">请求与响应</h2>
            <p>Go通过http.Request和http.ResponseWriter处理请求与响应。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'func getUser(w http.ResponseWriter, r *http.Request) {',
  '    vars := mux.Vars(r)',
  '    id := vars["id"]',
  '    // 查询数据库...',
  '    w.Header().Set("Content-Type", "application/json")',
  '    w.WriteHeader(http.StatusOK)',
  '    w.Write([]byte(`{"id": "` + id + `", "name": "Tom"}`))',
  '}',
  '',
  'func createUser(w http.ResponseWriter, r *http.Request) {',
  '    var user User',
  '    json.NewDecoder(r.Body).Decode(&user)',
  '    // 保存到数据库...',
  '    w.WriteHeader(http.StatusCreated)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>通过r.URL、r.Body、r.Header获取请求信息</li>
              <li>通过w.Header、w.WriteHeader、w.Write响应</li>
            </ul>
          </div>
        )}
        {activeTab === 'json' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据序列化</h2>
            <p>Go标准库encoding/json支持JSON序列化与反序列化。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import "encoding/json"',
  '',
  'type User struct {',
  '    ID   int    `json:"id"`',
  '    Name string `json:"name"`',
  '}',
  '',
  '// 序列化',
  'user := User{ID: 1, Name: "Tom"}',
  'data, _ := json.Marshal(user)',
  '',
  '// 反序列化',
  'var u User',
  'json.Unmarshal(data, &u)',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>结构体字段需大写开头才能被导出和序列化</li>
              <li>可用tag自定义JSON字段名</li>
            </ul>
          </div>
        )}
        {activeTab === 'status' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">状态码与错误处理</h2>
            <p>合理设置HTTP状态码，返回统一错误格式。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'func errorResponse(w http.ResponseWriter, code int, msg string) {',
  '    w.Header().Set("Content-Type", "application/json")',
  '    w.WriteHeader(code)',
  '    w.Write([]byte(`{"error": "` + msg + `"}`))',
  '}',
  '',
  '// 用法',
  '// errorResponse(w, http.StatusBadRequest, "参数错误")',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>常用状态码：200、201、400、401、404、500等</li>
              <li>错误响应建议统一格式</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现用户增删改查REST API</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 结合mux路由、json序列化、状态码处理，实现完整CRUD接口',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">例题2：自定义错误响应格式</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 返回{"error": "详细错误信息"}格式的错误响应',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">练习：实现分页查询接口</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 支持GET /users?page=1&size=10，返回分页数据',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: REST和RPC的区别？</b><br />A: REST基于HTTP协议，资源导向，RPC更关注方法调用。</li>
              <li><b>Q: 如何处理跨域请求？</b><br />A: 设置CORS相关Header或用中间件。</li>
              <li><b>Q: 如何设计RESTful API的版本？</b><br />A: 推荐在URL中加版本号，如/v1/users。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/http"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：HTTP服务开发
          </a>
          <a
            href="/study/go/database"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：数据库操作
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}