'use client';

import { useState } from 'react';

const tabs = [
  { key: 'install', label: '安装Go' },
  { key: 'env', label: '配置环境变量' },
  { key: 'hello', label: 'Hello World' },
  { key: 'tools', label: '常用开发工具' },
  { key: 'faq', label: '常见问题' },
];

export default function GoSetupPage() {
  const [activeTab, setActiveTab] = useState('install');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言环境搭建</h1>
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
        {activeTab === 'install' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安装Go</h2>
            <p>Go支持Windows、macOS、Linux等主流操作系统。</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>访问 <a href="https://golang.org/dl/" className="text-blue-600 underline" target="_blank">https://golang.org/dl/</a> 下载对应平台的安装包。</li>
              <li>根据提示完成安装。</li>
              <li>安装完成后，命令行输入 <code>go version</code> 验证。</li>
            </ol>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`$ go version
# 输出示例
go version go1.21.0 windows/amd64`}
            </pre>
          </div>
        )}
        {activeTab === 'env' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">配置环境变量</h2>
            <p>Go主要环境变量：</p>
            <ul className="list-disc pl-6 mt-2">
              <li><b>GOROOT</b>：Go安装目录，通常自动配置。</li>
              <li><b>GOPATH</b>：工作区目录，Go 1.11+推荐用Go Modules，可不设置。</li>
              <li><b>PATH</b>：需包含Go的bin目录。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`# Windows示例
set PATH=%PATH%;C:\Go\bin

# macOS/Linux示例
export PATH=$PATH:/usr/local/go/bin`}
            </pre>
          </div>
        )}
        {activeTab === 'hello' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hello World</h2>
            <p>编写并运行第一个Go程序：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`}
            </pre>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>保存为 <code>hello.go</code></li>
              <li>命令行运行 <code>go run hello.go</code></li>
              <li>看到输出 <code>Hello, Go!</code></li>
            </ol>
          </div>
        )}
        {activeTab === 'tools' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常用开发工具</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>VS Code + Go插件：主流开发环境，支持智能提示、调试。</li>
              <li>GoLand：JetBrains出品的专业Go IDE。</li>
              <li>gopls：Go官方语言服务器，提升编辑体验。</li>
              <li>dlv：Go调试工具。</li>
              <li>gofmt/goimports：代码格式化与自动导入。</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 安装Go需要管理员权限吗？</b><br />A: 推荐有管理员权限，便于全局安装和环境变量配置。</li>
              <li><b>Q: Go 1.11以后还需要设置GOPATH吗？</b><br />A: 推荐使用Go Modules，无需手动设置GOPATH。</li>
              <li><b>Q: 如何切换Go版本？</b><br />A: 可用gvm、asdf、官方安装包等工具管理多版本。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <a
            href="/study/go/basic"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：基础语法
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
