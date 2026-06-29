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
    let challenge = null;

    if (challengeId) {
      const challenges = await executeQuery(
        `SELECT id, thinking_question, ai_prompt FROM star_challenges WHERE id = ?`,
        [challengeId]
      ) as any[];
      if (Array.isArray(challenges) && challenges.length > 0) {
        challenge = challenges[0];
      }
    }

    if (!challenge) {
      const challenges = await executeQuery(
        `SELECT id, thinking_question, ai_prompt FROM star_challenges WHERE subtopic_name = ? AND status = 'published' ORDER BY level_index ASC`,
        [subtopicName]
      ) as any[];

      if (!Array.isArray(challenges) || challenges.length === 0) {
        return NextResponse.json({ error: '未找到该子话题挑战' }, { status: 404 });
      }
      challenge = challenges[0];
      challengeId = challenge.id;
    }

    const answer = body.answer || '';

    if (!answer.trim()) {
      return NextResponse.json({ error: '回答内容不能为空' }, { status: 400 });
    }

    // 2. 模拟 AI 智能阅卷评分 (基于关键字与语义拟合度打分)
    const normalizedAnswer = answer.toLowerCase();
    let score = 7.0; // 基础分
    let feedback = '';

    if (subtopicName === '支持向量机 (SVM)') {
      const match1 = normalizedAnswer.includes('支持向量') || normalizedAnswer.includes('support vector');
      const match2 = normalizedAnswer.includes('间隔最大') || normalizedAnswer.includes('margin');
      const match3 = normalizedAnswer.includes('正则') || normalizedAnswer.includes('||w||');
      
      let matchedCount = 0;
      if (match1) matchedCount++;
      if (match2) matchedCount++;
      if (match3) matchedCount++;

      score = 6.5 + matchedCount * 1.0;
      if (score > 9.5) score = 9.5;

      feedback = `### 🌟 AI 助教综合评分: ${score} 分\n\n**优点：**\n你较好地分析了支持向量机在高维空间中的优势。${match1 ? '你准确抓住了“支持向量个数决定复杂度”这一核心机制，' : ''}${match2 ? '并且明确指出了“最大化间隔”在防过拟合中的决定性作用。' : ''}\n\n**改进建议：**\n${!match3 ? '建议在回答中补充引入 L2 正则化项（如 1/2||w||^2）对模型复杂度的数学约束作用，这会让你的分析更有学术说服力。' : '你的回答很全面，公式阐述也非常准确！'}`;
    } else if (subtopicName === '操作系统') {
      const match1 = normalizedAnswer.includes('隔离') || normalizedAnswer.includes('安全') || normalizedAnswer.includes('独立');
      const match2 = normalizedAnswer.includes('页表') || normalizedAnswer.includes('mmu') || normalizedAnswer.includes('映射');
      const match3 = normalizedAnswer.includes('页面置换') || normalizedAnswer.includes('lru') || normalizedAnswer.includes('置换') || normalizedAnswer.includes('swap');

      let matchedCount = 0;
      if (match1) matchedCount++;
      if (match2) matchedCount++;
      if (match3) matchedCount++;

      score = 6.5 + matchedCount * 1.0;
      if (score > 9.5) score = 9.5;

      feedback = `### 🌟 AI 助教综合评分: ${score} 分\n\n**优点：**\n对于虚拟内存的核心价值进行了不错的阐述。${match1 ? '提到了进程间地址隔离与内存保护的安全优势，' : ''}${match3 ? '并且指出了当物理内存不足时通过页面调度机制与外存交换空间的手段。' : ''}\n\n**改进建议：**\n${!match2 ? '建议补充说明硬件层（MMU 页表映射机制）在虚拟地址到物理地址转化中起到的硬件加速桥梁作用。' : '整体思路十分清晰，软硬件结合得当。'}`;
    } else {
      // 默认通用评分逻辑
      const wordCount = answer.length;
      if (wordCount > 100) score = 8.5;
      else if (wordCount > 50) score = 8.0;
      else score = 7.5;

      feedback = `### 🌟 AI 助教综合评分: ${score} 分\n\n**优点：**\n阐述有条理，紧扣题意。较好地论述了该技术方向的优势与折中取舍。\n\n**改进建议：**\n若能结合生产环境的具体工程案例进行佐证，分析会更具深度。`;
    }

    // 3. 写入/更新答题成绩与 AI 评语
    await executeQuery(
      `INSERT INTO star_challenge_records (user_id, challenge_id, thinking_score, thinking_feedback)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE thinking_score = ?, thinking_feedback = ?`,
      [userId, challengeId, Math.round(score), feedback, Math.round(score), feedback]
    );

    return NextResponse.json({
      success: true,
      score: Math.round(score),
      feedback
    });
  } catch (error) {
    console.error('提交思考题答案失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
