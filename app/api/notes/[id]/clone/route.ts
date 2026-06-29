import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);
  const noteId = parseInt(params.id);

  // 查询当前用户的 VIP 等级
  const userRows = await executeQuery(
    'SELECT vip_level, vip_expire_time FROM users WHERE id = ?',
    [userId]
  ) as { vip_level: number; vip_expire_time: string | null }[];

  if (!userRows || userRows.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const { vip_level, vip_expire_time } = userRows[0];

  // 检查 VIP 等级 >= 2（进阶会员或永久共创会员）且未过期
  const isVipValid = vip_level >= 2 && (
    vip_level === 3 || // 永久会员
    (vip_expire_time && new Date(vip_expire_time) > new Date())
  );

  if (!isVipValid) {
    return NextResponse.json(
      { error: '笔记复用功能需要进阶 VIP（¥9.99）或以上会员资格，请升级后再试！' },
      { status: 403 }
    );
  }

  // 查询原始笔记（必须是公开的）
  const noteRows = await executeQuery(
    'SELECT title, content, category, technology, subcategory, tags, author_id FROM notes WHERE id = ? AND is_public = TRUE',
    [noteId]
  ) as { title: string; content: string; category: string; technology: string; subcategory: string; tags: string; author_id: number }[];

  if (!noteRows || noteRows.length === 0) {
    return NextResponse.json({ error: '笔记不存在或不是公开笔记，无法复用' }, { status: 404 });
  }

  const original = noteRows[0];

  // 禁止复用自己的笔记
  if (original.author_id === userId) {
    return NextResponse.json({ error: '不能复用自己的笔记' }, { status: 400 });
  }

  // 插入新笔记（复用内容，作者改为当前用户，标题加 "[复用]" 前缀，私密模式）
  const result = await executeQuery(
    `INSERT INTO notes (title, content, category, technology, subcategory, tags, author_id, is_public)
     VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
    [
      `[复用] ${original.title}`,
      original.content,
      original.category,
      original.technology,
      original.subcategory,
      original.tags,
      userId,
    ]
  ) as { insertId: number };

  return NextResponse.json({
    success: true,
    message: '笔记已成功复用！已保存至您的私人笔记库。',
    newNoteId: result.insertId,
  });
}
