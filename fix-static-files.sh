#!/bin/bash

# 修复 Next.js standalone 模式下的静态文件问题
echo "正在修复静态文件..."

# 确保目录存在
mkdir -p .next/standalone/.next/
mkdir -p .next/standalone/public/

# 复制静态文件到 standalone 目录
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/
    echo "✓ 静态文件已复制"
else
    echo "✗ 静态文件目录不存在"
fi

# 复制 public 目录
if [ -d "public" ]; then
    cp -r public/* .next/standalone/public/
    echo "✓ Public 文件已复制"
else
    echo "✗ Public 目录不存在"
fi

# 重启前端服务
echo "重启前端服务..."
pm2 restart frontend

echo "✓ 静态文件修复完成！"
