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
  chapterTitle: '自动化与DevOps',
  chapterNumber: 6,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云安全与合规', href: '/study/se/cloud/security' },
  nextChapter: { label: '实战案例与应用', href: '/study/se/cloud/projects' },
  theme: THEMES.software,
}

const CODE_TERRAFORM = `# Terraform创建ECS
resource "alicloud_instance" "web" {
  instance_name = "web-1"
  ...
}`

const CODE_CICD = `stages:
  - build
  - deploy
build:
  script: mvn package
deploy:
  script: kubectl apply -f k8s/`

const CODE_BASH = `#!/bin/bash
aws s3 sync ./static s3://mybucket/static`

const SPREADS = [
  {
    label: '基础设施即代码',
    left: (
      <div className="space-y-4">
        <PageTitle>基础设施即代码（IaC）</PageTitle>
        <BookParagraph>IaC通过代码定义和管理云基础设施，实现版本控制、自动化部署和环境一致性。Terraform是主流的IaC工具：</BookParagraph>
        <BookCode language="yaml" code={CODE_TERRAFORM} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>CI/CD流水线</PageTitle>
        <BookParagraph>持续集成和持续部署（CI/CD）自动化了代码构建、测试和部署流程：</BookParagraph>
        <BookCode language="yaml" code={CODE_CICD} />
      </div>
    ),
  },
  {
    label: '自动化运维',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化运维脚本</PageTitle>
        <BookParagraph>使用Shell脚本可以自动化云资源的日常运维操作：</BookParagraph>
        <BookCode language="bash" code={CODE_BASH} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>DevOps核心实践</PageTitle>
        <BookList items={[
          '持续集成与持续部署（CI/CD）',
          '基础设施即代码（IaC）',
          '监控与日志管理',
          '自动化测试与安全扫描',
        ]} />
      </div>
    ),
  },
]

export default function CloudDevopsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
