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
    label: 'CSS简介',
    children: (
      <>
        <Paragraph>CSS（层叠样式表）用于美化和布局网页，是前端三大核心技术之一。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  p { color: blue; }
</style>
<p>这是一段蓝色文字</p>`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '选择器',
    children: (
      <>
        <Card title="常用选择器" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li><Text code>{'元素选择器'}</Text>：如 <Text code>{'p'}</Text></li>
            <li><Text code>{'类选择器'}</Text>：如 <Text code>{'.box'}</Text></li>
            <li><Text code>{'ID选择器'}</Text>：如 <Text code>{'#main'}</Text></li>
            <li><Text code>{'属性选择器'}</Text>：如 <Text code>{'input[type="text"]'}</Text></li>
            <li><Text code>{'后代/子代/相邻兄弟选择器'}</Text></li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .red { color: red; }
  #main { font-weight: bold; }
  input[type="text"] { border: 1px solid #ccc; }
  ul li { margin-bottom: 8px; }
</style>
<ul>
  <li class="red">红色</li>
  <li id="main">加粗</li>
  <li><input type="text" /></li>
</ul>`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '颜色与单位',
    children: (
      <>
        <Paragraph>CSS支持多种颜色表示法和单位。</Paragraph>
        <Card title="颜色" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>英文名：red, blue, green</li>
            <li>十六进制：#ff0000, #00ff00</li>
            <li>rgb/rgba：rgb(255,0,0), rgba(0,0,0,0.5)</li>
            <li>hsl/hsla：hsl(120, 100%, 50%)</li>
          </ul>
        </Card>
        <Card title="常用单位" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>px（像素）</li>
            <li>em/rem（相对字体大小）</li>
            <li>%（百分比）</li>
            <li>vw/vh（视口宽高）</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .demo { color: #ff6600; font-size: 2em; width: 50vw; }
</style>
<p class="demo">彩色大字</p>`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '文本与字体',
    children: (
      <>
        <Card title="文本样式" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>font-size：字体大小</li>
            <li>font-family：字体族</li>
            <li>font-weight：粗细</li>
            <li>color：颜色</li>
            <li>text-align：对齐</li>
            <li>line-height：行高</li>
            <li>text-decoration：下划线/删除线</li>
            <li>text-shadow：文字阴影</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .title { font-size: 24px; font-weight: bold; text-align: center; }
  .underline { text-decoration: underline; }
</style>
<h2 class="title">标题</h2>
<p class="underline">带下划线的文本</p>`}</pre>
      </>
    ),
  },
  {
    key: '5',
    label: '盒模型',
    children: (
      <>
        <Paragraph>盒模型是CSS布局的基础，包括内容区、内边距（padding）、边框（border）、外边距（margin）。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid #333;
    margin: 30px;
    background: #e3eafe;
  }
</style>
<div class="box">盒模型示例</div>`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '边距与内边距',
    children: (
      <>
        <Card title="边距（margin）" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>margin-top / margin-bottom / margin-left / margin-right</li>
            <li>margin: 10px 20px;（上下10px，左右20px）</li>
          </ul>
        </Card>
        <Card title="内边距（padding）" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>padding-top / padding-bottom / padding-left / padding-right</li>
            <li>padding: 10px 20px;</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .demo { margin: 20px; padding: 10px; border: 1px solid #aaa; }
</style>
<div class="demo">边距与内边距</div>`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '边框与背景',
    children: (
      <>
        <Card title="边框（border）" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>border-width / border-style / border-color</li>
            <li>border-radius：圆角</li>
            <li>box-shadow：阴影</li>
          </ul>
        </Card>
        <Card title="背景（background）" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>background-color</li>
            <li>background-image</li>
            <li>background-size / background-position</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .card {
    border: 2px dashed #386ff6;
    border-radius: 12px;
    background: linear-gradient(90deg,#e3eafe,#fff);
    box-shadow: 0 4px 16px rgba(56,111,246,0.15);
    padding: 20px;
  }
</style>
<div class="card">带圆角和阴影的卡片</div>`}</pre>
      </>
    ),
  },
  {
    key: '8',
    label: '常用布局',
    children: (
      <>
        <Card title="常见布局方式" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>块级布局（block）</li>
            <li>内联布局（inline）</li>
            <li>浮动布局（float）</li>
            <li>弹性盒（flex）</li>
            <li>网格布局（grid）</li>
            <li>定位（position）</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .flex-row {
    display: flex;
    gap: 12px;
  }
  .item {
    background: #e3eafe;
    padding: 12px 24px;
    border-radius: 8px;
  }
</style>
<div class="flex-row">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`}</pre>
      </>
    ),
  },
  {
    key: '9',
    label: '常见问题',
    children: (
      <>
        <ul>
          <li>盒模型计算不清楚，导致布局错乱。</li>
          <li>选择器优先级混淆。</li>
          <li>单位混用导致响应式失效。</li>
          <li>浮动未清除，父元素高度塌陷。</li>
        </ul>
      </>
    ),
  },
  {
    key: '10',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>写一个带圆角、阴影、渐变背景的卡片。</li>
          <li>用flex实现水平居中和等间距布局。</li>
          <li>用grid实现三列自适应布局。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS" target="_blank" rel="noopener noreferrer">MDN CSS 指南</a></li>
          <li><a href="https://www.w3school.com.cn/css/index.asp" target="_blank" rel="noopener noreferrer">W3School CSS 教程</a></li>
        </ul>
      </>
    ),
  },
];

export default function CssBasicPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>CSS基础</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
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
          上一章：表单与语义化
        </a>
        <a
          href="/study/frontend/css-layout"
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
          下一章：CSS布局
        </a>
      </div>
    </div>
  );
} 