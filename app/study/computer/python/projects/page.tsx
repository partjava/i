'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Python 编程',
  chapterTitle: '项目实战',
  chapterNumber: 11,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '第三方库', href: '/study/computer/python/packages' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '项目一',
    left: (
      <div className="space-y-4">
        <PageTitle>项目：命令行待办事项</PageTitle>
        <BookParagraph>实现一个命令行待办事项管理工具，综合运用文件操作、异常处理和面向对象编程。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`import json
import os
from datetime import datetime

class TodoItem:
    def __init__(self, title, desc="", priority="中"):
        self.id = id(self)
        self.title = title
        self.description = desc
        self.priority = priority
        self.completed = False
        self.created_at = datetime.now()

    def toggle(self):
        self.completed = not self.completed

    def __str__(self):
        status = "✓" if self.completed else "○"
        return f"[{status}] {self.title} ({self.priority})"

class TodoList:
    def __init__(self, filename="todos.json"):
        self.filename = filename
        self.items = []
        self.load()

    def add(self, title, desc="", priority="中"):
        item = TodoItem(title, desc, priority)
        self.items.append(item)
        self.save()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>项目功能实现</PageTitle>
        <BookCode language="python" showLineNumbers code={`    def list_all(self):
        if not self.items:
            print("暂无待办事项")
            return
        for i, item in enumerate(self.items, 1):
            print(f"{i}. {item}")

    def complete(self, index):
        if 0 <= index < len(self.items):
            self.items[index].toggle()
            self.save()

    def delete(self, index):
        if 0 <= index < len(self.items):
            self.items.pop(index)
            self.save()

    def save(self):
        data = [{
            "title": item.title,
            "desc": item.description,
            "priority": item.priority,
            "completed": item.completed
        } for item in self.items]
        with open(self.filename, "w") as f:
            json.dump(data, f, ensure_ascii=False)

    def load(self):
        if os.path.exists(self.filename):
            with open(self.filename, "r") as f:
                data = json.load(f)
                for item_data in data:
                    item = TodoItem(
                        item_data["title"],
                        item_data.get("desc", ""),
                        item_data.get("priority", "中")
                    )
                    item.completed = item_data.get("completed", False)
                    self.items.append(item)`} />
      </div>
    ),
  },
  {
    label: '项目思路',
    left: (
      <div className="space-y-4">
        <PageTitle>更多项目方向</PageTitle>
        <div className="space-y-3">
          {[
            { title: '网页爬虫', desc: '使用 requests + BeautifulSoup 抓取网页数据，存储到 CSV 或数据库' },
            { title: '数据分析报告', desc: '用 pandas 分析数据集，matplotlib 生成可视化图表报告' },
            { title: 'REST API 服务', desc: '用 FastAPI 构建 API，实现增删改查，配合 SQLite 存储' },
            { title: '自动化脚本', desc: '文件批量重命名、邮件自动发送、定时任务调度等' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-md bg-paper-200/60">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: `${THEMES.computer.accent}15`, color: THEMES.computer.accent }}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                <p className="text-xs text-ink-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookList items={[
          '动手实践：编程能力来自实际编码，不是看书看视频',
          '从小项目开始：先完成一个能用的工具，再逐步完善',
          '阅读开源代码：学习他人的代码风格和设计思路',
          '善用搜索引擎：遇到问题先 Google/StackOverflow',
          '编写测试：用 pytest 为代码编写测试，确保质量',
          '代码审查：让他人 review 代码，发现自己的盲区',
        ]} />
        <BookAlert type="info" message="选择你感兴趣的项目开始。不要求大求全，一个可以正常运行的简单项目胜过十个半成品" />
        <TagGrid items={['OOP', '文件IO', 'JSON', 'API', '项目结构']} />
      </div>
    ),
  },
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
