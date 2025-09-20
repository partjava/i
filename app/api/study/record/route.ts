'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

/**
 * 记录学习时间API
 * 实时记录用户学习时间到数据库
 */
export async function POST(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 获取请求数据
    const data = await request.json();
    const { studyTime, category, technology, description } = data;
    
    // 验证必要参数
    if (!studyTime) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }
    
    // 获取用户ID
    const userId = session.user.id;
    
    // 记录学习时间
    await executeQuery(
      `INSERT INTO study_sessions 
        (user_id, study_time, category, technology, activity, created_at) 
      VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, studyTime, category || '编程', technology || 'JavaScript', description || '在线学习']
    );
    
    // 获取用户总学习时间
    const totalTimeResult = await executeQuery(
      'SELECT SUM(study_time) as total_time FROM study_sessions WHERE user_id = ?',
      [userId]
    );
    
    let totalTime = 0;
    if (Array.isArray(totalTimeResult) && totalTimeResult.length > 0 && 
        totalTimeResult[0] && 'total_time' in totalTimeResult[0]) {
      totalTime = totalTimeResult[0].total_time || 0;
    }
    
    return NextResponse.json({
      success: true,
      message: '学习时间已记录',
      totalTime
    });
  } catch (error) {
    console.error('记录学习时间失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}