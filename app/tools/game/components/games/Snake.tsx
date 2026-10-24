'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

export default function Snake({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake: number[][] = state?.snake || [];
  const foodX = state?.foodX, foodY = state?.foodY;
  const w = state?.width || 20, h = state?.height || 20;
  const gameOver = state?.gameOver;
  const directionX = state?.dx ?? 1, directionY = state?.dy ?? 0;

  const [pulse, setPulse] = useState(0);

  // 食物微光脉冲呼吸动效
  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => (p + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    const cell = 20;
    const totalW = w * cell;
    const totalH = h * cell;

    ctx.clearRect(0, 0, totalW, totalH);

    // 背景底板 (赛博朋克深空渐变)
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

    // 食物（呼吸微光高光苹果）
    if (foodX != null && foodY != null) {
      const fx = foodX * cell + cell / 2;
      const fy = foodY * cell + cell / 2;
      const glowR = 8 + Math.sin(pulse) * 2;

      ctx.save();
      ctx.shadowColor = '#ff4757';
      ctx.shadowBlur = 12 + Math.sin(pulse) * 6;

      ctx.fillStyle = '#ff4757';
      ctx.beginPath();
      ctx.arc(fx, fy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 果蒂叶片
      ctx.fillStyle = '#2ed573';
      ctx.beginPath();
      ctx.ellipse(fx + 2, fy - glowR, 3, 2, 0.4, 0, Math.PI * 2);
      ctx.fill();

      // 高光点
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(fx - 2, fy - 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 绘制蛇身 (自尾至头彩虹渐变与圆角过渡)
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg = snake[i];
      if (!seg) continue;
      const [column, row] = seg;
      const x = column * cell;
      const y = row * cell;
      const isHead = i === 0;

      ctx.save();
      if (isHead) {
        // 蛇头：青翠高亮绿
        ctx.fillStyle = '#2ed573';
        ctx.shadowColor = '#2ed573';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, cell - 2, cell - 2, 7);
        ctx.fill();

        // 眼睛朝向与实际运动方向一致。
        for (const side of [-1, 1]) {
          const eyeX = x + 10 + directionX * 4 - directionY * side * 4;
          const eyeY = y + 10 + directionY * 4 + directionX * side * 4;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(eyeX, eyeY, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.arc(eyeX + directionX, eyeY + directionY, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      } else {
        // 蛇身：顺滑渐变翠绿
        const ratio = i / Math.max(1, snake.length - 1);
        const hue = 145 - ratio * 45; // 绿向蓝过渡
        ctx.fillStyle = `hsl(${hue}, 85%, ${50 - ratio * 10}%)`;
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cell - 4, cell - 4, 5);
        ctx.fill();
      }
      ctx.restore();
    }

    // 游戏结束覆盖遮罩
    if (gameOver) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(0, 0, totalW, totalH);
      ctx.fillStyle = '#ff4757';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('游戏结束', totalW / 2, totalH / 2 - 14);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.fillText(`最终长度: ${snake.length}`, totalW / 2, totalH / 2 + 18);
    }
  }, [snake, foodX, foodY, w, h, gameOver, pulse, directionX, directionY]);

  // 键盘操作
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver || e.repeat || (e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)))) return;
      const map: Record<string, string> = {
        ArrowUp: 'up', KeyW: 'up',
        ArrowDown: 'down', KeyS: 'down',
        ArrowLeft: 'left', KeyA: 'left',
        ArrowRight: 'right', KeyD: 'right'
      };
      if (map[e.code]) {
        e.preventDefault();
        soundSynth.playMove();
        onMove(map[e.code]);
      }
    },
    [onMove, gameOver]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 画布 */}
      <div style={{ position: 'relative', maxWidth: '100%' }}>
        <canvas
          ref={canvasRef}
          width={w * 20}
          height={h * 20}
          style={{
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            display: 'block', maxWidth: '100%', height: 'auto', touchAction: 'none'
          }}
          tabIndex={0}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: 6, marginTop: 12 }}>
        {['', 'up', '', 'left', 'down', 'right'].map((direction, index) => direction ? (
          <button key={index} disabled={gameOver} aria-label={direction}
            onPointerDown={event => { event.preventDefault(); onMove(direction); }}
            style={{ height: 38, borderRadius: 8, border: '1px solid #475569', background: '#1e293b', color: '#fff', touchAction: 'none' }}>
            {{ up: '↑', down: '↓', left: '←', right: '→' }[direction]}
          </button>
        ) : <span key={index} />)}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: '#888', display: 'flex', gap: 16 }}>
        <span>⌨️ 方向键 / WASD 控制转弯</span>
        <span>蛇身长度: <b style={{ color: '#2ed573' }}>{snake.length}</b></span>
      </div>
    </div>
  );
}
