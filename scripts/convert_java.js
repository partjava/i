const fs = require('fs')
const path = require('path')

const chapters = [
  { dir: 'intro', title: '编程入门', num: 1, intro: 'Java是一门广泛应用于企业级开发、移动端、Web和大数据等领域的面向对象编程语言。其跨平台、稳定、安全的特性使其成为全球最受欢迎的编程语言之一。本章将从零开始，带你搭建开发环境，编写第一个Java程序。' },
  { dir: 'basic', title: '基础语法', num: 2, intro: 'Java的基础语法是学习这门语言的第一步。本章将深入讲解变量、数据类型、运算符等核心概念，帮助你打好扎实的Java编程基础。' },
  { dir: 'control', title: '流程控制', num: 3, intro: '流程控制是编程语言的核心结构之一。本章将详细讲解条件语句、循环语句和跳转语句的用法，让你能够编写具有复杂逻辑的Java程序。' },
  { dir: 'oop', title: '面向对象', num: 4, intro: 'Java是一门纯粹的面向对象编程语言。本章将系统讲解类与对象、封装、继承、多态等OOP核心概念，这是掌握Java的关键所在。' },
  { dir: 'collections', title: '常用类与集合', num: 5, intro: 'Java提供了丰富的集合框架和常用类库。本章将深入讲解List、Set、Map等集合的使用，以及String、Math等常用工具类。' },
  { dir: 'exceptions', title: '异常处理', num: 6, intro: '异常处理是编写健壮Java程序的必备技能。本章将讲解try-catch-finally机制、自定义异常以及最佳实践。' },
  { dir: 'file-io', title: '文件与IO', num: 7, intro: 'Java的IO体系强大而完整。本章将涵盖文件读写、流操作、NIO等内容，让你能够灵活处理各种输入输出场景。' },
  { dir: 'thread', title: '多线程与并发', num: 8, intro: '多线程编程是提升程序性能的重要手段。本章将讲解线程创建、同步机制、线程池以及并发工具类的使用。' },
  { dir: 'network', title: '网络编程', num: 9, intro: '网络编程是现代应用开发的基础。本章将讲解Socket编程、HTTP通信以及Netty框架的基本使用。' },
  { dir: 'projects', title: '项目实战', num: 10, intro: '将所学知识综合运用才是真正的掌握。本章将带领你完成一个完整的Java项目，涵盖从设计到实现的各个环节。' },
]

const template = (ch) => `'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程',
  chapterTitle: '${ch.title}',
  chapterNumber: ${ch.num},
  totalChapters: 10,
  subjectHref: '/study/computer/java',
${ch.num > 1 ? `  prevChapter: { label: '${chapters[ch.num-2].title}', href: '/study/computer/java/${chapters[ch.num-2].dir}' },` : ''}
${ch.num < 10 ? `  nextChapter: { label: '${chapters[ch.num].title}', href: '/study/computer/java/${chapters[ch.num].dir}' },` : ''}
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '章节概览',
    left: (
      <div className="space-y-4">
        <PageTitle>${ch.title}</PageTitle>
        <BookParagraph>${ch.intro}</BookParagraph>
        <BookAlert type="info" message="本章是Java编程的核心内容之一，建议结合代码示例动手实践" />
        <h3 className="text-sm font-medium text-ink">本章要点</h3>
        <BookList items={[
          '理解基本概念和原理',
          '掌握核心语法和API',
          '完成课后练习题',
          '结合实际项目应用',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>前置知识</PageTitle>
        <BookParagraph>学习本章前，建议先掌握以下内容：</BookParagraph>
        <BookList items={[
          '基本的编程思维',
          '计算机基础知识',
          '开发环境的基本使用',
        ]} />
        <BookDivider />
        <h3 className="text-sm font-medium text-ink">学习目标</h3>
        <TagGrid items={['基础语法', '核心概念', '动手实践', '代码规范']} />
      </div>
    ),
  },
  {
    label: '内容详解',
    left: (
      <div className="space-y-4">
        <PageTitle>核心知识点</PageTitle>
        <BookParagraph>本章涵盖的主要知识点包括基础概念、核心语法、常见API和最佳实践。通过系统学习，你将建立起完整的知识体系。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`/**
 * ${ch.title} - 示例代码
 * 展示本章的核心概念
 */
public class ${ch.title.replace(/[\\u4e00-\\u9fa5]/g, '')}Demo {
    public static void main(String[] args) {
        System.out.println("学习${ch.title}");
        // 这里是核心代码示例
        ${ch.num > 3 ? '// 面向对象相关代码' : '// 基础语法相关代码'}
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>代码示例</PageTitle>
        <BookParagraph>通过实际的代码示例来加深理解：</BookParagraph>
        <BookCode language="java" showLineNumbers code={`// 基础示例
int result = 0;
for (int i = 0; i < 10; i++) {
    result += i;
    System.out.println("第" + (i+1) + "次: " + result);
}

// 输出结果
System.out.println("最终结果: " + result);`} />
        <BookAlert type="success" message="动手运行这段代码，观察输出结果，理解程序执行流程" />
      </div>
    ),
  },
  {
    label: '总结练习',
    left: (
      <div className="space-y-4">
        <PageTitle>知识总结</PageTitle>
        <BookParagraph>本章学习了${ch.title}的核心内容，以下是对关键知识点的总结：</BookParagraph>
        <BookList items={[
          '理解核心概念和基本原理',
          '掌握常见API和工具类的使用',
          '能够独立编写相关代码',
          '了解最佳实践和常见陷阱',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '编写代码验证本章所学概念',
            '完成相关的编程练习题',
            '尝试用不同方式实现相同功能',
            '思考如何应用到实际项目中',
          ]} />
        </div>
        <BookAlert type="warning" message="编程能力的提升来自大量实践，请务必亲自动手编写代码" />
        <TagGrid items={['${ch.title}', 'Java', '编程实践', '课后练习']} />
      </div>
    ),
  },
]

export default function Java${ch.title.replace(/[\\u4e00-\\u9fa5]/g, '')}Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
`

chapters.forEach(ch => {
  const filePath = path.join('app/study/computer/java', ch.dir, 'page.tsx')
  const content = template(ch)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log('✅ Java/' + ch.dir)
})
