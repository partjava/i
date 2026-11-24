'use client';

import { useEffect, useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
import styles from '../AI3DRobot.module.css';
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

  const [draft, setDraft] = useState(inputValue);
  useEffect(() => { setDraft(inputValue); }, [inputValue]);
  const submit = () => {
    if (isTyping || !draft.trim()) return;
    onSend(draft);
    setDraft('');
  };

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
              enableWebSearch ? styles.dockToggleSearchActive : styles.dockToggle
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
              ttsOn ? styles.dockToggleTtsActive : styles.dockToggle
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
              edgeAiOn ? styles.dockToggleEdgeActive : styles.dockToggle
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
            value={draft}
            onChange={e => { setDraft(e.target.value); setInputValue(e.target.value); }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder={
              enableWebSearch
                ? '输入问题，联网查找相关资料…'
                : '问知识点、找课程，或整理学习笔记…'
            }
            disabled={isTyping}
            className={`flex-1 min-w-0 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border focus:outline-none transition-colors ${styles.dockInput}`}
          />

          {/* 语音输入麦克风（Web Speech API，多模态输入） */}
          <button
            onClick={onToggleMic}
            disabled={isTyping}
            className={`px-3 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
              micListening ? `${styles.dockToggleMicActive} animate-pulse` : styles.dockToggle
            }`}
            title={micListening ? '正在聆听，点击停止' : '语音输入（普通话）'}
            aria-label={micListening ? '停止语音输入' : '开始语音输入'}
            aria-pressed={micListening}
          >
            <span>🎤</span>
          </button>

          <button
            onClick={submit}
            disabled={!draft.trim() || isTyping}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-45 flex items-center gap-1.5 flex-shrink-0 ${styles.dockSend}`}
          >
            <SendOutlined />
            <span>{isTyping ? '思考中' : '发送'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
