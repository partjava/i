export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

// 获取某个对话的所有消息
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const convId = parseInt(params.id);

  // 验证对话属于当前用户
  const conv = await executeQuery(
    'SELECT id FROM ai_conversations WHERE id = ? AND user_id = ?',
    [convId, session.user.id]
  ) as any[];
  if (!conv.length) return NextResponse.json({ error: '对话不存在' }, { status: 404 });

  const messages = await executeQuery(
    'SELECT role, content, created_at FROM ai_messages WHERE conversation_id = ? ORDER BY created_at ASC',
    [convId]
  );

  return NextResponse.json({ messages });
}

// 保存消息（user + assistant 一起存）
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

  const convId = parseInt(params.id);
  const { userMessage, assistantMessage } = await request.json();

  // 验证对话属于当前用户
  const conv = await executeQuery(
    'SELECT id, title FROM ai_conversations WHERE id = ? AND user_id = ?',
    [convId, session.user.id]
  ) as any[];
  if (!conv.length) return NextResponse.json({ error: '对话不存在' }, { status: 404 });

  // 存用户消息
  await executeQuery(
    'INSERT INTO ai_messages (conversation_id, role, content) VALUES (?, "user", ?)',
    [convId, userMessage]
  );

  // 存 AI 回复
  await executeQuery(
    'INSERT INTO ai_messages (conversation_id, role, content) VALUES (?, "assistant", ?)',
    [convId, assistantMessage]
  );

  // 如果还是"新对话"，用第一条用户消息的前20字作为标题
  if (conv[0].title === '新对话') {
    const title = userMessage.slice(0, 20) + (userMessage.length > 20 ? '...' : '');
    await executeQuery(
      'UPDATE ai_conversations SET title = ?, updated_at = NOW() WHERE id = ?',
      [title, convId]
    );
  } else {
    await executeQuery('UPDATE ai_conversations SET updated_at = NOW() WHERE id = ?', [convId]);
  }

  return NextResponse.json({ success: true });
}
