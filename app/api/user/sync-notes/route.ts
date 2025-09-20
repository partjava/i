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
    
    // 从请求体获取笔记数据
    const data = await request.json();
    const { totalNotes, publicNotes, privateNotes } = data;
    
    // 导入数据库操作函数
    const { executeQuery } = await import('@/app/lib/database');
    
    // 检查数据库中是否已有该用户的笔记记录
    const checkResult = await executeQuery(
      'SELECT COUNT(*) as count FROM notes WHERE author_id = ?',
      [userId]
    );
    
    let dbNoteCount = 0;
    if (Array.isArray(checkResult) && checkResult.length > 0 && 
        checkResult[0] && 'count' in checkResult[0]) {
      dbNoteCount = checkResult[0].count || 0;
    }
    
    // 如果数据库中没有记录，但前端有笔记数据，则同步到数据库
    if (dbNoteCount === 0 && totalNotes > 0) {
      // 创建基本笔记记录
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      // 添加公开笔记
      for (let i = 0; i < publicNotes; i++) {
        await executeQuery(
          `INSERT INTO notes 
            (author_id, title, content, is_public, created_at, updated_at) 
          VALUES (?, ?, ?, 1, ?, ?)`,
          [userId, `笔记 ${i+1}`, `这是同步的公开笔记 ${i+1}`, now, now]
        );
      }
      
      // 添加私有笔记
      for (let i = 0; i < privateNotes; i++) {
        await executeQuery(
          `INSERT INTO notes 
            (author_id, title, content, is_public, created_at, updated_at) 
          VALUES (?, ?, ?, 0, ?, ?)`,
          [userId, `私有笔记 ${i+1}`, `这是同步的私有笔记 ${i+1}`, now, now]
        );
      }
      
      return NextResponse.json({
        success: true,
        message: '笔记数据已同步到数据库',
        syncedNotes: totalNotes
      });
    }
    
    return NextResponse.json({
      success: true,
      message: '无需同步笔记数据',
      dbNoteCount
    });
  } catch (error) {
    console.error('同步笔记数据失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
