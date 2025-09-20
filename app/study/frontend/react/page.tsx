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
    label: 'React简介',
    children: (
      <>
        <Card title="React核心思想" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>声明式UI：用JSX描述界面，状态驱动视图。</li>
            <li>组件化开发：UI拆分为可复用组件。</li>
            <li>单向数据流：数据自上而下流动，易于维护。</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// 最简单的React组件
function Hello() {
  return <h1>Hello, React!</h1>;
}`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '组件开发',
    children: (
      <>
        <Card title="函数组件" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`function Welcome(props) {
  return <h2>你好, {props.name}</h2>;
}`}</pre>
        </Card>
        <Card title="类组件" size="small">
          <pre style={codeBlockStyle}>{`class Welcome extends React.Component {
  render() {
    return <h2>你好, {this.props.name}</h2>;
  }
}`}</pre>
        </Card>
        <Card title="state与事件处理" size="small">
          <pre style={codeBlockStyle}>{`function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: 'JSX与渲染',
    children: (
      <>
        <Paragraph>JSX是JS的语法扩展，可嵌入表达式、条件、列表渲染。</Paragraph>
        <pre style={codeBlockStyle}>{`// 条件渲染
function Greet({ isLogin }) {
  return isLogin ? <span>欢迎回来</span> : <a href="/login">请登录</a>;
}`}</pre>
        <pre style={codeBlockStyle}>{`// 列表渲染
function List({ items }) {
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
}`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '组件通信',
    children: (
      <>
        <Card title="props传递" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`function Parent() {
  return <Child msg="hello" />;
}
function Child({ msg }) {
  return <span>{msg}</span>;
}`}</pre>
        </Card>
        <Card title="回调与状态提升" size="small">
          <pre style={codeBlockStyle}>{`function Parent() {
  const [val, setVal] = React.useState('');
  return <Child onChange={setVal} />;
}
function Child({ onChange }) {
  return <input onChange={e => onChange(e.target.value)} />;
}`}</pre>
        </Card>
        <Card title="Context跨层通信" size="small">
          <pre style={codeBlockStyle}>{`const ThemeContext = React.createContext('light');
function App() {
  return <ThemeContext.Provider value="dark"><Toolbar /></ThemeContext.Provider>;
}
function Toolbar() {
  return <ThemeContext.Consumer>{v => <div>主题:{v}</div>}</ThemeContext.Consumer>;
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '生命周期与副作用',
    children: (
      <>
        <Card title="useEffect副作用" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`function Timer() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setN(n => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{n}</span>;
}`}</pre>
        </Card>
        <Card title="类组件生命周期" size="small">
          <pre style={codeBlockStyle}>{`class Demo extends React.Component {
  componentDidMount() { /* 挂载后 */ }
  componentDidUpdate() { /* 更新后 */ }
  componentWillUnmount() { /* 卸载前 */ }
  render() { return <div>生命周期</div>; }
}`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '表单与受控组件',
    children: (
      <>
        <Paragraph>受控组件由state驱动，表单值与状态同步。</Paragraph>
        <pre style={codeBlockStyle}>{`function MyForm() {
  const [val, setVal] = React.useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}`}</pre>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="计数器" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`function Counter() {
  const [n, setN] = React.useState(0);
  return <button onClick={() => setN(n+1)}>{n}</button>;
}`}</pre>
        </Card>
        <Card title="TodoList" size="small">
          <pre style={codeBlockStyle}>{`function TodoList() {
  const [list, setList] = React.useState([]);
  const [val, setVal] = React.useState('');
  return (
    <>
      <input value={val} onChange={e => setVal(e.target.value)} />
      <button onClick={() => { setList([...list, val]); setVal(''); }}>添加</button>
      <ul>{list.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </>
  );
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
          <li>实现一个带删除功能的TodoList。</li>
          <li>用Context实现主题切换。</li>
          <li>用useEffect实现定时器。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://react.docschina.org/" target="_blank" rel="noopener noreferrer">React官方文档</a></li>
          <li><a href="https://beta.reactjs.org/" target="_blank" rel="noopener noreferrer">React新文档</a></li>
        </ul>
      </>
    ),
  },
];

export default function ReactBasicPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>React基础</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/performance"
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
          上一章：性能优化
        </a>
        <a
          href="/study/frontend/react-advanced"
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
          下一章：React进阶
        </a>
      </div>
    </div>
  );
} 