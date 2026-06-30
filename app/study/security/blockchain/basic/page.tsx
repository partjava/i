'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '区块链安全基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '安全评估', href: '/study/security/ops/assessment' },
  nextChapter: { label: '共识机制安全', href: '/study/security/blockchain/consensus' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '理论基础',
    left: (
      <div className="space-y-4">
        <PageTitle>区块链是什么？</PageTitle>
        <BookParagraph>区块链是一种新型的分布式数据库技术，最早应用于比特币。它像一本公开的账本，所有人都可以记账和查账，数据被分成"区块"并按时间顺序连接成"链"。</BookParagraph>
        <BookParagraph>区块链的最大特点是去中心化和不可篡改，任何人都无法单方面修改账本内容。</BookParagraph>
        <BookList items={[
          '比特币、以太坊等数字货币就是基于区块链技术。',
          '区块链还可以用于供应链金融、数字版权、身份认证等领域。',
        ]} />
        <BookParagraph>举例：你和朋友玩AA记账，每个人都记一份，谁也不能随便改账本，这就是区块链的思想。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>区块链核心特性</PageTitle>
        <BookList items={[
          '<b>去中心化：</b>没有"老板"，所有人共同维护账本，数据分布在全球各地。',
          '<b>不可篡改：</b>一旦写入区块链的数据，几乎无法被更改，防止造假。',
          '<b>公开透明：</b>所有交易对所有人可见，任何人都能查账。',
          '<b>匿名性：</b>用地址（公钥）代表身份，保护隐私。',
          '<b>可编程性：</b>支持智能合约，自动执行"如果...就..."的规则。',
          '<b>安全性：</b>用密码学算法（如哈希、签名）保护数据安全。',
        ]} />
        <BookParagraph>举例：你在区块链上转账，所有人都能看到转账记录，但没人知道你是谁。</BookParagraph>
      </div>
    ),
  },
  {
    label: '安全风险',
    left: (
      <div className="space-y-4">
        <PageTitle>区块链常见安全风险</PageTitle>
        <BookList items={[
          '<b>私钥泄露：</b>私钥就像银行卡密码，谁拿到谁能转走你的币。常见原因有电脑中毒、钓鱼网站、助记词拍照上传等。',
          '<b>智能合约漏洞：</b>合约代码有漏洞，黑客可利用漏洞盗取资金。比如著名的The DAO事件。',
          '<b>51%攻击：</b>如果某人控制了全网一半以上算力，可以篡改交易记录，造成"双花"。',
          '<b>钓鱼攻击：</b>伪造钱包、交易所网站骗取用户私钥或助记词。',
          '<b>节点攻击：</b>攻击区块链网络中的节点，导致服务中断或数据被篡改。',
          '<b>双花攻击：</b>同一笔数字货币被多次花费，造成资产损失。',
          '<b>社交工程：</b>通过伪装、诱骗等手段骗取用户敏感信息，比如假冒客服。',
        ]} />
        <BookParagraph>案例：2016年The DAO智能合约漏洞，黑客盗走了价值5000万美元的以太币。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>区块链安全防护建议</PageTitle>
        <BookList items={[
          '私钥和助记词<b>只写在纸上</b>，不要拍照、截图、上传网盘。',
          '使用官方钱包和知名交易所，警惕钓鱼网站和假App。',
          '智能合约上线前要经过<b>专业安全审计</b>，不要随便参与陌生项目。',
          '及时更新节点和钱包软件，修补安全漏洞。',
          '采用多重签名、冷钱包等技术提升资产安全性。',
          '定期备份钱包和重要数据，防止意外丢失。',
          '不随意点击陌生链接或扫描二维码。',
          '遇到问题多查资料或问官方社区，不要轻信陌生人。',
        ]} />
        <BookParagraph>小贴士：冷钱包就是不联网的钱包，最安全，但用起来稍麻烦。</BookParagraph>
      </div>
    ),
  },
  {
    label: '问答与工具',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题答疑</PageTitle>
        <BookList items={[
          '<b>区块链安全吗？</b> 技术本身很安全，但用户操作失误、合约漏洞等仍可能导致资产损失。',
          '<b>私钥丢了怎么办？</b> 私钥丢失等于资产丢失，无法找回，一定要做好备份！',
          '<b>如何防止被骗？</b> 认准官方渠道，警惕陌生链接和二维码，不要随意输入助记词和私钥。',
          '<b>智能合约安全吗？</b> 只有经过专业安全审计的合约才相对安全，普通用户不要随意参与陌生项目。',
          '<b>区块链能匿名洗钱吗？</b> 虽然区块链有匿名性，但所有交易都可追溯，洗钱风险高且违法。',
          '<b>数字货币丢了能报警吗？</b> 可以报警，但大多数情况下难以追回，预防最重要。',
          '<b>区块链和比特币是一个东西吗？</b> 区块链是底层技术，比特币是区块链的第一个应用。',
          '<b>钱包和交易所的区别？</b> 钱包自己保管私钥，交易所是第三方帮你保管，安全性和便利性不同。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实用工具：一键生成以太坊钱包</PageTitle>
        <BookParagraph>下面的Python代码可以一键生成以太坊钱包地址和私钥，适合学习和测试。<b>注意：私钥一定要妥善保存，不能泄露！</b></BookParagraph>
        <BookCode language="python" code={`from eth_account import Account

def create_wallet():
    acct = Account.create()
    print("钱包地址:", acct.address)
    print("私钥:", acct.key.hex())

if __name__ == '__main__':
    create_wallet()`} />
        <BookParagraph>运行前请先安装依赖：<code className="px-1.5 py-0.5 bg-paper-200/80 rounded text-xs font-code text-amber-dark">pip install eth-account</code></BookParagraph>
        <SectionTitle>进阶：区块链地址和私钥原理简述</SectionTitle>
        <BookList items={[
          '区块链钱包地址是由私钥通过加密算法推导出来的。',
          '私钥是唯一的，拥有私钥就拥有资产控制权。',
          '助记词是私钥的另一种备份方式，丢失私钥和助记词资产就无法找回。',
          '冷钱包、热钱包、硬件钱包等多种钱包类型，适合不同场景。',
          '建议新手多用小额测试，熟悉流程后再存大额资产。',
        ]} />
        <TagGrid items={['私钥', '智能合约', '51%攻击', '冷钱包', '助记词']} />
      </div>
    ),
  },
]

export default function BlockchainSecurityBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
