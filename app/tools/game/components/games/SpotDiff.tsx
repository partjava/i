'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const P_COLORS = ['#ff4444', '#4f8cff', '#4caf50', '#ffd700', '#ff9800', '#9c27b0'];

export default function SpotDiff({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img1: number[][] = state?.image1 || [];
  const img2: number[][] = state?.image2 || [];
  const found: boolean[][] = state?.found || [];
  const size = state?.size || 8;
  const cell = 35;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !img1.length) return;
    const ctx = c.getContext('2d')!;
    const w = size * cell * 2 + 10, h = size * cell;
    ctx.clearRect(0, 0, w, h + 20);
    for (let side = 0; side < 2; side++) {
      const img = side === 0 ? img1 : img2;
      const ox = side * (size * cell + 10);
      for (let r = 0; r < size; r++) for (let col = 0; col < size; col++) {
        ctx.fillStyle = P_COLORS[(img[r]?.[col] || 1) - 1];
        ctx.fillRect(ox + col * cell, r * cell, cell, cell);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 0.5; ctx.strokeRect(ox + col * cell, r * cell, cell, cell);
      }
    }
    // 标记已找到的不同
    for (let r = 0; r < size; r++) for (let col = 0; col < size; col++) {
      if (found[r]?.[col]) {
        ctx.strokeStyle = '#ff0'; ctx.lineWidth = 3;
        ctx.strokeRect(col * cell - 2, r * cell - 2, cell + 4, cell + 4);
        ctx.strokeRect(size * cell + 10 + col * cell - 2, r * cell - 2, cell + 4, cell + 4);
      }
    }
    ctx.fillStyle = '#aaa'; ctx.font = '14px Arial'; ctx.textAlign = 'center';
    ctx.fillText('找不同', size * cell / 2, h + 16);
    ctx.fillText('找不同', size * cell + 10 + size * cell / 2, h + 16);
  }, [img1, img2, found, size]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const side = x > size * cell + 10 ? 1 : 0;
    const col = Math.floor((x - side * (size * cell + 10)) / cell);
    const row = Math.floor(y / cell);
    if (row < size && col < size) onMove('check', { row, col });
  }, [size, onMove]);

  return <canvas ref={canvasRef} width={size * cell * 2 + 10} height={size * cell + 20} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
