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
  chapterTitle: '响应式设计',
  chapterNumber: 7,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'CSS高级与预处理器', href: '/study/computer/frontend/css-advanced' },
  nextChapter: { label: 'JavaScript基础', href: '/study/computer/frontend/js' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '响应式原理',
    left: (
      <div className="space-y-4">
        <PageTitle>响应式设计原理</PageTitle>
        <BookList items={[
          '响应式设计（Responsive Design）让网页在不同设备和屏幕尺寸下都能良好显示',
          '核心思想：同一套HTML结构，样式自适应变化',
          '常用技术：媒体查询、弹性布局、流式布局、图片自适应等',
        ]} />
        <SectionTitle>媒体查询</SectionTitle>
        <BookParagraph>媒体查询是响应式设计的核心，根据设备特性（如宽度、分辨率）应用不同样式。</BookParagraph>
        <BookCode language="css" code={`/* 媒体查询示例 */
/* 移动端 */
@media (max-width: 767px) {
  .container { flex-direction: column; }
  .sidebar { display: none; }
}
/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) {
  .container { grid-template-columns: 1fr 1fr; }
}
/* 桌面 */
@media (min-width: 1024px) {
  .container { grid-template-columns: 1fr 1fr 1fr; }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>弹性与流式布局</SectionTitle>
        <BookList items={[
          '流式布局：使用百分比、vw/vh等相对单位',
          '弹性布局：Flexbox + Grid组合实现自适应',
          '图片自适应：max-width: 100%',
        ]} />
        <BookCode language="css" code={`/* 弹性与流式布局 */
.container { width: 100%; max-width: 1200px; margin: 0 auto; }
.column { width: 50%; padding: 2%; }
img { max-width: 100%; height: auto; }`} />
        <SectionTitle>移动优先</SectionTitle>
        <BookParagraph>移动优先策略从小屏开始设计，逐步增强大屏体验。</BookParagraph>
        <BookCode language="css" code={`/* 移动优先：基础样式为移动端 */
.menu { flex-direction: column; }
/* 桌面增强 */
@media (min-width: 1024px) {
  .menu { flex-direction: row; }
}`} />
        <TagGrid items={['响应式', '媒体查询', '移动优先', '流式布局', '@media']} />
      </div>
    ),
  },
  {
    label: '方案与案例',
    left: (
      <div className="space-y-4">
        <PageTitle>常见响应式方案</PageTitle>
        <BookList items={[
          '响应式UI框架：Bootstrap、Ant Design等',
          'rem/em单位自适应',
          '响应式图片：srcset、sizes、picture元素',
          '响应式字体：clamp()函数',
          '响应式导航：折叠菜单',
        ]} />
        <BookCode language="css" code={`/* 响应式图片 */
<img src="small.jpg" srcset="medium.jpg 768w, large.jpg 1200w" sizes="100vw" />
/* 响应式字体 */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>响应式三栏布局：</b></BookParagraph>
        <BookCode language="css" code={`.layout { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 768px) {
  .layout { grid-template-columns: 200px 1fr 200px; }
}`} />
        <BookParagraph><b>响应式导航菜单：</b></BookParagraph>
        <BookCode language="css" code={`.nav { display: flex; flex-wrap: wrap; }
@media (max-width: 767px) {
  .nav { flex-direction: column; }
  .nav a { display: block; padding: 10px; }
}`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={['实现一个移动端折叠导航栏', '用Grid实现自适应相册布局', '使用clamp()设置响应式字体']} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN 响应式设计：developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design',
          'W3School 响应式布局：www.w3school.com.cn/css/css_rwd_intro.asp',
        ]} />
        <TagGrid items={['实战', '三栏', '导航', '图片', 'clamp']} />
      </div>
    ),
  },
]

export default function FrontendResponsivePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
