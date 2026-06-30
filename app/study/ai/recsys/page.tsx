'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '推荐系统基础', description: '推荐系统概念、分类和应用场景', href: '/study/ai/recsys/basic' },
  { number: 2, title: '协同过滤', description: '基于用户和物品的协同过滤算法', href: '/study/ai/recsys/collaborative-filtering' },
  { number: 3, title: '基于内容的推荐', description: '内容特征提取和相似度计算', href: '/study/ai/recsys/content-based' },
  { number: 4, title: '矩阵分解', description: 'SVD、NMF等矩阵分解技术', href: '/study/ai/recsys/matrix-factorization' },
  { number: 5, title: '深度学习推荐', description: '神经网络在推荐系统中的应用', href: '/study/ai/recsys/deep-learning' },
  { number: 6, title: '推荐系统评估', description: '评估指标和离线在线评估方法', href: '/study/ai/recsys/evaluation' },
  { number: 7, title: '冷启动问题', description: '新用户新物品的推荐策略', href: '/study/ai/recsys/cold-start' },
  { number: 8, title: '实时推荐', description: '流式处理和实时推荐架构', href: '/study/ai/recsys/real-time' },
  { number: 9, title: '推荐系统架构', description: '大规模推荐系统设计与实现', href: '/study/ai/recsys/architecture' },
  { number: 10, title: '推荐系统实战', description: '完整推荐系统项目开发', href: '/study/ai/recsys/cases' },
  { number: 11, title: '推荐系统面试题', description: '推荐算法面试高频问题', href: '/study/ai/recsys/interview' },
  { number: 12, title: '进阶与前沿', description: '多目标优化、强化学习推荐', href: '/study/ai/recsys/advanced' },
]

export default function RecSysHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="推荐系统"
        subtitle="Recommender System"
        description="推荐系统是信息过载时代的核心技术，通过理解用户偏好和物品特征，为用户推荐感兴趣的内容。从电商到短视频，推荐算法正在塑造数字时代的用户体验。"
        chapterCount={CHAPTERS.length}
        totalHours={160}
        chapters={CHAPTERS}
        icon="⭐"
        startHref="/study/ai/recsys/basic"
        theme={THEMES.ai}
      />
    </div>
  )
}
