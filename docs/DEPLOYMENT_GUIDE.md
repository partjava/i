# 云服务器部署指南

## 概述

本应用包含在线代码执行功能，需要在服务器上安装相应的编程语言运行环境。

## 系统要求

### 基础环境
- Node.js 18+ 
- MySQL 8.0+
- Ubuntu 20.04+ / CentOS 8+ / 其他Linux发行版
- 至少 2GB RAM
- 至少 10GB 磁盘空间

### 代码执行环境（可选）

如果要支持在线代码执行功能，需要安装以下语言环境：

#### Python
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# CentOS/RHEL
sudo yum install python3 python3-pip
```

#### Node.js (JavaScript)
```bash
# 通过 NodeSource 安装
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Java
```bash
# Ubuntu/Debian
sudo apt install default-jdk

# CentOS/RHEL
sudo yum install java-11-openjdk-devel
```

#### C/C++
```bash
# Ubuntu/Debian
sudo apt install build-essential

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
```

#### Go
```bash
# 下载并安装 Go
wget https://golang.org/dl/go1.21.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

#### PHP
```bash
# Ubuntu/Debian
sudo apt install php-cli

# CentOS/RHEL
sudo yum install php-cli
```

## 部署步骤

### 1. 克隆代码
```bash
git clone <your-repo-url>
cd partjava
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：
```env
# 数据库配置
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=partjava_notes

# NextAuth 配置
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# 其他配置...
```

### 4. 数据库设置
```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE partjava_notes;"

# 运行初始化脚本
node scripts/init-database.js
```

### 5. 构建应用
```bash
npm run build
```

### 6. 启动应用
```bash
# 使用 PM2 管理进程
npm install -g pm2
pm2 start npm --name "partjava" -- start

# 或者直接启动
npm start
```

## 安全配置

### 1. 代码执行安全
由于应用支持在线代码执行，需要特别注意安全设置：

```bash
# 创建专用用户运行代码
sudo useradd -m -s /bin/bash coderunner
sudo usermod -aG sudo coderunner

# 设置资源限制
sudo nano /etc/security/limits.conf
```

添加以下内容：
```
coderunner soft nproc 50
coderunner hard nproc 100
coderunner soft nofile 1024
coderunner hard nofile 2048
```

### 2. 防火墙配置
```bash
# 开放必要端口
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # Next.js (如果直接运行)
sudo ufw enable
```

### 3. Nginx 反向代理
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass https://www.partjava.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 环境检测

访问 `/api/execute-code` (GET) 可以检查服务器支持的编程语言：

```bash
curl https://your-domain.com/api/execute-code
```

返回示例：
```json
{
  "supported_languages": ["python", "javascript", "java", "cpp", "c", "go", "php"],
  "available_languages": ["python", "javascript", "java"],
  "server_info": {
    "platform": "linux",
    "node_version": "v18.17.0",
    "environment": "production"
  }
}
```

## 故障排除

### 1. 代码执行失败
- 检查相应语言是否已安装
- 检查文件权限
- 查看服务器日志

### 2. 性能问题
- 监控服务器资源使用
- 调整代码执行超时时间
- 考虑使用容器化部署

### 3. 数据库连接问题
- 检查数据库服务状态
- 验证连接配置
- 检查防火墙设置

## 监控和维护

### 1. 日志监控
```bash
# 查看应用日志
pm2 logs partjava

# 查看系统日志
sudo journalctl -u nginx
sudo journalctl -u mysql
```

### 2. 性能监控
```bash
# 安装监控工具
npm install -g pm2-logrotate
pm2 install pm2-server-monit
```

### 3. 定期维护
- 清理临时文件
- 数据库备份
- 系统更新
- 安全补丁

## 注意事项

1. **安全风险**：在线代码执行存在安全风险，建议：
   - 使用容器化部署
   - 设置严格的资源限制
   - 定期更新系统和依赖

2. **资源管理**：
   - 监控服务器资源使用
   - 设置合理的超时时间
   - 考虑使用队列系统处理代码执行

3. **备份策略**：
   - 定期备份数据库
   - 备份用户上传的文件
   - 保留应用配置文件

如果你的云服务器环境不支持某些编程语言，相应的功能会自动禁用，不会影响应用的其他功能。