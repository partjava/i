'use client';

import { useState } from 'react';

const tabs = [
  { key: 'intro', label: '语言简介' },
  { key: 'hello', label: 'Hello World' },
  { key: 'env', label: '开发环境' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpIntroPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">PHP编程入门</h1>
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
            <h2 className="text-2xl font-bold mb-4">语言简介</h2>
            <p>PHP（全称：PHP: Hypertext Preprocessor）是一种广泛应用于Web开发的开源脚本语言，语法简单，易于上手，拥有庞大的社区和丰富的扩展库。PHP可嵌入HTML，适合快速开发动态网站和API。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>跨平台，支持Linux、Windows、macOS</li>
              <li>主流Web服务器（Apache、Nginx）均支持</li>
              <li>广泛应用于CMS、博客、电商、API等场景</li>
            </ul>
          </div>
        )}
        {activeTab === 'hello' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hello World</h2>
            <p>PHP文件以<code>.php</code>为后缀，代码可直接嵌入HTML。最简单的Hello World示例：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  'echo "Hello, World!";',
  '?>',
].join('\n')}
            </pre>
            <p>将上述代码保存为<code>hello.php</code>，在命令行运行<code>php hello.php</code>，或放到Web服务器访问。</p>
          </div>
        )}
        {activeTab === 'env' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">开发环境</h2>
            <p>PHP开发环境常见选择：</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>本地安装：</b> 直接下载安装PHP（<a className="text-blue-600 underline" href="https://www.php.net/downloads" target="_blank">php.net</a>）</li>
              <li><b>集成环境：</b> XAMPP、WampServer、Laragon等一键集成PHP+MySQL+Apache</li>
              <li><b>容器化：</b> 使用Docker快速搭建开发环境</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# Docker方式示例',
  'docker run --rm -it -v $PWD:/app -w /app php:8.2-cli php hello.php',
].join('\n')}
            </pre>
            <p>推荐使用VSCode、PhpStorm等现代IDE进行开发。</p>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP和JavaScript、Python相比有什么特点？</b><br />A: PHP专注Web后端，易于部署，生态成熟，适合中小型Web项目。</li>
              <li><b>Q: PHP还能学吗？</b><br />A: 依然有大量网站和企业在用，WordPress、Laravel等生态活跃。</li>
              <li><b>Q: PHP必须配合Web服务器用吗？</b><br />A: CLI模式可直接运行脚本，Web开发需配合服务器。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>编写一个hello.php，输出你的名字</li>
              <li>尝试用命令行和Web两种方式运行PHP脚本</li>
              <li>查找并安装一个本地PHP集成环境</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-end">
          <a
            href="/study/php/setup"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：开发环境配置
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 