export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未授权' },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

    // 获取用户信息
    const userInfo = await executeQuery(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [userId]
    ) as any[];

    // 获取用户笔记
    const notes = await executeQuery(
      'SELECT id, title, content, category, technology, is_public, created_at, updated_at FROM notes WHERE author_id = ?',
      [userId]
    ) as any[];

    // 获取学习统计
    const learningStats = await executeQuery(
      'SELECT * FROM learning_stats WHERE user_id = ?',
      [userId]
    ) as any[];

    // 获取学习会话
    const studySessions = await executeQuery(
      'SELECT * FROM study_sessions WHERE user_id = ? ORDER BY session_date DESC LIMIT 100',
      [userId]
    ) as any[];

    // 获取用户资料
    const profile = await executeQuery(
      'SELECT * FROM user_profiles WHERE user_id = ?',
      [userId]
    ) as any[];

    // 组装导出数据
    const exportData = {
      exportDate: new Date().toISOString(),
      user: userInfo[0] || {},
      profile: profile[0] || {},
      notes: notes || [],
      learningStats: learningStats || [],
      studySessions: studySessions || [],
      summary: {
        totalNotes: notes.length,
        publicNotes: notes.filter((n: any) => n.is_public).length,
        privateNotes: notes.filter((n: any) => !n.is_public).length,
        totalStudySessions: studySessions.length,
      }
    };

    // 返回JSON文件
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="partjava-data-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });

  } catch (error) {
    console.error('导出数据失败:', error);
    return NextResponse.json(
      { error: '导出数据失败' },
      { status: 500 }
    );
  }
}
