"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityDeployPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全部署</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab('environment')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'environment'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          环境配置
        </button>
        <button
          onClick={() => setActiveTab('deployment')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'deployment'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          部署流程
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          安全加固
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'monitoring'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          监控告警
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          案例分析
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全部署概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全部署的重要性</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  安全部署是确保应用系统在生产环境中安全运行的关键环节。它涉及从开发到运维的全流程安全控制，包括环境配置、部署流程、安全加固、监控告警等多个方面。
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>防止未授权访问和恶意攻击</li>
                  <li>保护敏感数据和用户隐私</li>
                  <li>确保系统稳定性和可用性</li>
                  <li>满足合规要求和安全标准</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 安全部署的基本原则</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>最小权限原则：只授予必要的访问权限</li>
                  <li>纵深防御：多层安全防护机制</li>
                  <li>安全默认配置：默认采用安全配置</li>
                  <li>持续监控：实时监控和告警机制</li>
                  <li>定期审计：安全配置和访问日志审计</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 安全部署的关键环节</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>环境隔离：开发、测试、生产环境严格分离</li>
                  <li>配置管理：统一的安全配置管理</li>
                  <li>访问控制：严格的权限管理和认证机制</li>
                  <li>数据保护：敏感数据加密和脱敏</li>
                  <li>日志审计：完整的操作日志记录</li>
                  <li>应急响应：快速的安全事件响应机制</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environment' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">环境配置</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 环境隔离</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Docker环境隔离示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# docker-compose.yml
version: '3'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    networks:
      - frontend
      - backend
    depends_on:
      - db
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
      - /var/run
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  db:
    image: postgres:13
    environment:
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - backend
    secrets:
      - db_password

networks:
  frontend:
  backend:
    internal: true

volumes:
  db_data:

secrets:
  db_password:
    file: ./db_password.txt`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>使用网络隔离，限制服务间通信</li>
                  <li>敏感信息使用secrets管理</li>
                  <li>只读文件系统，临时目录使用tmpfs</li>
                  <li>限制容器权限，防止提权</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 安全配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Nginx安全配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# nginx.conf
http {
    # 基本安全配置
    server_tokens off;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Content-Security-Policy "default-src 'self'";
    
    # SSL配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 限制请求
    limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
    limit_conn_zone $binary_remote_addr zone=addr:10m;
    
    server {
        listen 443 ssl http2;
        server_name example.com;
        
        # SSL证书
        ssl_certificate /etc/nginx/ssl/example.com.crt;
        ssl_certificate_key /etc/nginx/ssl/example.com.key;
        
        # 安全headers
        add_header Strict-Transport-Security "max-age=31536000" always;
        
        # 限制访问
        location /admin {
            allow 192.168.1.0/24;
            deny all;
        }
        
        # 文件上传限制
        client_max_body_size 10M;
        
        # 日志配置
        access_log /var/log/nginx/access.log combined buffer=512k flush=1m;
        error_log /var/log/nginx/error.log warn;
    }
}`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>禁用服务器版本信息</li>
                  <li>配置安全响应头</li>
                  <li>使用强SSL配置</li>
                  <li>限制请求速率和连接数</li>
                  <li>配置访问控制和日志</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 数据库安全配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">PostgreSQL安全配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# postgresql.conf
# 连接限制
max_connections = 100
superuser_reserved_connections = 3

# 认证配置
password_encryption = scram-sha-256
ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server.crt'
ssl_key_file = '/etc/postgresql/ssl/server.key'

# 日志配置
log_destination = 'csvlog'
logging_collector = on
log_directory = 'pg_log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_min_duration_statement = 1000
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 0
log_autovacuum_min_duration = 0

# 性能和安全
shared_buffers = 1GB
work_mem = 16MB
maintenance_work_mem = 256MB
effective_cache_size = 3GB
random_page_cost = 1.1
effective_io_concurrency = 200
max_worker_processes = 8
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
max_parallel_maintenance_workers = 4`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>限制最大连接数</li>
                  <li>启用SSL加密</li>
                  <li>配置详细的日志记录</li>
                  <li>优化性能参数</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">部署流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 部署前准备</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>代码安全审计
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>静态代码分析</li>
                      <li>依赖组件检查</li>
                      <li>安全漏洞扫描</li>
                    </ul>
                  </li>
                  <li>环境检查
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>系统补丁更新</li>
                      <li>安全配置验证</li>
                      <li>资源使用评估</li>
                    </ul>
                  </li>
                  <li>备份策略
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>数据备份</li>
                      <li>配置文件备份</li>
                      <li>回滚方案</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 部署脚本示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">自动化部署脚本：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# deploy.sh

# 配置变量
APP_NAME="myapp"
DEPLOY_PATH="/opt/apps"
BACKUP_PATH="/opt/backups"
TIMESTAMP=\\\$(date +%Y%m%d_%H%M%S)

# 创建备份
echo "Creating backup..."
tar -czf "\\\$BACKUP_PATH/\\\${APP_NAME}_\\\${TIMESTAMP}.tar.gz" -C "\\\$DEPLOY_PATH" .

# 停止服务
echo "Stopping service..."
systemctl stop \\\$APP_NAME

# 部署新版本
echo "Deploying new version..."
rsync -av --delete ./dist/ "\\\$DEPLOY_PATH/"

# 更新权限
echo "Updating permissions..."
chown -R app:app "\\\$DEPLOY_PATH"
chmod -R 750 "\\\$DEPLOY_PATH"

# 启动服务
echo "Starting service..."
systemctl start \\\$APP_NAME

# 健康检查
echo "Performing health check..."
for i in {1..5}; do
    if curl -s http://localhost:8080/health | grep -q "UP"; then
        echo "Deployment successful!"
        exit 0
    fi
    sleep 5
done

# 如果健康检查失败，回滚
echo "Health check failed, rolling back..."
systemctl stop \\\$APP_NAME
tar -xzf "\\\$BACKUP_PATH/\\\${APP_NAME}_\\\${TIMESTAMP}.tar.gz" -C "\\\$DEPLOY_PATH"
systemctl start \\\$APP_NAME
exit 1`}</code>
                </pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>自动备份当前版本</li>
                  <li>优雅停止和启动服务</li>
                  <li>权限管理</li>
                  <li>健康检查</li>
                  <li>自动回滚机制</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 部署后验证</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>功能验证
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>核心功能测试</li>
                      <li>接口可用性检查</li>
                      <li>性能指标验证</li>
                    </ul>
                  </li>
                  <li>安全验证
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>漏洞扫描</li>
                      <li>配置检查</li>
                      <li>权限验证</li>
                    </ul>
                  </li>
                  <li>监控确认
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>日志收集</li>
                      <li>告警配置</li>
                      <li>性能监控</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全加固</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 系统加固</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Linux系统加固脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`#!/bin/bash
# security_hardening.sh

# 更新系统
apt-get update && apt-get upgrade -y

# 配置防火墙
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# 配置SSH安全
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

# 配置系统安全参数
cat > /etc/sysctl.d/99-security.conf << EOF
# 禁用IP转发
net.ipv4.ip_forward = 0
# 启用SYN Cookie
net.ipv4.tcp_syncookies = 1
# 禁用ICMP重定向
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
# 启用源地址验证
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
# 禁用源路由
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0
EOF

# 应用系统参数
sysctl -p /etc/sysctl.d/99-security.conf

# 配置文件权限
chmod 644 /etc/passwd
chmod 644 /etc/group
chmod 600 /etc/shadow
chmod 600 /etc/gshadow

# 安装安全工具
apt-get install -y fail2ban rkhunter chkrootkit

# 配置fail2ban
cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
EOF

systemctl enable fail2ban
systemctl start fail2ban`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>系统更新和补丁管理</li>
                  <li>防火墙配置</li>
                  <li>SSH安全加固</li>
                  <li>系统参数优化</li>
                  <li>文件权限管理</li>
                  <li>安全工具部署</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 应用安全加固</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Node.js应用安全配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`// security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const express = require('express');
const app = express();

// 安全headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  frameguard: {
    action: 'deny'
  }
}));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 100次请求
  message: '请求过于频繁，请稍后再试'
});
app.use(limiter);

// CORS配置
app.use(cors({
  origin: ['https://example.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

// 请求体大小限制
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器错误');
});

// 安全路由中间件
const securityMiddleware = (req, res, next) => {
  // 检查认证
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: '未授权访问' });
  }
  
  // 检查权限
  if (!req.user.hasPermission(req.path)) {
    return res.status(403).json({ error: '权限不足' });
  }
  
  next();
};

// 应用安全中间件
app.use('/api', securityMiddleware);`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>安全响应头配置</li>
                  <li>请求速率限制</li>
                  <li>CORS策略</li>
                  <li>请求体限制</li>
                  <li>错误处理</li>
                  <li>安全中间件</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">监控告警</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 监控系统配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Prometheus监控配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
    metrics_path: '/metrics'
    scheme: 'https'
    tls_config:
      cert_file: '/etc/prometheus/certs/node-exporter.crt'
      key_file: '/etc/prometheus/certs/node-exporter.key'

  - job_name: 'app'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/metrics'
    scheme: 'https'
    tls_config:
      cert_file: '/etc/prometheus/certs/app.crt'
      key_file: '/etc/prometheus/certs/app.key'

# alert_rules.yml
groups:
  - name: example
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "高CPU使用率"
          description: "实例 {{ $labels.instance }} CPU使用率超过80%"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "高内存使用率"
          description: "实例 {{ $labels.instance }} 内存使用率超过85%"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "服务不可用"
          description: "实例 {{ $labels.instance }} 已停止响应"`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>监控指标配置</li>
                  <li>告警规则定义</li>
                  <li>TLS加密配置</li>
                  <li>多实例监控</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 日志监控配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">ELK日志监控配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto"><code>{`# filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nginx/*.log
  fields:
    type: nginx
  fields_under_root: true
  json.keys_under_root: true
  json.add_error_key: true

- type: log
  enabled: true
  paths:
    - /var/log/app/*.log
  fields:
    type: application
  fields_under_root: true
  json.keys_under_root: true
  json.add_error_key: true

processors:
  - add_host_metadata: ~
  - add_cloud_metadata: ~
  - add_docker_metadata: ~
  - add_kubernetes_metadata: ~

output.elasticsearch:
  hosts: ["localhost:9200"]
  protocol: https
  ssl.certificate: "/etc/filebeat/certs/filebeat.crt"
  ssl.key: "/etc/filebeat/certs/filebeat.key"
  ssl.verification_mode: "certificate"

# logstash.conf
input {
  beats {
    port => 5044
    ssl => true
    ssl_certificate => "/etc/logstash/certs/logstash.crt"
    ssl_key => "/etc/logstash/certs/logstash.key"
  }
}

filter {
  if [type] == "nginx" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
  }
  
  if [type] == "application" {
    json {
      source => "message"
    }
    date {
      match => [ "@timestamp", "ISO8601" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
    ssl => true
    ssl_certificate_verification => true
    ssl_certificate => "/etc/logstash/certs/logstash.crt"
    ssl_key => "/etc/logstash/certs/logstash.key"
  }
}`}</code></pre>
                <ul className="list-disc pl-6 mt-2 text-xs">
                  <li>多源日志收集</li>
                  <li>日志格式解析</li>
                  <li>SSL加密传输</li>
                  <li>元数据添加</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">案例分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <b>案例一：配置错误导致的数据泄露</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>问题描述：</b>生产环境数据库配置错误，导致未授权访问。</li>
                  <li><b>原因分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>数据库监听地址配置为0.0.0.0</li>
                      <li>未启用SSL加密</li>
                      <li>防火墙规则配置不当</li>
                    </ul>
                  </li>
                  <li><b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>修改监听地址为127.0.0.1</li>
                      <li>启用SSL加密</li>
                      <li>配置严格的防火墙规则</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <b>案例二：部署流程导致的服务中断</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>问题描述：</b>部署新版本时未进行充分测试，导致服务中断。</li>
                  <li><b>原因分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>缺少自动化测试</li>
                      <li>未进行灰度发布</li>
                      <li>回滚机制不完善</li>
                    </ul>
                  </li>
                  <li><b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>实现自动化测试流程</li>
                      <li>采用蓝绿部署</li>
                      <li>完善回滚机制</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <b>案例三：监控告警不及时</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>问题描述：</b>系统异常未能及时发现，导致服务长时间不可用。</li>
                  <li><b>原因分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>监控指标不完善</li>
                      <li>告警阈值设置不合理</li>
                      <li>告警通知机制失效</li>
                    </ul>
                  </li>
                  <li><b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>完善监控指标体系</li>
                      <li>优化告警规则</li>
                      <li>建立多通道告警机制</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <b>案例四：安全加固不完整</b>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li><b>问题描述：</b>系统遭受攻击，导致数据泄露。</li>
                  <li><b>原因分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>系统补丁未及时更新</li>
                      <li>安全配置不完整</li>
                      <li>缺乏入侵检测机制</li>
                    </ul>
                  </li>
                  <li><b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>建立补丁管理流程</li>
                      <li>完善安全配置基线</li>
                      <li>部署IDS/IPS系统</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/fix"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 漏洞修复
        </Link>
        <Link
          href="/study/security/dev/ops"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全运维 →
        </Link>
      </div>
    </div>
  );
} 