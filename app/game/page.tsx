"use client";

import React, { useState } from 'react';
import InkWashDecoration from '@/app/components/InkWashDecoration';

export default function GamePage() {
	const [showGameModal, setShowGameModal] = useState(false);
	const [currentGame, setCurrentGame] = useState('');

	const openGame = (path: string) => {
		setCurrentGame(path);
		setShowGameModal(true);
	};
	const closeGame = () => {
		setShowGameModal(false);
		setCurrentGame('');
	};

	return (
		<div className="ai-container">
			{/* 水墨画顶部装饰 */}
			<div className="w-full overflow-hidden">
				<InkWashDecoration variant="landscape" height={180} />
			</div>
			<InkWashDecoration variant="birds" height={50} className="-mt-2" />

			<div className="header">
				<div className="header-inner">
					<h1>小游戏</h1>
					<p>只展示游戏，聊天已移至悬浮助手</p>
				</div>
			</div>

			<div className="games-only-container">
				<div className="games-grid">
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/snake.html')}>
						<span className="game-icon" role="img" aria-label="贪吃蛇">🐍</span>
						<span className="game-title">贪吃蛇</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/tetris.html')}>
						<span className="game-icon" role="img" aria-label="俄罗斯方块">🧱</span>
						<span className="game-title">俄罗斯方块</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/memory.html')}>
						<span className="game-icon" role="img" aria-label="记忆翻牌">🃏</span>
						<span className="game-title">记忆翻牌</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/2048.html')}>
						<span className="game-icon" role="img" aria-label="2048">🔢</span>
						<span className="game-title">2048</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/tower-of-hanoi.html')}>
						<span className="game-icon" role="img" aria-label="汉诺塔">🗼</span>
						<span className="game-title">汉诺塔</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/maze-explorer.html')}>
						<span className="game-icon" role="img" aria-label="迷宫探险">🧭</span>
						<span className="game-title">迷宫探险</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/word-search.html')}>
						<span className="game-icon" role="img" aria-label="单词搜索">🔍</span>
						<span className="game-title">单词搜索</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/typing-race.html')}>
						<span className="game-icon" role="img" aria-label="打字竞速">⌨️</span>
						<span className="game-title">打字竞速</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/minesweeper.html')}>
						<span className="game-icon" role="img" aria-label="扫雷">💣</span>
						<span className="game-title">扫雷</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/puzzle.html')}>
						<span className="game-icon" role="img" aria-label="拼图">🧩</span>
						<span className="game-title">拼图</span>
					</button>

					<button className="game-card" onClick={() => openGame('/partjava-ai/games/gomoku.html')}>
						<span className="game-icon" role="img" aria-label="五子棋">⚫</span>
						<span className="game-title">五子棋</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/spot-difference.html')}>
						<span className="game-icon" role="img" aria-label="找茬游戏">👁️</span>
						<span className="game-title">找茬游戏</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/pipe-connect.html')}>
						<span className="game-icon" role="img" aria-label="水管连接">🔄</span>
						<span className="game-title">水管连接</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/color-by-number.html')}>
						<span className="game-icon" role="img" aria-label="填色游戏">🎨</span>
						<span className="game-title">填色游戏</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/riddle-game.html')}>
						<span className="game-icon" role="img" aria-label="猜谜游戏">❓</span>
						<span className="game-title">猜谜游戏</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/breakout.html')}>
						<span className="game-icon" role="img" aria-label="打砖块">🧱</span>
						<span className="game-title">打砖块</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/tictactoe.html')}>
						<span className="game-icon" role="img" aria-label="井字棋">⭕</span>
						<span className="game-title">井字棋</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/flappy.html')}>
						<span className="game-icon" role="img" aria-label="飞翔小鸟">🐦</span>
						<span className="game-title">飞翔小鸟</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/pinball.html')}>
						<span className="game-icon" role="img" aria-label="弹球">🔴</span>
						<span className="game-title">弹球</span>
					</button>
					<button className="game-card" onClick={() => openGame('/partjava-ai/games/sudoku.html')}>
						<span className="game-icon" role="img" aria-label="数独">🔢</span>
						<span className="game-title">数独</span>
					</button>
				</div>
			</div>

			{showGameModal && (
				<div className="game-modal-overlay">
					<div className="game-modal">
						<button className="close-game-btn" onClick={closeGame}>✖</button>
						<iframe src={currentGame} className="game-iframe"></iframe>
					</div>
				</div>
			)}

			<style jsx>{`
				.header {
					background: linear-gradient(90deg, #5c4033 0%, #8b7355 100%);
					color: #fff;
					padding: 20px 0;
					text-align: center;
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
					background: #faf6f0;
					border-radius: 12px;
					box-shadow: 0 2px 12px rgba(139,115,85,0.1);
					border: 1px solid #d4c8b8;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					border: none;
					transition: transform .15s, box-shadow .15s;
				}
				.game-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(139,115,85,0.15); }
				.game-icon { font-size: 2.2em; margin-bottom: 8px; }
				.game-title { color: #8b7355; font-weight: 600; }

				.game-modal-overlay { position: fixed; inset:0; background: rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:1000; }
				.game-modal { width: 900px; height: 640px; background: #faf6f0; border-radius: 10px; overflow:hidden; position:relative; }
				.close-game-btn { position:absolute; right:10px; top:10px; background: rgba(255,255,255,0.9); border:none; width:36px; height:36px; border-radius:18px; cursor:pointer; }
				.game-iframe { width:100%; height:100%; border:0; }

				@media (max-width: 1100px) {
					.games-grid { grid-template-columns: repeat(3, 1fr); }
					.game-modal { width: 90%; height: 70%; }
				}
				@media (max-width: 700px) {
					.games-grid { grid-template-columns: repeat(2, 1fr); }
				}
			`}</style>

			{/* 水墨画底部装饰 */}
			<div className="w-full overflow-hidden mt-8">
				<InkWashDecoration variant="bamboo" height={100} />
				<InkWashDecoration variant="landscape" height={200} />
			</div>
		</div>
	);
}

