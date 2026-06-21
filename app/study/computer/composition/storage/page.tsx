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
  chapterTitle: '存储系统',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '数据的表示与运算', href: '/study/computer/composition/data' },
  nextChapter: { label: '运算器', href: '/study/computer/composition/alu' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '存储器分类',
    left: (
      <div className="space-y-4">
        <PageTitle>存储器分类</PageTitle>
        <BookParagraph>存储器按用途和速度可分为主存储器、辅助存储器和高速缓冲存储器三大类。</BookParagraph>
        <BookList items={[
          '主存储器（内存）：直接与CPU交换数据，速度快，容量有限，断电丢失数据（如DRAM、SRAM）',
          '辅存储器：容量大，速度慢，断电不丢失（如硬盘、SSD、U盘、光盘等）',
          '高速缓冲存储器（Cache）：位于CPU与主存之间，速度接近CPU，容量小',
          '虚拟存储器：利用磁盘空间扩展主存容量，支持多任务运行',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>存储层次结构</PageTitle>
        <BookParagraph>
          存储系统采用层次化结构，在速度、容量和成本之间取得平衡。
        </BookParagraph>
        <BookList items={[
          '寄存器 > Cache > 主存 > 辅存',
          '速度递减：寄存器最快，辅存最慢',
          '容量递增：寄存器最小，辅存最大',
          '成本递减：寄存器最贵，辅存最便宜',
          '多级Cache（L1/L2/L3）进一步缓解CPU与主存速度差异',
        ]} />
        <BookAlert type="info" message="存储层次的核心思想：用高速小容量存储器缓存低速大容量存储器的热点数据，以接近高速存储的速度获得大容量存储的性价比。" />
      </div>
    ),
  },
  {
    label: 'Cache与虚拟存储器',
    left: (
      <div className="space-y-4">
        <PageTitle>Cache工作原理</PageTitle>
        <BookParagraph>
          Cache利用局部性原理提升数据访问速度。时间局部性：刚访问的数据很可能再次被访问；空间局部性：刚访问数据附近的数据很可能被访问。
        </BookParagraph>
        <BookList items={[
          '直接映射：主存块只能映射到Cache固定行',
          '全相联映射：主存块可映射到Cache任意行',
          '组相联映射：将Cache分组，组内全相联，组间直接映射',
          '替换算法：LRU（最近最少使用）、FIFO（先进先出）、随机替换',
        ]} />
        <BookAlert type="success" message="Cache的命中率直接影响系统性能。合理的映射方式和替换算法可以显著提高命中率。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>虚拟存储器</PageTitle>
        <BookParagraph>
          虚拟存储器将主存和磁盘空间统一编址，使程序可以访问比实际主存更大的地址空间。
        </BookParagraph>
        <BookList items={[
          '分页管理：固定大小页面，简化管理',
          '分段管理：按逻辑段划分，便于共享和保护',
          '段页式管理：结合分页和分段的优点',
          '缺页中断：访问的页面不在主存中时触发',
          '页面置换算法：LRU、FIFO、LFU（最少使用）等',
          'TLB（快表）：加速虚拟地址到物理地址的转换',
        ]} />
      </div>
    ),
  },
  {
    label: '性能指标',
    left: (
      <div className="space-y-4">
        <PageTitle>存储系统性能指标</PageTitle>
        <BookParagraph>评价存储系统性能的主要指标包括容量、速度和命中率。</BookParagraph>
        <BookList items={[
          '存储容量：存储器能存储的信息总量（B/KB/MB/GB）',
          '存取周期：连续两次独立存取所需的最短时间间隔',
          '存取时间：从发出存取请求到完成存取的时间',
          '带宽：单位时间内传输的数据量',
          '命中率：CPU访问命中Cache/主存的概率',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>平均访问时间</PageTitle>
        <BookParagraph>平均访问时间结合命中率和各级存储的存取速度计算：</BookParagraph>
        <BookParagraph>
          平均访问时间 = 命中率 × Cache时间 + (1-命中率) × 主存时间
        </BookParagraph>
        <BookParagraph>
          <strong>例题：</strong>某系统主存访问时间100ns，Cache访问时间10ns，命中率90%，求平均访问时间。
        </BookParagraph>
        <BookParagraph>
          解：0.9×10ns + 0.1×100ns = 9ns + 10ns = <strong>19ns</strong>
        </BookParagraph>
        <BookAlert type="info" message="提高Cache命中率是减少平均访问时间的关键。合理的Cache大小、映射方式和替换算法都能提高命中率。" />
      </div>
    ),
  },
  {
    label: '例题与小结',
    left: (
      <div className="space-y-4">
        <PageTitle>例题解析</PageTitle>
        <BookParagraph><strong>例题1：</strong>Cache命中率与平均访问时间计算。</BookParagraph>
        <BookParagraph>主存100ns，Cache 10ns，命中率90%，平均访问时间 = 0.9×10 + 0.1×100 = 19ns。</BookParagraph>
        <BookParagraph><strong>例题2：</strong>简述虚拟存储器的页面置换算法，举例说明LRU。</BookParagraph>
        <BookParagraph>常见算法：LRU、FIFO、LFU、随机置换。LRU淘汰最近最久未被访问的页面。</BookParagraph>
        <BookParagraph><strong>例题3：</strong>分析寄存器、Cache、主存、辅存的速度、容量和作用。</BookParagraph>
        <BookParagraph>寄存器速度最快容量最小，Cache次之，主存较大，辅存最大最慢。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>小结</PageTitle>
        <BookList items={[
          '掌握存储系统的层次结构和各类存储器特点',
          '理解Cache和虚拟存储器的工作原理',
          '熟悉常见性能指标和优化方法',
          '掌握平均访问时间的计算公式',
        ]} />
        <PageTitle>思考题</PageTitle>
        <BookList ordered items={[
          '简述主存、Cache和虚拟存储器的主要区别和联系。',
          '举例说明局部性原理在存储系统中的应用。',
          '请写出平均访问时间的计算公式，并举例计算。',
          '比较直接映射、全相联和组相联三种Cache映射方式的优缺点。',
        ]} />
        <TagGrid items={['Cache', 'DRAM', 'SRAM', '虚拟存储器', 'LRU', '命中率']} />
      </div>
    ),
  },
]

export default function CompositionStoragePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
