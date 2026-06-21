'use client';

import { useState } from 'react';

const tabs = [
  { key: 'local', label: '本地安装' },
  { key: 'package', label: '集成环境' },
  { key: 'docker', label: 'Docker环境' },
  { key: 'ide', label: 'IDE与插件' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpSetupPage() {
  const [activeTab, setActiveTab] = useState('local');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">开发环境配置</h1>
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
        {activeTab === 'local' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">本地安装</h2>
            <p>可从<a className="text-blue-600 underline" href="https://www.php.net/downloads" target="_blank">php.net</a>下载适合操作系统的PHP安装包，解压后配置环境变量即可。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Windows：下载zip包，解压并将php.exe目录加入PATH</li>
              <li>macOS：推荐用Homebrew安装 <code>brew install php</code></li>
              <li>Linux：大多数发行版可用包管理器安装 <code>sudo apt install php</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# 查看PHP版本',
  'php -v',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'package' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">集成环境</h2>
            <p>集成环境如XAMPP、WampServer、Laragon等，内置PHP、MySQL、Apache/Nginx，适合初学者一键搭建开发环境。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>XAMPP：跨平台，安装简单，适合入门</li>
              <li>WampServer：适合Windows用户</li>
              <li>Laragon：轻量级，支持多版本切换</li>
            </ul>
          </div>
        )}
        {activeTab === 'docker' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Docker环境</h2>
            <p>使用Docker可快速搭建隔离的PHP开发环境，适合团队协作和多项目开发。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'docker run --rm -it -v $PWD:/app -w /app php:8.2-cli php -a',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>可结合MySQL、Nginx等服务编排</li>
              <li>推荐用docker-compose管理多服务</li>
            </ul>
          </div>
        )}
        {activeTab === 'ide' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">IDE与插件</h2>
            <p>推荐使用VSCode、PhpStorm等现代IDE，提升开发效率。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>VSCode插件：PHP Intelephense、PHP Debug、PHP DocBlocker等</li>
              <li>PhpStorm：强大智能提示、调试、重构、数据库集成</li>
              <li>可用Xdebug进行断点调试</li>
            </ul>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP如何切换版本？</b><br />A: Windows可用phpstudy，macOS用Homebrew，Linux用update-alternatives。</li>
              <li><b>Q: 如何配置php.ini？</b><br />A: 编辑php目录下php.ini，重启服务生效。</li>
              <li><b>Q: PHP如何与MySQL集成？</b><br />A: 安装php-mysql扩展，或用集成环境。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>本地安装PHP并运行<code>php -v</code></li>
              <li>尝试用XAMPP或Laragon搭建开发环境</li>
              <li>用Docker运行一个PHP交互式终端</li>
              <li>为VSCode安装PHP插件并体验代码提示</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/intro"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：PHP编程入门
          </a>
          <a
            href="/study/php/basic"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：基础语法与数据类型
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 