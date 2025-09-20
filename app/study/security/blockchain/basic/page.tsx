'use client';
import { useState } from 'react';

export default function BlockchainSecurityBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">区块链安全基础</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('feature')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'feature' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>核心特性</button>
        <button onClick={() => setActiveTab('risk')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'risk' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>常见风险</button>
        <button onClick={() => setActiveTab('advice')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'advice' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>防护建议</button>
        <button onClick={() => setActiveTab('faq')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'faq' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>常见问题</button>
        <button onClick={() => setActiveTab('tool')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'tool' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实用工具</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">区块链是什么？</h2>
            <div className="prose max-w-none">
              <p>区块链是一种新型的分布式数据库技术，最早应用于比特币。它像一本公开的账本，所有人都可以记账和查账，数据被分成"区块"并按时间顺序连接成"链"。</p>
              <p>区块链的最大特点是去中心化和不可篡改，任何人都无法单方面修改账本内容。</p>
              <ul className="list-disc pl-6">
                <li>比特币、以太坊等数字货币就是基于区块链技术。</li>
                <li>区块链还可以用于供应链金融、数字版权、身份认证等领域。</li>
              </ul>
              <p>举例：你和朋友玩AA记账，每个人都记一份，谁也不能随便改账本，这就是区块链的思想。</p>
            </div>
          </div>
        )}
        {activeTab === 'feature' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">区块链核心特性</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>去中心化：</b>没有"老板"，所有人共同维护账本，数据分布在全球各地。</li>
                <li><b>不可篡改：</b>一旦写入区块链的数据，几乎无法被更改，防止造假。</li>
                <li><b>公开透明：</b>所有交易对所有人可见，任何人都能查账。</li>
                <li><b>匿名性：</b>用地址（公钥）代表身份，保护隐私。</li>
                <li><b>可编程性：</b>支持智能合约，自动执行"如果...就..."的规则。</li>
                <li><b>安全性：</b>用密码学算法（如哈希、签名）保护数据安全。</li>
              </ul>
              <p>举例：你在区块链上转账，所有人都能看到转账记录，但没人知道你是谁。</p>
            </div>
          </div>
        )}
        {activeTab === 'risk' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">区块链常见安全风险</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>私钥泄露：</b>私钥就像银行卡密码，谁拿到谁能转走你的币。常见原因有电脑中毒、钓鱼网站、助记词拍照上传等。</li>
                <li><b>智能合约漏洞：</b>合约代码有漏洞，黑客可利用漏洞盗取资金。比如著名的The DAO事件。</li>
                <li><b>51%攻击：</b>如果某人控制了全网一半以上算力，可以篡改交易记录，造成"双花"。</li>
                <li><b>钓鱼攻击：</b>伪造钱包、交易所网站骗取用户私钥或助记词。</li>
                <li><b>节点攻击：</b>攻击区块链网络中的节点，导致服务中断或数据被篡改。</li>
                <li><b>双花攻击：</b>同一笔数字货币被多次花费，造成资产损失。</li>
                <li><b>社交工程：</b>通过伪装、诱骗等手段骗取用户敏感信息，比如假冒客服。</li>
              </ul>
              <p>案例：2016年The DAO智能合约漏洞，黑客盗走了价值5000万美元的以太币。</p>
            </div>
          </div>
        )}
        {activeTab === 'advice' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">区块链安全防护建议</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>私钥和助记词<b>只写在纸上</b>，不要拍照、截图、上传网盘。</li>
                <li>使用官方钱包和知名交易所，警惕钓鱼网站和假App。</li>
                <li>智能合约上线前要经过<b>专业安全审计</b>，不要随便参与陌生项目。</li>
                <li>及时更新节点和钱包软件，修补安全漏洞。</li>
                <li>采用多重签名、冷钱包等技术提升资产安全性。</li>
                <li>定期备份钱包和重要数据，防止意外丢失。</li>
                <li>不随意点击陌生链接或扫描二维码。</li>
                <li>遇到问题多查资料或问官方社区，不要轻信陌生人。</li>
              </ul>
              <p>小贴士：冷钱包就是不联网的钱包，最安全，但用起来稍麻烦。</p>
            </div>
          </div>
        )}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见问题答疑</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>区块链安全吗？</b> 技术本身很安全，但用户操作失误、合约漏洞等仍可能导致资产损失。</li>
                <li><b>私钥丢了怎么办？</b> 私钥丢失等于资产丢失，无法找回，一定要做好备份！</li>
                <li><b>如何防止被骗？</b> 认准官方渠道，警惕陌生链接和二维码，不要随意输入助记词和私钥。</li>
                <li><b>智能合约安全吗？</b> 只有经过专业安全审计的合约才相对安全，普通用户不要随意参与陌生项目。</li>
                <li><b>区块链能匿名洗钱吗？</b> 虽然区块链有匿名性，但所有交易都可追溯，洗钱风险高且违法。</li>
                <li><b>数字货币丢了能报警吗？</b> 可以报警，但大多数情况下难以追回，预防最重要。</li>
                <li><b>区块链和比特币是一个东西吗？</b> 区块链是底层技术，比特币是区块链的第一个应用。</li>
                <li><b>钱包和交易所的区别？</b> 钱包自己保管私钥，交易所是第三方帮你保管，安全性和便利性不同。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'tool' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实用工具：一键生成以太坊钱包</h2>
            <div className="prose max-w-none">
              <p>下面的Python代码可以一键生成以太坊钱包地址和私钥，适合学习和测试。<b>注意：私钥一定要妥善保存，不能泄露！</b></p>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`from eth_account import Account

def create_wallet():
    acct = Account.create()
    print("钱包地址:", acct.address)
    print("私钥:", acct.key.hex())

if __name__ == '__main__':
    create_wallet()`}
              </pre>
              <p className="text-sm text-gray-500">运行前请先安装依赖：<code>pip install eth-account</code></p>
              <h3 className="text-lg font-semibold mt-6 mb-2">进阶：区块链地址和私钥原理简述</h3>
              <ul className="list-disc pl-6">
                <li>区块链钱包地址是由私钥通过加密算法推导出来的。</li>
                <li>私钥是唯一的，拥有私钥就拥有资产控制权。</li>
                <li>助记词是私钥的另一种备份方式，丢失私钥和助记词资产就无法找回。</li>
                <li>冷钱包、热钱包、硬件钱包等多种钱包类型，适合不同场景。</li>
                <li>建议新手多用小额测试，熟悉流程后再存大额资产。</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回区块链安全</a>
        <a href="/study/security/blockchain/consensus" className="px-4 py-2 text-blue-600 hover:text-blue-800">共识机制安全 →</a>
      </div>
    </div>
  );
} 