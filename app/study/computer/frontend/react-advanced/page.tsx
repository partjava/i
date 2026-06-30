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
  chapterTitle: 'React进阶',
  chapterNumber: 17,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'React基础', href: '/study/computer/frontend/react' },
  nextChapter: { label: 'Vue基础', href: '/study/computer/frontend/vue' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '组件复用与优化',
    left: (
      <div className="space-y-4">
        <PageTitle>组件复用</PageTitle>
        <BookParagraph><b>高阶组件（HOC）：</b></BookParagraph>
        <BookCode language="jsx" code={`// 高阶组件：接收一个组件，返回一个新组件
function withLogger(Wrapped) {
  return function(props) {
    React.useEffect(() => { console.log('渲染', props); });
    return <Wrapped {...props} />;
  };
}
const Hello = props => <h1>{props.msg}</h1>;
const LogHello = withLogger(Hello);`} />
        <BookParagraph><b>Render Props：</b></BookParagraph>
        <BookCode language="jsx" code={`// Render Props：通过函数作为子组件传递数据
function Mouse({ children }) {
  const [pos, setPos] = React.useState({x:0,y:0});
  return <div onMouseMove={e => setPos({x:e.clientX,y:e.clientY})}>
    {children(pos)}
  </div>;
}
<Mouse>{pos => <span>{pos.x},{pos.y}</span>}</Mouse>`} />
        <BookParagraph><b>自定义Hook：</b></BookParagraph>
        <BookCode language="javascript" code={`// 自定义Hook：封装可复用逻辑
function useCounter(init=0) {
  const [n, setN] = React.useState(init);
  const inc = () => setN(n+1);
  return [n, inc];
}
function Demo() {
  const [n, inc] = useCounter();
  return <button onClick={inc}>{n}</button>;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>性能优化</SectionTitle>
        <BookParagraph><b>memo与useMemo：</b></BookParagraph>
        <BookCode language="jsx" code={`// React.memo: 组件props不变时跳过渲染
const MemoComp = React.memo(function({ value }) {
  return <div>{value}</div>;
});
// useMemo: 记忆计算结果，依赖n变化才重新计算
function Demo({ n }) {
  const double = React.useMemo(() => n*2, [n]);
  return <MemoComp value={double} />;
}`} />
        <BookParagraph><b>useCallback与懒加载：</b></BookParagraph>
        <BookCode language="jsx" code={`// useCallback: 记忆函数，依赖不变时返回同一个函数
const Child = React.memo(({ onClick }) => <button onClick={onClick}>点我</button>);
function Demo() {
  const [n, setN] = React.useState(0);
  const handle = React.useCallback(() => setN(n+1), [n]);
  return <Child onClick={handle} />;
}
// 懒加载组件：按需加载，提升首屏速度
const LazyComp = React.lazy(() => import('./Comp'));
<Suspense fallback={<div>加载中...</div>}>
  <LazyComp />
</Suspense>`} />
        <TagGrid items={['自定义Hook', 'memo', 'useReducer', '路由', '懒加载']} />
      </div>
    ),
  },
  {
    label: '状态管理与路由',
    left: (
      <div className="space-y-4">
        <PageTitle>复杂状态管理</PageTitle>
        <BookParagraph><b>useReducer：</b></BookParagraph>
        <BookCode language="jsx" code={`// useReducer: 适合复杂状态逻辑
function reducer(state, action) {
  switch(action.type) {
    case 'inc': return { n: state.n + 1 };
    default: return state;
  }
}
function Demo() {
  const [state, dispatch] = React.useReducer(reducer, { n: 0 });
  return <button onClick={() => dispatch({type:'inc'})}>{state.n}</button>;
}`} />
        <BookParagraph><b>Context与Redux原理：</b></BookParagraph>
        <BookCode language="jsx" code={`// Context：实现跨组件状态共享
const Ctx = React.createContext();
function Provider({ children }) {
  const [n, setN] = React.useState(0);
  return <Ctx.Provider value={{n, setN}}>{children}</Ctx.Provider>;
}
function Child() {
  const { n, setN } = React.useContext(Ctx);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}`} />
        <SectionTitle>路由与动态加载</SectionTitle>
        <BookParagraph><b>react-router基本用法：</b></BookParagraph>
        <BookCode language="jsx" code={`import { BrowserRouter, Route, Link } from 'react-router-dom';
function App() {
  return <BrowserRouter>
    <Link to="/a">A</Link>
    <Route path="/a" element={<A />} />
  </BrowserRouter>;
}`} />
        <BookParagraph><b>路由懒加载：</b></BookParagraph>
        <BookCode language="jsx" code={`const A = React.lazy(() => import('./A'));
<Route path="/a" element={<Suspense fallback="加载中"><A /></Suspense>} />`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>异步与数据请求</SectionTitle>
        <BookParagraph><b>useEffect异步：</b></BookParagraph>
        <BookCode language="jsx" code={`function User() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);
  if (!user) return <span>加载中</span>;
  return <div>{user.name}</div>;
}`} />
        <BookParagraph><b>SWR/React Query：</b></BookParagraph>
        <BookCode language="javascript" code={`// SWR: React社区流行的数据请求与缓存库
import useSWR from 'swr';
function User() {
  const { data, error } = useSWR('/api/user', url => fetch(url).then(r => r.json()));
  if (error) return '出错了';
  if (!data) return '加载中';
  return <div>{data.name}</div>;
}`} />
        <SectionTitle>测试与调试</SectionTitle>
        <BookList items={[
          'React DevTools：调试组件树和Hooks的浏览器插件。',
          'Jest + React Testing Library：单元测试。',
        ]} />
        <BookCode language="javascript" code={`import { render, screen } from '@testing-library/react';
test('渲染', () => {
  render(<button>hi</button>);
  expect(screen.getByText('hi')).toBeInTheDocument();
});`} />
        <TagGrid items={['fetch', 'SWR', '测试', 'DevTools', '练习']} />
      </div>
    ),
  },
  {
    label: '实战与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <BookParagraph><b>主题切换：</b></BookParagraph>
        <BookCode language="jsx" code={`// 主题切换：利用Context实现全局状态
const ThemeContext = React.createContext('light');
function ThemeBtn() {
  const [theme, setTheme] = React.useContext(ThemeContext);
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>{theme}</button>;
}`} />
        <BookParagraph><b>异步列表：</b></BookParagraph>
        <BookCode language="jsx" code={`function List() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/list').then(r => r.json()).then(setData);
  }, []);
  return <ul>{data.map(i => <li key={i}>{i}</li>)}</ul>;
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '用useReducer实现一个计数器。',
          '用React Router实现多页面切换。',
          '用SWR实现数据缓存。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'React官方文档：react.docschina.org',
          'React Router：reactrouter.com',
          'React Query：react-query-v3.tanstack.com',
        ]} />
        <TagGrid items={['主题切换', '异步', 'SWR', 'Router', '练习']} />
      </div>
    ),
  },
]

export default function FrontendReactAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
