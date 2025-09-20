'use client';

import React from 'react';
import { Typography, Card, Divider, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const codeBlockStyle = {
  background: '#f6f8fa',
  borderRadius: 6,
  padding: '12px 16px',
  fontSize: 15,
  margin: '12px 0',
  fontFamily: 'monospace',
  overflowX: 'auto' as const,
};

const tabItems = [
  {
    key: '1',
    label: '工程化概念与意义',
    children: (
      <>
        <Card title="什么是前端工程化？" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>工程化是指用自动化、规范化、流程化手段提升开发效率和质量。</li>
            <li>包括模块化、自动构建、自动测试、持续集成、代码规范等。</li>
            <li>目标：高效协作、可维护、易扩展、可持续交付。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '模块化开发',
    children: (
      <>
        <Paragraph>模块化让代码结构清晰、可复用、易维护。主流有ESM和CommonJS。</Paragraph>
        <pre style={codeBlockStyle}>{`// ESM模块
// math.js
export function add(a, b) { return a + b; }
// main.js
import { add } from './math.js';
console.log(add(1,2));`}</pre>
        <pre style={codeBlockStyle}>{`// CommonJS模块
// math.js
exports.add = (a, b) => a + b;
// main.js
const { add } = require('./math');
console.log(add(1,2));`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '构建工具',
    children: (
      <>
        <Card title="Webpack基础配置" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};`}</pre>
        </Card>
        <Card title="Vite配置" size="small">
          <pre style={codeBlockStyle}>{`// vite.config.js
import { defineConfig } from 'vite';
export default defineConfig({
  root: './src',
  build: { outDir: '../dist' }
});`}</pre>
        </Card>
        <ul>
          <li>Babel用于JS新特性转译</li>
          <li>Webpack/Vite用于打包、热更新、代码分割</li>
        </ul>
      </>
    ),
  },
  {
    key: '4',
    label: '自动化流程',
    children: (
      <>
        <Card title="CI/CD流程" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`# .github/workflows/ci.yml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 安装依赖
        run: npm install
      - name: 运行测试
        run: npm test`}</pre>
        </Card>
        <Card title="自动化工具" size="small">
          <ul>
            <li>Lint（ESLint）：自动检查代码规范</li>
            <li>Prettier：自动格式化代码</li>
            <li>Jest/Mocha：自动化测试</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// package.json脚本
{
  "scripts": {
    "lint": "eslint src --fix",
    "test": "jest",
    "format": "prettier --write ."
  }
}`}</pre>
      </>
    ),
  },
  {
    key: '5',
    label: '依赖管理',
    children: (
      <>
        <Paragraph>npm、yarn、pnpm等工具用于依赖安装、版本管理、包发布。</Paragraph>
        <pre style={codeBlockStyle}>{`// 安装依赖
npm install react
// 指定版本
npm install lodash@4.17.21
// 卸载依赖
npm uninstall moment
// 全局安装
npm install -g typescript`}</pre>
        <pre style={codeBlockStyle}>{`// package.json依赖声明
{
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '代码分包与懒加载',
    children: (
      <>
        <Paragraph>通过动态import和路由懒加载提升性能，减少首屏体积。</Paragraph>
        <pre style={codeBlockStyle}>{`// 动态import
import('lodash').then(_ => {
  console.log(_.chunk([1,2,3,4], 2));
});`}</pre>
        <pre style={codeBlockStyle}>{`// React路由懒加载
const Home = React.lazy(() => import('./Home'));
<Suspense fallback={<div>加载中...</div>}>
  <Home />
</Suspense>`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="Webpack多环境配置" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// webpack.config.js
const mode = process.env.NODE_ENV;
module.exports = {
  mode,
  // ...其它配置
};`}</pre>
        </Card>
        <Card title="CI自动部署" size="small">
          <pre style={codeBlockStyle}>{`# .github/workflows/deploy.yml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 构建
        run: npm run build
      - name: 部署
        run: scp -r dist user@server:/var/www/html`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '8',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用Webpack配置一个React项目的打包流程。</li>
          <li>用npm scripts实现自动化测试和格式化。</li>
          <li>尝试用动态import实现路由懒加载。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://webpack.docschina.org/" target="_blank" rel="noopener noreferrer">Webpack中文文档</a></li>
          <li><a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite官方文档</a></li>
          <li><a href="https://docs.npmjs.com/" target="_blank" rel="noopener noreferrer">npm官方文档</a></li>
        </ul>
      </>
    ),
  },
];

export default function EngineeringPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>前端工程化</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/security"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          上一章：前端安全
        </a>
        <a
          href="/study/frontend/build-tools"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          下一章：包管理与构建工具
        </a>
      </div>
    </div>
  );
} 