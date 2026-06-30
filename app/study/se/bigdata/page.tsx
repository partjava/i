'use client'

import BookCover, { type ChapterLink } from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS: ChapterLink[] = [
  { number: 1,  title: '概述',               description: '大数据定义、发展历程与应用场景',                    href: '/study/se/bigdata/intro' },
  { number: 2,  title: '大数据平台与生态',     description: 'Hadoop、Spark、Flink 等主流平台与生态组件',          href: '/study/se/bigdata/platform' },
  { number: 3,  title: '数据采集与预处理',     description: 'Flume、Logstash、ETL 流程与数据清洗',                href: '/study/se/bigdata/ingest' },
  { number: 4,  title: '分布式存储与计算',     description: 'HDFS、Hive、HBase、MapReduce 与 Spark',             href: '/study/se/bigdata/distributed' },
  { number: 5,  title: '数据分析与挖掘',       description: 'Spark SQL、机器学习、流式分析',                     href: '/study/se/bigdata/analysis' },
  { number: 6,  title: '可视化与BI',           description: 'Tableau、Apache Superset、Python 可视化',            href: '/study/se/bigdata/bi' },
  { number: 7,  title: '大数据安全与运维',     description: '权限管理、数据加密、集群监控与运维',                href: '/study/se/bigdata/security' },
  { number: 8,  title: '实战案例与项目',       description: '日志分析平台、开发流程与面试题',                     href: '/study/se/bigdata/projects' },
]

export default function BigDataPage() {
  return (
    <BookCover
      title="大数据分析"
      subtitle="Big Data Analytics"
      description="掌握大数据处理与分析技术，从数据采集到商业智能，成为数据驱动决策的专家"
      chapterCount={CHAPTERS.length}
      totalHours={30}
      chapters={CHAPTERS}
      icon="📊"
      startHref="/study/se/bigdata/intro"
      theme={THEMES.software}
    />
  )
}
