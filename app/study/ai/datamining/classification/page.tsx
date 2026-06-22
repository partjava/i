'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const clfCode = `from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\ny_pred = clf.predict(X_test)\nprint(classification_report(y_test, y_pred))`

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '分类与预测', chapterNumber: 6, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '聚类分析', href: '/study/ai/datamining/clustering' }, nextChapter: { label: '异常检测', href: '/study/ai/datamining/anomaly' }, theme: THEMES.ai }

const SPREADS = [
  { label: '基本概念', left: (<div className="space-y-4"><PageTitle>分类与预测</PageTitle><BookParagraph>分类是预测离散类别标签，回归是预测连续数值。常用的分类算法包括决策树、SVM、朴素贝叶斯、KNN和集成方法。</BookParagraph><SectionTitle>评估指标</SectionTitle><BookList items={['准确率、精确率、召回率、F1','混淆矩阵','ROC曲线和AUC']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法实现', left: (<div className="space-y-4"><PageTitle>算法实现</PageTitle><SectionTitle>随机森林</SectionTitle><BookCode language="python" code={clfCode} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实际应用', left: (<div className="space-y-4"><PageTitle>实际应用</PageTitle><BookList items={['信用评分：评估贷款风险','疾病诊断：预测疾病','垃圾邮件过滤','客户流失预测']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmClassificationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
