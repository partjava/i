'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '并发与异步编程', chapterNumber: 18, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '高级特性与底层原理', href: '/study/computer/php/advanced-internals' },
  nextChapter: { label: 'Swoole与高性能开发', href: '/study/computer/php/swoole-highperf' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '多进程与多线程',
    left: (
      <div className="space-y-4">
        <PageTitle>多进程</PageTitle>
        <BookParagraph>进程创建与管理、进程间通信、进程池。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 基本进程创建
function create_process($callback) {
    $pid = pcntl_fork();
    if ($pid == -1) {
        die("无法创建子进程");
    } elseif ($pid) {
        // 父进程
        return $pid;
    } else {
        // 子进程
        $callback();
        exit(0);
    }
}

// 2. 进程池示例
class ProcessPool {
    private $size;
    private $processes = [];

    public function __construct($size) {
        $this->size = $size;
    }

    public function start($callback) {
        for ($i = 0; $i < $this->size; $i++) {
            $pid = pcntl_fork();
            if ($pid == -1) {
                die("无法创建子进程");
            } elseif ($pid) {
                $this->processes[$pid] = true;
            } else {
                $callback($i);
                exit(0);
            }
        }
    }

    public function wait() {
        while (count($this->processes) > 0) {
            $pid = pcntl_wait($status);
            if ($pid > 0) {
                unset($this->processes[$pid]);
            }
        }
    }
}

// 3. 共享内存通信
function shared_memory_example() {
    $key = ftok(__FILE__, "t");
    $shm_id = shmop_open($key, "c", 0644, 100);

    if (pcntl_fork() == 0) {
        shmop_write($shm_id, "Hello from child", 0);
        exit(0);
    } else {
        pcntl_wait($status);
        $data = shmop_read($shm_id, 0, 100);
        echo $data;
        shmop_delete($shm_id);
        shmop_close($shm_id);
    }
}

// 4. 信号处理
function signal_handler($signo) {
    switch ($signo) {
        case SIGTERM:
            echo "收到终止信号\\n";
            exit(0);
            break;
        case SIGCHLD:
            echo "子进程结束\\n";
            pcntl_waitpid(-1, $status);
            break;
    }
}
pcntl_signal(SIGTERM, "signal_handler");
pcntl_signal(SIGCHLD, "signal_handler");
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>多线程</SectionTitle>
        <BookParagraph>线程创建与管理、线程同步、线程安全。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 使用pthreads扩展
class WorkerThread extends Thread {
    private $id;

    public function __construct($id) {
        $this->id = $id;
    }

    public function run() {
        echo "线程 {$this->id} 开始执行\\n";
        sleep(1);
        echo "线程 {$this->id} 执行完成\\n";
    }
}

// 2. 线程池示例
class ThreadPool {
    private $size;
    private $threads = [];

    public function __construct($size) {
        $this->size = $size;
    }

    public function start() {
        for ($i = 0; $i < $this->size; $i++) {
            $thread = new WorkerThread($i);
            $thread->start();
            $this->threads[] = $thread;
        }
    }

    public function wait() {
        foreach ($this->threads as $thread) {
            $thread->join();
        }
    }
}

// 3. 线程同步（Mutex）
class Counter {
    private $value = 0;
    private $mutex;

    public function __construct() {
        $this->mutex = Mutex::create();
    }

    public function increment() {
        Mutex::lock($this->mutex);
        $this->value++;
        Mutex::unlock($this->mutex);
    }

    public function getValue() {
        return $this->value;
    }
}

// 4. 线程安全数据结构
class ThreadSafeArray extends Threaded {
    public function add($value) {
        $this->synchronized(function($value) {
            $this[] = $value;
        }, $value);
    }
}
?>`} />
      </div>
    ),
  },
  {
    label: '协程与异步IO',
    left: (
      <div className="space-y-4">
        <PageTitle>协程</PageTitle>
        <BookParagraph>协程基础、协程调度、协程通信。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 基本协程
go(function () {
    echo "协程1开始\\n";
    co::sleep(1);
    echo "协程1结束\\n";
});

go(function () {
    echo "协程2开始\\n";
    co::sleep(0.5);
    echo "协程2结束\\n";
});

// 2. 协程HTTP客户端
go(function () {
    $client = new Swoole\\Coroutine\\Http\\Client("www.example.com", 80);
    $client->get("/");
    echo $client->body;
});

// 3. 协程MySQL客户端
go(function () {
    $db = new Swoole\\Coroutine\\MySQL();
    $db->connect([
        "host" => "127.0.0.1",
        "port" => 3306,
        "user" => "root",
        "password" => "password",
        "database" => "test"
    ]);
    $result = $db->query("SELECT * FROM users");
    print_r($result);
});

// 4. 协程通道
go(function () {
    $channel = new Swoole\\Coroutine\\Channel();
    go(function () use ($channel) {
        $channel->push("Hello");
    });
    go(function () use ($channel) {
        echo $channel->pop();
    });
});

// 5. 协程定时器
go(function () {
    $timer = Swoole\\Timer::tick(1000, function () {
        echo "定时器触发\\n";
    });
    Swoole\\Timer::after(5000, function () use ($timer) {
        Swoole\\Timer::clear($timer);
    });
});
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>异步IO</SectionTitle>
        <BookParagraph>异步文件操作、异步网络操作、异步数据库操作。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 异步文件操作
Swoole\\Async::readFile(__FILE__, function ($filename, $content) {
    echo "文件内容长度: " . strlen($content) . "\\n";
});

// 2. 异步HTTP服务器
$http = new Swoole\\Http\\Server("0.0.0.0", 9501);
$http->on("request", function ($request, $response) {
    $response->header("Content-Type", "text/plain");
    $response->end("Hello World\\n");
});
$http->start();

// 3. 异步WebSocket服务器
$ws = new Swoole\\WebSocket\\Server("0.0.0.0", 9502);
$ws->on("open", function ($ws, $request) {
    echo "新连接: {$request->fd}\\n";
});
$ws->on("message", function ($ws, $frame) {
    echo "收到消息: {$frame->data}\\n";
    $ws->push($frame->fd, "服务器收到: {$frame->data}");
});
$ws->start();

// 4. 异步MySQL客户端
$db = new Swoole\\MySQL();
$db->connect([
    "host" => "127.0.0.1",
    "port" => 3306,
    "user" => "root",
    "password" => "password",
    "database" => "test"
], function ($db, $result) {
    if ($result === false) {
        echo "连接失败\\n";
        return;
    }
    $db->query("SELECT * FROM users", function ($db, $result) {
        print_r($result);
    });
});

// 5. 异步Redis客户端
$redis = new Swoole\\Redis();
$redis->connect("127.0.0.1", 6379, function ($redis, $result) {
    $redis->set("key", "value", function ($redis, $result) {
        $redis->get("key", function ($redis, $result) {
            echo $result;
        });
    });
});
?>`} />
      </div>
    ),
  },
  {
    label: '事件循环',
    left: (
      <div className="space-y-4">
        <PageTitle>事件循环</PageTitle>
        <BookParagraph>事件循环基础、定时器、信号处理。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 基本事件循环
$loop = React\\EventLoop\\Factory::create();

// 添加定时器
$loop->addTimer(1, function () {
    echo "1秒后执行\\n";
});

// 添加周期性定时器
$loop->addPeriodicTimer(1, function () {
    echo "每秒执行一次\\n";
});

// 运行事件循环
$loop->run();

// 2. 信号处理
$loop->addSignal(SIGINT, function () {
    echo "收到中断信号\\n";
    $loop->stop();
});

// 3. 流处理
$stream = new React\\Stream\\ReadableResourceStream(
    fopen("php://stdin", "r"), $loop
);
$stream->on("data", function ($data) {
    echo "收到数据: " . $data;
});

// 4. Promise处理
$promise = new React\\Promise\\Promise(function ($resolve, $reject) use ($loop) {
    $loop->addTimer(1, function () use ($resolve) {
        $resolve("操作完成");
    });
});
$promise->then(function ($value) {
    echo $value . "\\n";
});

// 5. 并发请求
$browser = new React\\Http\\Browser($loop);
$promises = [
    $browser->get("http://www.example.com/1"),
    $browser->get("http://www.example.com/2"),
    $browser->get("http://www.example.com/3")
];
React\\Promise\\all($promises)->then(function ($responses) {
    foreach ($responses as $response) {
        echo $response->getBody() . "\\n";
    }
});
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 如何选择并发模型？</b><br />A: 根据应用场景选择，CPU密集型使用多进程，IO密集型使用协程或异步IO。</BookParagraph>
        <BookParagraph><b>Q: 如何处理并发安全问题？</b><br />A: 使用锁机制、原子操作、线程安全的数据结构。</BookParagraph>
        <BookParagraph><b>Q: 如何调试并发程序？</b><br />A: 使用日志、断点调试、性能分析工具。</BookParagraph>
      </div>
    ),
  },
  {
    label: '练习与标签',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={[
          '实现一个简单的Web服务器',
          '开发一个并发爬虫程序',
          '实现一个实时聊天系统',
          '开发一个高性能的API服务',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>相关标签</SectionTitle>
        <TagGrid items={[
          '多进程', 'pcntl_fork', '进程池', '共享内存', '信号处理',
          '多线程', 'pthreads', 'Mutex', 'Thread', '线程安全',
          '协程', 'Swoole', 'go', 'Channel', 'Timer',
          '异步IO', 'HTTP服务器', 'WebSocket', 'MySQL', 'Redis',
          '事件循环', 'ReactPHP', 'Promise', '定时器', '流处理',
        ]} />
      </div>
    ),
  },
]

export default function PhpConcurrencyAsyncPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
