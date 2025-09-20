export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { executeQuery } from '@/lib/database';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    // 获取用户的成就数据
    const achievements = await executeQuery(`
      SELECT 
        a.id,
        a.name,
        a.description,
        a.icon,
        a.category,
        a.max_progress,
        ua.unlocked,
        ua.unlocked_at,
        ua.progress
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
      ORDER BY a.category, a.sort_order
    `, [session.user.id]);

    // 检查并更新成就进度
    await updateAchievementProgress(session.user.id);

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('获取成就失败:', error);
    return NextResponse.json({ error: '获取成就失败' }, { status: 500 });
  }
}

// 更新成就进度的辅助函数
async function updateAchievementProgress(userId: string) {
  // 更新笔记相关成就
  const noteCount = await executeQuery(
    'SELECT COUNT(*) as count FROM notes WHERE author_id = ?',
    [userId]
  ) as any[];
  
  // 更新"初出茅庐"成就（第一篇笔记）
  if (noteCount[0].count >= 1) {
    await executeQuery(`
      INSERT INTO user_achievements (user_id, achievement_id, unlocked, unlocked_at, progress)
      VALUES (?, 'first_note', true, NOW(), 1)
      ON DUPLICATE KEY UPDATE 
        unlocked = true, 
        unlocked_at = IFNULL(unlocked_at, NOW()),
        progress = 1
    `, [userId]);
  }

  // 更新其他成就...
} 