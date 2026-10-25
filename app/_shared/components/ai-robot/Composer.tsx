'use client';

import { SendOutlined } from '@ant-design/icons';
import styles from '../../AI3DRobot.module.css';
import type { QuickAction } from './types';

export interface ComposerProps {
  isTyping: boolean;
  inputValue: string;
  setInputValue: (v: string) => void;
  onSend: (text: string) => void;
  onShortcut: (text: string, opts?: { explicitAgent?: string }) => void;
  /** 按当前路由动态生成的上下文快捷操作 */
  quickActions: QuickAction[];
  // 联网深搜
  enableWebSearch: boolean;
  onToggleSearch: () => void;
  // TTS 朗读
  ttsOn: boolean;
  onToggleTts: () => void;
  // 端侧语义缓存
  edgeAiOn: boolean;
  edgeStatus: 'idle' | 'loading' | 'ready' | 'error';
  edgeProgress: number;
  onToggleEdge: () => void;
  // 语音输入
  micListening: boolean;
  onToggleMic: () => void;
}

/**
 * 底部常驻直聊输入坞（Chat Dock）：快捷操作 + 开关组 + 输入 + 语音 + 发送
 */
export default function Composer(props: ComposerProps) {
  const {
    isTyping, inputValue, setInputValue, onSend, onShortcut, quickActions,
    enableWebSearch, onToggleSearch,
    ttsOn, onToggleTts,
    edgeAiOn, edgeStatus, edgeProgress, onToggleEdge,
    micListening, onToggleMic,
  } = props;

  return (
    <div className={`${styles.dock} absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 sm:px-4 z-20`}>
      <div className={styles.composer}>
        <div className={styles.shortcuts} aria-label="学习快捷操作">
          {quickActions.map(action => (
            <button
              key={action.label}
              disabled={isTyping}
              onClick={() => onShortcut(action.text, action.opts)}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* 联网深搜开关 */}
          <button
            onClick={onToggleSearch}
            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
              enableWebSearch
                ? 'bg-[#1d3b47] border-[#56b6c2] text-[#a8e4ec] shadow-[0_0_12px_rgba(86,182,194,0.35)]'
                : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
            }`}
            title="开启后可联网查找相关资料"
            aria-label={enableWebSearch ? '联网搜索：开' : '联网搜索：关'}
            aria-pressed={enableWebSearch}
          >
            <span>🌐</span>
            <span className="hidden sm:inline">
              {enableWebSearch ? '联网搜索：开' : '联网搜索：关'}
            </span>
          </button>

          {/* TTS 朗读开关（多模态输出） */}
          <button
            onClick={onToggleTts}
            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
              ttsOn
                ? 'bg-[#3a2f1d] border-[#d4a36a] text-[#f5d5a3] shadow-[0_0_12px_rgba(212,163,106,0.35)]'
                : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
            }`}
            title={ttsOn ? '语音朗读：开（回答完成后自动朗读）' : '语音朗读：关'}
            aria-pressed={ttsOn}
          >
            <span>{ttsOn ? '🔊' : '🔈'}</span>
            <span className="hidden sm:inline">朗读</span>
          </button>

          {/* 端侧语义缓存开关（Transformers.js，端云协同） */}
          <button
            onClick={onToggleEdge}
            disabled={edgeStatus === 'loading'}
            className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
              edgeAiOn
                ? 'bg-[#1d3b2f] border-[#7bd88f] text-[#c9f2d4] shadow-[0_0_12px_rgba(123,216,143,0.3)]'
                : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
            }`}
            title={
              edgeStatus === 'loading'
                ? `端侧模型下载中 ${edgeProgress}%（首次约120MB，之后本地缓存）`
                : '浏览器本地语义缓存（Transformers.js）：相似问题离线秒回'
            }
            aria-pressed={edgeAiOn}
          >
            <span>{edgeStatus === 'loading' ? '⏳' : '📦'}</span>
            <span className="hidden sm:inline">
              {edgeStatus === 'loading' ? `${edgeProgress}%` : '端侧'}
            </span>
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend(inputValue);
              }
            }}
            placeholder={
              enableWebSearch
                ? '输入问题，联网查找相关资料…'
                : '问知识点、找课程，或整理学习笔记…'
            }
            disabled={isTyping}
            className="flex-1 min-w-0 bg-[#100e0c]/90 text-[#f7efe4] placeholder-[#e9dac3]/45 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#d4a36a]/30 focus:outline-none focus:border-[#d4a36a] transition-colors"
          />

          {/* 语音输入麦克风（Web Speech API，多模态输入） */}
          <button
            onClick={onToggleMic}
            disabled={isTyping}
            className={`px-3 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
              micListening
                ? 'bg-red-500/25 border-red-400/70 text-red-200 animate-pulse'
                : 'bg-[#24201c] border-white/15 text-[#e9dac3]/80 hover:text-white'
            }`}
            title={micListening ? '正在聆听，点击停止' : '语音输入（普通话）'}
            aria-label={micListening ? '停止语音输入' : '开始语音输入'}
            aria-pressed={micListening}
          >
            <span>🎤</span>
          </button>

          <button
            onClick={() => onSend(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a36a] to-[#b8894e] hover:from-[#e2b478] hover:to-[#c8985a] text-[#1c1a17] font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-45 flex items-center gap-1.5 flex-shrink-0"
          >
            <SendOutlined />
            <span>{isTyping ? '思考中' : '发送'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
