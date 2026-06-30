'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '网络层安全',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '数据链路层安全', href: '/study/security/network/datalink' },
  nextChapter: { label: '传输层安全', href: '/study/security/network/transport' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>网络层基础原理</PageTitle>
        <BookParagraph>网络层是OSI模型的第三层，主要负责数据包的寻址与路由选择，实现不同网络之间的数据转发。常见协议有IP、ICMP、IGMP等，常见设备有路由器、三层交换机等。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="480" height="120" viewBox="0 0 480 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">主机A</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">路由器1</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">路由器2</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">主机B</text>
            <rect x="420" y="40" width="40" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="440" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">攻击者</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow6)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow6)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow6)" />
            <defs>
              <marker id="arrow6" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语解释</PageTitle>
        <BookList items={[
          'IP地址：网络层的逻辑地址，唯一标识网络中的每台主机',
          '子网：将大型网络划分为多个小型网络，便于管理和安全隔离',
          'NAT：网络地址转换，实现内外网地址映射，隐藏内部结构',
          'ACL：访问控制列表，用于限制哪些IP/协议/端口可以通过路由器',
          'ICMP协议：用于网络诊断和错误报告，如ping、traceroute',
          '路由协议：如OSPF、BGP，用于动态发现和维护路由',
        ]} />
        <BookAlert type="info" message="网络层是整个互联网的核心。理解IP路由、NAT、ACL等概念对掌握网络安全至关重要。" />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>网络层常见威胁</PageTitle>
        <BookList items={[
          'IP欺骗：攻击者伪造源IP地址，绕过访问控制或实施攻击',
          '路由劫持：通过篡改路由表或路由协议，劫持数据流量',
          'DDoS攻击：分布式拒绝服务攻击，消耗网络带宽和设备资源',
          'ICMP攻击：如ICMP洪泛、Ping of Death等，导致网络拥塞或设备崩溃',
          'NAT穿透：攻击者利用NAT漏洞访问内部网络',
          'ACL配置错误：导致未授权访问或合法流量被阻断',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全问题</PageTitle>
        <BookAlert type="warning" message="常见问题：路由环路、黑洞路由、ACL规则冲突、NAT映射异常、ICMP被滥用等。网络层的安全问题往往影响范围大、后果严重。" />
        <TagGrid items={['IP欺骗', '路由劫持', 'DDoS攻击', 'ICMP攻击', 'ACL错误']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>网络层防护措施</PageTitle>
        <BookList items={[
          '配置ACL：精确控制允许和拒绝的IP、协议、端口，阻止未授权访问',
          '启用NAT安全：限制NAT映射，防止内部地址泄露',
          '路由协议认证：为OSPF、BGP等配置认证，防止路由劫持',
          'DDoS防护：部署流量清洗、黑洞路由等技术',
          '限制ICMP：只允许必要的ICMP类型，防止ICMP攻击',
          '定期审计路由表和ACL：及时发现异常配置',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>路由器ACL配置示例</PageTitle>
        <BookCode language="bash" code={`access-list 100 permit tcp any host 192.168.1.10 eq 80
access-list 100 deny ip any any
interface GigabitEthernet0/0
 ip access-group 100 in`} />
        <BookAlert type="info" message="以上Cisco ACL示例仅允许外部访问192.168.1.10的80端口，阻止其他所有流量。ACL配置应遵循最小权限原则。" />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>网络层安全实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司因ACL配置错误，导致外部攻击者可访问内部数据库。启示：ACL规则需精确，定期审计。',
          '案例2：某运营商路由器遭遇BGP劫持，用户流量被重定向到恶意服务器。启示：路由协议必须配置认证，监控路由变更。',
          '案例3：某网站遭遇DDoS攻击，网络带宽被耗尽，服务中断。启示：需部署DDoS防护和流量清洗。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookAlert type="warning" message="网络层安全威胁直接影响网络的可用性和数据的机密性。路由劫持、DDoS等攻击可能导致大范围服务中断。多层防护、定期审计和实时监控是保障网络层安全的三大支柱。" />
        <TagGrid items={['ACL审计', '路由认证', 'DDoS防护', '流量清洗', '多层防护']} />
      </div>
    ),
  },
]

export default function NetworkLayerSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
