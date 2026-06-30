'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '可视化与BI',
  chapterNumber: 6,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '数据分析与挖掘', href: '/study/se/bigdata/analysis' },
  nextChapter: { label: '大数据安全与运维', href: '/study/se/bigdata/security' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'BI工具',
    left: (
      <div className="space-y-4">
        <PageTitle>数据可视化工具</PageTitle>
        <BookParagraph>
          数据可视化是将分析结果以图形化方式呈现的关键环节，主流的可视化工具包括：
        </BookParagraph>
        <BookList items={[
          'Tableau：拖拽式分析',
          'Apache Superset：开源BI平台',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>BI平台集成</PageTitle>
        <BookParagraph>
          Apache Superset 是功能强大的开源 BI 平台，支持连接多种数据源。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`# Superset连接Hive
superset db upgrade
superset fab create-admin
superset run -p 8088 --with-threads`}
        />
      </div>
    ),
  },
  {
    label: '可视化实践',
    left: (
      <div className="space-y-4">
        <PageTitle>可视化代码示例（Python）</PageTitle>
        <BookParagraph>
          Python 的 Matplotlib 库是最基础的可视化工具，适合快速生成统计图表。
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`import matplotlib.pyplot as plt
plt.plot([1,2,3],[4,5,6])
plt.show()`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>可视化最佳实践</PageTitle>
        <BookParagraph>
          有效的数据可视化应遵循以下原则：
        </BookParagraph>
        <BookList items={[
          '选择合适的图表类型（折线图、柱状图、散点图等）',
          '保持简洁，避免信息过载',
          '使用颜色突出重点数据',
          '添加清晰的标题和标签',
        ]} />
      </div>
    ),
  },
]

export default function BiPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
