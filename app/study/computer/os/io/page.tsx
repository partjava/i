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
  chapterTitle: '输入输出与设备管理',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '文件系统', href: '/study/computer/os/file' },
  nextChapter: { label: '调度算法', href: '/study/computer/os/schedule' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'I/O系统结构',
    left: (
      <div className="space-y-4">
        <PageTitle>I/O系统结构</PageTitle>
        <BookParagraph>
          I/O系统结构主要包括 <strong>CPU</strong>、<strong>主存</strong>、<strong>I/O控制器</strong>、<strong>I/O设备</strong> 和 <strong>缓冲区</strong> 等组件。
        </BookParagraph>
        <BookParagraph>
          I/O系统的核心职责是管理 CPU 与外部设备之间的数据交换，确保数据高效、可靠地传输。
        </BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="800" height="260" viewBox="0 0 800 260">
            <rect x="60" y="100" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="110" y="130" textAnchor="middle" fontSize="15">CPU</text>
            <rect x="200" y="100" width="120" height="50" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="260" y="130" textAnchor="middle" fontSize="15">主存</text>
            <rect x="370" y="80" width="120" height="50" fill="#fffde7" stroke="#fbc02d" rx="10" />
            <text x="430" y="110" textAnchor="middle" fontSize="15">I/O控制器</text>
            <rect x="370" y="160" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="10" />
            <text x="430" y="185" textAnchor="middle" fontSize="13">缓冲区</text>
            <rect x="540" y="100" width="120" height="50" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="600" y="130" textAnchor="middle" fontSize="15">I/O设备</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="160" y1="125" x2="200" y2="125" />
              <line x1="320" y1="125" x2="370" y2="105" />
              <line x1="490" y1="105" x2="540" y2="125" />
              <line x1="430" y1="130" x2="430" y2="160" />
            </g>
            <g stroke="#388e3c" strokeWidth="2">
              <line x1="430" y1="200" x2="600" y2="150" />
            </g>
          </svg>
        </div>
        <BookAlert type="info" message="I/O系统采用分层设计：I/O设备→设备驱动程序→I/O控制器→操作系统内核→用户程序，每层抽象屏蔽了下层的硬件差异。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>设备分类</PageTitle>
        <BookParagraph>
          计算机外部设备按工作方式和数据传输特点可分为三类：
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">设备类型</th>
                <th className="text-left p-2 font-semibold">特点</th>
                <th className="text-left p-2 font-semibold">举例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">块设备</td>
                <td className="p-2">以块为单位读写，可随机访问</td>
                <td className="p-2">磁盘、U盘</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">字符设备</td>
                <td className="p-2">以字符流方式读写</td>
                <td className="p-2">键盘、串口</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">网络设备</td>
                <td className="p-2">用于网络通信</td>
                <td className="p-2">网卡</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookParagraph>
          不同类型的设备采用不同的管理策略：块设备注重缓冲和调度，字符设备侧重中断和流控。
        </BookParagraph>
        <TagGrid items={['I/O系统', '块设备', '字符设备', '网络设备', '缓冲区']} />
      </div>
    ),
  },
  {
    label: '典型I/O方式',
    left: (
      <div className="space-y-4">
        <PageTitle>三种典型I/O方式</PageTitle>
        <BookParagraph>
          操作系统的I/O方式经历了从程序直接I/O到中断驱动I/O再到DMA的演进。
        </BookParagraph>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">程序直接I/O</p>
          <p className="text-sm">CPU主动控制I/O操作，需等待I/O完成，期间不能做其他任务。实现简单但CPU利用率低，适合低速简单设备。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">中断驱动I/O</p>
          <p className="text-sm">设备准备好后通过中断通知CPU，CPU只在I/O完成时被打断，平时可处理其他任务。响应快，适合大多数通用设备。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">DMA（直接内存访问）</p>
          <p className="text-sm">DMA控制器直接在主存和I/O设备间搬运数据，CPU只需发起和收尾。适合大数据量高速设备，效率高但硬件复杂。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>DMA流程图与伪代码</PageTitle>
        <BookParagraph>DMA方式下，数据传输由专门的DMA控制器完成，CPU可并行处理其他任务。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="800" height="180" viewBox="0 0 800 180">
            <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
            <text x="120" y="65" textAnchor="middle" fontSize="13">CPU发起I/O</text>
            <rect x="220" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
            <text x="280" y="65" textAnchor="middle" fontSize="13">DMA控制器</text>
            <rect x="380" y="40" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
            <text x="440" y="65" textAnchor="middle" fontSize="13">主存</text>
            <rect x="540" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
            <text x="600" y="65" textAnchor="middle" fontSize="13">I/O设备</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="60" x2="220" y2="60" />
              <line x1="340" y1="60" x2="380" y2="60" />
              <line x1="500" y1="60" x2="540" y2="60" />
            </g>
          </svg>
        </div>
        <BookCode language="cpp" code={`// DMA方式伪代码
// 1. CPU设置DMA控制器，指定源/目的地址和长度
DMA_Controller.setup(src_addr, dst_addr, length);
// 2. CPU发起DMA传输请求
DMA_Controller.start();
// 3. DMA自动完成数据搬运，CPU可做其它任务
while (!DMA_Controller.done()) {
    CPU.do_other_work();
}
// 4. 传输完成后，DMA发中断通知CPU
on_DMA_interrupt() {
    CPU.handle_DMA_complete();
}`} />
        <TagGrid items={['程序直接I/O', '中断驱动', 'DMA', 'CPU', 'I/O控制器']} />
      </div>
    ),
  },
  {
    label: '设备管理与磁盘调度',
    left: (
      <div className="space-y-4">
        <PageTitle>设备管理策略</PageTitle>
        <BookParagraph>
          操作系统对不同类型设备采用差异化的管理策略，以保证I/O性能。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">设备类型</th>
                <th className="text-left p-2 font-semibold">管理策略</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">块设备</td>
                <td className="p-2">缓冲、调度、分区</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">字符设备</td>
                <td className="p-2">中断、流控</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">虚拟设备</td>
                <td className="p-2">虚拟化、映射</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SectionTitle>磁盘调度算法</SectionTitle>
        <BookParagraph>
          磁盘调度的目标是减少磁头移动距离，提高磁盘I/O吞吐量。
        </BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="160" viewBox="0 0 700 160">
            <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
            <text x="120" y="65" textAnchor="middle" fontSize="13">请求队列</text>
            <rect x="220" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
            <text x="280" y="65" textAnchor="middle" fontSize="13">排序</text>
            <rect x="380" y="40" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
            <text x="440" y="65" textAnchor="middle" fontSize="13">磁头移动</text>
            <rect x="540" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
            <text x="600" y="65" textAnchor="middle" fontSize="13">完成服务</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="60" x2="220" y2="60" />
              <line x1="340" y1="60" x2="380" y2="60" />
              <line x1="500" y1="60" x2="540" y2="60" />
            </g>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>SCAN（电梯）算法</PageTitle>
        <BookParagraph>
          SCAN算法也称为电梯算法，磁头沿一个方向移动服务请求，到达末端后反向。兼顾效率和公平。
        </BookParagraph>
        <BookCode language="cpp" code={`// SCAN（电梯）算法伪代码
// 输入：请求队列reqs，当前磁头位置head，方向dir
function SCAN(reqs, head, dir):
    sort reqs by cylinder number
    while reqs not empty:
        if exists req in dir:
            service nearest req in dir
            move head to req
            remove req from reqs
        else:
            reverse dir`} />
        <BookParagraph>
          常用磁盘调度算法比较：
        </BookParagraph>
        <BookList items={[
          'FCFS：实现简单，公平但效率低',
          'SSTF：平均寻道时间短，但可能产生饥饿',
          'SCAN：兼顾效率和公平，适合负载较高场景',
          'C-SCAN：单向服务，减少长等待时间概率',
        ]} />
        <BookAlert type="info" message="现代磁盘调度常使用C-SCAN（循环扫描）算法，在一个方向上服务完所有请求后直接返回起点，减少长等待时间。" />
        <TagGrid items={['SCAN', 'FCFS', 'SSTF', '磁盘调度', '电梯算法']} />
      </div>
    ),
  },
  {
    label: '例题与解析',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与解析</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题1（单选）：</p>
          <p className="text-sm mb-2">关于DMA方式，下列说法正确的是：</p>
          <BookList items={[
            'A. DMA方式下CPU需参与每个字节的传输',
            'B. DMA方式可大幅减少CPU干预',
            'C. DMA方式不需要I/O控制器',
            'D. DMA方式只适用于字符设备',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：B</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：DMA方式由DMA控制器直接完成数据搬运，CPU只需发起和收尾。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题2（判断）：</p>
          <p className="text-sm mb-2">程序直接I/O方式下，CPU可在I/O期间做其他任务。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：×</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：程序直接I/O方式下CPU需等待I/O完成，不能并行处理其他任务。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题3（简答）：</p>
          <p className="text-sm mb-2">简述中断驱动I/O与DMA方式的主要区别。</p>
          <BookAlert type="success" message="答案要点：中断驱动I/O每次I/O操作都需CPU参与，中断频繁；DMA方式数据搬运由DMA控制器完成，CPU只需发起和收尾，效率更高。" />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>计算与面试题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题4（计算）：</p>
          <p className="text-sm mb-2">磁盘I/O请求序列为 [40, 10, 22, 7, 90]，初始磁头在20，采用SCAN算法（向上），请给出服务顺序及总移动距离。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：20→22→40→90→10→7，总距离 = 2+18+50+80+3 = 153</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：先服务大于20的请求（22,40,90），再反向服务小于20的（10,7）。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">面试题：</p>
          <p className="text-sm mb-2">比较FCFS、SSTF、SCAN三种磁盘调度算法的优缺点。</p>
          <BookList items={[
            'FCFS：实现简单，公平但效率低',
            'SSTF：平均寻道时间短，但可能导致饥饿',
            'SCAN：兼顾效率和公平，适合高负载场景',
          ]} />
        </div>
        <TagGrid items={['例题', 'DMA', 'SCAN', '磁盘调度', '面试题']} />
      </div>
    ),
  },
  {
    label: '面试高频题',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">面试题1：</p>
          <p className="text-sm mb-2">简述中断驱动I/O、DMA和程序直接I/O三种方式的优缺点及适用场景。</p>
          <BookList items={[
            '程序直接I/O：实现简单，CPU利用率低，适合简单低速设备',
            '中断驱动I/O：CPU响应快，适合大多数通用设备，但中断频繁有开销',
            'DMA：效率高，CPU开销低，适合大数据量高速设备，但硬件复杂',
          ]} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">面试题2：</p>
          <p className="text-sm mb-2">设备无关性是如何实现的？</p>
          <BookAlert type="success" message="答案：通过设备驱动程序和统一的I/O接口，操作系统屏蔽了硬件差异，实现了对不同设备的统一管理和访问。" />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多面试题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">面试题3：</p>
          <p className="text-sm mb-2">多缓冲区I/O的优缺点是什么？适用于哪些场景？</p>
          <p className="text-sm">多缓冲区I/O可减少CPU等待，提高I/O吞吐量，适合数据流量大、I/O与CPU可并行的场景。缺点是实现复杂、内存占用增加。</p>
        </div>
        <BookParagraph>
          面试常考I/O优化技术，深入理解三种I/O方式和工作原理是面试高频考点。
        </BookParagraph>
        <BookList items={[
          '掌握程序直接I/O、中断驱动、DMA三种方式对比',
          '理解磁盘调度算法（FCFS/SSTF/SCAN/C-SCAN）',
          '了解缓冲、SPOOLing等I/O优化技术',
          '熟悉设备驱动程序的结构和工作原理',
        ]} />
        <TagGrid items={['面试题', 'I/O方式', '设备无关性', '磁盘调度', '缓冲技术']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          I/O管理是操作系统中与硬件交互最密切的部分，需要结合硬件原理理解。
        </BookParagraph>
        <BookList items={[
          '理解I/O系统结构和各部件作用',
          '掌握典型I/O方式和DMA流程',
          '熟悉设备分类与磁盘调度算法',
          '多做例题，强化理解和应用能力',
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
          'I/O系统结构：CPU→主存→I/O控制器→设备',
          '三种I/O方式：程序直接、中断驱动、DMA',
          '设备分类：块设备、字符设备、网络设备',
          '磁盘调度：FCFS、SSTF、SCAN、C-SCAN',
          '缓冲技术与SPOOLing系统',
        ]} />
        <TagGrid items={['学习建议', 'I/O结构', 'DMA', 'SCAN', '设备管理']} />
      </div>
    ),
  },
]

export default function OsIOPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
