'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '实时推荐', chapterNumber: 8, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '冷启动问题', href: '/study/ai/recsys/cold-start' },
  nextChapter: { label: '推荐系统架构', href: '/study/ai/recsys/architecture' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>实时推荐概述</PageTitle><BookParagraph>实时推荐系统能够在用户行为发生后立即更新推荐结果，提供即时的个性化体验。实时推荐对于提升用户参与度和转化率至关重要，广泛应用于电商、视频、新闻等领域。</BookParagraph><SectionTitle>实时推荐的特点</SectionTitle><BookList items={['低延迟：毫秒级响应','高吞吐：支持大量并发','实时更新：秒级数据更新','状态管理：维护用户会话']} /><SectionTitle>挑战</SectionTitle><BookList items={['数据处理延迟','计算资源消耗','状态一致性维护','系统稳定性保障']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '系统架构', left: (<div className="space-y-4"><PageTitle>系统架构</PageTitle><SectionTitle>实时推荐架构</SectionTitle><BookParagraph>实时推荐系统通常采用Lambda架构，同时支持实时和批量处理。实时层处理在线数据，批处理层处理大规模历史数据，服务层合并结果。</BookParagraph><SectionTitle>核心组件</SectionTitle><BookList items={['消息队列：Kafka收集实时事件','流处理：Flink/Spark Streaming','特征存储：Redis快速存取','模型服务：TensorFlow Serving']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>实时流程</SectionTitle><BookCode language="python" code={`# 实时推荐流程\n1. 用户行为事件 → Kafka\n2. Flink实时处理用户行为\n3. 更新用户特征到Redis\n4. 调用模型服务生成推荐\n5. 返回推荐结果并展示`} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '性能优化', left: (<div className="space-y-4"><PageTitle>性能优化</PageTitle><SectionTitle>优化策略</SectionTitle><BookList items={['缓存预计算：提前生成推荐候选','特征预加载：预热用户特征','模型轻量化：使用小模型','异步处理：非阻塞推荐']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysRealTimePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
