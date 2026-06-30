'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const PIPE_COLORS = ['#4f8cff', '#ff6b6b', '#4caf50', '#ffd700'];

export default function PipeConnect({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pipes: number[][] = state?.pipes || [];
  const connected: boolean[][] = state?.connected || [];
  const rows = state?.rows || 6, cols = state?.cols || 6;
  const cell = 60;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !pipes.length) return;
    const ctx = c.getContext('2d')!;
    const w = cols * cell, h = rows * cell;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
    for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
      const x = col * cell, y = r * cell, cx = x + cell / 2, cy = y + cell / 2;
      const p = pipes[r]?.[col] || 0;
      ctx.fillStyle = connected[r]?.[col] ? '#2e7d32' : '#333';
      ctx.fillRect(x + 2, y + 2, cell - 4, cell - 4);
      ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.strokeRect(x + 2, y + 2, cell - 4, cell - 4);
      if (p === 0) continue;
      ctx.strokeStyle = connected[r]?.[col] ? '#4caf50' : PIPE_COLORS[(p - 1) % PIPE_COLORS.length];
      ctx.lineWidth = 8; ctx.lineCap = 'round';
      const up = p === 1 || p === 3, down = p === 2 || p === 3, left = p === 1 || p === 4, right = p === 2 || p === 4;
      if (left) { ctx.beginPath(); ctx.moveTo(x + 4, cy); ctx.lineTo(cx, cy); ctx.stroke(); }
      if (right) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x + cell - 4, cy); ctx.stroke(); }
      if (up) { ctx.beginPath(); ctx.moveTo(cx, y + 4); ctx.lineTo(cx, cy); ctx.stroke(); }
      if (down) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, y + cell - 4); ctx.stroke(); }
    }
  }, [pipes, connected, rows, cols]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    onMove('rotate', { row, col });
  }, [onMove]);

  return <canvas ref={canvasRef} width={cols * cell} height={rows * cell} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
