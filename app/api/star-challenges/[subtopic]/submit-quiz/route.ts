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
      const challenges = await executeQuery(
        `SELECT id FROM star_challenges WHERE subtopic_name = ? AND status = 'published' ORDER BY level_index ASC`,
        [subtopicName]
      ) as any[];

      if (!Array.isArray(challenges) || challenges.length === 0) {
        return NextResponse.json({ error: '未找到该子话题挑战' }, { status: 404 });
      }
      challengeId = challenges[0].id;
    }

    const quizAnswers = body.answers; // Expect object like {"0": 1, "1": 2}
    const answersJson = JSON.stringify(quizAnswers);

    // 2. 插入或更新选择题答题记录
    await executeQuery(
      `INSERT INTO star_challenge_records (user_id, challenge_id, quiz_answers)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quiz_answers = ?`,
      [userId, challengeId, answersJson, answersJson]
    );

    return NextResponse.json({
      success: true,
      message: '答题进度已保存！'
    });
  } catch (error) {
    console.error('提交选择题答案失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
