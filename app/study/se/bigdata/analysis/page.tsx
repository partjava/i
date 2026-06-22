'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据分析与挖掘',
  chapterNumber: 5,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '分布式存储与计算', href: '/study/se/bigdata/distributed' },
  nextChapter: { label: '可视化与BI', href: '/study/se/bigdata/bi' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'Spark SQL',
    left: (
      <div className="space-y-4">
        <PageTitle>Spark SQL分析</PageTitle>
        <BookParagraph>
          Spark SQL 提供 DataFrame 和 SQL 两种方式对结构化数据进行查询分析。
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`df.createOrReplaceTempView('users')
spark.sql('SELECT COUNT(*) FROM users').show()`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>机器学习与挖掘</PageTitle>
        <BookParagraph>
          PySpark MLlib 提供了丰富的机器学习算法库，支持分类、回归、聚类等任务。
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`from pyspark.ml.classification import LogisticRegression
lr = LogisticRegression()
model = lr.fit(df)`}
        />
      </div>
    ),
  },
  {
    label: '流式分析',
    left: (
      <div className="space-y-4">
        <PageTitle>流式分析</PageTitle>
        <BookParagraph>
          Spark Structured Streaming 支持从 Kafka 等消息队列中实时消费数据进行分析。
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`from pyspark.sql import SparkSession
spark = SparkSession.builder.getOrCreate()
ds = spark.readStream.format('kafka').option('subscribe', 'topic').load()`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心概念</PageTitle>
        <BookParagraph>
          数据分析与挖掘的整个过程涉及多个环节，理解核心概念有助于构建高效的数据管道。
        </BookParagraph>
        <div className="mt-4">
          <TagGrid items={['Spark SQL', 'DataFrame', 'MLlib', 'Kafka', 'Structured Streaming', '特征工程']} />
        </div>
      </div>
    ),
  },
]

export default function AnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
