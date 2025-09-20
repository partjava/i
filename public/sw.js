// Service Worker版本
const CACHE_NAME = 'partjava-v2';
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json'
  // 移除可能不存在的资源，避免缓存失败
];

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        // 逐个缓存资源，避免一个失败导致整个过程失败
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.error(`缓存资源失败: ${url}`, error);
              // 继续处理其他资源
              return Promise.resolve();
            });
          })
        );
      })
      .catch(error => {
        console.error('Service Worker安装失败:', error);
      })
  );
  // 立即激活
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  // 只处理GET请求，忽略其他类型的请求
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有，直接返回缓存
        if (response) {
          return response;
        }
        
        // 克隆请求
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // 检查是否为有效响应
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // 克隆响应
          const responseToCache = response.clone();
          
          // 缓存响应 - 只缓存GET请求
          if (fetchRequest.method === 'GET') {
            caches.open(CACHE_NAME)
              .then((cache) => {
                try {
                  cache.put(event.request, responseToCache);
                } catch (error) {
                  console.error('缓存请求失败:', error);
                }
              });
          }
          
          return response;
        }).catch(() => {
          // 网络失败时返回离线页面
          if (event.request.destination === 'document') {
            return caches.match('/offline');
          }
        });
      })
  );
});

// 后台同步 - 离线时的数据同步
self.addEventListener('sync', (event) => {
  console.log('后台同步事件:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 这里可以添加离线时的数据同步逻辑
      console.log('执行后台同步')
    );
  }
});

// 推送通知
self.addEventListener('push', (event) => {
  let data = {};
  
  if (event.data) {
    data = event.data.json();
  }
  
  const options = {
    body: data.body || '你有新的学习提醒！',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || '1'
    },
    actions: [
      {
        action: 'explore',
        title: '查看详情',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: '关闭',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || '学习提醒', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
  console.log('通知点击:', event.notification.tag);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    // 打开应用
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // 关闭通知
    event.notification.close();
  } else {
    // 默认行为 - 打开应用
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 消息处理
self.addEventListener('message', (event) => {
  console.log('收到消息:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 