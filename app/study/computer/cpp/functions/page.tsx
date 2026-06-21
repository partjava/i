'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  FunctionOutlined,
  RetweetOutlined,
  NodeIndexOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function FunctionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">函数</h1>
              <p className="text-gray-600 mt-2">
                C++ / 函数
              </p>
            </div>
            <Progress type="circle" percent={28} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <FunctionOutlined />
                  基本函数
                </span>
              } 
              key="1"
            >
              <Card title="函数定义与声明" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 函数声明（原型）
int add(int a, int b);
void printMessage(string msg = "Hello");  // 带默认参数
double calculateArea(double radius);

// 函数定义
int add(int a, int b) {
    return a + b;
}

void printMessage(string msg) {
    cout << msg << endl;
}

double calculateArea(double radius) {
    const double PI = 3.14159;
    return PI * radius * radius;
}

// 内联函数
inline int max(int a, int b) {
    return (a > b) ? a : b;
}

// 带有多个返回值的函数（使用引用参数）
void getMinMax(const vector<int>& numbers, int& min, int& max) {
    if (numbers.empty()) return;
    
    min = max = numbers[0];
    for (int num : numbers) {
        if (num < min) min = num;
        if (num > max) max = num;
    }
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="函数基础知识"
                  description={
                    <ul className="list-disc pl-6">
                      <li>函数声明告诉编译器函数的接口</li>
                      <li>函数定义包含了函数的具体实现</li>
                      <li>内联函数可以提高性能，但只适用于简单函数</li>
                      <li>可以使用引用参数来返回多个值</li>
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
                  函数重载
                </span>
              } 
              key="2"
            >
              <Card title="函数重载" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 基于参数类型的重载
void print(int number) {
    cout << "整数: " << number << endl;
}

void print(double number) {
    cout << "浮点数: " << number << endl;
}

void print(string text) {
    cout << "字符串: " << text << endl;
}

// 基于参数数量的重载
int sum(int a, int b) {
    return a + b;
}

int sum(int a, int b, int c) {
    return a + b + c;
}

// 基于const修饰符的重载
void process(int& number) {
    number++;
    cout << "修改值: " << number << endl;
}

void process(const int& number) {
    cout << "只读值: " << number << endl;
}

// 使用示例
int main() {
    print(42);        // 调用 print(int)
    print(3.14);      // 调用 print(double)
    print("Hello");   // 调用 print(string)
    
    cout << sum(1, 2) << endl;      // 输出 3
    cout << sum(1, 2, 3) << endl;   // 输出 6
    
    int x = 10;
    process(x);           // 调用 non-const 版本
    const int y = 20;
    process(y);          // 调用 const 版本
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="函数重载注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>重载函数必须有不同的参数列表</li>
                      <li>仅返回类型不同不构成重载</li>
                      <li>const 修饰符可以构成重载</li>
                      <li>避免创建可能引起歧义的重载</li>
                    </ul>
                  }
                  type="warning"
                  showIcon
                />
              </Card>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <NodeIndexOutlined />
                  递归函数
                </span>
              } 
              key="3"
            >
              <Card title="递归函数示例" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 阶乘计算
int factorial(int n) {
    if (n <= 1) return 1;  // 基本情况
    return n * factorial(n - 1);  // 递归调用
}

// 斐波那契数列
int fibonacci(int n) {
    if (n <= 1) return n;  // 基本情况
    return fibonacci(n - 1) + fibonacci(n - 2);  // 递归调用
}

// 二分查找
int binarySearch(const vector<int>& arr, int target, int left, int right) {
    if (left > right) return -1;  // 基本情况：未找到
    
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;  // 找到目标
    
    if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);  // 在左半部分查找
    } else {
        return binarySearch(arr, target, mid + 1, right);  // 在右半部分查找
    }
}

// 汉诺塔问题
void hanoi(int n, char from, char aux, char to) {
    if (n == 1) {
        cout << "移动圆盘 1 从 " << from << " 到 " << to << endl;
        return;
    }
    
    hanoi(n - 1, from, to, aux);  // 将 n-1 个圆盘从源移到辅助柱
    cout << "移动圆盘 " << n << " 从 " << from << " 到 " << to << endl;
    hanoi(n - 1, aux, from, to);  // 将 n-1 个圆盘从辅助柱移到目标柱
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="递归函数要点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>必须有基本情况（终止条件）</li>
                      <li>每次递归调用都应该向基本情况靠近</li>
                      <li>注意递归深度，防止栈溢出</li>
                      <li>某些情况下可以使用循环代替递归以提高性能</li>
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
              <Card title="例题1：科学计算器" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">实现一个简单的科学计算器，具有以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>基本运算：加、减、乘、除</li>
                      <li>数学函数：幂运算、平方根、阶乘</li>
                      <li>使用函数重载处理不同类型的输入</li>
                      <li>包含输入验证和错误处理</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <cmath>
using namespace std;

class Calculator {
public:
    // 基本运算（重载为支持不同类型）
    double add(double a, double b) { return a + b; }
    int add(int a, int b) { return a + b; }
    
    double subtract(double a, double b) { return a - b; }
    int subtract(int a, int b) { return a - b; }
    
    double multiply(double a, double b) { return a * b; }
    int multiply(int a, int b) { return a * b; }
    
    double divide(double a, double b) {
        if (b == 0) throw "除数不能为零";
        return a / b;
    }
    
    // 数学函数
    double power(double base, int exponent) {
        return pow(base, exponent);
    }
    
    double sqrt(double number) {
        if (number < 0) throw "不能对负数开平方";
        return std::sqrt(number);
    }
    
    int factorial(int n) {
        if (n < 0) throw "阶乘不能为负数";
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
};

int main() {
    Calculator calc;
    
    try {
        // 测试基本运算
        cout << "10 + 5 = " << calc.add(10, 5) << endl;
        cout << "10.5 + 5.5 = " << calc.add(10.5, 5.5) << endl;
        cout << "10 - 5 = " << calc.subtract(10, 5) << endl;
        cout << "10 * 5 = " << calc.multiply(10, 5) << endl;
        cout << "10 / 5 = " << calc.divide(10.0, 5.0) << endl;
        
        // 测试数学函数
        cout << "2^3 = " << calc.power(2, 3) << endl;
        cout << "√16 = " << calc.sqrt(16) << endl;
        cout << "5! = " << calc.factorial(5) << endl;
        
        // 测试错误处理
        cout << "10 / 0 = " << calc.divide(10.0, 0.0) << endl;
    } catch (const char* error) {
        cout << "错误: " << error << endl;
    }
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>函数重载的使用</li>
                      <li>递归函数（阶乘计算）</li>
                      <li>异常处理</li>
                      <li>数学库函数的使用</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card title="例题2：文本分析器" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">实现一个文本分析器，提供以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>统计文本中的字符数、单词数和行数</li>
                      <li>查找特定单词或短语</li>
                      <li>统计单词出现频率</li>
                      <li>支持大小写敏感/不敏感的搜索</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

class TextAnalyzer {
private:
    string text;
    
    // 将字符串转换为小写
    string toLowerCase(string str) {
        string result = str;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
    
public:
    TextAnalyzer(const string& input) : text(input) {}
    
    // 统计字符数（不计空格）
    int countChars() {
        int count = 0;
        for (char c : text) {
            if (!isspace(c)) count++;
        }
        return count;
    }
    
    // 统计单词数
    int countWords() {
        int count = 0;
        bool inWord = false;
        
        for (char c : text) {
            if (isspace(c)) {
                inWord = false;
            } else if (!inWord) {
                inWord = true;
                count++;
            }
        }
        return count;
    }
    
    // 统计行数
    int countLines() {
        int count = 1;
        for (char c : text) {
            if (c == '\\n') count++;
        }
        return count;
    }
    
    // 查找单词（支持大小写敏感选项）
    int findWord(string word, bool caseSensitive = true) {
        if (!caseSensitive) {
            string lowerText = toLowerCase(text);
            word = toLowerCase(word);
            return lowerText.find(word);
        }
        return text.find(word);
    }
    
    // 统计单词频率
    map<string, int> wordFrequency(bool caseSensitive = false) {
        map<string, int> frequency;
        string word;
        string processedText = caseSensitive ? text : toLowerCase(text);
        
        for (size_t i = 0; i < processedText.length(); i++) {
            char c = processedText[i];
            if (isalpha(c)) {
                word += c;
            } else if (!word.empty()) {
                frequency[word]++;
                word.clear();
            }
        }
        if (!word.empty()) {
            frequency[word]++;
        }
        return frequency;
    }
};

int main() {
    string sampleText = "Hello World!\\nThis is a sample text.\\n"
                       "This text contains multiple lines and words.\\n"
                       "Hello again!";
                       
    TextAnalyzer analyzer(sampleText);
    
    // 基本统计
    cout << "字符数: " << analyzer.countChars() << endl;
    cout << "单词数: " << analyzer.countWords() << endl;
    cout << "行数: " << analyzer.countLines() << endl;
    
    // 查找单词
    string searchWord = "text";
    int position = analyzer.findWord(searchWord, false);
    if (position != string::npos) {
        cout << "找到单词 '" << searchWord << "' 在位置: " << position << endl;
    }
    
    // 单词频率统计
    cout << "\\n单词频率统计：" << endl;
    auto frequency = analyzer.wordFrequency(false);
    for (const auto& pair : frequency) {
        cout << pair.first << ": " << pair.second << " 次" << endl;
    }
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>字符串处理</li>
                      <li>函数重载和默认参数</li>
                      <li>STL容器（map）的使用</li>
                      <li>类的设计与实现</li>
                    </ul>
                  </div>

                  <Alert
                    message="扩展建议"
                    description={
                      <ul className="list-disc pl-6">
                        <li>添加文件输入输出功能</li>
                        <li>支持正则表达式搜索</li>
                        <li>添加文本统计图表显示</li>
                        <li>实现撤销/重做功能</li>
                      </ul>
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
              href="/study/cpp/control" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：控制流程
            </Link>
            <Link 
              href="/study/cpp/arrays" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：数组
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 