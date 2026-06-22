'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  nextChapter: { label: '云服务基础', href: '/study/se/cloud/basic' },
  theme: THEMES.software,
}

const CODE_S3 = `import boto3
client = boto3.client('s3')
for bucket in client.list_buckets()['Buckets']:
    print(bucket['Name'])`

const SPREADS = [
  {
    label: '云计算定义与发展',
    left: (
      <div className="space-y-4">
        <PageTitle>云计算定义</PageTitle>
        <BookParagraph>云计算是一种基于互联网的计算方式，通过虚拟化技术将计算、存储、网络等资源以服务形式提供，按需分配、弹性伸缩。</BookParagraph>
        <PageTitle>发展历程</PageTitle>
        <BookList items={[
          '2006年AWS提出云计算概念',
          '2010年后云服务商快速发展',
          '2020年云原生、Serverless等新趋势',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>主流服务模式</PageTitle>
        <BookList items={[
          'IaaS：基础设施即服务（如ECS、虚拟机）',
          'PaaS：平台即服务（如数据库、消息队列）',
          'SaaS：软件即服务（如企业邮箱、在线协作）',
        ]} />
      </div>
    ),
  },
  {
    label: '快速上手',
    left: (
      <div className="space-y-4">
        <PageTitle>云计算Hello World（Python调用云API）</PageTitle>
        <BookParagraph>通过Python SDK调用云服务API，以AWS S3为例列出所有存储桶。</BookParagraph>
        <BookCode language="python" code={CODE_S3} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>下一步</PageTitle>
        <BookParagraph>接下来学习云服务基础，了解公有云、私有云和混合云的区别，以及主流云服务商的对比。</BookParagraph>
      </div>
    ),
  },
]

export default function CloudIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
