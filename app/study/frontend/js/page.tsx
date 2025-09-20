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
    label: 'JS简介',
    children: (
      <>
        <Card title="JavaScript是什么" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>JavaScript是浏览器端最常用的脚本语言，也可用于Node.js等后端开发。</li>
            <li>主要用于网页交互、动态效果、数据处理等。</li>
            <li>JS由ECMAScript标准定义，支持多范式编程。</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '变量与数据类型',
    children: (
      <>
        <Paragraph>JS支持多种数据类型，变量可用var、let、const声明。</Paragraph>
        <pre style={codeBlockStyle}>{`let a = 10;
const name = 'Alice';
let arr = [1, 2, 3];
let obj = { x: 1, y: 2 };
let flag = true;`}</pre>
        <ul>
          <li>基本类型：number、string、boolean、null、undefined、symbol、bigint</li>
          <li>引用类型：object、array、function等</li>
        </ul>
      </>
    ),
  },
  {
    key: '3',
    label: '运算符',
    children: (
      <>
        <ul>
          <li>算术运算符：+ - * / % **</li>
          <li>比较运算符：== === != !== &gt; &lt; &gt;= &lt;=</li>
          <li>逻辑运算符：&& || !</li>
          <li>赋值运算符：= += -= *= /=</li>
          <li>三元运算符：条件 ? A : B</li>
        </ul>
        <pre style={codeBlockStyle}>{`let x = 5;
let y = 3;
let z = x * y;
let isBig = z &gt; 10 ? true : false;`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '流程控制',
    children: (
      <>
        <ul>
          <li>条件语句：if、else if、else、switch</li>
          <li>循环语句：for、while、do...while、for...of、for...in</li>
          <li>break/continue控制流程</li>
        </ul>
        <pre style={codeBlockStyle}>{`for (let i = 0; i &lt; 5; i++) {
  if (i % 2 === 0) continue;
  console.log(i);
}`}</pre>
      </>
    ),
  },
  {
    key: '5',
    label: '函数',
    children: (
      <>
        <Paragraph>函数是JS的核心，支持声明式、表达式、箭头函数等多种写法。</Paragraph>
        <pre style={codeBlockStyle}>{`function add(a, b) { return a + b; }
const sub = function(a, b) { return a - b; };
const mul = (a, b) =&gt; a * b;`}</pre>
        <ul>
          <li>参数默认值、剩余参数、arguments对象</li>
          <li>高阶函数、回调函数</li>
        </ul>
      </>
    ),
  },
  {
    key: '6',
    label: '作用域与闭包',
    children: (
      <>
        <Paragraph>JS有全局作用域、函数作用域、块级作用域。闭包可访问外部函数变量。</Paragraph>
        <pre style={codeBlockStyle}>{`function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '常用内置对象',
    children: (
      <>
        <ul>
          <li>Math：数学运算</li>
          <li>Date：日期时间</li>
          <li>Array/String/Object：常用方法</li>
          <li>JSON、RegExp、Error等</li>
        </ul>
        <pre style={codeBlockStyle}>{`let now = new Date();
let arr = [1,2,3].map(x =&gt; x * 2);
let str = 'abc'.toUpperCase();
let json = JSON.stringify({a:1});`}</pre>
      </>
    ),
  },
  {
    key: '8',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>写一个函数判断一个数是否为素数。</li>
          <li>用for循环输出1~100的偶数和。</li>
          <li>用闭包实现一个计数器。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">MDN JavaScript</a></li>
          <li><a href="https://www.w3school.com.cn/js/index.asp" target="_blank" rel="noopener noreferrer">W3School JS教程</a></li>
        </ul>
      </>
    ),
  },
];

export default function JsBasicPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>JavaScript基础</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
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
          上一章：响应式设计
        </a>
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
          下一章：ES6+新特性
        </a>
      </div>
    </div>
  );
} 