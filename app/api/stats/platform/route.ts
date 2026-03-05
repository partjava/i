import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/database';

// 标记为动态路由，避免构建时预渲染
export const dynamic = 'force-dynamic';
// 设置缓存：5分钟内复用数据
export const revalidate = 300; // 5分钟

export async function GET() {
  try {
    console.log('开始获取平台统计数据...');
    
    // 获取用户总数
    let totalUsers = 0;
    try {
      const usersResult: any = await executeQuery('SELECT COUNT(*) as count FROM users');
      totalUsers = usersResult[0]?.count || 0;
    } catch (error) {
      console.log('Users table query failed');
    }

    // 获取笔记统计
    let totalNotes = 0;
    let publicNotes = 0;
    let privateNotes = 0;
    let firstNoteDate = '';
    let lastActivityDate = '';
    
    try {
      const notesResult: any = await executeQuery('SELECT COUNT(*) as count FROM notes');
      totalNotes = notesResult[0]?.count || 0;
      
      const publicResult: any = await executeQuery('SELECT COUNT(*) as count FROM notes WHERE is_public = 1');
      publicNotes = publicResult[0]?.count || 0;
      privateNotes = totalNotes - publicNotes;
      
      const datesResult: any = await executeQuery(
        'SELECT MIN(created_at) as first_date, MAX(updated_at) as last_date FROM notes'
      );
      if (datesResult && datesResult[0]) {
        firstNoteDate = datesResult[0].first_date ? new Date(datesResult[0].first_date).toISOString() : '';
        lastActivityDate = datesResult[0].last_date ? new Date(datesResult[0].last_date).toISOString() : '';
      }
    } catch (error) {
      console.log('Notes table query failed');
    }

    // 获取互动统计
    let totalLikes = 0;
    let totalBookmarks = 0;
    let totalComments = 0;
    
    try {
      const likesResult: any = await executeQuery('SELECT SUM(like_count) as total FROM notes');
      totalLikes = likesResult[0]?.total || 0;
      
      const bookmarksResult: any = await executeQuery('SELECT SUM(bookmark_count) as total FROM notes');
      totalBookmarks = bookmarksResult[0]?.total || 0;
      
      const commentsResult: any = await executeQuery('SELECT COUNT(*) as count FROM comments');
      totalComments = commentsResult[0]?.count || 0;
    } catch (error) {
      console.log('Engagement stats query failed');
    }

    // 获取学习统计
    let totalStudyTime = 0;
    let totalStudyDays = 0;
    let totalCategories = 0;
    let totalTechnologies = 0;
    
    try {
      // 尝试从study_sessions获取
      const studyResult: any = await executeQuery(
        'SELECT SUM(study_time) as total, COUNT(DISTINCT DATE(created_at)) as days FROM study_sessions'
      );
      totalStudyTime = studyResult[0]?.total || 0;
      totalStudyDays = studyResult[0]?.days || 0;
    } catch (error) {
      // 尝试从learning_stats获取
      try {
        const statsResult: any = await executeQuery(
          'SELECT SUM(study_time) as total, SUM(study_days) as days FROM learning_stats'
        );
        totalStudyTime = statsResult[0]?.total || 0;
        totalStudyDays = statsResult[0]?.days || 0;
      } catch (err) {
        console.log('Study time query failed');
      }
    }
    
    try {
      const categoriesResult: any = await executeQuery(
        'SELECT COUNT(DISTINCT category) as count FROM notes WHERE category IS NOT NULL AND category != ""'
      );
      totalCategories = categoriesResult[0]?.count || 0;
      
      const techResult: any = await executeQuery(
        'SELECT COUNT(DISTINCT technology) as count FROM notes WHERE technology IS NOT NULL AND technology != ""'
      );
      totalTechnologies = techResult[0]?.count || 0;
    } catch (error) {
      console.log('Categories/technologies query failed');
    }

    // 获取今日新增统计
    let todayNotes = 0;
    let todayUsers = 0;
    try {
      const todayNotesResult: any = await executeQuery(
        'SELECT COUNT(*) as count FROM notes WHERE DATE(created_at) = CURDATE()'
      );
      todayNotes = todayNotesResult[0]?.count || 0;
      
      const todayUsersResult: any = await executeQuery(
        'SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()'
      );
      todayUsers = todayUsersResult[0]?.count || 0;
    } catch (error) {
      console.log('Today stats query failed');
    }

    // 获取本周活跃用户
    let weeklyActiveUsers = 0;
    try {
      const weeklyResult: any = await executeQuery(
        'SELECT COUNT(DISTINCT user_id) as count FROM notes WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
      );
      weeklyActiveUsers = weeklyResult[0]?.count || 0;
    } catch (error) {
      console.log('Weekly active users query failed');
    }

    // 获取最近活动（最近10条笔记）
    let recentActivity: any[] = [];
    try {
      const activityResult: any = await executeQuery(
        `SELECT n.id, n.title, n.content, n.created_at as date, u.name as author
         FROM notes n
         LEFT JOIN users u ON n.user_id = u.id
         WHERE n.is_public = 1
         ORDER BY n.created_at DESC
         LIMIT 10`
      );
      
      recentActivity = activityResult.map((item: any) => ({
        id: String(item.id),
        type: 'note',
        title: item.title || '无标题',
        content: `${item.author || '用户'} 创建了新笔记：${item.title || '无标题'}`,
        date: item.date ? new Date(item.date).toISOString() : new Date().toISOString()
      }));
    } catch (error) {
      console.log('Recent activity query failed');
    }

    // 获取月度统计（最近6个月）
    let monthlyStats: any[] = [];
    try {
      const monthlyResult: any = await executeQuery(
        `SELECT 
          DATE_FORMAT(created_at, '%Y-%m') as month,
          COUNT(*) as notes
         FROM notes
         WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
         GROUP BY DATE_FORMAT(created_at, '%Y-%m')
         ORDER BY month DESC
         LIMIT 6`
      );
      
      monthlyStats = monthlyResult.map((item: any) => ({
        month: item.month,
        notes: item.notes || 0,
        studyTime: 0 // 暂时没有月度学习时间数据
      }));
    } catch (error) {
      console.log('Monthly stats query failed');
    }

    // 获取热力图数据（最近一年）
    let heatmapData: any[] = [];
    try {
      const heatmapResult: any = await executeQuery(
        `SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
         FROM notes
         WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
         GROUP BY DATE(created_at)
         ORDER BY date ASC`
      );
      
      heatmapData = heatmapResult.map((item: any) => {
        const count = item.count || 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) {
          if (count <= 2) level = 1;
          else if (count <= 5) level = 2;
          else if (count <= 10) level = 3;
          else level = 4;
        }
        
        // 确保日期格式正确
        const dateStr = item.date instanceof Date 
          ? item.date.toISOString().split('T')[0]
          : String(item.date).split('T')[0];
        
        return {
          date: dateStr,
          count,
          level
        };
      });
    } catch (error) {
      console.log('Heatmap data query failed');
    }

    console.log('平台统计数据获取完成:', {
      totalUsers,
      totalNotes,
      todayNotes,
      weeklyActiveUsers
    });

    // 返回完整的平台统计数据
    return NextResponse.json({
      totalUsers,
      totalNotes,
      publicNotes,
      privateNotes,
      firstNoteDate,
      lastActivityDate,
      totalLikes,
      totalBookmarks,
      totalComments,
      totalStudyTime,
      totalStudyDays,
      totalCategories,
      totalTechnologies,
      todayNotes,
      todayUsers,
      weeklyActiveUsers,
      recentActivity,
      monthlyStats,
      heatmapData,
      // 保留旧格式兼容性
      users: totalUsers,
      notes: totalNotes,
      studyHours: Math.floor(totalStudyTime / 60),
      challenges: 0
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });
  } catch (error) {
    console.error('获取平台统计失败:', error);
    // 返回空数据，让前端使用示例数据
    return NextResponse.json({
      totalUsers: 0,
      totalNotes: 0,
      publicNotes: 0,
      privateNotes: 0,
      firstNoteDate: '',
      lastActivityDate: '',
      totalLikes: 0,
      totalBookmarks: 0,
      totalComments: 0,
      totalStudyTime: 0,
      totalStudyDays: 0,
      totalCategories: 0,
      totalTechnologies: 0,
      todayNotes: 0,
      todayUsers: 0,
      weeklyActiveUsers: 0,
      recentActivity: [],
      monthlyStats: [],
      heatmapData: [],
      users: 0,
      notes: 0,
      studyHours: 0,
      challenges: 0
    });
  }
}
