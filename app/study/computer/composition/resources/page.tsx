'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机组成原理',
  chapterTitle: '学习建议与资源',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/computer/composition',
  prevChapter: { label: '系统性能与优化', href: '/study/computer/composition/performance' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>高效学习方法</PageTitle>
        <BookParagraph>计算机组成原理知识点多且抽象，掌握好的学习方法可以事半功倍。</BookParagraph>
        <BookList items={[
          '结合教材与实际案例，理解原理与应用的联系',
          '多做思考题和实验，提升动手能力',
          '整理知识结构图，形成系统认知',
          '定期复习与自测，查漏补缺',
          '关注新技术发展，拓展视野',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>刷题与实验建议</PageTitle>
        <BookParagraph>理论和实践相结合是学好组成原理的关键。</BookParagraph>
        <BookList items={[
          '优先做课后习题和经典真题，掌握常考点',
          '动手搭建简易CPU/存储/总线等仿真实验，加深理解',
          '参与开源项目或竞赛，提升综合能力',
          '使用模拟器（如MARS、Logisim）进行硬件仿真',
        ]} />
      </div>
    ),
  },
  {
    label: '推荐资料',
    left: (
      <div className="space-y-4">
        <PageTitle>推荐教材与参考书</PageTitle>
        <BookParagraph>经典教材是系统学习的最佳途径：</BookParagraph>
        <BookList items={[
          '《计算机组成原理》（唐朔飞）——国内经典教材，内容系统全面',
          '《Computer Organization and Design》（Patterson & Hennessy）——国际权威教材',
          '《深入理解计算机系统》（CSAPP）——硬核进阶读物',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>优质网站与视频课程</PageTitle>
        <BookParagraph>网络资源可作为学习的重要补充：</BookParagraph>
        <BookList items={[
          '中国大学MOOC - 计算机组成原理（北理工）',
          'CMU CS:APP 官方网站（csapp.cs.cmu.edu）',
          'B站 - 王道计算机组成原理课程',
          'B站 - 哈工大计算机组成原理课程',
          'Logisim 仿真工具 - 可视化搭建CPU',
        ]} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题解答</PageTitle>
        <BookParagraph>针对学习过程中常见问题的答疑：</BookParagraph>
        <BookList items={[
          'Q：组成原理和体系结构有什么区别？A：组成原理关注硬件实现细节，体系结构更偏向整体设计与性能优化。',
          'Q：如何高效记忆各类结构和原理？A：多画结构图、流程图，结合例题和实验加深理解。',
          'Q：需要掌握哪些数学基础？A：主要涉及二进制、逻辑代数、简单概率等。',
          'Q：适合哪些竞赛或项目实践？A：蓝桥杯、计算机设计大赛、CPU仿真、FPGA开发等。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习路线建议</PageTitle>
        <BookParagraph>建议按照以下路线循序渐进：</BookParagraph>
        <BookList items={[
          '先打好基础，逐步深入（先理解组成原理，再拓展体系结构/操作系统等）',
          '理论结合实践，注重动手能力培养',
          '多与同学、老师交流，参与讨论和答疑',
          '坚持刷题和实验，形成正向反馈',
        ]} />
        <TagGrid items={['学习路线', '教材推荐', '视频课程', '刷题', '实验仿真']} />
      </div>
    ),
  },
]

export default function CompositionResourcesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
