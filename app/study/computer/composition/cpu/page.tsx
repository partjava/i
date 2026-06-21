'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookAlert,
  BookDivider,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机组成原理',
  chapterTitle: '中央处理器（CPU）',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '总线与输入输出', href: '/study/computer/composition/io' },
  nextChapter: { label: '系统性能与优化', href: '/study/computer/composition/performance' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'CPU结构',
    left: (
      <div className="space-y-4">
        <PageTitle>CPU结构与功能</PageTitle>
        <BookParagraph>CPU是计算机的核心，由控制器、运算器、寄存器组和内部总线组成。</BookParagraph>
        <svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="40" y="40" width="80" height="60" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="80" y="75" textAnchor="middle" fontSize="16" fill="#B45309">控制器</text>
          <rect x="160" y="40" width="80" height="60" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
          <text x="200" y="75" textAnchor="middle" fontSize="16" fill="#3730A3">运算器</text>
          <rect x="280" y="40" width="80" height="60" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
          <text x="320" y="75" textAnchor="middle" fontSize="16" fill="#166534">寄存器组</text>
          <rect x="100" y="120" width="220" height="10" fill="#A7F3D0" stroke="#059669" strokeWidth="2"/>
          <text x="210" y="115" textAnchor="middle" fontSize="12" fill="#059669">内部总线</text>
          <line x1="120" y1="70" x2="160" y2="70" stroke="#2563EB" strokeWidth="2"/>
          <line x1="240" y1="70" x2="280" y2="70" stroke="#2563EB" strokeWidth="2"/>
          <line x1="200" y1="100" x2="200" y2="120" stroke="#059669" strokeWidth="2"/>
          <line x1="320" y1="100" x2="320" y2="120" stroke="#059669" strokeWidth="2"/>
          <line x1="80" y1="100" x2="80" y2="120" stroke="#059669" strokeWidth="2"/>
        </svg>
        <BookList items={[
          '控制器：负责指令译码、发出控制信号，协调各部件工作',
          '运算器：执行算术和逻辑运算',
          '寄存器组：存放操作数、中间结果和控制信息',
          '内部总线：连接各部件，实现数据和信号的传递',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>CPU核心功能</PageTitle>
        <BookParagraph>CPU通过执行指令来完成各种计算和控制任务：</BookParagraph>
        <BookList items={[
          '指令控制：取指令、译码、执行',
          '数据加工：算术运算和逻辑运算',
          '时序控制：协调各部件按时间顺序操作',
          '异常处理：响应中断和异常事件',
        ]} />
        <BookAlert type="info" message="CPU的性能取决于主频、架构、Cache大小、流水线深度等多个因素的综合影响。" />
      </div>
    ),
  },
  {
    label: '指令周期与流水线',
    left: (
      <div className="space-y-4">
        <PageTitle>指令周期</PageTitle>
        <BookParagraph>指令周期是CPU执行一条指令所需的时间，包括多个阶段：</BookParagraph>
        <BookList items={[
          '取指（IF）：从内存读取指令到指令寄存器',
          '译码（ID）：解析指令的操作码和操作数',
          '执行（EX）：ALU执行运算或地址计算',
          '访存（MEM）：访问内存读写数据',
          '写回（WB）：将结果写回寄存器',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>流水线技术</PageTitle>
        <BookParagraph>流水线将指令周期各阶段重叠执行，可大幅提高CPU吞吐率。典型五级流水线：IF → ID → EX → MEM → WB。</BookParagraph>
        <BookList items={[
          '理想情况下，五级流水线的吞吐率是单周期CPU的5倍',
          '结构冒险：多个指令争用同一硬件资源',
          '数据冒险：后续指令依赖前面指令的结果',
          '控制冒险：分支指令导致取指地址不确定',
        ]} />
        <BookAlert type="success" message="流水线冒险通过转发（forwarding）、分支预测、流水线冲刷等技术解决。分支预测和转发是提升流水线效率的关键。" />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>请简述CPU的基本组成及各部分的主要功能。</BookParagraph>
        <BookParagraph>解答：CPU由控制器、运算器、寄存器组和内部总线组成。控制器负责指令控制，运算器执行运算，寄存器组存储数据和中间结果，总线实现数据传递。</BookParagraph>
        <BookDivider />
        <BookParagraph><strong>例题2：</strong>简述流水线的优点和常见瓶颈。</BookParagraph>
        <BookParagraph>解答：流水线可提高CPU吞吐率，但会遇到结构冒险、数据冒险和控制冒险等瓶颈，需要通过硬件和编译器优化解决。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握CPU的基本组成及各部件功能',
          '理解指令周期和流水线的基本原理',
          '熟悉流水线的优势与常见瓶颈',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '请画出CPU内部结构示意图，并简要说明各部件作用。',
          '简述流水线的五个阶段及其作用。',
          '举例说明数据冒险和控制冒险的产生原因及解决方法。',
        ]} />
        <TagGrid items={['CPU', '控制器', '运算器', '寄存器', '流水线', '冒险']} />
      </div>
    ),
  },
]

export default function CompositionCPUPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
