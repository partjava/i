'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '云原生与容器化', chapterNumber: 21, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '自动化部署与CI/CD', href: '/study/computer/php/devops-cicd' },
  nextChapter: { label: '常见问题与面试题', href: '/study/computer/php/faq' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '云原生基础',
    left: (
      <div className="space-y-4">
        <PageTitle>云原生基础</PageTitle>
        <BookParagraph>云原生是一种构建和运行应用程序的方法，充分利用容器化、微服务架构和自动化管理来构建弹性、可扩展的应用。</BookParagraph>
        <BookList items={['云原生概念：面向云环境设计的应用架构', '容器化技术：Docker容器封装应用及其依赖', '微服务架构：将应用拆分为独立部署的小服务']} />
        <BookCode language="bash" code={`# .env配置
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=app
DB_USERNAME=root
DB_PASSWORD=password`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>健康检查与配置管理</SectionTitle>
        <BookCode language="php" code={`<?php
// 健康检查控制器
class HealthCheckController extends Controller
{
    public function check()
    {
        return response()->json([
            "status" => "healthy",
            "timestamp" => time(),
            "services" => [
                "database" => $this->checkDatabase(),
                "cache" => $this->checkCache(),
                "storage" => $this->checkStorage()
            ]
        ]);
    }

    private function checkDatabase()
    {
        try {
            DB::connection()->getPdo();
            return "healthy";
        } catch (\\Exception $e) {
            return "unhealthy";
        }
    }

    private function checkCache()
    {
        try {
            Cache::put("health_check", "ok", 1);
            return Cache::get("health_check") === "ok" ? "healthy" : "unhealthy";
        } catch (\\Exception $e) {
            return "unhealthy";
        }
    }

    private function checkStorage()
    {
        try {
            Storage::disk("local")->put("health_check.txt", "ok");
            return Storage::disk("local")->get("health_check.txt") === "ok" ? "healthy" : "unhealthy";
        } catch (\\Exception $e) {
            return "unhealthy";
        }
    }
}
?>`} />
      </div>
    ),
  },
  {
    label: 'Kubernetes',
    left: (
      <div className="space-y-4">
        <SectionTitle>Kubernetes部署</SectionTitle>
        <BookParagraph>Kubernetes（K8s）是容器编排平台，提供部署、扩展和服务发现能力。</BookParagraph>
        <BookCode language="yaml" code={`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php-app
  labels:
    app: php-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: php-app
  template:
    metadata:
      labels:
        app: php-app
    spec:
      containers:
      - name: php-app
        image: php-app:latest
        ports:
        - containerPort: 80
        env:
        - name: APP_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db_host
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>服务发现与入口</SectionTitle>
        <BookCode language="yaml" code={`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: php-app
spec:
  selector:
    app: php-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP

---
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: php-app
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: php-app
            port:
              number: 80`} />
        <TagGrid items={['K8s', 'Deployment', 'Service', 'Ingress', '探针']} />
      </div>
    ),
  },
  {
    label: 'Docker',
    left: (
      <div className="space-y-4">
        <SectionTitle>Docker镜像构建</SectionTitle>
        <BookParagraph>Docker容器化确保应用在不同环境中一致运行。通过Dockerfile定义镜像构建过程，docker-compose编排多容器服务。</BookParagraph>
        <BookCode language="dockerfile" code={`# Dockerfile
FROM php:7.4-fpm

# 安装系统依赖
RUN apt-get update && apt-get install -y \\
    git \\
    curl \\
    libpng-dev \\
    libonig-dev \\
    libxml2-dev \\
    zip \\
    unzip

# 安装PHP扩展
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 安装Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 设置工作目录
WORKDIR /var/www

# 复制项目文件
COPY . /var/www

# 安装依赖
RUN composer install --no-dev --optimize-autoloader

# 设置权限
RUN chown -R www-data:www-data /var/www

# 暴露端口
EXPOSE 9000

# 启动命令
CMD ["php-fpm"]`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>容器编排</SectionTitle>
        <BookCode language="yaml" code={`# docker-compose.yml
version: "3"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./:/var/www
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./:/var/www
      - ./nginx/conf.d:/etc/nginx/conf.d
    networks:
      - app-network

  db:
    image: mysql:5.7
    container_name: db
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: \${DB_DATABASE}
      MYSQL_ROOT_PASSWORD: \${DB_PASSWORD}
      MYSQL_PASSWORD: \${DB_PASSWORD}
      MYSQL_USER: \${DB_USERNAME}
    volumes:
      - dbdata:/var/lib/mysql
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  dbdata:`} />
        <TagGrid items={['Docker', 'Dockerfile', 'docker-compose', '容器化', 'PHP-FPM']} />
      </div>
    ),
  },
  {
    label: '微服务架构',
    left: (
      <div className="space-y-4">
        <SectionTitle>微服务架构</SectionTitle>
        <BookParagraph>微服务架构将应用拆分为独立的服务，每个服务负责特定业务功能。服务之间通过轻量级通信协议交互。</BookParagraph>
        <BookCode language="php" code={`<?php
// 服务发现
class ServiceDiscovery
{
    private $services = [];

    public function register($serviceName, $host, $port)
    {
        $this->services[$serviceName] = [
            "host" => $host,
            "port" => $port,
            "timestamp" => time()
        ];
    }

    public function getService($serviceName)
    {
        return $this->services[$serviceName] ?? null;
    }
}

// 服务通信
class ServiceClient
{
    private $discovery;

    public function __construct(ServiceDiscovery $discovery)
    {
        $this->discovery = $discovery;
    }

    public function call($serviceName, $method, $params = [])
    {
        $service = $this->discovery->getService($serviceName);
        if (!$service) {
            throw new \\Exception("Service not found");
        }

        $url = "http://{$service['host']}:{$service['port']}/{$method}";
        $response = $this->makeRequest($url, $params);

        return json_decode($response, true);
    }

    private function makeRequest($url, $params)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json"
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数据一致性</SectionTitle>
        <BookParagraph>微服务架构中，跨服务的数据一致性通过事件溯源和Saga模式等机制来保证。</BookParagraph>
        <BookCode language="php" code={`<?php
// 事件溯源
class EventStore
{
    private $events = [];

    public function append($aggregateId, $event)
    {
        $this->events[] = [
            "aggregate_id" => $aggregateId,
            "event" => $event,
            "timestamp" => time()
        ];
    }

    public function getEvents($aggregateId)
    {
        return array_filter($this->events, function ($event) use ($aggregateId) {
            return $event["aggregate_id"] === $aggregateId;
        });
    }
}
?>`} />
        <BookCode language="php" code={`<?php
// 配置管理
class ConfigManager
{
    private $config;

    public function __construct()
    {
        $this->config = [
            "app" => [
                "name" => env("APP_NAME", "Laravel"),
                "env" => env("APP_ENV", "production"),
                "debug" => env("APP_DEBUG", false),
            ],
            "database" => [
                "connection" => env("DB_CONNECTION", "mysql"),
                "host" => env("DB_HOST", "127.0.0.1"),
                "port" => env("DB_PORT", "3306"),
                "database" => env("DB_DATABASE", "forge"),
                "username" => env("DB_USERNAME", "forge"),
                "password" => env("DB_PASSWORD", ""),
            ],
        ];
    }

    public function get($key, $default = null)
    {
        return data_get($this->config, $key, $default);
    }
}
?>`} />
        <TagGrid items={['微服务', '服务发现', '事件溯源', 'Saga', '数据一致性']} />
      </div>
    ),
  },
  {
    label: '服务网格与FAQ',
    left: (
      <div className="space-y-4">
        <SectionTitle>服务网格</SectionTitle>
        <BookParagraph>服务网格（Service Mesh）通过代理层管理服务间通信，提供流量管理、安全性和可观测性。Istio是主流的服务网格实现。</BookParagraph>
        <BookCode language="yaml" code={`# istio.yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  profile: default
  components:
    pilot:
      k8s:
        resources:
          requests:
            cpu: 500m
            memory: 2048Mi
    ingressGateways:
    - name: istio-ingressgateway
      enabled: true
      k8s:
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 2000m
            memory: 1024Mi`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>流量管理</SectionTitle>
        <BookCode language="yaml" code={`# virtual-service.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: php-app
spec:
  hosts:
  - "app.example.com"
  gateways:
  - istio-ingressgateway
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        host: php-app
        port:
          number: 80

---
# destination-rule.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: php-app
spec:
  host: php-app
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 1024
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 100`} />
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 如何选择云原生技术栈？</b>根据项目规模、团队技术储备和业务需求选择，小型项目可以使用Docker Compose，大型项目建议使用Kubernetes。</BookParagraph>
        <BookParagraph><b>Q: 如何处理微服务的数据一致性？</b>使用事件溯源、Saga模式或分布式事务来保证数据一致性。</BookParagraph>
        <BookParagraph><b>Q: 如何保证服务的高可用？</b>使用负载均衡、服务发现、健康检查和自动扩缩容等机制。</BookParagraph>
      </div>
    ),
  },
  {
    label: '练习',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={['使用Docker部署PHP应用', '配置Kubernetes部署', '实现微服务架构', '配置服务网格']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>相关标签</SectionTitle>
        <TagGrid items={['云原生', '容器化', '微服务', '健康检查', '配置管理', 'K8s', 'Docker', 'docker-compose', 'Istio', '服务发现', '事件溯源', 'Service Mesh', 'PHP-FPM', 'Ingress', '负载均衡']} />
      </div>
    ),
  },
]

export default function PhpCloudDockerPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
