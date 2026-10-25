import { defineConfig } from 'vitest/config';
import path from 'node:path';

/**
 * Vitest 配置：路径别名与 tsconfig 保持一致（@/*、@shared/*）
 * 测试环境为 node（被测对象为纯逻辑层，无 DOM 依赖）
 */
export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@shared': path.resolve(__dirname, 'app/_shared'),
    },
  },
});
