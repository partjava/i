'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import CommentSection from '@/app/components/CommentSection';
import 'highlight.js/styles/github.css';

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  author_name?: string;
  author_id?: number;
  liked?: boolean;
  bookmarked?: boolean;
  likeCount?: number;
  bookmarkCount?: number;
}

export default function NoteDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const noteId = params.id as string;
  
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // 获取笔记详情
  const fetchNote = async () => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setNote(data.note);
        setLiked(data.note.liked || false);
        setBookmarked(data.note.bookmarked || false);
        setLikeCount(data.note.likeCount || 0);
        setBookmarkCount(data.note.bookmarkCount || 0);
      } else if (response.status === 404) {
        router.push('/notes');
      }
    } catch (error) {
      console.error('获取笔记失败:', error);
      router.push('/notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  // 检查登录状态
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // 点赞功能
  const handleLike = async () => {
    if (!session) return;
    
    try {
      const response = await fetch(`/api/notes/${noteId}/like`, {
        method: liked ? 'DELETE' : 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setLiked(!liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('点赞操作失败:', error);
    }
  };

  // 收藏功能
  const handleBookmark = async () => {
    if (!session) return;
    
    try {
      const response = await fetch(`/api/notes/${noteId}/bookmark`, {
        method: bookmarked ? 'DELETE' : 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookmarked(!bookmarked);
        setBookmarkCount(data.bookmarkCount);
      }
    } catch (error) {
      console.error('收藏操作失败:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (!session || !note) {
    return null;
  }

  const isOwner = session.user?.id === note.author_id?.toString();

  return (
    <div className="flex min-h-screen">
      {/* 左侧导航栏 */}
      <div className="w-72 bg-gray-50 p-6 border-r">
        <div className="mt-12">
          <Link 
            href="/notes"
            className="text-blue-600 hover:text-blue-800 flex items-center mb-6 text-lg font-medium"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回笔记列表
          </Link>
        </div>
        
        {/* 操作按钮 */}
        {session && (
          <div className="space-y-3" style={{ marginTop: '30px', padding: '20px' }}>
            <button
              onClick={handleLike}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                liked 
                  ? 'bg-red-100 text-red-700 border border-red-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{liked ? '已点赞' : '点赞'}</span>
              {likeCount > 0 && <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{likeCount}</span>}
            </button>
            
            <button
              onClick={handleBookmark}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                bookmarked 
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>{bookmarked ? '已收藏' : '收藏'}</span>
              {bookmarkCount > 0 && <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">{bookmarkCount}</span>}
            </button>
          </div>
        )}
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 p-8">

      {/* 笔记内容 */}
      <article className="bg-white rounded-lg shadow-sm border p-8">
        {/* 标题和元信息 */}
        <header className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
            {isOwner && (
              <div className="flex space-x-2">
                <Link
                  href={`/notes/${noteId}/edit`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  编辑
                </Link>
              </div>
            )}
          </div>

          {/* 元信息 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {note.author_name && (
              <span>作者: {note.author_name}</span>
            )}
            <span>创建: {new Date(note.createdAt).toLocaleString()}</span>
            {note.updatedAt !== note.createdAt && (
              <span>更新: {new Date(note.updatedAt).toLocaleString()}</span>
            )}
          </div>

          {/* 标签和分类 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {note.category && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {note.category}
              </span>
            )}
            {note.technology && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {note.technology}
              </span>
            )}
            {note.subcategory && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {note.subcategory}
              </span>
            )}
            {note.isPublic && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                公开
              </span>
            )}
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>



        {/* 笔记内容 - Markdown渲染 */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className={className} {...props}>
                    <code className={className}>{children}</code>
                  </pre>
                ) : (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
                    {children}
                  </td>
                );
              },
            }}
          >
            {note.content}
          </ReactMarkdown>
        </div>
      </article>

        {/* 评论区域 */}
        {note.isPublic && (
          <CommentSection noteId={noteId} isPublic={note.isPublic} />
        )}
      </div>
    </div>
  );
}