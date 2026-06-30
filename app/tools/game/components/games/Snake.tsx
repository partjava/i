'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Snake({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake: number[][] = state?.snake || [];
  const foodX = state?.foodX, foodY = state?.foodY;
  const w = state?.width || 20, h = state?.height || 20;

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!; const cell = 20;
    ctx.clearRect(0, 0, w * cell, h * cell);
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, 0, w * cell, h * cell);
    // Grid
    ctx.strokeStyle = '#1a1a4e'; ctx.lineWidth = 0.5;
    for (let x = 0; x <= w; x++) { ctx.beginPath(); ctx.moveTo(x * cell, 0); ctx.lineTo(x * cell, h * cell); ctx.stroke(); }
    for (let y = 0; y <= h; y++) { ctx.beginPath(); ctx.moveTo(0, y * cell); ctx.lineTo(w * cell, y * cell); ctx.stroke(); }
    // Snake
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#4f8cff' : '#6db3f2';
      ctx.fillRect(seg[0] * cell + 1, seg[1] * cell + 1, cell - 2, cell - 2);
    });
    // Food
    if (foodX != null) {
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(foodX * cell + cell / 2, foodY * cell + cell / 2, cell / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [snake, foodX, foodY, w, h]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, string> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (map[e.key]) { e.preventDefault(); onMove(map[e.key]); }
  }, [onMove]);

  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return <canvas ref={canvasRef} width={w * 20} height={h * 20} style={{ borderRadius: 8 }} />;
}
