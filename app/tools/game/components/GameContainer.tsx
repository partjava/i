'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { GameStateData } from './useGameApi';
import { soundSynth } from './RetroAudioSynth';

interface Props {
  gameType: string;
  state: GameStateData | null;
  onMove: (action: string, payload?: any) => void;
  onRestart: () => void;
  onClose: () => void;
  loading: boolean;
  children: (state: any, move: (action: string, payload?: any) => void) => React.ReactNode;
}

export default function GameContainer({
  gameType,
  state,
  onMove,
  onRestart,
  onClose,
  loading,
  children,
}: Props) {
  const data = state?.state;
  const isOver = Boolean(state?.gameOver);
  const score = state?.score ?? 0;
  const winner = state?.winner;

  const [bestScore, setBestScore] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    soundSynth.enabled = soundOn;
  }, [soundOn]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`partjava_best_score_${gameType}`);
      setBestScore(Number(saved) || 0);
      setIsNewRecord(false);
    } catch {}
  }, [gameType, state?.gameId]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      setIsNewRecord(true);
      soundSynth.playScore();
      try {
        localStorage.setItem(`partjava_best_score_${gameType}`, String(score));
      } catch {}
    }
  }, [score, bestScore, gameType]);

  const prevOverRef = useRef(isOver);
  useEffect(() => {
    if (!prevOverRef.current && isOver) {
      if (winner === 'player' || (score > 0 && isNewRecord)) {
        soundSynth.playWin();
      } else {
        soundSynth.playGameOver();
      }
    }
    prevOverRef.current = isOver;
  }, [isOver, winner, score, isNewRecord]);

  const handleWrappedMove = useCallback(
    (action: string, payload?: any) => {
      if (action !== '__local_state') soundSynth.playMove();
      onMove(action, payload);
    },
    [onMove]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      ) {
        return;
      }
      if (!e.repeat && (e.key === 'r' || e.key === 'R') && !['typingrace', 'wordsearch'].includes(gameType)) {
        onRestart();
      }
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onRestart, gameType]);

  return (
    <div className={`game-modal-overlay ${isFullscreen ? 'fullscreen' : ''}`} onClick={onClose}>
      <div
        data-game-modal={gameType}
        className={`game-modal ${isFullscreen ? 'fullscreen-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部街机控制台 */}
        <div className="game-header">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="game-icon-box">{GAME_ICONS[gameType] || '🎮'}</span>
            <div className="min-w-0">
              <div className="game-title truncate">{GAME_NAMES[gameType] || gameType}</div>
              <div className="game-subhint">ESC 退出 · {['typingrace', 'wordsearch'].includes(gameType) ? '点击重开' : 'R 重开'}</div>
            </div>
          </div>

          <div className="game-stats">
            <div className="stat-pill score-pill">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AD72]" />
              <span className="stat-label">得分</span>
              <span className="stat-val">{score}</span>
            </div>
            {bestScore > 0 && (
              <div className="stat-pill best-pill">
                <Trophy className="w-3.5 h-3.5 text-sky-400" />
                <span className="stat-label">最佳</span>
                <span className="stat-val">{bestScore}</span>
                {isNewRecord && <span className="new-tag">新纪录</span>}
              </div>
            )}
          </div>

          <div className="game-actions">
            <button
              type="button"
              className={`icon-btn ${soundOn ? 'active' : ''}`}
              onClick={() => setSoundOn(!soundOn)}
              title={soundOn ? '关闭音效' : '开启音效'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              type="button"
              className={`icon-btn ${showHelp ? 'active' : ''}`}
              onClick={() => setShowHelp(!showHelp)}
              title="玩法说明"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? '退出全屏' : '全屏体验'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button type="button" className="game-btn" onClick={onRestart}>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重开</span>
            </button>
            <button type="button" className="game-close" onClick={onClose} title="关闭游戏 (Esc)">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 游戏胜负横幅 */}
        {isOver && (
          <div className={`result-banner ${winner === 'player' ? 'win' : 'lose'}`}>
            <span>
              {winner
                ? `${winner === 'player' ? '🎉 恭喜通关获胜！' : '🤖 本局挑战结束，点击重开再来一局'}`
                : `🏁 本局得分 ${score}${isNewRecord && score > 0 ? ' · 刷新历史最高纪录！' : ''}`}
            </span>
          </div>
        )}

        {/* 玩法秘籍抽屉 */}
        {showHelp && (
          <div className="help-drawer animate-fadeIn">
            <div className="help-content">
              <h4>《{GAME_NAMES[gameType]}》操作与机制说明</h4>
              <p>{GAME_RULES[gameType] || '使用方向键或鼠标进行操作，挑战高分！'}</p>
            </div>
            <button type="button" className="close-help-btn" onClick={() => setShowHelp(false)}>
              收起
            </button>
          </div>
        )}

        {/* 核心画布主容器 */}
        <div className="game-canvas-wrapper">
          {loading && !data ? (
            <div className="game-loading">
              <div className="loading-spinner" />
              <span>正在加载游戏舞台...</span>
            </div>
          ) : data ? (
            children(data, handleWrappedMove)
          ) : (
            <div className="game-loading">
              <button type="button" className="game-btn" onClick={onRestart}>
                ▶ 点击开始游戏
              </button>
            </div>
          )}
        </div>

        <style>{`
          .game-modal-overlay {
            position: fixed; inset: 0; z-index: 1000;
            background: rgba(8, 10, 18, 0.80);
            backdrop-filter: blur(12px);
            display: flex; justify-content: center; align-items: center;
            padding: 12px;
          }
          .game-modal {
            background: linear-gradient(150deg, #161a26 0%, #0f121b 100%);
            border-radius: 20px; padding: 14px 20px 18px;
            width: min(96vw, 1040px); max-height: 95vh;
            display: flex; flex-direction: column;
            overflow-y: auto;
            overscroll-behavior: contain;
            border: 1px solid rgba(212, 173, 114, 0.34);
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.72), 0 0 28px rgba(212, 173, 114, 0.14);
          }
          .fullscreen-modal {
            width: 100vw !important; height: 100vh !important;
            max-height: 100vh !important; border-radius: 0 !important;
          }
          .game-header {
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 10px;
            padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .game-icon-box {
            width: 38px; height: 38px; border-radius: 10px;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 20px;
            background: rgba(212, 173, 114, 0.14);
            border: 1px solid rgba(212, 173, 114, 0.3);
            flex-shrink: 0;
          }
          .game-title {
            font-size: 17px; font-weight: 800; color: #f5ece0;
            letter-spacing: 0.02em; line-height: 1.2;
          }
          .game-subhint {
            font-size: 11px; color: #8c95a6; margin-top: 2px;
          }
          .game-stats { display: flex; align-items: center; gap: 8px; }
          .stat-pill {
            display: inline-flex; align-items: center; gap: 5px;
            background: rgba(255, 255, 255, 0.05); padding: 4px 10px;
            border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .score-pill .stat-val { color: #fbe296; font-weight: 800; font-family: monospace; font-size: 14px; }
          .best-pill .stat-val { color: #7dd3fc; font-weight: 800; font-family: monospace; font-size: 14px; }
          .stat-label { font-size: 11px; color: #94a3b8; }
          .new-tag {
            font-size: 10px; background: #ef4444; color: #fff;
            padding: 1px 6px; border-radius: 999px; font-weight: 700;
          }

          .game-actions { display: flex; align-items: center; gap: 6px; }
          .icon-btn {
            background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.12);
            color: #cbd5e1; width: 32px; height: 32px; border-radius: 8px;
            cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
            transition: all 0.18s;
          }
          .icon-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
          .icon-btn.active {
            border-color: rgba(212, 173, 114, 0.65);
            background: rgba(212, 173, 114, 0.18);
            color: #fbe296;
          }

          .game-btn {
            display: inline-flex; align-items: center; gap: 5px;
            background: linear-gradient(135deg, #e5bf7d 0%, #c8984c 100%);
            color: #14120e; border: none; font-weight: 700;
            padding: 6px 12px; border-radius: 8px; cursor: pointer;
            font-size: 12px; box-shadow: 0 4px 12px rgba(212, 173, 114, 0.25);
            transition: transform 0.16s, filter 0.16s;
          }
          .game-btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
          .game-close {
            background: rgba(255, 255, 255, 0.06); color: #94a3b8;
            border: 1px solid rgba(255, 255, 255, 0.1);
            width: 32px; height: 32px; border-radius: 8px;
            display: inline-flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.18s;
          }
          .game-close:hover { color: #fecaca; border-color: rgba(239, 68, 68, 0.5); background: rgba(239, 68, 68, 0.16); }

          .result-banner {
            margin: 8px 0 0; padding: 8px 14px; border-radius: 10px;
            text-align: center; font-size: 13px; font-weight: 600;
          }
          .result-banner.win {
            background: rgba(34, 197, 94, 0.16); border: 1px solid rgba(74, 222, 128, 0.45); color: #bbf7d0;
          }
          .result-banner.lose {
            background: rgba(212, 173, 114, 0.15); border: 1px solid rgba(212, 173, 114, 0.45); color: #fbe296;
          }

          .help-drawer {
            background: rgba(15, 23, 42, 0.65); border: 1px dashed rgba(212, 173, 114, 0.45);
            border-radius: 10px; padding: 10px 14px; margin: 10px 0 0;
            display: flex; justify-content: space-between; align-items: center; gap: 12px;
          }
          .help-content h4 { margin: 0 0 3px; font-size: 13px; color: #fbe296; }
          .help-content p { margin: 0; font-size: 12px; color: #cbd5e1; line-height: 1.5; }
          .close-help-btn { background: none; border: none; color: #d4ad72; font-size: 12px; font-weight: 600; cursor: pointer; shrink: 0; }

          .game-canvas-wrapper {
            display: flex; justify-content: center; align-items: center;
            flex: 1 0 auto; min-height: 440px; padding: 16px 20px;
            background: radial-gradient(circle at 50% 25%, #121828 0%, #0a0d16 100%);
            border-radius: 14px;
            margin-top: 10px; overflow: visible; position: relative;
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          .fullscreen-modal .game-canvas-wrapper {
            min-height: 0; height: 100%;
          }
          .game-canvas-wrapper > div { max-width: 100%; min-width: 0; }
          .game-canvas-wrapper canvas { max-width: 100%; }
          .game-loading {
            min-height: 240px;
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
            color: #94a3b8; font-size: 14px;
          }
          .loading-spinner {
            width: 32px; height: 32px; border: 3px solid rgba(212, 173, 114, 0.22);
            border-top-color: #d4ad72; border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}

const GAME_NAMES: Record<string, string> = {
  '2048': '2048 数字合成',
  tictactoe: '井字棋 (人机对弈)',
  gomoku: '五子棋 (博弈对决)',
  minesweeper: '扫雷大作战',
  sudoku: '数独大师',
  puzzle: '九宫格拼图',
  memory: '脑力记忆翻牌',
  hanoi: '汉诺塔算法推演',
  colorbynumber: '像素数字填色',
  riddle: '趣味灯谜猜谜',
  spotdiff: '火眼金睛找茬',
  wordsearch: '极客英语单词搜索',
  pipeconnect: '水管回路拼接',
  snake: '贪吃蛇 · 霓虹版',
  tetris: '俄罗斯方块 · SRS',
  breakout: '复古打砖块',
  flappy: '飞翔小鸟 · 星夜版',
  pinball: '太空弹球大师',
  typingrace: '极客手速打字竞速',
  maze: '迷宫地牢探险',
};

const GAME_ICONS: Record<string, string> = {
  snake: '🐍',
  tetris: '🧱',
  memory: '🃏',
  '2048': '🔢',
  hanoi: '🗼',
  maze: '🧭',
  wordsearch: '🔍',
  typingrace: '⌨️',
  minesweeper: '💣',
  puzzle: '🧩',
  gomoku: '⚫',
  spotdiff: '👁️',
  pipeconnect: '🔄',
  colorbynumber: '🎨',
  riddle: '❓',
  breakout: '🏏',
  tictactoe: '⭕',
  flappy: '🐦',
  pinball: '🔴',
  sudoku: '🎯',
};

const GAME_RULES: Record<string, string> = {
  snake: '方向键 / WASD 或滑动屏幕转弯，连续在 4.5 秒内吃果叠加连击倍率（最高 ×5）；金苹果 +50×倍率，冰莓果提供 3.5 秒减速微操时间！',
  tetris: '← → 移动，↓ 软降，↑ / W 顺时针旋转（支持 SRS 踢墙），空格瞬降，C / Shift 暂存方块（Hold），支持 Combo 连消与 Back-to-Back 奖励！',
  '2048': '滑动或按方向键合并相同数字，支持切换棋盘大小与撤回一步。',
  maze: '操控光点在迷雾中寻找钥匙并解锁绿色出口之门，支持多种迷宫尺度。',
  minesweeper: '左键翻开格子，右键或切换插旗模式标记地雷；首点击永不踩雷！',
  breakout: '鼠标/触控或 ← → 移动弹板反弹小球，拾取多球、加宽与激光道具。',
  flappy: '开局静止悬浮等待你拍打翅膀起飞（空格 / ↑ / 点击），穿管集金币可获额外加分，每 10 分进入昼夜流转并开放动态管道！',
  pinball: '按住 空格 / ↓（或发射按钮）蓄力拉簧发射，Z / ← 控制左挡板，/ / → 控制右挡板；点亮顶部 H·E·W 通道提升得分倍率，清空左侧靶位可激活 10 秒护球盾！',
  hanoi: '将左侧盘子移到右侧，大盘不可压小盘，也可一键演示递归最优解法。',
  gomoku: '黑白双方轮流落子，先连成五子者胜，支持调节 AI 难度或双人对战。',
  tictactoe: '3×3 极速对弈，可挑战完美防守 Minimax AI 或切磋开局。',
  sudoku: '9×9 行列宫数字 1~9 不重复，支持笔记候选模式与实时冲突检查。',
  memory: '开局短时全览卡片记忆，随后翻牌配对消除叠加连击积分。',
  typingrace: '照着代码片段输入，实时统计 WPM 打字速度与准确率。',
  pipeconnect: '点击旋转管道使水流从起点贯通至终点，连通段自动点亮。',
  puzzle: '滑动空格还原序列，自动保证开局洗牌必有解。',
  spotdiff: '在左右对比图中点击差异处，迷茫时可使用提示高亮定位。',
  colorbynumber: '选中下方数字调色盘按编号点阵上色，完成像素插画。',
  riddle: '挑战灯谜与极客脑筋急转弯，连胜叠加双倍积分。',
  wordsearch: '在字母网格中按住拖拽圈出横向、纵向或斜向隐藏技术词汇。',
};
