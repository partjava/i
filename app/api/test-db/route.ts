import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

export async function GET() {
  try {
    // 测试数据库连接
    const dbTest = await executeQuery('SELECT 1 as test')
    
    // 测试获取笔记数据
    const notes = await executeQuery('SELECT id, title, created_at FROM notes LIMIT 5')
    
    return NextResponse.json({ 
      success: true,
      database: dbTest,
      notes: notes
    })
  } catch (error) {
    console.error('数据库测试失败:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : '数据库连接失败'
    }, { status: 500 })
  }
}