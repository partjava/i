'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

type PieceType = 'I' | 'O' | 'T' | 'L' | 'J' | 'S' | 'Z';

const COLS = 10;
const ROWS = 20;
const CELL = 29;
const W = COLS * CELL; // 290
const H = ROWS * CELL; // 580

const PIECE_META: Record<PieceType, { color: string; shape: number[][] }> = {
  I: {
    color: '#22d3ee',
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  O: {
    color: '#facc15',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    color: '#c084fc',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  L: {
    color: '#fb923c',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  J: {
    color: '#60a5fa',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  S: {
    color: '#4ade80',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  Z: {
    color: '#fb7185',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
};

const JLSTZ_KICKS: Record<string, [number, number][]> = {
  '0>1': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '1>2': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '2>3': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '3>0': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
};

const I_KICKS: Record<string, [number, number][]> = {
  '0>1': [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  '1>2': [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  '2>3': [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  '3>0': [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
};

function rotateCW(mat: number[][]): number[][] {
  const n = mat.length;
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => mat[n - 1 - c][r])
  );
}

function shuffledBag(): PieceType[] {
  const arr: PieceType[] = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function MiniPiecePreview({ type, size = 14 }: { type: PieceType | null; size?: number }) {
  if (!type) {
    return (
      <div style={{ height: size * 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#64748b' }}>
        空
      </div>
    );
  }
  const meta = PIECE_META[type];
  const shape = meta.shape;
  const rows = shape.length;
  const cols = shape[0].length;
  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: 1.5, padding: 2 }}>
      {shape.flatMap((row, r) =>
        row.map((v, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              width: size,
              height: size,
              borderRadius: 3,
              background: v ? meta.color : 'transparent',
              boxShadow: v ? `inset 0 1px 0 rgba(255,255,255,0.45), 0 0 6px ${meta.color}44` : 'none',
            }}
          />
        ))
      )}
    </div>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  s: number;
}

export default function Tetris({
  onMove,
}: {
  state?: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [holdType, setHoldType] = useState<PieceType | null>(null);
  const [nextQueue, setNextQueue] = useState<PieceType[]>([]);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gRef = useRef({
    board: Array.from({ length: ROWS }, () => Array<string | null>(COLS).fill(null)),
    bag: [] as PieceType[],
    queue: [] as PieceType[],
    hold: null as PieceType | null,
    holdUsed: false,
    cur: null as { type: PieceType; shape: number[][]; x: number; y: number; rot: number } | null,
    score: 0,
    lines: 0,
    level: 1,
    combo: -1,
    b2b: false,
    paused: false,
    gameOver: false,
    dropAccMs: 0,
    lockElapsedMs: 0,
    lockResets: 0,
    flashRows: [] as number[],
    flashAlpha: 0,
    dropBeam: null as { x: number; y1: number; y2: number; w: number; color: string; alpha: number } | null,
    particles: [] as Particle[],
    bannerText: '',
    bannerAlpha: 0,
  });

  const collides = (board: (string | null)[][], shape: number[][], px: number, py: number) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (!shape[r][c]) continue;
        const bx = px + c;
        const by = py + r;
        if (bx < 0 || bx >= COLS || by >= ROWS) return true;
        if (by >= 0 && board[by][bx] !== null) return true;
      }
    }
    return false;
  };

  const pullNextPiece = useCallback(() => {
    const g = gRef.current;
    while (g.queue.length < 4) {
      if (g.bag.length === 0) g.bag = shuffledBag();
      g.queue.push(g.bag.pop()!);
    }
    const type = g.queue.shift()!;
    while (g.queue.length < 4) {
      if (g.bag.length === 0) g.bag = shuffledBag();
      g.queue.push(g.bag.pop()!);
    }
    const shape = PIECE_META[type].shape.map(r => [...r]);
    const x = Math.floor((COLS - shape[0].length) / 2);
    const y = type === 'I' ? -1 : 0;
    g.cur = { type, shape, x, y, rot: 0 };
    g.holdUsed = false;
    g.lockElapsedMs = 0;
    g.lockResets = 0;
    setNextQueue(g.queue.slice(0, 3));

    if (collides(g.board, shape, x, y)) {
      g.gameOver = true;
      setGameOver(true);
      soundSynth.playGameOver();
      onMoveRef.current('__local_state', { score: g.score, gameOver: true, won: false });
    }
  }, []);

  const initGame = useCallback(() => {
    const g = gRef.current;
    g.board = Array.from({ length: ROWS }, () => Array<string | null>(COLS).fill(null));
    g.bag = shuffledBag();
    g.queue = [];
    g.hold = null;
    g.holdUsed = false;
    g.score = 0;
    g.lines = 0;
    g.level = 1;
    g.combo = -1;
    g.b2b = false;
    g.paused = false;
    g.gameOver = false;
    g.dropAccMs = 0;
    g.lockElapsedMs = 0;
    g.lockResets = 0;
    g.flashRows = [];
    g.flashAlpha = 0;
    g.dropBeam = null;
    g.particles = [];
    g.bannerText = '';
    g.bannerAlpha = 0;
    setScore(0);
    setLines(0);
    setLevel(1);
    setCombo(0);
    setHoldType(null);
    setPaused(false);
    setGameOver(false);
    pullNextPiece();
    onMoveRef.current('__local_state', { score: 0, gameOver: false, won: false });
  }, [pullNextPiece]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const lockCurrentPiece = useCallback(() => {
    const g = gRef.current;
    if (!g.cur) return;
    const { type, shape, x, y } = g.cur;
    const color = PIECE_META[type].color;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[0].length; c++) {
        if (!shape[r][c]) continue;
        const bx = x + c;
        const by = y + r;
        if (by < 0) {
          g.gameOver = true;
          setGameOver(true);
          soundSynth.playGameOver();
          onMoveRef.current('__local_state', { score: g.score, gameOver: true, won: false });
          return;
        }
        g.board[by][bx] = color;
      }
    }

    const clearedIndices: number[] = [];
    for (let r = 0; r < ROWS; r++) {
      if (g.board[r].every(cell => cell !== null)) {
        clearedIndices.push(r);
      }
    }

    if (clearedIndices.length > 0) {
      g.flashRows = clearedIndices;
      g.flashAlpha = 1;
      for (const rIdx of clearedIndices) {
        for (let c = 0; c < COLS; c++) {
          const pCol = g.board[rIdx][c] || '#fbe296';
          g.particles.push({
            x: c * CELL + CELL / 2,
            y: rIdx * CELL + CELL / 2,
            vx: (Math.random() - 0.5) * 4.5,
            vy: -1.5 - Math.random() * 2.5,
            color: pCol,
            alpha: 1,
            s: 4 + Math.random() * 4,
          });
        }
      }
      const remaining = g.board.filter((_, idx) => !clearedIndices.includes(idx));
      while (remaining.length < ROWS) {
        remaining.unshift(Array<string | null>(COLS).fill(null));
      }
      g.board = remaining;

      const count = clearedIndices.length;
      g.combo += 1;
      const basePts = [0, 100, 300, 500, 800][count] || 800;
      const isB2bEligible = count === 4;
      const b2bMult = isB2bEligible && g.b2b ? 1.5 : 1;
      if (isB2bEligible) g.b2b = true;
      else g.b2b = false;

      const comboPts = g.combo > 0 ? 50 * g.combo * g.level : 0;
      const gained = Math.round(basePts * g.level * b2bMult) + comboPts;

      g.score += gained;
      g.lines += count;
      g.level = Math.min(15, 1 + Math.floor(g.lines / 10));
      setScore(g.score);
      setLines(g.lines);
      setLevel(g.level);
      setCombo(g.combo > 0 ? g.combo : 0);

      const label = count === 4 ? 'TETRIS!' : count === 3 ? 'TRIPLE!' : count === 2 ? 'DOUBLE!' : 'CLEAR';
      g.bannerText = g.combo > 0 ? `${label} ${g.combo}连消 +${gained}` : `${label} +${gained}`;
      g.bannerAlpha = 1;
      soundSynth.playChime(Math.min(7, count + g.combo));
      onMoveRef.current('__local_state', { score: g.score, gameOver: false, won: false });
    } else {
      g.combo = -1;
      setCombo(0);
      soundSynth.playClack();
    }

    pullNextPiece();
  }, [pullNextPiece]);

  const tryMove = useCallback((dx: number, dy: number): boolean => {
    const g = gRef.current;
    if (!g.cur || g.paused || g.gameOver) return false;
    if (!collides(g.board, g.cur.shape, g.cur.x + dx, g.cur.y + dy)) {
      g.cur.x += dx;
      g.cur.y += dy;
      if (dy > 0) g.lockElapsedMs = 0;
      else if (collides(g.board, g.cur.shape, g.cur.x, g.cur.y + 1) && g.lockResets < 10) {
        g.lockElapsedMs = 0;
        g.lockResets += 1;
      }
      return true;
    }
    return false;
  }, []);

  const tryRotate = useCallback(() => {
    const g = gRef.current;
    if (!g.cur || g.paused || g.gameOver || g.cur.type === 'O') return;
    const rotated = rotateCW(g.cur.shape);
    const nextRot = (g.cur.rot + 1) % 4;
    const key = `${g.cur.rot}>${nextRot}`;
    const kicks = g.cur.type === 'I' ? I_KICKS[key] : JLSTZ_KICKS[key];
    for (const [kx, ky] of kicks) {
      if (!collides(g.board, rotated, g.cur.x + kx, g.cur.y - ky)) {
        g.cur.shape = rotated;
        g.cur.x += kx;
        g.cur.y -= ky;
        g.cur.rot = nextRot;
        if (g.lockResets < 10) {
          g.lockElapsedMs = 0;
          g.lockResets += 1;
        }
        soundSynth.playMove();
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    const g = gRef.current;
    if (!g.cur || g.paused || g.gameOver) return;
    const startY = g.cur.y;
    let dist = 0;
    while (!collides(g.board, g.cur.shape, g.cur.x, g.cur.y + 1)) {
      g.cur.y += 1;
      dist += 1;
    }
    if (dist > 0) {
      g.score += dist * 2;
      setScore(g.score);
      onMoveRef.current('__local_state', { score: g.score, gameOver: false, won: false });
      g.dropBeam = {
        x: g.cur.x * CELL,
        y1: Math.max(0, startY * CELL),
        y2: (g.cur.y + 1) * CELL,
        w: g.cur.shape[0].length * CELL,
        color: PIECE_META[g.cur.type].color,
        alpha: 0.45,
      };
    }
    soundSynth.playShatter();
    lockCurrentPiece();
  }, [lockCurrentPiece]);

  const holdPiece = useCallback(() => {
    const g = gRef.current;
    if (!g.cur || g.paused || g.gameOver || g.holdUsed) return;
    const currentType = g.cur.type;
    if (g.hold === null) {
      g.hold = currentType;
      pullNextPiece();
    } else {
      const swapped = g.hold;
      g.hold = currentType;
      const shape = PIECE_META[swapped].shape.map(r => [...r]);
      const x = Math.floor((COLS - shape[0].length) / 2);
      g.cur = { type: swapped, shape, x, y: swapped === 'I' ? -1 : 0, rot: 0 };
    }
    g.holdUsed = true;
    g.lockElapsedMs = 0;
    g.lockResets = 0;
    setHoldType(g.hold);
    soundSynth.playMove();
  }, [pullNextPiece]);

  const togglePause = useCallback(() => {
    const g = gRef.current;
    if (g.gameOver) return;
    g.paused = !g.paused;
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
      if (e.code === 'KeyP') {
        e.preventDefault();
        togglePause();
        return;
      }
      if (gRef.current.gameOver || gRef.current.paused) return;
      if (e.repeat && ['Space', 'ArrowUp', 'KeyW', 'KeyC', 'ShiftLeft', 'ShiftRight'].includes(e.code)) {
        e.preventDefault();
        return;
      }
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          if (tryMove(-1, 0)) soundSynth.playMove();
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          if (tryMove(1, 0)) soundSynth.playMove();
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          if (tryMove(0, 1)) {
            gRef.current.score += 1;
            setScore(gRef.current.score);
            onMoveRef.current('__local_state', { score: gRef.current.score, gameOver: false, won: false });
          }
          break;
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          tryRotate();
          break;
        case 'Space':
          e.preventDefault();
          hardDrop();
          break;
        case 'KeyC':
        case 'ShiftLeft':
        case 'ShiftRight':
          e.preventDefault();
          holdPiece();
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tryMove, tryRotate, hardDrop, holdPiece, togglePause]);

  // 60FPS 主渲染与下落驱动
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastTime = performance.now();

    const drawBlock = (bx: number, by: number, color: string, alpha = 1) => {
      const px = bx * CELL;
      const py = by * CELL;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(px + 1, py + 1, CELL - 2, CELL - 2, 4);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(px + 2, py + 2, CELL - 4, 3);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(px + 2, py + CELL - 4, CELL - 4, 2);
      ctx.restore();
    };

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(60, Math.max(0, now - lastTime));
      lastTime = now;

      const g = gRef.current;
      if (!g.paused && !g.gameOver && g.cur) {
        const dropInterval = Math.max(95, 760 - (g.level - 1) * 52);
        const touchingGround = collides(g.board, g.cur.shape, g.cur.x, g.cur.y + 1);
        if (touchingGround) {
          g.lockElapsedMs += dt;
          if (g.lockElapsedMs >= 450) {
            lockCurrentPiece();
          }
        } else {
          g.dropAccMs += dt;
          while (g.dropAccMs >= dropInterval && g.cur && !g.gameOver) {
            g.dropAccMs -= dropInterval;
            if (!collides(g.board, g.cur.shape, g.cur.x, g.cur.y + 1)) {
              g.cur.y += 1;
            } else {
              break;
            }
          }
        }
      }

      // 绘制棋盘
      ctx.fillStyle = '#080c16';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.lineWidth = 1;
      for (let r = 1; r < ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(W, r * CELL);
        ctx.stroke();
      }
      for (let c = 1; c < COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * CELL, 0);
        ctx.lineTo(c * CELL, H);
        ctx.stroke();
      }

      if (g.dropBeam) {
        ctx.save();
        ctx.globalAlpha = g.dropBeam.alpha;
        const beamGrad = ctx.createLinearGradient(0, g.dropBeam.y1, 0, g.dropBeam.y2);
        beamGrad.addColorStop(0, 'transparent');
        beamGrad.addColorStop(1, g.dropBeam.color);
        ctx.fillStyle = beamGrad;
        ctx.fillRect(g.dropBeam.x + 4, g.dropBeam.y1, g.dropBeam.w - 8, g.dropBeam.y2 - g.dropBeam.y1);
        ctx.restore();
        g.dropBeam.alpha -= 0.04;
        if (g.dropBeam.alpha <= 0) g.dropBeam = null;
      }

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const col = g.board[r][c];
          if (col) drawBlock(c, r, col);
        }
      }

      if (g.cur && !g.gameOver) {
        let ghostY = g.cur.y;
        while (!collides(g.board, g.cur.shape, g.cur.x, ghostY + 1)) {
          ghostY += 1;
        }
        const curColor = PIECE_META[g.cur.type].color;
        if (ghostY > g.cur.y) {
          ctx.save();
          ctx.strokeStyle = curColor;
          ctx.globalAlpha = 0.38;
          ctx.lineWidth = 1.6;
          ctx.setLineDash([4, 3]);
          for (let r = 0; r < g.cur.shape.length; r++) {
            for (let c = 0; c < g.cur.shape[0].length; c++) {
              if (g.cur.shape[r][c] && ghostY + r >= 0) {
                ctx.strokeRect((g.cur.x + c) * CELL + 2.5, (ghostY + r) * CELL + 2.5, CELL - 5, CELL - 5);
              }
            }
          }
          ctx.restore();
        }
        for (let r = 0; r < g.cur.shape.length; r++) {
          for (let c = 0; c < g.cur.shape[0].length; c++) {
            if (g.cur.shape[r][c] && g.cur.y + r >= 0) {
              drawBlock(g.cur.x + c, g.cur.y + r, curColor);
            }
          }
        }
      }

      if (g.flashAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = g.flashAlpha * 0.7;
        ctx.fillStyle = '#ffffff';
        for (const rIdx of g.flashRows) {
          ctx.fillRect(0, rIdx * CELL, W, CELL);
        }
        ctx.restore();
        g.flashAlpha -= 0.08;
      }

      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.vy += 0.12;
        pt.alpha -= 0.03;
        if (pt.alpha <= 0) g.particles.splice(i, 1);
        else {
          ctx.save();
          ctx.globalAlpha = pt.alpha;
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
          ctx.restore();
        }
      }

      if (g.bannerAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, g.bannerAlpha);
        ctx.fillStyle = '#fbe296';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 6;
        ctx.fillText(g.bannerText, W / 2, 36);
        ctx.restore();
        g.bannerAlpha -= 0.018;
      }

      if (g.paused && !g.gameOver) {
        ctx.fillStyle = 'rgba(8, 12, 22, 0.74)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fbe296';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('已暂停', W / 2, H / 2 - 6);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '13px sans-serif';
        ctx.fillText('按 P 继续', W / 2, H / 2 + 18);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [lockCurrentPiece]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, userSelect: 'none' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: 14 }}>
        {/* 主棋盘 */}
        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            style={{
              borderRadius: 12,
              border: '1px solid rgba(212, 173, 114, 0.35)',
              boxShadow: '0 12px 34px rgba(0,0,0,0.55)',
              display: 'block',
              width: `min(100%, ${W}px, calc(66vh * ${W} / ${H}))`,
              height: 'auto',
            }}
          />
          {gameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(8, 12, 22, 0.88)',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fb7185' }}>方块封顶</div>
              <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                得分 <b style={{ color: '#fbe296' }}>{score}</b> · 消除 <b style={{ color: '#38bdf8' }}>{lines}</b> 行
              </div>
              <button
                type="button"
                onClick={initGame}
                style={{
                  marginTop: 8,
                  padding: '8px 20px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #e5bf7d, #c8984c)',
                  color: '#14120e',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔄 再来一局
              </button>
            </div>
          )}
        </div>

        {/* 右侧 SRS 战术侧边栏：HOLD / NEXT 3 / STATS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 156 }}>
          <div style={{ padding: '8px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 700, marginBottom: 4 }}>
              HOLD (C)
            </div>
            <div style={{ minHeight: 46, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MiniPiecePreview type={holdType} size={13} />
            </div>
          </div>

          <div style={{ padding: '8px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 700, marginBottom: 6 }}>
              NEXT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {nextQueue.map((t, idx) => (
                <div key={idx} style={{ opacity: idx === 0 ? 1 : 0.72 - idx * 0.14 }}>
                  <MiniPiecePreview type={t} size={idx === 0 ? 13 : 11} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '10px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>得分</span>
              <b data-tetris-score style={{ color: '#fbe296', fontFamily: 'monospace' }}>{score}</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>等级</span>
              <b style={{ color: '#38bdf8', fontFamily: 'monospace' }}>Lv.{level}</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>消行</span>
              <b style={{ color: '#4ade80', fontFamily: 'monospace' }}>{lines}</b>
            </div>
            {combo > 0 && (
              <div style={{ textAlign: 'center', fontSize: 11, color: '#fde047', fontWeight: 700, paddingTop: 2 }}>
                🔥 {combo} 连消加成
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={togglePause}
            style={{
              padding: '7px 10px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: paused ? 'rgba(251,191,36,0.22)' : 'rgba(255,255,255,0.08)',
              color: paused ? '#fde047' : '#e2e8f0',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {paused ? '▶ 继续 (P)' : '⏸ 暂停 (P)'}
          </button>
        </div>
      </div>

      {/* 触控与快捷操作条 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
        {[
          { label: '←', fn: () => tryMove(-1, 0) },
          { label: '旋转 ↑', fn: tryRotate },
          { label: '→', fn: () => tryMove(1, 0) },
          { label: '加速 ↓', fn: () => tryMove(0, 1) },
          { label: '暂存 C', fn: holdPiece },
          { label: '瞬降 Space', fn: hardDrop },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            disabled={gameOver}
            onPointerDown={(e) => {
              e.preventDefault();
              btn.fn();
            }}
            style={{
              padding: '7px 11px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.16)',
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#f8fafc',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              touchAction: 'none',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
