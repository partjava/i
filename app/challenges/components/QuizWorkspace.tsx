'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuth } from '@shared/hooks/useAuth';
import { message } from 'antd';
import { SubtopicDetail, getDefaultDetail } from './data';
import { TheoryQuizPanel } from './TheoryQuizPanel';
import { CodeEditorPanel } from './CodeEditorPanel';
import { AiTutorPanel } from './AiTutorPanel';
import { buildChallengeContext } from './challenge-ai-context';
import { executionLabel, normalizeExecutionStatus, readExecutionResponse, ExecutionResponseError, isSubmittedSourceStale } from '@shared/components/execution-state';

import { ChallengeExecutionRequests, ChallengeExecutionMode, challengeResultLabel, shouldRecordChallengePass } from '@shared/components/challenge-execution-state';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';

interface QuizWorkspaceProps {
  selectedNodeName: string;
  initialLevelIndex?: number;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({ selectedNodeName, initialLevelIndex = 0 }) => {
  const { data: session, status } = useAuth();
  const [activeTab, setActiveTab] = useState<'theory' | 'conceptual' | 'thinking'>('theory');
  const [levels, setLevels] = useState<SubtopicDetail[]>([]);
  const [activeLevelIndex, setActiveLevelIndex] = useState<number>(0);
  const detail = levels[activeLevelIndex] || null;
  const [loading, setLoading] = useState<boolean>(true);

  // ── 代码编辑器状态 ──
  const [codeValue, setCodeValue] = useState<string>("");
  const [testResults, setTestResults] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionStatus, setExecutionStatus] = useState<string | null>(null);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [executionMode, setExecutionMode] = useState<ChallengeExecutionMode | null>(null);
  const runRequests = useRef(new ChallengeExecutionRequests());
  const currentRunContext = useRef({ node: selectedNodeName, id: detail?.id });
  currentRunContext.current = { node: selectedNodeName, id: detail?.id };
  useEffect(() => () => runRequests.current.cancel(), []);

  // ── 选择题状态 ──
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizExplains, setShowQuizExplains] = useState<Record<number, boolean>>({});

  // ── 思考题 + AI 聊天状态 ──
  const [thinkingAnswer, setThinkingAnswer] = useState<string>("");
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
    { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }
  ]);
  const [userChatInput, setUserChatInput] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const chatRequestRef = useRef<AbortController | null>(null);
  const activeDetailRef = useRef(detail);
  activeDetailRef.current = detail;
  useEffect(() => () => { chatRequestRef.current?.abort(); }, []);

  // ── 加载关卡数据 ──
  useEffect(() => {
    const request = new AbortController();
    runRequests.current.cancel();
    setIsRunning(false);
    setLevels([]);
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}`, { signal: request.signal });
        const data = await res.json();
        if (request.signal.aborted) return;
        if (res.ok && data.success && data.levels?.length > 0) {
          setLevels(data.levels);
          setActiveLevelIndex(Math.min(initialLevelIndex, data.levels.length - 1));
        } else {
          setLevels([getDefaultDetail(selectedNodeName)]);
          setActiveLevelIndex(0);
        }
      } catch {
        if (request.signal.aborted) return;
        setLevels([getDefaultDetail(selectedNodeName)]);
        setActiveLevelIndex(0);
      } finally { if (!request.signal.aborted) setLoading(false); }
    };
    void fetchDetail();
    return () => request.abort();
  }, [selectedNodeName]);

  // ── 数据加载完成或切换关卡时重置状态 ──
  useEffect(() => {
    chatRequestRef.current?.abort();
    chatRequestRef.current = null;
    setAiLoading(false);
    setUserChatInput('');
    runRequests.current.cancel();
    setIsRunning(false);
    setSubmittedCode(null);
    setExecutionStatus(null);
    setExecutionMode(null);
    if (!detail) return;
    setCodeValue(detail.starterCode);
    setTestResults("");
    setSelectedQuizAnswers({});
    setShowQuizExplains({});
    setThinkingAnswer("");
    setAiChatMessages([{ sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }]);
    if (detail.userRecord) {
      const r = detail.userRecord;
      if (r.codePassed) setTestResults("历史记录：该关卡曾通过评测。当前编辑器代码尚未运行。");
      if (r.quizAnswers) { setSelectedQuizAnswers(r.quizAnswers); const e: Record<number, boolean> = {}; Object.keys(r.quizAnswers).forEach((k: any) => { e[k] = true; }); setShowQuizExplains(e); }
      if (r.thinkingFeedback) setAiChatMessages([{ sender: 'ai', text: '你好！我是你的星际 AI 助教。' }, { sender: 'ai', text: r.thinkingFeedback }]);
    }
    // Updating a run record must not reset the student's edited code or conversation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeName, detail?.id]);

  // ── 运行代码 ──
  const handleCancelRun = () => {
    runRequests.current.cancel();
    setIsRunning(false);
    setExecutionStatus('CANCELLED');
    setTestResults(executionLabel('CANCELLED'));
  };
  const handleRunCode = async (code: string, mode: ChallengeExecutionMode) => {
    if (!detail || loading) return;
    const execution = runRequests.current.beginChallenge(code, detail.id, mode);
    if (!execution) return;
    const request = execution.controller;
    const challengeId = detail.id;
    const node = selectedNodeName;
    const isCurrent = () => runRequests.current.isCurrent(request)
      && currentRunContext.current.id === challengeId && currentRunContext.current.node === node;
    setSubmittedCode(code);
    setExecutionMode(execution.mode);
    setExecutionStatus(null);
    setIsRunning(true);
    setTestResults(execution.mode === 'sample' ? "正在运行公开样例（不计通关）...\n" : "正在提交完整判题，请稍候...\n");
    const timeout = setTimeout(() => {
      if (!isCurrent()) return;
      runRequests.current.cancel();
      setIsRunning(false);
      setExecutionStatus('REQUEST_TIMEOUT');
      setTestResults('等待结果超时，服务端任务可能仍在运行。');
    }, execution.waitTimeoutMs);
    try {
      const res = await fetch(execution.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }), signal: request.signal,
      });
      const data = await readExecutionResponse(res);
      if (!isCurrent()) return;
      if (res.ok && data.success === true && data.data) {
        const result = data.data;
        const resultStatus = normalizeExecutionStatus(result.status);
        setExecutionStatus(resultStatus);
        setTestResults(`[评测结果] ${challengeResultLabel(execution.mode, resultStatus)}\n耗时: ${result.runtimeMs ?? '未知'}ms\n${'-'.repeat(36)}\n${result.message || ''}`);
        if (status === 'authenticated' && shouldRecordChallengePass(execution.mode, resultStatus)) {
          setLevels(prev => prev.map(level => level.id === challengeId
            ? { ...level, userRecord: { ...level.userRecord, codePassed: true } } : level));
          emitPetCompanionEvent({
            type: 'celebrate',
            title: '关卡评测全部通过！',
            message: `太棒了喵！关卡「${detail.levelTitle || detail.name || selectedNodeName}」完整通过测试！已为你点亮星空成就！`,
            mood: 'happy',
            speak: true,
          });
        } else if (resultStatus !== 'ACCEPTED' && resultStatus !== 'EXECUTED' && resultStatus !== 'CANCELLED') {
          emitPetCompanionEvent({
            type: 'error_diagnosis',
            title: '禾桔发现报错喵~',
            message: `别灰心！「${challengeResultLabel(execution.mode, resultStatus)}」已捕获，点击控制台的「✨ 禾桔诊断修复」查看一键修复补丁吧！`,
            promptToAsk: `我在关卡【${detail.levelTitle || detail.name || selectedNodeName}】遇到报错：${challengeResultLabel(execution.mode, resultStatus)}，请给我一些思路提示`,
            mood: 'curious',
          });
        }
      } else {
        const failureStatus = normalizeExecutionStatus(data.data?.status || data.status);
        setExecutionStatus(failureStatus === 'ACCEPTED' || failureStatus === 'EXECUTED' ? 'SYSTEM_ERROR' : failureStatus);
        setTestResults(`[请求失败] ${data.message || `HTTP ${res.status}: 未收到有效评测结果`}`);
      }
    } catch (error) {
      if (isCurrent()) {
        setExecutionStatus(error instanceof ExecutionResponseError ? error.status : 'NETWORK_ERROR');
        setTestResults(`[网络或响应错误] ${error instanceof Error ? error.message : '未收到有效评测结果'}`);
      }
    } finally {
      clearTimeout(timeout);
      if (isCurrent()) {
        runRequests.current.finish(request);
        setIsRunning(false);
      }
    }
  };

  // ── 选择题 ──
  const handleSelectQuiz = async (qIdx: number, oIdx: number) => {
    if (!detail) return;
    const newAns = { ...selectedQuizAnswers, [qIdx]: oIdx };
    setSelectedQuizAnswers(newAns);
    setShowQuizExplains(prev => ({ ...prev, [qIdx]: true }));
    if (status === 'authenticated') {
      try {
        await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}/submit-quiz`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers: newAns, challengeId: detail.id }),
        });
      } catch {}
    }
  };

  // ── 思考题评分 ──
  const handleSubmitThinking = async () => {
    if (!thinkingAnswer.trim() || !detail) return;
    setAiLoading(true);
    setAiChatMessages(prev => [...prev, { sender: 'user', text: `思考题回答：\n${thinkingAnswer}` }]);
    try {
      if (status === 'authenticated') {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}/submit-thinking`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: thinkingAnswer, challengeId: detail.id }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || '评分失败，本次未记录成绩');
        setAiChatMessages(prev => [...prev, { sender: 'ai', text: `评分：${data.score}/10\n${data.feedback}` }]);
      } else {
        setAiChatMessages(prev => [...prev, { sender: 'ai', text: '游客模式，评分未保存。请登录后使用。' }]);
      }
    } catch (error) { message.error(error instanceof Error ? error.message : '评分失败，本次未记录成绩，请重试'); }
    finally { setAiLoading(false); }
  };

  // ── AI 聊天 ──
  const handleSendChat = async () => {
    if (!userChatInput.trim() || !detail || aiLoading || chatRequestRef.current) return;
    const text = userChatInput.trim();
    const request = new AbortController();
    chatRequestRef.current = request;
    const requestDetailId = detail.id;
    const history = aiChatMessages.filter((_, index) => index > 0).slice(-8)
      .map(item => ({ role: item.sender === 'user' ? 'user' : 'assistant', content: item.text }));
    const pageContext = buildChallengeContext({
      detail, nodeName: selectedNodeName, activeTab, code: codeValue,
      testResults, thinkingAnswer, selectedAnswers: selectedQuizAnswers,
    });
    setUserChatInput('');
    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: request.signal,
        body: JSON.stringify({
          message: `请结合当前挑战题目辅导我，优先解释思路并给逐步提示；除非我明确要求完整解答，否则不要直接给标准答案。代码请用代码块展示。\n\n我的问题：${text}`,
          pageContext, history,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error('AI 请求失败');
      if (!request.signal.aborted && activeDetailRef.current?.id === requestDetailId) {
        setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'AI 未返回有效回复，请重试。' }]);
      }
    } catch {
      if (!request.signal.aborted && activeDetailRef.current?.id === requestDetailId) {
        setAiChatMessages(prev => [...prev, { sender: 'ai', text: 'AI 服务连接失败，请稍后再试。' }]);
      }
    } finally {
      if (chatRequestRef.current === request) {
        chatRequestRef.current = null;
        setAiLoading(false);
      }
    }
  };

  if (loading) return <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 text-indigo-400 gap-3"><Loader className="w-8 h-8 animate-spin" /><span className="text-xs font-medium tracking-widest font-mono">LOADING STAR DATA...</span></div>;
  if (!detail) return null;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col overflow-hidden z-10">

      {/* 顶部关卡选择器 */}
      <div className="bg-slate-950 border-b border-slate-900 px-6 py-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold text-white tracking-wider">当前的闯关进度：</span>
          <div className="flex items-center gap-2">
            {levels.map((lvl, i) => (
              <button key={i} onClick={() => { if (i !== activeLevelIndex) { runRequests.current.cancel(); setIsRunning(false); setActiveLevelIndex(i); } }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition flex items-center gap-1.5 border ${i === activeLevelIndex ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"}`}>
                ⭐ 第 {lvl.levelIndex} 关：{lvl.levelTitle}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{selectedNodeName} // STAGE {levels[0]?.stageId}</div>
      </div>

      {/* 三栏布局 */}
      <div className="flex-1 flex overflow-hidden">
        <TheoryQuizPanel
          activeTab={activeTab} onTabChange={setActiveTab} detail={detail}
          isAuthenticated={status === 'authenticated'}
          selectedQuizAnswers={selectedQuizAnswers} showQuizExplains={showQuizExplains}
          onSelectQuiz={handleSelectQuiz}
          thinkingAnswer={thinkingAnswer} onThinkingChange={setThinkingAnswer}
          onSubmitThinking={handleSubmitThinking} aiLoading={aiLoading}
        />
        <CodeEditorPanel
          codeValue={codeValue} onCodeChange={setCodeValue}
          testResults={testResults} isRunning={isRunning} executionStatus={executionStatus} executionMode={executionMode}
          resultIsStale={isSubmittedSourceStale(submittedCode === null ? null : { code: submittedCode }, { code: codeValue })} onCancelRun={handleCancelRun}
          canSubmit={!loading && Boolean(detail.id)} solutionCode={detail?.solutionCode}
          challengeId={detail?.id} onRunCode={handleRunCode}
        />
        <AiTutorPanel
          messages={aiChatMessages} loading={aiLoading}
          inputValue={userChatInput} onInputChange={setUserChatInput}
          onSend={handleSendChat}
        />
      </div>
    </motion.div>
  );
};
