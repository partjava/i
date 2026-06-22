'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '搜索引擎基础',     description: '搜索引擎的定义、组成与工作流程',         href: '/study/se/search/basic' },
  { number: 2, title: '爬虫与数据采集',   description: '网络爬虫技术原理与实现',               href: '/study/se/search/crawler' },
  { number: 3, title: '索引构建',         description: '倒排索引原理与构建方法',               href: '/study/se/search/index' },
  { number: 4, title: '查询处理',         description: '查询解析、优化与执行',                 href: '/study/se/search/query' },
  { number: 5, title: 'Elasticsearch示例', description: '企业级搜索解决方案实践',              href: '/study/se/search/elasticsearch' },
  { number: 6, title: '高级搜索特性',     description: '模糊匹配、同义词处理与地理位置搜索',     href: '/study/se/search/advanced' },
]

export default function SearchHomePage() {
  return (
    <BookCover
      title="智能搜索引擎"
      subtitle="Search Engine"
      icon="🔍"
      totalHours={20}
      description="掌握搜索引擎核心技术，从网络爬虫到智能检索，构建高效的企业级搜索系统"
      chapterCount={CHAPTERS.length}
      chapters={CHAPTERS}
      startHref="/study/se/search/basic"
      theme={THEMES.software}
    />
  )
}
