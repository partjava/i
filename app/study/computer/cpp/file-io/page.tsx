'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function FileIOPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: '文件流基础',
      children: (
        <Card title="文件流操作基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">文件的打开与关闭</h3>
            <p>使用文件流进行基本的文件读写操作。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // 写入文件
    ofstream outFile("example.txt");
    if (outFile.is_open()) {
        outFile << "Hello, World!" << endl;
        outFile << "这是第二行" << endl;
        outFile.close();
    } else {
        cerr << "无法打开文件!" << endl;
    }
    
    // 读取文件
    ifstream inFile("example.txt");
    if (inFile.is_open()) {
        string line;
        while (getline(inFile, line)) {
            cout << line << endl;
        }
        inFile.close();
    }
    
    // 文件打开模式
    ofstream outFile2("binary.dat", ios::binary | ios::out);
    ifstream inFile2("text.txt", ios::in);
    
    // 检查文件状态
    if (inFile2.good()) {
        cout << "文件状态正常" << endl;
    }
    if (inFile2.eof()) {
        cout << "到达文件末尾" << endl;
    }
    if (inFile2.fail()) {
        cout << "操作失败" << endl;
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="文件流类型"
              description={
                <ul className="list-disc pl-6">
                  <li>ifstream：输入文件流，用于读取文件</li>
                  <li>ofstream：输出文件流，用于写入文件</li>
                  <li>fstream：同时支持读写操作</li>
                  <li>支持多种打开模式和状态检查</li>
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
      label: '二进制文件',
      children: (
        <Card title="二进制文件操作" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">二进制读写</h3>
            <p>处理二进制文件的读写操作。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

struct Student {
    char name[50];
    int age;
    double score;
};

int main() {
    // 写入二进制文件
    Student s1 = {"张三", 20, 95.5};
    Student s2 = {"李四", 19, 88.5};
    
    ofstream outFile("students.dat", ios::binary);
    if (outFile.is_open()) {
        outFile.write(reinterpret_cast<char*>(&s1), sizeof(Student));
        outFile.write(reinterpret_cast<char*>(&s2), sizeof(Student));
        outFile.close();
    }
    
    // 读取二进制文件
    vector<Student> students;
    ifstream inFile("students.dat", ios::binary);
    if (inFile.is_open()) {
        Student s;
        while (inFile.read(reinterpret_cast<char*>(&s), sizeof(Student))) {
            students.push_back(s);
        }
        inFile.close();
    }
    
    // 显示读取的数据
    for (const auto& student : students) {
        cout << "姓名: " << student.name << endl;
        cout << "年龄: " << student.age << endl;
        cout << "分数: " << student.score << endl;
        cout << "-------------------" << endl;
    }
    
    // 随机访问
    fstream file("students.dat", ios::binary | ios::in | ios::out);
    if (file.is_open()) {
        // 跳到第二个学生的位置
        file.seekg(sizeof(Student), ios::beg);
        Student s;
        file.read(reinterpret_cast<char*>(&s), sizeof(Student));
        cout << "第二个学生: " << s.name << endl;
        
        // 修改第一个学生的分数
        file.seekp(0, ios::beg);
        s1.score = 98.5;
        file.write(reinterpret_cast<char*>(&s1), sizeof(Student));
        file.close();
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="二进制文件操作注意事项"
              description={
                <ul className="list-disc pl-6">
                  <li>使用 ios::binary 模式打开文件</li>
                  <li>使用 read() 和 write() 进行读写</li>
                  <li>注意字节对齐和平台兼容性</li>
                  <li>可以使用 seekg() 和 seekp() 进行随机访问</li>
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
      key: '3',
      label: '高级操作',
      children: (
        <Card title="高级文件操作" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">文件和流操作</h3>
            <p>高级文件操作技术和流操作符。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <fstream>
#include <sstream>
#include <iomanip>
using namespace std;

int main() {
    // 使用stringstream进行格式化
    stringstream ss;
    ss << "Temperature: " << fixed << setprecision(2) << 36.6;
    
    // 写入格式化数据
    ofstream outFile("data.txt");
    if (outFile.is_open()) {
        // 设置输出格式
        outFile << setw(10) << left << "Name";
        outFile << setw(8) << right << "Age" << endl;
        outFile << setfill('-') << setw(18) << "" << endl;
        outFile << setfill(' ');
        
        // 写入数据
        outFile << setw(10) << left << "张三";
        outFile << setw(8) << right << 20 << endl;
        
        outFile.close();
    }
    
    // 文件拷贝
    ifstream source("source.txt", ios::binary);
    ofstream dest("destination.txt", ios::binary);
    
    if (source && dest) {
        // 获取文件大小
        source.seekg(0, ios::end);
        size_t size = source.tellg();
        source.seekg(0);
        
        // 创建缓冲区
        vector<char> buffer(size);
        
        // 读取和写入
        if (source.read(buffer.data(), size)) {
            dest.write(buffer.data(), size);
        }
    }
    
    // 文件重命名和删除
    if (rename("old.txt", "new.txt") == 0) {
        cout << "文件重命名成功" << endl;
    }
    
    if (remove("temp.txt") == 0) {
        cout << "文件删除成功" << endl;
    }
    
    // 目录操作
    #include <filesystem>  // C++17
    namespace fs = std::filesystem;
    
    for (const auto& entry : fs::directory_iterator(".")) {
        cout << entry.path() << endl;
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="高级特性"
              description={
                <ul className="list-disc pl-6">
                  <li>格式化输入输出</li>
                  <li>文件和目录操作</li>
                  <li>流的状态和操作</li>
                  <li>C++17文件系统库</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">文件操作</h1>
              <p className="text-gray-600 mt-2">学习C++文件流和文件系统操作</p>
            </div>
            <Progress type="circle" percent={70} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/stl" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：STL标准库
          </Link>
          <Link
            href="/study/cpp/exceptions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：异常处理
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 