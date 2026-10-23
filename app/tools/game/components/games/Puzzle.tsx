'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

export default function Puzzle({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [board, setBoard] = useState<number[][]>([]);
  const [steps, setSteps] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [bestSteps, setBestSteps] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 检查打乱后的可解性（逆序数检查）
  const isSolvable = (arr: number[], size: number, blankRowFromBottom: number) => {
    let invCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] && arr[j] && arr[i] > arr[j]) invCount++;
      }
    }
    if (size % 2 === 1) {
      return invCount % 2 === 0;
    } else {
      return (invCount + blankRowFromBottom) % 2 === 1;
    }
  };

  // 检查是否已还原
  const checkWin = (grid: number[][], size: number) => {
    let expected = 1;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (r === size - 1 && c === size - 1) {
          if (grid[r][c] !== 0) return false;
        } else {
          if (grid[r][c] !== expected) return false;
          expected++;
        }
      }
    }
    return true;
  };

  // 生成有解随机棋盘
  const initGame = useCallback((size: number) => {
    const total = size * size;
    let list: number[] = [];
    let blankR = 0;

    // 循环打乱直到得到必有解棋盘
    do {
      list = Array.from({ length: total }, (_, i) => i); // 0 为空格
      // Fisher-Yates 洗牌
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      const blankIdx = list.indexOf(0);
      blankR = Math.floor(blankIdx / size);
    } while (!isSolvable(list, size, size - blankR) || list.every((v, i) => v === (i + 1) % total));

    const newGrid: number[][] = [];
    for (let r = 0; r < size; r++) {
      newGrid.push(list.slice(r * size, (r + 1) * size));
    }

    setBoard(newGrid);
    setSteps(0);
    setSeconds(0);
    setWon(false);
    setIsPlaying(false);

    // 读取本地最高纪录
    try {
      const saved = localStorage.getItem(`partjava_puzzle_best_${size}`);
      if (saved) setBestSteps(parseInt(saved, 10));
      else setBestSteps(0);
    } catch {}
  }, []);

  useEffect(() => {
    if (state?.board && state.board.length === 4 && board.length === 0 && boardSize === 4) {
      setBoard(state.board);
      setSteps(state.score || 0);
    } else if (board.length === 0) {
      initGame(boardSize);
    }
  }, [state, boardSize, board.length, initGame]);

  // 计时器
  useEffect(() => {
    if (isPlaying && !won) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, won]);

  // 寻找空格坐标
  const findBlank = (grid: number[][], size: number): [number, number] => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) return [r, c];
      }
    }
    return [size - 1, size - 1];
  };

  // 执行滑动（支持同行动行多格顺推）
  const slideTile = useCallback((clickR: number, clickC: number) => {
    if (won || clickR < 0 || clickR >= boardSize || clickC < 0 || clickC >= boardSize) return;

    const size = boardSize;
    const [blankR, blankC] = findBlank(board, size);

    if (clickR !== blankR && clickC !== blankC) return; // 既不同行也不同列，无法移动

    const newGrid = board.map(r => [...r]);
    let movedCount = 0;

    if (!isPlaying) setIsPlaying(true);

    if (clickR === blankR) {
      // 同行推移
      const dir = clickC < blankC ? 1 : -1;
      for (let c = blankC; c !== clickC; c -= dir) {
        newGrid[clickR][c] = newGrid[clickR][c - dir];
        movedCount++;
      }
      newGrid[clickR][clickC] = 0;
    } else if (clickC === blankC) {
      // 同列推移
      const dir = clickR < blankR ? 1 : -1;
      for (let r = blankR; r !== clickR; r -= dir) {
        newGrid[r][clickC] = newGrid[r - dir][clickC];
        movedCount++;
      }
      newGrid[clickR][clickC] = 0;
    }

    if (movedCount > 0) {
      soundSynth.playClack();
      const nextSteps = steps + 1;
      setBoard(newGrid);
      setSteps(nextSteps);

      // 检查胜利
      if (checkWin(newGrid, size)) {
        setWon(true);
        setIsPlaying(false);
        soundSynth.playWin();

        // 记入最高分
        try {
          if (!bestSteps || nextSteps < bestSteps) {
            setBestSteps(nextSteps);
            localStorage.setItem(`partjava_puzzle_best_${size}`, String(nextSteps));
          }
        } catch {}

        onMove('win', { steps: nextSteps, seconds });
      }
    }
  }, [won, boardSize, board, isPlaying, steps, seconds, bestSteps, onMove]);

  // 键盘操作
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (won || board.length === 0) return;
      const size = boardSize;
      const [br, bc] = findBlank(board, size);
      // 方向键移动的是空格旁边的方块
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (br + 1 < size) slideTile(br + 1, bc);
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        if (br - 1 >= 0) slideTile(br - 1, bc);
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        if (bc + 1 < size) slideTile(br, bc + 1);
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        if (bc - 1 >= 0) slideTile(br, bc - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [board, boardSize, won, slideTile]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || board.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = boardSize;
    const canvasSize = 440;
    const gap = size === 8 ? 4 : size === 5 ? 6 : 8;
    const cell = (canvasSize - gap * (size + 1)) / size;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 棋盘边框底座
    ctx.fillStyle = '#1e2430';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvasSize, canvasSize, 12);
    ctx.fill();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = board[r]?.[c];
        const x = gap + c * (cell + gap);
        const y = gap + r * (cell + gap);

        if (val === 0) {
          // 空槽位
          ctx.fillStyle = 'rgba(0,0,0,0.45)';
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();
        } else {
          // 数字块
          const isTargetPos = val === r * size + c + 1; // 是否在正确位置
          const blockGrad = ctx.createLinearGradient(x, y, x, y + cell);
          if (isTargetPos) {
            blockGrad.addColorStop(0, '#38ef7d');
            blockGrad.addColorStop(1, '#11998e');
          } else {
            blockGrad.addColorStop(0, '#4f8cff');
            blockGrad.addColorStop(1, '#2563eb');
          }

          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.3)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetY = 3;

          ctx.fillStyle = blockGrad;
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();
          ctx.restore();

          // 顶部高光微反光
          ctx.strokeStyle = 'rgba(255,255,255,0.25)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, cell - 2, cell - 2, 5);
          ctx.stroke();

          // 数字
          ctx.fillStyle = '#ffffff';
          const fontSize = size === 8 ? 16 : size === 5 ? 24 : size === 3 ? 42 : 32;
          ctx.font = `bold ${fontSize}px "Segoe UI", Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(val), x + cell / 2, y + cell / 2);
        }
      }
    }
  }, [board, boardSize]);

  // 点击判定
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const size = boardSize;
    const canvasSize = 440;
    const gap = size === 8 ? 4 : size === 5 ? 6 : 8;
    const cell = (canvasSize - gap * (size + 1)) / size;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const col = Math.floor((clickX - gap) / (cell + gap));
    const row = Math.floor((clickY - gap) / (cell + gap));

    if (row >= 0 && row < size && col >= 0 && col < size) {
      slideTile(row, col);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部控制栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 440, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 3, name: '3×3 新手' },
            { s: 4, name: '4×4 经典' },
            { s: 5, name: '5×5 进阶' },
            { s: 8, name: '8×8 大师 63格' },
          ].map(item => (
            <button
              key={item.s}
              onClick={() => {
                setBoardSize(item.s);
                initGame(item.s);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: boardSize === item.s ? '#4f8cff' : '#2a2e3d',
                color: boardSize === item.s ? '#fff' : '#9aa4bf',
                transition: 'all 0.2s',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => initGame(boardSize)}
          style={{
            padding: '5px 14px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#e91e63',
            color: '#fff',
          }}
        >
          🔄 重新打乱
        </button>
      </div>

      {/* 状态统计指示牌 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 440, marginBottom: 10, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>⏱️ 用时: <b style={{ color: '#fff' }}>{formatTime(seconds)}</b></div>
        <div>👣 步数: <b style={{ color: '#4f8cff' }}>{steps}</b></div>
        <div>🏆 最优记录: <b style={{ color: '#ffd700' }}>{bestSteps ? `${bestSteps} 步` : '--'}</b></div>
      </div>

      {/* 棋盘画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          onClick={handleClick}
          style={{
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'block'
          }}
        />

        {/* 获胜庆典 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(17, 153, 142, 0.94)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 8 }}>🏆 华容道复原成功!</div>
            <div style={{ fontSize: 18, marginBottom: 4 }}>总用时: {formatTime(seconds)}</div>
            <div style={{ fontSize: 18, marginBottom: 20 }}>总步数: {steps} 步 (难度: {boardSize}×{boardSize})</div>
            <button
              onClick={() => initGame(boardSize)}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#fff',
                color: '#11998e',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              🔄 挑战下一局
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#888', display: 'flex', gap: 16 }}>
        <span>🖱️ 点击邻近方块滑动（支持整排推移）</span>
        <span>⌨️ 键盘方向键滑动</span>
      </div>
    </div>
  );
}
