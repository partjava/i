import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { executeQuery } from '@/app/lib/database';

// VIP 套餐配置
const VIP_PLANS = {
  1: { name: '体验 VIP', price: 1.99, days: 90 },      // 3个月
  2: { name: '进阶 VIP', price: 9.99, days: 90 },      // 3个月
  3: { name: '永久共创 VIP', price: 99.99, days: null }, // 永久
};

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 });
  }

  const userId = parseInt(session.user.id);
  const body = await request.json();
  const level = parseInt(body.level);

  if (![1, 2, 3].includes(level)) {
    return NextResponse.json({ error: '无效的会员套餐' }, { status: 400 });
  }

  const plan = VIP_PLANS[level as keyof typeof VIP_PLANS];

  // 查询当前用户的 VIP 状态
  const userRows = await executeQuery(
    'SELECT vip_level, vip_expire_time FROM users WHERE id = ?',
    [userId]
  ) as { vip_level: number; vip_expire_time: string | null }[];

  if (!userRows || userRows.length === 0) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const current = userRows[0];

  let expireTime: string;

  if (plan.days === null) {
    // 永久会员：设为 9999-12-31
    expireTime = '9999-12-31 23:59:59';
  } else {
    // 有期限会员：顺延累计
    const baseTime = current.vip_expire_time && new Date(current.vip_expire_time) > new Date()
      ? new Date(current.vip_expire_time)
      : new Date();
    baseTime.setDate(baseTime.getDate() + plan.days);
    expireTime = baseTime.toISOString().slice(0, 19).replace('T', ' ');
  }

  // 等级只升不降（已经是更高级别时保留原级别）
  const newLevel = Math.max(current.vip_level || 0, level);

  await executeQuery(
    'UPDATE users SET vip = 1, vip_level = ?, vip_expire_time = ? WHERE id = ?',
    [newLevel, expireTime, userId]
  );

  return NextResponse.json({
    success: true,
    message: `恭喜您成功开通【${plan.name}】！`,
    vip: true,
    vipLevel: newLevel,
    vipExpireTime: expireTime,
  });
}
