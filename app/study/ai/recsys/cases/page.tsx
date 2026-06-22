'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '推荐系统实战', chapterNumber: 10, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '推荐系统架构', href: '/study/ai/recsys/architecture' },
  nextChapter: { label: '推荐系统面试题', href: '/study/ai/recsys/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>推荐系统实战概述</PageTitle><BookParagraph>推荐系统实战是将推荐算法和系统架构落地到真实业务场景的过程。通过实战项目，可以掌握从数据分析、模型开发到系统部署的全流程技能。</BookParagraph><SectionTitle>实战流程</SectionTitle><BookList items={['业务理解：分析业务需求和目标','数据准备：采集和处理数据','模型开发：选择和训练算法','系统集成：部署和监控']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '电商推荐', left: (<div className="space-y-4"><PageTitle>电商推荐</PageTitle><SectionTitle>技术方案</SectionTitle><BookList items={['多渠道召回：协同过滤、向量召回、热度召回','CTR预估模型：DeepFM/DIN','实时特征更新：用户实时行为','多目标优化：GMV、点击率']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '视频推荐', left: (<div className="space-y-4"><PageTitle>视频推荐</PageTitle><SectionTitle>核心策略</SectionTitle><BookList items={['用户兴趣建模：观看历史、搜索记录','视频内容理解：标签、分类、描述','时序模型：LSTM/Transformer','探索利用：Bandit算法']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '新闻推荐', left: (<div className="space-y-4"><PageTitle>新闻推荐</PageTitle><SectionTitle>技术要点</SectionTitle><BookList items={['时效性优先：最新新闻优先推荐','个性化排序：用户兴趣匹配','多样性控制：避免信息茧房','冷启动策略：新新闻快速曝光']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
