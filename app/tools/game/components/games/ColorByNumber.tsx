'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface PixelArtwork {
  name: string;
  size: number;
  palette: string[]; // 1-indexed (index 0 is color 1)
  data: number[][]; // size x size
}

const ARTWORKS: PixelArtwork[] = [
  {
    name: '☕ Java 咖啡杯',
    size: 16,
    palette: ['#0f172a', '#78350f', '#b45309', '#f97316', '#38bdf8', '#ffffff'],
    data: [
      [0,0,0,0,0,0,5,0,0,5,0,0,0,0,0,0],
      [0,0,0,0,0,5,0,0,5,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,5,0,0,5,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,1,6,6,6,6,6,6,6,6,1,1,1,0,0],
      [0,0,1,3,3,3,3,3,3,3,3,1,0,0,1,0],
      [0,0,1,2,2,2,2,2,2,2,2,1,0,0,1,0],
      [0,0,1,2,2,2,2,2,2,2,2,1,0,0,1,0],
      [0,0,1,2,2,4,4,2,2,2,2,1,1,1,0,0],
      [0,0,1,2,4,4,4,4,2,2,2,1,0,0,0,0],
      [0,0,1,2,2,4,4,2,2,2,2,1,0,0,0,0],
      [0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    ],
  },
  {
    name: '🍄 马里奥红蘑菇',
    size: 16,
    palette: ['#000000', '#ef4444', '#ffffff', '#fcd34d', '#78350f'],
    data: [
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
      [0,0,1,2,2,3,3,2,2,3,3,2,2,1,0,0],
      [0,1,2,2,3,3,3,3,3,3,3,3,2,2,1,0],
      [0,1,2,3,3,3,3,3,3,3,3,3,3,2,1,0],
      [1,2,2,3,3,3,3,2,2,3,3,3,3,2,2,1],
      [1,2,2,2,3,3,2,2,2,2,3,3,2,2,2,1],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
      [0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0],
      [0,0,1,1,1,4,4,4,4,4,4,1,1,1,0,0],
      [0,0,0,1,4,4,1,4,4,1,4,4,1,0,0,0],
      [0,0,0,1,4,4,1,4,4,1,4,4,1,0,0,0],
      [0,0,0,1,4,4,4,4,4,4,4,4,1,0,0,0],
      [0,0,0,0,1,4,4,4,4,4,4,1,0,0,0,0],
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
  },
  {
    name: '🐱 赛博小黑猫',
    size: 16,
    palette: ['#0f172a', '#1e293b', '#38bdf8', '#fbbf24', '#f43f5e', '#ffffff'],
    data: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0],
      [0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0],
      [0,1,2,2,1,1,1,1,1,1,1,2,2,1,0,0],
      [0,1,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
      [0,1,2,4,4,2,2,2,2,2,4,4,2,1,0,0],
      [0,1,2,4,1,2,2,2,2,2,4,1,2,1,0,0],
      [0,1,2,2,2,2,2,5,2,2,2,2,2,1,0,0],
      [0,0,1,2,2,2,1,1,1,2,2,2,1,0,0,0],
      [0,0,0,1,3,3,3,3,3,3,3,1,0,0,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,1,0,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,2,1,0,0,0],
      [0,0,1,2,1,2,2,2,2,2,1,2,1,0,0,0],
      [0,0,1,6,1,2,2,2,2,2,1,6,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
  }
];

export default function ColorByNumber({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [artIndex, setArtIndex] = useState(0);
  const artwork = ARTWORKS[artIndex % ARTWORKS.length];
  const size = artwork.size;

  const [painted, setPainted] = useState<number[][]>([]);
  const [selectedColor, setSelectedColor] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [won, setWon] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initGame = useCallback((art: PixelArtwork) => {
    setPainted(Array(art.size).fill(0).map(() => Array(art.size).fill(0)));
    setSelectedColor(1);
    setWon(false);
  }, []);

  useEffect(() => {
    initGame(artwork);
  }, [artwork, initGame]);

  // 涂色某一格
  const paintCell = useCallback((r: number, c: number, colorId: number) => {
    if (won || r < 0 || r >= size || c < 0 || c >= size) return;
    const targetColor = artwork.data[r][c];
    if (targetColor === 0) return; // 空白不需要填

    if (painted[r]?.[c] !== targetColor && targetColor === colorId) {
      soundSynth.playPop();

      const nextPainted = painted.map(row => [...row]);
      nextPainted[r][c] = colorId;
      setPainted(nextPainted);

      // 检查完成率
      let totalNeeded = 0;
      let totalCorrect = 0;
      for (let ri = 0; ri < size; ri++) {
        for (let ci = 0; ci < size; ci++) {
          if (artwork.data[ri][ci] > 0) {
            totalNeeded++;
            if (nextPainted[ri][ci] === artwork.data[ri][ci]) totalCorrect++;
          }
        }
      }

      if (totalCorrect === totalNeeded) {
        setWon(true);
        soundSynth.playWin();
        onMove('win', { artwork: artwork.name });
      }
    }
  }, [won, size, artwork, painted, onMove]);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || painted.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasSize = 440;
    const cell = canvasSize / size;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 棋盘背景
    ctx.fillStyle = won ? '#0f172a' : '#1e293b';
    ctx.beginPath();
    ctx.roundRect(0, 0, canvasSize, canvasSize, 12);
    ctx.fill();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = c * cell;
        const y = r * cell;
        const targetColor = artwork.data[r][c];
        const currentColor = painted[r]?.[c] || 0;

        if (targetColor === 0) continue; // 透明背景

        if (currentColor > 0) {
          // 已填色正确
          ctx.fillStyle = artwork.palette[currentColor - 1];
          ctx.fillRect(x, y, cell + 0.5, cell + 0.5);

          if (!won) {
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, cell, cell);
          }
        } else {
          // 待填色 (底色浅灰，标注数字)
          const isCurrentSelected = targetColor === selectedColor;
          ctx.fillStyle = isCurrentSelected ? '#e0f2fe' : '#f1f5f9';
          ctx.fillRect(x, y, cell, cell);

          ctx.strokeStyle = isCurrentSelected ? '#38bdf8' : '#cbd5e1';
          ctx.lineWidth = isCurrentSelected ? 1.5 : 0.5;
          ctx.strokeRect(x, y, cell, cell);

          // 标注数字
          ctx.fillStyle = isCurrentSelected ? '#0284c7' : '#94a3b8';
          ctx.font = `bold ${Math.floor(cell * 0.5)}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(targetColor), x + cell / 2, y + cell / 2);
        }
      }
    }
  }, [artwork, painted, selectedColor, size, won]);

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 440 / size;
    const c = Math.floor((e.clientX - rect.left) / cell);
    const r = Math.floor((e.clientY - rect.top) / cell);
    paintCell(r, c, selectedColor);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 440 / size;
    const c = Math.floor((e.clientX - rect.left) / cell);
    const r = Math.floor((e.clientY - rect.top) / cell);
    paintCell(r, c, selectedColor);
  };

  const handlePointerUp = () => setIsMouseDown(false);

  // 计算填色进度
  let totalToPaint = 0;
  let paintedCount = 0;
  if (painted.length > 0) {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (artwork.data[r][c] > 0) {
          totalToPaint++;
          if (painted[r][c] === artwork.data[r][c]) paintedCount++;
        }
      }
    }
  }
  const progressPercent = totalToPaint > 0 ? Math.round((paintedCount / totalToPaint) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: 440 }}>
      {/* 像素画作切换 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {ARTWORKS.map((art, i) => (
            <button
              key={art.name}
              onClick={() => { setArtIndex(i); initGame(art); }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: artIndex === i ? '#4f8cff' : '#2a2e3d',
                color: artIndex === i ? '#fff' : '#9aa4bf',
              }}
            >
              {art.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => initGame(artwork)}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#e91e63',
            color: '#fff',
          }}
        >
          🔄 清空重填
        </button>
      </div>

      {/* 进度条 */}
      <div style={{ width: '100%', marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aaa', marginBottom: 4 }}>
          <span>填色进度: {progressPercent}%</span>
          <span>{paintedCount} / {totalToPaint} 像素块</span>
        </div>
        <div style={{ width: '100%', height: 6, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: '#10b981', transition: 'width 0.2s' }} />
        </div>
      </div>

      {/* 画布 */}
      <div style={{ position: 'relative', width: 440, height: 440 }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={440}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        />

        {/* 获胜全图揭开通告 */}
        {won && (
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 23, 42, 0.95)',
              padding: '12px 24px',
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              border: '1px solid #10b981',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 'bold', color: '#10b981' }}>🎉 像素艺术绘制完成!</span>
            <button
              onClick={() => {
                const nextIdx = (artIndex + 1) % ARTWORKS.length;
                setArtIndex(nextIdx);
                initGame(ARTWORKS[nextIdx]);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              下一幅 ➔
            </button>
          </div>
        )}
      </div>

      {/* 底部色板挑选区 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, width: '100%', justifyContent: 'center' }}>
        {artwork.palette.map((color, i) => {
          const colorId = i + 1;
          const isSelected = selectedColor === colorId;
          return (
            <button
              key={color}
              onClick={() => setSelectedColor(colorId)}
              style={{
                width: 50,
                height: 44,
                borderRadius: 8,
                border: isSelected ? '3px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                background: color,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isSelected ? '0 0 12px rgba(255,255,255,0.6)' : 'none',
                transform: isSelected ? 'scale(1.12)' : 'scale(1.0)',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 'bold', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {colorId}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
