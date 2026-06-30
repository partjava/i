'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const COLORS: Record<number, string> = {
  2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
  32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
  512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
};
const TEXT_COLORS: Record<number, string> = {
  2: '#776e65', 4: '#776e65',
};

export default function Game2048({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid: number[][] = state?.grid || [];

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !grid.length) return;
    const ctx = c.getContext('2d')!;
    const size = 440, cell = 100, gap = 10;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#bbada0';
    ctx.fillRect(0, 0, size, size);
    for (let r = 0; r < 4; r++) for (let col = 0; col < 4; col++) {
      const v = grid[r]?.[col] || 0;
      const x = col * (cell + gap) + gap, y = r * (cell + gap) + gap;
      ctx.fillStyle = COLORS[v] || '#cdc1b4';
      ctx.fillRect(x, y, cell, cell);
      if (v) {
        ctx.fillStyle = TEXT_COLORS[v] || '#f9f6f2';
        ctx.font = v >= 1024 ? '28px Arial' : '36px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(v), x + cell / 2, y + cell / 2);
      }
    }
  }, [grid]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, string> = {
      ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
    };
    if (map[e.key]) { e.preventDefault(); onMove(map[e.key]); }
  }, [onMove]);

  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return <canvas ref={canvasRef} width={440} height={440} style={{ borderRadius: 8 }} tabIndex={0} />;
}
