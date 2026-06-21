'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: 'CSS高级与预处理器',
  chapterNumber: 6,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'CSS动画与过渡', href: '/study/computer/frontend/css-animation' },
  nextChapter: { label: '响应式设计', href: '/study/computer/frontend/responsive' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '选择器进阶',
    left: (
      <div className="space-y-4">
        <PageTitle>选择器进阶</PageTitle>
        <BookList items={[
          '属性选择器：[type="text"]、[data-id]',
          '伪类选择器：:hover、:nth-child、:not()',
          '伪元素选择器：::before、::after',
          '组合选择器：.a > .b、.a + .b、.a ~ .b',
        ]} />
        <BookCode language="css" code={`/* 高级选择器 */
[data-active="true"] { border-color: blue; }
li:nth-child(odd) { background: #f5f5f5; }
p:not(.intro) { color: gray; }
.card::before { content: "★"; color: gold; }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>层叠与优先级</SectionTitle>
        <BookList items={[
          '优先级：!important > 内联 > ID > 类/伪类 > 元素 > 通配',
          '同优先级后定义的覆盖前定义的',
          '避免滥用!important',
        ]} />
        <SectionTitle>变量与自定义属性</SectionTitle>
        <BookCode language="css" code={`:root {
  --primary: #1890ff;
  --spacing: 16px;
}
.button {
  background: var(--primary);
  margin: var(--spacing);
}`} />
        <TagGrid items={['选择器', '伪类', '伪元素', '优先级', 'CSS变量']} />
      </div>
    ),
  },
  {
    label: '预处理器与规范',
    left: (
      <div className="space-y-4">
        <PageTitle>Sass/Less基础</PageTitle>
        <BookParagraph>Sass和Less是常用的CSS预处理器，支持变量、嵌套、混入（mixin）等特性。</BookParagraph>
        <SectionTitle>Sass示例</SectionTitle>
        <BookCode language="css" code={`// Sass变量与嵌套
$primary: #1890ff;
$border-radius: 4px;
.card {
  padding: 16px;
  border-radius: $border-radius;
  .title { color: $primary; }
  &:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
}`} />
        <SectionTitle>Less示例</SectionTitle>
        <BookCode language="css" code={`// Less变量与混入
@primary: #1890ff;
@border-radius: 4px;
.rounded { border-radius: @border-radius; }
.card {
  padding: 16px;
  .rounded();
  .title { color: @primary; }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>BEM规范</SectionTitle>
        <BookParagraph>BEM（Block Element Modifier）是一种CSS命名规范，提高代码可维护性。</BookParagraph>
        <BookCode language="css" code={`/* BEM命名规范 */
.block { }
.block__element { }
.block--modifier { }

/* 示例 */
.card { }
.card__title { }
.card__title--highlight { }`} />
        <SectionTitle>现代CSS新特性</SectionTitle>
        <BookList items={[
          ':has() 父选择器',
          '容器查询 container queries',
          'subgrid、:is()、:where()',
          'aspect-ratio',
          'CSS Houdini、@layer',
        ]} />
        <BookCode language="css" code={`/* :has() 父选择器 */
.card:has(> .featured) { border-color: gold; }`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={['用Sass变量实现主题切换', '用BEM规范重写组件样式', '使用:has()实现卡片高亮']} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN CSS文档：developer.mozilla.org/zh-CN/docs/Web/CSS',
          'Sass中文网：sass.bootcss.com/documentation/',
          'Less中文网：less.bootcss.com/',
        ]} />
        <TagGrid items={['Sass', 'Less', 'BEM', '变量', '现代CSS']} />
      </div>
    ),
  },
]

export default function FrontendCssAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
