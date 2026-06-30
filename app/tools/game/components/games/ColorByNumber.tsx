'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const PALETTE = ['#ff4444', '#4f8cff', '#4caf50', '#ffd700', '#ff9800'];
const NAMES = ['红', '蓝', '绿', '黄', '橙'];

export default function ColorByNumber({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pattern: number[][] = state?.pattern || [];
  const board: number[][] = state?.board || [];
  const rows = state?.rows || 10, cols = state?.cols || 10;
  const [selectedColor, setSelectedColor] = useState(1);
  const cell = 30;

  useEffect(() => {
    const c = canvasRef.current; if (!c || !pattern.length) return;
    const ctx = c.getContext('2d')!;
    const w = cols * cell, h = rows * cell;
    ctx.clearRect(0, 0, w, h + 40);
    for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
      const x = col * cell, y = r * cell;
      ctx.fillStyle = board[r]?.[col] ? PALETTE[board[r][col] - 1] : '#eee';
      ctx.fillRect(x, y, cell, cell);
      ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1; ctx.strokeRect(x, y, cell, cell);
      if (pattern[r]?.[col]) {
        ctx.fillStyle = '#999'; ctx.font = '12px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(pattern[r][col]), x + cell / 2, y + cell / 2);
      }
    }
    // 调色板
    for (let i = 0; i < PALETTE.length; i++) {
      const px = i * 50 + 10, py = h + 5;
      ctx.fillStyle = i + 1 === selectedColor ? '#333' : PALETTE[i];
      ctx.fillRect(px, py, 40, 30);
      ctx.strokeStyle = i + 1 === selectedColor ? '#fff' : '#999'; ctx.lineWidth = 2;
      ctx.strokeRect(px, py, 40, 30);
    }
  }, [pattern, board, selectedColor]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const h = rows * cell;
    if (y > h) {
      const idx = Math.floor((x - 10) / 50);
      if (idx >= 0 && idx < PALETTE.length) setSelectedColor(idx + 1);
    } else {
      const col = Math.floor(x / cell), row = Math.floor(y / cell);
      if (row < rows && col < cols) onMove('paint', { row, col, color: selectedColor });
    }
  }, [selectedColor, onMove]);

  return <canvas ref={canvasRef} width={cols * cell} height={rows * cell + 40} onClick={handleClick} style={{ cursor: 'pointer', borderRadius: 8 }} />;
}
