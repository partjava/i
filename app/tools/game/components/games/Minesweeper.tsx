'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

const DIFFICULTIES: Difficulty[] = [
  { name: '初级 (9×9, 10雷)', rows: 9, cols: 9, mines: 10 },
  { name: '中级 (16×16, 40雷)', rows: 16, cols: 16, mines: 40 },
  { name: '专家级 (24×16, 75雷)', rows: 16, cols: 24, mines: 75 },
];

const NUM_COLORS: Record<number, string> = {
  1: '#1976d2', 2: '#388e3c', 3: '#d32f2f', 4: '#7b1fa2',
  5: '#ff8f00', 6: '#0097a7', 7: '#424242', 8: '#9e9e9e',
};

export default function Minesweeper({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [diffIndex, setDiffIndex] = useState(0);
  const diff = DIFFICULTIES[diffIndex];

  const [board, setBoard] = useState<number[][]>([]); // -1: 雷, 0~8: 周围雷数
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [flagged, setFlagged] = useState<boolean[][]>([]);
  const [firstClickDone, setFirstClickDone] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagsCount, setFlagsCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flagModeMobile, setFlagModeMobile] = useState(false); // 手机端点按模式：挖掘 vs 插旗
  const [faceState, setFaceState] = useState<'normal' | 'scared' | 'won' | 'dead'>('normal');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化空白棋盘
  const initBoard = useCallback((d: Difficulty) => {
    const emptyBoard = Array(d.rows).fill(0).map(() => Array(d.cols).fill(0));
    const emptyRev = Array(d.rows).fill(false).map(() => Array(d.cols).fill(false));
    const emptyFlag = Array(d.rows).fill(false).map(() => Array(d.cols).fill(false));

    setBoard(emptyBoard);
    setRevealed(emptyRev);
    setFlagged(emptyFlag);
    setFirstClickDone(false);
    setGameOver(false);
    setWon(false);
    setFlagsCount(0);
    setSeconds(0);
    setFaceState('normal');
  }, []);

  useEffect(() => {
    initBoard(diff);
  }, [diff, initBoard]);

  // 计时器
  useEffect(() => {
    if (firstClickDone && !gameOver && !won) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [firstClickDone, gameOver, won]);

  // 第一击安全布雷（确保点击处及周围 8 格绝对无雷）
  const placeMines = (safeR: number, safeC: number, d: Difficulty) => {
    const newBoard = Array(d.rows).fill(0).map(() => Array(d.cols).fill(0));
    const safeZone = new Set<string>();
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        safeZone.add(`${safeR + dr},${safeC + dc}`);
      }
    }

    let placed = 0;
    while (placed < d.mines) {
      const r = Math.floor(Math.random() * d.rows);
      const c = Math.floor(Math.random() * d.cols);
      if (!safeZone.has(`${r},${c}`) && newBoard[r][c] !== -1) {
        newBoard[r][c] = -1;
        placed++;
      }
    }

    // 计算周围雷数
    for (let r = 0; r < d.rows; r++) {
      for (let c = 0; c < d.cols; c++) {
        if (newBoard[r][c] === -1) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < d.rows && nc >= 0 && nc < d.cols && newBoard[nr][nc] === -1) {
              count++;
            }
          }
        }
        newBoard[r][c] = count;
      }
    }
    return newBoard;
  };

  // 翻开格子（包含零雷泛洪扩散算法）
  const revealCell = useCallback((r: number, c: number) => {
    if (gameOver || won) return;
    if (flagged[r]?.[c]) return;

    let currentBoard = board;
    if (!firstClickDone) {
      currentBoard = placeMines(r, c, diff);
      setBoard(currentBoard);
      setFirstClickDone(true);
    }

    if (revealed[r]?.[c]) {
      // 若已翻开且是数字，触发双击/Chord快速开雷
      const val = currentBoard[r][c];
      if (val > 0) {
        let flagCount = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < diff.rows && nc >= 0 && nc < diff.cols && flagged[nr]?.[nc]) {
              flagCount++;
            }
          }
        }
        if (flagCount === val) {
          // 展开周围未插旗未翻开的格子
          const nextRev = revealed.map(row => [...row]);
          let hitMine = false;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < diff.rows && nc >= 0 && nc < diff.cols && !flagged[nr]?.[nc] && !nextRev[nr][nc]) {
                if (currentBoard[nr][nc] === -1) hitMine = true;
                nextRev[nr][nc] = true;
              }
            }
          }
          if (hitMine) {
            setRevealed(nextRev);
            setGameOver(true);
            setFaceState('dead');
            soundSynth.playGameOver();
            return;
          } else {
            soundSynth.playPop();
            setRevealed(nextRev);
          }
        }
      }
      return;
    }

    // 踩雷判断
    if (currentBoard[r][c] === -1) {
      // 触雷爆炸，展示全盘雷
      const allRev = revealed.map((row, ri) => row.map((cell, ci) => currentBoard[ri][ci] === -1 ? true : cell));
      allRev[r][c] = true;
      setRevealed(allRev);
      setGameOver(true);
      setFaceState('dead');
      soundSynth.playGameOver();
      return;
    }

    // 安全翻开
    soundSynth.playPop();
    const newRev = revealed.map(row => [...row]);
    const queue: [number, number][] = [[r, c]];
    newRev[r][c] = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      if (currentBoard[currR][currC] === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr, nc = currC + dc;
            if (nr >= 0 && nr < diff.rows && nc >= 0 && nc < diff.cols) {
              if (!newRev[nr][nc] && !flagged[nr][nc]) {
                newRev[nr][nc] = true;
                if (currentBoard[nr][nc] === 0) queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    setRevealed(newRev);

    // 胜利检查：所有非雷格子是否均已翻开
    let unrevealedSafe = 0;
    for (let ri = 0; ri < diff.rows; ri++) {
      for (let ci = 0; ci < diff.cols; ci++) {
        if (currentBoard[ri][ci] !== -1 && !newRev[ri][ci]) {
          unrevealedSafe++;
        }
      }
    }

    if (unrevealedSafe === 0) {
      setWon(true);
      setFaceState('won');
      soundSynth.playWin();
      onMove('win', { seconds, difficulty: diff.name });
    }
  }, [gameOver, won, flagged, board, firstClickDone, diff, revealed, onMove]);

  // 插旗/拔旗
  const toggleFlag = useCallback((r: number, c: number) => {
    if (gameOver || won || revealed[r]?.[c]) return;
    const newFlag = flagged.map(row => [...row]);
    const isNowFlagged = !newFlag[r][c];
    newFlag[r][c] = isNowFlagged;
    setFlagged(newFlag);
    setFlagsCount(fc => isNowFlagged ? fc + 1 : fc - 1);
    soundSynth.playClack();
  }, [gameOver, won, revealed, flagged]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { rows, cols } = diff;
    const maxWidth = 480;
    const cell = Math.min(36, Math.floor(maxWidth / cols));
    const totalW = cols * cell;
    const totalH = rows * cell;

    ctx.clearRect(0, 0, totalW, totalH);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cell;
        const y = r * cell;
        const isRev = revealed[r]?.[c];
        const isFlag = flagged[r]?.[c];
        const val = board[r]?.[c];

        if (isRev) {
          // 已翻开（下凹磨砂质感）
          if (val === -1) {
            ctx.fillStyle = '#ff5252';
          } else {
            ctx.fillStyle = (r + c) % 2 === 0 ? '#e0e0e0' : '#d5d5d5';
          }
          ctx.fillRect(x, y, cell, cell);
          ctx.strokeStyle = '#bdbdbd';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cell, cell);

          if (val > 0) {
            ctx.fillStyle = NUM_COLORS[val] || '#333';
            ctx.font = `bold ${Math.floor(cell * 0.65)}px "Segoe UI", Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(val), x + cell / 2, y + cell / 2);
          } else if (val === -1) {
            ctx.font = `${Math.floor(cell * 0.65)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('💣', x + cell / 2, y + cell / 2);
          }
        } else {
          // 未翻开（微浮雕立体质感）
          ctx.fillStyle = '#3a8ee6';
          ctx.fillRect(x, y, cell, cell);

          // 3D 高光与阴影边
          ctx.fillStyle = '#6cb2eb';
          ctx.fillRect(x, y, cell, 2);
          ctx.fillRect(x, y, 2, cell);

          ctx.fillStyle = '#1d4ed8';
          ctx.fillRect(x, y + cell - 2, cell, 2);
          ctx.fillRect(x + cell - 2, y, 2, cell);

          if (isFlag) {
            ctx.font = `${Math.floor(cell * 0.6)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🚩', x + cell / 2, y + cell / 2);
          }
        }
      }
    }
  }, [diff, revealed, flagged, board]);

  // 点击处理
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = Math.min(36, Math.floor(480 / diff.cols));

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const col = Math.floor(clickX / cell);
    const row = Math.floor(clickY / cell);

    if (row >= 0 && row < diff.rows && col >= 0 && col < diff.cols) {
      if (flagModeMobile || e.button === 2) {
        toggleFlag(row, col);
      } else {
        revealCell(row, col);
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const remainingMines = Math.max(0, diff.mines - flagsCount);
  const cell = Math.min(36, Math.floor(480 / diff.cols));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 难度切换栏 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {DIFFICULTIES.map((d, i) => (
          <button
            key={d.name}
            onClick={() => setDiffIndex(i)}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: diffIndex === i ? '#4f8cff' : '#2a2e3d',
              color: diffIndex === i ? '#fff' : '#9aa4bf',
              transition: 'all 0.2s',
            }}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* 经典扫雷互动仪表盘 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: diff.cols * cell,
          maxWidth: 480,
          background: '#1a2234',
          padding: '8px 16px',
          borderRadius: '8px 8px 0 0',
          borderBottom: '2px solid #2a3449',
        }}
      >
        {/* 剩余地雷数（LED 风格数字） */}
        <div style={{ background: '#000', color: '#ff3b30', fontFamily: 'monospace', fontSize: 20, padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>
          💣 {String(remainingMines).padStart(3, '0')}
        </div>

        {/* 动态笑脸按钮 */}
        <button
          onClick={() => initBoard(diff)}
          style={{
            fontSize: 24,
            background: '#ffc107',
            border: '2px solid #ffa000',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {faceState === 'won' ? '😎' : faceState === 'dead' ? '😵' : faceState === 'scared' ? '😮' : '🙂'}
        </button>

        {/* 计时器 */}
        <div style={{ background: '#000', color: '#ff3b30', fontFamily: 'monospace', fontSize: 20, padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>
          ⏱️ {String(Math.min(999, seconds)).padStart(3, '0')}
        </div>
      </div>

      {/* 扫雷画布容器 */}
      <div style={{ position: 'relative', width: diff.cols * cell, height: diff.rows * cell }}>
        <canvas
          ref={canvasRef}
          width={diff.cols * cell}
          height={diff.rows * cell}
          onClick={handleCanvasClick}
          onContextMenu={handleContextMenu}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        />

        {/* 获胜通关遮罩 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(56, 142, 60, 0.92)',
              borderRadius: '0 0 8px 8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 4 }}>🎉 扫雷大师通关!</div>
            <div style={{ fontSize: 16, marginBottom: 14 }}>用时: {seconds} 秒 ({diff.name})</div>
            <button
              onClick={() => initBoard(diff)}
              style={{
                padding: '8px 20px',
                borderRadius: 6,
                border: 'none',
                background: '#fff',
                color: '#2e7d32',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔄 再来一局
            </button>
          </div>
        )}
      </div>

      {/* 底部移动端与操作模式控制条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: diff.cols * cell, maxWidth: 480, marginTop: 10 }}>
        {/* 触屏专属：挖掘模式 vs 插旗模式切换开关 */}
        <button
          onClick={() => setFlagModeMobile(m => !m)}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            background: flagModeMobile ? '#ff9800' : '#4f8cff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {flagModeMobile ? '🚩 当前: 插旗标记模式 (点按插旗)' : '⛏️ 当前: 挖掘开雷模式 (点按翻开)'}
        </button>

        <span style={{ fontSize: 12, color: '#888' }}>
          💡 电脑右键插旗 / 双击数字快速开雷
        </span>
      </div>
    </div>
  );
}
