"use client";

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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

interface GameMeta {
  type: string;
  icon: string;
  name: string;
  category: 'arcade' | 'puzzle' | 'strategy' | 'reaction';
  categoryLabel: string;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLabel: string;
  desc: string;
  tag: string;
  hot?: boolean;
}

const ALL_GAMES: GameMeta[] = [
  // 🕹️ 经典街机
  { type: 'snake', icon: '🐍', name: '贪吃蛇', category: 'arcade', categoryLabel: '经典街机', difficulty: 'easy', difficultyLabel: '★☆☆ 休闲', desc: '经典红白机体验，吃红苹果身体变长', tag: '经典重温', hot: true },
  { type: 'tetris', icon: '🧱', name: '俄罗斯方块', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '七种形状方块掉落，横向消除得高分', tag: '国民爆款', hot: true },
  { type: 'breakout', icon: '🏏', name: '打砖块', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '移动反弹板，击碎全部多彩像素砖块', tag: '爽快消解' },
  { type: 'flappy', icon: '🐦', name: '飞翔小鸟', category: 'arcade', categoryLabel: '经典街机', difficulty: 'hard', difficultyLabel: '★★★ 抓狂', desc: '考验微操手感，精准扑翼穿梭绿色水管', tag: '虐心极限', hot: true },
  { type: 'pinball', icon: '🔴', name: '太空弹球', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '操控左右机械弹板，引爆得分缓冲核', tag: '科幻街机' },

  // 🧠 益智烧脑
  { type: '2048', icon: '🔢', name: '2048', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 烧脑', desc: '滑动方块合并相同数字，冲刺 2048 大关', tag: '经典数学', hot: true },
  { type: 'maze', icon: '🧭', name: '迷宫探险', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 烧脑', desc: '在迷雾与回路中寻找唯一的逃生之门', tag: '空间推理' },
  { type: 'minesweeper', icon: '💣', name: '扫雷大作战', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 逻辑', desc: '经典 Windows 逻辑排雷，插旗精准标记', tag: '逻辑推理', hot: true },
  { type: 'sudoku', icon: '🎯', name: '数独大师', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'hard', difficultyLabel: '★★★ 极度烧脑', desc: '九宫格填入 1~9，行列宫绝不重复', tag: '数理逻辑' },
  { type: 'hanoi', icon: '🗼', name: '汉诺塔推演', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'hard', difficultyLabel: '★★★ 递归算法', desc: '大盘永不可压小盘，计算机经典递归模型', tag: '算法之美' },
  { type: 'pipeconnect', icon: '🔄', name: '水管回路', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 策略', desc: '旋转各管道段，构建通畅的闭合水流回路', tag: '物理回路' },

  // ⚔️ 策略对弈
  { type: 'gomoku', icon: '⚫', name: '五子棋对决', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'medium', difficultyLabel: '★★☆ 策略', desc: '黑白交替对弈，率先连成五子者称霸', tag: '人机对战', hot: true },
  { type: 'tictactoe', icon: '⭕', name: '井字棋', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'easy', difficultyLabel: '★☆☆ 极速', desc: '3×3 极速智斗，三子成线决胜负', tag: '休闲博弈' },
  { type: 'puzzle', icon: '🧩', name: '九宫拼图', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'medium', difficultyLabel: '★★☆ 空间', desc: '滑动唯一空格，将乱序方块还原归位', tag: '空间思维' },

  // ⚡ 反应手速
  { type: 'typingrace', icon: '⌨️', name: '打字竞速', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 手速', desc: '击落屏幕关键词，程序员必备指法挑战', tag: '极客手速', hot: true },
  { type: 'memory', icon: '🃏', name: '记忆翻牌', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 记忆', desc: '记住卡片花色，快速配对消除全场', tag: '脑力锻炼' },
  { type: 'spotdiff', icon: '👁️', name: '火眼找茬', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 观察', desc: '比对两幅细节画面，快速找出所有不同点', tag: '眼力考验' },
  { type: 'colorbynumber', icon: '🎨', name: '数字填色', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 治愈', desc: '像素点阵上色，释放压力的解压涂鸦', tag: '治愈解压' },
  { type: 'wordsearch', icon: '🔍', name: '单词搜索', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 词汇', desc: '在字母矩阵中找出横竖隐藏的技术英语词汇', tag: '词汇拓展' },
  { type: 'riddle', icon: '❓', name: '趣味猜谜', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 益智', desc: '传统文化灯谜与极客脑筋急转弯', tag: '趣味问答' },
];

const CATEGORIES = [
  { id: 'all', name: '🔥 全部游戏', count: ALL_GAMES.length },
  { id: 'arcade', name: '🕹️ 经典街机', count: ALL_GAMES.filter(g => g.category === 'arcade').length },
  { id: 'puzzle', name: '🧠 益智烧脑', count: ALL_GAMES.filter(g => g.category === 'puzzle').length },
  { id: 'strategy', name: '⚔️ 策略对弈', count: ALL_GAMES.filter(g => g.category === 'strategy').length },
  { id: 'reaction', name: '⚡ 反应手速', count: ALL_GAMES.filter(g => g.category === 'reaction').length },
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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentGames, setRecentGames] = useState<string[]>([]);
  const [highScoresMap, setHighScoresMap] = useState<Record<string, number>>({});

  const { createGame, makeMove, startStream, stopStream, stopGame, loading, error } = useGameApi(selectedGame || '');
  const sessionVersion = useRef(0);
  const moveQueue = useRef<Promise<void>>(Promise.resolve());

  // 读取常玩游戏与最高分
  useEffect(() => {
    try {
      const rec = localStorage.getItem('partjava_recent_games');
      if (rec) setRecentGames(JSON.parse(rec));

      const scores: Record<string, number> = {};
      ALL_GAMES.forEach(g => {
        const sc = localStorage.getItem(`partjava_best_score_${g.type}`);
        if (sc) scores[g.type] = Number(sc);
      });
      setHighScoresMap(scores);
    } catch {}
  }, []);

  const openGame = useCallback(async (gameType: string) => {
    const version = ++sessionVersion.current;
    stopStream();
    if (gameId && selectedGame) void stopGame(gameId);
    setSelectedGame(gameType);
    setGameState(null);
    setGameId(null);

    // 记录常玩
    try {
      const nextRecent = [gameType, ...recentGames.filter(g => g !== gameType)].slice(0, 5);
      setRecentGames(nextRecent);
      localStorage.setItem('partjava_recent_games', JSON.stringify(nextRecent));
    } catch {}

    const state = await createGame(undefined, gameType);
    if (version !== sessionVersion.current) {
      if (state) void stopGame(state.gameId, gameType);
      return;
    }
    if (state) {
      setGameState(state);
      setGameId(state.gameId);
    }
  }, [recentGames, createGame, stopStream, stopGame, gameId, selectedGame]);

  const closeGame = useCallback(() => {
    ++sessionVersion.current;
    stopStream();
    if (gameId && selectedGame) void stopGame(gameId);
    setSelectedGame(null);
    setGameState(null);
    setGameId(null);

    // 更新最高分展示
    try {
      const scores: Record<string, number> = {};
      ALL_GAMES.forEach(g => {
        const sc = localStorage.getItem(`partjava_best_score_${g.type}`);
        if (sc) scores[g.type] = Number(sc);
      });
      setHighScoresMap(scores);
    } catch {}
  }, [gameId, selectedGame, stopGame, stopStream]);

  const handleMove = useCallback((action: string, payload?: any) => {
    if (!gameId || !selectedGame) return;
    if (action === '__local_state' && ['breakout', 'pinball'].includes(selectedGame)) {
      setGameState(previous => previous && previous.gameId === gameId ? {
        ...previous, score: payload.score, gameOver: payload.gameOver,
        winner: payload.won ? 'player' : null,
      } : previous);
      return;
    }
    const version = sessionVersion.current;
    moveQueue.current = moveQueue.current.then(async () => {
      if (version !== sessionVersion.current) return;
      const next = await makeMove(gameId, action, payload);
      if (next && version === sessionVersion.current) {
        // 实时状态以 SSE 为准，避免较早的输入响应让画面倒退。
        if (!['snake', 'tetris', 'flappy'].includes(selectedGame) || next.gameOver) setGameState(next);
      }
    });
  }, [gameId, selectedGame, makeMove]);

  const handleRestart = useCallback(async () => {
    if (!selectedGame) return;
    const version = ++sessionVersion.current;
    stopStream();
    if (gameId) void stopGame(gameId);
    const state = await createGame(undefined, selectedGame);
    if (version !== sessionVersion.current) {
      if (state) void stopGame(state.gameId, selectedGame);
      return;
    }
    if (state) {
      setGameState(state);
      setGameId(state.gameId);
    }
  }, [selectedGame, gameId, stopGame, stopStream, createGame]);

  // 本地物理游戏只运行一套引擎；蛇和方块使用后端状态流。
  useEffect(() => {
    if (!selectedGame || !gameId || !['snake', 'tetris', 'flappy'].includes(selectedGame)) return;
    const version = sessionVersion.current;
    startStream(gameId, data => {
      if (version === sessionVersion.current) setGameState(data);
    });
    return stopStream;
  }, [selectedGame, gameId, startStream, stopStream]);

  // 过滤后的游戏列表
  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter(g => {
      const matchesCat = activeCategory === 'all' || g.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q || g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q) || g.tag.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const Renderer = selectedGame ? GAME_COMPONENTS[selectedGame] : null;

  return (
    <div className="game-center-root">
      {/* 顶部国风极客背景装饰 */}
      <div className="w-full overflow-hidden">
        <InkWashDecoration variant="landscape" height={160} />
      </div>
      <InkWashDecoration variant="birds" height={45} className="-mt-3" />

      {/* 极客电竞感 Hero 头部 */}
      <div className="hero-banner">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span>PARTJAVA · ARCADE CENTER</span>
          </div>
          <h1 className="hero-title">极客解压游戏中心</h1>
          <p className="hero-desc">
            20 款原生经典小游戏 · Java 后端状态流与物理引擎驱动 · 本地战绩与音效同步
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="num">20</span>
              <span className="lbl">经典玩法</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="num">4</span>
              <span className="lbl">大分类区</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="num">60</span>
              <span className="lbl">FPS极速流</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="num">100%</span>
              <span className="lbl">移动触控兼容</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content-container">
        {/* 常玩快捷入口栏 */}
        {recentGames.length > 0 && (
          <div className="recent-games-bar">
            <span className="recent-label">⏱️ 最近常玩：</span>
            <div className="recent-tags">
              {recentGames.map(gType => {
                const meta = ALL_GAMES.find(g => g.type === gType);
                if (!meta) return null;
                return (
                  <button
                    key={gType}
                    onClick={() => openGame(gType)}
                    className="recent-pill hover-scale"
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.name}</span>
                    {highScoresMap[gType] != null && highScoresMap[gType] > 0 && (
                      <span className="recent-score">{highScoresMap[gType]}分</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 检索与分类筛选导航 */}
        <div className="filter-nav-bar">
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="search-box-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索游戏名称或关键字..."
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>

        {/* 游戏卡片网格 */}
        <div className="games-grid">
          {filteredGames.map(game => {
            const best = highScoresMap[game.type] || 0;
            return (
              <div
                key={game.type}
                className="game-card hover-glow"
                onClick={() => openGame(game.type)}
              >
                {/* 顶部标签 */}
                <div className="card-top-row">
                  <span className="category-pill">{game.categoryLabel}</span>
                  {game.hot && <span className="hot-pill">🔥 热门</span>}
                  {best > 0 && (
                    <span className="best-score-badge" title="你的历史最高纪录">
                      🏆 {best}
                    </span>
                  )}
                </div>

                {/* 图标与标题 */}
                <div className="card-center">
                  <span className="game-icon animate-float">{game.icon}</span>
                  <h3 className="game-name">{game.name}</h3>
                  <p className="game-desc">{game.desc}</p>
                </div>

                {/* 底部信息条 */}
                <div className="card-bottom-row">
                  <span className="diff-pill">{game.difficultyLabel}</span>
                  <span className="start-btn-label">立即开玩 →</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🎮</span>
            <p>未找到匹配「{searchQuery}」的小游戏，换个搜索词试试吧~</p>
            <button className="clear-filter-btn" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              重置筛选条件
            </button>
          </div>
        )}
      </div>

      {error && <div role="alert" className="fixed bottom-6 left-1/2 z-[1100] -translate-x-1/2 rounded-xl bg-red-950 px-5 py-3 text-red-100">{error}</div>}
      {/* 游戏弹窗通用容器 */}
      {selectedGame && Renderer && (
        <GameContainer
          gameType={selectedGame}
          state={gameState}
          onMove={handleMove}
          onRestart={handleRestart}
          onClose={closeGame}
          loading={loading}
        >
          {(data, move) => <Renderer key={gameId || selectedGame} state={data} onMove={move} />}
        </GameContainer>
      )}

      {/* 底部国风点缀 */}
      <div className="w-full overflow-hidden mt-12">
        <InkWashDecoration variant="bamboo" height={90} />
        <InkWashDecoration variant="landscape" height={180} />
      </div>

      <style jsx>{`
        .game-center-root {
          min-height: 100vh;
          background: #0f1118;
          color: #f4eadc;
        }

        .hero-banner {
          background: radial-gradient(circle at 50% 20%, #202b3c 0%, #111420 85%);
          padding: 32px 20px 36px;
          text-align: center;
          border-bottom: 1px solid rgba(212, 163, 106, 0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .hero-inner {
          max-width: 860px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(212, 163, 106, 0.12);
          border: 1px solid rgba(212, 163, 106, 0.3);
          color: #f5d5a3;
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }
        .hero-badge .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #d4a36a; box-shadow: 0 0 8px #d4a36a;
        }
        .hero-title {
          font-size: 2.3em;
          font-weight: 800;
          margin: 0 0 10px;
          color: #fff;
          font-family: serif;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .hero-desc {
          font-size: 0.95em;
          color: #a8b2c4;
          max-width: 640px;
          margin: 0 auto 20px;
          line-height: 1.6;
        }

        .hero-stats-row {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.04);
          padding: 8px 24px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-stat-item .num {
          font-weight: 800;
          color: #f3c687;
          font-family: monospace;
          font-size: 16px;
        }
        .hero-stat-item .lbl {
          font-size: 11px;
          color: #8c97aa;
        }
        .hero-stat-sep {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.15);
        }

        .main-content-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 20px 40px;
        }

        .recent-games-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 10px 16px;
          border-radius: 12px;
          margin-bottom: 22px;
        }
        .recent-label {
          font-size: 12px;
          color: #a0a8b8;
          font-weight: 600;
        }
        .recent-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .recent-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(212,163,106,0.12);
          border: 1px solid rgba(212,163,106,0.25);
          color: #fcebd5;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .recent-pill:hover {
          background: rgba(212,163,106,0.28);
          border-color: #d4a36a;
        }
        .recent-score {
          font-size: 10px;
          background: rgba(0,0,0,0.3);
          padding: 1px 5px;
          border-radius: 4px;
          color: #56b6c2;
          font-family: monospace;
        }

        .filter-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 24px;
        }
        .category-tabs {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cat-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 10px;
          background: #181b26;
          border: 1px solid rgba(255,255,255,0.08);
          color: #9ba4b5;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-tab:hover {
          color: #fff;
          background: #202434;
        }
        .cat-tab.active {
          background: linear-gradient(135deg, #d4a36a 0%, #a87942 100%);
          color: #12100d;
          font-weight: 700;
          border-color: #d4a36a;
          box-shadow: 0 4px 14px rgba(212,163,106,0.25);
        }
        .cat-count {
          font-size: 11px;
          opacity: 0.8;
          font-family: monospace;
        }

        .search-box-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          min-width: 240px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 13px;
          opacity: 0.6;
        }
        .search-input {
          width: 100%;
          padding: 8px 32px 8px 34px;
          border-radius: 10px;
          background: #181b26;
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: #d4a36a;
        }
        .clear-search-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #777;
          cursor: pointer;
          font-size: 12px;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .game-card {
          background: linear-gradient(145deg, #181b26 0%, #131520 100%);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          min-height: 180px;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          position: relative;
          overflow: hidden;
        }
        .game-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 163, 106, 0.45);
          box-shadow: 0 14px 34px rgba(0,0,0,0.5), 0 0 20px rgba(212,163,106,0.12);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }
        .category-pill {
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          color: #a4adc0;
          font-weight: 500;
        }
        .hot-pill {
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(224, 108, 117, 0.18);
          color: #ff858d;
          font-weight: 600;
        }
        .best-score-badge {
          margin-left: auto;
          font-size: 11px;
          color: #56b6c2;
          font-weight: bold;
          font-family: monospace;
          background: rgba(86,182,194,0.12);
          padding: 2px 6px;
          border-radius: 6px;
        }

        .card-center {
          text-align: center;
          margin-bottom: 12px;
        }
        .game-icon {
          font-size: 2.4em;
          display: inline-block;
          margin-bottom: 6px;
          transition: transform 0.2s;
        }
        .game-card:hover .game-icon {
          transform: scale(1.15) rotate(4deg);
        }
        .game-name {
          font-size: 16px;
          font-weight: 700;
          color: #f7efe4;
          margin: 0 0 4px;
          letter-spacing: 0.02em;
        }
        .game-desc {
          font-size: 11px;
          color: #8c97aa;
          margin: 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .diff-pill {
          font-size: 11px;
          color: #d4a36a;
          font-weight: 500;
        }
        .start-btn-label {
          font-size: 11px;
          color: #56b6c2;
          font-weight: 600;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .game-card:hover .start-btn-label {
          opacity: 1;
          color: #d4a36a;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          border: 1px dashed rgba(255,255,255,0.1);
        }
        .empty-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }
        .clear-filter-btn {
          margin-top: 14px;
          background: #d4a36a;
          color: #12100d;
          border: none;
          padding: 6px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 1100px) {
          .games-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .games-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .hero-title { font-size: 1.8em; }
          .hero-stats-row { display: none; }
          .search-box-wrapper { width: 100%; min-width: 0; }
        }
        @media (max-width: 480px) {
          .games-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
