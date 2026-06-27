'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, ChevronRight, ArrowLeft, Cpu } from 'lucide-react';
import { Stage } from './data';
import { SvmVisualizer } from './SvmVisualizer';

interface KnowledgeTreeProps {
  selectedStage: Stage;
  selectedNodeName: string;
  onSelectNode: (nodeName: string) => void;
  onBackToUniverse: () => void;
  onStartQuiz: () => void;
}

export const KnowledgeTree: React.FC<KnowledgeTreeProps> = ({
  selectedStage,
  selectedNodeName,
  onSelectNode,
  onBackToUniverse,
  onStartQuiz
}) => {
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
                {topic.children.map((child, cIdx) => {
                  const isSelected = selectedNodeName === child;
                  return (
                    <button
                      key={cIdx}
                      onClick={() => onSelectNode(child)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition ${isSelected ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'}`}
                    >
                      <span>{child}</span>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 transition ${isSelected ? 'rotate-90' : ''}`} />
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
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase text-indigo-400 font-bold tracking-widest font-mono">SELECTED NODE</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-xs text-slate-400">{selectedStage.name}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">{selectedNodeName}</h2>
          </div>

          {/* 看板文字简介区 */}
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-slate-900/60 pt-4 font-normal">
            <p>
              本节点作为该阶段的核心内容，主要解决机器学习中的线性分类器构建和分类决策边界设定。通过寻找最小的超参数组合达到最高的泛化水准。
            </p>
            
            <div className="bg-slate-900/40 border border-indigo-950/60 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 animate-spin" /> 本课核心考核指标与公式：
              </h4>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1.5 pl-1.5">
                <li>核心超平面方程: <code className="px-1 py-0.5 rounded bg-slate-950 text-indigo-400">$w^T x + b = 0$</code></li>
                <li>特征映射与正则化收敛系数优化设定。</li>
                <li>在复杂不可分样本上通过核方法执行特征维度的跃迁。</li>
              </ul>
            </div>
          </div>

          {selectedNodeName === "支持向量机 (SVM)" ? (
            <SvmVisualizer />
          ) : (
            // 其它课程提供默认的精美科幻图表占位
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col items-center max-w-sm">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center mb-3">
                <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
              <span className="text-xs text-slate-400">已自动载入 {selectedNodeName} 沙箱模块</span>
            </div>
          )}
        </div>

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
