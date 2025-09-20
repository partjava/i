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
    label: '异步编程基础',
    children: (
      <>
        <Card title="什么是异步？为什么需要异步？" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>JS是单线程，异步可避免阻塞UI和提升性能。</li>
            <li>常见异步场景：定时器、网络请求、事件监听、文件读取等。</li>
            <li>早期用回调函数（callback）实现异步，易陷入回调地狱。</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// 回调地狱示例
setTimeout(() => {
  console.log('A');
  setTimeout(() => {
    console.log('B');
    setTimeout(() => {
      console.log('C');
    }, 1000);
  }, 1000);
}, 1000);`}</pre>
        <Paragraph>回调嵌套多层，代码难以维护。</Paragraph>
      </>
    ),
  },
  {
    key: '2',
    label: 'Promise原理与用法',
    children: (
      <>
        <Paragraph>Promise是ES6引入的异步编程解决方案，避免回调地狱，支持链式调用。</Paragraph>
        <pre style={codeBlockStyle}>{`// Promise基本用法
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000);
});
p.then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});`}</pre>
        <pre style={codeBlockStyle}>{`// Promise链式调用
function step(msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, 1000);
  });
}
step('A').then(() => step('B')).then(() => step('C'));`}</pre>
        <Paragraph>Promise有三种状态：pending、fulfilled、rejected。状态不可逆。</Paragraph>
      </>
    ),
  },
  {
    key: '3',
    label: 'async/await用法',
    children: (
      <>
        <Paragraph>async/await是基于Promise的语法糖，使异步代码像同步一样书写。</Paragraph>
        <pre style={codeBlockStyle}>{`function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function run() {
  await delay(1000);
  console.log('step1');
  await delay(1000);
  console.log('step2');
}
run();`}</pre>
        <pre style={codeBlockStyle}>{`// 错误处理
async function fetchData() {
  try {
    let res = await fetch('/api/data');
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.error('出错了', err);
  }
}`}</pre>
        <Paragraph>await只能在async函数中使用，遇到await会等待Promise完成。</Paragraph>
      </>
    ),
  },
  {
    key: '4',
    label: '常见异步场景',
    children: (
      <>
        <Card title="定时器与事件监听" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`setTimeout(() => console.log('1秒后'), 1000);
setInterval(() => console.log('每2秒'), 2000);
document.getElementById('btn').addEventListener('click', () => {
  alert('点击按钮');
});`}</pre>
        </Card>
        <Card title="网络请求（fetch）" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`}</pre>
        </Card>
        <Card title="文件读取（Node.js）" size="small">
          <pre style={codeBlockStyle}>{`const fs = require('fs');
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '实战案例',
    children: (
      <>
        <Card title="Promise封装Ajax" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
get('/api/user').then(res => console.log(res));`}</pre>
        </Card>
        <Card title="async/await顺序执行" size="small">
          <pre style={codeBlockStyle}>{`async function steps() {
  await step('A');
  await step('B');
  await step('C');
}
function step(msg) {
  return new Promise(r => setTimeout(() => {
    console.log(msg);
    r();
  }, 1000));
}
steps();`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用Promise封装一个图片加载函数。</li>
          <li>用async/await实现顺序输出1~5，每秒一个。</li>
          <li>用Promise.all并发请求多个接口。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises" target="_blank" rel="noopener noreferrer">MDN Promise</a></li>
          <li><a href="https://es6.ruanyifeng.com/#docs/async" target="_blank" rel="noopener noreferrer">阮一峰 async/await</a></li>
        </ul>
      </>
    ),
  },
];

export default function AsyncPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>异步与Promise</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/dom"
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
          上一章：DOM与事件
        </a>
        <a
          href="/study/frontend/security"
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
          下一章：前端安全
        </a>
      </div>
    </div>
  );
} 