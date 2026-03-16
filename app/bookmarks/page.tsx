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

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<BookmarkedNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/user/bookmarks', { credentials: 'include' })
        .then(r => r.json())
        .then(data => setNotes(data.notes || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleRemoveBookmark = async (noteId: number) => {
    try {
      const res = await fetch(`/api/notes/${noteId}/bookmark`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setNotes(prev => prev.filter(n => n.id !== noteId));
      }
    } catch (error) {
      console.error('取消收藏失败:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的收藏</h1>
          <p className="text-sm text-gray-500 mt-1">共 {notes.length} 篇笔记</p>
        </div>
        <Link href="/notes" className="text-blue-600 hover:text-blue-800 text-sm">
          浏览笔记
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p className="text-lg">还没有收藏任何笔记</p>
          <Link href="/notes" className="mt-4 inline-block text-blue-600 hover:underline">去发现好笔记</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link href={`/notes/${note.id}`} className="block">
                    <h2 className="text-base font-semibold text-gray-900 hover:text-blue-600 truncate">
                      {note.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.content}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {note.category && (
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{note.category}</span>
                    )}
                    {note.technology && (
                      <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">{note.technology}</span>
                    )}
                    <span className="text-xs text-gray-400">by {note.authorName}</span>
                    <span className="text-xs text-gray-400">
                      收藏于 {new Date(note.bookmarkedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>❤️ {note.likeCount}</span>
                    <span>💬 {note.commentCount}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveBookmark(note.id)}
                  className="shrink-0 text-yellow-500 hover:text-gray-400 transition-colors"
                  title="取消收藏"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
