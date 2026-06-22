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
  chapterTitle: '高级搜索特性',
  chapterNumber: 6,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '高级搜索基础',
    left: (
      <div className="space-y-4">
        <PageTitle>高级搜索基础</PageTitle>
        <BookParagraph>
          高级搜索特性是在基础搜索之上提供更智能、更精准的检索能力，包括模糊匹配、同义词处理和地理位置搜索等。
        </BookParagraph>
        <BookParagraph>
          高级搜索的核心特性：
        </BookParagraph>
        <BookList items={[
          '模糊匹配（Fuzzy Matching）',
          '同义词处理（Synonym）',
          '地理位置搜索（Geo Search）',
          '拼音搜索与纠错提示',
        ]} />
        <BookAlert type="info" message="模糊匹配通过编辑距离（Levenshtein Distance）计算查询词与文档词的相似度。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Elasticsearch高级示例</PageTitle>
        <BookParagraph>
          以下示例展示 Elasticsearch 中的模糊匹配和地理位置搜索：
        </BookParagraph>
        <BookCode
          language="json"
          code={`# 模糊匹配
GET /my_index/_search
{
  "query": {
    "fuzzy": {
      "content": "搜索关键词"
    }
  }
}

# 地理位置搜索
GET /my_index/_search
{
  "query": {
    "geo_distance": {
      "distance": "10km",
      "location": {
        "lat": 40.73,
        "lon": -74.1
      }
    }
  }
}`}
        />
        <BookAlert type="success" message="地理位置搜索在 O2O、外卖、出行等场景中应用广泛，ES 提供了完善的地理查询支持。" />
      </div>
    ),
  },
]

export default function SearchAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
