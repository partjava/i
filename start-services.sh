#!/bin/bash

# PartJava 服务启动脚本（快速重启，不重新构建）
# 用法: ./start-services.sh
# 注意: 如果代码有更新，请使用 ./deploy.sh 进行完整部署

echo "🚀 正在启动 PartJava 服务..."

# 检查是否需要复制静态文件
if [ ! -d ".next/standalone/public" ]; then
    echo "� 检测到缺少静态文件，正在复制..."
    cp -r public .next/standalone/ 2>/dev/null || true
    cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
    echo "✅ 静态文件复制完成"
fi

# 停止所有现有进程
echo "📋 停止现有进程..."
pm2 delete all 2>/dev/null || true

# 等待进程完全停止
sleep 2

# 启动所有服务（使用 ecosystem.config.js 配置）
echo "🌐 启动前端和后端服务..."
pm2 start ecosystem.config.js

# 等待后端启动
sleep 3

# 显示服务状态
echo ""
echo "✅ 服务启动完成！"
echo ""
pm2 list

echo ""
echo "📊 查看日志:"
echo "  前端: pm2 logs frontend"
echo "  后端: pm2 logs backend"
echo ""
echo "🔄 重启服务:"
echo "  前端: pm2 restart frontend"
echo "  后端: pm2 restart backend"
echo ""
echo "🛑 停止服务:"
echo "  全部: pm2 delete all"
echo "  前端: pm2 delete frontend"
echo "  后端: pm2 delete backend"
