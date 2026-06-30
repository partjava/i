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
  chapterTitle: '搜索引擎基础',
  chapterNumber: 1,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  nextChapter: { label: '爬虫与数据采集', href: '/study/se/search/crawler' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '搜索引擎概述',
    left: (
      <div className="space-y-4">
        <PageTitle>搜索引擎概述</PageTitle>
        <BookParagraph>
          搜索引擎是一种信息检索系统，帮助用户在海量网络数据中快速找到所需信息。它是互联网时代最重要的基础设施之一。
        </BookParagraph>
        <BookParagraph>
          搜索引擎的基本组成包括：
        </BookParagraph>
        <BookList items={[
          '搜索引擎的定义与作用',
          '搜索引擎的基本组成（爬虫、索引、查询）',
          '搜索引擎的工作流程',
          '搜索引擎的分类（通用搜索、垂直搜索、元搜索）',
        ]} />
        <BookAlert type="info" message="搜索引擎的核心是倒排索引技术，它在文档预处理阶段建立词到文档的映射关系。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch示例</PageTitle>
        <BookParagraph>
          以下示例展示了使用 Elasticsearch 创建索引和搜索文档的基本操作：
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
        <BookAlert type="success" message="Elasticsearch 基于 Lucene 构建，提供分布式的全文搜索能力。" />
      </div>
    ),
  },
]

export default function SearchBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
