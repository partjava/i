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
  chapterTitle: '分布式存储与计算',
  chapterNumber: 4,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '数据采集与预处理', href: '/study/se/bigdata/ingest' },
  nextChapter: { label: '数据分析与挖掘', href: '/study/se/bigdata/analysis' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '分布式存储',
    left: (
      <div className="space-y-4">
        <PageTitle>HDFS分布式文件系统</PageTitle>
        <BookParagraph>
          HDFS（Hadoop Distributed File System）是 Hadoop 的核心存储组件，将大文件分块存储在多台机器上。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`hdfs dfs -ls /data
hdfs dfs -put local.txt /data/`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Hive数据仓库</PageTitle>
        <BookParagraph>
          Hive 提供类 SQL 查询能力，将 HQL 转换为 MapReduce/Spark 任务执行。
        </BookParagraph>
        <BookCode
          language="sql"
          showLineNumbers
          code={`CREATE TABLE users(id INT, name STRING);
SELECT * FROM users;`}
        />
      </div>
    ),
  },
  {
    label: 'NoSQL与计算',
    left: (
      <div className="space-y-4">
        <PageTitle>HBase NoSQL数据库</PageTitle>
        <BookParagraph>
          HBase 是基于 HDFS 的列式 NoSQL 数据库，适合随机读写场景。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`create 'user', 'info'
put 'user', '1001', 'info:name', 'Tom'`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分布式计算原理</PageTitle>
        <BookParagraph>
          分布式计算框架通过将任务拆分并行执行，大幅提升数据处理效率。
        </BookParagraph>
        <BookList items={[
          'MapReduce：分而治之，批量处理',
          'Spark/Flink：内存计算与流式处理',
        ]} />
        <div className="mt-4">
          <TagGrid items={['HDFS', 'Hive', 'HBase', 'MapReduce', 'Spark', 'Flink']} />
        </div>
      </div>
    ),
  },
]

export default function DistributedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
