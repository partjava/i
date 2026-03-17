import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, initDatabase } from '@/app/lib/database';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await initDatabase();

    const rows = await executeQuery(
      `SELECT data, mime_type, filename FROM note_images WHERE id = ?`,
      [params.id]
    ) as any[];

    if (!rows || rows.length === 0) {
      return new NextResponse('图片不存在', { status: 404 });
    }

    const { data, mime_type, filename } = rows[0];
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime_type,
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('获取图片失败:', error);
    return new NextResponse('获取图片失败', { status: 500 });
  }
}
