import { executeQuery } from '../database';
import { PaginationParams } from '../../types';

export class StatsService {
  
  async getUserStats(userId: number): Promise<any> {
    try {
      // 获取用户笔记统计
      const noteStats = await executeQuery(
        'SELECT COUNT(*) as total_notes, SUM(CASE WHEN is_public = 1 THEN 1 ELSE 0 END) as public_notes, SUM(CASE WHEN is_public = 0 THEN 1 ELSE 0 END) as private_notes, MIN(created_at) as first_note_date, MAX(updated_at) as last_activity_date FROM notes WHERE author_id = ?',
        [userId]
      ) as any[];

      // 获取用户学习统计
      const learningStats = await executeQuery(
        'SELECT COUNT(*) as total_activities, SUM(points) as total_points, SUM(study_time) as total_study_time, COUNT(DISTINCT DATE(created_at)) as study_days FROM learning_stats WHERE user_id = ?',
        [userId]
      ) as any[];

      // 获取分类和技术栈数量
      const categoryCount = await executeQuery(
        'SELECT COUNT(DISTINCT category) as category_count FROM learning_stats WHERE user_id = ? AND category IS NOT NULL',
        [userId]
      ) as any[];

      const technologyCount = await executeQuery(
        'SELECT COUNT(DISTINCT technology) as technology_count FROM learning_stats WHERE user_id = ? AND technology IS NOT NULL',
        [userId]
      ) as any[];

      // 获取点赞、收藏和评论数
      const engagementStats = await executeQuery(
        `SELECT 
          SUM(CASE WHEN type = 'like' THEN 1 ELSE 0 END) as likes_received,
          SUM(CASE WHEN type = 'bookmark' THEN 1 ELSE 0 END) as bookmarks_received,
          SUM(CASE WHEN type = 'comment' THEN 1 ELSE 0 END) as comments_received
        FROM engagements 
        WHERE target_user_id = ?`,
        [userId]
      ) as any[];

      // 获取最近活动
      const recentActivities = await executeQuery(
        `SELECT 'note' as type, title as content, created_at as date 
         FROM notes 
         WHERE author_id = ? 
         UNION ALL 
         SELECT 'learning' as type, CONCAT('学习了 ', COALESCE(technology, category, 'unknown')) as content, created_at as date 
         FROM learning_stats 
         WHERE user_id = ? 
         ORDER BY date DESC LIMIT 10`,
        [userId, userId]
      ) as any[];

      // 获取月度笔记统计
      const monthlyStats = await executeQuery(
        `SELECT 
          DATE_FORMAT(created_at, '%Y-%m') as month, 
          COUNT(*) as notes_count,
          COUNT(*) as notes,
          SUM(CHAR_LENGTH(content)) / 600 as study_time
         FROM notes 
         WHERE author_id = ? 
         GROUP BY month 
         ORDER BY month DESC 
         LIMIT 12`,
        [userId]
      ) as any[];

      // 获取用户加入日期
      const userInfo = await executeQuery(
        'SELECT created_at FROM users WHERE id = ?',
        [userId]
      ) as any[];

      // 构建前端期望的数据结构
      return {
        notes: {
          total: noteStats[0]?.total_notes || 0,
          public: noteStats[0]?.public_notes || 0,
          private: noteStats[0]?.private_notes || 0,
          firstNoteDate: noteStats[0]?.first_note_date || '',
          lastActivityDate: noteStats[0]?.last_activity_date || ''
        },
        engagement: {
          likesReceived: engagementStats[0]?.likes_received || 0,
          bookmarksReceived: engagementStats[0]?.bookmarks_received || 0,
          commentsReceived: engagementStats[0]?.comments_received || 0
        },
        learning: {
          categoriesStudied: categoryCount[0]?.category_count || 0,
          technologiesStudied: technologyCount[0]?.technology_count || 0,
          totalStudyTime: learningStats[0]?.total_study_time || 0,
          studyDays: learningStats[0]?.study_days || 0,
          studyDaysTotal: learningStats[0]?.study_days || 0
        },
        achievements: {
          total: 10,
          earned: 0 // 这个需要根据实际成就系统计算
        },
        recentActivity: recentActivities.map((activity: any) => ({
          type: activity.type,
          content: activity.content,
          date: activity.date
        })),
        monthlyStats: monthlyStats.map((stat: any) => ({
          month: stat.month,
          notes_count: stat.notes_count || 0,
          notes: stat.notes || 0,
          studyTime: Math.round(stat.study_time || 0)
        }))
      };
    } catch (error) {
      console.error('获取用户统计失败:', error);
      throw new Error('获取用户统计失败');
    }
  }

  async getLearningStats(userId: number, days: number = 30): Promise<{
    heatmapData: Array<{ date: string; count: number; points: number }>;
    totalDays: number;
    totalActivities: number;
    totalPoints: number;
  }> {
    try {
      // 获取最近N天的学习数据
      const learningData = await executeQuery(
        `SELECT DATE(created_at) as date, COUNT(*) as activities, SUM(points) as points 
         FROM learning_stats 
         WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
         GROUP BY DATE(created_at) 
         ORDER BY date ASC`,
        [userId, days]
      ) as any[];

      // 生成热力图数据
      const heatmapData = [];
      const today = new Date();
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayData = learningData.find((d: any) => d.date === dateStr);
        heatmapData.push({
          date: dateStr,
          count: dayData ? dayData.activities : 0,
          points: dayData ? dayData.points : 0
        });
      }

      return {
        heatmapData,
        totalDays: heatmapData.filter(d => d.count > 0).length,
        totalActivities: learningData.reduce((sum: number, d: any) => sum + (d.activities || 0), 0),
        totalPoints: learningData.reduce((sum: number, d: any) => sum + (d.points || 0), 0)
      };
    } catch (error) {
      console.error('获取学习统计失败:', error);
      throw new Error('获取学习统计失败');
    }
  }

  async getCategoryStats(userId: number): Promise<Array<{
    category: string;
    count: number;
    totalTime: number;
  }>> {
    try {
      const categoryStats = await executeQuery(
        `SELECT category, COUNT(*) as count, SUM(study_time) as total_time
         FROM learning_stats 
         WHERE user_id = ? AND category IS NOT NULL
         GROUP BY category 
         ORDER BY count DESC`,
        [userId]
      ) as any[];

      return categoryStats.map(stat => ({
        category: stat.category,
        count: stat.count || 0,
        totalTime: stat.total_time || 0
      }));
    } catch (error) {
      console.error('获取分类统计失败:', error);
      throw new Error('获取分类统计失败');
    }
  }

  async getTechnologyStats(userId: number): Promise<Array<{
    technology: string;
    count: number;
    totalTime: number;
  }>> {
    try {
      const techStats = await executeQuery(
        `SELECT technology, COUNT(*) as count, SUM(study_time) as total_time
         FROM learning_stats 
         WHERE user_id = ? AND technology IS NOT NULL
         GROUP BY technology 
         ORDER BY count DESC`,
        [userId]
      ) as any[];

      return techStats.map(stat => ({
        technology: stat.technology,
        count: stat.count || 0,
        totalTime: stat.total_time || 0
      }));
    } catch (error) {
      console.error('获取技术统计失败:', error);
      throw new Error('获取技术统计失败');
    }
  }
}