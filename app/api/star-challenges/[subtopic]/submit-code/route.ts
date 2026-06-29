import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { subtopic: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const subtopicName = decodeURIComponent(params.subtopic);
    const body = await request.json();

    let challengeId = body.challengeId ? parseInt(body.challengeId) : null;

    if (!challengeId) {
      // 降级：如果前端没传 challengeId，默认取当前小节第一关的 ID
      const challenges = await executeQuery(
        `SELECT id FROM star_challenges WHERE subtopic_name = ? AND status = 'published' ORDER BY level_index ASC`,
        [subtopicName]
      ) as any[];

      if (!Array.isArray(challenges) || challenges.length === 0) {
        return NextResponse.json({ error: '未找到该子话题挑战' }, { status: 404 });
      }
      challengeId = challenges[0].id;
    }

    const passed = body.passed ? 1 : 0;

    // 2. 插入或更新代码通关状态
    await executeQuery(
      `INSERT INTO star_challenge_records (user_id, challenge_id, code_passed)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE code_passed = ?`,
      [userId, challengeId, passed, passed]
    );

    return NextResponse.json({
      success: true,
      message: passed ? '代码测试已通过！记录已保存。' : '测试未通过，请继续优化代码！'
    });
  } catch (error) {
    console.error('提交代码状态失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
