'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '容器基础' },
  { key: 'dockerfile', label: 'Dockerfile与镜像' },
  { key: 'compose', label: '容器编排' },
  { key: 'go', label: '与Go集成' },
  { key: 'practice', label: '实践与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoDockerPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言容器化部署</h1>
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
            <h2 className="text-2xl font-bold mb-4">容器基础</h2>
            <p>容器是一种轻量级、可移植的虚拟化技术，常用Docker实现。容器隔离进程、文件系统和网络，便于应用打包和部署。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>镜像（Image）：应用及其依赖的只读模板</li>
              <li>容器（Container）：镜像运行时的实例</li>
              <li>仓库（Registry）：存储和分发镜像</li>
            </ul>
          </div>
        )}
        {activeTab === 'dockerfile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dockerfile与镜像</h2>
            <p>Dockerfile用于定义镜像构建过程。Go项目常用多阶段构建，减小镜像体积。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# 多阶段构建Go应用的Dockerfile',
  'FROM golang:1.21-alpine AS builder',
  'WORKDIR /app',
  'COPY . .',
  'RUN go build -o main .',
  '',
  'FROM alpine:latest',
  'WORKDIR /root/',
  'COPY --from=builder /app/main .',
  'EXPOSE 8080',
  'CMD ["./main"]',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>使用alpine等精简基础镜像</li>
              <li>分阶段构建，减少最终镜像体积</li>
            </ul>
          </div>
        )}
        {activeTab === 'compose' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">容器编排</h2>
            <p>Docker Compose用于多容器编排，K8s适合大规模生产环境。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# docker-compose.yml示例',
  'version: "3"',
  'services:',
  '  app:',
  '    build: .',
  '    ports:',
  '      - "8080:8080"',
  '  db:',
  '    image: mysql:8',
  '    environment:',
  '      MYSQL_ROOT_PASSWORD: example',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Compose适合本地开发和测试</li>
              <li>K8s支持自动扩缩容、服务发现等</li>
            </ul>
          </div>
        )}
        {activeTab === 'go' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">与Go集成</h2>
            <p>Go应用天然适合容器化，编译为静态二进制，易于跨平台部署。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// main.go 示例',
  'package main',
  'import (',
  '    "net/http"',
  '    "os"',
  ')',
  'func main() {',
  '    port := os.Getenv("PORT")',
  '    if port == "" { port = "8080" }',
  '    http.HandleFunc("/", func(w, r) { w.Write([]byte("Hello, Docker!")) })',
  '    http.ListenAndServe(":"+port, nil)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>通过环境变量配置端口、数据库等</li>
              <li>可结合CI/CD自动构建镜像</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实践与练习</h2>
            <p className="mb-2 font-semibold">例题1：为Go Web服务编写Dockerfile并构建镜像</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# 编写Dockerfile，构建并运行Go服务',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">例题2：用Compose编排Go服务和数据库</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# 编写docker-compose.yml，实现服务与MySQL联动',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">练习：将已有Go项目容器化并推送到镜像仓库</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# 构建、打tag并推送到Docker Hub',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: Go镜像如何减小体积？</b><br />A: 使用多阶段构建和alpine基础镜像。</li>
              <li><b>Q: 容器如何持久化数据？</b><br />A: 使用数据卷（volumes）挂载主机目录。</li>
              <li><b>Q: Go服务如何优雅重启？</b><br />A: 捕获信号，平滑关闭服务。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/microservices"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：微服务开发
          </a>
          <a
            href="/study/go/projects"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：项目实战
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
