'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Terminal, Code, HelpCircle, Sparkles, Loader2, Wrench, History, RotateCcw, Clock, CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';
import { message } from 'antd';
import { ChallengeExecutionMode, challengeResultLabel, shouldRecordChallengePass } from '@shared/components/challenge-execution-state';
import InlineCodePatchModal, { CodePatchData } from '@shared/components/InlineCodePatchModal';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';
import { getAuthHeaders } from '@shared/lib/auth-client';

interface SubmissionItem {
  id: number;
  challengeId: number;
  code: string;
  language: string;
  status: string;
  executionTime?: number;
  errorMessage?: string;
  submittedAt: string;
}

interface CodeEditorPanelProps {
  codeValue: string;
  onCodeChange: (val: string) => void;
  testResults: string;
  isRunning: boolean;
  executionStatus: string | null;
  executionMode: ChallengeExecutionMode | null;
  resultIsStale: boolean;
  onCancelRun: () => void;
  canSubmit: boolean;
  solutionCode?: string;
  starterCode?: string;
  challengeId: string;
  onRunCode: (code: string, mode: ChallengeExecutionMode) => void;
}

export function CodeEditorPanel({
  codeValue, onCodeChange, testResults, isRunning, executionStatus, executionMode, resultIsStale, onCancelRun,
  canSubmit, solutionCode, starterCode, challengeId, onRunCode
}: CodeEditorPanelProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionItem | null>(null);
  const [patchLoading, setPatchLoading] = useState(false);
  const [patchData, setPatchData] = useState<CodePatchData | null>(null);
  const [showPatchModal, setShowPatchModal] = useState(false);

  useEffect(() => {
    setShowSolution(false);
    setShowPatchModal(false);
    setShowHistory(false);
    setSelectedSubmission(null);
    setPatchData(null);
  }, [challengeId]);

  const loadSubmissions = async () => {
    if (!challengeId) return;
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/challenges/${challengeId}/submissions`, {
        headers: { ...getAuthHeaders() },
      });
      const json = await res.json();
      if (json?.success && Array.isArray(json.data)) {
        setSubmissions(json.data);
        if (json.data.length > 0) {
          setSelectedSubmission(json.data[0]);
        } else {
          setSelectedSubmission(null);
        }
      } else {
        setSubmissions([]);
        setSelectedSubmission(null);
      }
    } catch {
      message.error('获取历史提交记录失败');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleOpenHistory = () => {
    setShowHistory(true);
    void loadSubmissions();
  };

  const handleRestoreCode = (codeToRestore: string) => {
    onCodeChange(codeToRestore);
    if (challengeId) {
      try {
        localStorage.setItem(`challenge_code_${challengeId}`, codeToRestore);
      } catch {}
    }
    setShowHistory(false);
    message.success('已将历史提交代码载入编辑器！');
  };

  const handleResetStarter = () => {
    if (!starterCode) return;
    if (window.confirm('确定要重置为初始代码模板吗？当前编辑器中的修改将被覆盖。')) {
      onCodeChange(starterCode);
      if (challengeId) {
        try {
          localStorage.removeItem(`challenge_code_${challengeId}`);
        } catch {}
      }
      message.info('已恢复初始代码模板');
    }
  };

  const handleRequestPatch = async () => {
    if (patchLoading || !codeValue.trim()) return;
    setPatchLoading(true);
    try {
      const res = await fetch('/api/ai/code-patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeValue,
          language: 'python',
          errorOutput: testResults,
          solutionCode: solutionCode || '',
        }),
      });
      const json = await res.json();
      if (json?.success && json.data) {
        setPatchData(json.data);
        setShowPatchModal(true);
      } else {
        message.warning('未能生成修复补丁，请稍后重试');
      }
    } catch {
      message.error('请求修复服务失败');
    } finally {
      setPatchLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#030308]">
      {/* 工具栏 */}
      <div className="min-h-11 border-b border-slate-900 bg-slate-950/80 px-4 py-2 flex flex-wrap gap-2 justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold font-mono text-slate-300">Solution.py</span>
        </div>
        <div className="flex items-center gap-2">
          {starterCode && (
            <button
              onClick={handleResetStarter}
              title="重置为初始代码模板"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition flex items-center gap-1 border border-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> 重置
            </button>
          )}
          <button
            onClick={handleOpenHistory}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-amber-400 hover:text-amber-300 transition flex items-center gap-1 border border-slate-800"
            title="查看往期提交代码与判题结果"
          >
            <History className="w-3.5 h-3.5 text-amber-400" /> 历史提交
          </button>
          {solutionCode && (
            <button
              onClick={() => setShowSolution(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1 border border-slate-800"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> 查看标准答案
            </button>
          )}
          {isRunning && <button onClick={onCancelRun} className="text-xs text-slate-400 hover:text-white">停止等待</button>}
          <button
            onClick={() => { if (canSubmit && !isRunning && codeValue.trim()) onRunCode(codeValue, 'sample'); }}
            disabled={isRunning || !canSubmit || !codeValue.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-100 bg-cyan-950 hover:bg-cyan-900 disabled:opacity-50 transition flex items-center gap-1 border border-cyan-800"
          >
            <Play className="w-3 h-3 fill-current" /> {isRunning && executionMode === 'sample' ? "样例运行中..." : "运行样例"}
          </button>
          <button
            onClick={() => { if (canSubmit && !isRunning && codeValue.trim()) onRunCode(codeValue, 'submit'); }}
            disabled={isRunning || !canSubmit || !codeValue.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition flex items-center gap-1 shadow-lg shadow-emerald-600/20"
          >
            {isRunning && executionMode === 'submit' ? "正在判题..." : "提交判题"}
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
          <div className="flex items-center gap-2">
            {/* 当运行出错或未通过时，浮现一键诊断修复按钮 */}
            {testResults && (
              <button
                type="button"
                onClick={handleRequestPatch}
                disabled={patchLoading}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 transition flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
                title="让 3D 灵宠禾桔根据报错信息生成修复补丁与红绿 Diff 对比"
              >
                {patchLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{patchLoading ? '诊断中...' : '✨ 禾桔诊断修复'}</span>
              </button>
            )}
            {executionStatus !== null && (
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className={`px-2 py-0.5 rounded border ${!resultIsStale && executionMode !== null && shouldRecordChallengePass(executionMode, executionStatus) ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' : 'bg-slate-900 border-slate-700 text-amber-400'}`}>
                  {resultIsStale ? '上次结果：' : ''}{challengeResultLabel(executionMode || 'sample', executionStatus)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-[#04040a] text-slate-400 whitespace-pre-wrap leading-relaxed select-text">
          <div className="text-slate-500 mb-2">运行样例仅检查前 1–2 个公开样例，不计通关；提交判题检查完整用例，登录后通过可记录通关。</div>
          {resultIsStale && <div className="text-amber-400 mb-2">代码已更改，以下结果属于上次提交，请重新运行。</div>}
          {testResults || "尚未运行代码。可先点击「运行样例」验证，再「提交判题」。"}
        </div>
      </div>

      {/* 历史提交记录弹窗 */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
            {/* Header */}
            <div className="h-12 border-b border-slate-800 bg-slate-950/80 px-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-slate-200">提交历史记录</span>
                <span className="text-xs text-slate-500">
                  {historyLoading ? '加载中...' : `(共 ${submissions.length} 次)`}
                </span>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {historyLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                  <span>正在获取历史提交记录...</span>
                </div>
              ) : submissions.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs">
                  <History className="w-12 h-12 text-slate-700" />
                  <span>暂无提交记录</span>
                  <span className="text-slate-600 text-[11px]">点击编辑器上方的「提交判题」，每次提交都会自动保存代码与判题结果。</span>
                </div>
              ) : (
                <>
                  {/* Left Column: Submissions List */}
                  <div className="w-80 border-r border-slate-800 overflow-y-auto bg-slate-950/50 p-3 space-y-2 shrink-0">
                    {submissions.map((sub, idx) => {
                      const isSelected = selectedSubmission?.id === sub.id;
                      const isAccepted = sub.status === 'ACCEPTED';
                      const isFailed = sub.status === 'WRONG_ANSWER' || sub.status === 'RUNTIME_ERROR';
                      const formattedTime = sub.submittedAt ? sub.submittedAt.replace('T', ' ').substring(0, 19) : '--';

                      return (
                        <div
                          key={sub.id || idx}
                          onClick={() => setSelectedSubmission(sub)}
                          className={`p-3 rounded-lg border cursor-pointer transition flex flex-col gap-1.5 ${
                            isSelected
                              ? 'bg-slate-850 border-cyan-500/50 shadow-md'
                              : 'bg-slate-900/40 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                isAccepted
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                                  : isFailed
                                  ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                                  : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {sub.status || 'SUBMITTED'}
                            </span>
                            {sub.executionTime !== undefined && (
                              <span className="text-[11px] font-mono text-slate-400">
                                {sub.executionTime}ms
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{formattedTime}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Code Preview & Action */}
                  <div className="flex-1 flex flex-col overflow-hidden bg-[#030308]">
                    {selectedSubmission ? (
                      <>
                        <div className="h-10 border-b border-slate-800 bg-slate-950/60 px-4 flex justify-between items-center shrink-0">
                          <span className="text-xs text-slate-400 font-mono">
                            提交 ID: #{selectedSubmission.id} · {selectedSubmission.status}
                          </span>
                          <button
                            onClick={() => handleRestoreCode(selectedSubmission.code)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition flex items-center gap-1 shadow-md shadow-emerald-600/20"
                          >
                            <RotateCcw className="w-3 h-3" /> 还原到编辑器
                          </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all bg-[#04040a]">
                          {selectedSubmission.code}
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-xs text-slate-500">
                        请选择左侧提交记录以查看代码
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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

      {/* 禾桔 AI 诊断与热修复补丁弹窗 */}
      <InlineCodePatchModal
        open={showPatchModal}
        onClose={() => setShowPatchModal(false)}
        originalCode={codeValue}
        patch={patchData}
        language="python"
        onApplyPatch={(fixedCode) => {
          onCodeChange(fixedCode);
        }}
      />
    </div>
  );
}
