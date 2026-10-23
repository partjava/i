'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Snake({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake: number[][] = state?.snake || [];
  const foodX = state?.foodX,
    foodY = state?.foodY;
  const w = state?.width || 20,
    h = state?.height || 20;
  const gameOver = state?.gameOver;

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    const cell = 20;
    const totalW = w * cell;
    const totalH = h * cell;

    ctx.clearRect(0, 0, totalW, totalH);

    // 背景底板
    const bgGrd = ctx.createLinearGradient(0, 0, totalW, totalH);
    bgGrd.addColorStop(0, '#0c1524');
    bgGrd.addColorStop(1, '#060a12');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, totalW, totalH);

    // 科技感网格线
    ctx.strokeStyle = 'rgba(79, 140, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cell, 0);
      ctx.lineTo(x * cell, totalH);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cell);
      ctx.lineTo(totalW, y * cell);
      ctx.stroke();
    }

    // 食物（带微发光和高光）
    if (foodX != null && foodY != null) {
      const fx = foodX * cell + cell / 2;
      const fy = foodY * cell + cell / 2;
      const r = cell / 2 - 2;

      ctx.save();
      ctx.shadowColor = '#ff5252';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ff5252';
      ctx.beginPath();
      ctx.arc(fx, fy, r, 0, Math.PI * 2);
      ctx.fill();

      // 果蒂叶片
      ctx.fillStyle = '#69f0ae';
      ctx.beginPath();
      ctx.ellipse(fx + 2, fy - r + 1, 3, 1.8, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 蛇身绘制（渐变蓝色 + 圆角段）
    snake.forEach((seg, i) => {
      const sx = seg[0] * cell;
      const sy = seg[1] * cell;
      const isHead = i === 0;

      ctx.save();
      if (isHead) {
        ctx.shadowColor = '#4f8cff';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#4f8cff';
      } else {
        const ratio = i / Math.max(snake.length, 1);
        ctx.fillStyle = `hsl(${210 - ratio * 35}, 85%, ${55 - ratio * 15}%)`;
      }

      // 圆角矩形身体
      const pad = 1.5;
      const rad = isHead ? 6 : 4;
      ctx.beginPath();
      ctx.roundRect(sx + pad, sy + pad, cell - pad * 2, cell - pad * 2, rad);
      ctx.fill();

      // 蛇头萌系眼睛
      if (isHead) {
        ctx.fillStyle = '#fff';
        const eyeR = 2.2;
        ctx.beginPath();
        ctx.arc(sx + 6, sy + 6, eyeR, 0, Math.PI * 2);
        ctx.arc(sx + cell - 6, sy + 6, eyeR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(sx + 6, sy + 6, 1.2, 0, Math.PI * 2);
        ctx.arc(sx + cell - 6, sy + 6, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // 游戏结束提示
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 22px serif';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', totalW / 2, totalH / 2 - 10);
      ctx.fillStyle = '#ccc';
      ctx.font = '13px sans-serif';
      ctx.fillText('按 R 或点击上方“重新开始”再次挑战', totalW / 2, totalH / 2 + 18);
    }
  }, [snake, foodX, foodY, w, h, gameOver]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
        W: 'up',
        S: 'down',
        A: 'left',
        D: 'right'
      };
      if (map[e.key]) {
        e.preventDefault();
        onMove(map[e.key]);
      }
    },
    [onMove]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <canvas
      ref={canvasRef}
      width={w * 20}
      height={h * 20}
      style={{
        borderRadius: 12,
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}
    />
  );
}
