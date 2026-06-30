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
  chapterTitle: '安全监控',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '安全审计', href: '/study/security/protection/audit' },
  nextChapter: { label: '应急响应', href: '/study/security/protection/response' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>安全监控基础概念</PageTitle>
        <BookParagraph>安全监控是指通过技术手段对信息系统进行实时监控，及时发现和预警安全威胁，确保系统安全稳定运行的过程。它是安全防护体系中的重要组成部分。</BookParagraph>
        <SectionTitle>安全监控的目标</SectionTitle>
        <BookList items={[
          '威胁检测：及时发现恶意攻击、异常访问、漏洞利用、数据泄露等威胁',
          '系统监控：监控CPU、内存、磁盘、服务状态、配置变更等',
          '合规监控：确保系统符合安全规范和标准，检查策略执行和访问控制',
          '风险预警：基于威胁情报进行风险预警和趋势分析',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全监控的重要性</PageTitle>
        <BookList items={[
          '主动防御：通过实时监控主动发现和防御威胁，而非被动应对',
          '快速响应：及时发现安全事件，快速启动应急响应，减少损失',
          '合规要求：满足行业标准和法规要求，避免合规风险',
          '安全态势感知：全面了解系统安全状况，为安全决策提供依据',
          '成本控制：通过预防性监控减少安全事件，降低安全成本',
        ]} />
      </div>
    ),
  },
  {
    label: '监控方法',
    left: (
      <div className="space-y-4">
        <PageTitle>安全监控方法</PageTitle>
        <SectionTitle>1. 网络流量监控</SectionTitle>
        <BookParagraph>流量分析：协议分析、流量特征识别、带宽监控、会话分析。行为分析：访问模式、通信行为、时间特征、地理位置。</BookParagraph>
        <SectionTitle>2. 系统监控</SectionTitle>
        <BookParagraph>性能监控：资源使用、服务状态、响应时间、并发连接。安全监控：进程监控、文件监控、配置监控、权限监控。</BookParagraph>
        <SectionTitle>3. 日志监控</SectionTitle>
        <BookParagraph>日志收集：系统日志、应用日志、安全日志、审计日志。日志分析：实时分析、关联分析、趋势分析、异常检测。</BookParagraph>
        <SectionTitle>4. 威胁情报监控</SectionTitle>
        <BookParagraph>情报收集：漏洞情报、攻击情报、恶意IP、恶意域名。情报应用：实时匹配、预警分析、风险评估、防护建议。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>监控工具</PageTitle>
        <SectionTitle>网络监控工具</SectionTitle>
        <BookList items={[
          'Wireshark：数据包捕获和分析，协议解析和过滤',
          'Snort：网络入侵检测，实时流量分析和攻击特征检测',
        ]} />
        <SectionTitle>系统监控工具</SectionTitle>
        <BookList items={[
          'Nagios：服务器性能监控、服务状态监控、告警管理',
          'Zabbix：企业级监控平台，分布式监控、自动发现、可视化展示',
        ]} />
        <SectionTitle>日志分析工具</SectionTitle>
        <BookList items={[
          'ELK Stack：Elasticsearch存储、Logstash收集、Kibana可视化',
          'Splunk：企业级日志分析，实时分析、安全事件关联、告警管理',
        ]} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>安全监控实践案例</PageTitle>
        <SectionTitle>案例1：企业安全监控体系建设</SectionTitle>
        <BookParagraph>某大型企业建立完整的安全监控体系。挑战：系统规模大、安全事件频发、数据量大、缺乏统一平台。解决方案：建立统一监控平台、实施自动化监控、部署智能分析系统、建立应急响应机制。效果：安全事件发现率提升90%，响应时间缩短80%，误报率降低70%。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例2：云平台安全监控</PageTitle>
        <BookParagraph>某云服务提供商优化安全监控流程。挑战：多租户环境复杂、动态资源管理困难、安全隔离要求高。解决方案：实施DevSecOps、部署云原生监控、建立统一身份认证、实施自动化响应。效果：安全事件响应时间缩短75%，自动化程度提升65%，运维成本降低35%。</BookParagraph>
      </div>
    ),
  },
]

export default function SecurityMonitorPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
