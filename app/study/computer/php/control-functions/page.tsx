'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '控制流程与函数', chapterNumber: 5, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '数据类型与变量', href: '/study/computer/php/datatypes' },
  nextChapter: { label: '数组与字符串', href: '/study/computer/php/arrays-strings' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '条件判断',
    left: (<div className="space-y-4"><PageTitle>条件判断</PageTitle><BookList items={['if/else、elseif结构', '三元运算符 ?:', 'switch多分支选择']} /><BookCode language="php" code={`<?php
$a = 10;
if ($a > 5) { echo "大于5"; }
elseif ($a == 5) { echo "等于5"; }
else { echo "小于5"; }
$b = ($a > 0) ? "正数" : "非正数";
switch ($a) {
  case 1: echo "一"; break;
  case 2: echo "二"; break;
  default: echo "其他";
}
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>循环结构</SectionTitle><BookList items={['for、while、do...while循环', 'foreach遍历数组', 'break、continue控制循环']} /><BookCode language="php" code={`<?php
for ($i = 0; $i < 3; $i++) { echo $i; }
$j = 0; while ($j < 3) { echo $j; $j++; }
$k = 0; do { echo $k; $k++; } while ($k < 3);
$arr = [1,2,3];
foreach ($arr as $v) { echo $v; }
foreach ($arr as $i => $v) { echo "$i:$v "; }
?>`} /><TagGrid items={['if', 'else', 'switch', 'for', 'foreach', 'while']} /></div>),
  },
  {
    label: '函数与参数',
    left: (<div className="space-y-4"><PageTitle>函数定义与调用</PageTitle><BookList items={['用function定义函数', '函数名区分大小写', '函数可嵌套定义']} /><BookCode language="php" code={`<?php
function add($a, $b) { return $a + $b; }
echo add(2, 3);

function outer() {
  function inner() { return 42; }
  return inner();
}
echo outer();
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>参数与返回值</SectionTitle><BookList items={['参数默认值、可变参数', '按值/引用传递', '返回值类型声明（PHP7+）']} /><BookCode language="php" code={`<?php
function greet($name = "Tom") { return "Hello, $name"; }
function sum(...$nums) { return array_sum($nums); }
function addRef(&$a) { $a++; }
$x = 1; addRef($x);
function foo(): int { return 123; }
?>`} /><TagGrid items={['函数', '参数', '返回值', '引用', '类型声明']} /></div>),
  },
  {
    label: '匿名函数与示例',
    left: (<div className="space-y-4"><PageTitle>匿名函数与闭包</PageTitle><BookList items={['匿名函数可赋值给变量、作为参数传递', '闭包可用use引入外部变量']} /><BookCode language="php" code={`<?php
$f = function($x) { return $x * $x; };
echo $f(5);
$y = 10;
$g = function($z) use ($y) { return $z + $y; };
echo $g(2);
function apply($fn, $v) { return $fn($v); }
echo apply(function($n) { return $n*2; }, 6);
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>综合代码示例</SectionTitle><BookCode language="php" code={`<?php
// if/else
$a = 5;
if ($a > 0) { echo "正数"; }
// for循环
for ($i=0; $i<3; $i++) { echo $i; }
// 函数定义
function square($x) { return $x*$x; }
echo square(4);
// 匿名函数
$f = function($x) { return $x+1; };
echo $f(10);
// 闭包
$y = 7;
$g = function($z) use ($y) { return $z + $y; };
echo $g(3);
?>`} /><TagGrid items={['匿名函数', '闭包', 'use', '箭头函数', '示例']} /></div>),
  },
  {
    label: 'FAQ与练习',
    left: (<div className="space-y-4"><PageTitle>常见问题</PageTitle><BookParagraph><b>PHP函数可以嵌套定义吗？</b>可以，函数内部可再定义函数。</BookParagraph><BookParagraph><b>匿名函数和闭包有什么区别？</b>闭包可捕获外部变量，匿名函数不一定。</BookParagraph><BookParagraph><b>函数参数如何按引用传递？</b>用&amp;修饰参数。</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>练习</SectionTitle><BookList items={['写一个函数，判断一个数是否为偶数', '用for循环输出1~10的所有奇数', '定义一个匿名函数实现数组每个元素加1', '用闭包实现累加器函数']} /><TagGrid items={['练习', '偶数', '循环', '匿名函数', '累加器']} /></div>),
  },
]

export default function PhpControlFunctionsPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
