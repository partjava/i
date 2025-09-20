'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NetworkSecurityIntroPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">网络安全概述</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab('importance')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'importance'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          重要性
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          发展历程
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'threats'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          主要威胁
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络安全基础概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 什么是网络安全？</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      网络安全是指保护计算机网络系统及其数据不受未经授权的访问、使用、泄露、破坏、修改或中断的过程。它涉及多个层面的保护措施，包括：
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>物理安全：保护网络硬件设备</li>
                      <li>逻辑安全：保护网络软件和数据</li>
                      <li>管理安全：制定和执行安全策略</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 网络安全的核心要素</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">网络安全主要包含以下核心要素：</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>机密性（Confidentiality）：确保信息只被授权用户访问</li>
                      <li>完整性（Integrity）：确保信息在传输和存储过程中不被篡改</li>
                      <li>可用性（Availability）：确保授权用户可以随时访问所需信息</li>
                      <li>真实性（Authenticity）：确保信息源的真实性</li>
                      <li>不可否认性（Non-repudiation）：确保用户不能否认其行为</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 网络安全的基本术语</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>漏洞（Vulnerability）：系统中可能被攻击者利用的弱点</li>
                      <li>威胁（Threat）：可能对系统造成损害的潜在事件</li>
                      <li>风险（Risk）：威胁利用漏洞造成损害的可能性</li>
                      <li>攻击（Attack）：试图破坏系统安全的行为</li>
                      <li>防护（Protection）：防止或减轻攻击的措施</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'importance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络安全的重要性</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 个人层面</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>保护个人隐私信息</li>
                      <li>防止身份盗窃</li>
                      <li>保护个人财产安全</li>
                      <li>维护个人声誉</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 企业层面</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>保护商业机密</li>
                      <li>维护企业声誉</li>
                      <li>确保业务连续性</li>
                      <li>遵守法律法规</li>
                      <li>保护客户数据</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 国家层面</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>保护国家机密</li>
                      <li>维护国家安全</li>
                      <li>保障关键基础设施</li>
                      <li>维护社会稳定</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络安全发展历程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 早期阶段（1960-1980）</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ARPANET的诞生</li>
                      <li>第一个计算机病毒的出现</li>
                      <li>早期密码学的发展</li>
                      <li>基本访问控制机制</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 发展阶段（1980-2000）</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>互联网的普及</li>
                      <li>防火墙技术的出现</li>
                      <li>加密标准的制定</li>
                      <li>病毒防护软件的发展</li>
                      <li>安全协议的标准化</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 现代阶段（2000-至今）</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>云计算安全</li>
                      <li>移动安全</li>
                      <li>物联网安全</li>
                      <li>人工智能安全</li>
                      <li>区块链安全</li>
                      <li>零信任安全模型</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">网络安全主要威胁</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 恶意软件</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>病毒（Virus）</li>
                      <li>蠕虫（Worm）</li>
                      <li>特洛伊木马（Trojan）</li>
                      <li>勒索软件（Ransomware）</li>
                      <li>间谍软件（Spyware）</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 网络攻击</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>拒绝服务攻击（DoS/DDoS）</li>
                      <li>中间人攻击（MitM）</li>
                      <li>SQL注入</li>
                      <li>跨站脚本（XSS）</li>
                      <li>跨站请求伪造（CSRF）</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 社会工程学</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>钓鱼攻击</li>
                      <li>假冒身份</li>
                      <li>垃圾邮件</li>
                      <li>电话诈骗</li>
                      <li>社交工程</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">4. 新兴威胁</h4>
                  <div className="prose max-w-none">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>物联网设备攻击</li>
                      <li>人工智能攻击</li>
                      <li>供应链攻击</li>
                      <li>加密货币相关威胁</li>
                      <li>5G网络安全威胁</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回网络基础
        </Link>
        <Link 
          href="/study/security/network/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          网络基础架构 →
        </Link>
      </div>
    </div>
  );
} 