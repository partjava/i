'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

// 管道类型掩码: [上, 右, 下, 左] => 4位二进制
// 例如:
// 1010 (10) = 纵向直管 (上, 下)
// 0101 (5)  = 横向直管 (右, 左)
// 1100 (12) = 右上弯管 (上, 右)
// 0110 (6)  = 右下弯管 (右, 下)
// 0011 (3)  = 左下弯管 (下, 左)
// 1001 (9)  = 左上弯管 (上, 左)
// 1110 (14) = T型 (上, 右, 下)
// 1111 (15) = 十字管 (上, 右, 下, 左)

// 顺时针旋转 90 度
function rotateMask(mask: number): number {
  const up = (mask >> 3) & 1;
  const right = (mask >> 2) & 1;
  const down = (mask >> 1) & 1;
  const left = mask & 1;
  return (left << 3) | (up << 2) | (right << 1) | down;
}

export default function PipeConnect({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [boardSize, setBoardSize] = useState<number>(6);
  const [pipes, setPipes] = useState<number[][]>([]);
  const [connectedSet, setConnectedSet] = useState<Set<string>>(new Set());
  const [isWaterFlowing, setIsWaterFlowing] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 初始化有解管网并打乱旋转
  const initGame = useCallback((size: number) => {
    // 随机生成迷宫骨干路径 (确保至少有一条从 [0,0] 到 [size-1, size-1] 的通路)
    const N = size;
    const initialGrid = Array(N).fill(0).map(() => Array(N).fill(0));

    // 随机散步打通一条主干道
    let r = 0, c = 0;
    const path: [number, number][] = [[0, 0]];
    while (r < N - 1 || c < N - 1) {
      if (r === N - 1) c++;
      else if (c === N - 1) r++;
      else if (Math.random() < 0.5) r++;
      else c++;
      path.push([r, c]);
    }

    // 给路径上的相邻格连上管道
    for (let i = 0; i < path.length; i++) {
      const [cr, cc] = path[i];
      let mask = 0;
      if (i > 0) {
        const [pr, pc] = path[i - 1];
        if (pr === cr - 1) mask |= 8; // 上
        if (pc === cc + 1) mask |= 4; // 右
        if (pr === cr + 1) mask |= 2; // 下
        if (pc === cc - 1) mask |= 1; // 左
      }
      if (i < path.length - 1) {
        const [nr, nc] = path[i + 1];
        if (nr === cr - 1) mask |= 8;
        if (nc === cc + 1) mask |= 4;
        if (nr === cr + 1) mask |= 2;
        if (nc === cc - 1) mask |= 1;
      }
      initialGrid[cr][cc] = mask;
    }

    // 填充剩余空格并随机旋转所有管道
    const sampleMasks = [10, 5, 12, 6, 3, 9, 14, 15];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (initialGrid[i][j] === 0) {
          initialGrid[i][j] = sampleMasks[Math.floor(Math.random() * sampleMasks.length)];
        }
        // 随机旋转 1~3 次打乱
        const rot = Math.floor(Math.random() * 4);
        for (let k = 0; k < rot; k++) {
          initialGrid[i][j] = rotateMask(initialGrid[i][j]);
        }
      }
    }

    setPipes(initialGrid);
    setSteps(0);
    setWon(false);
    setIsWaterFlowing(false);
  }, []);

  useEffect(() => {
    initGame(boardSize);
  }, [boardSize, initGame]);

  // BFS 计算连通水流网络 (从 [0,0] 源头出发)
  const computeConnected = useCallback((grid: number[][], size: number): { set: Set<string>; hasWon: boolean } => {
    if (grid.length === 0) return { set: new Set(), hasWon: false };

    const visited = new Set<string>();
    const queue: [number, number][] = [[0, 0]];
    visited.add('0,0');

    let reachesTarget = false;

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (r === size - 1 && c === size - 1) {
        reachesTarget = true;
      }

      const mask = grid[r][c];
      const hasUp = (mask & 8) !== 0;
      const hasRight = (mask & 4) !== 0;
      const hasDown = (mask & 2) !== 0;
      const hasLeft = (mask & 1) !== 0;

      // 检查上邻格
      if (hasUp && r > 0 && !visited.has(`${r - 1},${c}`)) {
        if ((grid[r - 1][c] & 2) !== 0) { // 上格必须有向下接口
          visited.add(`${r - 1},${c}`);
          queue.push([r - 1, c]);
        }
      }
      // 检查右邻格
      if (hasRight && c < size - 1 && !visited.has(`${r},${c + 1}`)) {
        if ((grid[r][c + 1] & 1) !== 0) { // 右格必须有向左接口
          visited.add(`${r},${c + 1}`);
          queue.push([r, c + 1]);
        }
      }
      // 检查下邻格
      if (hasDown && r < size - 1 && !visited.has(`${r + 1},${c}`)) {
        if ((grid[r + 1][c] & 8) !== 0) { // 下格必须有向上接口
          visited.add(`${r + 1},${c}`);
          queue.push([r + 1, c]);
        }
      }
      // 检查左邻格
      if (hasLeft && c > 0 && !visited.has(`${r},${c - 1}`)) {
        if ((grid[r][c - 1] & 4) !== 0) { // 左格必须有向右接口
          visited.add(`${r},${c - 1}`);
          queue.push([r, c - 1]);
        }
      }
    }

    return { set: visited, hasWon: reachesTarget };
  }, []);

  // 每次旋转水管
  const rotatePipe = useCallback((r: number, c: number) => {
    if (won || gridIsRotating.current) return;

    soundSynth.playClack();

    const newPipes = pipes.map(row => [...row]);
    newPipes[r][c] = rotateMask(newPipes[r][c]);
    setPipes(newPipes);
    setSteps(s => s + 1);

    const { set: connected, hasWon } = computeConnected(newPipes, boardSize);
    setConnectedSet(connected);

    if (hasWon && !won) {
      setWon(true);
      setIsWaterFlowing(true);
      soundSynth.playSplash();
      setTimeout(() => soundSynth.playWin(), 600);
      onMove('win', { steps: steps + 1, size: boardSize });
    }
  }, [won, pipes, computeConnected, boardSize, steps, onMove]);

  const gridIsRotating = useRef(false);

  // 初始化时算一次连通
  useEffect(() => {
    if (pipes.length > 0) {
      const { set: connected, hasWon } = computeConnected(pipes, boardSize);
      setConnectedSet(connected);
      if (hasWon) setWon(true);
    }
  }, [pipes, boardSize, computeConnected]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || pipes.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = boardSize;
    const canvasSize = 440;
    const cell = canvasSize / size;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 棋盘金属底板
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvasSize, canvasSize, 12);
    ctx.fill();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = c * cell;
        const y = r * cell;
        const cx = x + cell / 2;
        const cy = y + cell / 2;
        const mask = pipes[r]?.[c] || 0;
        const isConnected = connectedSet.has(`${r},${c}`);

        // 每个管道小槽位背景
        ctx.fillStyle = isConnected ? 'rgba(56, 189, 248, 0.08)' : '#1e293b';
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cell - 4, cell - 4, 8);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 绘制管道
        const pipeW = Math.max(7, cell * 0.28);
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = pipeW;

        if (isConnected) {
          // 通水发光天蓝色
          ctx.strokeStyle = '#38bdf8';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 10;
        } else {
          // 未通水复古青铜管道
          ctx.strokeStyle = '#64748b';
        }

        const up = (mask & 8) !== 0;
        const right = (mask & 4) !== 0;
        const down = (mask & 2) !== 0;
        const left = (mask & 1) !== 0;

        // 绘制管段
        if (up) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + 2); ctx.stroke(); }
        if (right) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + cell - 2, cy); ctx.stroke(); }
        if (down) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + cell - 2); ctx.stroke(); }
        if (left) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + 2, cy); ctx.stroke(); }

        // 中心水管阀门圆环
        ctx.fillStyle = isConnected ? '#e0f2fe' : '#475569';
        ctx.beginPath();
        ctx.arc(cx, cy, pipeW * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 起点与终点特殊标记
        if (r === 0 && c === 0) {
          ctx.font = `${Math.floor(cell * 0.4)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🚰', x + cell * 0.25, y + cell * 0.25);
        } else if (r === size - 1 && c === size - 1) {
          ctx.font = `${Math.floor(cell * 0.4)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(won ? '☕' : '🍶', x + cell * 0.75, y + cell * 0.75);
        }
      }
    }
  }, [pipes, connectedSet, boardSize, won]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 440 / boardSize;

    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);

    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      rotatePipe(row, col);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 难度选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 440, marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 6, name: '6×6 经典' },
            { s: 8, name: '8×8 工业管网' },
            { s: 10, name: '10×10 巨型管网' },
          ].map(item => (
            <button
              key={item.s}
              onClick={() => { setBoardSize(item.s); initGame(item.s); }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: boardSize === item.s ? '#4f8cff' : '#2a2e3d',
                color: boardSize === item.s ? '#fff' : '#9aa4bf',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => initGame(boardSize)}
          style={{
            padding: '4px 12px',
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

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 440, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>起点: <b>🚰 水龙头</b></div>
        <div>旋转步数: <b style={{ color: '#38bdf8' }}>{steps} 步</b></div>
        <div>目标: <b>☕ Java 咖啡机 ({won ? '已注满' : '等待通水'})</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
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
            <div style={{ fontSize: 34, fontWeight: 'bold', color: '#38bdf8', marginBottom: 6 }}>
              🌊 清水贯通 冲泡完成!
            </div>
            <div style={{ fontSize: 16, marginBottom: 4 }}>旋转步数: {steps} 步</div>
            <div style={{ fontSize: 14, color: '#ffd700', marginBottom: 18 }}>☕ 醇香 Java 咖啡已为您煮好</div>
            <button
              onClick={() => initGame(boardSize)}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              🔄 挑战下一关
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 点击任意水管顺时针旋转 90 度，将左上角水龙头通路连接至右下角咖啡机！</span>
      </div>
    </div>
  );
}
