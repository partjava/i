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
      
      // 查询学习会话表 study_sessions 获取热力图数据
      const result = await executeQuery(
        `SELECT 
          DATE(created_at) as date,
          COUNT(*) as count,
          SUM(study_time) as total_time
        FROM study_sessions 
        WHERE user_id = ? 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 365 DAY)
        GROUP BY DATE(created_at)
        ORDER BY date DESC`,
        [userId]
      );
      
      // 如果有实际数据，转换为热力图格式
      if (Array.isArray(result) && result.length > 0) {
        console.log(`找到 ${result.length} 条学习记录`);
        result.forEach((row: any) => {
          if (row && row.date) {
            // 根据学习时间计算level (0-4)
            let level: 0 | 1 | 2 | 3 | 4 = 0;
            const count = row.count || 0;
            const totalTime = row.total_time || 0; // 秒数
            
            // 根据学习时间（秒）确定level
            const seconds = totalTime || 0;
            if (seconds > 0 || count > 0) {
              const minutes = Math.floor(seconds / 60);
              if (minutes < 10) level = 1;        // 10分钟以下
              else if (minutes < 30) level = 2;   // 30分钟以下
              else if (minutes < 60) level = 3;   // 1小时以下
              else level = 4;                     // 1小时以上
            }
            
            heatmapData.push({
              date: new Date(row.date).toISOString().split('T')[0], // 确保格式为 YYYY-MM-DD
              count: count,
              level: level
            });
          }
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