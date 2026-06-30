'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Pinball({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const w = state?.width || 400, h = state?.height || 600;
  const ballX = state?.ballX ?? 200, ballY = state?.ballY ?? 500;
  const paddleLX = state?.paddleLX ?? 160, paddleRX = state?.paddleRX ?? 240;
  const bumpers: any[] = state?.bumpers || [];
  const lives = state?.lives ?? 3;

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a23'; ctx.fillRect(0, 0, w, h);
    // Bumpers
    for (const b of bumpers) {
      ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ff4444'; ctx.lineWidth = 2; ctx.stroke();
    }
    // Ball
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(ballX, ballY, 8, 0, Math.PI * 2); ctx.fill();
    // Paddles
    ctx.fillStyle = '#4f8cff';
    ctx.fillRect(paddleLX, h - 30, 80, 12);
    ctx.fillRect(paddleRX, h - 30, 80, 12);
    ctx.fillStyle = '#ff6b6b'; ctx.font = '16px Arial';
    ctx.fillText(`❤️ × ${lives}`, 10, 25);
  }, [w, h, ballX, ballY, paddleLX, paddleRX, bumpers, lives]);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    onMove('move', { lx: Math.round(x - 100), rx: Math.round(x + 20) });
  }, [onMove]);

  return <canvas ref={canvasRef} width={w} height={h} onMouseMove={handleMove} style={{ borderRadius: 8 }} />;
}
