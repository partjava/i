'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '异步处理与并发',
  chapterNumber: 9,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'JavaEE框架', href: '/study/se/javaee/frameworks' },
  nextChapter: { label: '微服务架构', href: '/study/se/javaee/microservice' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>异步处理与并发概述</PageTitle>
        <BookParagraph>JavaEE支持多种并发与异步处理方式，包括多线程、线程池、异步Servlet、消息驱动Bean（MDB）、并发工具类等，提升系统吞吐量和响应速度。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">常用技术</h3>
        <BookList items={[
          'Java线程与线程池',
          '异步Servlet',
          '消息驱动Bean（MDB）',
          '并发工具类（Future、CountDownLatch等）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">应用场景</h3>
        <BookList items={[
          '高并发请求处理',
          '异步任务调度',
          '消息异步消费',
          '并发数据处理',
        ]} />
        <BookAlert type="info" message="JavaEE容器管理线程时需要注意：不要直接创建Thread，应使用容器提供的ManagedExecutorService或@Asynchronous。" />
        <TagGrid items={['异步', '并发', '线程池', '吞吐量', '响应速度']} />
      </div>
    ),
  },
  {
    label: '线程与线程池',
    left: (
      <div className="space-y-4">
        <PageTitle>线程与线程池</PageTitle>
        <BookParagraph>Java的线程和线程池是并发编程的基础。线程池通过重用线程减少了创建和销毁的开销，并提供了任务队列、线程管理等机制。</BookParagraph>
        <BookCode language="java" code={`// 创建线程
Thread t = new Thread(() -> System.out.println("Hello Thread"));
t.start();

// 使用线程池
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("线程池任务"));
pool.shutdown();`} />
        <BookAlert type="info" message="在JavaEE环境中，推荐使用 ManagedExecutorService（JSR 236）来管理线程池，让容器负责线程的生命周期管理。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">线程池参数配置</h3>
        <BookList items={[
          'corePoolSize：核心线程数',
          'maximumPoolSize：最大线程数',
          'keepAliveTime：空闲线程存活时间',
          'workQueue：任务队列',
          'threadFactory：线程工厂',
          'RejectedExecutionHandler：拒绝策略',
        ]} />
        <BookCode language="java" code={`// 自定义线程池
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    4,                      // corePoolSize
    10,                     // maximumPoolSize
    60L, TimeUnit.SECONDS,  // keepAliveTime
    new LinkedBlockingQueue<>(100),
    new ThreadPoolExecutor.CallerRunsPolicy()
);`} />
        <TagGrid items={['Thread', 'ExecutorService', '线程池', 'ManagedExecutorService', '并发编程']} />
      </div>
    ),
  },
  {
    label: '异步Servlet',
    left: (
      <div className="space-y-4">
        <PageTitle>异步Servlet</PageTitle>
        <BookParagraph>Servlet 3.0 引入了异步处理支持，允许Servlet将请求处理移交到其他线程，而容器线程可以立即返回以处理更多请求。</BookParagraph>
        <BookCode language="java" code={`@WebServlet(value = "/async", asyncSupported = true)
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>异步Servlet的核心要点：</BookParagraph>
        <BookList items={[
          '@WebServlet 注解需要设置 asyncSupported = true',
          '通过 request.startAsync() 获取 AsyncContext',
          'AsyncContext.start() 在新线程中执行业务逻辑',
          '处理完成后调用 asyncContext.complete() 返回响应',
          '支持超时设置和异步监听器',
        ]} />
        <BookAlert type="success" message="异步Servlet适用于长时间轮询、Server-Sent Events (SSE)、WebSocket握手等场景，可有效减少容器线程的占用。" />
        <TagGrid items={['@WebServlet', 'AsyncContext', 'asyncSupported', '异步', 'Servlet 3.0']} />
      </div>
    ),
  },
  {
    label: 'MDB与并发工具',
    left: (
      <div className="space-y-4">
        <PageTitle>消息驱动Bean（MDB）</PageTitle>
        <BookParagraph>消息驱动Bean（Message-Driven Bean）是EJB中用于异步消费消息的组件，可以监听JMS队列或主题。</BookParagraph>
        <BookCode language="java" code={`@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType",
        propertyValue = "javax.jms.Queue")
})
public class MyQueueListener implements MessageListener {
    public void onMessage(Message message) {
        // JMS消息到达时自动调用
        // 处理消息
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>并发工具类</PageTitle>
        <BookParagraph>java.util.concurrent包提供了丰富的并发工具类，简化了并发编程。</BookParagraph>
        <BookCode language="java" code={`// Future异步结果
ExecutorService pool = Executors.newSingleThreadExecutor();
Future<String> future = pool.submit(() -> "结果");
String result = future.get();

// CountDownLatch并发同步
CountDownLatch latch = new CountDownLatch(2);
new Thread(() -> { /* ... */ latch.countDown(); }).start();
new Thread(() -> { /* ... */ latch.countDown(); }).start();
latch.await();

// AtomicInteger原子操作
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();`} />
        <TagGrid items={['MDB', 'JMS', 'Future', 'CountDownLatch', 'Atomic']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合案例：异步批量处理</PageTitle>
        <BookParagraph>使用异步Servlet配合线程池处理批量任务，提高系统吞吐量。</BookParagraph>
        <BookCode language="java" code={`@WebServlet(value = "/batch", asyncSupported = true)
public class BatchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        AsyncContext ctx = req.startAsync();
        ctx.start(() -> {
            // 批量任务处理
            ctx.complete();
        });
    }
}`} />
        <h3 className="text-sm font-medium text-ink mt-4">多线程并发计数</h3>
        <BookCode language="java" code={`AtomicInteger counter = new AtomicInteger(0);
ExecutorService pool = Executors.newFixedThreadPool(10);
for (int i = 0; i < 100; i++) {
    pool.submit(() -> counter.incrementAndGet());
}
pool.shutdown();
pool.awaitTermination(1, TimeUnit.MINUTES);
System.out.println("总数：" + counter.get());`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">最佳实践</h3>
        <BookList items={[
          '在JavaEE环境中使用容器管理的线程池（ManagedExecutorService）',
          '避免在线程中访问非线程安全的资源',
          '注意线程上下文类加载器（ContextClassLoader）的传递',
          '使用CompletableFuture实现更灵活的异步编排',
          '考虑使用响应式编程（Spring WebFlux）处理高并发场景',
        ]} />
        <BookAlert type="info" message="在Spring Boot中，可以使用 @Async 注解配合 @EnableAsync 实现方法级别的异步执行，底层使用 TaskExecutor 管理线程池。" />
        <TagGrid items={['CompletableFuture', '@Async', '响应式', 'WebFlux', '最佳实践']} />
      </div>
    ),
  },
]

export default function JavaEEAsyncPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
