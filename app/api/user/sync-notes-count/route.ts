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
    
    // 从请求体获取笔记数量
    const data = await request.json();
    const { totalNotes } = data;
    
    if (typeof totalNotes !== 'number' || totalNotes < 0) {
      return NextResponse.json({ error: '无效的笔记数量' }, { status: 400 });
    }
    
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
    
    // 如果数据库中笔记数量与前端不一致，则同步笔记数量
    if (dbNoteCount !== totalNotes) {
      console.log(`用户 ${userId} 的笔记数量不一致：数据库 ${dbNoteCount}，前端 ${totalNotes}`);
      
      if (dbNoteCount < totalNotes) {
        // 数据库中笔记数量少于前端，需要添加笔记
        const notesToAdd = totalNotes - dbNoteCount;
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // 批量添加笔记
        for (let i = 0; i < notesToAdd; i++) {
          // 随机决定是否为公开笔记
          const isPublic = Math.random() > 0.5 ? 1 : 0;
          
          await executeQuery(
            `INSERT INTO notes 
              (author_id, title, content, is_public, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
              userId, 
              `笔记 ${dbNoteCount + i + 1}`, 
              `这是从前端同步的笔记 ${dbNoteCount + i + 1}`, 
              isPublic, 
              now, 
              now
            ]
          );
        }
        
        return NextResponse.json({
          success: true,
          message: '笔记数量已同步',
          added: notesToAdd,
          current: totalNotes
        });
      } else {
        // 数据库中笔记数量多于前端，这种情况通常不处理
        // 但可以记录这种情况
        console.log(`数据库中笔记数量(${dbNoteCount})多于前端(${totalNotes})，不做处理`);
        
        return NextResponse.json({
          success: true,
          message: '数据库中笔记数量已足够',
          dbCount: dbNoteCount,
          frontendCount: totalNotes
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: '笔记数量已同步',
      count: dbNoteCount
    });
  } catch (error) {
    console.error('同步笔记数量失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

