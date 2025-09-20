'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: 'Swoole基础' },
  { key: 'coroutine', label: '协程编程' },
  { key: 'network', label: '网络编程' },
  { key: 'process', label: '进程管理' },
  { key: 'performance', label: '性能优化' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpSwooleHighPerfPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Swoole与高性能开发</h1>
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
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Swoole基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Swoole简介与安装。</li>
              <li>事件驱动模型。</li>
              <li>基本配置与使用。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// Swoole基础示例',
  '',
  '// 1. 安装Swoole',
  '// pecl install swoole',
  '// 或使用源码安装',
  '// git clone https://github.com/swoole/swoole-src.git',
  '// cd swoole-src',
  '// phpize',
  '// ./configure',
  '// make && make install',
  '',
  '// 2. 基本配置',
  '// php.ini',
  'extension=swoole.so',
  '',
  '// 3. 创建HTTP服务器',
  '$http = new Swoole\\Http\\Server("0.0.0.0", 9501);',
  '',
  '$http->on("start", function ($server) {',
  '    echo "Swoole http server is started at http://0.0.0.0:9501\n";',
  '});',
  '',
  '$http->on("request", function ($request, $response) {',
  '    $response->header("Content-Type", "text/plain");',
  '    $response->end("Hello World\n");',
  '});',
  '',
  '$http->start();',
  '',
  '// 4. 创建WebSocket服务器',
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
  '// 5. 创建TCP服务器',
  '$server = new Swoole\\Server("0.0.0.0", 9503);',
  '',
  '$server->on("connect", function ($server, $fd) {',
  '    echo "新连接: {$fd}\n";',
  '});',
  '',
  '$server->on("receive", function ($server, $fd, $reactor_id, $data) {',
  '    echo "收到数据: {$data}\n";',
  '    $server->send($fd, "服务器收到: {$data}");',
  '});',
  '',
  '$server->start();',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'coroutine' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">协程编程</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>协程基础。</li>
              <li>协程调度。</li>
              <li>协程通信。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 协程编程示例',
  '',
  '// 1. 基本协程',
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
        {activeTab === 'network' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">网络编程</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>HTTP服务器。</li>
              <li>WebSocket服务器。</li>
              <li>TCP/UDP服务器。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 网络编程示例',
  '',
  '// 1. HTTP服务器',
  '$http = new Swoole\\Http\\Server("0.0.0.0", 9501);',
  '',
  '$http->on("request", function ($request, $response) {',
  '    $response->header("Content-Type", "text/plain");',
  '    $response->end("Hello World\n");',
  '});',
  '',
  '$http->start();',
  '',
  '// 2. WebSocket服务器',
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
  '// 3. TCP服务器',
  '$server = new Swoole\\Server("0.0.0.0", 9503);',
  '',
  '$server->on("connect", function ($server, $fd) {',
  '    echo "新连接: {$fd}\n";',
  '});',
  '',
  '$server->on("receive", function ($server, $fd, $reactor_id, $data) {',
  '    echo "收到数据: {$data}\n";',
  '    $server->send($fd, "服务器收到: {$data}");',
  '});',
  '',
  '$server->start();',
  '',
  '// 4. UDP服务器',
  '$server = new Swoole\\Server("0.0.0.0", 9504, SWOOLE_PROCESS, SWOOLE_SOCK_UDP);',
  '',
  '$server->on("packet", function ($server, $data, $client_info) {',
  '    echo "收到UDP数据: {$data}\n";',
  '    $server->sendto($client_info["address"], $client_info["port"], "服务器收到: {$data}");',
  '});',
  '',
  '$server->start();',
  '',
  '// 5. 多端口监听',
  '$server = new Swoole\\Server("0.0.0.0", 9505);',
  '',
  '$server->addlistener("0.0.0.0", 9506, SWOOLE_SOCK_TCP);',
  '$server->addlistener("0.0.0.0", 9507, SWOOLE_SOCK_UDP);',
  '',
  '$server->on("receive", function ($server, $fd, $reactor_id, $data) {',
  '    echo "收到数据: {$data}\n";',
  '    $server->send($fd, "服务器收到: {$data}");',
  '});',
  '',
  '$server->start();',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'process' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">进程管理</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>进程创建与管理。</li>
              <li>进程间通信。</li>
              <li>进程池。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 进程管理示例',
  '',
  '// 1. 进程创建',
  '$process = new Swoole\\Process(function ($process) {',
  '    echo "子进程开始执行\n";',
  '    sleep(1);',
  '    echo "子进程执行完成\n";',
  '});',
  '',
  '$process->start();',
  '',
  '// 2. 进程间通信',
  '$process = new Swoole\\Process(function ($process) {',
  '    $process->write("Hello from child process");',
  '});',
  '',
  '$process->start();',
  'echo $process->read();',
  '',
  '// 3. 进程池',
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
  '            $process = new Swoole\\Process($callback);',
  '            $process->start();',
  '            $this->processes[] = $process;',
  '        }',
  '    }',
  '',
  '    public function wait() {',
  '        foreach ($this->processes as $process) {',
  '            $process->wait();',
  '        }',
  '    }',
  '}',
  '',
  '// 4. 信号处理',
  'Swoole\\Process::signal(SIGTERM, function () {',
  '    echo "收到终止信号\n";',
  '    exit(0);',
  '});',
  '',
  '// 5. 进程间共享内存',
  '$shm = new Swoole\\Process\\SharedMemory(1024);',
  '$shm->write("Hello");',
  'echo $shm->read();',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'performance' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能优化</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>连接池。</li>
              <li>内存管理。</li>
              <li>性能调优。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 性能优化示例',
  '',
  '// 1. 连接池',
  'class ConnectionPool {',
  '    private $pool;',
  '    private $config;',
  '',
  '    public function __construct($config, $size) {',
  '        $this->config = $config;',
  '        $this->pool = new Swoole\\Coroutine\\Channel($size);',
  '        for ($i = 0; $i < $size; $i++) {',
  '            $this->pool->push($this->createConnection());',
  '        }',
  '    }',
  '',
  '    private function createConnection() {',
  '        $db = new Swoole\\Coroutine\\MySQL();',
  '        $db->connect($this->config);',
  '        return $db;',
  '    }',
  '',
  '    public function get() {',
  '        return $this->pool->pop();',
  '    }',
  '',
  '    public function put($connection) {',
  '        $this->pool->push($connection);',
  '    }',
  '}',
  '',
  '// 2. 内存管理',
  'class MemoryManager {',
  '    private $memory;',
  '',
  '    public function __construct() {',
  '        $this->memory = new Swoole\\Table(1024, 1024);',
  '        $this->memory->column("value", Swoole\\Table::TYPE_STRING, 1024);',
  '        $this->memory->create();',
  '    }',
  '',
  '    public function set($key, $value) {',
  '        $this->memory->set($key, ["value" => $value]);',
  '    }',
  '',
  '    public function get($key) {',
  '        return $this->memory->get($key)["value"];',
  '    }',
  '}',
  '',
  '// 3. 性能调优',
  '// 配置优化',
  '$server->set([',
  '    "worker_num" => 4,',
  '    "max_request" => 10000,',
  '    "task_worker_num" => 4,',
  '    "task_max_request" => 10000,',
  '    "max_conn" => 10000,',
  '    "open_tcp_nodelay" => true,',
  '    "open_cpu_affinity" => true,',
  '    "daemonize" => false,',
  '    "log_level" => SWOOLE_LOG_INFO,',
  ']);',
  '',
  '// 4. 协程调度优化',
  'Swoole\\Coroutine::set([',
  '    "max_coroutine" => 100000,',
  '    "stack_size" => 8192,',
  '    "socket_read_timeout" => 0.5,',
  '    "socket_connect_timeout" => 1,',
  ']);',
  '',
  '// 5. 异步任务处理',
  '$server->on("task", function ($server, $task_id, $reactor_id, $data) {',
  '    // 处理耗时任务',
  '    sleep(1);',
  '    return "处理完成";',
  '});',
  '',
  '$server->on("finish", function ($server, $task_id, $data) {',
  '    echo "任务完成: {$data}\n";',
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
              <li><b>Q: 如何选择Swoole版本？</b><br />A: 根据PHP版本选择对应的Swoole版本，建议使用最新稳定版。</li>
              <li><b>Q: 如何处理内存泄漏？</b><br />A: 使用内存检测工具，及时释放不需要的资源，避免循环引用。</li>
              <li><b>Q: 如何优化Swoole性能？</b><br />A: 合理配置worker进程数，使用连接池，优化代码逻辑。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个高性能的Web服务器。</li>
              <li>开发一个实时聊天系统。</li>
              <li>实现一个并发爬虫程序。</li>
              <li>开发一个高性能的API服务。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/concurrency-async"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：并发与异步编程
          </a>
          <a
            href="/study/php/devops-cicd"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：自动化部署与CI/CD
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 