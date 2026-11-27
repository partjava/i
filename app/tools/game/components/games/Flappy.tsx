'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface Pipe {
  x: number;
  baseTopH: number;
  topH: number;
  gap: number;
  oscAmp: number;
  oscPhase: number;
  passed: boolean;
  coinTaken: boolean;
  hasShieldOrb: boolean;
  shieldTaken: boolean;
}

interface Feather {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

interface PopupText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
}

const W = 720;
const H = 520;
const GROUND_H = 72;
const BIRD_X = 160;
const BIRD_R = 14;
const PIPE_W = 60;
const PIPE_SPACING = 235;
const GRAVITY = 0.24;
const JUMP_FORCE = -5.4;

function getMedal(sc: number): { label: string; color: string } | null {
  if (sc >= 80) return { label: '💠 白金飞翼', color: '#67e8f9' };
  if (sc >= 50) return { label: '🥇 金牌飞翼', color: '#fde047' };
  if (sc >= 25) return { label: '🥈 银牌飞翼', color: '#e2e8f0' };
  if (sc >= 10) return { label: '🥉 铜牌飞翼', color: '#fdba74' };
  return null;
}

export default function Flappy({
  onMove,
}: {
  state?: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasShield, setHasShield] = useState(true);

  const rtRef = useRef({
    birdY: 230,
    birdVy: 0,
    birdAngle: 0,
    wingPhase: 0,
    invulnMs: 0,
    pipes: [] as Pipe[],
    feathers: [] as Feather[],
    popups: [] as PopupText[],
    clouds: [
      { x: 90, y: 74, r: 28, speed: 0.35 },
      { x: 290, y: 118, r: 36, speed: 0.5 },
      { x: 495, y: 68, r: 26, speed: 0.3 },
      { x: 650, y: 105, r: 30, speed: 0.42 },
    ],
    stars: Array.from({ length: 36 }, (_, i) => ({
      x: (i * 83 + 23) % W,
      y: (i * 41 + 17) % 240,
      phase: i * 0.7,
    })),
    groundOffset: 0,
    score: 0,
    started: false,
    gameOver: false,
    hasShield: true,
    t: 0,
  });

  const makePipe = useCallback((x: number, curScore: number): Pipe => {
    const gap = Math.max(132, 162 - Math.floor(curScore / 8) * 3);
    const maxTop = H - GROUND_H - gap - 70;
    const baseTopH = 68 + Math.random() * Math.max(40, maxTop - 68);
    const oscAmp = curScore >= 12 ? Math.min(26, 10 + Math.floor((curScore - 12) / 6) * 4) : 0;
    return {
      x,
      baseTopH,
      topH: baseTopH,
      gap,
      oscAmp,
      oscPhase: Math.random() * Math.PI * 2,
      passed: false,
      coinTaken: Math.random() > 0.72, // ~72% 概率管间含金穗币
      hasShieldOrb: Math.random() < 0.18,
      shieldTaken: false,
    };
  }, []);

  const initGame = useCallback(() => {
    const rt = rtRef.current;
    rt.birdY = 230;
    rt.birdVy = 0;
    rt.birdAngle = 0;
    rt.invulnMs = 0;
    rt.pipes = [
      makePipe(520, 0),
      makePipe(520 + PIPE_SPACING, 0),
      makePipe(520 + PIPE_SPACING * 2, 0),
    ];
    rt.feathers = [];
    rt.popups = [];
    rt.groundOffset = 0;
    rt.score = 0;
    rt.started = false;
    rt.gameOver = false;
    rt.hasShield = true;

    setScore(0);
    setStarted(false);
    setGameOver(false);
    setHasShield(true);
    try {
      const s = localStorage.getItem('partjava_flappy_best');
      if (s) setBestScore(parseInt(s, 10) || 0);
    } catch {}
    onMoveRef.current('__local_state', { score: 0, gameOver: false, won: false });
  }, [makePipe]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const jump = useCallback(() => {
    const rt = rtRef.current;
    if (rt.gameOver) {
      initGame();
      return;
    }
    if (!rt.started) {
      rt.started = true;
      setStarted(true);
    }
    rt.birdVy = JUMP_FORCE;
    rt.birdAngle = -0.46;
    rt.wingPhase = Math.PI;
    soundSynth.playPop();

    for (let i = 0; i < 3; i++) {
      rt.feathers.push({
        x: BIRD_X - 6,
        y: rt.birdY + 4,
        vx: -1.4 - Math.random() * 1.1,
        vy: 0.6 + Math.random() * 1.2,
        color: i === 0 ? '#fde68a' : '#ffffff',
        alpha: 0.95,
      });
    }
  }, [initGame]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      ) {
        return;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        if (!e.repeat) jump();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [jump]);

  // 稳定 60Hz 固定步长物理引擎（绝不随 state 变化重建循环）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const triggerDie = () => {
      const rt = rtRef.current;
      if (rt.gameOver) return;
      rt.gameOver = true;
      setGameOver(true);
      soundSynth.playGameOver();
      try {
        const prev = Number(localStorage.getItem('partjava_flappy_best') || '0');
        if (rt.score > prev) {
          localStorage.setItem('partjava_flappy_best', String(rt.score));
          setBestScore(rt.score);
        }
      } catch {}
      onMoveRef.current('__local_state', { score: rt.score, gameOver: true, won: false });
    };

    const stepPhysics = () => {
      const rt = rtRef.current;
      rt.t += 1;
      rt.wingPhase += rt.started ? 0.28 : 0.14;

      if (!rt.started) {
        rt.birdY = 230 + Math.sin(rt.t * 0.08) * 8;
        rt.birdAngle = Math.sin(rt.t * 0.08) * 0.06;
        return;
      }
      if (rt.gameOver) return;

      if (rt.invulnMs > 0) rt.invulnMs = Math.max(0, rt.invulnMs - 1000 / 60);

      for (const cloud of rt.clouds) {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.r * 2 < 0) cloud.x = W + cloud.r;
      }

      const speed = Math.min(3.35, 2.15 + Math.floor(rt.score / 10) * 0.18);
      rt.groundOffset = (rt.groundOffset + speed) % 24;

      // 小鸟重力与顶部安全边界
      rt.birdVy = Math.min(6.4, rt.birdVy + GRAVITY);
      rt.birdY += rt.birdVy;
      if (rt.birdY < 16) {
        rt.birdY = 16;
        rt.birdVy = 0;
      }
      const targetAngle = Math.max(-0.45, Math.min(0.65, rt.birdVy * 0.1));
      rt.birdAngle += (targetAngle - rt.birdAngle) * 0.14;

      const groundY = H - GROUND_H;
      if (rt.birdY + BIRD_R >= groundY) {
        rt.birdY = groundY - BIRD_R;
        triggerDie();
        return;
      }

      for (const p of rt.pipes) {
        p.x -= speed;
        if (p.oscAmp > 0) {
          p.topH = p.baseTopH + Math.sin(rt.t * 0.04 + p.oscPhase) * p.oscAmp;
        }

        if (!p.passed && p.x + PIPE_W < BIRD_X) {
          p.passed = true;
          rt.score += 1;
          setScore(rt.score);
          soundSynth.playChime(rt.score % 8);
          onMoveRef.current('__local_state', { score: rt.score, gameOver: false, won: false });
        }

        // 管间金币与护盾球拾取
        const cx = p.x + PIPE_W / 2;
        const cy = p.topH + p.gap / 2;
        if (!p.coinTaken && Math.hypot(BIRD_X - cx, rt.birdY - cy) < BIRD_R + 12) {
          p.coinTaken = true;
          rt.score += 2;
          setScore(rt.score);
          soundSynth.playScore();
          rt.popups.push({ x: cx, y: cy - 10, text: '+2 金币', color: '#fde047', alpha: 1 });
          onMoveRef.current('__local_state', { score: rt.score, gameOver: false, won: false });
        }
        if (p.hasShieldOrb && !p.shieldTaken && !rt.hasShield) {
          const sx = p.x + PIPE_W / 2;
          const sy = p.topH + p.gap * 0.28;
          if (Math.hypot(BIRD_X - sx, rt.birdY - sy) < BIRD_R + 13) {
            p.shieldTaken = true;
            rt.hasShield = true;
            setHasShield(true);
            soundSynth.playWin();
            rt.popups.push({ x: sx, y: sy - 10, text: '🛡️ 护盾充能', color: '#7dd3fc', alpha: 1 });
          }
        }

        // 碰撞检测
        const bottomY = p.topH + p.gap;
        const inPipeX = BIRD_X + BIRD_R - 2 > p.x && BIRD_X - BIRD_R + 2 < p.x + PIPE_W;
        const hitPipeY = rt.birdY - BIRD_R + 2 < p.topH || rt.birdY + BIRD_R - 2 > bottomY;

        if (inPipeX && hitPipeY && rt.invulnMs <= 0) {
          if (rt.hasShield) {
            rt.hasShield = false;
            setHasShield(false);
            rt.invulnMs = 1350;
            rt.birdVy = -3.4;
            soundSynth.playShatter();
            rt.popups.push({ x: BIRD_X, y: rt.birdY - 20, text: '护盾抵消!', color: '#38bdf8', alpha: 1 });
          } else {
            triggerDie();
            return;
          }
        }
      }

      // 回收并生成新管道
      const first = rt.pipes[0];
      if (first && first.x + PIPE_W < -20) {
        rt.pipes.shift();
        const lastX = rt.pipes[rt.pipes.length - 1]?.x ?? W;
        rt.pipes.push(makePipe(lastX + PIPE_SPACING, rt.score));
      }

      for (let i = rt.feathers.length - 1; i >= 0; i--) {
        const f = rt.feathers[i];
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.028;
        if (f.alpha <= 0) rt.feathers.splice(i, 1);
      }
      for (let i = rt.popups.length - 1; i >= 0; i--) {
        const pop = rt.popups[i];
        pop.y -= 0.7;
        pop.alpha -= 0.022;
        if (pop.alpha <= 0) rt.popups.splice(i, 1);
      }
    };

    const drawScene = () => {
      const rt = rtRef.current;
      ctx.clearRect(0, 0, W, H);

      // 每 10 分循环：晴昼(0) -> 晚霞(1) -> 星夜(2)
      const phase = Math.floor(rt.score / 10) % 3;
      const sky = ctx.createLinearGradient(0, 0, 0, H - GROUND_H);
      if (phase === 0) {
        sky.addColorStop(0, '#0284c7');
        sky.addColorStop(0.65, '#bae6fd');
        sky.addColorStop(1, '#fef3c7');
      } else if (phase === 1) {
        sky.addColorStop(0, '#312e81');
        sky.addColorStop(0.55, '#db2777');
        sky.addColorStop(1, '#fdba74');
      } else {
        sky.addColorStop(0, '#090d1f');
        sky.addColorStop(0.6, '#1e293b');
        sky.addColorStop(1, '#334155');
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      if (phase === 2) {
        for (const s of rt.stars) {
          const a = 0.35 + 0.65 * Math.abs(Math.sin(rt.t * 0.04 + s.phase));
          ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`;
          ctx.fillRect(s.x, s.y, 2, 2);
        }
      }

      // 远景流云
      ctx.fillStyle = phase === 2 ? 'rgba(148, 163, 184, 0.25)' : 'rgba(255, 255, 255, 0.75)';
      for (const c of rt.clouds) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.arc(c.x + c.r * 0.7, c.y - 9, c.r * 0.78, 0, Math.PI * 2);
        ctx.arc(c.x + c.r * 1.35, c.y, c.r * 0.58, 0, Math.PI * 2);
        ctx.fill();
      }

      // 远山剪影
      const groundY = H - GROUND_H;
      ctx.fillStyle = phase === 2 ? 'rgba(15, 23, 42, 0.75)' : phase === 1 ? 'rgba(88, 28, 135, 0.22)' : 'rgba(20, 83, 45, 0.16)';
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.quadraticCurveTo(130, groundY - 78, 260, groundY - 14);
      ctx.quadraticCurveTo(400, groundY - 96, 540, groundY - 18);
      ctx.quadraticCurveTo(640, groundY - 72, W, groundY - 16);
      ctx.lineTo(W, groundY);
      ctx.closePath();
      ctx.fill();

      // 管道 + 金币 + 护盾球
      for (const p of rt.pipes) {
        const pipeGrad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_W, 0);
        pipeGrad.addColorStop(0, '#16a34a');
        pipeGrad.addColorStop(0.28, '#86efac');
        pipeGrad.addColorStop(0.8, '#15803d');
        pipeGrad.addColorStop(1, '#14532d');

        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, 0, PIPE_W, p.topH);
        ctx.fillRect(p.x - 4, p.topH - 22, PIPE_W + 8, 22);
        ctx.strokeStyle = '#052e16';
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x - 4, p.topH - 22, PIPE_W + 8, 22);

        const bottomY = p.topH + p.gap;
        ctx.fillStyle = pipeGrad;
        ctx.fillRect(p.x, bottomY, PIPE_W, groundY - bottomY);
        ctx.fillRect(p.x - 4, bottomY, PIPE_W + 8, 22);
        ctx.strokeRect(p.x - 4, bottomY, PIPE_W + 8, 22);

        if (!p.coinTaken) {
          const cx = p.x + PIPE_W / 2;
          const cy = p.topH + p.gap / 2;
          ctx.save();
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.ellipse(cx, cy, 8 * Math.abs(Math.cos(rt.t * 0.08)) + 3, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        if (p.hasShieldOrb && !p.shieldTaken && !rt.hasShield) {
          const sx = p.x + PIPE_W / 2;
          const sy = p.topH + p.gap * 0.28;
          ctx.save();
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(sx, sy, 10, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.fill();
          ctx.restore();
        }
      }

      // 羽毛
      for (const f of rt.feathers) {
        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.ellipse(f.x, f.y, 5, 2.2, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 滚动草地地面
      const gGrad = ctx.createLinearGradient(0, groundY, 0, H);
      gGrad.addColorStop(0, '#84cc16');
      gGrad.addColorStop(0.18, '#65a30d');
      gGrad.addColorStop(1, '#713f12');
      ctx.fillStyle = gGrad;
      ctx.fillRect(0, groundY, W, GROUND_H);

      ctx.strokeStyle = '#3f6212';
      ctx.lineWidth = 3;
      for (let x = -rt.groundOffset; x < W; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 12, groundY + 13);
        ctx.stroke();
      }

      // 小鸟（护盾闪烁）
      const blinkSkip = rt.invulnMs > 0 && Math.floor(rt.invulnMs / 90) % 2 === 1;
      if (!blinkSkip) {
        ctx.save();
        ctx.translate(BIRD_X, rt.birdY);
        ctx.rotate(rt.birdAngle);

        if (rt.hasShield) {
          ctx.save();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.4;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(0, 0, 23, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(0, 0, 17, 13.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 扑动翅膀
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(-5, 2 + Math.sin(rt.wingPhase) * 3, 9, 5.5, 0.25, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(8, -4, 5.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(10, -4, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(11, -5, 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.moveTo(14, -2);
        ctx.lineTo(23, 2);
        ctx.lineTo(14, 6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 飘字
      for (const pop of rt.popups) {
        ctx.save();
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = pop.color;
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }
    };

    let prev = performance.now();
    let acc = 0;
    let rafId = 0;
    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (document.hidden) {
        prev = now;
        acc = 0;
        return;
      }
      acc += Math.min(66.67, now - prev);
      prev = now;
      while (acc >= 1000 / 60) {
        stepPhysics();
        acc -= 1000 / 60;
      }
      drawScene();
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [makePipe]);

  const medal = getMedal(score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', maxWidth: '100%' }}>
      {/* 状态条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: `min(100%, ${W}px)`, marginBottom: 8, padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 13 }}>
        <div style={{ color: '#e2e8f0' }}>
          得分 <b data-flappy-score style={{ color: '#fbe296', fontSize: 18, fontFamily: 'monospace' }}>{score}</b>
          {bestScore > 0 && <span style={{ marginLeft: 8, fontSize: 11, color: '#94a3b8' }}>最高 {bestScore}</span>}
        </div>
        <div style={{ color: hasShield ? '#7dd3fc' : '#f87171', fontSize: 12, fontWeight: 600 }}>
          {hasShield ? '🛡️ 护盾待命' : '⚠️ 护盾耗尽'}
        </div>
        <button
          type="button"
          onClick={initGame}
          style={{
            padding: '4px 11px',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.16)',
            cursor: 'pointer',
            background: 'rgba(30,41,59,0.9)',
            color: '#f8fafc',
          }}
        >
          重来
        </button>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: `min(100%, ${W}px, calc(66vh * ${W} / ${H}))` }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onPointerDown={(e) => {
            e.preventDefault();
            jump();
          }}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            cursor: 'pointer',
            borderRadius: 14,
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            touchAction: 'none',
          }}
        />

        {!started && !gameOver && (
          <div
            style={{
              position: 'absolute',
              top: '58%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              background: 'rgba(15, 23, 42, 0.78)',
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid rgba(212, 173, 114, 0.5)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            点击画布 / 空格起飞
          </div>
        )}

        {gameOver && (
          <div
            data-flappy-gameover
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 12, 22, 0.88)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              gap: 6,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800, color: '#fb7185' }}>飞行结束</div>
            {medal && <div style={{ fontSize: 14, color: medal.color, fontWeight: 700 }}>{medal.label}</div>}
            <div style={{ fontSize: 15, color: '#cbd5e1', marginBottom: 12 }}>
              本次得分 <b style={{ color: '#fbe296' }}>{score}</b> · 最高记录 <b style={{ color: '#38bdf8' }}>{Math.max(bestScore, score)}</b>
            </div>
            <button
              type="button"
              onClick={initGame}
              style={{
                padding: '9px 24px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #e5bf7d, #c8984c)',
                color: '#14120e',
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              🔄 再飞一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
