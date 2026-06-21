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
  chapterTitle: 'CSS布局',
  chapterNumber: 4,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'CSS基础', href: '/study/computer/frontend/css' },
  nextChapter: { label: 'CSS动画与过渡', href: '/study/computer/frontend/css-animation' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '块级与浮动布局',
    left: (
      <div className="space-y-4">
        <PageTitle>块级/内联/浮动布局</PageTitle>
        <BookList items={[
          '块级元素（block）：独占一行，如div、p、h1等',
          '内联元素（inline）：不换行，如span、a、img等',
          'display属性可切换元素类型',
        ]} />
        <BookCode language="css" code={`<style>
  .block { display: block; width: 100%; }
  .inline { display: inline; }
  .inline-block { display: inline-block; width: 100px; }
</style>
<div class="block">块级元素</div>
<span class="inline">内联元素</span>`} />
        <SectionTitle>浮动布局</SectionTitle>
        <BookList items={['float: left/right：元素向左/右浮动', 'clear: both：清除浮动影响', '父容器需清除浮动避免高度塌陷']} />
        <BookCode language="css" code={`/* 浮动布局 */
.left { float: left; width: 60%; }
.right { float: right; width: 35%; }
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>弹性盒（Flex）</SectionTitle>
        <BookParagraph>Flexbox是一维布局模型，适合行/列方向的排列。</BookParagraph>
        <BookList items={[
          '容器属性：flex-direction、justify-content、align-items',
          '项目属性：flex、order、align-self',
        ]} />
        <BookCode language="css" code={`/* Flex布局 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.item { flex: 1; margin: 10px; }`} />
        <SectionTitle>网格（Grid）</SectionTitle>
        <BookParagraph>Grid是二维布局模型，适合行列同时控制的布局。</BookParagraph>
        <BookCode language="css" code={`/* Grid布局 */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.item { grid-column: span 2; }`} />
        <TagGrid items={['块级', '内联', '浮动', 'Flex', 'Grid']} />
      </div>
    ),
  },
  {
    label: '定位与其他',
    left: (
      <div className="space-y-4">
        <PageTitle>定位（position）</PageTitle>
        <BookList items={[
          'static：默认，正常文档流',
          'relative：相对自身原来位置偏移',
          'absolute：相对于最近定位祖先定位',
          'fixed：相对于视口固定',
          'sticky：滚动到阈值时固定',
        ]} />
        <BookCode language="css" code={`/* 定位示例 */
.relative { position: relative; top: 10px; }
.absolute { position: absolute; top: 0; right: 0; }
.fixed { position: fixed; bottom: 20px; right: 20px; }
.sticky { position: sticky; top: 0; }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>多栏与响应式布局</SectionTitle>
        <BookList items={['多栏布局：column-count、column-gap', '响应式布局：媒体查询 + 弹性布局']} />
        <BookCode language="css" code={`/* 多栏布局 */
.multi-col { column-count: 3; column-gap: 20px; }
/* 响应式 */
@media (max-width: 768px) {
  .container { flex-direction: column; }
}`} />
        <SectionTitle>常见问题</SectionTitle>
        <BookList items={[
          '浮动未清除导致父元素塌陷。',
          'flex/grid兼容性问题。',
          '响应式断点设置不合理。',
          '定位层级z-index混乱。',
        ]} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '用Flex实现导航栏，logo居左，菜单居右',
          '用Grid实现三行三列的照片墙',
          '实现一个固定返回顶部的按钮',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN CSS布局：developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_layout',
          'W3School 响应式布局：www.w3school.com.cn/css/css_rwd_intro.asp',
        ]} />
        <TagGrid items={['position', 'fixed', 'sticky', '多栏', '响应式']} />
      </div>
    ),
  },
]

export default function FrontendCssLayoutPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
