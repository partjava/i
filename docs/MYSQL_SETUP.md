# MySQL数据库配置教程

## 🎯 概述

本教程将教您如何将项目从文件存储切换到MySQL数据库。

## 📋 准备工作

### 1. 安装MySQL

#### Windows用户：
1. 访问 [MySQL官网](https://dev.mysql.com/downloads/mysql/)
2. 下载MySQL Community Server
3. 运行安装程序，设置root密码（请记住这个密码）
4. 安装完成后，MySQL会自动启动

#### 使用XAMPP（推荐新手）：
1. 下载 [XAMPP](https://www.apachefriends.org/)
2. 安装并启动，点击MySQL的"Start"按钮
3. 默认用户名：root，密码：空（无密码）

#### 使用Docker：
```bash
docker run -d \\
  --name mysql-partjava \\
  -e MYSQL_ROOT_PASSWORD=your_password \\
  -e MYSQL_DATABASE=partjava_notes \\
  -p 3306:3306 \\
  mysql:8.0
```

### 2. 创建数据库

打开MySQL命令行或者phpMyAdmin，执行：
```sql
CREATE DATABASE partjava_notes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## ⚙️ 配置项目

### 1. 安装依赖
```bash
npm install mysql2
```

### 2. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：
```env
# NextAuth配置
NEXTAUTH_SECRET=your-super-secret-key-here-change-this
NEXTAUTH_URL=https://www.partjava.com

# MySQL数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=partjava_notes
```

**⚠️ 重要提示：**
- 将 `your_mysql_password` 替换为您的MySQL密码
- 如果使用XAMPP且没有设置密码，`DB_PASSWORD` 留空即可
- `NEXTAUTH_SECRET` 可以用任意复杂字符串

### 3. 初始化数据库

我已经为您创建了自动初始化脚本。第一次运行时会自动创建所需的表：
- `users` 表：存储用户信息
- `notes` 表：存储笔记内容
- `favorites` 表：存储收藏关系

## 🔄 切换到MySQL

### 1. 数据迁移（可选）

如果您已经有一些测试数据在文件中，可以手动迁移：

```javascript
// 迁移脚本（在开发工具控制台运行）
// 1. 先注册一个账号
// 2. 再使用API创建笔记
```

### 2. 替换API文件

我已经为您准备了MySQL版本的API文件。要切换，请：

1. 备份当前文件存储版本
2. 替换API文件为MySQL版本

## 🧪 测试数据库连接

### 1. 创建测试脚本

创建 `scripts/test-db.js`：
```javascript
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'your_password',
      database: 'partjava_notes'
    });
    
    console.log('✅ 数据库连接成功！');
    await connection.end();
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
  }
}

testConnection();
```

运行测试：
```bash
node scripts/test-db.js
```

## 🚀 启动项目

1. 确保MySQL服务运行中
2. 配置好环境变量
3. 启动项目：
```bash
npm run dev
```

首次启动时会自动创建数据库表。

## 📊 数据库结构

### users 表
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### notes 表
```sql
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  technology VARCHAR(100),
  subcategory VARCHAR(100),
  tags JSON,
  is_public BOOLEAN DEFAULT FALSE,
  author_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### favorites 表
```sql
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, note_id)
);
```

## 🔧 常见问题

### 1. 连接被拒绝
- 检查MySQL服务是否启动
- 检查端口3306是否被占用
- 确认用户名密码正确

### 2. 数据库不存在
- 手动创建数据库：`CREATE DATABASE partjava_notes;`

### 3. 权限问题
- 确保MySQL用户有创建表的权限
- 使用root用户测试

### 4. 字符编码问题
- 确保数据库使用utf8mb4字符集
- 支持中文和特殊字符

## 🎉 完成！

配置完成后，您的应用将使用MySQL数据库存储所有数据，具有更好的性能和可靠性。

## 📝 下一步

- 配置数据库备份
- 设置生产环境
- 优化查询性能
- 添加数据库索引