'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function Sudoku({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const fixed: boolean[][] = state?.fixed || [];
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const cell = 50;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !board.length) return;
    const ctx = c.getContext('2d')!; const s = 9 * cell;
    ctx.clearRect(0, 0, s, s);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, s, s);
    for (let r = 0; r < 9; r++) for (let col = 0; col < 9; col++) {
      const x = col * cell, y = r * cell;
      if (selected && selected[0] === r && selected[1] === col) {
        ctx.fillStyle = '#e3f2fd'; ctx.fillRect(x, y, cell, cell);
      }
      if (board[r]?.[col]) {
        ctx.fillStyle = fixed[r]?.[col] ? '#333' : '#4f8cff';
        ctx.font = `${fixed[r]?.[col] ? 'bold ' : ''}24px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(board[r][col]), x + cell / 2, y + cell / 2);
      }
    }
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
    for (let i = 0; i <= 9; i++) {
      const p = i * cell;
      if (i % 3 === 0) ctx.lineWidth = 3; else ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, s); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(s, p); ctx.stroke();
    }
  }, [board, fixed, selected]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!selected) return;
    if (e.key >= '1' && e.key <= '9') onMove('place', { row: selected[0], col: selected[1], num: parseInt(e.key) });
    if (e.key === 'Backspace' || e.key === 'Delete') onMove('place', { row: selected[0], col: selected[1], num: 0 });
  }, [selected, onMove]);

  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setSelected([Math.floor((e.clientY - rect.top) / cell), Math.floor((e.clientX - rect.left) / cell)]);
  }, []);

  return <canvas ref={canvasRef} width={9 * cell} height={9 * cell} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
