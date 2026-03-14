const CACHE_VERSION = 'v4.0.0';
const CACHE_NAME = `partjava-${CACHE_VERSION}`;

// 只缓存真正的静态资源
const STATIC_CACHE = [
  '/offline',
  '/manifest.json',
  '/styles/highlight-github.css'
];

// 安装
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        STATIC_CACHE.map(url =>
          cache.add(url).catch(() => {}) // 单个失败不影响整体
        )
      );
    })
  );
  self.skipWaiting();
});

// 激活，清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 请求拦截
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // API 请求：网络优先，失败不降级缓存
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Next.js 动态页面：网络优先
  if (url.pathname.startsWith('/_next/data/')) {
    return;
  }

  // Next.js 静态资源（JS/CSS chunks）：缓存优先，缓存没有再走网络并缓存
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 图片：缓存优先
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // 页面导航：网络优先，离线时返回缓存或 /offline
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then(cached => cached || caches.match('/offline'))
      )
    );
    return;
  }
});

// 消息处理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
