export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { challenges } from '@/app/data/challenges';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredChallenges = challenges;

    // 按难度筛选
    if (difficulty && difficulty !== 'all') {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.difficulty === difficulty
      );
    }

    // 按分类筛选
    if (category && category !== 'all') {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.category === category
      );
    }

    // 分页
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedChallenges = filteredChallenges.slice(startIndex, endIndex);

    // 移除解答（用户不应该看到解答）
    const challengesWithoutSolutions = paginatedChallenges.map(challenge => {
      const { solution, ...challengeWithoutSolution } = challenge;
      return challengeWithoutSolution;
    });

    return NextResponse.json({
      success: true,
      data: {
        challenges: challengesWithoutSolutions,
        pagination: {
          page,
          limit,
          total: filteredChallenges.length,
          totalPages: Math.ceil(filteredChallenges.length / limit)
        }
      }
    });
  } catch (error) {
    console.error('获取挑战列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取挑战列表失败' },
      { status: 500 }
    );
  }
}