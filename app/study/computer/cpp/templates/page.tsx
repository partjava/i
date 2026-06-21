'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { FunctionOutlined, AppstoreOutlined, RocketOutlined, ExperimentOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <FunctionOutlined />
          函数模板
        </span>
      ),
      children: (
        <Card title="函数模板基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">模板函数定义</h3>
            <p>使用模板实现通用的函数功能。</p>
            <CodeBlock language="cpp">
              {`// 基本函数模板
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// 多类型参数模板
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// 带约束的函数模板（C++20）
template<typename T>
requires std::is_arithmetic_v<T>
T square(T x) {
    return x * x;
}

int main() {
    // 使用函数模板
    cout << max(10, 20) << endl;        // int类型
    cout << max(3.14, 2.72) << endl;    // double类型
    cout << max("hello", "world") << endl; // string类型
    
    // 多类型参数
    cout << add(5, 3.14) << endl;       // int + double
    
    // 带约束的模板
    cout << square(5) << endl;          // 整数
    cout << square(3.14) << endl;       // 浮点数
    // square("hello");                 // 编译错误：不满足约束
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="函数模板特点"
              description={
                <ul className="list-disc pl-6">
                  <li>支持类型参数自动推导</li>
                  <li>可以指定多个模板参数</li>
                  <li>支持约束和概念（C++20）</li>
                  <li>可以进行特化处理特定类型</li>
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
      key: '2',
      label: (
        <span>
          <AppstoreOutlined />
          类模板
        </span>
      ),
      children: (
        <Card title="类模板基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">模板类定义</h3>
            <p>使用模板创建通用的类。</p>
            <CodeBlock language="cpp">
              {`// 基本类模板
template<typename T>
class Array {
private:
    T* data;
    size_t size;
    
public:
    Array(size_t s) : size(s) {
        data = new T[size];
    }
    
    ~Array() {
        delete[] data;
    }
    
    T& operator[](size_t index) {
        if (index >= size) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }
    
    size_t getSize() const { return size; }
};

// 多参数类模板
template<typename T, size_t Size>
class StaticArray {
private:
    T data[Size];
    
public:
    T& operator[](size_t index) {
        return data[index];
    }
    
    const T& operator[](size_t index) const {
        return data[index];
    }
    
    size_t getSize() const { return Size; }
};

// 类模板特化
template<>
class Array<bool> {
private:
    std::vector<bool> data;
    
public:
    Array(size_t s) : data(s) {}
    
    bool operator[](size_t index) const {
        return data[index];
    }
    
    void set(size_t index, bool value) {
        data[index] = value;
    }
};

int main() {
    // 使用类模板
    Array<int> intArray(5);
    for(size_t i = 0; i < intArray.getSize(); ++i) {
        intArray[i] = i * 2;
    }
    
    StaticArray<double, 3> doubleArray;
    doubleArray[0] = 1.1;
    doubleArray[1] = 2.2;
    doubleArray[2] = 3.3;
    
    // 使用特化的bool数组
    Array<bool> boolArray(10);
    boolArray.set(0, true);
    boolArray.set(1, false);
}`}
            </CodeBlock>
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <RocketOutlined />
          高级特性
        </span>
      ),
      children: (
        <Card title="模板高级特性" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">可变参数模板</h3>
            <p>使用可变参数模板处理任意数量的参数。</p>
            <CodeBlock language="cpp">
              {`// 可变参数模板函数
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << std::endl;
}

// 递归方式展开参数包
template<typename T>
T sum(T t) {
    return t;
}

template<typename T, typename... Rest>
T sum(T first, Rest... rest) {
    return first + sum(rest...);
}

// 模板元编程
template<unsigned N>
struct Factorial {
    static constexpr unsigned value = N * Factorial<N-1>::value;
};

template<>
struct Factorial<0> {
    static constexpr unsigned value = 1;
};

// SFINAE示例
template<typename T>
typename std::enable_if<std::is_integral<T>::value, bool>::type
is_odd(T i) {
    return bool(i % 2);
}

template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, bool>::type
is_odd(T x) {
    return bool(std::fmod(x, 2.0));
}

int main() {
    // 可变参数模板
    print(1, 2.0, "three", 'f');
    cout << sum(1, 2, 3, 4, 5) << endl;
    
    // 编译期计算
    constexpr auto fact5 = Factorial<5>::value;
    
    // SFINAE
    cout << is_odd(42) << endl;     // 使用整数版本
    cout << is_odd(3.14) << endl;   // 使用浮点版本
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="高级特性说明"
              description={
                <ul className="list-disc pl-6">
                  <li>可变参数模板支持处理任意数量的模板参数</li>
                  <li>模板元编程允许在编译期进行计算</li>
                  <li>SFINAE用于函数重载的选择</li>
                  <li>C++20引入了概念(Concepts)简化模板约束</li>
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
        <Card title="例题：泛型栈实现" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目描述</h3>
              <p className="mt-2">使用类模板实现一个泛型栈，支持以下功能：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>支持任意数据类型</li>
                <li>支持基本的栈操作（push、pop、top）</li>
                <li>处理栈空和栈满的情况</li>
                <li>提供获取栈大小和判断栈状态的方法</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="cpp">
                {`#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Stack {
private:
    T* elements;        // 栈元素数组
    int capacity;       // 栈容量
    int topIndex;       // 栈顶索引
    
public:
    // 构造函数
    Stack(int size = 10) : capacity(size), topIndex(-1) {
        elements = new T[capacity];
        cout << "创建了容量为 " << capacity << " 的栈" << endl;
    }
    
    // 析构函数
    ~Stack() {
        delete[] elements;
        cout << "栈被销毁" << endl;
    }
    
    // 复制构造函数
    Stack(const Stack& other) : capacity(other.capacity), topIndex(other.topIndex) {
        elements = new T[capacity];
        for (int i = 0; i <= topIndex; i++) {
            elements[i] = other.elements[i];
        }
        cout << "栈被复制" << endl;
    }
    
    // 入栈操作
    void push(const T& item) {
        if (isFull()) {
            throw overflow_error("栈溢出：栈已满");
        }
        elements[++topIndex] = item;
    }
    
    // 出栈操作
    T pop() {
        if (isEmpty()) {
            throw underflow_error("栈下溢：栈为空");
        }
        return elements[topIndex--];
    }
    
    // 获取栈顶元素
    T& top() {
        if (isEmpty()) {
            throw underflow_error("栈为空");
        }
        return elements[topIndex];
    }
    
    // 判断栈是否为空
    bool isEmpty() const {
        return topIndex == -1;
    }
    
    // 判断栈是否已满
    bool isFull() const {
        return topIndex == capacity - 1;
    }
    
    // 获取栈中元素数量
    int size() const {
        return topIndex + 1;
    }
    
    // 获取栈容量
    int getCapacity() const {
        return capacity;
    }
    
    // 清空栈
    void clear() {
        topIndex = -1;
    }
};

int main() {
    try {
        // 整数栈
        Stack<int> intStack(5);
        
        cout << "压入整数：";
        for (int i = 1; i <= 5; i++) {
            intStack.push(i * 10);
            cout << i * 10 << " ";
        }
        cout << endl;
        
        cout << "栈大小：" << intStack.size() << endl;
        cout << "栈容量：" << intStack.getCapacity() << endl;
        cout << "栈顶元素：" << intStack.top() << endl;
        
        cout << "弹出元素：";
        while (!intStack.isEmpty()) {
            cout << intStack.pop() << " ";
        }
        cout << endl;
        
        // 字符串栈
        cout << "\\n创建字符串栈：" << endl;
        Stack<string> stringStack(3);
        
        stringStack.push("C++");
        stringStack.push("模板");
        stringStack.push("编程");
        
        cout << "字符串栈内容：" << endl;
        while (!stringStack.isEmpty()) {
            cout << stringStack.pop() << " ";
        }
        cout << endl;
        
        // 测试异常
        cout << "\\n测试栈空异常：" << endl;
        stringStack.pop();  // 应该抛出异常
        
    } catch (const exception& e) {
        cout << "捕获异常：" << e.what() << endl;
    }
    
    return 0;
}`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>类模板的定义和使用</li>
              <li>模板类的成员函数实现</li>
              <li>动态内存管理</li>
              <li>异常处理</li>
              <li>拷贝构造函数实现</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`创建了容量为 5 的栈
压入整数：10 20 30 40 50 
栈大小：5
栈容量：5
栈顶元素：50
弹出元素：50 40 30 20 10 

创建字符串栈：
创建了容量为 3 的栈
字符串栈内容：
编程 模板 C++ 

测试栈空异常：
捕获异常：栈下溢：栈为空
栈被销毁
栈被销毁`}
              </pre>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">!</span>
                提示
              </div>
              <ul className="list-disc pl-6">
                <li>处理栈满情况时，可以考虑实现自动扩容</li>
                <li>实现栈的迭代器，支持范围遍历</li>
                <li>添加栈的赋值运算符重载以支持栈的赋值</li>
                <li>定义特殊类型的栈特化，如布尔类型栈的优化实现</li>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">模板编程</h1>
              <p className="text-gray-600 mt-2">
                C++ / 模板编程
              </p>
            </div>
            <Progress type="circle" percent={64} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/oop" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            上一课：面向对象编程
          </Link>
          <Link 
            href="/study/cpp/stl" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：STL标准库
          </Link>
        </div>
      </div>
    </div>
  );
} 