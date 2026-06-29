import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { subtopic: string } }
) {
  try {
    const subtopicName = decodeURIComponent(params.subtopic);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    // 1. 查询该子话题的所有关卡列表，按 level_index 升序排列
    const challenges = await executeQuery(
      `SELECT id, stage_id, subtopic_name, theory_content, latex_formulas, starter_code, solution_code, expected_output, thinking_question, ai_prompt, author_id, level_index, level_title
       FROM star_challenges 
       WHERE subtopic_name = ? AND status = 'published'
       ORDER BY level_index ASC`,
      [subtopicName]
    ) as any[];

    if (!Array.isArray(challenges) || challenges.length === 0) {
      return NextResponse.json({ error: '未找到该子话题挑战' }, { status: 404 });
    }

    const levels = [];

    for (const challenge of challenges) {
      // 2. 查询选择题列表
      const quizzesResult = await executeQuery(
        `SELECT id, question_text, options, correct_index, explanation 
         FROM star_challenge_quizzes 
         WHERE challenge_id = ? 
         ORDER BY id ASC`,
        [challenge.id]
      ) as any[];

      const conceptualQuizzes = Array.isArray(quizzesResult) ? quizzesResult.map(q => ({
        id: q.id,
        question: q.question_text,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
        answer: q.correct_index,
        explanation: q.explanation
      })) : [];

      // 3. 查询当前用户的作答记录
      let userRecord = null;
      if (userId) {
        const records = await executeQuery(
          `SELECT code_passed, quiz_answers, thinking_score, thinking_feedback 
           FROM star_challenge_records 
           WHERE user_id = ? AND challenge_id = ?`,
           [userId, challenge.id]
        ) as any[];

        if (Array.isArray(records) && records.length > 0) {
          const r = records[0];
          userRecord = {
            codePassed: r.code_passed === 1,
            quizAnswers: r.quiz_answers ? (typeof r.quiz_answers === 'string' ? JSON.parse(r.quiz_answers) : r.quiz_answers) : null,
            thinkingScore: r.thinking_score,
            thinkingFeedback: r.thinking_feedback
          };
        }
      }

      // 4. 组装单关卡数据结构
      levels.push({
        id: challenge.id.toString(),
        name: challenge.subtopic_name,
        stageId: challenge.stage_id,
        theory: challenge.theory_content,
        latexFormulas: typeof challenge.latex_formulas === 'string' ? JSON.parse(challenge.latex_formulas) : (challenge.latex_formulas || []),
        starterCode: challenge.starter_code,
        solutionCode: challenge.solution_code,
        expectedOutput: challenge.expected_output,
        thinkingQuestion: challenge.thinking_question,
        aiPrompt: challenge.ai_prompt,
        authorId: challenge.author_id,
        isOfficial: challenge.author_id === null,
        levelIndex: challenge.level_index,
        levelTitle: challenge.level_title,
        conceptualQuizzes,
        userRecord
      });
    }

    return NextResponse.json({
      success: true,
      detail: levels[0] || null,
      levels
    });
  } catch (error) {
    console.error('获取子话题挑战详情失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器错误' },
      { status: 500 }
    );
  }
}
