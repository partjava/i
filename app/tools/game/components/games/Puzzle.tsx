'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Puzzle({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const size = state?.size || 4;
  const cell = 100;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !board.length) return;
    const ctx = c.getContext('2d')!; const s = size * cell;
    ctx.clearRect(0, 0, s, s);
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, s, s);
    for (let r = 0; r < size; r++) for (let col = 0; col < size; col++) {
      const v = board[r]?.[col];
      if (v === 0) continue;
      const x = col * cell, y = r * cell;
      ctx.fillStyle = '#4f8cff'; ctx.fillRect(x + 2, y + 2, cell - 4, cell - 4);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(v), x + cell / 2, y + cell / 2);
    }
  }, [board, size]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    onMove('slide', { row, col });
  }, [onMove]);

  return <canvas ref={canvasRef} width={size * cell} height={size * cell} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
