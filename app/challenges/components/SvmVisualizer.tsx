'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const SvmVisualizer: React.FC = () => {
  const [b, setB] = useState<number>(-45); // 截距
  const [margin, setMargin] = useState<number>(28); // 间隔

  // 正样本点 (Class +1)
  const posPoints = [
    { x: 130, y: 70 },
    { x: 170, y: 55 },
    { x: 210, y: 95 },
    { x: 225, y: 35 }
  ];

  // 负样本点 (Class -1)
  const negPoints = [
    { x: 65, y: 175 },
    { x: 85, y: 215 },
    { x: 105, y: 145 },
    { x: 145, y: 220 }
  ];

  return (
    <div className="bg-slate-900/40 border border-blue-900/30 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center max-w-sm w-full">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-sm font-semibold text-cyan-300">交互演示：2D 支持向量超平面</span>
      </div>
      
      <svg width="280" height="220" className="bg-[#030308] border border-blue-950/60 rounded-xl filter drop-shadow-[0_0_10px_rgba(59,130,246,0.15)]">
        {/* 网络细格线 */}
        <line x1="0" y1="110" x2="280" y2="110" stroke="rgba(255,255,255,0.03)" />
        <line x1="140" y1="0" x2="140" y2="220" stroke="rgba(255,255,255,0.03)" />

        {/* 间隔边缘虚线 Margin Boundaries */}
        {/* y = 0.8x + b + 110 +/- margin */}
        <line x1="0" y1={b + 110 - margin} x2="280" y2={0.8 * 280 + b + 110 - margin} stroke="rgba(6, 182, 212, 0.25)" strokeDasharray="3" strokeWidth="1.5" />
        <line x1="0" y1={b + 110 + margin} x2="280" y2={0.8 * 280 + b + 110 + margin} stroke="rgba(236, 72, 153, 0.25)" strokeDasharray="3" strokeWidth="1.5" />

        {/* 分类超平面 Hyperplane */}
        <line x1="0" y1={b + 110} x2="280" y2={0.8 * 280 + b + 110} stroke="#4f46e5" strokeWidth="2.5" className="filter drop-shadow-[0_0_6px_rgba(79,70,229,0.6)]" />

        {/* 正类样本圈 (蓝) */}
        {posPoints.map((pt, i) => (
          <circle key={`pos-${i}`} cx={pt.x} cy={pt.y} r="6" fill="#06b6d4" className="filter drop-shadow-[0_0_5px_#06b6d4]" />
        ))}

        {/* 负类样本圈 (红/粉) */}
        {negPoints.map((pt, i) => (
          <circle key={`neg-${i}`} cx={pt.x} cy={pt.y} r="6" fill="#ec4899" className="filter drop-shadow-[0_0_5px_#ec4899]" />
        ))}
      </svg>

      <div className="w-full mt-5 space-y-3">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between text-gray-400 font-mono">
            <span>超平面截距 (Bias b)</span>
            <span className="text-cyan-400">{b}</span>
          </div>
          <input 
            type="range" 
            min="-100" 
            max="10" 
            value={b} 
            onChange={(e) => setB(Number(e.target.value))} 
            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
        
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between text-gray-400 font-mono">
            <span>几何间隔 (Margin)</span>
            <span className="text-pink-400">{margin}px</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="50" 
            value={margin} 
            onChange={(e) => setMargin(Number(e.target.value))} 
            className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
          />
        </div>
      </div>
    </div>
  );
};
