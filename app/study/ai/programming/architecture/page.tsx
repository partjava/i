'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = { subject: '人工智能程序设计', chapterTitle: 'AI系统架构设计', chapterNumber: 5, totalChapters: 8, subjectHref: '/study/ai/programming', prevChapter: { label: 'AI项目开发流程', href: '/study/ai/programming/workflow' }, nextChapter: { label: '模型部署与优化', href: '/study/ai/programming/deployment' }, theme: THEMES.ai }

const SPREADS = [
  { label: '架构概述', left: (<div className="space-y-4"><PageTitle>架构概述</PageTitle><BookParagraph>AI系统架构是AI应用的骨架，决定了系统的性能、可扩展性和可维护性。良好的架构设计需要考虑数据流、模型服务、系统集成等多个方面。</BookParagraph><SectionTitle>架构设计原则</SectionTitle><BookList items={['模块化：各组件独立部署和扩展','可扩展：支持水平扩展','容错性：单点故障不影响整体','可观测：完善的监控和日志']} /></div>), right: (<div className="space-y-4"><SectionTitle>系统架构示例</SectionTitle><BookCode language="python" code={`# AI系统架构组件\n# 1. 数据管道: Kafka -> Flink -> Feature Store\n# 2. 模型训练: K8s + GPU Cluster\n# 3. 模型服务: TensorFlow Serving\n# 4. 在线推理: FastAPI + Redis Cache\n# 5. 监控告警: Prometheus + Grafana`} /></div>) },
  { label: '组件设计', left: (<div className="space-y-4"><PageTitle>组件设计</PageTitle><SectionTitle>数据管道</SectionTitle><BookParagraph>数据管道包括数据采集、清洗、特征工程等环节。使用Kafka作为消息队列，Flink进行流处理，特征存储使用Redis。</BookParagraph><SectionTitle>模型服务</SectionTitle><BookParagraph>模型服务层负责加载模型并提供推理接口。支持多版本管理、A/B测试、灰度发布。</BookParagraph></div>), right: (<div className="space-y-4"><SectionTitle>组件交互</SectionTitle><BookCode language="python" code={`# 特征获取示例\nimport redis\n\ncache = redis.Redis(host='localhost', port=6379)\ndef get_user_features(user_id):\n    features = cache.get(f"user:{user_id}")\n    if features is None:\n        features = compute_features(user_id)\n        cache.setex(f"user:{user_id}", 3600, features)\n    return features`} /></div>) },
  { label: '扩展性设计', left: (<div className="space-y-4"><PageTitle>扩展性设计</PageTitle><BookList items={['水平扩展：增加服务实例数','负载均衡：请求分发','缓存策略：多级缓存','数据库分片：水平分库']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '安全设计', left: (<div className="space-y-4"><PageTitle>安全设计</PageTitle><BookList items={['数据加密：传输和存储加密','访问控制：认证和授权','输入验证：防止注入攻击','模型安全：对抗攻击防护']} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function ProgrammingArchPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
