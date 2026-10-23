'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface DiffPoint {
  id: number;
  x: number;
  y: number;
  r: number;
  label: string;
}

interface Scene {
  name: string;
  renderBase: (ctx: CanvasRenderingContext2D, ox: number, oy: number, w: number, h: number) => void;
  renderDiff: (ctx: CanvasRenderingContext2D, ox: number, oy: number, isRightSide: boolean) => void;
  diffs: DiffPoint[];
}

// 场景定义 (每个场景拥有 5 个精妙的不同点)
const SCENES: Scene[] = [
  {
    name: '☕ 程序员的书桌与台灯',
    diffs: [
      { id: 1, x: 75, y: 155, r: 18, label: '咖啡杯热气' },
      { id: 2, x: 165, y: 70, r: 16, label: '时钟指针位置' },
      { id: 3, x: 110, y: 110, r: 20, label: '显示屏代码行数' },
      { id: 4, x: 185, y: 145, r: 15, label: '盆栽叶片' },
      { id: 5, x: 35, y: 75, r: 16, label: '台灯反光' },
    ],
    renderBase: (ctx, ox, oy, w, h) => {
      // 房间背景
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(ox, oy, w, h);
      // 书桌
      ctx.fillStyle = '#b45309';
      ctx.fillRect(ox + 10, oy + 130, w - 20, 50);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(ox + 10, oy + 170, w - 20, 10);
      // 显示器外壳
      ctx.fillStyle = '#334155';
      ctx.fillRect(ox + 70, oy + 80, 80, 55);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(ox + 74, oy + 84, 72, 47);
      // 显示器支架
      ctx.fillStyle = '#64748b';
      ctx.fillRect(ox + 105, oy + 135, 10, 12);
      ctx.fillRect(ox + 95, oy + 147, 30, 4);
      // 挂钟
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath(); ctx.arc(ox + 165, oy + 70, 14, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 2; ctx.stroke();
      // 盆栽
      ctx.fillStyle = '#ea580c';
      ctx.beginPath(); ctx.roundRect(ox + 175, oy + 140, 20, 16, 2); ctx.fill();
      // 台灯
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(ox + 25, oy + 140); ctx.lineTo(ox + 35, oy + 95); ctx.lineTo(ox + 48, oy + 85); ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(ox + 48, oy + 85, 10, 0, Math.PI * 2); ctx.fill();
      // 咖啡杯
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(ox + 65, oy + 145, 18, 16);
    },
    renderDiff: (ctx, ox, oy, isRight) => {
      // 1. 咖啡热气
      if (!isRight) {
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(ox + 70, oy + 142); ctx.quadraticCurveTo(ox + 68, oy + 130, ox + 72, oy + 125); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox + 77, oy + 142); ctx.quadraticCurveTo(ox + 80, oy + 130, ox + 76, oy + 125); ctx.stroke();
      }
      // 2. 挂钟指针
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(ox + 165, oy + 70);
      if (isRight) ctx.lineTo(ox + 165, oy + 60); else ctx.lineTo(ox + 173, oy + 70);
      ctx.stroke();
      // 3. 显示器代码
      ctx.fillStyle = '#38ef7d';
      for (let i = 0; i < (isRight ? 4 : 2); i++) {
        ctx.fillRect(ox + 78, oy + 90 + i * 8, 30 + (i % 2) * 15, 3);
      }
      // 4. 盆栽叶片
      ctx.fillStyle = '#22c55e';
      ctx.beginPath(); ctx.arc(ox + 185, oy + 134, 6, 0, Math.PI * 2); ctx.fill();
      if (!isRight) {
        ctx.beginPath(); ctx.arc(ox + 193, oy + 130, 5, 0, Math.PI * 2); ctx.fill();
      }
      // 5. 台灯罩
      ctx.fillStyle = isRight ? '#f59e0b' : '#fbbf24';
      ctx.beginPath(); ctx.arc(ox + 35, oy + 75, isRight ? 6 : 8, 0, Math.PI * 2); ctx.fill();
    }
  },
  {
    name: '🚀 太空宇航猫咪',
    diffs: [
      { id: 1, x: 50, y: 50, r: 16, label: '远处星球光环' },
      { id: 2, x: 105, y: 110, r: 18, label: '猫咪胡须' },
      { id: 3, x: 170, y: 60, r: 15, label: '闪烁星芒' },
      { id: 4, x: 110, y: 160, r: 16, label: '宇航服徽章' },
      { id: 5, x: 40, y: 160, r: 16, label: '仪表盘指示灯' },
    ],
    renderBase: (ctx, ox, oy, w, h) => {
      // 太空背景
      ctx.fillStyle = '#030712';
      ctx.fillRect(ox, oy, w, h);
      // 舱窗
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(ox + w / 2, oy + h / 2, 85, 0, Math.PI * 2); ctx.stroke();
      // 宇航猫咪头盔
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.arc(ox + 110, oy + 110, 34, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
      // 猫咪脑袋
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.arc(ox + 110, oy + 112, 22, 0, Math.PI * 2); ctx.fill();
      // 猫耳朵
      ctx.beginPath(); ctx.moveTo(ox + 94, oy + 98); ctx.lineTo(ox + 88, oy + 82); ctx.lineTo(ox + 104, oy + 92); ctx.fill();
      ctx.beginPath(); ctx.moveTo(ox + 126, oy + 98); ctx.lineTo(ox + 132, oy + 82); ctx.lineTo(ox + 116, oy + 92); ctx.fill();
      // 猫眼
      ctx.fillStyle = '#0f172a';
      ctx.beginPath(); ctx.arc(ox + 102, oy + 112, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(ox + 118, oy + 112, 3, 0, Math.PI * 2); ctx.fill();
    },
    renderDiff: (ctx, ox, oy, isRight) => {
      // 1. 左上角星球光环
      ctx.fillStyle = '#a855f7';
      ctx.beginPath(); ctx.arc(ox + 50, oy + 50, 12, 0, Math.PI * 2); ctx.fill();
      if (!isRight) {
        ctx.strokeStyle = '#d8b4fe'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(ox + 50, oy + 50, 18, 5, 0.4, 0, Math.PI * 2); ctx.stroke();
      }
      // 2. 猫胡子
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ox + 90, oy + 115); ctx.lineTo(ox + 80, oy + 114); ctx.stroke();
      if (isRight) {
        ctx.beginPath(); ctx.moveTo(ox + 90, oy + 118); ctx.lineTo(ox + 78, oy + 121); ctx.stroke();
      }
      // 3. 右上角十字星芒
      if (isRight) {
        ctx.fillStyle = '#fef08a';
        ctx.font = '16px Arial';
        ctx.fillText('⭐', ox + 160, oy + 65);
      }
      // 4. 宇航服徽章
      ctx.fillStyle = isRight ? '#ef4444' : '#3b82f6';
      ctx.beginPath(); ctx.arc(ox + 110, oy + 158, 6, 0, Math.PI * 2); ctx.fill();
      // 5. 仪表盘灯
      ctx.fillStyle = isRight ? '#22c55e' : '#f59e0b';
      ctx.beginPath(); ctx.arc(ox + 40, oy + 160, 5, 0, Math.PI * 2); ctx.fill();
    }
  }
];

export default function SpotDiff({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [foundIds, setFoundIds] = useState<number[]>([]);
  const [hintsLeft, setHintsLeft] = useState(2);
  const [activeHint, setActiveHint] = useState<DiffPoint | null>(null);
  const [won, setWon] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = SCENES[sceneIndex % SCENES.length];

  const initGame = useCallback((idx: number) => {
    setSceneIndex(idx);
    setFoundIds([]);
    setHintsLeft(2);
    setActiveHint(null);
    setWon(false);
  }, []);

  // 点击检测不同点
  const handleCheck = useCallback((clickX: number, clickY: number) => {
    if (won) return;

    const subW = 220;
    // 点击在左图还是右图归一化至子图坐标
    const subX = clickX >= 230 ? clickX - 230 : clickX;
    const subY = clickY;

    let hit = false;
    for (const diff of scene.diffs) {
      if (foundIds.includes(diff.id)) continue;
      const dist = Math.sqrt(Math.pow(subX - diff.x, 2) + Math.pow(subY - diff.y, 2));
      if (dist <= diff.r + 10) {
        hit = true;
        soundSynth.playScore();
        const nextFound = [...foundIds, diff.id];
        setFoundIds(nextFound);

        if (nextFound.length === scene.diffs.length) {
          setWon(true);
          soundSynth.playWin();
          onMove('win', { scene: scene.name });
        }
        break;
      }
    }

    if (!hit) {
      soundSynth.playPop();
    }
  }, [won, scene, foundIds, onMove]);

  // 提示道具
  const handleHint = () => {
    if (hintsLeft <= 0 || won) return;
    const unfound = scene.diffs.filter(d => !foundIds.includes(d.id));
    if (unfound.length > 0) {
      setHintsLeft(h => h - 1);
      setActiveHint(unfound[0]);
      soundSynth.playChime(4);
      setTimeout(() => setActiveHint(null), 2500);
    }
  };

  // Canvas 绘制双图对比
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const subW = 215;
    const subH = 210;
    const totalW = 450;
    const totalH = 210;

    ctx.clearRect(0, 0, totalW, totalH);

    // 绘制左图
    scene.renderBase(ctx, 0, 0, subW, subH);
    scene.renderDiff(ctx, 0, 0, false);

    // 绘制中间分割阴影带
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(subW, 0, 20, totalH);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(subW + 10, 10); ctx.lineTo(subW + 10, totalH - 10); ctx.stroke();

    // 绘制右图
    scene.renderBase(ctx, 235, 0, subW, subH);
    scene.renderDiff(ctx, 235, 0, true);

    // 圈出已找到的不同点 (左右图均高亮金色光圈)
    for (const diffId of foundIds) {
      const diff = scene.diffs.find(d => d.id === diffId);
      if (!diff) continue;

      for (const ox of [0, 235]) {
        ctx.save();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ox + diff.x, diff.y, diff.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fill();
        ctx.restore();
      }
    }

    // 绘制当前提示闪烁圈
    if (activeHint) {
      for (const ox of [0, 235]) {
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(ox + activeHint.x, activeHint.y, activeHint.r + 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }, [scene, foundIds, activeHint]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleCheck(x, y);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: 450 }}>
      {/* 场景切换与提示栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {SCENES.map((sc, i) => (
            <button
              key={sc.name}
              onClick={() => initGame(i)}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: sceneIndex === i ? '#4f8cff' : '#2a2e3d',
                color: sceneIndex === i ? '#fff' : '#9aa4bf',
              }}
            >
              场景 {i + 1}: {sc.name.slice(0, 5)}
            </button>
          ))}
        </div>

        <button
          onClick={handleHint}
          disabled={hintsLeft <= 0}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: hintsLeft > 0 ? 'pointer' : 'not-allowed',
            background: hintsLeft > 0 ? '#ff9800' : '#444',
            color: '#fff',
            opacity: hintsLeft > 0 ? 1 : 0.5,
          }}
        >
          💡 提示 ({hintsLeft})
        </button>
      </div>

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>已找全: <b style={{ color: '#ffd700' }}>{foundIds.length} / {scene.diffs.length} 处不同</b></div>
        <div>当前场景: <b style={{ color: '#38bdf8' }}>{scene.name}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 450, height: 210 }}>
        <canvas
          ref={canvasRef}
          width={450}
          height={210}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        />

        {/* 获胜通告 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.94)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#10b981', marginBottom: 6 }}>
              🏆 火眼金睛 全部找全!
            </div>
            <div style={{ fontSize: 16, marginBottom: 18 }}>5 处精巧细节无一遗漏</div>
            <button
              onClick={() => initGame((sceneIndex + 1) % SCENES.length)}
              style={{
                padding: '9px 26px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔄 挑战下一个场景
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 点击左图或右图中发现的不一致之处，圈出全部 5 处不同即可通关</span>
      </div>
    </div>
  );
}
