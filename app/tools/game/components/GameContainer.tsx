'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

import { soundSynth } from './RetroAudioSynth';

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
  const isOver = state?.gameOver;
  const score = state?.score ?? 0;
  const winner = state?.winner;

  // 最高分持久化 (LocalStorage)
  const [bestScore, setBestScore] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // 扫雷移动端专属模式切换：挖掘模式 vs 插旗模式
  const [minesweeperFlagMode, setMinesweeperFlagMode] = useState(false);

  useEffect(() => {
    soundSynth.enabled = soundOn;
  }, [soundOn]);

  // 读取与更新本地最高分
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

  // 游戏结束与胜利音效触发
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

  // 包装 move 操作触发按键音
  const handleWrappedMove = useCallback(
    (action: string, payload?: any) => {
      if (action !== '__local_state') soundSynth.playMove();
      onMove(action, payload);
    },
    [onMove]
  );

  // 键盘快捷键监听 (ESC 关闭, R 重新开始)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))) return;
      if (e.key === 'Escape') onClose();
      if (!e.repeat && (e.key === 'r' || e.key === 'R') && !['typingrace', 'wordsearch'].includes(gameType)) {
        onRestart();
      }
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKey); };
  }, [onClose, onRestart, gameType]);

  // 判断当前游戏需要的控制按键类型
  const needsDpad = ['snake', 'maze', '2048'].includes(gameType);
  const isTetris = gameType === 'tetris';
  const isBreakout = gameType === 'breakout';
  const isFlappy = gameType === 'flappy';
  const isPinball = gameType === 'pinball';
  const isMinesweeper = gameType === 'minesweeper';

  return (
    <div className={`game-modal-overlay ${isFullscreen ? 'fullscreen' : ''}`} onClick={onClose}>
      <div
        className={`game-modal ${isFullscreen ? 'fullscreen-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部状态与控制栏 */}
        <div className="game-header">
          <div className="flex items-center gap-2">
            <span className="game-icon">{GAME_ICONS[gameType] || '🎮'}</span>
            <span className="game-title">{GAME_NAMES[gameType] || gameType}</span>
          </div>

          <div className="game-stats">
            <div className="stat-pill score-pill">
              <span className="stat-label">得分</span>
              <span className="stat-val">{score}</span>
            </div>
            {bestScore > 0 && (
              <div className="stat-pill best-pill">
                <span className="stat-label">最佳</span>
                <span className="stat-val">{bestScore}</span>
                {isNewRecord && <span className="new-tag animate-bounce">新纪录!</span>}
              </div>
            )}
          </div>

          <div className="game-actions">
            <button
              className={`icon-btn ${soundOn ? 'active' : ''}`}
              onClick={() => setSoundOn(!soundOn)}
              title={soundOn ? '关闭音效' : '开启音效'}
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
            <button
              className="icon-btn"
              onClick={() => setShowHelp(!showHelp)}
              title="玩法说明"
            >
              💡
            </button>
            <button
              className="icon-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? '退出全屏' : '全屏体验'}
            >
              {isFullscreen ? '⤦' : '⛶'}
            </button>
            <button className="game-btn restart-btn" onClick={onRestart}>
              重新开始 (R)
            </button>
            <button className="game-close" onClick={onClose} title="关闭游戏 (Esc)">
              ✕
            </button>
          </div>
        </div>

        {/* 游戏胜负横幅 */}
        {isOver && (
          <div className={`result-banner ${winner === 'player' ? 'win' : 'lose'}`}>
            <span>
              {winner
                ? `${winner === 'player' ? '🎉 恭喜！你赢了！' : '🤖 AI 获胜，再接再厉！'}`
                : '💥 游戏结束！点击“重新开始”再次挑战'}
            </span>
          </div>
        )}

        {/* 玩法秘籍抽屉 */}
        {showHelp && (
          <div className="help-drawer animate-fadeIn">
            <div className="help-content">
              <h4>💡 《{GAME_NAMES[gameType]}》玩法秘籍</h4>
              <p>{GAME_RULES[gameType] || '使用方向键或鼠标进行操作，挑战高分！'}</p>
            </div>
            <button className="close-help-btn" onClick={() => setShowHelp(false)}>
              收起
            </button>
          </div>
        )}

        {/* 核心画布主容器 */}
        <div className="game-canvas-wrapper">
          {loading ? (
            <div className="game-loading">
              <div className="loading-spinner" />
              <span>正在向 Java 后端初始化对局...</span>
            </div>
          ) : data ? (
            children(data, handleWrappedMove)
          ) : (
            <div className="game-loading">
              <button className="game-btn start-large" onClick={onRestart}>
                ▶ 点击开始游戏
              </button>
            </div>
          )}
        </div>

                <style>{`
          .game-modal-overlay {
            position: fixed; inset: 0; z-index: 1000;
            background: rgba(10, 10, 18, 0.82);
            backdrop-filter: blur(10px);
            display: flex; justify-content: center; align-items: center;
            padding: 12px;
          }
          .game-modal {
            background: linear-gradient(145deg, #181926 0%, #12131e 100%);
            border-radius: 18px; padding: 16px 20px 18px;
            width: min(96vw, 620px); max-height: 94vh;
            display: flex; flex-direction: column;
            overflow-y: auto;
            border: 1px solid rgba(212, 163, 106, 0.35);
            box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 24px rgba(212,163,106,0.15);
          }
          .fullscreen-modal {
            width: 100vw !important; height: 100vh !important;
            max-height: 100vh !important; border-radius: 0 !important;
          }
          .game-header {
            display: flex; align-items: center; justify-content: space-between;
            flex-wrap: wrap; gap: 10px;
            padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .game-icon { font-size: 22px; }
          .game-title { font-size: 18px; font-weight: 700; color: #f5ece0; font-family: serif; letter-spacing: 0.05em; }
          .game-stats { display: flex; align-items: center; gap: 8px; }
          .stat-pill {
            display: flex; align-items: center; gap: 6px;
            background: rgba(255,255,255,0.06); padding: 4px 10px;
            border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);
          }
          .score-pill .stat-val { color: #f5d5a3; font-weight: 700; font-family: monospace; font-size: 15px; }
          .best-pill .stat-val { color: #56b6c2; font-weight: 700; font-family: monospace; font-size: 15px; }
          .stat-label { font-size: 11px; color: #8e94a0; }
          .new-tag { font-size: 10px; background: #e06c75; color: #fff; padding: 1px 6px; border-radius: 10px; font-weight: bold; }
          
          .game-actions { display: flex; align-items: center; gap: 6px; }
          .icon-btn {
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
            color: #d1d5db; width: 32px; height: 32px; border-radius: 8px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            font-size: 14px; transition: all 0.2s;
          }
          .icon-btn:hover { background: rgba(255,255,255,0.18); color: #fff; }
          .icon-btn.active { border-color: #d4a36a; background: rgba(212,163,106,0.2); }

          .game-btn {
            background: linear-gradient(135deg, #d4a36a 0%, #b8894e 100%);
            color: #171513; border: none; font-weight: 600;
            padding: 6px 14px; border-radius: 8px; cursor: pointer;
            font-size: 12px; box-shadow: 0 4px 12px rgba(212,163,106,0.3);
            transition: all 0.2s;
          }
          .game-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
          .game-close {
            background: none; color: #888; border: none;
            font-size: 20px; cursor: pointer; padding: 0 6px;
            transition: color 0.2s;
          }
          .game-close:hover { color: #e06c75; }

          .result-banner {
            margin: 8px 0; padding: 8px 14px; border-radius: 8px;
            text-align: center; font-size: 13px; font-weight: 600;
          }
          .result-banner.win { background: rgba(152, 195, 121, 0.2); border: 1px solid #98c379; color: #98c379; }
          .result-banner.lose { background: rgba(224, 108, 117, 0.2); border: 1px solid #e06c75; color: #e06c75; }

          .help-drawer {
            background: rgba(0,0,0,0.4); border: 1px dashed rgba(212,163,106,0.5);
            border-radius: 10px; padding: 10px 14px; margin: 8px 0;
            display: flex; justify-content: space-between; align-items: center;
          }
          .help-content h4 { margin: 0 0 4px; font-size: 13px; color: #f5d5a3; }
          .help-content p { margin: 0; font-size: 12px; color: #c5cbd8; line-height: 1.5; }
          .close-help-btn { background: none; border: none; color: #d4a36a; font-size: 12px; cursor: pointer; }

          .game-canvas-wrapper {
            display: flex; justify-content: center; align-items: center;
            min-height: 0; flex-shrink: 0; padding: 14px;
            background: #0d0f17; border-radius: 12px;
            margin-top: 10px; overflow: visible; position: relative;
            border: 1px solid rgba(255,255,255,0.06);
          }
          .game-canvas-wrapper > div { max-width: 100%; min-width: 0; }
          .game-canvas-wrapper canvas { max-width: 100%; }
          .game-modal { overscroll-behavior: contain; }
          .game-loading { min-height: 240px;
            display: flex; flex-direction: column; align-items: center; gap: 14px;
            color: #8e94a0; font-size: 14px;
          }
          .loading-spinner {
            width: 32px; height: 32px; border: 3px solid rgba(212,163,106,0.2);
            border-top-color: #d4a36a; border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }

          /* 虚拟触控按键区 */
          .touch-controls-bar { margin-top: 12px; }
          .virtual-dpad {
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            background: rgba(255,255,255,0.03); padding: 8px; border-radius: 14px;
          }
          .dpad-row { display: flex; align-items: center; gap: 8px; }
          .dpad-center { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); }
          .dpad-btn {
            width: 48px; height: 42px; border-radius: 8px;
            background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
            color: #fff; font-size: 16px; font-weight: bold; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            user-select: none; touch-action: manipulation;
          }
          .dpad-btn:active { background: #d4a36a; color: #111; transform: scale(0.94); }

          .tetris-controls, .breakout-controls, .pinball-controls {
            display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
          }
          .action-pill {
            padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
            color: #f0f3f8; cursor: pointer; user-select: none; touch-action: manipulation;
          }
          .action-pill:active { background: #d4a36a; color: #111; transform: scale(0.95); }
          .action-pill.rotate { background: rgba(86,182,194,0.2); border-color: #56b6c2; color: #a8e4ec; }
          .action-pill.hard-drop { background: rgba(224,108,117,0.2); border-color: #e06c75; color: #f5b0b6; }
          .action-pill.launch { background: rgba(212,163,106,0.25); border-color: #d4a36a; color: #fbebd5; }

          .flappy-jump-btn {
            width: 100%; padding: 12px; border-radius: 12px;
            background: linear-gradient(135deg, #4dc9f6 0%, #29b6f6 100%);
            color: #fff; font-weight: bold; font-size: 15px; border: none; cursor: pointer;
          }
          .flappy-jump-btn:active { transform: scale(0.98); filter: brightness(0.9); }

          .mode-btn {
            padding: 6px 12px; border-radius: 8px; font-size: 12px;
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
            color: #aaa; cursor: pointer;
          }
          .mode-btn.active { background: #4f8cff; color: #fff; border-color: #4f8cff; }
          .mode-btn.active-flag { background: #ffd700; color: #111; border-color: #ffd700; }
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
  snake: '经典贪吃蛇',
  tetris: '俄罗斯方块',
  breakout: '复古打砖块',
  flappy: '飞翔小鸟冲冲冲',
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
  breakout: '🧱',
  tictactoe: '⭕',
  flappy: '🐦',
  pinball: '🔴',
  sudoku: '🔢',
};

const GAME_RULES: Record<string, string> = {
  snake: '使用方向键或下方虚拟触控键控制蛇头移动，吃到红苹果得分并变长，撞墙或撞到自己即失败。',
  tetris: '方向键控制左右移动与下落，↑ 或“旋转”键变换方块形态，整行填满即可消除得分。',
  '2048': '滑动或按方向键合并相同数字（2+2=4，4+4=8），每一步都会产生新数字，目标合成 2048！',
  maze: '操控蓝球在迷宫迷雾中探索路径，穿过复杂的障壁到达绿色门🚪即可通关。',
  minesweeper: '左键翻开方块，数字代表周围 8 格的地雷总数；右键（或切换为插旗模式）标出地雷，避开所有地雷即获胜！',
  breakout: '左右移动底部的弹球拍，反弹小球击碎上方的所有彩色砖块，当球掉落出底部时损失一条生命。',
  flappy: '按空格或点击起飞，精准控制小鸟的高度穿过绿色管道间隙，每穿过一道管道加 1 分。',
  pinball: '点击发球弹射钢球，在适当时机启动左右弹板反弹钢球冲击得分缓冲柱，尽可能延长球在场上的时间。',
  hanoi: '将左侧柱子上的所有圆盘移动到右侧柱子，大盘不能压在小盘上方，经典递归算法思维训练。',
  gomoku: '黑白双方轮流下子，任一方在横向、纵向或对角线先连成 5 颗同色棋子即获胜。',
  tictactoe: '在 3×3 棋盘上与 AI 轮流画圈与叉，先连成三子一线者胜。',
  sudoku: '在 9×9 棋盘填入 1~9，确保每一行、每一列和每个 3×3 粗线九宫格内数字均不重复。',
  memory: '翻开卡片记住图案，连续翻开两张相同的卡片即可消除，在最短时间内消除全场卡片！',
  typingrace: '屏幕会掉落编程关键词，快速在键盘上准确敲出单词回车消除，挑战你的极客指法手速！',
  pipeconnect: '点击旋转各个弯管与直管，将起点水源与终点完全连通回路即可通水通关。',
  puzzle: '经典的九宫格滑块拼图，通过唯一的空格不断滑动方块，还原出完整的画面与数字序列。',
  spotdiff: '仔细观察左右两张相近的像素图，找出隐藏在其中的细微差异点并点击圈出。',
  colorbynumber: '选择底部的数字调色板，根据方格中的数字编号对应填充颜色，完成精美像素画。',
  riddle: '古风诗意灯谜与技术趣味脑筋急转弯，猜中谜底解锁成就勋章。',
  wordsearch: '在字母矩阵中找出横向、纵向或斜向隐藏的高频计算机与英语技术单词。',
};
