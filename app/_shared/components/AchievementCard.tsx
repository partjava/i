'use client';

import { Achievement } from '@shared/types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const categoryBadges = {
    notes: 'bg-[#1B3B6F]/10 text-[#1B3B6F] dark:bg-sky-500/15 dark:text-sky-300 border-[#1B3B6F]/15 dark:border-sky-400/25',
    learning: 'bg-amber-500/12 text-amber-700 dark:bg-[#D4AD72]/15 dark:text-[#E8CA96] border-amber-500/20 dark:border-[#D4AD72]/30',
    social: 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300 border-indigo-500/20 dark:border-indigo-400/25',
    special: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-400/25'
  };

  const progressGradients = {
    notes: 'from-[#1B3B6F] to-[#3B82F6]',
    learning: 'from-[#B88E52] to-[#D4AD72]',
    social: 'from-[#6366F1] to-[#818CF8]',
    special: 'from-[#059669] to-[#10B981]'
  };

  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 1;
  const progressPercentage = Math.min((progress / maxProgress) * 100, 100);

  return (
    <div
      className={`group relative flex flex-col justify-between h-full p-4 rounded-2xl border transition-all duration-200 ${
        achievement.unlocked
          ? 'bg-white/95 dark:bg-[#161B24] border-[#D4AD72]/35 dark:border-[#D4AD72]/30 shadow-[0_6px_20px_rgba(21,40,68,0.05)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:border-[#D4AD72]/60'
          : 'bg-slate-50/85 dark:bg-[#131720] border-slate-200/80 dark:border-white/10 opacity-85 hover:opacity-100'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* 成就徽章（低饱和高质感容器） */}
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              categoryBadges[achievement.category]
            } ${!achievement.unlocked ? 'grayscale opacity-75' : ''}`}
          >
            <span className="text-xl leading-none">{achievement.icon}</span>
          </div>

          {/* 右上角状态角标（不遮挡正文文字） */}
          {achievement.unlocked ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#D4AD72]/15 text-[#8A662E] dark:text-[#E6C58D] border border-[#D4AD72]/30">
              <span>已解锁</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-white/[0.07] text-slate-500 dark:text-slate-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>未解锁</span>
            </span>
          )}
        </div>

        {/* 成就信息 */}
        <h4 className="font-semibold text-[15px] text-slate-900 dark:text-[#F2EDE4] mb-1">
          {achievement.name}
        </h4>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-3">
          {achievement.description}
        </p>
      </div>

      {/* 底部：进度条或解锁日期 */}
      <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06]">
        {!achievement.unlocked && achievement.maxProgress ? (
          <div>
            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 tabular-nums">
              <span>达成进度</span>
              <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                {progress}/{maxProgress}
              </span>
            </div>
            <div className="w-full bg-slate-200/80 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${progressGradients[achievement.category]} h-1.5 rounded-full transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
            {achievement.unlocked && achievement.unlockedAt
              ? `解锁于 ${new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}`
              : '已点亮此成就'}
          </div>
        )}
      </div>
    </div>
  );
} 