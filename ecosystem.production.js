module.exports = {
  apps: [
    {
      // Next.js 前端服务 - 标准生产模式
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/dbuser/i',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXTAUTH_URL: 'https://www.partjava.com',
        NEXTAUTH_SECRET: 'REDACTED-NEXTAUTH-SECRET=',
        DB_HOST: 'localhost',
        DB_USER: 'dbuser',
        DB_PASSWORD: 'REDACTED',
        DB_NAME: 'partjava_notes',
        RAPIDAPI_KEY: 'REDACTED-JUDGE0-KEY',
        RAPIDAPI_HOST: 'judge0-ce.p.rapidapi.com',
        NEXT_PUBLIC_AI_API_URL: 'https://www.partjava.com/ai'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/home/dbuser/i/logs/frontend.log',
      error_file: '/home/dbuser/i/logs/frontend-error.log',
      out_file: '/home/dbuser/i/logs/frontend-out.log',
      time: true
    },
    {
      // Python AI 后端服务
      name: 'backend',
      script: '/home/dbuser/i/partjava-ai/venv/bin/python',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000',
      cwd: '/home/dbuser/i/partjava-ai',
      env: {
        PYTHONPATH: '/home/dbuser/i/partjava-ai',
        PORT: 8000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      log_file: '/home/dbuser/i/logs/backend.log',
      error_file: '/home/dbuser/i/logs/backend-error.log',
      out_file: '/home/dbuser/i/logs/backend-out.log',
      time: true
    }
  ]
};

