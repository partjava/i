'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface Bumper {
  x: number;
  y: number;
  r: number;
  color: string;
  points: number;
  pulse: number;
}

export default function Pinball({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [launched, setLaunched] = useState(false);

  // 物理实体 Ref
  const ballRef = useRef({ x: 380, y: 480, vx: 0, vy: 0, r: 7 });
  const leftFlipperRef = useRef({ angle: 0.35, targetAngle: 0.35, isUp: false });
  const rightFlipperRef = useRef({ angle: -0.35, targetAngle: -0.35, isUp: false });
  const bumpersRef = useRef<Bumper[]>([
    { x: 150, y: 170, r: 24, color: '#f43f5e', points: 100, pulse: 0 },
    { x: 250, y: 170, r: 24, color: '#f43f5e', points: 100, pulse: 0 },
    { x: 200, y: 240, r: 28, color: '#06b6d4', points: 250, pulse: 0 },
    { x: 130, y: 310, r: 20, color: '#eab308', points: 50, pulse: 0 },
    { x: 270, y: 310, r: 20, color: '#eab308', points: 50, pulse: 0 },
  ]);
  const animFrameRef = useRef<number | null>(null);

  const W = 400;
  const H = 600;
  const GRAVITY = 0.22;

  // 重置单颗小球
  const resetBall = useCallback(() => {
    ballRef.current = { x: 375, y: 480, vx: 0, vy: 0, r: 7 };
    setLaunched(false);
  }, []);

  const initGame = useCallback(() => {
    setScore(0);
    setBallsLeft(3);
    setGameOver(false);
    resetBall();
  }, [resetBall]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // 触发弹簧发射
  const launchPlunger = () => {
    if (launched || gameOver) return;
    setLaunched(true);
    ballRef.current.vy = -14.5;
    ballRef.current.vx = -1.2;
    soundSynth.playPop();
  };

  // 左右挡板抬起/放下
  const setLeftFlipper = (up: boolean) => {
    leftFlipperRef.current.isUp = up;
    leftFlipperRef.current.targetAngle = up ? -0.45 : 0.35;
    if (up) soundSynth.playClack();
  };

  const setRightFlipper = (up: boolean) => {
    rightFlipperRef.current.isUp = up;
    rightFlipperRef.current.targetAngle = up ? 0.45 : -0.35;
    if (up) soundSynth.playClack();
  };

  // 键盘操作绑定
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyZ') setLeftFlipper(true);
      if (e.code === 'ArrowRight' || e.code === 'Slash') setRightFlipper(true);
      if (e.code === 'Space' || e.code === 'ArrowDown') launchPlunger();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyZ') setLeftFlipper(false);
      if (e.code === 'ArrowRight' || e.code === 'Slash') setRightFlipper(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [launched, gameOver]);

  // 物理渲染主循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      ctx.clearRect(0, 0, W, H);

      // 1. 赛博朋克深蓝霓虹底板
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#0a0d1a');
      bgGrad.addColorStop(1, '#05060b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // 外框与顶部弧线轨道
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // 顶部右侧弧形发射通道导轨
      ctx.arc(200, 140, 160, Math.PI, 0, false);
      ctx.stroke();

      // 右侧发射槽隔板
      ctx.beginPath();
      ctx.moveTo(355, 140);
      ctx.lineTo(355, 520);
      ctx.stroke();

      // 左右漏斗形下挡板导轨
      ctx.beginPath();
      ctx.moveTo(30, 380);
      ctx.lineTo(110, 480);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(355, 380);
      ctx.lineTo(270, 480);
      ctx.stroke();

      // 2. 绘制与碰撞高能弹射柱 (Bumpers)
      const ball = ballRef.current;
      for (const b of bumpersRef.current) {
        if (b.pulse > 0) b.pulse -= 0.05;

        // 碰撞检测
        const dx = ball.x - b.x;
        const dy = ball.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < b.r + ball.r && launched) {
          // 反弹并加速
          const nx = dx / dist;
          const ny = dy / dist;
          const speed = Math.min(11.0, Math.max(8.0, Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)));
          ball.vx = nx * speed;
          ball.vy = ny * speed;
          b.pulse = 1.0;

          setScore(s => s + b.points);
          soundSynth.playChime(Math.floor(b.points / 40));
        }

        // 绘制弹射柱 (发光呼吸波纹)
        ctx.save();
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12 + b.pulse * 15;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r + b.pulse * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`+${b.points}`, b.x, b.y);
        ctx.restore();
      }

      // 3. 左右弹板 (Flippers) 旋转动画与碰撞
      const leftF = leftFlipperRef.current;
      const rightF = rightFlipperRef.current;
      leftF.angle += (leftF.targetAngle - leftF.angle) * 0.45;
      rightF.angle += (rightF.targetAngle - rightF.angle) * 0.45;

      const fLen = 58;
      const fWidth = 10;
      const leftPivot = { x: 110, y: 480 };
      const rightPivot = { x: 270, y: 480 };

      // 绘制左弹板
      ctx.save();
      ctx.translate(leftPivot.x, leftPivot.y);
      ctx.rotate(leftF.angle);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(0, -fWidth / 2, fLen, fWidth, 5);
      ctx.fill();
      ctx.restore();

      // 绘制右弹板
      ctx.save();
      ctx.translate(rightPivot.x, rightPivot.y);
      ctx.rotate(rightF.angle);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(-fLen, -fWidth / 2, fLen, fWidth, 5);
      ctx.fill();
      ctx.restore();

      // 弹板碰撞击球
      if (launched && ball.y > 445 && ball.y < 505) {
        // 左弹板区域 (Pivot: 110, 480)
        if (ball.x >= 95 && ball.x <= 175) {
          if (leftF.isUp) {
            ball.vy = -11.5;
            ball.vx = 2.5 + Math.random() * 2.5;
            soundSynth.playPop();
          } else {
            ball.vy = -Math.abs(ball.vy) * 0.35;
            ball.vx = Math.max(1.2, ball.vx);
          }
        }
        // 右弹板区域 (Pivot: 270, 480)
        if (ball.x >= 205 && ball.x <= 285) {
          if (rightF.isUp) {
            ball.vy = -11.5;
            ball.vx = -2.5 - Math.random() * 2.5;
            soundSynth.playPop();
          } else {
            ball.vy = -Math.abs(ball.vy) * 0.35;
            ball.vx = Math.min(-1.2, ball.vx);
          }
        }
      }

      // 4. 小球物理运动与全轨道导轨碰撞
      if (launched) {
        ball.vy += GRAVITY;
        // 限制最大飞行速度，杜绝穿墙穿轨
        const vLen = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (vLen > 13.5) {
          ball.vx = (ball.vx / vLen) * 13.5;
          ball.vy = (ball.vy / vLen) * 13.5;
        }

        ball.x += ball.vx;
        ball.y += ball.vy;

        // 左右主外墙反弹
        if (ball.x - ball.r < 15) {
          ball.x = 15 + ball.r;
          ball.vx = Math.abs(ball.vx) * 0.8;
          soundSynth.playClack();
        } else if (ball.x + ball.r > 388) {
          ball.x = 388 - ball.r;
          ball.vx = -Math.abs(ball.vx) * 0.8;
          soundSynth.playClack();
        }

        // 顶部弧线导轨 (圆心 200, 140, 半径 160)
        if (ball.y < 140) {
          const cdx = ball.x - 200;
          const cdy = ball.y - 140;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist > 160 - ball.r) {
            const nx = -cdx / cdist;
            const ny = -cdy / cdist;
            const dot = ball.vx * nx + ball.vy * ny;
            if (dot < 0) {
              ball.vx = (ball.vx - 1.7 * dot * nx) * 0.85;
              ball.vy = (ball.vy - 1.7 * dot * ny) * 0.85;
              soundSynth.playClack();
            }
          }
        } else if (ball.y - ball.r < 18) {
          ball.y = 18 + ball.r;
          ball.vy = Math.abs(ball.vy) * 0.75;
          soundSynth.playClack();
        }

        // 发射槽右隔板 (x: 355, y: 140 ~ 520)
        if (ball.y > 140 && ball.y < 520) {
          if (ball.x > 355 - ball.r && ball.x < 355 + ball.r) {
            if (ball.vx > 0) {
              ball.x = 355 - ball.r;
              ball.vx = -Math.abs(ball.vx) * 0.75;
            } else {
              ball.x = 355 + ball.r;
              ball.vx = Math.abs(ball.vx) * 0.75;
            }
            soundSynth.playClack();
          }
        }

        // 左侧漏斗形滑行导轨 (30, 380) -> (110, 480)
        if (ball.x >= 28 && ball.x <= 112) {
          const railY = 380 + 1.25 * (ball.x - 30);
          if (ball.y + ball.r >= railY && ball.y < railY + 22) {
            ball.y = railY - ball.r;
            ball.vy = Math.max(2.2, ball.vy * 0.65);
            ball.vx = Math.max(2.0, ball.vx * 0.65 + 1.2);
          }
        }

        // 右侧漏斗形滑行导轨 (355, 380) -> (270, 480)
        if (ball.x >= 268 && ball.x <= 356) {
          const railY = 480 - 1.176 * (ball.x - 270);
          if (ball.y + ball.r >= railY && ball.y < railY + 22) {
            ball.y = railY - ball.r;
            ball.vy = Math.max(2.2, ball.vy * 0.65);
            ball.vx = Math.min(-2.0, ball.vx * 0.65 - 1.2);
          }
        }

        // 掉入底槽
        if (ball.y > H + 20) {
          const nextBalls = ballsLeft - 1;
          setBallsLeft(nextBalls);
          if (nextBalls <= 0) {
            setGameOver(true);
            soundSynth.playGameOver();
            onMove('loss', { score });
          } else {
            resetBall();
            soundSynth.playGameOver();
          }
        }
      }

      // 绘制金属光泽弹球
      ctx.save();
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      const ballGrad = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 1, ball.x, ball.y, ball.r);
      ballGrad.addColorStop(0, '#ffffff');
      ballGrad.addColorStop(0.7, '#cbd5e1');
      ballGrad.addColorStop(1, '#64748b');
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [launched, ballsLeft, score, onMove, resetBall]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部计分板 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: W, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 14 }}>
        <div style={{ color: '#ff4757' }}>
          {'⚪ '.repeat(Math.max(0, ballsLeft))}
        </div>
        <div style={{ color: '#fff' }}>得分: <b style={{ color: '#38bdf8', fontSize: 20 }}>{score}</b></div>
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
          style={{
            display: 'block',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}
        />

        {/* 发射拉簧按钮 (未发射状态常驻) */}
        {!launched && !gameOver && (
          <button
            onClick={launchPlunger}
            style={{
              position: 'absolute',
              bottom: 24,
              right: 14,
              padding: '12px 18px',
              borderRadius: 24,
              border: 'none',
              background: '#f43f5e',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244,63,94,0.5)',
            }}
          >
            🚀 发射弹簧 (空格)
          </button>
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
            <div style={{ fontSize: 36, fontWeight: 'bold', color: '#ff4757', marginBottom: 6 }}>
              游戏结束
            </div>
            <div style={{ fontSize: 18, color: '#38bdf8', marginBottom: 20 }}>最终得分: {score}</div>
            <button
              onClick={initGame}
              style={{
                padding: '10px 28px',
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
      </div>

      {/* 底部触控左右挡板大按钮 (移动端极爽) */}
      <div style={{ display: 'flex', gap: 12, marginTop: 10, width: W }}>
        <button
          onMouseDown={() => setLeftFlipper(true)}
          onMouseUp={() => setLeftFlipper(false)}
          onTouchStart={() => setLeftFlipper(true)}
          onTouchEnd={() => setLeftFlipper(false)}
          style={{
            flex: 1,
            height: 50,
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 'bold',
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ⬅️ 左挡板 (Z / ←)
        </button>
        <button
          onMouseDown={() => setRightFlipper(true)}
          onMouseUp={() => setRightFlipper(false)}
          onTouchStart={() => setRightFlipper(true)}
          onTouchEnd={() => setRightFlipper(false)}
          style={{
            flex: 1,
            height: 50,
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 'bold',
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          ➡️ 右挡板 (/ / →)
        </button>
      </div>
    </div>
  );
}
