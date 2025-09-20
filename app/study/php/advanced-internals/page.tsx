'use client';

import { useState } from 'react';

const tabs = [
  { key: 'kernel', label: 'PHP内核' },
  { key: 'memory', label: '内存管理' },
  { key: 'gc', label: '垃圾回收' },
  { key: 'extension', label: '扩展开发' },
  { key: 'performance', label: '性能优化' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpAdvancedInternalsPage() {
  const [activeTab, setActiveTab] = useState('kernel');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">高级特性与底层原理</h1>
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
        {activeTab === 'kernel' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">PHP内核</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP内核架构。</li>
              <li>Zend引擎。</li>
              <li>变量实现原理。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// PHP内核示例',
  '',
  '// 1. 变量实现原理',
  '// PHP变量在内部使用zval结构体表示',
  'typedef struct _zval_struct {',
  '    zend_value value;        // 值',
  '    union {',
  '        struct {',
  '            ZEND_ENDIAN_LOHI_4(',
  '                zend_uchar type,         // 类型',
  '                zend_uchar type_flags,   // 类型标志',
  '                zend_uchar const_flags,  // 常量标志',
  '                zend_uchar reserved)     // 保留字段',
  '        } v;',
  '        uint32_t type_info;',
  '    } u1;',
  '    union {',
  '        uint32_t next;                 // 哈希表冲突链',
  '        uint32_t cache_slot;           // 缓存槽',
  '        uint32_t lineno;               // 行号',
  '        uint32_t num_args;             // 参数数量',
  '        uint32_t fe_pos;               // foreach位置',
  '        uint32_t fe_iter_idx;          // foreach迭代器索引',
  '    } u2;',
  '} zval;',
  '',
  '// 2. 类型系统',
  '#define IS_UNDEF                    0',
  '#define IS_NULL                     1',
  '#define IS_FALSE                    2',
  '#define IS_TRUE                     3',
  '#define IS_LONG                     4',
  '#define IS_DOUBLE                   5',
  '#define IS_STRING                   6',
  '#define IS_ARRAY                    7',
  '#define IS_OBJECT                   8',
  '#define IS_RESOURCE                 9',
  '#define IS_REFERENCE                10',
  '',
  '// 3. 内存管理',
  '// PHP使用引用计数进行内存管理',
  'static zend_always_inline void zval_add_ref(zval* pz) {',
  '    if (Z_REFCOUNTED_P(pz)) {',
  '        Z_REFCOUNT_P(pz)++;',
  '    }',
  '}',
  '',
  '// 4. 垃圾回收',
  '// PHP使用引用计数和循环引用检测进行垃圾回收',
  'static void gc_collect_cycles(void) {',
  '    // 收集循环引用',
  '    // 释放内存',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'memory' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">内存管理</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>内存分配策略。</li>
              <li>引用计数。</li>
              <li>内存泄漏检测。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 内存管理示例',
  '',
  '// 1. 内存分配',
  '// PHP使用emalloc/efree进行内存分配和释放',
  'void* emalloc(size_t size) {',
  '    void* ptr = malloc(size);',
  '    if (!ptr) {',
  '        zend_error_noreturn(E_ERROR, "Out of memory");',
  '    }',
  '    return ptr;',
  '}',
  '',
  'void efree(void* ptr) {',
  '    free(ptr);',
  '}',
  '',
  '// 2. 引用计数',
  '// 增加引用计数',
  'static zend_always_inline void zval_add_ref(zval* pz) {',
  '    if (Z_REFCOUNTED_P(pz)) {',
  '        Z_REFCOUNT_P(pz)++;',
  '    }',
  '}',
  '',
  '// 减少引用计数',
  'static zend_always_inline void zval_del_ref(zval* pz) {',
  '    if (Z_REFCOUNTED_P(pz) && --Z_REFCOUNT_P(pz) == 0) {',
  '        zval_dtor(pz);',
  '    }',
  '}',
  '',
  '// 3. 内存泄漏检测',
  '// 使用Xdebug检测内存泄漏',
  'xdebug_start_memory_monitor();',
  '',
  '// 执行代码',
  '$data = array_fill(0, 1000, "test");',
  '',
  '// 获取内存使用情况',
  '$memory = xdebug_get_memory_usage();',
  'echo "Memory usage: " . $memory . " bytes\n";',
  '',
  '// 停止监控',
  'xdebug_stop_memory_monitor();',
  '',
  '// 4. 内存优化',
  '// 使用unset释放不需要的变量',
  'function process_data($data) {',
  '    // 处理数据',
  '    $result = [];',
  '    foreach ($data as $item) {',
  '        $processed = process_item($item);',
  '        $result[] = $processed;',
  '        unset($processed); // 及时释放内存',
  '    }',
  '    return $result;',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'gc' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">垃圾回收</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>引用计数机制。</li>
              <li>循环引用检测。</li>
              <li>垃圾回收算法。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 垃圾回收示例',
  '',
  '// 1. 引用计数示例',
  '$a = "Hello";      // refcount = 1',
  '$b = $a;           // refcount = 2',
  'unset($a);         // refcount = 1',
  'unset($b);         // refcount = 0, 内存被释放',
  '',
  '// 2. 循环引用示例',
  'class Node {',
  '    public $next;',
  '}',
  '',
  '$a = new Node();',
  '$b = new Node();',
  '$a->next = $b;',
  '$b->next = $a;',
  '',
  '// 即使unset变量，由于循环引用，内存不会被释放',
  'unset($a);',
  'unset($b);',
  '',
  '// 3. 垃圾回收配置',
  '// php.ini配置',
  'zend.enable_gc = On',
  'gc_max_direct_roots = 10000',
  'gc_max_cycles = 1000',
  '',
  '// 4. 手动触发垃圾回收',
  'gc_collect_cycles();',
  '',
  '// 5. 垃圾回收状态',
  'echo "GC enabled: " . gc_enabled() . "\n";',
  'echo "GC runs: " . gc_collect_cycles() . "\n";',
  '',
  '// 6. 内存使用情况',
  'echo "Memory usage: " . memory_get_usage() . "\n";',
  'echo "Peak memory usage: " . memory_get_peak_usage() . "\n";',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'extension' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">扩展开发</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>扩展开发基础。</li>
              <li>PHP扩展API。</li>
              <li>扩展编译与安装。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 扩展开发示例',
  '',
  '// 1. 扩展配置文件',
  '// config.m4',
  'PHP_ARG_ENABLE(myext, whether to enable myext support,',
  '[  --enable-myext          Enable myext support])',
  '',
  'if test "$PHP_MYEXT" = "yes"; then',
  '    AC_DEFINE(HAVE_MYEXT, 1, [Whether you have myext])',
  '    PHP_NEW_EXTENSION(myext, myext.c, $ext_shared)',
  'fi',
  '',
  '// 2. 扩展头文件',
  '// php_myext.h',
  '#ifndef PHP_MYEXT_H',
  '#define PHP_MYEXT_H',
  '',
  'extern zend_module_entry myext_module_entry;',
  '#define phpext_myext_ptr &myext_module_entry',
  '',
  '#define PHP_MYEXT_VERSION "1.0.0"',
  '',
  '#ifdef PHP_WIN32',
  '#   define PHP_MYEXT_API __declspec(dllexport)',
  '#elif defined(__GNUC__) && __GNUC__ >= 4',
  '#   define PHP_MYEXT_API __attribute__ ((visibility("default")))',
  '#else',
  '#   define PHP_MYEXT_API',
  '#endif',
  '',
  '#ifdef ZTS',
  '#include "TSRM.h"',
  '#endif',
  '',
  '#endif',
  '',
  '// 3. 扩展源文件',
  '// myext.c',
  '#include "php.h"',
  '#include "php_myext.h"',
  '',
  'static zend_function_entry myext_functions[] = {',
  '    PHP_FE(myext_hello, NULL)',
  '    {NULL, NULL, NULL}',
  '};',
  '',
  'zend_module_entry myext_module_entry = {',
  '    STANDARD_MODULE_HEADER,',
  '    "myext",',
  '    myext_functions,',
  '    NULL,',
  '    NULL,',
  '    NULL,',
  '    NULL,',
  '    NULL,',
  '    PHP_MYEXT_VERSION,',
  '    STANDARD_MODULE_PROPERTIES',
  '};',
  '',
  'PHP_FUNCTION(myext_hello)',
  '{',
  '    php_printf("Hello from myext!\\n");',
  '    RETURN_TRUE;',
  '}',
  '',
  '// 4. 编译扩展',
  '// phpize',
  '// ./configure --enable-myext',
  '// make',
  '// make install',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'performance' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能优化</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>代码优化。</li>
              <li>缓存策略。</li>
              <li>数据库优化。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 性能优化示例',
  '',
  '// 1. 代码优化',
  '// 避免在循环中创建对象',
  'function process_items($items) {',
  '    $processor = new Processor(); // 在循环外创建对象',
  '    foreach ($items as $item) {',
  '        $processor->process($item);',
  '    }',
  '}',
  '',
  '// 使用引用避免复制',
  'function process_array(&$array) {',
  '    foreach ($array as &$value) {',
  '        $value = process_value($value);',
  '    }',
  '}',
  '',
  '// 2. 缓存策略',
  '// 使用APCu缓存',
  'function get_data($key) {',
  '    $data = apcu_fetch($key, $success);',
  '    if (!$success) {',
  '        $data = fetch_from_database($key);',
  '        apcu_store($key, $data, 3600); // 缓存1小时',
  '    }',
  '    return $data;',
  '}',
  '',
  '// 3. 数据库优化',
  '// 使用预处理语句',
  'function get_user($id) {',
  '    static $stmt = null;',
  '    if ($stmt === null) {',
  '        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");',
  '    }',
  '    $stmt->execute([$id]);',
  '    return $stmt->fetch();',
  '}',
  '',
  '// 4. 内存优化',
  '// 及时释放大数组',
  'function process_large_data() {',
  '    $data = get_large_data();',
  '    // 处理数据',
  '    unset($data); // 及时释放内存',
  '}',
  '',
  '// 5. 使用生成器处理大数据',
  'function process_large_file($file) {',
  '    $handle = fopen($file, "r");',
  '    while (!feof($handle)) {',
  '        $line = fgets($handle);',
  '        yield process_line($line);',
  '    }',
  '    fclose($handle);',
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
              <li><b>Q: 如何优化PHP性能？</b><br />A: 使用OPcache、优化代码、合理使用缓存、优化数据库查询。</li>
              <li><b>Q: 如何处理内存泄漏？</b><br />A: 使用Xdebug检测、及时释放不需要的变量、避免循环引用。</li>
              <li><b>Q: 如何开发PHP扩展？</b><br />A: 使用PHP扩展开发工具包、遵循扩展开发规范、进行充分测试。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>实现一个简单的PHP扩展。</li>
              <li>优化一个存在性能问题的PHP应用。</li>
              <li>实现一个内存泄漏检测工具。</li>
              <li>开发一个性能分析工具。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/frameworks-projects"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：框架与项目实战
          </a>
          <a
            href="/study/php/concurrency-async"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：并发与异步编程
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 