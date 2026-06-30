'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

export default function Memory({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cards: number[] = state?.cards || [];
  const flipped: boolean[] = state?.flipped || [];
  const matched: boolean[] = state?.matched || [];
  const size = state?.size || 4;
  const cell = 80;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !cards.length) return;
    const ctx = c.getContext('2d')!; const s = size * cell;
    ctx.clearRect(0, 0, s, s);
    for (let i = 0; i < cards.length; i++) {
      const x = (i % size) * cell, y = Math.floor(i / size) * cell;
      if (matched[i]) {
        ctx.fillStyle = '#4caf50'; ctx.fillRect(x, y, cell, cell);
        ctx.fillStyle = '#fff'; ctx.font = '32px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(EMOJIS[cards[i]] || '?', x + cell / 2, y + cell / 2);
      } else if (flipped[i]) {
        ctx.fillStyle = '#fff'; ctx.fillRect(x, y, cell, cell);
        ctx.strokeStyle = '#4f8cff'; ctx.lineWidth = 2; ctx.strokeRect(x, y, cell, cell);
        ctx.fillStyle = '#333'; ctx.font = '32px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(EMOJIS[cards[i]] || '?', x + cell / 2, y + cell / 2);
      } else {
        ctx.fillStyle = '#4f8cff'; ctx.fillRect(x, y, cell, cell);
        ctx.fillStyle = '#fff'; ctx.font = '28px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('?', x + cell / 2, y + cell / 2);
      }
    }
  }, [cards, flipped, matched, size]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / cell);
    const row = Math.floor((e.clientY - rect.top) / cell);
    const idx = row * size + col;
    if (idx < cards.length && !matched[idx]) onMove('flip', { index: idx });
  }, [cards, matched, size, onMove]);

  return <canvas ref={canvasRef} width={size * cell} height={size * cell} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
