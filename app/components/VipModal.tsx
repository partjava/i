'use client';

import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { useAuth } from '@/app/hooks/useAuth';

interface VipModalProps {
  open: boolean;
  onClose: () => void;
  currentVipLevel?: number;
  onActivated?: () => void;
}

const PLANS = [
  {
    level: 1,
    price: '¥1.99',
    duration: '3个月',
    title: '体验 VIP',
    emoji: '👑',
    color: 'from-yellow-600 to-yellow-400',
    borderColor: 'border-yellow-500/50',
    glowColor: 'shadow-yellow-500/20',
    badge: '入门首选',
    features: [
      '✨ 全站金色尊贵用户名',
      '💬 金色外框评论高亮',
      '📊 创建个人算法可视化页面',
      '⚡ 解锁全站高阶算法挑战关卡',
      '🤖 每日 5 次 AI 导师优先提问',
    ],
    notIncluded: ['彩色霓虹昵称', '复用他人笔记', '发布挑战关卡'],
  },
  {
    level: 2,
    price: '¥9.99',
    duration: '3个月',
    title: '进阶 VIP',
    emoji: '🌟',
    color: 'from-purple-600 via-blue-500 to-cyan-400',
    borderColor: 'border-purple-400/50',
    glowColor: 'shadow-purple-500/20',
    badge: '最受欢迎',
    features: [
      '✅ 包含体验 VIP 全部特权',
      '🎨 动态炫彩霓虹渐变昵称',
      '📋 一键复用/克隆别人公开笔记',
      '✏️ 随意评论他人发布笔记',
      '🚀 自主发布与设计挑战关卡',
      '🔍 生成专属网站优化方向诊断报告',
    ],
    notIncluded: ['作者一对一指导'],
  },
  {
    level: 3,
    price: '¥99.99',
    duration: '永久有效',
    title: '永久共创 VIP',
    emoji: '🔥',
    color: 'from-red-500 via-orange-400 to-yellow-300',
    borderColor: 'border-orange-400/60',
    glowColor: 'shadow-orange-500/30',
    badge: '极客专属',
    warning: '⚠️ 非极客爱好者请勿购买',
    features: [
      '✅ 包含所有 VIP 特权（永久有效）',
      '📱 添加作者微信，获取一对一技术指导',
      '💻 指导使用 Codex & Claude Code 开发',
      '🧱 共创者壁画墙永久刻名',
      '🎁 优先体验平台一切新功能',
      '🏆 杰出共建者专属荣誉认证',
    ],
    notIncluded: [],
  },
];

export default function VipModal({ open, onClose, currentVipLevel = 0, onActivated }: VipModalProps) {
  const { data: session } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number>(2);

  const handleActivate = async (level: number) => {
    if (!session?.user) {
      message.error('请先登录后再开通会员');
      return;
    }

    setLoading(level);
    try {
      const res = await fetch('/api/user/activate-vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        message.success(data.message || '🎉 恭喜您已成功开通尊贵 VIP 会员！');
        onActivated?.();
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        message.error(data.error || '开通失败，请稍后再试');
      }
    } catch {
      message.error('网络错误，请稍后再试');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={860}
      centered
      styles={{
        mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.7)' },
        content: {
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1730 50%, #0a1628 100%)',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          boxShadow: '0 0 60px rgba(250, 204, 21, 0.1), 0 0 120px rgba(168, 85, 247, 0.05)',
          borderRadius: '20px',
          padding: '0',
        },
      }}
    >
      <div className="p-8">
        {/* 顶部标题区 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
            <span className="text-yellow-400 text-sm font-semibold tracking-widest">PARTJAVA VIP</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            👑 尊贵会员中心
          </h2>
          <p className="text-slate-400 text-sm">
            解锁专属特权，与顶尖极客一同共创未来
          </p>
          {currentVipLevel > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">
                您当前是 {PLANS[currentVipLevel - 1]?.title}
              </span>
            </div>
          )}
        </div>

        {/* 三档套餐卡片 */}
        {success ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">开通成功！</h3>
            <p className="text-slate-400">尊贵特权即刻生效，感谢您的支持！</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {PLANS.map((plan) => {
              const isCurrentPlan = currentVipLevel === plan.level;
              const isLowerPlan = currentVipLevel > plan.level;
              return (
                <div
                  key={plan.level}
                  onClick={() => setSelectedLevel(plan.level)}
                  className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${plan.borderColor} ${plan.glowColor} shadow-xl
                    ${selectedLevel === plan.level ? 'ring-2 ring-offset-1 ring-offset-transparent scale-[1.02]' : 'hover:scale-[1.01]'}
                    ${plan.level === 2 ? 'ring-purple-400' : plan.level === 3 ? 'ring-orange-400' : 'ring-yellow-400'}
                  `}
                  style={{ background: 'rgba(15, 20, 40, 0.8)' }}
                >
                  {/* 推荐标签 */}
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${plan.color} text-white whitespace-nowrap`}>
                      {plan.badge}
                    </div>
                  )}

                  {/* 套餐标题 */}
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-1">{plan.emoji}</div>
                    <div className={`text-lg font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.title}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{plan.duration}</div>
                  </div>

                  {/* 价格 */}
                  <div className="text-center mb-4">
                    <span className={`text-4xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.price}
                    </span>
                  </div>

                  {/* 特权列表 */}
                  <ul className="space-y-1.5 mb-5 text-xs text-slate-300">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">{f}</li>
                    ))}
                    {plan.notIncluded.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-slate-600 line-through">❌ {f}</li>
                    ))}
                  </ul>

                  {/* 警告提示 */}
                  {plan.warning && (
                    <p className="text-orange-400/70 text-xs text-center mb-3">{plan.warning}</p>
                  )}

                  {/* 开通按钮 */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleActivate(plan.level); }}
                    disabled={loading !== null || isCurrentPlan || isLowerPlan}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                      ${isCurrentPlan ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default' :
                        isLowerPlan ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed' :
                        `bg-gradient-to-r ${plan.color} text-white hover:opacity-90 hover:scale-105 shadow-lg`}
                    `}
                  >
                    {loading === plan.level ? '开通中...' :
                      isCurrentPlan ? '✅ 当前套餐' :
                      isLowerPlan ? '已超越此档' :
                      '立即开通'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* 共创者荣誉墙 */}
        <div className="mt-8 p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5">
          <div className="text-center text-xs text-yellow-400/70 mb-3 font-semibold tracking-widest">🧱 永久共创者荣誉墙</div>
          <div className="flex flex-wrap justify-center gap-2">
            {['liming', 'coder_elite', 'java_master', 'ai_builder', 'partjava_fan'].map((name) => (
              <span
                key={name}
                className="px-2.5 py-1 rounded-full text-xs font-mono text-orange-300 bg-orange-500/10 border border-orange-500/20"
              >
                @{name}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-full text-xs text-slate-600 border border-slate-700/50">
              + 更多共创者...
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
