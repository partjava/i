'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '区块链审计',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '双花攻击防护', href: '/study/security/blockchain/double-spend' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述与类型',
    left: (
      <div className="space-y-4">
        <PageTitle>区块链审计概述</PageTitle>
        <BookParagraph>
          区块链审计是指对区块链系统、智能合约、交易数据等进行安全性、合规性和完整性检查，发现潜在风险和漏洞，保障区块链生态的健康发展。
        </BookParagraph>
        <BookParagraph>
          审计不仅包括代码层面的漏洞检测，还涵盖业务逻辑、权限管理、数据一致性等多方面内容。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见审计类型</SectionTitle>
        <BookList items={[
          <><b>智能合约审计：</b>检测合约代码中的安全漏洞和业务逻辑缺陷。</>,
          <><b>链上数据审计：</b>检查区块链数据的完整性和一致性。</>,
          <><b>权限与访问控制审计：</b>分析权限分配和访问控制策略的合理性。</>,
          <><b>异常交易审计：</b>检测链上异常或高风险交易行为。</>,
          <><b>合规性审计：</b>确保区块链系统符合相关法律法规和行业标准。</>,
        ]} />
      </div>
    ),
  },
  {
    label: '流程与案例',
    left: (
      <div className="space-y-4">
        <PageTitle>审计流程</PageTitle>
        <BookList ordered items={[
          '需求分析：明确审计目标和范围。',
          '信息收集：获取合约代码、链上数据、系统配置等。',
          '漏洞检测：使用自动化工具和人工分析发现安全隐患。',
          '风险评估：评估漏洞的危害等级和影响范围。',
          '修复建议：提出修复方案和优化建议。',
          '复审与报告：修复后进行复审，输出审计报告。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>典型案例</SectionTitle>
        <BookParagraph><b>1. The DAO事件</b></BookParagraph>
        <BookParagraph>
          2016年，The DAO智能合约因重入漏洞被攻击，导致6000多万美元以太币被盗，推动了以太坊分叉。
        </BookParagraph>
        <BookParagraph><b>2. Parity多签漏洞</b></BookParagraph>
        <BookParagraph>
          2017年，Parity多签钱包合约因权限管理失误，导致数十万以太币被冻结。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <SectionTitle>1. 智能合约自动化审计（Solidity + Mythril）</SectionTitle>
        <BookCode language="bash" code={`# 使用Mythril对Solidity合约进行自动化审计
myth analyze contracts/MyContract.sol`} />
        <SectionTitle>2. 区块链数据一致性检查（Python）</SectionTitle>
        <BookCode language="python" code={`# 检查区块链数据一致性
import hashlib

def check_blockchain(chain):
    for i in range(1, len(chain)):
        prev_hash = hashlib.sha256(str(chain[i-1]).encode()).hexdigest()
        if chain[i]['prev_hash'] != prev_hash:
            print(f"区块{ i }与前一区块不一致")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 异常交易检测脚本（Python）</SectionTitle>
        <BookCode language="python" code={`# 检测异常交易（如大额转账）
def detect_abnormal_transactions(transactions, threshold):
    for tx in transactions:
        if tx['amount'] > threshold:
            print(f"检测到大额异常交易: {tx}")`} />
        <SectionTitle>4. 权限审计脚本（伪代码）</SectionTitle>
        <BookCode language="javascript" code={`// 权限审计伪代码
for (用户 in 系统用户) {
    if (用户权限超出最小必要权限) {
        记录风险;
    }
}`} />
      </div>
    ),
  },
]

export default function AuditPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
