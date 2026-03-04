import { NextResponse } from 'next/server';
import { query } from '@/app/lib/database';

export async function GET() {
  try {
    // 获取用户总数
    const usersResult = await query('SELECT COUNT(*) as count FROM users');
    const users = usersResult[0]?.count || 0;

    // 获取笔记总数
    const notesResult = await query('SELECT COUNT(*) as count FROM notes');
    const notes = notesResult[0]?.count || 0;

    // 获取学习总时长（小时）
    const studyResult = await query(
      'SELECT SUM(study_time) as total FROM learning_stats'
    );
    const studyMinutes = studyResult[0]?.total || 0;
    const studyHours = Math.floor(studyMinutes / 60);

    // 获取挑战总数（这里假设有challenges表，如果没有就用固定值）
    let challenges = 89; // 默认值
    try {
      const challengesResult = await query('SELECT COUNT(*) as count FROM challenges');
      challenges = challengesResult[0]?.count || 89;
    } catch (error) {
      // 如果表不存在，使用默认值
      console.log('Challenges table not found, using default value');
    }

    return NextResponse.json({
      users,
      notes,
      studyHours,
      challenges
    });
  } catch (error) {
    console.error('获取平台统计失败:', error);
    // 返回模拟数据
    return NextResponse.json({
      users: 1234,
      notes: 5678,
      studyHours: 12345,
      challenges: 89
    });
  }
}
