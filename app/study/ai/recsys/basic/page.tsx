'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '推荐系统基础', chapterNumber: 1, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  nextChapter: { label: '协同过滤', href: '/study/ai/recsys/collaborative-filtering' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '基础概念', left: (<div className="space-y-4"><PageTitle>什么是推荐系统？</PageTitle><BookParagraph>推荐系统是一种信息过滤系统，它能够预测用户对物品的偏好，并向用户推荐可能感兴趣的物品。推荐系统已经成为现代互联网应用的重要组成部分，广泛应用于电商、视频、音乐、新闻等领域。</BookParagraph><SectionTitle>推荐系统的目标</SectionTitle><BookList items={['帮助用户发现感兴趣的内容','提高用户满意度和参与度','增加平台活跃度和转化率','优化用户体验和商业价值']} /><SectionTitle>推荐系统的基本流程</SectionTitle><BookParagraph><b>数据收集：</b>用户行为数据（点击、浏览、购买等），用户属性数据，物品特征数据，上下文数据（时间、地点、设备等）</BookParagraph><BookParagraph><b>推荐生成：</b>特征提取和表示 → 相似度计算 → 候选集生成 → 排序和过滤</BookParagraph><BookParagraph><b>结果展示：</b>个性化展示，多样性保证，实时更新，用户反馈收集</BookParagraph></div>),
    right: (<div className="space-y-4"><br /></div>),
  },
  {
    label: '核心要素', left: (<div className="space-y-4"><PageTitle>用户建模</PageTitle><SectionTitle>用户特征</SectionTitle><BookList items={['人口统计学特征（年龄、性别、地域等）','行为特征（浏览、点击、购买等）','兴趣特征（偏好、标签等）','社交特征（社交关系、互动等）']} /><SectionTitle>用户画像</SectionTitle><BookList items={['静态画像（长期特征）','动态画像（实时特征）','兴趣画像（偏好特征）','行为画像（交互特征）']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>物品建模</SectionTitle><SectionTitle>物品特征</SectionTitle><BookList items={['内容特征（文本、图像、视频等）','属性特征（类别、标签、价格等）','统计特征（热度、评分等）','上下文特征（时间、场景等）']} /><SectionTitle>物品表示</SectionTitle><BookList items={['向量表示','图结构表示','序列表示','多模态表示']} /></div>),
  },
  {
    label: '系统类型', left: (<div className="space-y-4"><PageTitle>基于内容的推荐</PageTitle><SectionTitle>基本原理</SectionTitle><BookList items={['分析物品内容特征','提取用户兴趣特征','计算内容相似度','推荐相似物品']} /><SectionTitle>应用场景</SectionTitle><BookList items={['新闻推荐','视频推荐','音乐推荐','商品推荐']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>协同过滤推荐</SectionTitle><BookParagraph><b>基于用户的协同过滤：</b>找到相似用户，基于相似用户的行为推荐，考虑用户相似度权重，生成推荐列表</BookParagraph><BookParagraph><b>基于物品的协同过滤：</b>计算物品相似度，基于用户历史行为，推荐相似物品，考虑物品相似度权重</BookParagraph></div>),
  },
  {
    label: '评估指标', left: (<div className="space-y-4"><PageTitle>离线评估指标</PageTitle><SectionTitle>准确率指标</SectionTitle><BookList items={['准确率（Precision）','召回率（Recall）','F1分数','AUC-ROC']} /><SectionTitle>排序指标</SectionTitle><BookList items={['NDCG（归一化折损累积增益）','MAP（平均精度均值）','MRR（平均倒数排名）','Hit Rate（命中率）']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>在线评估指标</SectionTitle><BookParagraph><b>用户行为指标：</b>点击率（CTR）、转化率（CVR）、停留时间、用户活跃度</BookParagraph><BookParagraph><b>业务指标：</b>GMV（总交易额）、ARPU（平均用户收入）、留存率、用户满意度</BookParagraph></div>),
  },
]

export default function RecSysBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
