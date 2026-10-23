'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

type CellValue = 0 | 1 | 2; // 0: 空, 1: 黑子 (玩家/先手), 2: 白子 (AI/后手)

export default function Gomoku({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [board, setBoard] = useState<CellValue[][]>(() =>
    Array(15).fill(0).map(() => Array(15).fill(0))
  );
  const [currentTurn, setCurrentTurn] = useState<1 | 2>(1); // 1: 黑, 2: 白
  const [history, setHistory] = useState<{ r: number; c: number; player: CellValue }[]>([]);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [mode, setMode] = useState<'pve' | 'pvp'>('pve');
  const [winner, setWinner] = useState<CellValue | null>(null);
  const [winningLine, setWinningLine] = useState<[number, number][] | null>(null);
  const [hoverPos, setHoverPos] = useState<[number, number] | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 初始化新对局
  const initGame = useCallback(() => {
    setBoard(Array(15).fill(0).map(() => Array(15).fill(0)));
    setCurrentTurn(1);
    setHistory([]);
    setWinner(null);
    setWinningLine(null);
    setHoverPos(null);
  }, []);

  // 检查是否五连珠
  const checkWinAt = (grid: CellValue[][], r: number, c: number, p: CellValue): [number, number][] | null => {
    const directions = [
      [[0, 1], [0, -1]],   // 横向
      [[1, 0], [-1, 0]],   // 纵向
      [[1, 1], [-1, -1]],  // 正对角
      [[1, -1], [-1, 1]],  // 反对角
    ];

    for (const [[dr1, dc1], [dr2, dc2]] of directions) {
      const line: [number, number][] = [[r, c]];
      // 沿方向1延伸
      let step = 1;
      while (true) {
        const nr = r + dr1 * step, nc = c + dc1 * step;
        if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15 && grid[nr][nc] === p) {
          line.push([nr, nc]);
          step++;
        } else break;
      }
      // 沿方向2延伸
      step = 1;
      while (true) {
        const nr = r + dr2 * step, nc = c + dc2 * step;
        if (nr >= 0 && nr < 15 && nc >= 0 && nc < 15 && grid[nr][nc] === p) {
          line.push([nr, nc]);
          step++;
        } else break;
      }
      if (line.length >= 5) return line;
    }
    return null;
  };

  // 启发式 AI 评分引擎
  const getAiMove = useCallback((grid: CellValue[][], diff: 'easy' | 'medium' | 'hard'): [number, number] => {
    // 评估某一位置对于某玩家的权重分
    const evaluatePoint = (r: number, c: number, p: CellValue): number => {
      let totalScore = 0;
      const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (const [dr, dc] of dirs) {
        let count = 1;
        let openEnds = 0;

        // 正向
        let step = 1;
        while (step <= 4) {
          const nr = r + dr * step, nc = c + dc * step;
          if (nr < 0 || nr >= 15 || nc < 0 || nc >= 15) break;
          if (grid[nr][nc] === p) count++;
          else if (grid[nr][nc] === 0) { openEnds++; break; }
          else break;
          step++;
        }
        // 反向
        step = 1;
        while (step <= 4) {
          const nr = r - dr * step, nc = c - dc * step;
          if (nr < 0 || nr >= 15 || nc < 0 || nc >= 15) break;
          if (grid[nr][nc] === p) count++;
          else if (grid[nr][nc] === 0) { openEnds++; break; }
          else break;
          step++;
        }

        if (count >= 5) totalScore += 100000;
        else if (count === 4) totalScore += openEnds === 2 ? 10000 : 2000;
        else if (count === 3) totalScore += openEnds === 2 ? 1000 : 200;
        else if (count === 2) totalScore += openEnds === 2 ? 100 : 20;
      }
      return totalScore;
    };

    let bestScore = -Infinity;
    let bestMoves: [number, number][] = [];

    // 优先考虑已有子周边的 2 格范围
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        if (grid[r][c] !== 0) continue;

        // 若全盘空，直接抢天元 (7, 7)
        if (r === 7 && c === 7 && bestScore < 0) {
          bestMoves.push([7, 7]);
        }

        const aiScore = evaluatePoint(r, c, 2);    // AI 进攻分
        const humanScore = evaluatePoint(r, c, 1); // 防守阻击分

        // 难度系数加权
        let score = 0;
        if (diff === 'easy') {
          score = aiScore * 0.8 + humanScore * 0.6 + Math.random() * 200;
        } else if (diff === 'medium') {
          score = aiScore * 1.0 + humanScore * 0.95 + Math.random() * 50;
        } else {
          // 大师级：严防死守 + 致命杀招
          score = Math.max(aiScore, humanScore * 1.15) + (aiScore + humanScore) * 0.2;
        }

        if (score > bestScore) {
          bestScore = score;
          bestMoves = [[r, c]];
        } else if (score === bestScore) {
          bestMoves.push([r, c]);
        }
      }
    }

    if (bestMoves.length === 0) return [7, 7];
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }, []);

  // 执行落子
  const placePiece = useCallback((r: number, c: number) => {
    if (winner || board[r][c] !== 0) return;

    soundSynth.playClack();

    const newBoard = board.map(row => [...row]);
    const current = currentTurn;
    newBoard[r][c] = current;
    setBoard(newBoard);
    setHistory(h => [...h, { r, c, player: current }]);

    // 检查当前落子是否胜出
    const winLine = checkWinAt(newBoard, r, c, current);
    if (winLine) {
      setWinner(current);
      setWinningLine(winLine);
      soundSynth.playWin();
      onMove('win', { winner: current === 1 ? 'black' : 'white' });
      return;
    }

    const nextTurn = current === 1 ? 2 : 1;
    setCurrentTurn(nextTurn);

    // 人机对战且轮到 AI
    if (mode === 'pve' && nextTurn === 2) {
      setTimeout(() => {
        const [aiR, aiC] = getAiMove(newBoard, aiDifficulty);
        soundSynth.playClack();
        const aiBoard = newBoard.map(row => [...row]);
        aiBoard[aiR][aiC] = 2;
        setBoard(aiBoard);
        setHistory(h => [...h, { r: aiR, c: aiC, player: 2 }]);

        const aiWinLine = checkWinAt(aiBoard, aiR, aiC, 2);
        if (aiWinLine) {
          setWinner(2);
          setWinningLine(aiWinLine);
          soundSynth.playGameOver();
          onMove('loss', { winner: 'white' });
        } else {
          setCurrentTurn(1);
        }
      }, 350);
    }
  }, [winner, board, currentTurn, mode, aiDifficulty, getAiMove, onMove]);

  // 悔棋 (PvE 悔两步，PvP 悔一步)
  const handleUndo = () => {
    if (winner || history.length === 0) return;
    const stepsToUndo = mode === 'pve' ? (history.length >= 2 ? 2 : 1) : 1;
    const remaining = history.slice(0, -stepsToUndo);

    const newBoard: CellValue[][] = Array(15).fill(0).map(() => Array(15).fill(0));
    for (const h of remaining) {
      newBoard[h.r][h.c] = h.player;
    }

    setBoard(newBoard);
    setHistory(remaining);
    setCurrentTurn(remaining.length % 2 === 0 ? 1 : 2);
    setWinningLine(null);
    soundSynth.playPop();
  };

  // Canvas 绘制实木棋盘与立体棋子
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 450;
    const cell = size / 16;
    const offset = cell;

    ctx.clearRect(0, 0, size, size);

    // 1. 实木棋盘底纹
    const woodGrad = ctx.createLinearGradient(0, 0, size, size);
    woodGrad.addColorStop(0, '#e8be74');
    woodGrad.addColorStop(1, '#caa053');
    ctx.fillStyle = woodGrad;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 10);
    ctx.fill();

    // 棋盘边框微立体阴影
    ctx.strokeStyle = '#8a6225';
    ctx.lineWidth = 2;
    ctx.strokeRect(offset - 4, offset - 4, cell * 14 + 8, cell * 14 + 8);

    // 2. 绘制 15x15 网格线
    ctx.strokeStyle = '#6f4e1f';
    ctx.lineWidth = 1;
    for (let i = 0; i < 15; i++) {
      // 横线
      ctx.beginPath();
      ctx.moveTo(offset, offset + i * cell);
      ctx.lineTo(offset + 14 * cell, offset + i * cell);
      ctx.stroke();

      // 竖线
      ctx.beginPath();
      ctx.moveTo(offset + i * cell, offset);
      ctx.lineTo(offset + i * cell, offset + 14 * cell);
      ctx.stroke();
    }

    // 3. 绘制 5 个星位点 (天元与四隅星)
    const starPoints = [[3, 3], [11, 3], [7, 7], [3, 11], [11, 11]];
    ctx.fillStyle = '#6f4e1f';
    for (const [sr, sc] of starPoints) {
      ctx.beginPath();
      ctx.arc(offset + sc * cell, offset + sr * cell, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. 绘制悬停虚影光标
    if (hoverPos && !winner && board[hoverPos[0]][hoverPos[1]] === 0) {
      const [hr, hc] = hoverPos;
      const x = offset + hc * cell;
      const y = offset + hr * cell;
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.arc(x, y, cell / 2 - 2, 0, Math.PI * 2);
      ctx.fillStyle = currentTurn === 1 ? '#000' : '#fff';
      ctx.fill();
      ctx.restore();
    }

    // 5. 绘制所有棋子
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 15; c++) {
        const val = board[r][c];
        if (val === 0) continue;

        const x = offset + c * cell;
        const y = offset + r * cell;
        const radius = cell / 2 - 2;

        ctx.save();
        // 棋子投影
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;

        // 棋子高光渐变
        const stoneGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
        if (val === 1) {
          // 黑子（黑曜石墨玉）
          stoneGrad.addColorStop(0, '#555555');
          stoneGrad.addColorStop(1, '#0f0f0f');
        } else {
          // 白子（羊脂温玉）
          stoneGrad.addColorStop(0, '#ffffff');
          stoneGrad.addColorStop(0.85, '#e4e4e4');
          stoneGrad.addColorStop(1, '#b0b0b0');
        }

        ctx.fillStyle = stoneGrad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 6. 标记最后一手棋子的红点
    if (history.length > 0) {
      const last = history[history.length - 1];
      const lx = offset + last.c * cell;
      const ly = offset + last.r * cell;
      ctx.fillStyle = last.player === 1 ? '#ff3b30' : '#007aff';
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. 绘制获胜连线
    if (winningLine && winningLine.length >= 5) {
      ctx.save();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      const first = winningLine[0];
      const last = winningLine[winningLine.length - 1];
      ctx.moveTo(offset + first[1] * cell, offset + first[0] * cell);
      ctx.lineTo(offset + last[1] * cell, offset + last[0] * cell);
      ctx.stroke();
      ctx.restore();
    }
  }, [board, hoverPos, currentTurn, history, winningLine, winner]);

  // 鼠标移动悬停
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 450 / 16;
    const offset = cell;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.round((x - offset) / cell);
    const row = Math.round((y - offset) / cell);

    if (row >= 0 && row < 15 && col >= 0 && col < 15) {
      setHoverPos([row, col]);
    } else {
      setHoverPos(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cell = 450 / 16;
    const offset = cell;

    const col = Math.round((e.clientX - rect.left - offset) / cell);
    const row = Math.round((e.clientY - rect.top - offset) / cell);

    if (row >= 0 && row < 15 && col >= 0 && col < 15) {
      placePiece(row, col);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* 顶部模式与难度栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 450, marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => { setMode('pve'); initGame(); }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: mode === 'pve' ? '#4f8cff' : '#2a2e3d',
              color: mode === 'pve' ? '#fff' : '#9aa4bf',
            }}
          >
            🤖 人机对弈
          </button>
          <button
            onClick={() => { setMode('pvp'); initGame(); }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: mode === 'pvp' ? '#4f8cff' : '#2a2e3d',
              color: mode === 'pvp' ? '#fff' : '#9aa4bf',
            }}
          >
            👥 双人对战
          </button>
        </div>

        {mode === 'pve' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'easy', name: '入门' },
              { id: 'medium', name: '进阶' },
              { id: 'hard', name: '大师级' },
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setAiDifficulty(d.id as any)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: aiDifficulty === d.id ? '#e91e63' : '#222834',
                  color: aiDifficulty === d.id ? '#fff' : '#888',
                }}
              >
                {d.name}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleUndo}
            disabled={history.length === 0 || !!winner}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
              background: history.length > 0 ? '#ff9800' : '#333',
              color: '#fff',
              opacity: history.length > 0 ? 1 : 0.5,
            }}
          >
            ↩ 悔棋
          </button>
          <button
            onClick={initGame}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: '#2a3449',
              color: '#fff',
            }}
          >
            🔄 重开
          </button>
        </div>
      </div>

      {/* 状态信息条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 450, marginBottom: 8, padding: '6px 14px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>当前回合: <b style={{ color: currentTurn === 1 ? '#fff' : '#ffd700' }}>{currentTurn === 1 ? '⚫ 黑方 (执先)' : '⚪ 白方 (AI)'}</b></div>
        <div>总手数: <b style={{ color: '#4f8cff' }}>{history.length}</b></div>
        <div>对局状态: <b style={{ color: winner ? '#4caf50' : '#aaa' }}>{winner === 1 ? '🎉 黑方胜出!' : winner === 2 ? '🏆 白方胜出!' : '对弈进行中'}</b></div>
      </div>

      {/* 棋盘画布 */}
      <div style={{ position: 'relative', width: 450, height: 450 }}>
        <canvas
          ref={canvasRef}
          width={450}
          height={450}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPos(null)}
          style={{
            display: 'block',
            cursor: 'pointer',
            borderRadius: 10,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}
        />

        {/* 获胜通告 */}
        {winner && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(20, 24, 33, 0.9)',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 6, color: '#ffd700' }}>
              {winner === 1 ? '🏆 黑方五子连珠获胜!' : '🤖 白方五子连珠获胜!'}
            </div>
            <div style={{ fontSize: 16, color: '#aaa', marginBottom: 20 }}>
              总博弈手数: {history.length} 手 | 难度: {aiDifficulty === 'hard' ? '大师级' : aiDifficulty === 'medium' ? '进阶' : '入门'}
            </div>
            <button
              onClick={initGame}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                border: 'none',
                background: '#4f8cff',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              🔄 再弈一局
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <span>💡 采用标准 15 路五子棋规，星位标明天元，落子伴随温润石子脆响</span>
      </div>
    </div>
  );
}
