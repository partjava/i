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
  subject: 'Go语言',
  chapterTitle: '数据类型',
  chapterNumber: 4,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '基础语法', href: '/study/computer/go/basic' },
  nextChapter: { label: '控制流程', href: '/study/computer/go/control' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本类型',
    left: (
      <div className="space-y-4">
        <PageTitle>基本类型</PageTitle>
        <BookParagraph>Go语言内置多种基本数据类型：</BookParagraph>
        <BookList items={[
          '整型：int、int8、int16、int32、int64、uint、uint8、uint16、uint32、uint64',
          '浮点型：float32、float64',
          '布尔型：bool',
          '字符串型：string',
          '字节型：byte（uint8别名）、rune（int32别名，表示Unicode字符）',
        ]} />
        <BookCode language="go" code={`// 整型
var a int = 10
var b uint8 = 255
// 浮点型
var f1 float32 = 3.14
var f2 float64 = 2.71828
// 布尔型
var flag bool = true
// 字符串型
var s string = "Hello, Go!"
// 字节和rune
var ch byte = 'A'
var uni rune = '中'
fmt.Printf("%T %v\\n", a, a)   // int 10
fmt.Printf("%T %v\\n", uni, uni) // int32 20013`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>复合类型</SectionTitle>
        <BookParagraph>Go支持多种复合数据类型：</BookParagraph>
        <BookList items={['数组（Array）', '切片（Slice）', '映射（Map）', '结构体（Struct）', '指针（Pointer）']} />
        <BookCode language="go" code={`// 数组
var arr [3]int = [3]int{1, 2, 3}
// 切片
s := []string{"Go", "Python", "Java"}
// Map
m := map[string]int{"Tom": 18, "Jerry": 20}
// 结构体
type Person struct { Name string; Age int }
p := Person{Name: "Alice", Age: 25}
// 指针
var ptr *int = &arr[0]`} />
        <BookList items={['数组长度固定，切片长度可变', 'Map是键值对集合', '结构体可自定义复杂数据结构', '指针用于存储变量地址，Go不支持指针运算']} />
        <TagGrid items={['整型', '浮点', '布尔', '字符串', '复合类型']} />
      </div>
    ),
  },
  {
    label: '类型转换与零值',
    left: (
      <div className="space-y-4">
        <PageTitle>类型转换</PageTitle>
        <BookParagraph>Go语言不支持隐式类型转换，必须显式转换：</BookParagraph>
        <BookCode language="go" code={`var a int = 10
var b float64 = float64(a)
var c string = string('A') // rune转string

// 字符串和数字互转
s := "123"
num, err := strconv.Atoi(s)
s2 := strconv.Itoa(456)`} />
        <BookList items={[
          '基本类型间可用强制转换',
          '字符串和数字转换需用strconv包',
          '类型不兼容时编译报错',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>零值与默认值</SectionTitle>
        <BookParagraph>Go变量声明后若未赋值，会自动赋予类型的零值：</BookParagraph>
        <BookCode language="go" code={`var a int        // 0
var b float64     // 0
var s string      // ""
var flag bool     // false
var arr [3]int    // [0 0 0]
var m map[string]int // nil
var p *int        // nil`} />
        <BookList items={[
          '数值类型零值为0，布尔型为false，字符串为""',
          '切片、map、指针、接口等复合类型零值为nil',
          '使用零值可避免未初始化带来的bug',
        ]} />
        <TagGrid items={['类型转换', 'strconv', '零值', 'nil', '默认值']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Go的字符串是可变的吗？</b>不可变，字符串一旦创建内容不可更改。</BookParagraph>
        <BookParagraph><b>切片和数组的区别？</b>数组长度固定，切片长度可变且更常用。</BookParagraph>
        <BookParagraph><b>如何判断map中key是否存在？</b>用 v, ok := m[key] 判断ok值。</BookParagraph>
        <BookParagraph><b>指针会不会有野指针？</b>Go的指针安全，不支持指针运算，野指针风险极低。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', '字符串', '切片 vs 数组', 'map', '指针安全']} />
      </div>
    ),
  },
]

export default function GoDatatypesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
