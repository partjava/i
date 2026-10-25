/**
 * PM2 进程配置模板（生产环境）
 * ============================================================
 * 用法：
 *   1. cp ecosystem.config.example.js ecosystem.config.js
 *   2. 把所有 your-xxx 占位符替换为真实值（真实配置保存在私有数据仓
 *      partjavadata/secrets/ecosystem.config.js，严禁提交到本仓库）
 *   3. pm2 start ecosystem.config.js
 *
 * 依赖服务：MySQL 8.0（partjava_notes 库，schema 见 scripts/schema.sql）
 *          Redis 7.x
 * 可选服务：Python FastAPI 四大智能体（partjava-ai/，未启动时前端自动降级）
 * ============================================================
 */

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: '.next/standalone/server.js',
      interpreter: 'node',
      cwd: '/your/deploy/path/i',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        // 数据库（Next.js 中间件等读取）
        DB_HOST: 'localhost',
        DB_USER: 'your-db-user',
        DB_PASSWORD: 'your-db-password',
        DB_NAME: 'partjava_notes',
        // DeepSeek（四大智能体）
        DEEPSEEK_API_KEY: 'your-deepseek-api-key',
        DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
        // 可选：Python FastAPI 智能体服务地址（未启动自动走 Next.js 内置 Agent 引擎）
        FASTAPI_AGENT_URL: 'http://127.0.0.1:8000'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/your/deploy/path/i/logs/frontend.log',
      error_file: '/your/deploy/path/i/logs/frontend-error.log',
      out_file: '/your/deploy/path/i/logs/frontend-out.log',
      time: true
    },
    {
      name: 'java-backend',
      script: 'java',
      args: '-jar partjava-backend/target/partjava-backend-1.0.0.jar',
      cwd: '/your/deploy/path/i',
      env: {
        SERVER_PORT: 8080,
        // 数据库
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USER: 'your-db-user',
        DB_PASSWORD: 'your-db-password',
        DB_NAME: 'partjava_notes',
        // Redis
        SPRING_REDIS_HOST: 'localhost',
        SPRING_REDIS_PORT: 6379,
        // JWT 签名密钥（必须配置！未配置时启动生成一次性随机密钥，重启后登录态失效）
        JWT_SECRET: 'your-jwt-secret-at-least-32-bytes',
        // 代码沙箱
        JUDGE0_API_KEY: 'your-judge0-api-key',
        JUDGE0_API_HOST: 'judge0-ce.p.rapidapi.com',
        // AI
        AI_API_KEY: 'your-deepseek-api-key',
        AI_API_URL: 'https://api.deepseek.com/v1'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/your/deploy/path/i/logs/java-backend.log',
      error_file: '/your/deploy/path/i/logs/java-backend-error.log',
      out_file: '/your/deploy/path/i/logs/java-backend.out.log',
      time: true
    }
  ]
};
