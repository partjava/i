'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookAlert,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机组成原理',
  chapterTitle: '系统性能与优化',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '中央处理器', href: '/study/computer/composition/cpu' },
  nextChapter: { label: '学习建议与资源', href: '/study/computer/composition/resources' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '性能指标',
    left: (
      <div className="space-y-4">
        <PageTitle>系统性能指标与分析</PageTitle>
        <BookParagraph>衡量系统性能的常用指标包括主频、CPI、MIPS和吞吐率等。</BookParagraph>
        <BookList items={[
          '主频（时钟频率）：CPU每秒振荡次数，单位Hz，主频越高理论速度越快',
          'CPI（每条指令时钟周期数）：衡量指令执行效率，CPI越低越好',
          'MIPS（每秒百万条指令）：衡量CPU执行指令的能力',
          '吞吐率：单位时间内系统能处理的任务数量',
          '响应时间：用户发出请求到系统响应的时间',
        ]} />
        <BookParagraph>CPU执行时间 = 指令数 × CPI × 时钟周期</BookParagraph>
        <BookParagraph>MIPS = 指令数 / (执行时间 × 10⁶)</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>性能公式详解</PageTitle>
        <BookParagraph>CPU性能公式是分析和优化系统性能的基础工具。</BookParagraph>
        <BookList items={[
          'CPU执行时间 = 指令数 × CPI × 时钟周期',
          'CPU执行时间 = 指令数 × CPI / 主频',
          '减少指令数：优化编译器、采用更高效的指令集架构',
          '降低CPI：流水线优化、减少冒险停顿',
          '提高主频：提升时钟频率，但受功耗和散热限制',
        ]} />
        <BookAlert type="info" message="性能优化需要在速度、功耗、成本之间权衡，不能片面追求单一指标。" />
      </div>
    ),
  },
  {
    label: '优化方法',
    left: (
      <div className="space-y-4">
        <PageTitle>影响性能的主要因素</PageTitle>
        <BookParagraph>系统性能受硬件架构和软件优化共同影响：</BookParagraph>
        <BookList items={[
          '存储层次结构：多级Cache、主存、辅存，优化数据访问速度',
          '流水线技术：提高指令吞吐率，减少空闲周期',
          '分支预测与乱序执行：提高指令流效率，减少等待',
          '指令集优化：RISC精简指令集与CISC复杂指令集各有优势',
          '多核与并行处理：利用线程级并行提升性能',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>优化方法分类</PageTitle>
        <BookParagraph>系统优化从硬件和软件两个维度展开：</BookParagraph>
        <svg width="380" height="60" viewBox="0 0 380 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="10" y="10" width="80" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
          <text x="50" y="35" textAnchor="middle" fontSize="14" fill="#3730A3">硬件优化</text>
          <rect x="110" y="10" width="80" height="40" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
          <text x="150" y="35" textAnchor="middle" fontSize="14" fill="#166534">软件优化</text>
          <rect x="210" y="10" width="80" height="40" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="250" y="35" textAnchor="middle" fontSize="14" fill="#B45309">系统优化</text>
          <line x1="90" y1="30" x2="110" y2="30" stroke="#2563EB" strokeWidth="2"/>
          <line x1="190" y1="30" x2="210" y2="30" stroke="#2563EB" strokeWidth="2"/>
        </svg>
        <BookList items={[
          '硬件优化：增加Cache容量、提升主频、优化流水线、采用多核',
          '软件优化：编译器优化、算法优化、并行化处理',
          '系统优化：合理设计存储层次、负载均衡、资源调度',
        ]} />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>某CPU主频为2GHz，CPI为1.5，执行6000万条指令，求CPU执行时间。</BookParagraph>
        <BookParagraph>解答：时钟周期 = 1/2GHz = 0.5ns。CPU执行时间 = 6000万 × 1.5 × 0.5ns = 45ms。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>简述提升系统性能的常见硬件和软件优化措施。</BookParagraph>
        <BookParagraph>解答：硬件优化包括增加Cache、提升主频、优化流水线、采用多核等；软件优化包括编译器优化、算法优化、并行化处理等。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握系统性能的主要指标及其计算方法',
          '理解影响性能的主要因素与优化思路',
          '熟悉常见的硬件与软件优化措施',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '简述CPI、MIPS、吞吐率等性能指标的含义及计算方法。',
          '举例说明存储层次结构对系统性能的影响。',
          '请列举三种常见的系统优化措施并简要说明。',
        ]} />
        <TagGrid items={['CPI', 'MIPS', '主频', '吞吐率', '流水线', '多核']} />
      </div>
    ),
  },
]

export default function CompositionPerformancePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
