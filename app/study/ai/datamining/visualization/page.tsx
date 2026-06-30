'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const mplCode = `import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# 分布图\nsns.histplot(data=df, x='value', hue='category')\nplt.show()\n\n# 相关矩阵\nsns.heatmap(df.corr(), annot=True, cmap='coolwarm')\nplt.show()\n\n# 箱线图\nsns.boxplot(data=df, x='category', y='value')`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '数据可视化', chapterNumber: 8, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '异常检测', href: '/study/ai/datamining/anomaly' }, nextChapter: { label: '数据挖掘实战', href: '/study/ai/datamining/practice' }, theme: THEMES.ai }

const SPREADS = [
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>数据可视化</PageTitle><BookParagraph>数据可视化通过图形方式展示数据，帮助发现数据中的模式、趋势和异常。常用的Python可视化库包括Matplotlib、Seaborn、Plotly等。</BookParagraph><SectionTitle>图表类型</SectionTitle><BookList items={['分布图：直方图、密度图','关联图：散点图、热力图','比较图：柱状图、箱线图','趋势图：折线图、面积图']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '可视化工具', left: (<div className="space-y-4"><PageTitle>可视化工具</PageTitle><SectionTitle>Matplotlib + Seaborn</SectionTitle><BookCode language="python" code={mplCode} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['探索性数据分析(EDA)','模型结果可视化','报表和仪表盘','数据故事呈现']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmVisualizationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
