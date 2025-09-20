'use client';

import { useState } from 'react';

const tabs = [
  { key: 'intro', label: 'Go简介' },
  { key: 'features', label: '语言特点' },
  { key: 'scenes', label: '应用场景' },
  { key: 'roadmap', label: '学习路线' },
  { key: 'advice', label: '学习建议' },
];

export default function GoIntroPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言入门</h1>
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
        {activeTab === 'intro' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Go简介</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">什么是Go语言？</h3>
              <p>Go（又称Golang）是Google开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。</p>
            </div>
          </div>
        )}
        {activeTab === 'features' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">语言特点</h2>
            <ul>
              <li>简洁高效：语法简单，学习曲线平缓</li>
              <li>编译型语言：直接编译成机器码，执行速度快</li>
              <li>并发支持：内置goroutine和channel，轻松实现并发编程</li>
              <li>垃圾回收：自动内存管理</li>
              <li>跨平台：支持Windows、Linux、macOS等多个平台</li>
            </ul>
          </div>
        )}
        {activeTab === 'scenes' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">应用场景</h2>
            <ul>
              <li>后端服务开发</li>
              <li>微服务架构</li>
              <li>网络编程</li>
              <li>云原生应用</li>
              <li>系统工具开发</li>
            </ul>
          </div>
        )}
        {activeTab === 'roadmap' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">学习路线</h2>
            <ol>
              <li>开发环境配置</li>
              <li>基础语法</li>
              <li>数据类型</li>
              <li>控制流程</li>
              <li>函数与方法</li>
              <li>并发编程</li>
              <li>项目实战</li>
            </ol>
          </div>
        )}
        {activeTab === 'advice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">学习建议</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <ul>
                <li>多动手实践，编写代码</li>
                <li>理解Go语言的设计理念</li>
                <li>参与开源项目</li>
                <li>阅读优秀的Go代码</li>
                <li>保持持续学习</li>
              </ul>
            </div>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <a
            href="/study/go/setup"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：环境配置
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 