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
  chapterTitle: '第三方库',
  chapterNumber: 10,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '标准库', href: '/study/computer/python/stdlib' },
  nextChapter: { label: '项目实战', href: '/study/computer/python/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '包管理',
    left: (
      <div className="space-y-4">
        <PageTitle>pip 包管理</PageTitle>
        <BookParagraph>pip 是 Python 的官方包管理工具，用于安装、管理和卸载第三方库。</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 安装包
pip install requests
pip install requests==2.28.0  # 指定版本
pip install requests>=2.28.0

# 查看已安装
pip list
pip show requests

# 卸载
pip uninstall requests

# requirements.txt
pip freeze > requirements.txt
pip install -r requirements.txt

# 常用源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pkg

# 虚拟环境
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\\Scripts\\activate    # Windows`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>requests 与网络请求</PageTitle>
        <BookCode language="python" showLineNumbers code={`import requests

# GET 请求
response = requests.get(
    "https://api.github.com",
    params={"q": "python"},
    headers={"Accept": "application/json"}
)
print(response.status_code)  # 200
print(response.json())       # JSON 数据

# POST 请求
data = {"name": "Alice", "age": 30}
response = requests.post(
    "https://httpbin.org/post",
    json=data
)

# 处理响应
response.raise_for_status()  # 检查错误
print(response.text)         # 文本
print(response.elapsed)      # 耗时

# 会话管理
with requests.Session() as session:
    session.auth = ("user", "pass")
    response = session.get("https://api.example.com")`} />
      </div>
    ),
  },
  {
    label: '数据处理',
    left: (
      <div className="space-y-4">
        <PageTitle>NumPy 基础</PageTitle>
        <BookCode language="python" showLineNumbers code={`import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
range_arr = np.arange(10)

# 矩阵运算
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
print(a + b)       # 矩阵加法
print(a @ b)       # 矩阵乘法
print(a.T)         # 转置

# 统计运算
data = np.random.randn(1000)
print(data.mean())
print(data.std())
print(data.max())
print(data.min())`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Pandas 基础</PageTitle>
        <BookCode language="python" showLineNumbers code={`import pandas as pd

# 创建 DataFrame
data = {
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "city": ["北京", "上海", "广州"]
}
df = pd.DataFrame(data)
print(df.head())

# 读取数据
df = pd.read_csv("data.csv")
df = pd.read_excel("data.xlsx")

# 数据操作
print(df.describe())         # 统计摘要
print(df["name"])            # 选择列
filtered = df[df["age"] > 28]
print(df.groupby("city").mean())

# 数据清洗
df.dropna()                  # 删除空值
df.fillna(0)                 # 填充空值
df.drop_duplicates()         # 去重`} />
      </div>
    ),
  },
  {
    label: '可视化',
    left: (
      <div className="space-y-4">
        <PageTitle>Matplotlib 基础</PageTitle>
        <BookCode language="python" showLineNumbers code={`import matplotlib.pyplot as plt

# 折线图
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
plt.plot(x, y, label="线性增长")
plt.xlabel("X轴")
plt.ylabel("Y轴")
plt.title("折线图示例")
plt.legend()
plt.show()

# 柱状图
categories = ["A", "B", "C", "D"]
values = [23, 45, 12, 67]
plt.bar(categories, values)
plt.title("柱状图示例")
plt.show()

# 散点图
import numpy as np
x = np.random.randn(100)
y = np.random.randn(100)
plt.scatter(x, y, alpha=0.5)
plt.title("散点图示例")
plt.show()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多常用库</PageTitle>
        <div className="space-y-3">
          {[
            { name: 'BeautifulSoup', desc: 'HTML/XML 解析，配合 requests 做网络爬虫' },
            { name: 'Flask / FastAPI', desc: '轻量级 Web 框架，快速构建 REST API' },
            { name: 'Django', desc: '全功能 Web 框架，适合大型项目' },
            { name: 'SQLAlchemy', desc: 'ORM 框架，简化数据库操作' },
            { name: 'Pillow', desc: '图片处理库，支持裁剪、滤镜、格式转换' },
            { name: 'PyTorch / TensorFlow', desc: '深度学习框架，构建和训练神经网络' },
          ].map((lib, i) => (
            <div key={i} className="flex gap-3 p-2.5 rounded-md bg-paper-200/60">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: `${THEMES.computer.accent}15`, color: THEMES.computer.accent }}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium text-ink">{lib.name}</h3>
                <p className="text-xs text-ink-light">{lib.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function PackagesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
