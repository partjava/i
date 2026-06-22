'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookDivider,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全运维基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '安全项目管理', href: '/study/security/dev/project' },
  nextChapter: { label: '系统加固', href: '/study/security/ops/hardening' },
  theme: THEMES.security,
}

const archCode = `安全运维技术架构
├── 基础设施层
│   ├── 服务器
│   ├── 网络设备
│   └── 存储设备
├── 平台层
│   ├── 操作系统
│   ├── 数据库
│   └── 中间件
├── 应用层
│   ├── 安全监控系统
│   ├── 日志管理系统
│   └── 配置管理系统
└── 管理层
    ├── 策略管理
    ├── 流程管理
    └── 人员管理`

const zabbixCode = `# Zabbix Agent安装与配置
sudo apt install zabbix-agent
sudo nano /etc/zabbix/zabbix_agentd.conf
Server=zabbix.example.com
ServerActive=zabbix.example.com
Hostname=server1
sudo systemctl enable zabbix-agent
sudo systemctl start zabbix-agent`

const filebeatCode = `# Filebeat收集日志示例
sudo apt install filebeat
sudo nano /etc/filebeat/filebeat.yml
filebeat.inputs:
- type: log
  paths:
    - /var/log/*.log
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["elasticsearch:9200"]
sudo systemctl enable filebeat
sudo systemctl start filebeat`

const SPREADS = [
  // ===== 跨页 1: 概述 =====
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维概述</PageTitle>
        <SectionTitle>什么是安全运维？</SectionTitle>
        <BookParagraph>
          安全运维（SecOps）是指将信息安全与运维管理深度融合，通过流程、技术和管理手段，保障IT系统和数据的安全稳定运行。它不仅关注系统的可用性和性能，更强调对安全威胁的防范、检测和响应。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全运维的目标</SectionTitle>
        <BookList
          items={[
            '保护系统和数据安全：防止数据泄露、篡改和丢失，确保业务数据的完整性和保密性。',
            '确保业务连续性：通过高可用架构、灾备方案和应急响应，保障系统在遭受攻击或故障时能快速恢复。',
            '降低安全风险：定期进行漏洞扫描、补丁管理和安全评估，及时发现和修复安全隐患。',
            '提高运维效率：通过自动化工具和流程规范，减少人为操作失误，提高效率。',
            '满足合规要求：遵循国家和行业的安全法规、标准和政策，确保企业合规运营。',
          ]}
        />
      </div>
    ),
  },

  // ===== 跨页 2: 体系架构 =====
  {
    label: '体系架构',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维体系架构</PageTitle>
        <SectionTitle>核心组件</SectionTitle>
        <BookList
          items={[
            '安全监控系统：实时监控系统、网络、应用和安全事件，及时发现异常。',
            '日志管理系统：收集、分析、存储和审计各类日志，支持溯源和合规。',
            '配置管理系统：统一管理系统配置，防止配置漂移和弱口令。',
            '漏洞管理平台：自动化发现、跟踪和修复系统漏洞。',
            '应急响应平台：快速响应和处置安全事件，减少损失。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>技术架构图</SectionTitle>
        <BookCode language="text" code={archCode} maxLines={0} />
      </div>
    ),
  },

  // ===== 跨页 3: 工作流程 =====
  {
    label: '工作流程',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维工作流程</PageTitle>
        <SectionTitle>日常运维流程</SectionTitle>
        <BookList
          items={[
            '系统巡检：定期检查系统状态、性能、安全漏洞和日志，发现潜在风险。',
            '变更管理：规范变更申请、评估、实施和验证，防止因变更引发安全问题。',
            '事件响应：及时发现、分析和处理安全事件，事后总结经验。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应急响应流程</SectionTitle>
        <BookList
          items={[
            '发现和报告：及时发现异常并上报。',
            '初步评估：判断事件影响范围和严重性。',
            '应急处理：隔离、修复和恢复受影响系统。',
            '系统恢复：确保业务恢复正常。',
            '事后分析：复盘事件原因，总结改进措施。',
          ]}
        />
      </div>
    ),
  },

  // ===== 跨页 4: 运维工具 =====
  {
    label: '运维工具',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维工具</PageTitle>
        <SectionTitle>监控工具</SectionTitle>
        <BookList
          items={[
            'Zabbix：开源监控系统，支持多种监控项和告警。',
            'Nagios：经典监控工具，适合中小型环境。',
            'Prometheus：云原生监控，适合微服务和容器。',
            'Grafana：可视化展示监控数据，支持多数据源。',
          ]}
        />
        <BookDivider />
        <SectionTitle>日志工具</SectionTitle>
        <BookList
          items={[
            'ELK Stack：Elasticsearch、Logstash、Kibana组合，强大的日志收集、分析和可视化能力。',
            'Graylog：开源日志管理平台，易于扩展。',
            'Splunk：商业级日志分析平台，功能强大。',
            'LogRhythm：集成安全信息与事件管理（SIEM）。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全工具</SectionTitle>
        <BookList
          items={[
            'Nessus：漏洞扫描器，支持多种漏洞检测。',
            'OpenVAS：开源漏洞扫描平台。',
            'Wireshark：网络抓包分析工具。',
            'Metasploit：渗透测试与漏洞利用框架。',
          ]}
        />
      </div>
    ),
  },

  // ===== 跨页 5: 最佳实践 =====
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维最佳实践</PageTitle>
        <SectionTitle>系统加固</SectionTitle>
        <BookList
          items={[
            '及时更新系统和软件补丁，修复已知漏洞。',
            '关闭不必要的端口和服务，减少攻击面。',
            '配置防火墙和访问控制，限制非法访问。',
            '加强SSH安全，如禁用root远程登录、使用密钥认证、修改默认端口。',
            '合理设置文件权限，防止敏感信息泄露。',
          ]}
        />
        <BookDivider />
        <SectionTitle>安全监控</SectionTitle>
        <BookCode language="bash" code={zabbixCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>日志管理</SectionTitle>
        <BookCode language="yaml" code={filebeatCode} />
      </div>
    ),
  },

  // ===== 跨页 6: 运维评估 =====
  {
    label: '运维评估',
    left: (
      <div className="space-y-4">
        <PageTitle>安全运维评估</PageTitle>
        <SectionTitle>评估指标</SectionTitle>
        <BookList
          items={[
            '系统可用性：系统运行的稳定性和持续性。',
            '安全事件响应时间：发现和处理安全事件的速度。',
            '漏洞修复率：已发现漏洞的修复比例。',
            '补丁更新及时率：补丁发布后应用的及时性。',
            '流程执行效率：运维流程的规范性和高效性。',
            '人员培训覆盖率：运维人员安全意识和技能培训情况。',
            '合规达标率：是否满足相关法规和标准。',
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>持续改进（PDCA循环）</SectionTitle>
        <BookList
          items={[
            'Plan（计划）：制定安全目标，识别风险，制定改进计划。',
            'Do（执行）：实施安全措施，执行安全流程。',
            'Check（检查）：评估执行效果，分析安全事件。',
            'Act（改进）：优化安全措施，持续改进。',
          ]}
        />
      </div>
    ),
  },
]

export default function SecurityOpsBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
