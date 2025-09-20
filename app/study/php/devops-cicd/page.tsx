'use client';

import { useState } from 'react';

const tabs = [
  { key: 'deployment', label: '自动化部署' },
  { key: 'cicd', label: 'CI/CD基础' },
  { key: 'github', label: 'GitHub Actions' },
  { key: 'jenkins', label: 'Jenkins' },
  { key: 'docker', label: 'Docker部署' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpDevOpsCICDPage() {
  const [activeTab, setActiveTab] = useState('deployment');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">自动化部署与CI/CD</h1>
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
        {activeTab === 'deployment' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">自动化部署</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>部署脚本。</li>
              <li>环境配置。</li>
              <li>版本管理。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '#!/bin/bash',
  '# 自动化部署脚本',
  '',
  '# 1. 环境变量配置',
  'ENV="production"',
  'APP_PATH="/var/www/app"',
  'BACKUP_PATH="/var/www/backup"',
  'RELEASE_PATH="/var/www/releases"',
  '',
  '# 2. 创建备份',
  'backup() {',
  '    echo "Creating backup..."',
  '    TIMESTAMP=$(date +%Y%m%d%H%M%S)',
  '    tar -czf "${BACKUP_PATH}/backup_${TIMESTAMP}.tar.gz" "${APP_PATH}"',
  '}',
  '',
  '# 3. 拉取代码',
  'pull_code() {',
  '    echo "Pulling latest code..."',
  '    cd "${APP_PATH}"',
  '    git pull origin master',
  '}',
  '',
  '# 4. 安装依赖',
  'install_dependencies() {',
  '    echo "Installing dependencies..."',
  '    cd "${APP_PATH}"',
  '    composer install --no-dev --optimize-autoloader',
  '    npm install --production',
  '    npm run build',
  '}',
  '',
  '# 5. 更新数据库',
  'update_database() {',
  '    echo "Updating database..."',
  '    cd "${APP_PATH}"',
  '    php artisan migrate --force',
  '}',
  '',
  '# 6. 清理缓存',
  'clear_cache() {',
  '    echo "Clearing cache..."',
  '    cd "${APP_PATH}"',
  '    php artisan config:cache',
  '    php artisan route:cache',
  '    php artisan view:cache',
  '}',
  '',
  '# 7. 重启服务',
  'restart_services() {',
  '    echo "Restarting services..."',
  '    sudo systemctl restart php-fpm',
  '    sudo systemctl restart nginx',
  '}',
  '',
  '# 8. 主函数',
  'main() {',
  '    backup',
  '    pull_code',
  '    install_dependencies',
  '    update_database',
  '    clear_cache',
  '    restart_services',
  '    echo "Deployment completed successfully!"',
  '}',
  '',
  '# 执行主函数',
  'main',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'cicd' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">CI/CD基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>持续集成。</li>
              <li>持续部署。</li>
              <li>自动化测试。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// .gitlab-ci.yml',
  'stages:',
  '  - test',
  '  - build',
  '  - deploy',
  '',
  'variables:',
  '  DOCKER_DRIVER: overlay2',
  '',
  'test:',
  '  stage: test',
  '  image: php:7.4',
  '  script:',
  '    - apt-get update && apt-get install -y git unzip',
  '    - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer',
  '    - composer install',
  '    - vendor/bin/phpunit',
  '',
  'build:',
  '  stage: build',
  '  image: docker:latest',
  '  services:',
  '    - docker:dind',
  '  script:',
  '    - docker build -t myapp:$CI_COMMIT_SHA .',
  '    - docker tag myapp:$CI_COMMIT_SHA myapp:latest',
  '',
  'deploy:',
  '  stage: deploy',
  '  image: alpine:latest',
  '  script:',
  '    - apk add --no-cache openssh-client',
  '    - eval $(ssh-agent -s)',
  '    - echo "$SSH_PRIVATE_KEY" | tr -d "\\r" | ssh-add -',
  '    - mkdir -p ~/.ssh',
  '    - chmod 700 ~/.ssh',
  '    - ssh-keyscan $SERVER_IP >> ~/.ssh/known_hosts',
  '    - chmod 644 ~/.ssh/known_hosts',
  '    - ssh $SERVER_USER@$SERVER_IP "cd /var/www/app && git pull && composer install --no-dev && php artisan migrate --force"',
  '',
  '// Jenkinsfile',
  'pipeline {',
  '    agent any',
  '    stages {',
  '        stage("Test") {',
  '            steps {',
  '                sh "composer install"',
  '                sh "vendor/bin/phpunit"',
  '            }',
  '        }',
  '        stage("Build") {',
  '            steps {',
  '                sh "docker build -t myapp:$BUILD_NUMBER ."',
  '            }',
  '        }',
  '        stage("Deploy") {',
  '            steps {',
  '                sh "docker push myapp:$BUILD_NUMBER"',
  '                sh "ssh user@server \'docker pull myapp:$BUILD_NUMBER && docker-compose up -d\'"',
  '            }',
  '        }',
  '    }',
  '}',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'github' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">GitHub Actions</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>工作流配置。</li>
              <li>自动化测试。</li>
              <li>自动部署。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'name: PHP CI',
  '',
  'on:',
  '  push:',
  '    branches: [ master ]',
  '  pull_request:',
  '    branches: [ master ]',
  '',
  'jobs:',
  '  test:',
  '    runs-on: ubuntu-latest',
  '',
  '    steps:',
  '    - uses: actions/checkout@v2',
  '',
  '    - name: Setup PHP',
  '      uses: shivammathur/setup-php@v2',
  '      with:',
  '        php-version: "7.4"',
  '        extensions: mbstring, xml, curl, json, intl, zip, pdo, mysql',
  '',
  '    - name: Install dependencies',
  '      run: composer install --no-progress --prefer-dist --optimize-autoloader',
  '',
  '    - name: Run tests',
  '      run: vendor/bin/phpunit',
  '',
  '  deploy:',
  '    needs: test',
  '    runs-on: ubuntu-latest',
  '    if: github.ref == "refs/heads/master"',
  '',
  '    steps:',
  '    - uses: actions/checkout@v2',
  '',
  '    - name: Setup SSH',
  '      uses: webfactory/ssh-agent@v0.5.3',
  '      with:',
  '        ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}',
  '',
  '    - name: Add known hosts',
  '      run: ssh-keyscan ${{ secrets.SERVER_IP }} >> ~/.ssh/known_hosts',
  '',
  '    - name: Deploy',
  '      run: |',
  '        ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }} "',
  '          cd /var/www/app &&',
  '          git pull &&',
  '          composer install --no-dev &&',
  '          php artisan migrate --force &&',
  '          php artisan config:cache &&',
  '          php artisan route:cache &&',
  '          php artisan view:cache',
  '        "',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'jenkins' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jenkins</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Jenkins配置。</li>
              <li>流水线配置。</li>
              <li>自动化部署。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// Jenkinsfile',
  'pipeline {',
  '    agent any',
  '',
  '    environment {',
  '        APP_ENV = "production"',
  '        DOCKER_REGISTRY = "registry.example.com"',
  '    }',
  '',
  '    stages {',
  '        stage("Checkout") {',
  '            steps {',
  '                checkout scm',
  '            }',
  '        }',
  '',
  '        stage("Test") {',
  '            steps {',
  '                sh "composer install"',
  '                sh "vendor/bin/phpunit"',
  '            }',
  '        }',
  '',
  '        stage("Build") {',
  '            steps {',
  '                sh "docker build -t ${DOCKER_REGISTRY}/myapp:${BUILD_NUMBER} ."',
  '            }',
  '        }',
  '',
  '        stage("Push") {',
  '            steps {',
  '                withCredentials([usernamePassword(credentialsId: "docker-registry", usernameVariable: "DOCKER_USER", passwordVariable: "DOCKER_PASS")]) {',
  '                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS} ${DOCKER_REGISTRY}"',
  '                    sh "docker push ${DOCKER_REGISTRY}/myapp:${BUILD_NUMBER}"',
  '                }',
  '            }',
  '        }',
  '',
  '        stage("Deploy") {',
  '            steps {',
  '                sshagent(["server-ssh-key"]) {',
  '                    sh "ssh user@server \"docker pull ${DOCKER_REGISTRY}/myapp:${BUILD_NUMBER} && docker-compose down && docker-compose up -d\""',
  '                }',
  '            }',
  '        }',
  '    }',
  '',
  '    post {',
  '        success {',
  '            echo "Deployment successful!"',
  '        }',
  '        failure {',
  '            echo "Deployment failed!"',
  '        }',
  '    }',
  '}',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'docker' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Docker部署</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Docker配置。</li>
              <li>容器编排。</li>
              <li>环境变量。</li>
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
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何选择CI/CD工具？</b><br />A: 根据项目规模和团队需求选择，小型项目可以使用GitHub Actions，大型项目建议使用Jenkins。</li>
              <li><b>Q: 如何处理部署失败？</b><br />A: 设置回滚机制，保留备份，使用蓝绿部署或金丝雀发布。</li>
              <li><b>Q: 如何保证部署安全？</b><br />A: 使用密钥管理，限制访问权限，加密敏感信息。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>配置GitHub Actions自动化部署。</li>
              <li>使用Jenkins搭建CI/CD流水线。</li>
              <li>实现Docker容器化部署。</li>
              <li>配置自动化测试和部署。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/swoole-highperf"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：Swoole与高性能开发
          </a>
          <a
            href="/study/php/cloud-docker"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：云原生与容器化
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 