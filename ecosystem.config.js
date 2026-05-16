module.exports = {
  apps: [
    {
      name: 'frontend',
      script: '.next/standalone/server.js',
      interpreter: 'node',
      cwd: '/root/aidnz/i',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://www.partjava.com',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_USER: process.env.DB_USER || 'ecs-user',
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME || 'partjava_notes',
        RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
        RAPIDAPI_HOST: process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com',
        NEXT_PUBLIC_AI_API_URL: process.env.NEXT_PUBLIC_AI_API_URL || 'https://www.partjava.com/ai'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/root/aidnz/i/logs/frontend.log',
      error_file: '/root/aidnz/i/logs/frontend-error.log',
      out_file: '/root/aidnz/i/logs/frontend-out.log',
      time: true
    },
    {
      name: 'backend',
      script: '/root/aidnz/i/partjava-ai/venv/bin/python',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000',
      cwd: '/root/aidnz/i/partjava-ai',
      interpreter: 'none',
      env: {
        PYTHONPATH: '/root/aidnz/i/partjava-ai',
        PORT: 8000,
        DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      log_file: '/root/aidnz/i/logs/backend.log',
      error_file: '/root/aidnz/i/logs/backend-error.log',
      out_file: '/root/aidnz/i/logs/backend-out.log',
      time: true
    }
  ]
};
