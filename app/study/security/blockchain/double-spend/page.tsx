'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '双花攻击防护',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '51%攻击防护', href: '/study/security/blockchain/51-attack' },
  nextChapter: { label: '区块链审计', href: '/study/security/blockchain/audit' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述与原理',
    left: (
      <div className="space-y-4">
        <PageTitle>双花攻击防护概述</PageTitle>
        <BookParagraph>
          双花攻击是指同一笔加密货币被多次花费，严重威胁区块链系统的可信性和安全性。有效的防护措施对于保障数字资产的唯一性和不可篡改性至关重要。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>攻击原理</SectionTitle>
        <BookList items={[
          '攻击者通过广播两笔使用同一UTXO的交易，试图让两笔交易都被确认。',
          '利用网络延迟或算力优势，使得部分节点接受伪造交易。',
          '在51%攻击下，攻击者可回滚区块链，撤销已确认交易，实现双花。',
        ]} />
      </div>
    ),
  },
  {
    label: '防护与案例',
    left: (
      <div className="space-y-4">
        <PageTitle>防护措施</PageTitle>
        <BookList items={[
          <><b>多重确认：</b>要求交易经过多个区块确认后才认为有效，增加攻击难度。</>,
          <><b>节点同步机制：</b>确保所有节点及时同步区块和交易，减少分叉和延迟。</>,
          <><b>UTXO一致性校验：</b>节点校验每笔交易的输入未被重复使用。</>,
          <><b>链上监控与报警：</b>实时监控异常交易，发现双花行为及时报警。</>,
          <><b>经济惩罚机制：</b>对恶意节点或矿工进行惩罚，提升攻击成本。</>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实际案例</SectionTitle>
        <BookParagraph><b>1. 比特币早期双花攻击</b></BookParagraph>
        <BookParagraph>
          2010年，比特币网络曾因代码漏洞导致双花攻击，攻击者成功生成了1840亿比特币。
        </BookParagraph>
        <BookParagraph><b>2. Verge（XVG）双花攻击</b></BookParagraph>
        <BookParagraph>
          2018年，Verge遭遇多次双花攻击，攻击者利用时间戳漏洞和算法缺陷，盗取大量资产。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例(1)',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <SectionTitle>1. UTXO一致性校验（Python）</SectionTitle>
        <BookCode language="python" code={`# UTXO一致性校验
class UTXOSet:
    def __init__(self):
        self.utxos = set()

    def is_unspent(self, tx_input):
        return tx_input in self.utxos

    def spend(self, tx_input):
        if tx_input in self.utxos:
            self.utxos.remove(tx_input)
            return True
        return False`} />
        <SectionTitle>2. 双花交易检测脚本（Python）</SectionTitle>
        <BookCode language="python" code={`# 检测同一输入被多次使用
from collections import defaultdict

def detect_double_spend(transactions):
    input_count = defaultdict(int)
    for tx in transactions:
        for tx_input in tx['inputs']:
            input_count[tx_input] += 1
            if input_count[tx_input] > 1:
                print(f"检测到双花输入: {tx_input}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 区块链一致性校验（Python）</SectionTitle>
        <BookCode language="python" code={`# 区块链一致性校验
import hashlib

def check_chain_consistency(chain):
    for i in range(1, len(chain)):
        prev_hash = hashlib.sha256(str(chain[i-1]).encode()).hexdigest()
        if chain[i]['prev_hash'] != prev_hash:
            print(f"区块{ i }与前一区块不一致")`} />
        <SectionTitle>4. 双花报警系统（伪代码）</SectionTitle>
        <BookCode language="javascript" code={`// 双花报警伪代码
if (检测到双花交易) {
    发送报警邮件给管理员;
    记录日志;
}`} />
      </div>
    ),
  },
]

export default function DoubleSpendPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
