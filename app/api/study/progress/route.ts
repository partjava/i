export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

// 获取用户所有学习进度
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const rows = await executeQuery(
      'SELECT page_path, completed FROM study_progress WHERE user_id = ?',
      [session.user.id]
    ) as any[];

    const progress: Record<string, boolean> = {};
    rows.forEach((r: any) => { progress[r.page_path] = r.completed === 1; });

    return NextResponse.json({ progress });
  } catch {
    return NextResponse.json({ error: '获取进度失败' }, { status: 500 });
  }
}

// 标记/取消标记完成
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { pagePath, completed } = await request.json();
    if (!pagePath || typeof completed !== 'boolean') {
      return NextResponse.json({ error: '参数无效' }, { status: 400 });
    }

    if (completed) {
      await executeQuery(
        `INSERT INTO study_progress (user_id, page_path, completed, completed_at)
         VALUES (?, ?, 1, NOW())
         ON DUPLICATE KEY UPDATE completed = 1, completed_at = NOW()`,
        [session.user.id, pagePath]
      );
    } else {
      await executeQuery(
        `INSERT INTO study_progress (user_id, page_path, completed, completed_at)
         VALUES (?, ?, 0, NULL)
         ON DUPLICATE KEY UPDATE completed = 0, completed_at = NULL`,
        [session.user.id, pagePath]
      );
    }

    // 获取当前分类进度返回
    const category = pagePath.split('/study/')[1]?.split('/')[0];
    let categoryStats = { total: 0, done: 0 };
    if (category) {
      const countResult = await executeQuery(
        `SELECT COUNT(*) as done FROM study_progress
         WHERE user_id = ? AND page_path LIKE ? AND completed = 1`,
        [session.user.id, `/study/${category}/%`]
      ) as any[];
      categoryStats.done = countResult[0]?.done || 0;
      // total 由客户端维护（页面不需要服务端算）
    }

    return NextResponse.json({ success: true, done: categoryStats.done });
  } catch {
    return NextResponse.json({ error: '保存进度失败' }, { status: 500 });
  }
}
