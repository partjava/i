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
    label: '响应式设计原理',
    children: (
      <>
        <Card title="什么是响应式设计" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>响应式设计（Responsive Design）让网页在不同设备和屏幕尺寸下都能良好显示。</li>
            <li>核心思想：同一套HTML结构，样式自适应变化。</li>
            <li>常用技术：媒体查询、弹性布局、流式布局、图片自适应等。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '媒体查询',
    children: (
      <>
        <Paragraph>媒体查询（Media Query）根据设备特性（宽度、高度、分辨率等）应用不同样式。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  body { background: #fff; }
  @media (max-width: 600px) {
    body { background: #e3eafe; }
  }
</style>`}</pre>
        <ul>
          <li>常用断点：320px、480px、768px、1024px、1200px等</li>
          <li>可组合多条件：@media (max-width: 600px) and (orientation: portrait)</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: '弹性与流式布局',
    children: (
      <>
        <Card title="流式布局" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<style>
  .container { width: 90%; max-width: 1200px; margin: 0 auto; }
</style>
<div class="container">内容</div>`}</pre>
        </Card>
        <Card title="弹性布局（Flex/Grid）" size="small">
          <pre style={codeBlockStyle}>{`<style>
  .flex {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .item { flex: 1 1 200px; background: #e3eafe; padding: 24px; }
</style>
<div class="flex">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '移动优先',
    children: (
      <>
        <Paragraph>移动优先（Mobile First）是指先为小屏幕设计，再为大屏幕适配。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .nav { display: none; }
  @media (min-width: 768px) {
    .nav { display: block; }
  }
</style>`}</pre>
        <ul>
          <li>优先保证移动端体验，逐步增强桌面端功能</li>
          <li>常与媒体查询、弹性布局结合</li>
        </ul>
      </>
    ),
  },
  {
    key: '5',
    label: '常见响应式方案',
    children: (
      <>
        <ul>
          <li>Bootstrap、Ant Design等响应式UI框架</li>
          <li>rem/em单位自适应</li>
          <li>图片响应式：srcset、sizes、picture元素</li>
        </ul>
        <pre style={codeBlockStyle}>{`<img srcset="img-320.jpg 320w, img-768.jpg 768w" sizes="(max-width: 600px) 320px, 768px" src="img-768.jpg" alt="响应式图片" />`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '实战案例',
    children: (
      <>
        <Card title="响应式三栏布局" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<style>
  .row { display: flex; flex-wrap: wrap; }
  .col { flex: 1 1 200px; min-width: 200px; background: #e3eafe; margin: 8px; }
  @media (max-width: 600px) {
    .row { flex-direction: column; }
  }
</style>
<div class="row">
  <div class="col">1</div>
  <div class="col">2</div>
  <div class="col">3</div>
</div>`}</pre>
        </Card>
        <Card title="响应式导航菜单" size="small">
          <pre style={codeBlockStyle}>{`<style>
  .menu { display: flex; gap: 24px; }
  @media (max-width: 600px) {
    .menu { flex-direction: column; gap: 8px; }
  }
</style>
<div class="menu">
  <a href="#">首页</a>
  <a href="#">产品</a>
  <a href="#">关于</a>
</div>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用媒体查询实现两栏自适应布局。</li>
          <li>用flex实现响应式卡片列表。</li>
          <li>尝试用srcset实现响应式图片加载。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design" target="_blank" rel="noopener noreferrer">MDN 响应式设计</a></li>
          <li><a href="https://www.w3school.com.cn/css/css_rwd_intro.asp" target="_blank" rel="noopener noreferrer">W3School 响应式布局</a></li>
        </ul>
      </>
    ),
  },
];

export default function ResponsivePage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>响应式设计</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/css-advanced"
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
          上一章：CSS高级与预处理器
        </a>
        <a
          href="/study/frontend/js"
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
          下一章：JavaScript基础
        </a>
      </div>
    </div>
  );
} 