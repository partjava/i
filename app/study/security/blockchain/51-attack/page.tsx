'use client';
import { useState } from 'react';

export default function Attack51Page() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">51%攻击防护</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('principle')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'principle' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>攻击原理</button>
        <button onClick={() => setActiveTab('defense')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'defense' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>防护措施</button>
        <button onClick={() => setActiveTab('cases')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'cases' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实际案例</button>
        <button onClick={() => setActiveTab('code')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>代码示例</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">51%攻击防护概述</h2>
            <div className="prose max-w-none">
              <p>51%攻击是指攻击者控制了区块链网络超过50%的算力，从而能够篡改区块链数据、发起双花攻击等。防护51%攻击对于保障区块链网络的安全和可信至关重要。</p>
              <p>常见的受害对象包括小型公链、算力分布不均的区块链项目等。</p>
            </div>
          </div>
        )}
        {activeTab === 'principle' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">攻击原理</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>攻击者通过控制超过50%的算力，可以独立挖矿并生成最长链。</li>
                <li>攻击者可拒绝确认其他矿工的交易，甚至回滚已确认的交易，造成双花。</li>
                <li>攻击者可阻止新交易被确认，影响网络正常运行。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'defense' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">防护措施</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>算力分散：</b>鼓励矿工分布在不同矿池，防止算力集中。</li>
                <li><b>动态难度调整：</b>根据算力变化动态调整挖矿难度，防止短时间内算力暴增。</li>
                <li><b>链上监控与报警：</b>实时监控算力分布，发现异常及时报警。</li>
                <li><b>社区治理：</b>通过社区共识和治理机制，防止恶意矿池操控。</li>
                <li><b>经济惩罚机制：</b>对恶意行为设定惩罚，增加攻击成本。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实际案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 比特币黄金（BTG）51%攻击</h3>
              <p>2018年，比特币黄金遭遇51%攻击，攻击者成功进行双花交易，造成数百万美元损失。</p>
              <h3 className="font-semibold">2. 以太坊经典（ETC）51%攻击</h3>
              <p>2019年，以太坊经典多次遭遇51%攻击，导致交易回滚和资产损失。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 算力分布监控脚本（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 算力分布监控脚本
import requests

def get_pool_hashrate(api_url):
    response = requests.get(api_url)
    return response.json()['pools']

if __name__ == "__main__":
    api_url = "http://blockchain.info/pools?format=json"
    pools = get_pool_hashrate(api_url)
    for pool, hashrate in pools.items():
        print(f"矿池: {pool}, 算力: {hashrate}")
`}
              </pre>
              <h3 className="font-semibold">2. 动态难度调整伪代码</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 动态难度调整伪代码
if (当前区块时间 < 目标区块时间) {
    难度 += 调整步长;
} else {
    难度 -= 调整步长;
}
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/mining" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回挖矿安全</a>
        <a href="/study/security/blockchain/double-spend" className="px-4 py-2 text-blue-600 hover:text-blue-800">双花攻击防护 →</a>
      </div>
    </div>
  );
} 