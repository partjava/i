'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'

const CHAPTERS = [
  { number: 1,  title: '开发环境配置',     description: '安装编译器与IDE配置',              href: '/study/computer/cpp/setup' },
  { number: 2,  title: '基础语法',          description: '程序结构、语句与注释',              href: '/study/computer/cpp/syntax' },
  { number: 3,  title: '变量和数据类型',    description: '基本类型与变量声明',                 href: '/study/computer/cpp/variables' },
  { number: 4,  title: '运算符',            description: '算术、关系、逻辑运算符',            href: '/study/computer/cpp/operators' },
  { number: 5,  title: '控制流程',          description: '条件分支与循环控制',                href: '/study/computer/cpp/control' },
  { number: 6,  title: '函数',              description: '函数定义、参数与重载',              href: '/study/computer/cpp/functions' },
  { number: 7,  title: '数组和字符串',      description: '一维/二维数组与字符串处理',         href: '/study/computer/cpp/arrays' },
  { number: 8,  title: '指针',              description: '指针运算与动态内存',                href: '/study/computer/cpp/pointers' },
  { number: 9,  title: '引用',              description: '引用类型与传参方式',                href: '/study/computer/cpp/references' },
  { number: 10, title: '结构体和类',        description: '自定义类型与数据封装',              href: '/study/computer/cpp/structs' },
  { number: 11, title: '面向对象编程',      description: '封装、继承、多态',                  href: '/study/computer/cpp/oop' },
  { number: 12, title: '模板编程',          description: '函数模板与类模板',                  href: '/study/computer/cpp/templates' },
  { number: 13, title: 'STL标准库',         description: '容器、迭代器、算法',                href: '/study/computer/cpp/stl' },
  { number: 14, title: '文件操作',          description: '文件读写与流操作',                  href: '/study/computer/cpp/file-io' },
  { number: 15, title: '异常处理',          description: '异常机制与安全编程',                href: '/study/computer/cpp/exceptions' },
  { number: 16, title: '智能指针',          description: 'RAII与内存安全管理',                href: '/study/computer/cpp/smart-pointers' },
  { number: 17, title: '多线程编程',        description: '线程、互斥、并发控制',              href: '/study/computer/cpp/multithreading' },
  { number: 18, title: '网络编程',          description: 'Socket与网络通信',                  href: '/study/computer/cpp/networking' },
  { number: 19, title: '项目实战',          description: '综合项目开发实践',                  href: '/study/computer/cpp/projects' },
  { number: 20, title: 'C++常用头文件',     description: '标准库头文件速查',                  href: '/study/computer/cpp/headers' },
]

export default function CppHomePage() {
  return (
    <BookCover
      title="C++ 编程"
      subtitle="C++ Programming Language"
      description="C++ 是一门强大的编程语言，广泛应用于系统开发、游戏开发、金融科技等领域。本课程将从零开始，系统性地学习现代 C++ 开发技能。"
      chapterCount={CHAPTERS.length}
      totalHours={36}
      chapters={CHAPTERS}
      icon="⚡"
      startHref="/study/computer/cpp/setup"
      theme={THEMES.computer}
    />
  )
}
