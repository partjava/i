#!/bin/bash

echo "🚀 开始部署..."

# 1. 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main

# 2. 安装依赖
echo "📦 安装依赖..."
npm install

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 创建日志目录
mkdir -p logs

# 5. 使用pm2启动或重启
echo "🔄 启动/重启应用..."
if pm2 list | grep -q "partjava"; then
  echo "重启现有应用..."
  pm2 restart ecosystem.config.js
else
  echo "首次启动应用..."
  pm2 start ecosystem.config.js
fi

# 6. 保存pm2配置
pm2 save

echo "✅ 部署完成！"
echo ""
echo "常用命令："
echo "  查看状态: pm2 status"
echo "  查看日志: pm2 logs partjava"
echo "  停止应用: pm2 stop partjava"
echo "  重启应用: pm2 restart partjava"
echo "  删除应用: pm2 delete partjava"
