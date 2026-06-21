'use client';

import { useState } from 'react';

const tabs = [
  { key: 'cloud', label: '云原生基础' },
  { key: 'k8s', label: 'Kubernetes' },
  { key: 'docker', label: 'Docker' },
  { key: 'microservice', label: '微服务架构' },
  { key: 'service-mesh', label: '服务网格' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpCloudDockerPage() {
  const [activeTab, setActiveTab] = useState('cloud');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">云原生与容器化</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'cloud' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">云原生基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>云原生概念。</li>
              <li>容器化技术。</li>
              <li>微服务架构。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 云原生应用示例',
  '<?php',
  '',
  '// 1. 环境变量配置',
  '// .env',
  'APP_ENV=production',
  'APP_DEBUG=false',
  'DB_CONNECTION=mysql',
  'DB_HOST=mysql',
  'DB_PORT=3306',
  'DB_DATABASE=app',
  'DB_USERNAME=root',
  'DB_PASSWORD=password',
  '',
  '// 2. 健康检查',
  'class HealthCheckController extends Controller',
  '{',
  '    public function check()',
  '    {',
  '        return response()->json([',
  '            "status" => "healthy",',
  '            "timestamp" => time(),',
  '            "services" => [',
  '                "database" => $this->checkDatabase(),',
  '                "cache" => $this->checkCache(),',
  '                "storage" => $this->checkStorage()',
  '            ]',
  '        ]);',
  '    }',
  '',
  '    private function checkDatabase()',
  '    {',
  '        try {',
  '            DB::connection()->getPdo();',
  '            return "healthy";',
  '        } catch (\\Exception $e) {',
  '            return "unhealthy";',
  '        }',
  '    }',
  '',
  '    private function checkCache()',
  '    {',
  '        try {',
  '            Cache::put("health_check", "ok", 1);',
  '            return Cache::get("health_check") === "ok" ? "healthy" : "unhealthy";',
  '        } catch (\\Exception $e) {',
  '            return "unhealthy";',
  '        }',
  '    }',
  '',
  '    private function checkStorage()',
  '    {',
  '        try {',
  '            Storage::disk("local")->put("health_check.txt", "ok");',
  '            return Storage::disk("local")->get("health_check.txt") === "ok" ? "healthy" : "unhealthy";',
  '        } catch (\\Exception $e) {',
  '            return "unhealthy";',
  '        }',
  '    }',
  '}',
  '',
  '// 3. 配置管理',
  'class ConfigManager',
  '{',
  '    private $config;',
  '',
  '    public function __construct()',
  '    {',
  '        $this->config = [',
  '            "app" => [',
  '                "name" => env("APP_NAME", "Laravel"),',
  '                "env" => env("APP_ENV", "production"),',
  '                "debug" => env("APP_DEBUG", false),',
  '            ],',
  '            "database" => [',
  '                "connection" => env("DB_CONNECTION", "mysql"),',
  '                "host" => env("DB_HOST", "127.0.0.1"),',
  '                "port" => env("DB_PORT", "3306"),',
  '                "database" => env("DB_DATABASE", "forge"),',
  '                "username" => env("DB_USERNAME", "forge"),',
  '                "password" => env("DB_PASSWORD", ""),',
  '            ],',
  '        ];',
  '    }',
  '',
  '    public function get($key, $default = null)',
  '    {',
  '        return data_get($this->config, $key, $default);',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'k8s' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Kubernetes</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Kubernetes基础。</li>
              <li>部署配置。</li>
              <li>服务发现。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# deployment.yaml',
  'apiVersion: apps/v1',
  'kind: Deployment',
  'metadata:',
  '  name: php-app',
  '  labels:',
  '    app: php-app',
  'spec:',
  '  replicas: 3',
  '  selector:',
  '    matchLabels:',
  '      app: php-app',
  '  template:',
  '    metadata:',
  '      labels:',
  '        app: php-app',
  '    spec:',
  '      containers:',
  '      - name: php-app',
  '        image: php-app:latest',
  '        ports:',
  '        - containerPort: 80',
  '        env:',
  '        - name: APP_ENV',
  '          value: "production"',
  '        - name: DB_HOST',
  '          valueFrom:',
  '            configMapKeyRef:',
  '              name: app-config',
  '              key: db_host',
  '        resources:',
  '          limits:',
  '            cpu: "1"',
  '            memory: "1Gi"',
  '          requests:',
  '            cpu: "500m"',
  '            memory: "512Mi"',
  '        livenessProbe:',
  '          httpGet:',
  '            path: /health',
  '            port: 80',
  '          initialDelaySeconds: 30',
  '          periodSeconds: 10',
  '        readinessProbe:',
  '          httpGet:',
  '            path: /health',
  '            port: 80',
  '          initialDelaySeconds: 5',
  '          periodSeconds: 5',
  '',
  '# service.yaml',
  'apiVersion: v1',
  'kind: Service',
  'metadata:',
  '  name: php-app',
  'spec:',
  '  selector:',
  '    app: php-app',
  '  ports:',
  '  - protocol: TCP',
  '    port: 80',
  '    targetPort: 80',
  '  type: ClusterIP',
  '',
  '# ingress.yaml',
  'apiVersion: networking.k8s.io/v1',
  'kind: Ingress',
  'metadata:',
  '  name: php-app',
  '  annotations:',
  '    nginx.ingress.kubernetes.io/rewrite-target: /',
  'spec:',
  '  rules:',
  '  - host: app.example.com',
  '    http:',
  '      paths:',
  '      - path: /',
  '        pathType: Prefix',
  '        backend:',
  '          service:',
  '            name: php-app',
  '            port:',
  '              number: 80',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'docker' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Docker</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Docker基础。</li>
              <li>镜像构建。</li>
              <li>容器编排。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# Dockerfile',
  'FROM php:7.4-fpm',
  '',
  '# 安装系统依赖',
  'RUN apt-get update && apt-get install -y \\',
  '    git \\',
  '    curl \\',
  '    libpng-dev \\',
  '    libonig-dev \\',
  '    libxml2-dev \\',
  '    zip \\',
  '    unzip',
  '',
  '# 安装PHP扩展',
  'RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd',
  '',
  '# 安装Composer',
  'COPY --from=composer:latest /usr/bin/composer /usr/bin/composer',
  '',
  '# 设置工作目录',
  'WORKDIR /var/www',
  '',
  '# 复制项目文件',
  'COPY . /var/www',
  '',
  '# 安装依赖',
  'RUN composer install --no-dev --optimize-autoloader',
  '',
  '# 设置权限',
  'RUN chown -R www-data:www-data /var/www',
  '',
  '# 暴露端口',
  'EXPOSE 9000',
  '',
  '# 启动命令',
  'CMD ["php-fpm"]',
  '',
  '# docker-compose.yml',
  'version: "3"',
  '',
  'services:',
  '  app:',
  '    build:',
  '      context: .',
  '      dockerfile: Dockerfile',
  '    container_name: app',
  '    restart: unless-stopped',
  '    working_dir: /var/www',
  '    volumes:',
  '      - ./:/var/www',
  '    networks:',
  '      - app-network',
  '',
  '  nginx:',
  '    image: nginx:alpine',
  '    container_name: nginx',
  '    restart: unless-stopped',
  '    ports:',
  '      - "80:80"',
  '    volumes:',
  '      - ./:/var/www',
  '      - ./nginx/conf.d:/etc/nginx/conf.d',
  '    networks:',
  '      - app-network',
  '',
  '  db:',
  '    image: mysql:5.7',
  '    container_name: db',
  '    restart: unless-stopped',
  '    environment:',
  '      MYSQL_DATABASE: ${DB_DATABASE}',
  '      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}',
  '      MYSQL_PASSWORD: ${DB_PASSWORD}',
  '      MYSQL_USER: ${DB_USERNAME}',
  '    volumes:',
  '      - dbdata:/var/lib/mysql',
  '    networks:',
  '      - app-network',
  '',
  'networks:',
  '  app-network:',
  '    driver: bridge',
  '',
  'volumes:',
  '  dbdata:',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'microservice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">微服务架构</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>微服务设计。</li>
              <li>服务通信。</li>
              <li>数据一致性。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 微服务示例',
  '',
  '// 1. 服务发现',
  'class ServiceDiscovery',
  '{',
  '    private $services = [];',
  '',
  '    public function register($serviceName, $host, $port)',
  '    {',
  '        $this->services[$serviceName] = [',
  '            "host" => $host,',
  '            "port" => $port,',
  '            "timestamp" => time()',
  '        ];',
  '    }',
  '',
  '    public function getService($serviceName)',
  '    {',
  '        return $this->services[$serviceName] ?? null;',
  '    }',
  '}',
  '',
  '// 2. 服务通信',
  'class ServiceClient',
  '{',
  '    private $discovery;',
  '',
  '    public function __construct(ServiceDiscovery $discovery)',
  '    {',
  '        $this->discovery = $discovery;',
  '    }',
  '',
  '    public function call($serviceName, $method, $params = [])',
  '    {',
  '        $service = $this->discovery->getService($serviceName);',
  '        if (!$service) {',
  '            throw new \\Exception("Service not found");',
  '        }',
  '',
  '        $url = "http://{$service[\'host\']}:{$service[\'port\']}/{$method}";',
  '        $response = $this->makeRequest($url, $params);',
  '',
  '        return json_decode($response, true);',
  '    }',
  '',
  '    private function makeRequest($url, $params)',
  '    {',
  '        $ch = curl_init();',
  '        curl_setopt($ch, CURLOPT_URL, $url);',
  '        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);',
  '        curl_setopt($ch, CURLOPT_POST, true);',
  '        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));',
  '        curl_setopt($ch, CURLOPT_HTTPHEADER, [',
  '            "Content-Type: application/json"',
  '        ]);',
  '',
  '        $response = curl_exec($ch);',
  '        curl_close($ch);',
  '',
  '        return $response;',
  '    }',
  '}',
  '',
  '// 3. 数据一致性',
  'class EventStore',
  '{',
  '    private $events = [];',
  '',
  '    public function append($aggregateId, $event)',
  '    {',
  '        $this->events[] = [',
  '            "aggregate_id" => $aggregateId,',
  '            "event" => $event,',
  '            "timestamp" => time()',
  '        ];',
  '    }',
  '',
  '    public function getEvents($aggregateId)',
  '    {',
  '        return array_filter($this->events, function ($event) use ($aggregateId) {',
  '            return $event["aggregate_id"] === $aggregateId;',
  '        });',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'service-mesh' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">服务网格</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>服务网格概念。</li>
              <li>流量管理。</li>
              <li>可观测性。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '# istio.yaml',
  'apiVersion: install.istio.io/v1alpha1',
  'kind: IstioOperator',
  'spec:',
  '  profile: default',
  '  components:',
  '    pilot:',
  '      k8s:',
  '        resources:',
  '          requests:',
  '            cpu: 500m',
  '            memory: 2048Mi',
  '    ingressGateways:',
  '    - name: istio-ingressgateway',
  '      enabled: true',
  '      k8s:',
  '        resources:',
  '          requests:',
  '            cpu: 100m',
  '            memory: 128Mi',
  '          limits:',
  '            cpu: 2000m',
  '            memory: 1024Mi',
  '',
  '# virtual-service.yaml',
  'apiVersion: networking.istio.io/v1alpha3',
  'kind: VirtualService',
  'metadata:',
  '  name: php-app',
  'spec:',
  '  hosts:',
  '  - "app.example.com"',
  '  gateways:',
  '  - istio-ingressgateway',
  '  http:',
  '  - match:',
  '    - uri:',
  '        prefix: /',
  '    route:',
  '    - destination:',
  '        host: php-app',
  '        port:',
  '          number: 80',
  '',
  '# destination-rule.yaml',
  'apiVersion: networking.istio.io/v1alpha3',
  'kind: DestinationRule',
  'metadata:',
  '  name: php-app',
  'spec:',
  '  host: php-app',
  '  trafficPolicy:',
  '    loadBalancer:',
  '      simple: ROUND_ROBIN',
  '    connectionPool:',
  '      tcp:',
  '        maxConnections: 100',
  '      http:',
  '        http1MaxPendingRequests: 1024',
  '        maxRequestsPerConnection: 10',
  '    outlierDetection:',
  '      consecutive5xxErrors: 5',
  '      interval: 30s',
  '      baseEjectionTime: 30s',
  '      maxEjectionPercent: 100',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何选择云原生技术栈？</b><br />A: 根据项目规模、团队技术储备和业务需求选择，小型项目可以使用Docker Compose，大型项目建议使用Kubernetes。</li>
              <li><b>Q: 如何处理微服务的数据一致性？</b><br />A: 使用事件溯源、Saga模式或分布式事务来保证数据一致性。</li>
              <li><b>Q: 如何保证服务的高可用？</b><br />A: 使用负载均衡、服务发现、健康检查和自动扩缩容等机制。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>使用Docker部署PHP应用。</li>
              <li>配置Kubernetes部署。</li>
              <li>实现微服务架构。</li>
              <li>配置服务网格。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/devops-cicd"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：自动化部署与CI/CD
          </a>
          <a
            href="/study/php/faq"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：常见问题与面试题
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 