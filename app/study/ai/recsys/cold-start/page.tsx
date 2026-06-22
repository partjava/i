'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '冷启动问题', chapterNumber: 7, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '推荐系统评估', href: '/study/ai/recsys/evaluation' },
  nextChapter: { label: '实时推荐', href: '/study/ai/recsys/real-time' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>冷启动问题概述</PageTitle><BookParagraph>冷启动问题是推荐系统面临的重要挑战之一，指在新用户或新物品加入系统时，由于缺乏历史数据而无法生成有效推荐的问题。冷启动问题直接影响了推荐系统的用户体验和业务效果。</BookParagraph><SectionTitle>冷启动类型</SectionTitle><BookList items={['用户冷启动：新用户首次使用系统','物品冷启动：新物品加入系统','系统冷启动：全新推荐系统上线']} /><SectionTitle>影响</SectionTitle><BookList items={['降低用户留存率','影响推荐质量','限制系统扩展','损害商业价值']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '解决方案', left: (<div className="space-y-4"><PageTitle>解决方案</PageTitle><SectionTitle>用户冷启动</SectionTitle><BookList items={['利用用户注册信息（年龄、性别、地域等）','引导用户进行兴趣选择','使用热门推荐作为默认策略','基于社交关系进行推荐']} /><SectionTitle>物品冷启动</SectionTitle><BookList items={['利用物品内容特征','基于物品属性计算相似度','使用探索策略分配曝光','结合知识图谱推理']} /></div>), right: (<div className="space-y-4"><SectionTitle>系统冷启动</SectionTitle><BookList items={['引入外部数据源','使用规则引擎生成初始推荐','人工编辑推荐内容','逐步冷启动策略']} /></div>) },
  { label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>混合推荐策略</SectionTitle><BookCode language="python" code={`class HybridRecommender:\n    def __init__(self):\n        self.popular = PopularRecommender()\n        self.content = ContentBasedRecommender()\n        self.collab = CollaborativeFiltering()\n    def recommend(self, user, item=None, k=10):\n        if user.is_new and item.is_new:\n            return self.popular.recommend(k)\n        elif user.is_new:\n            return self.content.recommend(item, k)\n        elif item.is_new:\n            return self.collab.recommend(user, k)\n        return self.collab.recommend(user, k)`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实践案例', left: (<div className="space-y-4"><PageTitle>实践案例</PageTitle><SectionTitle>冷启动策略</SectionTitle><BookList items={['新用户兴趣选择页面：让用户选择感兴趣的标签','利用第三方数据：接入社交网络数据','探索与利用平衡：使用Bandit算法','渐进式冷启动：先粗后细']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysColdStartPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
