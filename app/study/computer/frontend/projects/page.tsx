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
    label: '项目结构与开发流程',
    children: (
      <>
        <Card title="目录结构与环境配置" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`my-project/
├─ public/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ api/
│  ├─ store/
│  ├─ utils/
│  └─ App.jsx
├─ .env
├─ package.json
├─ README.md
`}</pre>
        </Card>
        <Card title="开发规范建议" size="small">
          <ul>
            <li>统一代码风格（Prettier、ESLint）</li>
            <li>模块化、组件化开发</li>
            <li>环境变量分离（.env.development/.env.production）</li>
          </ul>
        </Card>
      </>
    ),
  },
  {
    key: '2',
    label: '常见业务模块',
    children: (
      <>
        <Card title="登录注册与表单校验" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 登录表单示例（React）
// function Login() {
//   const [user, setUser] = React.useState('');
//   const [pwd, setPwd] = React.useState('');
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!user || !pwd) return alert('请填写完整');
//     // 调用API
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={user} onChange={e => setUser(e.target.value)} placeholder="用户名" />
//       <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="密码" />
//       <button type="submit">登录</button>
//     </form>
//   );
// }
`}</pre>
        </Card>
        <Card title="列表与分页、文件上传" size="small">
          <pre style={codeBlockStyle}>{`// 列表分页（伪代码）
// const [list, setList] = useState([]);
// const [page, setPage] = useState(1);
// useEffect(() => {
//   fetch('/api/list?page=' + page).then(r => r.json()).then(setList);
// }, [page]);
// 文件上传
// 伪代码：文件选择后调用 upload(file)
// function upload(file) { /* ... */ }
// <input type="file" onChange={e => upload(e.target.files[0])} />
`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '状态管理与接口对接',
    children: (
      <>
        <Card title="全局状态管理" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// Redux/Pinia/Zustand等实现全局状态
import { create } from 'zustand';
const useStore = create(set => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));
function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>{count}</button>;
}`}</pre>
        </Card>
        <Card title="API请求与Mock数据" size="small">
          <pre style={codeBlockStyle}>{`// axios请求
import axios from 'axios';
axios.get('/api/user').then(res => console.log(res.data));
// Mock.js本地模拟
import Mock from 'mockjs';
Mock.mock('/api/user', { name: '@cname', age: 20 });`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '4',
    label: '路由与权限控制',
    children: (
      <>
        <Card title="动态路由与权限" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// React Router动态路由
<Route path="/admin" element={isAdmin ? <Admin /> : <NoAuth />} />
// Vue Router权限守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogin()) next('/login');
  else next();
});`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '性能优化与工程化实践',
    children: (
      <>
        <Card title="按需加载与打包优化" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// React懒加载
const Comp = React.lazy(() => import('./Comp'));
<Suspense fallback={<div>加载中...</div>}><Comp /></Suspense>
// Webpack分包
output: { filename: '[name].[contenthash].js' }`}</pre>
        </Card>
        <Card title="CI/CD自动化" size="small">
          <pre style={codeBlockStyle}>{`# GitHub Actions自动部署
name: Deploy
on: [push]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '单元测试与自动化',
    children: (
      <>
        <Card title="测试用例与自动化" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// React Testing Library
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
    label: '项目部署与上线',
    children: (
      <>
        <Card title="静态资源与Nginx配置" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`# Nginx配置静态资源
server {
  listen 80;
  server_name example.com;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}`}</pre>
        </Card>
        <Card title="环境变量与多环境" size="small">
          <pre style={codeBlockStyle}>{`// .env.development
API_URL=https://api.example.com
// .env.production
API_URL=https://api.example.com`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '8',
    label: '实战案例',
    children: (
      <>
        <Card title="后台管理系统" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 典型功能：用户管理、权限分配、数据报表
// 侧边栏+顶部导航+内容区布局
<Layout>
  <Sidebar />
  <Header />
  <Content />
</Layout>`}</pre>
        </Card>
        <Card title="博客/TodoList项目" size="small">
          <pre style={codeBlockStyle}>{`// 博客：文章发布、评论、标签、搜索
// TodoList：增删查改、持久化存储
function TodoList() {
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
    key: '9',
    label: '练习与拓展',
    children: (
      <>
        <ol>
          <li>实现一个带权限控制的后台管理页面。</li>
          <li>用Mock.js模拟RESTful接口。</li>
          <li>实现一个可拖拽排序的TodoList。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://juejin.cn/post/6844904034181074958" target="_blank" rel="noopener noreferrer">前端项目实战案例</a></li>
          <li><a href="https://github.com/ant-design/ant-design-pro" target="_blank" rel="noopener noreferrer">Ant Design Pro</a></li>
        </ul>
      </>
    ),
  },
];

export default function FrontendProjectsPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>前端项目实战</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/vue-advanced"
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
          上一章：Vue进阶
        </a>
        {/* 无下一章 */}
        <span />
      </div>
    </div>
  );
}