'use client';
import { useState } from 'react';

export default function SmartContractSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">智能合约安全</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('vuln')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'vuln' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>常见漏洞</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>攻击案例</button>
        <button onClick={() => setActiveTab('audit')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'audit' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>审计与防护</button>
        <button onClick={() => setActiveTab('diagram')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'diagram' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>图解</button>
        <button onClick={() => setActiveTab('code')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实用代码</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">什么是智能合约？</h2>
            <div className="prose max-w-none">
              <p>智能合约是一种自动执行、不可篡改的程序，部署在区块链上。它可以在满足特定条件时自动完成转账、投票等操作，无需第三方中介。</p>
              <p>智能合约的历史可以追溯到1994年，随着区块链技术的发展，智能合约在金融、供应链、医疗等多个领域得到了广泛应用。</p>
              <ul className="list-disc pl-6">
                <li>常用语言：Solidity（以太坊）、Vyper等。</li>
                <li>典型应用：去中心化交易所（DEX）、NFT、DeFi、链上游戏等。</li>
                <li>一旦部署，代码和数据都公开透明，任何人都能查看和调用。</li>
                <li>智能合约在金融领域的应用如自动化支付、保险理赔等。</li>
                <li>在供应链中，智能合约可以用于追踪商品的来源和流通。</li>
              </ul>
              <p>智能合约的安全性直接关系到链上资产安全，一旦出错或被攻击，损失可能巨大。</p>
            </div>
          </div>
        )}
        {activeTab === 'vuln' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">智能合约常见漏洞</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>重入攻击：</b>攻击者在合约调用外部合约时反复进入，导致资金被多次盗取。</li>
                <li><b>整数溢出/下溢：</b>数值计算超出范围，导致资产被盗或归零。</li>
                <li><b>时间戳依赖：</b>合约逻辑依赖区块时间，容易被矿工操控。</li>
                <li><b>随机数不安全：</b>链上随机数可预测，攻击者可操控结果。</li>
                <li><b>权限控制不严：</b>合约关键操作未做权限校验，导致被任意调用。</li>
                <li><b>拒绝服务（DoS）：</b>恶意用户阻塞合约执行，影响正常业务。</li>
                <li><b>未检查返回值：</b>调用外部合约或转账时未检查返回值，导致资金丢失。</li>
                <li><b>可升级合约漏洞：</b>合约升级机制设计不当，攻击者可替换逻辑。</li>
              </ul>
              <p>每种漏洞都有真实案例，开发和部署前需重点关注。</p>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">典型攻击案例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. The DAO事件（2016）</h3>
              <ul className="list-disc pl-6">
                <li>漏洞类型：重入攻击</li>
                <li>损失：约5000万美元以太币</li>
                <li>过程：攻击者利用合约在转账时可反复调用自身，反复取款。</li>
              </ul>
              <h3 className="font-semibold">2. Parity多签钱包漏洞（2017）</h3>
              <ul className="list-disc pl-6">
                <li>漏洞类型：权限控制不严</li>
                <li>损失：约15万个以太币被冻结</li>
                <li>过程：用户可意外调用初始化函数，导致钱包被锁死。</li>
              </ul>
              <h3 className="font-semibold">3. Fomo3D游戏漏洞</h3>
              <ul className="list-disc pl-6">
                <li>漏洞类型：随机数不安全</li>
                <li>过程：攻击者通过预测区块哈希操控游戏结果。</li>
              </ul>
              <p>这些案例说明，智能合约一旦有漏洞，损失巨大且不可逆。</p>
            </div>
          </div>
        )}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">合约审计与安全防护</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>代码审计：专业团队手工+自动化工具检查合约代码，发现潜在漏洞。</li>
                <li>权限管理：关键操作加多重签名、仅限管理员调用。</li>
                <li>重入保护：使用 <code>checks-effects-interactions</code> 模式，或加 <code>reentrancyGuard</code> 修饰器。</li>
                <li>安全数学库：使用 <code>SafeMath</code> 防止整数溢出。</li>
                <li>事件日志：关键操作写入事件，便于追溯。</li>
                <li>升级机制安全：升级合约需严格权限和多重审核。</li>
                <li>测试与演练：部署前充分测试，模拟攻击场景。</li>
                <li>及时响应：发现漏洞及时暂停合约或升级修复。</li>
              </ul>
              <p>主流审计工具：Mythril、Slither、Oyente、CertiK等。</p>
            </div>
          </div>
        )}
        {activeTab === 'diagram' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">智能合约安全原理图解</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">重入攻击流程图（ASCII）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`用户
  |
调用合约A.withdraw()
  |
合约A转账前调用外部合约B
  |
合约B再次调用A.withdraw()
  |
A未更新余额，资金被多次取出
`}
              </pre>
              <h3 className="font-semibold">权限控制不严示意图</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`用户
  |
调用合约init()
  |
未做权限校验
  |
任意人可初始化/重置合约
`}
              </pre>
              <p>图解帮助理解攻击原理，开发时要重点防范。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实用代码与安全示例</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 重入攻击不安全合约（Solidity）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 不安全的提现合约
pragma solidity ^0.8.0;
contract Vulnerable {
    mapping(address => uint) public balances;
    function withdraw() public {
        require(balances[msg.sender] > 0, "No balance");
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed");
        balances[msg.sender] = 0; // 余额更新在最后，存在重入风险
    }
}`}
              </pre>
              <h3 className="font-semibold">2. 重入安全合约（Solidity）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 安全的提现合约
pragma solidity ^0.8.0;
contract Safe {
    mapping(address => uint) public balances;
    bool private locked;
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    function withdraw() public noReentrant {
        require(balances[msg.sender] > 0, "No balance");
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0; // 先更新余额
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed");
    }
}`}
              </pre>
              <h3 className="font-semibold">3. SafeMath防溢出用法（Solidity）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 使用SafeMath防止整数溢出
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Token {
    using SafeMath for uint256;
    mapping(address => uint256) public balances;
    function transfer(address to, uint256 value) public {
        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[to] = balances[to].add(value);
    }
}`}
              </pre>
              <h3 className="font-semibold">4. Python自动化审计脚本示例</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 使用Mythril自动化检测Solidity合约漏洞
import subprocess

def audit_contract(sol_file):
    cmd = f"myth analyze {sol_file}"
    result = subprocess.getoutput(cmd)
    print(result)

if __name__ == '__main__':
    audit_contract('Vulnerable.sol')
`}
              </pre>
              <p>建议开发者多用自动化工具+人工审计，保障合约安全。</p>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/consensus" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回共识机制安全</a>
        <a href="/study/security/blockchain/crypto" className="px-4 py-2 text-blue-600 hover:text-blue-800">密码学应用 →</a>
      </div>
    </div>
  );
} 