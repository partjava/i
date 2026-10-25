'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '搜索引擎基础',     description: '扫描与倒排、短语位置、字段评分与同步机制',         href: '/study/se/search/basic' },
  { number: 2, title: '爬虫与数据采集',   description: '采集流水线、正文提取、条件请求与增量更新',               href: '/study/se/search/crawler' },
  { number: 3, title: '索引构建',         description: '字段映射、分析链、批量写入与索引迁移',               href: '/study/se/search/index' },
  { number: 4, title: '查询处理',         description: '布尔条件推演、权限过滤、分页与性能诊断',                 href: '/study/se/search/query' },
  { number: 5, title: 'Elasticsearch示例', description: '映射、写入、查询与更新的完整本地实验',              href: '/study/se/search/elasticsearch' },
  { number: 6, title: '高级搜索特性',     description: '检索评估、同义词、模糊匹配与混合排序',     href: '/study/se/search/advanced' },
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
