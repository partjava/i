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
    label: 'let/const声明',
    children: (
      <>
        <Paragraph>ES6引入let和const，替代var，支持块级作用域和常量声明。</Paragraph>
        <pre style={codeBlockStyle}>{`let a = 1;
const PI = 3.14;
// var声明变量存在变量提升和作用域问题`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '箭头函数',
    children: (
      <>
        <Paragraph>箭头函数语法简洁，自动绑定this，常用于回调和数组方法。</Paragraph>
        <pre style={codeBlockStyle}>{`const add = (a, b) => a + b;
const arr = [1,2,3].map(x => x * 2);`}</pre>
      </>
    ),
  },
  {
    key: '3',
    label: '解构赋值',
    children: (
      <>
        <Paragraph>解构赋值可快速提取数组、对象中的值。</Paragraph>
        <pre style={codeBlockStyle}>{`const [a, b] = [1, 2];
const {x, y} = {x: 10, y: 20};`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '模板字符串',
    children: (
      <>
        <Paragraph>模板字符串用反引号`包裹，支持变量插值和多行文本。</Paragraph>
        <pre style={codeBlockStyle}>{'const name = "Tom";\nconst msg = `Hello, ${name}!`;'}</pre>
      </>
    ),
  },
  {
    key: '5',
    label: '扩展运算符',
    children: (
      <>
        <Paragraph>扩展运算符...可用于数组/对象的展开与合并。</Paragraph>
        <pre style={codeBlockStyle}>{`const arr1 = [1,2];
const arr2 = [...arr1, 3];
const obj1 = {a:1};
const obj2 = {...obj1, b:2};`}</pre>
      </>
    ),
  },
  {
    key: '6',
    label: 'Promise与异步',
    children: (
      <>
        <Paragraph>Promise用于异步编程，支持链式then/catch，配合async/await更简洁。</Paragraph>
        <pre style={codeBlockStyle}>{`function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function run() {
  await delay(1000);
  console.log('done');
}`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '类与模块',
    children: (
      <>
        <Paragraph>ES6支持class类和模块化import/export。</Paragraph>
        <pre style={codeBlockStyle}>{`class Person {
  constructor(name) { this.name = name; }
  sayHi() { console.log('Hi,' + this.name); }
}
export default Person;`}</pre>
        <pre style={codeBlockStyle}>{`import Person from './person.js';`}</pre>
      </>
    ),
  },
  {
    key: '8',
    label: 'Set/Map新对象',
    children: (
      <>
        <Paragraph>Set用于存储唯一值，Map用于键值对集合。</Paragraph>
        <pre style={codeBlockStyle}>{`const s = new Set([1,2,2,3]); // {1,2,3}
const m = new Map([['a',1],['b',2]]);
console.log(m.get('a'));`}</pre>
      </>
    ),
  },
  {
    key: '9',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>用解构赋值交换两个变量的值。</li>
          <li>用Promise封装一个延时函数。</li>
          <li>用class实现一个简单的计数器类。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference" target="_blank" rel="noopener noreferrer">MDN ES6参考</a></li>
          <li><a href="https://es6.ruanyifeng.com/" target="_blank" rel="noopener noreferrer">阮一峰ES6教程</a></li>
        </ul>
      </>
    ),
  },
];

export default function Es6Page() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>ES6+新特性</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
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
          上一章：JavaScript基础
        </a>
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
          下一章：DOM与事件
        </a>
      </div>
    </div>
  );
} 