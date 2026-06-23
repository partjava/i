'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { SubjectTheme } from './theme'

// ==================== 类型定义 ====================

export interface BookSpreadData {
  label: string
  left: React.ReactNode
  right: React.ReactNode
}

export interface BookChapterLink {
  label: string
  href: string
}

export interface BookSpreadProps {
  subject: string
  chapterTitle: string
  chapterNumber: number
  totalChapters: number
  spreads: BookSpreadData[]
  prevChapter?: BookChapterLink
  nextChapter?: BookChapterLink
  subjectHref?: string
  className?: string
  /** 主题配色，默认琥珀色 */
  theme?: SubjectTheme
  spreadsPerChapter?: number[]
}

// ==================== 子组件：单页 ====================

function BookPage({
  children,
  pageNumber,
  side,
}: {
  children: React.ReactNode
  pageNumber: number
  side: 'left' | 'right'
}) {
  return (
    <div
      className={`
        relative flex flex-col bg-[#EDF0F5] select-none
        ${side === 'left'
          ? 'rounded-l-sm shadow-page-left'
          : 'rounded-r-sm shadow-page-right'
        }
      `}
    >
      {/* 顶部页码装饰线 */}
      <div className="flex-shrink-0 flex items-center gap-2 px-7 pt-6 pb-2">
        <span className="h-px flex-1 bg-paper-300/40" />
        <span className="text-[10px] tracking-[0.2em] text-ink-fade font-medium">
          — {pageNumber} —
        </span>
        <span className="h-px flex-1 bg-paper-300/40" />
      </div>

      {/* 内容区 */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto [&>*:first-child]:mt-0">
        {children}
      </div>
    </div>
  )
}

// ==================== 子组件：标签栏 ====================

function BookTabs({
  tabs,
  activeIndex,
  onChange,
  accentColor = '#6366f1',
}: {
  tabs: { label: string }[]
  activeIndex: number
  onChange: (index: number) => void
  accentColor?: string
}) {
  return (
    <nav className="flex items-center gap-1 px-1.5 py-1 bg-paper-200/80 rounded-full w-fit mx-auto mb-5 shadow-sm" role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === activeIndex}
          onClick={() => onChange(i)}
          className={`
            px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300
            ${i === activeIndex
              ? 'text-white shadow-sm scale-105'
              : 'text-ink-light hover:text-ink hover:bg-paper-300/50'
            }
          `}
          style={i === activeIndex ? { background: accentColor } : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

// ==================== 子组件：进度条 ====================

function BookProgressBar({
  percent,
  label,
  chapterNumber,
  totalChapters,
  spreadIndex,
  totalSpreads,
  accentColor = '#6366f1',
}: {
  percent: number
  label: string
  chapterNumber: number
  totalChapters: number
  spreadIndex: number
  totalSpreads: number
  accentColor?: string
}) {
  return (
    <div className="mb-5 space-y-1.5">
      <div className="flex items-center justify-between text-[11px] text-ink-lighter tracking-wide">
        <span>课程进度 {Math.round(percent)}% · {label}</span>
        <span>第{chapterNumber}/{totalChapters}章 · 标签 {spreadIndex + 1}/{totalSpreads}</span>
      </div>
      <div className="h-1 bg-paper-300/70 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${Math.min(percent, 100)}%`,
            background: `linear-gradient(to right, ${accentColor}80, ${accentColor})`,
          }}
        />
      </div>
    </div>
  )
}

// ==================== 主组件 ====================

export default function BookSpread(props: BookSpreadProps) {
  const {
    subject,
    chapterTitle,
    chapterNumber,
    totalChapters,
    spreads,
    prevChapter,
    nextChapter,
    subjectHref,
    className = '',
    theme,
  } = props
  const accentColor = theme?.accent || '#6366f1'
  const [currentSpread, setCurrentSpread] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [displayedSpread, setDisplayedSpread] = useState(0)  // 动画中实际显示的内容
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSpreads = spreads.length
  const currentPageStart = displayedSpread * 2 + 1

  // 精确进度计算
  const calculateProgress = () => {
    const { spreadsPerChapter } = props
    if (spreadsPerChapter && spreadsPerChapter.length >= chapterNumber) {
      // 精确：已知每章的标签数
      const completedBefore = spreadsPerChapter
        .slice(0, chapterNumber - 1)
        .reduce((sum, n) => sum + n, 0)
      const totalAcrossAll = spreadsPerChapter.reduce((sum, n) => sum + n, 0)
      const completedInCurrent = displayedSpread + 1
      const totalCompleted = completedBefore + completedInCurrent
      return {
        total: (totalCompleted / totalAcrossAll) * 100,
        label: `${totalCompleted}/${totalAcrossAll} 标签`,
      }
    }
    // 启发式：用章节序号估算
    const chapterProgress = ((chapterNumber - 1) / totalChapters) * 100
    const spreadProgress = ((displayedSpread + 1) / totalSpreads) * 100
    const total = chapterProgress + spreadProgress / totalChapters
    return {
      total,
      label: `第${chapterNumber}/${totalChapters}章`,
    }
  }

  const { total: courseProgressPct, label: progressLabel } = calculateProgress()

  // 翻页：两阶段动画
  const goToSpread = useCallback((target: number) => {
    if (phase !== 'idle') return
    const clamped = Math.max(0, Math.min(target, totalSpreads - 1))
    if (clamped === displayedSpread) return

    const dir = clamped > displayedSpread ? 'forward' : 'back'
    setDirection(dir)
    setPhase('exiting')

    // 阶段1：退出动画（200ms）
    setTimeout(() => {
      setDisplayedSpread(clamped)
      setCurrentSpread(clamped)
      setPhase('entering')

      // 阶段2：进入动画（200ms）
      setTimeout(() => {
        setPhase('idle')
      }, 280)
    }, 280)
  }, [phase, displayedSpread, totalSpreads])

  const goPrev = useCallback(() => goToSpread(displayedSpread - 1), [goToSpread, displayedSpread])
  const goNext = useCallback(() => goToSpread(displayedSpread + 1), [goToSpread, displayedSpread])

  // 键盘导航
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext])

  // 动画类名
  const getAnimationClass = () => {
    if (phase === 'idle') return ''
    if (phase === 'exiting') {
      return direction === 'forward' ? 'animate-book-exit-forward' : 'animate-book-exit-back'
    }
    return direction === 'forward' ? 'animate-book-enter-forward' : 'animate-book-enter-back'
  }

  // 计算底部导航按钮状态
  const isFirst = displayedSpread === 0
  const isLast = displayedSpread === totalSpreads - 1

  return (
    <div
      className={`min-h-screen ${className}`}
      ref={containerRef}
      style={{ background: theme?.paperBg || '', '--book-accent': accentColor, '--book-accent-light': `${accentColor}30` } as React.CSSProperties}
    >
      <style>{`
        .hover-accent:hover { color: var(--book-accent) !important; }
        .hover-accent-bg:hover { background: var(--book-accent-light) !important; }
        .bg-dot-active { background: var(--book-accent) !important; }
        .border-accent { border-color: var(--book-accent) !important; }
      `}</style>
      <div className="max-w-6xl mx-auto px-3 py-5 sm:px-4 sm:py-6">
        {/* ===== 顶部面包屑 ===== */}
        <div className="flex items-center gap-2 text-xs text-ink-lighter mb-4 sm:mb-5 px-1">
          {subjectHref ? (
            <a href={subjectHref} className="hover-accent transition-colors">
              {subject}
            </a>
          ) : (
            <span>{subject}</span>
          )}
          <span className="text-ink-fade mx-1">/</span>
          <span className="text-ink-light">{chapterTitle}</span>
          <span className="ml-auto hidden sm:inline text-ink-fade">
            {chapterNumber} / {totalChapters}
          </span>
        </div>

        {/* ===== 书本容器 ===== */}
        <div className="bg-paper-200/40 rounded-lg shadow-book p-4 sm:p-6">
          {/* 标签栏 */}
          <BookTabs
            tabs={spreads.map(s => ({ label: s.label }))}
            activeIndex={currentSpread}
            onChange={goToSpread}
            accentColor={accentColor}
          />

          {/* 进度条 */}
          <BookProgressBar
            percent={courseProgressPct}
            label={progressLabel}
            chapterNumber={chapterNumber}
            totalChapters={totalChapters}
            spreadIndex={displayedSpread}
            totalSpreads={totalSpreads}
            accentColor={accentColor}
          />

          {/* ===== 3D 书本块（含底部厚度） ===== */}
          <div className="relative">
            {/* 书本阴影 */}
            <div
              className="absolute -bottom-1 -right-1 w-full h-full rounded-sm opacity-15 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(44,42,39,0.12), rgba(44,42,39,0.03))',
                filter: 'blur(10px)',
                transform: 'translate(3px, 3px)',
              }}
            />

            {/* 可翻页的书本块（含动画） */}
            <div
              className={`relative ${getAnimationClass()}`}
              style={{
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 两页对开 */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[380px] rounded-sm overflow-hidden"
                style={{
                  // 书脊效果
                  backgroundImage: `
                    linear-gradient(
                      to right,
                      transparent 0%,
                      transparent calc(50% - 12px),
                      rgba(44,42,39,0.04) calc(50% - 12px),
                      rgba(44,42,39,0.10) 50%,
                      rgba(44,42,39,0.04) calc(50% + 12px),
                      transparent calc(50% + 12px),
                      transparent 100%
                    )
                  `,
                }}
              >
                {/* 左页 */}
                <div className="relative">
                  <div className="absolute inset-y-0 -left-1 w-2 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none z-10" />
                  <BookPage side="left" pageNumber={currentPageStart}>
                    {spreads[displayedSpread].left}
                  </BookPage>
                </div>

                {/* 右页 */}
                <div className="relative">
                  <div className="absolute inset-y-0 -left-[1px] w-[3px] bg-gradient-to-r from-transparent via-black/[0.03] to-transparent pointer-events-none z-10" />
                  <BookPage side="right" pageNumber={currentPageStart + 1}>
                    {spreads[displayedSpread].right}
                  </BookPage>
                </div>
              </div>

              {/* 底部纸张厚度 */}
              <div className="h-3 sm:h-4 rounded-b-sm overflow-hidden" style={{
                background: 'linear-gradient(180deg, #d1d6e0, #d1d6e0)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.04)',
              }}>
                <div className="h-full w-full" style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(160,174,192,0.12) 2px, rgba(160,174,192,0.12) 2.5px)',
                }} />
              </div>
            </div>
          </div>

          {/* ===== 底部导航 ===== */}
          <div className="mt-5 flex items-center justify-between select-none">
            {/* 左：上一页/上一章 */}
            <div>
              {isFirst && prevChapter ? (
                <a
                  href={prevChapter.href}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink-light hover-accent rounded-md hover:bg-paper-300/50 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                  <span className="hidden sm:inline">{prevChapter.label}</span>
                </a>
              ) : (
                <button
                  onClick={goPrev}
                  disabled={isFirst && !prevChapter}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200
                    ${isFirst
                      ? 'text-ink-fade cursor-not-allowed'
                      : 'text-ink-light hover-accent hover:bg-paper-300/50 active:scale-95'
                    }
                  `}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                  <span>上一页</span>
                </button>
              )}
            </div>

            {/* 中：圆点导航 */}
            <div className="flex items-center gap-1.5">
              {spreads.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSpread(i)}
                  className={`
                    rounded-full transition-all duration-300
                    ${i === currentSpread
                      ? 'w-5 h-2 bg-dot-active shadow-sm'
                      : 'w-2 h-2 bg-paper-400 hover-accent-bg'
                    }
                  `}
                  aria-label={`跳转到 ${spreads[i].label}`}
                />
              ))}
            </div>

            {/* 右：下一页/下一章 */}
            <div>
              {isLast && nextChapter ? (
                <a
                  href={nextChapter.href}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink-light hover-accent rounded-md hover:bg-paper-300/50 transition-all duration-200"
                >
                  <span className="hidden sm:inline">{nextChapter.label}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
              ) : (
                <button
                  onClick={goNext}
                  disabled={isLast && !nextChapter}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200
                    ${isLast
                      ? 'text-ink-fade cursor-not-allowed'
                      : 'text-ink-light hover-accent hover:bg-paper-300/50 active:scale-95'
                    }
                  `}
                >
                  <span>下一页</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
              )}
            </div>
          </div>

          {/* ===== 底部章节链接（首次/末次显示） ===== */}
          {(isFirst && prevChapter) || (isLast && nextChapter) ? null : (
            <div className="mt-3 flex items-center justify-between text-[11px] border-t border-paper-300/50 pt-3">
              {prevChapter && !isFirst && (
                <a href={prevChapter.href} className="text-ink-lighter hover-accent transition-colors">
                  ← {prevChapter.label}
                </a>
              )}
              <span />
              {nextChapter && !isLast && (
                <a href={nextChapter.href} className="text-ink-lighter hover-accent transition-colors">
                  {nextChapter.label} →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
