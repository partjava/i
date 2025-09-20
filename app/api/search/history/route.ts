import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

// 搜索历史 - 完整版本
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: true,
        history: []
      })
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ 
        success: true,
        history: []
      })
    }

    // 获取用户搜索历史（最近20条）
    const history = await executeQuery(
      'SELECT id, query, created_at FROM search_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
      [userId]
    ) as any[]

    return NextResponse.json({
      success: true,
      history: history.map(item => ({
        id: item.id,
        query: item.query,
        createdAt: item.created_at
      }))
    })
  } catch (error) {
    console.error('获取搜索历史失败:', error)
    return NextResponse.json({ 
      success: false,
      history: [],
      message: '获取搜索历史失败' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: false,
        message: '请先登录' 
      }, { status: 401 })
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ 
        success: false,
        message: '用户ID无效' 
      }, { status: 400 })
    }

    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ 
        success: false,
        message: '搜索关键词不能为空' 
      }, { status: 400 })
    }

    const trimmedQuery = query.trim()
    if (trimmedQuery.length > 200) {
      return NextResponse.json({ 
        success: false,
        message: '搜索关键词过长' 
      }, { status: 400 })
    }

    // 检查是否已存在相同的搜索历史，避免重复
    const existing = await executeQuery(
      'SELECT id FROM search_history WHERE user_id = ? AND query = ?',
      [userId, trimmedQuery]
    ) as any[]

    if (existing.length > 0) {
      // 更新时间
      await executeQuery(
        'UPDATE search_history SET created_at = NOW() WHERE id = ?',
        [existing[0].id]
      )
    } else {
      // 新增搜索历史
      await executeQuery(
        'INSERT INTO search_history (user_id, query, created_at) VALUES (?, ?, NOW())',
        [userId, trimmedQuery]
      )

      // 保持最多20条记录
      await executeQuery(
        `DELETE FROM search_history 
         WHERE user_id = ? AND id NOT IN (
           SELECT id FROM (
             SELECT id FROM search_history WHERE user_id = ? 
             ORDER BY created_at DESC LIMIT 20
           ) AS temp
         )`,
        [userId, userId]
      )
    }

    return NextResponse.json({
      success: true,
      message: '搜索历史已保存'
    })
  } catch (error) {
    console.error('保存搜索历史失败:', error)
    return NextResponse.json({ 
      success: false,
      message: '保存失败' 
    }, { status: 500 })
  }
}

// 删除搜索历史
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: false, 
        message: '请先登录' 
      }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const historyId = searchParams.get('id');
    const clearAll = searchParams.get('clearAll') === 'true';

    const userId = parseInt(session.user.id, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ 
        success: false, 
        message: '用户ID无效' 
      }, { status: 400 });
    }

    if (clearAll) {
      // 清空所有搜索历史
      await executeQuery(
        'DELETE FROM search_history WHERE user_id = ?',
        [userId]
      );
      
      return NextResponse.json({
        success: true,
        message: '所有搜索历史已清空'
      });
    } else if (historyId) {
      // 删除指定搜索历史
      const historyIdNum = parseInt(historyId, 10);
      if (isNaN(historyIdNum)) {
        return NextResponse.json({ 
          success: false, 
          message: '历史记录ID无效' 
        }, { status: 400 });
      }

      const result = await executeQuery(
        'DELETE FROM search_history WHERE id = ? AND user_id = ?',
        [historyIdNum, userId]
      ) as any;

      if (result.affectedRows === 0) {
        return NextResponse.json({ 
          success: false, 
          message: '搜索历史不存在' 
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: '搜索历史已删除'
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: '请提供要删除的历史ID或设置clearAll=true' 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('删除搜索历史失败:', error);
    return NextResponse.json({ 
      success: false, 
      message: '删除搜索历史失败' 
    }, { status: 500 });
  }
}