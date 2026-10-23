'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

type Piece = 'X' | 'O' | null;

interface PlacedPiece {
  r: number;
  c: number;
  player: 'X' | 'O';
}

export default function TicTacToe({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [mode, setMode] = useState<'endless' | 'classic'>('endless');
  const [vsAI, setVsAI] = useState<boolean>(true);
  const [board, setBoard] = useState<Piece[][]>(Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [history, setHistory] = useState<PlacedPiece[]>([]);
  const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);
  const [winLine, setWinLine] = useState<[number, number][] | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initGame = useCallback(() => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentTurn('X');
    setHistory([]);
    setWinner(null);
    setWinLine(null);
  }, []);

  // 检查胜负
  const checkWin = (b: Piece[][]): { winner: 'X' | 'O' | null; line: [number, number][] | null } => {
    const lines = [
      // 3 行
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // 3 列
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // 2 对角
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const l of lines) {
      const [p1, p2, p3] = l;
      const v = b[p1[0]][p1[1]];
      if (v && v === b[p2[0]][p2[1]] && v === b[p3[0]][p3[1]]) {
        return { winner: v, line: l as [number, number][] };
      }
    }
    return { winner: null, line: null };
  };

  // AI 下子决策 (Minimax)
  const getAiMove = useCallback((b: Piece[][], h: PlacedPiece[], isEndless: boolean): [number, number] => {
    // 优先检查 AI 能否一步取胜
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!b[r][c]) {
          const testB = b.map(row => [...row]);
          testB[r][c] = 'O';
          if (checkWin(testB).winner === 'O') return [r, c];
        }
      }
    }
    // 阻止玩家一步取胜
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!b[r][c]) {
          const testB = b.map(row => [...row]);
          testB[r][c] = 'X';
          if (checkWin(testB).winner === 'X') return [r, c];
        }
      }
    }
    // 优先抢占中心
    if (!b[1][1]) return [1, 1];
    // 抢角
    const allCorners: [number, number][] = [[0, 0], [0, 2], [2, 0], [2, 2]];
    const corners = allCorners.filter(([r, c]) => !b[r][c]);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    // 剩余空位
    const empties: [number, number][] = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (!b[r][c]) empties.push([r, c]);
    return empties[Math.floor(Math.random() * empties.length)];
  }, []);

  // 执行落子
  const makeMove = useCallback((r: number, c: number) => {
    if (winner || board[r][c]) return;

    soundSynth.playMove();

    let newBoard = board.map(row => [...row]);
    let newHistory = [...history, { r, c, player: currentTurn }];

    // 不息模式：双方场上最多 3 颗子，下第 4 颗时自己最早的那颗化作光尘消失
    if (mode === 'endless') {
      const playerPieces = newHistory.filter(h => h.player === currentTurn);
      if (playerPieces.length > 3) {
        const oldest = playerPieces[0];
        newBoard[oldest.r][oldest.c] = null;
        newHistory = newHistory.filter(h => h !== oldest);
      }
    }

    newBoard[r][c] = currentTurn;
    setBoard(newBoard);
    setHistory(newHistory);

    const winResult = checkWin(newBoard);
    if (winResult.winner) {
      setWinner(winResult.winner);
      setWinLine(winResult.line);
      soundSynth.playWin();
      onMove('win', { winner: winResult.winner });
      return;
    }

    // 经典模式平局判断
    if (mode === 'classic' && newHistory.length === 9) {
      setWinner('draw');
      soundSynth.playGameOver();
      return;
    }

    const nextTurn = currentTurn === 'X' ? 'O' : 'X';
    setCurrentTurn(nextTurn);

    // AI 自动走棋
    if (vsAI && nextTurn === 'O') {
      setTimeout(() => {
        const [aiR, aiC] = getAiMove(newBoard, newHistory, mode === 'endless');
        soundSynth.playMove();

        let aiBoard = newBoard.map(row => [...row]);
        let aiHistory = [...newHistory, { r: aiR, c: aiC, player: 'O' as const }];

        if (mode === 'endless') {
          const aiPieces = aiHistory.filter(h => h.player === 'O');
          if (aiPieces.length > 3) {
            const oldest = aiPieces[0];
            aiBoard[oldest.r][oldest.c] = null;
            aiHistory = aiHistory.filter(h => h !== oldest);
          }
        }

        aiBoard[aiR][aiC] = 'O';
        setBoard(aiBoard);
        setHistory(aiHistory);

        const aiWinResult = checkWin(aiBoard);
        if (aiWinResult.winner) {
          setWinner(aiWinResult.winner);
          setWinLine(aiWinResult.line);
          soundSynth.playGameOver();
          onMove('loss', { winner: 'O' });
        } else if (mode === 'classic' && aiHistory.length === 9) {
          setWinner('draw');
        } else {
          setCurrentTurn('X');
        }
      }, 350);
    }
  }, [winner, board, history, currentTurn, mode, vsAI, getAiMove, onMove]);

  // Canvas 绘制赛博朋克霓虹网格
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 390;
    const cell = size / 3;

    ctx.clearRect(0, 0, size, size);

    // 背景底色
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 16);
    ctx.fill();

    // 霓虹网格线
    ctx.save();
    ctx.strokeStyle = 'rgba(79, 140, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 10;

    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 18);
      ctx.lineTo(i * cell, size - 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(18, i * cell);
      ctx.lineTo(size - 18, i * cell);
      ctx.stroke();
    }
    ctx.restore();

    // 寻找在不息模式中即将消失的棋子（各方最老的一颗且该方已有 3 颗）
    let dyingX: PlacedPiece | null = null;
    let dyingO: PlacedPiece | null = null;
    if (mode === 'endless') {
      const xPieces = history.filter(h => h.player === 'X');
      if (xPieces.length >= 3 && currentTurn === 'X') dyingX = xPieces[0];
      const oPieces = history.filter(h => h.player === 'O');
      if (oPieces.length >= 3 && currentTurn === 'O') dyingO = oPieces[0];
    }

    // 绘制棋子
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const val = board[r][c];
        if (!val) continue;

        const x = c * cell + cell / 2;
        const y = r * cell + cell / 2;
        const radius = cell * 0.28;

        const isDying = (val === 'X' && dyingX?.r === r && dyingX?.c === c) ||
                        (val === 'O' && dyingO?.r === r && dyingO?.c === c);

        ctx.save();
        if (isDying) {
          ctx.globalAlpha = 0.4; // 即将消逝闪烁虚影
        }

        if (val === 'X') {
          // 霓虹青光剑 X
          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 16;

          ctx.beginPath();
          ctx.moveTo(x - radius, y - radius);
          ctx.lineTo(x + radius, y + radius);
          ctx.moveTo(x + radius, y - radius);
          ctx.lineTo(x - radius, y + radius);
          ctx.stroke();
        } else {
          // 等离子粉光环 O
          ctx.strokeStyle = '#f5576c';
          ctx.lineWidth = 10;
          ctx.shadowColor = '#f5576c';
          ctx.shadowBlur = 16;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // 获胜金光连线
    if (winLine && winLine.length === 3) {
      ctx.save();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 20;

      const [p1, , p3] = winLine;
      ctx.beginPath();
      ctx.moveTo(p1[1] * cell + cell / 2, p1[0] * cell + cell / 2);
      ctx.lineTo(p3[1] * cell + cell / 2, p3[0] * cell + cell / 2);
      ctx.stroke();
      ctx.restore();
    }
  }, [board, history, currentTurn, mode, winLine]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 390 / 3;
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      makeMove(row, col);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 模式选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 390, marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => { setMode('endless'); initGame(); }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: mode === 'endless' ? '#00f2fe' : '#2a2e3d',
              color: mode === 'endless' ? '#000' : '#9aa4bf',
            }}
          >
            🔥 不息消消乐 (无死局)
          </button>
          <button
            onClick={() => { setMode('classic'); initGame(); }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: mode === 'classic' ? '#f5576c' : '#2a2e3d',
              color: '#fff',
            }}
          >
            ⚡ 经典 3×3
          </button>
        </div>

        <button
          onClick={initGame}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#334155',
            color: '#fff',
          }}
        >
          🔄 重开
        </button>
      </div>

      {/* 状态统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 390, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>当前回合: <b style={{ color: currentTurn === 'X' ? '#00f2fe' : '#f5576c' }}>{currentTurn === 'X' ? '🔵 玩家 (X)' : '🔴 AI (O)'}</b></div>
        <div>对战模式: <b style={{ color: '#fff' }}>{mode === 'endless' ? '最多留 3 子' : '传统填满'}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 390, height: 390 }}>
        <canvas
          ref={canvasRef}
          width={390}
          height={390}
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 16,
            boxShadow: '0 8px 30px rgba(0, 242, 254, 0.15)',
          }}
        />

        {/* 获胜通告 */}
        {winner && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 8, color: winner === 'X' ? '#00f2fe' : winner === 'O' ? '#f5576c' : '#aaa' }}>
              {winner === 'X' ? '🎉 玩家 (X) 获胜!' : winner === 'O' ? '🤖 AI (O) 获胜!' : '🤝 势均力敌 平局!'}
            </div>
            <button
              onClick={initGame}
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
              🔄 再来一局
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 不息模式中双方各最多 3 颗子，下第 4 颗时自己最早的那颗会变暗消失，攻守瞬息万变！</span>
      </div>
    </div>
  );
}
