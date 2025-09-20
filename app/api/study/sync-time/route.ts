'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 获取用户ID
    const userId = session.user.id;
    
    // 从请求体获取学习时间
    const data = await request.json();
    const { currentTime } = data;
    
    if (typeof currentTime !== 'number' || currentTime < 0) {
      return NextResponse.json({ error: '无效的学习时间' }, { status: 400 });
    }
    
    // 导入数据库操作函数
    const { executeQuery } = await import('@/app/lib/database');
    
    // 检查数据库中是否已有该用户的学习时间记录
    const checkResult = await executeQuery(
      'SELECT SUM(study_time) as total_time FROM study_sessions WHERE user_id = ?',
      [userId]
    );
    
    let dbStudyTime = 0;
    if (Array.isArray(checkResult) && checkResult.length > 0 && 
        checkResult[0] && 'total_time' in checkResult[0]) {
      dbStudyTime = checkResult[0].total_time || 0;
    }
    
    // 任何大于0的时间差都视为有效学习时间
    if (currentTime >= dbStudyTime) {
      const timeDiff = currentTime - dbStudyTime;
      if (timeDiff > 0) {
        // 创建新的学习记录
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        await executeQuery(
          `INSERT INTO study_sessions 
            (user_id, study_time, category, technology, activity, created_at) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [
            userId, 
            timeDiff, 
            '编程', 
            'JavaScript', 
            '实时同步学习时间',
            now
          ]
        );
        
        return NextResponse.json({
          success: true,
          message: '学习时间已同步',
          previousTime: dbStudyTime,
          currentTime: currentTime,
          added: timeDiff
        });
      }
    }
    
    // 如果数据库中没有任何学习记录，但当前有学习时间，直接添加
    if (dbStudyTime === 0 && currentTime > 0) {
      // 创建新的学习记录
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      await executeQuery(
        `INSERT INTO study_sessions 
          (user_id, study_time, category, technology, activity, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId, 
          currentTime, 
          '编程', 
          'JavaScript', 
          '初始化学习时间',
          now
        ]
      );
      
      return NextResponse.json({
        success: true,
        message: '学习时间已初始化',
        previousTime: 0,
        currentTime: currentTime,
        added: currentTime
      });
    }
    
    return NextResponse.json({
      success: true,
      message: '无需同步学习时间',
      dbStudyTime,
      currentTime
    });
  } catch (error) {
    console.error('同步学习时间失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
