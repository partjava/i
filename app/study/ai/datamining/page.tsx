'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '数据挖掘基础', description: '数据挖掘概念、流程和发展历史', href: '/study/ai/datamining/basic' },
  { number: 2, title: '数据预处理', description: '数据清洗、集成、变换和归约', href: '/study/ai/datamining/preprocessing' },
  { number: 3, title: '特征工程', description: '特征选择、提取和构建方法', href: '/study/ai/datamining/feature-engineering' },
  { number: 4, title: '关联规则挖掘', description: 'Apriori、FP-Growth等关联算法', href: '/study/ai/datamining/association' },
  { number: 5, title: '聚类分析', description: 'K-Means、层次聚类、DBSCAN等', href: '/study/ai/datamining/clustering' },
  { number: 6, title: '分类与预测', description: '决策树、贝叶斯、SVM等分类算法', href: '/study/ai/datamining/classification' },
  { number: 7, title: '异常检测', description: '孤立森林、LOF等异常检测方法', href: '/study/ai/datamining/anomaly' },
  { number: 8, title: '数据可视化', description: 'Matplotlib、Seaborn等可视化工具', href: '/study/ai/datamining/visualization' },
  { number: 9, title: '数据挖掘实战', description: '完整数据挖掘项目案例', href: '/study/ai/datamining/practice' },
  { number: 10, title: '面试题与前沿', description: '数据挖掘面试准备和技术前沿', href: '/study/ai/datamining/interview' },
]

export default function DmHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="数据挖掘"
        subtitle="Data Mining"
        description="数据挖掘是从海量数据中提取有价值信息和知识的过程。掌握数据预处理、特征工程、机器学习建模等核心技能。"
        chapterCount={CHAPTERS.length}
        totalHours={200}
        chapters={CHAPTERS}
        icon="📊"
        startHref="/study/ai/datamining/basic"
        theme={THEMES.ai}
      />
    </div>
  )
}
