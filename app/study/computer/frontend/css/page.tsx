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
  chapterTitle: 'CSS基础',
  chapterNumber: 3,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '表单与语义化', href: '/study/computer/frontend/html-forms' },
  nextChapter: { label: 'CSS布局', href: '/study/computer/frontend/css-layout' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'CSS简介与选择器',
    left: (
      <div className="space-y-4">
        <PageTitle>CSS简介</PageTitle>
        <BookParagraph>CSS（层叠样式表）用于美化和布局网页，是前端三大核心技术之一。</BookParagraph>
        <BookCode language="css" code={`<style>
  p { color: blue; }
</style>
<p>这是一段蓝色文字</p>`} />
        <SectionTitle>选择器</SectionTitle>
        <BookList items={[
          '元素选择器：p { }',
          '类选择器：.class { }',
          'ID选择器：#id { }',
          '通配选择器：* { }',
          '属性选择器：[type="text"]',
          '伪类：:hover、:first-child',
          '组合选择器：div > p、div p',
        ]} />
        <BookCode language="css" code={`/* 各种选择器示例 */
p { color: red; }
.highlight { background: yellow; }
#header { font-size: 24px; }
* { margin: 0; padding: 0; }
a:hover { text-decoration: underline; }
div > p { margin: 10px 0; }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>颜色与单位</SectionTitle>
        <BookList items={[
          '颜色：hex (#ff0000)、rgb()、rgba()、hsl()',
          '单位：px、em、rem、%、vw、vh',
          'em：相对于父元素字体大小',
          'rem：相对于根元素字体大小',
        ]} />
        <SectionTitle>文本与字体</SectionTitle>
        <BookList items={[
          'font-size、font-weight、font-family',
          'text-align、text-decoration、line-height',
          'color、text-shadow',
        ]} />
        <BookCode language="css" code={`/* 文本样式 */
body { font-family: "Microsoft YaHei", sans-serif; }
h1 { font-size: 2rem; font-weight: bold; }
p { font-size: 16px; line-height: 1.6; color: #333; }
.text-center { text-align: center; }`} />
        <TagGrid items={['选择器', '颜色', '字体', '单位', 'CSS']} />
      </div>
    ),
  },
  {
    label: '盒模型与布局',
    left: (
      <div className="space-y-4">
        <PageTitle>盒模型</PageTitle>
        <BookParagraph>CSS盒模型是页面布局的核心概念，每个元素由内容区、内边距（padding）、边框（border）、外边距（margin）组成。</BookParagraph>
        <BookCode language="css" code={`/* 盒模型 */
.box {
  width: 200px;
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
  box-sizing: border-box; /* 标准/IE盒模型切换 */
}`} />
        <SectionTitle>边距与内边距</SectionTitle>
        <BookList items={[
          'margin：外边距，控制元素之间的距离',
          'padding：内边距，控制内容与边框的距离',
          '简写：margin: 上 右 下 左',
        ]} />
        <BookCode language="css" code={`/* 边距简写 */
.box {
  margin: 10px 20px;    /* 上下10px 左右20px */
  padding: 5px 10px 15px 20px; /* 上右下左 */
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>边框与背景</SectionTitle>
        <BookList items={['border：边框宽度、样式、颜色', 'border-radius：圆角', 'background：颜色、图片、渐变']} />
        <BookCode language="css" code={`/* 边框与背景 */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}`} />
        <SectionTitle>常用布局</SectionTitle>
        <BookList items={[
          '普通流：块级元素从上到下排列',
          '浮动布局：float: left/right',
          'Flexbox：display: flex',
          'Grid：display: grid',
        ]} />
        <BookCode language="css" code={`/* Flex基础 */
.container { display: flex; justify-content: center; }
.item { flex: 1; margin: 0 10px; }`} />
        <TagGrid items={['盒模型', 'margin', 'padding', 'border', 'Flex']} />
      </div>
    ),
  },
  {
    label: '常见问题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookList items={[
          '盒模型计算不清楚，导致布局错乱',
          '选择器优先级混淆',
          '单位混用导致响应式失效',
          '浮动未清除，父元素高度塌陷',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习与拓展</SectionTitle>
        <BookList items={[
          '写一个带圆角、阴影、渐变背景的卡片',
          '用flex实现水平居中和等间距布局',
          '用grid实现三列自适应布局',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={['MDN CSS 文档', 'W3School CSS 教程']} />
        <TagGrid items={['练习', '盒模型', 'Flex', '作业', 'MDN']} />
      </div>
    ),
  },
]

export default function FrontendCssPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
