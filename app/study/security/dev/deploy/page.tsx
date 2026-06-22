'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookDivider,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '安全开发',
  chapterTitle: '安全部署',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/security/dev',
  prevChapter: { label: '漏洞修复', href: '/study/security/dev/fix' },
  nextChapter: { label: '安全运维', href: '/study/security/dev/ops' },
  theme: THEMES.security,
}

// ============ 代码片段常量 ============

const CODE_DOCKER_COMPOSE = `# docker-compose.yml
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
    file: ./db_password.txt`

const CODE_NGINX = `# nginx.conf
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
}`

const CODE_POSTGRESQL = `# postgresql.conf
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
max_parallel_maintenance_workers = 4`

const CODE_DEPLOY_SCRIPT = `#!/bin/bash
# deploy.sh

# 配置变量
APP_NAME="myapp"
DEPLOY_PATH="/opt/apps"
BACKUP_PATH="/opt/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 创建备份
echo "Creating backup..."
tar -czf "\${BACKUP_PATH}/\${APP_NAME}_\${TIMESTAMP}.tar.gz" -C "\${DEPLOY_PATH}" .

# 停止服务
echo "Stopping service..."
systemctl stop $APP_NAME

# 部署新版本
echo "Deploying new version..."
rsync -av --delete ./dist/ "\${DEPLOY_PATH}/"

# 更新权限
echo "Updating permissions..."
chown -R app:app "\${DEPLOY_PATH}"
chmod -R 750 "\${DEPLOY_PATH}"

# 启动服务
echo "Starting service..."
systemctl start $APP_NAME

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
systemctl stop $APP_NAME
tar -xzf "\${BACKUP_PATH}/\${APP_NAME}_\${TIMESTAMP}.tar.gz" -C "\${DEPLOY_PATH}"
systemctl start $APP_NAME
exit 1`

const CODE_HARDENING = `#!/bin/bash
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
systemctl start fail2ban`

const CODE_NODE_SECURITY = `// security.js
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
app.use('/api', securityMiddleware);`

const CODE_PROMETHEUS = `# prometheus.yml
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
          description: "实例 {{ $labels.instance }} 已停止响应"`

const CODE_ELK = `# filebeat.yml
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
}`

// ============ 内容跨页 ============

const SPREADS = [
  // ===== 跨页 1: 概述 =====
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全部署概述</PageTitle>
        <SectionTitle>1. 安全部署的重要性</SectionTitle>
        <BookParagraph>
          安全部署是确保应用系统在生产环境中安全运行的关键环节。它涉及从开发到运维的全流程安全控制，包括环境配置、部署流程、安全加固、监控告警等多个方面。
        </BookParagraph>
        <BookList items={[
          '防止未授权访问和恶意攻击',
          '保护敏感数据和用户隐私',
          '确保系统稳定性和可用性',
          '满足合规要求和安全标准',
        ]} />
        <SectionTitle>2. 安全部署的基本原则</SectionTitle>
        <BookList items={[
          '最小权限原则：只授予必要的访问权限',
          '纵深防御：多层安全防护机制',
          '安全默认配置：默认采用安全配置',
          '持续监控：实时监控和告警机制',
          '定期审计：安全配置和访问日志审计',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 安全部署的关键环节</SectionTitle>
        <BookList items={[
          '环境隔离：开发、测试、生产环境严格分离',
          '配置管理：统一的安全配置管理',
          '访问控制：严格的权限管理和认证机制',
          '数据保护：敏感数据加密和脱敏',
          '日志审计：完整的操作日志记录',
          '应急响应：快速的安全事件响应机制',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 环境配置 =====
  {
    label: '环境配置',
    left: (
      <div className="space-y-4">
        <PageTitle>环境隔离</PageTitle>
        <BookParagraph>Docker环境隔离示例：</BookParagraph>
        <BookCode language="yaml" maxLines={0} code={CODE_DOCKER_COMPOSE} />
        <BookList items={[
          '使用网络隔离，限制服务间通信',
          '敏感信息使用secrets管理',
          '只读文件系统，临时目录使用tmpfs',
          '限制容器权限，防止提权',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全配置</SectionTitle>
        <BookParagraph>Nginx安全配置示例：</BookParagraph>
        <BookCode language="nginx" maxLines={0} code={CODE_NGINX} />
        <BookList items={[
          '禁用服务器版本信息',
          '配置安全响应头',
          '使用强SSL配置',
          '限制请求速率和连接数',
          '配置访问控制和日志',
        ]} />
        <BookDivider />
        <SectionTitle>数据库安全配置</SectionTitle>
        <BookParagraph>PostgreSQL安全配置示例：</BookParagraph>
        <BookCode language="ini" maxLines={0} code={CODE_POSTGRESQL} />
        <BookList items={[
          '限制最大连接数',
          '启用SSL加密',
          '配置详细的日志记录',
          '优化性能参数',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 3: 部署流程 =====
  {
    label: '部署流程',
    left: (
      <div className="space-y-4">
        <PageTitle>部署前准备</PageTitle>
        <SectionTitle>1. 代码安全审计</SectionTitle>
        <BookList items={[
          '静态代码分析',
          '依赖组件检查',
          '安全漏洞扫描',
        ]} />
        <SectionTitle>2. 环境检查</SectionTitle>
        <BookList items={[
          '系统补丁更新',
          '安全配置验证',
          '资源使用评估',
        ]} />
        <SectionTitle>3. 备份策略</SectionTitle>
        <BookList items={[
          '数据备份',
          '配置文件备份',
          '回滚方案',
        ]} />
        <BookDivider />
        <SectionTitle>部署脚本示例</SectionTitle>
        <BookParagraph>自动化部署脚本：</BookParagraph>
        <BookCode language="bash" maxLines={0} code={CODE_DEPLOY_SCRIPT} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>脚本功能说明</SectionTitle>
        <BookList items={[
          '自动备份当前版本',
          '优雅停止和启动服务',
          '权限管理',
          '健康检查',
          '自动回滚机制',
        ]} />
        <BookDivider />
        <SectionTitle>部署后验证</SectionTitle>
        <SectionTitle>1. 功能验证</SectionTitle>
        <BookList items={[
          '核心功能测试',
          '接口可用性检查',
          '性能指标验证',
        ]} />
        <SectionTitle>2. 安全验证</SectionTitle>
        <BookList items={[
          '漏洞扫描',
          '配置检查',
          '权限验证',
        ]} />
        <SectionTitle>3. 监控确认</SectionTitle>
        <BookList items={[
          '日志收集',
          '告警配置',
          '性能监控',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 4: 安全加固 =====
  {
    label: '安全加固',
    left: (
      <div className="space-y-4">
        <PageTitle>系统加固</PageTitle>
        <BookParagraph>Linux系统加固脚本示例：</BookParagraph>
        <BookCode language="bash" maxLines={0} code={CODE_HARDENING} />
        <BookList items={[
          '系统更新和补丁管理',
          '防火墙配置',
          'SSH安全加固',
          '系统参数优化',
          '文件权限管理',
          '安全工具部署',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应用安全加固</SectionTitle>
        <BookParagraph>Node.js应用安全配置示例：</BookParagraph>
        <BookCode language="javascript" maxLines={0} code={CODE_NODE_SECURITY} />
        <BookList items={[
          '安全响应头配置',
          '请求速率限制',
          'CORS策略',
          '请求体限制',
          '错误处理',
          '安全中间件',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 5: 监控告警 =====
  {
    label: '监控告警',
    left: (
      <div className="space-y-4">
        <PageTitle>监控系统配置</PageTitle>
        <BookParagraph>Prometheus监控配置示例：</BookParagraph>
        <BookCode language="yaml" maxLines={0} code={CODE_PROMETHEUS} />
        <BookList items={[
          '监控指标配置',
          '告警规则定义',
          'TLS加密配置',
          '多实例监控',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>日志监控配置</SectionTitle>
        <BookParagraph>ELK日志监控配置示例：</BookParagraph>
        <BookCode language="yaml" maxLines={0} code={CODE_ELK} />
        <BookList items={[
          '多源日志收集',
          '日志格式解析',
          'SSL加密传输',
          '元数据添加',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 6: 案例分析 =====
  {
    label: '案例分析',
    left: (
      <div className="space-y-4">
        <PageTitle>案例分析</PageTitle>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">案例一：配置错误导致的数据泄露</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><span className="font-semibold">问题描述：</span>生产环境数据库配置错误，导致未授权访问。</li>
            <li>
              <span className="font-semibold">原因分析：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>数据库监听地址配置为0.0.0.0</li>
                <li>未启用SSL加密</li>
                <li>防火墙规则配置不当</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">解决方案：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>修改监听地址为127.0.0.1</li>
                <li>启用SSL加密</li>
                <li>配置严格的防火墙规则</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">案例二：部署流程导致的服务中断</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><span className="font-semibold">问题描述：</span>部署新版本时未进行充分测试，导致服务中断。</li>
            <li>
              <span className="font-semibold">原因分析：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>缺少自动化测试</li>
                <li>未进行灰度发布</li>
                <li>回滚机制不完善</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">解决方案：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>实现自动化测试流程</li>
                <li>采用蓝绿部署</li>
                <li>完善回滚机制</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">案例三：监控告警不及时</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><span className="font-semibold">问题描述：</span>系统异常未能及时发现，导致服务长时间不可用。</li>
            <li>
              <span className="font-semibold">原因分析：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>监控指标不完善</li>
                <li>告警阈值设置不合理</li>
                <li>告警通知机制失效</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">解决方案：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>完善监控指标体系</li>
                <li>优化告警规则</li>
                <li>建立多通道告警机制</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold mb-2">案例四：安全加固不完整</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><span className="font-semibold">问题描述：</span>系统遭受攻击，导致数据泄露。</li>
            <li>
              <span className="font-semibold">原因分析：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>系统补丁未及时更新</li>
                <li>安全配置不完整</li>
                <li>缺乏入侵检测机制</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">解决方案：</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>建立补丁管理流程</li>
                <li>完善安全配置基线</li>
                <li>部署IDS/IPS系统</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
]

export default function SecurityDeployPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
