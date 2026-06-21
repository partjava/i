'use client';

import { useState } from 'react';

const tabs = [
  { key: 'process', label: '多进程' },
  { key: 'thread', label: '多线程' },
  { key: 'coroutine', label: '协程' },
  { key: 'async-io', label: '异步IO' },
  { key: 'event-loop', label: '事件循环' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpConcurrencyAsyncPage() {
  const [activeTab, setActiveTab] = useState('process');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">并发与异步编程</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'process' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">多进程</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>进程创建与管理。</li>
              <li>进程间通信。</li>
              <li>进程池。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 多进程示例',
  '',
  '// 1. 基本进程创建',
  'function create_process($callback) {',
  '    $pid = pcntl_fork();',
  '    if ($pid == -1) {',
  '        die("无法创建子进程");',
  '    } elseif ($pid) {',
  '        // 父进程',
  '        return $pid;',
  '    } else {',
  '        // 子进程',
  '        $callback();',
  '        exit(0);',
  '    }',
  '}',
  '',
  '// 2. 进程池示例',
  'class ProcessPool {',
  '    private $size;',
  '    private $processes = [];',
  '',
  '    public function __construct($size) {',
  '        $this->size = $size;',
  '    }',
  '',
  '    public function start($callback) {',
  '        for ($i = 0; $i < $this->size; $i++) {',
  '            $pid = pcntl_fork();',
  '            if ($pid == -1) {',
  '                die("无法创建子进程");',
  '            } elseif ($pid) {',
  '                $this->processes[$pid] = true;',
  '            } else {',
  '                $callback($i);',
  '                exit(0);',
  '            }',
  '        }',
  '    }',
  '',
  '    public function wait() {',
  '        while (count($this->processes) > 0) {',
  '            $pid = pcntl_wait($status);',
  '            if ($pid > 0) {',
  '                unset($this->processes[$pid]);',
  '            }',
  '        }',
  '    }',
  '}',
  '',
  '// 3. 进程间通信',
  '// 使用共享内存',
  'function shared_memory_example() {',
  '    $key = ftok(__FILE__, "t");',
  '    $shm_id = shmop_open($key, "c", 0644, 100);',
  '',
  '    if (pcntl_fork() == 0) {',
  '        // 子进程写入数据',
  '        shmop_write($shm_id, "Hello from child", 0);',
  '        exit(0);',
  '    } else {',
  '        // 父进程读取数据',
  '        pcntl_wait($status);',
  '        $data = shmop_read($shm_id, 0, 100);',
  '        echo $data;',
  '        shmop_delete($shm_id);',
  '        shmop_close($shm_id);',
  '    }',
  '}',
  '',
  '// 4. 信号处理',
  'function signal_handler($signo) {',
  '    switch ($signo) {',
  '        case SIGTERM:',
  '            echo "收到终止信号\n";',
  '            exit(0);',
  '            break;',
  '        case SIGCHLD:',
  '            echo "子进程结束\n";',
  '            pcntl_waitpid(-1, $status);',
  '            break;',
  '    }',
  '}',
  '',
  'pcntl_signal(SIGTERM, "signal_handler");',
  'pcntl_signal(SIGCHLD, "signal_handler");',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'thread' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">多线程</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>线程创建与管理。</li>
              <li>线程同步。</li>
              <li>线程安全。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 多线程示例',
  '',
  '// 1. 使用pthreads扩展',
  'class WorkerThread extends Thread {',
  '    private $id;',
  '',
  '    public function __construct($id) {',
  '        $this->id = $id;',
  '    }',
  '',
  '    public function run() {',
  '        echo "线程 {$this->id} 开始执行\n";',
  '        // 执行任务',
  '        sleep(1);',
  '        echo "线程 {$this->id} 执行完成\n";',
  '    }',
  '}',
  '',
  '// 2. 线程池示例',
  'class ThreadPool {',
  '    private $size;',
  '    private $threads = [];',
  '',
  '    public function __construct($size) {',
  '        $this->size = $size;',
  '    }',
  '',
  '    public function start($callback) {',
  '        for ($i = 0; $i < $this->size; $i++) {',
  '            $thread = new WorkerThread($i);',
  '            $thread->start();',
  '            $this->threads[] = $thread;',
  '        }',
  '    }',
  '',
  '    public function wait() {',
  '        foreach ($this->threads as $thread) {',
  '            $thread->join();',
  '        }',
  '    }',
  '}',
  '',
  '// 3. 线程同步',
  'class Counter {',
  '    private $value = 0;',
  '    private $mutex;',
  '',
  '    public function __construct() {',
  '        $this->mutex = Mutex::create();',
  '    }',
  '',
  '    public function increment() {',
  '        Mutex::lock($this->mutex);',
  '        $this->value++;',
  '        Mutex::unlock($this->mutex);',
  '    }',
  '',
  '    public function getValue() {',
  '        return $this->value;',
  '    }',
  '}',
  '',
  '// 4. 线程安全示例',
  'class ThreadSafeArray extends Threaded {',
  '    public function add($value) {',
  '        $this->synchronized(function($value) {',
  '            $this[] = $value;',
  '        }, $value);',
  '    }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'coroutine' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">协程</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>协程基础。</li>
              <li>协程调度。</li>
              <li>协程通信。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 协程示例',
  '',
  '// 1. 使用Swoole协程',
  'go(function () {',
  '    echo "协程1开始\n";',
  '    co::sleep(1);',
  '    echo "协程1结束\n";',
  '});',
  '',
  'go(function () {',
  '    echo "协程2开始\n";',
  '    co::sleep(0.5);',
  '    echo "协程2结束\n";',
  '});',
  '',
  '// 2. 协程HTTP客户端',
  'go(function () {',
  '    $client = new Swoole\\Coroutine\\Http\\Client("www.example.com", 80);',
  '    $client->get("/");',
  '    echo $client->body;',
  '});',
  '',
  '// 3. 协程MySQL客户端',
  'go(function () {',
  '    $db = new Swoole\\Coroutine\\MySQL();',
  '    $db->connect([',
  '        "host" => "127.0.0.1",',
  '        "port" => 3306,',
  '        "user" => "root",',
  '        "password" => "password",',
  '        "database" => "test"',
  '    ]);',
  '    $result = $db->query("SELECT * FROM users");',
  '    print_r($result);',
  '});',
  '',
  '// 4. 协程通道',
  'go(function () {',
  '    $channel = new Swoole\\Coroutine\\Channel();',
  '    go(function () use ($channel) {',
  '        $channel->push("Hello");',
  '    });',
  '    go(function () use ($channel) {',
  '        echo $channel->pop();',
  '    });',
  '});',
  '',
  '// 5. 协程定时器',
  'go(function () {',
  '    $timer = Swoole\\Timer::tick(1000, function () {',
  '        echo "定时器触发\n";',
  '    });',
  '    Swoole\\Timer::after(5000, function () use ($timer) {',
  '        Swoole\\Timer::clear($timer);',
  '    });',
  '});',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'async-io' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">异步IO</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>异步文件操作。</li>
              <li>异步网络操作。</li>
              <li>异步数据库操作。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 异步IO示例',
  '',
  '// 1. 异步文件操作',
  'Swoole\\Async::readFile(__FILE__, function ($filename, $content) {',
  '    echo "文件内容长度: " . strlen($content) . "\n";',
  '});',
  '',
  '// 2. 异步HTTP服务器',
  '$http = new Swoole\\Http\\Server("0.0.0.0", 9501);',
  '',
  '$http->on("request", function ($request, $response) {',
  '    $response->header("Content-Type", "text/plain");',
  '    $response->end("Hello World\n");',
  '});',
  '',
  '$http->start();',
  '',
  '// 3. 异步WebSocket服务器',
  '$ws = new Swoole\\WebSocket\\Server("0.0.0.0", 9502);',
  '',
  '$ws->on("open", function ($ws, $request) {',
  '    echo "新连接: {$request->fd}\n";',
  '});',
  '',
  '$ws->on("message", function ($ws, $frame) {',
  '    echo "收到消息: {$frame->data}\n";',
  '    $ws->push($frame->fd, "服务器收到: {$frame->data}");',
  '});',
  '',
  '$ws->start();',
  '',
  '// 4. 异步MySQL客户端',
  '$db = new Swoole\\MySQL();',
  '$db->connect([',
  '    "host" => "127.0.0.1",',
  '    "port" => 3306,',
  '    "user" => "root",',
  '    "password" => "password",',
  '    "database" => "test"',
  '], function ($db, $result) {',
  '    if ($result === false) {',
  '        echo "连接失败\n";',
  '        return;',
  '    }',
  '    $db->query("SELECT * FROM users", function ($db, $result) {',
  '        print_r($result);',
  '    });',
  '});',
  '',
  '// 5. 异步Redis客户端',
  '$redis = new Swoole\\Redis();',
  '$redis->connect("127.0.0.1", 6379, function ($redis, $result) {',
  '    $redis->set("key", "value", function ($redis, $result) {',
  '        $redis->get("key", function ($redis, $result) {',
  '            echo $result;',
  '        });',
  '    });',
  '});',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'event-loop' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">事件循环</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>事件循环基础。</li>
              <li>定时器。</li>
              <li>信号处理。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 事件循环示例',
  '',
  '// 1. 基本事件循环',
  '$loop = React\\EventLoop\\Factory::create();',
  '',
  '// 添加定时器',
  '$loop->addTimer(1, function () {',
  '    echo "1秒后执行\n";',
  '});',
  '',
  '// 添加周期性定时器',
  '$loop->addPeriodicTimer(1, function () {',
  '    echo "每秒执行一次\n";',
  '});',
  '',
  '// 运行事件循环',
  '$loop->run();',
  '',
  '// 2. 信号处理',
  '$loop->addSignal(SIGINT, function () {',
  '    echo "收到中断信号\n";',
  '    $loop->stop();',
  '});',
  '',
  '// 3. 流处理',
  '$stream = new React\\Stream\\ReadableResourceStream(fopen("php://stdin", "r"), $loop);',
  '$stream->on("data", function ($data) {',
  '    echo "收到数据: " . $data;',
  '});',
  '',
  '// 4. Promise处理',
  '$promise = new React\\Promise\\Promise(function ($resolve, $reject) {',
  '    $loop->addTimer(1, function () use ($resolve) {',
  '        $resolve("操作完成");',
  '    });',
  '});',
  '',
  '$promise->then(function ($value) {',
  '    echo $value . "\n";',
  '});',
  '',
  '// 5. 并发请求',
  '$browser = new React\\Http\\Browser($loop);',
  '',
  '$promises = [',
  '    $browser->get("http://www.example.com/1"),',
  '    $browser->get("http://www.example.com/2"),',
  '    $browser->get("http://www.example.com/3")',
  '];',
  '',
  'React\\Promise\\all($promises)->then(function ($responses) {',
  '    foreach ($responses as $response) {',
  '        echo $response->getBody() . "\n";',
  '    }',
  '});',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何选择并发模型？</b><br />A: 根据应用场景选择，CPU密集型使用多进程，IO密集型使用协程或异步IO。</li>
              <li><b>Q: 如何处理并发安全问题？</b><br />A: 使用锁机制、原子操作、线程安全的数据结构。</li>
              <li><b>Q: 如何调试并发程序？</b><br />A: 使用日志、断点调试、性能分析工具。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个简单的Web服务器。</li>
              <li>开发一个并发爬虫程序。</li>
              <li>实现一个实时聊天系统。</li>
              <li>开发一个高性能的API服务。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/advanced-internals"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：高级特性与底层原理
          </a>
          <a
            href="/study/php/swoole-highperf"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：Swoole与高性能开发
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 