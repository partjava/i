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
  chapterTitle: '网络安全概述',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  nextChapter: { label: '网络基础架构', href: '/study/security/network/architecture' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>网络安全基础概念</PageTitle>
        <SectionTitle>1. 什么是网络安全？</SectionTitle>
        <BookParagraph>
          网络安全是指保护计算机网络系统及其数据不受未经授权的访问、使用、泄露、破坏、修改或中断的过程。它涉及多个层面的保护措施，包括：
        </BookParagraph>
        <BookList items={[
          '物理安全：保护网络硬件设备',
          '逻辑安全：保护网络软件和数据',
          '管理安全：制定和执行安全策略',
        ]} />
        <SectionTitle>2. 网络安全的核心要素</SectionTitle>
        <BookParagraph>网络安全主要包含以下核心要素：</BookParagraph>
        <BookList items={[
          '机密性（Confidentiality）：确保信息只被授权用户访问',
          '完整性（Integrity）：确保信息在传输和存储过程中不被篡改',
          '可用性（Availability）：确保授权用户可以随时访问所需信息',
          '真实性（Authenticity）：确保信息源的真实性',
          '不可否认性（Non-repudiation）：确保用户不能否认其行为',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络安全的基本术语</PageTitle>
        <BookList items={[
          '漏洞（Vulnerability）：系统中可能被攻击者利用的弱点',
          '威胁（Threat）：可能对系统造成损害的潜在事件',
          '风险（Risk）：威胁利用漏洞造成损害的可能性',
          '攻击（Attack）：试图破坏系统安全的行为',
          '防护（Protection）：防止或减轻攻击的措施',
        ]} />
        <BookAlert type="info" message="网络安全的三大核心目标是CIA三元组：机密性、完整性和可用性。真实性（Authenticity）和不可否认性（Non-repudiation）也是现代网络安全的重要补充。" />
      </div>
    ),
  },
  {
    label: '重要性',
    left: (
      <div className="space-y-4">
        <PageTitle>网络安全的重要性</PageTitle>
        <SectionTitle>1. 个人层面</SectionTitle>
        <BookList items={[
          '保护个人隐私信息',
          '防止身份盗窃',
          '保护个人财产安全',
          '维护个人声誉',
        ]} />
        <SectionTitle>2. 企业层面</SectionTitle>
        <BookList items={[
          '保护商业机密',
          '维护企业声誉',
          '确保业务连续性',
          '遵守法律法规',
          '保护客户数据',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>国家层面的网络安全</PageTitle>
        <SectionTitle>3. 国家层面</SectionTitle>
        <BookList items={[
          '保护国家机密',
          '维护国家安全',
          '保障关键基础设施',
          '维护社会稳定',
        ]} />
        <BookAlert type="warning" message="网络安全已上升为国家战略。各国纷纷制定网络安全法律法规，建立网络空间治理体系。关键基础设施保护、数据安全、个人信息保护等成为各国立法重点。" />
      </div>
    ),
  },
  {
    label: '发展历程',
    left: (
      <div className="space-y-4">
        <PageTitle>网络安全发展历程</PageTitle>
        <SectionTitle>1. 早期阶段（1960-1980）</SectionTitle>
        <BookList items={[
          'ARPANET的诞生',
          '第一个计算机病毒的出现',
          '早期密码学的发展',
          '基本访问控制机制',
        ]} />
        <SectionTitle>2. 发展阶段（1980-2000）</SectionTitle>
        <BookList items={[
          '互联网的普及',
          '防火墙技术的出现',
          '加密标准的制定',
          '病毒防护软件的发展',
          '安全协议的标准化',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>现代阶段</PageTitle>
        <SectionTitle>3. 现代阶段（2000-至今）</SectionTitle>
        <BookList items={[
          '云计算安全',
          '移动安全',
          '物联网安全',
          '人工智能安全',
          '区块链安全',
          '零信任安全模型',
        ]} />
        <BookAlert type="info" message="网络安全从早期的物理安全和简单加密，发展到现在的全方位、多层次、主动防御体系。零信任（Zero Trust）安全模型成为现代安全架构的重要趋势。" />
      </div>
    ),
  },
  {
    label: '主要威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>网络安全主要威胁</PageTitle>
        <SectionTitle>1. 恶意软件</SectionTitle>
        <BookList items={[
          '病毒（Virus）',
          '蠕虫（Worm）',
          '特洛伊木马（Trojan）',
          '勒索软件（Ransomware）',
          '间谍软件（Spyware）',
        ]} />
        <SectionTitle>2. 网络攻击</SectionTitle>
        <BookList items={[
          '拒绝服务攻击（DoS/DDoS）',
          '中间人攻击（MitM）',
          'SQL注入',
          '跨站脚本（XSS）',
          '跨站请求伪造（CSRF）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>社会工程学与新兴威胁</PageTitle>
        <SectionTitle>3. 社会工程学</SectionTitle>
        <BookList items={[
          '钓鱼攻击',
          '假冒身份',
          '垃圾邮件',
          '电话诈骗',
          '社交工程',
        ]} />
        <SectionTitle>4. 新兴威胁</SectionTitle>
        <BookList items={[
          '物联网设备攻击',
          '人工智能攻击',
          '供应链攻击',
          '加密货币相关威胁',
          '5G网络安全威胁',
        ]} />
      </div>
    ),
  },
]

export default function NetworkSecurityIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
