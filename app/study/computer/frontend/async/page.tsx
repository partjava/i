'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: '异步与Promise',
  chapterNumber: 11,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'DOM与事件', href: '/study/computer/frontend/dom' },
  nextChapter: { label: '前端安全', href: '/study/computer/frontend/security' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '异步基础与Promise',
    left: (
      <div className="space-y-4">
        <PageTitle>异步编程基础</PageTitle>
        <BookParagraph>JS是单线程，异步可避免阻塞UI和提升性能。常见异步场景包括定时器、网络请求、事件监听、文件读取等。早期用回调函数（callback）实现异步，易陷入回调地狱。</BookParagraph>
        <BookCode language="javascript" code={`// 回调地狱示例
setTimeout(() => {
  console.log('A');
  setTimeout(() => {
    console.log('B');
    setTimeout(() => {
      console.log('C');
    }, 1000);
  }, 1000);
}, 1000);`} />
        <BookParagraph>回调嵌套多层，代码难以维护。</BookParagraph>
        <SectionTitle>Promise原理与用法</SectionTitle>
        <BookParagraph>Promise是ES6引入的异步编程解决方案，避免回调地狱，支持链式调用。</BookParagraph>
        <BookCode language="javascript" code={`// Promise基本用法
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('成功'), 1000);
});
p.then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});`} />
        <BookCode language="javascript" code={`// Promise链式调用
function step(msg) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, 1000);
  });
}
step('A').then(() => step('B')).then(() => step('C'));`} />
        <BookParagraph>Promise有三种状态：pending、fulfilled、rejected。状态不可逆。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>async/await用法</SectionTitle>
        <BookParagraph>async/await是基于Promise的语法糖，使异步代码像同步一样书写。</BookParagraph>
        <BookCode language="javascript" code={`function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function run() {
  await delay(1000);
  console.log('step1');
  await delay(1000);
  console.log('step2');
}
run();`} />
        <BookCode language="javascript" code={`// 错误处理
async function fetchData() {
  try {
    let res = await fetch('/api/data');
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.error('出错了', err);
  }
}`} />
        <BookParagraph>await只能在async函数中使用，遇到await会等待Promise完成。</BookParagraph>
        <SectionTitle>常见异步场景</SectionTitle>
        <BookCode language="javascript" code={`// 定时器与事件监听
setTimeout(() => console.log('1秒后'), 1000);
setInterval(() => console.log('每2秒'), 2000);
document.getElementById('btn').addEventListener('click', () => {
  alert('点击按钮');
});
// 网络请求（fetch）
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
// 文件读取（Node.js）
const fs = require('fs');
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});`} />
        <TagGrid items={['Promise', 'async/await', '回调', '异步', 'fetch']} />
      </div>
    ),
  },
  {
    label: '案例与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <BookParagraph><b>Promise封装Ajax：</b></BookParagraph>
        <BookCode language="javascript" code={`function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
get('/api/user').then(res => console.log(res));`} />
        <BookParagraph><b>async/await顺序执行：</b></BookParagraph>
        <BookCode language="javascript" code={`async function steps() {
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
steps();`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习与拓展</SectionTitle>
        <BookList items={[
          '用Promise封装一个图片加载函数。',
          '用async/await实现顺序输出1~5，每秒一个。',
          '用Promise.all并发请求多个接口。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN Promise：developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises',
          '阮一峰 async/await：es6.ruanyifeng.com/#docs/async',
        ]} />
        <TagGrid items={['封装', '并行', '顺序', '练习', 'MDN']} />
      </div>
    ),
  },
]

export default function FrontendAsyncPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
