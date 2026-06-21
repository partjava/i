'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: '文件操作',
  chapterNumber: 6,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '函数和模块', href: '/study/computer/python/functions' },
  nextChapter: { label: '面向对象编程', href: '/study/computer/python/oop' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '文件读写',
    left: (
      <div className="space-y-4">
        <PageTitle>文件基本操作</PageTitle>
        <BookParagraph>Python 使用内置的 open() 函数进行文件操作。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`# 打开并读取文件
file = open("example.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# 使用 with 语句（自动关闭）
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# 逐行读取
with open("example.txt", "r") as f:
    for line in f:
        print(line.strip())

# 读取所有行到列表
with open("example.txt", "r") as f:
    lines = f.readlines()

# 写入文件
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("第一行\\n")
    f.write("第二行\\n")

# 追加写入
with open("output.txt", "a", encoding="utf-8") as f:
    f.write("追加的内容\\n")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>文件模式与编码</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 文件打开模式
# "r"  - 读取（默认）
# "w"  - 写入（覆盖）
# "a"  - 追加
# "x"  - 独占创建（文件不存在时）
# "b"  - 二进制模式
# "+"  - 读写模式

# 二进制文件操作
with open("image.jpg", "rb") as f:
    data = f.read()

with open("copy.jpg", "wb") as f:
    f.write(data)

# 文件指针操作
with open("example.txt", "r") as f:
    print(f.tell())   # 当前位置: 0
    content = f.read(5)
    print(f.tell())   # 当前位置: 5
    f.seek(0)         # 回到文件开头

# 处理编码
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()`} />
      </div>
    ),
  },
  {
    label: '高级操作',
    left: (
      <div className="space-y-4">
        <PageTitle>路径与目录操作</PageTitle>
        <BookCode language="python" showLineNumbers code={`import os
from pathlib import Path

# 使用 os.path
print(os.path.exists("example.txt"))
print(os.path.getsize("example.txt"))
print(os.path.abspath("example.txt"))

# 目录操作
os.mkdir("new_dir")
os.makedirs("a/b/c")
os.rmdir("empty_dir")
import shutil
shutil.rmtree("dir")

# 使用 pathlib（推荐）
path = Path("example.txt")
print(path.exists())
print(path.suffix)        # .txt
print(path.stem)          # example
print(path.parent)

# 遍历目录
for file in Path(".").glob("*.py"):
    print(file.name)

for file in Path(".").rglob("*.txt"):
    print(file)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>文件管理最佳实践</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 检查文件类型
print(os.path.isfile("example.txt"))
print(os.path.isdir("my_dir"))

# 文件重命名/移动
os.rename("old.txt", "new.txt")
shutil.move("source.txt", "backup/")

# 复制文件
shutil.copy("source.txt", "dest.txt")
shutil.copy2("source.txt", "dest.txt")

# 临时文件
import tempfile
with tempfile.NamedTemporaryFile(mode="w", delete=False) as f:
    f.write("临时数据")

# CSV 文件处理
import csv
with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])`} />
        <TagGrid items={['open', 'with', 'read', 'write', 'pathlib', 'os', 'csv']} />
      </div>
    ),
  },
]

export default function FileIOPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
