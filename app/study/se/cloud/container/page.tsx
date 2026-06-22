'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '虚拟化与容器化',
  chapterNumber: 3,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云服务基础', href: '/study/se/cloud/basic' },
  nextChapter: { label: '云存储与数据库', href: '/study/se/cloud/storage' },
  theme: THEMES.software,
}

const CODE_DOCKER = `docker build -t myapp .
docker run -d -p 8080:80 myapp`

const CODE_K8S = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 80`

const SPREADS = [
  {
    label: '虚拟机与容器对比',
    left: (
      <div className="space-y-4">
        <PageTitle>虚拟机与容器对比</PageTitle>
        <BookParagraph>虚拟机和容器是两种主流的资源隔离技术，各有优缺点：</BookParagraph>
        <BookList items={[
          '虚拟机：资源隔离好，启动慢，资源占用高',
          '容器：轻量级，启动快，易于弹性伸缩',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Docker基础命令</PageTitle>
        <BookParagraph>Docker是最流行的容器引擎，以下是常用的构建和运行命令：</BookParagraph>
        <BookCode language="bash" code={CODE_DOCKER} />
      </div>
    ),
  },
  {
    label: 'Kubernetes部署',
    left: (
      <div className="space-y-4">
        <PageTitle>Kubernetes部署示例</PageTitle>
        <BookParagraph>Kubernetes（K8s）是容器编排平台，通过Deployment资源管理应用副本和滚动更新。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Deployment配置</PageTitle>
        <BookParagraph>以下YAML定义了一个部署2个副本的Deployment：</BookParagraph>
        <BookCode language="yaml" code={CODE_K8S} />
      </div>
    ),
  },
]

export default function CloudContainerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
