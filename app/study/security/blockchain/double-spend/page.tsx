'use client';
import { useState } from 'react';

export default function DoubleSpendPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">双花攻击防护</h1>
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
            <h2 className="text-2xl font-semibold mb-3">双花攻击防护概述</h2>
            <div className="prose max-w-none">
              <p>双花攻击是指同一笔加密货币被多次花费，严重威胁区块链系统的可信性和安全性。有效的防护措施对于保障数字资产的唯一性和不可篡改性至关重要。</p>
            </div>
          </div>
        )}
        {activeTab === 'principle' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">攻击原理</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>攻击者通过广播两笔使用同一UTXO的交易，试图让两笔交易都被确认。</li>
                <li>利用网络延迟或算力优势，使得部分节点接受伪造交易。</li>
                <li>在51%攻击下，攻击者可回滚区块链，撤销已确认交易，实现双花。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'defense' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">防护措施</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>多重确认：</b>要求交易经过多个区块确认后才认为有效，增加攻击难度。</li>
                <li><b>节点同步机制：</b>确保所有节点及时同步区块和交易，减少分叉和延迟。</li>
                <li><b>UTXO一致性校验：</b>节点校验每笔交易的输入未被重复使用。</li>
                <li><b>链上监控与报警：</b>实时监控异常交易，发现双花行为及时报警。</li>
                <li><b>经济惩罚机制：</b>对恶意节点或矿工进行惩罚，提升攻击成本。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实际案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 比特币早期双花攻击</h3>
              <p>2010年，比特币网络曾因代码漏洞导致双花攻击，攻击者成功生成了1840亿比特币。</p>
              <h3 className="font-semibold">2. Verge（XVG）双花攻击</h3>
              <p>2018年，Verge遭遇多次双花攻击，攻击者利用时间戳漏洞和算法缺陷，盗取大量资产。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. UTXO一致性校验（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# UTXO一致性校验
class UTXOSet:
    def __init__(self):
        self.utxos = set()

    def is_unspent(self, tx_input):
        return tx_input in self.utxos

    def spend(self, tx_input):
        if tx_input in self.utxos:
            self.utxos.remove(tx_input)
            return True
        return False
`}
              </pre>
              <h3 className="font-semibold">2. 双花交易检测脚本（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 检测同一输入被多次使用
from collections import defaultdict

def detect_double_spend(transactions):
    input_count = defaultdict(int)
    for tx in transactions:
        for tx_input in tx['inputs']:
            input_count[tx_input] += 1
            if input_count[tx_input] > 1:
                print(f"检测到双花输入: {tx_input}")
`}
              </pre>
              <h3 className="font-semibold">3. 区块链一致性校验（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 区块链一致性校验
import hashlib

def check_chain_consistency(chain):
    for i in range(1, len(chain)):
        prev_hash = hashlib.sha256(str(chain[i-1]).encode()).hexdigest()
        if chain[i]['prev_hash'] != prev_hash:
            print(f"区块{ i }与前一区块不一致")
`}
              </pre>
              <h3 className="font-semibold">4. 双花报警系统（伪代码）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 双花报警伪代码
if (检测到双花交易) {
    发送报警邮件给管理员;
    记录日志;
}
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/51-attack" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回51%攻击防护</a>
        <a href="/study/security/blockchain/audit" className="px-4 py-2 text-blue-600 hover:text-blue-800">区块链审计 →</a>
      </div>
    </div>
  );
} 