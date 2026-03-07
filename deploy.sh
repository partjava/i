#!/bin/bash

# 部署脚本 - 构建并重启服务

echo "🚀 开始部署..."

# 1. 清理旧的构建文件
echo "🧹 清理旧构建..."
rm -rf .next

# 2. 构建项目
echo "📦 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 3. 复制静态文件到 standalone 目录
echo "📁 复制静态文件..."
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

# 4. 确保数据库字段正确
echo "🗄️  检查数据库字段..."
mysql -u ecs-user -p'123456' -D partjava_notes -e "ALTER TABLE users MODIFY COLUMN image MEDIUMTEXT;" 2>/dev/null
mysql -u ecs-user -p'123456' -D partjava_notes -e "ALTER TABLE user_profiles MODIFY COLUMN avatar MEDIUMTEXT;" 2>/dev/null

# 5. 删除并重新启动 PM2 服务（确保使用新代码）
echo "🔄 重启服务..."
pm2 delete all 2>/dev/null
pm2 start ecosystem.config.js

# 6. 等待服务启动
echo "⏳ 等待服务启动..."
sleep 3

# 7. 显示状态
echo "✅ 部署完成！"
pm2 status

echo ""
echo "📊 查看日志: pm2 logs"
echo "🌐 访问: https://www.partjava.com"
echo ""
echo "💡 提示: 刷新浏览器时按 Ctrl+F5 强制清除缓存"
