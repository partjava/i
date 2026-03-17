import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery, initDatabase } from '@/app/lib/database';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: '未找到图片文件' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: '只支持 JPG、PNG、GIF、WebP 格式' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: '图片大小不能超过 5MB' }, { status: 400 });
    }

    await initDatabase();

    const buffer = Buffer.from(await file.arrayBuffer());
    const userId = (session.user as any).id;

    const result = await executeQuery(
      `INSERT INTO note_images (user_id, filename, mime_type, data, size) VALUES (?, ?, ?, ?, ?)`,
      [userId, file.name, file.type, buffer, file.size]
    ) as any;

    const imageId = result.insertId;
    return NextResponse.json({ url: `/api/images/${imageId}` });
  } catch (error) {
    console.error('图片上传失败:', error);
    return NextResponse.json({ error: '上传失败，请重试' }, { status: 500 });
  }
}
