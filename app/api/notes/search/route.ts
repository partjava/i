export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/app/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')
    const filter = searchParams.get('filter')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // 获取用户会话
    const session = await getServerSession(authOptions)
    
    // 获取搜索范围参数
    const searchPublic = searchParams.get('searchPublic') === 'true'
    const searchPersonal = searchParams.get('searchPersonal') === 'true'
    
    // 如果要搜索个人笔记但未登录，则返回错误
    if (searchPersonal && !session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录以搜索个人笔记' },
        { status: 401 }
      )
    }
    
    // 如果既不搜索公开笔记也不搜索个人笔记，默认搜索公开笔记
    if (!searchPublic && !searchPersonal) {
      return NextResponse.json(
        { error: '请指定搜索范围' },
        { status: 400 }
      )
    }

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: '搜索关键词至少需要2个字符' },
        { status: 400 }
      )
    }

    // 构建WHERE条件
    let whereConditions = [];
    const queryParams = [];
    
    // 添加搜索范围条件
    if (searchPublic && searchPersonal && session?.user?.id) {
      // 同时搜索公开笔记和个人笔记
      whereConditions.push('(n.is_public = 1 OR n.author_id = ?)');
      queryParams.push(parseInt(session.user.id));
    } else if (searchPublic) {
      // 只搜索公开笔记
      whereConditions.push('n.is_public = 1');
    } else if (searchPersonal && session?.user?.id) {
      // 只搜索个人笔记
      whereConditions.push('n.author_id = ?');
      queryParams.push(parseInt(session.user.id));
    }
    
    // 添加搜索内容条件 - 简化版本
    whereConditions.push(`(
      n.title LIKE ? 
      OR n.content LIKE ? 
      OR n.category LIKE ?
      OR n.technology LIKE ?
    )`);
    
    // 构建完整查询
    let searchQuery = `
      SELECT n.id, n.title, n.content, n.category, n.technology, n.subcategory, n.tags, 
             n.is_public, n.created_at, n.updated_at, u.name as author_name, n.author_id
      FROM notes n
      JOIN users u ON n.author_id = u.id
      WHERE ${whereConditions.join(' AND ')}
    `
    
    const searchTerm = `%${query}%`
    queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm)

    if (category) {
      searchQuery += ' AND n.category = ?'
      queryParams.push(category)
    }

    if (technology) {
      searchQuery += ' AND n.technology = ?'
      queryParams.push(technology)
    }

    const offset = (page - 1) * limit
    searchQuery += ` ORDER BY n.updated_at DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`

    const searchResults = await executeQuery(searchQuery, queryParams) as any[]

    // 处理tags字段
    const processedResults = searchResults.map(note => {
      let tags = []
      try {
        if (note.tags) {
          if (Array.isArray(note.tags)) {
            tags = note.tags
          } else if (typeof note.tags === 'string' && note.tags.trim()) {
            tags = JSON.parse(note.tags)
            if (!Array.isArray(tags)) {
              tags = []
            }
          }
        }
      } catch (e) {
        console.warn('JSON解析tags失败:', note.tags, e)
        tags = []
      }

      return {
        ...note,
        _id: note.id.toString(),
        isPublic: Boolean(note.is_public),
        tags: tags,
        createdAt: note.created_at,
        updatedAt: note.updated_at
      }
    })

    return NextResponse.json({
      notes: processedResults,
      query,
      pagination: {
        page,
        limit,
        total: processedResults.length,
        pages: Math.ceil(processedResults.length / limit)
      }
    })

  } catch (error) {
    console.error('搜索失败:', error)
    
    // 获取查询参数，确保在catch块中也能访问
    const { searchParams } = request.nextUrl
    const errorQuery = searchParams.get('q') || ''
    const errorPage = parseInt(searchParams.get('page') || '1')
    const errorLimit = parseInt(searchParams.get('limit') || '10')
    
    // 返回空结果集而不是错误，避免前端崩溃
    return NextResponse.json({
      notes: [],
      query: errorQuery,
      pagination: {
        page: errorPage,
        limit: errorLimit,
        total: 0,
        pages: 0,
        hasNext: false,
        hasPrev: false
      }
    })
  }
}