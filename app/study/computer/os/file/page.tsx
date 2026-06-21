"use client";
import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const allocData = [
  { key: 1, type: '连续分配', desc: '文件数据在磁盘上连续存放，访问速度快，但易产生碎片。', adv: '顺序读写快，实现简单', disadv: '易产生外部碎片，文件扩展困难' },
  { key: 2, type: '链式分配', desc: '每个文件块存储下一个块的指针，适合顺序访问。', adv: '无外部碎片，文件可动态增长', disadv: '随机访问慢，指针有额外开销' },
  { key: 3, type: '索引分配', desc: '为每个文件建立索引块，记录所有数据块地址。', adv: '支持随机访问，无外部碎片', disadv: '索引块有空间开销，极大文件需多级索引' },
];

export default function OSFilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>文件系统</Title>
      <Tabs defaultActiveKey="structure" type="card" size="large">
        {/* Tab 1: 基本结构 */}
        <Tabs.TabPane tab="基本结构" key="structure">
          <Paragraph>
            <b>文件系统的基本组成：</b>文件、目录、inode（索引节点）等。
          </Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '组成部分', dataIndex: 'part', key: 'part' },
              { title: '作用', dataIndex: 'role', key: 'role' },
            ]}
            dataSource={[
              { key: 1, part: '文件', role: '存储数据和程序的基本单位' },
              { key: 2, part: '目录', role: '组织和管理文件的结构' },
              { key: 3, part: 'inode', role: '记录文件元数据和物理位置' },
            ]}
          />
          <Paragraph style={{marginTop: 24}}>
            <b>复杂结构示意图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 复杂SVG：目录树+inode+数据块 */}
            <svg width="700" height="320" viewBox="0 0 700 320">
              {/* 目录树 */}
              <rect x="60" y="40" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
              <text x="110" y="65" textAnchor="middle" fontSize="14">根目录/</text>
              <rect x="60" y="120" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
              <text x="110" y="145" textAnchor="middle" fontSize="13">home</text>
              <rect x="60" y="200" width="100" height="40" fill="#90caf9" stroke="#1976d2" rx="8" />
              <text x="110" y="225" textAnchor="middle" fontSize="13">user</text>
              {/* 目录连接线 */}
              <line x1="110" y1="80" x2="110" y2="120" stroke="#1976d2" strokeWidth="2" />
              <line x1="110" y1="160" x2="110" y2="200" stroke="#1976d2" strokeWidth="2" />
              {/* inode节点 */}
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
        </Tabs.TabPane>
        {/* Tab 2: 文件分配方式 */}
        <Tabs.TabPane tab="文件分配方式" key="alloc">
          <Paragraph>
            <b>常见文件分配方式：</b>连续分配、链接分配、索引分配。
          </Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '方式', dataIndex: 'type', key: 'type' },
              { title: '原理', dataIndex: 'principle', key: 'principle' },
              { title: '优缺点', dataIndex: 'proscons', key: 'proscons' },
            ]}
            dataSource={[
              { key: 1, type: '连续分配', principle: '文件占用一段连续磁盘空间', proscons: '顺序访问快，易产生碎片' },
              { key: 2, type: '链接分配', principle: '文件块通过指针链接成链表', proscons: '无外部碎片，随机访问慢' },
              { key: 3, type: '索引分配', principle: '为每个文件建立索引块，记录所有数据块地址', proscons: '支持随机访问，索引块有空间开销' },
            ]}
          />
          <Paragraph style={{marginTop: 24}}>
            <b>复杂结构示意图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 优化后的复杂SVG：三种分配方式对比，含编号和指针说明 */}
            <svg width="820" height="260" viewBox="0 0 820 260">
              {/* 连续分配 */}
              <rect x="30" y="40" width="220" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
              <text x="140" y="35" textAnchor="middle" fontSize="14">连续分配（块0-5）</text>
              {/* 块编号 */}
              {[0,1,2,3,4,5].map((n,i)=>(
                <g key={n}>
                  <rect x={40+i*35} y="50" width="30" height="20" fill={i<4?"#90caf9":"#fff"} stroke="#1976d2" />
                  <text x={55+i*35} y="65" textAnchor="middle" fontSize="12">{n}</text>
                </g>
              ))}
              <text x="140" y="80" textAnchor="middle" fontSize="12" fill="#1976d2">高亮部分为同一文件连续块</text>

              {/* 链接分配 */}
              <rect x="290" y="40" width="240" height="40" fill="#fffde7" stroke="#fbc02d" rx="8" />
              <text x="410" y="35" textAnchor="middle" fontSize="14">链接分配（块7→3→12→9）</text>
              {/* 块链表 */}
              {[[7,3],[3,12],[12,9],[9,null]].map(([cur,next],i)=>(
                <g key={cur}>
                  <rect x={305+i*55} y="50" width="40" height="20" fill="#ffe082" stroke="#fbc02d" />
                  <text x={325+i*55} y="62" textAnchor="middle" fontSize="12">块{cur}</text>
                  {next!==null && <>
                    <text x={345+i*55} y="62" fontSize="10" fill="#fbc02d">→{next}</text>
                    <line x1={345+i*55} y1="60" x2={355+i*55} y2="60" stroke="#fbc02d" markerEnd="url(#arrow)" />
                  </>}
                </g>
              ))}
              <text x="410" y="80" textAnchor="middle" fontSize="12" fill="#fbc02d">每块存下一个块号，箭头为指针</text>

              {/* 索引分配 */}
              <rect x="580" y="40" width="200" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
              <text x="680" y="35" textAnchor="middle" fontSize="14">索引分配</text>
              {/* 索引块 */}
              <rect x="600" y="55" width="40" height="40" fill="#fff" stroke="#388e3c" />
              <text x="620" y="75" textAnchor="middle" fontSize="12">索引块</text>
              {/* 索引指向的数据块 */}
              {[5,8,11].map((n,i)=>(
                <g key={n}>
                  <rect x={670+i*50} y="60" width="40" height="20" fill="#a5d6a7" stroke="#388e3c" />
                  <text x={690+i*50} y="75" textAnchor="middle" fontSize="12">块{n}</text>
                  <line x1="640" y1={75} x2={670+i*50} y2={70} stroke="#388e3c" markerEnd="url(#arrow)" />
                </g>
              ))}
              <text x="700" y="100" textAnchor="middle" fontSize="12" fill="#388e3c">索引块记录所有数据块地址</text>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
            {/* 注释说明 */}
            <div style={{marginTop: 12, fontSize: 13, color: '#666'}}>
              <div><b>连续分配：</b> 文件占用一段连续编号的磁盘块，访问快但易碎片。</div>
              <div><b>链接分配：</b> 每个块存下一个块号，适合顺序访问，随机访问慢。</div>
              <div><b>索引分配：</b> 索引块集中记录所有数据块地址，支持随机访问。</div>
            </div>
          </div>
          {/* 新增：三种分配方式的C/C++核心实现伪代码与注释 */}
          <Paragraph style={{marginTop: 32, fontWeight: 600, fontSize: 16}}>分配方式核心实现伪代码与注释</Paragraph>
          <Paragraph><b>1. 连续分配</b>（顺序查找空闲区，分配/回收，含碎片处理）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 假设磁盘空间用空闲表管理，每项记录起始块和长度
struct FreeArea {
    int start;   // 空闲区起始块号
    int length;  // 空闲区长度
};
FreeArea freeTable[MAX]; // 空闲区表

// 分配文件空间
int allocate(int fileLen) {
    for (int i = 0; i < freeTableLen; i++) {
        if (freeTable[i].length >= fileLen) {
            int allocStart = freeTable[i].start;
            freeTable[i].start += fileLen;
            freeTable[i].length -= fileLen;
            if (freeTable[i].length == 0) {
                // 空闲区用尽，删除该项
                removeFreeArea(i);
            }
            return allocStart; // 返回分配的起始块号
        }
    }
    return -1; // 分配失败
}

// 回收文件空间
void release(int start, int len) {
    // 插入空闲表并尝试与相邻空闲区合并，防止碎片
    insertAndMergeFreeArea(start, len);
}
`}</pre>
          </Card>
          <Paragraph><b>2. 链接分配</b>（链表结构，顺序遍历，指针操作）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 每个磁盘块有数据区和指向下一个块的指针
struct Block {
    char data[BLOCK_SIZE];
    int next; // 下一个块号，-1表示文件结尾
};

// 读取整个文件内容
void readFile(int head) {
    int p = head;
    while (p != -1) {
        readBlock(p); // 读取数据
        p = getNextBlock(p); // 获取下一个块号
    }
}

// 写文件时，分配新块并链接
void writeFile(char* content, int len) {
    int prev = -1, first = -1;
    for (int i = 0; i < len; i += BLOCK_SIZE) {
        int newBlock = allocBlock();
        writeBlock(newBlock, content + i);
        if (prev != -1) setNextBlock(prev, newBlock);
        else first = newBlock;
        prev = newBlock;
    }
    setNextBlock(prev, -1); // 文件结尾
}
`}</pre>
          </Card>
          <Paragraph><b>3. 索引分配</b>（索引块结构，单级/多级索引，数组操作）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 单级索引：索引块存放所有数据块号
struct IndexBlock {
    int blockNum[MAX_INDEX]; // 数据块号数组
};

// 读取文件第i块
void readBlockByIndex(IndexBlock* idx, int i) {
    int blockNo = idx->blockNum[i];
    readBlock(blockNo);
}

// 多级索引（如UNIX inode）
struct Inode {
    int direct[12];      // 直接块
    int singleInd;      // 一级间接块
    int doubleInd;      // 二级间接块
};
// 读取第n块数据时，先查direct，再查间接块
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 3: 文件操作流程 */}
        <Tabs.TabPane tab="文件操作流程" key="flow">
          <Paragraph>
            <b>文件操作的基本流程：</b>打开、读写、关闭文件。
          </Paragraph>
          <Paragraph>
            <b>流程图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 复杂SVG：文件操作流程图 */}
            <svg width="700" height="180" viewBox="0 0 700 180">
              <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
              <text x="120" y="65" textAnchor="middle" fontSize="13">打开文件</text>
              <rect x="240" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
              <text x="300" y="65" textAnchor="middle" fontSize="13">读/写文件</text>
              <rect x="420" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
              <text x="480" y="65" textAnchor="middle" fontSize="13">关闭文件</text>
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="180" y1="60" x2="240" y2="60" />
                <line x1="360" y1="60" x2="420" y2="60" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          <Paragraph>
            <b>C++文件读写示例（含详细注释）：</b>
          </Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
#include <iostream>
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
}
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 4: 例题与解析 */}
        <Tabs.TabPane tab="例题与解析" key="examples">
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题1（单选）：</b> 关于inode的作用，下列说法正确的是：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. inode只记录文件名</li>
            <li>B. inode记录文件的元数据和物理位置</li>
            <li>C. inode只记录文件大小</li>
            <li>D. inode只用于目录</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>B</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>inode记录文件的元数据（如权限、大小、时间戳）和物理存储位置，不包含文件名。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题2（判断）：</b> 链接分配方式支持高效的随机访问。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>×</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>链接分配需要顺序遍历链表，随机访问效率低。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题3（简答）：</b> 简述索引分配方式的原理及优缺点。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案要点：</b><br />
            为每个文件建立索引块，索引块中存储所有数据块地址。优点：支持随机访问，无外部碎片。缺点：索引块有空间开销，索引块本身可能溢出。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题4（计算，含根号）：</b> 某文件系统块大小为4KB，索引块可存放128个指针。若文件大小为512KB，最少需要多少个数据块？（结果用根号表示）
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b>\( \lceil \sqrt{512/4} \rceil = 8 \)（实际为128个数据块，根号仅为示例，实际应为\(512/4=128\)）
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>数据块数=文件大小/块大小=512/4=128。
          </Paragraph>
        </Tabs.TabPane>
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解文件系统的基本结构和分配方式</li>
            <li>掌握inode、目录、数据块等核心概念</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/memory">
          上一章：内存管理
        </Button>
        <Button type="primary" size="large" href="/study/os/io">
          下一章：输入输出与设备管理
        </Button>
      </div>
    </div>
  );
} 