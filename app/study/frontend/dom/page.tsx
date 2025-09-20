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
    label: 'DOM基础',
    children: (
      <>
        <Card title="什么是DOM" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>DOM（文档对象模型）是JS操作网页的基础。</li>
            <li>网页结构被解析为节点树，JS可动态增删改查节点。</li>
            <li>常用API：getElementById、querySelector、children、parentNode等。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '节点操作',
    children: (
      <>
        <Paragraph>JS可动态创建、插入、删除、克隆节点。</Paragraph>
        <pre style={codeBlockStyle}>{`const p = document.createElement('p');
p.textContent = 'Hello';
document.body.appendChild(p);
p.remove();`}</pre>
        <ul>
          <li>createElement、appendChild、remove、cloneNode等</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: '属性与样式操作',
    children: (
      <>
        <Paragraph>可通过JS读写节点属性、类名、内联样式。</Paragraph>
        <pre style={codeBlockStyle}>{`const img = document.querySelector('img');
img.src = 'a.png';
img.alt = '图片';
img.className = 'pic';
img.style.width = '200px';`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '事件绑定与冒泡',
    children: (
      <>
        <Paragraph>事件可用addEventListener绑定，支持冒泡与捕获。</Paragraph>
        <pre style={codeBlockStyle}>{`const btn = document.getElementById('btn');
btn.addEventListener('click', e => {
  alert('点击了按钮');
});`}</pre>
        <ul>
          <li>事件冒泡：事件从子节点向父节点传播</li>
          <li>e.stopPropagation()阻止冒泡</li>
        </ul>
      </>
    ),
  },
  {
    key: '5',
    label: '事件委托',
    children: (
      <>
        <Paragraph>事件委托通过父元素统一监听，提高性能。</Paragraph>
        <pre style={codeBlockStyle}>{`document.getElementById('list').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    alert(e.target.textContent);
  }
});`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: '常用事件类型',
    children: (
      <>
        <ul>
          <li>鼠标事件：click、dblclick、mouseover、mouseout</li>
          <li>键盘事件：keydown、keyup、keypress</li>
          <li>表单事件：change、input、submit、focus、blur</li>
          <li>其他：load、resize、scroll、contextmenu等</li>
        </ul>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="点击列表项高亮" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`<ul id="mylist">
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
<script>
document.getElementById('mylist').addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.style.background = '#e3eafe';
  }
});
</script>`}</pre>
        </Card>
        <Card title="表单输入实时显示" size="small">
          <pre style={codeBlockStyle}>{`<input id="ipt" />
<span id="show"></span>
<script>
document.getElementById('ipt').addEventListener('input', e => {
  document.getElementById('show').textContent = e.target.value;
});
</script>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '8',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用JS实现点击按钮切换图片。</li>
          <li>用事件委托实现列表项删除。</li>
          <li>用input事件实现输入字数统计。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model" target="_blank" rel="noopener noreferrer">MDN DOM文档</a></li>
          <li><a href="https://www.w3school.com.cn/js/js_htmldom.asp" target="_blank" rel="noopener noreferrer">W3School DOM教程</a></li>
        </ul>
      </>
    ),
  },
];

export default function DomPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>DOM与事件</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/es6"
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
          上一章：ES6+新特性
        </a>
        <a
          href="/study/frontend/async"
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
          下一章：异步与Promise
        </a>
      </div>
    </div>
  );
} 