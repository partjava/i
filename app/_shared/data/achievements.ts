import { Achievement } from '@shared/types/achievement';

// 成就定义
export const ACHIEVEMENTS_CONFIG: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // 笔记相关成就
  {
    id: 'first_note',
    name: '初出茅庐',
    description: '发布第一篇笔记',
    icon: '📝',
    category: 'notes',
    maxProgress: 1
  },
  {
    id: 'notes_10',
    name: '笔记新手',
    description: '发布10篇笔记',
    icon: '📚',
    category: 'notes',
    maxProgress: 10
  },
  {
    id: 'notes_50',
    name: '笔记达人',
    description: '发布50篇笔记',
    icon: '📖',
    category: 'notes',
    maxProgress: 50
  },
  {
    id: 'notes_100',
    name: '笔记大师',
    description: '发布100篇笔记',
    icon: '🎓',
    category: 'notes',
    maxProgress: 100
  },
  
  // 学习相关成就
  {
    id: 'streak_7',
    name: '坚持一周',
    description: '连续7天学习',
    icon: '🔥',
    category: 'learning',
    maxProgress: 7
  },
  {
    id: 'streak_30',
    name: '月度学霸',
    description: '连续30天学习',
    icon: '💪',
    category: 'learning',
    maxProgress: 30
  },
  {
    id: 'streak_100',
    name: '百日筑基',
    description: '连续100天学习',
    icon: '🏆',
    category: 'learning',
    maxProgress: 100
  },
  {
    id: 'early_bird',
    name: '早起鸟儿',
    description: '早上6点前开始学习10次',
    icon: '🌅',
    category: 'learning',
    maxProgress: 10
  },
  {
    id: 'night_owl',
    name: '夜猫子',
    description: '晚上11点后还在学习10次',
    icon: '🦉',
    category: 'learning',
    maxProgress: 10
  },
  
  // 社交相关成就
  {
    id: 'first_share',
    name: '分享新手',
    description: '第一次公开分享笔记',
    icon: '🌟',
    category: 'social',
    maxProgress: 1
  },
  {
    id: 'popular_note',
    name: '人气作者',
    description: '单篇笔记浏览量超过100',
    icon: '👁️',
    category: 'social',
    maxProgress: 100
  },
  {
    id: 'helpful_user',
    name: '乐于助人',
    description: '获得10个赞',
    icon: '👍',
    category: 'social',
    maxProgress: 10
  },
  
  // 特殊成就
  {
    id: 'perfectionist',
    name: '完美主义者',
    description: '连续7天每天学习超过2小时',
    icon: '💎',
    category: 'special',
    maxProgress: 7
  },
  {
    id: 'knowledge_hunter',
    name: '知识猎人',
    description: '在5个不同领域发布笔记',
    icon: '🎯',
    category: 'special',
    maxProgress: 5
  },
  {
    id: 'comeback_king',
    name: '王者归来',
    description: '中断后重新开始连续学习7天',
    icon: '👑',
    category: 'special',
    maxProgress: 7
  }
]; 