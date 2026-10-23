'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

// Prim 算法生成迷宫
function generateMaze(size: number): { grid: number[][]; exit: [number, number]; key: [number, number] } {
  // 保证 size 为奇数
  const N = size % 2 === 0 ? size + 1 : size;
  const grid: number[][] = Array(N).fill(0).map(() => Array(N).fill(1)); // 1: 墙, 0: 通路

  // 随机 Prim
  const walls: [number, number, number, number][] = []; // [wallR, wallC, targetR, targetC]
  grid[1][1] = 0;

  const addWalls = (r: number, c: number) => {
    const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr > 0 && nr < N - 1 && nc > 0 && nc < N - 1 && grid[nr][nc] === 1) {
        walls.push([r + dr / 2, c + dc / 2, nr, nc]);
      }
    }
  };

  addWalls(1, 1);

  while (walls.length > 0) {
    const idx = Math.floor(Math.random() * walls.length);
    const [wr, wc, tr, tc] = walls.splice(idx, 1)[0];
    if (grid[tr][tc] === 1) {
      grid[wr][wc] = 0;
      grid[tr][tc] = 0;
      addWalls(tr, tc);
    }
  }

  // 终点设在右下角附近的通路
  const exit: [number, number] = [N - 2, N - 2];
  grid[exit[0]][exit[1]] = 0;

  // 钥匙设在左下或右上分支通路
  const key: [number, number] = [N - 2, 1];
  grid[key[0]][key[1]] = 0;

  return { grid, exit, key };
}

export default function Maze({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [mazeSize, setMazeSize] = useState<number>(15);
  const [grid, setGrid] = useState<number[][]>([]);
  const [player, setPlayer] = useState<[number, number]>([1, 1]);
  const [exitPos, setExitPos] = useState<[number, number]>([13, 13]);
  const [keyPos, setKeyPos] = useState<[number, number]>([13, 1]);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [visited, setVisited] = useState<boolean[][]>([]);
  const [fogMode, setFogMode] = useState<boolean>(true);
  const [steps, setSteps] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化迷宫
  const initGame = useCallback((size: number) => {
    const { grid: g, exit, key } = generateMaze(size);
    const N = g.length;
    const initialVisited = Array(N).fill(false).map(() => Array(N).fill(false));
    initialVisited[1][1] = true;

    setGrid(g);
    setPlayer([1, 1]);
    setExitPos(exit);
    setKeyPos(key);
    setHasKey(false);
    setVisited(initialVisited);
    setSteps(0);
    setSeconds(0);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame(mazeSize);
  }, [mazeSize, initGame]);

  // 计时器
  useEffect(() => {
    if (!won && grid.length > 0) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [won, grid.length]);

  // 移动主角
  const movePlayer = useCallback((dr: number, dc: number) => {
    if (won || grid.length === 0) return;

    const [r, c] = player;
    const nr = r + dr;
    const nc = c + dc;
    const N = grid.length;

    if (nr < 0 || nr >= N || nc < 0 || nc >= N || grid[nr][nc] === 1) {
      return; // 撞墙
    }

    soundSynth.playMove();

    // 标记探明战争迷雾
    const nextVisited = visited.map(row => [...row]);
    nextVisited[nr][nc] = true;
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const vr = nr + i, vc = nc + j;
        if (vr >= 0 && vr < N && vc >= 0 && vc < N) {
          nextVisited[vr][vc] = true;
        }
      }
    }
    setVisited(nextVisited);
    setPlayer([nr, nc]);
    setSteps(s => s + 1);

    // 拾取钥匙
    if (!hasKey && nr === keyPos[0] && nc === keyPos[1]) {
      setHasKey(true);
      soundSynth.playScore();
    }

    // 抵达终点门
    if (nr === exitPos[0] && nc === exitPos[1]) {
      if (hasKey) {
        setWon(true);
        soundSynth.playWin();
        onMove('win', { steps: steps + 1, seconds, size: mazeSize });
      } else {
        // 未带钥匙提示
        soundSynth.playGameOver();
      }
    }
  }, [won, grid, player, visited, hasKey, keyPos, exitPos, steps, seconds, mazeSize, onMove]);

  // 键盘方向键监听
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (won) return;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') { e.preventDefault(); movePlayer(-1, 0); }
      if (e.code === 'ArrowDown' || e.code === 'KeyS') { e.preventDefault(); movePlayer(1, 0); }
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') { e.preventDefault(); movePlayer(0, -1); }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') { e.preventDefault(); movePlayer(0, 1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer, won]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = grid.length;
    const totalSize = 440;
    const cell = totalSize / N;

    ctx.clearRect(0, 0, totalSize, totalSize);

    // 1. 绘制地块
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const x = c * cell;
        const y = r * cell;
        const isWall = grid[r][c] === 1;
        const isSeen = !fogMode || visited[r]?.[c];

        if (!isSeen) {
          // 迷雾笼罩深渊黑
          ctx.fillStyle = '#05070e';
          ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
          continue;
        }

        if (isWall) {
          // 立体黑科技合金墙壁
          ctx.fillStyle = '#1e2433';
          ctx.fillRect(x, y, cell + 0.5, cell + 0.5);
          ctx.strokeStyle = '#2d3748';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cell, cell);
        } else {
          // 通路地砖 (已探索微光)
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(x, y, cell + 0.5, cell + 0.5);

          // 留下荧光足迹微点
          if (visited[r]?.[c]) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.beginPath();
            ctx.arc(x + cell / 2, y + cell / 2, Math.max(1.5, cell / 5), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // 2. 绘制金色钥匙
    if (!hasKey && (!fogMode || visited[keyPos[0]][keyPos[1]])) {
      const kx = keyPos[1] * cell + cell / 2;
      const ky = keyPos[0] * cell + cell / 2;
      ctx.save();
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.font = `${Math.floor(cell * 0.9)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🗝️', kx, ky);
      ctx.restore();
    }

    // 3. 绘制出口传送门
    if (!fogMode || visited[exitPos[0]][exitPos[1]]) {
      const ex = exitPos[1] * cell + cell / 2;
      const ey = exitPos[0] * cell + cell / 2;
      ctx.save();
      ctx.shadowColor = hasKey ? '#10b981' : '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.font = `${Math.floor(cell * 0.95)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(hasKey ? '🌀' : '🚪', ex, ey);
      ctx.restore();
    }

    // 4. 绘制主角微光提灯精灵
    const px = player[1] * cell + cell / 2;
    const py = player[0] * cell + cell / 2;

    // 提灯暖光光晕
    if (fogMode) {
      const lightGrad = ctx.createRadialGradient(px, py, cell * 0.4, px, py, cell * 3.2);
      lightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
      lightGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
      lightGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.arc(px, py, cell * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 主角光团
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, Math.max(3, cell * 0.38), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, Math.max(1.5, cell * 0.2), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [grid, player, exitPos, keyPos, hasKey, visited, fogMode]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 规模难度选择与迷雾开关 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 440, marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 15, name: '15×15 初级' },
            { s: 25, name: '25×25 进阶' },
            { s: 35, name: '35×35 巨型迷宫' },
          ].map(item => (
            <button
              key={item.s}
              onClick={() => { setMazeSize(item.s); initGame(item.s); }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: mazeSize === item.s ? '#4f8cff' : '#2a2e3d',
                color: mazeSize === item.s ? '#fff' : '#9aa4bf',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setFogMode(f => !f)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: fogMode ? '#eab308' : '#334155',
              color: fogMode ? '#000' : '#fff',
            }}
          >
            {fogMode ? '🕯️ 迷雾模式 (探险)' : '☀️ 全开明灯 (看全图)'}
          </button>
          <button
            onClick={() => initGame(mazeSize)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: '#e91e63',
              color: '#fff',
            }}
          >
            🔄 重新生成
          </button>
        </div>
      </div>

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 440, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>⏱️ 探索用时: <b style={{ color: '#fff' }}>{formatTime(seconds)}</b></div>
        <div>👣 探索步数: <b style={{ color: '#38bdf8' }}>{steps} 步</b></div>
        <div>🔑 钥匙状态: <b style={{ color: hasKey ? '#10b981' : '#eab308' }}>{hasKey ? '✅ 已拿到钥匙' : '❌ 尚未取得'}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          style={{
            display: 'block',
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
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#10b981', marginBottom: 6 }}>
              🏆 迷宫逃脱成功!
            </div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>用时: {formatTime(seconds)} | 步数: {steps} 步</div>
            <div style={{ fontSize: 14, color: '#38bdf8', marginBottom: 18 }}>规模: {mazeSize}×{mazeSize} 迷宫地下城</div>
            <button
              onClick={() => initGame(mazeSize)}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              🔄 挑战下一个迷宫
            </button>
          </div>
        )}
      </div>

      {/* 虚拟十字方向键 (移动端畅爽操控) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 8 }}>
        <button
          onClick={() => movePlayer(-1, 0)}
          style={{ width: 50, height: 38, borderRadius: 6, border: 'none', background: '#334155', color: '#fff', fontSize: 16, cursor: 'pointer' }}
        >
          ▲
        </button>
        <div style={{ display: 'flex', gap: 36 }}>
          <button
            onClick={() => movePlayer(0, -1)}
            style={{ width: 50, height: 38, borderRadius: 6, border: 'none', background: '#334155', color: '#fff', fontSize: 16, cursor: 'pointer' }}
          >
            ◀
          </button>
          <button
            onClick={() => movePlayer(0, 1)}
            style={{ width: 50, height: 38, borderRadius: 6, border: 'none', background: '#334155', color: '#fff', fontSize: 16, cursor: 'pointer' }}
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => movePlayer(1, 0)}
          style={{ width: 50, height: 38, borderRadius: 6, border: 'none', background: '#334155', color: '#fff', fontSize: 16, cursor: 'pointer' }}
        >
          ▼
        </button>
      </div>
    </div>
  );
}
