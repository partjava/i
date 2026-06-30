'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
  BookAlert,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实战案例与项目',
  chapterNumber: 8,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '大数据安全与运维', href: '/study/se/bigdata/security' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '项目流程',
    left: (
      <div className="space-y-4">
        <PageTitle>项目开发流程</PageTitle>
        <BookParagraph>
          一个完整的大数据项目通常包含以下开发阶段：
        </BookParagraph>
        <BookList items={[
          '需求分析与数据采集',
          '数据建模与开发',
          '计算与分析',
          '可视化与上线',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>综合案例：日志分析平台</PageTitle>
        <BookParagraph>
          通过 Flume、HDFS、Spark 和 Superset 构建端到端的日志分析平台。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`# Flume采集 -> HDFS存储 -> Spark分析 -> Superset可视化`}
        />
        <BookAlert type="info" message="本案例涵盖数据采集、存储、计算和可视化全流程，是大数据技术的综合实践。" />
      </div>
    ),
  },
  {
    label: '面试准备',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题与面试题</PageTitle>
        <BookParagraph>
          以下是大数据岗位面试中的高频问题：
        </BookParagraph>
        <BookList items={[
          'HDFS和传统文件系统的区别？',
          'Spark和MapReduce的优劣？',
          '如何保障大数据平台安全？',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键技术栈</PageTitle>
        <BookParagraph>
          本课程覆盖的大数据分析技术栈总结：
        </BookParagraph>
        <TagGrid items={['Hadoop', 'Spark', 'Flink', 'Hive', 'HBase', 'Kafka', 'Flume', 'Superset', 'PySpark', 'ETL']} />
      </div>
    ),
  },
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
