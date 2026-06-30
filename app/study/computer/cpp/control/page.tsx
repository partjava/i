'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '控制流程',
  chapterNumber: 5,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '运算符', href: '/study/computer/cpp/operators' },
  nextChapter: { label: '函数', href: '/study/computer/cpp/functions' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 条件语句 =====
  {
    label: '条件语句',
    left: (
      <div className="space-y-4">
        <PageTitle>if 语句</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基本的 if 语句
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
}`} />
        <BookAlert type="info" message="条件表达式必须是布尔类型或可转换为布尔类型。使用花括号可以提高代码可读性" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>switch 语句</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`int day = 3;
switch (day) {
    case 1: cout << "星期一" << endl; break;
    case 2: cout << "星期二" << endl; break;
    case 3: cout << "星期三" << endl; break;
    case 4: cout << "星期四" << endl; break;
    case 5: cout << "星期五" << endl; break;
    case 6:
    case 7: cout << "周末" << endl; break;
    default: cout << "无效日期" << endl;
}

// 不使用 break 的级联效果
char grade = 'B';
switch (grade) {
    case 'A': cout << "优秀" << endl; break;
    case 'B':
    case 'C': cout << "良好" << endl; break;
    case 'D': cout << "及格" << endl; break;
    default:  cout << "不及格" << endl;
}`} />
        <BookAlert type="info" message="switch 表达式必须是整数或枚举类型，case 标签必须是常量表达式，不要忘记 break" />
      </div>
    ),
  },

  // ===== 跨页 2: 循环语句 =====
  {
    label: '循环语句',
    left: (
      <div className="space-y-4">
        <PageTitle>for 循环</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基本的 for 循环
for (int i = 0; i < 5; i++) {
    cout << i << " ";  // 输出：0 1 2 3 4
}

// 使用 step 值
for (int i = 0; i <= 10; i += 2) {
    cout << i << " ";  // 偶数：0 2 4 6 8 10
}

// 倒序循环
for (int i = 10; i > 0; i--) {
    cout << i << " ";  // 10 9 8 7 6 5 4 3 2 1
}

// 范围 for 循环（C++11）
int arr[] = {1, 2, 3, 4, 5};
for (int num : arr) {
    cout << num << " ";  // 1 2 3 4 5
}

// 使用 auto 关键字
vector<int> vec = {1, 2, 3, 4, 5};
for (const auto& num : vec) {
    cout << num << " ";
}`} />
        <BookAlert type="info" message="使用范围 for 循环可以简化数组和容器的遍历，注意循环变量的作用域" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>while 和 do-while 循环</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// while 循环
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

// do-while 循环（至少执行一次）
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
}`} />
        <BookAlert type="warning" message="while 在条件为假时直接跳过，do-while 至少执行一次。注意避免无限循环" />
      </div>
    ),
  },

  // ===== 跨页 3: 跳转语句 =====
  {
    label: '跳转语句',
    left: (
      <div className="space-y-4">
        <PageTitle>break 和 continue</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// break 示例
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 到达 5 时退出循环
    }
    cout << i << " ";  // 1 2 3 4
}

// continue 示例
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // 跳过 3
    }
    cout << i << " ";  // 1 2 4 5
}

// 嵌套循环中的 break
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i * j == 4) {
            break;  // 只跳出内层循环
        }
        cout << i << "," << j << " ";
    }
    cout << endl;
}`} />
        <BookAlert type="info" message="break 完全退出循环，continue 跳过当前迭代。注意 break 只跳出当前层级" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>goto 语句</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 使用标签和 goto
int i = 0;
start:
    if (i < 5) {
        cout << i << " ";
        i++;
        goto start;
    }

// 在某些场景下有特殊用途
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (error_condition) {
            goto error_handler;
        }
    }
}
error_handler:
    cout << "发生错误，退出循环" << endl;`} />
        <BookAlert type="warning" message="避免使用 goto，它会使代码难以维护。但在某些场景（如跳出多层嵌套循环）中仍有用武之地" />
        <h3 className="text-sm font-medium text-ink mt-4 mb-2">跳转语句选择</h3>
        <BookList items={[
          'break — 完全退出当前循环',
          'continue — 跳过当前迭代，进入下一轮',
          'goto — 跳转到指定标签（谨慎使用）',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 4: 练习 =====
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>猜数字游戏</PageTitle>
        <div className="p-4 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-2">题目描述</p>
          <BookList items={[
            '随机生成一个 1-100 之间的数字',
            '让用户重复猜测，直到猜对为止',
            '每次猜测后给出提示（太大 / 太小）',
            '记录猜测次数并给出评价',
          ]} />
        </div>
        <h3 className="text-sm font-medium text-ink mt-4">知识点</h3>
        <TagGrid items={['do-while', 'if-else', '随机数', '计数器', '用户输入']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
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
}`} />
        <BookAlert type="info" message={'运行示例：猜 4 次猜中 31 → "真厉害！"'} />
        <BookAlert type="warning" message="可以添加输入验证确保数字在 1-100 范围内，或限制最大尝试次数增加挑战性" />
      </div>
    ),
  },
]

export default function ControlFlowPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
