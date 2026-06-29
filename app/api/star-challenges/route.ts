import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';
import { seedChallengesIfNeeded } from '@/app/lib/seedChallenges';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const reset = searchParams.get('reset');
    if (reset === 'true' && process.env.NODE_ENV === 'development') {
      console.log('🔄 重置并重新生成挑战数据库题库...');
      await executeQuery('DELETE FROM star_challenge_quizzes');
      await executeQuery('DELETE FROM star_challenges');
    }

    // 1. 自动执行数据库种子填充
    await seedChallengesIfNeeded();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    // 2. 查询全部已发布的关卡挑战题目
    const challenges = await executeQuery(
      `SELECT c.id, c.stage_id, c.subtopic_name, c.topic_name, c.level_index, c.level_title, c.author_id, c.status, c.created_at, u.name as author_name
       FROM star_challenges c
       LEFT JOIN users u ON c.author_id = u.id
       WHERE c.status = 'published'
       ORDER BY c.stage_id ASC, c.subtopic_name ASC, c.level_index ASC`
    ) as any[];

    // 3. 如果用户已登录，获取做题进度记录
    let recordsMap: Record<number, any> = {};
    if (userId) {
      const records = await executeQuery(
        `SELECT challenge_id, code_passed, quiz_answers, thinking_score, thinking_feedback 
         FROM star_challenge_records 
         WHERE user_id = ?`,
        [userId]
      ) as any[];

      if (Array.isArray(records)) {
        records.forEach(r => {
          recordsMap[r.challenge_id] = {
            codePassed: r.code_passed === 1,
            quizAnswers: r.quiz_answers ? (typeof r.quiz_answers === 'string' ? JSON.parse(r.quiz_answers) : r.quiz_answers) : null,
            thinkingScore: r.thinking_score,
            thinkingFeedback: r.thinking_feedback
          };
        });
      }
    }

    // 4. 获取每个挑战的选择题总数（用来计算完成度）
    const quizCounts = await executeQuery(
      `SELECT challenge_id, COUNT(*) as count 
       FROM star_challenge_quizzes 
       GROUP BY challenge_id`
    ) as any[];
    
    const quizCountMap: Record<number, number> = {};
    if (Array.isArray(quizCounts)) {
      quizCounts.forEach(q => {
        quizCountMap[q.challenge_id] = q.count;
      });
    }

    // 5. 组合组装响应数据
    const list = challenges.map(c => {
      const record = recordsMap[c.id] || null;
      const totalQuizzes = quizCountMap[c.id] || 0;
      
      // 计算选择题完成数
      let completedQuizzes = 0;
      if (record?.quizAnswers) {
        completedQuizzes = Object.keys(record.quizAnswers).length;
      }

      return {
        id: c.id,
        stageId: c.stage_id,
        subtopicName: c.subtopic_name,
        topicName: c.topic_name,
        levelIndex: c.level_index,
        levelTitle: c.level_title,
        authorId: c.author_id,
        authorName: c.author_name || null,
        isOfficial: c.author_id === null,
        record: record ? {
          codePassed: record.codePassed,
          completedQuizzes,
          totalQuizzes,
          thinkingScore: record.thinkingScore,
          thinkingFeedback: record.thinkingFeedback,
          isPassed: record.codePassed && (totalQuizzes === 0 || completedQuizzes >= totalQuizzes)
        } : {
          codePassed: false,
          completedQuizzes: 0,
          totalQuizzes,
          thinkingScore: 0,
          thinkingFeedback: null,
          isPassed: false
        }
      };
    });

    return NextResponse.json({
      success: true,
      challenges: list
    });
  } catch (error) {
    console.error('获取关卡列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取关卡列表失败' },
      { status: 500 }
    );
  }
}
