'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface Pipe {
  x: number;
  topH: number;
  gap: number;
  passed: boolean;
}

interface Feather {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
}

export default function Flappy({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasShield, setHasShield] = useState(true);

  const birdRef = useRef({ y: 250, vy: 0, angle: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const feathersRef = useRef<Feather[]>([]);
  const cloudsRef = useRef<{ x: number; y: number; r: number; speed: number }[]>([]);
  const groundOffsetRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const W = 400;
  const H = 580;
  const GRAVITY = 0.38;
  const JUMP_FORCE = -7.2;

  // 初始化
  const initGame = useCallback(() => {
    birdRef.current = { y: 250, vy: 0, angle: 0 };
    pipesRef.current = [
      { x: 450, topH: 150, gap: 140, passed: false },
      { x: 670, topH: 220, gap: 140, passed: false },
    ];
    feathersRef.current = [];
    cloudsRef.current = [
      { x: 50, y: 80, r: 28, speed: 0.4 },
      { x: 220, y: 130, r: 38, speed: 0.6 },
      { x: 340, y: 60, r: 24, speed: 0.3 },
    ];
    setScore(0);
    setGameOver(false);
    setStarted(false);
    setHasShield(true);

    try {
      const s = localStorage.getItem('partjava_flappy_best');
      if (s) setBestScore(parseInt(s, 10));
    } catch {}
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // 煽动翅膀跳跃
  const jump = useCallback(() => {
    if (gameOver) {
      initGame();
      return;
    }
    if (!started) setStarted(true);

    birdRef.current.vy = JUMP_FORCE;
    birdRef.current.angle = -0.45;
    soundSynth.playPop();

    // 掉落一朵微光羽毛
    feathersRef.current.push({
      x: 90,
      y: birdRef.current.y + 4,
      vx: -1.5 + (Math.random() - 0.5),
      vy: 1.0 + Math.random(),
      alpha: 1.0,
    });
  }, [gameOver, started, initGame]);

  // 键盘与触控
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  // 60FPS 物理渲染循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      ctx.clearRect(0, 0, W, H);

      // 1. 吉卜力治愈天空背景渐变
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, '#38bdf8');
      skyGrad.addColorStop(0.65, '#bae6fd');
      skyGrad.addColorStop(1, '#fef08a');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. 远景流云视差移动
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      for (const cloud of cloudsRef.current) {
        if (started && !gameOver) {
          cloud.x -= cloud.speed;
          if (cloud.x + cloud.r * 2 < 0) cloud.x = W + cloud.r;
        }
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.r * 0.7, cloud.y - 10, cloud.r * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.r * 1.4, cloud.y, cloud.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. 管道移动与绘制
      const pipeW = 60;
      const groundH = 80;

      for (let i = pipesRef.current.length - 1; i >= 0; i--) {
        const p = pipesRef.current[i];
        if (started && !gameOver) {
          p.x -= 2.6;

          // 得分判定
          if (!p.passed && p.x + pipeW < 90) {
            p.passed = true;
            setScore(s => {
              const next = s + 1;
              soundSynth.playChime(next % 8);
              return next;
            });
          }
        }

        // 重新循环或生成管道
        if (p.x + pipeW < -20) {
          const lastX = Math.max(...pipesRef.current.map(o => o.x));
          p.x = lastX + 220;
          p.topH = 80 + Math.random() * (H - groundH - 240);
          p.passed = false;
        }

        // 上管道
        const pipeGrad = ctx.createLinearGradient(p.x, 0, p.x + pipeW, 0);
        pipeGrad.addColorStop(0, '#22c55e');
        pipeGrad.addColorStop(0.3, '#86efac');
        pipeGrad.addColorStop(0.8, '#16a34a');
        pipeGrad.addColorStop(1, '#15803d');

        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, 0, pipeW, p.topH);
        // 上管道唇缘
        ctx.fillRect(p.x - 4, p.topH - 24, pipeW + 8, 24);
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x - 4, p.topH - 24, pipeW + 8, 24);

        // 下管道
        const bottomY = p.topH + p.gap;
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, bottomY, pipeW, H - groundH - bottomY);
        // 下管道唇缘
        ctx.fillRect(p.x - 4, bottomY, pipeW + 8, 24);
        ctx.strokeRect(p.x - 4, bottomY, pipeW + 8, 24);

        // 碰撞检测
        const bird = birdRef.current;
        const birdRadius = 14;
        if (started && !gameOver) {
          if (
            90 + birdRadius > p.x &&
            90 - birdRadius < p.x + pipeW &&
            (bird.y - birdRadius < p.topH || bird.y + birdRadius > bottomY)
          ) {
            // 如果有护盾，抵挡一次
            if (hasShield) {
              setHasShield(false);
              soundSynth.playShatter();
              // 推开安全距离
              p.x = -100;
            } else {
              setGameOver(true);
              soundSynth.playGameOver();
              onMove('loss', { score });
            }
          }
        }
      }

      // 4. 羽毛飘落动画
      for (let i = feathersRef.current.length - 1; i >= 0; i--) {
        const f = feathersRef.current[i];
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.025;
        if (f.alpha <= 0) {
          feathersRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = f.alpha;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.ellipse(f.x, f.y, 5, 2, 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 5. 地面滚动
      const groundY = H - groundH;
      if (started && !gameOver) groundOffsetRef.current = (groundOffsetRef.current + 2.6) % 24;

      const groundGrad = ctx.createLinearGradient(0, groundY, 0, H);
      groundGrad.addColorStop(0, '#84cc16');
      groundGrad.addColorStop(0.15, '#65a30d');
      groundGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, groundY, W, groundH);

      // 地面草地纹理
      ctx.strokeStyle = '#4d7c0f';
      ctx.lineWidth = 3;
      for (let x = -groundOffsetRef.current; x < W; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 12, groundY + 14);
        ctx.stroke();
      }

      // 6. 小鸟物理模拟与绘制
      const bird = birdRef.current;
      if (started && !gameOver) {
        bird.vy += GRAVITY;
        bird.y += bird.vy;
        bird.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 5, bird.angle + 0.035));

        // 触地检测
        if (bird.y + 14 >= groundY) {
          bird.y = groundY - 14;
          setGameOver(true);
          soundSynth.playGameOver();
          onMove('loss', { score });
        }
      }

      // 绘制小鸟 (带旋转)
      ctx.save();
      ctx.translate(90, bird.y);
      ctx.rotate(bird.angle);

      // 护盾微光光圈
      if (hasShield) {
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 鸟身
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 翅膀
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(-5, 2, 9, 6, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // 大萌眼睛
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(8, -4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(10, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(11, -5, 1.2, 0, Math.PI * 2); // 眼神光
      ctx.fill();

      // 红润腮红
      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.beginPath();
      ctx.arc(4, 4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 橙色鸟喙
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(24, 2);
      ctx.lineTo(14, 6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [started, gameOver, hasShield, score, onMove]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部状态条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: W, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 14 }}>
        <div style={{ color: '#fff' }}>得分: <b style={{ color: '#38bdf8', fontSize: 20 }}>{score}</b></div>
        <div style={{ color: '#aaa', fontSize: 13 }}>
          {hasShield ? '🛡️ 气泡护盾生效中 (抵御1次撞击)' : '⚠️ 护盾已破裂'}
        </div>
        <button
          onClick={initGame}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#334155',
            color: '#fff',
          }}
        >
          🔄 重来
        </button>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: W, height: H }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={jump}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
        />

        {/* 初始点击跳跃提示 */}
        {!started && !gameOver && (
          <div
            onClick={jump}
            style={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              background: 'rgba(15, 23, 42, 0.75)',
              padding: '12px 24px',
              borderRadius: 30,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.2)',
              pointerEvents: 'none',
            }}
          >
            👆 点击屏幕 / 空格键煽翅飞翔
          </div>
        )}

        {/* 游戏结束通告 */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#ff4757', marginBottom: 6 }}>
              飞行结束
            </div>
            <div style={{ fontSize: 18, color: '#38bdf8', marginBottom: 20 }}>本次得分: {score}</div>
            <button
              onClick={initGame}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#38bdf8',
                color: '#0f172a',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              🔄 再飞一次
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 穿越管道触发清脆五声音阶风铃声，自带一次性保护气泡盾，极大降低初见杀挫败感</span>
      </div>
    </div>
  );
}
