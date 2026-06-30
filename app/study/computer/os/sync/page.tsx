'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '操作系统',
  chapterTitle: '进程同步与互斥',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '调度算法', href: '/study/computer/os/schedule' },
  nextChapter: { label: '死锁与避免', href: '/study/computer/os/deadlock' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>进程同步与互斥的基本原理</PageTitle>
        <BookParagraph>
          同步是指多个进程在执行过程中因共享资源或协作关系而需要协调执行顺序。互斥是指同一时刻只允许一个进程进入临界区访问共享资源。
        </BookParagraph>
        <BookParagraph>
          常见同步与互斥机制包括临界区、信号量、管程等。合理的同步与互斥机制能防止竞态条件、保证数据一致性，是并发程序设计的核心。
        </BookParagraph>
        <SectionTitle>竞态条件</SectionTitle>
        <BookParagraph>
          当多个进程并发访问和操作同一组数据，且执行结果取决于访问的特定顺序时，就发生了竞态条件。为防止竞态条件，需要确保对共享数据的操作是原子性的。
        </BookParagraph>
        <BookAlert type="info" message="临界区是访问共享资源的代码段，同一时刻只允许一个进程进入。通过同步机制（如信号量）来保证互斥进入。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>原理结构图</PageTitle>
        <BookParagraph>多个进程互斥访问临界区，同一时刻只有一个进程可以进入。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="600" height="220" viewBox="0 0 600 220">
            <rect x="60" y="30" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="110" y="55" textAnchor="middle" fontSize="14">进程1</text>
            <rect x="60" y="90" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="110" y="115" textAnchor="middle" fontSize="14">进程2</text>
            <rect x="60" y="150" width="100" height="40" fill="#90caf9" stroke="#1976d2" rx="10" />
            <text x="110" y="175" textAnchor="middle" fontSize="14">进程3</text>
            <rect x="380" y="80" width="120" height="60" fill="#ffe082" stroke="#fbc02d" rx="12" />
            <text x="440" y="115" textAnchor="middle" fontSize="15">临界区</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="160" y1="50" x2="380" y2="110" />
              <line x1="160" y1="110" x2="380" y2="110" />
              <line x1="160" y1="170" x2="380" y2="110" />
            </g>
          </svg>
        </div>
        <SectionTitle>临界区访问原则</SectionTitle>
        <BookList items={[
          '互斥访问：同一时刻只允许一个进程进入临界区',
          '前进推进：没有进程在临界区时，允许请求的进程进入',
          '有限等待：不允许进程无限等待进入临界区',
        ]} />
        <TagGrid items={['同步', '互斥', '临界区', '竞态条件', '并发']} />
      </div>
    ),
  },
  {
    label: '经典同步机制',
    left: (
      <div className="space-y-4">
        <PageTitle>经典同步机制</PageTitle>
        <BookParagraph>
          常见同步与互斥机制包括 <strong>信号量（Semaphore）</strong>、<strong>管程（Monitor）</strong>、PV操作等。
        </BookParagraph>
        <BookParagraph>
          信号量是Dijkstra提出的经典同步机制，通过P操作（等待）和V操作（释放）来实现进程的同步与互斥。
        </BookParagraph>
        <SectionTitle>信号量机制流程图</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="160" viewBox="0 0 700 160">
            <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="85" textAnchor="middle" fontSize="14">进程</text>
            <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="280" y="85" textAnchor="middle" fontSize="14">P操作</text>
            <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="440" y="85" textAnchor="middle" fontSize="14">信号量S--</text>
            <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="600" y="85" textAnchor="middle" fontSize="14">进入临界区</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="80" x2="220" y2="80" />
              <line x1="340" y1="80" x2="380" y2="80" />
              <line x1="500" y1="80" x2="540" y2="80" />
            </g>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>信号量C语言伪代码</PageTitle>
        <BookParagraph>信号量结构体的定义及P/V操作实现（含详细注释）：</BookParagraph>
        <BookCode language="cpp" code={`// 信号量结构体
struct Semaphore {
    int value;         // 信号量计数
    queue waitQ;       // 等待队列
};

// P操作（等待）
void P(Semaphore *S) {
    S->value--;
    if (S->value < 0) {
        // 阻塞进程，加入等待队列
        block(S->waitQ);
    }
}

// V操作（释放）
void V(Semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        // 唤醒等待队列中的进程
        wakeup(S->waitQ);
    }
}`} />
        <BookAlert type="info" message="P操作减少信号量值（申请资源），V操作增加信号量值（释放资源）。当信号量值为0时，P操作将阻塞进程；V操作会唤醒等待队列中的进程。" />
        <TagGrid items={['信号量', 'P操作', 'V操作', '管程', 'Dijkstra']} />
      </div>
    ),
  },
  {
    label: '典型同步问题',
    left: (
      <div className="space-y-4">
        <PageTitle>经典同步问题</PageTitle>
        <BookParagraph>
          典型同步问题包括 <strong>生产者-消费者</strong>、<strong>读者写者</strong>、<strong>哲学家就餐</strong> 等，它们是并发编程中的经典模型。
        </BookParagraph>
        <SectionTitle>生产者-消费者问题流程图</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="180" viewBox="0 0 700 180">
            <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="85" textAnchor="middle" fontSize="14">生产者</text>
            <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="280" y="85" textAnchor="middle" fontSize="14">缓冲区</text>
            <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="440" y="85" textAnchor="middle" fontSize="14">消费者</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="80" x2="220" y2="80" />
              <line x1="340" y1="80" x2="380" y2="80" />
            </g>
          </svg>
        </div>
        <BookParagraph>
          生产者生产数据放入缓冲区，消费者从缓冲区取出数据。通过三个信号量 empty、full、mutex 实现同步与互斥。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>生产者-消费者C语言伪代码</PageTitle>
        <BookParagraph>使用信号量实现生产者-消费者问题的完整代码（含详细注释）：</BookParagraph>
        <BookCode language="cpp" code={`// 缓冲区大小N，信号量empty=N, full=0, mutex=1
semaphore empty = N, full = 0, mutex = 1;

// 生产者进程
void producer() {
    while (1) {
        P(&empty); // 等待空位
        P(&mutex); // 进入临界区
        // 放入产品
        V(&mutex); // 离开临界区
        V(&full);  // 增加产品数
    }
}

// 消费者进程
void consumer() {
    while (1) {
        P(&full);  // 等待产品
        P(&mutex); // 进入临界区
        // 取出产品
        V(&mutex); // 离开临界区
        V(&empty); // 增加空位
    }
}`} />
        <BookAlert type="warning" message="注意P操作的顺序！必须先对资源信号量（empty/full）做P操作，再对互斥信号量（mutex）做P操作，否则可能导致死锁。" />
        <TagGrid items={['生产者-消费者', '读者写者', '哲学家就餐', 'PV操作', '同步']} />
      </div>
    ),
  },
  {
    label: '例题与解析',
    left: (
      <div className="space-y-4">
        <PageTitle>选择题与判断题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">选择题：</p>
          <p className="font-semibold mb-1">例题1：</p>
          <p className="text-sm mb-2">关于信号量机制，下列说法正确的是：</p>
          <BookList items={[
            'A. 信号量只能用于互斥',
            'B. P操作会增加信号量值',
            'C. 信号量可用于同步和互斥',
            'D. V操作会阻塞进程',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：C</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：信号量既可用于互斥（如二进制信号量），也可用于同步（如计数信号量），P操作减少信号量值，V操作增加。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题2（判断）：</p>
          <p className="text-sm mb-2">管程机制只能用于单处理器系统。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：×</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：管程是一种高级同步机制，适用于多处理器和多线程环境。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>简答与计算题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题3（简答）：</p>
          <p className="text-sm mb-2">简述生产者-消费者问题的同步实现思路。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>用信号量empty、full、mutex分别控制空位、产品数和互斥，生产者和消费者通过P/V操作实现同步与互斥。</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>原理解释：信号量机制能有效防止竞态条件，保证缓冲区数据一致性，是并发程序设计的经典范例。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题4（计算）：</p>
          <p className="text-sm mb-2">某缓冲区大小为5，初始empty=5, full=0, mutex=1，若连续3个生产者和2个消费者操作后，empty和full的值分别是多少？</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：empty=4, full=1</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：每生产一次empty-1, full+1，每消费一次empty+1, full-1，3次生产2次消费后empty=5-3+2=4, full=0+3-2=1。</p>
        </div>
        <TagGrid items={['例题', '信号量', 'PV操作', '生产者-消费者', '计算']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          进程同步与互斥是操作系统中并发编程的核心内容。
        </BookParagraph>
        <BookList items={[
          '理解同步与互斥的基本原理和常见机制',
          '掌握信号量、管程、PV操作等实现',
          '多做例题，强化理解和应用能力',
          '尝试手动模拟经典同步问题',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键知识点</PageTitle>
        <BookParagraph>
          本章核心概念总结：
        </BookParagraph>
        <BookList items={[
          '同步：协调多个进程的执行顺序',
          '互斥：同一时刻只允许一个进程进入临界区',
          '信号量：P操作申请资源，V操作释放资源',
          '管程：高级同步机制，封装了同步操作',
          '经典问题：生产者-消费者、读者写者、哲学家就餐',
        ]} />
        <TagGrid items={['学习建议', '同步', '互斥', '信号量', '管程']} />
      </div>
    ),
  },
]

export default function OsSyncPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
