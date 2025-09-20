// API请求缓存和去重机制
interface CacheEntry {
  data: any;
  timestamp: number;
  promise?: Promise<any>;
}

class RequestCache {
  private cache = new Map<string, CacheEntry>();
  private readonly TTL = 30000; // 30秒缓存时间
  private readonly MAX_SIZE = 100; // 最大缓存条目数

  // 生成缓存键
  private getCacheKey(url: string, options: RequestInit): string {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }

  // 检查缓存是否有效
  private isValid(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp < this.TTL;
  }

  // 清理过期缓存
  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now - entry.timestamp >= this.TTL) {
        this.cache.delete(key);
      }
    }
  }

  // 获取缓存数据
  get(url: string, options: RequestInit): any | null {
    const key = this.getCacheKey(url, options);
    const entry = this.cache.get(key);
    
    if (entry && this.isValid(entry)) {
      return entry.data;
    }
    
    return null;
  }

  // 设置缓存数据
  set(url: string, options: RequestInit, data: any): void {
    // 清理过期缓存
    this.cleanup();
    
    // 如果缓存已满，删除最旧的条目
    if (this.cache.size >= this.MAX_SIZE) {
      const oldestKey = Array.from(this.cache.keys())[0];
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
    
    const key = this.getCacheKey(url, options);
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // 设置进行中的请求
  setPending(url: string, options: RequestInit, promise: Promise<any>): void {
    const key = this.getCacheKey(url, options);
    this.cache.set(key, {
      data: null,
      timestamp: Date.now(),
      promise
    });
  }

  // 获取进行中的请求
  getPending(url: string, options: RequestInit): Promise<any> | null {
    const key = this.getCacheKey(url, options);
    const entry = this.cache.get(key);
    return entry?.promise || null;
  }

  // 清除特定缓存
  clear(url?: string): void {
    if (url) {
      // 清除特定URL的所有缓存
      const keys = Array.from(this.cache.keys());
      for (const key of keys) {
        if (key.includes(url)) {
          this.cache.delete(key);
        }
      }
    } else {
      // 清除所有缓存
      this.cache.clear();
    }
  }
}

// 全局缓存实例
export const requestCache = new RequestCache();

// 带缓存的fetch函数
export async function cachedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // 只缓存GET请求
  if (options.method && options.method !== 'GET') {
    return fetch(url, options);
  }

  // 检查是否有进行中的相同请求
  const pendingPromise = requestCache.getPending(url, options);
  if (pendingPromise) {
    return pendingPromise;
  }

  // 检查缓存
  const cachedData = requestCache.get(url, options);
  if (cachedData) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 发起新请求
  const promise = fetch(url, options).then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      requestCache.set(url, options, data);
    }
    return response;
  });

  // 设置进行中的请求
  requestCache.setPending(url, options, promise);

  return promise;
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
