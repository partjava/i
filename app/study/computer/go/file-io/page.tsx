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
  chapterTitle: '文件操作',
  chapterNumber: 15,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: '标准库使用', href: '/study/computer/go/stdlib' },
  nextChapter: { label: '网络编程', href: '/study/computer/go/networking' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '文件操作基础',
    left: (
      <div className="space-y-4">
        <PageTitle>文件基础操作</PageTitle>
        <BookCode language="go" code={`// 创建/写入文件
data := []byte("Hello, Go!")
err := os.WriteFile("test.txt", data, 0644)

// 读取文件
content, err := os.ReadFile("test.txt")
fmt.Println(string(content))

// 追加写入
f, _ := os.OpenFile("test.txt", os.O_APPEND|os.O_WRONLY, 0644)
f.WriteString("追加内容")
f.Close()

// 判断文件是否存在
_, err := os.Stat("test.txt")
if os.IsNotExist(err) { fmt.Println("文件不存在") }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>目录操作</SectionTitle>
        <BookCode language="go" code={`// 创建目录
os.Mkdir("mydir", 0755)
os.MkdirAll("a/b/c", 0755) // 递归创建

// 遍历目录
entries, _ := os.ReadDir(".")
for _, entry := range entries {
    fmt.Println(entry.Name(), entry.IsDir())
}

// 递归遍历
filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
    fmt.Println(path); return nil
})`} />
        <TagGrid items={['os.WriteFile', 'os.ReadFile', 'os.Stat', 'filepath.Walk', '目录']} />
      </div>
    ),
  },
  {
    label: '高级操作与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>文件权限与监控</PageTitle>
        <BookCode language="go" code={`// 修改权限
os.Chmod("test.txt", 0644)
// 文件压缩（gzip）
import "compress/gzip"
fw, _ := os.Create("file.gz")
gw := gzip.NewWriter(fw)
gw.Write([]byte("compressed data"))
gw.Close()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题与练习</SectionTitle>
        <BookParagraph><b>在文件中搜索关键词：</b></BookParagraph>
        <BookCode language="go" code={`func searchInFile(path, keyword string) (bool, error) {
    data, err := os.ReadFile(path)
    if err != nil { return false, err }
    return strings.Contains(string(data), keyword), nil
}`} />
        <BookParagraph><b>文件复制：</b></BookParagraph>
        <BookCode language="go" code={`func copyFile(src, dst string) error {
    data, err := os.ReadFile(src)
    if err != nil { return err }
    return os.WriteFile(dst, data, 0644)
}`} />
        <TagGrid items={['gzip', 'fsnotify', '搜索', '复制', '日志轮转']} />
      </div>
    ),
  },
]

export default function GoFileIoPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
