'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'container', label: '容器化基础' },
  { key: 'docker', label: 'Docker实战' },
  { key: 'cloud', label: '云服务与部署' },
  { key: 'k8s', label: 'Kubernetes与微服务' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEECloudPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">容器化与云服务</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">容器化与云服务概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE云原生发展趋势</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 容器化部署成为标准</li>
                <li>• 微服务架构普及</li>
                <li>• 云原生技术栈成熟</li>
                <li>• DevOps流程自动化</li>
                <li>• 服务网格与可观测性</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">主流技术栈</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Docker：容器化标准</li>
                <li>• Kubernetes：容器编排</li>
                <li>• Spring Cloud：微服务框架</li>
                <li>• Istio：服务网格</li>
                <li>• Prometheus：监控系统</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'container' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">容器化基础</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">容器与虚拟机对比</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">容器优势</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 轻量级，启动快速</li>
                    <li>• 资源利用率高</li>
                    <li>• 环境一致性好</li>
                    <li>• 便于微服务部署</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">虚拟机优势</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 完全隔离</li>
                    <li>• 安全性更高</li>
                    <li>• 支持不同OS</li>
                    <li>• 适合传统应用</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE容器化注意事项</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• JVM参数优化</li>
                <li>• 内存配置合理</li>
                <li>• 日志收集方案</li>
                <li>• 健康检查配置</li>
                <li>• 数据持久化</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'docker' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Docker实战</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Dockerfile示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 基础镜像
FROM openjdk:11-jdk-slim

# 工作目录
WORKDIR /app

# 复制JAR包
COPY target/*.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
ENTRYPOINT ["java","-jar","app.jar"]`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">docker-compose.yml示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`version: '3'
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
  mysql-data:`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">云服务与部署</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">云平台部署配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 阿里云ECS部署脚本
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
  your-registry/app:latest`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">云服务配置示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# application-cloud.yml
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
    password: "redis-password"`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'k8s' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Kubernetes与微服务</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Deployment配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`apiVersion: apps/v1
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
            cpu: "500m"`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Service配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`apiVersion: v1
kind: Service
metadata:
  name: javaee-app-service
spec:
  selector:
    app: javaee-app
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">一键部署脚本</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#!/bin/bash

# 构建镜像
docker build -t your-registry/app:latest .

# 推送镜像
docker push your-registry/app:latest

# 部署到K8s
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# 检查部署状态
kubectl get pods
kubectl get services`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">监控配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# prometheus.yml
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
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/performance" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 性能调优与监控
        </a>
        <a
          href="/study/se/javaee/devops"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          DevOps与CI/CD →
        </a>
      </div>
    </div>
  );
} 