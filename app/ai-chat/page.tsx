"use client";
import { useState, useRef, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://www.partjava.com/ai";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "你好！我是AI助手，有什么可以帮助你的吗？" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [currentGame, setCurrentGame] = useState("");

  // 滚动到底部
  useEffect(() => {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages.length, loading]);

  // 健康检查
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (!response.ok) {
          setError("AI服务连接异常");
        }
      } catch (error) {
        console.warn("AI服务健康检查失败:", error);
        setError("无法连接到AI服务，请检查服务器是否运行");
      }
    };
    
    checkHealth();
  }, []);

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const userMsg = input;
    setMessages((msgs) => [...msgs, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    
    console.log("发送消息到:", `${API_BASE_URL}/ask`);
    console.log("请求数据:", { question: userMsg, conversation_id: conversationId });
    
    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg, conversation_id: conversationId }),
      });
      
      console.log("响应状态:", res.status, res.statusText);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API响应错误:", errorText);
        throw new Error(`AI服务异常: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("API响应数据:", data);
      
      if (data.conversation_id && !conversationId) setConversationId(data.conversation_id);
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.answer }]);
    } catch (e) {
      console.error("发送消息失败:", e);
      const errorMessage = e instanceof Error ? e.message : "未知错误";
      setError(`发送消息失败: ${errorMessage}`);
      // 移除用户消息，因为发送失败了
      setMessages((msgs) => msgs.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  // 回车发送
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  // 新对话
  const startNewChat = async () => {
    setError("");
    setLoading(false);
    setConversationId(null);
    setMessages([
      { role: "assistant", content: "你好！我是AI助手，有什么可以帮助你的吗？" },
    ]);
    try {
      const res = await fetch(`${API_BASE_URL}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setConversationId(data.conversation_id);
      }
    } catch {
      setError("创建新对话失败");
    }
  };

  // 打开游戏
  const openGame = (gamePath: string) => {
    setCurrentGame(gamePath);
    setShowGameModal(true);
  };

  // 关闭游戏
  const closeGame = () => {
    setShowGameModal(false);
    setCurrentGame("");
  };

  return (
    <div className="ai-container">
      <div className="header">
        <div className="header-inner">
          <h1>🤖 AI智能聊天</h1>
          <p>与AI助手对话，同时享受小游戏</p>
        </div>
      </div>
      <div className="chat-container">
        <div className="side-game left-game">
          <div className="game-grid">
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
          </div>
        </div>
        <div className="sidebar">
          <button className="new-chat-btn" onClick={startNewChat}>💬 新对话</button>
          <h3>对话历史</h3>
          <div className="conversation-list">
            {conversationId && (
              <div className="conversation-item active">当前对话</div>
            )}
          </div>
        </div>
        <div className="main-chat">
          <div className="messages-container">
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
                  {msg.role === "assistant" ? (
                    <>
                      <div className="message-avatar bot-avatar">
                        🤖
                      </div>
                      <div className="message-content">{msg.content}</div>
                    </>
                  ) : (
                    <div className="user-message-container">
                      <div className="message-content">{msg.content}</div>
                      <div className="message-avatar user-avatar">
                        👤
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="message bot-message">
                  <div className="message-avatar bot-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="message-input-wrapper">
            <div className="message-input-container">
              <input
                type="text"
                className="message-input"
                placeholder="输入你的问题..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button className="send-button" onClick={sendMessage} disabled={loading || !input.trim()}>
                📤
              </button>
            </div>
          </div>
        </div>
        <div className="side-game right-game">
          <div className="game-grid">
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
      </div>

      {/* 游戏模态框 */}
      {showGameModal && (
        <div className="game-modal-overlay">
          <div className="game-modal">
            <button className="close-game-btn" onClick={closeGame}>✖</button>
            <iframe src={currentGame} className="game-iframe"></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .ai-container {
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          margin: 0;
          background: white;
          border-radius: 0;
          box-shadow: none;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .header {
          background: linear-gradient(90deg, #4f8cff 0%, #33d2ff 100%);
          color: #fff;
          padding: 20px 0;
          text-align: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }
        .header-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 32px;
        }
        .header h1 { font-size: 2.2em; margin-bottom: 6px; font-weight: 700; }
        .header p { font-size: 1em; opacity: 0.9; margin: 0; }
        .chat-container {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          flex: 1;
          overflow: hidden;
        }
        .sidebar {
          width: 240px;
          border-right: 1px solid #ececec;
          padding: 20px;
          background: #fff;
          box-shadow: 2px 0 10px rgba(0,0,0,0.05);
          overflow-y: auto;
        }
        .sidebar h3 {
          margin-bottom: 15px;
          color: #333;
          flex-shrink: 0;
          font-size: 1.08em;
          font-weight: 600;
        }
        .sidebar-content {
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
        }
        .new-chat-btn {
          width: 100%;
          padding: 12px;
          background: #4f8cff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(79,140,255,0.25);
        }
        .new-chat-btn:hover {
          background: #3576f5;
        }
        .conversation-list {
          margin-top: 15px;
        }
        .conversation-item {
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .conversation-item:hover {
          background: #f4f6fa;
        }
        .conversation-item.active {
          background: #e3f2fd;
          color: #4f8cff;
          font-weight: 600;
        }
        .main-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          background: #f9fafc;
          height: 100%;
          overflow: hidden;
        }
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          padding-bottom: 80px; /* 为固定底部留出空间 */
        }
        .messages {
          display: flex;
          flex-direction: column;
        }
        .message {
          display: flex;
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease;
        }
        .user-message {
          justify-content: flex-end;
        }
        .user-message-container {
          display: flex;
          align-items: center;
          max-width: 80%;
        }
        .bot-message {
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          flex-shrink: 0;
        }
        .user-avatar {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          margin-left: 8px;
        }
        .bot-avatar {
          background: linear-gradient(135deg, #4f8cff 0%, #33d2ff 100%);
          margin-right: 8px;
        }
        .message-content {
          background: white;
          padding: 15px 20px;
          border-radius: 18px;
          max-width: 100%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          word-break: break-word;
        }
        .user-message .message-content {
          background: #4f8cff;
          color: white;
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
          border-bottom-left-radius: 18px;
          border-bottom-right-radius: 4px;
        }
        .bot-message .message-content {
          background: white;
          border-top-left-radius: 4px;
          border-top-right-radius: 18px;
          border-bottom-left-radius: 18px;
          border-bottom-right-radius: 18px;
        }
        .message-input-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #ececec;
          padding: 15px;
          z-index: 10;
        }
        .message-input-container {
          display: flex;
          padding: 10px 15px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          border: 1px solid #e0e0e0;
        }
        .message-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 16px;
          padding: 8px 10px;
          resize: none;
          min-height: 24px;
          max-height: 150px;
          font-family: inherit;
        }
        .send-button {
          background: #4f8cff;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .send-button:hover {
          background: #3576f5;
          transform: scale(1.05);
        }
        .send-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .side-game {
          flex: none;
          width: 360px;
          height: 100%;
          padding: 20px;
          overflow-y: auto;
          background: #f4f6fa;
        }
        .game-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          padding: 10px;
        }
        .game-card {
          width: 100%;
          height: 120px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px 0 rgba(120,120,200,0.10);
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .game-card:hover {
          box-shadow: 0 6px 24px 0 rgba(79,140,255,0.18);
          transform: translateY(-4px) scale(1.02);
        }
        .game-icon {
          font-size: 2.5em;
          margin-bottom: 12px;
        }
        .game-title {
          font-size: 0.9em;
          color: #4f8cff;
          font-weight: 600;
        }
        
        /* 游戏模态框样式 */
        .game-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          animation: fadeIn 0.3s ease;
        }
        
        .game-modal {
          width: 800px;
          height: 600px;
          background-color: white;
          border-radius: 12px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .close-game-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: background 0.2s;
        }
        
        .close-game-btn:hover {
          background: white;
        }
        
        .game-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        
        @media (max-width: 1400px) {
          .side-game {
            width: 280px;
          }
          .game-grid {
            grid-template-columns: 1fr;
          }
          .game-modal {
            width: 700px;
            height: 550px;
          }
        }
        
        @media (max-width: 1100px) {
          .chat-container { flex-direction: column; }
          .side-game { 
            width: 100%; 
            height: auto;
            max-height: 200px;
          }
          .game-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          .game-card {
            height: 100px;
          }
          .game-modal {
            width: 90%;
            height: 80%;
          }
        }
        
        @media (max-width: 768px) {
          .chat-container { flex-direction: column; height: auto; }
          .sidebar { width: 100%; border-right: none; border-bottom: 1px solid #ececec; }
          .main-chat { padding: 0 8px; }
          .message-content { max-width: 95%; }
          .game-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .game-modal {
            width: 95%;
            height: 70%;
          }
        }
        
        @media (max-width: 480px) {
          .game-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .game-modal {
            width: 98%;
            height: 60%;
          }
        }
        
        .typing-indicator { display: flex; align-items: center; gap: 5px; }
        .typing-dot { width: 8px; height: 8px; background: #4f8cff; border-radius: 50%; animation: typing 1.4s infinite ease-in-out; }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        
        .error-message { 
          background: #f8d7da; 
          color: #721c24; 
          padding: 10px; 
          border-radius: 5px; 
          margin-bottom: 10px; 
          text-align: center;
        }
      `}</style>
    </div>
  );
}