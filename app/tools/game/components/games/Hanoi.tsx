'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

const DISK_COLORS = [
  '#ff4757', '#ff6b81', '#ffa502', '#2ed573',
  '#1e90ff', '#70a1ff', '#5352ed', '#9c88ff'
];

export default function Hanoi({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [numDisks, setNumDisks] = useState<number>(4);
  const [pegs, setPegs] = useState<number[][]>([[], [], []]);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);
  const [autoSolving, setAutoSolving] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化
  const initGame = useCallback((disksCount: number) => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    setAutoSolving(false);
    // 柱子 0 从大到小排布盘子 (例如 [4, 3, 2, 1])
    const initialPeg0: number[] = [];
    for (let i = disksCount; i >= 1; i--) initialPeg0.push(i);
    setPegs([initialPeg0, [], []]);
    setSelectedPeg(null);
    setSteps(0);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame(numDisks);
  }, [numDisks, initGame]);

  // 移动盘子
  const moveDisk = useCallback((from: number, to: number) => {
    if (from === to) return false;
    const fromStack = pegs[from];
    const toStack = pegs[to];
    if (fromStack.length === 0) return false;

    const diskToMove = fromStack[fromStack.length - 1];
    const topOfTo = toStack[toStack.length - 1];

    // 大盘不能压小盘
    if (topOfTo && diskToMove > topOfTo) {
      soundSynth.playGameOver();
      return false;
    }

    soundSynth.playClack();

    const newPegs = pegs.map(p => [...p]);
    newPegs[from].pop();
    newPegs[to].push(diskToMove);
    setPegs(newPegs);
    setSteps(s => s + 1);

    // 胜利条件：全部移到柱子 2
    if (newPegs[2].length === numDisks) {
      setWon(true);
      soundSynth.playWin();
      onMove('win', { steps: steps + 1, disks: numDisks });
    }
    return true;
  }, [pegs, numDisks, steps, onMove]);

  // 点击柱子处理
  const handlePegClick = (pegIdx: number) => {
    if (won || autoSolving) return;

    if (selectedPeg === null) {
      if (pegs[pegIdx].length > 0) {
        setSelectedPeg(pegIdx);
        soundSynth.playPop();
      }
    } else {
      if (selectedPeg === pegIdx) {
        setSelectedPeg(null); // 取消选择
      } else {
        moveDisk(selectedPeg, pegIdx);
        setSelectedPeg(null);
      }
    }
  };

  // AI 自动求解演示
  const startAutoSolve = () => {
    if (autoSolving) {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      setAutoSolving(false);
      return;
    }

    initGame(numDisks);
    setAutoSolving(true);

    // 生成汉诺塔解题步骤列表
    const movesList: [number, number][] = [];
    const solveHanoi = (n: number, from: number, to: number, aux: number) => {
      if (n === 0) return;
      solveHanoi(n - 1, from, aux, to);
      movesList.push([from, to]);
      solveHanoi(n - 1, aux, to, from);
    };
    solveHanoi(numDisks, 0, 2, 1);

    let moveIdx = 0;
    const speed = numDisks >= 6 ? 150 : 350;

    autoTimerRef.current = setInterval(() => {
      if (moveIdx >= movesList.length) {
        clearInterval(autoTimerRef.current!);
        setAutoSolving(false);
        return;
      }
      const [from, to] = movesList[moveIdx];
      setPegs(prev => {
        const next = prev.map(p => [...p]);
        const disk = next[from].pop();
        if (disk) next[to].push(disk);
        return next;
      });
      setSteps(s => s + 1);
      soundSynth.playClack();
      moveIdx++;

      if (moveIdx === movesList.length) {
        setWon(true);
        soundSynth.playWin();
      }
    }, speed);
  };

  // Canvas 绘制马卡龙色圆盘与立柱
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 450, h = 320;
    ctx.clearRect(0, 0, w, h);

    // 底座
    ctx.fillStyle = '#1e2430';
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, 12);
    ctx.fill();

    // 3 根柱子的 X 轴中心
    const pegX = [w * 0.2, w * 0.5, w * 0.8];
    const pegBaseY = 270;
    const pegTopY = 80;

    // 绘制底板与立柱
    for (let i = 0; i < 3; i++) {
      const isSelected = selectedPeg === i;

      // 底木托
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.roundRect(pegX[i] - 55, pegBaseY, 110, 14, 4);
      ctx.fill();

      // 立柱
      ctx.fillStyle = isSelected ? '#60a5fa' : '#64748b';
      ctx.beginPath();
      ctx.roundRect(pegX[i] - 5, pegTopY, 10, pegBaseY - pegTopY, 5);
      ctx.fill();

      // 柱子字母标签 A, B, C
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(['A 柱 (源)', 'B 柱 (中转)', 'C 柱 (目标)'][i], pegX[i], pegBaseY + 30);
    }

    // 绘制盘子
    const maxDiskW = 120;
    const minDiskW = 34;
    const diskH = Math.min(22, 150 / numDisks);

    for (let p = 0; p < 3; p++) {
      const stack = pegs[p];
      const isPegSelected = selectedPeg === p;

      for (let i = 0; i < stack.length; i++) {
        const diskVal = stack[i]; // 1 ~ numDisks
        const diskRatio = (diskVal - 1) / Math.max(1, numDisks - 1);
        const diskW = minDiskW + diskRatio * (maxDiskW - minDiskW);

        // 如果是选中的最顶层盘子，抬高浮空
        let y = pegBaseY - (i + 1) * (diskH + 2);
        if (isPegSelected && i === stack.length - 1) {
          y = pegTopY - 24; // 浮空悬停在立柱上方
        }

        const x = pegX[p] - diskW / 2;
        const color = DISK_COLORS[(diskVal - 1) % DISK_COLORS.length];

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, diskW, diskH, 6);
        ctx.fill();
        ctx.restore();

        // 盘面微高光
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 盘面数字
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(diskVal), pegX[p], y + diskH / 2);
      }
    }
  }, [pegs, numDisks, selectedPeg]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const peg = x < 150 ? 0 : x < 300 ? 1 : 2;
    handlePegClick(peg);
  };

  const optimalSteps = Math.pow(2, numDisks) - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 难度层数选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 450, marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {[3, 4, 5, 6, 7, 8].map(n => (
            <button
              key={n}
              onClick={() => { setNumDisks(n); initGame(n); }}
              style={{
                padding: '4px 9px',
                borderRadius: 5,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: numDisks === n ? '#4f8cff' : '#2a2e3d',
                color: numDisks === n ? '#fff' : '#9aa4bf',
              }}
            >
              {n}层
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={startAutoSolve}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: autoSolving ? '#e91e63' : '#10b981',
              color: '#fff',
            }}
          >
            {autoSolving ? '⏹️ 停止演示' : '🤖 AI 自动解法'}
          </button>
          <button
            onClick={() => initGame(numDisks)}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: '#334155',
              color: '#fff',
            }}
          >
            🔄 重置
          </button>
        </div>
      </div>

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 450, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>已移动: <b style={{ color: '#4f8cff' }}>{steps} 步</b></div>
        <div>理论最少: <b style={{ color: '#10b981' }}>{optimalSteps} 步</b></div>
        <div>达成率: <b style={{ color: '#ffd700' }}>{steps === 0 ? '100%' : `${Math.max(10, Math.round((optimalSteps / steps) * 100))}%`}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 450, height: 320 }}>
        <canvas
          ref={canvasRef}
          width={450}
          height={320}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
        />

        {/* 获胜通告 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 'bold', marginBottom: 6, color: '#10b981' }}>
              🏆 汉诺塔解题成功!
            </div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>层数: {numDisks} 层 | 实际移动: {steps} 步</div>
            <div style={{ fontSize: 14, color: '#ffd700', marginBottom: 18 }}>理论最少步数: {optimalSteps} 步 (完美复原)</div>
            <button
              onClick={() => initGame(numDisks)}
              style={{
                padding: '9px 26px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              🔄 再来一局
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 点击柱子拿起顶层圆盘（浮空悬停），再点击目标柱子放下，大盘不可压在小盘上方</span>
      </div>
    </div>
  );
}
