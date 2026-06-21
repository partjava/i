'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '操作系统',
  chapterTitle: '进程与线程管理',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '操作系统概述', href: '/study/computer/os/intro' },
  nextChapter: { label: '内存管理', href: '/study/computer/os/memory' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '进程概念',
    left: (
      <div className="space-y-4">
        <PageTitle>进程的定义</PageTitle>
        <BookParagraph>
          进程是程序的一次执行过程，是系统进行<strong>资源分配和调度</strong>的基本单位。进程是动态的，程序是静态的。
        </BookParagraph>
        <SectionTitle>进程的特征</SectionTitle>
        <BookList items={[
          '动态性：进程是程序的一次执行，有生命周期',
          '并发性：多个进程可以同时执行',
          '独立性：进程是资源分配的基本单位',
          '异步性：进程按各自独立、不可预知的速度推进',
        ]} />
        <BookAlert type="info" message="进程是操作系统中最核心的概念之一。理解进程的创建、调度、同步和通信是掌握操作系统的基础。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>进程控制块（PCB）</PageTitle>
        <BookParagraph>
          操作系统为每个进程维护一个PCB（Process Control Block），用于描述进程的状态和控制信息。
        </BookParagraph>
        <BookList items={[
          '进程标识符：唯一标识一个进程',
          '程序计数器：下一条指令的地址',
          'CPU寄存器：保存进程上下文',
          '内存空间信息：地址空间边界',
          '打开文件列表：进程持有的文件句柄',
          '调度信息：优先级、状态等',
        ]} />
        <BookCode language="cpp" code={`// PCB 简化结构示意
struct PCB {
    int pid;              // 进程ID
    int state;            // 进程状态
    int priority;         // 优先级
    int *program_counter; // 程序计数器
    int *registers;       // 寄存器
    int memory_limit;     // 内存限制
};`} />
        <TagGrid items={['进程', 'PCB', '资源分配', '动态性']} />
      </div>
    ),
  },
  {
    label: '线程概念',
    left: (
      <div className="space-y-4">
        <PageTitle>线程的定义</PageTitle>
        <BookParagraph>
          线程是进程中的一个执行单元，是<strong>CPU调度和分派</strong>的基本单位。一个进程可以包含多个线程。
        </BookParagraph>
        <SectionTitle>线程的特征</SectionTitle>
        <BookList items={[
          '轻量级：创建和切换开销小',
          '共享性：同一进程的线程共享进程资源',
          '并发性：多个线程可以并发执行',
          '独立性：线程是CPU调度的基本单位',
        ]} />
        <BookAlert type="warning" message="线程共享进程的地址空间，因此线程间通信比进程间通信更容易，但也带来了同步问题。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>线程的类型</PageTitle>
        <BookParagraph>根据线程的管理层次，可分为用户级线程和内核级线程。</BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">对比项</th>
                <th className="text-left p-2 font-semibold">用户级线程</th>
                <th className="text-left p-2 font-semibold">内核级线程</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">管理方式</td>
                <td className="p-2">用户空间管理</td>
                <td className="p-2">操作系统内核管理</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">切换速度</td>
                <td className="p-2">快（不涉及内核）</td>
                <td className="p-2">慢（需系统调用）</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">多CPU利用</td>
                <td className="p-2">不能利用多核</td>
                <td className="p-2">可以利用多核</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">阻塞影响</td>
                <td className="p-2">一个线程阻塞→全部阻塞</td>
                <td className="p-2">一个线程阻塞不影响其他</td>
              </tr>
            </tbody>
          </table>
        </div>
        <TagGrid items={['线程', 'CPU调度', '用户级线程', '内核级线程', '轻量级']} />
      </div>
    ),
  },
  {
    label: '状态转换',
    left: (
      <div className="space-y-4">
        <PageTitle>进程的五种状态</PageTitle>
        <BookParagraph>
          进程在生命周期中会经历不同的状态，操作系统通过状态转换来管理进程的执行。
        </BookParagraph>
        <BookList items={[
          '新建（New）：进程正在被创建',
          '就绪（Ready）：等待被调度到CPU',
          '运行（Running）：正在CPU上执行',
          '阻塞（Blocked）：等待某事件完成',
          '终止（Terminated）：执行完毕或被终止',
        ]} />
        <BookAlert type="info" message="就绪态和阻塞态的核心区别：就绪态等待的是CPU资源，阻塞态等待的是I/O或其他事件。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>状态转换图</PageTitle>
        <BookParagraph>进程状态之间的转换关系如下：</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="400" height="200" viewBox="0 0 400 200">
            <g fontSize="14">
              <circle cx="80" cy="40" r="30" fill="#e3f2fd" />
              <text x="80" y="45" textAnchor="middle">新建</text>
              <circle cx="200" cy="40" r="30" fill="#bbdefb" />
              <text x="200" y="45" textAnchor="middle">就绪</text>
              <circle cx="320" cy="40" r="30" fill="#90caf9" />
              <text x="320" y="45" textAnchor="middle">运行</text>
              <circle cx="200" cy="120" r="30" fill="#e1bee7" />
              <text x="200" y="125" textAnchor="middle">阻塞</text>
              <circle cx="320" cy="120" r="30" fill="#c8e6c9" />
              <text x="320" y="125" textAnchor="middle">终止</text>
            </g>
            <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow2)">
              <line x1="110" y1="40" x2="170" y2="40" />
              <line x1="230" y1="40" x2="290" y2="40" />
              <line x1="320" y1="70" x2="320" y2="90" />
              <line x1="290" y1="120" x2="230" y2="120" />
              <line x1="200" y1="90" x2="200" y2="70" />
            </g>
            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookParagraph>
          主要转换：新建→就绪、就绪→运行、运行→就绪、运行→阻塞、阻塞→就绪、运行→终止。
        </BookParagraph>
        <TagGrid items={['新建', '就绪', '运行', '阻塞', '终止', '状态转换']} />
      </div>
    ),
  },
  {
    label: '进程与线程对比',
    left: (
      <div className="space-y-4">
        <PageTitle>核心区别</PageTitle>
        <BookParagraph>
          进程和线程是操作系统中两个关键的并发执行单元，理解它们的区别至关重要。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">对比项</th>
                <th className="text-left p-2 font-semibold">进程</th>
                <th className="text-left p-2 font-semibold">线程</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">地址空间</td>
                <td className="p-2">独立</td>
                <td className="p-2">共享</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">调度单位</td>
                <td className="p-2">操作系统调度</td>
                <td className="p-2">同一进程内调度</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">资源拥有</td>
                <td className="p-2">拥有全部资源</td>
                <td className="p-2">只拥有部分资源</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">通信方式</td>
                <td className="p-2">IPC机制</td>
                <td className="p-2">直接通信</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">开销</td>
                <td className="p-2">大</td>
                <td className="p-2">小</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="success" message="进程是资源分配的基本单位，线程是CPU调度的基本单位。多线程编程能更好地利用多核处理器。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>例题与解析</PageTitle>
        <BookParagraph>
          通过例题巩固对进程与线程的理解。
        </BookParagraph>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题1（单选）：</p>
          <p className="text-sm mb-2">下列关于进程和线程的说法，正确的是：</p>
          <BookList items={[
            'A. 进程是CPU调度的基本单位，线程是资源分配的基本单位',
            'B. 线程是CPU调度的基本单位，进程是资源分配的基本单位',
            'C. 进程和线程都是资源分配的基本单位',
            'D. 线程和进程都不能并发执行',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：B</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：进程是资源分配的基本单位，线程是CPU调度的基本单位。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题2（简答）：</p>
          <p className="text-sm mb-2">简述进程的五种基本状态及其转换关系。</p>
          <BookAlert type="success" message="答案要点：新建→就绪→运行→终止，运行↔阻塞，阻塞→就绪。详见状态转换图。" />
        </div>
        <TagGrid items={['进程', '线程', '对比', '例题', '状态转换']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          进程与线程管理是操作系统的核心内容，需要深入理解。
        </BookParagraph>
        <BookList items={[
          '理解进程和线程的区别与联系',
          '掌握进程状态转换的过程',
          '熟悉进程和线程的创建、终止方法',
          '了解进程同步和通信机制',
          '多线程编程实践加深理解',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键知识点</PageTitle>
        <BookParagraph>
          本章需要掌握的核心概念：
        </BookParagraph>
        <BookList items={[
          '进程的定义、特征与组成（PCB）',
          '线程的定义、特征与类型',
          '进程的五种状态及转换',
          '进程与线程的核心区别',
          '用户级线程与内核级线程的优缺点',
        ]} />
        <TagGrid items={['学习建议', '进程管理', '线程管理', 'PCB', '并发']} />
      </div>
    ),
  },
]

export default function OsProcessPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
