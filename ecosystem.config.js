module.exports = {
  apps: [
    {
      // Next.js 前端服务 - Standalone 模式（正确配置）
      name: 'frontend',
      script: 'bash',
      args: 'start-standalone.sh',
      cwd: '/home/ecs-user/i',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXTAUTH_URL: 'https://www.partjava.com',
        NEXTAUTH_SECRET: 'your-super-secret-key-here-change-this-in-production',
        DB_HOST: 'localhost',
        DB_USER: 'ecs-user',
        DB_PASSWORD: '123456',
        DB_NAME: 'partjava_notes',
        RAPIDAPI_KEY: '039e43b537msh40765032398a95ep1f61aajsn0321e61fa9d0',
        RAPIDAPI_HOST: 'judge0-ce.p.rapidapi.com',
        NEXT_PUBLIC_AI_API_URL: 'https://www.partjava.com/ai'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/home/ecs-user/i/logs/frontend.log',
      error_file: '/home/ecs-user/i/logs/frontend-error.log',
      out_file: '/home/ecs-user/i/logs/frontend-out.log',
      time: true
    },
    {
      // Python AI 后端服务
      name: 'backend',
      script: '/home/ecs-user/i/partjava-ai/venv/bin/python',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000',
      cwd: '/home/ecs-user/i/partjava-ai',
      env: {
        PYTHONPATH: '/home/ecs-user/i/partjava-ai',
        PORT: 8000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      log_file: '/home/ecs-user/i/logs/backend.log',
      error_file: '/home/ecs-user/i/logs/backend-error.log',
      out_file: '/home/ecs-user/i/logs/backend-out.log',
      time: true
    }
  ]
};