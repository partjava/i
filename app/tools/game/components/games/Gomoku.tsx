'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Gomoku({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const turn = state?.currentPlayer;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !board.length) return;
    const ctx = c.getContext('2d')!; const size = 450, cell = size / 15, offset = cell / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#dcb35c'; ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#8b6914'; ctx.lineWidth = 1;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath(); ctx.moveTo(offset, i * cell + offset); ctx.lineTo(size - offset, i * cell + offset); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i * cell + offset, offset); ctx.lineTo(i * cell + offset, size - offset); ctx.stroke();
    }
    for (let r = 0; r < 15; r++) for (let c2 = 0; c2 < 15; c2++) {
      if (!board[r]?.[c2]) continue;
      ctx.beginPath();
      ctx.arc(c2 * cell + offset, r * cell + offset, cell / 2 - 3, 0, Math.PI * 2);
      ctx.fillStyle = board[r][c2] === 1 ? '#222' : '#fff';
      ctx.fill();
      ctx.strokeStyle = '#999'; ctx.lineWidth = 1; ctx.stroke();
    }
  }, [board]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const cell = 450 / 15, offset = cell / 2;
    const col = Math.round((e.clientX - rect.left - offset) / cell);
    const row = Math.round((e.clientY - rect.top - offset) / cell);
    if (row >= 0 && row < 15 && col >= 0 && col < 15) onMove('place', { row, col, vsAI: true });
  }, [onMove]);

  return <canvas ref={canvasRef} width={450} height={450} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
