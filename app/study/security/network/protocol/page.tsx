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
  chapterTitle: '网络协议分析',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '应用层安全', href: '/study/security/network/application' },
  nextChapter: { label: '网络设备安全', href: '/study/security/network/device' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>协议分析基础原理</PageTitle>
        <BookParagraph>网络协议分析是通过抓包工具对网络通信数据进行捕获、解析和分析，发现异常流量、攻击行为或故障原因。常用于安全检测、故障排查、取证分析等场景。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="120" viewBox="0 0 520 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">终端A</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">路由器</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">终端B</text>
            <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">抓包分析</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow9)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow9)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow9)" />
            <defs>
              <marker id="arrow9" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
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
          '抓包：捕获网络中的数据包，分析其内容和结构',
          '协议栈：网络通信的分层结构，如TCP/IP协议栈',
          '流量过滤：根据条件筛选感兴趣的数据包',
          '会话重组：将分片的数据包还原为完整会话',
          '协议字段：如IP、端口、序列号、负载等',
          '流量特征：如异常流量、攻击特征、明文敏感信息等',
        ]} />
        <BookAlert type="info" message="协议分析是网络安全从业人员的基础技能。无论是应急响应、渗透测试还是日常运维，都离不开协议分析。" />
      </div>
    ),
  },
  {
    label: '常用工具',
    left: (
      <div className="space-y-4">
        <PageTitle>常用协议分析工具</PageTitle>
        <BookList items={[
          'Wireshark：图形化抓包分析工具，支持多种协议解码',
          'tcpdump：命令行抓包工具，适合快速过滤和远程分析',
          'Fiddler：专注于HTTP/HTTPS流量分析，常用于Web调试',
          'Burp Suite：Web安全测试平台，支持抓包、重放、漏洞扫描等',
          'Scapy：Python库，可自定义抓包和协议解析',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Scapy抓包示例</PageTitle>
        <BookCode language="python" code={`from scapy.all import sniff

def packet_callback(packet):
    print(packet.summary())

sniff(filter='tcp', prn=packet_callback, count=5)`} />
      </div>
    ),
  },
  {
    label: '分析流程',
    left: (
      <div className="space-y-4">
        <PageTitle>协议分析流程</PageTitle>
        <BookList items={[
          '抓包与过滤：使用工具捕获目标流量，设置过滤条件',
          '协议解码与重组：分析协议字段，还原会话内容',
          '关键字段提取与统计：提取IP、端口、URL、敏感数据等',
          '异常检测与溯源：发现异常流量、攻击行为，定位源头',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>HTTP包解析示例</PageTitle>
        <BookCode language="python" code={`from scapy.all import sniff
from scapy.layers.inet import TCP
from scapy.layers.http import HTTPRequest

def http_callback(packet):
    if packet.haslayer(HTTPRequest):
        print('HTTP请求:', packet[HTTPRequest].Host, packet[HTTPRequest].Path)

sniff(filter='tcp port 80', prn=http_callback, count=5)`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>案例1：明文密码泄露分析</PageTitle>
        <BookParagraph>某公司员工登录OA系统时，安全团队通过抓包发现登录请求为明文HTTP，存在密码泄露风险。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '8px 0' }}>
          <svg width="420" height="60" viewBox="0 0 420 60">
            <rect x="10" y="20" width="80" height="30" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="50" y="40" fontSize="13" fill="#0ea5e9" textAnchor="middle">员工电脑</text>
            <rect x="110" y="20" width="80" height="30" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="150" y="40" fontSize="13" fill="#db2777" textAnchor="middle">OA服务器</text>
            <rect x="210" y="20" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="250" y="40" fontSize="13" fill="#ef4444" textAnchor="middle">抓包分析</text>
            <line x1="90" y1="35" x2="110" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow9a)" />
            <line x1="190" y1="35" x2="210" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow9a)" />
            <defs>
              <marker id="arrow9a" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookParagraph>分析过程：使用Wireshark抓取HTTP流量，筛选POST /login请求，发现password=123456明文传输，确认未使用HTTPS。</BookParagraph>
        <BookCode language="http" code={`POST /login HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded

username=alice&password=123456`} />
        <BookAlert type="warning" message="结论：敏感数据必须加密传输，强制启用HTTPS。定期巡检业务系统，防止明文传输。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例2与案例3</PageTitle>
        <SectionTitle>案例2：DDoS攻击溯源</SectionTitle>
        <BookParagraph>某企业网站突发访问量激增，疑似遭遇DDoS攻击。安全团队通过协议分析定位攻击源。</BookParagraph>
        <BookCode language="bash" code={`tcpdump 'tcp[tcpflags] & tcp-syn != 0' -n -c 1000`} />
        <BookParagraph>分析过程：用tcpdump抓包统计SYN包异常流量，分析源IP分布，配合运营商封堵攻击源IP。建议部署DDoS防护设备，设置流量阈值告警。</BookParagraph>
        <SectionTitle>案例3：业务逻辑漏洞还原</SectionTitle>
        <BookParagraph>某电商平台用户反馈账户被盗，安全人员通过抓包还原攻击过程，发现登录接口存在验证码绕过漏洞。</BookParagraph>
        <BookCode language="python" code={`import requests
url = 'https://shop.example.com/api/login'
data = {"username": "test", "password": "123456"}
for i in range(100):
    r = requests.post(url, data=data)
    print(r.status_code, r.text)`} />
        <BookAlert type="warning" message="结论：接口必须严格校验验证码，防止自动化爆破。建议增加登录频率限制与异常告警。" />
        <BookAlert type="info" message="协议分析实战Tips：抓包时注意过滤条件，聚焦目标流量。结合图形化和命令行工具，提升分析效率。多用协议重放、自动化脚本复现问题。分析结果要形成报告，便于复盘与整改。" />
      </div>
    ),
  },
]

export default function ProtocolAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
