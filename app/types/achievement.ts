// 成就类型定义
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'notes' | 'learning' | 'social' | 'special';
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

// 学习统计类型
export interface LearningStats {
  todayMinutes: number;
  weekMinutes: number;
  monthMinutes: number;
  streak: number;
  longestStreak: number;
  totalDays: number;
  mostActiveHour: number;
  heatmapData: HeatmapData[];
}

// 热力图数据类型
export interface HeatmapData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0-4 表示活跃度级别
} 