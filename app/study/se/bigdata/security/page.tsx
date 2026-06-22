'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '大数据安全与运维',
  chapterNumber: 7,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '可视化与BI', href: '/study/se/bigdata/bi' },
  nextChapter: { label: '实战案例与项目', href: '/study/se/bigdata/projects' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '权限与加密',
    left: (
      <div className="space-y-4">
        <PageTitle>权限管理与认证</PageTitle>
        <BookParagraph>
          Hadoop 平台通过文件权限和 Kerberos 认证实现多层次安全控制。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`# Hadoop权限
hdfs dfs -chmod 700 /user/hadoop`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据加密与安全</PageTitle>
        <BookParagraph>
          对于敏感数据，可以在存储层进行加密保护，防止未授权访问。
        </BookParagraph>
        <BookCode
          language="sql"
          showLineNumbers
          code={`# Hive加密表
CREATE TABLE secret (id INT, data STRING) STORED AS TEXTFILE TBLPROPERTIES ('encryption'='true');`}
        />
      </div>
    ),
  },
  {
    label: '运维监控',
    left: (
      <div className="space-y-4">
        <PageTitle>集群监控与运维</PageTitle>
        <BookParagraph>
          大数据集群的稳定运行依赖于完善的监控和运维体系。
        </BookParagraph>
        <BookList items={[
          'Ambari、Cloudera Manager集群管理',
          'Ganglia、Prometheus监控',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全要点总结</PageTitle>
        <BookParagraph>
          大数据安全需要从多个层面综合防护：
        </BookParagraph>
        <BookList items={[
          '网络层：防火墙、安全组隔离',
          '认证层：Kerberos、LDAP集成',
          '存储层：数据加密、访问控制',
          '审计层：操作日志、异常检测',
        ]} />
        <div className="mt-4">
          <TagGrid items={['Kerberos', '数据加密', '访问控制', 'Ambari', 'Prometheus', '日志审计']} />
        </div>
      </div>
    ),
  },
]

export default function SecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
