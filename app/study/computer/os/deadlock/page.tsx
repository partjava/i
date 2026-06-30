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
  chapterTitle: '死锁与避免',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '进程同步与互斥', href: '/study/computer/os/sync' },
  nextChapter: { label: '操作系统安全', href: '/study/computer/os/security' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '死锁基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>死锁的定义与条件</PageTitle>
        <BookParagraph>
          死锁是指两个或多个进程在执行过程中，因争夺资源而造成的一种互相等待的现象，若无外力干涉，它们都无法推进。
        </BookParagraph>
        <SectionTitle>死锁的四个必要条件</SectionTitle>
        <BookParagraph>死锁发生需同时满足以下四个条件：</BookParagraph>
        <BookList items={[
          '互斥（Mutual Exclusion）：资源一次只能被一个进程占用',
          '占有且等待（Hold and Wait）：进程已占有一些资源，同时等待其他资源',
          '不剥夺（No Preemption）：进程已占有的资源不能被强行剥夺',
          '循环等待（Circular Wait）：存在进程资源的循环等待链',
        ]} />
        <BookAlert type="info" message="四个条件缺一不可！只要破坏其中一个条件，就可以预防死锁的发生。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统模型与死锁状态图</PageTitle>
        <BookParagraph>死锁的经典场景：进程A持有资源X等待资源Y，进程B持有资源Y等待资源X，形成循环等待。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="600" height="180" viewBox="0 0 600 180">
            <rect x="80" y="40" width="80" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="65" textAnchor="middle" fontSize="14">进程A</text>
            <rect x="80" y="120" width="80" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="120" y="145" textAnchor="middle" fontSize="14">进程B</text>
            <rect x="320" y="40" width="60" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="350" y="65" textAnchor="middle" fontSize="13">资源X</text>
            <rect x="320" y="120" width="60" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="350" y="145" textAnchor="middle" fontSize="13">资源Y</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="160" y1="60" x2="320" y2="60" />
              <line x1="160" y1="140" x2="320" y2="140" />
              <line x1="350" y1="80" x2="350" y2="120" />
              <line x1="350" y1="120" x2="350" y2="80" />
            </g>
          </svg>
        </div>
        <BookParagraph>
          上图：进程A持有资源X（←方向），进程B持有资源Y（←方向），同时进程A等待资源Y（→方向），进程B等待资源X（→方向），形成死锁。
        </BookParagraph>
        <TagGrid items={['死锁', '互斥', '持有等待', '不剥夺', '循环等待']} />
      </div>
    ),
  },
  {
    label: '死锁检测与解除',
    left: (
      <div className="space-y-4">
        <PageTitle>死锁检测算法与解除方法</PageTitle>
        <BookParagraph>
          死锁检测通过资源分配图或检测算法（如银行家安全性算法）判断系统是否进入死锁状态。检测到死锁后，可通过撤销进程、抢占资源等方式解除死锁。
        </BookParagraph>
        <SectionTitle>检测流程图</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="160" viewBox="0 0 700 160">
            <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="85" textAnchor="middle" fontSize="14">资源分配图</text>
            <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="280" y="85" textAnchor="middle" fontSize="14">检测算法</text>
            <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="440" y="85" textAnchor="middle" fontSize="14">死锁判断</text>
            <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="600" y="85" textAnchor="middle" fontSize="14">解除方法</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="80" x2="220" y2="80" />
              <line x1="340" y1="80" x2="380" y2="80" />
              <line x1="500" y1="80" x2="540" y2="80" />
            </g>
          </svg>
        </div>
        <BookParagraph>死锁检测伪代码（简化版）：</BookParagraph>
        <BookCode language="cpp" code={`// 死锁检测算法伪代码
for each process P {
    if (P的请求量 <= 可用资源)
        分配资源给P，P完成后释放资源
}
// 若所有进程都能顺利完成，则无死锁，否则有死锁`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>死锁检测C/C++实现</PageTitle>
        <BookParagraph>该算法通过维护资源分配矩阵、请求矩阵和可用资源向量，循环判断哪些进程可以顺利完成，最终检测系统中是否存在死锁。</BookParagraph>
        <BookCode language="cpp" code={`// n个进程，m类资源
int Allocation[n][m]; // 当前分配
int Request[n][m];    // 当前请求
int Available[m];     // 可用资源
bool Finish[n];       // 完成标记

void DeadlockDetection() {
    for (int i = 0; i < n; i++) Finish[i] = false;
    int Work[m];
    for (int j = 0; j < m; j++) Work[j] = Available[j];
    bool found;
    do {
        found = false;
        for (int i = 0; i < n; i++) {
            if (!Finish[i]) {
                bool canFinish = true;
                for (int j = 0; j < m; j++)
                    if (Request[i][j] > Work[j]) canFinish = false;
                if (canFinish) {
                    for (int j = 0; j < m; j++)
                        Work[j] += Allocation[i][j];
                    Finish[i] = true;
                    found = true;
                }
            }
        }
    } while (found);
    for (int i = 0; i < n; i++)
        if (!Finish[i]) printf("进程%d发生死锁\\n", i);
}`} />
        <SectionTitle>死锁解除常用策略</SectionTitle>
        <BookCode language="cpp" code={`// 死锁解除常用策略
// 1. 撤销进程：选择代价最小的进程终止，释放其资源
// 2. 资源抢占：强制回收部分资源，分配给其他进程
// 3. 进程回滚：将进程回退到安全点，释放资源后重试`} />
        <TagGrid items={['死锁检测', '资源分配图', '撤销进程', '资源抢占', '进程回滚']} />
      </div>
    ),
  },
  {
    label: '死锁预防与避免',
    left: (
      <div className="space-y-4">
        <PageTitle>死锁预防与避免策略</PageTitle>
        <BookParagraph>
          死锁预防通过破坏死锁的必要条件（如资源一次性分配、请求前预占、资源可剥夺等）来避免死锁。死锁避免则采用如银行家算法等动态检测系统状态，确保系统始终处于安全状态。
        </BookParagraph>
        <SectionTitle>银行家算法流程图</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="180" viewBox="0 0 700 180">
            <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="85" textAnchor="middle" fontSize="14">进程请求</text>
            <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="280" y="85" textAnchor="middle" fontSize="14">安全性检查</text>
            <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="440" y="85" textAnchor="middle" fontSize="14">资源分配</text>
            <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="600" y="85" textAnchor="middle" fontSize="14">系统安全</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="80" x2="220" y2="80" />
              <line x1="340" y1="80" x2="380" y2="80" />
              <line x1="500" y1="80" x2="540" y2="80" />
            </g>
          </svg>
        </div>
        <BookParagraph>银行家算法伪代码：</BookParagraph>
        <BookCode language="cpp" code={`// 银行家算法伪代码
for each 请求进程P {
    if (P的请求量 <= P的最大需求 && P的请求量 <= 可用资源) {
        if (分配后系统安全) 分配资源
        else 拒绝请求
    } else { 拒绝请求 }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>银行家算法C/C++完整实现</PageTitle>
        <BookParagraph>银行家算法通过试分配和安全性检查，动态判断资源分配是否会导致系统进入不安全状态，若安全则分配，否则拒绝请求。</BookParagraph>
        <BookCode language="cpp" code={`// 银行家算法主流程
bool isSafe() {
    int Work[m];
    bool Finish[n] = {false};
    for (int j = 0; j < m; j++) Work[j] = Available[j];
    int count = 0;
    while (count < n) {
        bool found = false;
        for (int i = 0; i < n; i++) {
            if (!Finish[i]) {
                bool canFinish = true;
                for (int j = 0; j < m; j++)
                    if (Request[i][j] > Work[j]) canFinish = false;
                if (canFinish) {
                    for (int j = 0; j < m; j++)
                        Work[j] += Allocation[i][j];
                    Finish[i] = true;
                    found = true;
                    count++;
                }
            }
        }
        if (!found) break;
    }
    for (int i = 0; i < n; i++)
        if (!Finish[i]) return false;
    return true;
}

bool Bankers(int pid, int req[]) {
    // 1. 检查请求是否合法
    for (int j = 0; j < m; j++)
        if (req[j] > Request[pid][j] || req[j] > Available[j])
            return false;
    // 2. 试分配
    for (int j = 0; j < m; j++) {
        Available[j] -= req[j];
        Allocation[pid][j] += req[j];
        Request[pid][j] -= req[j];
    }
    // 3. 安全性检查
    bool safe = isSafe();
    // 4. 若不安全则回滚
    if (!safe) {
        for (int j = 0; j < m; j++) {
            Available[j] += req[j];
            Allocation[pid][j] -= req[j];
            Request[pid][j] += req[j];
        }
    }
    return safe;
}`} />
        <TagGrid items={['死锁预防', '死锁避免', '银行家算法', '安全序列', '安全性检查']} />
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
          <p className="text-sm mb-2">死锁发生的必要条件包括：</p>
          <BookList items={[
            'A. 互斥、占有且等待、不剥夺、循环等待',
            'B. 互斥、可剥夺、顺序等待、死锁检测',
            'C. 资源充足、进程独立、顺序执行、抢占',
            'D. 互斥、抢占、死锁检测、资源分配',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：A</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：死锁发生需同时满足互斥、占有且等待、不剥夺、循环等待四个条件。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题2（判断）：</p>
          <p className="text-sm mb-2">银行家算法能彻底消除死锁风险。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：×</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：银行家算法只能避免死锁，不能彻底消除死锁风险。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>简答与计算题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题3（简答）：</p>
          <p className="text-sm mb-2">简述死锁的检测与解除方法。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>通过资源分配图或检测算法判断死锁，检测到后可撤销进程、抢占资源等解除死锁。</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>原理解释：检测与解除是实际系统常用的死锁处理方法，需权衡系统开销和实时性。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题4（计算）：</p>
          <p className="text-sm mb-2">某系统有3类资源，进程P1请求(1,0,2)，当前可用资源为(2,1,0)，请问该请求是否安全？</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：需用银行家算法判断，若分配后系统仍有安全序列，则安全，否则不安全。</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：银行家算法通过模拟分配和安全性检查，判断系统是否进入安全状态。</p>
        </div>
        <TagGrid items={['例题', '死锁条件', '银行家算法', '安全序列', '检测解除']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          死锁是操作系统并发控制中的重要概念，需要从理论和实践两方面深入理解。
        </BookParagraph>
        <BookList items={[
          '理解死锁的定义、条件和系统模型',
          '掌握检测、预防、避免和解除死锁的方法',
          '多做例题，强化理解和应用能力',
          '动手实现银行家算法加深理解',
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
          '死锁四个必要条件：互斥、占有且等待、不剥夺、循环等待',
          '死锁预防：破坏四个条件之一',
          '死锁避免：银行家算法动态分配',
          '死锁检测：资源分配图、检测算法',
          '死锁解除：撤销进程、资源抢占、回滚',
        ]} />
        <TagGrid items={['学习建议', '死锁', '预防', '避免', '检测', '解除']} />
      </div>
    ),
  },
]

export default function OsDeadlockPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
