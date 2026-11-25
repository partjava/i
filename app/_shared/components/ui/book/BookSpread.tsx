'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { SubjectTheme } from './theme'
import AiChatPanel from '../../ai/AiChatPanel'
import StudyScreenshot from '../../StudyScreenshot'
import { StudyProgressBar } from '../../StudyProgressBar'
import { useStudyContentPage } from '../../StudyContentPageContext'

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
  disableSelect = false,
}: {
  children: React.ReactNode
  pageNumber: number
  side: 'left' | 'right'
  disableSelect?: boolean
}) {
  return (
    <div
      className={`
        relative h-full min-h-[540px] flex flex-col overflow-hidden
        ${disableSelect ? 'select-none' : ''}
        ${side === 'left'
          ? 'rounded-l-sm shadow-page-left'
          : 'rounded-r-sm shadow-page-right'
        }
      `}
      style={{
        background:
          side === 'left'
            ? 'linear-gradient(90deg, #E5EBF3 0%, #EEF2F7 10%, #F4F7FA 74%, #E2E8F2 100%)'
            : 'linear-gradient(270deg, #E5EBF3 0%, #EEF2F7 10%, #F4F7FA 74%, #E2E8F2 100%)',
        boxShadow:
          side === 'left'
            ? 'inset -22px 0 28px -18px rgba(15, 23, 42, 0.16), inset 2px 0 3px rgba(255, 255, 255, 0.7)'
            : 'inset 22px 0 28px -18px rgba(15, 23, 42, 0.16), inset -2px 0 3px rgba(255, 255, 255, 0.7)',
      }}
    >
      {/* 顶部页码装饰线 */}
      <div className="flex-shrink-0 flex items-center gap-2 px-7 pt-6 pb-2 select-none">
        <span className="h-px flex-1 bg-paper-300/40" />
        <span className="text-[10px] tracking-[0.2em] text-ink-fade font-medium">
          — {pageNumber} —
        </span>
        <span className="h-px flex-1 bg-paper-300/40" />
      </div>

      {/* 内容区 */}
      <div className={`flex-1 px-6 pb-8 overflow-y-auto [&>*:first-child]:mt-0 ${disableSelect ? 'select-none' : 'select-text'}`}>
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
    <div className="mb-5 flex justify-center">
      <nav
        className="flex items-center gap-1 px-1.5 py-1 bg-paper-200/85 rounded-full max-w-full overflow-x-auto shadow-sm border border-black/[0.04]"
        role="tablist"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => onChange(i)}
            className={`
              px-3.5 py-1.5 text-xs font-medium rounded-full shrink-0 transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96]
              ${i === activeIndex
                ? 'text-white shadow-sm'
                : 'text-ink-light hover:text-ink hover:bg-paper-300/60'
              }
            `}
            style={i === activeIndex ? { background: accentColor } : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
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

// ==================== 3D 单页翻页状态与缓动 ====================

interface FlipState {
  from: number
  to: number
  direction: 'forward' | 'back'
  progress: number // 0 -> 1
  mode: 'animating' | 'dragging'
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

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
  const [displayedSpread, setDisplayedSpread] = useState(0) // 静止时显示的页码
  const [flipState, setFlipState] = useState<FlipState | null>(null)
  const flipRef = useRef<FlipState | null>(null)
  flipRef.current = flipState
  const rafRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const spreadStageRef = useRef<HTMLDivElement>(null)

  const totalSpreads = spreads.length
  const currentPageStart = displayedSpread * 2 + 1

  const cancelAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => cancelAnimation()
  }, [cancelAnimation])

  // 精确进度计算
  const calculateProgress = () => {
    const { spreadsPerChapter } = props
    if (spreadsPerChapter && spreadsPerChapter.length >= chapterNumber) {
      const completedBefore = spreadsPerChapter
        .slice(0, chapterNumber - 1)
        .reduce((sum, n) => sum + n, 0)
      const totalAcrossAll = spreadsPerChapter.reduce((sum, n) => sum + n, 0)
      const completedInCurrent = currentSpread + 1
      const totalCompleted = completedBefore + completedInCurrent
      return {
        total: (totalCompleted / totalAcrossAll) * 100,
        label: `${totalCompleted}/${totalAcrossAll} 标签`,
      }
    }
    const chapterProgress = ((chapterNumber - 1) / totalChapters) * 100
    const spreadProgress = ((currentSpread + 1) / totalSpreads) * 100
    const total = chapterProgress + spreadProgress / totalChapters
    return {
      total,
      label: `第${chapterNumber}/${totalChapters}章`,
    }
  }

  const { total: courseProgressPct, label: progressLabel } = calculateProgress()

  // 连续帧动画驱动单页沿中脊立体翻折
  const animateFlip = useCallback(
    (
      from: number,
      to: number,
      direction: 'forward' | 'back',
      startProgress: number,
      endProgress: number,
      durationMs: number,
      useEaseOut: boolean,
      onComplete: () => void
    ) => {
      cancelAnimation()
      const startTime = performance.now()
      const easeFn = useEaseOut ? easeOutCubic : easeInOutCubic

      const tick = (now: number) => {
        const elapsed = now - startTime
        const rawT = Math.min(1, elapsed / Math.max(1, durationMs))
        const eased = easeFn(rawT)
        const nextProgress = startProgress + (endProgress - startProgress) * eased

        const state: FlipState = {
          from,
          to,
          direction,
          progress: nextProgress,
          mode: 'animating',
        }
        flipRef.current = state
        setFlipState(state)

        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
          onComplete()
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    },
    [cancelAnimation]
  )

  // 单页立体翻页（支持连续快点打断、移动端与减少动效自动降级）
  const goToSpread = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, totalSpreads - 1))

      // 若正在翻页或拖拽，立即落定前一次目标后再继续下一段，永不卡死
      let activeFrom = displayedSpread
      if (flipRef.current) {
        cancelAnimation()
        activeFrom = flipRef.current.to
        flipRef.current = null
        setDisplayedSpread(activeFrom)
        setCurrentSpread(activeFrom)
        setFlipState(null)
      }

      if (clamped === activeFrom) return

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (isMobile || reducedMotion) {
        setDisplayedSpread(clamped)
        setCurrentSpread(clamped)
        setFlipState(null)
        return
      }

      const dir: 'forward' | 'back' = clamped > activeFrom ? 'forward' : 'back'
      setCurrentSpread(clamped)
      const initial: FlipState = {
        from: activeFrom,
        to: clamped,
        direction: dir,
        progress: 0.01,
        mode: 'animating',
      }
      flipRef.current = initial
      setFlipState(initial)

      animateFlip(activeFrom, clamped, dir, 0.01, 1, 680, false, () => {
        flipRef.current = null
        setDisplayedSpread(clamped)
        setCurrentSpread(clamped)
        setFlipState(null)
      })
    },
    [displayedSpread, totalSpreads, cancelAnimation, animateFlip]
  )

  const goPrev = useCallback(
    () => goToSpread((flipRef.current ? flipRef.current.to : displayedSpread) - 1),
    [goToSpread, displayedSpread]
  )
  const goNext = useCallback(
    () => goToSpread((flipRef.current ? flipRef.current.to : displayedSpread) + 1),
    [goToSpread, displayedSpread]
  )

  // 键盘导航（输入框聚焦时不拦截左右方向键）
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext])

  // 书角实时拖拽搓动翻页（点击 < 10px 触发整页翻动；拖拽 >= 28% 或快速甩动则完成翻页，否则弹回）
  const handleCornerPointerDown = useCallback(
    (dir: 'forward' | 'back', e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      if (typeof window !== 'undefined' && window.innerWidth < 768) return

      const fromIdx = flipRef.current ? flipRef.current.to : displayedSpread
      const toIdx = dir === 'forward' ? fromIdx + 1 : fromIdx - 1
      if (toIdx < 0 || toIdx >= totalSpreads) return

      e.preventDefault()
      e.stopPropagation()
      cancelAnimation()

      const stageWidth = Math.max(spreadStageRef.current?.clientWidth || 720, 400)
      const startX = e.clientX
      let lastX = e.clientX
      let lastTime = performance.now()
      let velocity = 0
      let dragged = false
      let latestProgress = 0.04

      const onPointerMove = (moveEvent: PointerEvent) => {
        const rawDelta =
          dir === 'forward' ? startX - moveEvent.clientX : moveEvent.clientX - startX
        const now = performance.now()
        const dt = Math.max(now - lastTime, 8)
        const instantDelta =
          dir === 'forward' ? lastX - moveEvent.clientX : moveEvent.clientX - lastX
        velocity = instantDelta / dt
        lastX = moveEvent.clientX
        lastTime = now

        if (!dragged && Math.abs(moveEvent.clientX - startX) >= 8) {
          dragged = true
        }
        if (!dragged) return

        latestProgress = Math.max(0.02, Math.min(0.98, rawDelta / (stageWidth * 0.58)))
        const dragState: FlipState = {
          from: fromIdx,
          to: toIdx,
          direction: dir,
          progress: latestProgress,
          mode: 'dragging',
        }
        flipRef.current = dragState
        setFlipState(dragState)
      }

      const cleanup = () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointercancel', onPointerUp)
      }

      const onPointerUp = () => {
        cleanup()
        if (!dragged) {
          goToSpread(toIdx)
          return
        }

        const shouldCommit = latestProgress >= 0.28 || velocity > 0.35
        if (shouldCommit) {
          setCurrentSpread(toIdx)
          const duration = Math.max(180, (1 - latestProgress) * 480)
          animateFlip(fromIdx, toIdx, dir, latestProgress, 1, duration, true, () => {
            flipRef.current = null
            setDisplayedSpread(toIdx)
            setCurrentSpread(toIdx)
            setFlipState(null)
          })
        } else {
          const duration = Math.max(160, latestProgress * 360)
          animateFlip(fromIdx, toIdx, dir, latestProgress, 0, duration, true, () => {
            flipRef.current = null
            setCurrentSpread(fromIdx)
            setFlipState(null)
          })
        }
      }

      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    },
    [displayedSpread, totalSpreads, cancelAnimation, goToSpread, animateFlip]
  )

  // 计算底部导航按钮状态
  const isFirst = currentSpread === 0
  const isLast = currentSpread === totalSpreads - 1

  // ===== 右侧栏相关 =====
  const bookRootRef = useRef<HTMLDivElement>(null)
  const { setIsContentPage } = useStudyContentPage()
  const [pageHeadings, setPageHeadings] = useState<{ level: string; text: string }[]>([])
  const [outlineOpen, setOutlineOpen] = useState(true)

  useEffect(() => {
    try {
      setOutlineOpen(localStorage.getItem('study_outline_collapsed') !== '1')
    } catch {}
  }, [])

  const toggleOutline = () => {
    setOutlineOpen(prev => {
      const next = !prev
      try { localStorage.setItem('study_outline_collapsed', next ? '0' : '1') } catch {}
      return next
    })
  }

  // 标记当前是学习内容页（用于隐藏全局 AI 悬浮球）
  useEffect(() => {
    setIsContentPage(true)
    return () => setIsContentPage(false)
  }, [setIsContentPage])

  // 提取当前稳定基础对页挂载的 h2/h3 标题作为页内大纲（翻页中不重复采集）
  useEffect(() => {
    const baseRoot = bookRootRef.current?.querySelector('[data-book-base-spread]')
    if (!baseRoot) return
    const els = Array.from(baseRoot.querySelectorAll('h2, h3'))
    setPageHeadings(els.map(el => ({ level: el.tagName.toLowerCase(), text: el.textContent?.trim() || '' })))
  }, [displayedSpread])

  const scrollToHeading = (index: number) => {
    const baseRoot = bookRootRef.current?.querySelector('[data-book-base-spread]')
    if (!baseRoot) return
    const els = baseRoot.querySelectorAll('h2, h3')
    els[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // 计算静止基础左右页、动态纸垛厚度比例与 3D 活动翻页几何参数
  const visualPosition = flipState
    ? flipState.from + (flipState.to - flipState.from) * flipState.progress
    : displayedSpread
  const stackRatio = totalSpreads > 1 ? Math.max(0, Math.min(1, visualPosition / (totalSpreads - 1))) : 0.5
  const leftStackWidth = Math.round(5 + stackRatio * 13)
  const rightStackWidth = Math.round(5 + (1 - stackRatio) * 13)

  const baseLeftIndex = flipState
    ? flipState.direction === 'forward'
      ? flipState.from
      : flipState.to
    : displayedSpread
  const baseRightIndex = flipState
    ? flipState.direction === 'forward'
      ? flipState.to
      : flipState.from
    : displayedSpread

  const flipProgress = flipState?.progress ?? 0
  const flipSin = Math.sin(flipProgress * Math.PI)
  const flipDeg = flipState
    ? flipState.direction === 'forward'
      ? -flipProgress * 180
      : flipProgress * 180
    : 0
  const showLeafFront = flipProgress < 0.5
  const canTurnPrev = !flipState && displayedSpread > 0
  const canTurnNext = !flipState && displayedSpread < totalSpreads - 1

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
      <div className="w-full max-w-[1920px] mx-auto px-4 py-5 sm:px-6 sm:py-6 flex items-start gap-5">
        <div className="flex-1 min-w-0">
        {/* ===== 顶部面包屑 + 紧凑工具动作（释放右侧栏空间给 AI 助手） ===== */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-lighter mb-4 sm:mb-5 px-1">
          {subjectHref ? (
            <a href={subjectHref} className="hover-accent transition-colors">
              {subject}
            </a>
          ) : (
            <span>{subject}</span>
          )}
          <span className="text-ink-fade mx-1">/</span>
          <span className="text-ink-light">{chapterTitle}</span>
          <div className="ml-auto flex items-center gap-2">
            <StudyScreenshot compact />
            <StudyProgressBar compact />
            <span className="hidden sm:inline text-ink-fade font-code tabular-nums pl-1">
              {chapterNumber} / {totalChapters}
            </span>
          </div>
        </div>

        {/* ===== 书本容器 ===== */}
        <div id="study-book-root" ref={bookRootRef} className="bg-paper-200/40 rounded-lg shadow-book p-4 sm:p-6">
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

          {/* ===== 实体精装厚书本容器（硬壳封皮边框 + 左右多页纸垛厚度 + 中缝弧形书脊 + 缎面丝带书签 + 底部拱形书切口） ===== */}
          <div className="relative" data-physical-book-shell>
            {/* 桌面落地柔和投影 */}
            <div
              className="pointer-events-none absolute -bottom-3 inset-x-4 h-7 rounded-full blur-xl opacity-45"
              style={{
                background: 'radial-gradient(60% 100% at 50% 50%, rgba(15, 23, 42, 0.45), transparent 85%)',
              }}
            />

            {/* 精装硬壳封面外框（静止外框，内部仅翻动单张纸页） */}
            <div
              className="relative rounded-[12px] p-2 sm:p-2.5 pb-3 sm:pb-3.5 shadow-[0_22px_48px_-14px_rgba(15,23,42,0.34)] ring-1 ring-[#D4AD72]/35"
              style={{
                background: 'linear-gradient(160deg, #273347 0%, #192231 52%, #232E40 100%)',
              }}
            >
              {/* 书本内芯容器（书脊书签 + 两侧动态纸垛厚度 + 3D 单页立体翻页舞台 + 底部拱形书切口） */}
              <div className="relative">
                {/* 书脊顶端露出的精致麦穗金缎面丝带书签 */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none hidden md:block absolute -top-2.5 left-1/2 -translate-x-1/2 z-40 w-3 h-7 shadow-sm"
                  style={{
                    background: 'linear-gradient(180deg, #D4AD72 0%, #B88A44 100%)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
                  }}
                />

                {/* 内芯横向排布：左侧动态纸垛 + 左右对开单页翻转舞台 + 右侧动态纸垛 */}
                <div className="relative flex items-stretch">
                  {/* 左侧动态多页纸张堆叠厚度（随已读进度变厚） */}
                  <div
                    aria-hidden="true"
                    data-book-stack="left"
                    className="hidden md:block shrink-0 rounded-l-[3px] border-r border-black/10 transition-[width] duration-200 ease-out"
                    style={{
                      width: `${leftStackWidth}px`,
                      background:
                        'repeating-linear-gradient(to right, #cfd6e3 0px, #cfd6e3 1.5px, #eef2f7 1.5px, #eef2f7 3px)',
                      boxShadow: 'inset -3px 0 6px rgba(15, 29, 51, 0.16)',
                    }}
                  />

                  {/* 3D 单页立体翻页舞台（无 overflow-hidden，确保 Z 轴翻起纸页不被裁切） */}
                  <div
                    ref={spreadStageRef}
                    className="relative flex-1 min-h-[540px]"
                    style={{
                      perspective: '2400px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* 静止基础双页层 */}
                    <div
                      data-book-base-spread
                      className="relative grid grid-cols-1 md:grid-cols-2 items-stretch gap-0 min-h-[540px] rounded-[2px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(15,29,51,0.06)]"
                    >
                      {/* 中缝实体装订凹槽与双侧弧形纸面高光阴影 */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-20"
                        style={{
                          background:
                            'linear-gradient(to right, transparent 0%, rgba(15,23,42,0.05) 26%, rgba(15,23,42,0.16) 49%, rgba(255,255,255,0.45) 50%, rgba(15,23,42,0.15) 51%, rgba(15,23,42,0.04) 74%, transparent 100%)',
                        }}
                      />

                      {/* 基础左页 */}
                      <div className="relative h-full">
                        <BookPage
                          side="left"
                          pageNumber={baseLeftIndex * 2 + 1}
                          disableSelect={flipState?.mode === 'dragging'}
                        >
                          {spreads[baseLeftIndex].left}
                        </BookPage>

                        {/* 向前翻页后半程落阴影 / 向后翻页前半程揭页脊阴影 */}
                        {flipState && flipState.direction === 'forward' && flipProgress > 0.45 && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: Math.min(1, ((flipProgress - 0.45) / 0.55) * 0.9),
                              background:
                                'linear-gradient(to left, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 38%, transparent 82%)',
                            }}
                          />
                        )}
                        {flipState && flipState.direction === 'back' && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: Math.max(0, 1 - flipProgress * 1.45),
                              background:
                                'linear-gradient(to left, rgba(15,23,42,0.34) 0%, rgba(15,23,42,0.14) 36%, transparent 78%)',
                            }}
                          />
                        )}
                      </div>

                      {/* 基础右页 */}
                      <div className="relative h-full">
                        <BookPage
                          side="right"
                          pageNumber={baseRightIndex * 2 + 2}
                          disableSelect={flipState?.mode === 'dragging'}
                        >
                          {spreads[baseRightIndex].right}
                        </BookPage>

                        {/* 向前翻页前半程揭页脊阴影 / 向后翻页后半程落阴影 */}
                        {flipState && flipState.direction === 'forward' && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: Math.max(0, 1 - flipProgress * 1.45),
                              background:
                                'linear-gradient(to right, rgba(15,23,42,0.34) 0%, rgba(15,23,42,0.14) 36%, transparent 78%)',
                            }}
                          />
                        )}
                        {flipState && flipState.direction === 'back' && flipProgress > 0.45 && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none hidden md:block absolute inset-0 z-10"
                            style={{
                              opacity: Math.min(1, ((flipProgress - 0.45) / 0.55) * 0.9),
                              background:
                                'linear-gradient(to right, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.08) 38%, transparent 82%)',
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* 3D 双面立体单页翻动层（向前翻右页 0°→-180°；向后翻左页 0°→+180°） */}
                    {flipState && (
                      <div
                        data-book-flip-leaf
                        data-flip-direction={flipState.direction}
                        data-flip-progress={flipProgress.toFixed(3)}
                        className="pointer-events-none hidden md:block absolute top-0 bottom-0 z-30"
                        style={{
                          left: flipState.direction === 'forward' ? '50%' : '0%',
                          width: '50%',
                          transformOrigin:
                            flipState.direction === 'forward' ? 'left center' : 'right center',
                          transformStyle: 'preserve-3d',
                          transform: `rotateY(${flipDeg}deg) translateZ(2px)`,
                          boxShadow: `0 ${Math.round(6 + flipSin * 20)}px ${Math.round(
                            14 + flipSin * 38
                          )}px rgba(15, 23, 42, ${(0.14 + flipSin * 0.28).toFixed(2)})`,
                        }}
                      >
                        {/* 活动纸页正面（0° ~ 90° 可见） */}
                        <div
                          className={`absolute inset-0 overflow-hidden ${
                            flipState.direction === 'forward'
                              ? 'rounded-r-sm border-r border-white/80'
                              : 'rounded-l-sm border-l border-white/80'
                          }`}
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)',
                            opacity: showLeafFront ? 1 : 0,
                          }}
                        >
                          <BookPage
                            side={flipState.direction === 'forward' ? 'right' : 'left'}
                            pageNumber={
                              flipState.direction === 'forward'
                                ? flipState.from * 2 + 2
                                : flipState.from * 2 + 1
                            }
                            disableSelect
                          >
                            {flipState.direction === 'forward'
                              ? spreads[flipState.from].right
                              : spreads[flipState.from].left}
                          </BookPage>
                          {/* 随角度变化的弧形光照与折页高光条 */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                flipState.direction === 'forward'
                                  ? `linear-gradient(to left, rgba(255,255,255,${(
                                      flipSin * 0.28
                                    ).toFixed(2)}) 0%, rgba(15,23,42,${(
                                      flipProgress * 0.14
                                    ).toFixed(2)}) 55%, rgba(15,23,42,${(
                                      flipProgress * 0.28
                                    ).toFixed(2)}) 100%)`
                                  : `linear-gradient(to right, rgba(255,255,255,${(
                                      flipSin * 0.28
                                    ).toFixed(2)}) 0%, rgba(15,23,42,${(
                                      flipProgress * 0.14
                                    ).toFixed(2)}) 55%, rgba(15,23,42,${(
                                      flipProgress * 0.28
                                    ).toFixed(2)}) 100%)`,
                            }}
                          />
                        </div>

                        {/* 活动纸页背面（90° ~ 180° 露出，对应新一页内页） */}
                        <div
                          className={`absolute inset-0 overflow-hidden ${
                            flipState.direction === 'forward'
                              ? 'rounded-l-sm border-l border-white/80'
                              : 'rounded-r-sm border-r border-white/80'
                          }`}
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            opacity: showLeafFront ? 0 : 1,
                          }}
                        >
                          <BookPage
                            side={flipState.direction === 'forward' ? 'left' : 'right'}
                            pageNumber={
                              flipState.direction === 'forward'
                                ? flipState.to * 2 + 1
                                : flipState.to * 2 + 2
                            }
                            disableSelect
                          >
                            {flipState.direction === 'forward'
                              ? spreads[flipState.to].left
                              : spreads[flipState.to].right}
                          </BookPage>
                          {/* 背面出光渐变（刚过 90° 偏暗，落定 180° 完全明亮） */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                flipState.direction === 'forward'
                                  ? `linear-gradient(to right, rgba(255,255,255,${(
                                      flipSin * 0.22
                                    ).toFixed(2)}) 0%, rgba(15,23,42,${(
                                      Math.max(0, 1 - flipProgress) * 0.28
                                    ).toFixed(2)}) 100%)`
                                  : `linear-gradient(to left, rgba(255,255,255,${(
                                      flipSin * 0.22
                                    ).toFixed(2)}) 0%, rgba(15,23,42,${(
                                      Math.max(0, 1 - flipProgress) * 0.28
                                    ).toFixed(2)}) 100%)`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 左下角：悬停翘角 + 拖拽/点击翻上一页热区 */}
                    {canTurnPrev && (
                      <div
                        data-page-corner="prev"
                        onPointerDown={(e) => handleCornerPointerDown('back', e)}
                        title="点击或向右拖拽翻上一页"
                        className="group hidden md:block absolute bottom-0 left-0 w-20 h-20 z-30 cursor-grab active:cursor-grabbing select-none"
                      >
                        {/* 底层露出前一页内角三角 */}
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{
                            clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                            background:
                              'linear-gradient(225deg, rgba(15,23,42,0.16) 0%, #D9E0EC 42%, #EEF2F7 100%)',
                          }}
                        />
                        {/* 向上翻折的左上卷角纸片 */}
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[3px_-3px_6px_rgba(15,23,42,0.2)]"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                            background:
                              'linear-gradient(225deg, #FFFFFF 0%, #F4F6FA 48%, #D4DCE8 100%)',
                          }}
                        />
                        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-2 left-12 px-2 py-0.5 rounded-full bg-[#192231]/85 text-[#F2EDE4] text-[10px] font-medium whitespace-nowrap shadow-sm">
                          ‹ 上一页
                        </span>
                      </div>
                    )}

                    {/* 右下角：悬停翘角 + 拖拽/点击翻下一页热区 */}
                    {canTurnNext && (
                      <div
                        data-page-corner="next"
                        onPointerDown={(e) => handleCornerPointerDown('forward', e)}
                        title="点击或向左拖拽翻下一页"
                        className="group hidden md:block absolute bottom-0 right-0 w-20 h-20 z-30 cursor-grab active:cursor-grabbing select-none"
                      >
                        {/* 底层露出下一页内角三角 */}
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 right-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{
                            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                            background:
                              'linear-gradient(135deg, rgba(15,23,42,0.16) 0%, #D9E0EC 42%, #EEF2F7 100%)',
                          }}
                        />
                        {/* 向上翻折的右上卷角纸片 */}
                        <div
                          aria-hidden="true"
                          className="absolute bottom-0 right-0 w-[18px] h-[18px] group-hover:w-[46px] group-hover:h-[46px] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[-3px_-3px_6px_rgba(15,23,42,0.2)]"
                          style={{
                            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                            background:
                              'linear-gradient(135deg, #FFFFFF 0%, #F4F6FA 48%, #D4DCE8 100%)',
                          }}
                        />
                        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-2 right-12 px-2 py-0.5 rounded-full bg-[#192231]/85 text-[#F2EDE4] text-[10px] font-medium whitespace-nowrap shadow-sm">
                          下一页 ›
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 右侧动态多页纸张堆叠厚度（随已读进度变薄） */}
                  <div
                    aria-hidden="true"
                    data-book-stack="right"
                    className="hidden md:block shrink-0 rounded-r-[3px] border-l border-black/10 transition-[width] duration-200 ease-out"
                    style={{
                      width: `${rightStackWidth}px`,
                      background:
                        'repeating-linear-gradient(to left, #cfd6e3 0px, #cfd6e3 1.5px, #eef2f7 1.5px, #eef2f7 3px)',
                      boxShadow: 'inset 3px 0 6px rgba(15, 29, 51, 0.16)',
                    }}
                  />
                </div>

                {/* 底部厚纸垛切口（双页拱形明暗 + 横向多页纹理 + 中脊布头凹口，与动态左右厚度对齐） */}
                <div
                  className="relative h-4 sm:h-5 rounded-b-[4px] overflow-hidden border-t border-black/10 transition-[margin] duration-200 ease-out"
                  style={{
                    marginLeft: `${leftStackWidth}px`,
                    marginRight: `${rightStackWidth}px`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'repeating-linear-gradient(to bottom, #eef2f7 0px, #eef2f7 2px, #cfd6e3 2px, #cfd6e3 3.5px)',
                    }}
                  />
                  {/* 模拟书页展开时的双峰拱起阴影与中缝书脊凹陷 */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(15,23,42,0.12) 0%, rgba(255,255,255,0.22) 25%, rgba(15,23,42,0.06) 44%, rgba(15,23,42,0.26) 50%, rgba(15,23,42,0.06) 56%, rgba(255,255,255,0.22) 75%, rgba(15,23,42,0.14) 100%)',
                    }}
                  />
                  {/* 中缝布头装订小标 */}
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-5 h-full bg-[#192231]/80 border-x border-[#D4AD72]/35"
                  />
                </div>
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

        {/* ===== 右侧栏：章节大纲 + AI 助手 + 工具 ===== */}
        <aside className="hidden xl:flex flex-col gap-4 w-[300px] 2xl:w-[340px] shrink-0 sticky top-4 h-[calc(100vh-6rem)] overflow-y-auto">
          {/* 章节大纲（可折叠） */}
          <div className="shrink-0 bg-white/90 rounded-xl border border-black/5 shadow-sm p-3">
            <button
              onClick={toggleOutline}
              className="w-full flex items-center justify-between px-1 py-0.5 rounded hover:bg-black/5 transition-colors"
            >
              <span className="text-xs font-semibold" style={{ color: 'var(--book-accent)' }}>章节大纲</span>
              <span className="flex items-center gap-2">
                <span className="text-[10px] text-ink-fade">第{chapterNumber}/{totalChapters}章</span>
                <svg
                  className={`w-3.5 h-3.5 text-ink-lighter transition-transform duration-200 ${outlineOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {outlineOpen && (
              <>
                {/* 标签级大纲（联动翻页） */}
                <div className="space-y-0.5 max-h-36 overflow-y-auto mt-2">
                  {spreads.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => goToSpread(i)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded-md transition-colors truncate ${
                        i === currentSpread ? 'text-white shadow-sm' : 'text-ink-light hover:bg-black/5'
                      }`}
                      style={i === currentSpread ? { background: 'var(--book-accent)' } : undefined}
                    >
                      {i + 1}. {s.label}
                    </button>
                  ))}
                </div>
                {/* 页内标题（当前两页的 h2/h3） */}
                {pageHeadings.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-black/5 space-y-0.5 max-h-36 overflow-y-auto">
                    {pageHeadings.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToHeading(i)}
                        className={`block w-full text-left text-xs px-2 py-1 rounded-md hover:bg-black/5 transition-colors ${
                          h.level === 'h2' ? 'text-ink font-medium' : 'pl-4 text-ink-lighter'
                        }`}
                      >
                        {h.level === 'h3' ? '· ' : ''}{h.text}
                      </button>
                    ))}
                  </div>
                )}
                {/* 上/下一章 */}
                {(prevChapter || nextChapter) && (
                  <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between gap-2 text-[11px]">
                    {prevChapter ? (
                      <a href={prevChapter.href} className="text-ink-lighter hover-accent transition-colors truncate">← {prevChapter.label}</a>
                    ) : <span />}
                    {nextChapter ? (
                      <a href={nextChapter.href} className="text-ink-lighter hover-accent transition-colors truncate ml-auto text-right">{nextChapter.label} →</a>
                    ) : <span />}
                  </div>
                )}
              </>
            )}
          </div>

          {/* AI 助手嵌入面板（独占右侧剩余高度，视野更宽敞） */}
          <div className="flex-1 min-h-[420px] bg-white/95 rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <AiChatPanel />
          </div>
        </aside>
      </div>
    </div>
  )
}
