export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

// 获取用户所有对话列表
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const rows = await executeQuery(
    `SELECT c.id, c.title, c.conversation_id, c.updated_at,
            (SELECT content FROM ai_messages WHERE conversation_id = c.id ORDER BY created_at ASC LIMIT 1) as first_msg
     FROM ai_conversations c
     WHERE c.user_id = ?
     ORDER BY c.updated_at DESC
     LIMIT 50`,
    [session.user.id]
  );

  return NextResponse.json({ conversations: rows });
}

// 创建新对话
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const result = await executeQuery(
    `INSERT INTO ai_conversations (user_id, title) VALUES (?, '新对话')`,
    [session.user.id]
  ) as any;

  return NextResponse.json({ id: result.insertId });
}
