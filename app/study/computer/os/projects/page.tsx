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
  chapterTitle: '实战与面试',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '操作系统安全', href: '/study/computer/os/security' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '高频面试真题',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试真题</PageTitle>
        <SectionTitle>选择题</SectionTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">1. 下列关于进程和线程的说法正确的是：</p>
          <BookList items={[
            'A. 线程是资源分配的基本单位',
            'B. 进程间可直接共享全部内存空间',
            'C. 线程间切换比进程间切换开销小',
            'D. 进程不能包含多个线程',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：C</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：线程是CPU调度的基本单位，进程是资源分配单位，线程间切换开销小，进程可包含多个线程。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">2. 关于虚拟内存，下列说法错误的是：</p>
          <BookList items={[
            'A. 虚拟内存可让程序使用比物理内存更大的空间',
            'B. 虚拟内存实现依赖于地址映射和页面置换',
            'C. 所有虚拟地址都必须常驻内存',
            'D. 虚拟内存有助于多进程隔离',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：C</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：虚拟地址可不常驻内存，只有被访问时才调入。</p>
        </div>
        <SectionTitle>判断题</SectionTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">3. 死锁发生时，所有进程都必须被终止才能解除死锁。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：×</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：可通过撤销部分进程或资源抢占等方式解除死锁，无需全部终止。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>简答与计算题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">4.（简答）简述操作系统中页面置换算法的常见类型及优缺点。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>常见有FIFO、LRU、OPT等。FIFO实现简单但易抖动，LRU较优但需记录历史，OPT最优但不可实现。</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>解析：页面置换算法影响缺页率和系统性能，实际多用LRU近似算法。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">5.（计算）RR调度，时间片2ms：</p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                  <th className="text-left p-1 font-semibold">进程</th>
                  <th className="text-left p-1 font-semibold">到达时间</th>
                  <th className="text-left p-1 font-semibold">服务时间</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-1">P1</td><td className="p-1">0</td><td className="p-1">4</td></tr>
                <tr><td className="p-1">P2</td><td className="p-1">1</td><td className="p-1">5</td></tr>
                <tr><td className="p-1">P3</td><td className="p-1">2</td><td className="p-1">2</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>Gantt图：P1(0-2)→P2(2-4)→P3(4-6)→P1(6-8)→P2(8-10)→P2(10-12)。平均周转时间=（8+11+4）/3=7.67ms。</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：按时间片轮转，依次调度，计算每个进程完成时间与到达时间之差。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">6.（案例）服务器频繁高CPU占用和大量I/O等待，分析原因及排查思路。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>可能有死锁、进程饥饿、I/O瓶颈、内存泄漏等。应检查进程状态、资源分配、磁盘/内存使用、系统日志等。</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：结合系统监控和日志，定位瓶颈和异常进程，逐步排查。</p>
        </div>
        <TagGrid items={['面试题', '进程线程', '虚拟内存', '死锁', '页面置换', 'RR调度']} />
      </div>
    ),
  },
  {
    label: '易错点与答题技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>各知识点常见易错点</PageTitle>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">知识点</th>
                <th className="text-left p-2 font-semibold">易错点</th>
                <th className="text-left p-2 font-semibold">答题技巧</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">进程与线程</td>
                <td className="p-2">混淆调度与分配单位</td>
                <td className="p-2">记住：进程分配资源，线程调度</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">虚拟内存</td>
                <td className="p-2">以为所有虚拟地址都常驻内存</td>
                <td className="p-2">强调按需调入</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">死锁</td>
                <td className="p-2">认为死锁只能全部终止</td>
                <td className="p-2">可部分撤销或抢占</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">文件分配</td>
                <td className="p-2">混淆三种分配方式</td>
                <td className="p-2">画图记忆结构</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">调度算法</td>
                <td className="p-2">不会画Gantt图</td>
                <td className="p-2">按时间片/优先级分步画</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">同步互斥</td>
                <td className="p-2">PV操作与信号量混用</td>
                <td className="p-2">区分P/V与信号量本质</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">安全</td>
                <td className="p-2">RBAC和DAC/MAC混淆</td>
                <td className="p-2">RBAC基于角色，DAC自主，MAC强制</td>
              </tr>
            </tbody>
          </table>
        </div>
        <SectionTitle>面试官追问与答题模板</SectionTitle>
        <BookCode language="cpp" code={`// 追问示例
面试官：你说LRU算法好，实际系统怎么实现？
答：可用链表、栈、时钟等近似实现，实际多用改进型LRU。

面试官：死锁检测和避免的区别？
答：检测是事后发现，避免是事前预防，检测需定期运行算法。`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>答题注意事项</PageTitle>
        <BookList items={[
          '答题先写结论，再写理由，条理清晰',
          '遇到不会的题，先写相关知识点',
          '画图能加分，流程图/结构图辅助说明',
          '计算题步骤要写全，公式、过程、结论分开',
        ]} />
        <SectionTitle>复习路线与重点清单</SectionTitle>
        <BookList items={[
          '先掌握基本概念，再攻克难点与算法',
          '每章整理思维导图，梳理知识体系',
          '多做真题，查漏补缺',
          '重视实验与实战案例，提升应用能力',
        ]} />
        <SectionTitle>自测题（做完再看解析）</SectionTitle>
        <BookList items={[
          '1. 简述操作系统中进程与线程的区别',
          '2. 画出典型的页面置换流程图，并说明各步骤作用',
          '3. 给出一个死锁发生的实际场景，并分析其四个必要条件',
          '4. 解释RBAC与DAC、MAC的区别，并举例说明',
        ]} />
        <TagGrid items={['易错点', '答题技巧', '自测题', 'Gantt图', '面试追问']} />
      </div>
    ),
  },
  {
    label: '自测答案',
    left: (
      <div className="space-y-4">
        <PageTitle>自测题答案要点</PageTitle>
        <BookCode language="cpp" code={`1. 进程是资源分配单位，线程是调度单位，
   进程间隔离，线程共享内存。
2. 页面置换流程：缺页→查表→换出→换入→更新表。
3. 死锁场景如两个进程互相等待对方释放资源，
   四条件：互斥、占有且等待、不剥夺、循环等待。
4. RBAC基于角色，DAC自主分配，MAC强制策略。
   例：RBAC如企业权限，DAC如文件属主，MAC如军事分级。`} />
        <BookAlert type="info" message="多做真题，查漏补缺，强化应用。整理错题本，关注易错点和面试官追问。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>操作系统实战案例</PageTitle>
        <SectionTitle>1. 死锁定位与分析</SectionTitle>
        <BookCode language="cpp" code={`// 死锁定位流程
1. 监控进程状态，发现长时间等待
2. 检查资源分配表/等待图，找出循环等待
3. 用kill命令或系统API终止部分进程
4. 日志分析，定位死锁原因`} />
        <SectionTitle>2. 文件系统损坏修复</SectionTitle>
        <BookCode language="cpp" code={`// 文件系统修复流程
1. 检查磁盘错误（如fsck）
2. 修复损坏的inode/目录项
3. 恢复丢失的数据块
4. 日志回滚或备份恢复`} />
        <TagGrid items={['实战案例', '死锁定位', '文件系统修复', '内存泄漏', '安全加固']} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>更多实战案例</PageTitle>
        <SectionTitle>3. 内存泄漏排查</SectionTitle>
        <BookCode language="cpp" code={`// 内存泄漏排查流程
1. 使用工具（如valgrind）检测内存分配
2. 检查未释放的指针/对象
3. 代码审查，查找循环引用
4. 修复并回归测试`} />
        <SectionTitle>4. 系统安全加固</SectionTitle>
        <BookCode language="cpp" code={`// 安全加固流程
1. 关闭不必要的服务和端口
2. 配置最小权限和访问控制
3. 定期更新补丁和病毒库
4. 启用审计和入侵检测`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>复习建议</PageTitle>
        <BookParagraph>
          结合实战案例，提升系统分析能力。操作系统知识覆盖面广，建议从以下方面系统复习：
        </BookParagraph>
        <BookList items={[
          '进程管理：进程线程、调度算法、同步互斥、死锁',
          '内存管理：分配方式、页面置换、虚拟内存',
          '文件系统：结构、分配方式、inode',
          'I/O管理：I/O方式、DMA、磁盘调度',
          '安全：CIA目标、访问控制模型、安全机制',
        ]} />
        <BookAlert type="success" message="操作系统是计算机科学的基石，深入理解其原理对系统开发、性能优化和面试都至关重要。祝你学习顺利！" />
        <TagGrid items={['复习建议', '实战', '面试', '系统分析', '查漏补缺']} />
      </div>
    ),
  },
]

export default function OsProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
