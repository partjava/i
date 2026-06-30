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
  chapterTitle: 'DOM与事件',
  chapterNumber: 10,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'ES6+新特性', href: '/study/computer/frontend/es6' },
  nextChapter: { label: '异步与Promise', href: '/study/computer/frontend/async' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'DOM基础与操作',
    left: (
      <div className="space-y-4">
        <PageTitle>DOM基础</PageTitle>
        <BookParagraph>DOM（文档对象模型）将HTML文档表示为树结构，允许JS操作页面元素。</BookParagraph>
        <SectionTitle>节点操作</SectionTitle>
        <BookList items={[
          '获取元素：getElementById、querySelector、querySelectorAll',
          '创建节点：createElement、createTextNode',
          '添加节点：appendChild、insertBefore',
          '删除节点：removeChild',
        ]} />
        <BookCode language="javascript" code={`// DOM操作
const div = document.createElement('div');
div.textContent = 'Hello';
div.classList.add('box');
document.body.appendChild(div);
// 查找
const el = document.querySelector('.box');
const items = document.querySelectorAll('li');`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>属性与样式操作</SectionTitle>
        <BookCode language="javascript" code={`// 属性操作
el.setAttribute('data-id', '123');
el.getAttribute('data-id');
el.removeAttribute('disabled');
// 样式操作
el.style.color = 'red';
el.style.backgroundColor = 'blue';
el.classList.add('active');
el.classList.toggle('visible');`} />
        <TagGrid items={['DOM', 'querySelector', 'createElement', '操作', '遍历']} />
      </div>
    ),
  },
  {
    label: '事件机制',
    left: (
      <div className="space-y-4">
        <PageTitle>事件绑定与冒泡</PageTitle>
        <BookParagraph>事件机制包括捕获、目标、冒泡三个阶段。</BookParagraph>
        <BookCode language="javascript" code={`// 事件绑定
el.addEventListener('click', (e) => {
  console.log(e.target, e.currentTarget);
});
// 事件冒泡与阻止
el.addEventListener('click', (e) => {
  e.stopPropagation(); // 阻止冒泡
  e.preventDefault();  // 阻止默认行为
});`} />
        <SectionTitle>事件委托</SectionTitle>
        <BookParagraph>利用事件冒泡，在父元素上监听子元素事件。</BookParagraph>
        <BookCode language="javascript" code={`// 事件委托
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('点击了:', e.target.textContent);
  }
});`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常用事件类型</SectionTitle>
        <BookList items={['鼠标事件：click、mouseover、mouseout', '键盘事件：keydown、keyup', '表单事件：submit、change、input', '窗口事件：resize、scroll、load']} />
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>点击列表项高亮：</b></BookParagraph>
        <BookCode language="javascript" code={`// 列表高亮
items.forEach(item => {
  item.addEventListener('click', function() {
    document.querySelector('.active')?.classList.remove('active');
    this.classList.add('active');
  });
});`} />
        <BookParagraph><b>表单输入实时显示：</b></BookParagraph>
        <BookCode language="javascript" code={`// 表单输入实时显示
const input = document.getElementById('ipt');
const display = document.getElementById('show');
input.addEventListener('input', (e) => {
  display.textContent = e.target.value;
});`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={['用JS实现点击按钮切换图片', '用事件委托实现列表项删除', '用input事件实现输入字数统计']} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'MDN DOM文档：developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model',
          'W3School DOM教程：www.w3school.com.cn/js/js_htmldom.asp',
        ]} />
        <TagGrid items={['事件绑定', '冒泡', '事件委托', 'addEventListener', '练习']} />
      </div>
    ),
  },
]

export default function FrontendDomPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
