'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PhysicalLayerSecurityPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">物理层安全</h1>

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
          基础原理
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'threats'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          常见威胁
        </button>
        <button
          onClick={() => setActiveTab('protection')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'protection'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          防护措施
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实际案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">物理层安全基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>物理层是OSI模型的第一层，负责数据的物理传输，包括电缆、光纤、无线信号等。物理层安全关注硬件设备、传输介质和物理环境的保护，防止因物理破坏、窃听、非法接入等导致的信息泄露和服务中断。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="380" height="120" viewBox="0 0 380 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">终端设备</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机/路由器</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">传输介质</text>
                <rect x="320" y="40" width="40" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="340" y="65" fontSize="14" fill="#334155" textAnchor="middle">外部</text>
                <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">重点术语解释</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>物理介质：</b>如双绞线、光纤、无线信号，是数据传输的载体。</li>
                <li><b>物理隔离：</b>通过断开网络或使用专用线路，防止外部非法访问。</li>
                <li><b>入侵检测：</b>通过物理传感器监控机房、机柜等关键区域。</li>
                <li><b>环境安全：</b>包括防火、防水、防尘、防静电等措施。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">物理层常见威胁</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>物理破坏：</b>如火灾、水灾、地震、暴力破坏等导致设备损坏。</li>
                <li><b>非法接入：</b>攻击者通过插入网线、无线接入点等方式接入内部网络。</li>
                <li><b>窃听与信号干扰：</b>利用专用设备监听有线/无线信号，或通过电磁干扰破坏通信。</li>
                <li><b>设备盗窃：</b>服务器、交换机等关键设备被盗，导致数据泄露或业务中断。</li>
                <li><b>环境威胁：</b>如温湿度异常、静电、灰尘等影响设备正常运行。</li>
              </ul>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <b>常见问题：</b> 机房门禁失效、监控盲区、未定期巡检、设备标签混乱等。
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">物理层防护措施</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>门禁与监控：</b>部署门禁系统和视频监控，限制和记录人员进出。</li>
                <li><b>设备加固：</b>机柜加锁、设备加固螺丝，防止随意拆卸。</li>
                <li><b>物理隔离：</b>关键网络采用专线或断网，防止外部接入。</li>
                <li><b>环境监控：</b>实时监测温湿度、烟雾、漏水等，及时预警。</li>
                <li><b>定期巡检：</b>制定巡检计划，检查设备运行状态和安全隐患。</li>
                <li><b>资产管理：</b>设备编号、标签管理，防止设备丢失和误用。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：自动化巡检脚本（Python）</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`import os
import datetime

def check_device_status(device_list):
    for device in device_list:
        status = os.system(f'ping -n 1 {device}')
        print(f"{datetime.datetime.now()} {device} 状态: {'正常' if status == 0 else '异常'}")

devices = ['192.168.1.1', '192.168.1.2']
check_device_status(devices)`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">物理层安全实际案例</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>案例1：</b> 某公司因机房门禁失效，外部人员进入机房拔掉核心交换机，导致全公司网络瘫痪。<br/> <span className="text-gray-500">启示：门禁和监控必须定期检查，关键设备应加锁。</span></li>
                <li><b>案例2：</b> 某高校实验室因未加装烟雾报警器，火灾导致服务器损毁，重要科研数据丢失。<br/> <span className="text-gray-500">启示：环境监控和数据备份同等重要。</span></li>
                <li><b>案例3：</b> 某企业无线网络被外部人员利用高增益天线窃听，敏感数据泄露。<br/> <span className="text-gray-500">启示：无线信号应物理屏蔽，敏感数据需加密。</span></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/framework"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全模型与框架
        </Link>
        <Link 
          href="/study/security/network/datalink"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数据链路层安全 →
        </Link>
      </div>
    </div>
  );
} 