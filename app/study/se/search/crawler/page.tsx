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
  chapterTitle: '爬虫与数据采集',
  chapterNumber: 2,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: '搜索引擎基础', href: '/study/se/search/basic' },
  nextChapter: { label: '索引构建', href: '/study/se/search/index' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '爬虫基础',
    left: (
      <div className="space-y-4">
        <PageTitle>爬虫基础</PageTitle>
        <BookParagraph>
          网络爬虫（Web Crawler）是一种自动化程序，按照一定规则自动抓取万维网上的信息。它是搜索引擎获取数据的主要手段。
        </BookParagraph>
        <BookParagraph>
          爬虫的基本概念包括：
        </BookParagraph>
        <BookList items={[
          '爬虫的定义与作用',
          '爬虫的基本组成（调度器、下载器、解析器）',
          '爬虫的工作流程（URL管理、页面下载、内容解析）',
          '爬虫的爬取策略（广度优先、深度优先）',
        ]} />
        <BookAlert type="warning" message="遵守网站的 robots.txt 协议，合理控制爬取频率，避免对目标服务器造成压力。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python爬虫示例</PageTitle>
        <BookParagraph>
          以下示例使用 Python 的 requests 和 BeautifulSoup 库实现一个简单的网页爬虫：
        </BookParagraph>
        <BookCode
          language="python"
          code={`import requests
from bs4 import BeautifulSoup

url = 'https://example.com'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
print(soup.title.string)`}
        />
        <BookAlert type="info" message="生产环境中建议使用 Scrapy 等成熟框架，提供更完善的错误处理和调度机制。" />
      </div>
    ),
  },
]

export default function SearchCrawlerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
