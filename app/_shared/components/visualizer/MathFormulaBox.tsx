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

export default function MathFormulaBox({
  algorithmId,
  fallbackText,
  compact = false,
}: MathFormulaBoxProps) {
  const detail = ALGORITHM_LATEX_MAP[algorithmId];

  const primaryHtml = useMemo(() => {
    if (!detail?.latex) return '';
    return renderLatexSafe(detail.latex, !compact);
  }, [detail?.latex, compact]);

  const secondaryHtml = useMemo(() => {
    if (!detail?.secondaryLatex || compact) return '';
    return renderLatexSafe(detail.secondaryLatex, false);
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
      <div
        className="text-sky-200 overflow-x-auto max-w-full py-0.5 [&_.katex]:text-[12px] sm:[&_.katex]:text-[13px]"
        dangerouslySetInnerHTML={{ __html: primaryHtml }}
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* 主核心数学方程（KaTeX 高清独立公式块） */}
      <div className="px-3.5 py-3 rounded-xl bg-slate-900/90 border border-sky-500/30 shadow-inner overflow-x-auto custom-scrollbar">
        <div
          className="text-sky-100 text-center [&_.katex-display]:my-1 [&_.katex]:text-sm sm:[&_.katex]:text-base"
          dangerouslySetInnerHTML={{ __html: primaryHtml }}
        />
        {secondaryHtml && (
          <div className="mt-2 pt-2 border-t border-white/10 text-center">
            <div
              className="text-indigo-200/95 [&_.katex]:text-xs sm:[&_.katex]:text-[13px]"
              dangerouslySetInnerHTML={{ __html: secondaryHtml }}
            />
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
