'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '编程入门', description: 'Java基础语法和面向对象概念', href: '/study/computer/java/intro' },
  { number: 2, title: '基础语法', description: '变量、数据类型、运算符', href: '/study/computer/java/basic' },
  { number: 3, title: '流程控制', description: '条件语句、循环控制', href: '/study/computer/java/control' },
  { number: 4, title: '面向对象', description: '类、对象、继承、多态、封装', href: '/study/computer/java/oop' },
  { number: 5, title: '常用类与集合', description: 'List、Set、Map等集合框架', href: '/study/computer/java/collections' },
  { number: 6, title: '异常处理', description: 'try-catch、自定义异常', href: '/study/computer/java/exceptions' },
  { number: 7, title: '文件与IO', description: '文件读写、流操作、NIO', href: '/study/computer/java/file-io' },
  { number: 8, title: '多线程与并发', description: '线程创建、同步、线程池', href: '/study/computer/java/thread' },
  { number: 9, title: '网络编程', description: 'Socket编程、HTTP客户端', href: '/study/computer/java/network' },
  { number: 10, title: '项目实战', description: 'Spring Boot项目开发实践', href: '/study/computer/java/projects' },
]

export default function JavaHomePage() {
  return (
    <BookCover
      title="Java 编程"
      subtitle="Java Programming Language"
      description="Java 是一门跨平台的面向对象编程语言，拥有庞大的生态系统。从企业级应用到 Android 开发，Java 无处不在。本课程系统性地讲解 Java 核心技术。"
      chapterCount={CHAPTERS.length}
      totalHours={25}
      chapters={CHAPTERS}
      icon="☕"
      startHref="/study/computer/java/intro"
      theme={THEMES.computer}
    />
  )
}
