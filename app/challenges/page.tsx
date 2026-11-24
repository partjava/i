'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  Compass,
  Award,
  BarChart2,
  FileText,
  Trophy,
  ArrowLeft,
  Zap,
  CheckCircle,
  Send
} from 'lucide-react';
import { SpaceDust } from './components/SpaceDust';
import SpaceUniverse from './components/SpaceUniverse';
import { KnowledgeTree } from './components/KnowledgeTree';
import { QuizWorkspace } from './components/QuizWorkspace';
import { NotesDrawer } from './components/NotesDrawer';
import { LeaderboardDrawer } from './components/LeaderboardDrawer';
import { AchievementsDrawer } from './components/AchievementsDrawer';
import { MyChallengesDrawer } from './components/MyChallengesDrawer';
import { AnimatePresence } from 'framer-motion';
import { STAGES, Stage } from './components/data';

export default function UniversePage() {
  // 核心层级切换状态: 
  // 'universe' -> 宇宙探索星球图层
  // 'tree' -> 知识节点树图层
  // 'quiz' -> 编程练习和AI答疑层
  // 从 URL 及本地缓存恢复上次的页面状态，彻底解决刷新跳回默认 SVM 的问题
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return {
        layer: 'universe' as const,
        stage: STAGES[0],
        nodeName: STAGES[0]?.topics[0]?.children[0] || '计算机组成原理',
        levelIndex: 0
      };
    }
    const p = new URLSearchParams(window.location.search);
    const l = p.get('layer');
    const layer: 'universe' | 'tree' | 'quiz' = (l === 'tree' || l === 'quiz') ? l : 'universe';

    // 尝试从 URL 或 sessionStorage 恢复 stage (默认第1阶段基础知识)
    const stageParam = p.get('stage') || sessionStorage.getItem('star_challenge_stage_id');
    const stageId = stageParam ? parseInt(stageParam, 10) : 1;
    const stage = STAGES.find(s => s.id === stageId) || STAGES[0];

    // 尝试从 URL 或 sessionStorage 恢复 node
    const nodeParam = p.get('node') || sessionStorage.getItem('star_challenge_node');
    const defaultNode = stage?.topics[0]?.children[0] || '';
    let nodeName = defaultNode;
    if (nodeParam) {
      try {
        nodeName = decodeURIComponent(nodeParam);
      } catch {
        nodeName = nodeParam;
      }
    }

    // 尝试从 URL 恢复 level
    const levelParam = p.get('level');
    const levelIndex = levelParam ? Math.max(0, parseInt(levelParam, 10)) : 0;

    return { layer, stage, nodeName, levelIndex };
  };

  const [initial] = useState(getInitialState);
  const [currentLayer, setCurrentLayerState] = useState<'universe' | 'tree' | 'quiz'>(initial.layer);
  const [selectedStage, setSelectedStageState] = useState<Stage>(initial.stage);
  const [selectedNodeName, setSelectedNodeNameState] = useState<string>(initial.nodeName);
  const [selectedLevelIndex, setSelectedLevelIndexState] = useState<number>(initial.levelIndex);

  // 统一同步 URL 与浏览器历史记录
  const syncNavigation = useCallback((
    layer: 'universe' | 'tree' | 'quiz',
    stage: Stage,
    node: string,
    level: number
  ) => {
    setCurrentLayerState(layer);
    setSelectedStageState(stage);
    setSelectedNodeNameState(node);
    setSelectedLevelIndexState(level);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (layer === 'universe') {
        url.searchParams.delete('layer');
        url.searchParams.delete('stage');
        url.searchParams.delete('node');
        url.searchParams.delete('level');
      } else {
        url.searchParams.set('layer', layer);
        url.searchParams.set('stage', String(stage.id));
        if (node) url.searchParams.set('node', node);
        url.searchParams.set('level', String(level));
      }
      window.history.replaceState({}, '', url.toString());
      try {
        sessionStorage.setItem('star_challenge_stage_id', String(stage.id));
        if (node) sessionStorage.setItem('star_challenge_node', node);
      } catch {}
    }
  }, []);

  const setCurrentLayer = useCallback((layer: 'universe' | 'tree' | 'quiz') => {
    syncNavigation(layer, selectedStage, selectedNodeName, selectedLevelIndex);
  }, [syncNavigation, selectedStage, selectedNodeName, selectedLevelIndex]);

  const handleSelectStage = useCallback((stage: Stage) => {
    const firstNode = stage.topics[0]?.children[0] || '';
    syncNavigation('tree', stage, firstNode, 0);
  }, [syncNavigation]);

  const handleSelectNode = useCallback((node: string, level: number = 0) => {
    syncNavigation(currentLayer === 'universe' ? 'tree' : currentLayer, selectedStage, node, level);
  }, [syncNavigation, currentLayer, selectedStage]);

  const handleSelectLevel = useCallback((level: number) => {
    setSelectedNodeNameState(currNode => {
      syncNavigation(currentLayer === 'universe' ? 'tree' : currentLayer, selectedStage, currNode, level);
      return currNode;
    });
  }, [syncNavigation, currentLayer, selectedStage]);

  const handleStartQuiz = useCallback(() => {
    syncNavigation('quiz', selectedStage, selectedNodeName, selectedLevelIndex);
  }, [syncNavigation, selectedStage, selectedNodeName, selectedLevelIndex]);

  const handleBackToUniverse = useCallback(() => {
    syncNavigation('universe', selectedStage, selectedNodeName, selectedLevelIndex);
  }, [syncNavigation, selectedStage, selectedNodeName, selectedLevelIndex]);

  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [showLeaderboardDrawer, setShowLeaderboardDrawer] = useState<boolean>(false);
  const [showAchievementsDrawer, setShowAchievementsDrawer] = useState<boolean>(false);
  const [showMyChallenges, setShowMyChallenges] = useState<boolean>(false);

  const [dbChallenges, setDbChallenges] = useState<any[]>([]);

  // 加载全站挑战题库进度
  const loadChallenges = async () => {
    try {
      const res = await fetch('/api/star-challenges');
      const data = await res.json();
      if (data.success && data.challenges) {
        setDbChallenges(data.challenges);
      }
    } catch (e) {
      console.error('加载挑战题库失败:', e);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, [currentLayer]); // 当切层时重新刷新进度（如做完题返回时）

  // 判定关卡是否通过的统一函数，多重兼容前后端各类字段命名
  const isChallengePassed = (c: any) => Boolean(
    c?.completed === true ||
    c?.record?.codePassed === true ||
    c?.record?.isPassed === true ||
    c?.userRecord?.codePassed === true ||
    c?.userRecord?.isPassed === true
  );

  // 动态计算成就指标
  const passedChallengesCount = dbChallenges.filter(isChallengePassed).length;
  
  // 计算通关阶段数量
  const allStages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let completedStagesCount = 0;
  allStages.forEach(stageId => {
    const stageChallenges = dbChallenges.filter(c => c.stageId === stageId);
    if (stageChallenges.length > 0 && stageChallenges.every(isChallengePassed)) {
      completedStagesCount++;
    }
  });

  return (
    // 去除 fixed inset-0 z-50，改用 relative w-full h-[calc(100vh-4.5rem)] 嵌入父页面流中
    <div className="relative w-full h-[calc(100vh-4.5rem)] min-h-[650px] overflow-hidden bg-[#0B0E14] text-[#F2EDE4] flex font-sans antialiased">
      {/* 粒子背景 */}
      <SpaceDust />

      {/* 🌌 主视图区 */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* 顶部通栏玻璃态 Header - 放在全局导航栏下方 */}
        <header className="h-14 border-b border-white/10 bg-[#0E1116]/88 backdrop-blur-md px-6 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            {currentLayer !== 'universe' && (
              <button 
                onClick={() => {
                  if (currentLayer === 'quiz') setCurrentLayer('tree');
                  else if (currentLayer === 'tree') setCurrentLayer('universe');
                }}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4AD72] hover:border-[#D4AD72]/40 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base font-bold tracking-wider text-[#F2EDE4] flex items-center gap-2">
              <span>禾硙 · AI 闯关星图</span>
              <span className="text-[11px] font-mono px-2 py-0.5 border border-[#D4AD72]/35 rounded-full bg-[#D4AD72]/10 text-[#D4AD72] font-medium">
                11 STAGES
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#D4AD72]" /> 探索进度: <strong className="text-white font-mono">{completedStagesCount}/11 阶段</strong></span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 已做通关: <strong className="text-white font-mono">{passedChallengesCount} 题</strong></span>
            <span className="w-px h-4 bg-white/10" />
            <button
              onClick={() => setShowMyChallenges(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AD72] hover:bg-[#e0bd86] text-[#0E1116] shadow-md transition-all hover:scale-[1.02]"
            >
              <Send className="w-3.5 h-3.5" /> 我要出题
            </button>
          </div>
        </header>

        {/* 主视口 */}
        <main className="flex-1 overflow-hidden relative">
          {currentLayer === 'universe' && (
            <SpaceUniverse onSelectStage={handleSelectStage} dbChallenges={dbChallenges} />
          )}

          {currentLayer === 'tree' && (
            <KnowledgeTree
              selectedStage={selectedStage}
              selectedNodeName={selectedNodeName}
              selectedLevelIndex={selectedLevelIndex}
              onSelectNode={handleSelectNode}
              onSelectLevel={handleSelectLevel}
              onBackToUniverse={handleBackToUniverse}
              onStartQuiz={handleStartQuiz}
              dbChallenges={dbChallenges}
            />
          )}

          {currentLayer === 'quiz' && (
            <QuizWorkspace
              selectedNodeName={selectedNodeName}
              initialLevelIndex={selectedLevelIndex}
              onLevelChange={handleSelectLevel}
              onChallengePassed={loadChallenges}
            />
          )}
        </main>
      </div>

      {/* 🌐 导航 Sidebar 改为右侧放置，修改为 border-l 贴合右边缘 */}
      <div className="w-16 border-l border-white/10 bg-[#12161F]/92 backdrop-blur-md flex flex-col items-center py-6 gap-6 z-10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#D4AD72]/15 border border-[#D4AD72]/40 flex items-center justify-center shadow-[0_0_12px_rgba(212,173,114,0.2)]">
          <Trophy className="w-4 h-4 text-[#D4AD72]" />
        </div>
        
        <div className="flex-1 flex flex-col gap-5 w-full px-1.5">
          <button 
            onClick={() => { setCurrentLayer('universe'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'universe' ? 'bg-[#D4AD72]/15 border-r-2 border-[#D4AD72] text-[#D4AD72]' : 'text-slate-400 hover:text-[#F2EDE4] hover:bg-white/5'}`}
          >
            <Globe className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">星空</span>
          </button>
          
          <button 
            onClick={() => { setCurrentLayer('tree'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'tree' ? 'bg-[#D4AD72]/15 border-r-2 border-[#D4AD72] text-[#D4AD72]' : 'text-slate-400 hover:text-[#F2EDE4] hover:bg-white/5'}`}
          >
            <Compass className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">知识</span>
          </button>

          <button 
            onClick={() => {
              setShowAchievementsDrawer(!showAchievementsDrawer);
              setShowNotesDrawer(false);
              setShowLeaderboardDrawer(false);
            }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showAchievementsDrawer ? 'bg-[#D4AD72]/15 border-r-2 border-[#D4AD72] text-[#D4AD72]' : 'text-slate-400 hover:text-[#F2EDE4] hover:bg-white/5'}`}
          >
            <Award className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">成就</span>
          </button>

          <button 
            onClick={() => {
              setShowLeaderboardDrawer(!showLeaderboardDrawer);
              setShowNotesDrawer(false);
              setShowAchievementsDrawer(false);
            }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showLeaderboardDrawer ? 'bg-[#D4AD72]/15 border-r-2 border-[#D4AD72] text-[#D4AD72]' : 'text-slate-400 hover:text-[#F2EDE4] hover:bg-white/5'}`}
          >
            <BarChart2 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">排行</span>
          </button>

          <button 
            onClick={() => {
              setShowNotesDrawer(!showNotesDrawer);
              setShowAchievementsDrawer(false);
              setShowLeaderboardDrawer(false);
            }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showNotesDrawer ? 'bg-[#D4AD72]/15 border-r-2 border-[#D4AD72] text-[#D4AD72]' : 'text-slate-400 hover:text-[#F2EDE4] hover:bg-white/5'}`}
          >
            <FileText className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">笔记</span>
          </button>

        </div>

        <div className="w-8 h-8 rounded-full bg-[#181D27] border border-white/10 flex items-center justify-center text-[10px] text-[#D4AD72] font-mono">
          AI
        </div>
      </div>

      <AnimatePresence>
        {showNotesDrawer && (
          <NotesDrawer onClose={() => setShowNotesDrawer(false)} />
        )}
        {showLeaderboardDrawer && (
          <LeaderboardDrawer onClose={() => setShowLeaderboardDrawer(false)} />
        )}
        {showAchievementsDrawer && (
          <AchievementsDrawer onClose={() => setShowAchievementsDrawer(false)} dbChallenges={dbChallenges} />
        )}
        {showMyChallenges && (
          <MyChallengesDrawer onClose={() => setShowMyChallenges(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
