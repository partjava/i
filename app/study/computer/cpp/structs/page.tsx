'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  BlockOutlined,
  ApiOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function StructsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">结构体和类</h1>
              <p className="text-gray-600 mt-2">
                C++ / 结构体和类
              </p>
            </div>
            <Progress type="circle" percent={50} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <BlockOutlined />
                  结构体基础
                </span>
              } 
              key="1"
            >
              <Card title="结构体简介" className="mb-6">
                <p className="mb-4">结构体是C++中的一种用户自定义数据类型，用于将不同类型的数据组合在一起。</p>
                <CodeBlock language="cpp">{`// 结构体定义
struct Student {
    string name;      // 成员变量
    int age;
    double gpa;
};

// 创建结构体变量
Student student1;
student1.name = "张三";  // 访问成员
student1.age = 20;
student1.gpa = 3.8;

// 创建并初始化
Student student2 = {"李四", 22, 3.9};

// 结构体数组
Student class_roster[30];

// 结构体指针
Student* ptr = &student1;
cout << ptr->name;    // 使用箭头操作符访问成员
cout << (*ptr).age;   // 等价于 ptr->age

// 结构体作为函数参数
void printStudent(Student s) {
    cout << "姓名: " << s.name << endl;
    cout << "年龄: " << s.age << endl;
    cout << "GPA: " << s.gpa << endl;
}

// 使用引用避免复制
void updateGPA(Student& s, double newGPA) {
    s.gpa = newGPA;  // 修改原始结构体
}

// 结构体中的函数
struct Rectangle {
    double width;
    double height;
    
    // 结构体中的函数
    double area() {
        return width * height;
    }
    
    double perimeter() {
        return 2 * (width + height);
    }
};`}</CodeBlock>
                <Alert
                  className="mt-4"
                  message="结构体要点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>结构体成员默认是公开的(public)</li>
                      <li>结构体可以包含函数(方法)</li>
                      <li>结构体可以有构造函数和析构函数</li>
                      <li>结构体与类的主要区别是成员默认的访问权限</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <ApiOutlined />
                  类与对象
                </span>
              } 
              key="2"
            >
              <Card title="类的定义和使用" className="mb-6">
                <p className="mb-4">类是C++面向对象编程的基础，它将数据和操作数据的函数封装在一起。</p>
                <CodeBlock language="cpp">{`// 类定义
class Student {
private:              // 私有成员，只能在类内部访问
    string name;
    int age;
    double gpa;
    
public:               // 公开成员，可以在类外部访问
    // 构造函数
    Student() {
        name = "未命名";
        age = 0;
        gpa = 0.0;
    }
    
    // 带参数的构造函数
    Student(string n, int a, double g) {
        name = n;
        age = a;
        gpa = g;
    }
    
    // 析构函数
    ~Student() {
        cout << name << "对象被销毁" << endl;
    }
    
    // 成员函数 (方法)
    void display() {
        cout << "姓名: " << name << endl;
        cout << "年龄: " << age << endl;
        cout << "GPA: " << gpa << endl;
    }
    
    // getter 方法
    string getName() { return name; }
    int getAge() { return age; }
    double getGPA() { return gpa; }
    
    // setter 方法
    void setName(string n) { name = n; }
    void setAge(int a) { 
        if (a > 0) age = a; 
    }
    void setGPA(double g) { 
        if (g >= 0.0 && g <= 4.0) gpa = g; 
    }
};

// 创建对象
Student s1;              // 使用默认构造函数
Student s2("王五", 19, 3.7); // 使用带参数构造函数

// 调用成员函数
s2.display();

// 使用getter和setter
cout << s2.getName() << endl;
s2.setGPA(3.9);`}</CodeBlock>
                <Alert
                  className="mt-4"
                  message="类与封装"
                  description={
                    <ul className="list-disc pl-6">
                      <li>类的成员默认是私有的(private)</li>
                      <li>通过访问修饰符(public, private, protected)控制成员的可见性</li>
                      <li>使用getter和setter方法控制对私有数据的访问</li>
                      <li>构造函数用于初始化对象，析构函数用于清理资源</li>
                    </ul>
                  }
                  type="warning"
                  showIcon
                />
              </Card>
              
              <Card title="类的高级特性" className="mb-6">
                <CodeBlock language="cpp">{`// 静态成员和方法
class MathUtils {
private:
    static int count;  // 静态成员变量声明
    
public:
    // 静态方法
    static int add(int a, int b) {
        count++;
        return a + b;
    }
    
    static int getCount() {
        return count;
    }
};

// 静态成员变量定义（在类外）
int MathUtils::count = 0;

// 调用静态方法
int sum = MathUtils::add(5, 3);
cout << "方法调用次数: " << MathUtils::getCount() << endl;

// 友元函数和友元类
class Room {
private:
    double width, length, height;
    
public:
    Room(double w, double l, double h) {
        width = w;
        length = l;
        height = h;
    }
    
    // 声明友元函数，可以访问私有成员
    friend double calculateVolume(Room& r);
};

// 友元函数实现
double calculateVolume(Room& r) {
    return r.width * r.length * r.height;
}

// 使用友元函数
Room bedroom(4.0, 5.0, 3.0);
cout << "体积: " << calculateVolume(bedroom) << endl;

// const 成员函数
class Circle {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    // const成员函数不能修改对象
    double getArea() const {
        return 3.14159 * radius * radius;
    }
};`}</CodeBlock>
              </Card>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="3"
            >
              <Card title="例题1：创建一个银行账户类" className="mb-6">
                <p className="mb-3">实现一个有存取款功能的简单银行账户类：</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountNumber;
    string ownerName;
    double balance;
    
public:
    // 构造函数
    BankAccount(string number, string name, double initialDeposit = 0.0) {
        accountNumber = number;
        ownerName = name;
        balance = initialDeposit;
    }
    
    // 存款方法
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "存入 " << amount << " 元，当前余额: " << balance << " 元" << endl;
        } else {
            cout << "存款金额必须为正数！" << endl;
        }
    }
    
    // 取款方法
    bool withdraw(double amount) {
        if (amount <= 0) {
            cout << "取款金额必须为正数！" << endl;
            return false;
        }
        
        if (amount > balance) {
            cout << "余额不足！当前余额: " << balance << " 元" << endl;
            return false;
        }
        
        balance -= amount;
        cout << "取出 " << amount << " 元，当前余额: " << balance << " 元" << endl;
        return true;
    }
    
    // 查询余额
    double getBalance() const {
        return balance;
    }
    
    // 显示账户信息
    void displayInfo() const {
        cout << "账号: " << accountNumber << endl;
        cout << "户名: " << ownerName << endl;
        cout << "余额: " << balance << " 元" << endl;
    }
};

int main() {
    // 创建银行账户
    BankAccount account1("6225123456789", "张三", 1000.0);
    
    // 显示初始信息
    cout << "账户创建成功！" << endl;
    account1.displayInfo();
    cout << endl;
    
    // 测试存款
    account1.deposit(500.0);
    account1.deposit(-100.0);  // 测试错误情况
    cout << endl;
    
    // 测试取款
    account1.withdraw(200.0);
    account1.withdraw(2000.0); // 测试余额不足
    cout << endl;
    
    // 显示最终信息
    cout << "最终账户信息：" << endl;
    account1.displayInfo();
    
    return 0;
}`}</CodeBlock>
              </Card>
              
              <Card title="例题2：使用结构体和类实现点和圆" className="mb-6">
                <p className="mb-3">结合结构体和类，实现点和圆的关系判断：</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <cmath>
using namespace std;

// 使用结构体表示点
struct Point {
    double x, y;
    
    // 计算两点之间的距离
    double distanceTo(const Point& other) const {
        double dx = x - other.x;
        double dy = y - other.y;
        return sqrt(dx*dx + dy*dy);
    }
};

// 使用类表示圆
class Circle {
private:
    Point center;
    double radius;
    
public:
    Circle(Point c, double r) : center(c), radius(r) {}
    
    // 判断点与圆的关系
    string relationToPoint(const Point& p) const {
        double distance = center.distanceTo(p);
        
        if (distance < radius) {
            return "点在圆内";
        } else if (distance == radius) {
            return "点在圆上";
        } else {
            return "点在圆外";
        }
    }
    
    // 判断两个圆的关系
    string relationToCircle(const Circle& other) const {
        double distance = center.distanceTo(other.center);
        double sumRadius = radius + other.radius;
        double diffRadius = abs(radius - other.radius);
        
        if (distance > sumRadius) {
            return "两圆相离";
        } else if (distance == sumRadius) {
            return "两圆外切";
        } else if (distance < sumRadius && distance > diffRadius) {
            return "两圆相交";
        } else if (distance == diffRadius) {
            return "两圆内切";
        } else {
            return "一个圆在另一个圆内部";
        }
    }
};

int main() {
    // 创建点和圆
    Point p1 = {0, 0};
    Point p2 = {3, 0};
    Point p3 = {5, 0};
    
    Circle c1({0, 0}, 4.0);
    Circle c2({6, 0}, 2.0);
    
    // 点与圆的关系
    cout << "p1" << c1.relationToPoint(p1) << endl;  // 点在圆内
    cout << "p2" << c1.relationToPoint(p2) << endl;  // 点在圆内
    cout << "p3" << c1.relationToPoint(p3) << endl;  // 点在圆外
    
    // 圆与圆的关系
    cout << "c1和c2: " << c1.relationToCircle(c2) << endl;  // 两圆相交
    
    return 0;
}`}</CodeBlock>
              </Card>
            </TabPane>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Link 
              href="/study/cpp/references" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：引用
            </Link>
            <Link 
              href="/study/cpp/oop" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：面向对象编程
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 