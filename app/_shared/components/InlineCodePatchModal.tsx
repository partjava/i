'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, X, AlertTriangle, Bug } from 'lucide-react';
import { message } from 'antd';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';

export interface CodePatchData {
  rootCause: string;
  explanation: string;
  fixedCode: string;
  errorLine?: number;
  source: 'ai' | 'heuristic';
}

interface InlineCodePatchModalProps {
  open: boolean;
  onClose: () => void;
  originalCode: string;
  patch: CodePatchData | null;
  language: string;
  onApplyPatch: (newCode: string) => void;
}

export default function InlineCodePatchModal({
  open,
  onClose,
  originalCode,
  patch,
  language,
  onApplyPatch,
}: InlineCodePatchModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open || !patch) return null;

  const originalLines = originalCode.split('\n');
  const fixedLines = patch.fixedCode.split('\n');

  // 计算简单的逐行差异用于高亮
  const maxLineCount = Math.max(originalLines.length, fixedLines.length);

  const handleApply = () => {
    onApplyPatch(patch.fixedCode);
    message.success('已采纳修复补丁并更新编辑器代码！');
    emitPetCompanionEvent({
      type: 'celebrate',
      title: '已采纳修复补丁',
      message: '已为你自动应用了修复代码喵！点击「运行」试试看能不能顺利通过吧~',
      mood: 'happy',
    });
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(patch.fixedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* 顶部标题栏 */}
        <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>禾桔 AI 诊断与热修复补丁</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                    patch.source === 'ai'
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {patch.source === 'ai' ? 'DeepSeek 智能诊断' : '规则快速诊断'}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {patch.errorLine ? `定位异常行：第 ${patch.errorLine} 行` : '已完成代码语义异常定位'}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 诊断根因卡片 */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800/60 shrink-0">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
              <Bug className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-rose-300 mb-1">
                报错根因：{patch.rootCause}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-black/30 p-2.5 rounded-xl border border-slate-800/80">
                {patch.explanation}
              </div>
            </div>
          </div>
        </div>

        {/* 红绿代码 Diff 对比区 */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-[#060810]">
          {/* 左侧：原代码（红标） */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="px-4 py-2 bg-rose-950/20 border-b border-rose-900/30 text-xs font-semibold text-rose-300 flex items-center justify-between">
              <span>🔴 原始代码 (修复前)</span>
              <span className="text-[11px] text-rose-400/70 font-mono">{originalLines.length} 行</span>
            </div>
            <div className="flex-1 p-3 overflow-auto font-mono text-xs text-slate-300 select-text bg-[#030408]">
              {originalLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isErrLine = patch.errorLine === lineNum;
                const fixedLine = fixedLines[idx];
                const isChanged = fixedLine !== undefined && fixedLine !== line;
                return (
                  <div
                    key={idx}
                    className={`flex items-start leading-5 px-1.5 rounded transition-colors ${
                      isErrLine
                        ? 'bg-rose-950/60 text-rose-200 border-l-2 border-rose-500'
                        : isChanged
                          ? 'bg-rose-950/30 text-rose-300'
                          : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="w-8 shrink-0 text-slate-600 select-none text-[11px] font-mono text-right pr-2">
                      {lineNum}
                    </span>
                    <span className="whitespace-pre overflow-x-auto">{line || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧：修复后代码（绿标） */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="px-4 py-2 bg-emerald-950/20 border-b border-emerald-900/30 text-xs font-semibold text-emerald-300 flex items-center justify-between">
              <span>🟢 建议修复后代码 (补丁)</span>
              <span className="text-[11px] text-emerald-400/70 font-mono">{fixedLines.length} 行</span>
            </div>
            <div className="flex-1 p-3 overflow-auto font-mono text-xs text-slate-200 select-text bg-[#030408]">
              {fixedLines.map((line, idx) => {
                const lineNum = idx + 1;
                const origLine = originalLines[idx];
                const isChanged = origLine !== undefined && origLine !== line;
                return (
                  <div
                    key={idx}
                    className={`flex items-start leading-5 px-1.5 rounded transition-colors ${
                      isChanged
                        ? 'bg-emerald-950/50 text-emerald-200 border-l-2 border-emerald-500'
                        : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <span className="w-8 shrink-0 text-slate-600 select-none text-[11px] font-mono text-right pr-2">
                      {lineNum}
                    </span>
                    <span className="whitespace-pre overflow-x-auto">{line || ' '}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>采纳后将自动覆盖编辑器代码，你可以继续微调并重新提交。</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold transition"
            >
              {copied ? '✓ 已复制' : '复制修复代码'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
            >
              暂不采纳
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/25 hover:scale-105"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>一键采纳修复</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
