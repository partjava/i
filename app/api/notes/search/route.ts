export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const { searchParams } = request.nextUrl
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')
    const filter = searchParams.get('filter')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: '搜索关键词至少需要2个字符' },
        { status: 400 }
      )
    }

    let searchQuery = `
      SELECT n.id, n.title, n.content, n.category, n.technology, n.subcategory, n.tags, 
             n.is_public, n.created_at, n.updated_at${filter === 'public' ? ', u.name as author_name' : ''}
      FROM notes n
      ${filter === 'public' ? 'JOIN users u ON n.author_id = u.id' : ''}
      WHERE ${filter === 'public' ? 'n.is_public = true' : 'n.author_id = ?'}
        AND (n.title LIKE ? OR n.content LIKE ? OR JSON_SEARCH(n.tags, 'one', ?, NULL, '$[*]') IS NOT NULL)
    `

    const queryParams = []
    if (filter !== 'public') {
      queryParams.push(parseInt(session.user.id))
    }
    
    const searchTerm = `%${query}%`
    queryParams.push(searchTerm, searchTerm, `%${query}%`)

    if (category) {
      searchQuery += ' AND n.category = ?'
      queryParams.push(category)
    }

    if (technology) {
      searchQuery += ' AND n.technology = ?'
      queryParams.push(technology)
    }

    searchQuery += ' ORDER BY n.updated_at DESC LIMIT ? OFFSET ?'
    queryParams.push(limit, (page - 1) * limit)

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