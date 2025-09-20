'use client';

import { Achievement } from '@/app/types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const categoryColors = {
    notes: 'from-blue-400 to-blue-600',
    learning: 'from-orange-400 to-orange-600',
    social: 'from-purple-400 to-purple-600',
    special: 'from-yellow-400 to-yellow-600'
  };
  
  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 1;
  const progressPercentage = Math.min((progress / maxProgress) * 100, 100);
  
  return (
    <div className={`relative p-4 rounded-xl border ${
      achievement.unlocked 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gray-50 border-gray-200 opacity-60'
    } hover:shadow-md transition-all duration-200`}>
      {/* 成就图标 */}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
        categoryColors[achievement.category]
      } flex items-center justify-center mb-3 ${
        !achievement.unlocked ? 'grayscale' : ''
      }`}>
        <span className="text-2xl">{achievement.icon}</span>
      </div>
      
      {/* 成就信息 */}
      <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
      
      {/* 进度条 */}
      {!achievement.unlocked && achievement.maxProgress && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>进度</span>
            <span>{progress}/{maxProgress}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${categoryColors[achievement.category]} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      
      {/* 解锁时间 */}
      {achievement.unlocked && achievement.unlockedAt && (
        <div className="text-xs text-gray-500 mt-2">
          解锁于 {new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}
        </div>
      )}
      
      {/* 未解锁遮罩 */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl">
          <svg className="w-8 h-8 text-gray-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
} 