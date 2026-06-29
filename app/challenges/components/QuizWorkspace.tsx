'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  HelpCircle, 
  MessageSquare, 
  Code, 
  Play, 
  Terminal, 
  Sparkles, 
  Send,
  Loader,
  AlertCircle
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useAuth } from '@/app/hooks/useAuth';
import { message } from 'antd';
import { SubtopicDetail, getDefaultDetail } from './data';

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
  // 第 0 关始终允许提交；其余关卡需要前一关已通过代码测评
  const canSubmit = activeLevelIndex === 0 || 
    (activeLevelIndex > 0 && !!levels[activeLevelIndex - 1]?.userRecord?.codePassed);
  const [loading, setLoading] = useState<boolean>(true);

  const [codeValue, setCodeValue] = useState<string>("");
  const [testResults, setTestResults] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizExplains, setShowQuizExplains] = useState<Record<number, boolean>>({});

  const [thinkingAnswer, setThinkingAnswer] = useState<string>("");
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
    { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }
  ]);
  const [userChatInput, setUserChatInput] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // 1. 获取子话题详情列表
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}`);
        const data = await res.json();
        if (data.success && data.levels && data.levels.length > 0) {
          setLevels(data.levels);
          const startIdx = Math.min(initialLevelIndex, data.levels.length - 1);
          setActiveLevelIndex(startIdx);
        } else {
          // 降级使用静态默认模板
          const fallback = getDefaultDetail(selectedNodeName);
          setLevels([fallback]);
          setActiveLevelIndex(0);
        }
      } catch (err) {
        console.error('获取关卡数据失败:', err);
        const fallback = getDefaultDetail(selectedNodeName);
        setLevels([fallback]);
        setActiveLevelIndex(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [selectedNodeName]);

  // 监听当前活跃的关卡索引，同步表单数据和AI对话状态
  useEffect(() => {
    if (!detail) return;
    setCodeValue(detail.starterCode);
    setTestResults("");
    setIsPassed(null);
    setSelectedQuizAnswers({});
    setShowQuizExplains({});
    setThinkingAnswer("");
    setAiChatMessages([
      { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }
    ]);

    if (detail.userRecord) {
      const r = detail.userRecord;
      if (r.codePassed) setIsPassed(true);
      if (r.quizAnswers) {
        setSelectedQuizAnswers(r.quizAnswers);
        const explains: Record<number, boolean> = {};
        Object.keys(r.quizAnswers).forEach((key: any) => {
          explains[key] = true;
        });
        setShowQuizExplains(explains);
      }
      if (r.thinkingFeedback) {
        setAiChatMessages([
          { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' },
          { sender: 'ai', text: r.thinkingFeedback }
        ]);
      }
    }
  }, [activeLevelIndex, levels]);

  // 2. 运行代码
  const handleRunCode = async () => {
    if (!detail) return;
    setIsRunning(true);
    setTestResults("正在启动 Docker Python 沙箱...\n预装库环境: NumPy 1.24, Pandas 2.0, Scikit-learn 1.2...\n正在导入用户定义类...\n开始注入评测单元测试断言...\n");
    try {
      const res = await fetch(`/api/challenges/${encodeURIComponent(detail.id)}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeValue }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const result = data.data; // JudgementResult
        const passed = result.status === 'ACCEPTED';
        
        let output = `\n[沙箱评测执行完成] - 耗时: ${result.runtimeMs} ms\n`;
        output += `测试结果: ${result.status}\n`;
        output += `------------------------------------\n`;
        output += result.message;
        
        setTestResults(prev => prev + output);
        setIsPassed(passed);

        // 本地同步更新状态以实时解锁下一关
        setLevels(prev => prev.map((l, idx) => {
          if (idx === activeLevelIndex) {
            return {
              ...l,
              userRecord: {
                ...l.userRecord,
                codePassed: passed
              }
            };
          }
          return l;
        }));
      } else {
        const err = data.message || data.error || "接口响应异常";
        setTestResults(prev => prev + `\n\n__TEST_STATUS__:FAILED\n[ERROR] ${err}`);
        setIsPassed(false);
      }
    } catch (e: any) {
      console.error('运行代码失败:', e);
      setTestResults(prev => prev + `\n\n__TEST_STATUS__:FAILED\n[ERROR] 网络连接沙箱超时，请检查后端运行状态。`);
      setIsPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  // 3. 提交选择题
  const handleSelectQuizAnswer = async (quizIdx: number, optionIdx: number) => {
    if (!detail) return;
    const newAnswers = { ...selectedQuizAnswers, [quizIdx]: optionIdx };
    setSelectedQuizAnswers(newAnswers);
    setShowQuizExplains(prev => ({ ...prev, [quizIdx]: true }));

    // 如果已登录，上报选择题作答
    if (status === 'authenticated') {
      try {
        await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}/submit-quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: newAnswers, challengeId: detail.id }),
        });
        // 本地同步更新选择题记录
        setLevels(prev => prev.map((l, idx) => {
          if (idx === activeLevelIndex) {
            return {
              ...l,
              userRecord: {
                ...l.userRecord,
                quizAnswers: newAnswers
              }
            };
          }
          return l;
        }));
      } catch (e) {
        console.error('上报选择题进度失败:', e);
      }
    }
  };

  // 4. 提交思考题给 AI 评分
  const handleSubmitThinking = async () => {
    if (!thinkingAnswer.trim() || !detail) return;
    
    setAiLoading(true);
    setAiChatMessages(prev => [...prev, { sender: 'user', text: `这是我对思考题「${detail.thinkingQuestion}」的回答：\n\n${thinkingAnswer}` }]);
    
    try {
      if (status === 'authenticated') {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}/submit-thinking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: thinkingAnswer, challengeId: detail.id }),
        });
        const data = await res.json();
        if (data.success) {
          setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.feedback }]);
          // 本地同步更新思考题评语和分数
          setLevels(prev => prev.map((l, idx) => {
            if (idx === activeLevelIndex) {
              return {
                ...l,
                userRecord: {
                  ...l.userRecord,
                  thinkingScore: data.score,
                  thinkingFeedback: data.feedback
                }
              };
            }
            return l;
          }));
        } else {
          message.error(data.error || '提交打分失败');
        }
      } else {
        // 游客身份模拟打分
        setTimeout(() => {
          const score = 8.5;
          const feedback = `### 🌟 AI 助教综合评分: 8.5/10 分\n\n**优点：**\n论述清晰，核心逻辑契合。由于您当前是【游客身份】，评分结果无法在云端长期保存。建议您登录后再次挑战！`;
          setAiChatMessages(prev => [...prev, { sender: 'ai', text: feedback }]);
        }, 1500);
      }
    } catch {
      message.error('提交失败，请检查网络');
    } finally {
      setAiLoading(false);
    }
  };

  // 5. 发送聊天助理消息
  const handleSendChatMessage = () => {
    if (!userChatInput.trim()) return;
    
    const text = userChatInput;
    setUserChatInput("");
    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiLoading(true);

    setTimeout(() => {
      let aiReply = "";
      if (text.toLowerCase().includes("svm") || text.includes("支持向量")) {
        aiReply = "支持向量机（SVM）是一种分类算法，基本目标是找到划分正负样本的‘最大间隔’超平面。若遇到线性不可分数据，引入松弛变量是允许一定错分容错（受惩罚参数C控制）；而核函数则是把低维特征映射到高维使其线性可分。你当前的代码模板里，需要实例化 `sklearn.svm.SVC` 并调用 `fit`。";
      } else if (text.includes("代码") || text.includes("报错") || text.includes("函数")) {
        aiReply = "请在编辑器中确保导入了必要的组件。例如实现对应的算法，记得导入 NumPy 并确保按接口规定返回对应的预测结果/处理数组，以满足断言判定格式。";
      } else {
        aiReply = "收到你的问题！在 AI 学习宇宙中，每一关的底层代码都可以在本地直接调用。如果有具体某一行逻辑不明白，我可以为你提供单步的代码剖析！";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setAiLoading(false);
    }, 1200);
  };

  // 6. 渲染 Markdown 与 LaTeX 公式排版
  const renderTheoryContent = (text: string) => {
    if (!text) return null;
    return (
      <div className="prose prose-invert prose-xs max-w-none text-slate-300 space-y-3 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeHighlight, rehypeKatex]}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black/60 text-indigo-400 gap-3">
        <Loader className="w-8 h-8 animate-spin" />
        <span className="text-xs font-medium tracking-widest font-mono">LOADING STAR DATA...</span>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col overflow-hidden z-10"
    >
      {/* 顶部：关卡选择器 */}
      <div className="bg-slate-950 border-b border-slate-900 px-6 py-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold text-white tracking-wider font-sans flex items-center gap-1">
             当前的闯关进度：
          </span>
          <div className="flex items-center gap-2">
            {levels.map((lvl, index) => {
              // 所有关卡默认解锁（示例题和官方题都独立可访问）
              const isUnlocked = true;
              const isActive = index === activeLevelIndex;
              return (
                <button
                  key={index}
                  disabled={!isUnlocked}
                  onClick={() => setActiveLevelIndex(index)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition flex items-center gap-1.5 border ${
                    isActive 
                      ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]" 
                      : isUnlocked 
                        ? "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                        : "bg-slate-950 border-slate-950 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  {isUnlocked ? "⭐" : "🔒"} 第 {lvl.levelIndex} 关：{lvl.levelTitle}
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          {selectedNodeName} // STAGE {levels[0]?.stageId}
        </div>
      </div>

      {/* 下方：双栏布局 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. 左侧：理论讲解与选择题练习 */}
        <div className="w-[30%] border-r border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col overflow-hidden">
        
        {/* 游客限制警示 */}
        {status !== 'authenticated' && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-amber-400 text-[10px] tracking-wide shrink-0 select-none">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>您正以游客身份体验，答题记录将不会被云端保存</span>
          </div>
        )}

        {/* Tab 页签 */}
        <div className="flex border-b border-slate-900 bg-slate-950/90 shrink-0 text-xs">
          <button 
            onClick={() => setActiveTab('theory')}
            className={`flex-1 py-3 text-center font-bold border-b-2 transition ${activeTab === 'theory' ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            📕 理论讲解
          </button>
          <button 
            onClick={() => setActiveTab('conceptual')}
            className={`flex-1 py-3 text-center font-bold border-b-2 transition ${activeTab === 'conceptual' ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            🧪 理解测试
          </button>
          <button 
            onClick={() => setActiveTab('thinking')}
            className={`flex-1 py-3 text-center font-bold border-b-2 transition ${activeTab === 'thinking' ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            🧠 思考答疑
          </button>
        </div>

        {/* Tab 内容 */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {activeTab === 'theory' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  理论基础与推导
                </h3>
                {detail.authorId && (
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] font-mono">
                    VIP 创作者出题
                  </span>
                )}
              </div>
              <div className="prose prose-invert prose-xs max-w-none">
                <div className="border-b border-slate-900 pb-4 mb-4">
                  {renderTheoryContent(detail.theory)}
                </div>
                
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-cyan-400 mb-2">测试断言与目标：</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    你的 Python 函数必须接收指定的输入数据并生成运算结果。
                  </p>
                  <div className="mt-2 text-[10px] text-indigo-300 font-mono">
                    期望正确输出: {detail.expectedOutput}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conceptual' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4.5 h-4.5 text-indigo-400" />
                基础理解题 (Quiz)
              </h3>

              {detail.conceptualQuizzes.length === 0 ? (
                <div className="text-center text-slate-500 text-xs py-8">
                  本话题暂无官方选择题。
                </div>
              ) : (
                detail.conceptualQuizzes.map((quiz, qIdx) => {
                  const userSelection = selectedQuizAnswers[qIdx];
                  const showExplain = showQuizExplains[qIdx];

                  return (
                    <div key={qIdx} className="bg-slate-900/30 border border-slate-850 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-semibold text-slate-200">
                        {qIdx + 1}. {quiz.question}
                      </p>

                      <div className="space-y-2">
                        {quiz.options.map((opt, oIdx) => {
                          const isSelected = userSelection === oIdx;
                          const isCorrect = quiz.answer === oIdx;
                          
                          let optionColor = "border-slate-800 hover:bg-slate-900/50 text-slate-400";
                          if (userSelection !== undefined) {
                            if (isCorrect) optionColor = "border-emerald-500/40 bg-emerald-950/20 text-emerald-400";
                            else if (isSelected) optionColor = "border-red-500/40 bg-red-950/20 text-red-400";
                          } else if (isSelected) {
                            optionColor = "border-indigo-500 bg-indigo-950/15 text-indigo-300";
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={userSelection !== undefined || !canSubmit}
                              onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                              className={`w-full text-left px-3 py-2 border rounded-xl text-xs transition duration-150 ${optionColor}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showExplain && (
                        <div className="mt-3 p-3 bg-indigo-950/15 border border-indigo-950/50 rounded-lg text-[11px] text-slate-400 leading-relaxed">
                          <strong className="text-indigo-300 font-bold block mb-1">
                            解析说明：{userSelection === quiz.answer ? "🎉 回答正确！" : "❌ 回答错误。"}
                          </strong>
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
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-4.5 h-4.5 text-indigo-400" />
                思考题（AI 自动打分）
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/30 border border-slate-850 p-4 rounded-xl">
                {detail.thinkingQuestion}
              </p>

              <div className="space-y-2">
                <textarea
                  value={thinkingAnswer}
                  onChange={(e) => setThinkingAnswer(e.target.value)}
                  placeholder="请阐述你的见解..."
                  className="w-full h-32 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
                <button
                  onClick={handleSubmitThinking}
                  disabled={!thinkingAnswer.trim() || aiLoading || !canSubmit}
                  className={`w-full py-2 text-xs font-bold text-white rounded-xl transition flex items-center justify-center gap-1 shadow-lg ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-slate-700 cursor-not-allowed'}`}
                >
                  <Send className="w-3.5 h-3.5" /> {!canSubmit ? "通关第一关后可提交" : "提交答案给 AI"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. 中间：Python 代码编辑区与终端输出 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#030308]">
        <div className="h-11 border-b border-slate-900 bg-slate-950/80 px-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-mono text-slate-300">Solution.py</span>
          </div>

          <div className="flex items-center gap-3">
            {detail?.solutionCode && (
              <button
                onClick={() => setShowSolutionModal(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-1 border border-slate-800 shadow-md shadow-black/30"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> 查看标准答案
              </button>
            )}
            <button
              onClick={handleRunCode}
              disabled={isRunning || !canSubmit}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition flex items-center gap-1 shadow-lg ${canSubmit ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-slate-700 cursor-not-allowed'}`}
            >
              <Play className="w-3 h-3 fill-current" /> {!canSubmit ? "通关第一关后可答题" : isRunning ? "正在运行..." : "运行代码"}
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-[#030308]">
          {!canSubmit && (
            <div className="absolute inset-0 bg-slate-950/80 z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <span className="text-2xl">🔒</span>
                <p className="text-slate-400 text-xs mt-2">通关第一关后可在此作答</p>
              </div>
            </div>
          )}
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={codeValue}
            onChange={(val) => setCodeValue(val || "")}
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              cursorBlinking: "smooth",
              padding: { top: 16 }
            }}
          />
        </div>

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
            {testResults ? testResults : "尚未运行代码。请在上方补全 Python 代码，点击「运行代码」进行断言校验。"}
          </div>
        </div>
      </div>

      {/* 3. 右侧：AI 答疑助手窗口 */}
      <div className="w-[28%] border-l border-slate-900 bg-slate-950/50 backdrop-blur-md flex flex-col overflow-hidden text-slate-300">
        <div className="h-12 border-b border-slate-900 bg-slate-950/80 px-4 flex items-center gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-slate-300">星际 AI 辅导助理</span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
          {aiChatMessages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col gap-1 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <span className="text-[10px] text-slate-500 font-mono">
                {msg.sender === 'user' ? 'YOU' : 'AI_ASSISTANT'}
              </span>
              <div 
                className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none whitespace-pre-wrap'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> AI 正在分析特征并生成建议...
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-900 bg-slate-950 shrink-0">
          <div className="flex gap-2 bg-slate-900/60 border border-slate-850 rounded-xl p-2 items-center">
            <input
              type="text"
              value={userChatInput}
              onChange={(e) => setUserChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
              placeholder="向 AI 咨询代码优化思路..."
              className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0"
            />
            <button
              onClick={handleSendChatMessage}
              disabled={!userChatInput.trim() || aiLoading}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="h-12 border-b border-slate-800 bg-slate-950/80 px-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-slate-200">标准参考答案</span>
              </div>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-700 transition"
              >
                关闭
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm bg-slate-950/50">
              <pre className="text-emerald-400 whitespace-pre-wrap select-all bg-slate-950 p-4 rounded-lg border border-slate-900 leading-relaxed">
                {detail?.solutionCode || "# 暂无标准答案"}
              </pre>
            </div>
            <div className="h-14 border-t border-slate-800 bg-slate-950/80 px-6 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-400">你可以双击/拖动选中复制代码，或者点击右侧直接填入编辑器</span>
              <button
                onClick={() => {
                  if (detail?.solutionCode) {
                    setCodeValue(detail.solutionCode);
                    message.success("已将标准答案载入代码编辑器！");
                  }
                  setShowSolutionModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-xs font-bold text-white transition shadow-lg shadow-cyan-600/20"
              >
                直接填入编辑器
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </motion.div>
  );
};
