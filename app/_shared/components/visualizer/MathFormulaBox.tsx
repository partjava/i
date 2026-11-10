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
    return clauses.map((c) => renderLatexSafe(c, false));
  }, [detail?.latex]);

  const secondaryClausesHtml = useMemo(() => {
    if (!detail?.secondaryLatex || compact) return [];
    const clauses = splitLatexClauses(detail.secondaryLatex);
    return clauses.map((c) => renderLatexSafe(c, false));
  }, [detail?.secondaryLatex, compact]);

  if (!detail) {
    return (
      <div className="text-xs sm:text-sm font-mono text-slate-100 leading-relaxed">
        {fallbackText}
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
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sky-100 [&_.katex]:text-[16px] sm:[&_.katex]:text-[18.5px]">
          {primaryClausesHtml.map((html, idx) => (
            <span
              key={idx}
              className="inline-flex items-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
        {secondaryClausesHtml.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-indigo-200/95 [&_.katex]:text-[14px] sm:[&_.katex]:text-[15.5px]">
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
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 flex items-center gap-2 min-w-0"
              >
                <span
                  className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/30 text-sky-300 shrink-0 [&_.katex]:text-xs"
                  dangerouslySetInnerHTML={{ __html: symHtml }}
                />
                <span className="text-[11px] text-slate-300 truncate" title={item.desc}>
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 中文直觉对照描述 */}
      {fallbackText && (
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed pl-1 border-l-2 border-sky-500/40">
          {fallbackText}
        </p>
      )}
    </div>
  );
}
