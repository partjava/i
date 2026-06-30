'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '挖矿安全',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/blockchain',
  prevChapter: { label: '交易所安全', href: '/study/security/blockchain/exchange' },
  nextChapter: { label: '51%攻击防护', href: '/study/security/blockchain/51-attack' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>挖矿安全概述</PageTitle>
        <BookParagraph>挖矿安全关注于保护矿工、矿池和整个区块链网络的安全，防止算力攻击、恶意矿工、矿池作弊等威胁，确保区块链网络的稳定运行。</BookParagraph>
        <BookParagraph>挖矿安全不仅涉及技术层面，还包括经济激励机制和社区治理等方面。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>挖矿安全的核心要素</PageTitle>
        <BookList items={[
          '算力分散：避免算力过度集中导致中心化风险。',
          '协议安全：确保挖矿协议的安全性，防止漏洞利用。',
          '激励机制：设计合理的奖励机制，防止作弊行为。',
          '网络健壮性：确保挖矿网络能够抵御各种攻击。',
        ]} />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>常见威胁</PageTitle>
        <BookList items={[
          '自私挖矿：矿工故意隐藏已挖出的区块，试图获得更多奖励，影响网络公平性。',
          '矿池攻击：恶意矿池通过算力集中发起攻击，威胁区块链安全。',
          '拒绝服务攻击（DoS）：攻击者通过流量攻击矿池或矿工节点，导致其无法正常工作。',
          '算力劫持：恶意软件劫持矿工算力为攻击者挖矿。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>其他安全威胁</PageTitle>
        <BookList items={[
          '51%攻击：攻击者控制超过50%的算力，可以逆转交易和阻止确认。',
          '日蚀攻击：隔离目标节点，操纵其区块链视图。',
          '时间戳攻击：矿工操纵区块时间戳获取不当利益。',
          '粉尘攻击：向大量地址发送极小金额，破坏用户隐私。',
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
          '分布式矿池：采用分布式架构，降低单点故障和算力集中风险。',
          '节点加固：加强节点安全配置，防止DoS攻击和未授权访问。',
          '算力监控：实时监控算力变化，及时发现异常。',
          '经济激励机制：设计合理的奖励机制，防止自私挖矿和矿池作弊。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>防护策略</PageTitle>
        <BookList items={[
          '实施多重验证机制，确保矿工身份可信。',
          '建立算力异常告警系统，及时响应潜在威胁。',
          '采用抗ASIC算法，促进算力分散化。',
          '定期更新节点软件，修复已知安全漏洞。',
          '加强矿池安全审计，防止内部作弊。',
        ]} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实际案例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">1. 自私挖矿案例</h3>
        <BookParagraph>某矿池通过自私挖矿策略，短时间内获得了超额奖励，导致网络公平性受到质疑。</BookParagraph>
        <h3 className="text-lg font-semibold text-gray-800">2. 矿池攻击案例</h3>
        <BookParagraph>攻击者通过控制大量算力，对某区块链网络发起51%攻击，造成双花交易。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookParagraph>从这些案例中，我们可以总结出以下经验教训：</BookParagraph>
        <BookList items={[
          '算力分散是保障区块链安全的重要基础。',
          '及时发现和应对算力异常至关重要。',
          '矿池需要建立完善的安全监控体系。',
          '社区治理机制可以有效应对安全威胁。',
        ]} />
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">1. 节点算力监控脚本（Python）</h3>
        <BookCode language="python" code={`# 节点算力监控脚本
import requests

def get_hashrate(node_url):
    response = requests.get(f"{node_url}/api/hashrate")
    return response.json()['hashrate']

if __name__ == "__main__":
    node_url = "http://localhost:8545"
    print("当前节点算力：", get_hashrate(node_url))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <h3 className="text-lg font-semibold text-gray-800">2. 拒绝服务攻击检测（Python）</h3>
        <BookCode language="python" code={`# 简单的DoS攻击检测脚本
import time
import requests

def monitor_node(node_url):
    while True:
        try:
            r = requests.get(node_url, timeout=2)
            if r.status_code != 200:
                print("节点异常")
        except Exception:
            print("节点可能遭受DoS攻击")
        time.sleep(10)`} />
      </div>
    ),
  },
]

export default function MiningSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
