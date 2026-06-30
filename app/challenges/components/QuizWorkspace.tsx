'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuth } from '@shared/hooks/useAuth';
import { message } from 'antd';
import { SubtopicDetail, getDefaultDetail } from './data';
import { TheoryQuizPanel } from './TheoryQuizPanel';
import { CodeEditorPanel } from './CodeEditorPanel';
import { AiTutorPanel } from './AiTutorPanel';

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
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

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

  // ── 加载关卡数据 ──
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}`);
        const data = await res.json();
        if (data.success && data.levels?.length > 0) {
          setLevels(data.levels);
          setActiveLevelIndex(Math.min(initialLevelIndex, data.levels.length - 1));
        } else {
          setLevels([getDefaultDetail(selectedNodeName)]);
          setActiveLevelIndex(0);
        }
      } catch {
        setLevels([getDefaultDetail(selectedNodeName)]);
        setActiveLevelIndex(0);
      } finally { setLoading(false); }
    };
    fetchDetail();
  }, [selectedNodeName]);

  // ── 数据加载完成或切换关卡时重置状态 ──
  useEffect(() => {
    if (!detail) return;
    setCodeValue(detail.starterCode);
    setTestResults("");
    setIsPassed(null);
    setSelectedQuizAnswers({});
    setShowQuizExplains({});
    setThinkingAnswer("");
    setAiChatMessages([{ sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }]);
    if (detail.userRecord) {
      const r = detail.userRecord;
      if (r.codePassed) setIsPassed(true);
      if (r.quizAnswers) { setSelectedQuizAnswers(r.quizAnswers); const e: Record<number, boolean> = {}; Object.keys(r.quizAnswers).forEach((k: any) => { e[k] = true; }); setShowQuizExplains(e); }
      if (r.thinkingFeedback) setAiChatMessages([{ sender: 'ai', text: '你好！我是你的星际 AI 助教。' }, { sender: 'ai', text: r.thinkingFeedback }]);
    }
  }, [activeLevelIndex, levels]);

  // ── 运行代码 ──
  const handleRunCode = async (code: string) => {
    if (!detail) return;
    setIsRunning(true);
    setTestResults("正在启动 Docker Python 沙箱...\n预装库环境: NumPy 1.24, Pandas 2.0, Scikit-learn 1.2...\n");
    try {
      const res = await fetch(`/api/challenges/${encodeURIComponent(detail.id)}/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const result = data.data;
        const passed = result.status === 'ACCEPTED';
        let output = `\n[沙箱评测完成] - ${result.runtimeMs}ms\n${result.status}\n${'-'.repeat(36)}\n${result.message}`;
        setTestResults(prev => prev + output);
        setIsPassed(passed);
        setLevels(prev => prev.map((l, i) => i === activeLevelIndex ? { ...l, userRecord: { ...l.userRecord, codePassed: passed } } : l));
      } else {
        setTestResults(prev => prev + `\n\n__TEST_STATUS__:FAILED\n[ERROR] ${data.message || '接口响应异常'}`);
        setIsPassed(false);
      }
    } catch { setTestResults(prev => prev + '\n\n__TEST_STATUS__:FAILED\n[ERROR] 网络连接沙箱超时'); setIsPassed(false); }
    finally { setIsRunning(false); }
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
        if (data.success) setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.feedback }]);
      } else {
        setAiChatMessages(prev => [...prev, { sender: 'ai', text: '游客模式，评分未保存。请登录后使用。' }]);
      }
    } catch { message.error('提交失败'); }
    finally { setAiLoading(false); }
  };

  // ── AI 聊天 ──
  const handleSendChat = async () => {
    if (!userChatInput.trim()) return;
    const text = userChatInput;
    setUserChatInput("");
    setAiChatMessages(prev => [...prev, { sender: "user", text }]);
    setAiLoading(true);
    try {
      const ctx = detail ? `关卡: ${detail.name || selectedNodeName}\n理论: ${detail.theory || "无"}\n代码: ${detail.starterCode || "无"}` : `关卡: ${selectedNodeName}`;
      const res = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: `你是星际 AI 辅导助教。\n${ctx}\n\n学生: ${text}\n请用中文回答，不用 Markdown。` }) });
      const data = await res.json();
      setAiChatMessages(prev => [...prev, { sender: "ai", text: data.reply || "AI 未返回有效回复" }]);
    } catch { setAiChatMessages(prev => [...prev, { sender: "ai", text: "AI 服务连接失败，请稍后再试。" }]); }
    finally { setAiLoading(false); }
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
              <button key={i} onClick={() => setActiveLevelIndex(i)}
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
          testResults={testResults} isRunning={isRunning} isPassed={isPassed}
          canSubmit={true} solutionCode={detail?.solutionCode}
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
