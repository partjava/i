'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteFooter from '@shared/components/SiteFooter';
import { Bookmark, Heart, MessageSquare, Search, ArrowRight, User, Star } from 'lucide-react';

interface BookmarkedNote {
  id: number;
  title: string;
  content: string;
  category: string;
  technology: string;
  isPublic: boolean;
  authorName: string;
  createdAt: string;
  bookmarkedAt: string;
  likeCount: number;
  commentCount: number;
}

// 去掉 Markdown 符号，只保留干净可读的纯文本摘要
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 分类对应的颜色
const categoryColors: Record<string, { bg: string; text: string }> = {
  'AI': { bg: 'bg-purple-50', text: 'text-purple-700' },
  '计算机': { bg: 'bg-blue-50', text: 'text-blue-700' },
  '大数据': { bg: 'bg-orange-50', text: 'text-orange-700' },
  'Java': { bg: 'bg-red-50', text: 'text-red-700' },
  'Python': { bg: 'bg-green-50', text: 'text-green-700' },
};

function getCategoryStyle(cat: string) {
  return categoryColors[cat] || { bg: 'bg-gray-100', text: 'text-gray-600' };
}

export default function BookmarksPage() {
  const { data: session, status } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<BookmarkedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [removingId, setRemovingId] = useState<number | null>(null);

  const getScrollContainer = () => {
    if (typeof document === 'undefined') return null;
    return document.querySelector('main') as HTMLElement | null;
  };

  const rememberBookmarksPosition = (noteId?: number) => {
    try {
      const container = getScrollContainer();
      const y = container ? container.scrollTop : window.scrollY;
      sessionStorage.setItem('bookmarks_scroll_y', String(y));
      if (noteId !== undefined && noteId !== null) {
        sessionStorage.setItem('bookmarks_last_note_id', String(noteId));
      }
    } catch {}
  };

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/auth/login'); return; }
    if (status === 'authenticated') {
      fetch('/api/user/bookmarks', { credentials: 'include' })
        .then(r => r.json())
        .then(data => setNotes(data?.data || data?.notes || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  // 返回时恢复滚动位置（优先按 noteId 锚点）
  useEffect(() => {
    if (status !== 'authenticated' || loading) return;

    const savedNoteId = sessionStorage.getItem('bookmarks_last_note_id');
    const savedY = sessionStorage.getItem('bookmarks_scroll_y');
    if (!savedNoteId && !savedY) return;

    if (savedNoteId) sessionStorage.removeItem('bookmarks_last_note_id');
    if (savedY) sessionStorage.removeItem('bookmarks_scroll_y');

    const y = savedY ? parseInt(savedY) : 0;

    requestAnimationFrame(() => {
      const container = getScrollContainer();
      const scrollToY = (top: number) => {
        if (container) container.scrollTo({ top, behavior: 'auto' });
        else window.scrollTo({ top, behavior: 'auto' });
      };

      const tryScrollToNote = () => {
        if (!savedNoteId) return false;
        const el = document.getElementById(`bookmark-note-${savedNoteId}`);
        if (!el) return false;
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
        scrollToY(Math.max(0, (container ? container.scrollTop : window.scrollY) - 24));
        return true;
      };

      const did = tryScrollToNote();
      if (!did) scrollToY(y);
      setTimeout(() => {
        const did2 = tryScrollToNote();
        if (!did2) scrollToY(y);
      }, 150);
    });
  }, [status, loading, notes.length]);

  const handleRemoveBookmark = async (noteId: number) => {
    setRemovingId(noteId);
    try {
      const res = await fetch(`/api/notes/${noteId}/bookmark`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) setNotes(prev => prev.filter(n => n.id !== noteId));
    } catch (e) {
      console.error(e);
    } finally {
      setRemovingId(null);
    }
  };

  const filtered = notes.filter(n =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.category?.toLowerCase().includes(search.toLowerCase()) ||
    n.technology?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-surface-page flex flex-col">
      {/* 素笺极简页头 */}
      <div className="bg-surface-raised border-b border-line-subtle">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center border border-line-subtle">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
                  我的收藏
                </h1>
                <p className="mt-1 text-content-muted text-sm">
                  已收藏 <span className="font-code font-semibold text-brand-primary">{notes.length}</span> 篇精选笔记
                </p>
              </div>
            </div>
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 bg-[#0F1D33] hover:bg-[#1B3B6F] text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors"
            >
              <span>浏览更多笔记</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* 搜索框 */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              placeholder="搜索收藏的标题或标签..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-page placeholder-content-muted text-content-primary rounded-xl border border-line-subtle focus:outline-none focus:border-brand-primary focus:bg-surface-raised text-sm transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        {notes.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-raised border border-line-subtle flex items-center justify-center text-content-muted">
              <Bookmark className="w-6 h-6" />
            </div>
            <p className="text-lg text-content-primary font-semibold">还没有收藏任何笔记</p>
            <p className="text-content-muted text-sm mt-1.5">去发现感兴趣的内容，点击星标即可收藏</p>
            <Link href="/notes" className="mt-6 inline-block bg-brand-primary text-content-inverse px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-colors text-sm font-medium">
              去浏览笔记
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-content-muted">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-60" />
            <p className="text-sm">没有找到匹配的收藏</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(note => {
              const catStyle = getCategoryStyle(note.category);
              const techStyle = getCategoryStyle(note.technology);
              const preview = stripMarkdown(note.content);
              return (
                <div
                  key={note.id}
                  id={`bookmark-note-${note.id}`}
                  className="bg-surface-raised rounded-2xl border border-line-subtle shadow-sm hover:shadow-md hover:border-line-strong transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer"
                  onClick={() => {
                    rememberBookmarksPosition(note.id);
                    router.push(`/notes/${note.id}`);
                  }}
                >
                  {/* 卡片顶部细微点缀条 */}
                  <div className="h-0.5 bg-gradient-to-r from-[#1B3B6F] to-[#D4AD72]" />

                  <div className="p-5 flex flex-col flex-1">
                    {/* 标题行 */}
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/notes/${note.id}`}
                        className="flex-1 min-w-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          rememberBookmarksPosition(note.id);
                        }}
                      >
                        <h2 className="font-semibold text-content-primary group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                          {note.title}
                        </h2>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBookmark(note.id);
                        }}
                        disabled={removingId === note.id}
                        className="shrink-0 text-[#D4AD72] hover:text-content-muted transition-colors mt-0.5"
                        title="取消收藏"
                      >
                        {removingId === note.id
                          ? <div className="w-4 h-4 border-2 border-line-strong border-t-transparent rounded-full animate-spin" />
                          : <Star className="w-4 h-4 fill-current" />
                        }
                      </button>
                    </div>

                    {/* 内容预览 */}
                    <p className="text-sm text-content-secondary mt-2 line-clamp-3 leading-relaxed flex-1">
                      {preview || '暂无内容预览'}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {note.category && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catStyle.bg} ${catStyle.text}`}>
                          {note.category}
                        </span>
                      )}
                      {note.technology && note.technology !== note.category && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${techStyle.bg} ${techStyle.text}`}>
                          {note.technology}
                        </span>
                      )}
                    </div>

                    {/* 底部信息（移除 Emoji，空作者名不渲染 ? 圆圈） */}
                    <div className="mt-4 pt-3 border-t border-line-subtle flex items-center justify-between text-xs text-content-muted">
                      <div className="flex items-center gap-3 font-code tabular-nums">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500/80" /> {note.likeCount}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> {note.commentCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center text-[11px] font-bold">
                          {note.authorName?.trim()
                            ? note.authorName.trim()[0].toUpperCase()
                            : <User className="w-3 h-3" />
                          }
                        </div>
                        <span>{note.authorName?.trim() || '社区作者'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter className="mt-auto" />
    </div>
  );
}
