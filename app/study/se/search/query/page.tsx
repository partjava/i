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
  chapterTitle: '查询处理',
  chapterNumber: 4,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '索引构建', href: '/study/se/search/index' },
  nextChapter: { label: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '查询基础',
    left: (
      <div className="space-y-4">
        <PageTitle>查询基础</PageTitle>
        <BookParagraph>
          查询处理是搜索引擎接收用户输入并返回相关结果的核心环节，涉及查询解析、查询优化和结果排序等多个步骤。
        </BookParagraph>
        <BookParagraph>
          查询处理的关键概念：
        </BookParagraph>
        <BookList items={[
          '查询的定义与作用',
          '查询的基本组成（查询解析、查询优化、结果排序）',
          '查询的工作流程（分词、查询扩展、打分排序）',
          '查询的评分算法（TF-IDF、BM25）',
        ]} />
        <BookAlert type="info" message="BM25 是目前最主流的排序算法，它在 TF-IDF 基础上引入了文档长度归一化和参数调节。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch查询示例</PageTitle>
        <BookParagraph>
          以下示例展示 Elasticsearch 中的全文搜索查询：
        </BookParagraph>
        <BookCode
          language="json"
          code={`# 搜索文档
GET /my_index/_search
{
  "query": {
    "match": {
      "content": "搜索关键词"
    }
  }
}`}
        />
        <BookAlert type="success" message="ES 支持多种查询类型：match、term、bool、range 等，可根据场景灵活组合。" />
      </div>
    ),
  },
]

export default function SearchQueryPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
