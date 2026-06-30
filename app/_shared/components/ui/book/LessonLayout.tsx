'use client'

import BookSpread, { BookSpreadData, BookChapterLink } from './BookSpread'
import type { SubjectTheme } from './theme'

// ==================== 类型导出 ====================

export type { BookSpreadData, BookChapterLink }

/** 章节元信息 — 每个章节页只需要写这个 */
export interface LessonMeta {
  subject: string
  chapterTitle: string
  chapterNumber: number
  totalChapters: number
  subjectHref?: string
  prevChapter?: BookChapterLink
  nextChapter?: BookChapterLink
  spreadsPerChapter?: number[]
  /** 主题配色 */
  theme?: SubjectTheme
}

// ==================== 页面模板 ====================

export interface LessonLayoutProps {
  meta: LessonMeta
  spreads: BookSpreadData[]
  className?: string
}

/**
 * LessonLayout — 统一的学习页模板
 *
 * 用法：
 *   1. 定义 meta（章节信息）
 *   2. 定义 spreads（内容，每个标签两页）
 *   3. 渲染 <LessonLayout meta={meta} spreads={spreads} />
 *
 * 内容组件：从 BookContent 导入 PageTitle, BookParagraph, BookCode 等
 */
export default function LessonLayout({ meta, spreads, className }: LessonLayoutProps) {
  return (
    <BookSpread
      subject={meta.subject}
      chapterTitle={meta.chapterTitle}
      chapterNumber={meta.chapterNumber}
      totalChapters={meta.totalChapters}
      subjectHref={meta.subjectHref}
      prevChapter={meta.prevChapter}
      nextChapter={meta.nextChapter}
      spreads={spreads}
      className={className}
      spreadsPerChapter={meta.spreadsPerChapter}
      theme={meta.theme}
    />
  )
}
