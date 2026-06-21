"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const allocData = [
  { key: 1, type: '连续分配', desc: '将内存划分为若干连续区域，分配给进程。', adv: '实现简单，管理方便', disadv: '易产生碎片，扩展性差' },
  { key: 2, type: '分页管理', desc: '将内存和进程空间都划分为固定大小的页和帧，按需映射。', adv: '无外部碎片，支持虚拟内存', disadv: '有页表开销，可能产生抖动' },
  { key: 3, type: '分段管理', desc: '按逻辑功能划分段，每段独立分配。', adv: '便于模块化，保护灵活', disadv: '有外部碎片，段表管理复杂' },
];

const pageAlgoData = [
  { key: 1, algo: 'FIFO', desc: '先进先出，最早进入内存的页最先被淘汰。' },
  { key: 2, algo: 'LRU', desc: '最近最少使用，最长时间未被访问的页被淘汰。' },
  { key: 3, algo: 'OPT', desc: '最佳置换，淘汰未来最长时间不会被访问的页。' },
];

export default function OSMemoryPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>内存管理</Title>
      <Tabs defaultActiveKey="alloc" type="card" size="large">
        <Tabs.TabPane tab="内存分配方式" key="alloc">
          <Paragraph>
            <b>内存分配方式主要包括：</b>连续分配、分页管理、分段管理。不同方式适用于不同场景。
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
              { key: 1, type: '连续分配', principle: '将内存划分为若干连续区域分配给进程', proscons: '实现简单，易产生内外碎片' },
              { key: 2, type: '分页管理', principle: '将内存和进程空间都划分为固定大小的页/帧', proscons: '消除外碎片，支持离散分配，需页表管理' },
              { key: 3, type: '分段管理', principle: '按逻辑模块划分段，段长可变', proscons: '便于模块化，支持共享，易产生外碎片' },
            ]}
          />
          <Paragraph style={{marginTop: 24}}>
            <b>结构示意图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 复杂SVG：分页+分段混合结构 */}
            <svg width="600" height="260" viewBox="0 0 600 260">
              {/* 分段结构 */}
              <rect x="30" y="30" width="120" height="200" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="10" />
              <text x="90" y="25" textAnchor="middle" fontSize="15">逻辑地址空间</text>
              {/* 段1 */}
              <rect x="40" y="50" width="100" height="40" fill="#bbdefb" stroke="#1976d2" />
              <text x="90" y="75" textAnchor="middle" fontSize="13">代码段</text>
              {/* 段2 */}
              <rect x="40" y="100" width="100" height="60" fill="#90caf9" stroke="#1976d2" />
              <text x="90" y="130" textAnchor="middle" fontSize="13">数据段</text>
              {/* 段3 */}
              <rect x="40" y="170" width="100" height="40" fill="#64b5f6" stroke="#1976d2" />
              <text x="90" y="195" textAnchor="middle" fontSize="13">堆栈段</text>
              {/* 分页结构 */}
              <rect x="200" y="30" width="120" height="200" fill="#fffde7" stroke="#fbc02d" strokeWidth="2" rx="10" />
              <text x="260" y="25" textAnchor="middle" fontSize="15">页表</text>
              {/* 页表条目 */}
              <rect x="210" y="50" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
              <text x="260" y="70" textAnchor="middle" fontSize="13">页表项1</text>
              <rect x="210" y="90" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
              <text x="260" y="110" textAnchor="middle" fontSize="13">页表项2</text>
              <rect x="210" y="130" width="100" height="30" fill="#fff9c4" stroke="#fbc02d" />
              <text x="260" y="150" textAnchor="middle" fontSize="13">页表项3</text>
              {/* 物理内存帧 */}
              <rect x="400" y="30" width="150" height="200" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2" rx="10" />
              <text x="475" y="25" textAnchor="middle" fontSize="15">物理内存</text>
              {/* 帧1-3 */}
              <rect x="410" y="50" width="130" height="40" fill="#c8e6c9" stroke="#388e3c" />
              <text x="475" y="75" textAnchor="middle" fontSize="13">帧1</text>
              <rect x="410" y="100" width="130" height="60" fill="#a5d6a7" stroke="#388e3c" />
              <text x="475" y="130" textAnchor="middle" fontSize="13">帧2</text>
              <rect x="410" y="170" width="130" height="40" fill="#81c784" stroke="#388e3c" />
              <text x="475" y="195" textAnchor="middle" fontSize="13">帧3</text>
              {/* 映射箭头 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="140" y1="70" x2="210" y2="65" />
                <line x1="140" y1="130" x2="210" y2="105" />
                <line x1="140" y1="195" x2="210" y2="145" />
                <line x1="310" y1="65" x2="410" y2="70" />
                <line x1="310" y1="105" x2="410" y2="130" />
                <line x1="310" y1="145" x2="410" y2="195" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="页面置换算法" key="replace">
          <Paragraph>
            <b>常见页面置换算法：</b>FIFO、LRU、OPT等。下方以LRU为例，展示详细流程图与C++实现。
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 复杂SVG：LRU流程图 */}
            <svg width="700" height="260" viewBox="0 0 700 260">
              {/* 算法流程节点 */}
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
              {/* 箭头 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
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
              {/* 判定条件 */}
              <text x="610" y="90" fontSize="12" fill="#1976d2">否</text>
              <text x="400" y="90" fontSize="12" fill="#1976d2">是</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          <Paragraph>
            <b>LRU算法C++实现：</b>
          </Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
#include <iostream>
#include <list>
#include <unordered_map>
using namespace std;

// LRU页面置换算法实现
class LRUCache {
    int capacity; // 内存页框数
    list<int> pages; // 存储页面号，最近使用的在前
    unordered_map<int, list<int>::iterator> pageMap; // 页面号到链表迭代器的映射
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
                // 淘汰最久未用页面
                int old = pages.back();
                pages.pop_back();
                pageMap.erase(old);
            }
            pages.push_front(page);
            pageMap[page] = pages.begin();
            return false;
        }
    }
    void print() {
        for (int p : pages) cout << p << " ";
        cout << endl;
    }
};

int main() {
    LRUCache cache(3);
    int ref[] = {7, 0, 1, 2, 0, 3, 0, 4};
    int n = sizeof(ref)/sizeof(ref[0]);
    int miss = 0;
    for (int i = 0; i < n; ++i) {
        cout << "访问页面:" << ref[i] << "\t";
        if (!cache.access(ref[i])) {
            cout << "缺页";
            ++miss;
        } else {
            cout << "命中";
        }
        cout << "\t当前内存:";
        cache.print();
    }
    cout << "总缺页次数:" << miss << endl;
    return 0;
}
`}</pre>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="常见问题" key="problems">
          <Paragraph>
            <b>常见问题：</b>内外碎片、抖动、分配策略等。
          </Paragraph>
          <ul>
            <li><b>内碎片：</b>分配单元大于实际需求，导致空间浪费。</li>
            <li><b>外碎片：</b>内存空间虽足够但不连续，无法满足大块分配。</li>
            <li><b>抖动：</b>频繁换入换出页面，系统效率极低。</li>
            <li><b>分配策略：</b>首次适应、最佳适应、最坏适应等。</li>
          </ul>
          <Paragraph style={{marginTop: 24}}>
            <b>碎片与抖动示意图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 复杂SVG：碎片与抖动 */}
            <svg width="600" height="160" viewBox="0 0 600 160">
              {/* 内存条 */}
              <rect x="40" y="40" width="500" height="30" fill="#e3f2fd" stroke="#1976d2" />
              {/* 已分配块 */}
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
              <g stroke="#d32f2f" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="100" y1="90" x2="100" y2="120" />
                <line x1="200" y1="90" x2="200" y2="120" />
                <line x1="300" y1="90" x2="300" y2="120" />
                <line x1="400" y1="90" x2="400" y2="120" />
              </g>
              <text x="100" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
              <text x="200" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
              <text x="300" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
              <text x="400" y="135" textAnchor="middle" fontSize="12" fill="#d32f2f">频繁换入换出</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#d32f2f" />
                </marker>
              </defs>
            </svg>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="例题与解析" key="examples">
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题1（单选）：</b> 关于分页式存储管理，下列说法正确的是：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. 分页会产生外碎片</li>
            <li>B. 分页的页大小可以不等</li>
            <li>C. 分页消除了外碎片但可能有内碎片</li>
            <li>D. 分页不支持离散分配</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>C</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>分页管理将内存和进程空间划分为等大小的页和帧，消除了外碎片，但最后一页可能有内碎片。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题2（判断）：</b> 分段管理方式中，段长可以不等。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>√</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>分段管理按逻辑模块划分，段长可变，便于模块化和共享。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题3（简答）：</b> 简述LRU页面置换算法的基本思想及实现方法。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案要点：</b><br />
            LRU（最近最久未用）算法每次淘汰最久未被访问的页面。实现方法可用链表、栈或时间戳等。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题4（计算）：</b> 给定页面访问序列7,0,1,2,0,3,0,4，内存块数为3，采用FIFO算法，计算缺页次数。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b>6
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>依次模拟FIFO过程，缺页发生在7,0,1,2,3,4，共6次。
          </Paragraph>
        </Tabs.TabPane>
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解不同内存分配方式的原理与适用场景</li>
            <li>掌握常见页面置换算法及其实现</li>
            <li>关注碎片、抖动等实际问题及优化方法</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/process">
          上一章：进程与线程管理
        </Button>
        <Button type="primary" size="large" href="/study/os/file">
          下一章：文件系统
        </Button>
      </div>
    </div>
  );
} 