'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  DatabaseOutlined, 
  FormOutlined, 
  RetweetOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function VariablesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">变量和数据类型</h1>
              <p className="text-gray-600 mt-2">
                C++ / 变量和数据类型
              </p>
            </div>
            <Progress type="circle" percent={10} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined />
                  基本数据类型
                </span>
              } 
              key="1"
            >
              <Card title="整数类型" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 整数类型及其范围
short int shortNum;           // 通常 16 位
int normalNum;               // 通常 32 位
long int longNum;            // 至少 32 位
long long int longlongNum;   // 至少 64 位

// 无符号类型
unsigned short ushortNum;
unsigned int uintNum;
unsigned long ulongNum;

// 实际使用示例
int age = 25;
unsigned int count = 1000;
long long bigNumber = 9223372036854775807LL;`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="说明"
                  description={
                    <ul className="list-disc pl-6">
                      <li>整数类型用于存储整数值</li>
                      <li>不同类型有不同的取值范围</li>
                      <li>无符号类型只能存储非负数</li>
                      <li>使用 LL 后缀表示 long long 类型</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="浮点类型" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 浮点类型
float f = 3.14f;           // 单精度浮点数，通常 32 位
double d = 3.14159;        // 双精度浮点数，通常 64 位
long double ld = 3.14159L; // 扩展精度浮点数

// 科学记数法
double speed = 3e8;        // 3 × 10^8
float small = 1.23e-4f;    // 0.000123

// 精度示例
float pi_f = 3.141592653589793f;  // 可能会损失精度
double pi_d = 3.141592653589793;  // 保持更高精度`}
                </CodeBlock>
              </Card>

              <Card title="字符和布尔类型" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 字符类型
char ch = 'A';            // 单个字符
char newline = '\\n';     // 转义字符
wchar_t wide = L'世';     // 宽字符

// 布尔类型
bool isValid = true;
bool isEmpty = false;

// 字符的ASCII值
int ascii = (int)ch;      // 获取字符的ASCII值
char fromAscii = 65;      // 'A'的ASCII值`}
                </CodeBlock>
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <FormOutlined />
                  变量声明与初始化
                </span>
              } 
              key="2"
            >
              <Card title="变量声明" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 基本声明
int number;         // 声明变量
int value = 42;     // 声明并初始化

// 多个变量声明
int x, y, z;
int a = 1, b = 2, c = 3;

// 常量声明
const double PI = 3.14159;
const int MAX_SIZE = 100;

// 类型推导（C++11）
auto num = 42;      // int
auto pi = 3.14;     // double
auto name = "John"; // const char*`}
                </CodeBlock>
              </Card>

              <Card title="变量作用域" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 全局变量
int globalVar = 100;

void function() {
    // 局部变量
    int localVar = 200;
    
    // 块作用域
    {
        int blockVar = 300;
        // blockVar 只在这个块内可用
    }
    
    // 静态局部变量
    static int staticVar = 400;
    // staticVar 在函数调用之间保持其值
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="作用域规则"
                  description={
                    <ul className="list-disc pl-6">
                      <li>全局变量在整个程序中可访问</li>
                      <li>局部变量只在其声明的函数内可用</li>
                      <li>块作用域变量只在其声明的块内可用</li>
                      <li>静态局部变量在函数调用之间保持其值</li>
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
                  <RetweetOutlined />
                  类型转换
                </span>
              } 
              key="3"
            >
              <Card title="隐式转换" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 自动类型转换
int i = 42;
double d = i;      // int 转 double

char ch = 'A';
int ascii = ch;    // char 转 int

// 可能损失精度的转换
double pi = 3.14159;
int intPi = pi;    // 3（小数部分被截断）

// 算术运算中的转换
int x = 5;
double y = 2.0;
double result = x / y;  // x 被转换为 double`}
                </CodeBlock>
              </Card>

              <Card title="显式转换" className="mb-6">
                <CodeBlock language="cpp">
                  {`// C风格转换
double d = 3.14;
int i1 = (int)d;            // C风格转换

// C++风格转换
int i2 = static_cast<int>(d);   // 更安全的C++风格转换

// 其他C++转换操作符
const int constant = 100;
int* ptr = const_cast<int*>(&constant);  // 移除const

char* str = "Hello";
void* vptr = reinterpret_cast<void*>(str);  // 指针类型转换`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="类型转换注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>优先使用C++风格的类型转换</li>
                      <li>注意数据范围，避免数据丢失</li>
                      <li>const_cast 要谨慎使用</li>
                      <li>reinterpret_cast 主要用于底层操作</li>
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
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="4"
            >
              <Card title="例题：温度转换器" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">编写一个程序，实现以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>声明变量存储摄氏度和华氏度</li>
                      <li>读取用户输入的摄氏度</li>
                      <li>将摄氏度转换为华氏度（公式：F = C * 9/5 + 32）</li>
                      <li>输出转换结果，保留两位小数</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <iomanip>  // 用于设置输出精度
using namespace std;

int main() {
    // 声明变量
    double celsius, fahrenheit;
    
    // 获取用户输入
    cout << "请输入摄氏度: ";
    cin >> celsius;
    
    // 转换温度
    fahrenheit = celsius * 9.0/5.0 + 32;
    
    // 设置输出格式并显示结果
    cout << fixed << setprecision(2);
    cout << celsius << " 摄氏度 = " 
         << fahrenheit << " 华氏度" << endl;
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>double类型的使用</li>
                      <li>基本输入输出</li>
                      <li>算术运算</li>
                      <li>输出格式控制</li>
                      <li>浮点数精度处理</li>
                    </ul>
                  </div>

                  <Alert
                    message="运行示例"
                    description={
                      <pre className="whitespace-pre-wrap">
                        {`请输入摄氏度: 37.5
37.50 摄氏度 = 99.50 华氏度`}
                      </pre>
                    }
                    type="info"
                    showIcon
                  />

                  <Alert
                    message="提示"
                    description={
                      <ul className="list-disc pl-6">
                        <li>使用double类型以保持计算精度</li>
                        <li>注意除法运算时使用9.0而不是9，避免整数除法</li>
                        <li>使用iomanip头文件的setprecision控制输出精度</li>
                        <li>使用fixed确保显示固定小数位数</li>
                      </ul>
                    }
                    type="warning"
                    showIcon
                  />
                </div>
              </Card>
            </TabPane>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Link 
              href="/study/cpp/syntax" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：基础语法
            </Link>
            <Link 
              href="/study/cpp/operators" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：运算符
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 