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
  chapterTitle: 'Map与结构体',
  chapterNumber: 8,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '数组与切片', href: '/study/computer/go/arrays-slices' },
  nextChapter: { label: '接口与类型系统', href: '/study/computer/go/interfaces' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Map基础',
    left: (
      <div className="space-y-4">
        <PageTitle>Map基础</PageTitle>
        <BookParagraph>Map是Go内置的键值对集合，需用make初始化。</BookParagraph>
        <BookCode language="go" code={`// Map声明与初始化
var m1 map[string]int
m2 := make(map[string]int)
m3 := map[string]int{"Alice": 25, "Bob": 30}

// 增删改查
m2["Tom"] = 18        // 增加/修改
age := m2["Tom"]      // 查询
delete(m2, "Tom")     // 删除
v, ok := m2["Tom"]    // 判断key是否存在`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>结构体基础</SectionTitle>
        <BookParagraph>结构体是Go用于定义复杂数据类型的方式。</BookParagraph>
        <BookCode language="go" code={`type Student struct {
    Name  string
    Age   int
    Score float64
}

// 创建结构体实例
s1 := Student{"Tom", 18, 95.5}
s2 := Student{Name: "Jerry", Age: 20}
s3 := new(Student) // 返回指针`} />
        <TagGrid items={['Map', 'make', 'delete', '结构体', '字段']} />
      </div>
    ),
  },
  {
    label: '结构体方法与结合',
    left: (
      <div className="space-y-4">
        <PageTitle>结构体方法与嵌套</PageTitle>
        <BookCode language="go" code={`// 结构体方法
func (s Student) GetGrade() string {
    if s.Score >= 90 { return "优秀" }
    if s.Score >= 80 { return "良好" }
    return "及格"
}

// 结构体嵌套
type Address struct {
    City, Street string
}
type Person struct {
    Name    string
    Address // 匿名嵌套
}
p := Person{Name: "Tom", Address: Address{City: "北京"}}
fmt.Println(p.City) // 直接访问嵌套字段`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Map与结构体结合</SectionTitle>
        <BookCode language="go" code={`// Map值用结构体
type Product struct {
    Name  string
    Price float64
}
products := map[int]Product{
    1: {"苹果", 5.5},
    2: {"香蕉", 3.0},
}`} />
        <SectionTitle>例题与练习</SectionTitle>
        <BookParagraph><b>统计字符串字符出现次数：</b></BookParagraph>
        <BookCode language="go" code={`func charCount(s string) map[rune]int {
    m := make(map[rune]int)
    for _, c := range s { m[c]++ }
    return m
}`} />
        <TagGrid items={['方法', '嵌套', '匿名', 'Map嵌套', '练习']} />
      </div>
    ),
  },
  {
    label: '练习与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>学生信息管理：</b></BookParagraph>
        <BookCode language="go" code={`type Student struct {
    ID, Name string; Score float64
}
func averageScore(students []Student) float64 {
    sum := 0.0
    for _, s := range students { sum += s.Score }
    return sum / float64(len(students))
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Map是线程安全的吗？</b>不是，并发读写需加锁或用sync.Map。</BookParagraph>
        <BookParagraph><b>结构体值传递还是引用？</b>结构体默认值传递，需用指针修改原值。</BookParagraph>
        <BookParagraph><b>Map的遍历顺序？</b>Map遍历顺序不固定，每次可能不同。</BookParagraph>
        <TagGrid items={['sync.Map', '值传递', '指针', '遍历', '并发']} />
      </div>
    ),
  },
]

export default function GoMapStructPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
