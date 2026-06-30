'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const svdCode = `import numpy as np
from sklearn.decomposition import TruncatedSVD

class MFRecommender:
    def __init__(self, n_factors=20):
        self.n_factors = n_factors
        self.svd = TruncatedSVD(n_components=n_factors)

    def fit(self, ratings):
        self.user_factors = self.svd.fit_transform(ratings)
        self.item_factors = self.svd.components_.T

    def predict(self, user_id, item_id):
        return np.dot(self.user_factors[user_id], self.item_factors[item_id])`

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '矩阵分解', chapterNumber: 4, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '基于内容的推荐', href: '/study/ai/recsys/content-based' },
  nextChapter: { label: '深度学习推荐', href: '/study/ai/recsys/deep-learning' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>矩阵分解概述</PageTitle><BookParagraph>矩阵分解是推荐系统中的核心算法之一，它通过将用户-物品评分矩阵分解为低维矩阵的乘积，学习用户和物品的潜在特征表示。矩阵分解方法能够有效处理稀疏数据，并具有良好的可扩展性。</BookParagraph><SectionTitle>核心思想</SectionTitle><BookList items={['将评分矩阵 R 分解为用户矩阵 P 和物品矩阵 Q','R ≈ P × Q^T','用户和物品被映射到共享的潜在空间','潜在特征反映用户偏好和物品属性']} /><SectionTitle>优势</SectionTitle><BookList items={['处理高维稀疏数据','学习用户和物品的潜在特征','预测精度较高','可扩展性好']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '算法原理', left: (<div className="space-y-4"><PageTitle>算法原理</PageTitle><SectionTitle>SVD（奇异值分解）</SectionTitle><BookParagraph>SVD将评分矩阵分解为三个矩阵的乘积：R = U × Σ × V^T。截断SVD只保留最大的k个奇异值，达到降维和去噪的效果。</BookParagraph><SectionTitle>FunkSVD</SectionTitle><BookParagraph>FunkSVD只将矩阵分解为两个低维矩阵：R ≈ P × Q^T。通过最小化预测评分与真实评分之间的RMSE来学习参数。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>NMF（非负矩阵分解）</SectionTitle><BookParagraph>NMF在分解过程中要求所有元素非负，使得分解结果具有更好的可解释性。适用于评分数据非负的场景。</BookParagraph></div>) },
  { label: '优化方法', left: (<div className="space-y-4"><PageTitle>优化方法</PageTitle><SectionTitle>正则化</SectionTitle><BookList items={['L2正则化防止过拟合','正则化系数通过交叉验证选择','对用户和物品特征分别正则化']} /><SectionTitle>偏差项</SectionTitle><BookList items={['全局偏差：整体评分均值','用户偏差：用户评分习惯','物品偏差：物品受欢迎程度']} /></div>), right: (<div className="space-y-4"><SectionTitle>高级技巧</SectionTitle><BookList items={['学习率衰减：动态调整学习率','动量优化：加速收敛','负采样：加速训练','隐式反馈：利用隐式信号']} /></div>) },
  { label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>Python实现</SectionTitle><BookCode language="python" code={svdCode} /><SectionTitle>手动实现FunkSVD</SectionTitle><BookCode language="python" code={`import numpy as np\n\nclass FunkSVD:\n    def __init__(self, n_factors=10, lr=0.01, reg=0.1, n_epochs=100):\n        self.n_factors=n_factors; self.lr=lr; self.reg=reg; self.n_epochs=n_epochs\n    def fit(self, ratings):\n        n_users, n_items = ratings.shape\n        self.P = np.random.normal(0, 0.1, (n_users, self.n_factors))\n        self.Q = np.random.normal(0, 0.1, (n_items, self.n_factors))\n        for epoch in range(self.n_epochs):\n            for u in range(n_users):\n                for i in range(n_items):\n                    if ratings[u,i] > 0:\n                        err = ratings[u,i] - np.dot(self.P[u], self.Q[i])\n                        self.P[u] += self.lr * (err * self.Q[i] - self.reg * self.P[u])\n                        self.Q[i] += self.lr * (err * self.P[u] - self.reg * self.Q[i])\n    def predict(self, u, i):\n        return np.dot(self.P[u], self.Q[i])`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '应用实践', left: (<div className="space-y-4"><PageTitle>应用实践</PageTitle><SectionTitle>推荐场景</SectionTitle><BookList items={['评分预测：预测用户对物品的评分','Top-N推荐：生成推荐列表','相似物品推荐：基于物品向量相似度']} /><SectionTitle>工程优化</SectionTitle><BookList items={['稀疏矩阵存储','GPU加速训练','分布式并行计算','模型定期更新']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysMfPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
