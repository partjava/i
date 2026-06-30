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
  chapterTitle: '云安全与合规',
  chapterNumber: 5,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云存储与数据库', href: '/study/se/cloud/storage' },
  nextChapter: { label: '自动化与DevOps', href: '/study/se/cloud/devops' },
  theme: THEMES.software,
}

const CODE_IAM = `# 创建子用户并授权
aws iam create-user --user-name devuser
aws iam attach-user-policy --user-name devuser --policy-arn arn:aws:iam::aws:policy/AdministratorAccess`

const SPREADS = [
  {
    label: '安全挑战与IAM',
    left: (
      <div className="space-y-4">
        <PageTitle>云安全挑战</PageTitle>
        <BookParagraph>云计算环境面临以下主要安全挑战：</BookParagraph>
        <BookList items={[
          '数据泄露与访问控制',
          'DDoS攻击与防护',
          '多租户隔离',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>身份与访问管理（IAM）</PageTitle>
        <BookParagraph>IAM用于管理用户身份和资源访问权限，是云安全的基础设施。以下示例创建子用户并授权管理员权限：</BookParagraph>
        <BookCode language="bash" code={CODE_IAM} />
      </div>
    ),
  },
  {
    label: '合规标准',
    left: (
      <div className="space-y-4">
        <PageTitle>合规标准</PageTitle>
        <BookParagraph>云服务商需要遵循各类国际和国内合规标准：</BookParagraph>
        <BookList items={[
          'ISO 27001',
          '等保合规',
          'GDPR',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全最佳实践</PageTitle>
        <BookList items={[
          '最小权限原则',
          '加密数据传输与存储',
          '定期安全审计',
          '多因素认证',
        ]} />
      </div>
    ),
  },
]

export default function CloudSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
