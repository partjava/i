'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SubjectTheme, THEMES, isLight } from './theme'

// ==================== 类型 ====================

export interface ChapterLink {
  number: number
  title: string
  description: string
  href: string
}

export interface BookCoverProps {
  title: string
  subtitle?: string
  description: string
  chapterCount: number
  totalHours?: number
  chapters: ChapterLink[]
  /** 主题配色，默认 computer */
  theme?: SubjectTheme
  icon?: string
  startHref?: string
}

// ==================== 书本封面 ====================

export default function BookCover({
  title,
  subtitle,
  description,
  chapterCount,
  totalHours,
  chapters,
  theme = THEMES.computer,
  icon = '📖',
  startHref,
}: BookCoverProps) {
  const mid = Math.ceil(chapters.length / 2)
  const leftCol = chapters.slice(0, mid)
  const rightCol = chapters.slice(mid)

  const textWhite = useMemo(() => !isLight(theme.accent), [theme.accent])

  return (
    <div
      className="min-h-screen py-8 sm:py-16 transition-colors duration-300"
      style={{ background: theme.paperBg }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* 3D 书本容器 */}
        <div className="relative group">
          {/* 投影 */}
          <div
            className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-full h-full rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(44,42,39,0.15), rgba(44,42,39,0.05))',
              filter: 'blur(12px)',
              transform: 'translate(4px, 4px)',
            }}
          />

          {/* 书脊 */}
          <div className="absolute left-0 top-[4px] bottom-[12px] w-[14px] sm:w-[20px] z-10">
            <div
              className="w-full h-full rounded-l-sm"
              style={{
                background: 'linear-gradient(180deg, #d1d6e0 0px, #d1d6e0 1.5px, #e2e6ed 1.5px, #e2e6ed 3px)',
                backgroundSize: '100% 3px',
                boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.06)',
              }}
            />
          </div>

          {/* 底部厚度 */}
          <div
            className="absolute bottom-0 left-[14px] sm:left-[20px] right-[-8px] sm:right-[-12px] h-[12px] sm:h-[16px] rounded-b-sm"
            style={{
              background: 'linear-gradient(180deg, #d1d6e0 0px, #d1d6e0 1.5px, #e2e6ed 1.5px, #e2e6ed 3px)',
              backgroundSize: '100% 3px',
              boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.04)',
            }}
          />

          {/* 右侧厚度 */}
          <div
            className="absolute right-[-8px] sm:right-[-12px] top-[4px] bottom-[12px] w-[8px] sm:w-[12px] z-10"
            style={{
              background: 'linear-gradient(to right, #d1d6e0, #b8bfcc)',
              borderRadius: '0 2px 2px 0',
              boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.04)',
            }}
          >
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(to bottom, transparent, transparent 2.5px, rgba(160,174,192,0.15) 2.5px, rgba(160,174,192,0.15) 3px)',
            }} />
          </div>

          {/* 封面主体 */}
          <div
            className="relative z-20 ml-[14px] sm:ml-[20px] rounded-r-sm overflow-hidden border"
            style={{
              background: theme.paperCard || theme.paperBg,
              borderColor: 'rgba(0,0,0,0.06)',
              boxShadow: '4px 6px 24px rgba(44,42,39,0.10), 1px 2px 6px rgba(44,42,39,0.06)',
              transform: 'translateZ(0)',
            }}
          >
            {/* 顶部色带 */}
            <div className="h-2 sm:h-3 transition-colors duration-300" style={{ background: theme.accent }} />

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* 左侧：封面信息 */}
                <div className="lg:col-span-2">
                  <div className="text-4xl sm:text-5xl mb-4">{icon}</div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">{title}</h1>
                  {subtitle && (
                    <p className="text-sm sm:text-base text-ink-lighter mt-1.5 tracking-wide font-body">
                      {subtitle}
                    </p>
                  )}

                  {/* 分隔线 */}
                  <div className="flex items-center gap-3 my-5">
                    <span className="h-px flex-1 bg-paper-400/60" />
                    <span style={{ color: theme.accent, opacity: 0.6 }} className="text-xs">✦</span>
                    <span className="h-px flex-1 bg-paper-400/60" />
                  </div>

                  <p className="text-sm sm:text-base text-ink-light leading-relaxed">{description}</p>

                  {/* 统计 */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-paper-200/80 rounded-full border border-paper-300/60">
                      <span className="text-xs text-ink-lighter">📚</span>
                      <span className="text-sm font-medium text-ink">{chapterCount} 章节</span>
                    </div>
                    {totalHours && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-paper-200/80 rounded-full border border-paper-300/60">
                        <span className="text-xs text-ink-lighter">⏱</span>
                        <span className="text-sm font-medium text-ink">{totalHours}+ 小时</span>
                      </div>
                    )}
                  </div>

                  {/* 按钮 */}
                  {startHref && (
                    <Link
                      href={startHref}
                      className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 active:scale-[0.98] shadow-sm"
                      style={{
                        background: theme.accent,
                        color: textWhite ? '#fff' : '#1a1a18',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.accentDark
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.accent
                      }}
                    >
                      开始学习
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>

                {/* 右侧：目录 */}
                <div className="lg:col-span-3">
                  <div
                    className="rounded-lg border p-5 sm:p-6"
                    style={{
                      background: theme.paperBg,
                      borderColor: 'rgba(0,0,0,0.06)',
                    }}
                  >
                    <h2 className="text-xs font-medium text-ink-lighter tracking-widest uppercase mb-4">
                      目 录
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                      {[leftCol, rightCol].map((col, ci) => (
                        <div key={ci} className="space-y-1">
                          {col.map((ch) => (
                            <Link
                              key={ch.number}
                              href={ch.href}
                              className="group flex items-start gap-3 py-2 px-2 -mx-2 rounded-md transition-colors"
                              style={{ color: 'inherit' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${theme.accent}0D`
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <span
                                className="flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-colors"
                                style={{
                                  background: `${theme.accent}15`,
                                  color: theme.accent,
                                }}
                              >
                                {ch.number}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span
                                  className="text-sm font-medium text-ink transition-colors"
                                  onMouseEnter={(e) => { e.currentTarget.style.color = theme.accent }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = '' }}
                                >
                                  {ch.title}
                                </span>
                                <p className="text-[11px] text-ink-lighter mt-0.5 leading-snug line-clamp-1">
                                  {ch.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="flex items-center justify-center mt-8 gap-1">
          <span className="text-xs text-ink-lighter tracking-widest">◆</span>
          <Image src="/images/logo-calligraphy-transparent.png" alt="PartJava" width={921} height={601} className="h-5 w-auto inline-block opacity-70" />
          <span className="text-xs text-ink-lighter tracking-widest">学习平台 ◆</span>
        </div>
      </div>
    </div>
  )
}
