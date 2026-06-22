'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '推荐系统面试题', chapterNumber: 11, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '推荐系统实战', href: '/study/ai/recsys/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/recsys/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>推荐系统面试题</PageTitle><BookParagraph>推荐系统是算法面试中的重点方向，涵盖协同过滤、矩阵分解、深度学习推荐、评估指标等核心知识点。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '基础问题', left: (<div className="space-y-4"><PageTitle>基础问题</PageTitle><SectionTitle>1. 协同过滤的原理和优缺点？</SectionTitle><BookParagraph>协同过滤基于用户行为数据，通过相似度计算进行推荐。优点是无需物品特征，能发现潜在兴趣；缺点是冷启动问题和数据稀疏性。</BookParagraph><SectionTitle>2. 矩阵分解的原理？</SectionTitle><BookParagraph>将评分矩阵R分解为用户矩阵P和物品矩阵Q，通过P和Q的乘积预测评分。常用方法有SVD、FunkSVD、NMF等。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '进阶问题', left: (<div className="space-y-4"><PageTitle>进阶问题</PageTitle><SectionTitle>1. Wide & Deep和DeepFM的区别？</SectionTitle><BookParagraph>Wide & Deep是线性+深度网络，DeepFM是FM+深度网络。DeepFM通过FM自动学习特征交互，无需人工特征工程。</BookParagraph><SectionTitle>2. 如何处理数据稀疏性？</SectionTitle><BookList items={['矩阵分解降维','利用辅助信息','图神经网络','迁移学习']} /></div>), right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '系统设计', left: (<div className="space-y-4"><PageTitle>系统设计</PageTitle><SectionTitle>设计一个实时推荐系统</SectionTitle><BookParagraph>系统架构分层：数据层（Kafka收集事件）→ 召回层（多路召回）→ 排序层（CTR模型）→ 重排层（多样性控制）。使用Redis缓存特征，Flink实时处理，模型服务使用TensorFlow Serving。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>),
  },
]

export default function RecSysInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
