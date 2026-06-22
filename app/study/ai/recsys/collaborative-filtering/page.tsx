'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const cfCode = `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class UserBasedCF:
    def __init__(self, n_neighbors=20):
        self.n_neighbors = n_neighbors
        self.user_similarity = None

    def fit(self, ratings):
        self.user_similarity = cosine_similarity(ratings)

    def predict(self, user_id, item_id, ratings):
        similar_users = np.argsort(self.user_similarity[user_id])[-self.n_neighbors:]
        prediction = 0; similarity_sum = 0
        for similar_user in similar_users:
            if ratings[similar_user, item_id] > 0:
                prediction += self.user_similarity[user_id, similar_user] * ratings[similar_user, item_id]
                similarity_sum += self.user_similarity[user_id, similar_user]
        return prediction / similarity_sum if similarity_sum > 0 else 0`

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '协同过滤', chapterNumber: 2, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '推荐系统基础', href: '/study/ai/recsys/basic' },
  nextChapter: { label: '基于内容的推荐', href: '/study/ai/recsys/content-based' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>协同过滤简介</PageTitle><BookParagraph>协同过滤是一种基于用户行为数据的推荐方法，它通过分析用户之间的相似性或物品之间的相似性来生成推荐。协同过滤不需要物品的内容特征，只需要用户的历史行为数据，因此具有很好的通用性。</BookParagraph><SectionTitle>协同过滤的主要特点</SectionTitle><BookList items={['基于用户行为数据，不需要物品内容特征','可以发现用户的潜在兴趣','能够推荐新颖的物品','具有较好的可扩展性']} /><SectionTitle>核心思想</SectionTitle><BookList items={['相似的用户可能对相似的物品感兴趣','相似的物品可能被相似的用户喜欢','基于历史行为数据预测用户偏好','利用群体智慧进行个性化推荐']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>协同过滤的分类</SectionTitle><BookParagraph><b>基于用户的协同过滤：</b>找到与目标用户相似的用户群体，基于相似用户的行为进行推荐。适合用户数量较少的场景，计算复杂度随用户数量增长。</BookParagraph><BookParagraph><b>基于物品的协同过滤：</b>计算物品之间的相似度，基于用户历史行为推荐相似物品。适合物品数量较少的场景，计算复杂度随物品数量增长。</BookParagraph><BookParagraph><b>基于模型的协同过滤：</b>使用机器学习模型学习用户偏好，包括矩阵分解、深度学习等方法。可以处理大规模数据，需要更多的计算资源。</BookParagraph></div>),
  },
  {
    label: '基于用户', left: (<div className="space-y-4"><PageTitle>基于用户的协同过滤</PageTitle><SectionTitle>算法步骤</SectionTitle><BookList items={['构建用户-物品评分矩阵','计算用户之间的相似度','选择最相似的K个用户','基于相似用户的评分预测目标用户的评分','生成推荐列表']} ordered /><SectionTitle>相似度计算方法</SectionTitle><BookList items={['余弦相似度（Cosine Similarity）','皮尔逊相关系数（Pearson Correlation）','欧氏距离（Euclidean Distance）','Jaccard相似度']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>优缺点分析</SectionTitle><BookParagraph><b>优点：</b>能够发现用户的潜在兴趣，不需要物品的内容特征，可以推荐新颖的物品，实现相对简单</BookParagraph><BookParagraph><b>缺点：</b>计算复杂度高，数据稀疏性问题，冷启动问题，可扩展性受限</BookParagraph></div>),
  },
  {
    label: '基于物品', left: (<div className="space-y-4"><PageTitle>基于物品的协同过滤</PageTitle><SectionTitle>算法步骤</SectionTitle><BookList items={['构建物品-物品相似度矩阵','计算物品之间的相似度','基于用户历史行为选择相似物品','预测用户对物品的评分','生成推荐列表']} ordered /><SectionTitle>相似度计算方法</SectionTitle><BookList items={['余弦相似度','调整余弦相似度','皮尔逊相关系数','条件概率']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>优缺点分析</SectionTitle><BookParagraph><b>优点：</b>物品相似度相对稳定，可以预计算物品相似度，推荐结果更稳定，适合物品数量较少的场景</BookParagraph><BookParagraph><b>缺点：</b>难以发现用户的潜在兴趣，推荐结果可能过于相似，需要定期更新相似度矩阵，冷启动问题仍然存在</BookParagraph></div>),
  },
  {
    label: '基于模型', left: (<div className="space-y-4"><PageTitle>基于模型的协同过滤</PageTitle><SectionTitle>主要方法</SectionTitle><BookList items={['矩阵分解（Matrix Factorization）','深度学习模型','概率图模型','集成学习方法']} /><SectionTitle>矩阵分解</SectionTitle><BookList items={['SVD（奇异值分解）','NMF（非负矩阵分解）','PMF（概率矩阵分解）','BPR（贝叶斯个性化排序）']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>优缺点分析</SectionTitle><BookParagraph><b>优点：</b>可以处理大规模数据，能够学习潜在特征，预测精度较高，可以处理稀疏数据</BookParagraph><BookParagraph><b>缺点：</b>需要大量训练数据，计算资源消耗大，模型解释性较差，需要定期重新训练</BookParagraph></div>),
  },
  {
    label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>Python实现示例</SectionTitle><BookCode language="python" code={cfCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>性能优化</SectionTitle><BookList items={['使用稀疏矩阵存储','预计算相似度矩阵','使用近似最近邻搜索','分布式计算']} /><SectionTitle>工程实践</SectionTitle><BookList items={['数据预处理和清洗','特征工程和选择','模型评估和调优','在线服务部署']} /></div>),
  },
]

export default function RecSysCfPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
