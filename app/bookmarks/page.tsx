'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

// 去掉 Markdown 符号，只保留纯文本
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '[代码]')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\n+/g, ' ')
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<BookmarkedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status === 'authenticated') {
      fetch('/api/user/bookmarks', { credentials: 'include' })
        .then(r => r.json())
        .then(data => setNotes(data.notes || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status, router]);

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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部 Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <span>⭐</span> 我的收藏
              </h1>
              <p className="mt-2 text-blue-100 text-sm">
                已收藏 <span className="font-semibold text-white">{notes.length}</span> 篇笔记
              </p>
            </div>
            <Link
              href="/notes"
              className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
            >
              浏览更多笔记 →
            </Link>
          </div>
          {/* 搜索框 */}
          <div className="mt-6 relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜索收藏..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/20 placeholder-blue-200 text-white rounded-lg border border-white/30 focus:outline-none focus:bg-white/30 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {notes.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-500 font-medium">还没有收藏任何笔记</p>
            <p className="text-gray-400 text-sm mt-2">去发现感兴趣的内容，点击星标即可收藏</p>
            <Link href="/notes" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              去浏览笔记
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>没有找到匹配的收藏</p>
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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* 卡片顶部色条 */}
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-400" />

                  <div className="p-5 flex flex-col flex-1">
                    {/* 标题行 */}
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/notes/${note.id}`} className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {note.title}
                        </h2>
                      </Link>
                      <button
                        onClick={() => handleRemoveBookmark(note.id)}
                        disabled={removingId === note.id}
                        className="shrink-0 text-yellow-400 hover:text-gray-300 transition-colors mt-0.5"
                        title="取消收藏"
                      >
                        {removingId === note.id
                          ? <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                          : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        }
                      </button>
                    </div>

                    {/* 内容预览 */}
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-relaxed flex-1">
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

                    {/* 底部信息 */}
                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span>❤️</span> {note.likeCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>💬</span> {note.commentCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                          {note.authorName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span>{note.authorName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
