'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Trash2 } from 'lucide-react';
import StitchLogo from '../StitchLogo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useAiChat } from './useAiChat';
import NotePreviewModal from './NotePreviewModal';

const QUICK_QUESTIONS = [
  '解释一下这个页面的核心概念',
  '举个实际例子',
  '这个知识点的常见坑？',
  '帮我总结本页要点',
];

export default function AiChatPanel() {
  const ai = useAiChat();
  const [mounted, setMounted] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ai.messages]);

  if (!mounted) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ai.sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* 头部（柔和素笺靛青书院风） */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 flex-shrink-0 border-b border-black/5"
        style={{ background: 'linear-gradient(90deg, #1B3B6F 0%, #244780 100%)', color: '#F8FAFC' }}
      >
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <StitchLogo size={20} />
        </div>
        <span className="font-semibold text-xs whitespace-nowrap shrink-0">AI助手</span>
        <div className="flex-1 min-w-0" />
        <button
          onClick={() => { if (window.confirm('确定清空当前对话？')) ai.clearConversation(); }}
          disabled={ai.loading}
          title="清空对话"
          className="bg-white/15 hover:bg-white/25 border-none text-white w-6 h-6 rounded-md cursor-pointer transition-colors disabled:opacity-60 flex items-center justify-center shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={ai.summarizeAndCreateNote}
          disabled={ai.loading}
          title="总结并保存为笔记"
          className="bg-white/15 hover:bg-white/25 border-none text-white px-2 py-1 rounded-md cursor-pointer text-[11px] whitespace-nowrap shrink-0 transition-colors disabled:opacity-60"
        >
          总结
        </button>
        <button
          onClick={ai.createNoteFromConversation}
          disabled={ai.loading}
          title="直接保存为笔记"
          className="bg-white/15 hover:bg-white/25 border-none text-white px-2 py-1 rounded-md cursor-pointer text-[11px] whitespace-nowrap shrink-0 transition-colors disabled:opacity-60"
        >
          存笔记
        </button>
      </div>

      {/* 消息区 */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 bg-[#f7fafc]">
        {ai.messages.map((m) => (
          <div key={m.id} className="flex mb-2.5 justify-end" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className="max-w-[85%]">
              <div
                className="flex items-center mb-1.5 gap-2"
                style={{ flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
              >
                <div
                  className="w-6 h-6 rounded-full text-white flex items-center justify-center flex-shrink-0"
                  style={{ background: m.role === 'assistant' ? 'var(--book-accent, #1B3B6F)' : '#0F1D33' }}
                >
                  {m.role === 'assistant' ? <StitchLogo size={16} /> : <UserOutlined style={{ fontSize: 13 }} />}
                </div>
                <div className="text-xs text-gray-500">{m.role === 'assistant' ? 'AI助手' : '我'}</div>
              </div>
              <div
                className="px-3 py-2.5 rounded-lg text-[13px] leading-relaxed"
                style={{
                  background: m.role === 'assistant' ? '#fff' : 'var(--book-accent, #1B3B6F)',
                  color: m.role === 'assistant' ? '#111' : '#fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                {m.role === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap break-words">{m.content}</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {ai.loading && (
          <div className="text-xs text-gray-400 px-1 py-2">AI 正在思考...</div>
        )}
        <div ref={endRef} />
      </div>

      {/* 快捷提问 */}
      <div className="flex flex-wrap gap-1.5 px-2.5 py-2 bg-[#FFFFFF] border-t border-gray-100 flex-shrink-0">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => ai.sendMessage(q)}
            disabled={ai.loading}
            className="text-xs px-2 py-1 rounded-full border transition-colors disabled:opacity-50 hover:text-white bg-[#FFFFFF]"
            style={{ borderColor: 'var(--book-accent, #1B3B6F)', color: 'var(--book-accent, #1B3B6F)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--book-accent, #1B3B6F)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      <div className="p-2.5 border-t border-gray-100 bg-[#FFFFFF] flex-shrink-0">
        <div className="flex gap-2">
          <input
            value={ai.input}
            onChange={(e) => ai.setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你的问题..."
            className="flex-1 min-w-0 px-2.5 py-2 rounded-lg border border-gray-200 bg-[#FFFFFF] text-[#0F1D33] text-sm focus:outline-none focus:border-blue-400"
            disabled={ai.loading}
          />
          <button
            onClick={() => ai.sendMessage()}
            disabled={ai.loading || !ai.input.trim()}
            className="px-3.5 py-2 rounded-lg text-white border-none cursor-pointer text-xs font-semibold disabled:opacity-50 transition-[transform,opacity] duration-150 active:scale-[0.96]"
            style={{ background: '#1B3B6F' }}
          >
            发送
          </button>
        </div>
      </div>

      {/* 笔记预览编辑模态 */}
      {ai.showPreview && ai.previewNote && (
        <NotePreviewModal
          note={ai.previewNote}
          onChange={ai.setPreviewNote}
          onClose={ai.closePreview}
          onSave={() => ai.savePreviewNote(ai.previewNote)}
          loading={ai.loading}
        />
      )}
    </div>
  );
}
