'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Tetris({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const current = state?.current;
  const cols = state?.cols || 10, rows = state?.rows || 20;
  const cell = 25;

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const w = cols * cell, h = rows * cell;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0a23';
    ctx.fillRect(0, 0, w, h);
    // 已固定的方块
    for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
      if (board[r]?.[col]) {
        ctx.fillStyle = '#4fc3f7';
        ctx.fillRect(col * cell, r * cell, cell - 1, cell - 1);
        ctx.strokeStyle = '#29b6f6';
        ctx.strokeRect(col * cell, r * cell, cell - 1, cell - 1);
      }
    }
    // 当前方块
    if (current?.shape) {
      ctx.fillStyle = '#ffd54f';
      for (let r = 0; r < current.shape.length; r++) for (let col = 0; col < current.shape[0].length; col++) {
        if (current.shape[r][col]) {
          const x = (current.x + col) * cell, y = (current.y + r) * cell;
          ctx.fillRect(x, y, cell - 1, cell - 1);
        }
      }
    }
  }, [board, current, cols, rows]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, string> = {
      ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'down',
      ArrowUp: 'rotate', ' ': 'drop',
    };
    if (map[e.key]) { e.preventDefault(); onMove(map[e.key]); }
  }, [onMove]);

  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return <canvas ref={canvasRef} width={cols * cell} height={rows * cell} style={{ borderRadius: 8 }} />;
}
