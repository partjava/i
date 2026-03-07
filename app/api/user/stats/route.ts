export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

// 计算已获得的成就数量
function calculateEarnedAchievements(
  studyDays: number,
  totalNotes: number,
  likesReceived: number,
  technologiesStudied: number,
  totalStudyTime: number,
  commentsReceived: number
): number {
  let earned = 0;
  
  // 学习达人 - 连续学习7天
  if (studyDays >= 7) earned++;
  
  // 笔记高手 - 创建10篇笔记
  if (totalNotes >= 10) earned++;
  
  // 受欢迎作者 - 获得50个点赞
  if (likesReceived >= 50) earned++;
  
  // 技术专家 - 学习5个技术栈
  if (technologiesStudied >= 5) earned++;
  
  // 时间管理大师 - 累计学习100小时
  if (Math.floor(totalStudyTime / 60) >= 100) earned++;
  
  // 活跃讨论者 - 收到20条评论
  if (commentsReceived >= 20) earned++;
  
  return earned;
}

export async function GET(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 从数据库获取真实统计数据
    let stats;
    try {
      // 导入数据库操作函数
      const { executeQuery } = await import('@/app/lib/database');
      
      // 获取用户ID
      const userId = session.user.id;
      
      // 从study_sessions表中获取总学习时间（秒）
      const studyResult = await executeQuery(
        `SELECT SUM(study_time) as total_time 
        FROM study_sessions 
        WHERE user_id = ?`,
        [userId]
      );
      
      // 获取实际学习时间（转换为分钟）
      let studyTime = 0;
      if (Array.isArray(studyResult) && studyResult.length > 0 && studyResult[0] && 'total_time' in studyResult[0]) {
        const totalSeconds = studyResult[0].total_time || 0;
        studyTime = Math.round(totalSeconds / 60); // 转换为分钟
      }
      
      // 查询笔记统计
      let totalNotes = 0;
      let publicNotes = 0;
      let privateNotes = 0;
      let firstNoteDate = '';
      let lastActivityDate = '';
      
      try {
        // 查询总笔记数
        const notesResult = await executeQuery(
          `SELECT COUNT(*) as total FROM notes WHERE author_id = ?`,
          [userId]
        );
        
        if (Array.isArray(notesResult) && notesResult.length > 0 && notesResult[0] && 'total' in notesResult[0]) {
          totalNotes = notesResult[0].total || 0;
        }
        
        // 查询公开笔记数
        const publicNotesResult = await executeQuery(
          `SELECT COUNT(*) as count FROM notes WHERE author_id = ? AND is_public = 1`,
          [userId]
        );
        
        if (Array.isArray(publicNotesResult) && publicNotesResult.length > 0 && 
            publicNotesResult[0] && 'count' in publicNotesResult[0]) {
          publicNotes = publicNotesResult[0].count || 0;
        }
        
        // 查询私有笔记数
        const privateNotesResult = await executeQuery(
          `SELECT COUNT(*) as count FROM notes WHERE author_id = ? AND is_public = 0`,
          [userId]
        );
        
        if (Array.isArray(privateNotesResult) && privateNotesResult.length > 0 && 
            privateNotesResult[0] && 'count' in privateNotesResult[0]) {
          privateNotes = privateNotesResult[0].count || 0;
        }
        
        // 查询第一条笔记日期
        if (totalNotes > 0) {
          const firstNoteResult = await executeQuery(
            `SELECT MIN(created_at) as first_date FROM notes WHERE author_id = ?`,
            [userId]
          );
          
          if (Array.isArray(firstNoteResult) && firstNoteResult.length > 0 && 
              firstNoteResult[0] && firstNoteResult[0] && 'first_date' in firstNoteResult[0] && firstNoteResult[0].first_date) {
            firstNoteDate = new Date(firstNoteResult[0].first_date as string).toISOString();
          }
          
          // 查询最后活动日期
          const lastActivityResult = await executeQuery(
            `SELECT MAX(updated_at) as last_date FROM notes WHERE author_id = ?`,
            [userId]
          );
          
          if (Array.isArray(lastActivityResult) && lastActivityResult.length > 0 && 
              lastActivityResult[0] && 'last_date' in lastActivityResult[0] && lastActivityResult[0].last_date) {
            lastActivityDate = new Date(lastActivityResult[0].last_date as string).toISOString();
          }
        }
      } catch (error) {
        console.error('笔记统计查询失败:', error);
      }
      
      // 查询互动数据
      let likesReceived = 0;
      let bookmarksReceived = 0;
      let commentsReceived = 0;
      
      try {
        const likesResult = await executeQuery(
          `SELECT COUNT(*) as count FROM note_likes WHERE note_id IN (SELECT id FROM notes WHERE author_id = ?)`,
          [userId]
        );
        
        if (Array.isArray(likesResult) && likesResult.length > 0 && likesResult[0] && 'count' in likesResult[0]) {
          likesReceived = likesResult[0].count || 0;
        }
      } catch (error) {
        console.error('点赞统计查询失败:', error);
      }
      
      // 查询学习分类和技术
      let categoriesStudied = 0;
      let technologiesStudied = 0;
      let studyDays = 0;
      let categoryStats: { category: string; count: number }[] = [];
      
      try {
        // 查询学习分类数量（从笔记中统计）
        const categoriesResult = await executeQuery(
          `SELECT COUNT(DISTINCT category) as count 
           FROM notes 
           WHERE author_id = ? AND category IS NOT NULL AND category != ''`,
          [userId]
        );
        
        if (Array.isArray(categoriesResult) && categoriesResult.length > 0 && 
            categoriesResult[0] && 'count' in categoriesResult[0]) {
          categoriesStudied = categoriesResult[0].count || 0;
        }
        
        // 查询笔记分类统计（真实数据）
        const categoryStatsResult = await executeQuery(
          `SELECT category, COUNT(*) as count 
           FROM notes 
           WHERE author_id = ? AND category IS NOT NULL AND category != ''
           GROUP BY category
           ORDER BY count DESC`,
          [userId]
        );
        
        if (Array.isArray(categoryStatsResult) && categoryStatsResult.length > 0) {
          categoryStats = categoryStatsResult.map((row: any) => ({
            category: row.category || '未分类',
            count: row.count || 0
          }));
        }
        
        // 查询学习技术数量（从笔记中统计）
        const technologiesResult = await executeQuery(
          `SELECT COUNT(DISTINCT technology) as count 
           FROM notes 
           WHERE author_id = ? AND technology IS NOT NULL AND technology != ''`,
          [userId]
        );
        
        if (Array.isArray(technologiesResult) && technologiesResult.length > 0 && 
            technologiesResult[0] && 'count' in technologiesResult[0]) {
          technologiesStudied = technologiesResult[0].count || 0;
        }
        
        // 查询学习天数 - 从study_sessions统计不同的日期
        const studyDaysResult = await executeQuery(
          `SELECT COUNT(DISTINCT DATE(created_at)) as count 
           FROM study_sessions 
           WHERE user_id = ?`,
          [userId]
        );
        
        if (Array.isArray(studyDaysResult) && studyDaysResult.length > 0 && 
            studyDaysResult[0] && 'count' in studyDaysResult[0]) {
          studyDays = studyDaysResult[0].count || 0;
        }
      } catch (error) {
        console.error('学习统计查询失败:', error);
      }
      
      // 使用实际数据，没有就是0
      const actualStudyTime = studyTime || 0;
      
      // 获取本周的学习数据用于趋势图（周一到今天）
      let dailyStats: Array<{date: string, studyTime: number, notes: number}> = [];
      try {
        // 先查询study_sessions数据 - 本周数据
        const studySessionsResult = await executeQuery(
          `SELECT 
            DATE(created_at) as date,
            SUM(study_time) as study_time
          FROM study_sessions 
          WHERE user_id = ?
          AND YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [userId]
        );
        
        console.log('本周学习会话查询结果:', studySessionsResult);
        
        // 再查询notes数据 - 本周数据
        const notesResult = await executeQuery(
          `SELECT 
            DATE(created_at) as date,
            COUNT(*) as notes
          FROM notes 
          WHERE author_id = ?
          AND YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [userId]
        );
        
        console.log('本周笔记查询结果:', notesResult);
        
        // 合并两个查询结果
        const dateMap = new Map();
        
        if (Array.isArray(studySessionsResult)) {
          studySessionsResult.forEach((row: any) => {
            if (row && row.date) {
              const dateStr = new Date(row.date).toISOString().split('T')[0];
              dateMap.set(dateStr, {
                date: dateStr,
                studyTime: Math.floor((row.study_time || 0) / 60), // 秒转分钟
                notes: 0
              });
            }
          });
        }
        
        if (Array.isArray(notesResult)) {
          notesResult.forEach((row: any) => {
            if (row && row.date) {
              const dateStr = new Date(row.date).toISOString().split('T')[0];
              const existing = dateMap.get(dateStr);
              if (existing) {
                existing.notes = row.notes || 0;
              } else {
                dateMap.set(dateStr, {
                  date: dateStr,
                  studyTime: 0,
                  notes: row.notes || 0
                });
              }
            }
          });
        }
        
        dailyStats = Array.from(dateMap.values()).sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        console.log('本周合并后的每日统计:', dailyStats);
      } catch (error) {
        console.error('本周统计查询失败:', error);
      }
      
      stats = {
        notes: { 
          total: totalNotes, 
          public: publicNotes, 
          private: privateNotes,
          firstNoteDate: firstNoteDate,  // 实际数据，没有就是空字符串
          lastActivityDate: lastActivityDate
        },
        engagement: { 
          likesReceived: likesReceived, 
          bookmarksReceived: bookmarksReceived, 
          commentsReceived: commentsReceived
        },
        learning: { 
          categoriesStudied: categoriesStudied,  // 实际数据，没有就是0
          technologiesStudied: technologiesStudied, 
          totalStudyTime: actualStudyTime, // 实际学习时间
          studyDays: studyDays,
          studyDaysTotal: studyDays
        },
        achievements: { 
          total: 10, 
          earned: calculateEarnedAchievements(studyDays, totalNotes, likesReceived, technologiesStudied, actualStudyTime, commentsReceived)
        },
        recentActivity: [],
        dailyStats: dailyStats,  // 添加每日统计数据
        monthlyStats: [],
        categoryStats: categoryStats  // 添加真实的分类统计数据
      };
    } catch (dbError) {
      console.error('主数据库查询失败:', dbError);
      
      // 如果整个数据库连接失败，我们仍然需要返回一个有效的对象
      // 但我们已经在上面的代码中处理了单独查询的错误，
      // 所以这里只需要确保stats对象已定义
      if (!stats) {
        stats = {
          notes: { total: 0, public: 0, private: 0, firstNoteDate: '', lastActivityDate: '' },
          engagement: { likesReceived: 0, bookmarksReceived: 0, commentsReceived: 0 },
          learning: { categoriesStudied: 0, technologiesStudied: 0, totalStudyTime: 0, studyDays: 0, studyDaysTotal: 0 },
          achievements: { total: 10, earned: 0 },
          recentActivity: [],
          monthlyStats: []
        };
      }
    }
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('获取用户统计数据失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}