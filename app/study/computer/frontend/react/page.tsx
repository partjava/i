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
  chapterTitle: 'React基础',
  chapterNumber: 16,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '性能优化', href: '/study/computer/frontend/performance' },
  nextChapter: { label: 'React进阶', href: '/study/computer/frontend/react-advanced' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'React简介与组件',
    left: (
      <div className="space-y-4">
        <PageTitle>React简介</PageTitle>
        <BookParagraph>React是用于构建用户界面的JavaScript库，核心思想是声明式UI、组件化开发、单向数据流。</BookParagraph>
        <BookList items={[
          '声明式UI：用JSX描述界面，状态驱动视图。',
          '组件化开发：UI拆分为可复用组件。',
          '单向数据流：数据自上而下流动，易于维护。',
        ]} />
        <BookCode language="jsx" code={`// 最简单的React组件
function Hello() {
  return <h1>Hello, React!</h1>;
}`} />
        <SectionTitle>组件开发</SectionTitle>
        <BookParagraph><b>函数组件：</b></BookParagraph>
        <BookCode language="jsx" code={`function Welcome(props) {
  return <h2>你好, {props.name}</h2>;
}`} />
        <BookParagraph><b>类组件：</b></BookParagraph>
        <BookCode language="jsx" code={`class Welcome extends React.Component {
  render() {
    return <h2>你好, {this.props.name}</h2>;
  }
}`} />
        <BookParagraph><b>state与事件处理：</b></BookParagraph>
        <BookCode language="jsx" code={`function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>JSX与渲染</SectionTitle>
        <BookParagraph>JSX是JS的语法扩展，可嵌入表达式、条件、列表渲染。</BookParagraph>
        <BookCode language="jsx" code={`// 条件渲染
function Greet({ isLogin }) {
  return isLogin ? <span>欢迎回来</span> : <a href="/auth/login">请登录</a>;
}`} />
        <BookCode language="jsx" code={`// 列表渲染
function List({ items }) {
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
}`} />
        <SectionTitle>组件通信</SectionTitle>
        <BookParagraph><b>props传递：</b></BookParagraph>
        <BookCode language="jsx" code={`function Parent() {
  return <Child msg="hello" />;
}
function Child({ msg }) {
  return <span>{msg}</span>;
}`} />
        <BookParagraph><b>回调与状态提升：</b></BookParagraph>
        <BookCode language="jsx" code={`function Parent() {
  const [val, setVal] = React.useState('');
  return <Child onChange={setVal} />;
}
function Child({ onChange }) {
  return <input onChange={e => onChange(e.target.value)} />;
}`} />
        <BookParagraph><b>Context跨层通信：</b></BookParagraph>
        <BookCode language="jsx" code={`const ThemeContext = React.createContext('light');
function App() {
  return <ThemeContext.Provider value="dark"><Toolbar /></ThemeContext.Provider>;
}
function Toolbar() {
  return <ThemeContext.Consumer>{v => <div>主题:{v}</div>}</ThemeContext.Consumer>;
}`} />
        <TagGrid items={['组件', 'JSX', 'props', 'Context', '声明式']} />
      </div>
    ),
  },
  {
    label: 'Hooks与表单',
    left: (
      <div className="space-y-4">
        <PageTitle>生命周期与副作用</PageTitle>
        <BookParagraph><b>useEffect副作用：</b></BookParagraph>
        <BookCode language="jsx" code={`function Timer() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setN(n => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{n}</span>;
}`} />
        <BookParagraph><b>类组件生命周期：</b></BookParagraph>
        <BookCode language="jsx" code={`class Demo extends React.Component {
  componentDidMount() { /* 挂载后 */ }
  componentDidUpdate() { /* 更新后 */ }
  componentWillUnmount() { /* 卸载前 */ }
  render() { return <div>生命周期</div>; }
}`} />
        <SectionTitle>表单与受控组件</SectionTitle>
        <BookParagraph>受控组件由state驱动，表单值与状态同步。</BookParagraph>
        <BookCode language="jsx" code={`function MyForm() {
  const [val, setVal] = React.useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>计数器：</b></BookParagraph>
        <BookCode language="jsx" code={`function Counter() {
  const [n, setN] = React.useState(0);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}`} />
        <BookParagraph><b>TodoList：</b></BookParagraph>
        <BookCode language="jsx" code={`function TodoList() {
  const [list, setList] = React.useState([]);
  const [val, setVal] = React.useState('');
  return (
    <>
      <input value={val} onChange={e => setVal(e.target.value)} />
      <button onClick={() => { setList([...list, val]); setVal(''); }}>添加</button>
      <ul>{list.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </>
  );
}`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '实现一个带删除功能的TodoList。',
          '用Context实现主题切换。',
          '用useEffect实现定时器。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'React官方文档：react.docschina.org',
          'React新文档：beta.reactjs.org',
        ]} />
        <TagGrid items={['useState', 'useEffect', 'Hooks', '受控组件', '练习']} />
      </div>
    ),
  },
]

export default function FrontendReactPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
