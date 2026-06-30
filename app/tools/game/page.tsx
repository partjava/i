"use client";

import React, { useState, useCallback, useEffect } from 'react';
import InkWashDecoration from '@shared/components/InkWashDecoration';
import GameContainer from './components/GameContainer';
import { useGameApi, GameStateData } from './components/useGameApi';
import Game2048 from './components/games/Game2048';
import TicTacToe from './components/games/TicTacToe';
import Gomoku from './components/games/Gomoku';
import Minesweeper from './components/games/Minesweeper';
import Sudoku from './components/games/Sudoku';
import Puzzle from './components/games/Puzzle';
import Memory from './components/games/Memory';
import Hanoi from './components/games/Hanoi';
import ColorByNumber from './components/games/ColorByNumber';
import Riddle from './components/games/Riddle';
import SpotDiff from './components/games/SpotDiff';
import WordSearch from './components/games/WordSearch';
import PipeConnect from './components/games/PipeConnect';
import Snake from './components/games/Snake';
import Tetris from './components/games/Tetris';
import Breakout from './components/games/Breakout';
import Flappy from './components/games/Flappy';
import Pinball from './components/games/Pinball';
import TypingRace from './components/games/TypingRace';
import Maze from './components/games/Maze';

const GAMES = [
  { type: 'snake', icon: '🐍', name: '贪吃蛇' },
  { type: 'tetris', icon: '🧱', name: '俄罗斯方块' },
  { type: 'memory', icon: '🃏', name: '记忆翻牌' },
  { type: '2048', icon: '🔢', name: '2048' },
  { type: 'hanoi', icon: '🗼', name: '汉诺塔' },
  { type: 'maze', icon: '🧭', name: '迷宫探险' },
  { type: 'wordsearch', icon: '🔍', name: '单词搜索' },
  { type: 'typingrace', icon: '⌨️', name: '打字竞速' },
  { type: 'minesweeper', icon: '💣', name: '扫雷' },
  { type: 'puzzle', icon: '🧩', name: '拼图' },
  { type: 'gomoku', icon: '⚫', name: '五子棋' },
  { type: 'spotdiff', icon: '👁️', name: '找茬游戏' },
  { type: 'pipeconnect', icon: '🔄', name: '水管连接' },
  { type: 'colorbynumber', icon: '🎨', name: '填色游戏' },
  { type: 'riddle', icon: '❓', name: '猜谜游戏' },
  { type: 'breakout', icon: '🧱', name: '打砖块' },
  { type: 'tictactoe', icon: '⭕', name: '井字棋' },
  { type: 'flappy', icon: '🐦', name: '飞翔小鸟' },
  { type: 'pinball', icon: '🔴', name: '弹球' },
  { type: 'sudoku', icon: '🔢', name: '数独' },
];

const GAME_COMPONENTS: Record<string, React.ComponentType<any>> = {
  '2048': Game2048, tictactoe: TicTacToe, gomoku: Gomoku,
  minesweeper: Minesweeper, sudoku: Sudoku, puzzle: Puzzle,
  memory: Memory, hanoi: Hanoi, colorbynumber: ColorByNumber,
  riddle: Riddle, spotdiff: SpotDiff, wordsearch: WordSearch,
  pipeconnect: PipeConnect, snake: Snake, tetris: Tetris,
  breakout: Breakout, flappy: Flappy, pinball: Pinball,
  typingrace: TypingRace, maze: Maze,
};

export default function GamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameStateData | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const api = useGameApi(selectedGame || '');

  const openGame = useCallback(async (gameType: string) => {
    setSelectedGame(gameType);
    setGameState(null);
    setGameId(null);
    // Create game immediately
    const state = await api.createGame();
    if (state) {
      setGameState(state);
      setGameId(state.gameId);
    }
  }, []);

  const closeGame = useCallback(() => {
    if (gameId && selectedGame) api.stopGame(gameId);
    setSelectedGame(null);
    setGameState(null);
    setGameId(null);
  }, [gameId, selectedGame]);

  const handleMove = useCallback(async (action: string, payload?: any) => {
    if (!gameId || !selectedGame) return;
    const newState = await api.makeMove(gameId, action, payload);
    if (newState) setGameState(newState);
  }, [gameId, selectedGame]);

  const handleRestart = useCallback(async () => {
    if (!selectedGame) return;
    if (gameId) api.stopGame(gameId);
    const state = await api.createGame();
    if (state) {
      setGameState(state);
      setGameId(state.gameId);
    }
  }, [selectedGame]);

  // SSE for realtime games
  const realtimeGames = ['snake', 'tetris', 'breakout', 'flappy', 'pinball'];
  useEffect(() => {
    if (!selectedGame || !gameId || !realtimeGames.includes(selectedGame)) return;
    api.startStream(gameId, (data) => setGameState(data));
    return () => api.stopStream();
  }, [selectedGame, gameId]);

  const Renderer = selectedGame ? GAME_COMPONENTS[selectedGame] : null;

  return (
    <div className="ai-container">
      <div className="w-full overflow-hidden">
        <InkWashDecoration variant="landscape" height={180} />
      </div>
      <InkWashDecoration variant="birds" height={50} className="-mt-2" />

      <div className="header">
        <div className="header-inner">
          <h1>小游戏</h1>
          <p>Java 后端驱动 · React Canvas 渲染</p>
        </div>
      </div>

      <div className="games-only-container">
        <div className="games-grid">
          {GAMES.map(game => (
            <button key={game.type} className="game-card" onClick={() => openGame(game.type)}>
              <span className="game-icon">{game.icon}</span>
              <span className="game-title">{game.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedGame && Renderer && (
        <GameContainer
          gameType={selectedGame}
          state={gameState}
          onMove={handleMove}
          onRestart={handleRestart}
          onClose={closeGame}
          loading={api.loading}
        >
          {(data, move) => <Renderer state={data} onMove={move} />}
        </GameContainer>
      )}

      <style jsx>{`
        .header {
          background: linear-gradient(90deg, #0C1F3D 0%, #6b7d99 100%);
          color: #fff; padding: 20px 0; text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }
        .header-inner { max-width: 900px; margin: 0 auto; padding: 0 32px; }
        .header h1 { font-size: 2.2em; margin-bottom: 6px; font-weight: 700; }
        .header p { font-size: 1em; opacity: 0.95; margin: 0; }

        .games-only-container { padding: 24px; }
        .games-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1200px;
          margin: 20px auto;
        }
        .game-card {
          height: 120px;
          background: #f5f7fa; border-radius: 12px;
          box-shadow: 0 2px 12px rgba(139,115,85,0.1);
          border: 1px solid #b8bfcc;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform .15s, box-shadow .15s;
        }
        .game-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(139,115,85,0.15); }
        .game-icon { font-size: 2.2em; margin-bottom: 8px; }
        .game-title { color: #6b7d99; font-weight: 600; }

        @media (max-width: 1100px) { .games-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 700px) { .games-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div className="w-full overflow-hidden mt-8">
        <InkWashDecoration variant="bamboo" height={100} />
        <InkWashDecoration variant="landscape" height={200} />
      </div>
    </div>
  );
}
