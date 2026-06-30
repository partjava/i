'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: 'VPN与代理技术',
  chapterNumber: 10,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '无线与移动网络', href: '/study/computer/network/wireless-mobile' },
  nextChapter: { label: '网络安全基础', href: '/study/computer/network/security' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'VPN原理与类型',
    left: (
      <div className="space-y-4">
        <PageTitle>VPN原理与类型</PageTitle>
        <BookParagraph>虚拟专用网络（VPN）通过加密隧道在公网上建立安全的专用通信通道，实现远程安全互联。</BookParagraph>
        <BookList items={[
          '常见类型：PPTP、L2TP、IPSec、SSL VPN、OpenVPN',
          '应用场景：企业远程办公、分支互联、科学上网',
        ]} />
        <SectionTitle>VPN结构与IP通信</SectionTitle>
        <BookParagraph>VPN客户端与VPN服务器之间建立加密隧道，数据包在隧道内传输，终点IP可为内网或公网主机。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">VPN客户端</text>
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">VPN服务器</text>
            <ellipse cx="350" cy="60" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6" />
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">公网</text>
            <line x1="140" y1="60" x2="290" y2="60" stroke="#faad14" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="410" y1="60" x2="560" y2="60" stroke="#faad14" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="290" y1="60" x2="410" y2="60" stroke="#faad14" strokeWidth="4" />
          </svg>
          <div style={{ color: '#888' }}>VPN客户端与服务器通过加密隧道安全通信，终点IP可为内网主机</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">企业员工在家通过VPN访问公司内网服务器，数据包的终点IP如何确定？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：员工电脑通过VPN客户端与公司VPN服务器建立隧道；访问公司内网服务器时，数据包终点IP为内网服务器IP；数据包在公网中加密传输，VPN服务器解密后转发到内网终点。</p>
        </div>
        <TagGrid items={['VPN', 'PPTP', 'L2TP', 'IPSec', 'SSL VPN', 'OpenVPN']} />
      </div>
    ),
  },
  {
    label: '代理服务器原理',
    left: (
      <div className="space-y-4">
        <PageTitle>代理服务器原理与类型</PageTitle>
        <BookParagraph>代理服务器在客户端与目标服务器之间转发请求，实现访问控制、加速、隐藏真实IP等功能。</BookParagraph>
        <BookList items={[
          '正向代理：客户端通过代理访问外部资源，隐藏真实IP',
          '反向代理：代理服务器代表内部服务器响应外部请求',
          '透明代理：客户端无感知，流量自动转发',
        ]} />
        <SectionTitle>代理结构与IP通信</SectionTitle>
        <BookParagraph>客户端请求先到代理服务器，由代理转发到目标服务器，终点IP可为外部或内部主机。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">代理服务器</text>
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">目标服务器</text>
            <line x1="140" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="400" y1="60" x2="560" y2="60" stroke="#faad14" strokeWidth="2" />
          </svg>
          <div style={{ color: '#888' }}>正向代理：客户端通过代理访问目标服务器，终点IP为目标服务器IP</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">用户通过正向代理访问www.example.com，数据包的终点IP是什么？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：用户请求先到代理服务器，终点IP为代理服务器IP；代理服务器再向www.example.com发起请求，终点IP为目标服务器IP。</p>
        </div>
        <TagGrid items={['正向代理', '反向代理', '透明代理', '代理服务器']} />
      </div>
    ),
  },
  {
    label: 'VPN与代理安全',
    left: (
      <div className="space-y-4">
        <PageTitle>VPN与代理的安全问题</PageTitle>
        <BookParagraph>VPN和代理技术虽能提升安全性和隐私，但也存在被劫持、流量泄露、伪装攻击等风险。</BookParagraph>
        <BookList items={[
          'VPN劫持：攻击者伪造VPN服务器，窃取数据',
          '代理泄露：真实IP暴露、敏感信息被记录',
          '安全措施：使用可信VPN/代理、端到端加密',
        ]} />
        <SectionTitle>安全结构图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            <rect x="300" y="10" width="100" height="40" fill="#fff1f0" stroke="#ff4d4f" rx="8" />
            <text x="350" y="35" textAnchor="middle" fontSize="14" fill="#ff4d4f">伪造VPN/代理</text>
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">目标服务器</text>
            <line x1="140" y1="60" x2="300" y2="30" stroke="#ff4d4f" strokeWidth="2" />
            <line x1="400" y1="30" x2="560" y2="60" stroke="#ff4d4f" strokeWidth="2" />
            <line x1="140" y1="60" x2="560" y2="60" stroke="#386ff6" strokeWidth="2" strokeDasharray="6,4" />
          </svg>
          <div style={{ color: '#888' }}>安全风险：伪造VPN/代理可窃取数据，需端到端加密</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>思考题</SectionTitle>
        <BookParagraph>1. 为什么VPN和代理不能完全保证通信安全？</BookParagraph>
        <BookParagraph>2. 如何选择安全可靠的VPN或代理服务？</BookParagraph>
        <TagGrid items={['VPN安全', '代理安全', '劫持', '端到端加密']} />
      </div>
    ),
  },
]

export default function NetworkVpnProxyPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
