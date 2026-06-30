'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '面向对象', chapterNumber: 4, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '流程控制', href: '/study/computer/java/control' },
  nextChapter: { label: '常用类与集合', href: '/study/computer/java/collections' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '类与对象',
    left: (
      <div className="space-y-4">
        <PageTitle>类的定义</PageTitle>
        <BookParagraph>Java 是纯粹的面向对象语言，类是对现实事物的抽象。通过封装数据和方法，实现高内聚低耦合的设计。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`public class Student {
    private String name;
    private int age;
    private double score;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public void study() {
        System.out.println(name + " 正在学习");
    }
}

// 使用
Student s = new Student("Alice", 20);
s.study();
s.setName("Bob");`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>封装与访问控制</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 访问修饰符
public class Person {
    public String name;       // 所有类可访问
    protected int age;        // 子类+同包
    String address;           // 默认：同包
    private double salary;    // 仅本类

    // Getter/Setter
    public double getSalary() { return salary; }
    public void setSalary(double s) { salary = s; }

    // 静态成员
    public static int count = 0;
    public static void showCount() {
        System.out.println(count);
    }
}`} />
        <BookAlert type="info" message="封装的核心原则：隐藏内部实现，暴露必要接口。使用 private 保护数据，通过 public 方法提供安全访问" />
      </div>
    ),
  },
  {
    label: '继承与多态',
    left: (
      <div className="space-y-4">
        <PageTitle>继承</PageTitle>
        <BookCode language="java" showLineNumbers code={`public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public void speak() {
        System.out.println(name + ": 汪汪！");
    }
}

public class Cat extends Animal {
    public Cat(String name) { super(name); }
    @Override
    public void speak() {
        System.out.println(name + ": 喵喵~");
    }
}

// 多态
Animal a = new Dog("旺财");
Animal b = new Cat("咪咪");
a.speak();  // 旺财: 汪汪！
b.speak();  // 咪咪: 喵喵~`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>抽象类与接口</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 抽象类
public abstract class Shape {
    public abstract double area();
    public void print() { System.out.println("面积:" + area()); }
}

// 接口
public interface Drawable {
    void draw();
    default void show() { System.out.println("显示"); }
}

public class Circle extends Shape implements Drawable {
    private double r;
    public Circle(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }
    @Override public void draw() { System.out.println("画圆"); }
}`} />
        <TagGrid items={['类', '对象', '封装', '继承', '多态', '接口']} />
      </div>
    ),
  },
  {
    label: '练习',
    left: (<div className="space-y-4"><PageTitle>员工管理系统</PageTitle><BookList items={['Employee 基类', 'Manager/Developer 派生', '计算工资多态', '使用接口']} /></div>),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="java" showLineNumbers code={`abstract class Employee {
    protected String name; protected double base;
    public Employee(String n, double b) { name = n; base = b; }
    public abstract double getSalary();
}
class Manager extends Employee {
    public Manager(String n, double b) { super(n, b); }
    @Override public double getSalary() { return base * 1.5; }
}
class Developer extends Employee {
    private int projects;
    public Developer(String n, double b, int p) { super(n, b); projects = p; }
    @Override public double getSalary() { return base + projects * 2000; }
}`} />
      </div>
    ),
  },
]

export default function JavaOOPPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
