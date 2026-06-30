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
  chapterTitle: '云服务基础',
  chapterNumber: 2,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '概述', href: '/study/se/cloud/intro' },
  nextChapter: { label: '虚拟化与容器化', href: '/study/se/cloud/container' },
  theme: THEMES.software,
}

const CODE_API = `import aliyunsdkcore.client
client = aliyunsdkcore.client.AcsClient(...)
# 调用云API`

const SPREADS = [
  {
    label: '云服务类型',
    left: (
      <div className="space-y-4">
        <PageTitle>云服务类型</PageTitle>
        <BookParagraph>根据部署模式不同，云计算分为以下三种类型：</BookParagraph>
        <BookList items={[
          '公有云：如阿里云、腾讯云、AWS',
          '私有云：企业自建云平台',
          '混合云：公有云+私有云结合',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>主流云服务商对比</PageTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse border border-paper-300/80">
            <thead>
              <tr className="bg-paper-200/60">
                <th className="border border-paper-300/80 px-3 py-2 text-left text-ink font-medium">厂商</th>
                <th className="border border-paper-300/80 px-3 py-2 text-left text-ink font-medium">代表产品</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">阿里云</td><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">ECS、OSS、RDS</td></tr>
              <tr><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">腾讯云</td><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">CVM、COS、CDB</td></tr>
              <tr><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">AWS</td><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">EC2、S3、RDS</td></tr>
              <tr><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">Azure</td><td className="border border-paper-300/80 px-3 py-1.5 text-ink-light">VM、Blob、SQL Database</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    label: '云服务API调用',
    left: (
      <div className="space-y-4">
        <PageTitle>云服务API调用示例</PageTitle>
        <BookParagraph>各云服务商提供丰富的SDK，方便开发者通过代码调用云资源。以下以阿里云SDK为例：</BookParagraph>
        <BookCode language="python" code={CODE_API} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习要点</PageTitle>
        <BookList items={[
          '理解不同云服务类型的适用场景',
          '熟悉主流云服务商的核心产品',
          '掌握云服务API的基本调用方式',
        ]} />
      </div>
    ),
  },
]

export default function CloudBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
