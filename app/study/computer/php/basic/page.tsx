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
  chapterTitle: '基础语法与数据类型',
  chapterNumber: 3,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '开发环境配置', href: '/study/computer/php/setup' },
  nextChapter: { label: '数据类型与变量', href: '/study/computer/php/datatypes' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '语法基础与变量',
    left: (
      <div className="space-y-4">
        <PageTitle>语法基础</PageTitle>
        <BookParagraph>PHP代码嵌入在&lt;?php ... ?&gt;标签中，文件以.php为后缀。</BookParagraph>
        <BookCode language="php" code={`<?php
// PHP代码以分号结尾
echo "Hello, PHP!";
// 可嵌入HTML
?><h1><?php echo $title; ?></h1>`} />
        <BookList items={['PHP代码以?&gt;可切换回HTML模式', '每行语句以分号结尾', 'echo/print用于输出']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>变量与常量</SectionTitle>
        <BookCode language="php" code={`<?php
$name = "PHP";             // 变量以$开头
$count = 42;               // 无需声明类型
define("SITE_NAME", "PHP"); // 常量
const VERSION = "8.2";      // PHP 7+常量

echo $name, SITE_NAME;      // 变量区分大小写
?>`} />
        <BookList items={['变量以$开头，无需声明类型', 'define()和const定义常量', '变量名区分大小写']} />
        <TagGrid items={['PHP标签', '变量', '常量', 'echo', '输出']} />
      </div>
    ),
  },
  {
    label: '数据类型与运算符',
    left: (
      <div className="space-y-4">
        <PageTitle>数据类型</PageTitle>
        <BookParagraph>PHP支持多种数据类型，包括标量类型和复合类型。</BookParagraph>
        <BookList items={['标量：int、float、string、bool', '复合：array、object、callable', '特殊：null、resource']} />
        <BookCode language="php" code={`<?php
$int = 42;             // 整型
$float = 3.14;         // 浮点
$str = "PHP";          // 字符串
$bool = true;          // 布尔
$arr = [1, 2, 3];      // 数组
$null = null;          // null
var_dump($int);        // 查看类型和值
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>类型转换</SectionTitle>
        <BookCode language="php" code={`<?php
$num = (int)"123";     // 强制转int
$str = (string)456;    // 转字符串
$f = floatval("3.14"); // 转浮点
$b = boolval(1);       // 转布尔

// 自动类型转换
echo "总数: " . (10 + "20人"); // 30
?>`} />
        <SectionTitle>运算符</SectionTitle>
        <BookCode language="php" code={`<?php
$a = 10; $b = 3;
echo $a + $b; // 13
echo $a % $b; // 1
echo $a . "元"; // 连接符
echo $a ** 2;  // 幂运算
?>`} />
        <TagGrid items={['int', 'float', 'string', 'bool', '类型转换']} />
      </div>
    ),
  },
  {
    label: '示例与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <BookCode language="php" code={`<?php
$name = "PHP";
$version = 8.2;
$features = ["简单", "快速", "灵活"];
echo "欢迎来到$name $version!\\n";
foreach ($features as $feat) {
    echo "- $feat\\n";
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookList items={['声明一个字符串变量并输出', '实现两个数的加法并输出结果', '使用var_dump查看变量类型']} />
        <TagGrid items={['示例', '练习', '变量', 'var_dump', '输出']} />
      </div>
    ),
  },
]

export default function PhpBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
