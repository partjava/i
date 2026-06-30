'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '大数据平台与生态',
  chapterNumber: 2,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '概述', href: '/study/se/bigdata/intro' },
  nextChapter: { label: '数据采集与预处理', href: '/study/se/bigdata/ingest' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '主流平台',
    left: (
      <div className="space-y-4">
        <PageTitle>主流大数据平台</PageTitle>
        <BookParagraph>
          当前大数据领域主流的计算平台各有所长，适用于不同的业务场景。
        </BookParagraph>
        <BookList items={[
          'Hadoop：分布式存储与批处理',
          'Spark：内存计算、批流一体',
          'Flink：高性能流式处理',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>生态组件简介</PageTitle>
        <BookParagraph>
          Hadoop 生态圈提供了丰富的组件，覆盖数据存储、计算、协调和传输各环节。
        </BookParagraph>
        <BookList items={[
          'Hive：数据仓库',
          'HBase：NoSQL数据库',
          'Zookeeper：分布式协调',
          'Kafka：消息队列',
        ]} />
      </div>
    ),
  },
  {
    label: '实践示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Spark作业示例</PageTitle>
        <BookParagraph>
          以下示例展示如何使用 PySpark 进行基础的分布式数据处理。
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`from pyspark import SparkContext
sc = SparkContext()
rdd = sc.textFile('data.txt')
print(rdd.count())`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>选型建议</PageTitle>
        <BookParagraph>
          在实际项目中，通常根据业务需求组合使用多个组件：
        </BookParagraph>
        <BookList items={[
          '批处理场景：Hadoop MapReduce 或 Spark',
          '流式计算：Flink 或 Spark Streaming',
          '即席查询：Hive 或 Presto',
          '消息队列：Kafka',
        ]} />
      </div>
    ),
  },
]

export default function PlatformPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
