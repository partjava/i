'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  nextChapter: { label: '大数据平台与生态', href: '/study/se/bigdata/platform' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '大数据基础',
    left: (
      <div className="space-y-4">
        <PageTitle>大数据定义</PageTitle>
        <BookParagraph>
          大数据是指规模巨大、类型多样、增长快速的数据集合，具有4V特征：体量大（Volume）、类型多（Variety）、速度快（Velocity）、价值密度低（Value）。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>发展历程</PageTitle>
        <BookList items={[
          '2005年Hadoop开源，推动大数据技术发展',
          '2010年Spark、Flink等新一代平台兴起',
          '2020年云原生大数据、AI融合趋势明显',
        ]} />
      </div>
    ),
  },
  {
    label: '应用与入门',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <BookList items={[
          '智能推荐与广告',
          '金融风控与反欺诈',
          '智慧医疗与城市',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>大数据Hello World（PySpark）</PageTitle>
        <BookCode
          language="python"
          showLineNumbers
          code={`from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('demo').getOrCreate()
df = spark.read.json('data.json')
df.show()`}
        />
      </div>
    ),
  },
]

export default function IntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
