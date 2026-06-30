'use client';

import React from 'react';
import { GameStateData } from './useGameApi';

interface Props {
  gameType: string;
  state: GameStateData | null;
  onMove: (action: string, payload?: any) => void;
  onRestart: () => void;
  onClose: () => void;
  loading: boolean;
  children: (state: any, move: (action: string, payload?: any) => void) => React.ReactNode;
}

/** 通用游戏容器 — 包裹每个游戏，提供统一的分数/状态栏 */
export default function GameContainer({ gameType, state, onMove, onRestart, onClose, loading, children }: Props) {
  const data = state?.state;
  const isOver = state?.gameOver;
  const score = state?.score ?? 0;
  const winner = state?.winner;

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal" onClick={e => e.stopPropagation()}>
        <div className="game-header">
          <span className="game-title">{GAME_NAMES[gameType] || gameType}</span>
          <span className="game-score">分数: {score}</span>
          {isOver && (
            <span className="game-result">
              {winner ? `${winner === 'player' ? '你' : winner} 赢了！` : '游戏结束'}
            </span>
          )}
          <button className="game-btn" onClick={onRestart}>重新开始</button>
          <button className="game-close" onClick={onClose}>✕</button>
        </div>
        <div className="game-canvas-wrapper">
          {loading ? (
            <div className="game-loading">加载中...</div>
          ) : data ? (
            children(data, onMove)
          ) : (
            <div className="game-loading">点击重新开始开始游戏</div>
          )}
        </div>
        <style>{`
          .game-modal-overlay {
            position: fixed; inset: 0; z-index: 1000;
            background: rgba(0,0,0,0.7); display: flex;
            justify-content: center; align-items: center;
          }
          .game-modal {
            background: #1a1a2e; border-radius: 12px; padding: 16px;
            width: min(90vw, 560px); overflow: hidden;
            box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          }
          .game-header {
            display: flex; align-items: center; gap: 12px;
            padding: 8px 0 12px; color: #fff;
          }
          .game-title { font-size: 18px; font-weight: bold; }
          .game-score { font-size: 14px; color: #ffd700; margin-left: auto; }
          .game-result { font-size: 14px; color: #ff6b6b; font-weight: bold; }
          .game-btn {
            background: #4f8cff; color: #fff; border: none;
            padding: 4px 12px; border-radius: 6px; cursor: pointer;
            font-size: 13px;
          }
          .game-btn:hover { background: #3a7bf5; }
          .game-close {
            background: none; color: #aaa; border: none;
            font-size: 20px; cursor: pointer; padding: 0 4px;
          }
          .game-close:hover { color: #fff; }
          .game-canvas-wrapper {
            display: flex; justify-content: center; align-items: center;
            min-height: 400px; background: #16213e; border-radius: 8px;
          }
          .game-loading { color: #888; font-size: 16px; }
        `}</style>
      </div>
    </div>
  );
}

const GAME_NAMES: Record<string, string> = {
  '2048': '2048', 'tictactoe': '井字棋', 'gomoku': '五子棋',
  'minesweeper': '扫雷', 'sudoku': '数独', 'puzzle': '拼图',
  'memory': '记忆翻牌', 'hanoi': '汉诺塔', 'colorbynumber': '填色',
  'riddle': '猜谜', 'spotdiff': '找茬', 'wordsearch': '单词搜索',
  'pipeconnect': '水管连接', 'snake': '贪吃蛇', 'tetris': '俄罗斯方块',
  'breakout': '打砖块', 'flappy': '飞翔小鸟', 'pinball': '弹球',
  'typingrace': '打字竞速', 'maze': '迷宫探险',
};
