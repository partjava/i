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
  chapterTitle: '调度算法',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '输入输出与设备管理', href: '/study/computer/os/io' },
  nextChapter: { label: '进程同步与互斥', href: '/study/computer/os/sync' },
  theme: THEMES.computer,
}

const algoData = [
  { name: 'FCFS', desc: '先来先服务，按到达顺序调度。', adv: '实现简单，公平', disadv: '平均等待时间长，易饥饿' },
  { name: 'SJF', desc: '短作业优先，优先调度运行时间短的作业。', adv: '平均等待时间短', disadv: '长作业易饥饿，需预知运行时间' },
  { name: '优先级', desc: '按优先级高低调度。', adv: '紧急任务优先', disadv: '低优先级易饿死' },
  { name: 'RR', desc: '时间片轮转，按固定时间片轮流调度。', adv: '响应快，公平', disadv: '上下文切换多，时间片难选' },
  { name: 'HRRN', desc: '高响应比优先，响应比=（等待+服务）/服务。', adv: '兼顾长短作业', disadv: '实现复杂' },
]

const SPREADS = [
  {
    label: '调度概述',
    left: (
      <div className="space-y-4">
        <PageTitle>调度概述与分类</PageTitle>
        <BookParagraph>
          操作系统的调度是指对系统中各种资源（如CPU、内存、I/O等）分配和管理的过程。调度策略的选择直接关系到系统的性能、效率和公平性，是操作系统设计的核心内容之一。
        </BookParagraph>
        <SectionTitle>调度层次结构</SectionTitle>
        <BookParagraph>
          调度分为作业调度、进程调度和线程调度三个层次，三者层次分明、各有侧重，共同保证系统资源的高效利用和用户体验的提升。
        </BookParagraph>
        <BookList items={[
          '作业调度：决定哪些作业进入内存，影响系统的吞吐量和响应时间',
          '进程调度：决定哪个进程获得CPU，直接影响系统的响应速度和公平性',
          '线程调度：在同一进程内分配CPU，适用于多线程程序',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>调度层次结构图</PageTitle>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
          <svg width="600" height="160" viewBox="0 0 600 160" style={{ maxWidth: '100%' }}>
            <rect x="60" y="40" width="140" height="40" rx="10" fill="#e3f2fd" />
            <text x="130" y="65" textAnchor="middle" fontSize="15">作业调度</text>
            <rect x="240" y="40" width="140" height="40" rx="10" fill="#ffe082" />
            <text x="310" y="65" textAnchor="middle" fontSize="15">进程调度</text>
            <rect x="420" y="40" width="140" height="40" rx="10" fill="#c8e6c9" />
            <text x="490" y="65" textAnchor="middle" fontSize="15">线程调度</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="200" y1="60" x2="240" y2="60" />
              <line x1="380" y1="60" x2="420" y2="60" />
            </g>
          </svg>
        </div>
        <SectionTitle>调度目标</SectionTitle>
        <BookList items={[
          'CPU利用率最大化',
          '吞吐量最大化',
          '周转时间最小化',
          '响应时间最小化',
          '公平性：不产生饥饿',
        ]} />
        <BookAlert type="info" message="调度算法的选择需要在多个目标之间权衡。例如，响应时间和吞吐量往往是矛盾的——响应快意味着更多的上下文切换，可能降低总吞吐量。" />
        <TagGrid items={['作业调度', '进程调度', '线程调度', 'CPU', '吞吐量']} />
      </div>
    ),
  },
  {
    label: '经典调度算法',
    left: (
      <div className="space-y-4">
        <PageTitle>经典调度算法</PageTitle>
        <BookParagraph>
          经典调度算法的原理与对比。这五种算法各有优缺点，实际应用中常结合使用以满足不同场景需求。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">算法</th>
                <th className="text-left p-2 font-semibold">原理</th>
                <th className="text-left p-2 font-semibold">优点</th>
                <th className="text-left p-2 font-semibold">缺点</th>
              </tr>
            </thead>
            <tbody>
              {algoData.map((a, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#e0e0e0' }}>
                  <td className="p-2 font-medium">{a.name}</td>
                  <td className="p-2">{a.desc}</td>
                  <td className="p-2">{a.adv}</td>
                  <td className="p-2">{a.disadv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>算法详解</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">FCFS（先来先服务）</p>
          <p className="text-sm">按进程到达顺序调度，简单公平但平均等待时间长，适合批处理系统。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">SJF（短作业优先）</p>
          <p className="text-sm">优先调度运行时间短的进程，平均等待时间最短，但需预知作业长度，可能导致长作业饥饿。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">优先级调度</p>
          <p className="text-sm">按进程优先级分配CPU，高优先级进程先执行，适合实时系统，但低优先级进程可能长期得不到服务。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">RR（时间片轮转）</p>
          <p className="text-sm">每个进程分配固定时间片，轮流调度，响应快，适合分时系统，但时间片设置需权衡。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">HRRN（高响应比优先）</p>
          <p className="text-sm">综合考虑等待时间和服务时间，响应比高者优先，兼顾效率和公平，适合交互式系统。</p>
        </div>
        <TagGrid items={['FCFS', 'SJF', '优先级', 'RR', 'HRRN']} />
      </div>
    ),
  },
  {
    label: 'FCFS与RR实现',
    left: (
      <div className="space-y-4">
        <PageTitle>FCFS 时序图</PageTitle>
        <BookParagraph>FCFS（先来先服务）按进程到达顺序调度：</BookParagraph>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
          <svg width="500" height="80" viewBox="0 0 500 80" style={{ maxWidth: '100%' }}>
            <rect x="40" y="30" width="80" height="30" rx="6" fill="#e3f2fd" />
            <text x="80" y="50" textAnchor="middle">P1</text>
            <rect x="120" y="30" width="120" height="30" rx="6" fill="#bbdefb" />
            <text x="180" y="50" textAnchor="middle">P2</text>
            <rect x="240" y="30" width="160" height="30" rx="6" fill="#90caf9" />
            <text x="320" y="50" textAnchor="middle">P3</text>
            <rect x="400" y="30" width="60" height="30" rx="6" fill="#c8e6c9" />
            <text x="430" y="50" textAnchor="middle">P4</text>
            <line x1="40" y1="65" x2="460" y2="65" stroke="#1976d2" strokeWidth="2" />
            <text x="40" y="75" textAnchor="middle" fontSize="12">0</text>
            <text x="120" y="75" textAnchor="middle" fontSize="12">1</text>
            <text x="240" y="75" textAnchor="middle" fontSize="12">3</text>
            <text x="400" y="75" textAnchor="middle" fontSize="12">7</text>
            <text x="460" y="75" textAnchor="middle" fontSize="12">10</text>
          </svg>
        </div>
        <BookAlert type="info" message="FCFS的优点是实现简单、公平，缺点是当短作业排在长作业后面时，平均等待时间会很长，不适合分时系统。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>RR（时间片轮转）C++实现</PageTitle>
        <BookParagraph>
          RR算法每个进程分配固定时间片，轮流调度，下面给出完整实现（含详细注释）：
        </BookParagraph>
        <BookCode language="cpp" code={`#include <iostream>
#include <queue>
using namespace std;

struct Process {
    int pid;        // 进程号
    int burst;      // 剩余运行时间
    int arrive;     // 到达时间
};

int main() {
    queue<Process> q;
    int n = 4, time = 0, quantum = 2;
    Process plist[] = {{1, 5, 0}, {2, 3, 1}, {3, 4, 2}, {4, 2, 3}};
    int finish[5] = {0};
    int idx = 0;
    while (idx < n || !q.empty()) {
        // 新到进程入队
        while (idx < n && plist[idx].arrive <= time) q.push(plist[idx++]);
        if (q.empty()) { time++; continue; }
        Process p = q.front(); q.pop();
        int run = min(quantum, p.burst);
        cout << "时间" << time << ": 运行P" << p.pid << "(" << run << ")\\n";
        time += run;
        p.burst -= run;
        // 新到进程入队
        while (idx < n && plist[idx].arrive <= time) q.push(plist[idx++]);
        if (p.burst > 0) q.push(p); // 未完成重新入队
        else finish[p.pid] = time;
    }
    for (int i = 1; i <= n; ++i)
        cout << "P" << i << "完成时间:" << finish[i] << endl;
    return 0;
}`} />
        <TagGrid items={['FCFS', 'RR', '时间片', 'C++实现', 'Gantt图']} />
      </div>
    ),
  },
  {
    label: 'SJF与对比',
    left: (
      <div className="space-y-4">
        <PageTitle>SJF（短作业优先）流程图</PageTitle>
        <BookParagraph>SJF优先调度运行时间最短的进程，平均等待时间最优：</BookParagraph>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
          <svg width="500" height="100" viewBox="0 0 500 100" style={{ maxWidth: '100%' }}>
            <rect x="40" y="30" width="80" height="30" rx="6" fill="#ffe082" />
            <text x="80" y="50" textAnchor="middle">作业队列</text>
            <rect x="160" y="30" width="80" height="30" rx="6" fill="#e3f2fd" />
            <text x="200" y="50" textAnchor="middle">选择最短</text>
            <rect x="300" y="30" width="80" height="30" rx="6" fill="#c8e6c9" />
            <text x="340" y="50" textAnchor="middle">运行</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="120" y1="45" x2="160" y2="45" />
              <line x1="240" y1="45" x2="300" y2="45" />
            </g>
          </svg>
        </div>
        <BookAlert type="warning" message="SJF虽然平均等待时间最短，但需要预知作业运行时间，这在现实中难以做到。且长作业可能长期得不到服务（饥饿）。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>算法对比与实验</PageTitle>
        <BookParagraph>各种调度算法的优缺点对比：</BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">算法</th>
                <th className="text-left p-2 font-semibold">优点</th>
                <th className="text-left p-2 font-semibold">缺点</th>
              </tr>
            </thead>
            <tbody>
              {algoData.map((a, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#e0e0e0' }}>
                  <td className="p-2 font-medium">{a.name}</td>
                  <td className="p-2">{a.adv}</td>
                  <td className="p-2">{a.disadv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <BookParagraph>Gantt图（调度实验时序示意）：</BookParagraph>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <svg width="500" height="80" viewBox="0 0 500 80" style={{ maxWidth: '100%' }}>
            <rect x="40" y="30" width="80" height="30" rx="6" fill="#e3f2fd" />
            <text x="80" y="50" textAnchor="middle">P1</text>
            <rect x="120" y="30" width="120" height="30" rx="6" fill="#bbdefb" />
            <text x="180" y="50" textAnchor="middle">P2</text>
            <rect x="240" y="30" width="160" height="30" rx="6" fill="#90caf9" />
            <text x="320" y="50" textAnchor="middle">P3</text>
            <rect x="400" y="30" width="60" height="30" rx="6" fill="#c8e6c9" />
            <text x="430" y="50" textAnchor="middle">P4</text>
            <line x1="40" y1="65" x2="460" y2="65" stroke="#1976d2" strokeWidth="2" />
            <text x="40" y="75" textAnchor="middle" fontSize="12">0</text>
            <text x="120" y="75" textAnchor="middle" fontSize="12">1</text>
            <text x="240" y="75" textAnchor="middle" fontSize="12">3</text>
            <text x="400" y="75" textAnchor="middle" fontSize="12">7</text>
            <text x="460" y="75" textAnchor="middle" fontSize="12">10</text>
          </svg>
        </div>
        <TagGrid items={['SJF', '算法对比', 'Gantt图', '平均等待时间', '饥饿']} />
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
          <p className="text-sm mb-2">关于FCFS和SJF调度算法，下列说法正确的是：</p>
          <BookList items={[
            'A. FCFS平均等待时间一定比SJF短',
            'B. SJF可能导致长作业饥饿',
            'C. FCFS适合实时系统',
            'D. SJF无需预知作业长度',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：B</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：SJF优先调度短作业，平均等待时间最短，但长作业可能长期得不到服务，出现饥饿现象。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题2（判断）：</p>
          <p className="text-sm mb-2">时间片轮转调度算法适合分时系统。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：√</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：时间片轮转算法能保证每个进程公平获得CPU，响应快，特别适合分时系统。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>简答与计算题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题3（简答）：</p>
          <p className="text-sm mb-2">简述HRRN算法的调度思想及其优缺点。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>HRRN算法根据响应比=（等待时间+服务时间）/服务时间，响应比高者优先调度。优点是兼顾效率和公平，缺点是实现较复杂。</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>原理解释：HRRN算法通过提高等待时间较长进程的优先级，避免了长作业饥饿，适合交互式和批处理混合系统。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题4（计算）：</p>
          <p className="text-sm mb-2">有3个作业A、B、C，到达时间均为0，服务时间分别为3、5、2，采用SJF算法，计算平均等待时间。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：（0+2+5）/3 = 2.33</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：先执行C（2），A（3），B（5），等待时间分别为0、2、5，平均等待时间为2.33。</p>
        </div>
        <TagGrid items={['例题', 'FCFS', 'SJF', 'RR', 'HRRN', '计算']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          调度算法是操作系统的核心内容，需要从原理到实现全面掌握。
        </BookParagraph>
        <BookList items={[
          '多画图理解调度流程和算法',
          '动手实现经典调度算法',
          '总结常见考点和易错点',
          '深入理解各算法的适用场景',
          '通过对比学习加深记忆',
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
          '调度层次：作业调度、进程调度、线程调度',
          'FCFS：公平简单，平均等待时间长',
          'SJF：平均等待时间最优，长作业可能饥饿',
          'RR：时间片轮转，响应快，上下文切换多',
          'HRRN：兼顾长短作业，综合平衡',
          '调度算法的评价指标：CPU利用率、吞吐量、周转时间、响应时间',
        ]} />
        <TagGrid items={['学习建议', '调度算法', 'FCFS', 'SJF', 'RR', 'HRRN']} />
      </div>
    ),
  },
]

export default function OsSchedulePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
