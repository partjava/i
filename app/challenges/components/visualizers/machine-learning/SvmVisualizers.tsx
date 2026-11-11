'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const SvmHingeVisualizer: React.FC = () => {
  const [b, setB] = useState<number>(-75); // 截距
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
    <div className="bg-slate-900/40 border border-blue-900/30 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center min-w-0 w-full">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-sm font-semibold text-cyan-300">交互演示：线性分类边界与间隔</span>
      </div>
      
      <svg viewBox="0 0 280 220" role="img" aria-label="两类样本、分类边界和间隔" className="w-full bg-[#030308] border border-blue-950/60 rounded-xl filter drop-shadow-[0_0_10px_rgba(59,130,246,0.15)]">
        {/* 网络细格线 */}
        <line x1="0" y1="110" x2="280" y2="110" stroke="rgba(255,255,255,0.03)" />
        <line x1="140" y1="0" x2="140" y2="220" stroke="rgba(255,255,255,0.03)" />

        {/* 间隔边缘虚线 Margin Boundaries */}
        {/* y = 0.8x + b + 110 +/- margin */}
        <line x1="0" y1={b + 110 - margin * Math.hypot(1, 0.8)} x2="280" y2={0.8 * 280 + b + 110 - margin * Math.hypot(1, 0.8)} stroke="rgba(6, 182, 212, 0.25)" strokeDasharray="3" strokeWidth="1.5" />
        <line x1="0" y1={b + 110 + margin * Math.hypot(1, 0.8)} x2="280" y2={0.8 * 280 + b + 110 + margin * Math.hypot(1, 0.8)} stroke="rgba(236, 72, 153, 0.25)" strokeDasharray="3" strokeWidth="1.5" />

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

      <p className="mt-3 text-xs text-slate-300">青点为正类，粉点为负类，紫线为分类边界，虚线标出两侧的间隔。</p>
      <div className="w-full mt-5 space-y-3">
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex justify-between text-gray-400 font-mono">
            <span>超平面截距 (Bias b)</span>
            <span className="text-cyan-400">{b}</span>
          </div>
          <input 
            aria-label="超平面截距" type="range" 
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
            <span className="text-pink-400">{margin}</span>
          </div>
          <input 
            aria-label="几何间隔" type="range" 
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

export function SvmKernelVisualizer() {
  const [gamma, setGamma] = useState(0.8);
  const [position, setPosition] = useState(0.5);
  const left = Math.exp(-gamma * (position + 1) ** 2);
  const right = Math.exp(-gamma * (position - 1) ** 2);
  const score = right - left;

  return (
    <section className="min-w-0 rounded-2xl border border-blue-900/30 bg-slate-900/40 p-5">
      <h3 className="text-sm font-semibold text-cyan-300">RBF 核与对偶预测</h3>
      <p className="my-3 text-xs leading-relaxed text-slate-300">
        移动待分类点，观察它与两个训练样本的相似度。这里两个样本的对偶系数均为 1，偏置为 0。
      </p>
      <svg viewBox="0 0 320 100" className="w-full rounded-xl bg-slate-950" role="img" aria-label="两个训练样本和一个待分类点">
        <line x1="30" x2="290" y1="52" y2="52" stroke="#475569" />
        <circle cx="95" cy="52" r="6" fill="#f472b6" />
        <circle cx="225" cy="52" r="6" fill="#22d3ee" />
        <circle cx={160 + 65 * position} cy="52" r="11" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="95" y="78" textAnchor="middle" fill="#f9a8d4" fontSize="12">−1 类</text>
        <text x="225" y="78" textAnchor="middle" fill="#67e8f9" fontSize="12">+1 类</text>
        <text x={160 + 65 * position} y="28" textAnchor="middle" fill="#c4b5fd" fontSize="12">待分类点</text>
      </svg>
      <div className="mt-4 space-y-3 text-xs text-slate-300">
        <label className="block">待分类点位置 {position.toFixed(2)}
          <input className="block w-full accent-violet-500" type="range" min="-2" max="2" step="0.05" value={position} onChange={event => setPosition(Number(event.target.value))} />
        </label>
        <label className="block">核参数 γ {gamma.toFixed(1)}
          <input className="block w-full accent-violet-500" type="range" min="0.1" max="3" step="0.1" value={gamma} onChange={event => setGamma(Number(event.target.value))} />
        </label>
        <dl className="grid grid-cols-2 gap-2 rounded-lg bg-slate-950 p-3">
          <dt>与负类的相似度</dt><dd className="text-right text-pink-300">{left.toFixed(3)}</dd>
          <dt>与正类的相似度</dt><dd className="text-right text-cyan-300">{right.toFixed(3)}</dd>
          <dt>对偶得分与预测</dt><dd className="text-right text-violet-300">{score.toFixed(3)} · {score === 0 ? '分类边界' : score > 0 ? '+1 类' : '−1 类'}</dd>
        </dl>
      </div>
    </section>
  );
}
