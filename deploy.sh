#!/bin/bash
# ============================================
# PartJava 部署/启动脚本

# 自动修复执行权限（防止 git 丢失可执行位）
if [ ! -x "$0" ]; then
  chmod +x "$0"
  echo "🔧 已修复执行权限，请重新运行: ./$(basename "$0")"
  exit 0
fi
#
# 生产环境:
#   ./deploy.sh          — 全新构建 + 部署 (需要 pm2 + ecosystem.config.js)
#   ./deploy.sh quick    — 快速重启 (不重新构建)
#
# 开发环境:
#   ./deploy.sh dev      — 本地一键启动前后端
# ============================================

set -e

MODE="${1:-build}"

case "$MODE" in
  build)
    echo "🔨 全新构建部署..."
    rm -rf .next
    npm run build
    mkdir -p .next/standalone/.next
    cp -r .next/static/. .next/standalone/.next/static/
    cp -r public/. .next/standalone/public/

    # 重启服务
    echo "🔄 重启服务..."
    pm2 delete all 2>/dev/null || true
    sleep 2
    if [ -f ecosystem.config.js ]; then
      pm2 start ecosystem.config.js
    else
      echo "⚠️  未找到 ecosystem.config.js，请手动启动"
      exit 1
    fi
    pm2 list
    ;;
  quick)
    echo "⚡ 快速重启..."
    if [ ! -d ".next" ]; then
      echo "❌ 没有现有构建，请先执行 ./deploy.sh"
      exit 1
    fi
    [ ! -d ".next/standalone/public" ] && cp -r public .next/standalone/
    [ ! -d ".next/standalone/.next/static" ] && cp -r .next/static .next/standalone/.next/
    pm2 restart all
    pm2 list
    ;;
  dev)
    echo "🚀 启动开发环境..."
    echo ""

    # 检查 Maven
    BACKEND_PID=""
    if command -v mvn &>/dev/null; then
      mkdir -p logs
      cd partjava-backend
      mvn spring-boot:run -q > ../logs/backend.log 2>&1 &
      BACKEND_PID=$!
      cd ..

      # 等待后端就绪（最多等 30 秒）
      echo -n "   ⏳ 等待后端启动"
      for i in $(seq 1 30); do
        if curl -s http://localhost:8080/api/stats/platform >/dev/null 2>&1; then
          echo " 就绪！"
          break
        fi
        echo -n "."
        sleep 1
      done
      echo ""
      echo "   ✅ 后端已启动 PID: $BACKEND_PID (端口 8080)"
    else
      echo "   ⚠️  未安装 Maven，跳过后端启动"
      echo "       可手动: cd partjava-backend && mvn spring-boot:run"
      echo "       或安装: sudo apt install maven"
    fi

    # 启动前端 (前台)
    echo "   ✅ 前端: http://localhost:3000"
    echo ""
    npm run dev

    # 前端退出时也关掉后端
    [ -n "$BACKEND_PID" ] && kill $BACKEND_PID 2>/dev/null || true
    ;;
  *)
    echo "用法: ./deploy.sh [build|quick|dev]"
    exit 1
    ;;
esac

echo ""
echo "✅ 完成"
