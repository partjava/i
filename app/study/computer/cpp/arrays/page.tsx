'use client';

import { Card, Tabs, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import { 
  TableOutlined,
  BlockOutlined,
  SortAscendingOutlined,
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ArraysPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">数组和字符串</h1>
              <p className="text-gray-600 mt-2">
                C++ / 数组和字符串
              </p>
            </div>
            <Progress type="circle" percent={35} size={80} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultActiveKey="1">
            <TabPane 
              tab={
                <span>
                  <TableOutlined />
                  一维数组
                </span>
              } 
              key="1"
            >
              <Card title="数组基础" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 数组声明和初始化
int numbers[5];                    // 声明一个包含5个整数的数组
int scores[5] = {90, 85, 88, 92, 78};  // 初始化
int values[] = {1, 2, 3, 4, 5};   // 自动确定大小

// 访问数组元素
cout << scores[0];    // 访问第一个元素
scores[1] = 95;       // 修改元素

// 使用循环遍历数组
for (int i = 0; i < 5; i++) {
    cout << scores[i] << " ";
}

// 使用范围for循环（C++11）
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
int size = sizeof(scores) / sizeof(scores[0]);`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="数组注意事项"
                  description={
                    <ul className="list-disc pl-6">
                      <li>数组下标从0开始</li>
                      <li>访问数组时要注意边界检查</li>
                      <li>数组名实际上是指向第一个元素的指针</li>
                      <li>作为参数传递时会退化为指针</li>
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
                  <BlockOutlined />
                  多维数组
                </span>
              } 
              key="2"
            >
              <Card title="多维数组" className="mb-6">
                <CodeBlock language="cpp">
                  {`// 二维数组声明和初始化
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 访问二维数组元素
cout << matrix[0][0];  // 访问第一行第一列
matrix[1][2] = 15;     // 修改元素

// 使用嵌套循环遍历
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << matrix[i][j] << " ";
    }
    cout << endl;
}

// 二维数组作为函数参数
void print2DArray(int arr[][4], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}

// 动态分配二维数组
int** dynamicMatrix = new int*[3];
for (int i = 0; i < 3; i++) {
    dynamicMatrix[i] = new int[4];
}

// 使用完后释放内存
for (int i = 0; i < 3; i++) {
    delete[] dynamicMatrix[i];
}
delete[] dynamicMatrix;`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="多维数组要点"
                  description={
                    <ul className="list-disc pl-6">
                      <li>多维数组在内存中是连续存储的</li>
                      <li>作为参数传递时需要指定除第一维外的所有维度大小</li>
                      <li>动态分配需要手动管理内存</li>
                      <li>可以使用vector代替动态数组以简化内存管理</li>
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
                  <SortAscendingOutlined />
                  字符串
                </span>
              } 
              key="3"
            >
              <Card title="字符串处理" className="mb-6">
                <CodeBlock language="cpp">
                  {`// C风格字符串
char str1[] = "Hello";           // 自动添加空字符\\0
char str2[10] = "World";        // 指定大小
char str3[6] = {'H', 'e', 'l', 'l', 'o', '\\0'};

// 字符串操作函数
#include <cstring>
strlen(str1);              // 字符串长度
strcpy(str2, str1);       // 复制字符串
strcat(str2, str1);       // 连接字符串
strcmp(str1, str2);       // 比较字符串

// C++ string类
#include <string>
string s1 = "Hello";
string s2 = "World";
string s3 = s1 + " " + s2;  // 字符串连接
cout << s3.length();        // 字符串长度
cout << s3.substr(0, 5);    // 子字符串

// string类的常用操作
s1.append(" there");        // 追加
s1.insert(5, " my");       // 插入
s1.erase(5, 3);           // 删除
s1.replace(5, 2, "sir");  // 替换
s1.find("lo");            // 查找

// 字符串转换
string num_str = "123";
int num = stoi(num_str);     // 字符串转整数
string pi_str = "3.14";
double pi = stod(pi_str);    // 字符串转浮点数
string str = to_string(42);  // 数字转字符串`}
                </CodeBlock>
                <Alert
                  className="mt-4"
                  message="字符串处理建议"
                  description={
                    <ul className="list-disc pl-6">
                      <li>优先使用C++ string类而不是C风格字符串</li>
                      <li>string类自动管理内存，更安全方便</li>
                      <li>使用C风格字符串时要注意缓冲区溢出</li>
                      <li>字符串转换时要注意异常处理</li>
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
              <Card title="例题1：矩阵运算器" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">实现一个矩阵运算器，支持以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>矩阵加法和减法</li>
                      <li>矩阵乘法</li>
                      <li>矩阵转置</li>
                      <li>计算行列式（2x2和3x3矩阵）</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <vector>
using namespace std;

class Matrix {
private:
    vector<vector<int>> data;
    int rows, cols;

public:
    Matrix(int r, int c) : rows(r), cols(c) {
        data.resize(r, vector<int>(c, 0));
    }
    
    void input() {
        cout << "请输入 " << rows << "x" << cols << " 矩阵元素:" << endl;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cin >> data[i][j];
            }
        }
    }
    
    void display() {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cout << data[i][j] << "\\t";
            }
            cout << endl;
        }
    }
    
    Matrix add(const Matrix& other) {
        if (rows != other.rows || cols != other.cols) {
            throw "矩阵维度不匹配";
        }
        
        Matrix result(rows, cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result.data[i][j] = data[i][j] + other.data[i][j];
            }
        }
        return result;
    }
    
    Matrix multiply(const Matrix& other) {
        if (cols != other.rows) {
            throw "矩阵维度不匹配";
        }
        
        Matrix result(rows, other.cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < other.cols; j++) {
                for (int k = 0; k < cols; k++) {
                    result.data[i][j] += data[i][k] * other.data[k][j];
                }
            }
        }
        return result;
    }
    
    Matrix transpose() {
        Matrix result(cols, rows);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result.data[j][i] = data[i][j];
            }
        }
        return result;
    }
    
    int determinant() {
        if (rows != cols) {
            throw "非方阵无法计算行列式";
        }
        
        if (rows == 2) {
            return data[0][0] * data[1][1] - data[0][1] * data[1][0];
        } else if (rows == 3) {
            return data[0][0] * (data[1][1] * data[2][2] - data[1][2] * data[2][1])
                 - data[0][1] * (data[1][0] * data[2][2] - data[1][2] * data[2][0])
                 + data[0][2] * (data[1][0] * data[2][1] - data[1][1] * data[2][0]);
        }
        throw "仅支持2x2和3x3矩阵的行列式计算";
    }
};

int main() {
    try {
        // 测试矩阵加法
        Matrix m1(2, 2), m2(2, 2);
        cout << "输入第一个矩阵：" << endl;
        m1.input();
        cout << "输入第二个矩阵：" << endl;
        m2.input();
        
        cout << "\\n矩阵加法结果：" << endl;
        Matrix sum = m1.add(m2);
        sum.display();
        
        cout << "\\n矩阵乘法结果：" << endl;
        Matrix product = m1.multiply(m2);
        product.display();
        
        cout << "\\n第一个矩阵的转置：" << endl;
        Matrix trans = m1.transpose();
        trans.display();
        
        cout << "\\n第一个矩阵的行列式：" << endl;
        cout << m1.determinant() << endl;
        
    } catch (const char* msg) {
        cout << "错误：" << msg << endl;
    }
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>二维数组（vector）的使用</li>
                      <li>类的设计与实现</li>
                      <li>运算符重载</li>
                      <li>异常处理</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card title="例题2：字符串处理工具" className="mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">题目描述</h3>
                    <p className="mt-2">实现一个字符串处理工具，提供以下功能：</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>回文字符串检测</li>
                      <li>字符串加密解密</li>
                      <li>单词反转</li>
                      <li>字符串模式匹配</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">参考代码</h3>
                    <CodeBlock language="cpp">
                      {`#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class StringProcessor {
public:
    // 检查是否为回文
    bool isPalindrome(string str) {
        string processed;
        // 移除非字母字符并转换为小写
        for (char c : str) {
            if (isalpha(c)) {
                processed += tolower(c);
            }
        }
        
        string reversed = processed;
        reverse(reversed.begin(), reversed.end());
        return processed == reversed;
    }
    
    // 凯撒密码加密
    string encrypt(string str, int shift) {
        string result = str;
        for (char& c : result) {
            if (isalpha(c)) {
                char base = isupper(c) ? 'A' : 'a';
                c = base + (c - base + shift) % 26;
            }
        }
        return result;
    }
    
    // 凯撒密码解密
    string decrypt(string str, int shift) {
        return encrypt(str, 26 - shift);
    }
    
    // 单词反转
    string reverseWords(string str) {
        string result;
        string word;
        
        for (char c : str) {
            if (isspace(c)) {
                reverse(word.begin(), word.end());
                result += word + c;
                word.clear();
            } else {
                word += c;
            }
        }
        
        // 处理最后一个单词
        if (!word.empty()) {
            reverse(word.begin(), word.end());
            result += word;
        }
        
        return result;
    }
    
    // KMP模式匹配算法
    vector<int> findPattern(string text, string pattern) {
        vector<int> result;
        if (pattern.empty()) return result;
        
        // 构建部分匹配表
        vector<int> lps(pattern.length(), 0);
        int len = 0;
        int i = 1;
        
        while (i < pattern.length()) {
            if (pattern[i] == pattern[len]) {
                lps[i++] = ++len;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i++] = 0;
                }
            }
        }
        
        // 查找模式
        i = 0;
        int j = 0;
        while (i < text.length()) {
            if (pattern[j] == text[i]) {
                i++;
                j++;
            }
            
            if (j == pattern.length()) {
                result.push_back(i - j);
                j = lps[j - 1];
            } else if (i < text.length() && pattern[j] != text[i]) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return result;
    }
};

int main() {
    StringProcessor processor;
    
    // 测试回文检查
    string str1 = "A man, a plan, a canal: Panama";
    cout << str1 << " 是回文？ " 
         << (processor.isPalindrome(str1) ? "是" : "否") << endl;
    
    // 测试加密解密
    string str2 = "Hello World";
    int shift = 3;
    string encrypted = processor.encrypt(str2, shift);
    string decrypted = processor.decrypt(encrypted, shift);
    cout << "原文：" << str2 << endl;
    cout << "加密：" << encrypted << endl;
    cout << "解密：" << decrypted << endl;
    
    // 测试单词反转
    string str3 = "Hello World from C++";
    cout << "单词反转：" << processor.reverseWords(str3) << endl;
    
    // 测试模式匹配
    string text = "AABAACAADAABAAABAA";
    string pattern = "AABA";
    vector<int> positions = processor.findPattern(text, pattern);
    cout << "模式 '" << pattern << "' 在文本中的位置：";
    for (int pos : positions) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">知识点</h3>
                    <ul className="list-disc pl-6">
                      <li>字符串操作和算法</li>
                      <li>字符处理函数</li>
                      <li>KMP模式匹配算法</li>
                      <li>类的设计与实现</li>
                    </ul>
                  </div>

                  <Alert
                    message="扩展建议"
                    description={
                      <ul className="list-disc pl-6">
                        <li>添加更多加密算法（如维吉尼亚密码）</li>
                        <li>支持正则表达式匹配</li>
                        <li>添加字符串压缩功能</li>
                        <li>实现模糊字符串匹配</li>
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
              href="/study/cpp/functions" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              上一课：函数
            </Link>
            <Link 
              href="/study/cpp/pointers" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下一课：指针
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 