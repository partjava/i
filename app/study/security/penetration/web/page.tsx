'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全', chapterTitle: 'Web应用测试', chapterNumber: 6,
  totalChapters: 10, subjectHref: '/study/security/penetration',
  prevChapter: { label: '后渗透测试', href: '/study/security/penetration/post' },
  nextChapter: { label: '移动应用测试', href: '/study/security/penetration/mobile' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>Web应用测试基础概念</PageTitle>
        <BookParagraph>Web应用测试是针对Web站点、接口、后台管理等进行安全性评估，发现潜在漏洞和安全隐患。测试内容涵盖输入验证、认证、会话管理、访问控制、业务逻辑等多个层面。</BookParagraph>
        <BookList items={['目标：发现Web系统中的安全漏洞，防止被攻击者利用', '范围：前端、后端、API、数据库、第三方组件等', '方法：自动化扫描+手工测试+代码审计']} />
        <BookCode language="bash" code={`# SQL注入测试
curl "http://target.com/login?user=admin'--&pass=123"

# XSS测试
curl "http://target.com/search?q=<script>alert(1)</script>"

# 命令注入测试
curl "http://target.com/ping?ip=127.0.0.1;id"`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>测试流程</PageTitle>
        <BookList items={['信息收集：收集域名、子域名、目录、接口、指纹等', '漏洞扫描：自动化工具检测常见漏洞', '手工测试：针对业务逻辑、认证、访问控制等进行深入测试', '漏洞验证：手动复现和确认漏洞', '报告编写：整理漏洞细节和修复建议']} />
        <BookCode language="bash" code={`# 目录扫描
ffuf -u http://target.com/FUZZ -w /usr/share/wordlists/dirb/common.txt

# 子域名爆破
sublist3r -d target.com

# 指纹识别
whatweb http://target.com`} />
      </div>
    ),
  },
  {
    label: '常见漏洞',
    left: (
      <div className="space-y-4">
        <PageTitle>常见Web漏洞类型</PageTitle>
        <BookList items={['SQL注入：通过构造恶意SQL语句，获取或篡改数据库数据', 'XSS：注入恶意脚本，窃取用户信息或劫持会话', '命令注入：执行系统命令，获取服务器权限', 'CSRF：利用用户身份发起未授权操作', '文件上传漏洞：上传恶意文件，获取WebShell', '越权访问：非法访问他人数据或功能']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>漏洞利用代码示例</PageTitle>
        <BookCode language="text" code={`# SQL注入
' OR 1=1--

# XSS
<script>alert('XSS')</script>

# 命令注入
127.0.0.1;cat /etc/passwd

# CSRF
<img src="http://target.com/api/delete?id=1" />`} />
      </div>
    ),
  },
  {
    label: '工具实践',
    left: (
      <div className="space-y-4">
        <PageTitle>Web安全测试工具</PageTitle>
        <BookList items={['Burp Suite：拦截、修改、重放HTTP请求，自动化漏洞扫描', 'OWASP ZAP：免费开源Web漏洞扫描工具', 'sqlmap：自动化SQL注入检测与利用', 'XSStrike：XSS漏洞检测与利用工具', 'dirsearch/ffuf：目录和文件枚举工具', 'Postman：API接口测试与安全验证']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工具实践示例</PageTitle>
        <BookCode language="bash" code={`# sqlmap自动化注入
sqlmap -u "http://target.com/item?id=1" --batch --dump

# Burp Suite抓包复现XSS
# 1. 浏览器代理指向Burp
# 2. 提交<script>alert(1)</script>，观察响应

# dirsearch目录扫描
dirsearch -u http://target.com -e php,asp,aspx,js`} />
      </div>
    ),
  },
]

export default function PenetrationWebPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
