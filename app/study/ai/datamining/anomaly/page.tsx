'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const isoCode = `from sklearn.ensemble import IsolationForest\nimport numpy as np\n\nclf = IsolationForest(contamination=0.1, random_state=42)\npreds = clf.fit_predict(X)\nanomalies = X[preds == -1]\nprint(f"异常点数: {len(anomalies)}")`

const lofCode = `from sklearn.neighbors import LocalOutlierFactor\nclf = LocalOutlierFactor(n_neighbors=20, contamination=0.1)\npreds = clf.fit_predict(X)\nscores = clf.negative_outlier_factor_`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '异常检测', chapterNumber: 7, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '分类与预测', href: '/study/ai/datamining/classification' }, nextChapter: { label: '数据可视化', href: '/study/ai/datamining/visualization' }, theme: THEMES.ai }

const SPREADS = [
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>异常检测</PageTitle><BookParagraph>异常检测识别数据中与正常模式显著不同的样本。广泛应用于欺诈检测、故障诊断、网络安全等领域。</BookParagraph><SectionTitle>异常类型</SectionTitle><BookList items={['点异常：单个数据点异常','上下文异常：特定上下文中的异常','集体异常：一组数据的异常']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法实现', left: (<div className="space-y-4"><PageTitle>算法实现</PageTitle><SectionTitle>孤立森林</SectionTitle><BookCode language="python" code={isoCode} /><SectionTitle>LOF</SectionTitle><BookCode language="python" code={lofCode} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['金融欺诈检测','工业设备故障检测','网络安全入侵检测','医疗异常诊断']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmAnomalyPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
