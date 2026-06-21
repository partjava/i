'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: '面试题与答疑',
  chapterNumber: 16,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '网络项目实战', href: '/study/computer/network/projects' },
  nextChapter: { label: '网络进阶与拓展', href: '/study/computer/network/advanced' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '高频面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试题</PageTitle>
        <BookParagraph>本节汇总网络工程师面试中常见的高频问题，涵盖IP、路由、交换、协议、配置、云网络等核心知识点。</BookParagraph>
        <BookList items={[
          'OSI七层模型与TCP/IP模型的区别与对应关系',
          '子网划分与VLSM应用举例',
          '静态路由与动态路由的优缺点',
          'VLAN原理及配置方法',
          '常见协议（如ARP、DHCP、DNS、HTTP、TCP、UDP）作用与流程',
          '云网络与传统网络的主要区别',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>答题思路与解析</SectionTitle>
        <BookParagraph>针对典型面试题，给出结构化答题思路与详细解析，帮助考生条理清晰地作答。</BookParagraph>
        <BookList items={[
          '问题拆解：明确考查点，分步作答',
          '结合实际场景举例说明',
          '答题结构建议：定义→原理→流程→应用→优缺点',
        ]} />
        <SectionTitle>结构化答题流程图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="60">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
            <rect x="10" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="65" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">审题与拆解</text>
            <rect x="130" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="185" y="40" textAnchor="middle" fontSize="14" fill="#faad14">原理与定义</text>
            <rect x="250" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="305" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">流程与举例</text>
            <rect x="370" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="425" y="40" textAnchor="middle" fontSize="14" fill="#faad14">优缺点分析</text>
            <rect x="490" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="545" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">实际应用</text>
            <line x1="120" y1="36" x2="130" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="240" y1="36" x2="250" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="360" y1="36" x2="370" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="480" y1="36" x2="490" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
          <div style={{ color: '#888' }}>审题与拆解→原理与定义→流程与举例→优缺点分析→实际应用</div>
        </div>
        <TagGrid items={['OSI', 'TCP/IP', 'VLSM', '路由协议', 'VLAN']} />
      </div>
    ),
  },
  {
    label: '场景化问答与案例分析',
    left: (
      <div className="space-y-4">
        <PageTitle>场景化问答与案例分析</PageTitle>
        <BookParagraph>结合实际网络场景，分析面试中常见的开放性问题与案例。</BookParagraph>
        <BookList items={[
          '如何排查企业网络中某部门无法访问互联网？',
          '数据中心出现广播风暴，如何定位与解决？',
          '云平台多租户隔离的技术实现方式？',
        ]} />
        <SectionTitle>案例分析答题建议</SectionTitle>
        <BookParagraph>1. 明确问题背景与现象</BookParagraph>
        <BookParagraph>2. 梳理排查思路，逐步定位</BookParagraph>
        <BookParagraph>3. 结合配置、协议、日志等多角度分析</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>经典易错点与答疑</SectionTitle>
        <BookParagraph>总结网络面试中常见易错点与高频疑问，帮助考生规避失分陷阱。</BookParagraph>
        <BookList items={[
          '子网掩码与可用主机数计算错误',
          '静态/动态路由混淆',
          'VLAN间通信与三层交换原理',
          '协议端口号记忆混乱',
          '云网络安全策略理解不清',
        ]} />
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">答疑：</p>
          <p className="text-xs mb-1">如何高效准备网络工程师面试？</p>
          <p className="text-xs" style={{ color: '#666' }}>建议梳理知识体系，整理常见配置与命令，多做真题和场景题，注重原理与实际结合。</p>
        </div>
        <TagGrid items={['面试题', '子网划分', '路由协议', '端口号', '云网络']} />
      </div>
    ),
  },
]

export default function NetworkInterviewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
