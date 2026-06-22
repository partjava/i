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
  chapterTitle: '安全审计',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: 'VPN技术', href: '/study/security/protection/vpn' },
  nextChapter: { label: '安全监控', href: '/study/security/protection/monitor' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>安全审计基础原理</PageTitle>
        <BookParagraph>安全审计是对信息系统安全性的系统性评估过程，通过收集、分析和评估安全相关的信息，发现潜在的安全风险，并提供改进建议。</BookParagraph>
        <SectionTitle>核心目标</SectionTitle>
        <BookList items={[
          '合规性验证：确保符合相关法规和标准',
          '风险评估：识别和评估安全风险',
          '漏洞发现：发现系统安全漏洞',
          '改进建议：提供安全改进方案',
          '持续监控：建立持续审计机制',
        ]} />
        <SectionTitle>基本原则</SectionTitle>
        <BookList items={[
          '独立性：审计过程保持独立',
          '客观性：基于事实进行评估',
          '全面性：覆盖所有关键领域',
          '持续性：建立持续审计机制',
          '可追溯性：保留完整审计记录',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心要素</PageTitle>
        <BookList items={[
          '审计范围：审计活动覆盖的系统、网络和应用范围',
          '审计证据：支持审计结论的事实和数据',
          '审计发现：审计过程中发现的问题和风险',
          '审计建议：针对发现的问题提出的改进建议',
          '审计报告：记录审计过程和结果的正式文档',
        ]} />
      </div>
    ),
  },
  {
    label: '审计类型',
    left: (
      <div className="space-y-4">
        <PageTitle>安全审计类型</PageTitle>
        <SectionTitle>1. 合规性审计</SectionTitle>
        <BookParagraph>评估系统是否符合相关法规和标准要求。审计内容：法规遵从性、标准符合性、政策执行情况。适用标准：ISO 27001、等级保护、行业规范。</BookParagraph>
        <SectionTitle>2. 技术审计</SectionTitle>
        <BookParagraph>评估系统技术实现的安全性。审计内容：系统架构、代码安全、配置安全。技术领域：网络安全、应用安全、数据安全。</BookParagraph>
        <SectionTitle>3. 运营审计</SectionTitle>
        <BookParagraph>评估安全运营管理的有效性。审计内容：安全策略、运维管理、事件响应。管理领域：人员管理、流程管理、资产管理。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>审计流程</PageTitle>
        <BookList items={[
          '审计准备：确定审计范围和目标，制定审计计划，准备审计工具，组建审计团队',
          '信息收集：收集系统配置信息、安全策略文档、运行日志数据、历史审计报告',
          '分析评估：漏洞分析、风险评估、合规性检查、问题分类',
          '报告生成：问题描述、风险评估、改进建议、优先级排序',
        ]} />
      </div>
    ),
  },
  {
    label: '审计工具',
    left: (
      <div className="space-y-4">
        <PageTitle>安全审计工具</PageTitle>
        <SectionTitle>漏洞扫描工具</SectionTitle>
        <BookList items={[
          'Nessus：全面的漏洞扫描工具',
          'OpenVAS：开源的漏洞扫描系统',
          'Nmap：网络探测和安全审计',
          'Acunetix：Web应用漏洞扫描',
        ]} />
        <SectionTitle>日志分析工具</SectionTitle>
        <BookList items={[
          'Splunk：日志管理和分析平台',
          'ELK Stack：开源日志分析套件',
          'Graylog：集中式日志管理',
          'LogRhythm：安全信息和事件管理',
        ]} />
        <SectionTitle>合规性检查工具</SectionTitle>
        <BookList items={[
          'OpenSCAP：安全配置评估',
          'Lynis：系统安全审计',
          'Qualys：云安全与合规性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>案例1：企业安全审计</SectionTitle>
        <BookParagraph>某大型企业进行全面安全审计。审计范围：网络基础设施、应用系统、数据安全、运维管理。审计方法：漏洞扫描、渗透测试、配置检查、日志分析。发现高危漏洞5个、中危12个、低危25个、配置问题15个。</BookParagraph>
        <SectionTitle>案例2：云平台安全审计</SectionTitle>
        <BookParagraph>某云服务提供商进行安全合规审计。审计范围：云基础设施、虚拟化平台、云管理平台、安全服务。发现配置不当3处、权限过大5处、日志不完整2处、备份不足1处。</BookParagraph>
      </div>
    ),
  },
]

export default function AuditPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
