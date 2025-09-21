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
        // 数据库中笔记数量少于前端，但我们不应该自动创建笔记
        // 这很可能是因为前端显示了所有公开笔记的数量，而不仅仅是用户自己的笔记
        console.log(`前端显示的笔记数量(${totalNotes})大于用户实际拥有的笔记数量(${dbNoteCount})，不自动创建笔记`);
        
        return NextResponse.json({
          success: true,
          message: '笔记数量不同步，但不自动创建笔记',
          dbCount: dbNoteCount,
          frontendCount: totalNotes
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

