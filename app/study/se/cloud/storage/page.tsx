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
  chapterTitle: '云存储与数据库',
  chapterNumber: 4,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '虚拟化与容器化', href: '/study/se/cloud/container' },
  nextChapter: { label: '云安全与合规', href: '/study/se/cloud/security' },
  theme: THEMES.software,
}

const CODE_S3 = `# AWS S3上传文件
import boto3
s3 = boto3.client('s3')
s3.upload_file('local.txt', 'mybucket', 'remote.txt')`

const CODE_RDS = `# 连接云数据库
import pymysql
conn = pymysql.connect(host='rds.aliyuncs.com', user='root', password='***')`

const SPREADS = [
  {
    label: '对象存储与块存储',
    left: (
      <div className="space-y-4">
        <PageTitle>对象存储（OSS/S3）</PageTitle>
        <BookParagraph>对象存储以对象（Object）为存储单元，适合存储图片、视频、备份文件等非结构化数据。AWS S3和阿里云OSS是典型代表。</BookParagraph>
        <BookCode language="python" code={CODE_S3} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>块存储与文件存储</PageTitle>
        <BookParagraph>除了对象存储，还有两种常见的云存储类型：</BookParagraph>
        <BookList items={[
          '块存储：适合数据库、虚拟机磁盘',
          '文件存储：适合共享文件、NFS',
        ]} />
      </div>
    ),
  },
  {
    label: '云数据库',
    left: (
      <div className="space-y-4">
        <PageTitle>云数据库（RDS/NoSQL）</PageTitle>
        <BookParagraph>云数据库提供托管的关系型数据库和非关系型数据库服务，用户无需关心底层运维。</BookParagraph>
        <BookCode language="python" code={CODE_RDS} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据库选型建议</PageTitle>
        <BookList items={[
          '关系型数据库（RDS）：适合事务性强的业务',
          'NoSQL数据库（MongoDB/Redis）：适合高并发、灵活数据结构',
          '根据业务场景选择合适的存储方案',
        ]} />
      </div>
    ),
  },
]

export default function CloudStoragePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
