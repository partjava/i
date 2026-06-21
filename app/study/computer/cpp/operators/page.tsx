'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  CalculatorOutlined,
  SwapOutlined,
  BranchesOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function OperatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">运算符</h1>
              <p className="text-gray-600 mt-2">
                C++ / 运算符
              </p>
            </div>
            <Progress type="circle" percent={15} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <CalculatorOutlined />
                  算术运算符
                </span>
              } 
              key="1"
            >
              <Card title="基本算术运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 基本算术运算符
int a = 10, b = 3;

int sum = a + b;      // 加法: 13
int diff = a - b;     // 减法: 7
int prod = a * b;     // 乘法: 30
int quot = a / b;     // 除法: 3（整数除法）
int rem = a % b;      // 取余: 1

// 浮点数运算
double x = 10.5, y = 3.2;
double result = x / y;  // 3.28125（浮点除法）

// 自增和自减
int i = 5;
i++;                // 后缀自增：先使用，再加1
++i;                // 前缀自增：先加1，再使用
i--;                // 后缀自减：先使用，再减1
--i;                // 前缀自减：先减1，再使用`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>整数除法会截断小数部分</li>
                      <li>取余运算只适用于整数</li>
                      <li>前缀和后缀自增/自减的区别在于返回值的时机</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="复合赋值运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`int x = 10;

x += 5;     // 等同于 x = x + 5;  结果：15
x -= 3;     // 等同于 x = x - 3;  结果：12
x *= 2;     // 等同于 x = x * 2;  结果：24
x /= 4;     // 等同于 x = x / 4;  结果：6
x %= 4;     // 等同于 x = x % 4;  结果：2

// 位运算的复合赋值
int bits = 0b1010;  // 二进制：1010
bits &= 0b1100;     // 按位与赋值：1000
bits |= 0b0011;     // 按位或赋值：1011
bits ^= 0b0101;     // 按位异或赋值：1110
bits <<= 2;         // 左移赋值：111000
bits >>= 1;         // 右移赋值：11100`}
                </CodeBlock>
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <SwapOutlined />
                  关系和逻辑运算符
                </span>
              } 
              key="2"
            >
              <Card title="关系运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`int a = 5, b = 10;

bool isEqual = (a == b);     // 相等：false
bool notEqual = (a != b);    // 不相等：true
bool less = (a < b);         // 小于：true
bool greater = (a > b);      // 大于：false
bool lessEq = (a <= b);      // 小于等于：true
bool greaterEq = (a >= b);   // 大于等于：false

// 浮点数比较
double x = 0.1 + 0.2;
double y = 0.3;
// 不要直接比较浮点数
bool isClose = abs(x - y) < 0.000001;  // 使用误差范围比较`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="浮点数比较注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>不要直接用 == 比较浮点数</li>
                      <li>应该使用一个很小的误差范围（epsilon）来比较</li>
                      <li>考虑使用 <code>std::numeric_limits</code> 中定义的 epsilon</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="逻辑运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`bool a = true, b = false;

bool andResult = a && b;    // 逻辑与：false
bool orResult = a || b;     // 逻辑或：true
bool notResult = !a;        // 逻辑非：false

// 短路求值
int x = 5;
bool result = (x > 10) && (x++ < 20);  // x++ 不会执行
// x 仍然是 5

// 复杂条件
int age = 25;
bool hasID = true;
bool canVote = (age >= 18) && hasID;  // true

// 多重条件
int score = 85;
bool isPassing = (score >= 60) && (score <= 100);  // true`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="逻辑运算符特点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>支持短路求值：&& 左边为 false 时不计算右边</li>
                      <li>|| 左边为 true 时不计算右边</li>
                      <li>可以组合多个条件形成复杂的逻辑表达式</li>
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
                  <BranchesOutlined />
                  位运算符
                </span>
              } 
              key="3"
            >
              <Card title="位运算符" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 位运算示例
int a = 0b1100;  // 二进制：1100
int b = 0b1010;  // 二进制：1010

int andResult = a & b;   // 位与：1000
int orResult = a | b;    // 位或：1110
int xorResult = a ^ b;   // 位异或：0110
int notResult = ~a;      // 位取反：0011

// 移位运算
int num = 8;            // 二进制：1000
int leftShift = num << 1;   // 左移1位：10000 (16)
int rightShift = num >> 1;  // 右移1位：0100 (4)

// 实际应用
// 1. 设置位
int flags = 0;
flags |= (1 << 3);    // 设置第3位为1

// 2. 清除位
flags &= ~(1 << 3);   // 清除第3位

// 3. 检查位
bool isBitSet = (flags & (1 << 3)) != 0;

// 4. 切换位
flags ^= (1 << 3);    // 切换第3位的状态`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="位运算应用场景"
                  description={
                    <ul className="list-disc pl-6">
                      <li>标志位操作（如权限控制）</li>
                      <li>优化某些数学运算</li>
                      <li>数据压缩</li>
                      <li>硬件控制</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="运算符优先级" className="mb-6">
                <Alert
                  message="常见运算符优先级（从高到低）"
                  description={
                    <ol className="list-decimal pl-6">
                      <li>() [] -{'>'} . :: - 成员访问和作用域解析</li>
                      <li>! ~ ++ -- + - * & (type) sizeof - 一元运算符</li>
                      <li>* / % - 乘除</li>
                      <li>+ - - 加减</li>
                      <li>{'<<'} {'>>'} - 移位</li>
                      <li>{'<'} {'<='} {'>'} {'>='} - 关系运算符</li>
                      <li>== != - 相等性测试</li>
                      <li>&& - 逻辑与</li>
                      <li>|| - 逻辑或</li>
                      <li>?: - 条件运算符</li>
                      <li>= += -= *= /= %= {'>>='} {'<<='} &= ^= |= - 赋值</li>
                      <li>, - 逗号运算符</li>
                    </ol>
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
              <Card title="例题：简单计算器" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">编写一个简单的计算器程序，实现以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>接收用户输入的两个数字</li>
                      <li>提供加、减、乘、除、取余五种运算</li>
                      <li>处理除数为零的情况</li>
                      <li>使用逻辑运算符进行输入验证</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char op;
    
    // 获取输入
    cout << "请输入第一个数: ";
    cin >> num1;
    
    cout << "请输入运算符 (+, -, *, /, %): ";
    cin >> op;
    
    cout << "请输入第二个数: ";
    cin >> num2;
    
    // 使用逻辑运算符验证输入
    if (op != '+' && op != '-' && op != '*' && op != '/' && op != '%') {
        cout << "无效的运算符！" << endl;
        return 1;
    }
    
    // 检查除数是否为零
    if ((op == '/' || op == '%') && num2 == 0) {
        cout << "错误：除数不能为零！" << endl;
        return 1;
    }
    
    // 执行计算
    switch(op) {
        case '+':
            cout << num1 << " + " << num2 << " = " << num1 + num2 << endl;
            break;
        case '-':
            cout << num1 << " - " << num2 << " = " << num1 - num2 << endl;
            break;
        case '*':
            cout << num1 << " * " << num2 << " = " << num1 * num2 << endl;
            break;
        case '/':
            cout << num1 << " / " << num2 << " = " << num1 / num2 << endl;
            break;
        case '%':
            // 注意：取模运算只能用于整数
            cout << (int)num1 << " % " << (int)num2 << " = " 
                 << (int)num1 % (int)num2 << endl;
            break;
    }
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>算术运算符的使用</li>
                      <li>逻辑运算符用于输入验证</li>
                      <li>类型转换（浮点数到整数）</li>
                      <li>条件语句和switch语句</li>
                      <li>基本的错误处理</li>
                    </ul>
                  </div>

                  <Alert
                    message="运行示例"
                    description={
                      <pre className="whitespace-pre-wrap">
                        {`请输入第一个数: 10
请输入运算符 (+, -, *, /, %): +
请输入第二个数: 5
10 + 5 = 15

请输入第一个数: 20
请输入运算符 (+, -, *, /, %): /
请输入第二个数: 0
错误：除数不能为零！`}
                      </pre>
                    }
                    type="info"
                    showIcon
                  />

                  <Alert
                    message="提示"
                    description={
                      <ul className="list-disc pl-6">
                        <li>注意处理除数为零的特殊情况</li>
                        <li>取模运算符(%)只能用于整数，需要进行类型转换</li>
                        <li>使用逻辑运算符(&&, ||)组合多个条件</li>
                        <li>考虑添加输入验证，确保输入的数字格式正确</li>
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
              href="/study/cpp/variables" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：变量和数据类型
            </Link>
            <Link 
              href="/study/cpp/control" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：控制流程
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 