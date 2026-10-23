'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface FoundWord {
  word: string;
  r1: number;
  c1: number;
  r2: number;
  c2: number;
  color: string;
}

const TECH_WORDS = [
  'JAVA', 'SPRING', 'THREAD', 'STREAM', 'REDIS', 'MYSQL',
  'DOCKER', 'KAFKA', 'CLUSTER', 'INDEX', 'CLASS', 'CACHE',
  'LAMBDA', 'BYTECODE', 'MEMORY', 'SOCKET', 'PROXY', 'OBJECT'
];

const COLORS = [
  '#f43f5e', '#3b82f6', '#10b981', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
];

function generateBoard(size: number, wordCount: number) {
  const grid: string[][] = Array(size).fill('').map(() => Array(size).fill(''));
  const wordsToPlace = [...TECH_WORDS].sort(() => Math.random() - 0.5).slice(0, wordCount);
  const placedWords: string[] = [];

  // 8 个方向: [dr, dc]
  const dirs = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [-1, -1], [1, -1], [-1, 1]
  ];

  for (const word of wordsToPlace) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 150) {
      attempts++;
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);

      const endR = r + dr * (word.length - 1);
      const endC = c + dc * (word.length - 1);

      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (grid[nr][nc] !== '' && grid[nr][nc] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          grid[r + dr * i][c + dc * i] = word[i];
        }
        placed = true;
        placedWords.push(word);
      }
    }
  }

  // 剩余空格填充随机字母 A-Z
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, words: placedWords };
}

export default function WordSearch({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [boardSize, setBoardSize] = useState<number>(12);
  const [grid, setGrid] = useState<string[][]>([]);
  const [targetWords, setTargetWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [dragStart, setDragStart] = useState<[number, number] | null>(null);
  const [dragCurrent, setDragCurrent] = useState<[number, number] | null>(null);
  const [won, setWon] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initGame = useCallback((size: number) => {
    const wordCount = size === 12 ? 8 : size === 16 ? 12 : 16;
    const { grid: g, words: w } = generateBoard(size, wordCount);
    setGrid(g);
    setTargetWords(w);
    setFoundWords([]);
    setDragStart(null);
    setDragCurrent(null);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame(boardSize);
  }, [boardSize, initGame]);

  // 获取从 (r1, c1) 到 (r2, c2) 的合法直线单元格
  const getLineCells = (r1: number, c1: number, r2: number, c2: number): [number, number][] => {
    const dr = r2 - r1;
    const dc = c2 - c1;
    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    // 必须在水平、垂直或 45 度角对角线上
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) {
      return [];
    }

    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const cells: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      cells.push([r1 + stepR * i, c1 + stepC * i]);
    }
    return cells;
  };

  // 释放鼠标判定圈词
  const handleSelection = useCallback((r1: number, c1: number, r2: number, c2: number) => {
    const cells = getLineCells(r1, c1, r2, c2);
    if (cells.length < 2) return;

    const selectedWord = cells.map(([r, c]) => grid[r][c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    const matchedTarget = targetWords.find(
      w => (w === selectedWord || w === reversedWord) && !foundWords.some(fw => fw.word === w)
    );

    if (matchedTarget) {
      soundSynth.playScore();
      const color = COLORS[foundWords.length % COLORS.length];
      const newFound = [...foundWords, { word: matchedTarget, r1, c1, r2, c2, color }];
      setFoundWords(newFound);

      if (newFound.length === targetWords.length) {
        setWon(true);
        soundSynth.playWin();
        onMove('win', { totalFound: newFound.length, size: boardSize });
      }
    } else {
      soundSynth.playMove();
    }
  }, [grid, targetWords, foundWords, boardSize, onMove]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = boardSize;
    const totalSize = 440;
    const cell = totalSize / size;

    ctx.clearRect(0, 0, totalSize, totalSize);

    // 棋盘背景
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(0, 0, totalSize, totalSize, 12);
    ctx.fill();

    // 1. 绘制已找到单词的高亮半透明胶囊划线
    for (const fw of foundWords) {
      const x1 = fw.c1 * cell + cell / 2;
      const y1 = fw.r1 * cell + cell / 2;
      const x2 = fw.c2 * cell + cell / 2;
      const y2 = fw.r2 * cell + cell / 2;

      ctx.save();
      ctx.strokeStyle = fw.color;
      ctx.lineWidth = cell * 0.75;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.45;
      ctx.shadowColor = fw.color;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    // 2. 绘制当前正在拖拽的荧光笔实时路径
    if (dragStart && dragCurrent) {
      const cells = getLineCells(dragStart[0], dragStart[1], dragCurrent[0], dragCurrent[1]);
      if (cells.length > 0) {
        const x1 = dragStart[1] * cell + cell / 2;
        const y1 = dragStart[0] * cell + cell / 2;
        const x2 = dragCurrent[1] * cell + cell / 2;
        const y2 = dragCurrent[0] * cell + cell / 2;

        ctx.save();
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = cell * 0.7;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.5;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 3. 绘制字母矩阵
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = c * cell + cell / 2;
        const y = r * cell + cell / 2;
        const letter = grid[r][c];

        ctx.fillStyle = '#f8fafc';
        const fontSize = size === 12 ? 16 : size === 16 ? 13 : 10;
        ctx.font = `bold ${fontSize}px "Segoe UI", Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, x, y);
      }
    }
  }, [grid, boardSize, foundWords, dragStart, dragCurrent]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 440 / boardSize;
    const c = Math.floor((e.clientX - rect.left) / cell);
    const r = Math.floor((e.clientY - rect.top) / cell);
    if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
      setDragStart([r, c]);
      setDragCurrent([r, c]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragStart) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 440 / boardSize;
    const c = Math.floor((e.clientX - rect.left) / cell);
    const r = Math.floor((e.clientY - rect.top) / cell);
    if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
      setDragCurrent([r, c]);
    }
  };

  const handleMouseUp = () => {
    if (dragStart && dragCurrent) {
      handleSelection(dragStart[0], dragStart[1], dragCurrent[0], dragCurrent[1]);
    }
    setDragStart(null);
    setDragCurrent(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: 440 }}>
      {/* 规模难度选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 12, name: '12×12 经典' },
            { s: 16, name: '16×16 进阶' },
            { s: 20, name: '20×20 极客搜词' },
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
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>已搜寻: <b style={{ color: '#4caf50' }}>{foundWords.length} / {targetWords.length}</b></div>
        <div>矩阵规格: <b style={{ color: '#38bdf8' }}>{boardSize}×{boardSize}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            display: 'block',
            cursor: 'crosshair',
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
            <div style={{ fontSize: 34, fontWeight: 'bold', color: '#10b981', marginBottom: 6 }}>
              🏆 全量词汇全部捕获!
            </div>
            <div style={{ fontSize: 16, marginBottom: 18 }}>成功搜出 {targetWords.length} 个核心开发词汇</div>
            <button
              onClick={() => initGame(boardSize)}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔄 挑战下一局
            </button>
          </div>
        )}
      </div>

      {/* 底部目标单词列表 (强迫症极爽划线打勾) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, width: '100%', justifyContent: 'center' }}>
        {targetWords.map(w => {
          const isFound = foundWords.some(fw => fw.word === w);
          return (
            <span
              key={w}
              style={{
                padding: '3px 9px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 'bold',
                background: isFound ? 'rgba(16, 185, 129, 0.2)' : '#1e293b',
                color: isFound ? '#10b981' : '#94a3b8',
                textDecoration: isFound ? 'line-through' : 'none',
                border: isFound ? '1px solid #10b981' : '1px solid #334155',
                transition: 'all 0.2s',
              }}
            >
              {isFound ? `✅ ${w}` : w}
            </span>
          );
        })}
      </div>
    </div>
  );
}
