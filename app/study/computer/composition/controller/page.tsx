'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookAlert,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机组成原理',
  chapterTitle: '控制器',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '运算器', href: '/study/computer/composition/alu' },
  nextChapter: { label: '总线与输入输出', href: '/study/computer/composition/io' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '控制器结构',
    left: (
      <div className="space-y-4">
        <PageTitle>控制器基本结构</PageTitle>
        <BookParagraph>控制器是CPU的指挥中心，负责从内存中取指令、译码并产生控制信号，协调各部件工作。</BookParagraph>
        <svg width="340" height="160" viewBox="0 0 340 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="20" y="60" width="60" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
          <text x="50" y="85" textAnchor="middle" fontSize="14" fill="#3730A3">IR</text>
          <rect x="120" y="40" width="100" height="80" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="170" y="80" textAnchor="middle" fontSize="16" fill="#B45309">控制器</text>
          <line x1="220" y1="80" x2="300" y2="80" stroke="#2563EB" strokeWidth="3" markerEnd="url(#ca)"/>
          <text x="260" y="70" fontSize="12" fill="#2563EB">控制信号</text>
          <line x1="80" y1="80" x2="120" y2="80" stroke="#0EA5E9" strokeWidth="3" markerEnd="url(#cb)"/>
          <text x="100" y="70" fontSize="12" fill="#0EA5E9">指令</text>
          <defs><marker id="ca" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><polygon points="0,0 8,4 0,8" fill="#2563EB" /></marker><marker id="cb" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><polygon points="0,0 8,4 0,8" fill="#0EA5E9" /></marker></defs>
        </svg>
        <BookList items={[
          '指令寄存器（IR）：存放当前正在执行的指令',
          '控制器：解析指令，产生各种控制信号，协调各部件工作',
          '控制信号：控制运算器、存储器、I/O等部件的操作',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>控制器分类</PageTitle>
        <BookParagraph>控制器的实现方式主要有两种：硬布线控制器和微程序控制器。</BookParagraph>
        <BookList items={[
          '硬布线控制器：采用组合逻辑电路实现，速度快，结构固定，适合RISC',
          '微程序控制器：采用微指令存储器，灵活易扩展，适合CISC',
          '硬布线：修改困难但速度快，适合指令集简单的处理器',
          '微程序：便于修改和扩展，但速度较慢',
        ]} />
        <BookAlert type="info" message="现代CPU常结合两种控制方式：RISC内核使用硬布线控制，复杂指令用微程序辅助实现。" />
      </div>
    ),
  },
  {
    label: '工作原理',
    left: (
      <div className="space-y-4">
        <PageTitle>控制器的工作原理与流程</PageTitle>
        <BookParagraph>控制器的工作流程贯穿整个指令周期：</BookParagraph>
        <BookList items={[
          '取指令：从内存中读取指令到指令寄存器IR',
          '指令译码：解析指令的操作码和操作数',
          '产生控制信号：根据指令类型产生相应的控制信号',
          '执行指令：协调运算器、存储器、I/O等部件完成操作',
          '更新PC：程序计数器指向下一条指令',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>硬布线与微程序对比</PageTitle>
        <BookParagraph>两种控制方式各有特点，适用于不同的场景：</BookParagraph>
        <BookList items={[
          '硬布线：用组合/时序逻辑直接生成控制信号',
          '微程序：通过查表方式执行微指令序列',
          '硬布线速度快，但设计复杂，修改困难',
          '微程序灵活易扩展，便于实现复杂指令',
          'RISC架构常用硬布线，CISC架构常用微程序',
        ]} />
        <BookAlert type="success" message="理解控制器的两种实现方式是掌握CPU设计的关键，也是面试中的高频考点。" />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>简述硬布线控制器与微程序控制器的主要区别及各自优缺点。</BookParagraph>
        <BookParagraph>解答：硬布线控制器速度快，结构固定，修改困难，适合指令集简单的RISC。微程序控制器灵活易扩展，便于修改，速度较慢，适合复杂指令集CISC。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>请简述控制器生成控制信号的基本流程。</BookParagraph>
        <BookParagraph>解答：控制器从IR获取指令，译码后根据指令类型和时序，产生相应的控制信号，驱动各部件协同完成操作。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握控制器的结构、分类及其工作原理',
          '理解硬布线与微程序控制的区别',
          '熟悉控制信号的生成与作用',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '请画出控制器与运算器、存储器、I/O的信号连接示意图。',
          '硬布线控制器和微程序控制器各适用于什么场景？',
          '简述控制器生成控制信号的基本流程。',
        ]} />
        <TagGrid items={['控制器', 'IR', '硬布线', '微程序', '译码', '控制信号']} />
      </div>
    ),
  },
]

export default function CompositionControllerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
