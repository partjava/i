'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Minesweeper({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const revealed: boolean[][] = state?.revealed || [];
  const flagged: boolean[][] = state?.flagged || [];
  const rows = state?.rows || 9, cols = state?.cols || 9;
  const cell = 40;

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const w = cols * cell, h = rows * cell;
    ctx.clearRect(0, 0, w, h);
    for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
      const x = col * cell, y = r * cell;
      if (revealed[r]?.[col]) {
        ctx.fillStyle = board[r][col] === -1 ? '#ff4444' : '#e8e8e8';
        ctx.fillRect(x, y, cell, cell);
        ctx.strokeStyle = '#ccc'; ctx.strokeRect(x, y, cell, cell);
        if (board[r][col] > 0) {
          ctx.fillStyle = '#333'; ctx.font = '18px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(String(board[r][col]), x + cell / 2, y + cell / 2);
        }
        if (board[r][col] === -1) {
          ctx.fillStyle = '#fff'; ctx.font = '20px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('💣', x + cell / 2, y + cell / 2);
        }
      } else {
        ctx.fillStyle = flagged[r]?.[col] ? '#ffd700' : '#4a90d9';
        ctx.fillRect(x, y, cell, cell);
        ctx.strokeStyle = '#3a7bc8'; ctx.strokeRect(x, y, cell, cell);
        if (flagged[r]?.[col]) {
          ctx.fillStyle = '#fff'; ctx.font = '18px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('🚩', x + cell / 2, y + cell / 2);
        }
      }
    }
  }, [board, revealed, flagged, rows, cols]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    onMove(e.button === 2 ? 'flag' : 'reveal', { row, col });
  }, [onMove]);

  const handleCtx = useCallback((e: React.MouseEvent) => { e.preventDefault(); }, []);

  return (
    <canvas
      ref={canvasRef} width={cols * cell} height={rows * cell}
      onClick={handleClick} onContextMenu={handleCtx}
      style={{ cursor: 'pointer', borderRadius: 8 }}
    />
  );
}
