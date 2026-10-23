'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

type Grid = number[][];
type NotesGrid = Set<number>[][];

// 完整有效的数独生成器
function generateSudoku(holes: number): { puzzle: Grid; solution: Grid } {
  // 1. 生成完整数独解
  const solution: Grid = Array(9).fill(0).map(() => Array(9).fill(0));

  const isValid = (g: Grid, r: number, c: number, num: number) => {
    for (let i = 0; i < 9; i++) {
      if (g[r][i] === num || g[i][c] === num) return false;
    }
    const boxR = Math.floor(r / 3) * 3;
    const boxC = Math.floor(c / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (g[boxR + i][boxC + j] === num) return false;
      }
    }
    return true;
  };

  const fillGrid = (g: Grid): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === 0) {
          const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (const n of nums) {
            if (isValid(g, r, c, n)) {
              g[r][c] = n;
              if (fillGrid(g)) return true;
              g[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillGrid(solution);

  // 2. 挖空
  const puzzle = solution.map(r => [...r]);
  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) positions.push([r, c]);
  positions.sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(holes, positions.length); i++) {
    const [r, c] = positions[i];
    puzzle[r][c] = 0;
  }

  return { puzzle, solution };
}

export default function Sudoku({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [difficulty, setDifficulty] = useState<number>(36); // 36: 初级, 46: 中等, 52: 困难, 58: 恶魔
  const [board, setBoard] = useState<Grid>([]);
  const [fixed, setFixed] = useState<boolean[][]>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [notes, setNotes] = useState<NotesGrid>([]);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [isNoteMode, setIsNoteMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [seconds, setSeconds] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化新数独对局
  const initGame = useCallback((holes: number) => {
    const { puzzle, solution: sol } = generateSudoku(holes);
    const fixedGrid = puzzle.map(row => row.map(v => v !== 0));
    const emptyNotes: NotesGrid = Array(9).fill(0).map(() => Array(9).fill(0).map(() => new Set<number>()));

    setBoard(puzzle);
    setFixed(fixedGrid);
    setSolution(sol);
    setNotes(emptyNotes);
    setSelected(null);
    setErrors(new Set());
    setSeconds(0);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty, initGame]);

  // 计时器
  useEffect(() => {
    if (!won && board.length > 0) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [won, board.length]);

  // 填入数字
  const handleInputNumber = useCallback((num: number) => {
    if (won || !selected) return;
    const [r, c] = selected;
    if (fixed[r]?.[c]) return;

    if (isNoteMode) {
      // 笔记模式
      if (num === 0) return;
      const nextNotes = notes.map(row => row.map(s => new Set(s)));
      const cellNotes = nextNotes[r][c];
      if (cellNotes.has(num)) cellNotes.delete(num);
      else cellNotes.add(num);
      setNotes(nextNotes);
      soundSynth.playPop();
    } else {
      // 正常填数
      const nextBoard = board.map(row => [...row]);
      nextBoard[r][c] = num;
      setBoard(nextBoard);

      // 清除该格笔记
      if (notes[r]?.[c]?.size > 0) {
        const nextNotes = notes.map(row => row.map(s => new Set(s)));
        nextNotes[r][c].clear();
        setNotes(nextNotes);
      }

      if (num > 0) {
        soundSynth.playChime(num);
      } else {
        soundSynth.playPop();
      }

      // 实时冲突校验
      const conflictSet = new Set<string>();
      for (let ri = 0; ri < 9; ri++) {
        for (let ci = 0; ci < 9; ci++) {
          const val = nextBoard[ri][ci];
          if (val === 0) continue;
          // 检查同同行同列同九宫
          for (let i = 0; i < 9; i++) {
            if (i !== ci && nextBoard[ri][i] === val) { conflictSet.add(`${ri},${ci}`); conflictSet.add(`${ri},${i}`); }
            if (i !== ri && nextBoard[i][ci] === val) { conflictSet.add(`${ri},${ci}`); conflictSet.add(`${i},${ci}`); }
          }
          const boxR = Math.floor(ri / 3) * 3, boxC = Math.floor(ci / 3) * 3;
          for (let bi = 0; bi < 3; bi++) {
            for (let bj = 0; bj < 3; bj++) {
              const nr = boxR + bi, nc = boxC + bj;
              if ((nr !== ri || nc !== ci) && nextBoard[nr][nc] === val) {
                conflictSet.add(`${ri},${ci}`);
                conflictSet.add(`${nr},${nc}`);
              }
            }
          }
        }
      }
      setErrors(conflictSet);

      // 胜利检查
      let complete = true;
      for (let ri = 0; ri < 9; ri++) {
        for (let ci = 0; ci < 9; ci++) {
          if (nextBoard[ri][ci] === 0 || conflictSet.has(`${ri},${ci}`)) {
            complete = false;
            break;
          }
        }
      }

      if (complete && conflictSet.size === 0) {
        setWon(true);
        soundSynth.playWin();
        onMove('win', { seconds, difficulty });
      }
    }
  }, [won, selected, fixed, isNoteMode, notes, board, difficulty, seconds, onMove]);

  // 物理键盘监听
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (won || !selected) return;
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        handleInputNumber(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault();
        handleInputNumber(0);
      } else if (e.key === 'n' || e.key === 'N') {
        setIsNoteMode(m => !m);
      } else if (e.key === 'ArrowUp') {
        setSelected(prev => prev ? [Math.max(0, prev[0] - 1), prev[1]] : [0, 0]);
      } else if (e.key === 'ArrowDown') {
        setSelected(prev => prev ? [Math.min(8, prev[0] + 1), prev[1]] : [0, 0]);
      } else if (e.key === 'ArrowLeft') {
        setSelected(prev => prev ? [prev[0], Math.max(0, prev[1] - 1)] : [0, 0]);
      } else if (e.key === 'ArrowRight') {
        setSelected(prev => prev ? [prev[0], Math.min(8, prev[1] + 1)] : [0, 0]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [won, selected, handleInputNumber]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || board.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 441;
    const cell = size / 9;

    ctx.clearRect(0, 0, size, size);

    // 棋盘背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const [selR, selC] = selected || [-1, -1];
    const selVal = selR >= 0 && selC >= 0 ? board[selR]?.[selC] : 0;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const x = c * cell;
        const y = r * cell;
        const val = board[r]?.[c] || 0;
        const isSel = r === selR && c === selC;
        const isSameRowCol = r === selR || c === selC || (Math.floor(r / 3) === Math.floor(selR / 3) && Math.floor(c / 3) === Math.floor(selC / 3));
        const isSameNum = selVal > 0 && val === selVal;
        const isErr = errors.has(`${r},${c}`);

        // 底色填充
        if (isErr) {
          ctx.fillStyle = '#ffebee'; // 冲突错误警示红
        } else if (isSel) {
          ctx.fillStyle = '#bbdefb'; // 当前选中高亮蓝
        } else if (isSameNum) {
          ctx.fillStyle = '#c8e6c9'; // 同数高亮薄荷绿
        } else if (isSameRowCol && selR >= 0) {
          ctx.fillStyle = '#f0f4f8'; // 同十字交叉行柔和引导
        } else {
          ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(x, y, cell, cell);

        // 绘制数字或笔记
        if (val > 0) {
          ctx.fillStyle = isErr ? '#d32f2f' : fixed[r]?.[c] ? '#1a202c' : '#2563eb';
          ctx.font = `${fixed[r]?.[c] ? 'bold ' : ''}26px "Segoe UI", Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(val), x + cell / 2, y + cell / 2);
        } else if (notes[r]?.[c]?.size > 0) {
          // 绘制 3x3 笔记小数字
          ctx.fillStyle = '#718096';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const subCell = cell / 3;
          for (const n of Array.from(notes[r][c])) {
            const subR = Math.floor((n - 1) / 3);
            const subC = (n - 1) % 3;
            ctx.fillText(String(n), x + subC * subCell + subCell / 2, y + subR * subCell + subCell / 2);
          }
        }
      }
    }

    // 绘制九宫格边框（粗细线）
    for (let i = 0; i <= 9; i++) {
      const p = i * cell;
      ctx.beginPath();
      if (i % 3 === 0) {
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
      } else {
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
      }
      ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
    }
  }, [board, fixed, selected, notes, errors]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 441 / 9;
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
      setSelected([row, col]);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 难度选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 441, marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { h: 36, name: '入门 (36空)' },
            { h: 46, name: '中等 (46空)' },
            { h: 52, name: '困难 (52空)' },
            { h: 58, name: '恶魔级 (58空!)' },
          ].map(d => (
            <button
              key={d.h}
              onClick={() => { setDifficulty(d.h); initGame(d.h); }}
              style={{
                padding: '5px 9px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: difficulty === d.h ? '#4f8cff' : '#2a2e3d',
                color: difficulty === d.h ? '#fff' : '#9aa4bf',
                transition: 'all 0.2s',
              }}
            >
              {d.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => initGame(difficulty)}
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
          🔄 重新生成
        </button>
      </div>

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 441, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>⏱️ 计时: <b style={{ color: '#fff' }}>{formatTime(seconds)}</b></div>
        <div>模式: <b style={{ color: isNoteMode ? '#ff9800' : '#4f8cff' }}>{isNoteMode ? '✏️ 候选数笔记' : '✍️ 正式填数'}</b></div>
        <div>错误冲突: <b style={{ color: errors.size > 0 ? '#ff5252' : '#4caf50' }}>{errors.size > 0 ? `${errors.size / 2} 处` : '无冲突'}</b></div>
      </div>

      {/* 数独画布 */}
      <div style={{ position: 'relative', width: 441, height: 441 }}>
        <canvas
          ref={canvasRef}
          width={441}
          height={441}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 8,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
        />

        {/* 获胜通告 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(30, 41, 59, 0.94)',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 6, color: '#4caf50' }}>
              🎉 数独挑战成功!
            </div>
            <div style={{ fontSize: 16, color: '#ccc', marginBottom: 20 }}>
              总解题用时: {formatTime(seconds)}
            </div>
            <button
              onClick={() => initGame(difficulty)}
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
              🔄 挑战下一局
            </button>
          </div>
        )}
      </div>

      {/* 虚拟数字输入小键盘 (移动端/桌面通用) */}
      <div style={{ display: 'flex', gap: 6, marginTop: 12, width: 441, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleInputNumber(num)}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 6,
              fontSize: 18,
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              background: '#2a3449',
              color: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'background 0.15s',
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {/* 底部辅助操作栏 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 8, width: 441 }}>
        <button
          onClick={() => setIsNoteMode(m => !m)}
          style={{
            flex: 1,
            height: 38,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: isNoteMode ? '#ff9800' : '#334155',
            color: '#fff',
          }}
        >
          ✏️ {isNoteMode ? '笔记模式开启中 (点击切换)' : '点击开启笔记模式 (N)'}
        </button>
        <button
          onClick={() => handleInputNumber(0)}
          style={{
            width: 100,
            height: 38,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#475569',
            color: '#fff',
          }}
        >
          🧹 橡皮擦 (Del)
        </button>
      </div>
    </div>
  );
}
