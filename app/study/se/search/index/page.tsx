'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookList,
  BookCode,
  BookAlert,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '索引构建',
  chapterNumber: 3,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '爬虫与数据采集', href: '/study/se/search/crawler' },
  nextChapter: { label: '查询处理', href: '/study/se/search/query' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '索引基础',
    left: (
      <div className="space-y-4">
        <PageTitle>索引基础</PageTitle>
        <BookParagraph>
          索引是搜索引擎的核心数据结构，它通过对文档内容进行预处理，建立词项到文档的映射关系，从而实现快速检索。
        </BookParagraph>
        <BookParagraph>
          索引构建的关键概念：
        </BookParagraph>
        <BookList items={[
          '索引的定义与作用',
          '索引的基本组成（词典、倒排列表）',
          '索引的工作流程（分词、去停用词、建立倒排表）',
          '索引的更新策略（增量更新、全量重建）',
        ]} />
        <BookAlert type="info" message="倒排索引是搜索引擎中最关键的索引结构，它将文档内容转换为词到文档列表的映射。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch索引示例</PageTitle>
        <BookParagraph>
          以下示例展示使用 Elasticsearch 创建索引和添加文档：
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

# 添加文档
POST /my_index/_doc
{
  "title": "示例标题",
  "content": "示例内容"
}`}
        />
        <BookAlert type="success" message="ES 的分析器（Analyzer）负责文本分词和标准化，中文场景建议配置 ik 智能分词。" />
      </div>
    ),
  },
]

export default function SearchIndexPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
