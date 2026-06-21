'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '异常处理',
  chapterNumber: 15,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '文件操作', href: '/study/computer/cpp/file-io' },
  nextChapter: { label: '智能指针', href: '/study/computer/cpp/smart-pointers' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '异常基础',
    left: (
      <div className="space-y-4">
        <PageTitle>try-catch 语句</PageTitle>
        <BookParagraph>使用 try-catch 块捕获和处理异常，将错误处理与正常逻辑分离。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("除数不能为零！");
    }
    return a / b;
}

int main() {
    try {
        cout << divide(10, 2) << endl;  // 正常执行
        cout << divide(10, 0) << endl;  // 抛出异常
    }
    catch (const runtime_error& e) {
        cerr << "捕获到运行时错误: " << e.what() << endl;
    }
    catch (const exception& e) {
        cerr << "捕获到标准异常: " << e.what() << endl;
    }
    catch (...) {
        cerr << "捕获到未知异常" << endl;
    }

    cout << "程序继续执行..." << endl;
    return 0;
}`} />
        <BookAlert type="info" message="异常处理将错误处理代码与正常业务逻辑分离，可在调用栈中传播，支持不同类型的异常处理" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>标准异常层次</PageTitle>
        <BookParagraph>C++ 标准库提供了一套完整的异常类层次结构：</BookParagraph>
        <div className="p-4 rounded-md bg-paper-200/60 text-xs font-code leading-relaxed">
          <div className="font-semibold text-ink">exception</div>
          <div className="pl-4 text-ink-light">
            ├── bad_alloc<br />
            ├── bad_cast<br />
            ├── bad_typeid<br />
            ├── logic_error<br />
            <div className="pl-4">
              ├── invalid_argument<br />
              ├── domain_error<br />
              ├── length_error<br />
              └── out_of_range<br />
            </div>
            └── runtime_error<br />
            <div className="pl-4">
              ├── range_error<br />
              ├── overflow_error<br />
              └── underflow_error<br />
            </div>
          </div>
        </div>
        <BookAlert type="info" message="建议按引用捕获异常（catch by reference），避免对象切割问题" />
      </div>
    ),
  },
  {
    label: '异常安全',
    left: (
      <div className="space-y-4">
        <PageTitle>RAII 与资源管理</PageTitle>
        <BookParagraph>RAII（资源获取即初始化）确保异常发生时资源被正确释放。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class Resource {
private:
    std::string name;
public:
    Resource(const std::string& n) : name(n) {
        std::cout << "获取资源: " << name << std::endl;
    }
    ~Resource() {
        std::cout << "释放资源: " << name << std::endl;
    }
    void use() {
        std::cout << "使用资源: " << name << std::endl;
    }
};

void unsafe_function() {
    Resource* r1 = new Resource("数据库连接");
    Resource* r2 = new Resource("文件句柄");

    // 如果这里抛出异常，资源将泄露
    throw std::runtime_error("发生错误");

    delete r2;
    delete r1;
}

void safe_function() {
    // 使用智能指针自动管理资源
    std::unique_ptr<Resource> r1(new Resource("数据库连接"));
    std::unique_ptr<Resource> r2(new Resource("文件句柄"));

    // 即使抛出异常，资源也会被正确释放
    throw std::runtime_error("发生错误");
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>RAII 文件处理示例</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// RAII文件处理示例
class FileHandler {
private:
    std::ofstream file;
public:
    FileHandler(const std::string& filename) {
        file.open(filename);
        if (!file.is_open()) {
            throw std::runtime_error("无法打开文件");
        }
    }

    ~FileHandler() {
        if (file.is_open()) {
            file.close();
        }
    }

    void write(const std::string& data) {
        if (!file.is_open()) {
            throw std::runtime_error("文件未打开");
        }
        file << data;
    }
};

int main() {
    try {
        unsafe_function();
    }
    catch (const std::exception& e) {
        std::cerr << "unsafe_function 异常: " << e.what() << std::endl;
    }

    try {
        safe_function();
    }
    catch (const std::exception& e) {
        std::cerr << "safe_function 异常: " << e.what() << std::endl;
    }

    try {
        FileHandler file("test.txt");
        file.write("Hello, World!");
    }
    catch (const std::exception& e) {
        std::cerr << "文件操作异常: " << e.what() << std::endl;
    }
}`} />
        <BookAlert type="info" message="RAII：在构造函数中获取资源，析构函数中释放资源。保证异常发生时资源也能正确释放" />
      </div>
    ),
  },
  {
    label: '自定义异常',
    left: (
      <div className="space-y-4">
        <PageTitle>自定义异常类</PageTitle>
        <BookParagraph>继承 std::exception 编写自己的异常类：</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <exception>
#include <string>
using namespace std;

// 自定义异常类
class MathException : public exception {
private:
    string message;
public:
    MathException(const string& msg)
        : message(msg) {}

    const char* what() const noexcept override {
        return message.c_str();
    }
};

class DivideByZeroException
    : public MathException {
public:
    DivideByZeroException()
        : MathException("除数不能为零") {}
};

class NegativeValueException
    : public MathException {
public:
    NegativeValueException(const string& msg)
        : MathException(msg) {}
};

// 使用自定义异常
double safeSqrt(double x) {
    if (x < 0) {
        throw NegativeValueException(
            "不能对负数开平方");
    }
    return sqrt(x);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>noexcept 与异常规范</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// noexcept 声明
void no_throw_function() noexcept {
    // 保证不会抛出异常
}

// 条件noexcept
template<typename T>
void swap(T& a, T& b) noexcept(
    is_nothrow_move_constructible_v<T> &&
    is_nothrow_move_assignable_v<T>) {
    T temp = move(a);
    a = move(b);
    b = move(temp);
}

// noexcept 运算符
cout << noexcept(no_throw_function());  // true
cout << noexcept(divide(1, 0));        // false

// 最佳实践
// 1. 不要用异常处理普通错误（如文件不存在）
// 2. 异常应该留给真正异常的情况
// 3. 析构函数应该 noexcept
// 4. 移动操作应该 noexcept`} />
        <BookAlert type="warning" message="析构函数和移动操作应声明为 noexcept。不要用异常处理预期中的普通错误情况" />
        <TagGrid items={['try-catch', 'throw', 'RAII', 'exception', 'noexcept', '异常安全']} />
      </div>
    ),
  },
]

export default function ExceptionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
