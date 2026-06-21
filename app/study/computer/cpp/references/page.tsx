'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  LinkOutlined,
  SwapOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">引用</h1>
              <p className="text-gray-600 mt-2">
                C++ / 引用
              </p>
            </div>
            <Progress type="circle" percent={45} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <LinkOutlined />
                  引用基础
                </span>
              } 
              key="1"
            >
              <Card title="引用的基本概念" className="mb-6">
                <p className="mb-4">引用是 C++ 中的一个重要特性，它为对象提供了一个别名。引用必须在创建时初始化，并且一旦初始化后不能更改为引用其他对象。</p>
                <CodeBlock language="cpp">{`// 引用的声明和初始化
int num = 42;
int& ref = num;  // ref 是 num 的引用

// 通过引用修改原变量
ref = 100;       // 此时 num 也变为 100
cout << num;     // 输出 100

// 引用作为函数参数
void increment(int& x) {
    x++;         // 直接修改原始变量
}

increment(num);  // 调用后 num 变为 101

// 常量引用
const int& cref = num;  // 常量引用，不能通过它修改 num
// cref = 200;          // 错误！不能通过常量引用修改变量

// 引用作为函数返回值
int& getMax(int& a, int& b) {
    return (a > b) ? a : b;  // 返回较大值的引用
}

int x = 5, y = 10;
getMax(x, y) = 100;    // y 变为 100`}</CodeBlock>
                <Alert
                  className="mt-4"
                  message="引用注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>引用必须在创建时初始化</li>
                      <li>引用一旦初始化，不能再引用其他对象</li>
                      <li>不存在空引用，引用必须指向一个有效对象</li>
                      <li>引用本质上是一个常量指针，语法更简洁安全</li>
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
                  <SwapOutlined />
                  引用与指针对比
                </span>
              } 
              key="2"
            >
              <Card title="引用与指针的区别" className="mb-6">
                <p className="mb-4">虽然引用在内部实现上类似于指针，但它们在语法和使用上有很大区别：</p>
                <CodeBlock language="cpp">{`// 引用与指针的比较
int value = 42;

// 指针方式
int* ptr = &value;  // 需要使用取地址符 &
*ptr = 10;          // 需要解引用才能修改
int* nullPtr = nullptr; // 指针可以为空

// 引用方式
int& ref = value;   // 无需取地址符
ref = 20;           // 直接使用，无需解引用
// int& nullRef;    // 错误！引用必须初始化

// 在函数中使用引用和指针
void modifyByPointer(int* p) {
    if (p) {        // 需要判空
        *p += 1;    // 需要解引用
    }
}

void modifyByReference(int& r) {
    r += 1;         // 无需判空，无需解引用
}

// 引用不能重新绑定
int a = 1, b = 2;
int& ref = a;
ref = b;  // 这不是重新绑定，而是将 b 的值赋给 a
// 此时 a == 2, b == 2, ref 仍然引用 a

// 指针可以重新指向
int* ptr = &a;
ptr = &b;  // 合法，ptr 现在指向 b`}</CodeBlock>
                <Alert
                  className="mt-4"
                  message="使用建议"
                  description={
                    <ul className="list-disc pl-6">
                      <li>当不需要改变指向的对象时，优先使用引用</li>
                      <li>函数参数传递大对象时，使用常量引用可以避免拷贝</li>
                      <li>当需要表示"无效"状态时，使用指针（可以为nullptr）</li>
                      <li>当需要改变指向的对象时，使用指针</li>
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
              key="3"
            >
              <Card title="例题1：使用引用交换变量" className="mb-6">
                <p className="mb-3">使用引用实现两个变量的交换：</p>
                <CodeBlock language="cpp">{`#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    cout << "交换前: x = " << x << ", y = " << y << endl;
    
    swap(x, y);
    
    cout << "交换后: x = " << x << ", y = " << y << endl;
    return 0;
}`}</CodeBlock>
                <p className="mt-3 text-gray-600">输出结果: 交换前: x = 5, y = 10, 交换后: x = 10, y = 5</p>
              </Card>
              
              <Card title="例题2：引用作为返回值" className="mb-6">
                <p className="mb-3">使用引用作为函数返回值实现可修改序列中的元素：</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <vector>
using namespace std;

// 通过引用返回可修改的向量元素
int& getElement(vector<int>& vec, int index) {
    return vec[index];
}

int main() {
    vector<int> numbers = {10, 20, 30, 40, 50};
    
    cout << "原始数组: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // 使用引用修改元素
    getElement(numbers, 2) = 100;
    
    cout << "修改后的数组: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`}</CodeBlock>
                <p className="mt-3 text-gray-600">输出结果: 原始数组: 10 20 30 40 50, 修改后的数组: 10 20 100 40 50</p>
              </Card>
              
              <Card title="例题3：引用与常量" className="mb-6">
                <p className="mb-3">演示常量引用的用法及其在函数参数中的应用：</p>
                <CodeBlock language="cpp">{`#include <iostream>
#include <string>
using namespace std;

// 使用常量引用参数，避免大对象拷贝
void printDetails(const string& str, int count) {
    cout << "字符串 \"" << str << "\" 重复 " << count << " 次:" << endl;
    for(int i = 0; i < count; i++) {
        cout << str << endl;
    }
}

// 返回常量引用，防止修改原对象
const string& getLongerString(const string& a, const string& b) {
    return (a.length() > b.length()) ? a : b;
}

int main() {
    string short_str = "Hello";
    string long_str = "Hello, World!";
    
    // 传递常量引用，避免拷贝
    printDetails(short_str, 2);
    
    // 获取较长的字符串
    const string& longer = getLongerString(short_str, long_str);
    cout << "较长的字符串是: " << longer << endl;
    
    // 不能通过常量引用修改原始对象
    // longer[0] = 'h';  // 编译错误
    
    return 0;
}`}</CodeBlock>
              </Card>
            </TabPane>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Link 
              href="/study/cpp/pointers" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：指针
            </Link>
            <Link 
              href="/study/cpp/structs" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：结构体和类
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 