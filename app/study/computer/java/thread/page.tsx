'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '多线程与并发', chapterNumber: 8, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '文件与IO', href: '/study/computer/java/file-io' },
  nextChapter: { label: '网络编程', href: '/study/computer/java/network' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '线程基础',
    left: (
      <div className="space-y-4">
        <PageTitle>创建线程</PageTitle>
        <BookParagraph>Java 多线程编程是提升程序并发性能的关键。通过多线程，程序可以同时执行多个任务，充分利用 CPU 资源。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`// 继承 Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("线程运行中");
    }
}
new MyThread().start();

// 实现 Runnable
Runnable task = () -> {
    for (int i = 0; i < 5; i++)
        System.out.println(i);
};
new Thread(task).start();

// Callable（带返回值）
Callable<Integer> call = () -> {
    return 42;
};
FutureTask<Integer> ft = new FutureTask<>(call);
new Thread(ft).start();
System.out.println(ft.get());  // 42`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>线程同步</PageTitle>
        <BookCode language="java" showLineNumbers code={`class Counter {
    private int count = 0;

    // synchronized 方法
    public synchronized void increment() {
        count++;
    }

    // synchronized 块
    public void decrement() {
        synchronized (this) {
            count--;
        }
    }
}

// ReentrantLock
Lock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区
} finally {
    lock.unlock();
}

// volatile（保证可见性）
private volatile boolean running = true;`} />
        <BookAlert type="warning" message="多线程访问共享数据时必须同步，否则会出现数据竞争。优先使用 java.util.concurrent 包的高级工具" />
      </div>
    ),
  },
  {
    label: '线程池',
    left: (
      <div className="space-y-4">
        <PageTitle>线程池与并发工具</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 线程池
ExecutorService executor = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
    executor.execute(() -> {
        System.out.println(Thread.currentThread().getName());
    });
}
executor.shutdown();

// CompletableFuture
CompletableFuture.supplyAsync(() -> {
    return "Hello";
}).thenApply(s -> s + " World")
  .thenAccept(System.out::println);

// 并行流
int sum = IntStream.range(1, 100)
    .parallel()
    .sum();`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>并发容器</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 并发集合
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

// 阻塞队列
BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);
// 生产者
queue.put("item");
// 消费者
String item = queue.take();

// 原子类
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();
System.out.println(counter.get());

// CountDownLatch
CountDownLatch latch = new CountDownLatch(3);
// 每个线程完成时 latch.countDown()
latch.await();  // 等待三个线程完成`} />
        <TagGrid items={['Thread', 'Runnable', 'synchronized', '线程池', '并发容器', 'Lock']} />
      </div>
    ),
  },
]

export default function ThreadPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
