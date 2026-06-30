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
  chapterTitle: '文件操作',
  chapterNumber: 14,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: 'STL标准库', href: '/study/computer/cpp/stl' },
  nextChapter: { label: '异常处理', href: '/study/computer/cpp/exceptions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '文件流基础',
    left: (
      <div className="space-y-4">
        <PageTitle>文件的打开与关闭</PageTitle>
        <BookParagraph>使用文件流进行基本的文件读写操作。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
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
}`} />
        <BookAlert type="info" message="ifstream：输入文件流用于读取；ofstream：输出文件流用于写入；fstream：同时支持读写" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>二进制文件操作</PageTitle>
        <BookParagraph>处理二进制文件的读写操作，适用于复杂数据结构。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`struct Student {
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
    }`} />
      </div>
    ),
  },
  {
    label: '高级操作',
    left: (
      <div className="space-y-4">
        <PageTitle>文件随机访问</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`    // 随机访问
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
}`} />
        <BookAlert type="info" message="使用 seekg() 定位读取位置，seekp() 定位写入位置。注意字节对齐和平台兼容性" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>格式化与字符串流</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <sstream>
#include <iomanip>

int main() {
    // 使用stringstream进行格式化
    stringstream ss;
    ss << "Temperature: " << fixed
       << setprecision(2) << 36.6;

    // 写入格式化数据
    ofstream outFile("data.txt");
    if (outFile.is_open()) {
        outFile << setw(10) << left << "Name";
        outFile << setw(8) << right << "Age" << endl;
        outFile << setfill('-') << setw(18) << "" << endl;
        outFile << setfill(' ');

        outFile << setw(10) << left << "张三";
        outFile << setw(8) << right << 20 << endl;
        outFile.close();
    }

    // 使用stringstream解析数据
    string data = "42 3.14 hello";
    stringstream parser(data);
    int i; double d; string s;
    parser >> i >> d >> s;
}`} />
        <TagGrid items={['ofstream', 'ifstream', 'fstream', '二进制', 'stringstream', '随机访问']} />
      </div>
    ),
  },
]

export default function FileIOPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
