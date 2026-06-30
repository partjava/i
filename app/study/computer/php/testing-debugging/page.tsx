'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '测试与调试', chapterNumber: 15, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '安全与性能优化', href: '/study/computer/php/security-performance' },
  nextChapter: { label: '框架与项目实战', href: '/study/computer/php/frameworks-projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '单元测试',
    left: (<div className="space-y-4"><PageTitle>单元测试</PageTitle><BookParagraph>PHPUnit是PHP最流行的单元测试框架。</BookParagraph><BookCode language="php" code={`<?php
use PHPUnit\\Framework\\TestCase;

class CalculatorTest extends TestCase {
    public function testAdd() {
        $this->assertEquals(4, add(2, 2));
    }
    public function testDivideByZero() {
        $this->expectException(\\InvalidArgumentException::class);
        divide(1, 0);
    }
}
// 运行: vendor/bin/phpunit
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>调试工具</SectionTitle><BookCode language="php" code={`<?php
// var_dump/print_r
var_dump($var);
print_r($arr);

// 调试函数
debug_backtrace(); // 查看调用栈
debug_zval_refs($var); // 查看引用

// Xdebug配置
xdebug.mode=debug
xdebug.start_with_request=yes

// Symfony VarDumper
dump($var); dd($var); // dump and die
?>`} /><TagGrid items={['PHPUnit', 'Xdebug', 'var_dump', 'Monolog', 'dd']} /></div>),
  },
  {
    label: '日志与性能',
    left: (<div className="space-y-4"><SectionTitle>日志记录</SectionTitle><BookCode language="php" code={`<?php
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

$log = new Logger('app');
$log->pushHandler(new StreamHandler('app.log', Logger::WARNING));
$log->warning("警告消息");
$log->error("错误消息", ['code' => 500]);
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>性能分析</SectionTitle><BookCode language="php" code={`<?php
// XHProf/XDebug profiling
// 开启：xhprof_enable()
// 结束：$data = xhprof_disable()

// 内存使用
memory_get_usage();
memory_get_peak_usage();

// SQL分析
EXPLAIN SELECT * FROM users WHERE id = 1;
?>`} /><TagGrid items={['Monolog', 'XHProf', 'memory', 'profiling', 'EXPLAIN']} /></div>),
  },
]

export default function PhpTestingDebuggingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
