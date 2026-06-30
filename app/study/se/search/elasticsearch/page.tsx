'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
  BookAlert,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'Elasticsearch示例',
  chapterNumber: 5,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '查询处理', href: '/study/se/search/query' },
  nextChapter: { label: '高级搜索特性', href: '/study/se/search/advanced' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'Elasticsearch基础',
    left: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch基础</PageTitle>
        <BookParagraph>
          Elasticsearch 是一个基于 Lucene 的分布式搜索和分析引擎，广泛用于企业级搜索、日志分析和数据可视化场景。
        </BookParagraph>
        <BookParagraph>
          Elasticsearch 的核心概念：
        </BookParagraph>
        <BookList items={[
          'Elasticsearch 的定义与作用',
          'Elasticsearch 的基本组成（节点、集群、索引、分片）',
          'Elasticsearch 的工作流程（索引写入、搜索分发）',
          'Elasticsearch 的生态（Kibana、Logstash、Beats）',
        ]} />
        <BookAlert type="info" message="ES 采用 RESTful API 设计，所有操作均可通过 HTTP 请求完成。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch示例</PageTitle>
        <BookParagraph>
          以下示例演示 Elasticsearch 的索引创建和文档搜索操作：
        </BookParagraph>
        <BookCode
          language="json"
          code={`# 创建索引
PUT /my_index
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "content": { "type": "text" }
    }
  }
}

# 搜索文档
GET /my_index/_search
{
  "query": {
    "match": {
      "content": "搜索关键词"
    }
  }
}`}
        />
        <BookAlert type="success" message="ES 7.x 及以上版本移除了 mapping type，一个索引仅包含一个文档类型。" />
      </div>
    ),
  },
]

export default function SearchElasticsearchPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
