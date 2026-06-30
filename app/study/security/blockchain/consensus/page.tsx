'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '共识机制安全',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '区块链安全基础', href: '/study/security/blockchain/basic' },
  nextChapter: { label: '智能合约安全', href: '/study/security/blockchain/smart-contract' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '共识机制概述',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是共识机制？</PageTitle>
        <BookParagraph>
          共识机制是区块链网络中所有节点就&ldquo;账本内容&rdquo;达成一致的规则和方法。它保证了没有中心化机构的情况下，大家都认可同一份数据。
        </BookParagraph>
        <BookParagraph>
          简单来说，共识机制就是&ldquo;大家怎么投票决定账本内容&rdquo;。
        </BookParagraph>
        <BookList
          items={[
            '比特币用的是工作量证明（PoW），谁算力高谁记账。',
            '以太坊2.0用的是权益证明（PoS），谁币多谁有更大记账权。',
            '联盟链常用拜占庭容错（BFT）等机制。',
          ]}
        />
        <BookParagraph>
          共识机制的设计直接影响区块链的安全性、效率和去中心化程度。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>共识机制的核心目标</PageTitle>
        <SectionTitle>设计目标</SectionTitle>
        <BookList
          items={[
            '一致性：所有节点最终对账本状态达成一致',
            '安全性：抗攻击能力，防止恶意节点破坏',
            '活性：系统能持续产生新区块，不会停滞',
            '去中心化：不依赖单一节点或小团体',
          ]}
        />
        <BookAlert
          type="info"
          message="不同共识机制在安全性、效率和去中心化之间存在权衡。没有一种共识机制能在所有维度上达到最优，需要根据应用场景选择合适的设计。"
        />
      </div>
    ),
  },
  {
    label: '主流共识机制',
    left: (
      <div className="space-y-4">
        <PageTitle>工作量证明与权益证明</PageTitle>
        <SectionTitle>1. 工作量证明（PoW）</SectionTitle>
        <BookParagraph>通过&ldquo;挖矿&rdquo;竞争记账权，谁先算出答案谁记账。</BookParagraph>
        <BookList
          items={[
            '优点：安全性高，抗攻击能力强。',
            '缺点：耗电量大，效率低，容易被算力集中过度控制。',
            '代表：比特币、以太坊（1.0）。',
          ]}
        />
        <SectionTitle>2. 权益证明（PoS）</SectionTitle>
        <BookParagraph>根据持币数量和持有时间决定记账权，币多者优先。</BookParagraph>
        <BookList
          items={[
            '优点：节能环保，效率高。',
            '缺点：容易&ldquo;富者越富&rdquo;，初期分配不均有风险。',
            '代表：以太坊2.0、EOS等。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>委托权益证明与拜占庭容错</PageTitle>
        <SectionTitle>3. 委托权益证明（DPoS）</SectionTitle>
        <BookParagraph>持币人投票选出&ldquo;代表&rdquo;记账，类似&ldquo;区块链版人大代表&rdquo;。</BookParagraph>
        <BookList
          items={[
            '优点：效率高，适合联盟链。',
            '缺点：去中心化程度降低，代表被收买有风险。',
            '代表：EOS、Steem等。',
          ]}
        />
        <SectionTitle>4. 拜占庭容错（BFT）及变种</SectionTitle>
        <BookParagraph>通过多轮投票达成共识，允许部分节点作恶。</BookParagraph>
        <BookList
          items={[
            '优点：容错性强，适合小规模联盟链。',
            '缺点：节点多时效率下降。',
            '代表：Tendermint、PBFT等。',
          ]}
        />
        <BookAlert type="info" message="实际项目常常结合多种机制，提升安全性和效率。" />
      </div>
    ),
  },
  {
    label: '常见攻击与防护',
    left: (
      <div className="space-y-4">
        <PageTitle>51%攻击与自私挖矿</PageTitle>
        <SectionTitle>1. 51%攻击</SectionTitle>
        <BookParagraph>攻击者控制全网一半以上算力或权益，可篡改交易、双花。</BookParagraph>
        <BookList
          items={[
            '防护：提升全网分布式程度，鼓励更多节点参与，动态调整难度。',
          ]}
        />
        <SectionTitle>2. 自私挖矿</SectionTitle>
        <BookParagraph>矿工私藏新区块，试图获得更多奖励，影响网络公平性。</BookParagraph>
        <BookList
          items={[
            '防护：协议层惩罚自私挖矿行为，优化奖励机制。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>女巫攻击与拜占庭节点作恶</PageTitle>
        <SectionTitle>3. 女巫攻击</SectionTitle>
        <BookParagraph>攻击者伪造多个身份，影响投票结果。</BookParagraph>
        <BookList
          items={[
            '防护：引入身份认证、押金机制。',
          ]}
        />
        <SectionTitle>4. 拜占庭节点作恶</SectionTitle>
        <BookParagraph>部分节点联合作恶，投票欺骗网络。</BookParagraph>
        <BookList
          items={[
            '防护：BFT机制允许一定比例节点作恶，超出阈值则网络报警。',
          ]}
        />
        <BookAlert type="warning" message="共识机制安全是区块链安全的核心，设计合理才能防止大规模作恶。" />
      </div>
    ),
  },
  {
    label: '图解与代码',
    left: (
      <div className="space-y-4">
        <PageTitle>共识机制原理图解</PageTitle>
        <BookParagraph>下面用简单的图示帮助你理解PoW和PoS的基本流程：</BookParagraph>
        <SectionTitle>PoW（工作量证明）流程图</SectionTitle>
        <BookCode
          language="text"
          code={`用户A/矿工A      用户B/矿工B      用户C/矿工C
    |                |                |
    | 竞争算力解题   | 竞争算力解题   | 竞争算力解题
    |----------------|----------------|
                ↓
        谁先算出答案谁记账
                ↓
           广播新区块
                ↓
           全网同步账本`}
        />
        <SectionTitle>PoS（权益证明）流程图</SectionTitle>
        <BookCode
          language="text"
          code={`用户A(币多)   用户B(币少)   用户C(币中)
    |            |            |
    | 参与质押   | 参与质押   | 参与质押
    |------------|------------|
                ↓
        随机选中一个用户记账
                ↓
           广播新区块
                ↓
           全网同步账本`}
        />
        <BookParagraph>更复杂的BFT等机制可用流程图、投票轮次等方式辅助理解。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实用代码：模拟PoW与PoS</PageTitle>
        <SectionTitle>1. PoW简易模拟（Python）</SectionTitle>
        <BookCode
          language="python"
          showLineNumbers
          code={`import hashlib
import time

def proof_of_work(block_data, difficulty=4):
    prefix = '0' * difficulty
    nonce = 0
    while True:
        text = f'{block_data}{nonce}'
        hash_result = hashlib.sha256(text.encode()).hexdigest()
        if hash_result.startswith(prefix):
            return nonce, hash_result
        nonce += 1

if __name__ == '__main__':
    start = time.time()
    nonce, hash_val = proof_of_work('block123', 4)
    print(f'找到nonce: {nonce}, hash: {hash_val}')
    print(f'耗时: {time.time() - start:.2f}秒')`}
        />
        <SectionTitle>2. PoS简易模拟（Python）</SectionTitle>
        <BookCode
          language="python"
          showLineNumbers
          code={`import random

def proof_of_stake(stakes):
    total = sum(stakes.values())
    pick = random.uniform(0, total)
    current = 0
    for user, stake in stakes.items():
        current += stake
        if current > pick:
            return user

if __name__ == '__main__':
    stakes = {'A': 100, 'B': 50, 'C': 10}
    winner = proof_of_stake(stakes)
    print(f'本轮记账权归: {winner}')`}
        />
        <SectionTitle>3. BFT投票轮次伪代码</SectionTitle>
        <BookCode
          language="text"
          showLineNumbers
          maxLines={8}
          code={`# 伪代码：每轮投票，2/3以上同意则通过
for round in range(max_rounds):
    votes = collect_votes()
    if votes['agree'] > 2/3 * total_nodes:
        commit_block()
        break
    else:
        next_round()`}
        />
        <BookParagraph>这些代码帮助你理解共识机制的基本原理，实际项目会更复杂。</BookParagraph>
      </div>
    ),
  },
]

export default function BlockchainConsensusSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
