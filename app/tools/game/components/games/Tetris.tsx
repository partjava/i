'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const SHAPE_COLORS = [
  '#00f0f0', // I 蓝绿
  '#0000f0', // J 深蓝
  '#f0a000', // L 橙色
  '#f0f000', // O 黄色
  '#00f000', // S 绿色
  '#a000f0', // T 紫色
  '#f00000'  // Z 红色
];

export default function Tetris({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const board: number[][] = state?.board || [];
  const current = state?.current;
  const cols = state?.cols || 10,
    rows = state?.rows || 20;
  const cell = 22;
  const gameOver = state?.gameOver;

  // 计算幽灵方块（落点预测投影）
  const getGhostY = useCallback(() => {
    if (!current?.shape || !board.length) return current?.y || 0;
    let ghostY = current.y;
    const shape = current.shape;
    const sH = shape.length;
    const sW = shape[0].length;

    while (ghostY + 1 < rows) {
      const nextY = ghostY + 1;
      let collides = false;
      for (let r = 0; r < sH; r++) {
        for (let c = 0; c < sW; c++) {
          if (shape[r][c]) {
            const boardR = nextY + r;
            const boardC = current.x + c;
            if (boardR >= rows || (board[boardR] && board[boardR][boardC])) {
              collides = true;
              break;
            }
          }
        }
        if (collides) break;
      }
      if (collides) break;
      ghostY = nextY;
    }
    return ghostY;
  }, [current, board, rows]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    const w = cols * cell,
      h = rows * cell;

    ctx.clearRect(0, 0, w, h);

    // 深空暗色背景
    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(0, 0, w, h);

    // 网格线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let col = 0; col <= cols; col++) {
      ctx.beginPath();
      ctx.moveTo(col * cell, 0);
      ctx.lineTo(col * cell, h);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cell);
      ctx.lineTo(w, r * cell);
      ctx.stroke();
    }

    // 幽灵方块投影（半透明白框）
    if (current?.shape && !gameOver) {
      const gy = getGhostY();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1.5;
      for (let r = 0; r < current.shape.length; r++) {
        for (let col = 0; col < current.shape[0].length; col++) {
          if (current.shape[r][col]) {
            const gx = (current.x + col) * cell;
            const y = (gy + r) * cell;
            ctx.strokeRect(gx + 1, y + 1, cell - 2, cell - 2);
          }
        }
      }
    }

    // 已固定的方块
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const val = board[r]?.[col];
        if (val) {
          const color = SHAPE_COLORS[(val - 1) % SHAPE_COLORS.length] || '#4fc3f7';
          ctx.fillStyle = color;
          ctx.fillRect(col * cell + 1, r * cell + 1, cell - 2, cell - 2);

          // 晶体立体高光边
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(col * cell + 1, r * cell + 1, cell - 2, 2);
          ctx.fillRect(col * cell + 1, r * cell + 1, 2, cell - 2);
        }
      }
    }

    // 当前活动方块
    if (current?.shape) {
      const curColor =
        SHAPE_COLORS[Math.abs(current.type || 0) % SHAPE_COLORS.length] || '#ffd54f';
      for (let r = 0; r < current.shape.length; r++) {
        for (let col = 0; col < current.shape[0].length; col++) {
          if (current.shape[r][col]) {
            const x = (current.x + col) * cell;
            const y = (current.y + r) * cell;
            ctx.fillStyle = curColor;
            ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(x + 1, y + 1, cell - 2, 2);
            ctx.fillRect(x + 1, y + 1, 2, cell - 2);
          }
        }
      }
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', w / 2, h / 2 - 8);
      ctx.fillStyle = '#ddd';
      ctx.font = '12px sans-serif';
      ctx.fillText('按 R 或点击重新开始', w / 2, h / 2 + 16);
    }
  }, [board, current, cols, rows, gameOver, getGhostY]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowUp: 'rotate',
        ' ': 'drop',
        a: 'left',
        d: 'right',
        s: 'down',
        w: 'rotate',
        A: 'left',
        D: 'right',
        S: 'down',
        W: 'rotate'
      };
      if (map[e.key]) {
        e.preventDefault();
        onMove(map[e.key]);
      }
    },
    [onMove]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <canvas
      ref={canvasRef}
      width={cols * cell}
      height={rows * cell}
      style={{
        borderRadius: 10,
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    />
  );
}
