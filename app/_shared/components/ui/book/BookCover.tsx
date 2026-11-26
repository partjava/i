'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import BrandLogo from '../../BrandLogo'
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

// ==================== 精装 3D 书本封面 ====================

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
  const rootRef = useRef<HTMLDivElement>(null)
  const [showAutoGuide, setShowAutoGuide] = useState(false)

  useEffect(() => {
    const nextEl = rootRef.current?.nextElementSibling as HTMLElement | null
    if (!nextEl || nextEl.classList.contains('xl:hidden')) {
      setShowAutoGuide(true)
    } else {
      setShowAutoGuide(false)
    }
  }, [title])

  const subjectGraphHref = useMemo(
    () =>
      `/knowledge-graph?domain=${encodeURIComponent(theme.name)}&subject=${encodeURIComponent(title)}`,
    [theme.name, title]
  )

  const autoStages = useMemo(() => {
    if (!chapters.length) return []
    const step = Math.max(1, Math.ceil(chapters.length / 3))
    const stageMeta = [
      { label: '阶段 01', name: '基础与核心概念', desc: '建立本学科整体脉络与关键术语认知' },
      { label: '阶段 02', name: '进阶原理与机制', desc: '深入核心机制拆解、工程规范与典型范式' },
      { label: '阶段 03', name: '实战应用与冲刺', desc: '结合综合案例、调优技巧与高频面试查漏补缺' },
    ]
    return stageMeta
      .map((meta, idx) => ({
        ...meta,
        items: chapters.slice(idx * step, (idx + 1) * step),
      }))
      .filter((st) => st.items.length > 0)
  }, [chapters])

  return (
    <div
      ref={rootRef}
      data-book-cover="true"
      className="study-cover-hero py-10 sm:py-14 transition-colors duration-300"
      style={
        {
          background: `radial-gradient(circle at 20% 0%, ${theme.accent}12 0%, transparent 45%), ${theme.paperBg}`,
          '--book-accent': theme.accent,
          '--book-accent-dark': theme.accentDark,
          '--book-accent-light': theme.accentLight,
          '--book-paper-bg': theme.paperBg,
        } as React.CSSProperties
      }
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* 3D 精装硬壳书容器 */}
        <div className="relative group">
          {/* 柔和桌台环境投影 */}
          <div
            className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-2xl opacity-35 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}24, rgba(15,29,51,0.10))`,
              filter: 'blur(18px)',
              transform: 'translate(6px, 8px)',
            }}
          />

          {/* 左侧精装布面书脊 + 鎏金压线 */}
          <div
            className="absolute left-0 top-[4px] bottom-[14px] w-[18px] sm:w-[24px] z-20 rounded-l-md overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${theme.accentDark} 0%, ${theme.accent} 70%, ${theme.accentDark} 100%)`,
              boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.22), -2px 2px 10px rgba(15,29,51,0.14)',
            }}
          >
            {/* 细鎏金装订线 */}
            <div
              className="absolute right-[3px] top-3 bottom-3 w-[1.5px] opacity-65"
              style={{ background: 'linear-gradient(180deg, transparent, #D4AD72, transparent)' }}
            />
          </div>

          {/* 底部层叠书页切口 */}
          <div
            className="absolute bottom-0 left-[18px] sm:left-[24px] right-[-8px] sm:right-[-12px] h-[12px] sm:h-[14px] rounded-b-md"
            style={{
              background: 'linear-gradient(180deg, #ECE8DE 0px, #ECE8DE 1.5px, #FAF7F0 1.5px, #FAF7F0 3px)',
              backgroundSize: '100% 3px',
              boxShadow: 'inset 0 2px 4px rgba(15,29,51,0.08), 0 4px 10px rgba(15,29,51,0.08)',
            }}
          />

          {/* 右侧层叠书页切口 */}
          <div
            className="absolute right-[-8px] sm:right-[-12px] top-[6px] bottom-[12px] w-[8px] sm:w-[12px] z-10 rounded-r-sm"
            style={{
              background: 'linear-gradient(to right, #F2EEE4, #DDD7C9)',
              boxShadow: 'inset 2px 0 4px rgba(15,29,51,0.07)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-linear-gradient(to bottom, transparent, transparent 2.5px, rgba(15,29,51,0.08) 2.5px, rgba(15,29,51,0.08) 3px)',
              }}
            />
          </div>

          {/* 书本主封面（素笺象牙白精装板） */}
          <div
            className="relative z-20 ml-[16px] sm:ml-[22px] rounded-r-2xl rounded-bl-sm overflow-hidden border"
            style={{
              background: `linear-gradient(160deg, #FFFFFF 0%, #FCFBF8 65%, ${theme.paperBg} 100%)`,
              borderColor: 'rgba(15, 29, 51, 0.08)',
              boxShadow: '6px 10px 32px rgba(15, 29, 51, 0.10), 1px 2px 8px rgba(15, 29, 51, 0.05)',
              transform: 'translateZ(0)',
            }}
          >
            {/* 顶部领域鎏金细色带 */}
            <div
              className="h-1.5 sm:h-2 transition-colors duration-300"
              style={{
                background: `linear-gradient(90deg, ${theme.accentDark} 0%, ${theme.accent} 65%, #D4AD72 100%)`,
              }}
            />

            <div className="p-6 sm:p-10 lg:p-11">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
                {/* 左侧：封面核心信息 */}
                <div className="lg:col-span-2 flex flex-col">
                  {/* 顶部学科书签胶囊 */}
                  <div className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full border text-[11px] font-semibold tracking-wide mb-5"
                    style={{
                      background: `${theme.accent}0E`,
                      borderColor: `${theme.accent}2A`,
                      color: theme.accent,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AD72]" />
                    <span>{theme.name} · 体系讲义</span>
                  </div>

                  {/* 精致微玻璃图标底座 */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 border shadow-xs"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}14 0%, #FFFFFF 100%)`,
                      borderColor: `${theme.accent}24`,
                    }}
                  >
                    {icon}
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1D33] leading-tight tracking-tight">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5 tracking-wider uppercase font-mono">
                      {subtitle}
                    </p>
                  )}

                  {/* 典雅鎏金星标分割线 */}
                  <div className="flex items-center gap-3 my-5">
                    <span className="h-px flex-1 bg-slate-200/80" />
                    <span className="text-xs text-[#D4AD72]">✦</span>
                    <span className="h-px flex-1 bg-slate-200/80" />
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {description}
                  </p>

                  {/* 讲义元信息标签 */}
                  <div className="flex flex-wrap gap-2.5 mt-6">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold text-[#0F1D33]"
                      style={{
                        background: `${theme.accent}0A`,
                        borderColor: `${theme.accent}20`,
                      }}
                    >
                      <span>📚</span>
                      <span>{chapterCount} 章节讲义</span>
                    </div>
                    {totalHours && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs font-semibold text-amber-900">
                        <span>⏱</span>
                        <span>{totalHours}+ 小时</span>
                      </div>
                    )}
                  </div>

                  {/* 主次操作按钮组 */}
                  <div className="flex flex-wrap items-center gap-3 mt-7">
                    {startHref && (
                      <Link
                        href={startHref}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md hover:-translate-y-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${theme.accentDark} 0%, ${theme.accent} 100%)`,
                          color: textWhite ? '#fff' : '#1a1a18',
                          boxShadow: `0 8px 20px ${theme.accent}33`,
                        }}
                      >
                        <span>开始学习</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}

                    <Link
                      href={subjectGraphHref}
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold rounded-xl border border-slate-200 bg-white/90 text-slate-700 hover:border-[#D4AD72] hover:text-[#0F1D33] transition-colors"
                    >
                      <span>本科知识图谱</span>
                    </Link>
                  </div>
                </div>

                {/* 右侧：双栏精品目录卡片 */}
                <div className="lg:col-span-3">
                  <div
                    className="rounded-2xl border p-5 sm:p-6"
                    style={{
                      background: `linear-gradient(180deg, ${theme.paperBg} 0%, rgba(255,255,255,0.85) 100%)`,
                      borderColor: `${theme.accent}1A`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200/70">
                      <h2 className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                        目 录 · TABLE OF CONTENTS
                      </h2>
                      <span
                        className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full"
                        style={{
                          background: `${theme.accent}12`,
                          color: theme.accent,
                        }}
                      >
                        共 {chapters.length} 讲
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {[leftCol, rightCol].map((col, ci) => (
                        <div key={ci} className="space-y-1.5">
                          {col.map((ch) => (
                            <Link
                              key={ch.number}
                              href={ch.href}
                              className="group/ch flex items-start gap-3 py-2.5 px-2.5 rounded-xl border border-transparent hover:bg-white hover:border-slate-200/80 hover:shadow-xs transition-all duration-150"
                            >
                              <span
                                className="flex-shrink-0 w-7 h-7 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center transition-transform group-hover/ch:scale-105"
                                style={{
                                  background: `${theme.accent}14`,
                                  color: theme.accent,
                                }}
                              >
                                {String(ch.number).padStart(2, '0')}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[13.5px] font-semibold text-[#0F1D33] group-hover/ch:text-[var(--book-accent)] transition-colors truncate">
                                  {ch.title}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
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

        {/* 底部品牌印章 */}
        <div className="flex items-center justify-center mt-8 gap-1.5">
          <span className="text-xs text-[#D4AD72] tracking-widest">◆</span>
          <BrandLogo variant="full" className="!h-5 w-auto inline-block opacity-85" />
          <span className="text-xs text-slate-500 dark:text-slate-400 tracking-widest">全栈知识书院 ◆</span>
        </div>

        {/* 针对纯封面课程页自动补齐「三阶段学习路线 + 本科配套工具」，与有自定义扩展区的课程保持一致完整度 */}
        {showAutoGuide && (
          <div className="mt-10 space-y-6">
            {autoStages.length > 0 && (
              <div className="rounded-[20px] bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-white/10 shadow-[0_8px_28px_rgba(15,29,51,0.05)] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F1D33] dark:text-[#F2EDE4]">
                      三阶段推荐学习路线
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      按章节递进顺序拆解《{title}》，点击任意章节胶囊即可直接进入双页精读
                    </p>
                  </div>
                  <Link
                    href={subjectGraphHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/[0.04] text-[#0F1D33] dark:text-[#E8CA96] hover:border-[#D4AD72] transition-colors"
                  >
                    在知识星图中定位《{title}》 →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {autoStages.map((stage) => (
                    <div
                      key={stage.label}
                      className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.025] p-5 flex flex-col justify-between gap-4 hover:border-[#D4AD72]/60 transition-all"
                    >
                      <div>
                        <span
                          className="inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full mb-2.5"
                          style={{
                            background: `${theme.accent}15`,
                            color: theme.accent,
                          }}
                        >
                          {stage.label}
                        </span>
                        <h3 className="text-base font-bold text-[#0F1D33] dark:text-[#F2EDE4]">
                          {stage.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/70 dark:border-white/10">
                        {stage.items.map((ch) => (
                          <Link
                            key={ch.number}
                            href={ch.href}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E2430] border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#D4AD72] hover:text-[#0F1D33] dark:hover:text-[#D4AD72] transition-colors"
                          >
                            <span className="font-mono text-[10px] opacity-70">
                              {String(ch.number).padStart(2, '0')}
                            </span>
                            <span>{ch.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href={subjectGraphHref}
                className="group/tool rounded-2xl bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-white/10 hover:border-[#D4AD72]/60 shadow-sm hover:shadow-md p-5 transition-all flex items-start gap-3.5"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${theme.accent}14`, color: theme.accent }}
                >
                  🌌
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#0F1D33] dark:text-[#F2EDE4] group-hover/tool:text-[#D4AD72] transition-colors">
                    本科 3D 知识星图
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    查看《{title}》在{theme.name}领域中的前置依赖与进阶关联
                  </p>
                </div>
              </Link>

              <Link
                href="/notes"
                className="group/tool rounded-2xl bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-white/10 hover:border-[#D4AD72]/60 shadow-sm hover:shadow-md p-5 transition-all flex items-start gap-3.5"
              >
                <span className="w-10 h-10 rounded-xl bg-amber-500/12 text-amber-700 dark:text-[#D4AD72] flex items-center justify-center text-lg shrink-0">
                  📝
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#0F1D33] dark:text-[#F2EDE4] group-hover/tool:text-[#D4AD72] transition-colors">
                    多章节笔记沉淀
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    用专栏合集与双链笔记串联课堂核心概念，形成个人知识库
                  </p>
                </div>
              </Link>

              <Link
                href="/code/editor"
                className="group/tool rounded-2xl bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-white/10 hover:border-[#D4AD72]/60 shadow-sm hover:shadow-md p-5 transition-all flex items-start gap-3.5"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-lg shrink-0">
                  💻
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#0F1D33] dark:text-[#F2EDE4] group-hover/tool:text-[#D4AD72] transition-colors">
                    极客代码实时演练
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    在线运行与调试代码示例，将讲义理论立即转化为工程手感
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
