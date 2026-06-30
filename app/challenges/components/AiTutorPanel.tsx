'use client';

import React from 'react';
import { Sparkles, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface AiMessage { sender: 'user' | 'ai'; text: string; }

interface AiTutorPanelProps {
  messages: AiMessage[];
  loading: boolean;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

export function AiTutorPanel({ messages, loading, inputValue, onInputChange, onSend }: AiTutorPanelProps) {
  return (
    <div className="w-[28%] border-l border-slate-900 bg-slate-950/50 backdrop-blur-md flex flex-col overflow-hidden text-slate-300">
      {/* Header */}
      <div className="h-12 border-b border-slate-900 bg-slate-950/80 px-4 flex items-center gap-2 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold tracking-wider text-slate-300">星际 AI 辅导助理</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-1 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
            <span className="text-[10px] text-slate-500 font-mono">{msg.sender === 'user' ? 'YOU' : 'AI_ASSISTANT'}</span>
            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'}`}>
              {msg.sender === 'user' ? msg.text : (
                <div className="prose prose-invert prose-xs max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 italic">
            <Sparkles className="w-3.5 h-3.5 animate-spin" /> AI 正在分析特征并生成建议...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-900 bg-slate-950 shrink-0">
        <div className="flex gap-2 bg-slate-900/60 border border-slate-850 rounded-xl p-2 items-center">
          <input
            type="text" value={inputValue} onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
            placeholder="向 AI 咨询代码优化思路..."
            className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-600 focus:outline-none"
          />
          <button onClick={onSend} disabled={!inputValue.trim() || loading}
            className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white transition shrink-0">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
