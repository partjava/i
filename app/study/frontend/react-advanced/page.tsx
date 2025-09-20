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
    label: '组件复用',
    children: (
      <>
        <Card title="高阶组件（HOC）" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 高阶组件：接收一个组件，返回一个新组件
function withLogger(Wrapped) {
  return function(props) {
    // 副作用：每次渲染打印props
    React.useEffect(() => { console.log('渲染', props); });
    return <Wrapped {...props} />; // 传递所有props
  };
}
// 普通组件
const Hello = props => <h1>{props.msg}</h1>;
// 包装后获得增强功能
const LogHello = withLogger(Hello);`}</pre>
        </Card>
        <Card title="Render Props" size="small">
          <pre style={codeBlockStyle}>{`// Render Props：通过函数作为子组件传递数据
function Mouse({ children }) {
  const [pos, setPos] = React.useState({x:0,y:0});
  // 鼠标移动时更新坐标
  return <div onMouseMove={e => setPos({x:e.clientX,y:e.clientY})}>
    {children(pos)} // 通过children渲染内容
  </div>;
}
// 使用方式：
<Mouse>{pos => <span>{pos.x},{pos.y}</span>}</Mouse>`}</pre>
        </Card>
        <Card title="自定义Hook" size="small">
          <pre style={codeBlockStyle}>{`// 自定义Hook：封装可复用逻辑
function useCounter(init=0) {
  const [n, setN] = React.useState(init);
  const inc = () => setN(n+1); // 增加计数
  return [n, inc];
}
function Demo() {
  const [n, inc] = useCounter();
  return <button onClick={inc}>{n}</button>;
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '性能优化',
    children: (
      <>
        <Card title="memo与useMemo" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// React.memo: 组件props不变时跳过渲染
const MemoComp = React.memo(function({ value }) {
  return <div>{value}</div>;
});
// useMemo: 记忆计算结果，依赖n变化才重新计算
function Demo({ n }) {
  const double = React.useMemo(() => n*2, [n]);
  return <MemoComp value={double} />;
}`}</pre>
        </Card>
        <Card title="useCallback与懒加载" size="small">
          <pre style={codeBlockStyle}>{`// useCallback: 记忆函数，依赖不变时返回同一个函数，防止子组件重复渲染
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
</Suspense>`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '复杂状态管理',
    children: (
      <>
        <Card title="useReducer" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// useReducer: 适合复杂状态逻辑
function reducer(state, action) {
  switch(action.type) {
    case 'inc': return { n: state.n + 1 };
    default: return state;
  }
}
function Demo() {
  const [state, dispatch] = React.useReducer(reducer, { n: 0 });
  return <button onClick={() => dispatch({type:'inc'})}>{state.n}</button>;
}`}</pre>
        </Card>
        <Card title="Context与Redux原理" size="small">
          <pre style={codeBlockStyle}>{`// Context：实现跨组件状态共享
const Ctx = React.createContext();
function Provider({ children }) {
  const [n, setN] = React.useState(0);
  return <Ctx.Provider value={{n, setN}}>{children}</Ctx.Provider>;
}
function Child() {
  const { n, setN } = React.useContext(Ctx);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '路由与动态加载',
    children: (
      <>
        <Card title="react-router基本用法" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 路由：实现单页多页面切换
import { BrowserRouter, Route, Link } from 'react-router-dom';
function App() {
  return <BrowserRouter>
    <Link to="/a">A</Link>
    <Route path="/a" element={<A />} />
  </BrowserRouter>;
}`}</pre>
        </Card>
        <Card title="路由懒加载" size="small">
          <pre style={codeBlockStyle}>{`// 路由组件懒加载
const A = React.lazy(() => import('./A'));
<Route path="/a" element={<Suspense fallback="加载中"><A /></Suspense>} />`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '异步与数据请求',
    children: (
      <>
        <Card title="useEffect异步" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// useEffect中发起异步请求
function User() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setUser);
  }, []);
  if (!user) return <span>加载中</span>;
  return <div>{user.name}</div>;
}`}</pre>
        </Card>
        <Card title="SWR/React Query" size="small">
          <pre style={codeBlockStyle}>{`// SWR: React社区流行的数据请求与缓存库
import useSWR from 'swr';
function User() {
  const { data, error } = useSWR('/api/user', url => fetch(url).then(r => r.json()));
  if (error) return '出错了';
  if (!data) return '加载中';
  return <div>{data.name}</div>;
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '测试与调试',
    children: (
      <>
        <Card title="React DevTools" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// React DevTools：调试组件树和Hooks的浏览器插件
// https://react.dev/tools`}</pre>
        </Card>
        <Card title="单元测试" size="small">
          <pre style={codeBlockStyle}>{`// React组件单元测试：Jest + React Testing Library
import { render, screen } from '@testing-library/react';
test('渲染', () => {
  render(<button>hi</button>);
  expect(screen.getByText('hi')).toBeInTheDocument();
});`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="主题切换" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 主题切换：利用Context实现全局状态
const ThemeContext = React.createContext('light');
function ThemeBtn() {
  const [theme, setTheme] = React.useContext(ThemeContext);
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>{theme}</button>;
}`}</pre>
        </Card>
        <Card title="异步列表" size="small">
          <pre style={codeBlockStyle}>{`// 异步加载列表数据
function List() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/list').then(r => r.json()).then(setData);
  }, []);
  return <ul>{data.map(i => <li key={i}>{i}</li>)}</ul>;
}`}</pre>
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
          <li>用useReducer实现一个计数器。</li>
          <li>用React Router实现多页面切换。</li>
          <li>用SWR实现数据缓存。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://react.docschina.org/" target="_blank" rel="noopener noreferrer">React官方文档</a></li>
          <li><a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer">React Router</a></li>
          <li><a href="https://react-query-v3.tanstack.com/" target="_blank" rel="noopener noreferrer">React Query</a></li>
        </ul>
      </>
    ),
  },
];

export default function ReactAdvancedPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>React进阶</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/react"
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
          上一章：React基础
        </a>
        <a
          href="/study/frontend/vue"
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
          下一章：Vue基础
        </a>
      </div>
    </div>
  );
} 