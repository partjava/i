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
  chapterTitle: '容器化部署',
  chapterNumber: 22,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '微服务开发', href: '/study/computer/go/microservices' },
  nextChapter: { label: '项目实战', href: '/study/computer/go/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '容器基础与Dockerfile',
    left: (
      <div className="space-y-4">
        <PageTitle>容器基础</PageTitle>
        <BookParagraph>容器是一种轻量级、可移植的虚拟化技术，常用Docker实现。容器隔离进程、文件系统和网络，便于应用打包和部署。</BookParagraph>
        <BookList items={[
          '镜像（Image）：应用及其依赖的只读模板',
          '容器（Container）：镜像运行时的实例',
          '仓库（Registry）：存储和分发镜像',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Dockerfile与镜像</SectionTitle>
        <BookParagraph>Dockerfile用于定义镜像构建过程。Go项目常用多阶段构建，减小镜像体积。</BookParagraph>
        <BookCode language="dockerfile" code={`# 多阶段构建Go应用的Dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]`} />
        <BookList items={[
          '使用alpine等精简基础镜像',
          '分阶段构建，减少最终镜像体积',
        ]} />
        <TagGrid items={['Dockerfile', '多阶段构建', 'alpine', '镜像']} />
      </div>
    ),
  },
  {
    label: '容器编排与Go集成',
    left: (
      <div className="space-y-4">
        <PageTitle>容器编排</PageTitle>
        <BookParagraph>Docker Compose用于多容器编排，K8s适合大规模生产环境。</BookParagraph>
        <BookCode language="yaml" code={`# docker-compose.yml示例
version: "3"
services:
  app:
    build: .
    ports:
      - "8080:8080"
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: example`} />
        <BookList items={[
          'Compose适合本地开发和测试',
          'K8s支持自动扩缩容、服务发现等',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>与Go集成</SectionTitle>
        <BookParagraph>Go应用天然适合容器化，编译为静态二进制，易于跨平台部署。</BookParagraph>
        <BookCode language="go" code={`// main.go 示例
package main
import (
    "net/http"
    "os"
)
func main() {
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, Docker!"))
    })
    http.ListenAndServe(":"+port, nil)
}`} />
        <BookList items={[
          '通过环境变量配置端口、数据库等',
          '可结合CI/CD自动构建镜像',
        ]} />
        <TagGrid items={['docker-compose', 'K8s', 'Go集成', '环境变量', '静态编译']} />
      </div>
    ),
  },
  {
    label: '实践与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实践与练习</PageTitle>
        <BookParagraph><b>例题1：为Go Web服务编写Dockerfile并构建镜像</b></BookParagraph>
        <BookCode language="shell" code={`# 编写Dockerfile，构建并运行Go服务`} />
        <BookParagraph><b>例题2：用Compose编排Go服务和数据库</b></BookParagraph>
        <BookCode language="yaml" code={`# 编写docker-compose.yml，实现服务与MySQL联动`} />
        <BookParagraph><b>练习：将已有Go项目容器化并推送到镜像仓库</b></BookParagraph>
        <BookCode language="shell" code={`# 构建、打tag并推送到Docker Hub`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: Go镜像如何减小体积？</b><br />A: 使用多阶段构建和alpine基础镜像。</BookParagraph>
        <BookParagraph><b>Q: 容器如何持久化数据？</b><br />A: 使用数据卷（volumes）挂载主机目录。</BookParagraph>
        <BookParagraph><b>Q: Go服务如何优雅重启？</b><br />A: 捕获信号，平滑关闭服务。</BookParagraph>
        <TagGrid items={['练习', '构建', 'Docker', 'Compose', '持久化', '优雅重启']} />
      </div>
    ),
  },
]

export default function GoDockerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
