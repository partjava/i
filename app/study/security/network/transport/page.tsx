'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '传输层安全',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '网络层安全', href: '/study/security/network/network' },
  nextChapter: { label: '应用层安全', href: '/study/security/network/application' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>传输层基础原理</PageTitle>
        <BookParagraph>传输层是OSI模型的第四层，主要负责端到端的数据传输和通信管理。它为应用层提供可靠（TCP）或不可靠（UDP）的数据传输服务，实现数据分段、重组、流量控制、差错检测等功能。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="500" height="120" viewBox="0 0 500 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">客户端</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">互联网</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">服务器</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">攻击者</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)" />
            <defs>
              <marker id="arrow7" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
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
          'TCP协议：面向连接，提供可靠的数据传输，采用三次握手建立连接、四次挥手断开连接，支持流量控制和拥塞控制',
          'UDP协议：无连接，传输速度快但不保证可靠性，常用于实时音视频、DNS等',
          '端口号：用于标识主机上的具体服务或进程，范围0-65535，常见如80（HTTP）、443（HTTPS）、22（SSH）',
          '三次握手：TCP建立连接的过程，防止伪造连接请求',
          '四次挥手：TCP断开连接的过程，确保数据完整传输',
          '端口扫描：攻击者探测主机开放端口，寻找可利用服务',
          '会话劫持：攻击者窃取或伪造会话信息，冒充合法用户',
          'SSL/TLS：为传输层提供加密和身份认证，保护数据安全',
        ]} />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>传输层常见威胁</PageTitle>
        <BookList items={[
          '端口扫描：攻击者利用工具（如nmap）扫描主机开放端口，寻找漏洞服务',
          'TCP会话劫持：攻击者伪造TCP包，插入或中断正常会话，窃取敏感信息',
          'UDP伪造：利用UDP无连接特性，伪造源地址实施反射攻击',
          '端口爆破：暴力尝试常见服务端口的弱口令或未授权访问',
          'SSL/TLS攻击：如SSL剥离、中间人攻击、协议漏洞利用（如Heartbleed）',
          'DoS攻击：如SYN Flood，消耗服务器资源导致拒绝服务',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全问题</PageTitle>
        <BookAlert type="warning" message="常见问题：服务端口暴露过多、弱口令、TLS配置不当、会话未加密、日志未审计等。传输层是攻击者最常探测的目标层。" />
        <TagGrid items={['端口扫描', '会话劫持', 'SSL攻击', 'SYN Flood', 'UDP反射']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>传输层防护措施</PageTitle>
        <BookList items={[
          '配置防火墙：限制对外开放端口，仅允许必要服务',
          '入侵检测与防御：部署IDS/IPS，检测和阻断异常流量',
          '启用TLS加密：为Web、邮件等服务配置SSL/TLS，防止数据被窃听和篡改',
          '端口管理：定期审计开放端口，关闭不必要服务',
          '会话保护：使用随机会话ID、定期更换、加密存储，防止会话劫持',
          '强密码策略：防止端口爆破和弱口令攻击',
          '日志审计：记录并分析连接和认证日志，及时发现异常',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全配置示例</PageTitle>
        <BookCode language="bash" code={`# 只允许80和443端口对外开放
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp -j DROP`} />
        <BookCode language="nginx" code={`server {
  listen 443 ssl;
  server_name example.com;
  ssl_certificate /etc/nginx/ssl/server.crt;
  ssl_certificate_key /etc/nginx/ssl/server.key;
  ssl_protocols TLSv1.2 TLSv1.3;
}`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>传输层安全实际案例</PageTitle>
        <BookList items={[
          '案例1：某网站未限制端口访问，攻击者通过端口扫描发现后台管理端口，暴力破解后入侵系统。启示：必须限制端口开放，后台端口应加固。',
          '案例2：某企业未启用TLS加密，员工登录信息被中间人窃取。启示：敏感数据传输必须加密。',
          '案例3：某服务器遭遇SYN Flood攻击，资源耗尽导致服务不可用。启示：应部署DoS防护和流量清洗。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookAlert type="warning" message="传输层是网络安全的关键战场——从端口扫描到SYN Flood，攻击手段多样且高效。端口最小化开放、全链路TLS加密、会话保护机制是传输层安全的三道防线。" />
        <TagGrid items={['端口管理', 'TLS加密', 'DoS防护', '会话保护', 'IDS/IPS']} />
      </div>
    ),
  },
]

export default function TransportLayerSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
