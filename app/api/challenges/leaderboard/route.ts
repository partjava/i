export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';

// 模拟排行榜数据（实际应用中应该从数据库获取）
const mockLeaderboard = [
  {
    id: '1',
    username: 'CodeMaster',
    email: 'codemaster@example.com',
    totalScore: 285,
    solvedChallenges: 23,
    rank: 1,
    avatar: '/avatars/default-1.png',
    lastActive: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    username: 'AlgorithmAce',
    email: 'ace@example.com',
    totalScore: 267,
    solvedChallenges: 21,
    rank: 2,
    avatar: '/avatars/default-2.png',
    lastActive: '2024-01-15T09:45:00Z'
  },
  {
    id: '3',
    username: 'PythonPro',
    email: 'python@example.com',
    totalScore: 245,
    solvedChallenges: 19,
    rank: 3,
    avatar: '/avatars/default-3.png',
    lastActive: '2024-01-15T08:20:00Z'
  },
  {
    id: '4',
    username: 'JavaGuru',
    email: 'java@example.com',
    totalScore: 223,
    solvedChallenges: 18,
    rank: 4,
    avatar: '/avatars/default-4.png',
    lastActive: '2024-01-14T16:15:00Z'
  },
  {
    id: '5',
    username: 'JSNinja',
    email: 'js@example.com',
    totalScore: 201,
    solvedChallenges: 16,
    rank: 5,
    avatar: '/avatars/default-5.png',
    lastActive: '2024-01-14T14:30:00Z'
  },
  {
    id: '6',
    username: 'CppChampion',
    email: 'cpp@example.com',
    totalScore: 189,
    solvedChallenges: 15,
    rank: 6,
    avatar: '/avatars/default-6.png',
    lastActive: '2024-01-14T12:45:00Z'
  },
  {
    id: '7',
    username: 'DataStructureDev',
    email: 'ds@example.com',
    totalScore: 167,
    solvedChallenges: 14,
    rank: 7,
    avatar: '/avatars/default-7.png',
    lastActive: '2024-01-14T11:20:00Z'
  },
  {
    id: '8',
    username: 'RecursiveRider',
    email: 'recursive@example.com',
    totalScore: 145,
    solvedChallenges: 12,
    rank: 8,
    avatar: '/avatars/default-8.png',
    lastActive: '2024-01-13T18:30:00Z'
  },
  {
    id: '9',
    username: 'SortingSorcerer',
    email: 'sort@example.com',
    totalScore: 123,
    solvedChallenges: 10,
    rank: 9,
    avatar: '/avatars/default-9.png',
    lastActive: '2024-01-13T15:15:00Z'
  },
  {
    id: '10',
    username: 'GraphGuru',
    email: 'graph@example.com',
    totalScore: 101,
    solvedChallenges: 8,
    rank: 10,
    avatar: '/avatars/default-10.png',
    lastActive: '2024-01-13T13:45:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const timeRange = searchParams.get('timeRange') || 'all'; // all, week, month

    // 根据时间范围过滤（这里简化处理）
    const filteredLeaderboard = mockLeaderboard;

    // 分页
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLeaderboard = filteredLeaderboard.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: {
        leaderboard: paginatedLeaderboard,
        pagination: {
          page,
          limit,
          total: filteredLeaderboard.length,
          totalPages: Math.ceil(filteredLeaderboard.length / limit)
        },
        stats: {
          totalUsers: filteredLeaderboard.length,
          averageScore: Math.round(filteredLeaderboard.reduce((sum, user) => sum + user.totalScore, 0) / filteredLeaderboard.length),
          totalChallengesSolved: filteredLeaderboard.reduce((sum, user) => sum + user.solvedChallenges, 0)
        }
      }
    });
  } catch (error) {
    console.error('获取排行榜失败:', error);
    return NextResponse.json(
      { success: false, error: '获取排行榜失败' },
      { status: 500 }
    );
  }
}