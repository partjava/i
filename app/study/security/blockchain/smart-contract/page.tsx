'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '智能合约安全',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '共识机制安全', href: '/study/security/blockchain/consensus' },
  nextChapter: { label: '密码学应用', href: '/study/security/blockchain/crypto' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述与漏洞',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是智能合约？</PageTitle>
        <BookParagraph>智能合约是一种自动执行、不可篡改的程序，部署在区块链上。它可以在满足特定条件时自动完成转账、投票等操作，无需第三方中介。智能合约的历史可以追溯到1994年，随着区块链技术的发展，智能合约在金融、供应链、医疗等多个领域得到了广泛应用。</BookParagraph>
        <BookList items={['常用语言：Solidity（以太坊）、Vyper等。', '典型应用：去中心化交易所（DEX）、NFT、DeFi、链上游戏等。', '一旦部署，代码和数据都公开透明，任何人都能查看和调用。', '智能合约在金融领域的应用如自动化支付、保险理赔等。', '在供应链中，智能合约可以用于追踪商品的来源和流通。']} />
        <BookAlert type="warning" message="智能合约的安全性直接关系到链上资产安全，一旦出错或被攻击，损失可能巨大。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>智能合约常见漏洞</PageTitle>
        <BookList items={['重入攻击：攻击者在合约调用外部合约时反复进入，导致资金被多次盗取。', '整数溢出/下溢：数值计算超出范围，导致资产被盗或归零。', '时间戳依赖：合约逻辑依赖区块时间，容易被矿工操控。', '随机数不安全：链上随机数可预测，攻击者可操控结果。', '权限控制不严：合约关键操作未做权限校验，导致被任意调用。', '拒绝服务（DoS）：恶意用户阻塞合约执行，影响正常业务。', '未检查返回值：调用外部合约或转账时未检查返回值，导致资金丢失。', '可升级合约漏洞：合约升级机制设计不当，攻击者可替换逻辑。']} />
        <BookAlert type="info" message="每种漏洞都有真实案例，开发和部署前需重点关注。" />
      </div>
    ),
  },
  {
    label: '攻击案例与审计',
    left: (
      <div className="space-y-4">
        <PageTitle>典型攻击案例</PageTitle>
        <SectionTitle>1. The DAO事件（2016）</SectionTitle>
        <BookList items={['漏洞类型：重入攻击', '损失：约5000万美元以太币', '过程：攻击者利用合约在转账时可反复调用自身，反复取款。']} />
        <SectionTitle>2. Parity多签钱包漏洞（2017）</SectionTitle>
        <BookList items={['漏洞类型：权限控制不严', '损失：约15万个以太币被冻结', '过程：用户可意外调用初始化函数，导致钱包被锁死。']} />
        <SectionTitle>3. Fomo3D游戏漏洞</SectionTitle>
        <BookList items={['漏洞类型：随机数不安全', '过程：攻击者通过预测区块哈希操控游戏结果。']} />
        <BookAlert type="warning" message="这些案例说明，智能合约一旦有漏洞，损失巨大且不可逆。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>合约审计与安全防护</PageTitle>
        <BookList items={['代码审计：专业团队手工+自动化工具检查合约代码，发现潜在漏洞。', '权限管理：关键操作加多重签名、仅限管理员调用。', '重入保护：使用 checks-effects-interactions 模式，或加 reentrancyGuard 修饰器。', '安全数学库：使用 SafeMath 防止整数溢出。', '事件日志：关键操作写入事件，便于追溯。', '升级机制安全：升级合约需严格权限和多重审核。', '测试与演练：部署前充分测试，模拟攻击场景。', '及时响应：发现漏洞及时暂停合约或升级修复。']} />
        <BookAlert type="info" message="主流审计工具：Mythril、Slither、Oyente、CertiK等。" />
      </div>
    ),
  },
  {
    label: '原理图解',
    left: (
      <div className="space-y-4">
        <PageTitle>智能合约安全原理图解</PageTitle>
        <SectionTitle>重入攻击流程图</SectionTitle>
        <BookCode language="text" code={`用户
  |
调用合约A.withdraw()
  |
合约A转账前调用外部合约B
  |
合约B再次调用A.withdraw()
  |
A未更新余额，资金被多次取出`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>权限控制不严示意图</PageTitle>
        <BookCode language="text" code={`用户
  |
调用合约init()
  |
未做权限校验
  |
任意人可初始化/重置合约`} />
        <BookParagraph>图解帮助理解攻击原理，开发时要重点防范。</BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>实用代码与安全示例</PageTitle>
        <SectionTitle>1. 重入攻击不安全合约（Solidity）</SectionTitle>
        <BookCode language="solidity" code={`// 不安全的提现合约
pragma solidity ^0.8.0;
contract Vulnerable {
    mapping(address => uint) public balances;
    function withdraw() public {
        require(balances[msg.sender] > 0, "No balance");
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed");
        balances[msg.sender] = 0; // 余额更新在最后，存在重入风险
    }
}`} />
        <SectionTitle>2. 重入安全合约（Solidity）</SectionTitle>
        <BookCode language="solidity" code={`// 安全的提现合约
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多代码示例</PageTitle>
        <SectionTitle>3. SafeMath防溢出用法（Solidity）</SectionTitle>
        <BookCode language="solidity" code={`// 使用SafeMath防止整数溢出
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Token {
    using SafeMath for uint256;
    mapping(address => uint256) public balances;
    function transfer(address to, uint256 value) public {
        balances[msg.sender] = balances[msg.sender].sub(value);
        balances[to] = balances[to].add(value);
    }
}`} />
        <SectionTitle>4. Python自动化审计脚本示例</SectionTitle>
        <BookCode language="python" code={`# 使用Mythril自动化检测Solidity合约漏洞
import subprocess

def audit_contract(sol_file):
    cmd = f"myth analyze {sol_file}"
    result = subprocess.getoutput(cmd)
    print(result)

if __name__ == '__main__':
    audit_contract('Vulnerable.sol')`} />
        <BookAlert type="info" message="建议开发者多用自动化工具+人工审计，保障合约安全。" />
      </div>
    ),
  },
]

export default function SmartContractSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
