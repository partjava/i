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
  chapterTitle: '绪论与发展简史',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  nextChapter: { label: '系统结构概述', href: '/study/computer/composition/structure' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '学科概要',
    left: (
      <div className="space-y-4">
        <PageTitle>学科简介</PageTitle>
        <BookParagraph>
          计算机组成原理是计算机科学与技术专业的核心基础课程，主要研究计算机系统的基本结构、工作原理及其实现方法。通过本课程的学习，能够理解计算机硬件的基本组成、各部件的功能及其协作方式，为后续的系统设计、编程和优化打下坚实基础。
        </BookParagraph>
        <PageTitle>研究内容与意义</PageTitle>
        <BookList items={[
          '掌握计算机的基本组成（运算器、控制器、存储器、输入/输出设备）',
          '理解数据的表示、运算和传输方式',
          '了解指令系统、CPU结构、存储系统、I/O系统等核心内容',
          '为软硬件结合、系统优化和新技术学习打基础',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课程核心内容</PageTitle>
        <BookParagraph>
          本课程将系统性地讲解计算机硬件的各个组成部分及其工作原理，帮助你建立完整的计算机系统观。
        </BookParagraph>
        <BookList items={[
          '运算器：数据运算与处理的硬件核心',
          '控制器：指令解读与执行的控制中枢',
          '存储器：数据存储与访问的层次体系',
          '输入/输出设备：人与计算机交互的桥梁',
          '总线系统：各部件之间的通信通道',
        ]} />
        <BookAlert type="info" message="计算机组成原理是计算机科学与技术专业的核心基础课程，是理解整个计算机系统的关键。" />
      </div>
    ),
  },
  {
    label: '发展简史',
    left: (
      <div className="space-y-4">
        <PageTitle>计算机发展简史</PageTitle>
        <BookParagraph>
          计算机的发展经历了多个阶段，每一代技术的突破都推动了计算机性能和应用的巨大飞跃。
        </BookParagraph>
        <BookList items={[
          '第一代（1940s-1950s）：电子管计算机，体积大、功耗高、速度慢，代表如ENIAC',
          '第二代（1950s-1960s）：晶体管计算机，体积减小、速度提升、可靠性增强',
          '第三代（1960s-1970s）：集成电路计算机，出现小型机和微型机，计算机逐步普及',
          '第四代（1970s-至今）：大规模集成电路，个人计算机和互联网兴起，计算机进入千家万户',
          '第五代（未来）：人工智能、量子计算等新型计算机不断发展，智能化和多样化趋势明显',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>发展特点总结</PageTitle>
        <BookParagraph>
          计算机的发展呈现出以下趋势：体积越来越小、速度越来越快、价格越来越低、应用越来越广。
        </BookParagraph>
        <BookList items={[
          '电子管→晶体管→集成电路→大规模集成电路',
          '性能指数级增长，成本持续下降',
          '从专业军用走向个人消费和移动终端',
          '从单一计算走向智能化和网络化',
        ]} />
        <BookAlert type="info" message="了解计算机的发展历史，有助于理解当前技术的演进脉络和未来发展方向。" />
      </div>
    ),
  },
  {
    label: '趋势与建议',
    left: (
      <div className="space-y-4">
        <PageTitle>现代计算机发展趋势</PageTitle>
        <BookParagraph>
          随着技术的不断发展，现代计算机呈现出多样化和智能化的发展趋势。
        </BookParagraph>
        <BookList items={[
          '多核与并行计算',
          '云计算与大数据',
          '人工智能与专用加速芯片',
          '物联网与边缘计算',
          '绿色计算与节能优化',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          为了学好计算机组成原理，建议采取以下学习方法：
        </BookParagraph>
        <BookList items={[
          '结合教材与实际案例，理解原理与应用的联系',
          '多做思考题和实验，提升动手能力',
          '关注新技术发展，拓展视野',
          '推荐教材：《计算机组成原理》（唐朔飞）',
          '推荐教材：《Computer Organization and Design》（Patterson & Hennessy）',
        ]} />
        <TagGrid items={['电子管', '晶体管', '集成电路', '冯·诺依曼', '并行计算']} />
      </div>
    ),
  },
]

export default function CompositionIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
