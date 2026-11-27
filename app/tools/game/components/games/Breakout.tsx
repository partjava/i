'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';
import { bounceOffBrick } from '../arcade-physics';

type DifficultyId = 'normal' | 'hard' | 'hell';
type BrickKind = 'normal' | 'armor' | 'tnt' | 'steel' | 'moving' | 'core';
type PowerUpType =
  | 'multiball'
  | 'wide'
  | 'laser'
  | 'fireball'
  | 'shield'
  | 'slow'
  | 'life'
  | 'shrink'
  | 'fast';

interface DifficultyConfig {
  id: DifficultyId;
  label: string;
  lives: number;
  paddleW: number;
  baseSpeed: number;
  speedPerLevel: number;
  scoreMult: number;
  dropChance: number;
  hazardWeight: number;
  armorBonus: number;
  moveSpeedMult: number;
  descendSec: number;
  accent: string;
}

const DIFFICULTIES: Record<DifficultyId, DifficultyConfig> = {
  normal: {
    id: 'normal',
    label: '标准',
    lives: 3,
    paddleW: 112,
    baseSpeed: 5.4,
    speedPerLevel: 0.36,
    scoreMult: 1.0,
    dropChance: 0.24,
    hazardWeight: 0,
    armorBonus: 0,
    moveSpeedMult: 1.0,
    descendSec: 0,
    accent: '#38bdf8',
  },
  hard: {
    id: 'hard',
    label: '困难',
    lives: 3,
    paddleW: 94,
    baseSpeed: 6.3,
    speedPerLevel: 0.42,
    scoreMult: 1.5,
    dropChance: 0.26,
    hazardWeight: 0.26,
    armorBonus: 0,
    moveSpeedMult: 1.35,
    descendSec: 0,
    accent: '#f59e0b',
  },
  hell: {
    id: 'hell',
    label: '地狱',
    lives: 2,
    paddleW: 80,
    baseSpeed: 7.2,
    speedPerLevel: 0.48,
    scoreMult: 2.2,
    dropChance: 0.28,
    hazardWeight: 0.36,
    armorBonus: 1,
    moveSpeedMult: 1.65,
    descendSec: 16,
    accent: '#f43f5e',
  },
};

interface LevelDef {
  id: number;
  name: string;
  subtitle: string;
  accent: string;
  rows: string[];
}

// 12 cols per row: '.' empty, '1' normal, '2' 2-HP armor, '3' 3-HP armor, 'T' TNT, 'S' steel, 'M' moving, 'C' boss core
const LEVELS: LevelDef[] = [
  {
    id: 1,
    name: '霓虹前哨',
    subtitle: '双层装甲脊与对称爆破点',
    accent: '#38bdf8',
    rows: [
      '111122221111',
      '11T111111T11',
      '111112211111',
      '111111111111',
      '.1111111111.',
      '..11111111..',
    ],
  },
  {
    id: 2,
    name: '双子要塞',
    subtitle: '钢壁中道掩护双翼弹药库',
    accent: '#34d399',
    rows: [
      '2222T..T2222',
      '1111S..S1111',
      '1221S..S1221',
      '1111S..S1111',
      '11T1....1T11',
      '.111....111.',
    ],
  },
  {
    id: 3,
    name: '菱形矩阵',
    subtitle: '连锁 TNT 核心与底部巡逻哨兵',
    accent: '#a78bfa',
    rows: [
      '.....33.....',
      '....2TT2....',
      '...213312...',
      '..11T22T11..',
      '...111111...',
      '..M......M..',
    ],
  },
  {
    id: 4,
    name: '钢铁走廊',
    subtitle: '两道重钢掩体与机动守门员',
    accent: '#60a5fa',
    rows: [
      '3311T..T1133',
      '221112211122',
      'SS.SSSSSS.SS',
      '111T1111T111',
      '.SS..MM..SS.',
      '.111....111.',
    ],
  },
  {
    id: 5,
    name: '蜂巢迷阵',
    subtitle: '交错高甲蜂室藏有高能炸药包',
    accent: '#fbbf24',
    rows: [
      '2.3.T22T.3.2',
      '.2.213312.2.',
      '2S21T22T12S2',
      '.1.211112.1.',
      '11S112211S11',
      '.1..1111..1.',
    ],
  },
  {
    id: 6,
    name: '移动防线',
    subtitle: '三道滑动能量护盾拱卫晶簇顶层',
    accent: '#2dd4bf',
    rows: [
      '3322T33T2233',
      '221122221122',
      '.M...MM...M.',
      '111T1111T111',
      '..M..SS..M..',
      '.11.M..M.11.',
    ],
  },
  {
    id: 7,
    name: '棱镜圣殿',
    subtitle: 'U型嵌套钢 Vault · 绕侧破阵或爆破突破',
    accent: '#f472b6',
    rows: [
      'S332T33T233S',
      'S2.212212.2S',
      'S2.T1331T.2S',
      'S2.111111.2S',
      'S..SSSSSS..S',
      '.M..1221..M.',
      '111......111',
    ],
  },
  {
    id: 8,
    name: '终极核心',
    subtitle: '三核旗舰要塞 · 击毁全部 BOSS 能量核心',
    accent: '#fb7185',
    rows: [
      'S3C3T33T3C3S',
      'S3332CC2333S',
      'SS2T2222T2SS',
      '.121S22S121.',
      '.M..1TT1..M.',
      '..M.1221.M..',
      '11..M..M..11',
    ],
  },
];

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface LaserBolt {
  x: number;
  y: number;
  vy: number;
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

interface Shockwave {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: string;
  alpha: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  vy: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: PowerUpType;
  color: string;
  label: string;
  isHazard?: boolean;
}

interface Brick {
  id: number;
  row: number;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: BrickKind;
  color: string;
  durability: number;
  maxDurability: number;
  indestructible?: boolean;
  vx?: number;
  minX?: number;
  maxX?: number;
  fireHitCooldown?: number;
}

const W = 680;
const H = 520;
const COLS = 12;
const PAD_X = 28;
const PAD_Y = 46;
const CELL_W = (W - PAD_X * 2) / COLS; // 52
const CELL_H = 24;
const PADDLE_Y = H - 42; // 478

const ROW_PALETTE = ['#ff4757', '#ff6b81', '#ffa502', '#2ed573', '#1e90ff', '#a855f7', '#38bdf8', '#f472b6'];

function formatSec(ticks: number): string {
  return `${Math.max(1, Math.ceil(ticks / 60))}s`;
}

export default function Breakout({
  onMove,
}: {
  state?: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [difficulty, setDifficulty] = useState<DifficultyId>('normal');
  const [stageIdx, setStageIdx] = useState(0); // 0..7
  const [loopCount, setLoopCount] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(DIFFICULTIES.normal.lives);
  const [combo, setCombo] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stageCleared, setStageCleared] = useState(false);
  const [allCleared, setAllCleared] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shieldOn, setShieldOn] = useState(false);
  const [descendCountdown, setDescendCountdown] = useState<number | null>(null);
  const [activeEffects, setActiveEffects] = useState<{ label: string; sec: number; color: string; hazard?: boolean }[]>([]);

  const runtime = useRef({
    difficulty: 'normal' as DifficultyId,
    stageIdx: 0,
    loopCount: 0,
    score: 0,
    lives: 3,
    combo: 0,
    launched: false,
    paused: false,
    stageCleared: false,
    allCleared: false,
    gameOver: false,
    wideTicks: 0,
    shrinkTicks: 0,
    laserTicks: 0,
    laserAutoCd: 0,
    laserManualCd: 0,
    fireballTicks: 0,
    slowTicks: 0,
    fastTicks: 0,
    shieldActive: false,
    descendTicks: 0,
    shakeTicks: 0,
    tickCounter: 0,
  });

  const keys = useRef({ left: false, right: false });
  const paddleRef = useRef({ x: (W - 112) / 2, y: PADDLE_Y, w: 112, h: 14, targetX: (W - 112) / 2 });
  const ballsRef = useRef<Ball[]>([]);
  const lasersRef = useRef<LaserBolt[]>([]);
  const bricksRef = useRef<Brick[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const floatTextsRef = useRef<FloatingText[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const trailsRef = useRef<{ x: number; y: number; alpha: number; color: string }[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const nextBrickIdRef = useRef(1);

  useEffect(() => {
    onMove('__local_state', {
      score,
      gameOver: gameOver || allCleared,
      won: allCleared,
    });
  }, [score, gameOver, allCleared, onMove]);

  const getTargetSpeed = useCallback((rt = runtime.current) => {
    const cfg = DIFFICULTIES[rt.difficulty];
    let speed = cfg.baseSpeed + rt.stageIdx * cfg.speedPerLevel + rt.loopCount * 0.7;
    if (rt.slowTicks > 0) speed *= 0.76;
    if (rt.fastTicks > 0) speed *= 1.22;
    return Math.min(11.5, Math.max(4.0, speed));
  }, []);

  const syncEffectBadges = useCallback(() => {
    const rt = runtime.current;
    const list: { label: string; sec: number; color: string; hazard?: boolean }[] = [];
    if (rt.wideTicks > 0) list.push({ label: '加长拍', sec: Math.ceil(rt.wideTicks / 60), color: '#2ed573' });
    if (rt.laserTicks > 0) list.push({ label: '双激光', sec: Math.ceil(rt.laserTicks / 60), color: '#00d2ff' });
    if (rt.fireballTicks > 0) list.push({ label: '贯穿火球', sec: Math.ceil(rt.fireballTicks / 60), color: '#ff7f50' });
    if (rt.slowTicks > 0) list.push({ label: '缓速', sec: Math.ceil(rt.slowTicks / 60), color: '#38bdf8' });
    if (rt.shrinkTicks > 0) list.push({ label: '缩拍', sec: Math.ceil(rt.shrinkTicks / 60), color: '#fb7185', hazard: true });
    if (rt.fastTicks > 0) list.push({ label: '狂暴加速', sec: Math.ceil(rt.fastTicks / 60), color: '#fbbf24', hazard: true });
    setActiveEffects(list);
    setShieldOn(rt.shieldActive);
    const cfg = DIFFICULTIES[rt.difficulty];
    if (cfg.descendSec > 0 && rt.stageIdx >= 2) {
      setDescendCountdown(Math.max(1, Math.ceil((cfg.descendSec * 60 - rt.descendTicks) / 60)));
    } else {
      setDescendCountdown(null);
    }
  }, []);

  const buildStageBricks = useCallback((sIdx: number, diffId: DifficultyId, loop: number) => {
    const level = LEVELS[sIdx % LEVELS.length];
    const cfg = DIFFICULTIES[diffId];
    const extraArmor = cfg.armorBonus + loop;
    const list: Brick[] = [];

    level.rows.forEach((rowStr, r) => {
      for (let c = 0; c < Math.min(COLS, rowStr.length); c++) {
        const ch = rowStr[c];
        if (ch === '.' || ch === ' ') continue;

        const x = PAD_X + c * CELL_W + 2;
        const y = PAD_Y + r * CELL_H + 2;
        const w = CELL_W - 4;
        const h = CELL_H - 4;
        let kind: BrickKind = 'normal';
        let durability = 1;
        let color = ROW_PALETTE[r % ROW_PALETTE.length];
        let indestructible = false;
        let vx = 0;

        if (ch === '1') {
          const promote = diffId === 'hard' && ((r + c + sIdx) % 4 === 0);
          kind = promote ? 'armor' : 'normal';
          durability = (promote ? 2 : 1) + extraArmor;
        } else if (ch === '2') {
          kind = 'armor';
          durability = 2 + extraArmor;
        } else if (ch === '3') {
          kind = 'armor';
          durability = 3 + extraArmor;
          color = '#94a3b8';
        } else if (ch === 'T') {
          kind = 'tnt';
          durability = 1 + (diffId === 'hell' ? 1 : 0);
          color = '#f97316';
        } else if (ch === 'S') {
          kind = 'steel';
          durability = 999;
          indestructible = true;
          color = '#64748b';
        } else if (ch === 'M') {
          kind = 'moving';
          durability = 2 + extraArmor;
          color = '#06b6d4';
          vx = (c < COLS / 2 ? 1.35 : -1.35) * cfg.moveSpeedMult;
        } else if (ch === 'C') {
          kind = 'core';
          durability = 4 + (diffId === 'hell' ? 2 : 0) + loop;
          color = '#ec4899';
        }

        if (!indestructible) {
          durability = kind === 'core' ? Math.min(8, durability) : Math.min(4, durability);
        }

        list.push({
          id: nextBrickIdRef.current++,
          row: r,
          x,
          y,
          w,
          h,
          kind,
          color,
          durability,
          maxDurability: durability,
          indestructible,
          vx,
          minX: PAD_X + 2,
          maxX: W - PAD_X - w - 2,
          fireHitCooldown: 0,
        });
      }
    });

    // Refine moving brick patrol bounds so they don't overlap stationary bricks initially
    for (const b of list) {
      if (b.kind !== 'moving') continue;
      let minX = PAD_X + 2;
      let maxX = W - PAD_X - b.w - 2;
      for (const other of list) {
        if (other.id === b.id || other.row !== b.row || other.kind === 'moving') continue;
        if (other.x + other.w <= b.x) {
          minX = Math.max(minX, other.x + other.w + 4);
        } else if (other.x >= b.x + b.w) {
          maxX = Math.min(maxX, other.x - b.w - 4);
        }
      }
      b.minX = minX;
      b.maxX = Math.max(minX, maxX);
    }

    return list;
  }, []);

  const resetEffects = useCallback(() => {
    const rt = runtime.current;
    rt.wideTicks = 0;
    rt.shrinkTicks = 0;
    rt.laserTicks = 0;
    rt.laserAutoCd = 0;
    rt.laserManualCd = 0;
    rt.fireballTicks = 0;
    rt.slowTicks = 0;
    rt.fastTicks = 0;
    rt.shieldActive = false;
    rt.descendTicks = 0;
    rt.shakeTicks = 0;
    rt.combo = 0;
    setCombo(0);
    syncEffectBadges();
  }, [syncEffectBadges]);

  const loadStage = useCallback(
    (
      nextStageIdx: number,
      nextDiff: DifficultyId,
      opts?: { resetScore?: boolean; resetLives?: boolean; nextLoop?: number }
    ) => {
      const cfg = DIFFICULTIES[nextDiff];
      const nextLoop = opts?.nextLoop ?? runtime.current.loopCount;
      const nextLives = opts?.resetLives ? cfg.lives : runtime.current.lives;
      const nextScore = opts?.resetScore ? 0 : runtime.current.score;

      runtime.current.difficulty = nextDiff;
      runtime.current.stageIdx = nextStageIdx;
      runtime.current.loopCount = nextLoop;
      runtime.current.score = nextScore;
      runtime.current.lives = nextLives;
      runtime.current.launched = false;
      runtime.current.paused = false;
      runtime.current.stageCleared = false;
      runtime.current.allCleared = false;
      runtime.current.gameOver = false;

      resetEffects();

      bricksRef.current = buildStageBricks(nextStageIdx, nextDiff, nextLoop);
      paddleRef.current = {
        x: (W - cfg.paddleW) / 2,
        y: PADDLE_Y,
        w: cfg.paddleW,
        h: 14,
        targetX: (W - cfg.paddleW) / 2,
      };
      const spd = getTargetSpeed(runtime.current);
      const vx = spd * 0.56;
      const vy = -Math.sqrt(Math.max(1, spd * spd - vx * vx));
      ballsRef.current = [{ x: W / 2, y: PADDLE_Y - 9, vx, vy, radius: 7 }];
      lasersRef.current = [];
      particlesRef.current = [];
      shockwavesRef.current = [];
      floatTextsRef.current = [];
      powerUpsRef.current = [];
      trailsRef.current = [];

      setDifficulty(nextDiff);
      setStageIdx(nextStageIdx);
      setLoopCount(nextLoop);
      setScore(nextScore);
      setLives(nextLives);
      setLaunched(false);
      setPaused(false);
      setStageCleared(false);
      setAllCleared(false);
      setGameOver(false);
    },
    [buildStageBricks, getTargetSpeed, resetEffects]
  );

  useEffect(() => {
    loadStage(0, 'normal', { resetScore: true, resetLives: true, nextLoop: 0 });
  }, [loadStage]);

  const handleSelectDifficulty = (nextDiff: DifficultyId) => {
    loadStage(0, nextDiff, { resetScore: true, resetLives: true, nextLoop: 0 });
    soundSynth.playKey();
  };

  const handleJumpStage = (delta: number) => {
    const nextIdx = (stageIdx + delta + LEVELS.length) % LEVELS.length;
    loadStage(nextIdx, difficulty, { resetScore: true, resetLives: true, nextLoop: 0 });
    soundSynth.playKey();
  };

  const handleRestartAll = () => {
    loadStage(0, difficulty, { resetScore: true, resetLives: true, nextLoop: 0 });
  };

  const handleRetryCurrentStage = () => {
    loadStage(stageIdx, difficulty, { resetScore: false, resetLives: true, nextLoop: loopCount });
  };

  const handleNextStage = useCallback(() => {
    const rt = runtime.current;
    if (rt.stageIdx + 1 < LEVELS.length) {
      loadStage(rt.stageIdx + 1, rt.difficulty, { resetScore: false, resetLives: false, nextLoop: rt.loopCount });
    } else {
      loadStage(0, rt.difficulty, { resetScore: false, resetLives: false, nextLoop: rt.loopCount + 1 });
    }
    soundSynth.playPop();
  }, [loadStage]);

  const spawnParticles = (x: number, y: number, color: string, count = 10) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 4.2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        size: 2 + Math.random() * 3,
      });
    }
  };

  const addFloatText = (x: number, y: number, text: string, color: string) => {
    floatTextsRef.current.push({ x, y, text, color, alpha: 1, vy: -0.9 });
  };

  const fireDualLasers = useCallback(() => {
    const p = paddleRef.current;
    lasersRef.current.push(
      { x: p.x + 8, y: p.y - 6, vy: -11 },
      { x: p.x + p.w - 8, y: p.y - 6, vy: -11 }
    );
    soundSynth.playMove();
  }, []);

  const launchOrFire = useCallback(() => {
    const rt = runtime.current;
    if (rt.gameOver || rt.allCleared || rt.paused) return;
    if (rt.stageCleared) {
      handleNextStage();
      return;
    }
    if (!rt.launched) {
      rt.launched = true;
      setLaunched(true);
      soundSynth.playPop();
      return;
    }
    if (rt.laserTicks > 0 && rt.laserManualCd <= 0) {
      rt.laserManualCd = 14;
      fireDualLasers();
    }
  }, [fireDualLasers, handleNextStage]);

  const togglePause = useCallback(() => {
    const rt = runtime.current;
    if (rt.gameOver || rt.stageCleared || rt.allCleared) return;
    rt.paused = !rt.paused;
    setPaused(rt.paused);
    soundSynth.playKey();
  }, []);

  useEffect(() => {
    const release = () => {
      keys.current = { left: false, right: false };
    };
    const down = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))
      ) {
        return;
      }
      if (['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD', 'Space'].includes(event.code)) {
        event.preventDefault();
      }
      if (['ArrowLeft', 'KeyA'].includes(event.code)) keys.current.left = true;
      if (['ArrowRight', 'KeyD'].includes(event.code)) keys.current.right = true;
      if (event.code === 'Space' && !event.repeat) launchOrFire();
      if (event.code === 'KeyP' && !event.repeat) togglePause();
    };
    const up = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(event.code)) keys.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(event.code)) keys.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', release);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', release);
    };
  }, [launchOrFire, togglePause]);

  // 主物理与渲染循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const damageBrick = (brick: Brick, dmg: number, fromTnt = false) => {
      if (brick.durability <= 0 || brick.indestructible) return;
      brick.durability -= dmg;
      const cx = brick.x + brick.w / 2;
      const cy = brick.y + brick.h / 2;
      const rt = runtime.current;
      const cfg = DIFFICULTIES[rt.difficulty];

      if (brick.durability <= 0) {
        brick.durability = 0;
        soundSynth.playShatter();
        spawnParticles(cx, cy, brick.color, brick.kind === 'core' ? 24 : 12);

        rt.combo += 1;
        setCombo(rt.combo);
        const comboMult = 1 + Math.min(4, Math.floor(rt.combo / 3));
        const basePts = brick.kind === 'core' ? 120 : brick.kind === 'armor' ? 35 : brick.kind === 'moving' ? 45 : 20;
        const fastBonus = rt.fastTicks > 0 ? 1.25 : 1.0;
        const pts = Math.round(basePts * cfg.scoreMult * comboMult * fastBonus);
        rt.score += pts;
        setScore(rt.score);
        addFloatText(cx, cy - 4, comboMult > 1 ? `+${pts} ×${comboMult}` : `+${pts}`, brick.kind === 'core' ? '#f472b6' : '#fde047');

        if (brick.kind === 'tnt') {
          rt.shakeTicks = 12;
          shockwavesRef.current.push({ x: cx, y: cy, r: 10, maxR: 102, color: '#fb923c', alpha: 0.95 });
          addFloatText(cx, cy - 16, 'BOOM!', '#fb923c');
          for (const other of bricksRef.current) {
            if (other.id === brick.id || other.durability <= 0 || other.indestructible) continue;
            const ox = other.x + other.w / 2;
            const oy = other.y + other.h / 2;
            if (Math.hypot(ox - cx, oy - cy) <= 98) {
              damageBrick(other, 2, true);
            }
          }
        }

        // 道具/减益掉落判定
        if (!fromTnt && Math.random() < cfg.dropChance) {
          const isHazard = cfg.hazardWeight > 0 && Math.random() < cfg.hazardWeight;
          if (isHazard) {
            const hazardType: PowerUpType = Math.random() < 0.5 ? 'shrink' : 'fast';
            powerUpsRef.current.push({
              x: cx,
              y: cy,
              type: hazardType,
              color: hazardType === 'shrink' ? '#be123c' : '#d97706',
              label: hazardType === 'shrink' ? '⚠缩拍' : '⚠狂暴',
              isHazard: true,
            });
          } else {
            const pool: { type: PowerUpType; color: string; label: string; w: number }[] = [
              { type: 'multiball', color: '#ff4757', label: '分裂', w: 25 },
              { type: 'wide', color: '#2ed573', label: '加长', w: 22 },
              { type: 'laser', color: '#00d2ff', label: '激光', w: 18 },
              { type: 'fireball', color: '#ff7f50', label: '火球', w: 14 },
              { type: 'shield', color: '#a855f7', label: '护盾', w: 12 },
              { type: 'slow', color: '#38bdf8', label: '缓速', w: 9 },
            ];
            if (rt.lives < 4) pool.push({ type: 'life', color: '#f43f5e', label: '+1命', w: 6 });
            const totalW = pool.reduce((acc, p) => acc + p.w, 0);
            let roll = Math.random() * totalW;
            let chosen = pool[0];
            for (const item of pool) {
              roll -= item.w;
              if (roll <= 0) {
                chosen = item;
                break;
              }
            }
            powerUpsRef.current.push({
              x: cx,
              y: cy,
              type: chosen.type,
              color: chosen.color,
              label: chosen.label,
            });
          }
        }
      } else {
        soundSynth.playClack();
        spawnParticles(cx, cy, '#ffffff', 5);
        rt.score += Math.round(10 * cfg.scoreMult);
        setScore(rt.score);
      }
    };

    const normalizeBallVelocity = (ball: Ball, targetSpeed: number) => {
      const mag = Math.hypot(ball.vx, ball.vy) || 1;
      ball.vx = (ball.vx / mag) * targetSpeed;
      ball.vy = (ball.vy / mag) * targetSpeed;
      const minVy = targetSpeed * 0.24;
      if (Math.abs(ball.vy) < minVy) {
        const signY = ball.y < 140 ? 1 : ball.vy >= 0 ? 1 : -1;
        ball.vy = signY * minVy;
        const remain = Math.sqrt(Math.max(0.25, targetSpeed * targetSpeed - ball.vy * ball.vy));
        ball.vx = (ball.vx >= 0 ? 1 : -1) * remain;
      }
    };

    const step = () => {
      const rt = runtime.current;
      const cfg = DIFFICULTIES[rt.difficulty];
      const level = LEVELS[rt.stageIdx % LEVELS.length];
      const paddle = paddleRef.current;

      if (!rt.paused && !rt.gameOver && !rt.stageCleared && !rt.allCleared) {
        rt.tickCounter += 1;

        // 动态球拍宽度
        const desiredW =
          cfg.paddleW +
          (rt.wideTicks > 0 ? 40 : 0) -
          (rt.shrinkTicks > 0 ? 24 : 0);
        const clampedW = Math.max(56, Math.min(176, desiredW));
        if (Math.abs(paddle.w - clampedW) > 0.5) {
          const center = paddle.x + paddle.w / 2;
          paddle.w += (clampedW - paddle.w) * 0.2;
          paddle.x = Math.max(0, Math.min(W - paddle.w, center - paddle.w / 2));
        }

        // 键盘 & 平滑跟随
        if (keys.current.left) paddle.targetX -= 9;
        if (keys.current.right) paddle.targetX += 9;
        paddle.targetX = Math.max(0, Math.min(W - paddle.w, paddle.targetX));
        paddle.x += (paddle.targetX - paddle.x) * 0.28;

        // 衰减状态计时
        let badgeDirty = rt.tickCounter % 15 === 0;
        if (rt.wideTicks > 0) rt.wideTicks--;
        if (rt.shrinkTicks > 0) rt.shrinkTicks--;
        if (rt.laserTicks > 0) rt.laserTicks--;
        if (rt.laserAutoCd > 0) rt.laserAutoCd--;
        if (rt.laserManualCd > 0) rt.laserManualCd--;
        if (rt.fireballTicks > 0) rt.fireballTicks--;
        if (rt.slowTicks > 0) rt.slowTicks--;
        if (rt.fastTicks > 0) rt.fastTicks--;
        if (rt.shakeTicks > 0) rt.shakeTicks--;

        // 激光自动双发
        if (rt.launched && rt.laserTicks > 0 && rt.laserAutoCd <= 0) {
          rt.laserAutoCd = 18;
          fireDualLasers();
        }

        // 地狱难度压境机制（第3关起每16秒整体下压14px）
        if (rt.launched && cfg.descendSec > 0 && rt.stageIdx >= 2) {
          rt.descendTicks += 1;
          if (rt.descendTicks >= cfg.descendSec * 60) {
            rt.descendTicks = 0;
            badgeDirty = true;
            rt.shakeTicks = 8;
            addFloatText(W / 2, 34, '⚠ 砖阵压境下移！', '#fb7185');
            let breached = false;
            for (const b of bricksRef.current) {
              if (b.durability <= 0) continue;
              b.y += 14;
              if (!b.indestructible && b.y + b.h >= PADDLE_Y - 24) {
                breached = true;
              }
            }
            if (breached) {
              rt.gameOver = true;
              setGameOver(true);
              soundSynth.playGameOver();
            }
          }
        }

        if (badgeDirty) syncEffectBadges();

        // 移动砖块更新
        for (const b of bricksRef.current) {
          if (b.fireHitCooldown && b.fireHitCooldown > 0) b.fireHitCooldown--;
          if (b.durability <= 0 || b.kind !== 'moving' || !b.vx) continue;
          b.x += b.vx;
          const minX = b.minX ?? PAD_X + 2;
          const maxX = b.maxX ?? W - PAD_X - b.w - 2;
          if (b.x <= minX) {
            b.x = minX;
            b.vx = Math.abs(b.vx);
          } else if (b.x >= maxX) {
            b.x = maxX;
            b.vx = -Math.abs(b.vx);
          }
        }

        // 激光弹道更新
        for (let i = lasersRef.current.length - 1; i >= 0; i--) {
          const bolt = lasersRef.current[i];
          bolt.y += bolt.vy;
          if (bolt.y < -12) {
            lasersRef.current.splice(i, 1);
            continue;
          }
          let consumed = false;
          for (const b of bricksRef.current) {
            if (b.durability <= 0) continue;
            if (bolt.x >= b.x && bolt.x <= b.x + b.w && bolt.y >= b.y && bolt.y <= b.y + b.h) {
              if (b.indestructible) {
                spawnParticles(bolt.x, bolt.y, '#94a3b8', 4);
              } else {
                damageBrick(b, 1);
              }
              consumed = true;
              break;
            }
          }
          if (consumed) lasersRef.current.splice(i, 1);
        }

        // 掉落胶囊更新
        for (let i = powerUpsRef.current.length - 1; i >= 0; i--) {
          const pup = powerUpsRef.current[i];
          pup.y += 2.6;
          if (
            pup.y + 9 >= paddle.y &&
            pup.y - 9 <= paddle.y + paddle.h &&
            pup.x + 18 >= paddle.x &&
            pup.x - 18 <= paddle.x + paddle.w
          ) {
            if (pup.isHazard) {
              soundSynth.playGameOver();
            } else {
              soundSynth.playScore();
            }
            const targetSpeed = getTargetSpeed(rt);
            if (pup.type === 'multiball') {
              const additions: Ball[] = [];
              ballsRef.current.forEach(b => {
                additions.push(
                  { x: b.x, y: b.y, vx: b.vx * 0.8 + 2.2, vy: -Math.abs(b.vy) - 0.5, radius: b.radius },
                  { x: b.x, y: b.y, vx: b.vx * 0.8 - 2.2, vy: -Math.abs(b.vy) - 0.5, radius: b.radius }
                );
              });
              additions.forEach(nb => normalizeBallVelocity(nb, targetSpeed));
              ballsRef.current.push(...additions.slice(0, Math.max(0, 8 - ballsRef.current.length)));
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '多球分裂!', '#ff6b81');
            } else if (pup.type === 'wide') {
              rt.wideTicks = 14 * 60;
              rt.shrinkTicks = 0;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '加长球拍 14s', '#2ed573');
            } else if (pup.type === 'laser') {
              rt.laserTicks = 10 * 60;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '双管激光上线!', '#00d2ff');
            } else if (pup.type === 'fireball') {
              rt.fireballTicks = 8 * 60;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '烈焰贯穿 8s', '#ff7f50');
            } else if (pup.type === 'shield') {
              rt.shieldActive = true;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '能量护盾就绪', '#c084fc');
            } else if (pup.type === 'slow') {
              rt.slowTicks = 9 * 60;
              rt.fastTicks = 0;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '时间缓速', '#38bdf8');
            } else if (pup.type === 'life') {
              rt.lives = Math.min(4, rt.lives + 1);
              setLives(rt.lives);
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '生命 +1 ❤️', '#f43f5e');
            } else if (pup.type === 'shrink') {
              rt.shrinkTicks = 10 * 60;
              rt.wideTicks = 0;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '⚠ 球拍缩短!', '#fb7185');
            } else if (pup.type === 'fast') {
              rt.fastTicks = 8 * 60;
              rt.slowTicks = 0;
              addFloatText(paddle.x + paddle.w / 2, paddle.y - 18, '⚠ 狂暴加速 +25%分', '#fbbf24');
            }
            syncEffectBadges();
            powerUpsRef.current.splice(i, 1);
            continue;
          }
          if (pup.y > H + 20) powerUpsRef.current.splice(i, 1);
        }

        // 小球物理与子步碰撞
        const balls = ballsRef.current;
        const targetSpeed = getTargetSpeed(rt);
        const subSteps = targetSpeed > 6 ? 2 : 1;

        for (let i = balls.length - 1; i >= 0; i--) {
          const ball = balls[i];
          if (!rt.launched) {
            ball.x = paddle.x + paddle.w / 2;
            ball.y = paddle.y - ball.radius - 2;
            continue;
          }

          normalizeBallVelocity(ball, targetSpeed);

          if (rt.tickCounter % 2 === 0) {
            trailsRef.current.push({
              x: ball.x,
              y: ball.y,
              alpha: 0.45,
              color: rt.fireballTicks > 0 ? '#ff7f50' : '#93c5fd',
            });
          }

          let removed = false;
          for (let s = 0; s < subSteps; s++) {
            ball.x += ball.vx / subSteps;
            ball.y += ball.vy / subSteps;

            // 左右墙
            if (ball.x - ball.radius <= 0) {
              ball.x = ball.radius;
              ball.vx = Math.abs(ball.vx);
              soundSynth.playPop();
            } else if (ball.x + ball.radius >= W) {
              ball.x = W - ball.radius;
              ball.vx = -Math.abs(ball.vx);
              soundSynth.playPop();
            }

            // 顶墙
            if (ball.y - ball.radius <= 0) {
              ball.y = ball.radius;
              ball.vy = Math.abs(ball.vy);
              soundSynth.playPop();
            }

            // 底部能量护盾拦截
            if (rt.shieldActive && ball.vy > 0 && ball.y + ball.radius >= H - 10) {
              rt.shieldActive = false;
              setShieldOn(false);
              ball.y = H - 10 - ball.radius;
              ball.vy = -Math.abs(ball.vy);
              normalizeBallVelocity(ball, targetSpeed);
              spawnParticles(ball.x, H - 10, '#c084fc', 16);
              addFloatText(ball.x, H - 24, '护盾拦截!', '#c084fc');
              soundSynth.playScore();
            }

            // 球拍反弹
            if (
              ball.vy > 0 &&
              ball.y + ball.radius >= paddle.y &&
              ball.y - ball.radius <= paddle.y + paddle.h &&
              ball.x + ball.radius * 0.4 >= paddle.x &&
              ball.x - ball.radius * 0.4 <= paddle.x + paddle.w
            ) {
              const hitPos = Math.max(-0.98, Math.min(0.98, (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)));
              const maxAngle = (70 * Math.PI) / 180;
              const newAngle = hitPos * maxAngle;
              ball.vx = targetSpeed * Math.sin(newAngle);
              ball.vy = -Math.abs(targetSpeed * Math.cos(newAngle));
              ball.y = paddle.y - ball.radius - 1;
              normalizeBallVelocity(ball, targetSpeed);
              rt.combo = 0;
              setCombo(0);
              soundSynth.playPop();
            }

            // 砖块碰撞
            for (const brick of bricksRef.current) {
              if (brick.durability <= 0) continue;

              if (rt.fireballTicks > 0 && !brick.indestructible) {
                const nearestX = Math.max(brick.x, Math.min(brick.x + brick.w, ball.x));
                const nearestY = Math.max(brick.y, Math.min(brick.y + brick.h, ball.y));
                if (Math.hypot(ball.x - nearestX, ball.y - nearestY) < ball.radius) {
                  if (!brick.fireHitCooldown) {
                    brick.fireHitCooldown = 10;
                    damageBrick(brick, 2);
                  }
                }
              } else if (bounceOffBrick(ball, brick)) {
                normalizeBallVelocity(ball, targetSpeed);
                if (brick.indestructible) {
                  spawnParticles(ball.x, ball.y, '#94a3b8', 4);
                  soundSynth.playClack();
                } else {
                  damageBrick(brick, 1);
                }
                break;
              }
            }

            if (ball.y - ball.radius > H) {
              balls.splice(i, 1);
              removed = true;
              break;
            }
          }
          if (removed) continue;
        }

        // 所有球掉落惩罚
        if (rt.launched && balls.length === 0 && !rt.gameOver && !rt.stageCleared && !rt.allCleared) {
          rt.launched = false;
          setLaunched(false);
          resetEffects();
          const nextLives = rt.lives - 1;
          rt.lives = nextLives;
          setLives(nextLives);
          if (nextLives <= 0) {
            rt.gameOver = true;
            setGameOver(true);
            soundSynth.playGameOver();
          } else {
            const spd = getTargetSpeed(rt);
            const vx = spd * 0.56;
            const vy = -Math.sqrt(Math.max(1, spd * spd - vx * vx));
            ballsRef.current = [{ x: paddle.x + paddle.w / 2, y: PADDLE_Y - 9, vx, vy, radius: 7 }];
            soundSynth.playPop();
          }
        }

        // 过关判定（只统计可破坏砖块）
        const remainBreakable = bricksRef.current.some(b => b.durability > 0 && !b.indestructible);
        if (!remainBreakable && !rt.stageCleared && !rt.allCleared && !rt.gameOver) {
          rt.launched = false;
          setLaunched(false);
          const clearBonus = Math.round((200 + rt.stageIdx * 80 + rt.lives * 50) * cfg.scoreMult);
          rt.score += clearBonus;
          setScore(rt.score);
          soundSynth.playWin();
          if (rt.stageIdx === LEVELS.length - 1 && rt.loopCount === 0) {
            rt.allCleared = true;
            setAllCleared(true);
          } else {
            rt.stageCleared = true;
            setStageCleared(true);
          }
        }
      }

      // === 开始绘制 ===
      ctx.save();
      if (rt.shakeTicks > 0) {
        const mag = rt.shakeTicks * 0.45;
        ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
      }

      // 深空微网格背景
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#0b1020');
      bgGrad.addColorStop(1, '#04060d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.045)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // 顶部关卡微光氛围条
      ctx.fillStyle = level.accent;
      ctx.globalAlpha = 0.08;
      ctx.fillRect(0, 0, W, 38);
      ctx.globalAlpha = 1;

      // 地狱第3关起危险压境线
      if (cfg.descendSec > 0 && rt.stageIdx >= 2) {
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
        ctx.beginPath();
        ctx.moveTo(16, PADDLE_Y - 24);
        ctx.lineTo(W - 16, PADDLE_Y - 24);
        ctx.stroke();
        ctx.restore();
      }

      // 移动砖块轨道提示
      for (const b of bricksRef.current) {
        if (b.durability <= 0 || b.kind !== 'moving') continue;
        const minX = b.minX ?? PAD_X + 2;
        const maxX = (b.maxX ?? W - PAD_X - b.w - 2) + b.w;
        ctx.save();
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(minX + 6, b.y + b.h / 2);
        ctx.lineTo(maxX - 6, b.y + b.h / 2);
        ctx.stroke();
        ctx.restore();
      }

      // 绘制砖块
      for (const b of bricksRef.current) {
        if (b.durability <= 0) continue;
        ctx.save();
        if (b.kind === 'steel') {
          const sg = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
          sg.addColorStop(0, '#64748b');
          sg.addColorStop(1, '#334155');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 4);
          ctx.fill();
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
          ctx.stroke();
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(b.x + 4, b.y + 4, 3, 3);
          ctx.fillRect(b.x + b.w - 7, b.y + 4, 3, 3);
          ctx.fillRect(b.x + 4, b.y + b.h - 7, 3, 3);
          ctx.fillRect(b.x + b.w - 7, b.y + b.h - 7, 3, 3);
        } else {
          if (b.kind === 'core') {
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 12;
          } else if (b.kind === 'tnt') {
            ctx.shadowColor = '#f97316';
            ctx.shadowBlur = 8;
          }
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 4);
          ctx.fill();

          ctx.strokeStyle =
            b.kind === 'armor' || b.kind === 'core' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)';
          ctx.lineWidth = b.kind === 'armor' || b.kind === 'core' ? 1.5 : 1;
          ctx.stroke();

          if (b.kind === 'tnt') {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('TNT', b.x + b.w / 2, b.y + b.h / 2 + 0.5);
          } else if (b.kind === 'core') {
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`核 ${b.durability}`, b.x + b.w / 2, b.y + b.h / 2 + 0.5);
          } else if (b.kind === 'moving') {
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            ctx.fillRect(b.x + b.w / 2 - 7, b.y + b.h / 2 - 1.5, 14, 3);
          }

          // 多血量裂纹与点位提示
          if (b.maxDurability > 1 && b.durability < b.maxDurability && b.kind !== 'core') {
            ctx.strokeStyle = 'rgba(15, 23, 42, 0.72)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(b.x + 8, b.y + 3);
            ctx.lineTo(b.x + b.w * 0.45, b.y + b.h * 0.58);
            ctx.lineTo(b.x + b.w - 8, b.y + b.h - 4);
            ctx.stroke();
          }
          if (b.kind === 'armor' && b.durability > 1) {
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            for (let d = 0; d < b.durability; d++) {
              ctx.beginPath();
              ctx.arc(b.x + b.w / 2 + (d - (b.durability - 1) / 2) * 7, b.y + b.h - 4, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.restore();
      }

      // 底部能量护盾线
      if (rt.shieldActive) {
        ctx.save();
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 12;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(12, H - 8);
        ctx.lineTo(W - 12, H - 8);
        ctx.stroke();
        ctx.restore();
      }

      // 爆炸冲击波圆环
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.r += 5.5;
        sw.alpha -= 0.055;
        if (sw.alpha <= 0 || sw.r >= sw.maxR) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = sw.alpha;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 激光弹束
      for (const bolt of lasersRef.current) {
        ctx.save();
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(bolt.x - 1.8, bolt.y - 10, 3.6, 12);
        ctx.restore();
      }

      // 粒子碎片
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.14;
        p.alpha -= 0.032;
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

      // 尾迹
      for (let i = trailsRef.current.length - 1; i >= 0; i--) {
        const t = trailsRef.current[i];
        t.alpha -= 0.055;
        if (t.alpha <= 0) {
          trailsRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = t.alpha * 0.55;
          ctx.fillStyle = t.color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 掉落道具胶囊
      for (const pup of powerUpsRef.current) {
        ctx.save();
        ctx.shadowColor = pup.color;
        ctx.shadowBlur = 9;
        ctx.fillStyle = pup.isHazard ? '#1e1018' : pup.color;
        ctx.beginPath();
        ctx.roundRect(pup.x - 20, pup.y - 9, 40, 18, 9);
        ctx.fill();
        if (pup.isHazard) {
          ctx.strokeStyle = pup.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.fillStyle = pup.isHazard ? '#fda4af' : '#fff';
        ctx.font = 'bold 9.5px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pup.label, pup.x, pup.y + 0.5);
        ctx.restore();
      }

      // 球拍绘制（含激光双翼炮台）
      ctx.save();
      ctx.shadowColor = rt.laserTicks > 0 ? '#00d2ff' : rt.shrinkTicks > 0 ? '#f43f5e' : '#4f8cff';
      ctx.shadowBlur = 12;
      const pGrad = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.h);
      if (rt.shrinkTicks > 0) {
        pGrad.addColorStop(0, '#fb7185');
        pGrad.addColorStop(1, '#be123c');
      } else if (rt.laserTicks > 0) {
        pGrad.addColorStop(0, '#22d3ee');
        pGrad.addColorStop(1, '#0284c7');
      } else {
        pGrad.addColorStop(0, '#60a5fa');
        pGrad.addColorStop(1, '#2563eb');
      }
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 7);
      ctx.fill();

      if (rt.laserTicks > 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(paddle.x + 5, paddle.y - 6, 5, 7);
        ctx.fillRect(paddle.x + paddle.w - 10, paddle.y - 6, 5, 7);
      }
      ctx.restore();

      // 小球绘制
      for (const ball of ballsRef.current) {
        ctx.save();
        const isFire = rt.fireballTicks > 0;
        ctx.shadowColor = isFire ? '#ff7f50' : '#ffffff';
        ctx.shadowBlur = isFire ? 16 : 10;
        ctx.fillStyle = isFire ? '#fed7aa' : '#ffffff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        if (isFire) {
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 浮动得分文字
      for (let i = floatTextsRef.current.length - 1; i >= 0; i--) {
        const ft = floatTextsRef.current[i];
        ft.y += ft.vy;
        ft.alpha -= 0.024;
        if (ft.alpha <= 0) {
          floatTextsRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = ft.alpha;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
      }

      ctx.restore();
    };

    let prev = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      animFrameRef.current = requestAnimationFrame(loop);
      if (document.hidden) {
        prev = now;
        acc = 0;
        return;
      }
      acc += Math.min(66.67, now - prev);
      prev = now;
      while (acc >= 1000 / 60) {
        step();
        acc -= 1000 / 60;
      }
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [fireDualLasers, getTargetSpeed, resetEffects, syncEffectBadges]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * W) / rect.width;
    const p = paddleRef.current;
    p.targetX = Math.max(0, Math.min(W - p.w, x - p.w / 2));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) * W) / rect.width;
    const p = paddleRef.current;
    p.targetX = Math.max(0, Math.min(W - p.w, x - p.w / 2));
  };

  const currentLevel = LEVELS[stageIdx % LEVELS.length];
  const cfg = DIFFICULTIES[difficulty];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'min(100%, 720px)', userSelect: 'none' }}>
      {/* 第一行：难度 + 关卡切换 + 暂停重开 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          marginBottom: 6,
          padding: '8px 12px',
          background: '#131a29',
          border: '1px solid rgba(148, 163, 184, 0.14)',
          borderRadius: 10,
          fontSize: 12,
        }}
      >
        {/* 难度选择 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {(['normal', 'hard', 'hell'] as DifficultyId[]).map(dId => {
            const d = DIFFICULTIES[dId];
            const active = difficulty === dId;
            return (
              <button
                key={dId}
                onClick={() => handleSelectDifficulty(dId)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: active ? `1px solid ${d.accent}` : '1px solid rgba(148,163,184,0.18)',
                  background: active ? `${d.accent}24` : 'rgba(30, 41, 59, 0.7)',
                  color: active ? d.accent : '#cbd5e1',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* 关卡切换 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            aria-label="上一关"
            onClick={() => handleJumpStage(-1)}
            style={{
              padding: '3px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148,163,184,0.2)',
              background: '#1e293b',
              color: '#e2e8f0',
              cursor: 'pointer',
            }}
          >
            ◀
          </button>
          <span style={{ color: '#f8fafc', fontWeight: 700, minWidth: 132, textAlign: 'center' }}>
            {loopCount > 0 ? `周目${loopCount + 1} · ` : ''}第 {stageIdx + 1}/{LEVELS.length} 关 · {currentLevel.name}
          </span>
          <button
            aria-label="下一关"
            onClick={() => handleJumpStage(1)}
            style={{
              padding: '3px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148,163,184,0.2)',
              background: '#1e293b',
              color: '#e2e8f0',
              cursor: 'pointer',
            }}
          >
            ▶
          </button>
        </div>

        {/* 暂停与重开 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={togglePause}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid rgba(148,163,184,0.2)',
              background: paused ? '#f59e0b' : '#1e293b',
              color: paused ? '#0f172a' : '#e2e8f0',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {paused ? '▶ 继续' : '⏸ 暂停'}
          </button>
          <button
            onClick={handleRestartAll}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: 'none',
              background: '#334155',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔄 重开
          </button>
        </div>
      </div>

      {/* 第二行：实时遥测条 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          marginBottom: 8,
          padding: '6px 14px',
          background: '#1b2232',
          borderRadius: 8,
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#ff4757', fontWeight: 'bold' }}>
            {'❤️'.repeat(Math.max(0, lives)) || '💀'}
          </span>
          <span style={{ color: '#cbd5e1' }}>
            得分: <b style={{ color: '#ffd700', fontSize: 16 }}>{score}</b>
          </span>
          <span style={{ color: combo >= 3 ? '#fb923c' : '#94a3b8', fontWeight: 600 }}>
            连击 ×{1 + Math.min(4, Math.floor(combo / 3))}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          {shieldOn && (
            <span style={{ padding: '2px 7px', borderRadius: 99, background: '#a855f730', color: '#e9d5ff', border: '1px solid #a855f766', fontSize: 11 }}>
              护盾就绪
            </span>
          )}
          {activeEffects.map(ef => (
            <span
              key={ef.label}
              style={{
                padding: '2px 7px',
                borderRadius: 99,
                background: `${ef.color}22`,
                color: ef.hazard ? '#fecdd3' : ef.color,
                border: `1px solid ${ef.color}66`,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {ef.hazard ? '⚠ ' : ''}{ef.label} {ef.sec}s
            </span>
          ))}
          {descendCountdown !== null && (
            <span style={{ padding: '2px 7px', borderRadius: 99, background: '#f43f5e24', color: '#fda4af', border: '1px solid #f43f5e66', fontSize: 11 }}>
              压境 {descendCountdown}s
            </span>
          )}
          {!shieldOn && activeEffects.length === 0 && descendCountdown === null && (
            <span style={{ color: '#64748b', fontSize: 11 }}>
              倍率 ×{cfg.scoreMult.toFixed(1)} · 球速 {getTargetSpeed().toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* 主游戏画布 */}
      <div
        style={{
          position: 'relative',
          width: `min(100%, 720px, calc(64vh * ${W} / ${H}))`,
          aspectRatio: `${W} / ${H}`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={launchOrFire}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={launchOrFire}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            touchAction: 'none',
            cursor: launched && !paused && !stageCleared && !gameOver && !allCleared ? 'none' : 'pointer',
            borderRadius: 12,
            border: `1px solid ${currentLevel.accent}33`,
            boxShadow: '0 10px 34px rgba(0,0,0,0.55)',
          }}
        />

        {/* 未发射提示 */}
        {!launched && !paused && !stageCleared && !gameOver && !allCleared && (
          <div
            onClick={launchOrFire}
            style={{
              position: 'absolute',
              top: '62%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              textAlign: 'center',
              background: 'rgba(10, 15, 28, 0.84)',
              padding: '12px 24px',
              borderRadius: 16,
              border: `1px solid ${currentLevel.accent}66`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
              cursor: 'pointer',
              pointerEvents: 'none',
              minWidth: 260,
            }}
          >
            <div style={{ fontSize: 13, color: currentLevel.accent, fontWeight: 700, marginBottom: 4 }}>
              STAGE {stageIdx + 1} · {currentLevel.name}
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 8 }}>{currentLevel.subtitle}</div>
            <div style={{ fontSize: 15, fontWeight: 'bold' }}>🚀 点击画布 / 按空格发射弹珠</div>
          </div>
        )}

        {/* 暂停遮罩 */}
        {paused && !gameOver && !stageCleared && !allCleared && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 15, 28, 0.72)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>⏸ 游戏已暂停</div>
            <button
              onClick={togglePause}
              style={{
                padding: '9px 24px',
                borderRadius: 8,
                border: 'none',
                background: '#38bdf8',
                color: '#0f172a',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ▶ 继续挑战 (P)
            </button>
          </div>
        )}

        {/* 单关通关遮罩 */}
        {stageCleared && !allCleared && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(12, 18, 34, 0.9)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              padding: 20,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#34d399', marginBottom: 6 }}>
              ✨ 第 {stageIdx + 1} 关「{currentLevel.name}」突破！
            </div>
            <div style={{ fontSize: 15, color: '#cbd5e1', marginBottom: 18 }}>
              当前总分: <b style={{ color: '#ffd700' }}>{score}</b> · 剩余生命 {lives} ❤️
            </div>
            <button
              onClick={handleNextStage}
              style={{
                padding: '10px 26px',
                borderRadius: 8,
                border: 'none',
                background: '#10b981',
                color: '#052e16',
                fontWeight: 'bold',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              ⚡ 进入下一关 (Space)
            </button>
          </div>
        )}

        {/* 全 8 关通关 */}
        {allCleared && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(12, 18, 34, 0.94)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              padding: 20,
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#fbbf24', marginBottom: 8 }}>
              🏆 全 8 关制霸达成！
            </div>
            <div style={{ fontSize: 16, color: '#e2e8f0', marginBottom: 20 }}>
              难度「{cfg.label}」 · 最终得分 <b style={{ color: '#ffd700' }}>{score}</b>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleNextStage}
                style={{
                  padding: '10px 22px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#a855f7',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🔥 继续高周目挑战
              </button>
              <button
                onClick={handleRestartAll}
                style={{
                  padding: '10px 22px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#38bdf8',
                  color: '#0f172a',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🔄 重新开始
              </button>
            </div>
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
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#ff4757', marginBottom: 8 }}>
              挑战结束
            </div>
            <div style={{ fontSize: 15, color: '#cbd5e1', marginBottom: 18 }}>
              止步第 {stageIdx + 1} 关「{currentLevel.name}」 · 最终得分 {score}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleRetryCurrentStage}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#f59e0b',
                  color: '#0f172a',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🎯 重玩本关
              </button>
              <button
                onClick={handleRestartAll}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#e11d48',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                🔄 从第 1 关重开
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
        <span>
          💡 A/D 或鼠标控拍 · 空格发球/点射激光 · P 暂停 · 留意 TNT 连锁爆破、不可破钢壁与「双激光 / 火球 / 护盾」掉落
        </span>
      </div>
    </div>
  );
}
