'use client';
import { useState } from 'react';

export default function MiningSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">挖矿安全</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('threats')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'threats' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>常见威胁</button>
        <button onClick={() => setActiveTab('measures')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'measures' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>安全措施</button>
        <button onClick={() => setActiveTab('cases')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'cases' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实际案例</button>
        <button onClick={() => setActiveTab('code')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>代码示例</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">挖矿安全概述</h2>
            <div className="prose max-w-none">
              <p>挖矿安全关注于保护矿工、矿池和整个区块链网络的安全，防止算力攻击、恶意矿工、矿池作弊等威胁，确保区块链网络的稳定运行。</p>
              <p>挖矿安全不仅涉及技术层面，还包括经济激励机制和社区治理等方面。</p>
            </div>
          </div>
        )}
        {activeTab === 'threats' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见威胁</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>自私挖矿：</b>矿工故意隐藏已挖出的区块，试图获得更多奖励，影响网络公平性。</li>
                <li><b>矿池攻击：</b>恶意矿池通过算力集中发起攻击，威胁区块链安全。</li>
                <li><b>拒绝服务攻击（DoS）：</b>攻击者通过流量攻击矿池或矿工节点，导致其无法正常工作。</li>
                <li><b>算力劫持：</b>恶意软件劫持矿工算力为攻击者挖矿。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'measures' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">安全措施</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>分布式矿池：</b>采用分布式架构，降低单点故障和算力集中风险。</li>
                <li><b>节点加固：</b>加强节点安全配置，防止DoS攻击和未授权访问。</li>
                <li><b>算力监控：</b>实时监控算力变化，及时发现异常。</li>
                <li><b>经济激励机制：</b>设计合理的奖励机制，防止自私挖矿和矿池作弊。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实际案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 自私挖矿案例</h3>
              <p>某矿池通过自私挖矿策略，短时间内获得了超额奖励，导致网络公平性受到质疑。</p>
              <h3 className="font-semibold">2. 矿池攻击案例</h3>
              <p>攻击者通过控制大量算力，对某区块链网络发起51%攻击，造成双花交易。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 节点算力监控脚本（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 节点算力监控脚本
import requests

def get_hashrate(node_url):
    response = requests.get(f"{node_url}/api/hashrate")
    return response.json()['hashrate']

if __name__ == "__main__":
    node_url = "http://localhost:8545"
    print("当前节点算力：", get_hashrate(node_url))
`}
              </pre>
              <h3 className="font-semibold">2. 拒绝服务攻击检测（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 简单的DoS攻击检测脚本
import time
import requests

def monitor_node(node_url):
    while True:
        try:
            r = requests.get(node_url, timeout=2)
            if r.status_code != 200:
                print("节点异常")
        except Exception:
            print("节点可能遭受DoS攻击")
        time.sleep(10)
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/exchange" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回交易所安全</a>
        <a href="/study/security/blockchain/51-attack" className="px-4 py-2 text-blue-600 hover:text-blue-800">51%攻击防护 →</a>
      </div>
    </div>
  );
} 