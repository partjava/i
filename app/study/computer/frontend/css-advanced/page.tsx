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
    label: '选择器进阶',
    children: (
      <>
        <Card title="常用高级选择器" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>属性选择器：[type="text"]、[data-id]</li>
            <li>伪类选择器：:hover、:nth-child、:not()</li>
            <li>伪元素选择器：::before、::after</li>
            <li>组合选择器：.a {'>'} .b、.a + .b、.a ~ .b</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  input[type="text"] { border: 1px solid #386ff6; }
  li:nth-child(2n) { background: #e3eafe; }
  .btn::after { content: '→'; margin-left: 8px; }
</style>
<input type="text" />
<ul><li>1</li><li>2</li><li>3</li></ul>
<button class="btn">按钮</button>`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '层叠与优先级',
    children: (
      <>
        <Paragraph>CSS的层叠（Cascade）和优先级（Specificity）决定了样式的最终表现。</Paragraph>
        <ul>
          <li>优先级：!important &gt; 内联样式 &gt; ID选择器 &gt; 类/属性/伪类 &gt; 元素/伪元素</li>
          <li>后写的样式会覆盖前面的（同优先级时）</li>
        </ul>
        <pre style={codeBlockStyle}>{`<style>
  #id { color: red; }
  .cls { color: blue; }
  p { color: green !important; }
</style>
<p id="id" class="cls">优先级示例</p>`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '变量与自定义属性',
    children: (
      <>
        <Paragraph>CSS变量（自定义属性）可提升样式复用性和主题切换能力。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  :root {
    --main-color: #386ff6;
    --radius: 8px;
  }
  .box {
    background: var(--main-color);
    border-radius: var(--radius);
    color: #fff;
    padding: 16px 32px;
  }
</style>
<div class="box">自定义属性</div>`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: 'Sass/Less基础',
    children: (
      <>
        <Card title="Sass/Less 变量与嵌套" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// Sass
$main: #386ff6;
.box {
  background: $main;
  &:hover { background: darken($main, 10%); }
}`}</pre>
          <pre style={codeBlockStyle}>{`// Less
@main: #386ff6;
.box {
  background: @main;
  &:hover { background: darken(@main, 10%); }
}`}</pre>
        </Card>
        <ul>
          <li>支持变量、嵌套、混入、继承、函数等特性</li>
          <li>需编译为标准CSS后使用</li>
        </ul>
      </>
    ),
  },
  {
    key: '5',
    label: 'BEM规范',
    children: (
      <>
        <Paragraph>BEM（Block-Element-Modifier）是一种命名规范，提升样式可维护性。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .card { }
  .card__title { }
  .card--active { }
</style>
<div class="card card--active">
  <div class="card__title">标题</div>
</div>`}</pre>
        <ul>
          <li>Block：独立功能块</li>
          <li>Element：块的组成部分，__分隔</li>
          <li>Modifier：修饰状态，--分隔</li>
        </ul>
      </>
    ),
  },
  {
    key: '6',
    label: '现代CSS新特性',
    children: (
      <>
        <ul>
          <li>容器查询（@container）</li>
          <li>has()选择器</li>
          <li>subgrid、:is()、:where()</li>
          <li>CSS Houdini、@layer等</li>
        </ul>
        <pre style={codeBlockStyle}>{`<style>
  .parent:has(.child) { border: 2px solid #386ff6; }
</style>
<div class="parent"><div class="child">子元素</div></div>`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用BEM规范写一个卡片组件样式。</li>
          <li>用Sass/Less实现主题切换。</li>
          <li>尝试使用:has()选择器实现父子联动样式。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS" target="_blank" rel="noopener noreferrer">MDN CSS文档</a></li>
          <li><a href="https://sass.bootcss.com/documentation/" target="_blank" rel="noopener noreferrer">Sass中文网</a></li>
          <li><a href="https://less.bootcss.com/" target="_blank" rel="noopener noreferrer">Less中文网</a></li>
        </ul>
      </>
    ),
  },
];

export default function CssAdvancedPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>CSS高级与预处理器</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/css-animation"
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
          上一章：CSS动画与过渡
        </a>
        <a
          href="/study/frontend/responsive"
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
          下一章：响应式设计
        </a>
      </div>
    </div>
  );
} 