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
  chapterTitle: '文件系统',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '内存管理', href: '/study/computer/os/memory' },
  nextChapter: { label: '输入输出与设备管理', href: '/study/computer/os/io' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本结构',
    left: (
      <div className="space-y-4">
        <PageTitle>文件系统的基本组成</PageTitle>
        <BookParagraph>
          文件系统是操作系统中负责管理和存储文件信息的部件，由文件、目录和索引节点等组成。
        </BookParagraph>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">组成部分</th>
                <th className="text-left p-2 font-semibold">作用</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">文件</td>
                <td className="p-2">存储数据和程序的基本单位</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">目录</td>
                <td className="p-2">组织和管理文件的结构</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">inode</td>
                <td className="p-2">记录文件元数据和物理位置</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="inode（索引节点）是文件系统的核心数据结构，存储文件的元信息（权限、大小、时间戳等）和数据块指针，但不包含文件名。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>目录树与inode映射</PageTitle>
        <BookParagraph>文件系统通过目录树组织文件，每个文件通过inode映射到数据块。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="320" viewBox="0 0 700 320">
            {/* 目录树 */}
            <rect x="60" y="40" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
            <text x="110" y="65" textAnchor="middle" fontSize="14">根目录/</text>
            <rect x="60" y="120" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
            <text x="110" y="145" textAnchor="middle" fontSize="13">home</text>
            <rect x="60" y="200" width="100" height="40" fill="#90caf9" stroke="#1976d2" rx="8" />
            <text x="110" y="225" textAnchor="middle" fontSize="13">user</text>
            <line x1="110" y1="80" x2="110" y2="120" stroke="#1976d2" strokeWidth="2" />
            <line x1="110" y1="160" x2="110" y2="200" stroke="#1976d2" strokeWidth="2" />
            {/* inode */}
            <rect x="250" y="200" width="100" height="40" fill="#fffde7" stroke="#fbc02d" rx="8" />
            <text x="300" y="225" textAnchor="middle" fontSize="13">inode</text>
            <line x1="160" y1="220" x2="250" y2="220" stroke="#fbc02d" strokeWidth="2" />
            {/* 数据块 */}
            <rect x="420" y="180" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
            <text x="480" y="205" textAnchor="middle" fontSize="13">数据块1</text>
            <rect x="420" y="240" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
            <text x="480" y="265" textAnchor="middle" fontSize="13">数据块2</text>
            <line x1="350" y1="220" x2="420" y2="200" stroke="#388e3c" strokeWidth="2" />
            <line x1="350" y1="220" x2="420" y2="260" stroke="#388e3c" strokeWidth="2" />
          </svg>
        </div>
        <TagGrid items={['文件', '目录', 'inode', '数据块', '目录树']} />
      </div>
    ),
  },
  {
    label: '分配方式',
    left: (
      <div className="space-y-4">
        <PageTitle>文件分配方式</PageTitle>
        <BookParagraph>
          常见文件分配方式包括 <strong>连续分配</strong>、<strong>链接分配</strong> 和 <strong>索引分配</strong>。
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
                <td className="p-2">文件占用一段连续磁盘空间</td>
                <td className="p-2">顺序访问快，易产生碎片</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">链接分配</td>
                <td className="p-2">文件块通过指针链接成链表</td>
                <td className="p-2">无外部碎片，随机访问慢</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">索引分配</td>
                <td className="p-2">为每个文件建立索引块记录所有数据块地址</td>
                <td className="p-2">支持随机访问，索引块有空间开销</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="现代文件系统（如ext4、NTFS）通常采用混合模式，结合多种分配方式的优点。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>三种分配方式示意图</PageTitle>
        <BookParagraph>三种分配方式在磁盘上的组织形态对比：</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="820" height="260" viewBox="0 0 820 260">
            {/* 连续分配 */}
            <rect x="30" y="40" width="220" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
            <text x="140" y="35" textAnchor="middle" fontSize="14">连续分配（块0-5）</text>
            {[0,1,2,3,4,5].map((n,i)=>(
              <g key={n}>
                <rect x={40+i*35} y="50" width="30" height="20" fill={i<4?"#90caf9":"#fff"} stroke="#1976d2" />
                <text x={55+i*35} y="65" textAnchor="middle" fontSize="12">{n}</text>
              </g>
            ))}
            <text x="140" y="90" textAnchor="middle" fontSize="12" fill="#1976d2">高亮部分为同一文件连续块</text>
            {/* 链接分配 */}
            <rect x="290" y="40" width="240" height="40" fill="#fffde7" stroke="#fbc02d" rx="8" />
            <text x="410" y="35" textAnchor="middle" fontSize="14">链接分配（块7→3→12→9）</text>
            {[[7,3],[3,12],[12,9],[9,null]].map(([cur,next],i)=>(
              <g key={cur}>
                <rect x={305+i*55} y="50" width="40" height="20" fill="#ffe082" stroke="#fbc02d" />
                <text x={325+i*55} y="62" textAnchor="middle" fontSize="12">块{cur}</text>
                {next!==null && <text x={345+i*55} y="62" fontSize="10" fill="#fbc02d">→{next}</text>}
              </g>
            ))}
            <text x="410" y="90" textAnchor="middle" fontSize="12" fill="#fbc02d">每块存下一个块号</text>
            {/* 索引分配 */}
            <rect x="580" y="40" width="200" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
            <text x="680" y="35" textAnchor="middle" fontSize="14">索引分配</text>
            <rect x="600" y="55" width="40" height="40" fill="#fff" stroke="#388e3c" />
            <text x="620" y="75" textAnchor="middle" fontSize="12">索引块</text>
            {[5,8,11].map((n,i)=>(
              <g key={n}>
                <rect x={670+i*50} y="60" width="40" height="20" fill="#a5d6a7" stroke="#388e3c" />
                <text x={690+i*50} y="75" textAnchor="middle" fontSize="12">块{n}</text>
                <line x1="640" y1={75} x2={670+i*50} y2={70} stroke="#388e3c" />
              </g>
            ))}
            <text x="700" y="100" textAnchor="middle" fontSize="12" fill="#388e3c">索引块记录所有数据块地址</text>
          </svg>
        </div>
        <TagGrid items={['连续分配', '链接分配', '索引分配', '磁盘块', '文件']} />
      </div>
    ),
  },
  {
    label: '分配实现',
    left: (
      <div className="space-y-4">
        <PageTitle>连续分配实现</PageTitle>
        <BookParagraph>
          连续分配通过空闲表管理磁盘空间，分配和回收时需处理碎片。
        </BookParagraph>
        <BookCode language="cpp" code={`// 空闲区管理结构
struct FreeArea {
    int start;   // 空闲区起始块号
    int length;  // 空闲区长度
};
FreeArea freeTable[MAX];

// 分配文件空间
int allocate(int fileLen) {
    for (int i = 0; i < freeTableLen; i++) {
        if (freeTable[i].length >= fileLen) {
            int allocStart = freeTable[i].start;
            freeTable[i].start += fileLen;
            freeTable[i].length -= fileLen;
            if (freeTable[i].length == 0)
                removeFreeArea(i);
            return allocStart;
        }
    }
    return -1; // 分配失败
}

// 回收文件空间
void release(int start, int len) {
    insertAndMergeFreeArea(start, len);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>链接分配与索引分配实现</PageTitle>
        <BookParagraph>
          链接分配使用链表结构顺序存储，索引分配通过索引块集中管理数据块地址。
        </BookParagraph>
        <BookCode language="cpp" code={`// 链接分配：每个块存下一个块指针
struct Block {
    char data[BLOCK_SIZE];
    int next; // 下一个块号，-1表示结尾
};

void readFile(int head) {
    int p = head;
    while (p != -1) { readBlock(p); p = getNextBlock(p); }
}

// 索引分配：索引块记录所有数据块号
struct IndexBlock {
    int blockNum[MAX_INDEX];
};

void readBlockByIndex(IndexBlock* idx, int i) {
    readBlock(idx->blockNum[i]);
}

// UNIX inode混合结构
struct Inode {
    int direct[12];   // 直接块
    int singleInd;    // 一级间接块
    int doubleInd;    // 二级间接块
};`} />
        <BookAlert type="warning" message="UNIX inode采用混合索引结构：12个直接块 + 一级间接 + 二级间接，兼顾小文件（直接访问）和大文件（多级索引）的需求。" />
        <TagGrid items={['空闲表', '链表', '索引块', 'inode', '混合索引']} />
      </div>
    ),
  },
  {
    label: '操作流程',
    left: (
      <div className="space-y-4">
        <PageTitle>文件操作基本流程</PageTitle>
        <BookParagraph>
          文件的基本操作包括打开、读写和关闭，操作系统通过系统调用提供这些功能。
        </BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="180" viewBox="0 0 700 180">
            <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
            <text x="120" y="65" textAnchor="middle" fontSize="13">打开文件</text>
            <rect x="240" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
            <text x="300" y="65" textAnchor="middle" fontSize="13">读/写文件</text>
            <rect x="420" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
            <text x="480" y="65" textAnchor="middle" fontSize="13">关闭文件</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="60" x2="240" y2="60" />
              <line x1="360" y1="60" x2="420" y2="60" />
            </g>
          </svg>
        </div>
        <BookParagraph>
          文件操作流程：打开文件（获取文件句柄）→ 读/写文件（数据传输）→ 关闭文件（释放资源）。
        </BookParagraph>
        <BookAlert type="info" message="文件描述符是操作系统分配给每个打开文件的整数标识符，用户程序通过它来操作文件。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>C++文件读写示例</PageTitle>
        <BookParagraph>
          下面演示C++中文件的读写操作：
        </BookParagraph>
        <BookCode language="cpp" code={`#include <iostream>
#include <fstream>
using namespace std;

int main() {
    // 创建输出文件流，写入文件
    ofstream fout("test.txt");
    if (!fout) {
        cout << "无法打开文件写入！" << endl;
        return 1;
    }
    fout << "Hello, 文件系统!" << endl;
    fout.close(); // 关闭文件

    // 创建输入文件流，读取文件
    ifstream fin("test.txt");
    if (!fin) {
        cout << "无法打开文件读取！" << endl;
        return 1;
    }
    string line;
    while (getline(fin, line)) {
        cout << "读取内容: " << line << endl;
    }
    fin.close(); // 关闭文件
    return 0;
}`} />
        <TagGrid items={['打开文件', '读文件', '写文件', '关闭文件', 'fstream']} />
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
          <p className="text-sm mb-2">关于inode的作用，下列说法正确的是：</p>
          <BookList items={[
            'A. inode只记录文件名',
            'B. inode记录文件的元数据和物理位置',
            'C. inode只记录文件大小',
            'D. inode只用于目录',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：B</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：inode记录文件元数据（权限、大小、时间戳）和物理位置，不包含文件名。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题2（判断）：</p>
          <p className="text-sm mb-2">链接分配方式支持高效的随机访问。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：×</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：链接分配需要顺序遍历链表，随机访问效率低。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多例题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题3（简答）：</p>
          <p className="text-sm mb-2">简述索引分配方式的原理及优缺点。</p>
          <BookAlert type="success" message="答案要点：为每个文件建立索引块，存储所有数据块地址。优点：支持随机访问，无外部碎片。缺点：索引块有空间开销，大文件需多级索引。" />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">例题4（计算）：</p>
          <p className="text-sm mb-2">某文件系统块大小为4KB，文件大小为512KB，需要多少个数据块？</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：128</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：数据块数 = 文件大小 / 块大小 = 512KB / 4KB = 128。</p>
        </div>
        <TagGrid items={['例题', 'inode', '分配方式', '文件系统', '计算']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          文件系统是操作系统中与用户交互最频繁的部分，理解其工作原理对日常开发很有帮助。
        </BookParagraph>
        <BookList items={[
          '理解文件系统的基本结构和分配方式',
          '掌握inode、目录、数据块等核心概念',
          '多做例题，强化理解和应用能力',
          '了解不同文件系统（ext4、NTFS、FAT）的差异',
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
          '文件系统的组成：文件、目录、inode',
          '三种文件分配方式：连续、链接、索引',
          '混合索引结构（UNIX inode）',
          '文件操作流程：打开→读写→关闭',
          '目录树的组织结构',
        ]} />
        <TagGrid items={['学习建议', '文件系统', '分配方式', 'inode', '目录树']} />
      </div>
    ),
  },
]

export default function OsFilePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
