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
  chapterTitle: '内存管理',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '进程与线程管理', href: '/study/computer/os/process' },
  nextChapter: { label: '文件系统', href: '/study/computer/os/file' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '内存分配方式',
    left: (
      <div className="space-y-4">
        <PageTitle>内存分配方式概述</PageTitle>
        <BookParagraph>
          内存分配方式主要包括<strong>连续分配</strong>、<strong>分页管理</strong>和<strong>分段管理</strong>。不同方式适用于不同场景。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">方式</th>
                <th className="text-left p-2 font-semibold">原理</th>
                <th className="text-left p-2 font-semibold">优缺点</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">连续分配</td>
                <td className="p-2">将内存划分为若干连续区域分配给进程</td>
                <td className="p-2">实现简单，易产生内外碎片</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">分页管理</td>
                <td className="p-2">将内存和进程空间划分为固定大小的页/帧</td>
                <td className="p-2">消除外碎片，支持离散分配，需页表管理</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">分段管理</td>
                <td className="p-2">按逻辑模块划分段，段长可变</td>
                <td className="p-2">便于模块化，支持共享，易产生外碎片</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="现代操作系统通常采用分页与分段结合的方案（段页式管理），兼具二者的优点。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分页+分段混合结构</PageTitle>
        <BookParagraph>分页管理将逻辑地址划分为等大小的页，通过页表映射到物理内存的帧。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="600" height="260" viewBox="0 0 600 260">
            {/* 分段结构 */}
            <rect x="30" y="30" width="120" height="200" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="10" />
            <text x="90" y="25" textAnchor="middle" fontSize="15">逻辑地址空间</text>
            <rect x="40" y="50" width="100" height="40" fill="#bbdefb" stroke="#1976d2" />
            <text x="90" y="75" textAnchor="middle" fontSize="13">代码段</text>
            <rect x="40" y="100" width="100" height="60" fill="#90caf9" stroke="#1976d2" />
            <text x="90" y="130" textAnchor="middle" fontSize="13">数据段</text>
            <rect x="40" y="170" width="100" height="40" fill="#64b5f6" stroke="#1976d2" />
            <text x="90" y="195" textAnchor="middle" fontSize="13">堆栈段</text>
            {/* 分页结构 */}
            <rect x="200" y="30" width="120" height="200" fill="#fffde7" stroke="#fbc02d" strokeWidth="2" rx="10" />
            <text x="260" y="25" textAnchor="middle" fontSize="15">页表</text>
            <rect x="210" y="50" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
            <text x="260" y="70" textAnchor="middle" fontSize="13">页表项1</text>
            <rect x="210" y="90" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
            <text x="260" y="110" textAnchor="middle" fontSize="13">页表项2</text>
            <rect x="210" y="130" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
            <text x="260" y="150" textAnchor="middle" fontSize="13">页表项3</text>
            {/* 物理内存帧 */}
            <rect x="400" y="30" width="150" height="200" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2" rx="10" />
            <text x="475" y="25" textAnchor="middle" fontSize="15">物理内存</text>
            <rect x="410" y="50" width="130" height="40" fill="#c8e6c9" stroke="#388e3c" />
            <text x="475" y="75" textAnchor="middle" fontSize="13">帧1</text>
            <rect x="410" y="100" width="130" height="60" fill="#a5d6a7" stroke="#388e3c" />
            <text x="475" y="130" textAnchor="middle" fontSize="13">帧2</text>
            <rect x="410" y="170" width="130" height="40" fill="#81c784" stroke="#388e3c" />
            <text x="475" y="195" textAnchor="middle" fontSize="13">帧3</text>
            {/* 映射箭头 */}
            <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow3)">
              <line x1="140" y1="70" x2="210" y2="65" />
              <line x1="140" y1="130" x2="210" y2="105" />
              <line x1="140" y1="195" x2="210" y2="145" />
              <line x1="310" y1="65" x2="410" y2="70" />
              <line x1="310" y1="105" x2="410" y2="130" />
              <line x1="310" y1="145" x2="410" y2="195" />
            </g>
            <defs>
              <marker id="arrow3" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
              </marker>
            </defs>
          </svg>
        </div>
        <TagGrid items={['连续分配', '分页管理', '分段管理', '页表', '帧']} />
      </div>
    ),
  },
  {
    label: '页面置换算法',
    left: (
      <div className="space-y-4">
        <PageTitle>页面置换算法</PageTitle>
        <BookParagraph>
          常见页面置换算法包括 <strong>FIFO</strong>、<strong>LRU</strong> 和 <strong>OPT</strong> 等。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">算法</th>
                <th className="text-left p-2 font-semibold">思想</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">FIFO</td>
                <td className="p-2">先进先出，最早进入内存的页最先被淘汰</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">LRU</td>
                <td className="p-2">最近最久未使用，淘汰最长时间未被访问的页</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">OPT</td>
                <td className="p-2">最佳置换，淘汰未来最长时间不会被访问的页</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="LRU 是实际系统中应用最广泛的置换算法，OPT 仅作为理论参考标准。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>LRU算法流程图</PageTitle>
        <BookParagraph>LRU算法的执行流程如下：</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="260" viewBox="0 0 700 260">
            <rect x="40" y="30" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" />
            <text x="100" y="55" textAnchor="middle" fontSize="13">开始</text>
            <rect x="200" y="30" width="180" height="40" fill="#bbdefb" stroke="#1976d2" />
            <text x="290" y="55" textAnchor="middle" fontSize="13">遍历页面访问序列</text>
            <rect x="420" y="30" width="180" height="40" fill="#90caf9" stroke="#1976d2" />
            <text x="510" y="55" textAnchor="middle" fontSize="13">页面是否在内存？</text>
            <rect x="420" y="110" width="180" height="40" fill="#e1bee7" stroke="#8e24aa" />
            <text x="510" y="135" textAnchor="middle" fontSize="13">淘汰最久未用页面</text>
            <rect x="200" y="190" width="180" height="40" fill="#c8e6c9" stroke="#388e3c" />
            <text x="290" y="215" textAnchor="middle" fontSize="13">将新页面调入内存</text>
            <rect x="40" y="190" width="120" height="40" fill="#fff9c4" stroke="#fbc02d" />
            <text x="100" y="215" textAnchor="middle" fontSize="13">结束</text>
            <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow3)">
              <line x1="160" y1="50" x2="200" y2="50" />
              <line x1="380" y1="50" x2="420" y2="50" />
              <line x1="600" y1="50" x2="600" y2="130" />
              <line x1="600" y1="130" x2="600" y2="210" />
              <line x1="600" y1="210" x2="380" y2="210" />
              <line x1="200" y1="210" x2="160" y2="210" />
              <line x1="420" y1="70" x2="420" y2="110" />
              <line x1="510" y1="150" x2="510" y2="190" />
              <line x1="380" y1="210" x2="380" y2="50" />
            </g>
            <text x="610" y="90" fontSize="12" fill="#1976d2">否</text>
            <text x="400" y="90" fontSize="12" fill="#1976d2">是</text>
          </svg>
        </div>
        <TagGrid items={['FIFO', 'LRU', 'OPT', '页面置换', '缺页']} />
      </div>
    ),
  },
  {
    label: 'LRU实现',
    left: (
      <div className="space-y-4">
        <PageTitle>LRU算法 C++ 实现</PageTitle>
        <BookParagraph>
          下面是LRU页面置换算法的完整C++实现，使用链表和哈希表实现 O(1) 的访问和淘汰操作。
        </BookParagraph>
        <BookCode language="cpp" code={`#include <iostream>
#include <list>
#include <unordered_map>
using namespace std;

// LRU页面置换算法实现
class LRUCache {
    int capacity;
    list<int> pages;
    unordered_map<int, list<int>::iterator> pageMap;
public:
    LRUCache(int cap) : capacity(cap) {}
    bool access(int page) {
        if (pageMap.count(page)) {
            // 命中，移动到链表头
            pages.erase(pageMap[page]);
            pages.push_front(page);
            pageMap[page] = pages.begin();
            return true;
        } else {
            // 缺页
            if (pages.size() == capacity) {
                int old = pages.back();
                pages.pop_back();
                pageMap.erase(old);
            }
            pages.push_front(page);
            pageMap[page] = pages.begin();
            return false;
        }
    }
};`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>LRU算法运行示例</PageTitle>
        <BookParagraph>
          测试LRU算法，内存块数为3，页面序列为 {`{7, 0, 1, 2, 0, 3, 0, 4}`}：
        </BookParagraph>
        <BookCode language="cpp" code={`int main() {
    LRUCache cache(3);
    int ref[] = {7, 0, 1, 2, 0, 3, 0, 4};
    int n = sizeof(ref)/sizeof(ref[0]);
    int miss = 0;
    for (int i = 0; i < n; ++i) {
        cout << "访问页面:" << ref[i] << "\\t";
        if (!cache.access(ref[i])) {
            cout << "缺页";
            ++miss;
        } else cout << "命中";
        cout << "\\t当前内存:";
        cache.print();
    }
    cout << "总缺页次数:" << miss << endl;
    return 0;
}`} />
        <BookAlert type="success" message="LRU算法通过维护访问顺序链表，每次淘汰链表尾部的页面（最久未使用），实现缺页率最小化。" />
        <TagGrid items={['LRU', 'C++实现', '链表', '哈希表', '缺页率']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>内存管理常见问题</PageTitle>
        <BookParagraph>
          内存管理中存在内外碎片、抖动等问题，需要采取相应的优化策略。
        </BookParagraph>
        <BookList items={[
          '内碎片：分配单元大于实际需求，导致空间浪费',
          '外碎片：内存空间虽足够但不连续，无法满足大块分配',
          '抖动：频繁换入换出页面，系统效率极低',
          '分配策略：首次适应、最佳适应、最坏适应等',
        ]} />
        <BookAlert type="warning" message="抖动是系统性能的大敌，工作集模型可以有效防止抖动。合理设置驻留集大小是关键。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>碎片与抖动示意图</PageTitle>
        <BookParagraph>
          外碎片和抖动的示意图：
        </BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="600" height="160" viewBox="0 0 600 160">
            <rect x="40" y="40" width="500" height="30" fill="#e3f2fd" stroke="#1976d2" />
            <rect x="50" y="45" width="80" height="20" fill="#90caf9" stroke="#1976d2" />
            <rect x="150" y="45" width="60" height="20" fill="#90caf9" stroke="#1976d2" />
            <rect x="230" y="45" width="100" height="20" fill="#90caf9" stroke="#1976d2" />
            <rect x="350" y="45" width="70" height="20" fill="#90caf9" stroke="#1976d2" />
            <rect x="440" y="45" width="50" height="20" fill="#90caf9" stroke="#1976d2" />
            {/* 外碎片 */}
            <rect x="120" y="45" width="30" height="20" fill="#fffde7" stroke="#fbc02d" strokeDasharray="4" />
            <rect x="330" y="45" width="20" height="20" fill="#fffde7" stroke="#fbc02d" strokeDasharray="4" />
            <rect x="410" y="45" width="30" height="20" fill="#fffde7" stroke="#fbc02d" strokeDasharray="4" />
            {/* 抖动箭头 */}
            <g stroke="#d32f2f" strokeWidth="2" markerEnd="url(#arrow3)">
              <line x1="100" y1="90" x2="100" y2="120" />
              <line x1="200" y1="90" x2="200" y2="120" />
              <line x1="300" y1="90" x2="300" y2="120" />
              <line x1="400" y1="90" x2="400" y2="120" />
            </g>
            <text x="100" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
            <text x="200" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
            <text x="300" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
            <text x="400" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
          </svg>
        </div>
        <TagGrid items={['内碎片', '外碎片', '抖动', '分配策略', '工作集']} />
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
          <p className="text-sm mb-2">关于分页式存储管理，下列说法正确的是：</p>
          <BookList items={[
            'A. 分页会产生外碎片',
            'B. 分页的页大小可以不等',
            'C. 分页消除了外碎片但可能有内碎片',
            'D. 分页不支持离散分配',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：C</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：分页管理将内存和进程空间划分为等大小的页和帧，消除了外碎片，但最后一页可能有内碎片。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题2（判断）：</p>
          <p className="text-sm mb-2">分段管理方式中，段长可以不等。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：√</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：分段管理按逻辑模块划分，段长可变，便于模块化和共享。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多例题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题3（简答）：</p>
          <p className="text-sm mb-2">简述LRU页面置换算法的基本思想及实现方法。</p>
          <BookAlert type="success" message="答案要点：LRU（最近最久未用）算法每次淘汰最久未被访问的页面。实现方法可用链表、栈或时间戳等。" />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题4（计算）：</p>
          <p className="text-sm mb-2">给定页面访问序列 7,0,1,2,0,3,0,4，内存块数为3，采用FIFO算法，计算缺页次数。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：6</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：依次模拟FIFO过程，缺页发生在7,0,1,2,3,4，共6次。</p>
        </div>
        <TagGrid items={['例题', '分页', '分段', 'LRU', 'FIFO', '缺页']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          内存管理是操作系统的重要部分，涉及硬件和软件的交互，需要深入理解。
        </BookParagraph>
        <BookList items={[
          '理解不同内存分配方式的原理与适用场景',
          '掌握常见页面置换算法及其实现',
          '关注碎片、抖动等实际问题及优化方法',
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
          '连续分配、分页管理、分段管理的原理与对比',
          '页表结构与地址转换过程',
          'FIFO、LRU、OPT 置换算法',
          '内碎片、外碎片与抖动的成因及解决',
          '段页式结合方案',
        ]} />
        <TagGrid items={['学习建议', '内存管理', '页面置换', '碎片', '段页式']} />
      </div>
    ),
  },
]

export default function OsMemoryPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
