'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实战案例与应用',
  chapterNumber: 7,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '自动化与DevOps', href: '/study/se/cloud/devops' },
  theme: THEMES.software,
}

const CODE_ARCH = `# 三层架构：负载均衡+应用层+数据库
- SLB -> ECS集群 -> RDS数据库`

const CODE_KUBECTL = `kubectl apply -f deployment.yaml
kubectl get pods`

const SPREADS = [
  {
    label: '架构设计与云原生部署',
    left: (
      <div className="space-y-4">
        <PageTitle>典型云上架构设计</PageTitle>
        <BookParagraph>云上应用通常采用三层架构：负载均衡分发流量，应用层处理业务逻辑，数据库层持久化数据。</BookParagraph>
        <BookCode language="text" code={CODE_ARCH} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>云原生应用部署</PageTitle>
        <BookParagraph>使用Kubernetes进行云原生应用的部署和管理：</BookParagraph>
        <BookCode language="bash" code={CODE_KUBECTL} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题与面试题</PageTitle>
        <BookList items={[
          '云计算和传统IT架构的区别？',
          '如何保障云上数据安全？',
          '云原生的优势有哪些？',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>总结</PageTitle>
        <BookParagraph>本课程涵盖了云计算的核心概念、服务模式、虚拟化技术、云存储、安全合规、DevOps自动化以及实战案例。掌握这些知识，你将能够设计和构建现代化的云原生应用。</BookParagraph>
      </div>
    ),
  },
]

export default function CloudProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
