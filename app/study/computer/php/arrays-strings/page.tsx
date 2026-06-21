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
  chapterTitle: '数组与字符串',
  chapterNumber: 6,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '控制流程与函数', href: '/study/computer/php/control-functions' },
  nextChapter: { label: '面向对象编程', href: '/study/computer/php/oop' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数组基础与操作',
    left: (
      <div className="space-y-4">
        <PageTitle>数组基础</PageTitle>
        <BookParagraph>PHP数组兼具索引数组和关联数组功能，支持多维数组和丰富的操作函数。</BookParagraph>
        <BookCode language="php" code={`<?php
// 索引数组
$arr = [1, 2, 3];
// 关联数组
$user = ["name" => "Tom", "age" => 20];
// 多维数组
$matrix = [[1,2], [3,4]];
// 遍历
foreach ($arr as $v) { echo $v; }
foreach ($user as $k => $v) { echo "$k: $v"; }
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数组操作函数</SectionTitle>
        <BookCode language="php" code={`<?php
$arr = [3, 1, 4, 1, 5];
sort($arr);                // 排序
rsort($arr);               // 反向排序
count($arr);               // 元素个数
in_array(3, $arr);         // 是否包含
array_merge($a, $b);       // 合并数组
array_unique($arr);        // 去重
array_map(fn($x)=>$x*2, $arr);
array_filter($arr, fn($x)=>$x>2);
array_keys($user);         // 获取所有键
array_values($user);       // 获取所有值
?>`} />
        <TagGrid items={['数组', 'foreach', 'sort', 'merge', 'map']} />
      </div>
    ),
  },
  {
    label: '字符串操作与转换',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串基础</PageTitle>
        <BookCode language="php" code={`<?php
// 定义字符串
$s1 = '单引号';
$s2 = "双引号支持变量 $s1";
$s3 = <<<EOT
Nowdoc/heredoc语法
EOT;

// 转义
echo "换行符\\n";
echo "制表符\\t";
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>字符串操作函数</SectionTitle>
        <BookCode language="php" code={`<?php
$s = "Hello PHP World";
strlen($s);              // 长度
strpos($s, "PHP");       // 位置
substr($s, 6, 3);        // 截取
str_replace("PHP","Go",$s);
strtolower($s);          // 小写
strtoupper($s);          // 大写
trim($s);                // 去空格

// 数组与字符串互转
$arr = explode(" ", $s);
$str = implode(",", $arr);
?>`} />
        <TagGrid items={['字符串', 'strlen', 'substr', 'explode', 'implode']} />
      </div>
    ),
  },
  {
    label: '综合示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合代码示例</PageTitle>
        <BookParagraph>结合数组和字符串操作的完整示例。</BookParagraph>
        <BookCode language="php" code={`<?php
// 数组操作
$arr = [1,2,3];
array_push($arr, 4);
sort($arr);
foreach ($arr as $v) { echo $v; }

// 字符串操作
$s = "hello,php";
$parts = explode(",", $s);
echo implode("-", $parts);
echo strtoupper($s);
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数组与字符串互转</SectionTitle>
        <BookParagraph>使用explode将字符串转为数组，使用implode将数组转为字符串，是实现数据格式转换的常用手段。</BookParagraph>
        <BookCode language="php" code={`<?php
$s = "a,b,c";
$arr = explode(",", $s);
print_r($arr);

echo implode("-", $arr);
?>`} />
      </div>
    ),
  },
  {
    label: 'FAQ与练习',
    left: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: PHP数组和字符串能互转吗？</b>用explode和implode即可实现。</BookParagraph>
        <BookParagraph><b>Q: 如何判断字符串中是否包含某子串？</b>用strpos函数，返回不为false即包含。</BookParagraph>
        <BookParagraph><b>Q: 数组遍历时如何同时获得下标和值？</b>用foreach($arr as $k =&gt; $v)。</BookParagraph>
        <BookParagraph><b>Q: 单引号和双引号区别？</b>双引号解析变量和转义字符，单引号输出原始内容。</BookParagraph>
        <BookParagraph><b>Q: array_map和array_filter区别？</b>map转换每个元素，filter过滤满足条件的元素。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={['定义一个关联数组，输出所有键值对', '用sort对数组排序并输出', '将字符串"a,b,c"转为数组并用-连接输出', '统计字符串长度并将其全部转为大写', '合并两个数组并去重', '统计字符串中字符出现次数', '用array_map实现平方计算']} />
        <TagGrid items={['练习', 'FAQ', '数组', '字符串', 'explode', 'implode', 'sort', 'array_map']} />
      </div>
    ),
  },
]

export default function PhpArraysStringsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
