'use client';

import React, { useState } from 'react';
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
import { STAGES, Stage } from './components/data';

export default function UniversePage() {
  // 核心层级切换状态: 
  // 'universe' -> 宇宙探索星球图层
  // 'tree' -> 知识节点树图层
  // 'quiz' -> 编程练习和AI答疑层
  const [currentLayer, setCurrentLayer] = useState<'universe' | 'tree' | 'quiz'>('universe');
  
  // 选中的 Stage 与子节点知识点
  const [selectedStage, setSelectedStage] = useState<Stage>(STAGES[3]); // 默认第四阶段-机器学习
  const [selectedNodeName, setSelectedNodeName] = useState<string>("支持向量机 (SVM)");

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage);
    // 默认选中该 Stage 下第一个 Topic 的第一个 Child
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
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* 顶部通栏玻璃态 Header - 放在全局导航栏下方 */}
        <header className="h-14 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md px-6 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            {currentLayer !== 'universe' && (
              <button 
                onClick={() => {
                  if (currentLayer === 'quiz') setCurrentLayer('tree');
                  else if (currentLayer === 'tree') setCurrentLayer('universe');
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400">
              AI LEARNING UNIVERSE <span className="text-xs px-2 py-0.5 ml-2 border border-indigo-500/30 rounded bg-indigo-950/40 text-indigo-300 font-normal">宇宙探索系统</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> 探索进度: <strong className="text-white">7/9 阶段</strong></span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> 已做题目: <strong className="text-white">324 题</strong></span>
            <span className="w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-400">沙箱运行中</span>
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
              onSelectNode={setSelectedNodeName}
              onBackToUniverse={() => setCurrentLayer('universe')}
              onStartQuiz={() => setCurrentLayer('quiz')}
            />
          )}

          {currentLayer === 'quiz' && (
            <QuizWorkspace selectedNodeName={selectedNodeName} />
          )}
        </div>
      </div>

      {/* 🌐 导航 Sidebar 改为右侧放置，修改为 border-l 贴合右边缘 */}
      <div className="w-16 border-l border-slate-900 bg-slate-950/70 backdrop-blur-md flex flex-col items-center py-6 gap-6 z-10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        
        <div className="flex-1 flex flex-col gap-5 w-full px-1.5">
          <button 
            onClick={() => { setCurrentLayer('universe'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'universe' ? 'bg-indigo-600/30 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Globe className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">星空</span>
          </button>
          
          <button 
            onClick={() => { setCurrentLayer('tree'); }}
            className={`w-full py-2.5 rounded-xl flex flex-col items-center gap-1 group transition-all ${currentLayer === 'tree' ? 'bg-indigo-600/30 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Compass className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-medium tracking-wider">知识</span>
          </button>

          <button 
            className="w-full py-2.5 rounded-xl flex flex-col items-center gap-1 text-slate-700 cursor-not-allowed"
            title="开发中..."
          >
            <Award className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium tracking-wider">成就</span>
          </button>

          <button 
            className="w-full py-2.5 rounded-xl flex flex-col items-center gap-1 text-slate-700 cursor-not-allowed"
            title="开发中..."
          >
            <BarChart2 className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium tracking-wider">排行</span>
          </button>

          <button 
            className="w-full py-2.5 rounded-xl flex flex-col items-center gap-1 text-slate-700 cursor-not-allowed"
            title="开发中..."
          >
            <FileText className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium tracking-wider">笔记</span>
          </button>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-400 font-mono">
          AI
        </div>
      </div>
    </div>
  );
}
