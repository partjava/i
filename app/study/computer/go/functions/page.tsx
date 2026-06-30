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
  chapterTitle: '函数与方法',
  chapterNumber: 6,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '控制流程', href: '/study/computer/go/control' },
  nextChapter: { label: '数组与切片', href: '/study/computer/go/arrays-slices' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '函数定义与参数',
    left: (
      <div className="space-y-4">
        <PageTitle>函数定义与调用</PageTitle>
        <BookParagraph>Go函数使用func关键字声明，支持多返回值。</BookParagraph>
        <BookCode language="go" code={`// 函数定义
func add(a int, b int) int {
    return a + b
}
// 调用
result := add(3, 4)

// 多返回值
func div(a, b int) (int, error) {
    if b == 0 { return 0, errors.New("除零") }
    return a / b, nil
}`} />
        <SectionTitle>参数与返回值</SectionTitle>
        <BookParagraph>Go支持可变参数、命名返回值、多返回值。</BookParagraph>
        <BookCode language="go" code={`// 可变参数
func sum(nums ...int) int {
    total := 0
    for _, n := range nums { total += n }
    return total
}
// 命名返回值
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // 裸返回
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>方法与接收者</SectionTitle>
        <BookParagraph>Go方法在函数名前面加接收者（Receiver），可以是值或指针。</BookParagraph>
        <BookCode language="go" code={`type Rectangle struct {
    Width, Height float64
}
// 值接收者
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
// 指针接收者（可修改）
func (r *Rectangle) Scale(f float64) {
    r.Width *= f
    r.Height *= f
}`} />
        <SectionTitle>匿名函数与闭包</SectionTitle>
        <BookCode language="go" code={`// 匿名函数
func() { fmt.Println("匿名") }()
// 闭包
func adder() func(int) int {
    sum := 0
    return func(x int) int {
        sum += x
        return sum
    }
}`} />
        <TagGrid items={['func', '多返回值', '接收者', '闭包', '可变参数']} />
      </div>
    ),
  },
  {
    label: '例题与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>求两个整数中的最大值：</b></BookParagraph>
        <BookCode language="go" code={`func maxInt(a, b int) int {
    if a > b { return a }
    return b
}`} />
        <BookParagraph><b>给Person结构体添加Intro方法：</b></BookParagraph>
        <BookCode language="go" code={`type Person struct { Name string; Age int }
func (p Person) Intro() string {
    return fmt.Sprintf("我是%s，今年%d岁", p.Name, p.Age)
}`} />
        <BookParagraph><b>判断素数：</b></BookParagraph>
        <BookCode language="go" code={`func isPrime(n int) bool {
    if n <= 1 { return false }
    for i := 2; i*i <= n; i++ { if n%i == 0 { return false } }
    return true
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Go函数能不能重载？</b>不支持函数重载，相同包中函数名必须唯一。</BookParagraph>
        <BookParagraph><b>值和指针接收者怎么选？</b>需要修改接收者或结构体较大时用指针接收者。</BookParagraph>
        <BookParagraph><b>闭包有哪些注意事项？</b>闭包引用外部变量，注意变量作用域和生命周期。</BookParagraph>
        <TagGrid items={['例题', '方法', '指针接收者', '重载', '闭包']} />
      </div>
    ),
  },
]

export default function GoFunctionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
