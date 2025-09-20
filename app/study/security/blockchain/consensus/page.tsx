'use client';
import { useState } from 'react';

export default function BlockchainConsensusSecurityPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">共识机制安全</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('types')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'types' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>主流共识机制</button>
        <button onClick={() => setActiveTab('attack')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'attack' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>常见攻击与防护</button>
        <button onClick={() => setActiveTab('diagram')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'diagram' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>图解</button>
        <button onClick={() => setActiveTab('code')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'code' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实用代码</button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">什么是共识机制？</h2>
            <div className="prose max-w-none">
              <p>共识机制是区块链网络中所有节点就"账本内容"达成一致的规则和方法。它保证了没有中心化机构的情况下，大家都认可同一份数据。</p>
              <p>简单来说，共识机制就是"大家怎么投票决定账本内容"。</p>
              <ul className="list-disc pl-6">
                <li>比特币用的是工作量证明（PoW），谁算力高谁记账。</li>
                <li>以太坊2.0用的是权益证明（PoS），谁币多谁有更大记账权。</li>
                <li>联盟链常用拜占庭容错（BFT）等机制。</li>
              </ul>
              <p>共识机制的设计直接影响区块链的安全性、效率和去中心化程度。</p>
            </div>
          </div>
        )}
        {activeTab === 'types' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">主流共识机制详解</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 工作量证明（PoW）</h3>
              <ul className="list-disc pl-6">
                <li>通过"挖矿"竞争记账权，谁先算出答案谁记账。</li>
                <li>优点：安全性高，抗攻击能力强。</li>
                <li>缺点：耗电量大，效率低，容易被算力集中过度控制。</li>
                <li>代表：比特币、以太坊（1.0）。</li>
              </ul>
              <h3 className="font-semibold">2. 权益证明（PoS）</h3>
              <ul className="list-disc pl-6">
                <li>根据持币数量和持有时间决定记账权，币多者优先。</li>
                <li>优点：节能环保，效率高。</li>
                <li>缺点：容易"富者越富"，初期分配不均有风险。</li>
                <li>代表：以太坊2.0、EOS等。</li>
              </ul>
              <h3 className="font-semibold">3. 委托权益证明（DPoS）</h3>
              <ul className="list-disc pl-6">
                <li>持币人投票选出"代表"记账，类似"区块链版人大代表"。</li>
                <li>优点：效率高，适合联盟链。</li>
                <li>缺点：去中心化程度降低，代表被收买有风险。</li>
                <li>代表：EOS、Steem等。</li>
              </ul>
              <h3 className="font-semibold">4. 拜占庭容错（BFT）及变种</h3>
              <ul className="list-disc pl-6">
                <li>通过多轮投票达成共识，允许部分节点作恶。</li>
                <li>优点：容错性强，适合小规模联盟链。</li>
                <li>缺点：节点多时效率下降。</li>
                <li>代表：Tendermint、PBFT等。</li>
              </ul>
              <p>实际项目常常结合多种机制，提升安全性和效率。</p>
            </div>
          </div>
        )}
        {activeTab === 'attack' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">常见攻击与防护</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. 51%攻击</h3>
              <ul className="list-disc pl-6">
                <li>攻击者控制全网一半以上算力或权益，可篡改交易、双花。</li>
                <li>防护：提升全网分布式程度，鼓励更多节点参与，动态调整难度。</li>
              </ul>
              <h3 className="font-semibold">2. 自私挖矿</h3>
              <ul className="list-disc pl-6">
                <li>矿工私藏新区块，试图获得更多奖励，影响网络公平性。</li>
                <li>防护：协议层惩罚自私挖矿行为，优化奖励机制。</li>
              </ul>
              <h3 className="font-semibold">3. 女巫攻击</h3>
              <ul className="list-disc pl-6">
                <li>攻击者伪造多个身份，影响投票结果。</li>
                <li>防护：引入身份认证、押金机制。</li>
              </ul>
              <h3 className="font-semibold">4. 拜占庭节点作恶</h3>
              <ul className="list-disc pl-6">
                <li>部分节点联合作恶，投票欺骗网络。</li>
                <li>防护：BFT机制允许一定比例节点作恶，超出阈值则网络报警。</li>
              </ul>
              <p>共识机制安全是区块链安全的核心，设计合理才能防止大规模作恶。</p>
            </div>
          </div>
        )}
        {activeTab === 'diagram' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">共识机制原理图解</h2>
            <div className="prose max-w-none">
              <p>下面用简单的图示帮助你理解PoW和PoS的基本流程：</p>
              <h3 className="font-semibold">PoW（工作量证明）流程图</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`用户A/矿工A      用户B/矿工B      用户C/矿工C
    |                |                |
    | 竞争算力解题   | 竞争算力解题   | 竞争算力解题
    |----------------|----------------|
                ↓
        谁先算出答案谁记账
                ↓
           广播新区块
                ↓
           全网同步账本
`}
              </pre>
              <h3 className="font-semibold">PoS（权益证明）流程图</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`用户A(币多)   用户B(币少)   用户C(币中)
    |            |            |
    | 参与质押   | 参与质押   | 参与质押
    |------------|------------|
                ↓
        随机选中一个用户记账
                ↓
           广播新区块
                ↓
           全网同步账本
`}
              </pre>
              <p>更复杂的BFT等机制可用流程图、投票轮次等方式辅助理解。</p>
            </div>
          </div>
        )}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-3">实用代码：模拟PoW与PoS</h2>
            <div className="prose max-w-none">
              <h3 className="font-semibold">1. PoW简易模拟（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`import hashlib
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
    print(f'耗时: {time.time() - start:.2f}秒')
`}
              </pre>
              <h3 className="font-semibold">2. PoS简易模拟（Python）</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`import random

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
    print(f'本轮记账权归: {winner}')
`}
              </pre>
              <h3 className="font-semibold">3. BFT投票轮次伪代码</h3>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`# 伪代码：每轮投票，2/3以上同意则通过
for round in range(max_rounds):
    votes = collect_votes()
    if votes['agree'] > 2/3 * total_nodes:
        commit_block()
        break
    else:
        next_round()
`}
              </pre>
              <p>这些代码帮助你理解共识机制的基本原理，实际项目会更复杂。</p>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <a href="/study/security/blockchain/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回区块链安全基础</a>
        <a href="/study/security/blockchain/smart-contract" className="px-4 py-2 text-blue-600 hover:text-blue-800">智能合约安全 →</a>
      </div>
    </div>
  );
} 