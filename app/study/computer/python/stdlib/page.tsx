'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: '标准库',
  chapterNumber: 9,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '异常处理', href: '/study/computer/python/exceptions' },
  nextChapter: { label: '第三方库', href: '/study/computer/python/packages' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常用模块',
    left: (
      <div className="space-y-4">
        <PageTitle>日期与时间</PageTitle>
        <BookCode language="python" showLineNumbers code={`# datetime 模块
from datetime import datetime, timedelta, date

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
today = date.today()
yesterday = today - timedelta(days=1)

# 字符串解析
dt = datetime.strptime("2024-01-01", "%Y-%m-%d")

# time 模块
import time
print(time.time())  # 时间戳
time.sleep(1)       # 延迟1秒

# calendar 模块
import calendar
print(calendar.month(2024, 1))  # 月历`} />
        <BookDivider />
        <PageTitle>数学与随机数</PageTitle>
        <BookCode language="python" showLineNumbers code={`import math
import random

print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0
print(math.floor(3.7))  # 3
print(math.ceil(3.2))   # 4

print(random.randint(1, 10))
print(random.choice(["a", "b", "c"]))
random.shuffle(lst)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统与序列化</PageTitle>
        <BookCode language="python" showLineNumbers code={`import os
import sys
import json
import pickle

# os 模块
print(os.getcwd())      # 当前目录
print(os.listdir("."))  # 文件列表
print(os.environ)       # 环境变量

# sys 模块
print(sys.version)      # Python版本
print(sys.argv)         # 命令行参数
sys.exit(0)             # 退出程序

# JSON 序列化
data = {"name": "Alice", "age": 30}
json_str = json.dumps(data, ensure_ascii=False)
parsed = json.loads(json_str)
print(parsed["name"])

# pickle 序列化
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)
with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)`} />
      </div>
    ),
  },
  {
    label: '集合与迭代',
    left: (
      <div className="space-y-4">
        <PageTitle>itertools 与 collections</PageTitle>
        <BookCode language="python" showLineNumbers code={`from itertools import count, cycle, chain
from collections import Counter, defaultdict, deque

# itertools
for i in count(10):  # 10, 11, 12, ...
    if i > 15: break

# Counter
words = ["a", "b", "a", "c", "b", "a"]
counter = Counter(words)
print(counter.most_common(1))  # [("a", 3)]

# defaultdict
d = defaultdict(list)
d["key"].append(1)

# deque
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.append(4)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>哈希与正则</PageTitle>
        <BookCode language="python" showLineNumbers code={`import hashlib
import re

# hashlib
hash = hashlib.sha256("hello".encode())
print(hash.hexdigest())

# 正则表达式
text = "我的邮箱是 alice@example.com"
pattern = r"\\w+@\\w+\\.\\w+"
match = re.search(pattern, text)
if match:
    print(match.group())  # alice@example.com

# sub 替换
result = re.sub(r"\\d+", "NUM", "有123个苹果")
print(result)  # 有NUM个苹果

# findall
emails = re.findall(r"\\w+@\\w+\\.\\w+", text)`} />
        <TagGrid items={['datetime', 'json', 'os', 're', 'collections', 'itertools', 'hashlib']} />
      </div>
    ),
  },
]

export default function StdlibPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
