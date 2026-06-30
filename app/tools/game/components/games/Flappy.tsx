'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Flappy({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const w = state?.width || 400, h = state?.height || 600;
  const birdY = state?.birdY ?? 250, birdVy = state?.birdVy ?? 0;
  const pipes: any[] = state?.pipes || [];

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, w, h);
    // Sky gradient
    const grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, '#4dc9f6'); grd.addColorStop(1, '#87ceeb');
    ctx.fillStyle = grd; ctx.fillRect(0, 0, w, h);
    // Pipes
    ctx.fillStyle = '#2e7d32';
    for (const p of pipes) {
      ctx.fillRect(p.x, 0, 50, p.pipeY);
      ctx.fillRect(p.x, p.pipeY + p.gap, 50, h - p.pipeY - p.gap);
    }
    // Bird
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.ellipse(80, birdY, 18, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(90, birdY - 4, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(92, birdY - 4, 2, 0, Math.PI * 2); ctx.fill();
  }, [w, h, birdY, birdVy, pipes]);

  const handleClick = useCallback(() => onMove('jump'), [onMove]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.code === 'Space') { e.preventDefault(); onMove('jump'); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onMove]);

  return <canvas ref={canvasRef} width={w} height={h} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
