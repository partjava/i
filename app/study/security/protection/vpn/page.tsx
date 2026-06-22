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
  chapterTitle: 'VPN技术',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '入侵防御', href: '/study/security/protection/ips' },
  nextChapter: { label: '安全审计', href: '/study/security/protection/audit' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>VPN基础原理</PageTitle>
        <BookParagraph>虚拟专用网络（VPN）是一种通过公共网络建立安全、加密的专用网络连接的技术。它允许用户通过互联网安全地访问私有网络资源，就像直接连接到该网络一样。</BookParagraph>
        <SectionTitle>工作原理</SectionTitle>
        <BookList items={[
          '隧道建立：在公共网络上创建加密通道',
          '身份认证：验证用户身份',
          '数据加密：对传输数据进行加密',
          '数据封装：将加密数据封装在VPN协议中',
          '数据传输：通过公共网络传输',
          '数据解密：接收端解密数据',
        ]} />
        <SectionTitle>核心功能</SectionTitle>
        <BookList items={[
          '数据加密：确保数据传输安全',
          '身份认证：验证用户身份',
          '访问控制：控制资源访问权限',
          '数据完整性：确保数据不被篡改',
          '地址转换：隐藏真实IP地址',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>VPN工作流程示意</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="800" height="400" viewBox="0 0 800 400">
            <path d="M100,100 Q150,50 200,100 Q250,150 300,100 Q350,50 400,100 Q450,150 500,100 Q550,50 600,100 Q650,150 700,100" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <text x="400" y="80" fontSize="16" fill="#64748b" textAnchor="middle">互联网</text>
            <rect x="50" y="200" width="100" height="60" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="100" y="235" fontSize="14" fill="#0ea5e9" textAnchor="middle">客户端</text>
            <rect x="650" y="200" width="100" height="60" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="700" y="235" fontSize="14" fill="#db2777" textAnchor="middle">VPN服务器</text>
            <rect x="650" y="300" width="100" height="60" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="700" y="335" fontSize="14" fill="#16a34a" textAnchor="middle">内网服务器</text>
            <path d="M150,230 C300,100 500,100 650,230" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
            <text x="400" y="150" fontSize="14" fill="#d97706" textAnchor="middle">加密隧道</text>
            <circle cx="200" cy="180" r="8" fill="#f59e0b" />
            <circle cx="300" cy="150" r="8" fill="#f59e0b" />
            <circle cx="400" cy="130" r="8" fill="#f59e0b" />
            <circle cx="500" cy="150" r="8" fill="#f59e0b" />
            <circle cx="600" cy="180" r="8" fill="#f59e0b" />
            <line x1="700" y1="260" x2="700" y2="300" stroke="#64748b" strokeWidth="2" />
          </svg>
        </div>
        <SectionTitle>重点术语</SectionTitle>
        <BookList items={[
          '隧道协议：用于建立VPN连接的协议，如PPTP、L2TP、OpenVPN等',
          '加密算法：用于加密数据的算法，如AES、RSA等',
          '认证方式：验证用户身份的方法，如用户名密码、证书等',
          '密钥交换：安全交换加密密钥的过程',
          '数据封装：将原始数据包封装在VPN协议中的过程',
        ]} />
      </div>
    ),
  },
  {
    label: '类型与协议',
    left: (
      <div className="space-y-4">
        <PageTitle>VPN类型</PageTitle>
        <SectionTitle>1. 远程访问VPN</SectionTitle>
        <BookParagraph>允许远程用户安全访问企业网络资源。适用于远程办公、移动办公、出差访问。常用协议：SSL/TLS VPN、IPsec VPN、L2TP/IPsec。</BookParagraph>
        <SectionTitle>2. 站点到站点VPN</SectionTitle>
        <BookParagraph>连接不同地理位置的网络。适用于分支机构互联、数据中心互联、云服务连接。常用协议：IPsec、GRE、DMVPN。</BookParagraph>
        <SectionTitle>3. 客户端到站点VPN</SectionTitle>
        <BookParagraph>连接单个客户端到企业网络。适用于个人用户访问、临时访问需求、BYOD设备访问。常用协议：OpenVPN、PPTP、SSTP。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>VPN类型对比</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="800" height="400" viewBox="0 0 800 400">
            <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">VPN类型对比</text>
            <rect x="50" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
            <text x="150" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">远程访问VPN</text>
            <text x="150" y="120" fontSize="12" fill="#475569" textAnchor="middle">- 远程办公</text>
            <text x="150" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 移动办公</text>
            <text x="150" y="160" fontSize="12" fill="#475569" textAnchor="middle">- 出差访问</text>
            <text x="150" y="200" fontSize="12" fill="#475569" textAnchor="middle">协议：SSL/TLS、IPsec</text>
            <rect x="300" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
            <text x="400" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">站点到站点VPN</text>
            <text x="400" y="120" fontSize="12" fill="#475569" textAnchor="middle">- 分支机构互联</text>
            <text x="400" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 数据中心互联</text>
            <text x="400" y="160" fontSize="12" fill="#475569" textAnchor="middle">- 云服务连接</text>
            <text x="400" y="200" fontSize="12" fill="#475569" textAnchor="middle">协议：IPsec、GRE、DMVPN</text>
            <rect x="550" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
            <text x="650" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">客户端到站点VPN</text>
            <text x="650" y="120" fontSize="12" fill="#475569" textAnchor="middle">- 个人用户访问</text>
            <text x="650" y="140" fontSize="12" fill="#475569" textAnchor="middle">- 临时访问需求</text>
            <text x="650" y="160" fontSize="12" fill="#475569" textAnchor="middle">- BYOD设备访问</text>
            <text x="650" y="200" fontSize="12" fill="#475569" textAnchor="middle">协议：OpenVPN、SSTP</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '安全机制',
    left: (
      <div className="space-y-4">
        <PageTitle>加密与认证机制</PageTitle>
        <SectionTitle>加密机制</SectionTitle>
        <BookParagraph>VPN使用多种加密算法保护数据传输安全。包括对称加密（AES）、非对称加密（RSA）、哈希算法（SHA-256）。</BookParagraph>
        <BookCode language="bash" code={`# OpenVPN配置示例
cipher AES-256-CBC
auth SHA256
tls-cipher TLS-DHE-RSA-WITH-AES-256-GCM-SHA384
key-size 2048
dh dh2048.pem`} />
        <SectionTitle>认证机制</SectionTitle>
        <BookParagraph>多种认证方式确保用户身份安全：预共享密钥（PSK）、数字证书、双因素认证、RADIUS认证。</BookParagraph>
        <BookCode language="bash" code={`# IPsec认证配置示例
authby=secret
leftauth=psk
rightauth=psk
leftid=@vpn.example.com
rightid=@client.example.com`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>密钥管理</PageTitle>
        <BookParagraph>安全管理和更新加密密钥，包括定期密钥更新、密钥分发机制、密钥存储安全、密钥撤销机制。</BookParagraph>
        <BookCode language="bash" code={`# 密钥更新配置示例
rekey-method ssl
rekey-time 3600
rekey-margin 540
rekey-fuzz 100`} />
      </div>
    ),
  },
  {
    label: '部署方案',
    left: (
      <div className="space-y-4">
        <PageTitle>VPN部署方案</PageTitle>
        <SectionTitle>硬件VPN部署</SectionTitle>
        <BookParagraph>使用专用VPN设备部署。优势：高性能、高可靠性、易于管理。适用于大型企业、数据中心、关键业务。</BookParagraph>
        <SectionTitle>软件VPN部署</SectionTitle>
        <BookParagraph>使用软件解决方案部署。优势：灵活性高、成本低、易于扩展。适用于中小企业、远程办公、临时需求。</BookParagraph>
        <SectionTitle>云VPN部署</SectionTitle>
        <BookParagraph>使用云服务提供商部署。优势：无需维护、全球覆盖、按需扩展。适用于全球化企业、云服务用户、混合云环境。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>应用案例</PageTitle>
        <SectionTitle>案例1：企业远程办公VPN部署</SectionTitle>
        <BookParagraph>某跨国企业为支持远程办公，部署企业级VPN方案：硬件VPN网关+SSL VPN+双因素认证。支持5000+远程用户，99.99%可用性。</BookParagraph>
        <SectionTitle>案例2：分支机构VPN互联</SectionTitle>
        <BookParagraph>某零售企业通过VPN实现全国分支机构安全互联。站点到站点VPN+IPsec协议+双线路备份。连接100+分支机构，数据传输安全。</BookParagraph>
        <BookAlert type="info" message="VPN部署选择应根据企业规模、预算和安全需求综合考量。硬件VPN适合大型企业，软件VPN性价比高，云VPN适合全球化部署。" />
      </div>
    ),
  },
]

export default function VPNPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
