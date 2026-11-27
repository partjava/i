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

interface DropTarget {
  x: number;
  y: number;
  w: number;
  h: number;
  hit: boolean;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

interface Popup {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
}

const W = 400;
const H = 620;
const SUBSTEPS = 4;
const GRAVITY = 0.21;
const DOME_CX = 200;
const DOME_CY = 150;
const DOME_R = 184; // 左侧 x=16, 右侧 x=384, 完全严丝合缝！
const WALL_L = 16;
const WALL_R = 384;
const CHUTE_X = 348;

const LEFT_PIVOT = { x: 112, y: 496 };
const RIGHT_PIVOT = { x: 252, y: 496 };
const FLIPPER_LEN = 58;
const FLIPPER_RADIUS = 6;

const RAIL_LEFT = { x1: WALL_L, y1: 405, x2: LEFT_PIVOT.x, y2: LEFT_PIVOT.y };
const RAIL_RIGHT = { x1: CHUTE_X, y1: 405, x2: RIGHT_PIVOT.x, y2: RIGHT_PIVOT.y };
const SLING_LEFT = { x1: 44, y1: 356, x2: 96, y2: 432 };
const SLING_RIGHT = { x1: 320, y1: 356, x2: 268, y2: 432 };

export default function Pinball({
  onMove,
}: {
  state?: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const [score, setScore] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(3);
  const [multiplier, setMultiplier] = useState(1);
  const [ballSaveSec, setBallSaveSec] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [charging, setCharging] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const rtRef = useRef({
    score: 0,
    ballsLeft: 3,
    multiplier: 1,
    ballSaveUntil: 0,
    launched: false,
    charging: false,
    charge: 0,
    gameOver: false,
    ball: { x: 366, y: 500, vx: 0, vy: 0, r: 7 },
    trail: [] as { x: number; y: number }[],
    leftFlipper: { angle: 0.36, prevAngle: 0.36, targetAngle: 0.36, isUp: false },
    rightFlipper: { angle: -0.36, prevAngle: -0.36, targetAngle: -0.36, isUp: false },
    lanes: [false, false, false] as boolean[], // H, E, W 顶部三连通道
    targets: [
      { x: 24, y: 230, w: 8, h: 28, hit: false },
      { x: 24, y: 268, w: 8, h: 28, hit: false },
      { x: 24, y: 306, w: 8, h: 28, hit: false },
    ] as DropTarget[],
    bumpers: [
      { x: 142, y: 185, r: 22, color: '#fb7185', points: 100, pulse: 0 },
      { x: 226, y: 185, r: 22, color: '#fb7185', points: 100, pulse: 0 },
      { x: 184, y: 252, r: 26, color: '#38bdf8', points: 250, pulse: 0 },
      { x: 112, y: 298, r: 19, color: '#fbbf24', points: 75, pulse: 0 },
      { x: 256, y: 298, r: 19, color: '#fbbf24', points: 75, pulse: 0 },
    ] as Bumper[],
    sparks: [] as Spark[],
    popups: [] as Popup[],
    slingFlashL: 0,
    slingFlashR: 0,
  });

  const resetBallToChute = useCallback((activateSave = true) => {
    const rt = rtRef.current;
    rt.ball = { x: 366, y: 505, vx: 0, vy: 0, r: 7 };
    rt.trail = [];
    rt.launched = false;
    rt.charging = false;
    rt.charge = 0;
    if (activateSave) {
      rt.ballSaveUntil = performance.now() + 8000;
    }
    setLaunched(false);
    setCharging(false);
  }, []);

  const initGame = useCallback(() => {
    const rt = rtRef.current;
    rt.score = 0;
    rt.ballsLeft = 3;
    rt.multiplier = 1;
    rt.gameOver = false;
    rt.lanes = [false, false, false];
    rt.targets.forEach(t => { t.hit = false; });
    rt.bumpers.forEach(b => { b.pulse = 0; });
    rt.sparks = [];
    rt.popups = [];
    rt.leftFlipper = { angle: 0.36, prevAngle: 0.36, targetAngle: 0.36, isUp: false };
    rt.rightFlipper = { angle: -0.36, prevAngle: -0.36, targetAngle: -0.36, isUp: false };
    setScore(0);
    setBallsLeft(3);
    setMultiplier(1);
    setGameOver(false);
    resetBallToChute(false);
    onMoveRef.current('__local_state', { score: 0, gameOver: false, won: false });
  }, [resetBallToChute]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const startCharge = useCallback(() => {
    const rt = rtRef.current;
    if (rt.launched || rt.gameOver || rt.charging) return;
    rt.charging = true;
    rt.charge = 0.25;
    setCharging(true);
  }, []);

  const releaseCharge = useCallback(() => {
    const rt = rtRef.current;
    if (!rt.charging || rt.launched || rt.gameOver) return;
    const power = Math.max(0.68, Math.min(1.0, rt.charge));
    rt.charging = false;
    rt.charge = 0;
    rt.launched = true;
    rt.ball.vy = -(13.8 + power * 4.4);
    rt.ball.vx = -0.35;
    rt.ballSaveUntil = performance.now() + 9000;
    setCharging(false);
    setLaunched(true);
    soundSynth.playPop();
  }, []);

  const setLeftFlipper = (up: boolean) => {
    const lf = rtRef.current.leftFlipper;
    if (up && !lf.isUp) soundSynth.playClack();
    lf.isUp = up;
    lf.targetAngle = up ? -0.46 : 0.36;
  };

  const setRightFlipper = (up: boolean) => {
    const rf = rtRef.current.rightFlipper;
    if (up && !rf.isUp) soundSynth.playClack();
    rf.isUp = up;
    rf.targetAngle = up ? 0.46 : -0.36;
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      ) {
        return;
      }
      if (['ArrowLeft', 'ArrowRight', 'KeyZ', 'Slash', 'Space', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.repeat) return;
      if (e.code === 'ArrowLeft' || e.code === 'KeyZ') setLeftFlipper(true);
      if (e.code === 'ArrowRight' || e.code === 'Slash') setRightFlipper(true);
      if (e.code === 'Space' || e.code === 'ArrowDown') startCharge();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyZ') setLeftFlipper(false);
      if (e.code === 'ArrowRight' || e.code === 'Slash') setRightFlipper(false);
      if (e.code === 'Space' || e.code === 'ArrowDown') releaseCharge();
    };

    const releaseAll = () => {
      setLeftFlipper(false);
      setRightFlipper(false);
      if (rtRef.current.charging) releaseCharge();
    };
    window.addEventListener('blur', releaseAll);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      releaseAll();
      window.removeEventListener('blur', releaseAll);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [startCharge, releaseCharge]);

  // 60Hz × 4 Substep 物理引擎 + 街机光效渲染
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const addPoints = (pts: number, px: number, py: number, color = '#fbe296', customLabel?: string) => {
      const rt = rtRef.current;
      const total = pts * rt.multiplier;
      rt.score += total;
      setScore(rt.score);
      rt.popups.push({
        x: px,
        y: py,
        text: customLabel || `+${total}`,
        color,
        alpha: 1,
      });
      onMoveRef.current('__local_state', { score: rt.score, gameOver: false, won: false });
    };

    const spawnSparks = (x: number, y: number, color: string, count = 8) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1.5 + Math.random() * 3.0;
        rtRef.current.sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, color, alpha: 1 });
      }
    };

    const collideSegment = (
      x1: number, y1: number, x2: number, y2: number,
      restitution = 0.72, kickSpeed = 0
    ): boolean => {
      const ball = rtRef.current.ball;
      const sx = x2 - x1;
      const sy = y2 - y1;
      const len2 = sx * sx + sy * sy;
      if (len2 <= 0) return false;
      const t = Math.max(0, Math.min(1, ((ball.x - x1) * sx + (ball.y - y1) * sy) / len2));
      const cx = x1 + sx * t;
      const cy = y1 + sy * t;
      const dx = ball.x - cx;
      const dy = ball.y - cy;
      const dist = Math.hypot(dx, dy);
      const minDist = ball.r + 3.5;
      if (dist >= minDist) return false;

      const nx = dist > 0.0001 ? dx / dist : 0;
      const ny = dist > 0.0001 ? dy / dist : -1;
      ball.x = cx + nx * (minDist + 0.05);
      ball.y = cy + ny * (minDist + 0.05);
      const dot = ball.vx * nx + ball.vy * ny;
      if (dot < 0) {
        ball.vx -= (1 + restitution) * dot * nx;
        ball.vy -= (1 + restitution) * dot * ny;
      }
      if (kickSpeed > 0) {
        ball.vx += nx * kickSpeed;
        ball.vy += ny * kickSpeed;
      }
      return true;
    };

    const collideFlipper = (
      pivot: { x: number; y: number },
      angle: number,
      prevAngle: number,
      side: 1 | -1
    ): boolean => {
      const ball = rtRef.current.ball;
      const x1 = pivot.x;
      const y1 = pivot.y;
      const x2 = x1 + side * Math.cos(side === 1 ? angle : -angle) * FLIPPER_LEN;
      const y2 = y1 + Math.sin(side === 1 ? angle : -angle) * FLIPPER_LEN;
      const sx = x2 - x1;
      const sy = y2 - y1;
      const len2 = sx * sx + sy * sy;
      const t = Math.max(0, Math.min(1, ((ball.x - x1) * sx + (ball.y - y1) * sy) / len2));
      const cx = x1 + sx * t;
      const cy = y1 + sy * t;
      const dx = ball.x - cx;
      const dy = ball.y - cy;
      const dist = Math.hypot(dx, dy);
      const minDist = ball.r + FLIPPER_RADIUS;
      if (dist >= minDist) return false;

      const nx = dist > 0.0001 ? dx / dist : 0;
      const ny = dist > 0.0001 ? dy / dist : -1;
      ball.x = cx + nx * (minDist + 0.1);
      ball.y = cy + ny * (minDist + 0.1);

      const omega = angle - prevAngle;
      const flippingUp = (side === 1 && omega < -0.04) || (side === -1 && omega > 0.04);

      if (flippingUp) {
        const tipBonus = 0.55 + 0.7 * t;
        ball.vx = side * (2.4 + 3.2 * t) + nx * 2.5;
        ball.vy = -(10.8 + 4.4 * tipBonus);
        soundSynth.playPop();
      } else {
        const dot = ball.vx * nx + ball.vy * ny;
        if (dot < 0) {
          ball.vx = (ball.vx - 1.48 * dot * nx) * 0.92;
          ball.vy = (ball.vy - 1.48 * dot * ny) * 0.92;
        }
      }
      return true;
    };

    const stepTick = (now: number) => {
      const rt = rtRef.current;

      const nextSave = rt.ballSaveUntil > now ? Math.ceil((rt.ballSaveUntil - now) / 1000) : 0;
      setBallSaveSec(prev => (prev === nextSave ? prev : nextSave));

      if (rt.charging && !rt.launched && !rt.gameOver) {
        rt.charge = Math.min(1, rt.charge + 0.018);
      }

      const lf = rt.leftFlipper;
      const rf = rt.rightFlipper;
      lf.prevAngle = lf.angle;
      rf.prevAngle = rf.angle;
      lf.angle += (lf.targetAngle - lf.angle) * 0.48;
      rf.angle += (rf.targetAngle - rf.angle) * 0.48;

      if (rt.slingFlashL > 0) rt.slingFlashL -= 0.08;
      if (rt.slingFlashR > 0) rt.slingFlashR -= 0.08;
      for (const b of rt.bumpers) {
        if (b.pulse > 0) b.pulse = Math.max(0, b.pulse - 0.06);
      }
      for (let i = rt.sparks.length - 1; i >= 0; i--) {
        const s = rt.sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.04;
        if (s.alpha <= 0) rt.sparks.splice(i, 1);
      }
      for (let i = rt.popups.length - 1; i >= 0; i--) {
        const p = rt.popups[i];
        p.y -= 0.65;
        p.alpha -= 0.024;
        if (p.alpha <= 0) rt.popups.splice(i, 1);
      }

      if (!rt.launched || rt.gameOver) return;

      const ball = rt.ball;
      rt.trail.unshift({ x: ball.x, y: ball.y });
      if (rt.trail.length > 10) rt.trail.pop();

      const subDt = 1 / SUBSTEPS;
      let hitBumperFrame = false;

      for (let s = 0; s < SUBSTEPS; s++) {
        ball.vy += GRAVITY * subDt;
        const speed = Math.hypot(ball.vx, ball.vy);
        if (speed > 15.5) {
          ball.vx = (ball.vx / speed) * 15.5;
          ball.vy = (ball.vy / speed) * 15.5;
        }
        ball.x += ball.vx * subDt;
        ball.y += ball.vy * subDt;

        // 严密外墙 (y >= DOME_CY)
        if (ball.y >= DOME_CY) {
          if (ball.x - ball.r < WALL_L) {
            ball.x = WALL_L + ball.r;
            ball.vx = Math.abs(ball.vx) * 0.78;
          } else if (ball.x + ball.r > WALL_R) {
            ball.x = WALL_R - ball.r;
            ball.vx = -Math.abs(ball.vx) * 0.78;
          }
        }

        // 严密顶部大拱顶 (圆心 200,150, 半径 184)
        if (ball.y < DOME_CY) {
          const cdx = ball.x - DOME_CX;
          const cdy = ball.y - DOME_CY;
          const cdist = Math.hypot(cdx, cdy);
          if (cdist > DOME_R - ball.r) {
            const nx = -cdx / cdist;
            const ny = -cdy / cdist;
            ball.x = DOME_CX - nx * (DOME_R - ball.r);
            ball.y = DOME_CY - ny * (DOME_R - ball.r);
            const dot = ball.vx * nx + ball.vy * ny;
            if (dot < 0) {
              ball.vx = (ball.vx - 1.82 * dot * nx) * 0.92;
              ball.vy = (ball.vy - 1.82 * dot * ny) * 0.92;
            }
          }
        }

        // 发射槽隔板 (x = 348, y = 150..595)
        if (ball.y >= DOME_CY && ball.y <= 595) {
          if (ball.x > CHUTE_X - ball.r && ball.x < CHUTE_X + ball.r) {
            if (ball.x < CHUTE_X || ball.vx > 0) {
              ball.x = CHUTE_X - ball.r;
              ball.vx = -Math.abs(ball.vx) * 0.76;
            } else {
              ball.x = CHUTE_X + ball.r;
              ball.vx = Math.abs(ball.vx) * 0.76;
            }
          }
        }

        // 单向防回流门 (x = 348, y = 70..150)：允许左出，阻挡右回
        if (ball.y >= 70 && ball.y < DOME_CY && ball.vx > 0 && ball.x < CHUTE_X && ball.x + ball.r >= CHUTE_X) {
          ball.x = CHUTE_X - ball.r - 0.5;
          ball.vx = -Math.abs(ball.vx) * 0.75;
        }

        // 左右漏斗导轨 + 弹性三角撞块 (Slingshots)
        collideSegment(RAIL_LEFT.x1, RAIL_LEFT.y1, RAIL_LEFT.x2, RAIL_LEFT.y2, 0.55);
        collideSegment(RAIL_RIGHT.x1, RAIL_RIGHT.y1, RAIL_RIGHT.x2, RAIL_RIGHT.y2, 0.55);

        if (collideSegment(SLING_LEFT.x1, SLING_LEFT.y1, SLING_LEFT.x2, SLING_LEFT.y2, 0.9, 3.8)) {
          rt.slingFlashL = 1;
          addPoints(50, 72, 385, '#38bdf8');
          soundSynth.playClack();
        }
        if (collideSegment(SLING_RIGHT.x1, SLING_RIGHT.y1, SLING_RIGHT.x2, SLING_RIGHT.y2, 0.9, 3.8)) {
          rt.slingFlashR = 1;
          addPoints(50, 290, 385, '#38bdf8');
          soundSynth.playClack();
        }

        // 左右弹板
        collideFlipper(LEFT_PIVOT, lf.angle, lf.prevAngle, 1);
        collideFlipper(RIGHT_PIVOT, rf.angle, rf.prevAngle, -1);

        // 5 颗高能缓冲核
        for (const b of rt.bumpers) {
          const dx = ball.x - b.x;
          const dy = ball.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < b.r + ball.r) {
            const nx = dist > 0.001 ? dx / dist : 0;
            const ny = dist > 0.001 ? dy / dist : -1;
            ball.x = b.x + nx * (b.r + ball.r + 0.15);
            ball.y = b.y + ny * (b.r + ball.r + 0.15);
            const bounceSp = Math.min(12.2, Math.max(8.5, Math.hypot(ball.vx, ball.vy)));
            ball.vx = nx * bounceSp;
            ball.vy = ny * bounceSp;
            b.pulse = 1;
            if (!hitBumperFrame) {
              hitBumperFrame = true;
              addPoints(b.points, b.x, b.y - b.r, b.color);
              spawnSparks(b.x + nx * b.r, b.y + ny * b.r, b.color, 9);
              soundSynth.playChime(Math.floor(b.points / 50));
            }
          }
        }

        // 左侧三枚落靶
        for (const tg of rt.targets) {
          if (tg.hit) continue;
          if (
            ball.x + ball.r >= tg.x &&
            ball.x - ball.r <= tg.x + tg.w &&
            ball.y + ball.r >= tg.y &&
            ball.y - ball.r <= tg.y + tg.h
          ) {
            tg.hit = true;
            ball.vx = Math.abs(ball.vx) * 0.8 + 1.5;
            addPoints(150, tg.x + 28, tg.y + 14, '#4ade80');
            spawnSparks(tg.x + 6, tg.y + 14, '#4ade80', 8);
            soundSynth.playScore();
            if (rt.targets.every(item => item.hit)) {
              rt.targets.forEach(item => { item.hit = false; });
              rt.ballSaveUntil = now + 10000;
              addPoints(500, 140, 280, '#fde047', '全靶达成! 护盾+10s');
              soundSynth.playWin();
            }
          }
        }

        // 顶部 H · E · W 三通道倍率点亮
        if (ball.y > 76 && ball.y < 112) {
          const laneXs = [132, 184, 236];
          laneXs.forEach((lx, idx) => {
            if (Math.abs(ball.x - lx) < 16 && !rt.lanes[idx]) {
              rt.lanes[idx] = true;
              addPoints(80, lx, 88, '#7dd3fc');
              soundSynth.playMove();
              if (rt.lanes.every(Boolean)) {
                rt.lanes = [false, false, false];
                rt.multiplier = Math.min(5, rt.multiplier + 1);
                setMultiplier(rt.multiplier);
                addPoints(300, 184, 108, '#fbe296', `${rt.multiplier}× 倍率开启!`);
                soundSynth.playWin();
              }
            }
          });
        }
      }

      // 落底判定（支持护球盾自动免费回弹发球槽）
      if (ball.y > H + 18) {
        if (rt.ballSaveUntil > now) {
          soundSynth.playWin();
          rt.popups.push({ x: 184, y: 460, text: '🛡️ 护球盾救回!', color: '#7dd3fc', alpha: 1 });
          resetBallToChute(false);
          return;
        }
        const nextBalls = rt.ballsLeft - 1;
        rt.ballsLeft = nextBalls;
        setBallsLeft(nextBalls);
        soundSynth.playGameOver();
        if (nextBalls <= 0) {
          rt.gameOver = true;
          rt.launched = false;
          setGameOver(true);
          setLaunched(false);
          onMoveRef.current('__local_state', { score: rt.score, gameOver: true, won: false });
        } else {
          resetBallToChute(true);
        }
      }
    };

    const drawTable = (now: number) => {
      const rt = rtRef.current;
      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0a1020');
      bg.addColorStop(1, '#05070e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 外壳拱顶 + 发球隔板 + 漏斗导轨
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(DOME_CX, DOME_CY, DOME_R, Math.PI, 0, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(WALL_L, DOME_CY);
      ctx.lineTo(WALL_L, H - 18);
      ctx.moveTo(WALL_R, DOME_CY);
      ctx.lineTo(WALL_R, 595);
      ctx.moveTo(CHUTE_X, DOME_CY);
      ctx.lineTo(CHUTE_X, 595);
      ctx.stroke();

      // 单向门指示虚线
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(212, 173, 114, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(CHUTE_X, 62);
      ctx.lineTo(CHUTE_X, DOME_CY);
      ctx.stroke();
      ctx.restore();

      // 左右导轨
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(RAIL_LEFT.x1, RAIL_LEFT.y1);
      ctx.lineTo(RAIL_LEFT.x2, RAIL_LEFT.y2);
      ctx.moveTo(RAIL_RIGHT.x1, RAIL_RIGHT.y1);
      ctx.lineTo(RAIL_RIGHT.x2, RAIL_RIGHT.y2);
      ctx.stroke();

      // Slingshot 弹性三角块
      ctx.fillStyle = rt.slingFlashL > 0 ? '#38bdf8' : 'rgba(56, 189, 248, 0.2)';
      ctx.strokeStyle = '#7dd3fc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(44, 356);
      ctx.lineTo(96, 432);
      ctx.lineTo(44, 412);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = rt.slingFlashR > 0 ? '#38bdf8' : 'rgba(56, 189, 248, 0.2)';
      ctx.beginPath();
      ctx.moveTo(320, 356);
      ctx.lineTo(268, 432);
      ctx.lineTo(320, 412);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 顶部 H · E · W 倍率指示灯
      const laneLabels = ['H', 'E', 'W'];
      [132, 184, 236].forEach((lx, idx) => {
        const lit = rt.lanes[idx];
        ctx.fillStyle = lit ? '#fbe296' : 'rgba(255,255,255,0.12)';
        ctx.beginPath();
        ctx.arc(lx, 90, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = lit ? '#0f172a' : '#94a3b8';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(laneLabels[idx], lx, 90);
      });

      // 左侧靶位
      for (const tg of rt.targets) {
        ctx.fillStyle = tg.hit ? 'rgba(74, 222, 128, 0.15)' : '#4ade80';
        ctx.beginPath();
        ctx.roundRect(tg.x, tg.y, tg.w, tg.h, 3);
        ctx.fill();
      }

      // 护球盾指示环（挡板之间）
      if (rt.ballSaveUntil > now) {
        const blink = 0.45 + 0.55 * Math.sin(now * 0.015);
        ctx.save();
        ctx.strokeStyle = `rgba(56, 189, 248, ${blink.toFixed(2)})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(182, 545, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#7dd3fc';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SAVE', 182, 546);
        ctx.restore();
      }

      // 缓冲核
      for (const b of rt.bumpers) {
        ctx.save();
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 12 + b.pulse * 16;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r + b.pulse * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`+${b.points}`, b.x, b.y);
        ctx.restore();
      }

      // 左右弹板
      ctx.save();
      ctx.translate(LEFT_PIVOT.x, LEFT_PIVOT.y);
      ctx.rotate(rt.leftFlipper.angle);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(-FLIPPER_RADIUS, -FLIPPER_RADIUS, FLIPPER_LEN + FLIPPER_RADIUS * 2, FLIPPER_RADIUS * 2, FLIPPER_RADIUS);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(RIGHT_PIVOT.x, RIGHT_PIVOT.y);
      ctx.rotate(rt.rightFlipper.angle);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(-FLIPPER_LEN - FLIPPER_RADIUS, -FLIPPER_RADIUS, FLIPPER_LEN + FLIPPER_RADIUS * 2, FLIPPER_RADIUS * 2, FLIPPER_RADIUS);
      ctx.fill();
      ctx.restore();

      // 可视拉簧柱（随 charge 下压变色）
      const pullPx = rt.charge * 38;
      const springTop = 514 + pullPx;
      ctx.strokeStyle = rt.charging ? '#fb7185' : '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const yy = springTop + ((594 - springTop) * i) / 5;
        ctx.lineTo(i % 2 === 0 ? 358 : 374, yy);
      }
      ctx.stroke();
      ctx.fillStyle = rt.charging ? '#f43f5e' : '#d4ad72';
      ctx.fillRect(354, springTop - 6, 24, 6);

      // 弹球拖尾与金属弹球
      for (let i = rt.trail.length - 1; i >= 0; i--) {
        const tp = rt.trail[i];
        ctx.fillStyle = `rgba(125, 211, 252, ${((1 - i / rt.trail.length) * 0.35).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, Math.max(2, rt.ball.r * (1 - i * 0.08)), 0, Math.PI * 2);
        ctx.fill();
      }
      const bYDraw = rt.launched ? rt.ball.y : springTop - rt.ball.r - 6;
      const bXDraw = rt.ball.x;
      ctx.save();
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      const bGrad = ctx.createRadialGradient(bXDraw - 2, bYDraw - 2, 1, bXDraw, bYDraw, rt.ball.r);
      bGrad.addColorStop(0, '#ffffff');
      bGrad.addColorStop(0.65, '#cbd5e1');
      bGrad.addColorStop(1, '#475569');
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(bXDraw, bYDraw, rt.ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 火花与飘字
      for (const s of rt.sparks) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      for (const pop of rt.popups) {
        ctx.save();
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = pop.color;
        ctx.font = 'bold 12px monospace';
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
        stepTick(now);
        acc -= 1000 / 60;
      }
      drawTable(now);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [resetBallToChute]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'min(100%, 480px)', userSelect: 'none' }}>
      {/* 状态条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{'⚪'.repeat(Math.max(0, ballsLeft))}</span>
          <span style={{ padding: '1px 7px', borderRadius: 999, background: 'rgba(212,173,114,0.2)', color: '#fbe296', fontSize: 11, fontWeight: 700 }}>
            ×{multiplier} 倍
          </span>
          {ballSaveSec > 0 && (
            <span style={{ color: '#7dd3fc', fontSize: 11, fontWeight: 600 }}>🛡️ {ballSaveSec}s</span>
          )}
        </div>
        <div style={{ color: '#e2e8f0' }}>
          得分 <b data-pinball-score style={{ color: '#fbe296', fontSize: 18, fontFamily: 'monospace' }}>{score}</b>
        </div>
        <button
          type="button"
          onClick={initGame}
          style={{
            padding: '4px 10px',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(30,41,59,0.9)',
            color: '#f8fafc',
            cursor: 'pointer',
          }}
        >
          重开
        </button>
      </div>

      {/* 球台画布 */}
      <div style={{ position: 'relative', width: `min(100%, 460px, calc(66vh * ${W} / ${H}))` }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            borderRadius: 14,
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            touchAction: 'none',
          }}
        />

        {!launched && !gameOver && (
          <button
            type="button"
            data-pinball-launch
            onPointerDown={(e) => {
              e.preventDefault();
              startCharge();
            }}
            onPointerUp={releaseCharge}
            onPointerLeave={() => {
              if (rtRef.current.charging) releaseCharge();
            }}
            onClick={() => {
              if (!rtRef.current.launched) {
                startCharge();
                releaseCharge();
              }
            }}
            style={{
              position: 'absolute',
              bottom: 22,
              right: 54,
              padding: '10px 16px',
              borderRadius: 999,
              border: '1px solid rgba(251, 113, 133, 0.7)',
              background: charging ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'linear-gradient(135deg, #f43f5e, #e11d48)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(244,63,94,0.45)',
              touchAction: 'none',
            }}
          >
            {charging ? '⚡ 松开发射！' : '🚀 按住蓄力发射 (空格)'}
          </button>
        )}

        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 12, 22, 0.9)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              gap: 8,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800, color: '#fb7185' }}>弹珠耗尽</div>
            <div style={{ fontSize: 16, color: '#cbd5e1' }}>
              最终得分 <b style={{ color: '#fbe296', fontSize: 20 }}>{score}</b>
            </div>
            <button
              type="button"
              onClick={initGame}
              style={{
                marginTop: 10,
                padding: '9px 24px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #e5bf7d, #c8984c)',
                color: '#14120e',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              🔄 再来一局
            </button>
          </div>
        )}
      </div>

      {/* 左右挡板按键 */}
      <div style={{ display: 'flex', gap: 12, marginTop: 10, width: '100%' }}>
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            setLeftFlipper(true);
          }}
          onPointerUp={() => setLeftFlipper(false)}
          onPointerCancel={() => setLeftFlipper(false)}
          onLostPointerCapture={() => setLeftFlipper(false)}
          style={{
            flex: 1,
            height: 46,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
            color: '#fff',
            cursor: 'pointer',
            touchAction: 'none',
          }}
        >
          ⬅️ 左挡板 (Z / ←)
        </button>
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            setRightFlipper(true);
          }}
          onPointerUp={() => setRightFlipper(false)}
          onPointerCancel={() => setRightFlipper(false)}
          onLostPointerCapture={() => setRightFlipper(false)}
          style={{
            flex: 1,
            height: 46,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
            color: '#fff',
            cursor: 'pointer',
            touchAction: 'none',
          }}
        >
          ➡️ 右挡板 (/ / →)
        </button>
      </div>
    </div>
  );
}
