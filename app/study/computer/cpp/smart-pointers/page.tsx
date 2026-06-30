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
  chapterTitle: '智能指针',
  chapterNumber: 16,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '异常处理', href: '/study/computer/cpp/exceptions' },
  nextChapter: { label: '多线程编程', href: '/study/computer/cpp/multithreading' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'unique_ptr',
    left: (
      <div className="space-y-4">
        <PageTitle>独占式智能指针</PageTitle>
        <BookParagraph>unique_ptr 独占所有权，不允许共享资源。不能复制，只能移动。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class Resource {
public:
    Resource(const string& n) : name(n) {
        cout << "Resource " << name << " 被创建" << endl;
    }
    ~Resource() {
        cout << "Resource " << name << " 被销毁" << endl;
    }
    void use() const {
        cout << "Resource " << name << " 被使用" << endl;
    }
private:
    string name;
};

// unique_ptr的基本使用
void basic_unique_ptr() {
    // 创建unique_ptr
    unique_ptr<Resource> ptr1(new Resource("ptr1"));

    // 推荐使用make_unique（C++14）
    auto ptr2 = make_unique<Resource>("ptr2");

    ptr1->use();
    ptr2->use();

    // 转移所有权
    unique_ptr<Resource> ptr3 = move(ptr1);  // ptr1现在为nullptr

    if (ptr1 == nullptr) {
        cout << "ptr1不再拥有资源" << endl;
    }

    // 释放所有权
    ptr2.reset();  // 立即销毁资源

    // 获取原始指针（谨慎使用）
    Resource* raw_ptr = ptr3.get();
    raw_ptr->use();
}  // ptr3在这里自动销毁`} />
        <BookAlert type="info" message="unique_ptr 独占所有权，不能复制只能移动。支持自定义删除器，零开销抽象" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自定义删除器</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 自定义删除器
void custom_deleter() {
    auto deleter = [](Resource* p) {
        cout << "使用自定义删除器" << endl;
        delete p;
    };

    unique_ptr<Resource, decltype(deleter)> ptr(
        new Resource("custom"), deleter);
}

// 管理动态数组
unique_ptr<int[]> arr(new int[10]);
arr[0] = 42;

// 在容器中使用
vector<unique_ptr<Resource>> resources;
resources.push_back(make_unique<Resource>("A"));
resources.push_back(make_unique<Resource>("B"));

// 注意：不能复制unique_ptr
// auto ptr_copy = ptr;  // 错误！
auto ptr_move = move(ptr);  // 正确`} />
      </div>
    ),
  },
  {
    label: 'shared_ptr',
    left: (
      <div className="space-y-4">
        <PageTitle>共享式智能指针</PageTitle>
        <BookParagraph>shared_ptr 支持共享所有权，使用引用计数管理资源。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`void shared_ptr_demo() {
    shared_ptr<Resource> ptr1 = make_shared<Resource>("shared");

    {
        shared_ptr<Resource> ptr2 = ptr1;
        cout << "引用计数: " << ptr1.use_count() << endl;  // 2

        ptr2->use();
    }  // ptr2离开作用域，引用计数减1

    cout << "引用计数: " << ptr1.use_count() << endl;  // 1

    // 在容器中使用
    vector<shared_ptr<Resource>> resources;
    resources.push_back(ptr1);
    resources.push_back(make_shared<Resource>("another"));

    for(const auto& ptr : resources) {
        ptr->use();
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>循环引用问题</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`class Node {
public:
    string name;
    shared_ptr<Node> next;

    Node(const string& n) : name(n) {
        cout << "Node " << name << " 创建" << endl;
    }
    ~Node() {
        cout << "Node " << name << " 销毁" << endl;
    }
};

void circular_reference() {
    auto node1 = make_shared<Node>("Node1");
    auto node2 = make_shared<Node>("Node2");

    // 创建循环引用
    node1->next = node2;
    node2->next = node1;

    cout << "node1 引用计数: "
         << node1.use_count() << endl;
    cout << "node2 引用计数: "
         << node2.use_count() << endl;
}  // 内存泄漏！节点不会被销毁`} />
        <BookAlert type="warning" message="shared_ptr 循环引用会导致内存泄漏。用 weak_ptr 打破循环引用，weak_ptr 不增加引用计数" />
      </div>
    ),
  },
  {
    label: 'weak_ptr',
    left: (
      <div className="space-y-4">
        <PageTitle>弱引用智能指针</PageTitle>
        <BookParagraph>weak_ptr 不增加引用计数，用于解决 shared_ptr 循环引用问题。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class Node {
public:
    string name;
    weak_ptr<Node> next;  // 弱引用

    Node(const string& n) : name(n) {}
    ~Node() {
        cout << "Node " << name << " 销毁" << endl;
    }
};

void weak_ptr_demo() {
    auto node1 = make_shared<Node>("Node1");
    auto node2 = make_shared<Node>("Node2");

    node1->next = node2;
    node2->next = node1;

    // 从weak_ptr获取shared_ptr
    if (auto shared = node1->next.lock()) {
        cout << shared->name << endl;
    }

    // 检查资源是否还存在
    if (node1->next.expired()) {
        cout << "资源已释放" << endl;
    }
}  // 正常销毁！weak_ptr不增加引用计数`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>三种指针对比</PageTitle>
        <div className="overflow-hidden rounded-md border border-paper-300 text-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-paper-100/90 text-xs">
                <th className="px-3 py-2 font-medium">特性</th>
                <th className="px-3 py-2 font-medium">unique_ptr</th>
                <th className="px-3 py-2 font-medium">shared_ptr</th>
                <th className="px-3 py-2 font-medium">weak_ptr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-300 text-xs text-ink-light">
              {[
                ['所有权', '独占', '共享', '不拥有'],
                ['引用计数', '无', '有', '不增加'],
                ['拷贝', '禁止', '允许', '允许'],
                ['移动', '允许', '允许', '允许'],
                ['性能', '最高', '中等', '低'],
                ['适用', '唯一所有权', '共享资源', '观察者'],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-paper-200/50">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 ${j === 0 ? 'font-medium text-ink' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="优先使用 unique_ptr。需要共享时用 shared_ptr，用 weak_ptr 打破循环引用" />
      </div>
    ),
  },
]

export default function SmartPointersPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
