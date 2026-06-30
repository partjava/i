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
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '面向对象编程',
  chapterNumber: 11,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '结构体和类', href: '/study/computer/cpp/structs' },
  nextChapter: { label: '模板编程', href: '/study/computer/cpp/templates' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '封装',
    left: (
      <div className="space-y-4">
        <PageTitle>访问修饰符</PageTitle>
        <BookParagraph>控制类成员的访问权限，实现数据隐藏和接口暴露。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class Student {
private:
    string name;
    int age;
protected:
    int score;
public:
    Student(string n, int a)
        : name(n), age(a), score(0) {}

    void setName(string n) { name = n; }
    string getName() const { return name; }

    void setAge(int a) {
        if (a > 0 && a < 150) age = a;
    }
    int getAge() const { return age; }
};

int main() {
    Student s("张三", 20);
    s.setName("李四");
    // s.name = "王五";  // 错误！
    cout << s.getName() << endl;
}`} />
        <BookAlert type="info" message="封装的优点：提高安全性，隐藏实现细节，提供简单接口，可对数据进行验证" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>构造函数与析构函数</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class Rectangle {
    double width, height;
public:
    Rectangle()
        : width(0), height(0) {}
    Rectangle(double w, double h)
        : width(w), height(h) {}

    // 拷贝构造函数
    Rectangle(const Rectangle& other)
        : width(other.width),
          height(other.height) {}

    // 移动构造函数（C++11）
    Rectangle(Rectangle&& other) noexcept
        : width(other.width),
          height(other.height) {
        other.width = 0;
        other.height = 0;
    }

    // 析构函数
    ~Rectangle() {}

    double area() const { return width * height; }
};`} />
      </div>
    ),
  },
  {
    label: '继承与多态',
    left: (
      <div className="space-y-4">
        <PageTitle>继承</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基类
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual void speak() {
        cout << name << " 发出声音" << endl;
    }
    virtual ~Animal() {}
};

// 派生类
class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}

    void speak() override {  // 重写
        cout << name << " 汪汪！" << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}
    void speak() override {
        cout << name << " 喵喵~" << endl;
    }
};

// 多态使用
void makeSound(Animal& animal) {
    animal.speak();  // 调用的是实际类型的方法
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>虚函数与抽象类</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 抽象类（含纯虚函数）
class Shape {
public:
    virtual double area() const = 0;  // 纯虚函数
    virtual void draw() const = 0;
    virtual ~Shape() {}
};

// 派生类必须实现所有纯虚函数
class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override {
        return 3.14159 * radius * radius;
    }
    void draw() const override {
        cout << "绘制圆形" << endl;
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    void draw() const override {
        cout << "绘制矩形" << endl;
    }
};`} />
        <BookAlert type="info" message="纯虚函数使类成为抽象类，不能实例化。派生类必须实现所有纯虚函数才能被实例化" />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>员工管理系统</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '定义 Employee 基类（姓名、工号、工资）',
            '派生 Manager 和 Developer 类',
            '基类提供虚函数 calculateBonus()',
            '多态计算不同岗位的奖金',
          ]} />
        </div>
        <BookDivider />
        <TagGrid items={['类', '继承', '虚函数', '多态', '封装', '抽象类']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class Employee {
protected:
    string name;
    int id;
    double baseSalary;
public:
    Employee(string n, int i, double s)
        : name(n), id(i), baseSalary(s) {}
    virtual double calculateBonus() = 0;
    virtual void display() {
        cout << name << " 工号:" << id;
    }
    virtual ~Employee() {}
};

class Manager : public Employee {
public:
    Manager(string n, int i, double s)
        : Employee(n, i, s) {}
    double calculateBonus() override {
        return baseSalary * 0.3;
    }
};

class Developer : public Employee {
    int projects;
public:
    Developer(string n, int i, double s, int p)
        : Employee(n, i, s), projects(p) {}
    double calculateBonus() override {
        return baseSalary * 0.2 + projects * 1000;
    }
};`} />
      </div>
    ),
  },
]

export default function OOPPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
