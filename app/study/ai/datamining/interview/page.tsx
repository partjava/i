'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = { subject: '数据挖掘', chapterTitle: '面试题与前沿', chapterNumber: 10, totalChapters: 10, subjectHref: '/study/ai/datamining', prevChapter: { label: '数据挖掘实战', href: '/study/ai/datamining/practice' }, theme: THEMES.ai }

const SPREADS = [
  { label: '常见问题', left: (<div className="space-y-4"><PageTitle>常见问题</PageTitle><SectionTitle>1. 过拟合与欠拟合</SectionTitle><BookParagraph>过拟合：模型在训练集上表现好但测试集差。解决方法：增加数据、正则化、简化模型、交叉验证。</BookParagraph><SectionTitle>2. 数据不平衡处理</SectionTitle><BookList items={['过采样：SMOTE','欠采样：随机采样','调整类别权重','使用适合的评估指标(F1、AUC)']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '面试题', left: (<div className="space-y-4"><PageTitle>面试题</PageTitle><SectionTitle>1. K-Means的优缺点？</SectionTitle><BookParagraph>优点：简单快速、可扩展。缺点：需指定K值、对初始值敏感、只能发现球形簇、对异常值敏感。</BookParagraph><SectionTitle>2. PCA的原理？</SectionTitle><BookParagraph>PCA通过正交变换将数据投影到方差最大的方向，实现降维。找到协方差矩阵的特征向量，按特征值大小排序选择主成分。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '前沿技术', left: (<div className="space-y-4"><PageTitle>前沿技术</PageTitle><BookList items={['AutoML：自动机器学习','可解释AI：SHAP、LIME','联邦学习：隐私保护','图神经网络：图数据挖掘']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function DmInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
