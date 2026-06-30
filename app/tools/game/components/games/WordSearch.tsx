'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function WordSearch({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid: string[][] = state?.grid || [];
  const words: string[] = state?.words || [];
  const found: boolean[][] = state?.found || [];
  const size = state?.size || 12;
  const cell = 32;
  const [dragStart, setDragStart] = useState<[number, number] | null>(null);

  useEffect(() => {
    const c = canvasRef.current; if (!c || !grid.length) return;
    const ctx = c.getContext('2d')!;
    const w = size * cell, h = size * cell + (words.length > 0 ? 120 : 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
    for (let r = 0; r < size; r++) for (let col = 0; col < size; col++) {
      const x = col * cell, y = r * cell;
      if (found[r]?.[col]) { ctx.fillStyle = '#2e7d32'; ctx.fillRect(x, y, cell, cell); }
      ctx.fillStyle = found[r]?.[col] ? '#a5d6a7' : '#e0e0e0';
      ctx.font = '16px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(grid[r]?.[col] || '', x + cell / 2, y + cell / 2);
      ctx.strokeStyle = '#333'; ctx.lineWidth = 0.5; ctx.strokeRect(x, y, cell, cell);
    }
    // 单词列表
    ctx.fillStyle = '#888'; ctx.font = '14px Arial'; ctx.textAlign = 'left';
    words.forEach((w, i) => {
      ctx.fillStyle = '#4fc3f7';
      ctx.fillText(w, 10, size * cell + 20 + i * 24);
    });
  }, [grid, words, found, size]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    setDragStart([row, col]);
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!dragStart) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    onMove('select', { r1: dragStart[0], c1: dragStart[1], r2: row, c2: col });
    setDragStart(null);
  }, [dragStart, onMove]);

  return <canvas ref={canvasRef} width={size * cell} height={size * cell + 120} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} style={{ cursor: 'crosshair', borderRadius: 8 }} />;
}
