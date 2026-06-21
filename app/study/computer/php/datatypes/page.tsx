'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP',
  chapterTitle: '数据类型与变量',
  chapterNumber: 4,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '基础语法与数据类型', href: '/study/computer/php/basic' },
  nextChapter: { label: '控制流程与函数', href: '/study/computer/php/control-functions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数据类型与作用域',
    left: (
      <div className="space-y-4">
        <PageTitle>数据类型详解</PageTitle>
        <BookCode language="php" code={`<?php
// 标量类型
$int = 42; $float = 3.14;
$str = "Hello"; $bool = true;
// 复合类型
$arr = [1, 2, 3];        // 数组
$obj = new stdClass();    // 对象
// 特殊类型
$null = null;             // null
$res = fopen("file","r"); // resource
?>`} />
        <SectionTitle>变量作用域</SectionTitle>
        <BookCode language="php" code={`<?php
$global = "全局";          // 全局作用域
function test() {
    global $global;       // 访问全局变量
    static $count = 0;    // 静态变量
    $count++; echo $count;
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>类型判断与转换</SectionTitle>
        <BookCode language="php" code={`<?php
is_int(42);      // true
is_string("a");  // true
is_array([1]);   // true
gettype($var);   // 返回类型名
settype($var, "int"); // 设置类型

// 强制转换
$int = (int)"123";
$str = (string)456;
?>`} />
        <TagGrid items={['类型', '作用域', 'global', 'static', 'type hint']} />
      </div>
    ),
  },
  {
    label: '数组与字符串操作',
    left: (
      <div className="space-y-4">
        <PageTitle>数组操作</PageTitle>
        <BookCode language="php" code={`<?php
$arr = [1, 2, 3];
array_push($arr, 4);     // 追加
$val = array_pop($arr);  // 弹出
sort($arr);              // 排序
$map = array_map(fn($x) => $x*2, $arr);
$filtered = array_filter($arr, fn($x) => $x>1);
$reduced = array_reduce($arr, fn($c,$i)=>$c+$i, 0);
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>字符串操作</SectionTitle>
        <BookCode language="php" code={`<?php
$s = "Hello PHP";
strlen($s);            // 长度
strpos($s, "PHP");     // 查找位置
substr($s, 0, 5);      // 子串
str_replace("PHP","World",$s); // 替换
explode(" ", $s);      // 分割
implode(",", ["a","b"]); // 连接
trim("  text  ");      // 去空格
?>`} />
        <TagGrid items={['数组', '字符串', 'array_map', 'strlen', 'explode']} />
      </div>
    ),
  },
  {
    label: '练习与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={['定义一个数组并排序输出', '使用字符串函数处理文本', '练习global和static变量']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>PHP数组和JS数组区别？</b>PHP数组既有索引又有键值对功能，更像哈希表。</BookParagraph>
        <BookParagraph><b>什么是类型 juggling？</b>PHP自动类型转换，如"1" + 2 = 3。</BookParagraph>
        <TagGrid items={['练习', 'FAQ', '类型 juggling', '哈希表', '数组']} />
      </div>
    ),
  },
]

export default function PhpDatatypesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
