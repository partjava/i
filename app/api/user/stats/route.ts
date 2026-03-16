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
      
      // 从study_sessions表中获取总学习时间（分钟，study_time字段存的就是分钟）
      let studyTimeFromSessions = 0;
      try {
        const studyResult = await executeQuery(
          `SELECT SUM(study_time) as total_time FROM study_sessions WHERE user_id = ?`,
          [userId]
        );
        if (Array.isArray(studyResult) && studyResult.length > 0 && studyResult[0] && 'total_time' in studyResult[0]) {
          studyTimeFromSessions = Math.round(studyResult[0].total_time || 0); // 已经是分钟，不需要除以60
        }
      } catch (_) {}
      
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

        const bookmarksResult = await executeQuery(
          `SELECT COUNT(*) as count FROM note_bookmarks WHERE user_id = ?`,
          [userId]
        );
        if (Array.isArray(bookmarksResult) && bookmarksResult.length > 0 && bookmarksResult[0] && 'count' in bookmarksResult[0]) {
          bookmarksReceived = bookmarksResult[0].count || 0;
        }

        const commentsResult = await executeQuery(
          `SELECT COUNT(*) as count FROM comments WHERE note_id IN (SELECT id FROM notes WHERE author_id = ?)`,
          [userId]
        );
        if (Array.isArray(commentsResult) && commentsResult.length > 0 && commentsResult[0] && 'count' in commentsResult[0]) {
          commentsReceived = commentsResult[0].count || 0;
        }
      } catch (error) {
        console.error('互动统计查询失败:', error);
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
        
        // 查询学习天数 - 合并 notes 创建日期 + study_sessions 日期
        let studyDaysFromNotes = 0;
        let studyDaysFromSessions = 0;
        try {
          const notesDaysResult = await executeQuery(
            `SELECT COUNT(DISTINCT DATE(created_at)) as count FROM notes WHERE author_id = ?`,
            [userId]
          );
          if (Array.isArray(notesDaysResult) && notesDaysResult[0] && 'count' in notesDaysResult[0]) {
            studyDaysFromNotes = notesDaysResult[0].count || 0;
          }
        } catch (_) {}

        try {
          const studyDaysResult = await executeQuery(
            `SELECT COUNT(DISTINCT DATE(created_at)) as count FROM study_sessions WHERE user_id = ?`,
            [userId]
          );
          if (Array.isArray(studyDaysResult) && studyDaysResult[0] && 'count' in studyDaysResult[0]) {
            studyDaysFromSessions = studyDaysResult[0].count || 0;
          }
        } catch (_) {}

        // 取两者中较大的（实际上应该合并去重，但近似用 max 也够用）
        studyDays = Math.max(studyDaysFromNotes, studyDaysFromSessions);
      } catch (error) {
        console.error('学习统计查询失败:', error);
      }
      
      // 总学习时间 = 在线计时（分钟，来自 study_sessions）
      const studyTime = studyTimeFromSessions;
      
      // 获取最近 60 天的学习数据用于趋势图
      let dailyStats: Array<{date: string, studyTime: number, notes: number}> = [];
      try {
        // 查询 study_sessions 数据 - 最近60天
        const studySessionsResult = await executeQuery(
          `SELECT 
            DATE(created_at) as date,
            SUM(study_time) as study_time
          FROM study_sessions 
          WHERE user_id = ?
          AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [userId]
        );

        // 查询 notes 数据 - 最近60天
        const notesResult = await executeQuery(
          `SELECT 
            DATE(created_at) as date,
            COUNT(*) as notes
          FROM notes 
          WHERE author_id = ?
          AND created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY)
          GROUP BY DATE(created_at)
          ORDER BY date ASC`,
          [userId]
        );
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
          totalStudyTime: studyTime,
          studyDays: studyDays,
          studyDaysTotal: studyDays
        },
        achievements: { 
          total: 10, 
          earned: calculateEarnedAchievements(studyDays, totalNotes, likesReceived, technologiesStudied, studyTime, commentsReceived)
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