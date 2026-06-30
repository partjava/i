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
  chapterTitle: 'HTML基础',
  chapterNumber: 1,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  nextChapter: { label: '表单与语义化', href: '/study/computer/frontend/html-forms' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'HTML简介',
    left: (
      <div className="space-y-4">
        <PageTitle>HTML简介</PageTitle>
        <BookParagraph>HTML（超文本标记语言）是构建网页的基础语言，用于描述网页的结构和内容。以下将系统介绍HTML的所有核心知识点。</BookParagraph>
        <BookList items={[
          'HTML 是 HyperText Markup Language 的缩写',
          '主要用于描述网页结构，配合 CSS 和 JavaScript 构建完整网站',
        ]} />
        <BookCode language="html" code={`<!-- HTML文档示例 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>示例页面</title>
  </head>
  <body>
    <h1>欢迎来到HTML世界！</h1>
    <p>这是一个简单的HTML页面。</p>
  </body>
</html>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>文档结构</SectionTitle>
        <BookParagraph>标准HTML文档结构如下：</BookParagraph>
        <BookCode language="html" code={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>网页标题</title>
    <!-- 可以在head中引入CSS、JS、meta等 -->
  </head>
  <body>
    <!-- 网页内容 -->
    <h1>主标题</h1>
    <p>正文内容</p>
  </body>
</html>`} />
        <BookList items={[
          '<!DOCTYPE html> 声明文档类型',
          '<html> 根标签，包含 <head> 和 <body>',
          '<head> 头部信息，包含标题、编码、样式等',
          '<body> 页面主体内容',
        ]} />
        <TagGrid items={['HTML', 'DOCTYPE', 'head', 'body', '基础']} />
      </div>
    ),
  },
  {
    label: '常用标签',
    left: (
      <div className="space-y-4">
        <PageTitle>常用标签</PageTitle>
        <SectionTitle>标题与段落</SectionTitle>
        <BookList items={['<h1> ~ <h6>：六级标题，<h1> 最大', '<p>：段落', '<br>：换行']} />
        <BookCode language="html" code={`<h1>主标题</h1>
<h2>副标题</h2>
<p>这是一个段落。</p>
<p>换行前<br>换行后</p>`} />
        <SectionTitle>文本格式化</SectionTitle>
        <BookList items={['<b>/<strong>：加粗', '<i>/<em>：斜体', '<u>：下划线', '<mark>：高亮']} />
        <BookCode language="html" code={`<p>普通文本 <b>加粗</b> <strong>强调</strong></p>
<p><i>斜体</i> <em>强调斜体</em></p>
<p><u>下划线</u> <mark>高亮</mark></p>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>链接与图片</SectionTitle>
        <BookList items={['<a href="">：超链接', '<img src="" alt="">：图片']} />
        <BookCode language="html" code={`<a href="https://www.baidu.com" target="_blank">点击跳转到百度</a>
<img src="logo.png" alt="网站Logo" width="100">
<a href="#section">跳转到本页锚点</a>`} />
        <SectionTitle>列表</SectionTitle>
        <BookList items={['<ul>：无序列表', '<ol>：有序列表', '<li>：列表项']} />
        <BookCode language="html" code={`<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>`} />
        <SectionTitle>表格</SectionTitle>
        <BookList items={['<table>：表格', '<tr>：表格行', '<td>：单元格', '<th>：表头']} />
        <BookCode language="html" code={`<table border="1">
  <tr><th>姓名</th><th>年龄</th></tr>
  <tr><td>张三</td><td>20</td></tr>
  <tr><td>李四</td><td>22</td></tr>
</table>`} />
        <TagGrid items={['标题', '段落', '链接', '图片', '列表', '表格']} />
      </div>
    ),
  },
  {
    label: '表单与语义化',
    left: (
      <div className="space-y-4">
        <PageTitle>表单</PageTitle>
        <SectionTitle>表单相关标签</SectionTitle>
        <BookList items={['<form>：表单', '<input>：输入框', '<textarea>：多行文本', '<button>：按钮', '<select>/<option>：下拉菜单', '<label>：标签']} />
        <BookCode language="html" code={`<form>
  <label>用户名：<input type="text" name="username" /></label><br />
  <label>密码：<input type="password" name="password" /></label><br />
  <label>邮箱：<input type="email" name="email" /></label><br />
  <button type="submit">注册</button>
</form>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>语义化与结构</SectionTitle>
        <BookList items={['<header>：页头', '<nav>：导航', '<main>：主要内容', '<section>：章节', '<article>：文章', '<aside>：侧边栏', '<footer>：页脚']} />
        <BookParagraph>语义化标签有助于结构清晰、SEO优化和可访问性提升。</BookParagraph>
        <TagGrid items={['表单', 'input', '语义化', 'header', 'nav', 'SEO']} />
      </div>
    ),
  },
  {
    label: '媒体与属性',
    left: (
      <div className="space-y-4">
        <PageTitle>媒体标签</PageTitle>
        <BookList items={['<audio>：音频', '<video>：视频', '<source>：多媒体资源', '<iframe>：内嵌页面']} />
        <BookCode language="html" code={`<audio controls src="music.mp3"></audio>
<video controls width="320" height="240" src="movie.mp4"></video>`} />
        <SectionTitle>属性与全局属性</SectionTitle>
        <BookList items={['id、class、style、title、hidden、tabindex 等', '事件属性如 onclick、onchange']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>HTML5新特性</SectionTitle>
        <BookList items={[
          '新增语义标签（如 <section>、<article>）',
          '媒体标签（如 <audio>、<video>）',
          '表单控件类型（如 type="email"、type="date"）',
          '本地存储（localStorage、sessionStorage）',
          '拖放API、Canvas、SVG',
        ]} />
        <SectionTitle>SEO与可访问性</SectionTitle>
        <BookList items={['合理使用标题、alt属性、语义化标签', '保证结构清晰、内容可被搜索引擎和辅助工具识别']} />
        <SectionTitle>常见问题</SectionTitle>
        <BookList items={['标签未闭合、嵌套错误', '忽略DOCTYPE导致兼容性问题', '滥用div、span，缺乏语义化']} />
        <TagGrid items={['audio', 'video', 'HTML5', 'SEO', '可访问性']} />
      </div>
    ),
  },
  {
    label: '综合示例与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>综合示例</PageTitle>
        <BookParagraph>个人简介页面完整示例：</BookParagraph>
        <BookCode language="html" code={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>个人简介</title>
  </head>
  <body>
    <header>
      <h1>张三的个人主页</h1>
      <nav>
        <a href="#about">关于我</a> |
        <a href="#contact">联系方式</a>
      </nav>
    </header>
    <main>
      <section id="about">
        <h2>关于我</h2>
        <p>前端开发爱好者，热爱编程与设计。</p>
      </section>
      <section id="skills">
        <h2>技能</h2>
        <ul>
          <li>HTML5/CSS3</li>
          <li>JavaScript/ES6</li>
          <li>React/Vue</li>
        </ul>
      </section>
    </main>
    <footer>
      <p id="contact">邮箱：test@example.com</p>
    </footer>
  </body>
</html>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习与拓展</SectionTitle>
        <BookList items={[
          '如何让图片点击后跳转到百度？',
          '<h1> 和 <h2> 有什么区别？',
          '写一个包含表单的注册页面（含用户名、密码、邮箱输入框和提交按钮）',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN HTML 指南：developer.mozilla.org/zh-CN/docs/Web/HTML',
          'W3School HTML 教程：w3school.com.cn/html',
          'HTML Living Standard：html.spec.whatwg.org',
        ]} />
        <TagGrid items={['练习', '拓展', 'MDN', 'W3School', '综合示例']} />
      </div>
    ),
  },
]

export default function FrontendHtmlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
