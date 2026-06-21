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
    label: '动画基础',
    children: (
      <>
        <Card title="CSS动画简介" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>CSS动画用于实现元素的动态效果，提升用户体验。</li>
            <li>常用方式：transition（过渡）、animation（关键帧动画）。</li>
            <li>优势：无需JS即可实现大部分动画，性能较好。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: 'transition 过渡',
    children: (
      <>
        <Paragraph>transition用于属性值的平滑过渡，常用于hover、focus等状态切换。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  .btn {
    background: #386ff6;
    color: #fff;
    padding: 12px 32px;
    border-radius: 8px;
    transition: background 0.3s, transform 0.3s;
  }
  .btn:hover {
    background: #2055c7;
    transform: scale(1.08);
  }
</style>
<button class="btn">悬停试试</button>`}</pre>
        <ul>
          <li>transition-property：要过渡的属性</li>
          <li>transition-duration：持续时间</li>
          <li>transition-timing-function：缓动曲线</li>
          <li>transition-delay：延迟</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: 'animation 关键帧动画',
    children: (
      <>
        <Paragraph>animation可实现更复杂的逐帧动画，支持循环、暂停等。</Paragraph>
        <pre style={codeBlockStyle}>{`<style>
  @keyframes move {
    0% { left: 0; }
    50% { left: 120px; }
    100% { left: 0; }
  }
  .box {
    position: relative;
    width: 60px; height: 60px;
    background: #386ff6;
    animation: move 2s infinite;
  }
</style>
<div class="box"></div>`}</pre>
        <ul>
          <li>@keyframes定义动画帧</li>
          <li>animation-name、duration、iteration-count等属性</li>
          <li>可暂停、延迟、反向等</li>
        </ul>
      </>
    ),
  },
  {
    key: '4',
    label: '常见动画案例',
    children: (
      <>
        <Card title="淡入淡出" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<style>
  .fade {
    opacity: 0;
    transition: opacity 0.5s;
  }
  .fade.show {
    opacity: 1;
  }
</style>
<div class="fade show">淡入效果</div>`}</pre>
        </Card>
        <Card title="弹跳动画" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<style>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-40px); }
  }
  .ball {
    width: 40px; height: 40px; border-radius: 50%;
    background: #386ff6;
    animation: bounce 1s infinite;
  }
</style>
<div class="ball"></div>`}</pre>
        </Card>
        <Card title="加载动画" size="small">
          <pre style={codeBlockStyle}>{`<style>
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .loader {
    width: 32px; height: 32px;
    border: 4px solid #e3eafe;
    border-top: 4px solid #386ff6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
</style>
<div class="loader"></div>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '性能与兼容性',
    children: (
      <>
        <ul>
          <li>优先使用transform、opacity等属性，避免频繁操作top/left/width等。</li>
          <li>硬件加速：可用will-change提升性能。</li>
          <li>兼容性：主流浏览器均支持transition/animation，部分老旧浏览器需加前缀。</li>
        </ul>
      </>
    ),
  },
  {
    key: '6',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>实现一个按钮点击后颜色渐变的动画。</li>
          <li>制作一个循环旋转的加载动画。</li>
          <li>用animation实现弹性小球跳动。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations" target="_blank" rel="noopener noreferrer">MDN CSS动画</a></li>
          <li><a href="https://www.w3school.com.cn/css/css3_animations.asp" target="_blank" rel="noopener noreferrer">W3School CSS3动画</a></li>
        </ul>
      </>
    ),
  },
];

export default function CssAnimationPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>CSS动画与过渡</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
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
          上一章：CSS布局
        </a>
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
          下一章：CSS高级与预处理器
        </a>
      </div>
    </div>
  );
} 