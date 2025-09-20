#!/bin/bash

echo "🚀 启动 Next.js Standalone 模式..."

# 确保目录存在
mkdir -p .next/standalone/.next/
mkdir -p .next/standalone/public/

# 复制静态文件
echo "📁 复制静态文件..."
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/
    echo "✅ 静态文件已复制"
else
    echo "❌ 静态文件目录不存在"
fi

# 复制 public 目录
if [ -d "public" ]; then
    cp -r public/* .next/standalone/public/ 2>/dev/null || true
    echo "✅ Public 文件已复制"
fi

# 启动服务器
echo "🌟 启动服务器..."
cd .next/standalone && node server.js

