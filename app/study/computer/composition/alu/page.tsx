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
  chapterTitle: '运算器（ALU）',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '存储系统', href: '/study/computer/composition/storage' },
  nextChapter: { label: '控制器', href: '/study/computer/composition/controller' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'ALU结构',
    left: (
      <div className="space-y-4">
        <PageTitle>运算器基本结构</PageTitle>
        <BookParagraph>运算器（ALU）是CPU的核心部件之一，负责执行算术和逻辑运算。它与寄存器组协作，实现数据的高速处理和结果输出。</BookParagraph>
        <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="20" y="60" width="60" height="60" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
          <text x="50" y="95" textAnchor="middle" fontSize="16" fill="#3730A3">寄存器组</text>
          <rect x="120" y="60" width="80" height="60" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="160" y="95" textAnchor="middle" fontSize="16" fill="#B45309">ALU</text>
          <line x1="80" y1="90" x2="120" y2="90" stroke="#2563EB" strokeWidth="3" markerEnd="url(#a1)"/>
          <line x1="200" y1="90" x2="260" y2="90" stroke="#2563EB" strokeWidth="3" markerEnd="url(#a1)"/>
          <rect x="260" y="60" width="40" height="60" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
          <text x="280" y="95" textAnchor="middle" fontSize="14" fill="#166534">输出</text>
          <defs><marker id="a1" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><polygon points="0,0 8,4 0,8" fill="#2563EB" /></marker></defs>
        </svg>
        <BookList items={[
          '寄存器组：存放操作数和中间结果，支持高速读写',
          'ALU：执行加减乘除、逻辑运算等核心操作',
          '数据通路：连接寄存器组与ALU，实现数据输入、处理和输出',
          '输出寄存器：存放ALU运算结果，供后续使用',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据流示意</PageTitle>
        <BookParagraph>ALlU的典型数据流：输入A、B经数据通路送入ALU，ALU完成运算后输出结果。</BookParagraph>
        <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="10" y="30" width="40" height="20" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2"/>
          <text x="30" y="45" textAnchor="middle" fontSize="14" fill="#0369A1">A</text>
          <rect x="10" y="60" width="40" height="20" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2"/>
          <text x="30" y="75" textAnchor="middle" fontSize="14" fill="#0369A1">B</text>
          <line x1="50" y1="40" x2="100" y2="40" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#a2)"/>
          <line x1="50" y1="70" x2="100" y2="70" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#a2)"/>
          <rect x="100" y="30" width="60" height="40" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="130" y="55" textAnchor="middle" fontSize="16" fill="#B45309">ALU</text>
          <line x1="160" y1="50" x2="210" y2="50" stroke="#0EA5E9" strokeWidth="2" markerEnd="url(#a2)"/>
          <rect x="210" y="40" width="40" height="20" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
          <text x="230" y="55" textAnchor="middle" fontSize="14" fill="#166534">输出</text>
          <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth"><polygon points="0,0 8,4 0,8" fill="#0EA5E9" /></marker></defs>
        </svg>
      </div>
    ),
  },
  {
    label: '功能与原理',
    left: (
      <div className="space-y-4">
        <PageTitle>ALU的主要功能</PageTitle>
        <BookParagraph>ALU（算术逻辑单元）是CPU中执行各种计算的核心部件。</BookParagraph>
        <BookList items={[
          '算术运算：加、减、乘、除等基本运算',
          '逻辑运算：与、或、非、异或等',
          '移位操作：算术移位、逻辑移位、循环移位',
          '状态标志：零标志（ZF）、进位标志（CF）、溢出标志（OF）、符号标志（SF）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>运算器与寄存器协作</PageTitle>
        <BookParagraph>运算器与寄存器组之间通过数据通路紧密协作：</BookParagraph>
        <BookList items={[
          '操作数从寄存器组读取，经数据通路送入ALU',
          'ALU完成计算后将结果写回寄存器组或输出寄存器',
          '状态标志更新到状态寄存器，供后续指令使用',
          '多级流水线中，ALU与寄存器组配合实现高效的指令执行',
        ]} />
        <BookAlert type="info" message="ALU的性能直接决定了CPU的运算能力。现代CPU中常包含多个ALU以支持超标量执行。" />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>简述ALU的主要功能及其在CPU中的作用。</BookParagraph>
        <BookParagraph>解答：ALU负责执行算术和逻辑运算，是CPU的核心部件之一。它通过与寄存器组协作，实现数据的高速处理和结果输出。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>分析数据从寄存器组到ALU再到输出的流动过程。</BookParagraph>
        <BookParagraph>解答：操作数首先从寄存器组读取，经数据通路送入ALU，ALU完成运算后将结果写回输出寄存器或寄存器组，同时更新状态标志位。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握ALU的结构、功能及其与寄存器组的协作关系',
          '理解数据流在运算器中的流动过程',
          '熟悉常见的算术、逻辑运算及状态标志',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '请画出ALU与寄存器组的数据流示意图，并简要说明。',
          'ALU的零标志和溢出标志分别在什么情况下被置位？',
          '举例说明ALU如何实现加法和逻辑与运算。',
        ]} />
        <TagGrid items={['ALU', '寄存器', '数据通路', '状态标志', '算术运算', '逻辑运算']} />
      </div>
    ),
  },
]

export default function CompositionALUPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
