import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // 1. 查询当前用户的角色与 VIP 状态
    const userRows = await executeQuery(
      'SELECT role, vip_level FROM users WHERE id = ?',
      [userId]
    ) as any[];

    if (!Array.isArray(userRows) || userRows.length === 0) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    const user = userRows[0];
    const isVipEligible = user.vip_level >= 2 || user.role === 'ADMIN';

    if (!isVipEligible) {
      return NextResponse.json(
        { error: '自主出题功能仅限进阶 VIP 会员及以上专属，请先升级会员等级！' },
        { status: 403 }
      );
    }

    // 2. 读取题目数据
    const body = await request.json();
    const {
      stageId,
      subtopicName,
      theoryContent,
      latexFormulas = [],
      starterCode = '',
      expectedOutput = '',
      thinkingQuestion = '',
      aiPrompt = '',
      quizzes = []
    } = body;

    if (!stageId || !subtopicName || !theoryContent) {
      return NextResponse.json({ error: '阶段ID、子话题名称和理论讲解内容不能为空' }, { status: 400 });
    }

    // 3. 排重校验（防止同一关卡下同名话题冲突）
    const duplicate = await executeQuery(
      'SELECT id FROM star_challenges WHERE stage_id = ? AND subtopic_name = ?',
      [stageId, subtopicName]
    ) as any[];

    if (Array.isArray(duplicate) && duplicate.length > 0) {
      return NextResponse.json({ error: '该关卡下已存在同名子话题，请换一个名称！' }, { status: 400 });
    }

    // 4. 插入挑战主记录（状态默认设为 draft，需管理员审核）
    const status = user.role === 'ADMIN' ? 'published' : 'draft';

    const result = await executeQuery(
      `INSERT INTO star_challenges 
       (stage_id, subtopic_name, theory_content, latex_formulas, starter_code, expected_output, thinking_question, ai_prompt, author_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        stageId,
        subtopicName,
        theoryContent,
        JSON.stringify(latexFormulas),
        starterCode,
        expectedOutput,
        thinkingQuestion,
        aiPrompt,
        userId,
        status
      ]
    ) as { insertId: number };

    const challengeId = result.insertId;

    // 5. 插入关联选择题
    if (Array.isArray(quizzes)) {
      for (const q of quizzes) {
        await executeQuery(
          `INSERT INTO star_challenge_quizzes 
           (challenge_id, question_text, options, correct_index, explanation)
           VALUES (?, ?, ?, ?, ?)`,
          [
            challengeId,
            q.question,
            JSON.stringify(q.options),
            q.answer,
            q.explanation
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: status === 'published' 
        ? '出题成功！官方题目已实时发布上线。'
        : '出题成功！您的题目已提交，请等待管理员审核通过后上线。',
      challengeId
    });
  } catch (error) {
    console.error('出题失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
