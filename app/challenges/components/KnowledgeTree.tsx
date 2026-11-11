'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, ChevronRight, ArrowLeft, Sparkles, Loader } from 'lucide-react';
import { Stage } from './data';
import { SvmHingeVisualizer, SvmKernelVisualizer } from './visualizers/machine-learning/SvmVisualizers';
import { findBasicKnowledgeVisualizer } from './visualizers/basic-knowledge';
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
                <div className="flex items-center gap-1.5 min-w-0 w-[85%]">
                  <span className="text-[9px] text-cyan-500/60 font-mono shrink-0">{lv.authorId ? `partjava-${lv.levelIndex || '?'}` : '官方'}</span>
                  <span className="truncate text-[11px]">{lv.levelTitle || lv.title || '未命名'}</span>
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
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const detail = allLevels[previewIdx] || null;
  const svmLevel = selectedNodeName === '支持向量机 (SVM)' ? detail?.levelTitle : null;
  const SvmVisualizer = svmLevel === 'SVM 铰链损失分类器'
    ? SvmHingeVisualizer
    : svmLevel === 'SVM 核函数与对偶' ? SvmKernelVisualizer : null;
  const Visualizer = selectedStage.id === 1
    ? findBasicKnowledgeVisualizer(selectedNodeName, detail?.levelTitle)
    : SvmVisualizer;

  // 动态加载子话题所有关卡
  useEffect(() => {
    const request = new AbortController();
    const fetchDetail = async () => {
      setLoading(true);
      setLoadError(false);
      try {
        const res = await fetch(`/api/star-challenges/levels?subtopicName=${encodeURIComponent(selectedNodeName)}`, { signal: request.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (request.signal.aborted) return;
        if (!data.success || !Array.isArray(data.levels)) throw new Error("Invalid challenge response");
        if (data.levels.length > 0) {
          setAllLevels(data.levels);
          setPreviewIdx(Math.min(selectedLevelIndex || 0, data.levels.length - 1));
        } else {
          setAllLevels([]);
          setPreviewIdx(0);
        }
      } catch (err) {
        if (request.signal.aborted) return;
        setLoadError(true);
        console.error('获取知识树看板数据失败:', err);
        setAllLevels([]);
        setPreviewIdx(0);
      } finally {
        if (!request.signal.aborted) setLoading(false);
      }
    };

    fetchDetail();
    return () => request.abort();
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

                {/* 2. 官方新增题目（subtopicName 不在预设 children 列表中的官方题） */}
                {dbChallenges
                  .filter(c => {
                    if (c.stageId !== selectedStage.id || c.topicName !== topic.name) return false;
                    if (c.authorId && c.authorId !== 1) return false; // 不是官方
                    if (c.isPublic === false) return false;           // 私有
                    // 排除已在 children 中显示的
                    return !topic.children.includes(c.subtopicName);
                  })
                  .map((custom, cIdx) => {
                    const isSelected = selectedNodeName === custom.subtopicName;
                    const isPassed = custom.record?.isPassed;
                    return (
                      <button
                        key={`extra-${cIdx}`}
                        onClick={() => onSelectNode(custom.subtopicName)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] flex justify-between items-center transition ${isSelected ? 'bg-cyan-600/25 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
                      >
                        <div className="flex flex-col min-w-0 items-start w-[85%]">
                          <div className="flex items-center gap-1.5 min-w-0 w-full">
                            <span className="text-[9px] text-cyan-500/60 font-mono shrink-0">{custom.authorId ? `partjava-${custom.levelIndex || '?'}` : '官方'}</span>
                            <span className="truncate flex-1 shrink-0 font-medium text-[11px]">{custom.title || custom.subtopicName}</span>
                            {isPassed && <span className="text-emerald-400 font-bold text-[10px] shrink-0" title="已通过">✓</span>}
                          </div>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 opacity-60 transition ${isSelected ? 'rotate-90' : ''} shrink-0`} />
                      </button>
                    );
                  })}

                {/* 3. 社区/VIP 共创题（公开的非官方题目） */}
                {dbChallenges
                  .filter(c => c.stageId === selectedStage.id && c.topicName === topic.name && c.isPublic !== false && c.authorId && c.authorId !== 1)
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
                            <span className="text-[9px] text-purple-400/80 font-mono shrink-0">#{custom.levelIndex || '?'}</span>
                            <span className="truncate flex-1 shrink-0 font-medium text-[11px]">{custom.title || custom.subtopicName}</span>
                            {isPassed && <span className="text-emerald-400 font-bold text-[10px] shrink-0" title="已通过">✓</span>}
                          </div>
                          <span className="text-[9px] text-purple-400/60 font-medium shrink-0">
                            👤 @{custom.authorName || (custom.authorId ? 'UID-'+custom.authorId : '匿名极客')}
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
      <div className="min-w-0 flex-1 border border-slate-900 bg-slate-950/50 backdrop-blur-md rounded-2xl p-4 sm:p-8 overflow-y-auto flex flex-col z-10">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-indigo-400 gap-2">
            <Loader className="w-6 h-6 animate-spin" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Fetching node specifications...</span>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800/70 pb-5">
              <div className="min-w-0 space-y-2">
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
              <div className="flex flex-wrap items-center gap-3">
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

            {/* 看板文字简介区（如果有后台数据库内容就用数据库的，否则使用动态生成的模版以防写死成 SVM） */}
            <div className="grid items-start gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,22rem),1fr))]">
            <div className={`min-w-0 space-y-5 text-sm leading-relaxed text-slate-300 ${Visualizer ? '' : 'mx-auto w-full max-w-3xl'}`}>
              {detail?.theory ? (
                <div className="min-w-0 max-w-3xl [overflow-wrap:anywhere]">
                  {renderTheoryMarkdown(detail.theory)}
                </div>
              ) : (
                <p className="text-slate-600 text-xs italic">{loadError ? "题目加载失败，请重新选择关卡" : "暂无理论内容"}</p>
              )}
              
              {(detail?.latexFormulas?.length > 0 || detail?.expectedOutput) && (
                <div className="min-w-0 overflow-x-auto bg-slate-900/40 border border-indigo-950/60 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5" /> 核心考核指标与公式
                  </h4>

                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-1.5">
                    {detail.latexFormulas?.map((formula: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-indigo-400 font-mono inline-block">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {`$${formula}$`}
                          </ReactMarkdown>
                        </span>
                      </li>
                    ))}
                    {detail.expectedOutput && <li>预期输出: <code className="px-1 py-0.5 rounded bg-slate-950 text-cyan-400">{detail.expectedOutput}</code></li>}
                  </ul>
                </div>
              )}
            </div>

            {Visualizer && <Visualizer />}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
