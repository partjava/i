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
  chapterTitle: '项目实战',
  chapterNumber: 23,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '容器化部署', href: '/study/computer/go/docker' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '项目概述与Web服务',
    left: (
      <div className="space-y-4">
        <PageTitle>项目概述</PageTitle>
        <BookParagraph>本课程包含三个综合实战项目，涵盖Web服务、微服务和工具开发。</BookParagraph>
        <SectionTitle>Web服务实战</SectionTitle>
        <BookParagraph><b>Gin框架示例：</b></BookParagraph>
        <BookCode language="go" code={`import "github.com/gin-gonic/gin"
func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) { c.JSON(200, gin.H{"message": "pong"}) })
    r.Run(":8080")
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>微服务实战</SectionTitle>
        <BookCode language="go" code={`// gRPC服务注册到etcd
func RegisterService(serviceName, addr string) {
    cli, _ := clientv3.New(clientv3.Config{
        Endpoints: []string{"localhost:2379"},
    })
    cli.Put(context.Background(),
        "/services/"+serviceName, addr)
}`} />
        <TagGrid items={['项目', 'Gin', 'gRPC', 'etcd', '微服务']} />
      </div>
    ),
  },
  {
    label: '工具开发与部署',
    left: (
      <div className="space-y-4">
        <PageTitle>工具开发</PageTitle>
        <BookParagraph>开发命令行工具，使用os.Args或cobra库。</BookParagraph>
        <BookCode language="go" code={`func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: mytool <command>")
        return
    }
    switch os.Args[1] {
    case "serve": startServer()
    case "migrate": runMigrate()
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>部署与运维</SectionTitle>
        <BookCode language="yaml" code={`# GitHub Actions CI
name: CI
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build
      run: go build -o server ./cmd
    - name: Test
      run: go test ./...`} />
        <SectionTitle>综合练习</SectionTitle>
        <BookList items={['开发Todo List API（CRUD + MySQL）', '设计分布式短链接服务', '开发CLI自动化工具']} />
        <TagGrid items={['CLI', 'cobra', 'CI/CD', '部署', '练习']} />
      </div>
    ),
  },
]

export default function GoProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
