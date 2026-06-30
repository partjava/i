'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Web前端开发',
  chapterTitle: 'JavaScript基础',
  chapterNumber: 8,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '响应式设计', href: '/study/computer/frontend/responsive' },
  nextChapter: { label: 'ES6+新特性', href: '/study/computer/frontend/es6' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'JS简介与变量',
    left: (
      <div className="space-y-4">
        <PageTitle>JavaScript简介</PageTitle>
        <BookParagraph>JavaScript是浏览器端最常用的脚本语言，也可用于Node.js等后端开发。JS由ECMAScript标准定义，支持多范式编程，主要用于网页交互、动态效果和数据处理。</BookParagraph>
        <SectionTitle>变量与数据类型</SectionTitle>
        <BookList items={[
          'var：函数作用域，存在变量提升',
          'let：块级作用域，无变量提升',
          'const：常量，声明后不可重新赋值',
          '数据类型：number、string、boolean、null、undefined、object、symbol',
        ]} />
        <BookCode language="javascript" code={`// 变量声明
var a = 1;
let b = "hello";
const c = true;
// 类型转换
let num = Number("123");
let str = String(456);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>运算符</SectionTitle>
        <BookList items={['算术：+ - * / % **', '比较：== === !== > <', '逻辑：&& || !', '三元：condition ? a : b']} />
        <BookCode language="javascript" code={`// 运算符
console.log(2 ** 3); // 8
console.log(1 === "1"); // false
let msg = age >= 18 ? "成年" : "未成年";`} />
        <SectionTitle>流程控制</SectionTitle>
        <BookCode language="javascript" code={`// if/for/while
if (score >= 60) { console.log("及格"); }
for (let i = 0; i < 5; i++) { console.log(i); }
for (let item of arr) { }`} />
        <TagGrid items={['let', 'const', '数据类型', '运算符', '流程控制']} />
      </div>
    ),
  },
  {
    label: '函数与作用域',
    left: (
      <div className="space-y-4">
        <PageTitle>函数</PageTitle>
        <BookList items={[
          '函数声明：function fn() {}',
          '函数表达式：const fn = function() {}',
          '箭头函数：const fn = () => {}',
          '参数：默认参数、剩余参数、arguments对象',
          '高阶函数与回调函数',
        ]} />
        <BookCode language="javascript" code={`// 函数定义
function add(a, b = 0) { return a + b; }
const multiply = (a, b) => a * b;
function sum(...args) { return args.reduce((p, c) => p + c, 0); }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>作用域与闭包</SectionTitle>
        <BookList items={['全局作用域、函数作用域、块级作用域', '闭包：函数内部函数可访问外部变量', '闭包应用：数据私有化、防抖节流']} />
        <BookCode language="javascript" code={`// 闭包
function createCounter() {
  let count = 0;
  return function() { return ++count; };
}
const counter = createCounter();`} />
        <SectionTitle>常用内置对象</SectionTitle>
        <BookList items={[
          'Math：数学运算',
          'Date：日期时间',
          'Array：map、filter、reduce、forEach',
          'String：字符串方法',
          'JSON：JSON.parse()、JSON.stringify()',
          'RegExp、Error等内置对象',
        ]} />
        <TagGrid items={['函数', '箭头函数', '闭包', '作用域', '内置对象']} />
      </div>
    ),
  },
  {
    label: '练习与拓展',
    left: (
      <div className="space-y-4">
        <PageTitle>练习与拓展</PageTitle>
        <BookList items={['写一个函数判断一个数是否为素数', '用for循环输出1~100的偶数和', '用闭包实现一个计数器']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={['MDN JavaScript 文档', 'W3School JavaScript 教程']} />
        <TagGrid items={['练习', '闭包', '高阶函数', 'MDN', 'W3School']} />
      </div>
    ),
  },
]

export default function FrontendJsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
