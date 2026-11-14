'use client';

import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vscDarkPlus =
  require('react-syntax-highlighter/dist/styles/vs2015').default ||
  require('react-syntax-highlighter/dist/styles/vs2015');
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from '../AI3DRobot.module.css';
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
  onRetry: (text: string) => void;
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
    onToggleHistory, onRetry, onToggleSide, onCollapse, onNavigate, onPreviewNote,
  } = props;

  return (
    <div
      ref={bubbleBoxRef}
      className={`${styles.bubble} absolute top-3 sm:top-5 ${
        bubbleSide === 'right' ? 'right-3 sm:right-5' : 'left-3 sm:left-5'
      } z-10 w-[calc(100%-1.5rem)] sm:w-[410px] md:w-[450px] max-h-[calc(100%-155px)] flex flex-col bg-[#f7f0e4]/95 backdrop-blur-xl rounded-2xl border border-[#8b7355]/45 shadow-[0_16px_48px_rgba(62,43,24,0.22),0_0_24px_rgba(212,163,106,0.16)] transition-all duration-300`}
    >
      {/* 顶部栏：状态灯 + 标题 + 模式按钮 */}
      <div className={styles.bubbleHeader}>
        <div className="flex items-center space-x-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span
              className={`${isTyping ? 'animate-ping' : 'hidden'} absolute inline-flex h-full w-full rounded-full opacity-40 ${
                isTyping ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isTyping ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
          </span>
          <span className={`text-xs sm:text-sm font-bold text-[#2b2118] truncate ${styles.bubbleTitle}`}>
            禾桔 · 学习助手
          </span>
        </div>

        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <button
            onClick={onToggleHistory}
            className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
              showHistoryMode
                ? `bg-[#8b5e2b] text-[#fcf7ee] border-[#8b5e2b] font-semibold ${styles.bubbleBtnActive}`
                : `text-[#4a3828] bg-[#8b7355]/12 border-[#8b7355]/30 hover:bg-[#8b7355]/24 ${styles.bubbleBtn}`
            }`}
            title="查看最新回复或完整对话"
          >
            对话历史
          </button>
          <button
            onClick={onToggleSide}
            className={`px-1.5 py-0.5 rounded text-[11px] border transition-all text-[#4a3828] bg-[#8b7355]/12 border-[#8b7355]/30 hover:bg-[#8b7355]/24 ${styles.bubbleBtn}`}
            title="调整聊天窗位置"
          >
            {bubbleSide === 'right' ? '◀左' : '右▶'}
          </button>
          <button
            onClick={onCollapse}
            className={`px-1.5 py-0.5 rounded text-[11px] border transition-all text-[#4a3828] bg-[#8b7355]/12 border-[#8b7355]/30 hover:bg-red-500/20 hover:text-red-700 ${styles.bubbleBtn}`}
            title="收起对话"
          >
            ─
          </button>
        </div>
      </div>

      {/* 内容区 */}
      <div className={`flex-1 overflow-y-auto p-3.5 space-y-3 text-xs sm:text-sm text-[#2b2118] custom-scrollbar ${styles.bubbleBody}`}>
        {!showHistoryMode ? (
          <>
            {/* 用户问题胶囊 */}
            {latestUserMessage && (
              <div className="flex justify-end">
                <div className={`max-w-[88%] px-3 py-1.5 rounded-xl bg-[#d4a36a]/22 border border-[#8b7355]/40 text-[#2b2118] text-xs ${styles.userPill}`}>
                  <span className="opacity-70 mr-1">你:</span>
                  {latestUserMessage.text}
                </div>
              </div>
            )}

            {/* 工具执行状态提示 */}
            {searchStatusText && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl bg-amber-600/12 border border-amber-700/35 text-[#7c4a1e] text-xs animate-pulse ${styles.statusPill}`}>
                <span>⚡</span>
                <span>{searchStatusText}</span>
              </div>
            )}

            {/* AI 流式回复（含执行轨迹 / 课程胶囊 / 引证卡片 / 笔记草稿） */}
            {latestAiMessage && (
              <div className="space-y-3">
                {latestAiMessage.notice && <p role="status" className={`text-xs text-[#8b5e2b] ${styles.noticeText}`}>{latestAiMessage.notice}</p>}
                {latestAiMessage.failed && latestAiMessage.retryText && <button disabled={isTyping} onClick={() => onRetry(latestAiMessage.retryText!)} className="px-3 py-1 rounded-lg border border-[#8b5e2b] text-[#7c4a1e] hover:bg-[#8b5e2b]/10">重试这次提问</button>}
                <TracePanel steps={latestAiMessage.agentSteps || []} offline={latestAiMessage.offline} />

                {/* B7：流式输出时的墨迹呼吸光 + 墨滴光标 */}
                <div
                  className={`prose prose-sm max-w-none text-[#2b2118] leading-relaxed ${styles.bubbleProse} ${
                    isTyping ? styles.streamingText : ''
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
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
                            className={`text-[#9a5b13] underline hover:text-[#6e3e08] font-medium ${styles.bubbleLink}`}
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                      code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <div className="my-2 rounded-lg overflow-hidden border border-[#8b7355]/25">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                background: '#161310',
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
                            className={`bg-[#8b7355]/15 px-1.5 py-0.5 rounded text-xs font-mono text-[#7c4a1e] ${styles.bubbleInlineCode}`}
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
                  <div className={`pt-2 border-t border-[#8b7355]/25 ${styles.bubbleDivider}`}>
                    <div className={`text-[11px] text-[#7c4a1e] font-semibold mb-1.5 flex items-center gap-1 ${styles.bubbleAccent}`}>
                      <span>相关课程</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {latestAiMessage.siteLinks.map((lnk, i) => (
                        <button
                          key={i}
                          onClick={() => onNavigate(lnk.href)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[#d4a36a]/22 hover:bg-[#8b5e2b] text-[#2b2118] hover:text-[#fcf7ee] border border-[#8b7355]/40 transition-all font-medium ${styles.coursePill}`}
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
                  <div className={`pt-2 border-t border-[#8b7355]/25 ${styles.bubbleDivider}`}>
                    <div className={`text-[11px] text-[#216672] font-semibold mb-1.5 flex items-center gap-1 ${styles.citationHeading}`}>
                      <span>{latestAiMessage.citations.every(cite => cite.source === 'recommended') ? '推荐文档（非实时搜索）' : '搜索参考资料'}</span>
                    </div>
                    <div className="space-y-1.5">
                      {latestAiMessage.citations.map(cite => (
                        <a
                          key={cite.index}
                          href={cite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block p-2 rounded-xl bg-[#e9eff0] hover:bg-[#dce8eb] border border-[#5b9ca6]/40 transition-all group ${styles.citationCard}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-xs font-semibold text-[#1d4c56] group-hover:underline truncate ${styles.citationTitle}`}>
                              [{cite.index}] {cite.title}
                              <small className="ml-1 opacity-75">{cite.source === 'recommended' ? '推荐链接' : cite.contentFetched ? '已读取正文' : '搜索摘要'}</small>
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded bg-[#1d4c56]/12 text-[#1d4c56] font-mono flex-shrink-0 ${styles.citationBadge}`}>
                              {cite.domain} ↗
                            </span>
                          </div>
                          {cite.snippet && (
                            <p className={`text-[11px] text-[#435a60] line-clamp-2 mt-1 ${styles.citationSnippet}`}>
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
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-[#efe3cf] to-[#e6d5ba] border border-[#8b7355]/45 space-y-2 ${styles.draftCard}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold text-[#7c4a1e] ${styles.bubbleAccent}`}>笔记草稿</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full bg-[#8b7355]/18 text-[#4a3828] ${styles.draftBadge}`}>
                        {latestAiMessage.noteDraft.category} · {latestAiMessage.noteDraft.technology}
                      </span>
                    </div>
                    <div className={`text-xs font-semibold text-[#2b2118] truncate ${styles.draftTitle}`}>
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
                      <span className={`text-xs text-[#5e4a38] ${styles.draftHint}`}>确认内容后，再保存到我的笔记。</span>
                    </div>
                    {savedNoteTip && (
                      <div className={`flex items-center justify-between text-xs text-emerald-800 pt-1 ${styles.savedTip}`}>
                        <span>{savedNoteTip}</span>
                        <button onClick={() => onNavigate('/notes')} className="underline hover:opacity-80">
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
                      ? `bg-[#8b5e2b] text-[#fcf7ee] font-medium ${styles.historyUserMsg}`
                      : `bg-[#8b7355]/14 text-[#2b2118] border border-[#8b7355]/30 prose prose-sm max-w-none ${styles.bubbleProse} ${styles.historyAiMsg}`
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {msg.text}
                  </ReactMarkdown>
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
