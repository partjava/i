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
  chapterTitle: '系统结构概述',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '绪论与发展简史', href: '/study/computer/composition/intro' },
  nextChapter: { label: '数据的表示与运算', href: '/study/computer/composition/data' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '系统层次结构',
    left: (
      <div className="space-y-4">
        <PageTitle>计算机系统层次结构</PageTitle>
        <BookParagraph>
          计算机系统是一个多层抽象的结构，从底层的物理硬件到顶层的用户应用，每一层都为上层提供服务和接口。这种分层设计极大地简化了系统开发和维护。
        </BookParagraph>
        <BookList items={[
          '硬件层：物理设备，包括CPU、内存、I/O等',
          '系统软件层：操作系统、驱动程序等',
          '支撑软件层：数据库、中间件等',
          '应用软件层：各种应用程序',
          '用户层：最终使用者',
        ]} />
        <BookParagraph>
          各层次之间通过接口和协议协同工作，实现复杂的计算任务。下层对上层透明。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>冯·诺依曼结构与哈佛结构</PageTitle>
        <BookParagraph>
          冯·诺依曼结构是现代通用计算机的基础，其核心思想是「存储程序」——指令和数据存放在同一存储器中。
        </BookParagraph>
        <BookList items={[
          '冯·诺依曼结构：程序存储和数据存储在同一存储器，采用统一的总线进行数据和指令的传输',
          '哈佛结构：指令和数据分别存储在不同的存储器，分别有独立的总线',
          '冯·诺依曼结构简单、成本低，是现代通用计算机的基础',
          '哈佛结构具有更高的并行性和效率，常用于嵌入式和信号处理等领域',
        ]} />
        <BookAlert type="info" message="冯·诺依曼结构的主要瓶颈是「冯·诺依曼瓶颈」——CPU与存储器之间的速度差异限制了系统性能。" />
      </div>
    ),
  },
  {
    label: '系统结构演变',
    left: (
      <div className="space-y-4">
        <PageTitle>典型系统结构描述</PageTitle>
        <BookParagraph>
          典型的冯·诺依曼结构包括：输入设备、输出设备、存储器、运算器、控制器五大部件，通过总线互联。CPU（运算器+控制器）从存储器中读取指令和数据，进行处理后输出结果。
        </BookParagraph>
        <BookParagraph>
          哈佛结构则将指令流和数据流分开，分别有独立的存储和通路，适合高性能场景。现代CPU内部常采用改进的哈佛结构（指令缓存和数据缓存分离）。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统结构的演变与发展</PageTitle>
        <BookParagraph>
          计算机系统结构一直在不断演进，以适应新的应用需求和技术发展。
        </BookParagraph>
        <BookList items={[
          '从单核到多核、分布式系统',
          '从集中式到云计算、边缘计算',
          '专用加速器（如GPU、TPU等）与异构计算',
          '从同构到异构融合架构',
          '可重构计算与领域专用架构',
        ]} />
        <BookParagraph>
          现代计算机系统结构不断演进，以适应大数据、人工智能等新应用需求。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '小结与建议',
    left: (
      <div className="space-y-4">
        <PageTitle>小结与学习建议</PageTitle>
        <BookParagraph>
          系统结构是理解计算机组成的关键基础，以下是要点总结：
        </BookParagraph>
        <BookList items={[
          '理解系统层次结构有助于把握计算机整体工作原理',
          '掌握冯·诺依曼与哈佛结构的区别及应用场景',
          '关注系统结构的新发展，拓展知识面',
          '了解指令集架构（ISA）与微架构的区别',
          '理解分层抽象在计算机设计中的重要意义',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '简述计算机系统的层次结构及各层作用。',
          '冯·诺依曼结构和哈佛结构的主要区别是什么？',
          '什么是冯·诺依曼瓶颈？现代计算机如何缓解这一问题？',
          '举例说明现代计算机中的异构计算场景。',
          '分层设计对计算机系统开发有什么好处？',
        ]} />
        <TagGrid items={['冯·诺依曼', '哈佛结构', '层次结构', '系统总线', '分层设计']} />
      </div>
    ),
  },
]

export default function CompositionStructurePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
