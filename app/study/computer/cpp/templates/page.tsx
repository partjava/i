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
  chapterTitle: '模板编程',
  chapterNumber: 12,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '面向对象编程', href: '/study/computer/cpp/oop' },
  nextChapter: { label: 'STL标准库', href: '/study/computer/cpp/stl' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '函数模板',
    left: (
      <div className="space-y-4">
        <PageTitle>函数模板基础</PageTitle>
        <BookParagraph>使用模板实现通用的函数功能，避免为每种类型重复编写代码。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// 基本函数模板
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// 多类型参数模板
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// 带约束的函数模板（C++20）
template<typename T>
requires std::is_arithmetic_v<T>
T square(T x) {
    return x * x;
}

int main() {
    cout << max(10, 20) << endl;        // int
    cout << max(3.14, 2.72) << endl;    // double
    cout << max("hello", "world") << endl; // string

    cout << add(5, 3.14) << endl;       // int + double
    cout << square(5) << endl;          // 25
}`} />
        <BookAlert type="info" message="函数模板支持类型参数自动推导。可指定多个模板参数。C++20 支持 concept 约束" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>模板特化与重载</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 通用模板
template<typename T>
void print(T value) {
    cout << value << endl;
}

// 完全特化：针对特定类型
template<>
void print<bool>(bool value) {
    cout << (value ? "true" : "false")
         << endl;
}

template<>
void print<vector<int>>(
    vector<int> vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
}

// 非类型模板参数
template<typename T, int Size>
class FixedArray {
    T data[Size];
public:
    int size() const { return Size; }
};`} />
      </div>
    ),
  },
  {
    label: '类模板',
    left: (
      <div className="space-y-4">
        <PageTitle>类模板定义</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 基本类模板
template<typename T>
class Array {
private:
    T* data;
    size_t size;
public:
    Array(size_t n) : size(n) {
        data = new T[n];
    }

    T& operator[](size_t idx) {
        return data[idx];
    }

    size_t getSize() const { return size; }

    ~Array() { delete[] data; }
};

// 使用
Array<int> intArr(10);
Array<double> doubleArr(5);
Array<string> strArr(3);`} />
        <BookAlert type="info" message="类模板允许创建通用类型。模板代码通常放在头文件中，因为实例化时需要完整定义" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>模板高级用法</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 模板模板参数
template<typename T,
         template<typename> class Container>
class Adapter {
    Container<T> data;
public:
    void push(T val) { data.push_back(val); }
};

// 可变参数模板（C++11）
template<typename... Args>
auto sum(Args... args) {
    return (args + ...);  // 折叠表达式
}

// 类型特征（type traits）
template<typename T>
void process(T value) {
    if constexpr (is_integral_v<T>) {
        cout << "整数类型: " << value;
    } else if constexpr (is_floating_point_v<T>) {
        cout << "浮点类型: " << value;
    } else {
        cout << "其他类型";
    }
}`} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>通用容器类</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">题目描述</p>
          <BookList items={[
            '实现一个通用的 Pair 模板类',
            '存储两个不同类型的值',
            '提供 getter、setter 方法',
            '重载 == 和 << 运算符',
          ]} />
        </div>
        <TagGrid items={['template', '类模板', '运算符重载', '泛型编程']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`template<typename T1, typename T2>
class Pair {
    T1 first;
    T2 second;
public:
    Pair(T1 f, T2 s) : first(f), second(s) {}

    T1 getFirst() const { return first; }
    T2 getSecond() const { return second; }

    void setFirst(T1 f) { first = f; }
    void setSecond(T2 s) { second = s; }

    bool operator==(const Pair& other) {
        return first == other.first
            && second == other.second;
    }
};

template<typename T1, typename T2>
ostream& operator<<(ostream& os,
    const Pair<T1, T2>& p) {
    os << "(" << p.getFirst()
       << ", " << p.getSecond() << ")";
    return os;
}

int main() {
    Pair<int, string> p(1, "hello");
    cout << p;  // (1, hello)
}`} />
      </div>
    ),
  },
]

export default function TemplatesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
