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
  chapterTitle: '信息收集',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/penetration',
  prevChapter: { label: '渗透测试基础', href: '/study/security/penetration/basic' },
  nextChapter: { label: '漏洞扫描', href: '/study/security/penetration/scan' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>信息收集基础概念</PageTitle>
        <BookParagraph>信息收集是渗透测试的第一步，也是最重要的一步。通过收集目标系统的各种信息，可以帮助我们更好地了解目标，发现潜在的安全漏洞。信息收集的质量直接影响后续渗透测试的效果。</BookParagraph>
        <SectionTitle>信息收集的分类</SectionTitle>
        <BookList items={[
          '被动信息收集：不直接与目标系统交互。包括搜索引擎信息收集、社交媒体信息收集、域名信息收集（WHOIS）、DNS信息收集',
          '主动信息收集：直接与目标系统交互。包括端口扫描、服务识别、操作系统识别、漏洞扫描',
        ]} />
        <SectionTitle>信息收集的目标</SectionTitle>
        <BookList items={[
          '域名信息：域名注册信息（WHOIS）、DNS记录（A/MX/TXT）、子域名、域名历史',
          '网络信息：IP地址范围、网络拓扑、开放端口、运行服务及版本',
          '组织信息：公司基本信息、关键员工联系方式、技术栈和框架、业务和系统信息',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>信息收集流程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="350" viewBox="0 0 700 350">
            <defs>
              <linearGradient id="rcgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
              </linearGradient>
              <marker id="rcarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
              </marker>
            </defs>
            <circle cx="350" cy="175" r="130" fill="none" stroke="#E5E7EB" strokeWidth="2" />
            <g transform="translate(350,175)">
              <g transform="rotate(-45)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#rcgrad)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">域名信息</text>
              </g>
              <g transform="rotate(45)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#rcgrad)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">子域名枚举</text>
              </g>
              <g transform="rotate(135)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#rcgrad)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">端口扫描</text>
              </g>
              <g transform="rotate(225)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#rcgrad)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">服务识别</text>
              </g>
            </g>
            <path d="M 350 45 L 350 305" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#rcarrow)" />
            <path d="M 45 175 L 655 175" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#rcarrow)" />
            <circle cx="350" cy="175" r="10" fill="#4F46E5" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '收集方法',
    left: (
      <div className="space-y-4">
        <PageTitle>域名信息收集</PageTitle>
        <SectionTitle>WHOIS查询</SectionTitle>
        <BookCode language="bash" code={`# 使用whois命令
whois example.com

# 使用Python脚本
import whois
domain = whois.whois('example.com')
print(domain)`} />
        <SectionTitle>DNS记录查询</SectionTitle>
        <BookCode language="bash" code={`# 使用dig命令
dig example.com ANY
dig example.com MX
dig example.com TXT

# 使用nslookup
nslookup -type=any example.com`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>子域名枚举与端口扫描</PageTitle>
        <SectionTitle>子域名枚举</SectionTitle>
        <BookCode language="bash" code={`# 使用dnsrecon
dnsrecon -d example.com -t brt

# 使用sublist3r
sublist3r -d example.com

# 使用crt.sh API
curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[].name_value' | sort -u`} />
        <SectionTitle>端口扫描</SectionTitle>
        <BookCode language="bash" code={`# Nmap详细扫描
nmap -sV -sC -p- 192.168.1.1

# Masscan快速扫描
masscan 192.168.1.0/24 -p80,443,8080

# 全端口扫描
masscan 192.168.1.0/24 -p1-65535 --output-format json --output-filename scan.json`} />
      </div>
    ),
  },
  {
    label: '工具使用',
    left: (
      <div className="space-y-4">
        <PageTitle>信息收集工具</PageTitle>
        <SectionTitle>域名信息工具</SectionTitle>
        <BookList items={[
          'whois：命令行WHOIS查询工具',
          'python-whois：Python WHOIS查询库',
          'dig/nslookup/host：DNS查询工具',
        ]} />
        <SectionTitle>子域名枚举工具</SectionTitle>
        <BookList items={[
          'Sublist3r：基于搜索引擎的子域名枚举工具',
          'Amass：全面的子域名枚举工具',
          'Subfinder：快速子域名发现工具',
        ]} />
        <SectionTitle>在线服务</SectionTitle>
        <BookList items={[
          'crt.sh：证书透明度日志查询',
          'DNSDumpster：DNS信息收集工具',
          'VirusTotal：域名信息聚合',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>端口扫描与服务识别工具</PageTitle>
        <SectionTitle>网络扫描工具</SectionTitle>
        <BookList items={[
          'Nmap：功能强大的网络扫描工具',
          'Masscan：快速端口扫描工具',
          'ZMap：互联网范围扫描工具',
        ]} />
        <SectionTitle>服务识别工具</SectionTitle>
        <BookList items={[
          'Nmap脚本引擎：服务版本检测',
          'WhatWeb：Web应用识别工具',
          'Wappalyzer：Web技术识别工具',
        ]} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>案例1：企业网站信息收集</PageTitle>
        <BookParagraph>目标：某企业官网</BookParagraph>
        <BookList items={[
          '域名信息收集：使用whois查询域名注册信息，收集DNS记录，分析域名历史',
          '子域名枚举：使用Sublist3r进行子域名发现，通过证书透明度日志收集子域名',
          '端口扫描：使用Nmap进行端口扫描，识别开放服务，检测服务版本',
          'Web应用信息收集：使用WhatWeb识别Web技术，收集网站目录结构，分析功能模块',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例2：内网信息收集</PageTitle>
        <BookParagraph>目标：企业内部网络</BookParagraph>
        <BookList items={[
          '网络拓扑发现：使用Nmap进行网络扫描，绘制网络拓扑图，识别关键网络设备',
          '主机发现：使用Masscan进行快速扫描，识别活跃主机',
          '服务识别：使用Nmap进行服务扫描，识别服务版本，检测已知漏洞',
          '系统信息收集：识别操作系统类型，收集系统版本信息，分析系统配置',
        ]} />
        <BookAlert type="info" message="信息收集是渗透测试的基石。收集的信息越全面、越准确，后续的漏洞发现和利用就越有针对性。建议结合多种工具和方法进行交叉验证。" />
      </div>
    ),
  },
]

export default function PenetrationReconPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
