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
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '数组和字符串',
  chapterNumber: 7,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '函数', href: '/study/computer/cpp/functions' },
  nextChapter: { label: '指针', href: '/study/computer/cpp/pointers' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 一维数组 =====
  {
    label: '一维数组',
    left: (
      <div className="space-y-4">
        <PageTitle>数组基础</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 数组声明和初始化
int numbers[5];
int scores[5] = {90, 85, 88, 92, 78};
int values[] = {1, 2, 3, 4, 5};

// 访问数组元素
cout << scores[0];    // 第一个元素
scores[1] = 95;       // 修改元素

// 使用循环遍历数组
for (int i = 0; i < 5; i++) {
    cout << scores[i] << " ";
}

// 范围for循环（C++11）
for (int score : scores) {
    cout << score << " ";
}

// 数组作为函数参数
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
}

// 使用指针访问数组
int* ptr = scores;
cout << *ptr;        // 第一个元素
cout << *(ptr + 1);  // 第二个元素

// 计算数组大小
int size = sizeof(scores) / sizeof(scores[0]);`} />
        <BookAlert type="warning" message="数组下标从0开始，访问时注意边界检查。数组名实际上是指向第一个元素的指针" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数组操作详解</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 数组排序
#include <algorithm>
int arr[] = {5, 2, 8, 1, 9};
int n = sizeof(arr) / sizeof(arr[0]);

// 升序排序
sort(arr, arr + n);

// 降序排序
sort(arr, arr + n, greater<int>());

// 查找元素
int key = 8;
int* found = find(arr, arr + n, key);

// 数组拷贝
int dest[5];
copy(arr, arr + n, dest);

// 填充数组
fill(arr, arr + n, 0);  // 全部置零

// 反转数组
reverse(arr, arr + n);`} />
        <BookParagraph>数组使用要点：</BookParagraph>
        <BookList items={[
          '固定大小，编译时确定',
          '内存连续存储，访问速度快',
          '作为参数传递时退化为指针',
          '优先使用 vector 代替定长数组',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 多维数组 =====
  {
    label: '多维数组',
    left: (
      <div className="space-y-4">
        <PageTitle>二维数组基础</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 二维数组声明和初始化
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 访问元素
cout << matrix[0][0];  // 第一行第一列
matrix[1][2] = 15;     // 修改元素

// 嵌套循环遍历
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}

// 作为函数参数
void print2DArray(int arr[][4], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}`} />
        <BookAlert type="info" message="多维数组在内存中连续存储。作为参数时需指定除第一维外的所有维度大小" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>动态分配多维数组</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 动态分配二维数组
int** matrix = new int*[3];
for (int i = 0; i < 3; i++) {
    matrix[i] = new int[4];
}

// 使用完后释放内存
for (int i = 0; i < 3; i++) {
    delete[] matrix[i];
}
delete[] matrix;

// 使用 vector 替代（推荐）
vector<vector<int>> vec = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};`} />
        <BookAlert type="warning" message="动态分配需要手动管理内存。推荐使用 vector 代替动态数组以简化内存管理" />
      </div>
    ),
  },

  // ===== 跨页 3: 字符串 =====
  {
    label: '字符串',
    left: (
      <div className="space-y-4">
        <PageTitle>C 风格字符串</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// C风格字符串
char str1[] = "Hello";           // 自动加\\0
char str2[10] = "World";
char str3[6] = {'H','e','l','l','o','\\0'};

// 字符串操作函数
#include <cstring>
strlen(str1);              // 长度
strcpy(str2, str1);       // 复制
strcat(str2, str1);       // 连接
strcmp(str1, str2);       // 比较

// 注意：C风格字符串容易缓冲区溢出`} />
        <BookAlert type="warning" message="优先使用 C++ string 类而不是 C 风格字符串。C 风格字符串要注意缓冲区溢出" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>C++ string 类</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <string>
string s1 = "Hello";
string s2 = "World";
string s3 = s1 + " " + s2;  // 连接
cout << s3.length();        // 长度
cout << s3.substr(0, 5);    // 子串

// 常用操作
s1.append(" there");        // 追加
s1.insert(5, " my");       // 插入
s1.erase(5, 3);           // 删除
s1.replace(5, 2, "sir");  // 替换
s1.find("lo");            // 查找

// 类型转换
int num = stoi("123");        // 字符串→整数
double pi = stod("3.14");     // 字符串→浮点
string str = to_string(42);   // 数字→字符串`} />
        <BookAlert type="info" message="string 类自动管理内存，更安全方便。字符串转换时注意异常处理" />
      </div>
    ),
  },

  // ===== 跨页 4: 练习 =====
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>矩阵运算器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '矩阵加法和减法',
            '矩阵乘法',
            '矩阵转置',
            '计算行列式（2x2和3x3矩阵）',
          ]} />
        </div>
        <BookDivider />
        <PageTitle>单词统计器</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '接收一段文本输入',
            '统计每个单词出现的次数',
            '按出现频率降序排列',
            '支持忽略标点符号',
          ]} />
        </div>
        <TagGrid items={['数组', 'vector', 'string', 'STL算法', 'map']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>矩阵参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class Matrix {
    vector<vector<int>> data;
    int rows, cols;
public:
    Matrix(vector<vector<int>> d)
        : data(d), rows(d.size()),
          cols(d[0].size()) {}

    Matrix add(const Matrix& other) {
        vector<vector<int>> res(rows,
            vector<int>(cols));
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                res[i][j] = data[i][j]
                          + other.data[i][j];
        return Matrix(res);
    }

    Matrix transpose() {
        vector<vector<int>> res(cols,
            vector<int>(rows));
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                res[j][i] = data[i][j];
        return Matrix(res);
    }
};`} />
        <BookAlert type="info" message="用 vector 实现矩阵比动态数组更安全。运算符重载可让矩阵操作更直观" />
      </div>
    ),
  },
]

export default function ArraysPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
