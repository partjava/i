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
  chapterTitle: '入侵防御系统（IPS）',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '入侵检测', href: '/study/security/protection/ids' },
  nextChapter: { label: 'VPN技术', href: '/study/security/protection/vpn' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>入侵防御系统基础原理</PageTitle>
        <BookParagraph>入侵防御系统（IPS）是一种主动防御的安全设备或软件，它不仅能够检测网络攻击，还能主动阻止攻击行为。与IDS相比，IPS具有更强的主动防御能力，能够实时阻断恶意流量，保护网络和系统安全。</BookParagraph>
        <SectionTitle>工作原理</SectionTitle>
        <BookList items={[
          '流量分析：实时分析网络流量，识别可疑数据包',
          '特征匹配：将流量与已知攻击特征进行匹配',
          '行为分析：分析流量行为模式，发现异常活动',
          '威胁判定：根据预设规则判定是否为攻击',
          '防御响应：对确认的攻击采取阻断措施',
          '日志记录：记录攻击事件和防御动作',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="280" viewBox="0 0 600 280">
            <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">网络流量</text>
            <rect x="200" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="250" y="75" fontSize="14" fill="#db2777" textAnchor="middle">流量分析</text>
            <rect x="350" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="400" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">威胁检测</text>
            <rect x="500" y="50" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="550" y="75" fontSize="14" fill="#eab308" textAnchor="middle">防御响应</text>
            <rect x="350" y="120" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="400" y="145" fontSize="14" fill="#16a34a" textAnchor="middle">特征库</text>
            <rect x="350" y="190" width="100" height="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="8" />
            <text x="400" y="215" fontSize="14" fill="#9333ea" textAnchor="middle">策略管理</text>
            <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ips)" />
            <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ips)" />
            <line x1="450" y1="70" x2="500" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ips)" />
            <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
            <line x1="400" y1="160" x2="400" y2="190" stroke="#64748b" strokeWidth="2" />
            <defs>
              <marker id="arrow_ips" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心功能与术语</PageTitle>
        <BookList items={[
          '实时防御：能够实时检测和阻断攻击，保护系统安全',
          '深度检测：支持应用层协议分析，识别复杂攻击',
          '智能防护：结合机器学习等技术，提高检测准确性',
          '联动防御：可与防火墙、IDS等设备联动，形成立体防护',
          '策略管理：支持灵活的策略配置和更新',
        ]} />
        <SectionTitle>重点术语</SectionTitle>
        <BookList items={[
          '深度包检测（DPI）：对数据包内容进行深度分析，识别应用层攻击',
          '行为分析：通过分析流量行为模式，发现异常活动',
          '防御策略：定义如何响应不同类型的攻击',
          '误报率：将正常流量误判为攻击的比例',
          '漏报率：未能检测到实际攻击的比例',
        ]} />
      </div>
    ),
  },
  {
    label: '类型与架构',
    left: (
      <div className="space-y-4">
        <PageTitle>IPS类型</PageTitle>
        <SectionTitle>1. 基于网络的IPS（NIPS）</SectionTitle>
        <BookParagraph>部署在网络边界或关键节点，监控和防御网络层面的攻击。典型产品：Palo Alto Networks、Cisco IPS、Fortinet IPS。</BookParagraph>
        <SectionTitle>2. 基于主机的IPS（HIPS）</SectionTitle>
        <BookParagraph>部署在单个主机上，保护主机系统安全。典型产品：Symantec HIPS、McAfee HIPS、Trend Micro HIPS。</BookParagraph>
        <SectionTitle>3. 应用层IPS（WAF）</SectionTitle>
        <BookParagraph>专门保护Web应用安全的IPS，部署在Web服务器前。典型产品：ModSecurity、Imperva WAF、F5 ASM。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>多层IPS部署架构</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="280" viewBox="0 0 600 280">
            <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">互联网</text>
            <rect x="200" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="250" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">NIPS</text>
            <rect x="350" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="400" y="75" fontSize="14" fill="#db2777" textAnchor="middle">内网</text>
            <rect x="350" y="120" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="400" y="145" fontSize="14" fill="#eab308" textAnchor="middle">Web服务器</text>
            <rect x="350" y="190" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="400" y="215" fontSize="14" fill="#16a34a" textAnchor="middle">WAF</text>
            <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ips2)" />
            <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ips2)" />
            <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
            <line x1="400" y1="160" x2="400" y2="190" stroke="#64748b" strokeWidth="2" />
            <defs>
              <marker id="arrow_ips2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '防御方法',
    left: (
      <div className="space-y-4">
        <PageTitle>特征匹配防御</PageTitle>
        <BookParagraph>基于已知攻击特征进行匹配和阻断。准确率高，误报率低，但无法防御未知攻击。适用于已知攻击防御场景。</BookParagraph>
        <BookCode language="bash" code={`# Snort IPS规则示例
drop tcp $EXTERNAL_NET any -> $HOME_NET 80 (
    msg:"SQL Injection Attack";
    flow:established,to_server;
    content:"' OR '1'='1";
    nocase;
    classtype:web-application-attack;
    sid:1000001;
    rev:1;
)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>行为分析与协议分析</PageTitle>
        <SectionTitle>行为分析防御</SectionTitle>
        <BookParagraph>基于行为模式分析进行防御。可以发现未知攻击，但误报率较高。适用于异常行为检测场景。</BookParagraph>
        <BookCode language="python" code={`class BehaviorAnalyzer:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)

    def train(self, normal_data):
        self.model.fit(normal_data)

    def detect(self, new_data):
        predictions = self.model.predict(new_data)
        return predictions == -1

    def block_attack(self, is_attack):
        if is_attack:
            return "Blocked"
        return "Allowed"`} />
      </div>
    ),
  },
  {
    label: '配置部署',
    left: (
      <div className="space-y-4">
        <PageTitle>Snort IPS配置</PageTitle>
        <BookCode language="bash" code={`# snort.conf 基本配置
var HOME_NET 192.168.1.0/24
var EXTERNAL_NET !$HOME_NET
preprocessor frag3_global
preprocessor stream5_global
output unified2: filename snort.log, limit 128
include $RULE_PATH/local.rules
include $RULE_PATH/community.rules
config daq: afpacket
config daq_mode: inline
config daq_var: buffer_size_mb=128`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>ModSecurity WAF配置</PageTitle>
        <BookCode language="bash" code={`# modsecurity.conf
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess On
SecRule REQUEST_HEADERS:User-Agent "^$" \
    "id:1,phase:1,deny,status:403,msg:'Empty User Agent'"
SecRule ARGS:username "@contains ' OR '1'='1" \
    "id:2,phase:2,deny,status:403,msg:'SQL Injection Attack'"
SecRule ARGS "@contains <script>" \
    "id:3,phase:2,deny,status:403,msg:'XSS Attack'"`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>IPS实际案例</PageTitle>
        <SectionTitle>案例1：SQL注入攻击防御</SectionTitle>
        <BookParagraph>某电商网站遭受SQL注入攻击，通过IPS成功防御。特征匹配识别SQL注入，实时阻断攻击请求，记录攻击源IP，通知安全管理员。</BookParagraph>
        <SectionTitle>案例2：DDoS攻击防御</SectionTitle>
        <BookParagraph>某企业网站遭受大规模DDoS攻击，通过IPS成功防御。防御措施：流量清洗、SYN Cookie防护、IP限速、黑名单封禁。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '合理规划部署位置，考虑网络性能影响',
          '确保高可用性，做好容灾备份',
          '基于风险评估配置策略，最小权限原则',
          '定期更新规则，测试验证有效性',
          '定期检查系统状态，更新特征库',
          '优化检测规则，合理配置资源',
          '多层次防护，纵深防御',
          '制定应急预案，定期演练',
        ]} />
      </div>
    ),
  },
]

export default function IPSPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
