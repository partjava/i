'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

export default function Hanoi({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pegs: number[][] = state?.pegs || [];
  const disks = state?.disks || 5;
  const [from, setFrom] = useState<number | null>(null);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!; const w = 400, h = 300;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
    // 柱子
    const pegX = [70, 200, 330];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#666'; ctx.fillRect(pegX[i] - 4, 60, 8, 200);
      ctx.fillStyle = '#444'; ctx.fillRect(pegX[i] - 60, 260, 120, 8);
    }
    // 盘子
    for (let p = 0; p < pegs.length; p++) {
      const stack = pegs[p] || [];
      for (let i = 0; i < stack.length; i++) {
        const diskW = 20 + (stack[i] / disks) * 80;
        const x = pegX[p] - diskW / 2, y = 250 - (stack.length - i) * 22;
        ctx.fillStyle = from === p ? '#ff6b6b' : '#4f8cff';
        ctx.fillRect(x, y, diskW, 20);
        ctx.strokeStyle = '#3a7bf5'; ctx.lineWidth = 1; ctx.strokeRect(x, y, diskW, 20);
      }
    }
  }, [pegs, disks, from]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const peg = x < 140 ? 0 : x < 270 ? 1 : 2;
    if (from === null) setFrom(peg);
    else { onMove('move', { from, to: peg }); setFrom(null); }
  }, [from, onMove]);

  return <canvas ref={canvasRef} width={400} height={300} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
