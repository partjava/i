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
  chapterTitle: '测试与性能优化',
  chapterNumber: 20,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '数据库操作', href: '/study/computer/go/database' },
  nextChapter: { label: '微服务开发', href: '/study/computer/go/microservices' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '单元测试与基准',
    left: (
      <div className="space-y-4">
        <PageTitle>单元测试</PageTitle>
        <BookParagraph>Go内置testing包，测试文件以_test.go结尾。</BookParagraph>
        <BookCode language="go" code={`// math_test.go
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("期望5，得到%d", result)
    }
}
// 运行: go test -v`} />
        <SectionTitle>基准测试</SectionTitle>
        <BookCode language="go" code={`func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(2, 3)
    }
}
// 运行: go test -bench=.`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Mock与覆盖率</SectionTitle>
        <BookCode language="go" code={`// 接口mock
type DB interface { GetUser(id int) (User, error) }
type mockDB struct{}
func (m *mockDB) GetUser(id int) (User, error) {
    return User{Name: "Mock"}, nil
}
// 覆盖率
// go test -cover
// go test -coverprofile=coverage.out`} />
        <TagGrid items={['testing', 'go test', 'benchmark', 'mock', '覆盖率']} />
      </div>
    ),
  },
  {
    label: '性能分析与优化',
    left: (
      <div className="space-y-4">
        <PageTitle>性能分析</PageTitle>
        <BookParagraph>pprof是Go性能分析工具。</BookParagraph>
        <BookCode language="go" code={`import _ "net/http/pprof"
go func() { http.ListenAndServe(":6060", nil) }()
// 打开 http://localhost:6060/debug/pprof/`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>优化技巧</SectionTitle>
        <BookList items={[
          '避免不必要的内存分配',
          '使用strings.Builder拼接字符串',
          '使用sync.Pool复用对象',
          '优化热点代码',
        ]} />
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>字符串拼接基准测试：</b>比较+、fmt.Sprintf、strings.Builder性能。</BookParagraph>
        <TagGrid items={['pprof', '性能', '优化', 'memory', 'CPU']} />
      </div>
    ),
  },
]

export default function GoTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
