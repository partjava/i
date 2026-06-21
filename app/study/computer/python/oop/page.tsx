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
  chapterTitle: '面向对象编程',
  chapterNumber: 7,
  totalChapters: 11,
  subjectHref: '/study/computer/python',
  prevChapter: { label: '文件操作', href: '/study/computer/python/file-io' },
  nextChapter: { label: '异常处理', href: '/study/computer/python/exceptions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '类与对象',
    left: (
      <div className="space-y-4">
        <PageTitle>类的定义与使用</PageTitle>
        <BookParagraph>Python 是一种面向对象的语言，通过类来组织代码。</BookParagraph>
        <BookCode language="python" showLineNumbers code={`class Student:
    """学生类"""

    # 类变量（所有实例共享）
    school = "Python编程学院"

    # 初始化方法（构造函数）
    def __init__(self, name, age, grade):
        self.name = name    # 实例变量
        self.age = age
        self.grade = grade

    # 实例方法
    def introduce(self):
        return f"我叫{self.name}，今年{self.age}岁，{self.grade}年级"

    def study(self, hours):
        print(f"{self.name}学习了{hours}小时")

# 创建实例
student1 = Student("小明", 18, "高三")
print(student1.introduce())  # 我叫小明，今年18岁，高三年级`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实例变量与类变量</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 访问和修改属性
student1 = Student("小明", 18, "高三")
print(student1.school)    # Python编程学院
student1.name = "小红"    # 修改实例变量

# __dict__ 查看所有实例变量
print(student1.__dict__)

# 类方法
@classmethod
def get_school(cls):
    return cls.school

# 静态方法
@staticmethod
def validate_age(age):
    return 0 <= age <= 150

# property 装饰器
@property
def info(self):
    return f"{self.name}-{self.age}"

# setter
@info.setter
def info(self, value):
    self.name, self.age = value.split("-")`} />
      </div>
    ),
  },
  {
    label: '继承',
    left: (
      <div className="space-y-4">
        <PageTitle>继承与多态</PageTitle>
        <BookCode language="python" showLineNumbers code={`# 基类
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

# 派生类
class Dog(Animal):
    def speak(self):
        return f"{self.name}: 汪汪！"

class Cat(Animal):
    def speak(self):
        return f"{self.name}: 喵喵~"

# 多态
def make_sound(animal):
    print(animal.speak())

animals = [Dog("旺财"), Cat("咪咪")]
for animal in animals:
    make_sound(animal)

# 旺财: 汪汪！
# 咪咪: 喵喵~`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>特殊方法与运算符重载</PageTitle>
        <BookCode language="python" showLineNumbers code={`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
print(v1 * 3)   # Vector(3, 6)`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>图书管理系统</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '实现 Book 类（标题、作者、ISBN、状态）',
            '实现 Library 类（添加、借出、归还、搜索）',
            '使用特殊方法让图书支持 print()',
            '添加异常处理防止重复借出',
          ]} />
        </div>
        <TagGrid items={['class', '继承', '多态', '特殊方法', '封装']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="python" showLineNumbers code={`class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_borrowed = False

    def __str__(self):
        status = "已借出" if self.is_borrowed else "可借"
        return f"{self.title} - {self.author} [{status}]"

class Library:
    def __init__(self):
        self.books = {}

    def add_book(self, book):
        self.books[book.isbn] = book

    def borrow(self, isbn):
        book = self.books.get(isbn)
        if not book: raise KeyError("图书不存在")
        if book.is_borrowed: raise ValueError("已被借出")
        book.is_borrowed = True

    def search(self, keyword):
        return [b for b in self.books.values()
                if keyword.lower() in b.title.lower()]

# 使用
lib = Library()
lib.add_book(Book("Python编程", "张三", "978-7-111-1"))
lib.add_book(Book("算法导论", "李四", "978-7-111-2"))`} />
      </div>
    ),
  },
]

export default function OOPPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
