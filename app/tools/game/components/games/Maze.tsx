'use client';

import React, { useEffect, useRef, useCallback } from 'react';

export default function Maze({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maze: number[][] = state?.maze || [];
  const size = state?.size || 15;
  const playerR = state?.playerR ?? 1, playerC = state?.playerC ?? 1;
  const exitR = state?.exitR, exitC = state?.exitC;
  const cell = 28;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !maze.length) return;
    const ctx = c.getContext('2d')!;
    const s = size * cell;
    ctx.clearRect(0, 0, s, s);
    for (let r = 0; r < size; r++) for (let col = 0; col < size; col++) {
      const x = col * cell, y = r * cell;
      if (maze[r]?.[col] === 1) {
        ctx.fillStyle = '#1a1a2e'; ctx.fillRect(x, y, cell, cell);
      } else {
        ctx.fillStyle = '#e8e8e8'; ctx.fillRect(x, y, cell, cell);
      }
    }
    // Exit
    if (exitR != null && exitC != null) {
      ctx.fillStyle = '#4caf50'; ctx.fillRect(exitC * cell, exitR * cell, cell, cell);
      ctx.fillStyle = '#fff'; ctx.font = '18px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🚪', exitC * cell + cell / 2, exitR * cell + cell / 2);
    }
    // Player
    ctx.fillStyle = '#4f8cff';
    ctx.beginPath();
    ctx.arc(playerC * cell + cell / 2, playerR * cell + cell / 2, cell / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '14px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('😊', playerC * cell + cell / 2, playerR * cell + cell / 2);
  }, [maze, size, playerR, playerC, exitR, exitC]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, string> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (map[e.key]) { e.preventDefault(); onMove(map[e.key]); }
  }, [onMove]);

  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return <canvas ref={canvasRef} width={size * cell} height={size * cell} style={{ borderRadius: 8 }} />;
}
