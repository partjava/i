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
  chapterTitle: '包管理与构建工具',
  chapterNumber: 14,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '前端工程化', href: '/study/computer/frontend/engineering' },
  nextChapter: { label: '性能优化', href: '/study/computer/frontend/performance' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '包管理器',
    left: (
      <div className="space-y-4">
        <PageTitle>包管理器原理</PageTitle>
        <BookList items={[
          'npm：最早、最广泛，依赖树扁平，node_modules体积大。',
          'yarn：速度快，锁文件yarn.lock，支持workspaces。',
          'pnpm：磁盘复用，依赖隔离，体积小，速度快。',
        ]} />
        <BookCode language="text" code={`// 锁文件保证依赖一致性
// npm: package-lock.json
// yarn: yarn.lock
// pnpm: pnpm-lock.yaml`} />
        <BookCode language="bash" code={`// 查看依赖树
npm ls
pnpm list
yarn list`} />
        <SectionTitle>常用命令与配置</SectionTitle>
        <BookParagraph>包管理器常用命令：安装、卸载、升级、运行脚本等。</BookParagraph>
        <BookCode language="bash" code={`npm install react
npm uninstall lodash
npm update
npm run build
npm run test`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="json" code={`// scripts配置
{
  "scripts": {
    "start": "node index.js",
    "dev": "vite",
    "build": "webpack --mode production"
  }
}`} />
        <SectionTitle>版本控制与发布</SectionTitle>
        <BookParagraph>npm包采用semver语义化版本，支持发布到npm或私有仓库。</BookParagraph>
        <BookCode language="text" code={`// 版本号格式：主.次.补丁
1.2.3`} />
        <BookList items={[
          '^1.0.0：兼容更新（允许主版本不变）',
          '~1.0.0：补丁更新（仅允许补丁版本变化）',
        ]} />
        <BookCode language="bash" code={`// 发布包
npm publish
// 发布到私有仓库
npm config set registry https://npm.mycompany.com`} />
        <TagGrid items={['npm', 'yarn', 'pnpm', 'semver', 'publish']} />
      </div>
    ),
  },
  {
    label: '构建工具与配置',
    left: (
      <div className="space-y-4">
        <PageTitle>构建工具原理</PageTitle>
        <BookList items={[
          '打包：将多个模块合并为一个或多个文件。',
          '转译：Babel/TypeScript将新语法转为兼容代码。',
          '压缩：UglifyJS/Terser压缩体积。',
          'Tree Shaking：移除未用代码，减小包体积。',
        ]} />
        <BookCode language="javascript" code={`// Tree Shaking示例
// math.js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
// main.js
import { add } from './math'; // 只会打包add`} />
        <SectionTitle>Babel配置</SectionTitle>
        <BookCode language="json" code={`// .babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}`} />
        <SectionTitle>TypeScript配置</SectionTitle>
        <BookCode language="json" code={`// tsconfig.json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "strict": true
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>多包管理（Monorepo）：</b></BookParagraph>
        <BookCode language="yaml" code={`# pnpm-workspace.yaml
packages:
  - 'packages/*'`} />
        <BookParagraph><b>构建优化：</b></BookParagraph>
        <BookCode language="javascript" code={`// 按需加载
import('lodash').then(_ => _.chunk([1,2,3], 2));
// 生产环境去除console（terser-webpack-plugin配置）
minimizer: [
  new TerserPlugin({
    terserOptions: { compress: { drop_console: true } }
  })
]`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '用npm scripts实现自动化构建和测试。',
          '配置Babel和TypeScript支持React项目。',
          '尝试用pnpm管理多包项目。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'npm官方文档：docs.npmjs.com',
          'Babel中文文档：babel.docschina.org',
          'TypeScript官网：www.typescriptlang.org',
        ]} />
        <TagGrid items={['Babel', 'TypeScript', 'Monorepo', '优化', '练习']} />
      </div>
    ),
  },
]

export default function FrontendBuildToolsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
