'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Comment {
  id: number;
  content: string;
  author_name: string;
  author_id: number;
  created_at: string;
  parent_id?: number;
  replies: Comment[];
  liked?: boolean;
  likeCount?: number;
}

interface CommentSectionProps {
  noteId: string;
  isPublic?: boolean;
}

export default function CommentSection({ noteId, isPublic = false }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLikes, setCommentLikes] = useState<{[key: number]: {liked: boolean, count: number}}>({});

  // 获取评论
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?noteId=${noteId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('获取评论失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [noteId]);

  // 发布评论
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId: parseInt(noteId),
          content: newComment,
        }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments(); // 重新获取评论
      }
    } catch (error) {
      console.error('发布评论失败:', error);
    }
  };

  // 回复评论
  const handleSubmitReply = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!session || !replyContent.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId: parseInt(noteId),
          content: replyContent,
          parentId,
        }),
      });

      if (response.ok) {
        setReplyContent('');
        setReplyTo(null);
        fetchComments(); // 重新获取评论
      }
    } catch (error) {
      console.error('回复评论失败:', error);
    }
  };

  // 点赞评论
  const handleCommentLike = async (commentId: number) => {
    if (!session) return;

    const isLiked = commentLikes[commentId]?.liked || false;
    
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: {
            liked: !isLiked,
            count: data.likeCount
          }
        }));
      }
    } catch (error) {
      console.error('评论点赞操作失败:', error);
    }
  };

  // 渲染单个评论
  const renderComment = (comment: Comment, level = 0) => (
    <div key={comment.id} className={`${level > 0 ? 'ml-8 mt-4' : 'mt-6'}`}>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{comment.author_name}</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{comment.content}</p>
        
        {session && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleCommentLike(comment.id)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                commentLikes[comment.id]?.liked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <svg className="w-4 h-4" fill={commentLikes[comment.id]?.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{commentLikes[comment.id]?.liked ? '已赞' : '点赞'}</span>
              {(commentLikes[comment.id]?.count || 0) > 0 && (
                <span className="bg-gray-200 px-1 py-0.5 rounded text-xs">
                  {commentLikes[comment.id]?.count}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {replyTo === comment.id ? '取消回复' : '回复'}
            </button>
          </div>
        )}

        {/* 回复表单 */}
        {replyTo === comment.id && (
          <form 
            onSubmit={(e) => handleSubmitReply(e, comment.id)}
            className="mt-3 p-3 bg-white rounded border"
          >
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder={`回复 ${comment.author_name}...`}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                回复
              </button>
            </div>
          </form>
        )}

        {/* 递归渲染回复 */}
        {comment.replies.map(reply => renderComment(reply, level + 1))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">加载评论中...</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">
        评论 ({comments.length})
      </h3>

      {/* 发表评论表单 */}
      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="写下你的评论..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发布评论
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600">请登录后发表评论</p>
        </div>
      )}

      {/* 评论列表 */}
      <div className="space-y-1">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            还没有评论，来发表第一个评论吧！
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}
