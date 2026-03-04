// 缓存装饰器 - 自动缓存数据库查询结果
import cacheService from './redis';

export function Cacheable(ttl: number = 300000) { // 默认 5 分钟
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // 生成缓存键
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
      
      // 尝试从缓存获取
      const cached = await cacheService.get(cacheKey);
      if (cached !== null) {
        console.log(`✅ 缓存命中: ${cacheKey}`);
        return cached;
      }

      // 执行原始方法
      console.log(`❌ 缓存未命中，查询数据库: ${cacheKey}`);
      const result = await originalMethod.apply(this, args);

      // 存入缓存
      if (result !== null && result !== undefined) {
        await cacheService.set(cacheKey, result, ttl);
      }

      return result;
    };

    return descriptor;
  };
}

// 清除缓存装饰器
export function ClearCache(patterns: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      // 清除相关缓存
      for (const pattern of patterns) {
        await cacheService.delPattern(pattern);
      }

      return result;
    };

    return descriptor;
  };
}
