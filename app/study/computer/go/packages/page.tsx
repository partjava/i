'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '包管理基础' },
  { key: 'module', label: '模块系统' },
  { key: 'dep', label: '依赖管理' },
  { key: 'design', label: '包设计原则' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoPackagesPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言包与模块</h1>
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
            <h2 className="text-2xl font-bold mb-4">包管理基础</h2>
            <p>Go语言通过包（package）组织代码，每个包对应一个目录，包含多个.go文件。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 包声明
package main

// 导入包
import (
    "fmt"
    "math"
)

// 包级变量
var Pi = 3.14159

// 包级函数
func CircleArea(r float64) float64 {
    return Pi * r * r
}

func main() {
    fmt.Println(CircleArea(2.0))
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>包名与目录名可以不同，但建议保持一致。</li>
              <li>包级变量和函数首字母大写表示可导出。</li>
            </ul>
          </div>
        )}
        {activeTab === 'module' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">模块系统</h2>
            <p>Go模块（module）是包的集合，通过go.mod文件管理依赖和版本。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// go.mod文件示例
module github.com/user/project

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/sync v0.5.0
)

// 初始化模块
go mod init github.com/user/project

// 添加依赖
go get github.com/gin-gonic/gin@v1.9.1

// 更新依赖
go get -u`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>模块路径通常使用仓库地址。</li>
              <li>go.mod记录依赖版本，go.sum记录校验和。</li>
            </ul>
          </div>
        )}
        {activeTab === 'dep' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">依赖管理</h2>
            <p>Go模块支持版本控制、依赖升级、私有仓库等特性。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 依赖版本控制
require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/sync v0.5.0
)

// 替换依赖
replace (
    github.com/old/module => github.com/new/module v1.0.0
)

// 私有仓库配置
go env -w GOPRIVATE=github.com/private/*

// 清理未使用依赖
go mod tidy`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>使用语义化版本（SemVer）管理依赖。</li>
              <li>支持依赖替换和私有仓库配置。</li>
            </ul>
          </div>
        )}
        {activeTab === 'design' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">包设计原则</h2>
            <p>良好的包设计应遵循单一职责、接口隔离等原则。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 包结构示例
package logger

// 接口定义
type Logger interface {
    Info(msg string)
    Error(msg string)
}

// 实现
type FileLogger struct {
    file *os.File
}

func NewFileLogger(path string) (*FileLogger, error) {
    f, err := os.Create(path)
    if err != nil {
        return nil, err
    }
    return &FileLogger{file: f}, nil
}

func (l *FileLogger) Info(msg string) {
    fmt.Fprintf(l.file, "[INFO] %s\n", msg)
}

func (l *FileLogger) Error(msg string) {
    fmt.Fprintf(l.file, "[ERROR] %s\n", msg)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>包应提供清晰的接口和文档。</li>
              <li>避免循环依赖，保持包间解耦。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：创建自定义包并导出功能</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 文件：math/geometry/circle.go
package geometry

import "math"

// 导出常量
const Pi = math.Pi

// 导出函数
func CircleArea(r float64) float64 {
    return Pi * r * r
}

// 导出类型
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return Pi * c.Radius * c.Radius
}

// 使用示例
import "github.com/user/project/math/geometry"

c := geometry.Circle{Radius: 2.0}
fmt.Println(c.Area())`}
            </pre>
            <p className="mb-2 font-semibold">例题2：使用go mod管理依赖</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 初始化模块
go mod init github.com/user/project

// 添加依赖
go get github.com/gin-gonic/gin@v1.9.1

// 使用依赖
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{"message": "hello"})
    })
    r.Run()
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：设计一个配置管理包</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`package config

import (
    "encoding/json"
    "os"
)

type Config struct {
    Server struct {
        Port int    \`json:"port"\`
        Host string \`json:"host"\`
    } \`json:"server"\`
    Database struct {
        URL string \`json:"url"\`
    } \`json:"database"\`
}

func LoadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, err
    }
    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, err
    }
    return &cfg, nil
}`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: 如何解决循环依赖？</b><br />
                A: 提取公共接口到新包，或使用接口解耦。
              </li>
              <li>
                <b>Q: 如何管理私有依赖？</b><br />
                A: 配置GOPRIVATE环境变量，使用私有仓库。
              </li>
              <li>
                <b>Q: 包名和目录名必须一致吗？</b><br />
                A: 不是必须，但建议保持一致便于维护。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/error-handling"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：错误处理
          </a>
          <a
            href="/study/go/stdlib"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：标准库使用
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}