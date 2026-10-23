'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

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

    // 棋盘深邃黑蓝底色
    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(0, 0, w, h);

    // 细致的网格背景
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cell);
      ctx.lineTo(w, r * cell);
      ctx.stroke();
    }
    for (let col = 0; col <= cols; col++) {
      ctx.beginPath();
      ctx.moveTo(col * cell, 0);
      ctx.lineTo(col * cell, h);
      ctx.stroke();
    }

    // 绘制已固定的底板方块
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const val = board[r]?.[col];
        if (val) {
          const color = SHAPE_COLORS[Math.abs(val) % SHAPE_COLORS.length] || '#4fc3f7';
          const x = col * cell;
          const y = r * cell;

          ctx.fillStyle = color;
          ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);

          // 3D 浮雕高光
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.fillRect(x + 1, y + 1, cell - 2, 2);
          ctx.fillRect(x + 1, y + 1, 2, cell - 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
          ctx.fillRect(x + 1, y + cell - 3, cell - 2, 2);
          ctx.fillRect(x + cell - 3, y + 1, 2, cell - 2);
        }
      }
    }

    // 绘制幽灵方块 (Ghost Piece 落点投影)
    if (current?.shape && !gameOver) {
      const ghostY = getGhostY();
      if (ghostY > current.y) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 2]);
        for (let r = 0; r < current.shape.length; r++) {
          for (let col = 0; col < current.shape[0].length; col++) {
            if (current.shape[r][col]) {
              const x = (current.x + col) * cell;
              const y = (ghostY + r) * cell;
              ctx.strokeRect(x + 2, y + 2, cell - 4, cell - 4);
            }
          }
        }
        ctx.setLineDash([]);
      }
    }

    // 当前活动方块 (带高光与霓虹微光)
    if (current?.shape) {
      const curColor =
        SHAPE_COLORS[Math.abs(current.type || 0) % SHAPE_COLORS.length] || '#ffd54f';

      ctx.save();
      ctx.shadowColor = curColor;
      ctx.shadowBlur = 8;

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
      ctx.restore();
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.78)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', w / 2, h / 2 - 8);
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
        KeyA: 'left',
        KeyD: 'right',
        KeyS: 'down',
        KeyW: 'rotate',
      };
      if (map[e.code]) {
        e.preventDefault();
        if (e.code === 'Space') soundSynth.playShatter();
        else soundSynth.playMove();
        onMove(map[e.code]);
      }
    },
    [onMove]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      <canvas
        ref={canvasRef}
        width={cols * cell}
        height={rows * cell}
        style={{
          borderRadius: 10,
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'block'
        }}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>⌨️ ↑ 旋转 | ← → 移动 | ↓ 加速 | 空格 瞬降</span>
      </div>
    </div>
  );
}
