'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '进阶与前沿', chapterNumber: 12, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '推荐系统面试题', href: '/study/ai/recsys/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>推荐系统进阶与前沿</PageTitle><BookParagraph>推荐系统领域正在快速发展，新技术和新方法不断涌现。本章将介绍推荐系统的最新研究进展和技术趋势。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '研究进展', left: (<div className="space-y-4"><PageTitle>研究进展</PageTitle><SectionTitle>图神经网络推荐</SectionTitle><BookParagraph>GNN在推荐系统中的应用越来越广泛，如PinSage、NGCF、LightGCN等模型，通过图结构捕捉用户-物品之间的高阶交互关系。</BookParagraph><SectionTitle>强化学习推荐</SectionTitle><BookParagraph>将推荐建模为序贯决策问题，通过强化学习优化长期回报。适用于动态环境下的推荐场景。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>多目标优化</SectionTitle><BookParagraph>推荐系统需要同时优化多个目标（点击率、转化率、多样性等）。MMOE、PLE等模型通过多门控专家网络实现多目标优化。</BookParagraph></div>) },
  { label: '技术趋势', left: (<div className="space-y-4"><PageTitle>技术趋势</PageTitle><SectionTitle>大模型推荐</SectionTitle><BookParagraph>预训练语言模型应用于推荐系统，通过文本理解增强推荐能力。P5、RecFormer等模型探索统一推荐框架。</BookParagraph><SectionTitle>因果推荐</SectionTitle><BookParagraph>利用因果推断消除推荐中的偏差，提高推荐的公平性和鲁棒性。包括反事实推理、Debias技术等。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '挑战与展望', left: (<div className="space-y-4"><PageTitle>挑战与展望</PageTitle><SectionTitle>主要挑战</SectionTitle><BookList items={['数据隐私保护：差分隐私、联邦学习','推荐公平性：消除各种偏见','可解释推荐：推荐原因透明','跨域推荐：迁移学习']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysAdvancedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
