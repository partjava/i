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
  chapterTitle: '入侵检测系统（IDS）',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '防火墙技术', href: '/study/security/protection/firewall' },
  nextChapter: { label: '入侵防御', href: '/study/security/protection/ips' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>入侵检测系统基础原理</PageTitle>
        <BookParagraph>入侵检测系统（IDS）是一种网络安全设备或软件，用于监控网络或系统中的可疑活动，并在发现潜在威胁时发出警报。它是网络安全防护体系中的重要组成部分，能够及时发现和响应安全威胁。</BookParagraph>
        <BookList items={[
          '实时监控：持续监控网络流量和系统活动，及时发现异常',
          '威胁检测：识别已知攻击特征和异常行为模式',
          '告警响应：对检测到的威胁进行分级告警和响应',
          '日志记录：记录安全事件，用于后续分析和取证',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="200" viewBox="0 0 600 200">
            <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">网络流量</text>
            <rect x="200" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="250" y="75" fontSize="14" fill="#db2777" textAnchor="middle">数据采集</text>
            <rect x="350" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="400" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">分析引擎</text>
            <rect x="500" y="50" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="550" y="75" fontSize="14" fill="#eab308" textAnchor="middle">告警系统</text>
            <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ids)" />
            <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ids)" />
            <line x1="450" y1="70" x2="500" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ids)" />
            <rect x="350" y="120" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
            <text x="400" y="145" fontSize="14" fill="#16a34a" textAnchor="middle">特征库</text>
            <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
            <defs>
              <marker id="arrow_ids" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语</PageTitle>
        <BookList items={[
          '特征检测：基于已知攻击特征进行匹配检测',
          '异常检测：基于行为基线识别异常活动',
          '误报：将正常行为误判为攻击',
          '漏报：未能检测到实际攻击',
          '告警阈值：触发告警的判定标准',
        ]} />
      </div>
    ),
  },
  {
    label: '类型与架构',
    left: (
      <div className="space-y-4">
        <PageTitle>IDS类型</PageTitle>
        <SectionTitle>1. 基于网络的IDS（NIDS）</SectionTitle>
        <BookList items={[
          '部署在网络边界或关键节点',
          '监控网络流量，检测网络层面的攻击行为',
          '不影响网络性能',
          '典型产品：Snort、Suricata',
        ]} />
        <SectionTitle>2. 基于主机的IDS（HIDS）</SectionTitle>
        <BookList items={[
          '部署在单个主机上，监控系统日志、文件完整性',
          '检测主机层面的异常行为',
          '可以检测到NIDS无法发现的攻击',
          '典型产品：OSSEC、Tripwire',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>NIDS+HIDS部署架构</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="200" viewBox="0 0 600 200">
            <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">互联网</text>
            <rect x="200" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="250" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">NIDS</text>
            <rect x="350" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="400" y="75" fontSize="14" fill="#db2777" textAnchor="middle">内网</text>
            <rect x="350" y="120" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="400" y="145" fontSize="14" fill="#ef4444" textAnchor="middle">HIDS</text>
            <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ids2)" />
            <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ids2)" />
            <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
            <defs>
              <marker id="arrow_ids2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8" fill="#64748b" /></marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '检测方法',
    left: (
      <div className="space-y-4">
        <PageTitle>特征检测</PageTitle>
        <BookList items={[
          '基于已知攻击特征，使用预定义的规则',
          '误报率较低，但无法检测新型攻击',
          '需要定期更新特征库',
        ]} />
        <BookCode language="bash" code={`# Snort规则示例
alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
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
        <PageTitle>异常检测</PageTitle>
        <BookList items={[
          '基于行为基线，使用机器学习算法',
          '可以发现未知攻击，但误报率较高',
          '需要持续学习优化',
        ]} />
        <BookCode language="python" code={`import numpy as np
from sklearn.ensemble import IsolationForest

# 训练异常检测模型
def train_anomaly_detector(normal_data):
    model = IsolationForest(contamination=0.1)
    model.fit(normal_data)
    return model

# 检测异常
def detect_anomalies(model, new_data):
    predictions = model.predict(new_data)
    return predictions == -1  # -1表示异常`} />
      </div>
    ),
  },
  {
    label: '配置部署',
    left: (
      <div className="space-y-4">
        <PageTitle>Snort配置示例</PageTitle>
        <BookCode language="bash" code={`# snort.conf 基本配置
# 网络变量定义
var HOME_NET 192.168.1.0/24
var EXTERNAL_NET !$HOME_NET

# 预处理器配置
preprocessor frag3_global
preprocessor stream5_global

# 输出配置
output unified2: filename snort.log, limit 128

# 规则配置
include $RULE_PATH/local.rules
include $RULE_PATH/community.rules`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>OSSEC配置示例</PageTitle>
        <BookCode language="xml" code={`<!-- ossec.conf 基本配置 -->
<global>
    <email_notification>yes</email_notification>
    <smtp_server>smtp.example.com</smtp_server>
    <email_from>ossec@example.com</email_from>
    <email_to>admin@example.com</email_to>
</global>

<rules>
    <include>rules_config.xml</include>
    <include>pam_rules.xml</include>
    <include>sshd_rules.xml</include>
</rules>

<syscheck>
    <frequency>43200</frequency>
    <alert_new_files>yes</alert_new_files>
    <auto_ignore>no</auto_ignore>
</syscheck>`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>IDS实际案例</PageTitle>
        <SectionTitle>案例1：SQL注入攻击检测</SectionTitle>
        <BookParagraph>某网站遭受SQL注入攻击，通过IDS及时发现并阻止。攻击特征：`GET /login.php?username=admin' OR '1'='1&password=anything`。IDS响应：特征匹配触发告警，记录攻击源IP，通知安全管理员。</BookParagraph>
        <SectionTitle>案例2：异常登录检测</SectionTitle>
        <BookParagraph>通过行为分析发现异常登录行为：非工作时间登录、非常用IP地址、多次登录失败。处理措施：临时封禁可疑IP，通知账户所有者，加强账户安全措施。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <SectionTitle>部署建议</SectionTitle>
        <BookList items={[
          '关键网络节点部署NIDS',
          '重要服务器部署HIDS',
          '合理配置检测深度',
          '定期更新特征库',
        ]} />
        <SectionTitle>运维管理</SectionTitle>
        <BookList items={[
          '定期检查系统状态',
          '及时处理告警信息',
          '优化检测规则',
          '备份重要数据',
        ]} />
        <SectionTitle>性能优化</SectionTitle>
        <BookList items={[
          '合理配置资源',
          '优化检测算法',
          '负载均衡部署',
          '定期性能评估',
        ]} />
      </div>
    ),
  },
]

export default function IDSPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
