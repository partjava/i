'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '钱包安全',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '密码学应用', href: '/study/security/blockchain/crypto' },
  nextChapter: { label: '交易所安全', href: '/study/security/blockchain/exchange' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '钱包安全概述',
    left: (
      <div className="space-y-4">
        <PageTitle>钱包安全概述</PageTitle>
        <BookParagraph>钱包安全是区块链技术中至关重要的一部分，涉及保护用户的私钥和资产。钱包可以是硬件钱包、软件钱包或在线钱包，每种类型都有其安全性和便利性的权衡。</BookParagraph>
        <BookParagraph>钱包安全的核心在于保护私钥，私钥是访问和控制用户资产的唯一凭证。一旦私钥泄露，用户的资产将面临被盗的风险。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见威胁</PageTitle>
        <BookList items={['<b>私钥泄露：</b>私钥泄露是最常见的威胁，攻击者可以通过钓鱼、恶意软件等方式获取用户的私钥。', '<b>钓鱼攻击：</b>攻击者通过伪造网站或邮件，诱使用户输入私钥或助记词。', '<b>恶意软件：</b>恶意软件可以窃取用户的私钥或助记词，导致资产被盗。', '<b>社会工程学：</b>攻击者通过欺骗用户，获取其私钥或助记词。']} />
      </div>
    ),
  },
  {
    label: '安全措施与案例',
    left: (
      <div className="space-y-4">
        <PageTitle>安全措施</PageTitle>
        <BookList items={['<b>使用硬件钱包：</b>硬件钱包将私钥存储在离线设备中，大大降低了私钥泄露的风险。', '<b>启用双因素认证：</b>双因素认证可以增加一层安全保护，防止未授权的访问。', '<b>定期备份：</b>定期备份钱包的助记词或私钥，以防设备丢失或损坏。', '<b>使用强密码：</b>为钱包设置强密码，增加破解难度。', '<b>警惕钓鱼攻击：</b>不要点击不明链接，不要在不可信的网站上输入私钥或助记词。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实际案例</PageTitle>
        <SectionTitle>1. 钓鱼攻击案例</SectionTitle>
        <BookParagraph>攻击者通过伪造交易所网站，诱使用户输入私钥，导致大量资产被盗。</BookParagraph>
        <SectionTitle>2. 恶意软件案例</SectionTitle>
        <BookParagraph>恶意软件通过窃取用户的私钥，导致用户的加密货币资产被盗。</BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>使用硬件钱包的示例（Python）</PageTitle>
        <BookCode language="python" code={`# 使用硬件钱包的示例
from hw_wallet import HardwareWallet

wallet = HardwareWallet()
wallet.connect()
wallet.sign_transaction(transaction_data)
wallet.disconnect()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>启用双因素认证的示例（JavaScript）</PageTitle>
        <BookCode language="javascript" code={`// 启用双因素认证的示例
const twoFactorAuth = require('two-factor-auth');

twoFactorAuth.enable(userId, secretKey);`} />
      </div>
    ),
  },
]

export default function WalletSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
