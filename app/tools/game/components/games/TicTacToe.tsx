'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function TicTacToe({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: string[][] = state?.board || [];

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!; const s = 360, cell = s / 3;
    ctx.clearRect(0, 0, s, s);
    ctx.strokeStyle = '#555'; ctx.lineWidth = 2;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(s, i * cell); ctx.stroke();
    }
    for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 3; c2++) {
      if (!board[r]?.[c2]) continue;
      const x = c2 * cell + cell / 2, y = r * cell + cell / 2;
      ctx.font = '60px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = board[r][c2] === 'X' ? '#4f8cff' : '#ff6b6b';
      ctx.fillText(board[r][c2], x, y);
    }
  }, [board]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const cell = 360 / 3;
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    onMove('place', { row, col });
  }, [onMove]);

  return <canvas ref={canvasRef} width={360} height={360} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
