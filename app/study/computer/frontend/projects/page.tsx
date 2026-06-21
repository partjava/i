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
  chapterTitle: '前端项目实战',
  chapterNumber: 20,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: 'Vue进阶', href: '/study/computer/frontend/vue-advanced' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '项目结构与开发流程',
    left: (
      <div className="space-y-4">
        <PageTitle>项目结构与开发流程</PageTitle>
        <SectionTitle>目录结构与环境配置</SectionTitle>
        <BookCode language="bash" code={`my-project/
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
├─ README.md`} />
        <SectionTitle>开发规范建议</SectionTitle>
        <BookList items={[
          '统一代码风格（Prettier、ESLint）',
          '模块化、组件化开发',
          '环境变量分离（.env.development/.env.production）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见业务模块</SectionTitle>
        <BookParagraph><b>登录注册与表单校验：</b></BookParagraph>
        <BookCode language="javascript" code={`// 登录表单示例（React）
function Login() {
  const [user, setUser] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (!user || !pwd) return alert('请填写完整');
    // 调用API
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={user} onChange={e => setUser(e.target.value)} placeholder="用户名" />
      <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="密码" />
      <button type="submit">登录</button>
    </form>
  );
}`} />
        <BookParagraph><b>列表与分页、文件上传：</b></BookParagraph>
        <BookCode language="javascript" code={`// 列表分页（伪代码）
const [list, setList] = useState([]);
const [page, setPage] = useState(1);
useEffect(() => {
  fetch('/api/list?page=' + page).then(r => r.json()).then(setList);
}, [page]);
// 文件上传
function upload(file) { /* ... */ }
<input type="file" onChange={e => upload(e.target.files[0])} />`} />
        <TagGrid items={['目录结构', 'ESLint', 'Prettier', '模块化', '环境变量']} />
      </div>
    ),
  },
  {
    label: '状态管理与接口',
    left: (
      <div className="space-y-4">
        <PageTitle>状态管理与接口对接</PageTitle>
        <SectionTitle>全局状态管理</SectionTitle>
        <BookCode language="javascript" code={`// Zustand全局状态
import { create } from 'zustand';
const useStore = create(set => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));
function Counter() {
  const { count, inc } = useStore();
  return <button onClick={inc}>{count}</button>;
}`} />
        <SectionTitle>API请求与Mock数据</SectionTitle>
        <BookCode language="javascript" code={`// axios请求
import axios from 'axios';
axios.get('/api/user').then(res => console.log(res.data));
// Mock.js本地模拟
import Mock from 'mockjs';
Mock.mock('/api/user', { name: '@cname', age: 20 });`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>路由与权限控制</SectionTitle>
        <BookCode language="javascript" code={`// React Router动态路由
<Route path="/admin" element={isAdmin ? <Admin /> : <NoAuth />} />
// Vue Router权限守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isLogin()) next('/login');
  else next();
});`} />
        <TagGrid items={['Zustand', 'Redux', 'axios', 'Mock.js', '路由守卫']} />
      </div>
    ),
  },
  {
    label: '优化与测试',
    left: (
      <div className="space-y-4">
        <PageTitle>性能优化与工程化实践</PageTitle>
        <SectionTitle>按需加载与打包优化</SectionTitle>
        <BookCode language="javascript" code={`// React懒加载
const Comp = React.lazy(() => import('./Comp'));
<Suspense fallback={<div>加载中...</div>}><Comp /></Suspense>
// Webpack分包
output: { filename: '[name].[contenthash].js' }`} />
        <SectionTitle>CI/CD自动化</SectionTitle>
        <BookCode language="yaml" code={`# GitHub Actions自动部署
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
        run: npm run deploy`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>单元测试与自动化</SectionTitle>
        <BookCode language="javascript" code={`// React Testing Library
import { render, screen } from '@testing-library/react';
test('渲染', () => {
  render(<button>hi</button>);
  expect(screen.getByText('hi')).toBeInTheDocument();
});`} />
        <SectionTitle>项目部署与上线</SectionTitle>
        <BookParagraph><b>静态资源与Nginx配置：</b></BookParagraph>
        <BookCode language="nginx" code={`# Nginx配置静态资源
server {
  listen 80;
  server_name example.com;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}`} />
        <BookParagraph><b>环境变量与多环境：</b></BookParagraph>
        <BookCode language="bash" code={`// .env.development
API_URL=https://api.example.com
// .env.production
API_URL=https://api.example.com`} />
        <TagGrid items={['懒加载', 'Webpack', 'CI/CD', 'Nginx', '测试']} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <SectionTitle>后台管理系统</SectionTitle>
        <BookParagraph>典型功能：用户管理、权限分配、数据报表</BookParagraph>
        <BookCode language="jsx" code={`// 侧边栏+顶部导航+内容区布局
<Layout>
  <Sidebar />
  <Header />
  <Content />
</Layout>`} />
        <SectionTitle>博客/TodoList项目</SectionTitle>
        <BookParagraph>博客：文章发布、评论、标签、搜索</BookParagraph>
        <BookCode language="javascript" code={`// TodoList：增删查改、持久化存储
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习与拓展</SectionTitle>
        <BookList items={[
          '实现一个带权限控制的后台管理页面',
          '用Mock.js模拟RESTful接口',
          '实现一个可拖拽排序的TodoList',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          '前端项目实战案例：juejin.cn/post/6844904034181074958',
          'Ant Design Pro：github.com/ant-design/ant-design-pro',
        ]} />
        <TagGrid items={['后台管理', 'TodoList', 'Mock.js', '拖拽', 'Ant Design']} />
      </div>
    ),
  },
]

export default function FrontendProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
