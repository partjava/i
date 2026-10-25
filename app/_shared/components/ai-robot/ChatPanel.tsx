'use client';

import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vscDarkPlus =
  require('react-syntax-highlighter/dist/styles/vs2015').default ||
  require('react-syntax-highlighter/dist/styles/vs2015');
import remarkGfm from 'remark-gfm';
import styles from '../../AI3DRobot.module.css';
import TracePanel from './TracePanel';
import type { BubbleSide, Message } from './types';

export interface ChatPanelProps {
  bubbleBoxRef: React.RefObject<HTMLDivElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  bubbleSide: BubbleSide;
  isTyping: boolean;
  showHistoryMode: boolean;
  messages: Message[];
  latestAiMessage?: Message;
  latestUserMessage?: Message;
  searchStatusText: string | null;
  savingNote: boolean;
  savedNoteTip: string | null;
  onToggleHistory: () => void;
  onToggleSide: () => void;
  onCollapse: () => void;
  onNavigate: (href: string) => void;
  onPreviewNote: (note: any) => void;
}

/**
 * 从黑猫嘴巴放射出的半透明暖金毛玻璃对话窗
 * （最新放射模式 / 完整历史模式，含站内胶囊、引证卡片、笔记草稿卡）
 */
export default function ChatPanel(props: ChatPanelProps) {
  const {
    bubbleBoxRef, messagesEndRef, bubbleSide, isTyping, showHistoryMode,
    messages, latestAiMessage, latestUserMessage, searchStatusText,
    savingNote, savedNoteTip,
    onToggleHistory, onToggleSide, onCollapse, onNavigate, onPreviewNote,
  } = props;

  return (
    <div
      ref={bubbleBoxRef}
      className={`${styles.bubble} absolute top-3 sm:top-5 ${
        bubbleSide === 'right' ? 'right-3 sm:right-5' : 'left-3 sm:left-5'
      } z-10 w-[calc(100%-1.5rem)] sm:w-[410px] md:w-[450px] max-h-[calc(100%-155px)] flex flex-col bg-[#161310]/88 backdrop-blur-xl rounded-2xl border border-[#d4a36a]/45 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_24px_rgba(212,163,106,0.18)] transition-all duration-300`}
    >
      {/* 顶部栏：状态灯 + 标题 + 模式按钮 */}
      <div className={styles.bubbleHeader}>
        <div className="flex items-center space-x-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span
              className={`${isTyping ? 'animate-ping' : 'hidden'} absolute inline-flex h-full w-full rounded-full opacity-40 ${
                isTyping ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isTyping ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
            />
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#f7efe4] truncate">
            禾桔 · 学习助手
          </span>
        </div>

        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <button
            onClick={onToggleHistory}
            className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
              showHistoryMode
                ? 'bg-[#d4a36a] text-[#1c1a17] border-[#d4a36a] font-semibold'
                : 'bg-white/5 text-[#e9dac3] border-white/15 hover:bg-white/10'
            }`}
            title="查看最新回复或完整对话"
          >
            {showHistoryMode ? '最新回复' : `历史（${messages.length}）`}
          </button>
          <button
            onClick={onToggleSide}
            className="px-1.5 py-0.5 rounded text-[11px] bg-white/5 hover:bg-white/15 text-[#e9dac3] border border-white/10"
            title="调整聊天窗位置"
          >
            {bubbleSide === 'right' ? '◀左' : '右▶'}
          </button>
          <button
            onClick={onCollapse}
            className="px-1.5 py-0.5 rounded text-[11px] bg-white/5 hover:bg-red-500/30 text-[#e9dac3]/70 hover:text-white"
            title="收起对话"
          >
            ─
          </button>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs sm:text-sm text-[#f5ece0] custom-scrollbar">
        {!showHistoryMode ? (
          <>
            {/* 用户问题胶囊 */}
            {latestUserMessage && (
              <div className="flex justify-end">
                <div className="max-w-[88%] px-3 py-1.5 rounded-xl bg-[#d4a36a]/20 border border-[#d4a36a]/40 text-[#fcefd9] text-xs">
                  <span className="opacity-70 mr-1">你:</span>
                  {latestUserMessage.text}
                </div>
              </div>
            )}

            {/* 工具执行状态提示 */}
            {searchStatusText && (
              <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-200 text-xs animate-pulse">
                <span>⚡</span>
                <span>{searchStatusText}</span>
              </div>
            )}

            {/* AI 流式回复（含执行轨迹 / 课程胶囊 / 引证卡片 / 笔记草稿） */}
            {latestAiMessage && (
              <div className="space-y-3">
                <TracePanel steps={latestAiMessage.agentSteps || []} offline={latestAiMessage.offline} />

                {/* B7：流式输出时的墨迹呼吸光 + 墨滴光标 */}
                <div
                  className={`prose prose-invert prose-sm max-w-none text-[#f4eadc] leading-relaxed ${
                    isTyping ? styles.streamingText : ''
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a({ href, children, ...props }: any) {
                        const isInternal = href && href.startsWith('/');
                        return (
                          <a
                            href={href}
                            onClick={e => {
                              if (isInternal) {
                                e.preventDefault();
                                onNavigate(href);
                              }
                            }}
                            target={isInternal ? undefined : '_blank'}
                            rel={isInternal ? undefined : 'noopener noreferrer'}
                            className="text-[#f3c687] underline hover:text-[#ffe0b2] font-medium"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                      code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <div className="my-2 rounded-lg overflow-hidden border border-white/10">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                background: '#0e0d0b',
                                padding: '0.75rem',
                                fontSize: '12px'
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code
                            className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-[#f5c88c]"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {latestAiMessage.text || (isTyping ? '喵呜~ 正在思考中...' : '')}
                  </ReactMarkdown>
                  {isTyping && latestAiMessage.text && (
                    <span className={styles.inkCaret} aria-hidden="true" />
                  )}
                </div>

                {/* 站内课程直达胶囊 */}
                {latestAiMessage.siteLinks && latestAiMessage.siteLinks.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-[11px] text-[#d4a36a] font-semibold mb-1.5 flex items-center gap-1">
                      <span>相关课程</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {latestAiMessage.siteLinks.map((lnk, i) => (
                        <button
                          key={i}
                          onClick={() => onNavigate(lnk.href)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[#d4a36a]/20 hover:bg-[#d4a36a] text-[#f7efe4] hover:text-[#1c1a17] border border-[#d4a36a]/45 transition-all font-medium"
                        >
                          <span>📖 {lnk.name}</span>
                          <span className="opacity-75">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 联网深搜引证卡片 */}
                {latestAiMessage.citations && latestAiMessage.citations.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-[11px] text-[#63c7ff] font-semibold mb-1.5 flex items-center gap-1">
                      <span>参考资料</span>
                    </div>
                    <div className="space-y-1.5">
                      {latestAiMessage.citations.map(cite => (
                        <a
                          key={cite.index}
                          href={cite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 rounded-xl bg-[#1f2933]/75 hover:bg-[#273645] border border-[#56b6c2]/40 transition-all group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#a8e4ec] group-hover:underline truncate">
                              [{cite.index}] {cite.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#7fd4e0] font-mono flex-shrink-0">
                              {cite.domain} ↗
                            </span>
                          </div>
                          {cite.snippet && (
                            <p className="text-[11px] text-gray-300/80 line-clamp-2 mt-1">
                              {cite.snippet}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 笔记草稿卡片 */}
                {latestAiMessage.noteDraft && (
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#2b2319] to-[#1e1913] border border-[#d4a36a]/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f5d5a3]">笔记草稿</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4a36a]/25 text-[#f7efe4]">
                        {latestAiMessage.noteDraft.category} · {latestAiMessage.noteDraft.technology}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      《{latestAiMessage.noteDraft.title}》
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => onPreviewNote(latestAiMessage.noteDraft)}
                        disabled={savingNote}
                        className={styles.previewButton}
                      >
                        预览并保存
                      </button>
                      <span className="text-xs text-[#c8bba9]">确认内容后，再保存到我的笔记。</span>
                    </div>
                    {savedNoteTip && (
                      <div className="flex items-center justify-between text-xs text-emerald-300 pt-1">
                        <span>{savedNoteTip}</span>
                        <button onClick={() => onNavigate('/notes')} className="underline hover:text-white">
                          前往笔记中心查看 →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* 完整历史对话流 */
          <div className="space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] px-3 py-2 rounded-xl text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#d4a36a] text-[#1c1a17] font-medium'
                      : 'bg-white/10 text-[#f4eadc] border border-white/10'
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
