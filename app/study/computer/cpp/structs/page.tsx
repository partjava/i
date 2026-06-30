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
  chapterTitle: '结构体和类',
  chapterNumber: 10,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '引用', href: '/study/computer/cpp/references' },
  nextChapter: { label: '面向对象编程', href: '/study/computer/cpp/oop' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '结构体基础',
    left: (
      <div className="space-y-4">
        <PageTitle>结构体定义与使用</PageTitle>
        <BookParagraph>结构体是 C++ 中的一种用户自定义数据类型，用于将不同类型的数据组合在一起。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// 结构体定义
struct Student {
    string name;
    int age;
    double gpa;
};

// 创建结构体变量
Student student1;
student1.name = "张三";
student1.age = 20;
student1.gpa = 3.8;

// 创建并初始化
Student student2 = {"李四", 22, 3.9};

// 结构体数组
Student class_roster[30];

// 结构体指针
Student* ptr = &student1;
cout << ptr->name;    // 箭头操作符
cout << (*ptr).age;   // 等价于 ptr->age`} />
        <BookAlert type="info" message="结构体成员默认是公开的(public)，可以包含函数(方法)" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>结构体中的函数</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`struct Rectangle {
    double width;
    double height;

    // 结构体中的函数
    double area() {
        return width * height;
    }
    double perimeter() {
        return 2 * (width + height);
    }
};

// 结构体作为函数参数
void printStudent(Student s) {
    cout << "姓名: " << s.name << endl;
    cout << "年龄: " << s.age << endl;
}

// 使用引用避免复制
void updateGPA(Student& s, double newGPA) {
    s.gpa = newGPA;
}

// 结构体嵌套
struct Point { double x, y; };
struct Line {
    Point start, end;
    double length() {
        return sqrt(pow(end.x-start.x,2) +
                    pow(end.y-start.y,2));
    }
};`} />
      </div>
    ),
  },
  {
    label: '构造函数',
    left: (
      <div className="space-y-4">
        <PageTitle>构造函数与初始化</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`struct Point {
    double x, y;

    // 默认构造函数
    Point() : x(0), y(0) {}

    // 带参数构造函数
    Point(double x, double y)
        : x(x), y(y) {}  // 初始化列表

    // 拷贝构造函数
    Point(const Point& other)
        : x(other.x), y(other.y) {}
};

struct Circle {
    Point center;
    double radius;

    // 委托构造函数（C++11）
    Circle() : Circle({0,0}, 1) {}
    Circle(Point c, double r)
        : center(c), radius(r) {}
};`} />
        <BookAlert type="info" message="优先使用初始化列表而非在构造函数体内赋值。初始化列表效率更高" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>析构函数与 this 指针</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class DynamicArray {
    int* data;
    int size;
public:
    DynamicArray(int n) : size(n) {
        data = new int[n];
    }

    // 析构函数
    ~DynamicArray() {
        delete[] data;  // 释放内存
    }

    // this 指针
    void setValue(int idx, int val) {
        this->data[idx] = val;
    }

    // 返回对象自身的引用
    DynamicArray& fill(int val) {
        for (int i = 0; i < size; i++)
            this->data[i] = val;
        return *this;  // 链式调用
    }
};

// 使用示例
DynamicArray arr(10);
arr.fill(0).setValue(0, 42);`} />
        <BookAlert type="warning" message="如果类中包含了 new 分配的资源，必须提供析构函数释放，否则会造成内存泄漏" />
      </div>
    ),
  },
  {
    label: 'struct vs class',
    left: (
      <div className="space-y-4">
        <PageTitle>struct 与 class 的区别</PageTitle>
        <BookParagraph>C++ 中 struct 和 class 的唯一区别是默认访问权限：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// struct — 默认 public
struct Point {
    int x, y;  // 默认 public
    void print();  // 默认 public
};

// class — 默认 private
class Circle {
    double radius;  // 默认 private
public:
    Circle(double r) : radius(r) {}
    double area();
};

// 都可以使用模板
template<typename T>
struct Box {
    T value;
    T getValue() const { return value; }
};`} />
        <BookAlert type="info" message="通常 struct 用于简单的数据聚合，class 用于需要封装的复杂对象。这只是惯例，技术上均可" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>运算符重载</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`struct Vector2 {
    double x, y;

    Vector2(double x = 0, double y = 0)
        : x(x), y(y) {}

    // 运算符重载
    Vector2 operator+(const Vector2& other) {
        return Vector2(x + other.x,
                       y + other.y);
    }
    Vector2 operator*(double scalar) {
        return Vector2(x * scalar,
                       y * scalar);
    }
    bool operator==(const Vector2& other) {
        return x == other.x && y == other.y;
    }
};

// 使用示例
Vector2 a(1, 2), b(3, 4);
Vector2 c = a + b;   // (4, 6)
Vector2 d = a * 2;   // (2, 4)`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>复数类实现</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '实现一个复数类 Complex',
            '包含实部和虚部成员变量',
            '重载 +、-、* 运算符',
            '实现打印函数 display()',
          ]} />
        </div>
        <BookDivider />
        <PageTitle>知识点</PageTitle>
        <TagGrid items={['struct', 'class', '构造函数', '运算符重载', 'this指针', '初始化列表']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`struct Complex {
    double real, imag;

    Complex(double r = 0, double i = 0)
        : real(r), imag(i) {}

    Complex operator+(const Complex& other) {
        return Complex(real + other.real,
                       imag + other.imag);
    }
    Complex operator-(const Complex& other) {
        return Complex(real - other.real,
                       imag - other.imag);
    }
    Complex operator*(const Complex& other) {
        return Complex(
            real*other.real - imag*other.imag,
            real*other.imag + imag*other.real
        );
    }
    void display() {
        cout << real
             << (imag >= 0 ? "+" : "")
             << imag << "i" << endl;
    }
};

int main() {
    Complex a(3, 4), b(1, 2);
    (a + b).display();  // 4+6i
    (a * b).display();  // -5+10i
}`} />
      </div>
    ),
  },
]

export default function StructsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
