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
  chapterTitle: '性能优化',
  chapterNumber: 15,
  totalChapters: 20,
  subjectHref: '/study/computer/frontend',
  prevChapter: { label: '包管理与构建工具', href: '/study/computer/frontend/build-tools' },
  nextChapter: { label: 'React基础', href: '/study/computer/frontend/react' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '目标与加载优化',
    left: (
      <div className="space-y-4">
        <PageTitle>性能优化目标与指标</PageTitle>
        <BookList items={[
          'FCP（首次内容绘制）：页面首次有内容渲染。',
          'LCP（最大内容绘制）：主内容区域最大元素渲染。',
          'TTI（可交互时间）：页面可响应用户操作。',
          'CLS（累积布局偏移）：页面元素跳动情况。',
        ]} />
        <BookCode language="javascript" code={`// 使用Performance API获取FCP
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
}).observe({ type: 'paint', buffered: true });`} />
        <SectionTitle>资源加载优化</SectionTitle>
        <BookParagraph><b>懒加载与预加载：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 图片懒加载（原生支持） -->
<img src="a.jpg" loading="lazy" />
<!-- IntersectionObserver实现图片懒加载 -->
<script>
const img = document.querySelector('img');
const io = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    img.src = img.dataset.src;
    io.disconnect();
  }
});
io.observe(img);
</script>
<!-- 预加载资源 -->
<link rel="preload" href="main.js" as="script" />`} />
        <BookParagraph><b>压缩与CDN：</b></BookParagraph>
        <BookCode language="nginx" code={`// Gzip压缩
// nginx.conf
gzip on;
gzip_types text/css application/javascript;`} />
        <BookCode language="html" code={`// CDN加速，自动选择最近节点
<img src="https://cdn.example.com/img.png" />`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>代码优化</SectionTitle>
        <BookList items={[
          'Tree Shaking移除未用代码。',
          '按需加载（动态import）。',
          '去冗余、合并小文件。',
        ]} />
        <BookCode language="javascript" code={`// Tree Shaking示例（只打包用到的函数）
// math.js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
// main.js
import { add } from './math'; // 只会打包add
// 按需加载
import('lodash').then(_ => _.chunk([1,2,3], 2));`} />
        <SectionTitle>渲染与交互优化</SectionTitle>
        <BookParagraph><b>虚拟列表：</b></BookParagraph>
        <BookCode language="javascript" code={`// 只渲染可视区域数据，提升大列表性能
function renderList(data, start, end) {
  return data.slice(start, end).map(item => <li>{item}</li>);
}
// react-window等库可实现高性能虚拟滚动`} />
        <BookParagraph><b>节流与防抖：</b></BookParagraph>
        <BookCode language="javascript" code={`// 节流：高频事件只在间隔内执行一次
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
}, 300);`} />
        <TagGrid items={['FCP', 'LCP', '懒加载', 'CDN', '节流', '防抖']} />
      </div>
    ),
  },
  {
    label: '缓存与监控',
    left: (
      <div className="space-y-4">
        <PageTitle>网络与缓存优化</PageTitle>
        <BookParagraph><b>HTTP缓存：</b></BookParagraph>
        <BookCode language="text" code={`// 设置强缓存
Cache-Control: max-age=31536000
// 协商缓存
ETag: "abc123"
If-None-Match: "abc123"
// 清除缓存
fetch('/api/data', { cache: 'reload' });`} />
        <BookParagraph><b>Service Worker与PWA：</b></BookParagraph>
        <BookCode language="javascript" code={`// 注册Service Worker，实现离线缓存
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW注册成功', reg);
  });
}
// sw.js示例
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>性能监控与分析</SectionTitle>
        <BookParagraph><b>Lighthouse分析：</b></BookParagraph>
        <BookCode language="text" code={`// Chrome DevTools -> Lighthouse
// 可分析性能、可访问性、SEO等
// 推荐定期用Lighthouse跑分，定位瓶颈`} />
        <BookParagraph><b>Performance API：</b></BookParagraph>
        <BookCode language="javascript" code={`// 记录关键性能点
performance.mark('start');
// ...业务代码
performance.mark('end');
performance.measure('业务耗时', 'start', 'end');
// 获取所有性能指标
console.log(performance.getEntriesByType('measure'));`} />
        <SectionTitle>实战案例</SectionTitle>
        <BookParagraph><b>首页秒开优化：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 关键资源优先加载，非关键异步加载 -->
<link rel="preload" href="main.css" as="style" />
<script src="main.js" async></script>`} />
        <BookParagraph><b>图片优化：</b></BookParagraph>
        <BookCode language="html" code={`<!-- 响应式图片 -->
<img srcset="a-320.jpg 320w, a-640.jpg 640w"
     sizes="(max-width: 600px) 320px, 640px"
     src="a-640.jpg" />`} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={[
          '用节流/防抖优化滚动监听。',
          '用Service Worker实现离线缓存。',
          '用Lighthouse分析并优化页面性能。',
        ]} />
        <SectionTitle>拓展资源</SectionTitle>
        <BookList items={[
          'Web.dev 性能优化：web.dev/performance',
          'MDN 性能文档：developer.mozilla.org/zh-CN/docs/Web/Performance',
        ]} />
        <TagGrid items={['缓存', 'Service Worker', 'Lighthouse', 'Performance', 'Web Vitals']} />
      </div>
    ),
  },
]

export default function FrontendPerformancePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
