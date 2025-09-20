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
      
      // 直接查询学习统计表 learning_stats (使用正确的字段名和聚合函数)
      const result = await executeQuery(
        `SELECT 
          DATE(created_at) as date,
          COUNT(*) as count,
          SUM(points) as points
        FROM learning_stats 
        WHERE user_id = ? 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 180 DAY)
        GROUP BY DATE(created_at)
        ORDER BY date DESC`,
        [userId]
      );
      
      // 如果有实际数据，转换为热力图格式
      if (Array.isArray(result) && result.length > 0) {
        result.forEach((row: any) => {
          if (row && row.date) {
            // 根据积分计算level (0-4)
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            const count = row.count || 0;
            const points = row.points || 0;
            
            // 根据points值确定level
            if (points > 0) {
              if (points <= 3) level = 1;       // 3分以下
              else if (points <= 10) level = 2;  // 10分以下
              else if (points <= 20) level = 3; // 20分以下
              else level = 4;                   // 20分以上
            }
            
            heatmapData.push({
              date: row.date,
              count: count,
              level: level
            });
          }
        });
      }
      
      // 如果没有数据，返回空数组
      console.log(`获取到 ${heatmapData.length} 条热力图数据`);
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