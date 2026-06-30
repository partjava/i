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
  chapterTitle: '多线程编程',
  chapterNumber: 17,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '智能指针', href: '/study/computer/cpp/smart-pointers' },
  nextChapter: { label: '网络编程', href: '/study/computer/cpp/networking' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '线程基础',
    left: (
      <div className="space-y-4">
        <PageTitle>创建和使用线程</PageTitle>
        <BookParagraph>使用C++11标准线程库创建和管理线程。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
#include <thread>
#include <chrono>
using namespace std;

// 线程函数
void threadFunction(int id) {
    for(int i = 0; i < 3; i++) {
        cout << "线程 " << id << " 执行中..." << endl;
        this_thread::sleep_for(chrono::seconds(1));
    }
}

int main() {
    cout << "主线程开始" << endl;

    // 创建线程
    thread t1(threadFunction, 1);
    thread t2(threadFunction, 2);

    // 等待线程完成
    t1.join();
    t2.join();

    cout << "所有线程已完成" << endl;
    return 0;
}

// 使用Lambda表达式
void lambdaThread() {
    auto lambda = [](int x) {
        cout << "Lambda线程: " << x << endl;
    };
    thread t(lambda, 100);
    t.join();
}`} />
        <BookAlert type="info" message="join() 等待线程完成，detach() 将线程与主线程分离。线程函数可以是普通函数、Lambda 或函数对象" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>线程管理与同步</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 线程管理
void threadManagement() {
    // 获取线程ID
    thread::id this_id = this_thread::get_id();

    // 获取CPU核心数
    unsigned int n = thread::hardware_concurrency();

    // 线程分离
    thread detachThread([]{
        cout << "分离线程运行" << endl;
    });
    detachThread.detach();

    // 判断线程是否可join
    thread t(threadFunction, 1);
    if (t.joinable()) {
        t.join();
    }
}

// 线程局部存储
thread_local int threadLocalVar = 0;

void incrementLocal() {
    threadLocalVar++;
    cout << "线程本地变量: "
         << threadLocalVar << endl;
}`} />
      </div>
    ),
  },
  {
    label: '互斥锁',
    left: (
      <div className="space-y-4">
        <PageTitle>互斥锁的使用</PageTitle>
        <BookParagraph>使用互斥锁保护共享资源，避免数据竞争。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class BankAccount {
private:
    mutex mtx;
    int balance;
public:
    BankAccount() : balance(0) {}

    void deposit(int amount) {
        lock_guard<mutex> lock(mtx);
        balance += amount;
        cout << "存入: " << amount
             << ", 余额: " << balance << endl;
    }

    void withdraw(int amount) {
        unique_lock<mutex> lock(mtx);
        if (balance >= amount) {
            balance -= amount;
            cout << "取出: " << amount
                 << ", 余额: " << balance << endl;
        } else {
            cout << "余额不足" << endl;
        }
    }
};

void customer(BankAccount& acc, bool dep) {
    for(int i = 0; i < 5; i++) {
        if (dep) acc.deposit(100);
        else acc.withdraw(50);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>高级同步机制</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`#include <condition_variable>

class MessageQueue {
private:
    queue<int> messages;
    mutex mtx;
    condition_variable cv;
public:
    void send(int msg) {
        {
            lock_guard<mutex> lock(mtx);
            messages.push(msg);
        }
        cv.notify_one();  // 通知等待的线程
    }

    int receive() {
        unique_lock<mutex> lock(mtx);
        cv.wait(lock, [this]{
            return !messages.empty();
        });
        int msg = messages.front();
        messages.pop();
        return msg;
    }
};

// 读写锁
void readWriteLock() {
    shared_mutex rwLock;
    // 读锁：可多个线程同时读
    shared_lock readLock(rwLock);
    // 写锁：独占
    unique_lock writeLock(rwLock);
}`} />
        <BookAlert type="info" message="lock_guard 简单RAII加锁，unique_lock 更灵活支持条件变量，shared_lock 实现读写锁" />
      </div>
    ),
  },
  {
    label: '原子操作',
    left: (
      <div className="space-y-4">
        <PageTitle>原子操作与无锁编程</PageTitle>
        <BookParagraph>原子操作不需要互斥锁即可安全操作共享变量。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <atomic>

// 原子计数器
atomic<int> counter(0);

void incrementCounter() {
    for(int i = 0; i < 1000; i++) {
        counter.fetch_add(1);  // 原子递增
    }
}

int main() {
    vector<thread> threads;
    for(int i = 0; i < 10; i++) {
        threads.emplace_back(incrementCounter);
    }
    for(auto& t : threads) t.join();

    cout << "最终计数: " << counter << endl;
    // 结果：10000（无需锁）
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>多线程最佳实践</PageTitle>
        <BookList items={[
          '尽量使用更高层的并发工具（async、future）',
          '优先使用原子操作而非互斥锁',
          '避免死锁：固定加锁顺序或使用 std::lock',
          '最小化临界区范围',
          '使用 RAII 管理锁（lock_guard）',
          '尽量使用线程池而非频繁创建销毁线程',
        ]} />
        <BookAlert type="warning" message="多线程调试困难，尽量用高级抽象减少直接线程操作。数据竞争和死锁是最常见的两类问题" />
        <TagGrid items={['thread', 'mutex', 'atomic', 'condition_variable', 'future', 'async']} />
      </div>
    ),
  },
]

export default function MultithreadingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
