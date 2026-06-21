'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP',
  chapterTitle: '常见问题与面试题',
  chapterNumber: 22,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '云原生与容器化', href: '/study/computer/php/cloud-docker' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: PHP 7和PHP 8的主要区别是什么？</b><br />A: PHP 8引入了许多新特性，包括JIT编译器、联合类型、命名参数、属性(Attributes)、构造器属性提升、匹配表达式(match)、Nullsafe运算符，以及字符串与数字比较更严格等。</BookParagraph>
        <BookParagraph><b>Q: 如何优化PHP应用的性能？</b><br />A: 使用OPcache加速脚本执行、优化数据库查询、实现缓存机制、使用异步处理、代码优化、使用CDN、启用HTTP/2，以及使用Swoole等高性能框架。</BookParagraph>
        <BookParagraph><b>Q: 如何处理PHP中的内存泄漏？</b><br />A: 使用内存分析工具、及时释放资源、避免循环引用、使用unset()释放变量、监控内存使用、优化数据结构、以及利用垃圾回收机制。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>PHP生命周期与垃圾回收</SectionTitle>
        <BookParagraph><b>PHP生命周期：</b>包含模块初始化、请求初始化、脚本执行、请求关闭、模块关闭五个阶段。</BookParagraph>
        <BookParagraph><b>垃圾回收机制：</b>PHP使用引用计数和循环引用检测的垃圾回收机制。每个变量都有引用计数，当引用计数为0时内存被释放，使用标记清除算法处理循环引用，垃圾回收在特定条件下触发。</BookParagraph>
        <BookParagraph><b>命名空间：</b>解决命名冲突、组织代码结构、实现自动加载、提高代码可维护性。</BookParagraph>
        <TagGrid items={['PHP 8', 'JIT', 'OPcache', '生命周期', '垃圾回收', '命名空间']} />
      </div>
    ),
  },
  {
    label: '面试题与算法',
    left: (
      <div className="space-y-4">
        <PageTitle>面试题</PageTitle>
        <BookParagraph><b>Q: 解释PHP的生命周期？</b><br />A: PHP生命周期包括模块初始化（加载扩展和配置）、请求初始化（设置环境变量）、脚本执行（编译执行PHP代码）、请求关闭（清理资源）、模块关闭（释放扩展资源）。</BookParagraph>
        <BookParagraph><b>Q: 解释PHP的垃圾回收机制？</b><br />A: PHP使用引用计数和循环引用检测的垃圾回收机制。每个变量都有引用计数，当引用计数为0时内存被释放，使用标记清除算法处理循环引用。</BookParagraph>
        <BookParagraph><b>Q: 解释PHP的命名空间？</b><br />A: 命名空间用于解决命名冲突、组织代码结构、实现自动加载和提高代码可维护性。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>算法题</SectionTitle>
        <BookParagraph><b>1. 快速排序</b></BookParagraph>
        <BookCode language="php" code={`<?php
function quickSort($array) {
    if (count($array) <= 1) {
        return $array;
    }
    $pivot = $array[0];
    $left = $right = [];
    for ($i = 1; $i < count($array); $i++) {
        if ($array[$i] < $pivot) {
            $left[] = $array[$i];
        } else {
            $right[] = $array[$i];
        }
    }
    return array_merge(quickSort($left), [$pivot], quickSort($right));
}
?>`} />
        <BookParagraph><b>2. 二分查找</b></BookParagraph>
        <BookCode language="php" code={`<?php
function binarySearch($array, $target) {
    $left = 0;
    $right = count($array) - 1;
    while ($left <= $right) {
        $mid = floor(($left + $right) / 2);
        if ($array[$mid] == $target) {
            return $mid;
        }
        if ($array[$mid] < $target) {
            $left = $mid + 1;
        } else {
            $right = $mid - 1;
        }
    }
    return -1;
}
?>`} />
      </div>
    ),
  },
  {
    label: '系统设计与最佳实践',
    left: (
      <div className="space-y-4">
        <SectionTitle>系统设计</SectionTitle>
        <BookParagraph><b>1. 设计高并发Web应用</b>：使用负载均衡、实现缓存层、数据库分片、异步处理、使用消息队列、CDN加速、微服务架构。</BookParagraph>
        <BookParagraph><b>2. 设计分布式缓存系统</b>：一致性哈希、数据分片、复制策略、失效处理、监控系统、故障转移。</BookParagraph>
        <BookList items={[
          '高并发系统：使用消息队列、Redis缓存、读写分离',
          '分布式缓存：缓存穿透、雪崩、击穿防护',
          '微服务架构：服务拆分、API网关、服务治理',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>最佳实践</SectionTitle>
        <BookParagraph><b>1. 代码规范</b></BookParagraph>
        <BookList items={[
          '遵循PSR标准',
          '使用类型声明',
          '编写单元测试',
          '文档注释',
          '代码审查',
          '持续集成',
        ]} />
        <BookParagraph><b>2. 安全实践</b></BookParagraph>
        <BookList items={[
          '输入验证',
          '输出转义',
          '使用预处理语句',
          'CSRF防护',
          'XSS防护',
          '密码加密',
        ]} />
      </div>
    ),
  },
  {
    label: '代码审查与练习',
    left: (
      <div className="space-y-4">
        <SectionTitle>代码审查</SectionTitle>
        <BookParagraph><b>1. 代码质量检查点</b></BookParagraph>
        <BookList items={[
          '代码可读性',
          '性能问题',
          '安全问题',
          '错误处理',
          '测试覆盖',
          '文档完整性',
        ]} />
        <BookParagraph><b>2. 常见代码问题</b></BookParagraph>
        <BookList items={[
          '重复代码',
          '过长函数',
          '复杂条件',
          '魔法数字',
          '命名不规范',
          '注释不足',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>1. 算法练习</b></BookParagraph>
        <BookList items={[
          '实现常见排序算法',
          '解决动态规划问题',
          '实现数据结构',
          '解决字符串问题',
        ]} />
        <BookParagraph><b>2. 系统设计练习</b></BookParagraph>
        <BookList items={[
          '设计短链接系统',
          '设计秒杀系统',
          '设计搜索引擎',
          '设计即时通讯系统',
        ]} />
        <TagGrid items={['面试', '算法', '排序', '查找', '系统设计', '高并发', '安全', '代码规范', '代码审查', '练习']} />
      </div>
    ),
  },
]

export default function PhpFaqPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }
