'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  BranchesOutlined,
  ReloadOutlined,
  StepForwardOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ControlFlowPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">控制流程</h1>
              <p className="text-gray-600 mt-2">
                C++ / 控制流程
              </p>
            </div>
            <Progress type="circle" percent={22} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <BranchesOutlined />
                  条件语句
                </span>
              } 
              key="1"
            >
              <Card title="if 语句" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 基本的 if 语句
int age = 18;
if (age >= 18) {
    cout << "您已成年" << endl;
}

// if-else 语句
int score = 75;
if (score >= 60) {
    cout << "及格" << endl;
} else {
    cout << "不及格" << endl;
}

// if-else if-else 语句
int grade = 85;
if (grade >= 90) {
    cout << "优秀" << endl;
} else if (grade >= 80) {
    cout << "良好" << endl;
} else if (grade >= 60) {
    cout << "及格" << endl;
} else {
    cout << "不及格" << endl;
}

// 嵌套的 if 语句
bool hasID = true;
if (age >= 18) {
    if (hasID) {
        cout << "可以办理" << endl;
    } else {
        cout << "请先办理身份证" << endl;
    }
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="条件语句注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>条件表达式必须是布尔类型或可转换为布尔类型</li>
                      <li>使用花括号可以提高代码可读性</li>
                      <li>注意条件的判断顺序</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="switch 语句" className="mb-6">
                <CodeBlock language="cpp">
                  {`int day = 3;
switch (day) {
    case 1:
        cout << "星期一" << endl;
        break;
    case 2:
        cout << "星期二" << endl;
        break;
    case 3:
        cout << "星期三" << endl;
        break;
    case 4:
        cout << "星期四" << endl;
        break;
    case 5:
        cout << "星期五" << endl;
        break;
    case 6:
    case 7:
        cout << "周末" << endl;
        break;
    default:
        cout << "无效日期" << endl;
}

// 不使用 break 的级联效果
char grade = 'B';
switch (grade) {
    case 'A':
        cout << "优秀" << endl;
        break;
    case 'B':
    case 'C':
        cout << "良好" << endl;
        break;
    case 'D':
        cout << "及格" << endl;
        break;
    default:
        cout << "不及格" << endl;
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="switch 语句特点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>switch 表达式必须是整数类型或枚举类型</li>
                      <li>case 标签必须是常量表达式</li>
                      <li>不要忘记 break 语句，除非是有意的级联</li>
                      <li>default 分支用于处理其他所有情况</li>
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
                  <ReloadOutlined />
                  循环语句
                </span>
              } 
              key="2"
            >
              <Card title="for 循环" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 基本的 for 循环
for (int i = 0; i < 5; i++) {
    cout << i << " ";  // 输出：0 1 2 3 4
}

// 使用 step 值
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";  // 输出偶数：0 2 4 6 8 10
}

// 倒序循环
for (int i = 10; i > 0; i--) {
    cout << i << " ";  // 倒计时：10 9 8 7 6 5 4 3 2 1
}

// 范围 for 循环（C++11）
int arr[] = {1, 2, 3, 4, 5};
for (int num : arr) {
    cout << num << " ";  // 输出：1 2 3 4 5
}

// 使用 auto 关键字
vector<int> vec = {1, 2, 3, 4, 5};
for (const auto& num : vec) {
    cout << num << " ";
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="for 循环使用技巧"
                  description={
                    <ul className="list-disc pl-6">
                      <li>使用范围 for 循环可以简化数组和容器的遍历</li>
                      <li>注意循环变量的作用域</li>
                      <li>合理使用 step 值可以优化性能</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Card>

              <Card title="while 和 do-while 循环" className="mb-6">
                <CodeBlock language="cpp">
                  {`// while 循环
int count = 0;
while (count < 5) {
    cout << count << " ";
    count++;
}

// 带条件的 while 循环
string password;
while (password != "secret") {
    cout << "请输入密码: ";
    cin >> password;
}

// do-while 循环
int num;
do {
    cout << "请输入一个正数: ";
    cin >> num;
} while (num <= 0);

// 嵌套循环
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        cout << i << "," << j << " ";
    }
    cout << endl;
}`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="while 循环注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>while 循环在条件为假时直接跳过</li>
                      <li>do-while 循环至少执行一次</li>
                      <li>注意避免无限循环</li>
                      <li>合理使用循环嵌套，避免过度嵌套</li>
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
                  <StepForwardOutlined />
                  跳转语句
                </span>
              } 
              key="3"
            >
              <Card title="break 和 continue" className="mb-6">
                <CodeBlock language="cpp">
                  {`// break 示例
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 到达 5 时退出循环
    }
    cout << i << " ";  // 输出：1 2 3 4
}

// continue 示例
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // 跳过 3
    }
    cout << i << " ";  // 输出：1 2 4 5
}

// 在嵌套循环中使用 break
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i * j == 4) {
            break;  // 只跳出内层循环
        }
        cout << i << "," << j << " ";
    }
    cout << endl;
}

// 使用标签和 goto（不推荐）
int i = 0;
start:
    if (i < 5) {
        cout << i << " ";
        i++;
        goto start;
    }`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="跳转语句使用建议"
                  description={
                    <ul className="list-disc pl-6">
                      <li>break 用于完全退出循环</li>
                      <li>continue 用于跳过当前迭代</li>
                      <li>避免使用 goto，它会使代码难以维护</li>
                      <li>在嵌套循环中要注意 break 只能跳出当前层级的循环</li>
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
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="4"
            >
              <Card title="例题：猜数字游戏" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">编写一个猜数字游戏程序，具有以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>随机生成一个 1-100 之间的数字</li>
                      <li>让用户重复猜测，直到猜对为止</li>
                      <li>每次猜测后给出提示（太大/太小）</li>
                      <li>记录猜测次数</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    // 初始化随机数生成器
    srand(time(0));
    int secretNumber = rand() % 100 + 1;
    int guess;
    int tries = 0;
    
    cout << "欢迎玩猜数字游戏！" << endl;
    cout << "我已经想好了一个 1-100 之间的数。" << endl;
    
    do {
        cout << "请猜一个数: ";
        cin >> guess;
        tries++;
        
        if (guess > secretNumber) {
            cout << "太大了！" << endl;
        } else if (guess < secretNumber) {
            cout << "太小了！" << endl;
        } else {
            cout << "恭喜你猜对了！" << endl;
            cout << "你总共猜了 " << tries << " 次。" << endl;
            
            if (tries < 7) {
                cout << "真厉害！" << endl;
            } else if (tries < 10) {
                cout << "还不错！" << endl;
            } else {
                cout << "继续加油！" << endl;
            }
        }
    } while (guess != secretNumber);
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>do-while 循环的使用</li>
                      <li>if-else if-else 条件判断</li>
                      <li>随机数生成</li>
                      <li>用户输入处理</li>
                      <li>计数器的使用</li>
                    </ul>
                  </div>

                  <Alert
                    message="运行示例"
                    description={
                      <pre className="whitespace-pre-wrap">
                        {`欢迎玩猜数字游戏！
我已经想好了一个 1-100 之间的数。
请猜一个数: 50
太大了！
请猜一个数: 25
太小了！
请猜一个数: 37
太大了！
请猜一个数: 31
恭喜你猜对了！
你总共猜了 4 次。
真厉害！`}
                      </pre>
                    }
                    type="info"
                    showIcon
                  />

                  <Alert
                    message="提示"
                    description={
                      <ul className="list-disc pl-6">
                        <li>可以添加输入验证，确保输入的数字在有效范围内</li>
                        <li>可以限制最大尝试次数</li>
                        <li>可以添加是否继续玩的选项</li>
                        <li>考虑使用二分查找策略来提高猜测效率</li>
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
              href="/study/cpp/operators" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：运算符
            </Link>
            <Link 
              href="/study/cpp/functions" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：函数
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 