'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Terminal, Code, HelpCircle, Sparkles } from 'lucide-react';
import { message } from 'antd';

interface CodeEditorPanelProps {
  codeValue: string;
  onCodeChange: (val: string) => void;
  testResults: string;
  isRunning: boolean;
  isPassed: boolean | null;
  canSubmit: boolean;
  solutionCode?: string;
  challengeId: string;
  onRunCode: (code: string) => void;
}

export function CodeEditorPanel({
  codeValue, onCodeChange, testResults, isRunning, isPassed,
  canSubmit, solutionCode, challengeId, onRunCode
}: CodeEditorPanelProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#030308]">
      {/* 工具栏 */}
      <div className="h-11 border-b border-slate-900 bg-slate-950/80 px-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold font-mono text-slate-300">Solution.py</span>
        </div>
        <div className="flex items-center gap-3">
          {solutionCode && (
            <button
              onClick={() => setShowSolution(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1 border border-slate-800"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> 查看标准答案
            </button>
          )}
          <button
            onClick={() => onRunCode(codeValue)}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-1 shadow-lg shadow-emerald-600/20"
          >
            <Play className="w-3 h-3 fill-current" /> {isRunning ? "正在运行..." : "运行代码"}
          </button>
        </div>
      </div>

      {/* 编辑器 */}
      <div className="flex-1 relative overflow-hidden bg-[#030308]">
        <Editor
          height="100%" defaultLanguage="python" theme="vs-dark"
          value={codeValue} onChange={(val) => onCodeChange(val || "")}
          options={{ fontSize: 13, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true, cursorBlinking: "smooth", padding: { top: 16 } }}
        />
      </div>

      {/* 控制台输出 */}
      <div className="h-[220px] border-t border-slate-900 bg-slate-950 flex flex-col overflow-hidden shrink-0">
        <div className="h-9 border-b border-slate-900/60 bg-slate-950 px-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>控制台输出 (Console Output)</span>
          </div>
          {isPassed !== null && (
            <div className="flex items-center gap-1.5 text-xs font-bold">
              {isPassed ? (
                <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">Accepted 通过</span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-red-950/40 border border-red-500/20 text-red-400">Wrong Answer 未通过</span>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-[#04040a] text-slate-400 whitespace-pre-wrap leading-relaxed select-text">
          {testResults || "尚未运行代码。请在上方补全 Python 代码，点击「运行代码」进行断言校验。"}
        </div>
      </div>

      {/* 标准答案弹窗 */}
      {showSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="h-12 border-b border-slate-800 bg-slate-950/80 px-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-slate-200">标准参考答案</span>
              </div>
              <button onClick={() => setShowSolution(false)} className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-700 transition">关闭</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm bg-slate-950/50">
              <pre className="text-emerald-400 whitespace-pre-wrap select-all bg-slate-950 p-4 rounded-lg border border-slate-900 leading-relaxed">
                {solutionCode || "# 暂无标准答案"}
              </pre>
            </div>
            <div className="h-14 border-t border-slate-800 bg-slate-950/80 px-6 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">双击/拖动选中复制代码</span>
              <button onClick={() => { onCodeChange(solutionCode || ""); setShowSolution(false); message.success("已将标准答案载入编辑器！"); }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-xs font-bold text-white transition">直接填入编辑器</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
