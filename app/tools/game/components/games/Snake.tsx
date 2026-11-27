'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

type SnakeMode = 'classic' | 'wrap' | 'obstacles';
type SpeedTier = 'chill' | 'normal' | 'turbo';
type MapPresetKey = 'compact' | 'wide' | 'mega';
type Point = { x: number; y: number };
type SpecialItem = { x: number; y: number; kind: 'gold' | 'frost'; expiresAt: number };
type Particle = { x: number; y: number; vx: number; vy: number; color: string; alpha: number; r: number };
type FloatingText = { x: number; y: number; text: string; color: string; alpha: number };

const MAP_PRESETS: Record<MapPresetKey, { label: string; cols: number; rows: number; cell: number }> = {
  compact: { label: '24×18 标准', cols: 24, rows: 18, cell: 26 }, // 624x468
  wide: { label: '30×20 大地图', cols: 30, rows: 20, cell: 24 },   // 720x480
  mega: { label: '36×24 超大', cols: 36, rows: 24, cell: 22 },    // 792x528
};

const SPEED_MS: Record<SpeedTier, number> = {
  chill: 150,
  normal: 112,
  turbo: 82,
};

function buildObstacles(cols: number, rows: number): Point[] {
  const obs: Point[] = [];
  const xL = Math.max(4, Math.floor(cols * 0.23));
  const xR = cols - 1 - xL;
  const yT = Math.max(3, Math.floor(rows * 0.22));
  const yB = rows - 1 - yT;
  const blocks: [number, number][] = [
    [xL, yT], [xL + 1, yT], [xL, yT + 1],
    [xR, yT], [xR - 1, yT], [xR, yT + 1],
    [xL, yB], [xL + 1, yB], [xL, yB - 1],
    [xR, yB], [xR - 1, yB], [xR, yB - 1],
  ];
  const midY = Math.floor(rows / 2);
  blocks.forEach(([x, y]) => {
    if (y !== midY) obs.push({ x, y });
  });
  return obs;
}

export default function Snake({
  onMove,
}: {
  state?: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const [mapKey, setMapKey] = useState<MapPresetKey>('wide');
  const [mode, setMode] = useState<SnakeMode>('classic');
  const [speedTier, setSpeedTier] = useState<SpeedTier>('normal');
  const [score, setScore] = useState(0);
  const [length, setLength] = useState(4);
  const [combo, setCombo] = useState(1);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [frostLeftMs, setFrostLeftMs] = useState(0);
  const [showDpad, setShowDpad] = useState(false);

  const preset = MAP_PRESETS[mapKey];
  const widthPx = preset.cols * preset.cell;
  const heightPx = preset.rows * preset.cell;

  const gRef = useRef({
    mapKey: 'wide' as MapPresetKey,
    cols: MAP_PRESETS.wide.cols,
    rows: MAP_PRESETS.wide.rows,
    cell: MAP_PRESETS.wide.cell,
    mode: 'classic' as SnakeMode,
    speedTier: 'normal' as SpeedTier,
    snake: [] as Point[],
    prevSnake: [] as Point[],
    dir: { x: 1, y: 0 },
    queue: [] as Point[],
    apple: { x: 18, y: 10 },
    special: null as SpecialItem | null,
    obstacles: [] as Point[],
    particles: [] as Particle[],
    popups: [] as FloatingText[],
    score: 0,
    combo: 1,
    lastEatAt: 0,
    frostUntil: 0,
    paused: false,
    gameOver: false,
    lastTick: 0,
    tickProgress: 1,
  });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowDpad(true);
    }
  }, []);

  const randomFreeCell = useCallback(
    (cols: number, rows: number, snake: Point[], obstacles: Point[], avoid?: Point[]): Point => {
      const occupied = new Set<string>();
      snake.forEach(s => occupied.add(`${s.x},${s.y}`));
      obstacles.forEach(o => occupied.add(`${o.x},${o.y}`));
      avoid?.forEach(a => occupied.add(`${a.x},${a.y}`));
      const free: Point[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!occupied.has(`${x},${y}`)) free.push({ x, y });
        }
      }
      if (free.length === 0) return { x: 0, y: 0 };
      return free[Math.floor(Math.random() * free.length)];
    },
    []
  );

  const startNewGame = useCallback(
    (nextMode?: SnakeMode, nextSpeed?: SpeedTier, nextMap?: MapPresetKey) => {
      const activeMode = nextMode ?? gRef.current.mode;
      const activeSpeed = nextSpeed ?? gRef.current.speedTier;
      const activeMap = nextMap ?? gRef.current.mapKey;
      const { cols, rows, cell } = MAP_PRESETS[activeMap];
      const obs = activeMode === 'obstacles' ? buildObstacles(cols, rows) : [];
      const sy = Math.floor(rows / 2);
      const sx = Math.max(5, Math.floor(cols * 0.25));
      const initSnake: Point[] = [
        { x: sx, y: sy },
        { x: sx - 1, y: sy },
        { x: sx - 2, y: sy },
        { x: sx - 3, y: sy },
      ];
      const firstApple = randomFreeCell(cols, rows, initSnake, obs);
      gRef.current = {
        mapKey: activeMap,
        cols,
        rows,
        cell,
        mode: activeMode,
        speedTier: activeSpeed,
        snake: initSnake.map(p => ({ ...p })),
        prevSnake: initSnake.map(p => ({ ...p })),
        dir: { x: 1, y: 0 },
        queue: [],
        apple: firstApple,
        special: null,
        obstacles: obs,
        particles: [],
        popups: [],
        score: 0,
        combo: 1,
        lastEatAt: 0,
        frostUntil: 0,
        paused: false,
        gameOver: false,
        lastTick: performance.now(),
        tickProgress: 1,
      };
      setMapKey(activeMap);
      setMode(activeMode);
      setSpeedTier(activeSpeed);
      setScore(0);
      setLength(initSnake.length);
      setCombo(1);
      setPaused(false);
      setGameOver(false);
      setFrostLeftMs(0);
      onMoveRef.current('__local_state', { score: 0, gameOver: false, won: false });
    },
    [randomFreeCell]
  );

  useEffect(() => {
    startNewGame('classic', 'normal', 'wide');
  }, [startNewGame]);

  const queueTurn = useCallback((dx: number, dy: number) => {
    const g = gRef.current;
    if (g.gameOver || g.paused) return;
    const lastPlanned = g.queue.length > 0 ? g.queue[g.queue.length - 1] : g.dir;
    if (lastPlanned.x === dx && lastPlanned.y === dy) return;
    if (lastPlanned.x === -dx && lastPlanned.y === -dy) return;
    if (g.queue.length < 2) {
      g.queue.push({ x: dx, y: dy });
      soundSynth.playMove();
    }
  }, []);

  const togglePause = useCallback(() => {
    const g = gRef.current;
    if (g.gameOver) return;
    g.paused = !g.paused;
    g.lastTick = performance.now();
    setPaused(g.paused);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      ) {
        return;
      }
      if (e.code === 'KeyP' || e.code === 'Space') {
        e.preventDefault();
        if (gRef.current.gameOver) {
          startNewGame();
        } else {
          togglePause();
        }
        return;
      }
      if (e.repeat) return;
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        KeyW: [0, -1],
        ArrowDown: [0, 1],
        KeyS: [0, 1],
        ArrowLeft: [-1, 0],
        KeyA: [-1, 0],
        ArrowRight: [1, 0],
        KeyD: [1, 0],
      };
      const vec = map[e.code];
      if (vec) {
        e.preventDefault();
        queueTurn(vec[0], vec[1]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [queueTurn, startNewGame, togglePause]);

  // 60FPS 主循环：平滑插值 + 逻辑 Tick + 粒子渲染
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;

    const spawnBurst = (cx: number, cy: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const sp = 1.4 + Math.random() * 2.8;
        gRef.current.particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          color,
          alpha: 1,
          r: 2 + Math.random() * 2.2,
        });
      }
    };

    const stepLogic = (now: number) => {
      const g = gRef.current;
      if (g.paused || g.gameOver) return;

      if (g.queue.length > 0) {
        g.dir = g.queue.shift()!;
      }

      g.prevSnake = g.snake.map(p => ({ ...p }));
      let nx = g.snake[0].x + g.dir.x;
      let ny = g.snake[0].y + g.dir.y;

      if (g.mode === 'wrap') {
        nx = (nx + g.cols) % g.cols;
        ny = (ny + g.rows) % g.rows;
      } else {
        if (nx < 0 || nx >= g.cols || ny < 0 || ny >= g.rows) {
          g.gameOver = true;
          setGameOver(true);
          soundSynth.playGameOver();
          onMoveRef.current('__local_state', { score: g.score, gameOver: true, won: false });
          return;
        }
      }

      const hitObstacle = g.obstacles.some(o => o.x === nx && o.y === ny);
      const willEatApple = nx === g.apple.x && ny === g.apple.y;
      const bodyToCheck = willEatApple ? g.snake : g.snake.slice(0, -1);
      const hitSelf = bodyToCheck.some(s => s.x === nx && s.y === ny);

      if (hitObstacle || hitSelf) {
        g.gameOver = true;
        setGameOver(true);
        spawnBurst(g.snake[0].x * g.cell + g.cell / 2, g.snake[0].y * g.cell + g.cell / 2, '#ff4757', 18);
        soundSynth.playGameOver();
        onMoveRef.current('__local_state', { score: g.score, gameOver: true, won: false });
        return;
      }

      g.snake.unshift({ x: nx, y: ny });

      if (willEatApple) {
        const withinCombo = g.lastEatAt > 0 && now - g.lastEatAt <= 4500;
        g.combo = withinCombo ? Math.min(5, g.combo + 1) : 1;
        g.lastEatAt = now;
        const gained = 10 * g.combo;
        g.score += gained;
        setScore(g.score);
        setLength(g.snake.length);
        setCombo(g.combo);
        soundSynth.playChime(g.combo - 1);
        onMoveRef.current('__local_state', { score: g.score, gameOver: false, won: false });

        const ax = nx * g.cell + g.cell / 2;
        const ay = ny * g.cell + g.cell / 2;
        spawnBurst(ax, ay, g.combo >= 3 ? '#fbe296' : '#ff4757', 12);
        g.popups.push({
          x: ax,
          y: ay - 6,
          text: g.combo > 1 ? `+${gained} ×${g.combo}` : `+${gained}`,
          color: g.combo > 1 ? '#fbe296' : '#86efac',
          alpha: 1,
        });

        g.apple = randomFreeCell(g.cols, g.rows, g.snake, g.obstacles, g.special ? [g.special] : undefined);
        if (!g.special && Math.random() < 0.28) {
          const pos = randomFreeCell(g.cols, g.rows, g.snake, g.obstacles, [g.apple]);
          const kind = Math.random() < 0.65 ? 'gold' : 'frost';
          g.special = { x: pos.x, y: pos.y, kind, expiresAt: now + 7200 };
        }
      } else {
        g.snake.pop();
        if (g.combo > 1 && g.lastEatAt > 0 && now - g.lastEatAt > 4500) {
          g.combo = 1;
          setCombo(1);
        }
      }

      if (g.special) {
        if (nx === g.special.x && ny === g.special.y) {
          const sx = nx * g.cell + g.cell / 2;
          const sy = ny * g.cell + g.cell / 2;
          if (g.special.kind === 'gold') {
            const bonus = 50 * g.combo;
            g.score += bonus;
            setScore(g.score);
            soundSynth.playWin();
            spawnBurst(sx, sy, '#fbbf24', 18);
            g.popups.push({ x: sx, y: sy - 10, text: `金果 +${bonus}`, color: '#fde047', alpha: 1 });
          } else {
            g.frostUntil = now + 4200;
            g.score += 20;
            setScore(g.score);
            soundSynth.playChime(5);
            spawnBurst(sx, sy, '#38bdf8', 16);
            g.popups.push({ x: sx, y: sy - 10, text: '❄️ 缓速微操', color: '#7dd3fc', alpha: 1 });
          }
          onMoveRef.current('__local_state', { score: g.score, gameOver: false, won: false });
          g.special = null;
        } else if (now > g.special.expiresAt) {
          g.special = null;
        }
      }
    };

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      const g = gRef.current;
      const cW = g.cols * g.cell;
      const cH = g.rows * g.cell;

      const isFrosted = g.frostUntil > now;
      const nextFrostLeft = isFrosted ? Math.max(0, Math.ceil((g.frostUntil - now) / 100) * 100) : 0;
      setFrostLeftMs(prev => (prev === nextFrostLeft ? prev : nextFrostLeft));

      const baseInterval = SPEED_MS[g.speedTier];
      const speedAdjust = Math.min(24, Math.floor(Math.max(0, g.snake.length - 4) * 1.1));
      const tickMs = (baseInterval - speedAdjust) * (isFrosted ? 1.55 : 1);

      if (!g.paused && !g.gameOver) {
        while (now - g.lastTick >= tickMs) {
          g.lastTick += tickMs;
          stepLogic(now);
          if (g.gameOver) break;
        }
        g.tickProgress = g.gameOver ? 1 : Math.min(1, Math.max(0, (now - g.lastTick) / tickMs));
      }

      const bg = ctx.createLinearGradient(0, 0, cW, cH);
      bg.addColorStop(0, isFrosted ? '#0a192e' : '#0b1220');
      bg.addColorStop(1, '#060911');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cW, cH);

      ctx.strokeStyle = isFrosted ? 'rgba(56, 189, 248, 0.08)' : 'rgba(212, 173, 114, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 1; i < g.cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * g.cell, 0);
        ctx.lineTo(i * g.cell, cH);
        ctx.stroke();
      }
      for (let j = 1; j < g.rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * g.cell);
        ctx.lineTo(cW, j * g.cell);
        ctx.stroke();
      }

      ctx.save();
      ctx.lineWidth = 3;
      if (g.mode === 'wrap') {
        ctx.setLineDash([8, 6]);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.52)';
      } else {
        ctx.strokeStyle = 'rgba(212, 173, 114, 0.45)';
      }
      ctx.strokeRect(1.5, 1.5, cW - 3, cH - 3);
      ctx.restore();

      for (const ob of g.obstacles) {
        const ox = ob.x * g.cell;
        const oy = ob.y * g.cell;
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.roundRect(ox + 2, oy + 2, g.cell - 4, g.cell - 4, 5);
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      const pulse = Math.sin(now * 0.006);
      const ax = g.apple.x * g.cell + g.cell / 2;
      const ay = g.apple.y * g.cell + g.cell / 2;
      ctx.save();
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 12 + pulse * 4;
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ax, ay, g.cell * 0.34 + pulse * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(ax + 2.5, ay - g.cell * 0.34, 3.2, 1.9, 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(ax - 2.3, ay - 2.3, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (g.special) {
        const sx = g.special.x * g.cell + g.cell / 2;
        const sy = g.special.y * g.cell + g.cell / 2;
        const remainRatio = Math.max(0, (g.special.expiresAt - now) / 7200);
        const col = g.special.kind === 'gold' ? '#fbbf24' : '#38bdf8';
        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur = 14;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(sx, sy, g.cell * 0.34 + pulse * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.75)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sx, sy, g.cell * 0.46, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remainRatio);
        ctx.stroke();
        ctx.restore();
      }

      const t = g.tickProgress;
      for (let i = g.snake.length - 1; i >= 0; i--) {
        const curr = g.snake[i];
        const prev = g.prevSnake[i] || curr;
        let ix = curr.x;
        let iy = curr.y;
        if (Math.abs(curr.x - prev.x) <= 1 && Math.abs(curr.y - prev.y) <= 1) {
          ix = prev.x + (curr.x - prev.x) * t;
          iy = prev.y + (curr.y - prev.y) * t;
        }
        const x = ix * g.cell;
        const y = iy * g.cell;
        const isHead = i === 0;

        ctx.save();
        if (isHead) {
          ctx.fillStyle = isFrosted ? '#38bdf8' : '#34d399';
          ctx.shadowColor = isFrosted ? '#38bdf8' : '#10b981';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, g.cell - 2, g.cell - 2, 7);
          ctx.fill();

          for (const side of [-1, 1]) {
            const eyeX = x + g.cell / 2 + g.dir.x * 4 - g.dir.y * side * 4.6;
            const eyeY = y + g.cell / 2 + g.dir.y * 4 + g.dir.x * side * 4.6;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(eyeX, eyeY, 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.arc(eyeX + g.dir.x * 1.1, eyeY + g.dir.y * 1.1, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          const ratio = i / Math.max(1, g.snake.length - 1);
          const hue = isFrosted ? 195 - ratio * 25 : 152 - ratio * 42;
          ctx.fillStyle = `hsl(${hue}, 82%, ${52 - ratio * 14}%)`;
          const pad = 1.6 + ratio * 1.2;
          ctx.beginPath();
          ctx.roundRect(x + pad, y + pad, g.cell - pad * 2, g.cell - pad * 2, 6);
          ctx.fill();
        }
        ctx.restore();
      }

      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.032;
        if (pt.alpha <= 0) g.particles.splice(i, 1);
        else {
          ctx.save();
          ctx.globalAlpha = pt.alpha;
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      for (let i = g.popups.length - 1; i >= 0; i--) {
        const pop = g.popups[i];
        pop.y -= 0.65;
        pop.alpha -= 0.022;
        if (pop.alpha <= 0) g.popups.splice(i, 1);
        else {
          ctx.save();
          ctx.globalAlpha = pop.alpha;
          ctx.fillStyle = pop.color;
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(pop.text, pop.x, pop.y);
          ctx.restore();
        }
      }

      if (g.paused && !g.gameOver) {
        ctx.fillStyle = 'rgba(8, 12, 22, 0.72)';
        ctx.fillRect(0, 0, cW, cH);
        ctx.fillStyle = '#fbe296';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('已暂停', cW / 2, cH / 2 - 8);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '13px sans-serif';
        ctx.fillText('按 空格 / P 继续游玩', cW / 2, cH / 2 + 18);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [randomFreeCell]);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const start = touchStartRef.current;
    const end = e.changedTouches[0];
    if (!start || !end) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.hypot(dx, dy) < 18) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      queueTurn(dx > 0 ? 1 : -1, 0);
    } else {
      queueTurn(0, dy > 0 ? 1 : -1);
    }
    touchStartRef.current = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%', userSelect: 'none' }}>
      {/* 控制栏：模式 + 地图尺寸 + 速度 + 暂停 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 6, width: widthPx, maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {([
            ['classic', '经典围墙'],
            ['wrap', '霓虹穿墙'],
            ['obstacles', '障碍迷阵'],
          ] as [SnakeMode, string][]).map(([m, label]) => (
            <button
              key={m}
              type="button"
              data-snake-mode={m}
              onClick={() => startNewGame(m, speedTier, mapKey)}
              style={{
                padding: '4px 9px',
                borderRadius: 8,
                fontSize: 11.5,
                fontWeight: mode === m ? 700 : 500,
                border: mode === m ? '1px solid #d4ad72' : '1px solid rgba(255,255,255,0.14)',
                background: mode === m ? 'rgba(212,173,114,0.22)' : 'rgba(255,255,255,0.06)',
                color: mode === m ? '#fbe296' : '#cbd5e1',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {(['compact', 'wide', 'mega'] as MapPresetKey[]).map((mk) => (
            <button
              key={mk}
              type="button"
              data-snake-map={mk}
              onClick={() => startNewGame(mode, speedTier, mk)}
              style={{
                padding: '4px 8px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: mapKey === mk ? 700 : 500,
                border: mapKey === mk ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.14)',
                background: mapKey === mk ? 'rgba(74,222,128,0.18)' : 'rgba(255,255,255,0.06)',
                color: mapKey === mk ? '#86efac' : '#cbd5e1',
                cursor: 'pointer',
              }}
            >
              {MAP_PRESETS[mk].label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {([
            ['chill', '慢'],
            ['normal', '中'],
            ['turbo', '快'],
          ] as [SpeedTier, string][]).map(([sp, label]) => (
            <button
              key={sp}
              type="button"
              onClick={() => startNewGame(mode, sp, mapKey)}
              style={{
                padding: '4px 8px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: speedTier === sp ? 700 : 500,
                border: speedTier === sp ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.14)',
                background: speedTier === sp ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.06)',
                color: speedTier === sp ? '#7dd3fc' : '#cbd5e1',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            data-snake-pause
            onClick={togglePause}
            style={{
              padding: '4px 9px',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.16)',
              background: paused ? 'rgba(251,191,36,0.24)' : 'rgba(255,255,255,0.08)',
              color: paused ? '#fde047' : '#e2e8f0',
              cursor: 'pointer',
            }}
          >
            {paused ? '继续' : '暂停'}
          </button>
          <button
            type="button"
            onClick={() => setShowDpad(v => !v)}
            style={{
              padding: '4px 8px',
              borderRadius: 8,
              fontSize: 11,
              border: '1px solid rgba(255,255,255,0.14)',
              background: showDpad ? 'rgba(212,173,114,0.2)' : 'rgba(255,255,255,0.05)',
              color: showDpad ? '#fbe296' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            触控键
          </button>
        </div>
      </div>

      {/* 实时指标条 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: widthPx, maxWidth: '100%', padding: '5px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12 }}>
        <span style={{ color: '#cbd5e1' }}>得分 <b data-snake-score style={{ color: '#fbe296', fontSize: 15, fontFamily: 'monospace' }}>{score}</b></span>
        <span style={{ color: '#cbd5e1' }}>蛇长 <b data-snake-length style={{ color: '#34d399', fontSize: 15, fontFamily: 'monospace' }}>{length}</b></span>
        <span style={{ color: combo > 1 ? '#fde047' : '#94a3b8', fontWeight: combo > 1 ? 700 : 400 }}>
          连击 ×{combo}
        </span>
        {frostLeftMs > 0 ? (
          <span style={{ color: '#7dd3fc', fontWeight: 600 }}>❄️ {(frostLeftMs / 1000).toFixed(1)}s</span>
        ) : (
          <span style={{ color: '#64748b' }}>⌨️ 方向键 / WASD</span>
        )}
      </div>

      {/* 宽幕大地图画布 */}
      <div style={{ position: 'relative', maxWidth: '100%' }}>
        <canvas
          ref={canvasRef}
          width={widthPx}
          height={heightPx}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            borderRadius: 14,
            boxShadow: '0 12px 34px rgba(0, 0, 0, 0.5)',
            display: 'block',
            width: `min(100%, ${widthPx}px, calc(68vh * ${widthPx} / ${heightPx}))`,
            height: 'auto',
            touchAction: 'none',
          }}
        />
        {gameOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(8, 12, 22, 0.86)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              gap: 8,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fb7185' }}>挑战结束</div>
            <div style={{ fontSize: 14, color: '#cbd5e1' }}>
              最终得分 <b style={{ color: '#fbe296' }}>{score}</b> · 蛇身长度 <b style={{ color: '#34d399' }}>{length}</b>
            </div>
            <button
              type="button"
              onClick={() => startNewGame()}
              style={{
                marginTop: 8,
                padding: '8px 22px',
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

      {/* 可选触控方向键 */}
      {showDpad && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 44px)', gap: 6 }}>
          {[
            ['', null],
            ['↑', [0, -1]],
            ['', null],
            ['←', [-1, 0]],
            ['↓', [0, 1]],
            ['→', [1, 0]],
          ].map(([label, vec], idx) =>
            vec ? (
              <button
                key={idx}
                type="button"
                disabled={gameOver}
                onPointerDown={(e) => {
                  e.preventDefault();
                  queueTurn((vec as number[])[0], (vec as number[])[1]);
                }}
                style={{
                  height: 36,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: '#f8fafc',
                  fontWeight: 700,
                  cursor: 'pointer',
                  touchAction: 'none',
                }}
              >
                {label as string}
              </button>
            ) : (
              <span key={idx} />
            )
          )}
        </div>
      )}
    </div>
  );
}
