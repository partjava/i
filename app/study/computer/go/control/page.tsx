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
  chapterTitle: '控制流程',
  chapterNumber: 5,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '数据类型', href: '/study/computer/go/datatypes' },
  nextChapter: { label: '函数与方法', href: '/study/computer/go/functions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'if/else与for循环',
    left: (
      <div className="space-y-4">
        <PageTitle>if/else 条件判断</PageTitle>
        <BookParagraph>Go语言的if语句支持条件判断和变量简短声明。</BookParagraph>
        <BookCode language="go" code={`// 基本用法
if a > 0 {
    fmt.Println("正数")
} else if a == 0 {
    fmt.Println("零")
} else {
    fmt.Println("负数")
}
// 支持在if中声明变量
if b := 10; b > 5 {
    fmt.Println("b大于5")
}`} />
        <BookList items={['if后条件无需括号，代码块必须用{}', '支持在if语句内声明并初始化变量', 'else if/else用法与主流语言一致']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>for循环</SectionTitle>
        <BookParagraph>Go只有for一种循环语句，可实现所有循环功能。</BookParagraph>
        <BookCode language="go" code={`// 经典for循环
for i := 0; i < 5; i++ {
    fmt.Println(i)
}
// 作为while用法
n := 1
for n < 5 { fmt.Println(n); n++ }
// 无限循环
for { fmt.Println("无限循环"); break }
// range遍历
arr := []int{1, 2, 3}
for idx, val := range arr {
    fmt.Println(idx, val)
}`} />
        <BookList items={['for可省略任意部分，支持多种写法', 'range用于遍历数组、切片、字符串、Map等', '没有while和do-while，全部用for实现']} />
        <TagGrid items={['if', 'else', 'for', 'range', '条件']} />
      </div>
    ),
  },
  {
    label: 'switch与控制',
    left: (
      <div className="space-y-4">
        <PageTitle>switch语句</PageTitle>
        <BookParagraph>Go的switch语句功能强大，支持多分支、表达式、类型分支等。</BookParagraph>
        <BookCode language="go" code={`// 基本用法
switch day := 3; day {
case 1: fmt.Println("Monday")
case 2: fmt.Println("Tuesday")
case 3, 4, 5: fmt.Println("Midweek")
default: fmt.Println("Other")
}
// 类型switch
var x interface{} = 10
switch v := x.(type) {
case int: fmt.Println("int", v)
case string: fmt.Println("string", v)
default: fmt.Println("other")
}`} />
        <BookList items={['case可合并，支持逗号分隔多个值', '支持表达式和类型switch', 'case后无需break，自动终止分支']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>break/continue/goto</SectionTitle>
        <BookCode language="go" code={`// break跳出循环
for i := 0; i < 10; i++ {
    if i == 5 { break }
    fmt.Println(i)
}
// continue跳过本次
for i := 0; i < 5; i++ {
    if i%2 == 0 { continue }
    fmt.Println(i)
}
// goto跳转
var n = 0
LOOP: fmt.Println(n); n++
if n < 3 { goto LOOP }`} />
        <BookList items={['break跳出最近一层循环', 'continue跳过本次循环', 'goto可实现跳转，但不推荐滥用']} />
        <TagGrid items={['switch', 'break', 'continue', 'goto', 'case']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>for能否实现死循环？</b>可以，for{}就是死循环。</BookParagraph>
        <BookParagraph><b>switch能否省略表达式？</b>可以，switch后无表达式时等价于switch true。</BookParagraph>
        <BookParagraph><b>goto会不会影响代码可读性？</b>滥用goto会降低可读性，建议仅用于异常跳转。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', '死循环', 'switch true', 'goto', '代码可读性']} />
      </div>
    ),
  },
]

export default function GoControlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
