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
    label: '性能优化目标与指标',
    children: (
      <>
        <Card title="常见性能指标" size="small" style={{ marginBottom: 12 }}>
          <ul>
            <li>FCP（首次内容绘制）：页面首次有内容渲染</li>
            <li>LCP（最大内容绘制）：主内容区域最大元素渲染</li>
            <li>TTI（可交互时间）：页面可响应用户操作</li>
            <li>CLS（累积布局偏移）：页面元素跳动情况</li>
          </ul>
        </Card>
        <pre style={codeBlockStyle}>{`// 使用Performance API获取FCP
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
}).observe({ type: 'paint', buffered: true });`}</pre>
      </>
    ),
  },
  {
    key: '2',
    label: '资源加载优化',
    children: (
      <>
        <Card title="懒加载与预加载" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 图片懒加载（原生支持）
<img src="a.jpg" loading="lazy" />
// IntersectionObserver实现图片懒加载
const img = document.querySelector('img');
const io = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    img.src = img.dataset.src;
    io.disconnect();
  }
});
io.observe(img);
// 预加载资源
<link rel="preload" href="main.js" as="script" />`}</pre>
        </Card>
        <Card title="压缩与CDN" size="small">
          <pre style={codeBlockStyle}>{`// Gzip压缩
// nginx.conf
gzip on;
gzip_types text/css application/javascript;
// CDN加速，自动选择最近节点
<img src="https://cdn.example.com/img.png" />`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '3',
    label: '代码优化',
    children: (
      <>
        <ul>
          <li>Tree Shaking移除未用代码</li>
          <li>按需加载（动态import）</li>
          <li>去冗余、合并小文件</li>
        </ul>
        <pre style={codeBlockStyle}>{`// Tree Shaking示例（只打包用到的函数）
// math.js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
// main.js
import { add } from './math'; // 只会打包add
// 按需加载
import('lodash').then(_ => _.chunk([1,2,3], 2));`}</pre>
      </>
    ),
  },
  {
    key: '4',
    label: '渲染与交互优化',
    children: (
      <>
        <Card title="虚拟列表" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 只渲染可视区域数据，提升大列表性能
function renderList(data, start, end) {
  return data.slice(start, end).map(item => <li>{item}</li>);
}
// react-window等库可实现高性能虚拟滚动`}</pre>
        </Card>
        <Card title="节流与防抖" size="small">
          <pre style={codeBlockStyle}>{`// 节流：高频事件只在间隔内执行一次
function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn(...args);
    }
  };
}
window.addEventListener('scroll', throttle(() => {
  // 滚动时执行
}, 200));
// 防抖：高频事件只在停止后执行一次
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
document.getElementById('search').oninput = debounce(e => {
  // 输入停止后发请求
}, 300);`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '5',
    label: '网络与缓存优化',
    children: (
      <>
        <Card title="HTTP缓存" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 设置强缓存
Cache-Control: max-age=31536000
// 协商缓存
ETag: "abc123"
If-None-Match: "abc123"
// 清除缓存
fetch('/api/data', { cache: 'reload' });`}</pre>
        </Card>
        <Card title="Service Worker与PWA" size="small">
          <pre style={codeBlockStyle}>{`// 注册Service Worker，实现离线缓存
if ('serviceWorker' in navigator) {
  // Service Worker注册示例代码（生产环境会自动注册）
  // navigator.serviceWorker.register('/sw.js').then(reg => {
  //   console.log('SW注册成功', reg);
  });
}
// sw.js示例
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '6',
    label: '性能监控与分析',
    children: (
      <>
        <Card title="Lighthouse分析" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// Chrome DevTools -> Lighthouse
// 可分析性能、可访问性、SEO等
// 推荐定期用Lighthouse跑分，定位瓶颈`}</pre>
        </Card>
        <Card title="Performance API" size="small">
          <pre style={codeBlockStyle}>{`// 记录关键性能点
performance.mark('start');
// ...业务代码
performance.mark('end');
performance.measure('业务耗时', 'start', 'end');
// 获取所有性能指标
console.log(performance.getEntriesByType('measure'));`}</pre>
        </Card>
      </>
    ),
  },
  {
    key: '7',
    label: '实战案例',
    children: (
      <>
        <Card title="首页秒开优化" size="small" style={{ marginBottom: 12 }}>
          <pre style={codeBlockStyle}>{`// 关键资源优先加载，非关键异步加载
<link rel="preload" href="main.css" as="style" />
<script src="main.js" async></script>`}</pre>
        </Card>
        <Card title="图片优化" size="small">
          <pre style={codeBlockStyle}>{`// 响应式图片
<img srcset="a-320.jpg 320w, a-640.jpg 640w" sizes="(max-width: 600px) 320px, 640px" src="a-640.jpg" />`}</pre>
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
          <li>用节流/防抖优化滚动监听。</li>
          <li>用Service Worker实现离线缓存。</li>
          <li>用Lighthouse分析并优化页面性能。</li>
        </ol>
        <Divider />
        <ul>
          <li><a href="https://web.dev/performance/" target="_blank" rel="noopener noreferrer">Web.dev 性能优化</a></li>
          <li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Performance" target="_blank" rel="noopener noreferrer">MDN 性能文档</a></li>
        </ul>
      </>
    ),
  },
];

export default function PerformancePage() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <Typography>
        <Title level={1}>性能优化</Title>
      </Typography>
      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginTop: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href="/study/frontend/build-tools"
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
          上一章：包管理与构建工具
        </a>
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
          下一章：React基础
        </a>
      </div>
    </div>
  );
} 