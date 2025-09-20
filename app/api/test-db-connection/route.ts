import { NextResponse } from 'next/server';
import pool from '../../lib/database';

export async function GET() {
  try {
    // 获取数据库连接
    const connection = await pool.getConnection();
    
    try {
      // 测试简单查询
      const [result] = await connection.execute('SELECT 1 as test');
      
      // 获取数据库配置信息（不包含密码）
      const config = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'ecs-user',
        database: process.env.DB_NAME || 'partjava_notes',
      };
      
      // 检查notes表是否存在
      const [tables] = await connection.execute(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = ? 
        AND table_name = 'notes'
      `, [config.database]);
      
      const notesTableExists = Array.isArray(tables) && tables.length > 0;
      
      // 如果notes表存在，尝试查询一条记录
      let notesSample = null;
      if (notesTableExists) {
        const [notes] = await connection.execute('SELECT COUNT(*) as count FROM notes');
        notesSample = Array.isArray(notes) && notes.length > 0 ? notes[0] : null;
      }
      
      return NextResponse.json({
        success: true,
        message: '数据库连接成功',
        dbTest: result,
        config,
        tables: {
          notesTableExists,
          notesSample
        }
      });
    } finally {
      // 释放连接
      connection.release();
    }
  } catch (error) {
    console.error('数据库连接测试失败:', error);
    
    return NextResponse.json({
      success: false,
      message: '数据库连接失败',
      error: error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      } : String(error)
    }, { status: 500 });
  }
}
