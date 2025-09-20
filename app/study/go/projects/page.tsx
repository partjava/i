'use client';

import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '项目概述' },
  { key: 'web', label: 'Web服务实战' },
  { key: 'micro', label: '微服务实战' },
  { key: 'tool', label: '工具开发' },
  { key: 'deploy', label: '部署与运维' },
  { key: 'practice', label: '综合练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoProjectsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言项目实战</h1>
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
            <h2 className="text-2xl font-bold mb-4">项目概述</h2>
            <p>本章聚焦Go语言在真实项目中的应用，涵盖Web服务、微服务、命令行工具、自动化运维等多种场景，帮助你掌握从0到1的项目开发与落地能力。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>项目结构设计与模块划分</li>
              <li>主流开发框架选型（Gin、Echo、gRPC等）</li>
              <li>测试、部署、运维全流程</li>
            </ul>
          </div>
        )}
        {activeTab === 'web' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Web服务实战</h2>
            <p>以Gin为例，快速搭建RESTful API服务，涵盖路由、中间件、参数校验、JWT鉴权、日志、配置管理等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'package main',
  'import (',
  '  "github.com/gin-gonic/gin"',
  '  "net/http"',
  ')',
  'func main() {',
  '  r := gin.Default()',
  '  r.Use(gin.Logger())',
  '  r.GET("/ping", func(c *gin.Context) {',
  '    c.JSON(http.StatusOK, gin.H{"message": "pong"})',
  '  })',
  '  r.Run(":8080")',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>参数校验：<code>ShouldBindJSON</code>、自定义校验器</li>
              <li>JWT鉴权：集成<code>github.com/golang-jwt/jwt/v4</code></li>
              <li>配置管理：Viper、环境变量</li>
              <li>日志与链路追踪：Zap、OpenTelemetry</li>
            </ul>
          </div>
        )}
        {activeTab === 'micro' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">微服务实战</h2>
            <p>基于gRPC和etcd实现服务注册、健康检查、负载均衡，结合Docker Compose或K8s部署。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// gRPC服务端注册到etcd，客户端发现服务',
  'import (',
  '  "go.etcd.io/etcd/clientv3"',
  '  "google.golang.org/grpc"',
  '  "context"',
  '  "time"',
  ')',
  '// 注册服务',
  'cli, _ := clientv3.New(clientv3.Config{Endpoints: []string{"localhost:2379"}, DialTimeout: 5 * time.Second})',
  'defer cli.Close()',
  'cli.Put(context.Background(), "/services/user", "127.0.0.1:8080")',
  '// gRPC服务启动略',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>服务拆分与接口定义（proto3）</li>
              <li>服务注册与健康检查</li>
              <li>API网关与限流熔断</li>
              <li>分布式链路追踪（Jaeger、Zipkin）</li>
            </ul>
          </div>
        )}
        {activeTab === 'tool' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">工具开发</h2>
            <p>Go适合开发高效的命令行工具，如自动化脚本、数据处理、CI/CD集成等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'package main',
  'import (',
  '  "fmt"',
  '  "os"',
  ')',
  'func main() {',
  '  if len(os.Args) < 2 {',
  '    fmt.Println("Usage: tool <arg>")',
  '    return',
  '  }',
  '  fmt.Println("Hello,", os.Args[1])',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>flag、cobra等命令行参数解析库</li>
              <li>自动化脚本与定时任务</li>
              <li>与第三方API集成（如GitHub、Slack）</li>
            </ul>
          </div>
        )}
        {activeTab === 'deploy' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">部署与运维</h2>
            <p>介绍Go项目的自动化构建、测试、CI/CD、容器化、监控与日志采集等最佳实践。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# GitHub Actions自动化构建Go项目',
  'name: Go CI',
  'on: [push]',
  'jobs:',
  '  build:',
  '    runs-on: ubuntu-latest',
  '    steps:',
  '      - uses: actions/checkout@v3',
  '      - name: Set up Go',
  '        uses: actions/setup-go@v4',
  '        with:',
  '          go-version: 1.21',
  '      - name: Build',
  '        run: go build -v ./...',
  '      - name: Test',
  '        run: go test -v ./...',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>CI/CD工具：GitHub Actions、Jenkins、GitLab CI</li>
              <li>容器化与自动部署</li>
              <li>Prometheus+Grafana监控</li>
              <li>日志采集与分析（ELK、Loki）</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">综合练习</h2>
            <p className="mb-2 font-semibold">项目1：Todo List RESTful API</p>
            <ul className="list-disc pl-6 mb-2">
              <li>实现用户注册、登录、任务增删查改</li>
              <li>JWT鉴权、参数校验、Swagger文档</li>
              <li>Docker容器化部署</li>
            </ul>
            <p className="mb-2 font-semibold">项目2：分布式短链接服务</p>
            <ul className="list-disc pl-6 mb-2">
              <li>gRPC服务拆分、etcd注册、API网关</li>
              <li>MySQL+Redis存储、限流与熔断</li>
              <li>Prometheus监控、Jaeger链路追踪</li>
            </ul>
            <p className="mb-2 font-semibold">项目3：命令行自动化工具</p>
            <ul className="list-disc pl-6 mb-2">
              <li>批量文件处理、定时任务、邮件通知</li>
              <li>flag/cobra参数解析、日志输出</li>
            </ul>
            <p className="mb-2 font-semibold">实战建议</p>
            <ul className="list-disc pl-6">
              <li>优先选用主流框架和社区库</li>
              <li>重视测试、文档和自动化部署</li>
              <li>关注安全、性能和可维护性</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: Go项目如何组织目录结构？</b><br />A: 推荐采用<code>cmd/</code>、<code>internal/</code>、<code>pkg/</code>等分层结构。</li>
              <li><b>Q: 如何管理多环境配置？</b><br />A: 使用Viper、环境变量和配置文件结合。</li>
              <li><b>Q: Go服务如何优雅重启？</b><br />A: 捕获信号，平滑关闭服务。</li>
              <li><b>Q: 如何做接口文档？</b><br />A: 推荐Swagger/OpenAPI自动生成。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/docker"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：容器化部署
          </a>
        </div>
      </div>
    </div>
  );
}
