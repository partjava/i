'use client';
import { useState } from 'react';

export default function ExchangeSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">交易所安全</h1>
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
            <h2 className="text-2xl font-semibold mb-3">交易所安全概述</h2>
            <div className="prose max-w-none">
              <p>交易所安全是区块链技术中至关重要的一部分，涉及保护用户的资产和交易数据。交易所需要采取多种措施来确保用户资金的安全，包括冷热钱包管理、多重签名、安全审计等。</p>
              <p>交易所安全的核心在于保护用户的私钥和交易数据，防止黑客攻击和内部欺诈。</p>
            </div>
          </div>
        )}
        {activeTab === 'threats' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见威胁</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>黑客攻击：</b>黑客可以通过漏洞利用、钓鱼攻击等方式获取交易所的私钥或用户数据。</li>
                <li><b>内部欺诈：</b>交易所内部人员可能利用职务之便，窃取用户资产。</li>
                <li><b>市场操纵：</b>攻击者可能通过操纵市场，影响交易价格，导致用户损失。</li>
                <li><b>技术故障：</b>交易所的技术故障可能导致用户无法访问其资产或进行交易。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'measures' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">安全措施</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>冷热钱包管理：</b>将大部分资金存储在冷钱包中，减少被黑客攻击的风险。</li>
                <li><b>多重签名：</b>使用多重签名技术，确保交易需要多个私钥的授权。</li>
                <li><b>安全审计：</b>定期进行安全审计，发现并修复潜在的安全漏洞。</li>
                <li><b>用户教育：</b>教育用户如何保护其账户和资产，避免钓鱼攻击。</li>
                <li><b>监控系统：</b>建立实时监控系统，及时发现异常交易和攻击行为。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实际案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 黑客攻击案例</h3>
              <p>某交易所因未及时修复漏洞，导致黑客成功窃取大量用户资产。</p>
              <h3 className="font-semibold">2. 内部欺诈案例</h3>
              <p>交易所内部人员利用职务之便，窃取用户资产，导致交易所信誉受损。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 冷热钱包管理的示例（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 冷热钱包管理的示例
class WalletManager:
    def __init__(self):
        self.hot_wallet = HotWallet()
        self.cold_wallet = ColdWallet()

    def transfer_to_hot_wallet(self, amount):
        self.cold_wallet.transfer(amount, self.hot_wallet)

    def transfer_to_cold_wallet(self, amount):
        self.hot_wallet.transfer(amount, self.cold_wallet)
`}
              </pre>
              <h3 className="font-semibold">2. 多重签名的示例（JavaScript）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 多重签名的示例
const multiSig = require('multi-sig');

multiSig.createTransaction(transactionData, [key1, key2, key3]);
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/wallet" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回钱包安全</a>
        <a href="/study/security/blockchain/mining" className="px-4 py-2 text-blue-600 hover:text-blue-800">挖矿安全 →</a>
      </div>
    </div>
  );
} 