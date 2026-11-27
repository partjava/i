'use client';

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import SiteFooter from '@shared/components/SiteFooter';
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
  features: string;
  tag: string;
  hot?: boolean;
}

const LOCAL_ARCADE_GAMES = new Set(['snake', 'tetris', 'breakout', 'flappy', 'pinball']);

const ALL_GAMES: GameMeta[] = [
  // 🕹️ 经典街机
  { type: 'snake', icon: '🐍', name: '贪吃蛇', category: 'arcade', categoryLabel: '经典街机', difficulty: 'easy', difficultyLabel: '★☆☆ 休闲', desc: '丝滑插值游走，吞噬金果冰莓叠连击', features: '3模式 · 道具连击', tag: '经典重温', hot: true },
  { type: 'tetris', icon: '🧱', name: '俄罗斯方块', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '7-Bag 随机、SRS 踢墙与暂存连消系统', features: 'SRS 旋转 · 暂存预览', tag: '国民爆款', hot: true },
  { type: 'breakout', icon: '🏏', name: '打砖块', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '8大特色关卡与3档难度，多球分裂、双管激光与爆破连锁', features: '8关挑战 · 3档难度 · 激光火球', tag: '爽快消解' },
  { type: 'flappy', icon: '🐦', name: '飞翔小鸟', category: 'arcade', categoryLabel: '经典街机', difficulty: 'hard', difficultyLabel: '★★★ 挑战', desc: '昼夜流转穿管，拾取金币与可充能气泡盾', features: '昼夜变幻 · 护盾金币', tag: '微操极限', hot: true },
  { type: 'pinball', icon: '🔴', name: '太空弹球', category: 'arcade', categoryLabel: '经典街机', difficulty: 'medium', difficultyLabel: '★★☆ 进阶', desc: '蓄力拉簧发射，触发顶道倍率与护球盾', features: '蓄力发射 · 倍率弹道', tag: '科幻街机', hot: true },

  // 🧠 益智烧脑
  { type: '2048', icon: '🔢', name: '2048', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 烧脑', desc: '滑动方块合并相同数字，冲刺 2048 大关', features: '多棋盘 · 撤回重排', tag: '经典数学', hot: true },
  { type: 'maze', icon: '🧭', name: '迷宫探险', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 烧脑', desc: '在迷雾与回路中寻钥匙解锁逃生之门', features: '战争迷雾 · 多阶地图', tag: '空间推理' },
  { type: 'minesweeper', icon: '💣', name: '扫雷大作战', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 逻辑', desc: '经典逻辑排雷，首点安全并支持快捷标旗', features: '首击保护 · 多级难度', tag: '逻辑推理', hot: true },
  { type: 'sudoku', icon: '🎯', name: '数独大师', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'hard', difficultyLabel: '★★★ 极度烧脑', desc: '九宫格填入 1~9，支持草稿笔记与冲突提示', features: '候选笔记 · 错格高亮', tag: '数理逻辑' },
  { type: 'hanoi', icon: '🗼', name: '汉诺塔推演', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'hard', difficultyLabel: '★★★ 递归算法', desc: '大盘永不可压小盘，体验经典递归自动演进', features: '步数评级 · 递归演示', tag: '算法之美' },
  { type: 'pipeconnect', icon: '🔄', name: '水管回路', category: 'puzzle', categoryLabel: '益智烧脑', difficulty: 'medium', difficultyLabel: '★★☆ 策略', desc: '旋转各管道段，构建通畅的闭合水流回路', features: '通水高亮 · 逐步通关', tag: '物理回路' },

  // ⚔️ 策略对弈
  { type: 'gomoku', icon: '⚫', name: '五子棋对决', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'medium', difficultyLabel: '★★☆ 策略', desc: '黑白交替对弈，挑战多难度智能棋手', features: '多阶 AI · 双人对战', tag: '人机对战', hot: true },
  { type: 'tictactoe', icon: '⭕', name: '井字棋', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'easy', difficultyLabel: '★☆☆ 极速', desc: '3×3 极速智斗，支持不可战胜 Minimax AI', features: 'Minimax AI · 极速对局', tag: '休闲博弈' },
  { type: 'puzzle', icon: '🧩', name: '九宫拼图', category: 'strategy', categoryLabel: '策略对弈', difficulty: 'medium', difficultyLabel: '★★☆ 空间', desc: '滑动唯一空格，将乱序方块还原归位', features: '可解校验 · 多尺寸阶', tag: '空间思维' },

  // ⚡ 反应手速
  { type: 'typingrace', icon: '⌨️', name: '打字竞速', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 手速', desc: '精准敲击代码片段，测算实时 WPM 与准确率', features: '真实代码 · WPM 实时统计', tag: '极客手速', hot: true },
  { type: 'memory', icon: '🃏', name: '记忆翻牌', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 记忆', desc: '记住卡片花色，快速连续配对叠加连击分', features: '开局预览 · 连击计分', tag: '脑力锻炼' },
  { type: 'spotdiff', icon: '👁️', name: '火眼找茬', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 观察', desc: '比对两幅细节画面，快速找出全部隐藏差异', features: '多主题图 · 提示定位', tag: '眼力考验' },
  { type: 'colorbynumber', icon: '🎨', name: '数字填色', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 治愈', desc: '像素点阵上色，释放压力的治愈系涂鸦', features: '多幅像素画 · 进度治愈', tag: '治愈解压' },
  { type: 'wordsearch', icon: '🔍', name: '单词搜索', category: 'reaction', categoryLabel: '反应手速', difficulty: 'medium', difficultyLabel: '★★☆ 词汇', desc: '在字母矩阵中找出横竖斜向隐藏的技术英语词', features: '八向连词 · 技术词库', tag: '词汇拓展' },
  { type: 'riddle', icon: '❓', name: '趣味猜谜', category: 'reaction', categoryLabel: '反应手速', difficulty: 'easy', difficultyLabel: '★☆☆ 益智', desc: '传统文化灯谜与极客脑筋急转弯轮番来袭', features: '连胜加成 · 锦囊提示', tag: '趣味问答' },
];

const CATEGORIES = [
  { id: 'all', name: '🔥 全部游戏', count: ALL_GAMES.length },
  { id: 'arcade', name: '🕹️ 经典街机', count: ALL_GAMES.filter(g => g.category === 'arcade').length },
  { id: 'puzzle', name: '🧠 益智烧脑', count: ALL_GAMES.filter(g => g.category === 'puzzle').length },
  { id: 'strategy', name: '⚔️ 策略对弈', count: ALL_GAMES.filter(g => g.category === 'strategy').length },
  { id: 'reaction', name: '⚡ 反应手速', count: ALL_GAMES.filter(g => g.category === 'reaction').length },
];

const CATEGORY_ACCENT: Record<GameMeta['category'], { ring: string; bg: string; bar: string; chip: string }> = {
  arcade: {
    ring: 'rgba(212, 173, 114, 0.38)',
    bg: 'rgba(212, 173, 114, 0.14)',
    bar: 'linear-gradient(90deg, #d4ad72, #f5d5a3)',
    chip: '#b88635',
  },
  puzzle: {
    ring: 'rgba(96, 138, 196, 0.36)',
    bg: 'rgba(96, 138, 196, 0.13)',
    bar: 'linear-gradient(90deg, #3b6fb6, #7da8e0)',
    chip: '#3b6fb6',
  },
  strategy: {
    ring: 'rgba(46, 160, 128, 0.36)',
    bg: 'rgba(46, 160, 128, 0.13)',
    bar: 'linear-gradient(90deg, #1f7a5c, #49b890)',
    chip: '#1f7a5c',
  },
  reaction: {
    ring: 'rgba(154, 110, 210, 0.36)',
    bg: 'rgba(154, 110, 210, 0.13)',
    bar: 'linear-gradient(90deg, #7c4dff, #b388ff)',
    chip: '#7c4dff',
  },
};

const GAME_COMPONENTS: Record<string, React.ComponentType<any>> = {
  '2048': Game2048, tictactoe: TicTacToe, gomoku: Gomoku,
  minesweeper: Minesweeper, sudoku: Sudoku, puzzle: Puzzle,
  memory: Memory, hanoi: Hanoi, colorbynumber: ColorByNumber,
  riddle: Riddle, spotdiff: SpotDiff, wordsearch: WordSearch,
  pipeconnect: PipeConnect, snake: Snake, tetris: Tetris,
  breakout: Breakout, flappy: Flappy, pinball: Pinball,
  typingrace: TypingRace, maze: Maze,
};

function makeLocalSession(gameType: string): GameStateData {
  return {
    gameId: `local-${gameType}-${Date.now()}`,
    gameType,
    gameOver: false,
    score: 0,
    winner: null,
    state: {},
  };
}

export default function GamePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameStateData | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentGames, setRecentGames] = useState<string[]>([]);
  const [highScoresMap, setHighScoresMap] = useState<Record<string, number>>({});

  const { createGame, makeMove, stopStream, stopGame, loading } = useGameApi(selectedGame || '');
  const sessionVersion = useRef(0);
  const moveQueue = useRef<Promise<void>>(Promise.resolve());

  const refreshHighScores = useCallback(() => {
    try {
      const scores: Record<string, number> = {};
      ALL_GAMES.forEach(g => {
        const sc = localStorage.getItem(`partjava_best_score_${g.type}`);
        if (sc) scores[g.type] = Number(sc);
      });
      setHighScoresMap(scores);
    } catch {}
  }, []);

  // 读取常玩游戏与最高分
  useEffect(() => {
    try {
      const rec = localStorage.getItem('partjava_recent_games');
      if (rec) setRecentGames(JSON.parse(rec));
    } catch {}
    refreshHighScores();
  }, [refreshHighScores]);

  const startSessionForGame = useCallback(async (gameType: string, version: number) => {
    if (LOCAL_ARCADE_GAMES.has(gameType)) {
      const localState = makeLocalSession(gameType);
      setGameState(localState);
      setGameId(localState.gameId);
      return;
    }

    const state = await createGame(undefined, gameType);
    if (version !== sessionVersion.current) {
      if (state && !state.gameId.startsWith('local-')) void stopGame(state.gameId, gameType);
      return;
    }
    if (state) {
      setGameState(state);
      setGameId(state.gameId);
    } else {
      // 后端不可达时自动降级为纯本地对局，确保所有益智与策略游戏均可直接畅玩
      const fallback = makeLocalSession(gameType);
      setGameState(fallback);
      setGameId(fallback.gameId);
    }
  }, [createGame, stopGame]);

  const openGame = useCallback(async (gameType: string) => {
    const version = ++sessionVersion.current;
    stopStream();
    if (gameId && selectedGame && !gameId.startsWith('local-')) void stopGame(gameId, selectedGame);
    setSelectedGame(gameType);
    setGameState(null);
    setGameId(null);

    try {
      const nextRecent = [gameType, ...recentGames.filter(g => g !== gameType)].slice(0, 6);
      setRecentGames(nextRecent);
      localStorage.setItem('partjava_recent_games', JSON.stringify(nextRecent));
    } catch {}

    await startSessionForGame(gameType, version);
  }, [recentGames, startSessionForGame, stopStream, stopGame, gameId, selectedGame]);

  const closeGame = useCallback(() => {
    ++sessionVersion.current;
    stopStream();
    if (gameId && selectedGame && !gameId.startsWith('local-')) void stopGame(gameId, selectedGame);
    setSelectedGame(null);
    setGameState(null);
    setGameId(null);
    refreshHighScores();
  }, [gameId, selectedGame, stopGame, stopStream, refreshHighScores]);

  const handleMove = useCallback((action: string, payload?: any) => {
    if (!gameId || !selectedGame) return;

    if (action === '__local_state') {
      const nextScore = typeof payload?.score === 'number' ? payload.score : 0;
      const isOver = Boolean(payload?.gameOver);
      const isWon = Boolean(payload?.won);
      setGameState(previous => previous && previous.gameId === gameId ? {
        ...previous,
        score: nextScore,
        gameOver: isOver,
        winner: isWon ? 'player' : null,
      } : previous);
      try {
        const key = `partjava_best_score_${selectedGame}`;
        const prevBest = Number(localStorage.getItem(key) || '0');
        if (nextScore > prevBest) {
          localStorage.setItem(key, String(nextScore));
          setHighScoresMap(prev => ({ ...prev, [selectedGame]: nextScore }));
        }
      } catch {}
      return;
    }

    if (gameId.startsWith('local-') || LOCAL_ARCADE_GAMES.has(selectedGame)) {
      return;
    }

    const version = sessionVersion.current;
    moveQueue.current = moveQueue.current.then(async () => {
      if (version !== sessionVersion.current) return;
      const next = await makeMove(gameId, action, payload);
      if (next && version === sessionVersion.current) {
        setGameState(next);
      }
    });
  }, [gameId, selectedGame, makeMove]);

  const handleRestart = useCallback(async () => {
    if (!selectedGame) return;
    const version = ++sessionVersion.current;
    stopStream();
    if (gameId && !gameId.startsWith('local-')) void stopGame(gameId, selectedGame);
    await startSessionForGame(selectedGame, version);
  }, [selectedGame, gameId, stopGame, stopStream, startSessionForGame]);

  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter(g => {
      const matchesCat = activeCategory === 'all' || g.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.desc.toLowerCase().includes(q) ||
        g.features.toLowerCase().includes(q) ||
        g.tag.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const Renderer = selectedGame ? GAME_COMPONENTS[selectedGame] : null;
  const totalBestScore = useMemo(
    () => Object.values(highScoresMap).reduce((sum, val) => sum + (val || 0), 0),
    [highScoresMap]
  );

  return (
    <div className="game-center-root min-h-[calc(100vh-70px)] text-content-primary relative overflow-hidden flex flex-col">
      {/* 禾硙游艺坊 Hero 头部 */}
      <div className="hero-banner relative z-10">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span>UNOLGY · 禾硙游艺解压馆</span>
          </div>
          <h1 className="hero-title">极客解压游戏中心</h1>
          <p className="hero-desc">
            20 款原生 60FPS 经典小游戏 · 本地零延迟物理引擎 · 实时战绩与复古合成音效
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="num">20</span>
              <span className="lbl">精选玩法</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="num">60 FPS</span>
              <span className="lbl">零延迟引擎</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <span className="num">4</span>
              <span className="lbl">主题专区</span>
            </div>
            {totalBestScore > 0 && (
              <>
                <div className="hero-stat-sep" />
                <div className="hero-stat-item">
                  <span className="num">{totalBestScore}</span>
                  <span className="lbl">累计高分</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="main-content-container relative z-10">
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
              placeholder="搜索游戏名称、机制或标签..."
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
            const accent = CATEGORY_ACCENT[game.category];
            return (
              <div
                key={game.type}
                data-game-card={game.type}
                className="game-card"
                onClick={() => openGame(game.type)}
              >
                <div className="card-accent-strip" style={{ background: accent.bar }} />

                {/* 顶部标签 */}
                <div className="card-top-row">
                  <span className="category-pill">{game.categoryLabel}</span>
                  {game.hot && <span className="hot-pill">🔥 热门</span>}
                  {best > 0 && (
                    <span className="best-score-badge" title="历史最高纪录">
                      🏆 {best}
                    </span>
                  )}
                </div>

                {/* 图标徽章与标题 */}
                <div className="card-center">
                  <div
                    className="icon-medallion"
                    style={{
                      background: accent.bg,
                      borderColor: accent.ring,
                    }}
                  >
                    <span className="game-icon">{game.icon}</span>
                  </div>
                  <h3 className="game-name">{game.name}</h3>
                  <p className="game-desc">{game.desc}</p>
                </div>

                {/* 机制亮点 + 难度 */}
                <div className="card-feature-row">
                  <span className="feature-chip">{game.features}</span>
                </div>

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

      {/* 站点页脚备案 */}
      <SiteFooter className="mt-auto" />

      <style jsx>{`
        .game-center-root {
          min-height: calc(100vh - 70px);
          background: transparent;
          color: var(--content-primary);
        }

        .hero-banner {
          background: transparent;
          padding: 26px 20px 18px;
          text-align: center;
        }
        .hero-inner {
          max-width: 880px;
          margin: 0 auto;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          border: 1px solid var(--line-subtle);
          color: var(--brand-primary);
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          font-weight: 700;
          box-shadow: 0 2px 10px rgba(15, 29, 51, 0.05);
        }
        :global(body.dark) .hero-badge {
          background: rgba(21, 25, 33, 0.72);
        }
        .hero-badge .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #D4AD72; box-shadow: 0 0 10px rgba(212, 173, 114, 0.75);
        }
        .hero-title {
          font-size: 2.35em;
          font-weight: 900;
          margin: 0 0 8px;
          color: var(--content-primary);
          letter-spacing: -0.02em;
        }
        .hero-desc {
          font-size: 0.95em;
          color: var(--content-secondary);
          max-width: 660px;
          margin: 0 auto 18px;
          line-height: 1.6;
        }

        .hero-stats-row {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.74);
          backdrop-filter: blur(14px);
          padding: 8px 24px;
          border-radius: 30px;
          border: 1px solid var(--line-subtle);
          box-shadow: 0 6px 20px rgba(15, 29, 51, 0.05);
        }
        :global(body.dark) .hero-stats-row {
          background: rgba(21, 25, 33, 0.76);
        }
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-stat-item .num {
          font-weight: 800;
          color: #C5933E;
          font-family: monospace;
          font-size: 15px;
        }
        .hero-stat-item .lbl {
          font-size: 11px;
          color: var(--content-muted);
        }
        .hero-stat-sep {
          width: 1px;
          height: 14px;
          background: var(--line-subtle);
        }

        .main-content-container {
          max-width: 1260px;
          width: 100%;
          margin: 0 auto;
          padding: 12px 20px 36px;
        }

        .recent-games-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          border: 1px solid var(--line-subtle);
          box-shadow: 0 2px 10px rgba(15, 29, 51, 0.04);
          padding: 10px 16px;
          border-radius: 14px;
          margin-bottom: 20px;
        }
        :global(body.dark) .recent-games-bar {
          background: rgba(21, 25, 33, 0.74);
        }
        .recent-label {
          font-size: 12px;
          color: var(--content-muted);
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
          padding: 4px 12px;
          border-radius: 10px;
          background: var(--surface-muted);
          border: 1px solid var(--line-subtle);
          color: var(--content-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .recent-pill:hover {
          background: var(--brand-soft);
          border-color: rgba(212, 173, 114, 0.55);
          color: var(--content-primary);
        }
        .recent-score {
          font-size: 10px;
          background: var(--brand-soft);
          padding: 1px 6px;
          border-radius: 6px;
          color: var(--brand-primary);
          font-family: monospace;
          font-weight: 700;
        }

        .filter-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
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
          padding: 8px 15px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-subtle);
          color: var(--content-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(15, 29, 51, 0.03);
        }
        :global(body.dark) .cat-tab {
          background: rgba(21, 25, 33, 0.72);
        }
        .cat-tab:hover {
          color: var(--content-primary);
          border-color: rgba(212, 173, 114, 0.5);
        }
        .cat-tab.active {
          background: var(--brand-primary);
          color: var(--content-inverse);
          font-weight: 700;
          border-color: var(--brand-primary);
          box-shadow: 0 6px 16px rgba(15, 29, 51, 0.16);
        }
        .cat-count {
          font-size: 11px;
          opacity: 0.85;
          font-family: monospace;
          padding: 1px 6px;
          border-radius: 8px;
          background: var(--surface-muted);
          color: var(--content-secondary);
        }
        .cat-tab.active .cat-count {
          background: rgba(255, 255, 255, 0.2);
          color: inherit;
        }

        .search-box-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          min-width: 250px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          font-size: 13px;
          opacity: 0.55;
        }
        .search-input {
          width: 100%;
          padding: 8px 32px 8px 34px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.76);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-subtle);
          color: var(--content-primary);
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(body.dark) .search-input {
          background: rgba(21, 25, 33, 0.76);
        }
        .search-input:focus {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px var(--brand-soft);
        }
        .clear-search-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: var(--content-muted);
          cursor: pointer;
          font-size: 12px;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .game-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          border: 1px solid var(--line-subtle);
          box-shadow: 0 6px 22px rgba(15, 29, 51, 0.045);
          padding: 18px 18px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          min-height: 215px;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        :global(body.dark) .game-card {
          background: rgba(21, 25, 33, 0.78);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.26);
        }
        .game-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 173, 114, 0.65);
          box-shadow: 0 16px 36px rgba(15, 29, 51, 0.12);
        }
        :global(body.dark) .game-card:hover {
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        }

        .card-accent-strip {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          opacity: 0.72;
          transition: opacity 0.22s;
        }
        .game-card:hover .card-accent-strip {
          opacity: 1;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }
        .category-pill {
          font-size: 10px;
          padding: 2.5px 8px;
          border-radius: 6px;
          background: var(--surface-muted);
          color: var(--content-secondary);
          font-weight: 600;
        }
        .hot-pill {
          font-size: 10px;
          padding: 2.5px 8px;
          border-radius: 6px;
          background: rgba(212, 173, 114, 0.16);
          border: 1px solid rgba(212, 173, 114, 0.4);
          color: #B88635;
          font-weight: 700;
        }
        :global(body.dark) .hot-pill {
          color: #f3cc8a;
        }
        .best-score-badge {
          margin-left: auto;
          font-size: 11px;
          color: var(--brand-primary);
          font-weight: bold;
          font-family: monospace;
          background: var(--brand-soft);
          border: 1px solid var(--line-subtle);
          padding: 2px 7px;
          border-radius: 6px;
        }

        .card-center {
          text-align: center;
          margin-bottom: 10px;
        }
        .icon-medallion {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          border: 1px solid;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          transition: transform 0.24s ease;
        }
        .game-icon {
          font-size: 28px;
          line-height: 1;
        }
        .game-card:hover .icon-medallion {
          transform: scale(1.08) translateY(-2px);
        }
        .game-name {
          font-size: 16px;
          font-weight: 800;
          color: var(--content-primary);
          margin: 0 0 5px;
          letter-spacing: -0.01em;
        }
        .game-desc {
          font-size: 11.5px;
          color: var(--content-muted);
          margin: 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-feature-row {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        .feature-chip {
          font-size: 10.5px;
          padding: 2px 9px;
          border-radius: 999px;
          background: var(--surface-muted);
          color: var(--content-secondary);
          border: 1px solid var(--line-subtle);
          font-weight: 500;
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--line-subtle);
        }
        .diff-pill {
          font-size: 11px;
          color: #C5933E;
          font-weight: 600;
        }
        .start-btn-label {
          font-size: 11px;
          color: var(--brand-primary);
          font-weight: 700;
          opacity: 0.9;
          transition: opacity 0.2s, transform 0.2s;
        }
        .game-card:hover .start-btn-label {
          opacity: 1;
          transform: translateX(3px);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          border: 1px dashed var(--line-strong);
        }
        :global(body.dark) .empty-state {
          background: rgba(21, 25, 33, 0.78);
        }
        .empty-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }
        .clear-filter-btn {
          margin-top: 14px;
          background: var(--brand-primary);
          color: var(--content-inverse);
          border: none;
          padding: 8px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
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
