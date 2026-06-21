'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { ClusterOutlined, ApiOutlined, DeploymentUnitOutlined, ExperimentOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function OOPPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <ClusterOutlined />
          封装
        </span>
      ),
      children: (
        <Card title="封装基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">访问修饰符</h3>
            <p>控制类成员的访问权限，实现数据隐藏和接口暴露。</p>
            <CodeBlock language="cpp">
              {`class Student {
private:    // 私有成员，只能在类内部访问
    string name;
    int age;
    
protected:  // 保护成员，可以在派生类中访问
    int score;
    
public:     // 公有成员，可以在类外部访问
    // 构造函数
    Student(string n, int a) : name(n), age(a), score(0) {}
    
    // 公有接口方法
    void setName(string n) {
        name = n;    // 通过公有方法访问私有成员
    }
    
    string getName() const {
        return name;
    }
    
    void setAge(int a) {
        if (a > 0 && a < 150) {  // 数据验证
            age = a;
        }
    }
    
    int getAge() const {
        return age;
    }
};

// 类的使用
int main() {
    Student s("张三", 20);
    s.setName("李四");     // 正确：通过公有方法访问私有成员
    // s.name = "王五";    // 错误：私有成员不能直接访问
    cout << s.getName() << endl;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="封装的优点"
              description={
                <ul className="list-disc pl-6">
                  <li>提高代码的安全性，防止数据被非法访问</li>
                  <li>隐藏实现细节，提供简单的接口</li>
                  <li>可以对数据进行验证，保证数据的有效性</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold">构造函数和析构函数</h3>
            <p>对象的创建和销毁机制。</p>
            <CodeBlock language="cpp">
              {`class Rectangle {
private:
    double width;
    double height;
    
public:
    // 默认构造函数
    Rectangle() : width(0), height(0) {
        cout << "默认构造函数被调用" << endl;
    }
    
    // 带参数的构造函数
    Rectangle(double w, double h) : width(w), height(h) {
        cout << "带参构造函数被调用" << endl;
    }
    
    // 拷贝构造函数
    Rectangle(const Rectangle& other) : width(other.width), height(other.height) {
        cout << "拷贝构造函数被调用" << endl;
    }
    
    // 析构函数
    ~Rectangle() {
        cout << "析构函数被调用" << endl;
    }
    
    // 移动构造函数（C++11）
    Rectangle(Rectangle&& other) noexcept 
        : width(other.width), height(other.height) {
        other.width = 0;
        other.height = 0;
        cout << "移动构造函数被调用" << endl;
    }
};

int main() {
    Rectangle r1;                // 调用默认构造函数
    Rectangle r2(3.0, 4.0);     // 调用带参构造函数
    Rectangle r3 = r2;          // 调用拷贝构造函数
    Rectangle r4 = std::move(r1);// 调用移动构造函数
}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <ApiOutlined />
          继承
        </span>
      ),
      children: (
        <Card title="继承基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">基类和派生类</h3>
            <p>通过继承实现代码重用和多层次的类层次结构。</p>
            <CodeBlock language="cpp">
              {`// 基类
class Animal {
protected:
    string name;
    int age;
    
public:
    Animal(string n, int a) : name(n), age(a) {}
    
    virtual void makeSound() {
        cout << "动物发出声音" << endl;
    }
    
    virtual ~Animal() {}  // 虚析构函数
};

// 派生类
class Dog : public Animal {
private:
    string breed;  // 品种
    
public:
    Dog(string n, int a, string b) 
        : Animal(n, a), breed(b) {}
    
    // 重写基类的虚函数
    void makeSound() override {
        cout << "汪汪汪！" << endl;
    }
    
    void fetch() {
        cout << name << "在接飞盘" << endl;
    }
};

// 多重继承
class Bird : public Animal {
protected:
    double wingspan;  // 翼展
    
public:
    Bird(string n, int a, double w)
        : Animal(n, a), wingspan(w) {}
    
    void makeSound() override {
        cout << "啾啾啾！" << endl;
    }
    
    virtual void fly() {
        cout << "鸟儿在飞翔" << endl;
    }
};

// 使用示例
int main() {
    Animal* animals[] = {
        new Dog("旺财", 3, "金毛"),
        new Bird("小鸟", 1, 20.5)
    };
    
    for (auto animal : animals) {
        animal->makeSound();  // 多态调用
    }
    
    // 注意内存管理
    for (auto animal : animals) {
        delete animal;
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="继承的特点"
              description={
                <ul className="list-disc pl-6">
                  <li>支持代码重用，避免重复编写相似代码</li>
                  <li>通过虚函数实现多态</li>
                  <li>注意使用虚析构函数防止内存泄漏</li>
                  <li>慎用多重继承，可能导致菱形继承问题</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <DeploymentUnitOutlined />
          多态
        </span>
      ),
      children: (
        <Card title="多态性" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">虚函数和动态绑定</h3>
            <p>通过虚函数实现运行时的多态行为。</p>
            <CodeBlock language="cpp">
              {`class Shape {
public:
    virtual double area() const = 0;  // 纯虚函数
    virtual double perimeter() const = 0;
    virtual void draw() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double area() const override {
        return 3.14159 * radius * radius;
    }
    
    double perimeter() const override {
        return 2 * 3.14159 * radius;
    }
    
    void draw() const override {
        cout << "绘制圆形" << endl;
    }
};

class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    double area() const override {
        return width * height;
    }
    
    double perimeter() const override {
        return 2 * (width + height);
    }
    
    void draw() const override {
        cout << "绘制矩形" << endl;
    }
};

// 多态的使用
void printShapeInfo(const Shape& shape) {
    cout << "面积: " << shape.area() << endl;
    cout << "周长: " << shape.perimeter() << endl;
    shape.draw();
}

int main() {
    Circle circle(5);
    Rectangle rect(4, 6);
    
    printShapeInfo(circle);  // 多态调用
    printShapeInfo(rect);    // 多态调用
    
    // 使用容器存储不同类型的对象
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(3));
    shapes.push_back(make_unique<Rectangle>(2, 4));
    
    for (const auto& shape : shapes) {
        printShapeInfo(*shape);
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="多态的应用"
              description={
                <ul className="list-disc pl-6">
                  <li>通过基类指针或引用调用派生类的函数</li>
                  <li>使用纯虚函数定义接口</li>
                  <li>利用智能指针管理对象生命周期</li>
                  <li>在容器中存储不同类型的对象</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="例题：简易计算器类" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目描述</h3>
              <p className="mt-2">设计一个简单的计算器类，具有以下功能：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>实现基本的加减乘除运算</li>
                <li>记录计算历史</li>
                <li>支持清除当前结果</li>
                <li>处理除数为零的情况</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="cpp">
                {`#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Calculator {
private:
    double result;
    vector<string> history;
    
    // 将操作添加到历史记录
    void addToHistory(double a, double b, char op, double res) {
        string record = to_string(a) + " " + op + " " + to_string(b) + " = " + to_string(res);
        history.push_back(record);
    }
    
public:
    // 构造函数
    Calculator() : result(0) {
        cout << "计算器已初始化，当前结果: " << result << endl;
    }
    
    // 加法运算
    double add(double a, double b) {
        result = a + b;
        addToHistory(a, b, '+', result);
        return result;
    }
    
    // 减法运算
    double subtract(double a, double b) {
        result = a - b;
        addToHistory(a, b, '-', result);
        return result;
    }
    
    // 乘法运算
    double multiply(double a, double b) {
        result = a * b;
        addToHistory(a, b, '*', result);
        return result;
    }
    
    // 除法运算
    double divide(double a, double b) {
        if (b == 0) {
            cout << "错误：除数不能为零！" << endl;
            return result; // 不改变当前结果
        }
        
        result = a / b;
        addToHistory(a, b, '/', result);
        return result;
    }
    
    // 获取当前结果
    double getResult() const {
        return result;
    }
    
    // 清除当前结果
    void clear() {
        result = 0;
        cout << "结果已清零" << endl;
    }
    
    // 显示计算历史
    void showHistory() const {
        if (history.empty()) {
            cout << "没有计算历史" << endl;
            return;
        }
        
        cout << "计算历史记录:" << endl;
        for (size_t i = 0; i < history.size(); i++) {
            cout << i+1 << ". " << history[i] << endl;
        }
    }
};

int main() {
    Calculator calc;
    
    cout << "10 + 5 = " << calc.add(10, 5) << endl;
    cout << "20 - 7 = " << calc.subtract(20, 7) << endl;
    cout << "4 * 8 = " << calc.multiply(4, 8) << endl;
    cout << "当前结果: " << calc.getResult() << endl;
    
    // 测试除零情况
    cout << "尝试除以零: ";
    calc.divide(10, 0);
    
    // 显示历史记录
    calc.showHistory();
    
    // 清除结果
    calc.clear();
    
    return 0;
}`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>类的声明和实现</li>
              <li>成员变量封装</li>
              <li>公共接口和私有实现</li>
              <li>错误处理和异常情况</li>
              <li>使用vector存储历史记录</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`计算器已初始化，当前结果: 0
10 + 5 = 15
20 - 7 = 13
4 * 8 = 32
当前结果: 32
尝试除以零: 错误：除数不能为零！
计算历史记录:
1. 10.000000 + 5.000000 = 15.000000
2. 20.000000 - 7.000000 = 13.000000
3. 4.000000 * 8.000000 = 32.000000
结果已清零`}
              </pre>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">!</span>
                提示
              </div>
              <ul className="list-disc pl-6">
                <li>注意处理除数为零的特殊情况</li>
                <li>可以扩展该计算器，添加更多功能（如开方、取余等）</li>
                <li>考虑添加误差处理，解决浮点数精度问题</li>
                <li>可以添加撤销操作，恢复到上一次的结果</li>
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">面向对象编程</h1>
              <p className="text-gray-600 mt-2">学习C++中的封装、继承和多态特性</p>
            </div>
            <Progress type="circle" percent={60} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/structs" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：结构体和类
          </Link>
          <Link
            href="/study/cpp/templates"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：模板编程
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 