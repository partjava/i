'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '概述', description: '云计算定义、发展历程与服务模式', href: '/study/se/cloud/intro' },
  { number: 2, title: '云服务基础', description: '公有云/私有云/混合云与主流服务商对比', href: '/study/se/cloud/basic' },
  { number: 3, title: '虚拟化与容器化', description: 'Docker基础命令与Kubernetes部署', href: '/study/se/cloud/container' },
  { number: 4, title: '云存储与数据库', description: '对象存储、块存储与云数据库', href: '/study/se/cloud/storage' },
  { number: 5, title: '云安全与合规', description: 'IAM身份管理、安全挑战与合规标准', href: '/study/se/cloud/security' },
  { number: 6, title: '自动化与DevOps', description: 'IaC基础设施即代码与CI/CD流水线', href: '/study/se/cloud/devops' },
  { number: 7, title: '实战案例与应用', description: '云上架构设计、云原生部署与面试题', href: '/study/se/cloud/projects' },
]

export default function CloudPage() {
  return (
    <BookCover
      title="云计算"
      subtitle="Cloud Computing"
      description="掌握云计算核心技术，从基础架构到云原生应用，成为云计算与DevOps专家"
      chapterCount={CHAPTERS.length}
      totalHours={25}
      chapters={CHAPTERS}
      icon="☁️"
      startHref="/study/se/cloud/intro"
      theme={THEMES.software}
    />
  )
}
