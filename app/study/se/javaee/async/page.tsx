'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'thread', label: '线程与线程池' },
  { key: 'async_servlet', label: '异步Servlet' },
  { key: 'mdb', label: '消息驱动Bean' },
  { key: 'concurrent', label: '并发工具类' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEAsyncPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">异步处理与并发</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">异步处理与并发概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE并发与异步能力简介</h3>
              <p className="text-gray-700 leading-relaxed">
                JavaEE支持多种并发与异步处理方式，包括多线程、线程池、异步Servlet、消息驱动Bean（MDB）、并发工具类等，提升系统吞吐量和响应速度。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">常用技术</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Java线程与线程池</li>
                  <li>• 异步Servlet</li>
                  <li>• 消息驱动Bean（MDB）</li>
                  <li>• 并发工具类（Future、CountDownLatch等）</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">应用场景</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 高并发请求处理</li>
                  <li>• 异步任务调度</li>
                  <li>• 消息异步消费</li>
                  <li>• 并发数据处理</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thread' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">线程与线程池</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">线程与线程池基础</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 创建线程
Thread t = new Thread(() -> System.out.println("Hello Thread"));
t.start();

// 使用线程池
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("线程池任务"));
pool.shutdown();`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'async_servlet' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">异步Servlet</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Servlet 3.0异步处理</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet(value = "/async", asyncSupported = true)
public class AsyncServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        AsyncContext ctx = req.startAsync();
        ctx.start(() -> {
            try {
                Thread.sleep(1000);
                ctx.getResponse().getWriter().write("异步响应");
                ctx.complete();
            } catch (Exception e) {}
        });
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'mdb' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">消息驱动Bean（MDB）</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">MDB实现异步消息消费</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue")
})
public class MyQueueListener implements MessageListener {
    public void onMessage(Message message) {
        // 处理消息
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'concurrent' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">并发工具类</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Future与CountDownLatch</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// Future异步结果
ExecutorService pool = Executors.newSingleThreadExecutor();
Future<String> future = pool.submit(() -> "结果");
String result = future.get();

// CountDownLatch并发同步
CountDownLatch latch = new CountDownLatch(2);
new Thread(() -> { /* ... */ latch.countDown(); }).start();
new Thread(() -> { /* ... */ latch.countDown(); }).start();
latch.await();`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：异步批量处理</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@WebServlet(value = "/batch", asyncSupported = true)
public class BatchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        AsyncContext ctx = req.startAsync();
        ctx.start(() -> {
            // 批量任务处理
            ctx.complete();
        });
    }
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">多线程并发计数</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`AtomicInteger counter = new AtomicInteger(0);
ExecutorService pool = Executors.newFixedThreadPool(10);
for (int i = 0; i < 100; i++) {
    pool.submit(() -> counter.incrementAndGet());
}
pool.shutdown();
pool.awaitTermination(1, TimeUnit.MINUTES);
System.out.println("总数：" + counter.get());`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/frameworks" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← JavaEE框架
        </a>
        <a
          href="/study/se/javaee/microservice"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          微服务架构 →
        </a>
      </div>
    </div>
  );
}