'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { ALGORITHM_LATEX_MAP } from './codeTraceMap';

interface MathFormulaBoxProps {
  algorithmId: string;
  fallbackText?: string;
  compact?: boolean;
}

function renderLatexSafe(latex: string, displayMode = true): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: 'ignore',
      trust: true,
    });
  } catch {
    return `<span class="font-mono text-xs text-sky-300">${latex}</span>`;
  }
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatPlainMathText(segment: string): string {
  let html = escapeHtml(segment.replace(/\\\$/g, '$'));
  html = html.replace(/\\;/g, '&ensp;');
  html = html.replace(
    /_\{([^{}]+)\}/g,
    '<sub class="font-mono text-[0.82em] text-sky-200/90">$1</sub>'
  );
  html = html.replace(
    /\^\{([^{}]+)\}/g,
    '<sup class="font-mono text-[0.82em] text-sky-200/90">$1</sup>'
  );
  html = html.replace(
    /([A-Za-z\u0370-\u03FF0-9\)\]])\^\(([^()\n]+)\)/g,
    '$1<sup class="font-mono text-[0.82em] text-sky-200/90">$2</sup>'
  );
  html = html.replace(
    /(^|[^A-Za-z0-9_])([A-Za-z\u0370-\u03FF\)\]]\u0302?\u0303?)_([A-Za-z0-9\u0370-\u03FF\u4e00-\u9fa5\+\-\']{1,5})(?![A-Za-z0-9_])/g,
    '$1$2<sub class="font-mono text-[0.82em] text-sky-200/90">$3</sub>'
  );
  html = html.replace(
    /(^|[^A-Za-z0-9_])(weight|value)_([ijknt0-9])(?![A-Za-z0-9_])/g,
    '$1$2<sub class="font-mono text-[0.82em] text-sky-200/90">$3</sub>'
  );
  html = html.replace(
    /([A-Za-z\u0370-\u03FF0-9\)\]])\^([A-Za-z0-9\+\-\.\/]+)/g,
    '$1<sup class="font-mono text-[0.82em] text-sky-200/90">$2</sup>'
  );
  return html;
}

function findClosingDollar(text: string, start: number): number {
  for (let i = start; i < text.length; i += 1) {
    if (text[i] === '\n') return -1;
    if (text[i] === '$' && text[i - 1] !== '\\') {
      return i;
    }
  }
  return -1;
}

/**
 * 将混合了 $...$ 行内 LaTeX 与上下标记号（_{...} / ^{...} / a_i / n^k）的中文说明渲染为高清 HTML
 */
export function renderMixedMathHtml(text: string): string {
  if (!text) return '';
  let out = '';
  let i = 0;
  let plainStart = 0;

  while (i < text.length) {
    if (text[i] === '$' && (i === 0 || text[i - 1] !== '\\')) {
      const end = findClosingDollar(text, i + 1);
      if (end !== -1) {
        if (i > plainStart) {
          out += formatPlainMathText(text.slice(plainStart, i));
        }
        const mathExpr = text.slice(i + 1, end).trim();
        if (mathExpr) {
          out += renderLatexSafe(mathExpr, false);
        }
        i = end + 1;
        plainStart = i;
        continue;
      }
    }
    i += 1;
  }

  if (plainStart < text.length) {
    out += formatPlainMathText(text.slice(plainStart));
  }
  return out;
}

export function MixedMathText({
  text,
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  const html = useMemo(() => (text ? renderMixedMathHtml(text) : ''), [text]);
  if (!text) return null;
  return (
    <span
      className={`[&_.katex]:text-[1.04em] [&_.katex]:text-sky-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function splitLatexClauses(latex: string): string[] {
  if (!latex) return [];
  // 若包含多行矩阵/分段函数环境，保持整体渲染不拆分
  if (latex.includes('\\begin{')) {
    return [latex];
  }
  return latex
    .split(/,\s*\\q?quad\s*|;\s*\\q?quad\s*|\\qquad\s*/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function MathFormulaBox({
  algorithmId,
  fallbackText,
  compact = false,
}: MathFormulaBoxProps) {
  const detail = ALGORITHM_LATEX_MAP[algorithmId];

  const primaryClausesHtml = useMemo(() => {
    if (!detail?.latex) return [];
    const clauses = splitLatexClauses(detail.latex);
    return clauses.map((c) => {
      const expr =
        !compact && !c.startsWith('\\displaystyle') && !c.startsWith('\\begin{')
          ? `\\displaystyle ${c}`
          : c;
      return renderLatexSafe(expr, false);
    });
  }, [detail?.latex, compact]);

  const secondaryClausesHtml = useMemo(() => {
    if (!detail?.secondaryLatex || compact) return [];
    const clauses = splitLatexClauses(detail.secondaryLatex);
    return clauses.map((c) => {
      const expr =
        !c.startsWith('\\displaystyle') && !c.startsWith('\\begin{')
          ? `\\displaystyle ${c}`
          : c;
      return renderLatexSafe(expr, false);
    });
  }, [detail?.secondaryLatex, compact]);

  if (!detail) {
    return (
      <div className="text-xs sm:text-sm text-slate-100 leading-relaxed">
        <MixedMathText text={fallbackText} />
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sky-100 overflow-hidden py-1 [&_.katex]:text-[15px] sm:[&_.katex]:text-[16.5px]">
        {primaryClausesHtml.map((html, idx) => (
          <span
            key={idx}
            className="inline-flex items-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 主核心数学方程（KaTeX 高清大字号自适应折行公式块，零滚动条） */}
      <div className="px-4 py-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 shadow-inner overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sky-100 [&_.katex]:text-[16px] sm:[&_.katex]:text-[18.5px]">
          {primaryClausesHtml.map((html, idx) => (
            <span
              key={idx}
              className="inline-flex items-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
        {secondaryClausesHtml.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-indigo-200/95 [&_.katex]:text-[14.5px] sm:[&_.katex]:text-[16px]">
            {secondaryClausesHtml.map((html, idx) => (
              <span
                key={idx}
                className="inline-flex items-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 数学符号逐项释义胶囊 */}
      {detail.symbols && detail.symbols.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {detail.symbols.map((item, idx) => {
            const symHtml = renderLatexSafe(item.sym, false);
            return (
              <div
                key={idx}
                className="px-2.5 py-2 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-2 min-w-0"
              >
                <span
                  className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30 text-sky-300 shrink-0 [&_.katex]:text-xs"
                  dangerouslySetInnerHTML={{ __html: symHtml }}
                />
                <span className="text-[11px] text-slate-200 leading-snug break-words" title={item.desc}>
                  <MixedMathText text={item.desc} />
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 中文直觉对照描述 */}
      {fallbackText && (
        <p className="text-xs text-slate-300 leading-relaxed pl-2.5 border-l-2 border-sky-500/40">
          <MixedMathText text={fallbackText} />
        </p>
      )}
    </div>
  );
}
