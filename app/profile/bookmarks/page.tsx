'use client';
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteFooter from '@shared/components/SiteFooter';
import {
  Bookmark,
  Heart,
  MessageSquare,
  Search,
  ArrowRight,
  User,
  Star,
  Sparkles,
  Clock,
  ThumbsUp,
} from 'lucide-react';

interface NoteSummaryItem {
  id: number;
  title: string;
  content: string;
  category?: string;
  technology?: string;
  isPublic?: boolean;
  authorName?: string;
  createdAt?: string;
  likeCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
}

interface ReceivedLikeNoteSummary {
  noteId: number;
  title: string;
  category?: string;
  likeCount: number;
  latestLikedAt?: string;
  recentLikers: Array<{ id: number; name: string; avatar?: string | null }>;
}

interface ReceivedLikeRecord {
  id: number;
  noteId: number;
  noteTitle: string;
  category?: string;
  likerId: number;
  likerName: string;
  likerAvatar?: string | null;
  likedAt?: string;
}

interface ReceivedLikesData {
  totalReceived: number;
  notesWithLikesCount: number;
  summary: ReceivedLikeNoteSummary[];
  records: ReceivedLikeRecord[];
}

type CenterTab = 'bookmarks' | 'liked' | 'received';

function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/\[\[(.+?)\]\]/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const categoryColors: Record<string, string> = {
  AI: 'bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-200',
  人工智能: 'bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-200',
  计算机: 'bg-blue-50 text-blue-700 dark:bg-sky-500/15 dark:text-sky-200',
  大数据: 'bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200',
  Java: 'bg-red-50 text-red-700 dark:bg-rose-500/15 dark:text-rose-200',
  Python: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  软件工程: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  网络安全: 'bg-amber-50 text-amber-800 dark:bg-[#D4AD72]/15 dark:text-[#E8CA96]',
};

function getCategoryClass(cat?: string): string {
  if (!cat) return 'bg-surface-muted text-content-secondary';
  return categoryColors[cat] || 'bg-surface-muted text-content-secondary';
}

function formatTimeLabel(raw?: string): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return d.toLocaleDateString('zh-CN');
}

export default function BookmarksAndLikesCenterPage() {
  const { status } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<CenterTab>('bookmarks');
  const [bookmarks, setBookmarks] = useState<NoteSummaryItem[]>([]);
  const [likedNotes, setLikedNotes] = useState<NoteSummaryItem[]>([]);
  const [receivedData, setReceivedData] = useState<ReceivedLikesData>({
    totalReceived: 0,
    notesWithLikesCount: 0,
    summary: [],
    records: [],
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = new URLSearchParams(window.location.search).get('tab');
    if (t === 'liked' || t === 'received' || t === 'bookmarks') {
      setActiveTab(t);
    }
  }, []);

  const switchTab = (next: CenterTab) => {
    setActiveTab(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', next);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }
    if (status === 'authenticated') {
      setLoading(true);
      Promise.allSettled([
        fetch('/api/user/bookmarks', { credentials: 'include' }).then((r) => r.json()),
        fetch('/api/user/likes', { credentials: 'include' }).then((r) => r.json()),
        fetch('/api/user/likes-received', { credentials: 'include' }).then((r) => r.json()),
      ])
        .then(([bmRes, likeRes, recRes]) => {
          if (bmRes.status === 'fulfilled') {
            setBookmarks(bmRes.value?.data || bmRes.value?.notes || []);
          }
          if (likeRes.status === 'fulfilled') {
            setLikedNotes(likeRes.value?.data || []);
          }
          if (recRes.status === 'fulfilled' && recRes.value?.data) {
            setReceivedData({
              totalReceived: recRes.value.data.totalReceived || 0,
              notesWithLikesCount: recRes.value.data.notesWithLikesCount || 0,
              summary: recRes.value.data.summary || [],
              records: recRes.value.data.records || [],
            });
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleRemoveBookmark = async (noteId: number) => {
    setRemovingId(noteId);
    try {
      const res = await fetch(`/api/notes/${noteId}/bookmark`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setBookmarks((prev) => prev.filter((n) => n.id !== noteId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRemovingId(null);
    }
  };

  const handleUnlike = async (noteId: number) => {
    setRemovingId(noteId);
    try {
      const res = await fetch(`/api/notes/${noteId}/like`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setLikedNotes((prev) => prev.filter((n) => n.id !== noteId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRemovingId(null);
    }
  };

  const q = search.trim().toLowerCase();

  const filteredBookmarks = useMemo(
    () =>
      bookmarks.filter(
        (n) =>
          !q ||
          n.title?.toLowerCase().includes(q) ||
          n.category?.toLowerCase().includes(q) ||
          n.technology?.toLowerCase().includes(q)
      ),
    [bookmarks, q]
  );

  const filteredLiked = useMemo(
    () =>
      likedNotes.filter(
        (n) =>
          !q ||
          n.title?.toLowerCase().includes(q) ||
          n.category?.toLowerCase().includes(q) ||
          n.technology?.toLowerCase().includes(q)
      ),
    [likedNotes, q]
  );

  const filteredReceivedSummary = useMemo(
    () =>
      receivedData.summary.filter(
        (item) =>
          !q ||
          item.title?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.recentLikers.some((l) => l.name?.toLowerCase().includes(q))
      ),
    [receivedData.summary, q]
  );

  const filteredReceivedRecords = useMemo(
    () =>
      receivedData.records.filter(
        (r) =>
          !q ||
          r.noteTitle?.toLowerCase().includes(q) ||
          r.likerName?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q)
      ),
    [receivedData.records, q]
  );

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-70px)] bg-surface-page">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1B3B6F] dark:border-[#D4AD72] border-t-transparent rounded-full animate-spin" />
          <span className="text-content-muted text-sm">正在同步收藏与点赞记录...</span>
        </div>
      </div>
    );
  }

  const activeNotesList = activeTab === 'bookmarks' ? filteredBookmarks : filteredLiked;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-surface-page flex flex-col">
      {/* 顶部交互档案页头 */}
      <div className="bg-surface-raised border-b border-line-subtle">
        <div className="max-w-6xl mx-auto px-6 py-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#1B3B6F]/10 dark:bg-[#D4AD72]/15 text-[#1B3B6F] dark:text-[#D4AD72] flex items-center justify-center border border-line-subtle">
                {activeTab === 'bookmarks' ? (
                  <Bookmark className="w-5 h-5" />
                ) : activeTab === 'liked' ? (
                  <Heart className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-content-primary tracking-tight">
                  我的收藏与点赞中心
                </h1>
                <p className="mt-1 text-content-muted text-sm">
                  已收藏{' '}
                  <span className="font-code font-semibold text-brand-primary dark:text-[#D4AD72]">
                    {bookmarks.length}
                  </span>{' '}
                  篇 · 我点赞的{' '}
                  <span className="font-code font-semibold text-rose-600 dark:text-rose-300">
                    {likedNotes.length}
                  </span>{' '}
                  篇 · 收到的赞{' '}
                  <span className="font-code font-semibold text-amber-600 dark:text-[#E8CA96]">
                    {receivedData.totalReceived}
                  </span>{' '}
                  次
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-line-subtle bg-surface-page hover:bg-surface-muted text-content-secondary hover:text-content-primary text-sm font-medium transition-colors"
              >
                返回个人档案
              </Link>
              <Link
                href="/notes"
                className="inline-flex items-center gap-1.5 bg-[#0F1D33] hover:bg-[#1B3B6F] dark:bg-[#D4AD72] dark:hover:bg-[#E2BE84] dark:text-[#0F1D33] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-colors"
              >
                <span>浏览更多笔记</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3-Tab 分段导航 + 搜索框 */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="收藏与点赞分类"
              className="inline-flex flex-wrap items-center p-1 rounded-2xl bg-surface-page border border-line-subtle gap-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'bookmarks'}
                onClick={() => switchTab('bookmarks')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'bookmarks'
                    ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-raised'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>我的收藏</span>
                <span
                  className={`text-xs font-code px-1.5 py-0.2 rounded-full tabular-nums ${
                    activeTab === 'bookmarks'
                      ? 'bg-white/20 text-white dark:bg-[#0F1D33]/15 dark:text-[#0F1D33]'
                      : 'bg-surface-muted text-content-muted'
                  }`}
                >
                  {bookmarks.length}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'liked'}
                onClick={() => switchTab('liked')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'liked'
                    ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-raised'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>我点赞的</span>
                <span
                  className={`text-xs font-code px-1.5 py-0.2 rounded-full tabular-nums ${
                    activeTab === 'liked'
                      ? 'bg-white/20 text-white dark:bg-[#0F1D33]/15 dark:text-[#0F1D33]'
                      : 'bg-surface-muted text-content-muted'
                  }`}
                >
                  {likedNotes.length}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'received'}
                onClick={() => switchTab('received')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'received'
                    ? 'bg-[#0F1D33] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-raised'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>收到的赞</span>
                <span
                  className={`text-xs font-code px-1.5 py-0.2 rounded-full tabular-nums ${
                    activeTab === 'received'
                      ? 'bg-white/20 text-white dark:bg-[#0F1D33]/15 dark:text-[#0F1D33]'
                      : 'bg-surface-muted text-content-muted'
                  }`}
                >
                  {receivedData.totalReceived}
                </span>
              </button>
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
              <input
                type="text"
                placeholder={
                  activeTab === 'received'
                    ? '搜索获赞笔记或点赞用户...'
                    : '搜索标题、分类或技术栈...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-page placeholder-content-muted text-content-primary rounded-xl border border-line-subtle focus:outline-none focus:border-brand-primary dark:focus:border-[#D4AD72] focus:bg-surface-raised text-sm transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'received' ? (
          receivedData.totalReceived === 0 ? (
            <div className="text-center py-24">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-raised border border-line-subtle flex items-center justify-center text-rose-500/80">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-lg text-content-primary font-semibold">还没有收到点赞</p>
              <p className="text-content-muted text-sm mt-1.5">
                将高质量学习笔记设为公开分享，就能收获同学与社区的认可
              </p>
              <Link
                href="/notes"
                className="mt-6 inline-block bg-brand-primary text-content-inverse px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-colors text-sm font-medium"
              >
                去创作或公开笔记
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 顶部摘要统计条 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-surface-raised border border-line-subtle p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-content-muted">累计获赞次数</div>
                    <div className="text-2xl font-bold text-rose-600 dark:text-rose-300 mt-1 tabular-nums">
                      {receivedData.totalReceived}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-raised border border-line-subtle p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-content-muted">获赞笔记数</div>
                    <div className="text-2xl font-bold text-content-primary mt-1 tabular-nums">
                      {receivedData.notesWithLikesCount}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AD72]/15 text-[#9A7234] dark:text-[#D4AD72] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-raised border border-line-subtle p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-content-muted">最近获赞时间</div>
                    <div className="text-base font-semibold text-content-primary mt-1.5">
                      {formatTimeLabel(receivedData.records[0]?.likedAt) || '近期'}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#1B3B6F]/10 dark:bg-sky-500/15 text-[#1B3B6F] dark:text-sky-300 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 获赞笔记排行卡片 */}
              <div>
                <h2 className="text-base font-bold text-content-primary mb-3.5 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-rose-500" />
                  <span>获赞笔记榜单</span>
                </h2>
                {filteredReceivedSummary.length === 0 ? (
                  <p className="text-sm text-content-muted py-6">没有匹配的获赞笔记</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredReceivedSummary.map((item) => (
                      <Link
                        key={item.noteId}
                        href={`/notes/${item.noteId}`}
                        className="group rounded-2xl bg-surface-raised border border-line-subtle hover:border-[#D4AD72]/60 shadow-sm hover:shadow-md p-5 transition-all flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-content-primary group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] line-clamp-2 leading-snug transition-colors">
                            {item.title}
                          </h3>
                          <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-bold tabular-nums">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            {item.likeCount}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-line-subtle text-xs text-content-muted">
                          <div className="flex items-center -space-x-1.5">
                            {item.recentLikers.map((liker) => (
                              <span
                                key={liker.id}
                                title={liker.name}
                                className="w-6 h-6 rounded-full bg-[#1B3B6F] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] border-2 border-surface-raised flex items-center justify-center text-[10px] font-bold"
                              >
                                {(liker.name || '学')[0].toUpperCase()}
                              </span>
                            ))}
                            <span className="pl-3 text-[11px] text-content-muted truncate max-w-[140px]">
                              {item.recentLikers[0]?.name}
                              {item.recentLikers.length > 1 ? ` 等 ${item.likeCount} 次点赞` : ' 点赞了'}
                            </span>
                          </div>
                          {item.category && (
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getCategoryClass(item.category)}`}>
                              {item.category}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 最新点赞明细流 */}
              <div>
                <h2 className="text-base font-bold text-content-primary mb-3.5 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#D4AD72]" />
                  <span>点赞动态明细</span>
                </h2>
                <div className="rounded-2xl bg-surface-raised border border-line-subtle divide-y divide-line-subtle overflow-hidden">
                  {filteredReceivedRecords.length === 0 ? (
                    <div className="p-6 text-center text-sm text-content-muted">没有匹配的点赞记录</div>
                  ) : (
                    filteredReceivedRecords.slice(0, 40).map((rec) => (
                      <div
                        key={rec.id}
                        className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-surface-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 flex items-center justify-center text-xs font-bold shrink-0">
                            {(rec.likerName || '学')[0].toUpperCase()}
                          </div>
                          <div className="text-sm text-content-secondary min-w-0">
                            <span className="font-semibold text-content-primary">{rec.likerName}</span>
                            <span className="mx-1.5 text-content-muted">赞了你的笔记</span>
                            <Link
                              href={`/notes/${rec.noteId}`}
                              className="font-medium text-brand-primary dark:text-[#8AB4F8] hover:underline"
                            >
                              《{rec.noteTitle}》
                            </Link>
                          </div>
                        </div>
                        <span className="text-xs text-content-muted font-mono shrink-0">
                          {formatTimeLabel(rec.likedAt)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          /* 我的收藏 / 我点赞的 统一卡片网格 */
          <>
            {(activeTab === 'bookmarks' ? bookmarks.length === 0 : likedNotes.length === 0) ? (
              <div className="text-center py-24">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-raised border border-line-subtle flex items-center justify-center text-content-muted">
                  {activeTab === 'bookmarks' ? <Bookmark className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
                </div>
                <p className="text-lg text-content-primary font-semibold">
                  {activeTab === 'bookmarks' ? '还没有收藏任何笔记' : '还没有点赞过笔记'}
                </p>
                <p className="text-content-muted text-sm mt-1.5">
                  {activeTab === 'bookmarks'
                    ? '去发现感兴趣的内容，点击星标即可收藏'
                    : '遇到优质笔记时顺手点个赞，也会汇总在这里方便回看'}
                </p>
                <Link
                  href="/notes"
                  className="mt-6 inline-block bg-brand-primary text-content-inverse px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-colors text-sm font-medium"
                >
                  去浏览笔记
                </Link>
              </div>
            ) : activeNotesList.length === 0 ? (
              <div className="text-center py-20 text-content-muted">
                <Search className="w-8 h-8 mx-auto mb-3 opacity-60" />
                <p className="text-sm">没有找到匹配的笔记</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {activeNotesList.map((note) => {
                  const preview = stripMarkdown(note.content);
                  const isBookmarksTab = activeTab === 'bookmarks';
                  return (
                    <div
                      key={note.id}
                      id={`bookmark-note-${note.id}`}
                      className="bg-surface-raised rounded-2xl border border-line-subtle shadow-sm hover:shadow-md hover:border-[#D4AD72]/50 transition-all duration-200 flex flex-col overflow-hidden group cursor-pointer"
                      onClick={() => router.push(`/notes/${note.id}`)}
                    >
                      <div
                        className={`h-0.5 ${
                          isBookmarksTab
                            ? 'bg-gradient-to-r from-[#1B3B6F] to-[#D4AD72]'
                            : 'bg-gradient-to-r from-rose-500 to-amber-400'
                        }`}
                      />

                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/notes/${note.id}`}
                            className="flex-1 min-w-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h2 className="font-semibold text-content-primary group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] transition-colors line-clamp-2 leading-snug">
                              {note.title}
                            </h2>
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isBookmarksTab) handleRemoveBookmark(note.id);
                              else handleUnlike(note.id);
                            }}
                            disabled={removingId === note.id}
                            className={`shrink-0 transition-colors mt-0.5 ${
                              isBookmarksTab
                                ? 'text-[#D4AD72] hover:text-content-muted'
                                : 'text-rose-500 hover:text-content-muted'
                            }`}
                            title={isBookmarksTab ? '取消收藏' : '取消点赞'}
                          >
                            {removingId === note.id ? (
                              <div className="w-4 h-4 border-2 border-line-strong border-t-transparent rounded-full animate-spin" />
                            ) : isBookmarksTab ? (
                              <Star className="w-4 h-4 fill-current" />
                            ) : (
                              <Heart className="w-4 h-4 fill-current" />
                            )}
                          </button>
                        </div>

                        <p className="text-sm text-content-secondary mt-2 line-clamp-3 leading-relaxed flex-1">
                          {preview || '暂无内容预览'}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {note.category && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryClass(note.category)}`}>
                              {note.category}
                            </span>
                          )}
                          {note.technology && note.technology !== note.category && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryClass(note.technology)}`}>
                              {note.technology}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-line-subtle flex items-center justify-between text-xs text-content-muted">
                          <div className="flex items-center gap-3 font-code tabular-nums">
                            <span className="inline-flex items-center gap-1">
                              <Heart className="w-3.5 h-3.5 text-rose-500/80" /> {note.likeCount || 0}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MessageSquare className="w-3.5 h-3.5" /> {note.commentCount || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center text-[11px] font-bold">
                              {note.authorName?.trim()
                                ? note.authorName.trim()[0].toUpperCase()
                                : <User className="w-3 h-3" />}
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
          </>
        )}
      </div>
      <SiteFooter className="mt-auto" />
    </div>
  );
}
