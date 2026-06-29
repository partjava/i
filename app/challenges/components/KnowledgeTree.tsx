'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, ChevronRight, ArrowLeft, Cpu, Sparkles, Loader } from 'lucide-react';
import { Stage } from './data';
import { SvmVisualizer } from './SvmVisualizer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// 小节折叠组件（独立管理展开/收起状态）
function SubtopicSection({ child, isSelected, onSelectNode, onSelectLevel, challenges, totalLevels, passedLevels, allPassed }: {
  child: string; isSelected: boolean; onSelectNode: (n: string) => void; onSelectLevel: (i: number) => void;
  challenges: any[]; totalLevels: number; passedLevels: number; allPassed: boolean;
}) {
  const handleLevelClick = (idx: number) => {
    onSelectNode(child);
    onSelectLevel(idx);
  };
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-1">
      <button
        onClick={() => { setExpanded(!expanded); onSelectNode(child); onSelectLevel(0); }}
        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex justify-between items-center transition ${
          isSelected ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0 w-[75%]">
          <span className={`text-[10px] transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
          <span className="truncate font-medium">{child}</span>
          {allPassed && <span className="text-emerald-400 font-bold text-[10px] shrink-0">✓</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {totalLevels > 0 && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${allPassed ? 'bg-emerald-900/40 text-emerald-400' : passedLevels > 0 ? 'bg-amber-900/30 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
              {passedLevels}/{totalLevels}
            </span>
          )}
        </div>
      </button>
      {expanded && (
        <div className="pl-4 mt-1 space-y-0.5 border-l border-slate-800 ml-2">
          {challenges.map((lv: any, lIdx: number) => {
            const lvPassed = lv.record?.codePassed;
            return (
              <button key={lIdx} onClick={() => handleLevelClick(lv.levelIndex - 1)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] flex justify-between items-center transition ${isSelected ? 'bg-indigo-600/15 text-indigo-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'}`}
              >
                <div className="flex items-center gap-2 min-w-0 w-[85%]">
                  <span className="text-[9px] text-cyan-500/60 font-mono shrink-0">官方</span>
                  <span className="truncate">{lv.levelTitle}</span>
                </div>
                {lvPassed && <span className="text-emerald-400 text-[10px] shrink-0">✓</span>}
              </button>
            );
          })}
          <div className="px-2.5 py-1 text-[10px] text-slate-700 italic">更多关卡筹备中...</div>
        </div>
      )}
    </div>
  );
}

interface KnowledgeTreeProps {
  selectedStage: Stage;
  selectedNodeName: string;
  selectedLevelIndex?: number;
  onSelectNode: (nodeName: string) => void;
  onSelectLevel: (levelIndex: number) => void;
  onBackToUniverse: () => void;
  onStartQuiz: () => void;
  dbChallenges?: any[];
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({
  selectedStage,
  selectedNodeName,
  selectedLevelIndex = 0,
  onSelectNode,
  onSelectLevel,
  onBackToUniverse,
  onStartQuiz,
  dbChallenges = []
}) => {
  const [allLevels, setAllLevels] = useState<any[]>([]);
  const [previewIdx, setPreviewIdx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const detail = allLevels[previewIdx] || null;

  // 动态加载子话题所有关卡
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/star-challenges/${encodeURIComponent(selectedNodeName)}`);
        const data = await res.json();
        if (data.success && data.levels && data.levels.length > 0) {
          setAllLevels(data.levels);
          setPreviewIdx(Math.min(selectedLevelIndex || 0, data.levels.length - 1));
        } else {
          setAllLevels([]);
          setPreviewIdx(0);
        }
      } catch (err) {
        console.error('获取知识树看板数据失败:', err);
        setAllLevels([]);
        setPreviewIdx(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [selectedNodeName, selectedLevelIndex]);

  // 当用户在侧边栏点击关卡时切换预览
  const handleLevelClick = (child: string, levelIdx: number) => {
    onSelectNode(child);
    onSelectLevel(levelIdx);
    setPreviewIdx(levelIdx);
  };

  const renderTheoryMarkdown = (text: string) => {
    if (!text) return null;
    return (
      <div className="prose prose-invert prose-xs max-w-none text-slate-300 space-y-2 leading-relaxed text-xs">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeHighlight, rehypeKatex]}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex overflow-hidden p-6 gap-6"
    >
      {/* 左侧折叠菜单 */}
      <div className="w-80 border border-slate-900 bg-slate-950/65 backdrop-blur-md rounded-2xl flex flex-col p-4 overflow-y-auto z-10 shrink-0">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-900">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-slate-300">当前阶段：{selectedStage.name}</span>
        </div>

        <div className="space-y-4 flex-1">
          {selectedStage.topics.map((topic, tIdx) => (
            <div key={tIdx} className="space-y-1.5">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider px-2">
                {topic.name}
              </h4>
              <div className="space-y-1 pl-1">
                {/* 1. 官方题目（示例题 + 关卡列表） */}
                {topic.children.map((child, cIdx) => {
                  const isSelected = selectedNodeName === child;
                  const childChallenges = dbChallenges.filter(c => c.subtopicName === child && c.stageId === selectedStage.id)
                    .sort((a, b) => a.levelIndex - b.levelIndex);
                  const totalLevels = childChallenges.length;
                  const passedLevels = childChallenges.filter(c => c.record?.codePassed).length;
                  const allPassed = totalLevels > 0 && passedLevels === totalLevels;
                  return (
                    <SubtopicSection
                      key={`official-${cIdx}`}
                      child={child}
                      isSelected={isSelected}
                      onSelectNode={onSelectNode}
                      onSelectLevel={onSelectLevel}
                      challenges={childChallenges}
                      totalLevels={totalLevels}
                      passedLevels={passedLevels}
                      allPassed={allPassed}
                    />
                  );
                })}

                {/* 2. 社区/VIP 共创题 */}
                {dbChallenges
                  .filter(c => c.stageId === selectedStage.id && c.topicName === topic.name && !c.isOfficial)
                  .map((custom, cIdx) => {
                    const isSelected = selectedNodeName === custom.subtopicName;
                    const isPassed = custom.record?.isPassed;
                    return (
                      <button
                        key={`custom-${cIdx}`}
                        onClick={() => onSelectNode(custom.subtopicName)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] flex justify-between items-center transition ${isSelected ? 'bg-purple-600/35 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
                      >
                        <div className="flex flex-col min-w-0 items-start w-[85%]">
                          <div className="flex items-center gap-1.5 min-w-0 w-full">
                            <span className="truncate flex-1 shrink-0 font-medium">{custom.subtopicName}</span>
                            {isPassed && <span className="text-emerald-400 font-bold text-[10px] shrink-0" title="已通过">✓</span>}
                          </div>
                          <span className="text-[9px] text-purple-400/80 font-medium shrink-0">
                            👤 @{custom.authorName || '匿名极客'} 贡献
                          </span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 opacity-60 transition ${isSelected ? 'rotate-90' : ''} shrink-0`} />
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onBackToUniverse}
          className="w-full mt-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs hover:bg-slate-850 hover:text-white transition flex items-center justify-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 返回星空宇宙
        </button>
      </div>

      {/* 右侧核心知识看板展示区 */}
      <div className="flex-1 border border-slate-900 bg-slate-950/50 backdrop-blur-md rounded-2xl p-8 overflow-y-auto flex flex-col justify-between z-10">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-indigo-400 gap-2">
            <Loader className="w-6 h-6 animate-spin" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Fetching node specifications...</span>
          </div>
        ) : (
          <div className="max-w-3xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-indigo-400 font-bold tracking-widest font-mono">SELECTED NODE</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-xs text-slate-400">{selectedStage.name}</span>
                {detail?.isOfficial === false && (
                  <>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[9px] font-mono">
                      VIP 共创
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-3xl font-extrabold text-white">{selectedNodeName}</h2>
            </div>

            {/* 看板文字简介区（如果有后台数据库内容就用数据库的，否则使用动态生成的模版以防写死成 SVM） */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-slate-900/60 pt-4 font-normal">
              {detail ? (
                <div className="max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
                  {renderTheoryMarkdown(detail.theory)}
                </div>
              ) : (
                <p>
                  本知识节点是当前阶段的核心板块。本课将系统探讨关于 <strong>{selectedNodeName}</strong> 的工作原理、模型边界与核心公式推导，帮助您在实际工程与算法设计中建立扎实的闭环分析能力。
                </p>
              )}
              
              <div className="bg-slate-900/40 border border-indigo-950/60 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5 animate-spin" /> 本课核心考核指标与公式：
                </h4>
                
                {detail && detail.latexFormulas && detail.latexFormulas.length > 0 ? (
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-1.5">
                    {detail.latexFormulas.map((formula: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-1.5 flex-wrap">
                        <span>核心关系算子:</span>
                        <span className="text-indigo-400 font-mono inline-block">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {`$${formula}$`}
                          </ReactMarkdown>
                        </span>
                      </li>
                    ))}
                    <li>代码输出断言匹配: <code className="px-1 py-0.5 rounded bg-slate-950 text-cyan-400">{detail.expectedOutput}</code></li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-1.5">
                    <li className="flex items-center gap-1.5 flex-wrap">
                      <span>核心超参运算关系:</span>
                      <span className="text-indigo-400 font-mono inline-block">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {`$f(x) = \\sigma(W^T x + b)$`}
                        </ReactMarkdown>
                      </span>
                    </li>
                    <li>在模拟数据集上完成对应的 Python 模型实例化与数据预测校验。</li>
                    <li>主观题部分提交深度见解，由 AI 辅导助理在控制台打分并提供重构建议。</li>
                  </ul>
                )}
              </div>
            </div>

            {selectedNodeName === "支持向量机 (SVM)" ? (
              <SvmVisualizer />
            ) : (
              // 其它课程提供默认的精美科幻图表占位
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col items-center max-w-sm">
                <div className="w-12 h-12 rounded-full border border-dashed border-indigo-500/30 flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                <span className="text-[11px] text-slate-400">已自动载入 {selectedNodeName} 沙箱模块</span>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-slate-900 pt-6 mt-6 flex justify-between items-center">
          <div className="text-xs text-slate-400">
            通过本关将获得 <strong className="text-cyan-400 font-bold">{selectedStage.id * 10} 分</strong> 探索积分
          </div>
          <button
            onClick={onStartQuiz}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-xs font-bold text-white tracking-wider flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 hover:scale-105 transition duration-200"
          >
            开始实战闯关 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
