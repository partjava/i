export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { challenges } from '@/app/data/challenges';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const challengeId = params.id;
    const challenge = challenges.find(c => c.id === challengeId);

    if (!challenge) {
      return NextResponse.json(
        { success: false, error: '挑战不存在' },
        { status: 404 }
      );
    }

    // 移除解答（用户不应该看到解答）
    const { solution, ...challengeWithoutSolution } = challenge;

    return NextResponse.json({
      success: true,
      data: challengeWithoutSolution
    });
  } catch (error) {
    console.error('获取挑战详情失败:', error);
    return NextResponse.json(
      { success: false, error: '获取挑战详情失败' },
      { status: 500 }
    );
  }
} 