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
  chapterTitle: '数组与切片',
  chapterNumber: 7,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '函数与方法', href: '/study/computer/go/functions' },
  nextChapter: { label: 'Map与结构体', href: '/study/computer/go/map-struct' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数组基础',
    left: (
      <div className="space-y-4">
        <PageTitle>数组基础</PageTitle>
        <BookParagraph>数组是定长、同类型元素的序列，声明时需指定长度。</BookParagraph>
        <BookCode language="go" code={`// 声明数组
var arr1 [3]int           // [0 0 0]
var arr2 = [3]int{1, 2, 3}
arr3 := [...]string{"Go", "Python", "Java"}

// 访问和修改
arr2[0] = 10
fmt.Println(arr2[1]) // 2

// 遍历数组
for i, v := range arr2 {
    fmt.Println(i, v)
}`} />
        <BookList items={[
          '数组长度是类型的一部分，[3]int和[4]int不同类型',
          '数组是值类型，赋值和传参会复制整个数组',
        ]} />
        <TagGrid items={['数组', '声明', '遍历', '值类型']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>切片基础</SectionTitle>
        <BookParagraph>切片是对数组的抽象，长度可变，更常用。</BookParagraph>
        <BookCode language="go" code={`// 声明切片
var s1 []int              // nil切片
s2 := []int{1, 2, 3}      // 字面量
s3 := make([]string, 2)   // 长度为2的字符串切片

// 访问和修改
s2[0] = 10
fmt.Println(s2[1]) // 2

// 遍历切片
for i, v := range s2 {
    fmt.Println(i, v)
}`} />
        <BookList items={[
          '切片本身不存储数据，底层依赖数组',
          '切片是引用类型，赋值和传参不会复制底层数据',
        ]} />
        <TagGrid items={['切片', 'make', 'nil', '引用类型']} />
      </div>
    ),
  },
  {
    label: '切片操作',
    left: (
      <div className="space-y-4">
        <PageTitle>切片操作</PageTitle>
        <BookParagraph>切片支持多种操作，如追加、截取、复制等。</BookParagraph>
        <BookCode language="go" code={`s := []int{1, 2, 3}
// 追加元素
s = append(s, 4, 5)
// 截取子切片
sub := s[1:4] // [2 3 4]
// 拷贝切片
copyS := make([]int, len(s))
copy(copyS, s)
// 删除元素（常用技巧）
s = append(s[:2], s[3:]...) // 删除下标2的元素`} />
        <BookList items={[
          'append返回新切片，原切片不变',
          '切片截取语法s[start:end]，不包含end',
          '删除元素需用append组合实现',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见用法</SectionTitle>
        <BookParagraph>切片常用于动态数组、栈、队列等场景。</BookParagraph>
        <BookCode language="go" code={`// 反转切片
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}

// 切片实现栈
stack := []int{}
stack = append(stack, 1) // 入栈
x := stack[len(stack)-1] // 取栈顶
stack = stack[:len(stack)-1] // 出栈

// 切片实现队列
queue := []int{1, 2, 3}
queue = append(queue, 4) // 入队
head := queue[0]         // 取队头
queue = queue[1:]        // 出队`} />
        <BookList items={[
          '切片可灵活实现多种数据结构',
          '注意切片扩容和内存引用问题',
        ]} />
        <TagGrid items={['append', 'copy', '截取', '删除', 'reverse', '栈', '队列']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>例题1：计算切片元素之和</b></BookParagraph>
        <BookCode language="go" code={`func sumSlice(s []int) int {
    sum := 0
    for _, v := range s {
        sum += v
    }
    return sum
}

fmt.Println(sumSlice([]int{1, 2, 3, 4})) // 输出10`} />
        <BookParagraph><b>例题2：删除切片中指定元素</b></BookParagraph>
        <BookCode language="go" code={`func removeAt(s []int, idx int) []int {
    return append(s[:idx], s[idx+1:]...)
}

s := []int{1, 2, 3, 4}
s = removeAt(s, 2)
fmt.Println(s) // [1 2 4]`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>练习：实现一个函数，找出切片中的最大值和最小值</b></BookParagraph>
        <BookCode language="go" code={`func minMax(s []int) (int, int) {
    if len(s) == 0 {
        panic("切片不能为空")
    }
    min, max := s[0], s[0]
    for _, v := range s {
        if v < min {
            min = v
        }
        if v > max {
            max = v
        }
    }
    return min, max
}

fmt.Println(minMax([]int{3, 1, 5, 2})) // 1 5`} />
        <TagGrid items={['sum', 'removeAt', 'minMax', '练习']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: 数组和切片的区别？</b><br />A: 数组长度固定，切片长度可变且更常用。</BookParagraph>
        <BookParagraph><b>Q: 切片扩容机制？</b><br />A: append超出容量时自动扩容，底层新建更大数组。</BookParagraph>
        <BookParagraph><b>Q: 切片赋值会不会复制数据？</b><br />A: 不会，赋值和传参只复制切片结构体，底层数据共享。</BookParagraph>
        <BookParagraph><b>Q: 如何安全删除切片元素？</b><br />A: 用append组合切片实现，避免越界。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', '数组 vs 切片', 'append', '引用类型', '底层数组', '扩容']} />
      </div>
    ),
  },
]

export default function GoArraysSlicesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
