'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

const TILE_COLORS: Record<number, { bg: string; text: string; glow?: string }> = {
  2: { bg: '#eee4da', text: '#776e65' },
  4: { bg: '#ede0c8', text: '#776e65' },
  8: { bg: '#f2b179', text: '#f9f6f2' },
  16: { bg: '#f59563', text: '#f9f6f2' },
  32: { bg: '#f67c5f', text: '#f9f6f2' },
  64: { bg: '#f65e3b', text: '#f9f6f2', glow: 'rgba(246,94,59,0.3)' },
  128: { bg: '#edcf72', text: '#f9f6f2', glow: 'rgba(237,207,114,0.4)' },
  256: { bg: '#edcc61', text: '#f9f6f2', glow: 'rgba(237,204,97,0.5)' },
  512: { bg: '#edc850', text: '#f9f6f2', glow: 'rgba(237,200,80,0.6)' },
  1024: { bg: '#edc53f', text: '#f9f6f2', glow: 'rgba(237,197,63,0.7)' },
  2048: { bg: '#edc22e', text: '#f9f6f2', glow: 'rgba(237,194,46,0.9)' },
  4096: { bg: '#a271ff', text: '#ffffff', glow: 'rgba(162,113,255,0.8)' },
  8192: { bg: '#7952ff', text: '#ffffff', glow: 'rgba(121,82,255,0.9)' },
  16384: { bg: '#ff3d71', text: '#ffffff', glow: 'rgba(255,61,113,0.9)' },
  32768: { bg: '#00d68f', text: '#ffffff', glow: 'rgba(0,214,143,0.9)' },
  65536: { bg: '#0095ff', text: '#ffffff', glow: 'rgba(0,149,255,1.0)' },
};

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  alpha: number;
}

export default function Game2048({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [localGrid, setLocalGrid] = useState<number[][]>([]);
  const [history, setHistory] = useState<{ grid: number[][]; score: number }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [keepPlaying, setKeepPlaying] = useState<boolean>(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const nextFloatId = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // 初始化或切换尺寸
  const initGame = useCallback((size: number) => {
    const newGrid = Array(size).fill(0).map(() => Array(size).fill(0));
    // 随机生成 2 个数
    const emptyCells: [number, number][] = [];
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) emptyCells.push([r, c]);
    for (let i = 0; i < 2; i++) {
      if (emptyCells.length === 0) break;
      const idx = Math.floor(Math.random() * emptyCells.length);
      const [r, c] = emptyCells.splice(idx, 1)[0];
      newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
    setLocalGrid(newGrid);
    setHistory([]);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
  }, []);

  useEffect(() => {
    // 若后端有初始 grid 且当前尺寸为 4，初始使用后端数据
    if (state?.grid && state.grid.length === 4 && localGrid.length === 0 && boardSize === 4) {
      setLocalGrid(state.grid);
      setScore(state.score || 0);
    } else if (localGrid.length === 0) {
      initGame(boardSize);
    }
  }, [state, boardSize, localGrid.length, initGame]);

  // 检查是否游戏结束
  const checkGameOver = (grid: number[][], size: number) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) return false;
        if (c + 1 < size && grid[r][c] === grid[r][c + 1]) return false;
        if (r + 1 < size && grid[r][c] === grid[r + 1][c]) return false;
      }
    }
    return true;
  };

  // 执行移动 (核心滑动算法，支持 4x4, 5x5, 6x6, 8x8)
  const slide = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver || (won && !keepPlaying)) return;

    const size = boardSize;
    let moved = false;
    let earnedScore = 0;
    let maxMergedVal = 0;

    const newGrid = localGrid.map(row => [...row]);

    const rotateLeft = (g: number[][]) => {
      const res = Array(size).fill(0).map(() => Array(size).fill(0));
      for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) res[size - 1 - c][r] = g[r][c];
      return res;
    };
    const rotateRight = (g: number[][]) => {
      const res = Array(size).fill(0).map(() => Array(size).fill(0));
      for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) res[c][size - 1 - r] = g[r][c];
      return res;
    };

    let working = newGrid;
    if (dir === 'up') working = rotateLeft(working);
    else if (dir === 'down') working = rotateRight(working);
    else if (dir === 'right') working = working.map(r => [...r].reverse());

    // 对每一行向左压合并
    for (let r = 0; r < size; r++) {
      const row = working[r].filter(v => v !== 0);
      const newRow: number[] = [];
      for (let i = 0; i < row.length; i++) {
        if (i + 1 < row.length && row[i] === row[i + 1]) {
          const merged = row[i] * 2;
          newRow.push(merged);
          earnedScore += merged;
          if (merged > maxMergedVal) maxMergedVal = merged;
          i++; // 跳过下一个
        } else {
          newRow.push(row[i]);
        }
      }
      while (newRow.length < size) newRow.push(0);

      for (let c = 0; c < size; c++) {
        if (working[r][c] !== newRow[c]) moved = true;
        working[r][c] = newRow[c];
      }
    }

    // 旋转还原
    if (dir === 'up') working = rotateRight(working);
    else if (dir === 'down') working = rotateLeft(working);
    else if (dir === 'right') working = working.map(r => [...r].reverse());

    if (!moved) return;

    // 随机空位补充一个 2 或 4
    const emptyCells: [number, number][] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (working[r][c] === 0) emptyCells.push([r, c]);
      }
    }
    if (emptyCells.length > 0) {
      const [ar, ac] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      working[ar][ac] = Math.random() < 0.9 ? 2 : 4;
    }

    // 记录历史供悔棋
    setHistory(prev => [...prev.slice(-10), { grid: localGrid.map(r => [...r]), score }]);

    // 音效与浮空文字
    if (earnedScore > 0) {
      const noteStep = Math.min(10, Math.floor(Math.log2(maxMergedVal || 4)));
      soundSynth.playChime(noteStep);
      setFloatingTexts(prev => [
        ...prev,
        { id: ++nextFloatId.current, text: `+${earnedScore}`, x: 220, y: 180, alpha: 1.0 }
      ]);
    } else {
      soundSynth.playMove();
    }

    const nextScore = score + earnedScore;
    setLocalGrid(working);
    setScore(nextScore);

    // 通知外部容器同步分数
    onMove('sync', { score: nextScore });

    // 检查是否达成 2048
    if (!won && !keepPlaying) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (working[r][c] >= 2048) {
            setWon(true);
            soundSynth.playWin();
            break;
          }
        }
      }
    }

    // 检查是否死亡
    if (checkGameOver(working, size)) {
      setGameOver(true);
      soundSynth.playGameOver();
    }
  }, [boardSize, localGrid, score, gameOver, won, keepPlaying, onMove]);

  // 悔棋
  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setLocalGrid(last.grid);
    setScore(last.score);
    setGameOver(false);
    setHistory(prev => prev.slice(0, -1));
    soundSynth.playPop();
  };

  // 键盘监听
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = {
        ArrowLeft: 'left', KeyA: 'left',
        ArrowRight: 'right', KeyD: 'right',
        ArrowUp: 'up', KeyW: 'up',
        ArrowDown: 'down', KeyS: 'down',
      };
      if (map[e.code]) {
        e.preventDefault();
        slide(map[e.code]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slide]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || localGrid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = boardSize;
    const canvasSize = 440;
    const gap = size === 8 ? 6 : size === 6 ? 8 : 10;
    const cell = (canvasSize - gap * (size + 1)) / size;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 圆角棋盘底色
    ctx.fillStyle = '#bbada0';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvasSize, canvasSize, 12);
    ctx.fill();

    // 绘制格子
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = localGrid[r]?.[c] || 0;
        const x = gap + c * (cell + gap);
        const y = gap + r * (cell + gap);

        if (val === 0) {
          ctx.fillStyle = 'rgba(238, 228, 218, 0.35)';
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();
        } else {
          const cfg = TILE_COLORS[val] || { bg: '#3c3a32', text: '#f9f6f2', glow: 'rgba(255,255,255,0.4)' };

          ctx.save();
          if (cfg.glow) {
            ctx.shadowColor = cfg.glow;
            ctx.shadowBlur = 12;
          }

          ctx.fillStyle = cfg.bg;
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();
          ctx.restore();

          // 数字
          ctx.fillStyle = cfg.text;
          const fontSize = size === 8
            ? (val >= 1000 ? 12 : val >= 100 ? 14 : 18)
            : size === 6
            ? (val >= 10000 ? 14 : val >= 1000 ? 18 : 22)
            : (val >= 1024 ? 26 : val >= 128 ? 32 : 38);

          ctx.font = `bold ${fontSize}px "Segoe UI", Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(val), x + cell / 2, y + cell / 2);
        }
      }
    }
  }, [localGrid, boardSize]);

  // 浮空文字淡出动画
  useEffect(() => {
    if (floatingTexts.length === 0) return;
    const timer = setInterval(() => {
      setFloatingTexts(prev =>
        prev
          .map(f => ({ ...f, y: f.y - 1.5, alpha: f.alpha - 0.05 }))
          .filter(f => f.alpha > 0)
      );
    }, 30);
    return () => clearInterval(timer);
  }, [floatingTexts.length]);

  // 触屏滑动支持
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 25) {
      if (absX > absY) {
        slide(dx > 0 ? 'right' : 'left');
      } else {
        slide(dy > 0 ? 'down' : 'up');
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部控制栏：难度/尺寸选择与撤销 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 440, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 4, name: '4×4 经典' },
            { s: 5, name: '5×5 进阶' },
            { s: 6, name: '6×6 畅爽' },
            { s: 8, name: '8×8 巨型' },
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

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
              background: history.length > 0 ? '#ff9800' : '#333',
              color: '#fff',
              opacity: history.length > 0 ? 1 : 0.5,
            }}
          >
            ↩ 悔棋
          </button>
          <button
            onClick={() => initGame(boardSize)}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: '#e91e63',
              color: '#fff',
            }}
          >
            🔄 重开
          </button>
        </div>
      </div>

      {/* 游戏主画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            cursor: 'grab',
            display: 'block'
          }}
          tabIndex={0}
        />

        {/* 浮动加分文字 */}
        {floatingTexts.map(f => (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: f.x,
              top: f.y,
              transform: 'translate(-50%, -50%)',
              color: '#ffd700',
              fontWeight: 'bold',
              fontSize: 22,
              opacity: f.alpha,
              pointerEvents: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            }}
          >
            {f.text}
          </div>
        ))}

        {/* 达成 2048 胜利遮罩 */}
        {won && !keepPlaying && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(237, 194, 46, 0.92)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 'bold', marginBottom: 8, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              🎉 达成 2048!
            </div>
            <div style={{ fontSize: 18, marginBottom: 20 }}>你合成了传奇的 2048 方块！</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setKeepPlaying(true)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#222',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                继续挑战无限高分 ➔
              </button>
              <button
                onClick={() => initGame(boardSize)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#fff',
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                重新开局
              </button>
            </div>
          </div>
        )}

        {/* 游戏结束 Game Over 遮罩 */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.88)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 8, color: '#ff6b6b' }}>
              无路可走
            </div>
            <div style={{ fontSize: 18, color: '#aaa', marginBottom: 16 }}>最终得分：{score}</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {history.length > 0 && (
                <button
                  onClick={handleUndo}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#ff9800',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ↩ 悔一步棋
                </button>
              )}
              <button
                onClick={() => initGame(boardSize)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#4f8cff',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                🔄 再来一局
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#888', display: 'flex', gap: 16 }}>
        <span>⌨️ 方向键 / WASD 移动</span>
        <span>📱 触屏直接滑动手势</span>
        <span>得分: <b style={{ color: '#4f8cff' }}>{score}</b></span>
      </div>
    </div>
  );
}
