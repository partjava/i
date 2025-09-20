'use server';
/**
 * 数据适配器 - 统一处理各种API响应格式
 * 解决数据格式不一致的问题
 */

// 统一的笔记数据结构
export interface UnifiedNote {
  id: string;
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  authorId?: string;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
}

// 统一的用户统计数据结构
export interface UnifiedUserStats {
  notes: {
    total: number;
    public: number;
    private: number;
    firstNoteDate: string;
    lastActivityDate: string;
  };
  engagement: {
    likesReceived: number;
    bookmarksReceived: number;
    commentsReceived: number;
  };
  learning: {
    categoriesStudied: number;
    technologiesStudied: number;
    totalStudyTime: number;
    studyDays: number;
    studyDaysTotal: number;
  };
  achievements: {
    total: number;
    earned: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    content: string; // 添加content字段以兼容现有接口
    date: string;
  }>;
  monthlyStats: Array<{
    month: string;
    notes: number;
    studyTime: number;
  }>;
}

// 统一的热力图数据结构
export interface UnifiedHeatmapData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0-4 表示活跃度级别
}

// 标准化API响应
export async function normalizeApiResponse<T>(response: any): Promise<T> {
  // 处理嵌套的数据结构
  if (response && response.data) {
    return response.data as T;
  }
  
  // 直接返回数据
  return response as T;
}

// 标准化笔记数据
export async function normalizeNote(note: Record<string, any>): Promise<UnifiedNote> {
  return {
    id: String(note._id || note.id || ''),
    title: note.title || '',
    content: note.content || '',
    category: note.category || '',
    technology: note.technology || '',
    subcategory: note.subcategory || '',
    tags: Array.isArray(note.tags) ? note.tags : [],
    isPublic: Boolean(note.isPublic),
    createdAt: note.createdAt || new Date().toISOString(),
    updatedAt: note.updatedAt || new Date().toISOString(),
    authorName: note.author_name || note.authorName || '',
    authorId: String(note.author_id || note.authorId || ''),
    likeCount: Number(note.likeCount || note.like_count || 0),
    bookmarkCount: Number(note.bookmarkCount || note.bookmark_count || 0),
    commentCount: Number(note.commentCount || note.comment_count || 0)
  };
}

// 标准化笔记列表
export async function normalizeNotes(data: any): Promise<{ notes: UnifiedNote[], pagination?: any }> {
  // 处理不同的响应格式
  let notes = [];
  let pagination = null;
  
  if (Array.isArray(data)) {
    // 直接是数组格式
    notes = data;
  } else if (data && Array.isArray(data.notes)) {
    // { notes: [], pagination: {} } 格式
    notes = data.notes;
    pagination = data.pagination;
  } else if (data && data.data && Array.isArray(data.data.notes)) {
    // { data: { notes: [], pagination: {} } } 格式
    notes = data.data.notes;
    pagination = data.data.pagination;
  }
  
  // 标准化每个笔记对象
  const notesPromises = notes.map((note: Record<string, any>) => normalizeNote(note));
  const normalizedNotes = await Promise.all(notesPromises);
  
  return {
    notes: normalizedNotes,
    pagination
  };
}

// 标准化用户统计数据
export async function normalizeUserStats(data: any): Promise<UnifiedUserStats> {
  // 处理嵌套数据结构
  const stats = data && data.data ? data.data : data;
  
  // 创建默认的空统计数据
  const defaultStats: UnifiedUserStats = {
    notes: { 
      total: 0, 
      public: 0, 
      private: 0, 
      firstNoteDate: '', 
      lastActivityDate: '' 
    },
    engagement: { 
      likesReceived: 0, 
      bookmarksReceived: 0, 
      commentsReceived: 0 
    },
    learning: { 
      categoriesStudied: 0, 
      technologiesStudied: 0, 
      totalStudyTime: 0, 
      studyDays: 0, 
      studyDaysTotal: 0 
    },
    achievements: { 
      total: 10, 
      earned: 0 
    },
    recentActivity: [],
    monthlyStats: []
  };
  
  // 如果没有数据，返回默认值
  if (!stats) return defaultStats;
  
  // 标准化笔记统计
  const notes = stats.notes || {};
  defaultStats.notes = {
    total: Number(notes.total || notes.totalNotes || 0),
    public: Number(notes.public || notes.publicNotes || 0),
    private: Number(notes.private || notes.privateNotes || 0),
    firstNoteDate: notes.firstNoteDate || notes.first_note_date || '',
    lastActivityDate: notes.lastActivityDate || notes.last_activity_date || ''
  };
  
  // 标准化互动统计
  const engagement = stats.engagement || {};
  defaultStats.engagement = {
    likesReceived: Number(engagement.likesReceived || engagement.likes_received || 0),
    bookmarksReceived: Number(engagement.bookmarksReceived || engagement.bookmarks_received || 0),
    commentsReceived: Number(engagement.commentsReceived || engagement.comments_received || 0)
  };
  
  // 标准化学习统计
  const learning = stats.learning || {};
  defaultStats.learning = {
    categoriesStudied: Number(learning.categoriesStudied || learning.categories_studied || 0),
    technologiesStudied: Number(learning.technologiesStudied || learning.technologies_studied || 0),
    totalStudyTime: Number(learning.totalStudyTime || learning.total_study_time || 0),
    studyDays: Number(learning.studyDays || learning.study_days || 0),
    studyDaysTotal: Number(learning.studyDaysTotal || learning.study_days_total || 0)
  };
  
  // 标准化成就统计
  const achievements = stats.achievements || {};
  defaultStats.achievements = {
    total: Number(achievements.total || 10),
    earned: Number(achievements.earned || 0)
  };
  
  // 标准化最近活动
  if (Array.isArray(stats.recentActivity)) {
    defaultStats.recentActivity = stats.recentActivity.map((activity: any) => ({
      id: String(activity.id || activity._id || ''),
      type: activity.type || '',
      title: activity.title || '',
      content: activity.content || activity.description || activity.title || '',
      date: activity.date || activity.createdAt || ''
    }));
  }
  
  // 标准化月度统计
  if (Array.isArray(stats.monthlyStats)) {
    defaultStats.monthlyStats = stats.monthlyStats.map((stat: any) => ({
      month: stat.month || '',
      notes: Number(stat.notes || stat.notes_count || 0),
      studyTime: Number(stat.studyTime || stat.study_time || 0)
    }));
  }
  
  return defaultStats;
}

// 标准化热力图数据
export async function normalizeHeatmapData(data: any): Promise<UnifiedHeatmapData[]> {
  // 处理嵌套数据结构
  let heatmapData = [];
  
  if (data && Array.isArray(data.heatmapData)) {
    heatmapData = data.heatmapData;
  } else if (data && data.data && Array.isArray(data.data.heatmapData)) {
    heatmapData = data.data.heatmapData;
  } else if (Array.isArray(data)) {
    heatmapData = data;
  }
  
  // 标准化每个热力图数据点
  return heatmapData.map((item: any) => {
    const count = Number(item.count || 0);
    // 根据count计算level
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) {
      if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 10) level = 3;
      else level = 4;
    }
    
    return {
      date: item.date || '',
      count: count,
      level: item.level !== undefined ? (item.level as 0 | 1 | 2 | 3 | 4) : level
    };
  });
}

// 统一API调用函数
export async function fetchWithUnifiedResponse<T>(
  url: string, 
  options?: RequestInit,
  normalizer?: (data: any) => T
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    
    if (!response.ok) {
      throw new Error(`API错误: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 处理特殊的Base64编码输出结果
    if (data && typeof data === 'string' && data.match(/^[A-Za-z0-9+/=]+$/)) {
      try {
        const decodedData = JSON.parse(atob(data));
        
        // 如果提供了标准化函数，使用它处理解码后的数据
        if (normalizer) {
          return normalizer(decodedData);
        }
        
        // 否则使用通用标准化
        return normalizeApiResponse<T>(decodedData);
      } catch (decodeError) {
        console.error('Base64解码失败:', decodeError);
        // 解码失败，继续处理原始数据
      }
    }
    
    // 如果提供了标准化函数，使用它处理数据
    if (normalizer) {
      return normalizer(data);
    }
    
    // 否则使用通用标准化
    return normalizeApiResponse<T>(data);
  } catch (error) {
    console.error(`请求 ${url} 失败:`, error);
    throw error;
  }
}
