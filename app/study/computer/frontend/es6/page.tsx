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
  chapterTitle: 'ES6+新特性',
  chapterNumber: 9,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'JavaScript基础', href: '/study/computer/frontend/js' },
  nextChapter: { label: 'DOM与事件', href: '/study/computer/frontend/dom' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'let/const与箭头函数',
    left: (
      <div className="space-y-4">
        <PageTitle>let/const声明</PageTitle>
        <BookParagraph>ES6引入了let和const替代var，提供块级作用域，消除了变量提升带来的问题。</BookParagraph>
        <BookCode language="javascript" code={`// let/const vs var
if (true) {
  let x = 1;    // 块级作用域
  const y = 2;  // 常量
  var z = 3;    // 函数作用域
}
// console.log(x); // ReferenceError
console.log(z); // 3`} />
        <SectionTitle>箭头函数</SectionTitle>
        <BookParagraph>箭头函数语法更简洁，且不绑定自己的this。</BookParagraph>
        <BookCode language="javascript" code={`// 箭头函数
const add = (a, b) => a + b;
const square = x => x * x;
const getObj = () => ({ name: "ES6" });
// 不绑定this
const obj = {
  name: "obj",
  fn: () => { console.log(this.name); } // 指向外层this
};`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>解构赋值</SectionTitle>
        <BookParagraph>解构赋值可以方便地从数组或对象中提取值。</BookParagraph>
        <BookCode language="javascript" code={`// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4];
// 对象解构
const { name, age = 18 } = { name: "Tom" };
// 交换变量
[x, y] = [y, x];`} />
        <SectionTitle>模板字符串</SectionTitle>
        <BookCode language="javascript" code={`// 模板字符串
const name = "World";
console.log(\`Hello, \${name}!\`);
// 支持多行
const html = \`
<div>
  <h1>\${title}</h1>
</div>\`;`} />
        <TagGrid items={['let', 'const', '箭头函数', '解构', '模板字符串']} />
      </div>
    ),
  },
  {
    label: '扩展运算符与Promise',
    left: (
      <div className="space-y-4">
        <PageTitle>扩展运算符</PageTitle>
        <BookCode language="javascript" code={`// 扩展运算符
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1,b:2,c:3}
// 函数调用
Math.max(...arr1);`} />
        <SectionTitle>Promise与异步</SectionTitle>
        <BookParagraph>Promise用于处理异步操作，async/await是语法糖。</BookParagraph>
        <BookCode language="javascript" code={`// Promise
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
// async/await
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) { console.error(err); }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>类与模块</SectionTitle>
        <BookCode language="javascript" code={`// ES6类
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a noise\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; }
}
// 模块
export const PI = 3.14;
export default function hello() {}`} />
        <SectionTitle>Set/Map新对象</SectionTitle>
        <BookCode language="javascript" code={`// Set（不重复）
const set = new Set([1,2,2,3]); // {1,2,3}
set.has(2); // true
// Map（键可为对象）
const map = new Map();
map.set('key', 'value');`} />
        <TagGrid items={['扩展运算符', 'Promise', 'class', 'Set', 'Map']} />
      </div>
    ),
  },
  {
    label: '练习与拓展',
    left: (
      <div className="space-y-4">
        <PageTitle>练习与拓展</PageTitle>
        <BookList items={[
          '用解构赋值交换两个变量的值',
          '用Promise封装一个延时函数',
          '用class实现一个简单的计数器类',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={['MDN ES6 文档', '阮一峰ES6教程']} />
        <TagGrid items={['练习', 'Promise', 'class', 'Set', 'ES6']} />
      </div>
    ),
  },
]

export default function FrontendEs6Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
