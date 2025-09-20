'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph, Text } = Typography;

export default function JavaOopPage() {
  const tabItems = [
    {
      key: '1',
      label: '🧩 类与对象',
      children: (
        <Card title="类与对象" className="mb-6">
          <Paragraph>Java中，类是对象的模板，对象是类的实例。类定义属性和方法，对象通过new关键字创建。</Paragraph>
          <CodeBlock language="java">{`class Person {
    String name;
    int age;

    void sayHello() {
        System.out.println("你好，我是" + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "张三";
        p.age = 20;
        p.sayHello();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>类名首字母大写，文件名与public类名一致</li><li>对象通过new创建，属性和方法用点号访问</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '2',
      label: '🏗️ 构造方法与成员',
      children: (
        <Card title="构造方法与成员" className="mb-6">
          <Paragraph>构造方法用于对象初始化，成员变量和成员方法可加访问修饰符（public/private/protected）。</Paragraph>
          <CodeBlock language="java">{`class Student {
    private String name;
    private int age;

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void show() {
        System.out.println(name + ", " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("李四", 22);
        s.show();
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>构造方法名与类名相同，无返回值</li><li>this用于区分成员变量和参数</li><li>成员变量建议private，方法public</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '3',
      label: '🧬 继承与多态',
      children: (
        <Card title="继承与多态" className="mb-6">
          <Paragraph>Java支持单继承，子类用extends关键字继承父类。多态体现为父类引用指向子类对象，方法重写实现动态绑定。</Paragraph>
          <CodeBlock language="java">{`class Animal {
    void speak() {
        System.out.println("动物发声");
    }
}
class Dog extends Animal {
    void speak() {
        System.out.println("汪汪");
    }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak(); // 输出：汪汪
    }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>子类可重写父类方法（@Override）</li><li>多态：父类引用指向子类对象，调用重写方法</li></ul>} type="info" showIcon />
        </Card>
      )
    },
    {
      key: '4',
      label: '🔗 抽象类与接口',
      children: (
        <Card title="抽象类与接口" className="mb-6">
          <Paragraph>抽象类用abstract修饰，不能实例化，可包含抽象方法。接口用interface定义，支持多实现。</Paragraph>
          <CodeBlock language="java">{`abstract class Shape {
    abstract double area();
}
class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }
}
interface Drawable {
    void draw();
}
class Square extends Shape implements Drawable {
    double a;
    Square(double a) { this.a = a; }
    double area() { return a * a; }
    public void draw() { System.out.println("画正方形"); }
}`}</CodeBlock>
          <Alert message="要点" description={<ul className="list-disc pl-6"><li>抽象类可有普通方法和抽象方法</li><li>接口只定义方法签名，类用implements实现</li></ul>} type="success" showIcon />
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 综合练习与参考答案',
      children: (
        <Card title="综合练习与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              定义一个Circle类，包含半径属性和求面积方法，创建对象并输出面积。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="java">{`class Circle {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }
}
public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(2.0);
        System.out.println(c.area());
    }
}`}</CodeBlock>
                  <Paragraph>解析：构造方法初始化半径，area方法返回面积。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              设计一个Animal父类和Cat、Dog子类，分别重写speak方法，演示多态。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="java">{`class Animal {
    void speak() { System.out.println("动物发声"); }
}
class Cat extends Animal {
    void speak() { System.out.println("喵喵"); }
}
class Dog extends Animal {
    void speak() { System.out.println("汪汪"); }
}
public class Main {
    public static void main(String[] args) {
        Animal a1 = new Cat();
        Animal a2 = new Dog();
        a1.speak(); // 喵喵
        a2.speak(); // 汪汪
    }
}`}</CodeBlock>
                  <Paragraph>解析：父类引用指向子类对象，调用重写方法实现多态。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              定义一个接口Shape，声明area方法，实现Rectangle和Circle类。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="3">
                  <CodeBlock language="java">{`interface Shape {
    double area();
}
class Rectangle implements Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}
class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}`}</CodeBlock>
                  <Paragraph>解析：接口用implements实现，方法需public修饰。</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="多写多练，理解封装、继承、多态和接口的实际应用。" type="info" showIcon />
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Java面向对象</h1>
              <p className="text-gray-600 mt-2">掌握类、对象、继承、多态、接口等OOP核心</p>
            </div>
            <Progress type="circle" percent={30} size={100} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/java/control"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：流程控制
          </Link>
          <Link
            href="/study/java/collections"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：常用类与集合
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 