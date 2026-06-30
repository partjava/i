'use client';

import React from 'react';
import { BookOpen, HelpCircle, MessageSquare, Send, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import { SubtopicDetail } from './data';

interface TheoryQuizPanelProps {
  activeTab: 'theory' | 'conceptual' | 'thinking';
  onTabChange: (tab: 'theory' | 'conceptual' | 'thinking') => void;
  detail: SubtopicDetail | null;
  isAuthenticated: boolean;
  selectedQuizAnswers: Record<number, number>;
  showQuizExplains: Record<number, boolean>;
  onSelectQuiz: (quizIdx: number, optionIdx: number) => void;
  thinkingAnswer: string;
  onThinkingChange: (val: string) => void;
  onSubmitThinking: () => void;
  aiLoading: boolean;
}

export function TheoryQuizPanel({
  activeTab, onTabChange, detail, isAuthenticated,
  selectedQuizAnswers, showQuizExplains, onSelectQuiz,
  thinkingAnswer, onThinkingChange, onSubmitThinking, aiLoading
}: TheoryQuizPanelProps) {
  if (!detail) return null;

  const renderMarkdown = (text: string) => (
    <div className="prose prose-invert prose-xs max-w-none text-slate-300 space-y-3 leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeHighlight, rehypeKatex]}>{text}</ReactMarkdown>
    </div>
  );

  return (
    <div className="w-[30%] border-r border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col overflow-hidden">
      {/* 游客提示 */}
      {!isAuthenticated && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-amber-400 text-[10px] tracking-wide shrink-0">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>您正以游客身份体验，答题记录将不会被云端保存</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-900 bg-slate-950/90 shrink-0 text-xs">
        {[
          { key: 'theory' as const, icon: '📕', label: '理论讲解' },
          { key: 'conceptual' as const, icon: '🧪', label: '理解测试' },
          { key: 'thinking' as const, icon: '🧠', label: '思考答疑' },
        ].map(tab => (
          <button key={tab.key} onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 text-center font-bold border-b-2 transition ${activeTab === tab.key ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {activeTab === 'theory' && (
          <div className="space-y-4 text-xs leading-relaxed text-slate-300">
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" /> 理论基础与推导
            </h3>
            {detail.authorId && (
              <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] font-mono">VIP 创作者出题</span>
            )}
            <div className="border-b border-slate-900 pb-4 mb-4">{renderMarkdown(detail.theory)}</div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-bold text-cyan-400 mb-2">测试断言与目标：</h4>
              <p className="text-[11px] text-slate-400">你的 Python 函数必须接收指定的输入数据并生成运算结果。</p>
              <div className="mt-2 text-[10px] text-indigo-300 font-mono">期望正确输出: {detail.expectedOutput}</div>
            </div>
          </div>
        )}

        {activeTab === 'conceptual' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5"><HelpCircle className="w-4.5 h-4.5 text-indigo-400" /> 基础理解题 (Quiz)</h3>
            {detail.conceptualQuizzes.length === 0 ? (
              <div className="text-center text-slate-500 text-xs py-8">本话题暂无官方选择题。</div>
            ) : (
              detail.conceptualQuizzes.map((quiz, qIdx) => {
                const userSelection = selectedQuizAnswers[qIdx];
                const showExplain = showQuizExplains[qIdx];
                return (
                  <div key={qIdx} className="bg-slate-900/30 border border-slate-850 rounded-xl p-4 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{qIdx + 1}. {quiz.question}</p>
                    <div className="space-y-2">
                      {quiz.options.map((opt, oIdx) => {
                        const isSelected = userSelection === oIdx;
                        const isCorrect = quiz.answer === oIdx;
                        let clr = "border-slate-800 hover:bg-slate-900/50 text-slate-400";
                        if (userSelection !== undefined) {
                          if (isCorrect) clr = "border-emerald-500/40 bg-emerald-950/20 text-emerald-400";
                          else if (isSelected) clr = "border-red-500/40 bg-red-950/20 text-red-400";
                        }
                        return (
                          <button key={oIdx} disabled={userSelection !== undefined}
                            onClick={() => onSelectQuiz(qIdx, oIdx)}
                            className={`w-full text-left px-3 py-2 border rounded-xl text-xs transition ${clr}`}>{opt}</button>
                        );
                      })}
                    </div>
                    {showExplain && (
                      <div className="mt-3 p-3 bg-indigo-950/15 border border-indigo-950/50 rounded-lg text-[11px] text-slate-400">
                        <strong className="text-indigo-300 font-bold block mb-1">{userSelection === quiz.answer ? "🎉 回答正确！" : "❌ 回答错误。"}</strong>
                        {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'thinking' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5"><MessageSquare className="w-4.5 h-4.5 text-indigo-400" /> 思考题（AI 自动打分）</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 border border-slate-850 p-4 rounded-xl">
              {typeof detail.thinkingQuestion === 'object' ? (detail.thinkingQuestion as any).question : detail.thinkingQuestion}
            </p>
            <textarea value={thinkingAnswer} onChange={(e) => onThinkingChange(e.target.value)}
              placeholder="请阐述你的见解..." className="w-full h-32 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none" />
            <button onClick={onSubmitThinking} disabled={!thinkingAnswer.trim() || aiLoading}
              className="w-full py-2 text-xs font-bold text-white rounded-xl bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center gap-1 shadow-lg shadow-indigo-600/20">
              <Send className="w-3.5 h-3.5" /> 提交答案给 AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
