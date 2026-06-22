'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '交易所安全',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '钱包安全', href: '/study/security/blockchain/wallet' },
  nextChapter: { label: '挖矿安全', href: '/study/security/blockchain/mining' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>交易所安全概述</PageTitle>
        <BookParagraph>交易所安全是区块链技术中至关重要的一部分，涉及保护用户的资产和交易数据。交易所需要采取多种措施来确保用户资金的安全，包括冷热钱包管理、多重签名、安全审计等。</BookParagraph>
        <BookParagraph>交易所安全的核心在于保护用户的私钥和交易数据，防止黑客攻击和内部欺诈。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全的重要性</PageTitle>
        <BookParagraph>随着加密货币交易量的增长，交易所已成为黑客攻击的主要目标。一个安全的交易所需要建立多层次的安全防护体系，包括网络安全、应用安全、数据安全、操作安全等各个方面。</BookParagraph>
        <BookParagraph>交易所安全不仅关乎用户资产的安全，也关系到整个区块链生态系统的健康发展。因此，交易所必须持续投入资源进行安全建设和维护。</BookParagraph>
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>常见威胁</PageTitle>
        <BookList items={[
          '黑客攻击：黑客可以通过漏洞利用、钓鱼攻击等方式获取交易所的私钥或用户数据。',
          '内部欺诈：交易所内部人员可能利用职务之便，窃取用户资产。',
          '市场操纵：攻击者可能通过操纵市场，影响交易价格，导致用户损失。',
          '技术故障：交易所的技术故障可能导致用户无法访问其资产或进行交易。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>其他安全风险</PageTitle>
        <BookList items={[
          'DDoS攻击：通过大量流量冲击交易所服务器，导致服务不可用。',
          'API滥用：攻击者利用交易所API漏洞进行未授权操作。',
          '闪电贷攻击：利用DeFi协议中的闪电贷功能进行复杂攻击。',
          '社会工程学：通过欺骗交易所员工或用户获取敏感信息。',
        ]} />
      </div>
    ),
  },
  {
    label: '安全措施',
    left: (
      <div className="space-y-4">
        <PageTitle>安全措施</PageTitle>
        <BookList items={[
          '冷热钱包管理：将大部分资金存储在冷钱包中，减少被黑客攻击的风险。',
          '多重签名：使用多重签名技术，确保交易需要多个私钥的授权。',
          '安全审计：定期进行安全审计，发现并修复潜在的安全漏洞。',
          '用户教育：教育用户如何保护其账户和资产，避免钓鱼攻击。',
          '监控系统：建立实时监控系统，及时发现异常交易和攻击行为。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全最佳实践</PageTitle>
        <BookList items={[
          '采用分层安全架构，隔离不同安全级别的系统。',
          '实施严格的访问控制和身份验证机制。',
          '定期进行渗透测试和漏洞扫描。',
          '建立应急响应计划，快速应对安全事件。',
          '使用硬件安全模块（HSM）保护私钥。',
          '实施交易风控系统，识别和阻止异常交易。',
        ]} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实际案例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">1. 黑客攻击案例</h3>
        <BookParagraph>某交易所因未及时修复漏洞，导致黑客成功窃取大量用户资产。</BookParagraph>
        <h3 className="text-lg font-semibold text-gray-800">2. 内部欺诈案例</h3>
        <BookParagraph>交易所内部人员利用职务之便，窃取用户资产，导致交易所信誉受损。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookParagraph>从这些案例中，我们可以总结出以下经验教训：</BookParagraph>
        <BookList items={[
          '及时更新和修复系统漏洞至关重要。',
          '内部人员监控和权限管理不可忽视。',
          '多重签名和冷存储可以有效降低风险。',
          '建立完善的安全审计和监控体系。',
        ]} />
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">1. 冷热钱包管理的示例（Python）</h3>
        <BookCode language="python" code={`# 冷热钱包管理的示例
class WalletManager:
    def __init__(self):
        self.hot_wallet = HotWallet()
        self.cold_wallet = ColdWallet()

    def transfer_to_hot_wallet(self, amount):
        self.cold_wallet.transfer(amount, self.hot_wallet)

    def transfer_to_cold_wallet(self, amount):
        self.hot_wallet.transfer(amount, self.cold_wallet)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">2. 多重签名的示例（JavaScript）</h3>
        <BookCode language="javascript" code={`// 多重签名的示例
const multiSig = require('multi-sig');

multiSig.createTransaction(transactionData, [key1, key2, key3]);`} />
      </div>
    ),
  },
]

export default function ExchangeSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
