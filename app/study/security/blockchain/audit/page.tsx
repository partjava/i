'use client';
import { useState } from 'react';

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">区块链审计</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('types')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'types' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>审计类型</button>
        <button onClick={() => setActiveTab('process')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'process' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>审计流程</button>
        <button onClick={() => setActiveTab('cases')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'cases' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>典型案例</button>
        <button onClick={() => setActiveTab('code')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>代码示例</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">区块链审计概述</h2>
            <div className="prose max-w-none">
              <p>区块链审计是指对区块链系统、智能合约、交易数据等进行安全性、合规性和完整性检查，发现潜在风险和漏洞，保障区块链生态的健康发展。</p>
              <p>审计不仅包括代码层面的漏洞检测，还涵盖业务逻辑、权限管理、数据一致性等多方面内容。</p>
            </div>
          </div>
        )}
        {activeTab === 'types' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见审计类型</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>智能合约审计：</b>检测合约代码中的安全漏洞和业务逻辑缺陷。</li>
                <li><b>链上数据审计：</b>检查区块链数据的完整性和一致性。</li>
                <li><b>权限与访问控制审计：</b>分析权限分配和访问控制策略的合理性。</li>
                <li><b>异常交易审计：</b>检测链上异常或高风险交易行为。</li>
                <li><b>合规性审计：</b>确保区块链系统符合相关法律法规和行业标准。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'process' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">审计流程</h2>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>需求分析：明确审计目标和范围。</li>
                <li>信息收集：获取合约代码、链上数据、系统配置等。</li>
                <li>漏洞检测：使用自动化工具和人工分析发现安全隐患。</li>
                <li>风险评估：评估漏洞的危害等级和影响范围。</li>
                <li>修复建议：提出修复方案和优化建议。</li>
                <li>复审与报告：修复后进行复审，输出审计报告。</li>
              </ol>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">典型案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. The DAO事件</h3>
              <p>2016年，The DAO智能合约因重入漏洞被攻击，导致6000多万美元以太币被盗，推动了以太坊分叉。</p>
              <h3 className="font-semibold">2. Parity多签漏洞</h3>
              <p>2017年，Parity多签钱包合约因权限管理失误，导致数十万以太币被冻结。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 智能合约自动化审计（Solidity + Mythril）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 使用Mythril对Solidity合约进行自动化审计
myth analyze contracts/MyContract.sol
`}
              </pre>
              <h3 className="font-semibold">2. 区块链数据一致性检查（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 检查区块链数据一致性
import hashlib

def check_blockchain(chain):
    for i in range(1, len(chain)):
        prev_hash = hashlib.sha256(str(chain[i-1]).encode()).hexdigest()
        if chain[i]['prev_hash'] != prev_hash:
            print(f"区块{ i }与前一区块不一致")
`}
              </pre>
              <h3 className="font-semibold">3. 异常交易检测脚本（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 检测异常交易（如大额转账）
def detect_abnormal_transactions(transactions, threshold):
    for tx in transactions:
        if tx['amount'] > threshold:
            print(f"检测到大额异常交易: {tx}")
`}
              </pre>
              <h3 className="font-semibold">4. 权限审计脚本（伪代码）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 权限审计伪代码
for (用户 in 系统用户) {
    if (用户权限超出最小必要权限) {
        记录风险;
    }
}
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/double-spend" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回双花攻击防护</a>
        <a href="/study/security/blockchain/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">区块链安全基础 →</a>
      </div>
    </div>
  );
} 