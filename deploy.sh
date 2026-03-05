#!/bin/bash

# PartJava 完整部署脚本
# 用法: ./deploy.sh

echo "🚀 开始部署 PartJava..."
echo ""

# 1. 构建项目
echo "📦 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！请检查错误信息"
    exit 1
fi

echo "✅ 构建完成"
echo ""

# 2. 复制静态文件到 standalone 目录
echo "📁 复制静态文件..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

if [ $? -ne 0 ]; then
    echo "❌ 复制静态文件失败！"
    exit 1
fi

echo "✅ 静态文件复制完成"
echo ""

# 3. 停止现有服务
echo "🛑 停止现有服务..."
pm2 delete all 2>/dev/null || true
sleep 2

# 4. 启动前端服务
echo "🌐 启动前端服务..."
pm2 start .next/standalone/server.js --name frontend

if [ $? -ne 0 ]; then
    echo "❌ 前端启动失败！"
    exit 1
fi

sleep 2

# 5. 启动后端服务
echo "🤖 启动后端服务..."
pm2 start partjava-ai/venv/bin/python --name backend --cwd partjava-ai -- -m uvicorn main:app --host 0.0.0.0 --port 8000

if [ $? -ne 0 ]; then
    echo "❌ 后端启动失败！"
    exit 1
fi

sleep 3

# 6. 显示服务状态
echo ""
echo "✅ 部署完成！"
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
echo ""
echo "🌐 访问网站: https://www.partjava.com"
