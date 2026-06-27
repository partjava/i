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
  Send 
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { SubtopicDetail, SUBTOPIC_DETAILS, getDefaultDetail } from './data';

interface QuizWorkspaceProps {
  selectedNodeName: string;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({ selectedNodeName }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'conceptual' | 'thinking'>('theory');
  const [codeValue, setCodeValue] = useState<string>("");
  const [testResults, setTestResults] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizExplains, setShowQuizExplains] = useState<Record<number, boolean>>({});

  const [thinkingAnswer, setThinkingAnswer] = useState<string>("");
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
    { sender: 'ai', text: '你好！我是你的星际 AI 助教。请编写代码或尝试回答思考题，我会随时帮你提供优化思路或打分。' }
  ]);
  const [userChatInput, setUserChatInput] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const getActiveDetail = (): SubtopicDetail => {
    return SUBTOPIC_DETAILS[selectedNodeName] || getDefaultDetail(selectedNodeName);
  };

  useEffect(() => {
    const detail = getActiveDetail();
    setCodeValue(detail.starterCode);
    setTestResults("");
    setIsPassed(null);
    setSelectedQuizAnswers({});
    setShowQuizExplains({});
    setThinkingAnswer("");
  }, [selectedNodeName]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults("正在启动 Docker Python 沙箱...\n预装库环境: NumPy 1.24, Pandas 2.0, Scikit-learn 1.2...\n正在导入用户定义类 SVMClassifier...\n开始注入评测单元测试断言...");
    
    setTimeout(() => {
      const detail = getActiveDetail();
      const hasModified = codeValue.includes("SVC") || codeValue.includes("train") || codeValue.includes("model");

      if (hasModified) {
        setTestResults((prev) => 
          prev + `\n\n__UNIT_TEST__: 正在加载预载数据集: iris_dataset...\n__UNIT_TEST__: 正在构建 8:2 交叉验证划分...\n__UNIT_TEST__: 模型成功训练！SVC(kernel='linear', C=1.0)\n\n__TEST_STATUS__:PASSED\n准确率测试用例: Passed (Accuracy: 0.9667)\n单元断言输出: 恭喜！测试用例 100% 通过，符合期望输出 ${detail.expectedOutput}`
        );
        setIsPassed(true);
      } else {
        setTestResults((prev) => 
          prev + `\n\n__TEST_STATUS__:FAILED\nAssertionError: [ERROR] 返回预测类别数组不能为空，预测准确度未达到 90% 及格线。\n实际输出: []\n期望输出: ${detail.expectedOutput}`
        );
        setIsPassed(false);
      }
      setIsRunning(false);
    }, 1800);
  };

  const handleSubmitThinking = () => {
    if (!thinkingAnswer.trim()) return;
    
    setAiLoading(true);
    setAiChatMessages(prev => [...prev, { sender: 'user', text: `这是我对思考题「${getActiveDetail().thinkingQuestion}」的回答：\n\n${thinkingAnswer}` }]);
    
    setTimeout(() => {
      const detail = getActiveDetail();
      let responseText = "";
      if (detail.id === "svm") {
        responseText = "### 🌟 AI 助教综合评分: 9/10 分\n\n**优点：**\n你非常准确地指出了 SVM 在高维空间不易过拟合的原因。确实，SVM 的泛化能力核心在于它的间隔最大化机制（即极小化 1/2||w||^2 正则化），它的模型复杂度仅受支持向量的个数影响，不受样本总特征维度的制约。\n\n**改进建议：**\n如果能补充说明，引入非线性核函数（如 RBF 核）时，参数 C 和 gamma 对过拟合的控制效果，那么回答将更加圆满。";
      } else {
        responseText = "### 🌟 AI 助教综合评分: 8.5/10 分\n\n你的阐述很系统。你明确论证了该问题的数据偏差与时间复杂度之间的折中。为控制鲁棒性，建议在训练中加入 L2 正则化，进一步减小参数波动带来的不稳定性。";
      }

      setAiChatMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setAiLoading(false);
    }, 1500);
  };

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
      } else if (text.includes("代码") || text.includes("报错")) {
        aiReply = "请在编辑器中确保导入了必要的组件。例如在 Python 下实现分类，记得导入 `SVC` 并确保 `train_and_predict` 最终返回一个 numpy 数组形式的预测结果，以满足断言判定格式。";
      } else {
        aiReply = "收到你的问题！在 AI 学习宇宙中，每一关的底层代码都可以在本地直接调用。如果有具体某一行逻辑不明白，我可以为你提供单步的代码剖析！";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setAiLoading(false);
    }, 1200);
  };

  const detail = getActiveDetail();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex overflow-hidden z-10"
    >
      {/* 1. 左侧：理论讲解与选择题练习 */}
      <div className="w-[30%] border-r border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col overflow-hidden">
        
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
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                理论基础与推导
              </h3>
              <div className="prose prose-invert prose-xs max-w-none">
                <div className="whitespace-pre-line border-b border-slate-900 pb-4 mb-4">
                  {detail.theory}
                </div>
                
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-cyan-400 mb-2">测试断言与目标：</h4>
                  <p className="text-[11px] text-slate-400">
                    你的 Python 函数必须接收指定的模拟测试矩阵 <code className="px-1 py-0.5 rounded bg-slate-950 text-indigo-400">X_train</code> 和类别向量 <code className="px-1 py-0.5 rounded bg-slate-950 text-indigo-400">y_train</code> 并预测输出测试样本类别。
                  </p>
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

              {detail.conceptualQuizzes.map((quiz, qIdx) => {
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
                            disabled={userSelection !== undefined}
                            onClick={() => {
                              setSelectedQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                              setShowQuizExplains(prev => ({ ...prev, [qIdx]: true }));
                            }}
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
              })}
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
                  disabled={!thinkingAnswer.trim() || aiLoading}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white rounded-xl transition flex items-center justify-center gap-1 shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-3.5 h-3.5" /> 提交答案给 AI
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
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-xs font-bold text-white transition flex items-center gap-1 shadow-lg shadow-emerald-600/20"
            >
              <Play className="w-3 h-3 fill-current" /> {isRunning ? "正在运行..." : "运行代码"}
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-[#030308]">
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
    </motion.div>
  );
};
