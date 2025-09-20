// 简单的内存缓存实现
class MemoryCache {
  private cache = new Map<string, { data: any; expiry: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5分钟默认TTL

  // 设置缓存
  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { data, expiry });
  }

  // 获取缓存
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // 检查是否过期
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // 删除缓存
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // 清空缓存
  clear(): void {
    this.cache.clear();
  }

  // 清理过期缓存
  cleanup(): void {
    const now = Date.now();
    const keys = Array.from(this.cache.keys());
    for (const key of keys) {
      const value = this.cache.get(key);
      if (value && now > value.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // 获取缓存统计
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// 创建全局缓存实例
const cache = new MemoryCache();

// 定期清理过期缓存（每5分钟）
setInterval(() => {
  cache.cleanup();
}, 5 * 60 * 1000);

// 缓存键生成器
export const CacheKeys = {
  // 用户相关
  userProfile: (userId: string) => `user:profile:${userId}`,
  userStats: (userId: string) => `user:stats:${userId}`,
  userAchievements: (userId: string) => `user:achievements:${userId}`,
  
  // 笔记相关
  notesList: (userId: string, page: number, filter: string) => `notes:list:${userId}:${page}:${filter}`,
  noteDetail: (noteId: string) => `note:detail:${noteId}`,
  notesCount: (userId: string, filter: string) => `notes:count:${userId}:${filter}`,
  
  // 搜索相关
  searchResults: (query: string, type: string, page: number) => `search:${type}:${query}:${page}`,
  searchHistory: (userId: string) => `search:history:${userId}`,
  
  // 统计相关
  noteStats: (noteId: string) => `note:stats:${noteId}`,
  publicNotes: (page: number) => `notes:public:${page}`,
};

// 缓存装饰器函数
export function withCache<T>(
  key: string,
  fetchFunction: () => Promise<T>,
  ttl?: number
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      // 尝试从缓存获取
      const cached = cache.get<T>(key);
      if (cached !== null) {
        console.log(`🔄 缓存命中: ${key}`);
        resolve(cached);
        return;
      }

      // 缓存未命中，执行函数
      console.log(`🔍 缓存未命中，执行查询: ${key}`);
      const result = await fetchFunction();
      
      // 存入缓存
      cache.set(key, result, ttl);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 缓存失效函数
export const invalidateCache = {
  // 用户相关缓存失效
  user: (userId: string) => {
    cache.delete(CacheKeys.userProfile(userId));
    cache.delete(CacheKeys.userStats(userId));
    cache.delete(CacheKeys.userAchievements(userId));
  },
  
  // 笔记相关缓存失效
  notes: (userId: string) => {
    // 清除用户笔记列表缓存
    const stats = cache.getStats();
    stats.keys.forEach(key => {
      if (key.startsWith(`notes:list:${userId}`) || key.startsWith('notes:public:')) {
        cache.delete(key);
      }
    });
  },
  
  // 单个笔记缓存失效
  note: (noteId: string) => {
    cache.delete(CacheKeys.noteDetail(noteId));
    cache.delete(CacheKeys.noteStats(noteId));
    // 清除相关的笔记列表缓存
    const stats = cache.getStats();
    stats.keys.forEach(key => {
      if (key.startsWith('notes:list:') || key.startsWith('notes:public:')) {
        cache.delete(key);
      }
    });
  },
  
  // 搜索缓存失效
  search: (query?: string) => {
    const stats = cache.getStats();
    stats.keys.forEach(key => {
      if (key.startsWith('search:')) {
        if (!query || key.includes(query)) {
          cache.delete(key);
        }
      }
    });
  },
  
  // 清除所有缓存
  all: () => {
    cache.clear();
  }
};

export default cache; 