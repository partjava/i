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
  chapterTitle: '接口与类型系统',
  chapterNumber: 9,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: 'Map与结构体', href: '/study/computer/go/map-struct' },
  nextChapter: { label: '并发编程', href: '/study/computer/go/concurrency' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '接口基础',
    left: (
      <div className="space-y-4">
        <PageTitle>接口基础</PageTitle>
        <BookParagraph>Go接口是一组方法签名的集合，用type关键字定义。Go的接口是隐式实现的。</BookParagraph>
        <BookCode language="go" code={`type Animal interface {
    Speak() string
    Move() string
}
// 隐式实现
type Dog struct{}
func (d Dog) Speak() string { return "汪汪" }
func (d Dog) Move() string  { return "跑" }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>接口实现与多态</SectionTitle>
        <BookCode language="go" code={`type Cat struct{}
func (c Cat) Speak() string { return "喵喵" }
func (c Cat) Move() string  { return "走" }

// 多态
func PrintAnimal(a Animal) {
    fmt.Println(a.Speak(), a.Move())
}

func main() {
    var a Animal = Dog{}
    PrintAnimal(a) // 汪汪 跑
    a = Cat{}
    PrintAnimal(a) // 喵喵 走
}`} />
        <TagGrid items={['接口', '多态', '隐式实现', '方法集', 'Animal']} />
      </div>
    ),
  },
  {
    label: '类型断言与泛型',
    left: (
      <div className="space-y-4">
        <PageTitle>类型断言与类型判断</PageTitle>
        <BookCode language="go" code={`var i interface{} = "hello"
// 类型断言
s := i.(string)
fmt.Println(s)

// 带判断的类型断言
s, ok := i.(string)
if ok { fmt.Println("是字符串:", s) }

// 类型switch
switch v := i.(type) {
case string: fmt.Println("string:", v)
case int: fmt.Println("int:", v)
case bool: fmt.Println("bool:", v)
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>空接口与泛型</SectionTitle>
        <BookParagraph>Go 1.18+支持泛型。</BookParagraph>
        <BookCode language="go" code={`// 空接口可存储任何类型的值
var any interface{}
any = 42
any = "hello"

// Go 1.18+泛型
func Swap[T any](a, b T) (T, T) {
    return b, a
}
// 使用
x, y := Swap(1, 2)
s1, s2 := Swap("a", "b")`} />
        <TagGrid items={['类型断言', 'type switch', '空接口', '泛型', 'any']} />
      </div>
    ),
  },
  {
    label: '例题与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>Shape接口：</b></BookParagraph>
        <BookCode language="go" code={`type Shape interface {
    Area() float64
}
type Circle struct{ R float64 }
func (c Circle) Area() float64 { return math.Pi * c.R * c.R }
type Rect struct{ W, H float64 }
func (r Rect) Area() float64 { return r.W * r.H }`} />
        <BookParagraph><b>泛型Swap函数：</b></BookParagraph>
        <BookCode language="go" code={`func Swap[T any](a, b T) (T, T) { return b, a }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>接口和结构体的区别？</b>结构体定义具体数据和行为，接口定义方法契约。</BookParagraph>
        <BookParagraph><b>nil接口和nil值区别？</b>接口为nil时类型和值都为空，值为nil但类型不空时接口不是nil。</BookParagraph>
        <BookParagraph><b>泛型类型参数有什么限制？</b>可用any或interface约束，也可自定义类型约束。</BookParagraph>
        <TagGrid items={['例题', 'Shape', '泛型', 'nil接口', '约束']} />
      </div>
    ),
  },
]

export default function GoInterfacesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
