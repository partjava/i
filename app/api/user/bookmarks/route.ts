export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const userId = parseInt(session.user.id, 10);

    const result = await executeQuery(
      `SELECT n.id, n.title, n.content, n.category, n.technology, n.is_public,
              n.created_at, n.updated_at, u.name as author_name,
              nb.created_at as bookmarked_at,
              (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) as like_count,
              (SELECT COUNT(*) FROM comments WHERE note_id = n.id) as comment_count
       FROM note_bookmarks nb
       JOIN notes n ON nb.note_id = n.id
       JOIN users u ON n.author_id = u.id
       WHERE nb.user_id = ?
       ORDER BY nb.created_at DESC`,
      [userId]
    ) as any[];

    const notes = result.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content?.substring(0, 150) + (row.content?.length > 150 ? '...' : ''),
      category: row.category,
      technology: row.technology,
      isPublic: Boolean(row.is_public),
      authorName: row.author_name,
      createdAt: row.created_at,
      bookmarkedAt: row.bookmarked_at,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
    }));

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
