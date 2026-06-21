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
  chapterTitle: '开发环境配置',
  chapterNumber: 2,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: 'Go语言入门', href: '/study/computer/go/intro' },
  nextChapter: { label: '基础语法', href: '/study/computer/go/basic' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '安装与环境变量',
    left: (
      <div className="space-y-4">
        <PageTitle>安装Go</PageTitle>
        <BookParagraph>Go支持Windows、macOS、Linux等主流操作系统。</BookParagraph>
        <BookList items={[
          '访问 https://golang.org/dl/ 下载对应平台的安装包',
          '根据提示完成安装',
          '安装完成后，命令行输入 go version 验证',
        ]} />
        <BookCode language="bash" code={`$ go version
go version go1.21.0 windows/amd64`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>配置环境变量</SectionTitle>
        <BookParagraph>Go主要环境变量：</BookParagraph>
        <BookList items={[
          'GOROOT：Go安装目录，通常自动配置',
          'GOPATH：工作区目录，Go 1.11+推荐用Go Modules',
          'PATH：需包含Go的bin目录',
        ]} />
        <BookCode language="bash" code={`# Windows示例
set PATH=%PATH%;C:\\Go\\bin

# macOS/Linux示例
export PATH=$PATH:/usr/local/go/bin`} />
        <TagGrid items={['安装', 'GOROOT', 'GOPATH', 'PATH', '环境变量']} />
      </div>
    ),
  },
  {
    label: 'Hello World与工具',
    left: (
      <div className="space-y-4">
        <PageTitle>Hello World</PageTitle>
        <BookParagraph>编写并运行第一个Go程序：</BookParagraph>
        <BookCode language="go" code={`package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`} />
        <BookList items={['保存为 hello.go', '命令行运行 go run hello.go', '看到输出 Hello, Go!']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常用开发工具</SectionTitle>
        <BookList items={[
          'VS Code + Go插件：主流开发环境，支持智能提示、调试',
          'GoLand：JetBrains出品的专业Go IDE',
          'gopls：Go官方语言服务器，提升编辑体验',
          'dlv：Go调试工具',
          'gofmt/goimports：代码格式化与自动导入',
        ]} />
        <TagGrid items={['Hello World', 'VS Code', 'GoLand', 'gopls', 'gofmt']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>安装Go需要管理员权限吗？</b></BookParagraph>
        <BookParagraph>推荐有管理员权限，便于全局安装和环境变量配置。</BookParagraph>
        <BookParagraph><b>Go 1.11以后还需要设置GOPATH吗？</b></BookParagraph>
        <BookParagraph>推荐使用Go Modules，无需手动设置GOPATH。</BookParagraph>
        <BookParagraph><b>如何切换Go版本？</b></BookParagraph>
        <BookParagraph>可用gvm、asdf、官方安装包等工具管理多版本。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', 'Go Modules', 'gvm', '版本管理']} />
      </div>
    ),
  },
]

export default function GoSetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
