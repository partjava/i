'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '基于内容的推荐', chapterNumber: 3, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '协同过滤', href: '/study/ai/recsys/collaborative-filtering' },
  nextChapter: { label: '矩阵分解', href: '/study/ai/recsys/matrix-factorization' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>基于内容的推荐</PageTitle><BookParagraph>基于内容的推荐是一种经典的推荐方法，它通过分析物品的内容特征和用户的兴趣特征来生成推荐。与协同过滤不同，基于内容的推荐不需要依赖其他用户的行为数据。</BookParagraph><SectionTitle>核心思想</SectionTitle><BookList items={['分析物品的内容特征（文本、图像、音频等）','构建用户兴趣画像','计算物品与用户画像的相似度','推荐最相似的物品']} /><SectionTitle>优势与局限</SectionTitle><BookParagraph><b>优势：</b>不受冷启动问题影响，推荐结果可解释性强，适合新物品推荐</BookParagraph><BookParagraph><b>局限：</b>特征提取困难，推荐结果缺乏新颖性，难以发现用户潜在兴趣</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '特征提取', left: (<div className="space-y-4"><PageTitle>特征提取</PageTitle><SectionTitle>文本特征</SectionTitle><BookList items={['TF-IDF：词频-逆文档频率','Word2Vec：词向量表示','BERT：预训练语言模型','主题模型：LDA等']} /><SectionTitle>图像特征</SectionTitle><BookList items={['颜色直方图：颜色分布特征','SIFT：局部特征描述子','CNN特征：深度网络提取','ViT特征：Transformer提取']} /></div>), right: (<div className="space-y-4"><SectionTitle>音频特征</SectionTitle><BookList items={['MFCC：梅尔频率倒谱系数','频谱特征：频谱图分析','节奏特征：节拍和速度']} /></div>) },
  { label: '用户画像', left: (<div className="space-y-4"><PageTitle>用户画像构建</PageTitle><SectionTitle>构建方法</SectionTitle><BookList items={['基于用户历史行为提取兴趣特征','对用户喜好的物品特征进行聚合','使用TF-IDF构建用户兴趣向量','动态更新用户画像']} /><SectionTitle>更新策略</SectionTitle><BookList items={['增量更新：实时更新用户画像','衰减更新：降低历史行为权重','反馈更新：基于用户反馈调整']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '推荐生成', left: (<div className="space-y-4"><PageTitle>推荐生成</PageTitle><SectionTitle>相似度计算</SectionTitle><BookList items={['余弦相似度：计算向量夹角','皮尔逊相关系数：考虑线性相关','欧氏距离：计算绝对距离']} /><SectionTitle>推荐策略</SectionTitle><BookList items={['Top-N推荐：选择相似度最高的N个物品','阈值筛选：设定相似度阈值','多样性控制：保证推荐多样性']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>Python实现</SectionTitle><BookCode language="python" code={`from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\nclass ContentBased:\n    def __init__(self):\n        self.vectorizer = TfidfVectorizer()\n        self.item_vectors = None\n    def fit(self, items):\n        self.item_vectors = self.vectorizer.fit_transform(items)\n    def recommend(self, user_profile, top_k=10):\n        scores = cosine_similarity(user_profile, self.item_vectors)[0]\n        return np.argsort(scores)[-top_k:][::-1]`} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysContentBasedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
