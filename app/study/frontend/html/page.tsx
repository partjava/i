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
    label: 'HTML简介',
    children: (
      <>
        <Paragraph>HTML（超文本标记语言）是构建网页的基础语言，用于描述网页的结构和内容。以下将系统介绍HTML的所有核心知识点。</Paragraph>
        <ul>
          <li>HTML 是 HyperText Markup Language 的缩写。</li>
          <li>主要用于描述网页结构，配合 CSS 和 JavaScript 构建完整网站。</li>
        </ul>
        <pre style={codeBlockStyle}>{`<!-- HTML文档示例 -->
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
</html>`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '文档结构',
    children: (
      <>
        <Paragraph>标准HTML文档结构如下：</Paragraph>
        <pre style={codeBlockStyle}>
{`<!DOCTYPE html>
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
</html>`}
        </pre>
        <ul>
          <li><Text code>{'<!DOCTYPE html>'}</Text> 声明文档类型。</li>
          <li><Text code>{'<html>'}</Text> 根标签，包含 <Text code>{'<head>'}</Text> 和 <Text code>{'<body>'}</Text>。</li>
          <li><Text code>{'<head>'}</Text> 头部信息，包含标题、编码、样式等。</li>
          <li><Text code>{'<body>'}</Text> 页面主体内容。</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: '常用标签',
    children: (
      <>
        <Card title="标题与段落" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<h1>'}</Text> ~ <Text code>{'<h6>'}</Text>：六级标题，<Text code>{'<h1>'}</Text> 最大。</li>
            <li><Text code>{'<p>'}</Text>：段落。</li>
            <li><Text code>{'<br>'}</Text>：换行。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<h1>主标题</h1>
<h2>副标题</h2>
<p>这是一个段落。</p>
<p>换行前<br>换行后</p>`}</pre>
        </Card>
        <Card title="文本格式化" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<b>'}</Text>/<Text code>{'<strong>'}</Text>：加粗。</li>
            <li><Text code>{'<i>'}</Text>/<Text code>{'<em>'}</Text>：斜体。</li>
            <li><Text code>{'<u>'}</Text>：下划线。</li>
            <li><Text code>{'<mark>'}</Text>：高亮。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<p>普通文本 <b>加粗</b> <strong>强调</strong></p>
<p><i>斜体</i> <em>强调斜体</em></p>
<p><u>下划线</u> <mark>高亮</mark></p>`}</pre>
        </Card>
        <Card title="链接与图片" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<a href="">'}</Text>：超链接。</li>
            <li><Text code>{'<img src="" alt="">'}</Text>：图片。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<a href="https://www.baidu.com" target="_blank">点击跳转到百度</a>
<img src="logo.png" alt="网站Logo" width="100">
<a href="#section">跳转到本页锚点</a>`}</pre>
        </Card>
        <Card title="列表" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<ul>'}</Text>：无序列表。</li>
            <li><Text code>{'<ol>'}</Text>：有序列表。</li>
            <li><Text code>{'<li>'}</Text>：列表项。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>`}</pre>
        </Card>
        <Card title="表格" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<table>'}</Text>：表格。</li>
            <li><Text code>{'<tr>'}</Text>：表格行。</li>
            <li><Text code>{'<td>'}</Text>：单元格。</li>
            <li><Text code>{'<th>'}</Text>：表头。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<table border="1">
  <tr><th>姓名</th><th>年龄</th></tr>
  <tr><td>张三</td><td>20</td></tr>
  <tr><td>李四</td><td>22</td></tr>
</table>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '表单',
    children: (
      <>
        <Card title="表单相关标签" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<form>'}</Text>：表单。</li>
            <li><Text code>{'<input>'}</Text>：输入框。</li>
            <li><Text code>{'<textarea>'}</Text>：多行文本。</li>
            <li><Text code>{'<button>'}</Text>：按钮。</li>
            <li><Text code>{'<select>'}</Text>/<Text code>{'<option>'}</Text>：下拉菜单。</li>
            <li><Text code>{'<label>'}</Text>：标签。</li>
          </ul>
          <pre style={codeBlockStyle}>
{`<form>
  <label>用户名：<input type="text" name="username" /></label><br />
  <label>密码：<input type="password" name="password" /></label><br />
  <label>邮箱：<input type="email" name="email" /></label><br />
  <button type="submit">注册</button>
</form>`}
          </pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '语义化与结构',
    children: (
      <>
        <Card title="语义化标签" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<header>'}</Text>：页头。</li>
            <li><Text code>{'<nav>'}</Text>：导航。</li>
            <li><Text code>{'<main>'}</Text>：主要内容。</li>
            <li><Text code>{'<section>'}</Text>：章节。</li>
            <li><Text code>{'<article>'}</Text>：文章。</li>
            <li><Text code>{'<aside>'}</Text>：侧边栏。</li>
            <li><Text code>{'<footer>'}</Text>：页脚。</li>
          </ul>
        </Card>
        <Paragraph>语义化标签有助于结构清晰、SEO优化和可访问性提升。</Paragraph>
      </>
    ),
  },
  {
    key: '6',
    label: '媒体标签',
    children: (
      <>
        <Card title="媒体相关标签" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'<audio>'}</Text>：音频。</li>
            <li><Text code>{'<video>'}</Text>：视频。</li>
            <li><Text code>{'<source>'}</Text>：多媒体资源。</li>
            <li><Text code>{'<iframe>'}</Text>：内嵌页面。</li>
          </ul>
          <pre style={codeBlockStyle}>
{`<audio controls src="music.mp3"></audio>
<video controls width="320" height="240" src="movie.mp4"></video>`}
          </pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '属性与全局属性',
    children: (
      <>
        <ul>
          <li><Text code>id</Text>、<Text code>class</Text>、<Text code>style</Text>、<Text code>title</Text>、<Text code>hidden</Text>、<Text code>tabindex</Text> 等。</li>
          <li>事件属性如 <Text code>onclick</Text>、<Text code>onchange</Text>。</li>
        </ul>
      </>
    ),
  },
  {
    key: '8',
    label: 'HTML5新特性',
    children: (
      <>
        <ul>
          <li>新增语义标签（如 <Text code>{'<section>'}</Text>、<Text code>{'<article>'}</Text>）。</li>
          <li>媒体标签（如 <Text code>{'<audio>'}</Text>、<Text code>{'<video>'}</Text>）。</li>
          <li>表单控件类型（如 <Text code>type="email"</Text>、<Text code>type="date"</Text>）。</li>
          <li>本地存储（localStorage、sessionStorage）。</li>
          <li>拖放API、Canvas、SVG。</li>
        </ul>
      </>
    ),
  },
  {
    key: '9',
    label: 'SEO与可访问性',
    children: (
      <>
        <ul>
          <li>合理使用标题、alt属性、语义化标签。</li>
          <li>保证结构清晰、内容可被搜索引擎和辅助工具识别。</li>
        </ul>
      </>
    ),
  },
  {
    key: '10',
    label: '常见问题',
    children: (
      <>
        <ul>
          <li>标签未闭合、嵌套错误。</li>
          <li>忽略DOCTYPE导致兼容性问题。</li>
          <li>滥用div、span，缺乏语义化。</li>
        </ul>
      </>
    ),
  },
  {
    key: '11',
    label: '综合示例',
    children: (
      <>
        <Paragraph>个人简介页面完整示例：</Paragraph>
        <pre style={codeBlockStyle}>
{`<!DOCTYPE html>
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
</html>`}
        </pre>
      </>
    ),
  },
  {
    key: '12',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>如何让图片点击后跳转到百度？</li>
          <li>{'<h1>'} 和 {'<h2>'} 有什么区别？</li>
          <li>写一个包含表单的注册页面（含用户名、密码、邮箱输入框和提交按钮）。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML" target="_blank" rel="noopener noreferrer">MDN HTML 指南</a></li>
          <li><a href="https://www.w3school.com.cn/html/index.asp" target="_blank" rel="noopener noreferrer">W3School HTML 教程</a></li>
          <li><a href="https://html.spec.whatwg.org/" target="_blank" rel="noopener noreferrer">HTML Living Standard</a></li>
        </ul>
      </>
    ),
  },
];

export default function HtmlBasicPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>HTML基础</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/html-forms"
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
          下一章：表单与语义化
        </a>
      </div>
    </div>
  );
} 