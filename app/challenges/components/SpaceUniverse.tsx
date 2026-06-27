'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from 'lucide-react';
import { STAGES, Stage } from "../data/stages";
import StarBackground from "./StarBackground";

interface Props {
  onSelectStage: (stage: Stage) => void;
}

// 关联 Stage 的魔幻森林动物头像映射
const STAGE_ANIMAL_IMAGES: Record<number, string> = {
  1: "/images/animals/owl.png",      // 基础知识
  2: "/images/animals/snake.png",    // Python编程
  3: "/images/animals/fox.png",      // 数学基础
  4: "/images/animals/squirrel.png", // 机器学习
  5: "/images/animals/wolf.png",     // 深度学习
  6: "/images/animals/eagle.png",    // 计算机视觉
  7: "/images/animals/parrot.png",   // 自然语言处理
  8: "/images/animals/bear.png",     // 大模型
  9: "/images/animals/raccoon.png",  // 强化学习
  10: "/images/animals/beaver.png",  // 工程部署
  11: "/images/animals/deer.png"     // 项目实战
};

interface DragNode extends Stage {
  x: number;
  y: number;
}

export default function SpaceUniverse({ onSelectStage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<DragNode[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<number | null>(null);

  // 拖拽相关状态
  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  // 1. 初始化位置：随机散落并确保不超出边界
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const initialNodes = STAGES.map((stage, idx) => {
      // 采用 4x3 网格分区散落，保证均匀且不堆叠
      const cols = 4;
      const rows = 3;
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      const cellWidth = width / cols;
      const cellHeight = height / rows;

      const x = cellWidth * col + cellWidth / 2 + (Math.random() - 0.5) * (cellWidth * 0.4);
      const y = cellHeight * row + cellHeight / 2 + (Math.random() - 0.5) * (cellHeight * 0.4);

      return {
        ...stage,
        x: Math.max(80, Math.min(width - 80, x)),
        y: Math.max(80, Math.min(height - 80, y))
      };
    });

    setNodes(initialNodes);
  }, []);

  // 2. 🌌 鼠标位置视差影响
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 3. 🖱️ 鼠标拖拽事件处理器
  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setActiveDragId(id);
    setHasDragged(false);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (activeDragId === null) return;
    setHasDragged(true);

    setNodes(prev => prev.map(n => {
      if (n.id === activeDragId) {
        const container = containerRef.current;
        const limitX = container ? container.clientWidth - 80 : window.innerWidth - 80;
        const limitY = container ? container.clientHeight - 80 : window.innerHeight - 80;

        return {
          ...n,
          x: Math.max(80, Math.min(limitX, e.clientX - dragOffset.x)),
          y: Math.max(80, Math.min(limitY, e.clientY - dragOffset.y))
        };
      }
      return n;
    }));
  };

  const handleMouseUp = () => {
    setActiveDragId(null);
  };

  // 4. 📱 移动端触控拖拽支持
  const handleTouchStart = (id: number, e: React.TouchEvent) => {
    const touch = e.touches[0];
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    setActiveDragId(id);
    setHasDragged(false);
    setDragOffset({
      x: touch.clientX - node.x,
      y: touch.clientY - node.y
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (activeDragId === null) return;
    setHasDragged(true);
    const touch = e.touches[0];

    setNodes(prev => prev.map(n => {
      if (n.id === activeDragId) {
        const container = containerRef.current;
        const limitX = container ? container.clientWidth - 80 : window.innerWidth - 80;
        const limitY = container ? container.clientHeight - 80 : window.innerHeight - 80;

        return {
          ...n,
          x: Math.max(80, Math.min(limitX, touch.clientX - dragOffset.x)),
          y: Math.max(80, Math.min(limitY, touch.clientY - dragOffset.y))
        };
      }
      return n;
    }));
  };

  // 绑定全局鼠标与触屏移动释放监听器
  useEffect(() => {
    if (activeDragId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [activeDragId, dragOffset]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black select-none"
    >
      {/* 🚀 注入全局 CSS 帧动画：控制连线光流传输与行星的异步漂浮 */}
      <style>{`
        @keyframes lineEnergyFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes organicPlanetFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-energy-flow {
          stroke-dasharray: 6, 6;
          animation: lineEnergyFlow 1.2s linear infinite;
        }
        .animate-organic-float {
          animation: organicPlanetFloat 5s ease-in-out infinite;
        }
      `}</style>

      {/* 🌌 背景粒子星空 */}
      <StarBackground />

      {/* 🪐 深空五彩星云背景光晕 (Deep Space Animated Nebula Clouds) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-900/30 blur-[130px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-cyan-900/30 blur-[120px] animate-pulse"
          style={{ animationDuration: '14s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full bg-indigo-900/25 blur-[100px] animate-pulse"
          style={{ animationDuration: '9s', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-1/4 h-1/4 rounded-full bg-pink-900/20 blur-[90px] animate-pulse"
          style={{ animationDuration: '16s', animationDelay: '3s' }}
        />
      </div>

      {/* 🧠 中心 AI 能量核心 */}
      <div className="absolute left-1/2 top-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="w-full h-full rounded-full bg-purple-600/10 blur-3xl animate-pulse" />
        <div className="absolute inset-8 rounded-full border border-dashed border-purple-500/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-12 rounded-full border border-indigo-500/30 animate-[spin_8s_reverse_infinite]" />
        <div className="absolute inset-16 rounded-full bg-indigo-950/40 shadow-[0_0_60px_rgba(124,58,237,0.4)] blur-sm" />
      </div>

      {/* 🧬 神经网络能量传输连接线：对半分双色渐变，且光流会沿着渐变颜色传输 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          {nodes.map((n, i) =>
            nodes.slice(i + 1, i + 3).map((t, j) => {
              const gradId = `grad-${n.id}-${t.id}`;
              return (
                <linearGradient
                  key={gradId}
                  id={gradId}
                  x1={n.x}
                  y1={n.y}
                  x2={t.x}
                  y2={t.y}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="50%" stopColor={n.color} stopOpacity="0.7" />
                  <stop offset="50%" stopColor={t.color} stopOpacity="0.7" />
                </linearGradient>
              );
            })
          )}
        </defs>
        {nodes.map((n, i) =>
          nodes.slice(i + 1, i + 3).map((t, j) => (
            <line
              key={`${n.id}-${t.id}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={t.x}
              y2={t.y}
              stroke={`url(#grad-${n.id}-${t.id})`}
              strokeWidth="2.5" // 稍微加粗连线，使双色对半渐变更清晰
              className="animate-energy-flow transition-all duration-75"
            />
          ))
        )}
      </svg>

      {/* 🪐 Stage 拖拽与浮动行星节点 */}
      {nodes.map((stage) => {
        const isHovered = hovered === stage.id;
        const isDragging = activeDragId === stage.id;

        return (
          <div
            key={stage.id}
            onMouseDown={(e) => handleMouseDown(stage.id, e)}
            onTouchStart={(e) => handleTouchStart(stage.id, e)}
            onMouseEnter={() => setHovered(stage.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              if (!hasDragged) {
                onSelectStage(stage);
              }
            }}
            className={`absolute z-10 transition-shadow duration-300 ${isDragging ? 'cursor-grabbing scale-105 z-20' : 'cursor-grab hover:z-20'}`}
            style={{
              left: stage.x,
              top: stage.y,
              transform: `translate(-50%, -50%) translate(${mouse.x * (stage.id * 0.12 + 0.25)}px, ${mouse.y * (stage.id * 0.12 + 0.25)}px)`
            }}
          >
            {/* 加上异步的 organic 浮动效果（拖拽时停止浮动以保证手感） */}
            <div
              className={isDragging ? "" : "animate-organic-float"}
              style={{
                animationDelay: `${stage.id * 0.4}s`,
                animationDuration: `${5.2 + (stage.id % 3) * 1.2}s`
              }}
            >
              <div className="relative flex flex-col items-center group">

                {/* 🔮 星云背光 */}
                <div
                  className="absolute -inset-10 rounded-full blur-3xl opacity-60 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${stage.color}b0, transparent)`
                  }}
                />

                {/* 🪐 星圈外环 */}
                <div
                  className="absolute w-26 h-26 md:w-30 md:h-30 rounded-full border border-dashed pointer-events-none transition duration-500 group-hover:scale-110"
                  style={{
                    borderColor: stage.color,
                    opacity: isHovered ? 0.5 : 0.15,
                    animation: 'spin 12s linear infinite'
                  }}
                />

                {/* 💫 环绕轨道电子 */}
                <div
                  className="absolute w-30 h-30 md:w-34 md:h-34 pointer-events-none animate-[spin_6s_linear_infinite]"
                >
                  <span
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      top: '0%',
                      left: '50%',
                      background: stage.color,
                      boxShadow: `0 0 8px ${stage.color}`
                    }}
                  />
                </div>

                {/* 🌎 星球本体：大幅放大 */}
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 bg-slate-950 flex items-center justify-center relative overflow-hidden transition duration-300 shadow-2xl"
                  style={{
                    boxShadow: isHovered
                      ? `0 0 30px ${stage.color}cc, inset 0 0 15px ${stage.color}`
                      : `0 0 12px ${stage.color}44, inset 0 0 8px rgba(255,255,255,0.05)`
                  }}
                >
                  {/* 高清动物图像 */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={STAGE_ANIMAL_IMAGES[stage.id]}
                    alt={stage.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
                    onDragStart={(e) => e.preventDefault()}
                  />

                  {/* 能量色彩滤镜 */}
                  <div
                    className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none"
                    style={{ backgroundColor: stage.color }}
                  />

                  {/* 阶段代号标签 */}
                  <span className="absolute bottom-1 bg-slate-950/85 px-1.5 py-0.5 rounded text-[8px] text-slate-300 font-mono scale-90 border border-white/10 pointer-events-none select-none">
                    ST-0{stage.id}
                  </span>
                </div>

                {/* 🏷️ 标题文本 */}
                <div className="absolute top-22 md:top-26 flex flex-col items-center text-center pointer-events-none min-w-[140px]">
                  <span
                    className="text-xs md:text-sm font-bold text-slate-200 tracking-wide filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)] group-hover:text-white transition-colors"
                  >
                    {stage.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    按住拖动可改变位置
                  </span>
                </div>

                {/* 已经移除了被卡片挡住的冗余 -bottom-6 进入章节按钮，改为直接点击星体触发跳转 */}

                {/* 📌 悬停信息面板 */}
                <AnimatePresence>
                  {isHovered && !isDragging && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-30 w-64 bg-slate-950/90 border border-purple-500/20 rounded-xl p-3.5 backdrop-blur-md shadow-2xl z-50 text-left pointer-events-none select-none"
                    >
                      <span className="text-[9px] uppercase text-indigo-400 font-mono font-bold">Stage 0{stage.id}</span>
                      <h3 className="text-xs font-bold text-white mb-1.5 mt-0.5">{stage.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{stage.desc}</p>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] text-slate-500">
                          <span>掌握进度</span>
                          <span className="text-indigo-400 font-semibold">{stage.id * 10 + 20}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            style={{ width: `${stage.id * 10 + 20}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 text-[10px] text-indigo-300 flex items-center justify-between border-t border-white/5 pt-2">
                        <span>核心知识点: {stage.topics.length} 个</span>
                        <span className="flex items-center text-cyan-400 font-semibold">点击星体直接进入 <ChevronRight className="w-3 h-3 ml-0.5 animate-pulse" /></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}