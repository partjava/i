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
  chapterTitle: '数据采集与预处理',
  chapterNumber: 3,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '大数据平台与生态', href: '/study/se/bigdata/platform' },
  nextChapter: { label: '分布式存储与计算', href: '/study/se/bigdata/distributed' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '数据采集',
    left: (
      <div className="space-y-4">
        <PageTitle>数据采集工具</PageTitle>
        <BookParagraph>
          大数据处理的第一步是数据采集，常用的工具有：
        </BookParagraph>
        <BookList items={[
          'Flume：日志采集',
          'Logstash：多源数据采集与转换',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Logstash配置示例</PageTitle>
        <BookParagraph>
          Logstash 通过配置 input、filter、output 三个阶段完成数据处理。
        </BookParagraph>
        <BookCode
          language="ruby"
          showLineNumbers
          code={`# Logstash配置示例
input { file { path => "/var/log/syslog" } }
filter { grok { match => { "message" => "%{SYSLOGBASE}" } } }
output { elasticsearch { hosts => ["localhost:9200"] } }`}
        />
      </div>
    ),
  },
  {
    label: 'ETL流程',
    left: (
      <div className="space-y-4">
        <PageTitle>ETL流程概述</PageTitle>
        <BookParagraph>
          ETL（Extract, Transform, Load）是大数据处理的核心流程，负责从数据源抽取、清洗转换后加载到目标系统。
        </BookParagraph>
        <BookList items={[
          'Extract：从各类数据源获取原始数据',
          'Transform：数据清洗、格式转换、质量校验',
          'Load：将处理后的数据加载到数据仓库或存储系统',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>PySpark数据清洗</PageTitle>
        <BookParagraph>
          使用 PySpark 进行数据清洗和转换操作：
        </BookParagraph>
        <BookCode
          language="python"
          showLineNumbers
          code={`# PySpark数据清洗
from pyspark.sql import functions as F
df = df.withColumn('age', F.col('age').cast('int'))
df = df.dropna()`}
        />
      </div>
    ),
  },
]

export default function IngestPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
