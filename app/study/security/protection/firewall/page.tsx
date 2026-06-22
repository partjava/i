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
  chapterTitle: '防火墙技术',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '加密技术', href: '/study/security/protection/encryption' },
  nextChapter: { label: '入侵检测', href: '/study/security/protection/ids' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙技术基础原理</PageTitle>
        <BookParagraph>防火墙是网络安全防护的核心设备或软件，通过对进出网络的数据流进行检测、过滤和控制，实现对网络边界的安全隔离和访问管理。</BookParagraph>
        <BookList items={[
          '边界防护：防火墙作为内外网的「关卡」，控制数据流入和流出',
          '策略控制：基于预设安全策略，允许或拒绝特定流量',
          '日志审计：记录访问和攻击行为，便于溯源和分析',
          '多层防护：现代防火墙支持包过滤、状态检测、应用识别等多层次防护',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="100" viewBox="0 0 520 100">
            <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">内网</text>
            <rect x="140" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="190" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙</text>
            <rect x="260" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="310" y="55" fontSize="14" fill="#db2777" textAnchor="middle">外网</text>
            <rect x="380" y="30" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="430" y="55" fontSize="14" fill="#eab308" textAnchor="middle">日志/告警</text>
            <line x1="120" y1="50" x2="140" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw)" />
            <line x1="240" y1="50" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw)" />
            <line x1="360" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw)" />
            <defs>
              <marker id="arrow_fw" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语</PageTitle>
        <BookList items={[
          '包过滤：基于IP、端口、协议等信息过滤数据包',
          '状态检测：跟踪连接状态，防止伪造包绕过',
          '应用层防护：识别和控制应用协议（如HTTP、DNS）',
          'DMZ：隔离区，部署对外服务，降低内网风险',
          '日志审计：记录访问、告警和策略变更',
        ]} />
        <BookAlert type="info" message="防火墙不仅可部署于网络边界，还可用于分区隔离、云安全、主机安全等多种场景。它是整个安全体系的第一道大门。" />
      </div>
    ),
  },
  {
    label: '类型与架构',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙类型与架构</PageTitle>
        <BookList items={[
          '包过滤防火墙：最基础，基于五元组（源/目的IP、端口、协议）过滤，速度快但无法识别应用层攻击',
          '状态检测防火墙：跟踪连接状态，防止伪造包，提升安全性',
          '代理型防火墙：作为中间人转发流量，能深度检测和隐藏内网结构',
          '下一代防火墙（NGFW）：集成应用识别、入侵防御、内容过滤等高级功能',
          '云防火墙：部署于云平台，支持弹性扩展和多租户管理',
          '主机防火墙：运行于操作系统内核，保护单台主机',
        ]} />
        <BookParagraph>实际部署中，常采用多种防火墙组合，形成分层防护体系。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>DMZ架构示意图</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="100" viewBox="0 0 520 100">
            <rect x="20" y="30" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">内网</text>
            <rect x="140" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="190" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙1</text>
            <rect x="260" y="30" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="310" y="55" fontSize="14" fill="#db2777" textAnchor="middle">DMZ区</text>
            <rect x="380" y="30" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="430" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">防火墙2</text>
            <line x1="120" y1="50" x2="140" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw2)" />
            <line x1="240" y1="50" x2="260" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw2)" />
            <line x1="360" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_fw2)" />
            <defs>
              <marker id="arrow_fw2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '功能与策略',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙功能与安全策略</PageTitle>
        <BookList items={[
          '访问控制：基于IP、端口、协议、应用等多维度控制流量',
          'NAT转换：隐藏内网结构，实现地址复用',
          '入侵检测与防御：识别并拦截攻击流量（如SQL注入、DDoS）',
          '内容过滤：阻断恶意网站、病毒、敏感信息',
          '日志与告警：实时记录和告警异常行为',
          'VPN支持：加密远程访问，保障数据安全',
          '高可用与负载均衡：保障业务连续性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>策略设计原则</PageTitle>
        <BookAlert type="info" message="安全策略设计需遵循「默认拒绝、最小授权、分区隔离、动态调整」等原则。防火墙策略应「默认拒绝，按需放行」，避免策略过宽。" />
      </div>
    ),
  },
  {
    label: '配置示例',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙配置示例</PageTitle>
        <SectionTitle>Linux iptables</SectionTitle>
        <BookCode language="bash" code={`# 默认拒绝所有流量
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许本地回环
iptables -A INPUT -i lo -j ACCEPT

# 允许SSH远程管理
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许Web服务
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 允许已建立连接
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`} />
        <SectionTitle>Cisco防火墙ACL</SectionTitle>
        <BookCode language="bash" code={`access-list 100 permit tcp 192.168.1.0 0.0.0.255 any eq 80
access-list 100 deny ip any 192.168.1.0 0.0.0.255
interface GigabitEthernet0/1
 ip access-group 100 in`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>云与Windows防火墙</PageTitle>
        <SectionTitle>阿里云安全组</SectionTitle>
        <BookCode language="bash" code={`# 允许80/443端口入站
授权策略：允许
协议类型：TCP
端口范围：80/443
授权对象：0.0.0.0/0

# 拒绝所有其他入站
授权策略：拒绝
协议类型：ALL
端口范围：1-65535
授权对象：0.0.0.0/0`} />
        <SectionTitle>Windows防火墙（PowerShell）</SectionTitle>
        <BookCode language="powershell" code={`# 允许80端口入站
New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# 拒绝所有入站
Set-NetFirewallProfile -Profile Domain,Public,Private -DefaultInboundAction Block`} />
        <BookAlert type="info" message="防火墙配置通用原则：默认拒绝+白名单放行。云防火墙（安全组）建议「最小开放、按需放行」。" />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司新上线服务器未配置防火墙，黑客扫描端口后利用漏洞入侵。启示：上线前必须配置防火墙，关闭不必要端口。',
          '案例2：某企业防火墙策略设置为「允许所有出站」，导致敏感数据被外泄。启示：出站流量应按需放行，结合DLP系统加强防护。',
          '案例3：某云服务器安全组规则配置过于宽松，黑客利用弱口令爆破成功入侵。启示：云防火墙应最小开放端口，禁止0.0.0.0/0全放通。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '防火墙策略应「默认拒绝，按需放行」，避免策略过宽',
          '定期审计和优化防火墙规则，及时清理冗余策略',
          '敏感服务（如SSH、数据库）应限制来源IP',
          '结合入侵检测、DLP等系统提升整体防护',
          '云防火墙需关注安全组配置，避免全网开放',
          '配置变更需审批和记录，防止误操作',
          '关注防火墙日志和告警，及时响应异常',
          '多层防护，内外网、DMZ区分区隔离',
        ]} />
      </div>
    ),
  },
]

export default function FirewallPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
