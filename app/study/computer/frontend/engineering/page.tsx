'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: '前端工程化',
  chapterNumber: 13,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '前端安全', href: '/study/computer/frontend/security' },
  nextChapter: { label: '包管理与构建工具', href: '/study/computer/frontend/build-tools' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '模块化与构建',
    left: (
      <div className="space-y-4">
        <PageTitle>工程化概念与意义</PageTitle>
        <BookParagraph>前端工程化是指用自动化、规范化、流程化手段提升开发效率和质量。包括模块化、自动构建、自动测试、持续集成、代码规范等。目标：高效协作、可维护、易扩展、可持续交付。</BookParagraph>
        <SectionTitle>模块化开发</SectionTitle>
        <BookParagraph>模块化让代码结构清晰、可复用、易维护。主流有ESM和CommonJS。</BookParagraph>
        <BookCode language="javascript" code={`// ESM模块
// math.js
export function add(a, b) { return a + b; }
// main.js
import { add } from './math.js';
console.log(add(1,2));`} />
        <BookCode language="javascript" code={`// CommonJS模块
// math.js
exports.add = (a, b) => a + b;
// main.js
const { add } = require('./math');
console.log(add(1,2));`} />
        <SectionTitle>构建工具</SectionTitle>
        <BookParagraph>Babel用于JS新特性转译，Webpack/Vite用于打包、热更新、代码分割。</BookParagraph>
        <BookParagraph><b>Webpack基础配置：</b></BookParagraph>
        <BookCode language="javascript" code={`// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: __dirname + '/dist' },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
};`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Vite配置</SectionTitle>
        <BookCode language="javascript" code={`// vite.config.js
import { defineConfig } from 'vite';
export default defineConfig({
  root: './src',
  build: { outDir: '../dist' }
});`} />
        <SectionTitle>自动化流程</SectionTitle>
        <BookParagraph><b>CI/CD流程：</b></BookParagraph>
        <BookCode language="yaml" code={`# .github/workflows/ci.yml
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
        run: npm test`} />
        <BookParagraph><b>自动化工具：</b></BookParagraph>
        <BookList items={[
          'Lint（ESLint）：自动检查代码规范',
          'Prettier：自动格式化代码',
          'Jest/Mocha：自动化测试',
        ]} />
        <BookCode language="json" code={`// package.json脚本
{
  "scripts": {
    "lint": "eslint src --fix",
    "test": "jest",
    "format": "prettier --write ."
  }
}`} />
        <TagGrid items={['模块化', 'ESM', 'Webpack', 'Vite', 'CI/CD']} />
      </div>
    ),
  },
  {
    label: '依赖管理与优化',
    left: (
      <div className="space-y-4">
        <PageTitle>依赖管理</PageTitle>
        <BookParagraph>npm、yarn、pnpm等工具用于依赖安装、版本管理、包发布。</BookParagraph>
        <BookCode language="bash" code={`// 安装依赖
npm install react
// 指定版本
npm install lodash@4.17.21
// 卸载依赖
npm uninstall moment
// 全局安装
npm install -g typescript`} />
        <BookCode language="json" code={`// package.json依赖声明
{
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}`} />
        <SectionTitle>代码分包与懒加载</SectionTitle>
        <BookParagraph>通过动态import和路由懒加载提升性能，减少首屏体积。</BookParagraph>
        <BookCode language="javascript" code={`// 动态import
import('lodash').then(_ => {
  console.log(_.chunk([1,2,3,4], 2));
});`} />
        <BookCode language="jsx" code={`// React路由懒加载
const Home = React.lazy(() => import('./Home'));
<Suspense fallback={<div>加载中...</div>}>
  <Home />
</Suspense>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>Webpack多环境配置：</b></BookParagraph>
        <BookCode language="javascript" code={`// webpack.config.js
const mode = process.env.NODE_ENV;
module.exports = {
  mode,
  // ...其它配置
};`} />
        <BookParagraph><b>CI自动部署：</b></BookParagraph>
        <BookCode language="yaml" code={`# .github/workflows/deploy.yml
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
        run: scp -r dist user@server:/var/www/html`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '用Webpack配置一个React项目的打包流程。',
          '用npm scripts实现自动化测试和格式化。',
          '尝试用动态import实现路由懒加载。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'Webpack中文文档：webpack.docschina.org',
          'Vite官方文档：vitejs.dev',
          'npm官方文档：docs.npmjs.com',
        ]} />
        <TagGrid items={['分包', '懒加载', '动态导入', 'dependencies', '练习']} />
      </div>
    ),
  },
]

export default function FrontendEngineeringPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
