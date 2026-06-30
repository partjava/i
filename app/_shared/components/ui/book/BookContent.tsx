'use client'

import { ReactNode, useState, useRef, useEffect, useMemo } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// 注册 highlight.js 未自动加载的语言模块
import 'highlight.js/lib/languages/accesslog'

// 手动注册 'asm'（汇编）—— 用 x86asm 替代
hljs.registerLanguage('asm', () => {
  const lang = hljs.getLanguage('x86asm')
  return lang || { name: 'asm', aliases: [], contains: [] }
})

// ============================================================
//  书本内容区块组件
//  所有组件都支持自由组合，left/right 可以放任意 ReactNode
// ============================================================

// ===== 页面大标题 =====
export function PageTitle({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-semibold text-ink pb-3 mb-5 border-b border-paper-300/70">
      {icon && <span className="text-amber shrink-0 text-lg">{icon}</span>}
      <span>{children}</span>
    </h2>
  )
}

// ===== 小标题（页内分区） =====
export function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-medium text-ink mt-5 mb-3">{children}</h3>
}

// ===== 正文段落 =====
export function BookParagraph({ children }: { children: ReactNode }) {
  return <p className="text-sm text-ink-light leading-[1.75] mb-3 last:mb-0">{children}</p>
}

// ===== 内联代码 =====
export function InlineCode({ children }: { children: string }) {
  return (
    <code className="px-1.5 py-0.5 bg-paper-200/80 rounded text-xs font-code text-amber-dark">
      {children}
    </code>
  )
}

// ===== 列表 =====
export function BookList({
  items,
  ordered = false,
  tight = false,
}: {
  items: ReactNode[]
  ordered?: boolean
  tight?: boolean
}) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={`space-y-${tight ? '0.5' : '1.5'} text-sm text-ink-light pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {items.map((item, i) => (
        <li key={i} className="leading-[1.7] marker:text-amber/60">{item}</li>
      ))}
    </Tag>
  )
}

// ===== 有序步骤（数字圈 + 连接线） =====
export function StepList({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[11px] top-6 bottom-6 w-px bg-paper-300/70" aria-hidden />
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="relative flex gap-4">
            <div className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-amber/10 border border-amber/30 text-amber text-xs font-semibold flex items-center justify-center">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="text-sm font-medium text-ink mb-1.5">{item.title}</h3>
              <div className="text-sm text-ink-light leading-[1.75] space-y-2">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== 提示框 =====
export function BookAlert({
  type = 'info',
  message,
  children,
}: {
  type?: 'info' | 'success' | 'warning'
  message?: string
  children?: ReactNode
}) {
  const config = {
    info:    { border: 'border-azure/40', bg: 'bg-azure-pale/40', icon: '📖', label: '提示' },
    success: { border: 'border-jade/40',  bg: 'bg-jade-pale/40',  icon: '✓',  label: '完成' },
    warning: { border: 'border-rust/40',  bg: 'bg-rust-pale/40',  icon: '!',  label: '注意' },
  }
  const c = config[type]

  return (
    <div className={`border-l-[3px] ${c.border} ${c.bg} rounded-r-md px-4 py-3 my-4`}>
      {message && (
        <p className="flex items-start gap-2 text-sm text-ink-light leading-relaxed">
          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-current/10 flex items-center justify-center text-[10px] font-bold mt-0.5"
               style={{ color: type === 'info' ? '#6366f1' : type === 'success' ? '#10b981' : '#8b5cf6' }}>
            {c.icon}
          </span>
          <span>{message}</span>
        </p>
      )}
      {children && <div className="text-sm text-ink-light leading-relaxed mt-1">{children}</div>}
    </div>
  )
}

// ===== 代码块（语法高亮 + 行号 + 折叠 + 复制） =====
export function BookCode({
  language,
  code,
  maxLines = 15,
  showLineNumbers = true,
}: {
  language?: string
  code: string
  /** 超过此行数自动折叠。设为 0 不折叠 */
  maxLines?: number
  showLineNumbers?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const lines = code.split('\n')
  const lineCount = lines.length
  const isLong = maxLines > 0 && lineCount > maxLines
  const foldedHeight = isLong ? maxLines * 22.1 + 40 : undefined

  // 用 highlight.js 做语法着色
  const highlightedHtml = useMemo(() => {
    try {
      if (language) {
        const result = hljs.highlight(code, { language, ignoreIllegals: true })
        return result.value
      }
      const result = hljs.highlightAuto(code)
      return result.value
    } catch {
      return code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="rounded-md overflow-hidden border border-paper-300/80 my-4 shadow-sm">
      {/* 顶栏：语言标签 + 复制按钮 */}
      <div className="flex items-center justify-between bg-[#1a1a18] text-paper-100/70 text-[11px] px-4 py-1.5">
        <span className="font-code tracking-wide">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] hover:bg-white/10 transition-colors active:scale-95"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-jade" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
      </div>

      {/* 代码区域（可折叠） */}
      <div
        ref={wrapperRef}
        className="relative overflow-hidden transition-all duration-300 bg-[#1a1a18]"
        style={{ maxHeight: expanded || !isLong ? 'none' : foldedHeight }}
      >
        {/* 每行 = 行号 + 代码，绑在一起渲染 */}
        <div className="text-[13px] leading-[1.7] font-code">
          {highlightedHtml.split('\n').map((lineHtml, i) => (
            <div key={i} className="flex">
              {/* 行号 */}
              {showLineNumbers && (
                <div className="flex-shrink-0 w-[3.5em] text-right px-3 text-paper-100/20 select-none border-r border-white/5 leading-[1.7]">
                  {i + 1}
                </div>
              )}
              {/* 代码 */}
              <div
                className="flex-1 px-5 leading-[1.7] hljs bg-transparent"
                dangerouslySetInnerHTML={{ __html: lineHtml || '&nbsp;' }}
              />
            </div>
          ))}
        </div>

        {/* 折叠遮罩 */}
        {isLong && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 pt-12 bg-gradient-to-t from-[#1a1a18] via-[#1a1a18]/90 to-transparent">
            <button
              onClick={() => setExpanded(true)}
              className="px-4 py-1 text-xs text-paper-100/70 bg-white/10 rounded-full hover:bg-white/20 transition-colors active:scale-95"
            >
              展开全部 ({lineCount} 行) ▼
            </button>
          </div>
        )}
      </div>

      {/* 收起按钮 */}
      {isLong && expanded && (
        <div className="flex justify-center bg-[#1a1a18] pb-2">
          <button
            onClick={() => setExpanded(false)}
            className="px-3 py-1 text-[11px] text-paper-100/50 hover:text-paper-100/80 transition-colors"
          >
            ▲ 收起
          </button>
        </div>
      )}
    </div>
  )
}

// ===== 图片（带说明） =====
export function BookImage({
  src,
  alt,
  caption,
  height,
}: {
  src: string
  alt: string
  caption?: string
  height?: number | string
}) {
  return (
    <figure className="my-5">
      <div className="rounded-md overflow-hidden border border-paper-300/60 bg-paper-200/40 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full rounded-sm"
          style={height ? { maxHeight: height, objectFit: 'contain' } : undefined}
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-ink-lighter text-center mt-1.5 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ===== 知识点标签网格 =====
export function TagGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1.5 bg-amber/5 text-amber-dark text-xs rounded-md text-center border border-amber/10"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

// ===== 分隔线 =====
export function BookDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <span className="h-px flex-1 bg-paper-300/60" />
      <span className="text-ink-fade text-[10px] tracking-[0.3em]">◆</span>
      <span className="h-px flex-1 bg-paper-300/60" />
    </div>
  )
}
