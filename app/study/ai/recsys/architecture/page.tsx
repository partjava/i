'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '推荐系统架构', chapterNumber: 9, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '实时推荐', href: '/study/ai/recsys/real-time' },
  nextChapter: { label: '推荐系统实战', href: '/study/ai/recsys/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>推荐系统架构概述</PageTitle><BookParagraph>推荐系统架构是推荐系统的骨架，决定了系统的性能、可扩展性和可维护性。一个成熟的推荐系统架构需要支持大规模数据处理、实时推荐、A/B测试等功能。</BookParagraph><SectionTitle>架构设计目标</SectionTitle><BookList items={['高可用：系统稳定运行','可扩展：支持业务增长','低延迟：快速响应请求','易维护：方便迭代更新']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '核心组件', left: (<div className="space-y-4"><PageTitle>核心组件</PageTitle><SectionTitle>数据层</SectionTitle><BookList items={['用户数据：画像、行为、偏好','物品数据：属性、内容、标签','交互数据：点击、购买、评分']} /><SectionTitle>召回层</SectionTitle><BookList items={['协同过滤召回','向量召回','热度召回','标签召回']} /><SectionTitle>排序层</SectionTitle><BookList items={['粗排：轻量模型快速筛选','精排：复杂模型精确排序','重排：多样性保证']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '架构模式', left: (<div className="space-y-4"><PageTitle>架构模式</PageTitle><SectionTitle>Lambda架构</SectionTitle><BookParagraph>Lambda架构同时支持实时和批量处理，包括批处理层（处理全量数据）、实时层（处理增量数据）和服务层（合并结果）。</BookParagraph><SectionTitle>Kappa架构</SectionTitle><BookParagraph>Kappa架构简化了Lambda架构，统一使用流处理引擎处理所有数据，降低了系统复杂度。</BookParagraph></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '部署方案', left: (<div className="space-y-4"><PageTitle>部署方案</PageTitle><SectionTitle>部署策略</SectionTitle><BookList items={['容器化：Docker + Kubernetes','模型服务：TensorFlow Serving/ONNX Runtime','监控告警：Prometheus + Grafana','日志采集：ELK Stack']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysArchPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
