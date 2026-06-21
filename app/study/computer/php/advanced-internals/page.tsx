'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '高级特性与底层原理', chapterNumber: 17, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '框架与项目实战', href: '/study/computer/php/frameworks-projects' },
  nextChapter: { label: '并发与异步编程', href: '/study/computer/php/concurrency-async' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'PHP内核',
    left: (
      <div className="space-y-4">
        <PageTitle>PHP内核</PageTitle>
        <BookParagraph>Zend引擎是PHP的核心，负责解析和执行PHP代码。PHP变量在内部使用zval结构体表示，包含值、类型信息和附加字段。</BookParagraph>
        <BookList items={['词法分析：将代码拆分为token', '语法分析：构建抽象语法树（AST）', '编译：AST编译为opcode', '执行：Zend引擎执行opcode']} />
        <BookCode language="c" code={`typedef struct _zval_struct {
    zend_value value;        // 值
    union {
        struct {
            ZEND_ENDIAN_LOHI_4(
                zend_uchar type,         // 类型
                zend_uchar type_flags,   // 类型标志
                zend_uchar const_flags,  // 常量标志
                zend_uchar reserved)     // 保留字段
        } v;
        uint32_t type_info;
    } u1;
    union {
        uint32_t next;                 // 哈希表冲突链
        uint32_t cache_slot;           // 缓存槽
        uint32_t lineno;               // 行号
        uint32_t num_args;             // 参数数量
        uint32_t fe_pos;               // foreach位置
        uint32_t fe_iter_idx;          // foreach迭代器索引
    } u2;
} zval;`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>类型系统与引用计数</SectionTitle>
        <BookParagraph>PHP类型系统定义了11种变量类型，使用引用计数管理内存。</BookParagraph>
        <BookCode language="c" code={`#define IS_UNDEF        0
#define IS_NULL         1
#define IS_FALSE        2
#define IS_TRUE         3
#define IS_LONG         4
#define IS_DOUBLE       5
#define IS_STRING       6
#define IS_ARRAY        7
#define IS_OBJECT       8
#define IS_RESOURCE     9
#define IS_REFERENCE    10

// PHP使用引用计数进行内存管理
static zend_always_inline void zval_add_ref(zval* pz) {
    if (Z_REFCOUNTED_P(pz)) {
        Z_REFCOUNT_P(pz)++;
    }
}

// 垃圾回收
static void gc_collect_cycles(void) {
    // 收集循环引用
    // 释放内存
}`} />
        <TagGrid items={['Zend引擎', 'AST', 'opcode', 'GC', '引用计数']} />
      </div>
    ),
  },
  {
    label: '内存管理',
    left: (
      <div className="space-y-4">
        <SectionTitle>内存管理</SectionTitle>
        <BookParagraph>PHP使用emalloc/efree进行内存分配和释放，通过引用计数管理变量生命周期。内存分配策略直接影响应用性能。</BookParagraph>
        <BookCode language="c" code={`// PHP使用emalloc/efree进行内存分配和释放
void* emalloc(size_t size) {
    void* ptr = malloc(size);
    if (!ptr) {
        zend_error_noreturn(E_ERROR, "Out of memory");
    }
    return ptr;
}

void efree(void* ptr) {
    free(ptr);
}

// 增加引用计数
static zend_always_inline void zval_add_ref(zval* pz) {
    if (Z_REFCOUNTED_P(pz)) {
        Z_REFCOUNT_P(pz)++;
    }
}

// 减少引用计数
static zend_always_inline void zval_del_ref(zval* pz) {
    if (Z_REFCOUNTED_P(pz) && --Z_REFCOUNT_P(pz) == 0) {
        zval_dtor(pz);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>内存泄漏检测</SectionTitle>
        <BookParagraph>使用Xdebug检测内存泄漏，通过unset及时释放不需要的变量。</BookParagraph>
        <BookCode language="php" code={`<?php
// Xdebug内存监控
xdebug_start_memory_monitor();

// 执行代码
$data = array_fill(0, 1000, "test");

// 获取内存使用情况
$memory = xdebug_get_memory_usage();
echo "Memory usage: " . $memory . " bytes\\n";

// 停止监控
xdebug_stop_memory_monitor();

// 内存优化：使用unset释放不需要的变量
function process_data($data) {
    $result = [];
    foreach ($data as $item) {
        $processed = process_item($item);
        $result[] = $processed;
        unset($processed); // 及时释放内存
    }
    return $result;
}
?>`} />
      </div>
    ),
  },
  {
    label: '垃圾回收',
    left: (
      <div className="space-y-4">
        <SectionTitle>垃圾回收</SectionTitle>
        <BookParagraph>PHP使用引用计数和循环引用检测进行垃圾回收。引用计数为0时内存自动释放，循环引用需要GC算法检测。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 引用计数示例
$a = "Hello";      // refcount = 1
$b = $a;           // refcount = 2
unset($a);         // refcount = 1
unset($b);         // refcount = 0, 内存被释放

// 2. 循环引用示例
class Node {
    public $next;
}

$a = new Node();
$b = new Node();
$a->next = $b;
$b->next = $a;

// 即使unset变量，由于循环引用，内存不会被释放
unset($a);
unset($b);

// 3. 手动触发垃圾回收
gc_collect_cycles();
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>GC配置与监控</SectionTitle>
        <BookParagraph>通过php.ini配置垃圾回收参数，使用内置函数监控GC状态和内存使用。</BookParagraph>
        <BookCode language="ini" code={`; php.ini配置
zend.enable_gc = On
gc_max_direct_roots = 10000
gc_max_cycles = 1000`} />
        <BookCode language="php" code={`<?php
// GC状态查询
echo "GC enabled: " . gc_enabled() . "\\n";
echo "GC runs: " . gc_collect_cycles() . "\\n";

// 内存使用情况
echo "Memory usage: " . memory_get_usage() . "\\n";
echo "Peak memory usage: " . memory_get_peak_usage() . "\\n";
?>`} />
        <TagGrid items={['垃圾回收', '循环引用', '引用计数', 'gc_collect_cycles', '内存']} />
      </div>
    ),
  },
  {
    label: '扩展开发',
    left: (
      <div className="space-y-4">
        <SectionTitle>扩展开发</SectionTitle>
        <BookParagraph>PHP扩展使用C语言编写，通过phpize工具链编译安装。扩展开发包括配置文件、头文件和源文件的编写。</BookParagraph>
        <BookCode language="bash" code={`# config.m4
PHP_ARG_ENABLE(myext, whether to enable myext support,
[  --enable-myext          Enable myext support])

if test "$PHP_MYEXT" = "yes"; then
    AC_DEFINE(HAVE_MYEXT, 1, [Whether you have myext])
    PHP_NEW_EXTENSION(myext, myext.c, $ext_shared)
fi`} />
        <BookCode language="c" code={`// php_myext.h
#ifndef PHP_MYEXT_H
#define PHP_MYEXT_H

extern zend_module_entry myext_module_entry;
#define phpext_myext_ptr &myext_module_entry
#define PHP_MYEXT_VERSION "1.0.0"

#ifdef PHP_WIN32
#   define PHP_MYEXT_API __declspec(dllexport)
#elif defined(__GNUC__) && __GNUC__ >= 4
#   define PHP_MYEXT_API __attribute__ ((visibility("default")))
#else
#   define PHP_MYEXT_API
#endif

#ifdef ZTS
#include "TSRM.h"
#endif

#endif`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>扩展实现与编译</SectionTitle>
        <BookParagraph>扩展源文件实现模块入口和自定义函数。</BookParagraph>
        <BookCode language="c" code={`// myext.c
#include "php.h"
#include "php_myext.h"

static zend_function_entry myext_functions[] = {
    PHP_FE(myext_hello, NULL)
    {NULL, NULL, NULL}
};

zend_module_entry myext_module_entry = {
    STANDARD_MODULE_HEADER,
    "myext",
    myext_functions,
    NULL, NULL, NULL, NULL, NULL,
    PHP_MYEXT_VERSION,
    STANDARD_MODULE_PROPERTIES
};

PHP_FUNCTION(myext_hello)
{
    php_printf("Hello from myext!\\n");
    RETURN_TRUE;
}`} />
        <BookParagraph>编译安装步骤：</BookParagraph>
        <BookCode language="bash" code={`phpize
./configure --enable-myext
make
make install`} />
        <TagGrid items={['扩展开发', 'phpize', 'config.m4', 'C扩展', 'PHP_API']} />
      </div>
    ),
  },
  {
    label: '性能优化',
    left: (
      <div className="space-y-4">
        <SectionTitle>性能优化</SectionTitle>
        <BookParagraph>通过代码优化、缓存策略和数据库查询优化提升PHP应用性能。</BookParagraph>
        <BookCode language="php" code={`<?php
// 1. 代码优化：避免在循环中创建对象
function process_items($items) {
    $processor = new Processor(); // 在循环外创建对象
    foreach ($items as $item) {
        $processor->process($item);
    }
}

// 使用引用避免复制
function process_array(&$array) {
    foreach ($array as &$value) {
        $value = process_value($value);
    }
}

// 2. 缓存策略：使用APCu缓存
function get_data($key) {
    $data = apcu_fetch($key, $success);
    if (!$success) {
        $data = fetch_from_database($key);
        apcu_store($key, $data, 3600); // 缓存1小时
    }
    return $data;
}

// 3. 数据库优化：使用预处理语句
function get_user($id) {
    static $stmt = null;
    if ($stmt === null) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    }
    $stmt->execute([$id]);
    return $stmt->fetch();
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>高级优化技巧</SectionTitle>
        <BookCode language="php" code={`<?php
// 4. 内存优化：及时释放大数组
function process_large_data() {
    $data = get_large_data();
    // 处理数据
    unset($data); // 及时释放内存
}

// 5. 使用生成器处理大数据
function process_large_file($file) {
    $handle = fopen($file, "r");
    while (!feof($handle)) {
        $line = fgets($handle);
        yield process_line($line);
    }
    fclose($handle);
}
?>`} />
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 如何优化PHP性能？</b>使用OPcache、优化代码、合理使用缓存、优化数据库查询。</BookParagraph>
        <BookParagraph><b>Q: 如何处理内存泄漏？</b>使用Xdebug检测、及时释放不需要的变量、避免循环引用。</BookParagraph>
        <BookParagraph><b>Q: 如何开发PHP扩展？</b>使用PHP扩展开发工具包、遵循扩展开发规范、进行充分测试。</BookParagraph>
      </div>
    ),
  },
  {
    label: '练习',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={['实现一个简单的PHP扩展', '优化一个存在性能问题的PHP应用', '实现一个内存泄漏检测工具', '开发一个性能分析工具']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>相关标签</SectionTitle>
        <TagGrid items={['Zend引擎', 'AST', 'opcode', 'GC', '引用计数', '内存管理', 'emalloc', 'Xdebug', 'unset', '垃圾回收', '循环引用', 'gc_collect_cycles', '内存', '扩展开发', 'phpize', 'config.m4', 'C扩展', 'PHP_API', '性能优化', 'OPcache', 'APCu', '生成器', '引用']} />
      </div>
    ),
  },
]

export default function PhpAdvancedInternalsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
