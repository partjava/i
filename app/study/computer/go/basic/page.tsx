'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: '基础语法',
  chapterNumber: 3,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '开发环境配置', href: '/study/computer/go/setup' },
  nextChapter: { label: '数据类型', href: '/study/computer/go/datatypes' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '程序结构与变量',
    left: (
      <div className="space-y-4">
        <PageTitle>Go程序结构</PageTitle>
        <BookParagraph>Go程序由包声明、导入、函数等组成，main包为程序入口。</BookParagraph>
        <BookCode language="go" code={`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`} />
        <BookList items={[
          '每个Go文件必须属于一个包（package）',
          'main包和main函数是可执行程序的入口',
          'import用于导入标准库或第三方包',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>变量与常量</SectionTitle>
        <BookParagraph>Go支持多种变量声明方式和常量定义。</BookParagraph>
        <BookCode language="go" code={`var a int = 10
var b = 20 // 类型自动推断
c := 30    // 简短声明

const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)`} />
        <BookList items={[
          'var声明变量，可指定类型或自动推断',
          ':=为简短声明，只能在函数体内使用',
          'const定义常量，值不可变',
        ]} />
        <TagGrid items={['package', 'import', 'var', 'const', '简短声明']} />
      </div>
    ),
  },
  {
    label: '数据类型与运算符',
    left: (
      <div className="space-y-4">
        <PageTitle>基本数据类型</PageTitle>
        <BookParagraph>Go内置多种基本类型。</BookParagraph>
        <BookCode language="go" code={`// 整型
var i int = 100
var u uint = 200
// 浮点型
var f float64 = 3.14
// 布尔型
var b bool = true
// 字符串
var s string = "Go语言"
// 零值
var x int    // 0
var y string // ""`} />
        <BookList items={['int/uint/float/bool/string为常用类型', '变量声明未赋值时有零值']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>运算符与表达式</SectionTitle>
        <BookParagraph>Go支持算术、关系、逻辑、位运算等。</BookParagraph>
        <BookCode language="go" code={`a, b := 5, 2
sum := a + b      // 加法
sub := a - b      // 减法
mul := a * b      // 乘法
div := a / b      // 除法
mod := a % b      // 取余

eq := a == b      // 相等
neq := a != b     // 不等
and := a > 0 && b > 0 // 逻辑与
or := a > 0 || b > 0  // 逻辑或
not := !(a > 0)       // 逻辑非`} />
        <BookList items={['支持常见算术、关系、逻辑运算', '还支持位运算（&、|、^、&^）']} />
        <TagGrid items={['整型', '浮点', '布尔', '字符串', '运算符']} />
      </div>
    ),
  },
  {
    label: '输入输出与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>输入输出</PageTitle>
        <BookParagraph>Go常用fmt包进行输入输出。</BookParagraph>
        <BookCode language="go" code={`import "fmt"

func main() {
    var name string
    fmt.Print("请输入姓名：")
    fmt.Scanln(&name)
    fmt.Println("你好，", name)
}`} />
        <BookList items={['fmt.Print/Println输出内容', 'fmt.Scan/Scanln读取输入']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Go变量必须先声明再使用吗？</b>是的，Go是强类型语言，变量必须声明。</BookParagraph>
        <BookParagraph><b>:=和var的区别？</b>:=只能在函数体内用，var可全局或局部。</BookParagraph>
        <BookParagraph><b>字符串能用单引号吗？</b>不行，Go字符串必须用双引号，单引号用于rune。</BookParagraph>
        <TagGrid items={['fmt', '输入', '输出', 'Scanln', 'Println']} />
      </div>
    ),
  },
]

export default function GoBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
