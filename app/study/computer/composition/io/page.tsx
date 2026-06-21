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
  chapterTitle: '总线与输入输出',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '控制器', href: '/study/computer/composition/controller' },
  nextChapter: { label: '中央处理器', href: '/study/computer/composition/cpu' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '总线结构',
    left: (
      <div className="space-y-4">
        <PageTitle>总线结构与分类</PageTitle>
        <BookParagraph>总线是连接计算机各部件的信息传输通道，按功能分为数据总线、地址总线和控制总线。</BookParagraph>
        <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
          <rect x="20" y="40" width="60" height="40" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
          <text x="50" y="65" textAnchor="middle" fontSize="16" fill="#3730A3">CPU</text>
          <rect x="320" y="40" width="60" height="40" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2"/>
          <text x="350" y="65" textAnchor="middle" fontSize="16" fill="#166534">存储器</text>
          <rect x="170" y="80" width="60" height="30" fill="#FEF9C3" stroke="#F59E42" strokeWidth="2"/>
          <text x="200" y="100" textAnchor="middle" fontSize="14" fill="#B45309">I/O设备</text>
          <rect x="100" y="55" width="200" height="10" fill="#A7F3D0" stroke="#059669" strokeWidth="2"/>
          <text x="200" y="52" textAnchor="middle" fontSize="12" fill="#059669">系统总线</text>
          <line x1="80" y1="60" x2="100" y2="60" stroke="#2563EB" strokeWidth="2"/>
          <line x1="300" y1="60" x2="320" y2="60" stroke="#2563EB" strokeWidth="2"/>
          <line x1="200" y1="65" x2="200" y2="80" stroke="#F59E42" strokeWidth="2"/>
        </svg>
        <BookList items={[
          '数据总线：传输数据，宽度影响一次可传输的数据位数',
          '地址总线：指定数据传输的源和目的地，宽度决定寻址空间',
          '控制总线：传递控制信号（如读/写、时钟、中断等）',
          '系统总线连接CPU、存储器和I/O设备，实现信息交换',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>总线性能指标</PageTitle>
        <BookParagraph>总线的性能直接影响系统的数据传输效率。</BookParagraph>
        <BookList items={[
          '总线宽度：一次可传输的数据位数（如32位、64位）',
          '总线频率：总线时钟频率，决定传输速率',
          '带宽 = 总线宽度 × 总线频率，衡量数据传输能力',
          '总线仲裁：多个设备争用总线时的调度机制',
        ]} />
        <BookAlert type="info" message="总线宽度和频率共同决定了系统的数据传输能力。现代CPU采用64位数据总线，频率可达数GHz。" />
      </div>
    ),
  },
  {
    label: 'I/O方式',
    left: (
      <div className="space-y-4">
        <PageTitle>I/O系统原理与常见方式</PageTitle>
        <BookParagraph>I/O系统负责实现CPU与外部设备之间的数据交换，常见方式有三种：</BookParagraph>
        <BookList items={[
          '程序查询方式：CPU主动轮询I/O设备状态，效率低，CPU利用率不高',
          '中断方式：I/O设备准备好后发中断信号，CPU响应后处理数据，效率高',
          'DMA方式：直接内存访问，数据在I/O设备与内存间直接传输，CPU只需发起和结束时参与',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>三种I/O方式对比</PageTitle>
        <BookParagraph>不同的I/O方式在效率、复杂度和适用场景上各有不同：</BookParagraph>
        <BookList items={[
          '程序查询：实现最简单，但CPU利用率最低',
          '中断方式：效率高，适合响应型I/O，但需中断管理开销',
          'DMA方式：CPU负担最小，适合大批量数据传输，但硬件复杂度高',
          '现代系统常采用多级中断、DMA等方式组合使用',
        ]} />
        <BookAlert type="success" message="DMA方式是大批量数据传输的首选方案，如硬盘读写、网络数据包处理等场景广泛应用。" />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>某系统数据总线宽度为32位，问一次最多可传输多少字节？</BookParagraph>
        <BookParagraph>解答：32位 = 4字节，一次最多可传输4字节。带宽受总线宽度和时钟频率共同影响。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>简述程序查询、中断、DMA三种I/O方式的优缺点。</BookParagraph>
        <BookParagraph>解答：程序查询实现简单但CPU利用率低；中断效率高，适合响应型I/O，但需中断管理；DMA的CPU负担最小，适合大批量数据传输，但硬件复杂度高。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握总线的分类、结构与作用',
          '理解I/O系统的三种常见方式及其优缺点',
          '熟悉总线宽度、带宽等性能指标',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '简述数据总线、地址总线、控制总线的作用与区别。',
          '举例说明DMA方式的优点及应用场景。',
          '请画出CPU、存储器、I/O设备与总线的连接示意图。',
        ]} />
        <TagGrid items={['数据总线', '地址总线', '控制总线', '中断', 'DMA', '程序查询']} />
      </div>
    ),
  },
]

export default function CompositionIOPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
