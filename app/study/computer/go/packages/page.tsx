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
  chapterTitle: '包管理与模块',
  chapterNumber: 13,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '错误处理', href: '/study/computer/go/error-handling' },
  nextChapter: { label: '标准库使用', href: '/study/computer/go/stdlib' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '包与模块系统',
    left: (
      <div className="space-y-4">
        <PageTitle>包管理基础</PageTitle>
        <BookParagraph>Go程序通过包（package）组织代码，每个Go文件属于一个包。</BookParagraph>
        <BookCode language="go" code={`// mathutil/math.go
package mathutil
func Add(a, b int) int { return a + b } // 大写开头=导出

// main.go
package main
import "yourmodule/mathutil"
func main() { fmt.Println(mathutil.Add(1, 2)) }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>模块系统</SectionTitle>
        <BookCode language="bash" code={`# 初始化模块
go mod init github.com/user/myapp

# 添加依赖
go get github.com/gin-gonic/gin

# 更新依赖
go mod tidy

# go.mod 文件
module myapp
go 1.21
require github.com/gin-gonic/gin v1.9.0`} />
        <TagGrid items={['package', 'go mod', 'import', '导出', '模块']} />
      </div>
    ),
  },
  {
    label: '依赖与设计',
    left: (
      <div className="space-y-4">
        <PageTitle>依赖管理</PageTitle>
        <BookCode language="bash" code={`# 查看依赖
go list -m all
# 版本升级
go get -u ./...
# 清理未使用的依赖
go mod tidy
# vendor模式
go mod vendor`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>包设计原则</SectionTitle>
        <BookList items={[
          '按功能组织包，避免循环依赖',
          '小接口大组合，接口尽量小',
          '避免过深的包层级',
          '合理使用internal限制包访问',
        ]} />
        <SectionTitle>练习</SectionTitle>
        <BookList items={['创建geometry包计算面积', '用go get安装第三方库', '设计配置管理包']} />
        <TagGrid items={['go get', 'go mod tidy', 'vendor', 'internal', '设计']} />
      </div>
    ),
  },
]

export default function GoPackagesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
