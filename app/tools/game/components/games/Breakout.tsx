'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: 'multiball' | 'wide' | 'laser';
  color: string;
  label: string;
}

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  durability: number;
  maxDurability: number;
}

export default function Breakout({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [launched, setLaunched] = useState(false);

  // 实体状态 Ref
  const paddleRef = useRef({ x: 190, y: 550, w: 100, h: 14, targetX: 190 });
  const ballsRef = useRef<Ball[]>([]);
  const bricksRef = useRef<Brick[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const W = 480;
  const H = 600;

  // 初始化关卡砖块
  const initLevel = useCallback(() => {
    const rows = 6;
    const cols = 8;
    const padX = 20;
    const padY = 50;
    const brickW = (W - padX * 2) / cols;
    const brickH = 22;

    const colors = ['#ff4757', '#ff6b81', '#ffa502', '#2ed573', '#1e90ff', '#9c88ff'];
    const newBricks: Brick[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const durability = r === 0 ? 2 : 1; // 顶层为双倍耐久石砖
        newBricks.push({
          x: padX + c * brickW,
          y: padY + r * brickH,
          w: brickW - 4,
          h: brickH - 4,
          color: colors[r % colors.length],
          durability,
          maxDurability: durability,
        });
      }
    }

    bricksRef.current = newBricks;
    paddleRef.current = { x: (W - 100) / 2, y: 550, w: 100, h: 14, targetX: (W - 100) / 2 };
    ballsRef.current = [{ x: W / 2, y: 535, vx: 4, vy: -5, radius: 7 }];
    particlesRef.current = [];
    powerUpsRef.current = [];
    trailRef.current = [];
    setLaunched(false);
    setGameOver(false);
    setWon(false);
  }, []);

  const initGame = useCallback(() => {
    setScore(0);
    setLives(3);
    initLevel();
  }, [initLevel]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // 发射小球
  const launch = () => {
    if (launched || gameOver || won) return;
    setLaunched(true);
    soundSynth.playPop();
  };

  // 生成爆炸光屑粒子
  const spawnParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1.0,
        size: 2 + Math.random() * 3,
      });
    }
  };

  // 游戏主渲染与物理循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (now: number) => {
      animFrameRef.current = requestAnimationFrame(loop);

      // 平滑移动球拍
      const paddle = paddleRef.current;
      paddle.x += (paddle.targetX - paddle.x) * 0.25;

      ctx.clearRect(0, 0, W, H);

      // 背景底板
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#0c101c');
      bgGrad.addColorStop(1, '#05070d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 绘制粒子
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // 重力微下坠
        p.alpha -= 0.035;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 绘制掉落道具
      for (let i = powerUpsRef.current.length - 1; i >= 0; i--) {
        const pup = powerUpsRef.current[i];
        pup.y += 2.5;

        // 碰撞球拍检测
        if (
          pup.y + 10 >= paddle.y &&
          pup.y - 10 <= paddle.y + paddle.h &&
          pup.x >= paddle.x &&
          pup.x <= paddle.x + paddle.w
        ) {
          soundSynth.playScore();
          // 触发道具
          if (pup.type === 'multiball') {
            // 一分为三分裂球
            const newBalls: Ball[] = [];
            ballsRef.current.forEach(b => {
              newBalls.push(
                { x: b.x, y: b.y, vx: b.vx * 0.9 + 2, vy: b.vy * 0.9, radius: b.radius },
                { x: b.x, y: b.y, vx: b.vx * 0.9 - 2, vy: b.vy * 0.9, radius: b.radius }
              );
            });
            ballsRef.current.push(...newBalls.slice(0, 6)); // 最多 8 颗球同屏
          } else if (pup.type === 'wide') {
            paddle.w = Math.min(160, paddle.w + 30);
          }
          powerUpsRef.current.splice(i, 1);
          continue;
        }

        if (pup.y > H) {
          powerUpsRef.current.splice(i, 1);
        } else {
          // 绘制胶囊道具
          ctx.save();
          ctx.shadowColor = pup.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = pup.color;
          ctx.beginPath();
          ctx.roundRect(pup.x - 16, pup.y - 8, 32, 16, 8);
          ctx.fill();

          ctx.fillStyle = '#fff';
          ctx.font = 'bold 9px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pup.label, pup.x, pup.y);
          ctx.restore();
        }
      }

      // 绘制砖块
      let aliveBricks = 0;
      for (const b of bricksRef.current) {
        if (b.durability <= 0) continue;
        aliveBricks++;

        ctx.save();
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 4);
        ctx.fill();

        // 顶部微高光
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // 双层砖块裂纹标记
        if (b.maxDurability > 1 && b.durability === 1) {
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.fillRect(b.x + 4, b.y + b.h / 2 - 1, b.w - 8, 2);
        }
        ctx.restore();
      }

      if (aliveBricks === 0 && !won) {
        setWon(true);
        soundSynth.playWin();
        onMove('win', { score });
      }

      // 绘制球拍
      ctx.save();
      ctx.shadowColor = '#4f8cff';
      ctx.shadowBlur = 12;
      const paddleGrad = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.h);
      paddleGrad.addColorStop(0, '#60a5fa');
      paddleGrad.addColorStop(1, '#2563eb');
      ctx.fillStyle = paddleGrad;
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 7);
      ctx.fill();
      ctx.restore();

      // 小球运动与碰撞
      const balls = ballsRef.current;
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];

        if (!launched) {
          // 未发射时吸附在球拍上方
          ball.x = paddle.x + paddle.w / 2;
          ball.y = paddle.y - ball.radius - 2;
        } else {
          ball.x += ball.vx;
          ball.y += ball.vy;

          // 左右墙壁反弹
          if (ball.x - ball.radius <= 0) {
            ball.x = ball.radius;
            ball.vx = Math.abs(ball.vx);
            soundSynth.playPop();
          } else if (ball.x + ball.radius >= W) {
            ball.x = W - ball.radius;
            ball.vx = -Math.abs(ball.vx);
            soundSynth.playPop();
          }

          // 顶墙反弹
          if (ball.y - ball.radius <= 0) {
            ball.y = ball.radius;
            ball.vy = Math.abs(ball.vy);
            soundSynth.playPop();
          }

          // 球拍反弹判定
          if (
            ball.vy > 0 &&
            ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.h &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.w
          ) {
            // 根据击中球拍的位置改变反弹角度
            const hitPos = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2); // -1.0 ~ 1.0
            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
            const maxAngle = (75 * Math.PI) / 180;
            const newAngle = hitPos * maxAngle;

            ball.vx = speed * Math.sin(newAngle);
            ball.vy = -Math.abs(speed * Math.cos(newAngle));
            ball.y = paddle.y - ball.radius - 1;
            soundSynth.playPop();
          }

          // 砖块碰撞检测
          for (const brick of bricksRef.current) {
            if (brick.durability <= 0) continue;

            if (
              ball.x + ball.radius >= brick.x &&
              ball.x - ball.radius <= brick.x + brick.w &&
              ball.y + ball.radius >= brick.y &&
              ball.y - ball.radius <= brick.y + brick.h
            ) {
              brick.durability--;
              ball.vy = -ball.vy; // 碰撞反弹

              soundSynth.playShatter();
              spawnParticles(brick.x + brick.w / 2, brick.y + brick.h / 2, brick.color, 12);
              setScore(s => s + 20);

              // 概率掉落道具胶囊 (20% 概率)
              if (Math.random() < 0.22) {
                const types: ('multiball' | 'wide')[] = ['multiball', 'wide'];
                const pType = types[Math.floor(Math.random() * types.length)];
                powerUpsRef.current.push({
                  x: brick.x + brick.w / 2,
                  y: brick.y + brick.h / 2,
                  type: pType,
                  color: pType === 'multiball' ? '#ff4757' : '#2ed573',
                  label: pType === 'multiball' ? '分裂球' : '加长拍',
                });
              }
              break;
            }
          }

          // 掉出底界
          if (ball.y - ball.radius > H) {
            balls.splice(i, 1);
          }
        }

        // 绘制小球与发光尾迹
        ctx.save();
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 如果所有球都掉落
      if (launched && balls.length === 0) {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          setGameOver(true);
          soundSynth.playGameOver();
        } else {
          // 重置小球在球拍上
          ballsRef.current = [{ x: paddle.x + paddle.w / 2, y: paddle.y - 9, vx: 4, vy: -5, radius: 7 }];
          setLaunched(false);
          soundSynth.playPop();
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [launched, lives, won, score, onMove]);

  // 鼠标与触控移动球拍
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const p = paddleRef.current;
    p.targetX = Math.max(0, Math.min(W - p.w, x - p.w / 2));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const p = paddleRef.current;
    p.targetX = Math.max(0, Math.min(W - p.w, x - p.w / 2));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部状态条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: W, marginBottom: 8, padding: '8px 16px', background: '#1c2230', borderRadius: 8, fontSize: 14 }}>
        <div style={{ color: '#ff4757', fontWeight: 'bold' }}>
          {'❤️ '.repeat(Math.max(0, lives))}
        </div>
        <div style={{ color: '#fff' }}>得分: <b style={{ color: '#ffd700', fontSize: 18 }}>{score}</b></div>
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
          🔄 重新开始
        </button>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: W, height: H }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={launch}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={launch}
          style={{
            display: 'block',
            cursor: 'none',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        />

        {/* 准备发射提示 */}
        {!launched && !gameOver && !won && (
          <div
            onClick={launch}
            style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              background: 'rgba(0,0,0,0.65)',
              padding: '10px 22px',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              pointerEvents: 'none',
            }}
          >
            🚀 点击屏幕发射弹珠
          </div>
        )}

        {/* 获胜通告 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#10b981', marginBottom: 8 }}>
              🏆 全量清屏 挑战成功!
            </div>
            <div style={{ fontSize: 18, marginBottom: 20 }}>最终得分: {score}</div>
            <button
              onClick={initGame}
              style={{
                padding: '10px 26px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔄 再来一局
            </button>
          </div>
        )}

        {/* 失败通告 */}
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.92)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#ff4757', marginBottom: 8 }}>
              游戏结束
            </div>
            <div style={{ fontSize: 18, color: '#aaa', marginBottom: 20 }}>最终得分: {score}</div>
            <button
              onClick={initGame}
              style={{
                padding: '10px 26px',
                borderRadius: 8,
                border: 'none',
                background: '#e91e63',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🔄 重新挑战
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 移动鼠标/触屏滑动控制球拍，击碎特殊砖块掉落「多重分裂球」与「加长拍」爽感道具</span>
      </div>
    </div>
  );
}
