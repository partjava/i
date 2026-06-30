'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '51%攻击防护',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '挖矿安全', href: '/study/security/blockchain/mining' },
  nextChapter: { label: '双花攻击防护', href: '/study/security/blockchain/double-spend' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述与原理',
    left: (
      <div className="space-y-4">
        <PageTitle>51%攻击防护概述</PageTitle>
        <BookParagraph>
          51%攻击是指攻击者控制了区块链网络超过50%的算力，从而能够篡改区块链数据、发起双花攻击等。防护51%攻击对于保障区块链网络的安全和可信至关重要。
        </BookParagraph>
        <BookParagraph>
          常见的受害对象包括小型公链、算力分布不均的区块链项目等。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>攻击原理</SectionTitle>
        <BookList items={[
          '攻击者通过控制超过50%的算力，可以独立挖矿并生成最长链。',
          '攻击者可拒绝确认其他矿工的交易，甚至回滚已确认的交易，造成双花。',
          '攻击者可阻止新交易被确认，影响网络正常运行。',
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
          <><b>算力分散：</b>鼓励矿工分布在不同矿池，防止算力集中。</>,
          <><b>动态难度调整：</b>根据算力变化动态调整挖矿难度，防止短时间内算力暴增。</>,
          <><b>链上监控与报警：</b>实时监控算力分布，发现异常及时报警。</>,
          <><b>社区治理：</b>通过社区共识和治理机制，防止恶意矿池操控。</>,
          <><b>经济惩罚机制：</b>对恶意行为设定惩罚，增加攻击成本。</>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实际案例</SectionTitle>
        <BookParagraph><b>1. 比特币黄金（BTG）51%攻击</b></BookParagraph>
        <BookParagraph>
          2018年，比特币黄金遭遇51%攻击，攻击者成功进行双花交易，造成数百万美元损失。
        </BookParagraph>
        <BookParagraph><b>2. 以太坊经典（ETC）51%攻击</b></BookParagraph>
        <BookParagraph>
          2019年，以太坊经典多次遭遇51%攻击，导致交易回滚和资产损失。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <SectionTitle>1. 算力分布监控脚本（Python）</SectionTitle>
        <BookCode language="python" code={`# 算力分布监控脚本
import requests

def get_pool_hashrate(api_url):
    response = requests.get(api_url)
    return response.json()['pools']

if __name__ == "__main__":
    api_url = "http://blockchain.info/pools?format=json"
    pools = get_pool_hashrate(api_url)
    for pool, hashrate in pools.items():
        print(f"矿池: {pool}, 算力: {hashrate}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 动态难度调整伪代码</SectionTitle>
        <BookCode language="javascript" code={`// 动态难度调整伪代码
if (当前区块时间 < 目标区块时间) {
    难度 += 调整步长;
} else {
    难度 -= 调整步长;
}`} />
      </div>
    ),
  },
]

export default function Attack51Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
