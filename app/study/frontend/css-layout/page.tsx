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
    label: '块级/内联/浮动布局',
    children: (
      <>
        <Card title="块级与内联" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>块级元素（block）：独占一行，如div、p、h1等。</li>
            <li>内联元素（inline）：不换行，如span、a、img等。</li>
            <li>display属性可切换元素类型。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<style>
  .block { display: block; background: #e3eafe; }
  .inline { display: inline; color: #386ff6; }
</style>
<div class="block">块级</div><span class="inline">内联</span>`}</pre>
        </Card>
        <Card title="浮动布局" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>float:left/right 让元素脱离文档流，向左/右浮动。</li>
            <li>常用于图片环绕、横向排列。</li>
            <li>清除浮动：clear:both 或 overflow:hidden。</li>
          </ul>
          <pre style={codeBlockStyle}>{`<style>
  .left { float: left; width: 100px; height: 100px; background: #e3eafe; }
  .right { float: right; width: 100px; height: 100px; background: #386ff6; }
  .clearfix::after { content: ''; display: block; clear: both; }
</style>
<div class="clearfix">
  <div class="left">左浮动</div>
  <div class="right">右浮动</div>
  <div style="background:#eee;">中间内容</div>
</div>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '弹性盒（flex）',
    children: (
      <>
        <Paragraph>Flex布局是现代网页常用的自适应布局方式，适合一维排列。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .item { background: #e3eafe; padding: 16px 32px; border-radius: 8px; }
</style>
<div class="flex">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`}</pre>
        <ul>
          <li>主轴方向：flex-direction</li>
          <li>主轴对齐：justify-content</li>
          <li>交叉轴对齐：align-items</li>
          <li>换行：flex-wrap</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: '网格（grid）',
    children: (
      <>
        <Paragraph>Grid布局适合二维网格排版，强大灵活。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  .cell { background: #e3eafe; padding: 20px; text-align: center; }
</style>
<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>`}</pre>
        <ul>
          <li>定义行列：grid-template-rows/columns</li>
          <li>单元格合并：grid-column/row</li>
          <li>间距：gap</li>
        </ul>
      </>
    ),
  },
  {
    key: '4',
    label: '定位（position）',
    children: (
      <>
        <Paragraph>position属性用于实现绝对、相对、固定、粘性定位。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .box { position: relative; width: 300px; height: 200px; background: #e3eafe; }
  .abs { position: absolute; top: 20px; left: 40px; background: #386ff6; color: #fff; padding: 8px 16px; }
</style>
<div class="box">
  <div class="abs">绝对定位</div>
  <span>父容器内容</span>
</div>`}</pre>
        <ul>
          <li>relative：相对定位</li>
          <li>absolute：绝对定位</li>
          <li>fixed：固定定位</li>
          <li>sticky：粘性定位</li>
        </ul>
      </>
    ),
  },
  {
    key: '5',
    label: '多栏与响应式布局',
    children: (
      <>
        <Card title="多栏布局" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>多栏：column-count、column-gap</li>
            <li>媒体查询：@media</li>
            <li>百分比/弹性单位适配</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .multi {
    column-count: 3;
    column-gap: 24px;
  }
</style>
<div class="multi">
  <p>内容1</p>
  <p>内容2</p>
  <p>内容3</p>
  <p>内容4</p>
</div>`}</pre>
        <Card title="响应式布局" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>媒体查询：根据屏幕宽度自适应布局</li>
            <li>flex/grid配合媒体查询实现响应式</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`<style>
  .resp {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 600px) {
    .resp { flex-direction: column; }
  }
</style>
<div class="resp">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '常见问题',
    children: (
      <>
        <ul>
          <li>浮动未清除导致父元素塌陷。</li>
          <li>flex/grid兼容性问题。</li>
          <li>响应式断点设置不合理。</li>
          <li>定位层级z-index混乱。</li>
        </ul>
      </>
    ),
  },
  {
    key: '7',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用flex实现三栏等高自适应布局。</li>
          <li>用grid实现图片瀑布流。</li>
          <li>用position实现悬浮按钮。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_layout" target="_blank" rel="noopener noreferrer">MDN CSS布局</a></li>
          <li><a href="https://www.w3school.com.cn/css/css_rwd_intro.asp" target="_blank" rel="noopener noreferrer">W3School 响应式布局</a></li>
        </ul>
      </>
    ),
  },
];

export default function CssLayoutPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>CSS布局</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/css"
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
          上一章：CSS基础
        </a>
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
          下一章：CSS动画与过渡
        </a>
      </div>
    </div>
  );
} 