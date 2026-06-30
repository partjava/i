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
  chapterTitle: '错误处理',
  chapterNumber: 12,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: 'Channel与Goroutine', href: '/study/computer/go/channels' },
  nextChapter: { label: '包管理与模块', href: '/study/computer/go/packages' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '错误处理基础',
    left: (
      <div className="space-y-4">
        <PageTitle>错误处理基础</PageTitle>
        <BookParagraph>Go语言采用多返回值方式进行错误处理，约定<code>error</code>类型为错误信息。</BookParagraph>
        <BookCode language="go" code={`import "errors"

func div(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为0")
    }
    return a / b, nil
}

res, err := div(10, 0)
if err != nil {
    fmt.Println("出错：", err)
} else {
    fmt.Println("结果：", res)
}`} />
        <BookList items={[
          'error是接口类型，nil表示无错误',
          'Go推荐优先返回错误而不是抛出异常',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自定义错误</SectionTitle>
        <BookParagraph>可通过实现<code>error</code>接口自定义错误类型，便于携带更多上下文信息。</BookParagraph>
        <BookCode language="go" code={`type MyError struct {
    Code int
    Msg  string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("[错误码%d] %s", e.Code, e.Msg)
}

func test(flag bool) error {
    if !flag {
        return &MyError{Code: 1001, Msg: "flag为false"}
    }
    return nil
}

err := test(false)
if err != nil {
    fmt.Println(err)
}`} />
        <BookList items={[
          '自定义错误可携带错误码、上下文等信息',
          '可通过类型断言判断错误类型',
        ]} />
        <TagGrid items={['error', 'errors.New', 'MyError', '自定义错误', '接口']} />
      </div>
    ),
  },
  {
    label: 'defer与最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>defer与panic</PageTitle>
        <BookParagraph><code>defer</code>用于延迟执行，<code>panic</code>用于抛出异常，<code>recover</code>可捕获异常防止程序崩溃。</BookParagraph>
        <BookCode language="go" code={`func safeDiv(a, b int) (res int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("捕获panic：", r)
            res = 0
        }
    }()
    if b == 0 {
        panic("除数为0")
    }
    return a / b
}

fmt.Println(safeDiv(10, 0))`} />
        <BookList items={[
          'defer常用于资源释放、日志、异常捕获',
          'panic会中断流程，recover可恢复',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>错误处理最佳实践</SectionTitle>
        <BookParagraph>推荐做法：就地处理错误、错误包装、分层处理、日志记录等。</BookParagraph>
        <BookCode language="go" code={`// 错误包装
import "fmt"

func readFile(name string) error {
    if name == "" {
        return fmt.Errorf("文件名为空: %w", errors.New("参数错误"))
    }
    return nil
}

err := readFile("")
if err != nil {
    fmt.Println("读取失败：", err)
}`} />
        <BookList items={[
          '使用fmt.Errorf("...%w", err)包装错误，便于追踪',
          '分层处理，底层返回错误，上层决定如何处理',
        ]} />
        <TagGrid items={['defer', 'panic', 'recover', 'fmt.Errorf', '%w包装']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>例题1：实现一个带错误处理的文件读取函数</b></BookParagraph>
        <BookCode language="go" code={`import "os"

func ReadFile(name string) ([]byte, error) {
    f, err := os.Open(name)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    return io.ReadAll(f)
}

content, err := ReadFile("test.txt")
if err != nil {
    fmt.Println("读取失败：", err)
} else {
    fmt.Println(string(content))
}`} />
        <BookParagraph><b>例题2：自定义错误类型并使用</b></BookParagraph>
        <BookCode language="go" code={`type AgeError struct {
    Age int
}

func (e *AgeError) Error() string {
    return fmt.Sprintf("年龄非法: %d", e.Age)
}

func CheckAge(age int) error {
    if age < 0 || age > 150 {
        return &AgeError{Age: age}
    }
    return nil
}

err := CheckAge(200)
if err != nil {
    fmt.Println(err)
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>练习：实现一个panic安全的函数</b></BookParagraph>
        <BookCode language="go" code={`func SafeRun(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    fn()
    return nil
}

err := SafeRun(func() {
    panic("出错了")
})
fmt.Println(err)`} />
        <TagGrid items={['ReadFile', 'AgeError', 'SafeRun', '练习', 'panic安全']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: error和panic的区别？</b><br />A: error用于可预期错误，panic用于不可恢复的严重错误。</BookParagraph>
        <BookParagraph><b>Q: defer执行顺序？</b><br />A: 后注册的defer先执行（类似栈）。</BookParagraph>
        <BookParagraph><b>Q: 如何判断error类型？</b><br />A: 可用类型断言或errors.Is/errors.As。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', 'error vs panic', 'defer顺序', 'LIFO', 'errors.Is/As']} />
      </div>
    ),
  },
]

export default function GoErrorHandlingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
