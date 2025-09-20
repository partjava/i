'use client';

import { useState } from 'react';

const tabs = [
  { key: 'unit-testing', label: '单元测试' },
  { key: 'debugging-tools', label: '调试工具' },
  { key: 'logging', label: '日志记录' },
  { key: 'error-handling', label: '错误处理' },
  { key: 'profiling', label: '性能分析' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpTestingDebuggingPage() {
  const [activeTab, setActiveTab] = useState('unit-testing');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">测试与调试</h1>
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
        {activeTab === 'unit-testing' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">单元测试</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用PHPUnit进行单元测试。</li>
              <li>编写测试用例和测试套件。</li>
              <li>使用数据提供器。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 单元测试示例',
  '',
  '// 1. 安装PHPUnit',
  '// composer require --dev phpunit/phpunit',
  '',
  '// 2. 测试类示例',
  'class CalculatorTest extends PHPUnit\\Framework\\TestCase',
  '{',
  '    public function testAdd()',
  '    {',
  '        $calculator = new Calculator();',
  '        $result = $calculator->add(1, 2);',
  '        $this->assertEquals(3, $result);',
  '    }',
  '',
  '    /**',
  '     * @dataProvider additionProvider',
  '     */',
  '    public function testAddWithDataProvider($a, $b, $expected)',
  '    {',
  '        $calculator = new Calculator();',
  '        $result = $calculator->add($a, $b);',
  '        $this->assertEquals($expected, $result);',
  '    }',
  '',
  '    public function additionProvider()',
  '    {',
  '        return [',
  '            [0, 0, 0],',
  '            [0, 1, 1],',
  '            [1, 0, 1],',
  '            [1, 1, 2],',
  '        ];',
  '    }',
  '',
  '    public function testException()',
  '    {',
  '        $calculator = new Calculator();',
  '        $this->expectException(InvalidArgumentException::class);',
  '        $calculator->divide(1, 0);',
  '    }',
  '}',
  '',
  '// 3. 运行测试',
  '// ./vendor/bin/phpunit tests/CalculatorTest.php',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'debugging-tools' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">调试工具</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用Xdebug进行调试。</li>
              <li>使用var_dump和print_r。</li>
              <li>使用调试器。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 调试工具示例',
  '',
  '// 1. Xdebug配置',
  '// php.ini',
  'zend_extension=xdebug.so',
  'xdebug.mode=debug',
  'xdebug.start_with_request=yes',
  'xdebug.client_port=9003',
  '',
  '// 2. 基本调试函数',
  'function debug_example() {',
  '    $data = [',
  '        "name" => "John",',
  '        "age" => 30,',
  '        "email" => "john@example.com"',
  '    ];',
  '',
  '    // 使用var_dump',
  '    var_dump($data);',
  '',
  '    // 使用print_r',
  '    echo "<pre>";',
  '    print_r($data);',
  '    echo "</pre>";',
  '',
  '    // 使用debug_backtrace',
  '    $trace = debug_backtrace();',
  '    print_r($trace);',
  '}',
  '',
  '// 3. 使用Xdebug断点',
  'function process_data($data) {',
  '    // 设置断点',
  '    xdebug_break();',
  '',
  '    foreach ($data as $item) {',
  '        // 处理数据',
  '    }',
  '}',
  '',
  '// 4. 使用Symfony VarDumper',
  '// composer require symfony/var-dumper',
  'use Symfony\\Component\\VarDumper\\VarDumper;',
  '',
  'function dump_data($data) {',
  '    VarDumper::dump($data);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'logging' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">日志记录</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用Monolog进行日志记录。</li>
              <li>配置日志级别和处理器。</li>
              <li>自定义日志格式。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 日志记录示例',
  '',
  '// 1. 使用Monolog',
  '// composer require monolog/monolog',
  '',
  'use Monolog\\Logger;',
  'use Monolog\\Handler\\StreamHandler;',
  'use Monolog\\Handler\\RotatingFileHandler;',
  '',
  '// 2. 基本日志配置',
  'function setup_logger() {',
  '    $logger = new Logger("app");',
  '',
  '    // 添加文件处理器',
  '    $logger->pushHandler(new StreamHandler("app.log", Logger::DEBUG));',
  '',
  '    // 添加轮转文件处理器',
  '    $logger->pushHandler(new RotatingFileHandler("app.log", 7, Logger::DEBUG));',
  '',
  '    return $logger;',
  '}',
  '',
  '// 3. 记录不同级别的日志',
  'function log_example($logger) {',
  '    $logger->debug("调试信息");',
  '    $logger->info("一般信息");',
  '    $logger->warning("警告信息");',
  '    $logger->error("错误信息");',
  '    $logger->critical("严重错误");',
  '',
  '    // 添加上下文信息',
  '    $logger->info("用户登录", ["user_id" => 123, "ip" => "127.0.0.1"]);',
  '}',
  '',
  '// 4. 自定义日志格式',
  'use Monolog\\Formatter\\LineFormatter;',
  '',
  'function custom_format_logger() {',
  '    $logger = new Logger("app");',
  '    $formatter = new LineFormatter("[%datetime%] %channel%.%level_name%: %message% %context%\n");',
  '    ',
  '    $handler = new StreamHandler("app.log", Logger::DEBUG);',
  '    $handler->setFormatter($formatter);',
  '    ',
  '    $logger->pushHandler($handler);',
  '    return $logger;',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'error-handling' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">错误处理</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>设置错误处理器。</li>
              <li>异常处理。</li>
              <li>自定义错误页面。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 错误处理示例',
  '',
  '// 1. 设置错误处理器',
  'function custom_error_handler($errno, $errstr, $errfile, $errline) {',
  '    $error = "错误 [$errno] $errstr - $errfile:$errline";',
  '    error_log($error);',
  '',
  '    if ($errno == E_USER_ERROR) {',
  '        header("HTTP/1.1 500 Internal Server Error");',
  '        include "error_page.php";',
  '        exit(1);',
  '    }',
  '',
  '    return true;',
  '}',
  '',
  'set_error_handler("custom_error_handler");',
  '',
  '// 2. 异常处理',
  'try {',
  '    // 可能抛出异常的代码',
  '    if ($condition) {',
  '        throw new Exception("错误信息");',
  '    }',
  '} catch (Exception $e) {',
  '    error_log($e->getMessage());',
  '    // 处理异常',
  '} finally {',
  '    // 清理代码',
  '}',
  '',
  '// 3. 自定义异常类',
  'class CustomException extends Exception {',
  '    public function __construct($message, $code = 0, Exception $previous = null) {',
  '        parent::__construct($message, $code, $previous);',
  '    }',
  '',
  '    public function __toString() {',
  '        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";',
  '    }',
  '}',
  '',
  '// 4. 设置异常处理器',
  'function custom_exception_handler($exception) {',
  '    error_log("未捕获的异常: " . $exception->getMessage());',
  '    header("HTTP/1.1 500 Internal Server Error");',
  '    include "error_page.php";',
  '}',
  '',
  'set_exception_handler("custom_exception_handler");',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'profiling' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能分析</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用XHProf进行性能分析。</li>
              <li>分析数据库查询。</li>
              <li>内存使用分析。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 性能分析示例',
  '',
  '// 1. XHProf配置',
  '// php.ini',
  'extension=xhprof.so',
  'xhprof.output_dir="/tmp/xhprof"',
  '',
  '// 2. 基本性能分析',
  'function profile_example() {',
  '    // 开始分析',
  '    xhprof_enable(XHPROF_FLAGS_CPU | XHPROF_FLAGS_MEMORY);',
  '',
  '    // 要分析的代码',
  '    $result = process_data();',
  '',
  '    // 结束分析',
  '    $xhprof_data = xhprof_disable();',
  '',
  '    // 保存分析结果',
  '    $XHPROF_ROOT = "/path/to/xhprof";',
  '    include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_lib.php";',
  '    include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_runs.php";',
  '',
  '    $xhprof_runs = new XHProfRuns_Default();',
  '    $run_id = $xhprof_runs->save_run($xhprof_data, "test");',
  '',
  '    return $run_id;',
  '}',
  '',
  '// 3. 数据库查询分析',
  'function profile_queries($pdo) {',
  '    // 启用查询日志',
  '    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);',
  '    $pdo->exec("SET profiling = 1");',
  '',
  '    // 执行查询',
  '    $stmt = $pdo->query("SELECT * FROM users");',
  '',
  '    // 获取分析结果',
  '    $result = $pdo->query("SHOW PROFILE")->fetchAll(PDO::FETCH_ASSOC);',
  '',
  '    return $result;',
  '}',
  '',
  '// 4. 内存使用分析',
  'function profile_memory() {',
  '    $start_memory = memory_get_usage();',
  '',
  '    // 执行代码',
  '    $data = process_large_dataset();',
  '',
  '    $end_memory = memory_get_usage();',
  '    $peak_memory = memory_get_peak_usage();',
  '',
  '    return [',
  '        "start" => $start_memory,',
  '        "end" => $end_memory,',
  '        "peak" => $peak_memory,',
  '        "diff" => $end_memory - $start_memory',
  '    ];',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何调试PHP代码？</b><br />A: 使用Xdebug、var_dump或Symfony VarDumper等工具。</li>
              <li><b>Q: 如何记录日志？</b><br />A: 使用Monolog库，配置适当的处理器和格式。</li>
              <li><b>Q: 如何分析性能问题？</b><br />A: 使用XHProf、数据库查询分析工具和内存分析工具。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>为一个类编写单元测试。</li>
              <li>实现自定义错误处理器。</li>
              <li>配置日志系统并记录不同类型的信息。</li>
              <li>分析并优化一个性能瓶颈。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/security-performance"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：安全与性能优化
          </a>
          <a
            href="/study/php/frameworks-projects"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：框架与项目实战
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 