'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

const ICONS_POOL = [
  '🚀', '🛸', '☕', '🐱', '🐶', '🦊', '🦁', '🐼',
  '🐨', '🐯', '🦄', '🍎', '🍓', '🥑', '🍕', '🎮',
  '💎', '⭐', '🔥', '⚡', '🌈', '🎨', '🧩', '🎯',
  '🎸', '💻', '🤖', '👾', '🍀', '💡', '🏆', '🎉'
];

export default function Memory({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [firstPick, setFirstPick] = useState<number | null>(null);
  const [lockBoard, setLockBoard] = useState<boolean>(false);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);
  const [peekLeft, setPeekLeft] = useState<number>(1);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 初始化牌组
  const initGame = useCallback((size: number) => {
    const total = size * size;
    const pairsCount = total / 2;

    // 随机挑选 pairsCount 种图案并成对放入
    const pool = [...ICONS_POOL];
    const chosen: number[] = [];
    for (let i = 0; i < pairsCount; i++) {
      const idx = i % pool.length;
      chosen.push(idx, idx);
    }

    // 洗牌
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }

    setCards(chosen);
    setFlipped(Array(total).fill(false));
    setMatched(Array(total).fill(false));
    setFirstPick(null);
    setLockBoard(false);
    setCombo(0);
    setMaxCombo(0);
    setTurns(0);
    setMatchedPairs(0);
    setWon(false);
    setPeekLeft(size >= 8 ? 2 : 1);
    setIsPeeking(false);
  }, []);

  useEffect(() => {
    if (cards.length === 0) {
      initGame(boardSize);
    }
  }, [cards.length, boardSize, initGame]);

  // 翻牌操作
  const handleCardClick = useCallback((idx: number) => {
    if (lockBoard || isPeeking || won) return;
    if (flipped[idx] || matched[idx]) return;

    soundSynth.playPop();

    const newFlipped = [...flipped];
    newFlipped[idx] = true;
    setFlipped(newFlipped);

    if (firstPick === null) {
      setFirstPick(idx);
    } else {
      // 第二张牌
      setTurns(t => t + 1);
      setLockBoard(true);

      const p1 = firstPick;
      const p2 = idx;

      if (cards[p1] === cards[p2]) {
        // 配对成功！
        setTimeout(() => {
          setMatched(prev => {
            const nextM = [...prev];
            nextM[p1] = true;
            nextM[p2] = true;
            return nextM;
          });
          const nextCombo = combo + 1;
          setCombo(nextCombo);
          if (nextCombo > maxCombo) setMaxCombo(nextCombo);
          soundSynth.playChime(Math.min(10, nextCombo * 2));

          setFirstPick(null);
          setLockBoard(false);

          setMatchedPairs(mp => {
            const newMp = mp + 1;
            if (newMp === cards.length / 2) {
              setWon(true);
              soundSynth.playWin();
              onMove('win', { turns: turns + 1, size: boardSize });
            }
            return newMp;
          });
        }, 300);
      } else {
        // 配对失败，翻回
        setCombo(0);
        setTimeout(() => {
          setFlipped(prev => {
            const nextF = [...prev];
            nextF[p1] = false;
            nextF[p2] = false;
            return nextF;
          });
          setFirstPick(null);
          setLockBoard(false);
        }, 800);
      }
    }
  }, [lockBoard, isPeeking, won, flipped, matched, firstPick, cards, combo, maxCombo, turns, boardSize, onMove]);

  // 记忆透视技能（全盘亮起 1.5 秒）
  const handlePeek = () => {
    if (peekLeft <= 0 || lockBoard || isPeeking || won) return;
    setPeekLeft(p => p - 1);
    setIsPeeking(true);
    soundSynth.playScore();
    setTimeout(() => {
      setIsPeeking(false);
    }, 1800);
  };

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cards.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = boardSize;
    const canvasSize = 440;
    const gap = size === 8 ? 5 : size === 6 ? 7 : 10;
    const cell = (canvasSize - gap * (size + 1)) / size;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 棋盘背景底板
    ctx.fillStyle = '#161b26';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvasSize, canvasSize, 12);
    ctx.fill();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const idx = r * size + c;
        const x = gap + c * (cell + gap);
        const y = gap + r * (cell + gap);

        const isCardMatched = matched[idx];
        const isCardFlipped = flipped[idx] || isPeeking;

        if (isCardMatched) {
          // 已配对消除状态
          ctx.fillStyle = 'rgba(76, 175, 80, 0.25)';
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();

          ctx.strokeStyle = '#4caf50';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // 绘制半透明匹配成功的图标
          ctx.font = `${size === 8 ? 20 : size === 6 ? 28 : 40}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.globalAlpha = 0.6;
          ctx.fillText(ICONS_POOL[cards[idx]] || '✨', x + cell / 2, y + cell / 2);
          ctx.globalAlpha = 1.0;
        } else if (isCardFlipped) {
          // 翻开正面
          ctx.save();
          ctx.shadowColor = 'rgba(79, 140, 255, 0.4)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();
          ctx.restore();

          ctx.strokeStyle = '#4f8cff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.stroke();

          // 图标
          ctx.font = `${size === 8 ? 24 : size === 6 ? 32 : 46}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ICONS_POOL[cards[idx]] || '❓', x + cell / 2, y + cell / 2);
        } else {
          // 背面（精美渐变卡背）
          const cardGrad = ctx.createLinearGradient(x, y, x + cell, y + cell);
          cardGrad.addColorStop(0, '#2d3748');
          cardGrad.addColorStop(1, '#1a202c');

          ctx.fillStyle = cardGrad;
          ctx.beginPath();
          ctx.roundRect(x, y, cell, cell, 6);
          ctx.fill();

          ctx.strokeStyle = 'rgba(79, 140, 255, 0.35)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, cell - 2, cell - 2, 5);
          ctx.stroke();

          // 卡背中心图案
          ctx.fillStyle = '#4f8cff';
          ctx.font = `bold ${size === 8 ? 14 : size === 6 ? 18 : 26}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('⚡', x + cell / 2, y + cell / 2);
        }
      }
    }
  }, [cards, flipped, matched, isPeeking, boardSize]);

  // 点击事件
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const size = boardSize;
    const canvasSize = 440;
    const gap = size === 8 ? 5 : size === 6 ? 7 : 10;
    const cell = (canvasSize - gap * (size + 1)) / size;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const col = Math.floor((clickX - gap) / (cell + gap));
    const row = Math.floor((clickY - gap) / (cell + gap));

    if (row >= 0 && row < size && col >= 0 && col < size) {
      handleCardClick(row * size + col);
    }
  };

  const totalPairs = (boardSize * boardSize) / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 难度选择与技能栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 440, marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { s: 4, name: '4×4 初级 (16张)' },
            { s: 6, name: '6×6 进阶 (36张)' },
            { s: 8, name: '8×8 地狱级 (64张!)' },
          ].map(item => (
            <button
              key={item.s}
              onClick={() => {
                setBoardSize(item.s);
                initGame(item.s);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: boardSize === item.s ? '#4f8cff' : '#2a2e3d',
                color: boardSize === item.s ? '#fff' : '#9aa4bf',
                transition: 'all 0.2s',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={handlePeek}
          disabled={peekLeft <= 0 || isPeeking}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: peekLeft > 0 ? 'pointer' : 'not-allowed',
            background: peekLeft > 0 ? '#ff9800' : '#444',
            color: '#fff',
            opacity: peekLeft > 0 ? 1 : 0.5,
          }}
        >
          👁️ 透视 ({peekLeft})
        </button>
      </div>

      {/* 实时状态信息条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 440, marginBottom: 10, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>翻牌次数: <b style={{ color: '#fff' }}>{turns}</b></div>
        <div>连对 Combo: <b style={{ color: combo > 1 ? '#ff5722' : '#4f8cff' }}>{combo > 1 ? `🔥 x${combo}` : combo}</b></div>
        <div>已配对: <b style={{ color: '#4caf50' }}>{matchedPairs} / {totalPairs}</b></div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          onClick={handleClick}
          style={{
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'block'
          }}
        />

        {/* 获胜通关遮罩 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26, 35, 126, 0.94)',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ fontSize: 38, fontWeight: 'bold', marginBottom: 6 }}>🧠 最强大脑配对成功!</div>
            <div style={{ fontSize: 18, marginBottom: 4 }}>总翻牌: {turns} 次 | 最高连击: {maxCombo}</div>
            <div style={{ fontSize: 16, color: '#90caf9', marginBottom: 20 }}>难度: {boardSize}×{boardSize} ({totalPairs} 对图案全部解明)</div>
            <button
              onClick={() => initGame(boardSize)}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              🔄 挑战下一局
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#888' }}>
        <span>💡 点击两张相同图案的卡牌即可消除，连续消除触发高额 Combo 音效！</span>
      </div>
    </div>
  );
}
