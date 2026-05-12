export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

// 获取某个对话的所有消息
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

    const convId = parseInt(params.id);

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
  } catch (error) {
    return NextResponse.json({ error: '获取消息失败' }, { status: 500 });
  }
}

// 保存消息（user + assistant 一起存）
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: '未授权' }, { status: 401 });

    const convId = parseInt(params.id);
    const body = await request.json();
    const { userMessage, assistantMessage } = body;

    if (!userMessage || !assistantMessage) {
      return NextResponse.json({ error: '消息内容不能为空' }, { status: 400 });
    }
    if (userMessage.length > 10000 || assistantMessage.length > 10000) {
      return NextResponse.json({ error: '消息内容过长' }, { status: 400 });
    }

    const conv = await executeQuery(
      'SELECT id, title FROM ai_conversations WHERE id = ? AND user_id = ?',
      [convId, session.user.id]
    ) as any[];
    if (!conv.length) return NextResponse.json({ error: '对话不存在' }, { status: 404 });

    await executeQuery(
      'INSERT INTO ai_messages (conversation_id, role, content) VALUES (?, "user", ?)',
      [convId, userMessage]
    );

    await executeQuery(
      'INSERT INTO ai_messages (conversation_id, role, content) VALUES (?, "assistant", ?)',
      [convId, assistantMessage]
    );

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
  } catch (error) {
    return NextResponse.json({ error: '保存消息失败' }, { status: 500 });
  }
}
