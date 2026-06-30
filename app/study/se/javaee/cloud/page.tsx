'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '容器化与云服务',
  chapterNumber: 14,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '性能调优与监控', href: '/study/se/javaee/performance' },
  nextChapter: { label: 'DevOps与CI/CD', href: '/study/se/javaee/devops' },
  theme: THEMES.software,
}

const DOCKERFILE = `# 基础镜像
FROM openjdk:11-jdk-slim

# 工作目录
WORKDIR /app

# 复制JAR包
COPY target/*.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
ENTRYPOINT ["java","-jar","app.jar"]`

const DOCKER_COMPOSE = `version: '3'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    volumes:
      - ./logs:/app/logs
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=appdb
    volumes:
      - mysql-data:/var/lib/mysql

  redis:
    image: redis:6.2
    ports:
      - "6379:6379"

volumes:
  mysql-data:`

const ECS_DEPLOY = `# 阿里云ECS部署脚本
#!/bin/bash

# 安装Docker
yum install -y docker

# 启动Docker
systemctl start docker

# 拉取镜像
docker pull your-registry/app:latest

# 运行容器
docker run -d \\
  --name app \\
  -p 8080:8080 \\
  -v /app/logs:/logs \\
  -e SPRING_PROFILES_ACTIVE=prod \\
  your-registry/app:latest`

const APP_CLOUD_YML = `# application-cloud.yml
spring:
  cloud:
    alicloud:
      oss:
        endpoint: oss-cn-hangzhou.aliyuncs.com
        accessKey: "your-access-key"
        secretKey: "your-secret-key"
        bucket: your-bucket

  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: "root"
    password: "password"

  redis:
    host: "localhost"
    port: 6379
    password: "redis-password"`

const K8S_DEPLOYMENT = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: javaee-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: javaee-app
  template:
    metadata:
      labels:
        app: javaee-app
    spec:
      containers:
      - name: javaee-app
        image: your-registry/app:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        resources:
          requests:
            memory: "512Mi"
            cpu: "200m"
          limits:
            memory: "1Gi"
            cpu: "500m"`

const K8S_SERVICE = `apiVersion: v1
kind: Service
metadata:
  name: javaee-app-service
spec:
  selector:
    app: javaee-app
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer`

const DEPLOY_SCRIPT = `#!/bin/bash

# 构建镜像
docker build -t your-registry/app:latest .

# 推送镜像
docker push your-registry/app:latest

# 部署到K8s
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# 检查部署状态
kubectl get pods
kubectl get services`

const MONITORING_CONFIG = `# prometheus.yml
scrape_configs:
  - job_name: 'javaee-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['javaee-app-service:8080']

# grafana-dashboard.json
{
  "dashboard": {
    "title": "JavaEE应用监控",
    "panels": [
      {
        "title": "JVM内存使用",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "jvm_memory_used_bytes"
          }
        ]
      }
    ]
  }
}`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>容器化与云服务概述</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">JavaEE云原生发展趋势</h3>
        <BookList items={[
          '容器化部署成为标准',
          '微服务架构普及',
          '云原生技术栈成熟',
          'DevOps流程自动化',
          '服务网格与可观测性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">主流技术栈</h3>
        <BookList items={[
          'Docker：容器化标准',
          'Kubernetes：容器编排',
          'Spring Cloud：微服务框架',
          'Istio：服务网格',
          'Prometheus：监控系统',
        ]} />
        <TagGrid items={['容器化', '微服务', 'Kubernetes', '云原生', 'DevOps']} />
      </div>
    ),
  },
  {
    label: '容器化基础',
    left: (
      <div className="space-y-4">
        <PageTitle>容器化基础</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">容器与虚拟机对比</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h4 className="font-semibold mb-2 text-sm">容器优势</h4>
            <BookList items={[
              '轻量级，启动快速',
              '资源利用率高',
              '环境一致性好',
              '便于微服务部署',
            ]} />
          </div>
          <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h4 className="font-semibold mb-2 text-sm">虚拟机优势</h4>
            <BookList items={[
              '完全隔离',
              '安全性更高',
              '支持不同OS',
              '适合传统应用',
            ]} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">JavaEE容器化注意事项</h3>
        <BookList items={[
          'JVM参数优化',
          '内存配置合理',
          '日志收集方案',
          '健康检查配置',
          '数据持久化',
        ]} />
        <BookAlert type="info" message="容器化部署时，JVM能正确识别容器内存限制，推荐使用 JDK 10+ 的 UseContainerSupport 参数。" />
        <TagGrid items={['JVM', '内存', '日志', '健康检查', '持久化']} />
      </div>
    ),
  },
  {
    label: 'Docker实战',
    left: (
      <div className="space-y-4">
        <PageTitle>Docker实战</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">Dockerfile示例</h3>
        <BookCode language="dockerfile" code={DOCKERFILE} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">docker-compose.yml示例</h3>
        <BookCode language="yaml" code={DOCKER_COMPOSE} />
        <TagGrid items={['Dockerfile', 'docker-compose', '镜像构建', '服务编排', '容器部署']} />
      </div>
    ),
  },
  {
    label: '云服务与部署',
    left: (
      <div className="space-y-4">
        <PageTitle>云服务与部署</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">云平台部署配置</h3>
        <BookCode language="bash" code={ECS_DEPLOY} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">云服务配置示例</h3>
        <BookCode language="yaml" code={APP_CLOUD_YML} />
        <TagGrid items={['阿里云', 'ECS', 'OSS', '云配置', '部署']} />
      </div>
    ),
  },
  {
    label: 'Kubernetes与微服务',
    left: (
      <div className="space-y-4">
        <PageTitle>Kubernetes与微服务</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">Deployment配置</h3>
        <BookCode language="yaml" code={K8S_DEPLOYMENT} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Service配置</h3>
        <BookCode language="yaml" code={K8S_SERVICE} />
        <BookAlert type="info" message="Kubernetes Service 提供了稳定的网络访问入口，支持负载均衡和服务发现。Type: LoadBalancer 会创建云厂商提供的负载均衡器。" />
        <TagGrid items={['Deployment', 'Service', 'K8s', '负载均衡', '容器编排']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>实用示例</PageTitle>
        <h3 className="text-sm font-medium text-ink mt-4">一键部署脚本</h3>
        <BookCode language="bash" code={DEPLOY_SCRIPT} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">监控配置</h3>
        <BookCode language="yaml" code={MONITORING_CONFIG} />
        <BookAlert type="success" message="Prometheus + Grafana 是云原生生态中最常用的监控组合，配合 Spring Boot Actuator 可以全面监控应用状态。" />
        <TagGrid items={['部署脚本', '监控', 'Prometheus', 'Grafana', '自动化']} />
      </div>
    ),
  },
]

export default function JavaEECloudPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
