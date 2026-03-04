// Redis 缓存配置（可选，但强烈推荐）
// 安装: npm install ioredis
// 如果不想用 Redis，可以用内存缓存

import { LRUCache } from 'lru-cache';

// 内存缓存（无需额外服务）
const cache = new LRUCache<string, any>({
  max: 500, // 最多缓存 500 个项目
  ttl: 1000 * 60 * 5, // 5 分钟过期
  updateAgeOnGet: true,
  updateAgeOnHas: true,
});

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    return cache.get(key) as T || null;
  },

  async set(key: string, value: any, ttl?: number): Promise<void> {
    cache.set(key, value, { ttl: ttl || 1000 * 60 * 5 });
  },

  async del(key: string): Promise<void> {
    cache.delete(key);
  },

  async clear(): Promise<void> {
    cache.clear();
  },

  // 批量删除（支持模式匹配）
  async delPattern(pattern: string): Promise<void> {
    const keys = Array.from(cache.keys());
    const regex = new RegExp(pattern.replace('*', '.*'));
    keys.forEach(key => {
      if (regex.test(key)) {
        cache.delete(key);
      }
    });
  }
};

export default cacheService;
