'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: 'Go语言入门',
  chapterNumber: 1,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  nextChapter: { label: '开发环境配置', href: '/study/computer/go/setup' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Go简介',
    left: (
      <div className="space-y-4">
        <PageTitle>Go简介</PageTitle>
        <BookParagraph>Go（又称Golang）是Google开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>语言特点</SectionTitle>
        <BookList items={[
          '简洁高效：语法简单，学习曲线平缓',
          '编译型语言：直接编译成机器码，执行速度快',
          '并发支持：内置goroutine和channel，轻松实现并发编程',
          '垃圾回收：自动内存管理',
          '跨平台：支持Windows、Linux、macOS等多个平台',
        ]} />
        <TagGrid items={['Go', 'Golang', '静态类型', '编译型', '并发']} />
      </div>
    ),
  },
  {
    label: '应用场景与路线',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <BookList items={['后端服务开发', '微服务架构', '网络编程', '云原生应用', '系统工具开发']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>学习路线</SectionTitle>
        <BookList items={['开发环境配置', '基础语法', '数据类型', '控制流程', '函数与方法', '并发编程', '项目实战']} />
        <SectionTitle>学习建议</SectionTitle>
        <BookList items={['多动手实践，编写代码', '理解Go语言的设计理念', '参与开源项目', '阅读优秀的Go代码', '保持持续学习']} />
        <TagGrid items={['后端', '微服务', '云原生', '学习路线', '建议']} />
      </div>
    ),
  },
]

export default function GoIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
