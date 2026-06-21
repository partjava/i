'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '编程入门', description: 'Python基础语法和编程概念', href: '/study/computer/python/intro' },
  { number: 2, title: '基础语法', description: '变量、数据类型、运算符等', href: '/study/computer/python/basic' },
  { number: 3, title: '数据类型和变量', description: '深入理解各种数据类型', href: '/study/computer/python/datatypes' },
  { number: 4, title: '控制流程', description: '条件语句、循环等控制结构', href: '/study/computer/python/control' },
  { number: 5, title: '函数和模块', description: '函数定义、参数、模块导入', href: '/study/computer/python/functions' },
  { number: 6, title: '文件操作', description: '文件读写、路径操作', href: '/study/computer/python/file-io' },
  { number: 7, title: '面向对象编程', description: '类、对象、继承、多态', href: '/study/computer/python/oop' },
  { number: 8, title: '异常处理', description: '错误处理机制和调试', href: '/study/computer/python/exceptions' },
  { number: 9, title: '标准库', description: '常用标准库模块', href: '/study/computer/python/stdlib' },
  { number: 10, title: '第三方库', description: 'pip、虚拟环境、包管理', href: '/study/computer/python/packages' },
  { number: 11, title: '项目实战', description: '完整项目开发实践', href: '/study/computer/python/projects' },
]

export default function PythonHomePage() {
  return (
    <BookCover
      title="Python 编程"
      subtitle="Python Programming Language"
      description="Python 是一门简洁优雅的编程语言，广泛应用于 Web 开发、数据分析、人工智能和自动化脚本等领域。本课程带你从零基础到掌握 Python 核心编程技能。"
      chapterCount={CHAPTERS.length}
      totalHours={28}
      chapters={CHAPTERS}
      icon="🐍"
      startHref="/study/computer/python/intro"
      theme={THEMES.computer}
    />
  )
}
