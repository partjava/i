'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '自动化部署与CI/CD', chapterNumber: 20, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: 'Swoole与高性能开发', href: '/study/computer/php/swoole-highperf' },
  nextChapter: { label: '云原生与容器化', href: '/study/computer/php/cloud-docker' },
  theme: THEMES.computer,
}

const deployScript = `#!/bin/bash
# 自动化部署脚本
set -e
echo "开始部署..."
git pull origin main
composer install --no-dev
php artisan migrate
php artisan cache:clear
sudo systemctl restart php-fpm
echo "部署完成"`

const SPREADS = [
  {
    label: '自动化部署',
    left: (<div className="space-y-4"><PageTitle>自动化部署</PageTitle><BookParagraph>部署脚本、环境配置、版本管理。</BookParagraph><BookCode language="bash" code={deployScript} /></div>),
    right: (<div className="space-y-4"><SectionTitle>CI/CD基础</SectionTitle><BookParagraph>持续集成、持续部署、自动化测试。</BookParagraph><BookCode language="yaml" code={`name: PHP CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with: { php-version: '8.2' }
    - run: composer install
    - run: vendor/bin/phpunit`} /><TagGrid items={['CI/CD', '部署', '自动化', '测试', '脚本']} /></div>),
  },
  {
    label: 'GitHub Actions',
    left: (<div className="space-y-4"><PageTitle>GitHub Actions</PageTitle><BookParagraph>工作流配置、自动化测试、自动部署。</BookParagraph><BookCode language="yaml" code={`name: PHP CI
on: [push]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Jenkins</SectionTitle><BookParagraph>Jenkins配置、流水线配置、自动化部署。</BookParagraph><BookCode language="groovy" code={`pipeline {
    agent any
    stages {
        stage('Build') { steps { sh 'composer install' } }
        stage('Test') { steps { sh 'vendor/bin/phpunit' } }
        stage('Deploy') { steps { sh 'bash deploy.sh' } }
    }
}`} /><TagGrid items={['GitHub Actions', 'Jenkins', 'Pipeline', '测试', '部署']} /></div>),
  },
  {
    label: 'Docker部署',
    left: (<div className="space-y-4"><PageTitle>Docker部署</PageTitle><BookParagraph>Docker配置、容器编排、环境变量。</BookParagraph><BookCode language="dockerfile" code={`FROM php:8.2-fpm
RUN docker-php-ext-install pdo_mysql
COPY . /app
WORKDIR /app`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>容器编排</SectionTitle><BookCode language="yaml" code={`version: '3'
services:
  app:
    build: .
    ports: ["9000:9000"]
  nginx:
    image: nginx:alpine
    ports: ["80:80"]`} /><TagGrid items={['Docker', 'docker-compose', 'Dockerfile', 'Nginx', '容器']} /></div>),
  },
  {
    label: '练习与FAQ',
    left: (<div className="space-y-4"><SectionTitle>常见问题</SectionTitle><BookParagraph><b>Q: CI/CD的核心优势？</b><br />A: 自动化测试和部署，减少人工错误。</BookParagraph><BookParagraph><b>Q: GitHub Actions和Jenkins区别？</b><br />A: GitHub Actions集成在GitHub，Jenkins更灵活。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>练习</SectionTitle><BookList items={['编写部署脚本实现自动更新', '配置GitHub Actions自动测试', '用Docker部署PHP应用', '配置自动化CI/CD流水线']} /><TagGrid items={['练习', 'FAQ', 'CI/CD', 'Docker', '部署']} /></div>),
  },
]

export default function PhpDevopsCicdPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
