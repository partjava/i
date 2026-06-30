'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Breakout({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const w = state?.width || 480, h = state?.height || 640;
  const paddleX = state?.paddleX ?? 200, paddleW = state?.paddleW || 80, paddleH = state?.paddleH || 15;
  const ballX = state?.ballX ?? 240, ballY = state?.ballY ?? 400;
  const bricks: boolean[][] = state?.bricks || [];
  const lives = state?.lives ?? 3;
  const launched = state?.launched;

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a23'; ctx.fillRect(0, 0, w, h);
    // 砖块
    const brickW = w / (bricks[0]?.length || 8), brickH = 20;
    for (let r = 0; r < bricks.length; r++) for (let col = 0; col < bricks[r].length; col++) {
      if (!bricks[r][col]) continue;
      ctx.fillStyle = `hsl(${r * 30}, 70%, 50%)`;
      ctx.fillRect(col * brickW, r * brickH + 40, brickW - 2, brickH - 2);
    }
    // 球拍
    ctx.fillStyle = '#4f8cff';
    ctx.fillRect(paddleX, h - paddleH - 10, paddleW, paddleH);
    // 球
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(ballX, ballY, 8, 0, Math.PI * 2); ctx.fill();
    // 生命
    ctx.fillStyle = '#ff6b6b'; ctx.font = '16px Arial'; ctx.textAlign = 'left';
    ctx.fillText(`❤️ × ${lives}`, 10, 25);
    if (!launched) {
      ctx.fillStyle = '#fff'; ctx.font = '20px Arial'; ctx.textAlign = 'center';
      ctx.fillText('点击开始', w / 2, h / 2);
    }
  }, [w, h, paddleX, paddleW, ballX, ballY, bricks, lives, launched]);

  const handleClick = useCallback(() => { if (!launched) onMove('launch'); }, [launched, onMove]);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    onMove('move', { x: Math.round(e.clientX - rect.left - paddleW / 2) });
  }, [paddleW, onMove]);

  return <canvas ref={canvasRef} width={w} height={h} onClick={handleClick} onMouseMove={handleMove} style={{ borderRadius: 8 }} />;
}
