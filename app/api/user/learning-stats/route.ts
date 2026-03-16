export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 从数据库获取真实的热力图数据
    const heatmapData: Array<{date: string, count: number, level: 0 | 1 | 2 | 3 | 4}> = [];
    
    try {
      // 导入数据库操作函数
      const { executeQuery } = await import('@/app/lib/database');
      
      // 获取用户ID
      const userId = session.user.id;
      
      // 合并查询：笔记创建记录 + 学习会话记录
      const notesResult = await executeQuery(
        `SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM notes 
        WHERE author_id = ? 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 365 DAY)
        GROUP BY DATE(created_at)`,
        [userId]
      );

      // 尝试查询 study_sessions（表可能不存在，忽略错误）
      let sessionsResult: any[] = [];
      try {
        sessionsResult = await executeQuery(
          `SELECT 
            DATE(created_at) as date,
            COUNT(*) as count
          FROM study_sessions 
          WHERE user_id = ? 
          AND created_at >= DATE_SUB(NOW(), INTERVAL 365 DAY)
          GROUP BY DATE(created_at)`,
          [userId]
        ) as any[];
      } catch (_) {}

      // 合并两个来源的数据（按日期累加）
      const mergedMap = new Map<string, number>();
      for (const row of (notesResult as any[])) {
        if (row?.date) {
          const d = new Date(row.date).toISOString().split('T')[0];
          mergedMap.set(d, (mergedMap.get(d) || 0) + (row.count || 0));
        }
      }
      for (const row of sessionsResult) {
        if (row?.date) {
          const d = new Date(row.date).toISOString().split('T')[0];
          mergedMap.set(d, (mergedMap.get(d) || 0) + (row.count || 0));
        }
      }

      if (mergedMap.size > 0) {
        mergedMap.forEach((count, date) => {
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count >= 10) level = 4;
          else if (count >= 6) level = 3;
          else if (count >= 3) level = 2;
          else if (count >= 1) level = 1;

          heatmapData.push({ date, count, level });
        });
        console.log(`生成了 ${heatmapData.length} 条热力图数据`);
      } else {
        console.log('没有找到学习记录');
      }
    } catch (dbError) {
      console.error('数据库查询失败:', dbError);
      // 如果查询失败，返回空数组
    }
    
    return NextResponse.json({ heatmapData });
  } catch (error) {
    console.error('获取学习统计数据失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}