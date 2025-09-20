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
    label: '包管理器原理',
    children: (
      <>
        <Card title="npm/yarn/pnpm对比" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>npm：最早、最广泛，依赖树扁平，node_modules体积大。</li>
            <li>yarn：速度快，锁文件yarn.lock，支持workspaces。</li>
            <li>pnpm：磁盘复用，依赖隔离，体积小，速度快。</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// 锁文件保证依赖一致性
// npm: package-lock.json
yarn: yarn.lock
pnpm: pnpm-lock.yaml`}</pre>
        <pre style={codeBlockStyle}>{`// 查看依赖树
npm ls
pnpm list
yarn list`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '常用命令与配置',
    children: (
      <>
        <Paragraph>包管理器常用命令：安装、卸载、升级、运行脚本等。</Paragraph>
        <pre style={codeBlockStyle}>{`npm install react
npm uninstall lodash
npm update
npm run build
npm run test`}</pre>
        <pre style={codeBlockStyle}>{`// scripts配置
{
  "scripts": {
    "start": "node index.js",
    "dev": "vite",
    "build": "webpack --mode production"
  }
}`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '构建工具原理',
    children: (
      <>
        <Card title="打包/转译/压缩/Tree Shaking" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>打包：将多个模块合并为一个或多个文件</li>
            <li>转译：Babel/TypeScript将新语法转为兼容代码</li>
            <li>压缩：UglifyJS/Terser压缩体积</li>
            <li>Tree Shaking：移除未用代码，减小包体积</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// Tree Shaking示例
// math.js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
// main.js
import { add } from './math'; // 只会打包add`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: 'Babel/TypeScript配置',
    children: (
      <>
        <Card title="Babel配置" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}`}</pre>
        </Card>
        <Card title="TypeScript配置" size="small">
          <pre style={codeBlockStyle}>{`// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "strict": true
  }
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '版本控制与发布',
    children: (
      <>
        <Paragraph>npm包采用semver语义化版本，支持发布到npm或私有仓库。</Paragraph>
        <pre style={codeBlockStyle}>{`// 版本号格式：主.次.补丁
1.2.3
// 发布包
npm publish
// 发布到私有仓库
npm config set registry https://npm.mycompany.com`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '实战案例',
    children: (
      <>
        <Card title="多包管理（Monorepo）" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// pnpm workspace配置
// pnpm-workspace.yaml
packages:
  - 'packages/*'`}</pre>
        </Card>
        <Card title="构建优化" size="small">
          <pre style={codeBlockStyle}>{`// 按需加载
import('lodash').then(_ => _.chunk([1,2,3], 2));
// 生产环境去除console
// terser-webpack-plugin配置
minimizer: [
  new TerserPlugin({
    terserOptions: { compress: { drop_console: true } }
  })
]`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用npm scripts实现自动化构建和测试。</li>
          <li>配置Babel和TypeScript支持React项目。</li>
          <li>尝试用pnpm管理多包项目。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://docs.npmjs.com/" target="_blank" rel="noopener noreferrer">npm官方文档</a></li>
          <li><a href="https://babel.docschina.org/" target="_blank" rel="noopener noreferrer">Babel中文文档</a></li>
          <li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript官网</a></li>
        </ul>
      </>
    ),
  },
];

export default function BuildToolsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>包管理与构建工具</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/engineering"
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
          上一章：前端工程化
        </a>
        <a
          href="/study/frontend/performance"
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
          下一章：性能优化
        </a>
      </div>
    </div>
  );
} 