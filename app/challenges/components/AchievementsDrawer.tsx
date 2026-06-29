'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Award, Lock, Check, Zap, FileText, Globe } from 'lucide-react';

interface AchievementsDrawerProps {
  onClose: () => void;
}

interface Achievement {
  id: string;
  name: string;
  desc: string;
  status: 'unlocked' | 'progress' | 'locked';
  progress?: { current: number; total: number };
  icon: 'award' | 'zap' | 'file';
  unlockedAt?: string;
}

interface StageMilestone {
  id: number;
  name: string;
  desc: string;
  color: string;
  glowColor: string;
  completed: boolean;
  aiRole: string; // 在人工智能中的作用
}

export const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({ onClose }) => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);

  // 11关卡里程碑定义及在AI中的作用
  const milestones: StageMilestone[] = [
    { 
      id: 1, 
      name: '基础知识', 
      desc: '计算机体系、Linux命令行与Git代码协作',
      color: '#4FC3F7', 
      glowColor: 'rgba(79, 195, 247, 0.8)', 
      completed: true, 
      aiRole: '为 AI 开发构建最坚实的底层系统环境支撑。通过 Linux 命令行掌握远程服务器上的 GPU 模型训练、数据挂载，利用 Git 开展模型代码的多人协作与流水线交付。' 
    },
    { 
      id: 2, 
      name: 'Python编程', 
      desc: '高阶数据结构、生成器与装饰器',
      color: '#81C784', 
      glowColor: 'rgba(129, 199, 132, 0.8)', 
      completed: true, 
      aiRole: '人工智能领域的“普通话”。Python 是开发 PyTorch、TensorFlow 等深度学习框架和集成大模型 API 的绝对母语，也是编写数据清洗与模型微调脚本的核心工具。' 
    },
    { 
      id: 3, 
      name: '数学基础', 
      desc: '线性代数、偏导数与凸优化根基',
      color: '#FFD54F', 
      glowColor: 'rgba(255, 213, 79, 0.8)', 
      completed: true, 
      aiRole: 'AI 的底层引擎。线性代数定义了数据在高维向量空间中的 Embedding 变换；偏导数与凸优化构成了神经网络反向传播和损失函数更新参数（学习）的核心数学驱动。' 
    },
    { 
      id: 4, 
      name: '机器学习', 
      desc: '传统监督与无监督机器学习算法',
      color: '#BA68C8', 
      glowColor: 'rgba(186, 104, 200, 0.8)', 
      completed: false, 
      aiRole: '数据挖掘与预测智能的先河。通过回归、决策树和支持向量机（SVM）等经典算法，奠定了模式识别、特征工程和分类聚类等现代人工智能预测系统的通用算法基础。' 
    },
    { 
      id: 5, 
      name: '深度学习', 
      desc: '激活函数、损失函数、MLP与反向传播',
      color: '#64B5F6', 
      glowColor: 'rgba(100, 181, 246, 0.8)', 
      completed: false, 
      aiRole: '感知智能的跃迁。通过反向传播算法训练拥有海量权重的多层感知机（MLP），模拟人脑复杂的层级特征表达能力，是现代生成式 AI 和超大规模大语言模型（LLM）的底层骨架。' 
    },
    { 
      id: 6, 
      name: '计算机视觉', 
      desc: '卷积神经网络CNN与YOLO目标检测',
      color: '#00B4D8', 
      glowColor: 'rgba(0, 180, 216, 0.8)', 
      completed: false, 
      aiRole: '赋予机器“看懂世界”的感知力。利用卷积神经网络（CNN）与 YOLO 等算法，广泛应用于自动驾驶、缺陷检测、医疗影像识别及近年来流行的 SAM（分割万物）视觉基础大模型。' 
    },
    { 
      id: 7, 
      name: '自然语言处理', 
      desc: '文本分词与Transformer自注意力机制',
      color: '#EC4899', 
      glowColor: 'rgba(236, 72, 153, 0.8)', 
      completed: false, 
      aiRole: '攻克机器理解人类语言的终极难关。引入 Self-Attention（自注意力机制）和 Transformer 架构，颠覆了传统的序列建模，为现代千亿级参数的大预训练模型奠定了基石。' 
    },
    { 
      id: 8, 
      name: '大模型（LLM）', 
      desc: 'Prompt工程、向量数据库RAG与智能体',
      color: '#FF8A65', 
      glowColor: 'rgba(255, 138, 101, 0.8)', 
      completed: false, 
      aiRole: '通往通用人工智能（AGI）的核心钥匙。通过提示词工程、检索增强生成（RAG）让模型获取实时外部数据，并借助 Tool Use 使得大模型具备思考、规划与调用工具解决复杂任务的 Agent 决策能力。' 
    },
    { 
      id: 9, 
      name: '强化学习', 
      desc: '马尔可夫决策过程(MDP)及DQN、PPO',
      color: '#A1887F', 
      glowColor: 'rgba(161, 136, 127, 0.8)', 
      completed: false, 
      aiRole: 'AI 自主进化的终极引擎。依靠环境状态、行动与试错奖励，让 AI 在无人工标注数据下进行自我博弈。是 OpenAI o1 推理模型底层强化学习搜索、AlphaGo 战胜人类及自动驾驶控制的核心基石。' 
    },
    { 
      id: 10, 
      name: '工程部署', 
      desc: '模型API开发、Docker封装与本地推理',
      color: '#90A4AE', 
      glowColor: 'rgba(144, 164, 174, 0.8)', 
      completed: false, 
      aiRole: '将前沿 AI 技术真正落地商业的桥梁。将庞大的神经网络转换为高效的 FastAPI 接口，运用 Docker 容器实现多云部署，并利用 Ollama 和 vLLM 对推理速度进行硬件加速，落地千行百业。' 
    },
    { 
      id: 11, 
      name: '项目实战', 
      desc: '开发多智能体系统与自进化AI工作流',
      color: '#F06292', 
      glowColor: 'rgba(240, 98, 146, 0.8)', 
      completed: false, 
      aiRole: '工程能力的集大成者。通过设计多智能体协同工作流（Multi-Agent System）和自进化编程助手，把模型推理封装为能够解决现实工程问题的高可靠工业级应用。' 
    }
  ];

  // 3个简单的个人基础成就
  const simpleAchievements: Achievement[] = [
    { id: 'first_blood', name: '初试锋芒 (First Blood)', desc: '成功运行 Docker 沙箱并通过 1 个编程挑战关卡。', status: 'unlocked', icon: 'zap', unlockedAt: '2026-06-27' },
    { id: 'cot_master', name: '思维觉醒 (CoT Scholar)', desc: '提交 AI 思考答疑回答，并获得 8.5 分以上的成绩。', status: 'unlocked', icon: 'award', unlockedAt: '2026-06-27' },
    { id: 'note_writer', name: '随堂速记 (Scholar Note)', desc: '在编程挑战的随堂笔记中，记录 5 条学习笔记。', status: 'progress', progress: { current: 3, total: 5 }, icon: 'file' },
  ];

  const selectedStage = milestones[selectedMilestoneIndex];
  const unlockedMilestonesCount = milestones.filter(m => m.completed).length;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-16 h-full w-[360px] bg-slate-950/95 border-l border-slate-900 backdrop-blur-xl z-20 shadow-2xl flex flex-col overflow-hidden font-sans"
    >
      {/* 头部 */}
      <div className="h-14 border-b border-slate-900 px-5 flex justify-between items-center bg-slate-950 shrink-0">
        <h3 className="text-xs font-bold tracking-wider text-slate-200 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-purple-400" />
          星际探索成就 (Achievements)
        </h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-950 text-slate-500 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 主内容滚动区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4.5 scrollbar-thin select-text">
        
        {/* 里程碑板块 🌌 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[11px] font-bold tracking-wider text-slate-400">星系节点通关里程碑</h4>
            <span className="text-[10px] text-purple-400 font-mono font-bold">
              星空基站: {unlockedMilestonesCount} / 11已亮起
            </span>
          </div>

          {/* 11 关卡图标网格 */}
          <div className="grid grid-cols-6 gap-2 bg-slate-900/20 border border-slate-900 p-3 rounded-2xl">
            {milestones.map((m, idx) => {
              const isSelected = selectedMilestoneIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestoneIndex(idx)}
                  className="relative group aspect-square rounded-full flex items-center justify-center transition-all focus:outline-none"
                  style={{
                    border: isSelected ? `2px solid ${m.color}` : '1px solid rgba(255,255,255,0.05)',
                    background: m.completed ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.9)',
                    boxShadow: (m.completed || isSelected) ? `0 0 12px ${m.glowColor}` : 'none',
                  }}
                  title={m.name}
                >
                  {/* 通关发光中心球体 */}
                  <div 
                    className="w-4.5 h-4.5 rounded-full transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                    style={{
                      background: m.completed ? m.color : '#334155',
                      opacity: m.completed ? 1 : 0.4
                    }}
                  >
                    {m.completed ? (
                      <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3.5]" />
                    ) : (
                      <span className="text-[8px] text-slate-400 font-bold font-mono">{m.id}</span>
                    )}
                  </div>

                  {/* 悬浮或选中的发光环绕轨道效果 */}
                  {isSelected && (
                    <span 
                      className="absolute inset-0 rounded-full border border-dashed animate-spin"
                      style={{ borderColor: m.color, animationDuration: '6s' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 里程碑详细卡片 (显示AI中的作用) */}
          <div 
            className="border rounded-2xl p-4 transition-all duration-350 bg-slate-900/40 relative overflow-hidden"
            style={{ borderColor: `${selectedStage.color}15` }}
          >
            {/* 顶栏 */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">
                  STAGE {selectedStage.id}
                </span>
                <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedStage.color }} />
                  {selectedStage.name}
                </h5>
              </div>
              <div 
                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono shadow-sm border"
                style={{ 
                  color: selectedStage.completed ? selectedStage.color : '#64748b', 
                  borderColor: selectedStage.completed ? `${selectedStage.color}40` : '#334155',
                  backgroundColor: selectedStage.completed ? `${selectedStage.color}05` : 'transparent'
                }}
              >
                {selectedStage.completed ? '🌌 节点已亮起' : '🔒 节点未解锁'}
              </div>
            </div>

            {/* 关卡描述 */}
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              课程重点: {selectedStage.desc}
            </p>

            {/* AI的作用介绍板块 */}
            <div className="mt-3.5 pt-3.5 border-t border-slate-900 space-y-1.5 text-left">
              <span 
                className="text-[9px] font-bold tracking-wider uppercase block font-mono"
                style={{ color: selectedStage.color }}
              >
                🧠 关卡在人工智能中的作用:
              </span>
              <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans">
                {selectedStage.aiRole}
              </p>
            </div>
          </div>
        </div>

        {/* 基础个人成就板块 */}
        <div className="space-y-3 pt-1">
          <h4 className="text-[11px] font-bold tracking-wider text-slate-400 px-1">特殊探索勋章</h4>
          <div className="space-y-3">
            {simpleAchievements.map((a) => {
              const isUnlocked = a.status === 'unlocked';
              const isProgress = a.status === 'progress';

              return (
                <div 
                  key={a.id}
                  className={`border rounded-2xl p-4 transition-all relative overflow-hidden ${
                    isUnlocked 
                      ? 'bg-purple-950/5 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.03)]' 
                      : 'bg-slate-900/10 border-slate-900 hover:border-slate-850'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-slate-900 text-indigo-400 border border-slate-850'
                    }`}>
                      {a.icon === 'zap' ? <Zap className="w-4 h-4" /> :
                       a.icon === 'file' ? <FileText className="w-4 h-4" /> :
                       <Award className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`text-xs font-bold ${isUnlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                          {a.name}
                        </h4>
                        {isUnlocked && (
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed pr-2">
                        {a.desc}
                      </p>

                      {isProgress && a.progress && (
                        <div className="pt-2">
                          <div className="flex justify-between text-[9px] text-slate-500 font-mono mb-1">
                            <span>探索进度</span>
                            <span>{a.progress.current} / {a.progress.total}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              style={{ width: `${(a.progress.current / a.progress.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {isUnlocked && a.unlockedAt && (
                        <p className="text-[9px] text-purple-500/60 font-mono pt-1">
                          解锁于: {a.unlockedAt}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
