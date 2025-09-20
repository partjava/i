'use client';
import { useState } from 'react';

export default function WalletSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">钱包安全</h1>
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
            <h2 className="text-2xl font-semibold mb-3">钱包安全概述</h2>
            <div className="prose max-w-none">
              <p>钱包安全是区块链技术中至关重要的一部分，涉及保护用户的私钥和资产。钱包可以是硬件钱包、软件钱包或在线钱包，每种类型都有其安全性和便利性的权衡。</p>
              <p>钱包安全的核心在于保护私钥，私钥是访问和控制用户资产的唯一凭证。一旦私钥泄露，用户的资产将面临被盗的风险。</p>
            </div>
          </div>
        )}
        {activeTab === 'threats' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见威胁</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>私钥泄露：</b>私钥泄露是最常见的威胁，攻击者可以通过钓鱼、恶意软件等方式获取用户的私钥。</li>
                <li><b>钓鱼攻击：</b>攻击者通过伪造网站或邮件，诱使用户输入私钥或助记词。</li>
                <li><b>恶意软件：</b>恶意软件可以窃取用户的私钥或助记词，导致资产被盗。</li>
                <li><b>社会工程学：</b>攻击者通过欺骗用户，获取其私钥或助记词。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'measures' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">安全措施</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>使用硬件钱包：</b>硬件钱包将私钥存储在离线设备中，大大降低了私钥泄露的风险。</li>
                <li><b>启用双因素认证：</b>双因素认证可以增加一层安全保护，防止未授权的访问。</li>
                <li><b>定期备份：</b>定期备份钱包的助记词或私钥，以防设备丢失或损坏。</li>
                <li><b>使用强密码：</b>为钱包设置强密码，增加破解难度。</li>
                <li><b>警惕钓鱼攻击：</b>不要点击不明链接，不要在不可信的网站上输入私钥或助记词。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实际案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 钓鱼攻击案例</h3>
              <p>攻击者通过伪造交易所网站，诱使用户输入私钥，导致大量资产被盗。</p>
              <h3 className="font-semibold">2. 恶意软件案例</h3>
              <p>恶意软件通过窃取用户的私钥，导致用户的加密货币资产被盗。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">代码示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 使用硬件钱包的示例（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 使用硬件钱包的示例
from hw_wallet import HardwareWallet

wallet = HardwareWallet()
wallet.connect()
wallet.sign_transaction(transaction_data)
wallet.disconnect()
`}
              </pre>
              <h3 className="font-semibold">2. 启用双因素认证的示例（JavaScript）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 启用双因素认证的示例
const twoFactorAuth = require('two-factor-auth');

twoFactorAuth.enable(userId, secretKey);
`}
              </pre>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/crypto" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回密码学应用</a>
        <a href="/study/security/blockchain/exchange" className="px-4 py-2 text-blue-600 hover:text-blue-800">交易所安全 →</a>
      </div>
    </div>
  );
} 