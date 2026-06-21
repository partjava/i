'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  ExperimentOutlined,
  CodeOutlined,
  DatabaseOutlined,
  CalculatorOutlined,
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function SyntaxPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">基础语法</h1>
              <p className="text-gray-600 mt-2">
                C++ / 基础语法
              </p>
            </div>
            <Progress type="circle" percent={8} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <CodeOutlined />
                  程序结构
                </span>
              } 
              key="1"
            >
              <Card title="基本程序结构" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 头文件包含
#include <iostream>  // 输入输出流
#include <string>   // 字符串处理
#include <vector>   // 动态数组
using namespace std;  // 使用标准命名空间

// 主函数
int main() {
    // 程序主体
    cout << "Hello, World!" << endl;
    return 0;  // 返回值
}

// 多文件程序结构
// header.h
#ifndef HEADER_H
#define HEADER_H

// 声明
void function();

#endif

// source.cpp
#include "header.h"

// 定义
void function() {
    // 函数实现
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="程序结构要点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>所有C++程序都需要main函数</li>
                      <li>使用预处理器指令包含头文件</li>
                      <li>使用命名空间避免名称冲突</li>
                      <li>头文件保护防止重复包含</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="注释" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 这是单行注释

/* 这是多行注释
   可以跨越多行
   直到结束符 */

// 文档注释示例
/**
 * @brief 函数功能简述
 * @param x 参数说明
 * @return 返回值说明
 */`}
                </CodeBlock>
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined />
                  数据类型
                </span>
              } 
              key="2"
            >
              <Card title="基本数据类型" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 整数类型
int age = 25;            // 整数
short small = 1;         // 短整数
long big = 1000000L;     // 长整数
long long huge = 1000000000LL;  // 超长整数

// 浮点类型
float price = 9.99f;     // 单精度浮点数
double pi = 3.14159;     // 双精度浮点数

// 字符类型
char grade = 'A';        // 单个字符
bool passed = true;      // 布尔值

// 字符串（C++风格）
string name = "Alice";   // 字符串对象`}
                </CodeBlock>
              </Card>

              <Card title="常量定义" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 使用const关键字
const int MAX_SIZE = 100;

// 使用#define预处理指令
#define PI 3.14159

// 枚举常量
enum Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};`}
                </CodeBlock>
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <CalculatorOutlined />
                  运算符
                </span>
              } 
              key="3"
            >
              <Card title="基本运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 算术运算符
int a = 10, b = 3;
int sum = a + b;      // 加法
int diff = a - b;     // 减法
int prod = a * b;     // 乘法
int quot = a / b;     // 除法
int rem = a % b;      // 取余

// 关系运算符
bool isEqual = (a == b);    // 相等
bool notEqual = (a != b);   // 不相等
bool greater = (a > b);     // 大于
bool less = (a < b);        // 小于

// 逻辑运算符
bool result1 = true && false;  // 逻辑与
bool result2 = true || false;  // 逻辑或
bool result3 = !true;          // 逻辑非

// 赋值运算符
int x = 5;
x += 3;      // 等同于 x = x + 3
x -= 2;      // 等同于 x = x - 2
x *= 4;      // 等同于 x = x * 4`}
                </CodeBlock>
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="4"
            >
              <Card title="例题：基本数据类型和运算符的使用" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">编写一个程序，完成以下任务：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>声明并初始化不同类型的变量（整数、浮点数、字符）</li>
                      <li>进行基本的算术运算</li>
                      <li>使用关系运算符进行比较</li>
                      <li>输出运算结果</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
using namespace std;

int main() {
    // 变量声明和初始化
    int num1 = 10;
    int num2 = 3;
    double decimal = 3.14;
    char letter = 'A';
    
    // 算术运算
    cout << "基本运算：" << endl;
    cout << num1 << " + " << num2 << " = " << num1 + num2 << endl;
    cout << num1 << " - " << num2 << " = " << num1 - num2 << endl;
    cout << num1 << " * " << num2 << " = " << num1 * num2 << endl;
    cout << num1 << " / " << num2 << " = " << num1 / num2 << endl;
    cout << num1 << " % " << num2 << " = " << num1 % num2 << endl;
    
    // 类型转换
    cout << "\\n类型转换：" << endl;
    cout << "整数 + 小数: " << num1 + decimal << endl;
    cout << "字符的ASCII值: " << (int)letter << endl;
    
    // 关系运算
    cout << "\\n比较运算：" << endl;
    cout << num1 << " > " << num2 << " 是 " << (num1 > num2) << endl;
    cout << num1 << " < " << num2 << " 是 " << (num1 < num2) << endl;
    cout << num1 << " == " << num2 << " 是 " << (num1 == num2) << endl;
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>变量声明和初始化</li>
                      <li>基本数据类型的使用</li>
                      <li>算术运算符</li>
                      <li>关系运算符</li>
                      <li>类型转换</li>
                      <li>输出格式化</li>
                    </ul>
                  </div>

                  <Alert
                    message="预期输出"
                    description={
                      <pre className="whitespace-pre-wrap">
                        {`基本运算：
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3
10 % 3 = 1

类型转换：
整数 + 小数: 13.14
字符的ASCII值: 65

比较运算：
10 > 3 是 1
10 < 3 是 0
10 == 3 是 0`}
                      </pre>
                    }
                    type="info"
                    showIcon
                  />
                </div>
              </Card>
            </TabPane>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Link 
              href="/study/cpp/setup" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：C++开发环境配置
            </Link>
            <Link 
              href="/study/cpp/variables" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：变量和数据类型
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 