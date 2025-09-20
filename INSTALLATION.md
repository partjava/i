# PartJava 安装指南

本文档提供了详细的安装和部署说明，帮助您在本地或服务器上成功运行PartJava学习平台。

## 系统要求

- **Node.js**: 18.x 或更高版本
- **MySQL**: 8.0 或更高版本
- **操作系统**: Windows, macOS, 或 Linux
- **内存**: 至少 4GB RAM
- **存储**: 至少 1GB 可用空间

## 安装步骤

### 1. 克隆代码仓库

```bash
git clone https://github.com/yourusername/partjava.git
cd partjava
```

### 2. 安装依赖

使用npm:
```bash
npm install
```

或使用yarn:
```bash
yarn install
```

### 3. 配置数据库

#### 3.1 创建MySQL数据库

```sql
CREATE DATABASE partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 3.2 创建数据库用户（可选）

```sql
CREATE USER 'partjava_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON partjava_notes.* TO 'partjava_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. 环境配置

创建`.env.local`文件，添加以下内容:

```
# 数据库配置
DB_HOST=localhost
DB_USER=partjava_user  # 或您的MySQL用户名
DB_PASSWORD=your_password  # 您的MySQL密码
DB_NAME=partjava_notes
DB_PORT=3306

# NextAuth配置
NEXTAUTH_SECRET=your_random_secret_key  # 生成一个随机字符串
NEXTAUTH_URL=http://localhost:3000  # 开发环境URL

# 可选: 邮件服务配置
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com

# 可选: 第三方认证
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
```

### 5. 初始化数据库表

应用会在首次运行时自动创建必要的数据库表，但您也可以手动执行初始化:

```bash
# 使用项目提供的数据库初始化脚本
node scripts/init-db.js
```

### 6. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看应用。

### 7. 生产环境构建

```bash
npm run build
npm start
# 或
yarn build
yarn start
```

## 部署选项

### 使用PM2部署

1. 安装PM2:
```bash
npm install -g pm2
```

2. 创建ecosystem.config.js:
```javascript
module.exports = {
  apps: [{
    name: 'partjava',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

3. 启动应用:
```bash
pm2 start ecosystem.config.js
```

### 使用Docker部署

1. 构建Docker镜像:
```bash
docker build -t partjava .
```

2. 运行容器:
```bash
docker run -p 3000:3000 -d partjava
```

## 常见问题

### 数据库连接失败

- 检查数据库服务是否运行
- 验证环境变量中的数据库凭据是否正确
- 确认数据库用户有适当的权限

### 依赖安装问题

如果在安装依赖时遇到问题，尝试:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### 端口冲突

如果3000端口已被占用，可以在package.json中修改启动脚本:
```json
"scripts": {
  "dev": "next dev -p 3001",
  "start": "next start -p 3001"
}
```

## 更新与维护

### 更新依赖

定期更新依赖以获取安全补丁和新功能:
```bash
npm update
# 或
yarn upgrade
```

### 数据库备份

建议定期备份数据库:
```bash
mysqldump -u your_user -p partjava_notes > backup_$(date +%Y%m%d).sql
```

## 支持与帮助

如果您在安装过程中遇到任何问题，请查看GitHub仓库的Issues部分或创建新的Issue。
