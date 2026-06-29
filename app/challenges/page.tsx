'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Compass, 
  Award, 
  BarChart2, 
  FileText, 
  Trophy, 
  ArrowLeft,
  Zap,
  CheckCircle
} from 'lucide-react';
import { SpaceDust } from './components/SpaceDust';
import SpaceUniverse from './components/SpaceUniverse';
import { KnowledgeTree } from './components/KnowledgeTree';
import { QuizWorkspace } from './components/QuizWorkspace';
import { NotesDrawer } from './components/NotesDrawer';
import { LeaderboardDrawer } from './components/LeaderboardDrawer';
import { AchievementsDrawer } from './components/AchievementsDrawer';
import { AnimatePresence } from 'framer-motion';
import { STAGES, Stage } from './components/data';
import InkWashDecoration from '@/app/components/InkWashDecoration';

export default function UniversePage() {
  // 核心层级切换状态: 
  // 'universe' -> 宇宙探索星球图层
  // 'tree' -> 知识节点树图层
  // 'quiz' -> 编程练习和AI答疑层
  const [currentLayer, setCurrentLayer] = useState<'universe' | 'tree' | 'quiz'>('universe');
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [showLeaderboardDrawer, setShowLeaderboardDrawer] = useState<boolean>(false);
  const [showAchievementsDrawer, setShowAchievementsDrawer] = useState<boolean>(false);
  
  // 选中的 Stage 与子节点知识点
  const [selectedStage, setSelectedStage] = useState<Stage>(STAGES[3]); // 默认第四阶段-机器学习
  const [selectedNodeName, setSelectedNodeName] = useState<string>("支持向量机 (SVM)");
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number>(0);

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

  // 动态计算成就指标
  const passedChallengesCount = dbChallenges.filter(c => c.record?.isPassed).length;
  
  // 计算通关阶段数量
  const allStages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let completedStagesCount = 0;
  allStages.forEach(stageId => {
    const stageChallenges = dbChallenges.filter(c => c.stageId === stageId);
    if (stageChallenges.length > 0 && stageChallenges.every(c => c.record?.isPassed)) {
      completedStagesCount++;
    }
  });

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage);
    // 默认优先选中该 Stage 下第一个 Topic 的第一个 Child
    if (stage.topics.length > 0 && stage.topics[0].children.length > 0) {
      setSelectedNodeName(stage.topics[0].children[0]);
    }
    setCurrentLayer('tree');
  };

  return (
    // 去除 fixed inset-0 z-50，改用 relative w-full h-[calc(100vh-4.5rem)] 嵌入父页面流中
    <div className="relative w-full h-[calc(100vh-4.5rem)] min-h-[650px] overflow-hidden bg-black text-slate-100 flex font-sans antialiased">
      {/* 粒子背景 */}
      <SpaceDust />

      {/* 🌌 主视图区 */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* 顶部通栏玻璃态 Header - 放在全局导航栏下方 */}
        <header className="h-14 border-b border-[#234272]/60 bg-[#0C1F3D]/80 backdrop-blur-md px-6 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            {currentLayer !== 'universe' && (
              <button 
                onClick={() => {
                  if (currentLayer === 'quiz') setCurrentLayer('tree');
                  else if (currentLayer === 'tree') setCurrentLayer('universe');
                }}
                className="p-1.5 rounded-lg bg-[#08172F]/80 border border-[#234272] text-slate-400 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/40 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-slate-100 to-[#BBFF5C]">
              AI LEARNING UNIVERSE <span className="text-xs px-2 py-0.5 ml-2 border border-[#BBFF5C]/30 rounded bg-[#BBFF5C]/10 text-[#BBFF5C] font-normal">宇宙探索系统</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> 探索进度: <strong className="text-white">{completedStagesCount}/11 阶段</strong></span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#BBFF5C]" /> 已做通关: <strong className="text-white">{passedChallengesCount} 题</strong></span>
            <span className="w-px h-4 bg-[#234272]/60" />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#BBFF5C] animate-pulse" />
              <span className="text-[11px] text-[#BBFF5C]">沙箱运行中</span>
            </div>
          </div>
        </header>

        {/* 主视口 */}
        <div className="flex-1 overflow-hidden relative">
          {currentLayer === 'universe' && (
            <SpaceUniverse onSelectStage={handleSelectStage} />
          )}

          {currentLayer === 'tree' && (
            <KnowledgeTree
              selectedStage={selectedStage}
              selectedNodeName={selectedNodeName}
              selectedLevelIndex={selectedLevelIndex}
              onSelectNode={setSelectedNodeName}
              onSelectLevel={setSelectedLevelIndex}
              onBackToUniverse={() => setCurrentLayer('universe')}
              onStartQuiz={() => setCurrentLayer('quiz')}
              dbChallenges={dbChallenges}
            />
          )}

          {currentLayer === 'quiz' && (
            <QuizWorkspace selectedNodeName={selectedNodeName} initialLevelIndex={selectedLevelIndex} />
          )}
        </div>
      </div>

      {/* 🌐 导航 Sidebar 改为右侧放置，修改为 border-l 贴合右边缘 */}
      <div className="w-16 border-l border-[#234272]/60 bg-[#08172F]/90 backdrop-blur-md flex flex-col items-center py-6 gap-6 z-10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6366f1] to-[#BBFF5C] flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(187,255,92,0.4)]">
          <Trophy className="w-4 h-4 text-[#0C1F3D] font-bold" />
        </div>
        
        <div className="flex-1 flex flex-col gap-5 w-full px-1.5">
          <button 
            onClick={() => { setCurrentLayer('universe'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'universe' ? 'bg-[#BBFF5C]/15 border-r-2 border-[#BBFF5C] text-[#BBFF5C]' : 'text-slate-500 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/30'}`}
          >
            <Globe className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">星空</span>
          </button>
          
          <button 
            onClick={() => { setCurrentLayer('tree'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'tree' ? 'bg-[#BBFF5C]/15 border-r-2 border-[#BBFF5C] text-[#BBFF5C]' : 'text-slate-500 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/30'}`}
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
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showAchievementsDrawer ? 'bg-[#BBFF5C]/15 border-r-2 border-[#BBFF5C] text-[#BBFF5C]' : 'text-slate-500 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/30'}`}
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
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showLeaderboardDrawer ? 'bg-[#BBFF5C]/15 border-r-2 border-[#BBFF5C] text-[#BBFF5C]' : 'text-slate-500 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/30'}`}
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
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${showNotesDrawer ? 'bg-[#BBFF5C]/15 border-r-2 border-[#BBFF5C] text-[#BBFF5C]' : 'text-slate-500 hover:text-[#BBFF5C] hover:bg-[#1E3E6E]/30'}`}
          >
            <FileText className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">笔记</span>
          </button>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
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
          <AchievementsDrawer onClose={() => setShowAchievementsDrawer(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
