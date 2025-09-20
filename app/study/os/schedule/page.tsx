"use client";
import React from 'react';
import { Typography, Tabs, Table, Alert, Button } from 'antd';

const { Title, Paragraph } = Typography;

const algoData = [
  { key: 1, name: 'FCFS', desc: '先来先服务，按到达顺序调度。', adv: '实现简单，公平', disadv: '平均等待时间长，易饥饿' },
  { key: 2, name: 'SJF', desc: '短作业优先，优先调度运行时间短的作业。', adv: '平均等待时间短', disadv: '长作业易饥饿，需预知运行时间' },
  { key: 3, name: '优先级', desc: '按优先级高低调度。', adv: '紧急任务优先', disadv: '低优先级易饿死' },
  { key: 4, name: 'RR', desc: '时间片轮转，按固定时间片轮流调度。', adv: '响应快，公平', disadv: '上下文切换多，时间片难选' },
  { key: 5, name: 'HRRN', desc: '高响应比优先，响应比=（等待+服务）/服务。', adv: '兼顾长短作业', disadv: '实现复杂' },
];

export default function OSSchedulePage() {
  const tabItems = [
    {
      key: 'overview',
      label: '调度概述与分类',
      children: (
        <>
          <Paragraph>
            <b>调度的基本原理与意义：</b><br />
            操作系统的调度是指对系统中各种资源（如CPU、内存、I/O等）分配和管理的过程。调度分为作业调度、进程调度和线程调度三个层次。作业调度负责决定哪些作业进入内存，影响系统的吞吐量和响应时间；进程调度决定哪个进程获得CPU，直接影响系统的响应速度和公平性；线程调度则在同一进程内分配CPU，适用于多线程程序。三者层次分明、各有侧重，共同保证系统资源的高效利用和用户体验的提升。调度策略的选择直接关系到系统的性能、效率和公平性，是操作系统设计的核心内容之一。
          </Paragraph>
          <Paragraph>
            <b>调度层次结构图：</b>
            <div style={{display: 'flex', justifyContent: 'center', margin: '24px 0'}}>
              <svg width="600" height="160" viewBox="0 0 600 160" style={{maxWidth: '100%'}}>
                <rect x="60" y="40" width="140" height="40" rx="10" fill="#e3f2fd" />
                <text x="130" y="65" textAnchor="middle" fontSize="15">作业调度</text>
                <rect x="240" y="40" width="140" height="40" rx="10" fill="#ffe082" />
                <text x="310" y="65" textAnchor="middle" fontSize="15">进程调度</text>
                <rect x="420" y="40" width="140" height="40" rx="10" fill="#c8e6c9" />
                <text x="490" y="65" textAnchor="middle" fontSize="15">线程调度</text>
                <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                  <line x1="200" y1="60" x2="240" y2="60" />
                  <line x1="380" y1="60" x2="420" y2="60" />
                </g>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                  </marker>
                </defs>
              </svg>
            </div>
          </Paragraph>
        </>
      )
    },
    {
      key: 'algos',
      label: '经典调度算法',
      children: (
        <>
          <Paragraph>
            <b>经典调度算法原理与对比：</b><br />
            <b>FCFS（先来先服务）：</b> 按进程到达顺序调度，简单公平但平均等待时间长，适合批处理系统。
            <br />
            <b>SJF（短作业优先）：</b> 优先调度运行时间短的进程，平均等待时间最短，但需预知作业长度，可能导致长作业饥饿。
            <br />
            <b>优先级调度：</b> 按进程优先级分配CPU，高优先级进程先执行，适合实时系统，但低优先级进程可能长期得不到服务。
            <br />
            <b>RR（时间片轮转）：</b> 每个进程分配固定时间片，轮流调度，响应快，适合分时系统，但时间片设置需权衡。
            <br />
            <b>HRRN（高响应比优先）：</b> 综合考虑等待时间和服务时间，响应比高者优先，兼顾效率和公平，适合交互式系统。
            <br />
            这五种算法各有优缺点，实际应用中常结合使用以满足不同场景需求。
          </Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '算法', dataIndex: 'name', key: 'name' },
              { title: '原理', dataIndex: 'desc', key: 'desc' },
              { title: '优点', dataIndex: 'adv', key: 'adv' },
              { title: '缺点', dataIndex: 'disadv', key: 'disadv' },
            ]}
            dataSource={algoData}
          />
          <Paragraph>
            <b>FCFS（先来先服务）时序图：</b>
            <div style={{display: 'flex', justifyContent: 'center', margin: '24px 0'}}>
              <svg width="500" height="80" viewBox="0 0 500 80" style={{maxWidth: '100%'}}>
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
          </Paragraph>
          <Paragraph>
            <b>RR（时间片轮转）C++实现（详细注释）：</b>
            <pre style={{background: '#f6f8fa', borderRadius: 8, padding: 16, fontSize: 14, marginBottom: 18, overflowX: 'auto', fontFamily: 'JetBrains Mono,Consolas,monospace'}}>{`
#include <iostream>
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
        cout << "时间" << time << ": 运行P" << p.pid << "(" << run << ")\n";
        time += run;
        p.burst -= run;
        // 新到进程入队
        while (idx < n && plist[idx].arrive <= time) q.push(plist[idx++]);
        if (p.burst > 0) q.push(p); // 未完成重新入队
        else finish[p.pid] = time;
    }
    for (int i = 1; i <= n; ++i) cout << "P" << i << "完成时间:" << finish[i] << endl;
    return 0;
}
`}</pre>
          </Paragraph>
          <Paragraph>
            <b>SJF（短作业优先）流程图：</b>
            <div style={{display: 'flex', justifyContent: 'center', margin: '24px 0'}}>
              <svg width="500" height="100" viewBox="0 0 500 100" style={{maxWidth: '100%'}}>
                <rect x="40" y="30" width="80" height="30" rx="6" fill="#ffe082" />
                <text x="80" y="50" textAnchor="middle">作业队列</text>
                <rect x="160" y="30" width="80" height="30" rx="6" fill="#e3f2fd" />
                <text x="200" y="50" textAnchor="middle">选择最短</text>
                <rect x="300" y="30" width="80" height="30" rx="6" fill="#c8e6c9" />
                <text x="340" y="50" textAnchor="middle">运行</text>
                <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                  <line x1="120" y1="45" x2="160" y2="45" />
                  <line x1="240" y1="45" x2="300" y2="45" />
                </g>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                  </marker>
                </defs>
              </svg>
            </div>
          </Paragraph>
        </>
      )
    },
    {
      key: 'compare',
      label: '算法对比与实验',
      children: (
        <>
          <Paragraph>
            <b>算法对比表：</b>
          </Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '算法', dataIndex: 'name', key: 'name' },
              { title: '优点', dataIndex: 'adv', key: 'adv' },
              { title: '缺点', dataIndex: 'disadv', key: 'disadv' },
            ]}
            dataSource={algoData}
          />
          <Paragraph>
            <b>Gantt图（调度实验时序示意）：</b>
            <div style={{display: 'flex', justifyContent: 'center', margin: '24px 0'}}>
              <svg width="500" height="80" viewBox="0 0 500 80" style={{maxWidth: '100%'}}>
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
          </Paragraph>
        </>
      )
    },
    {
      key: 'qa',
      label: '高频面试题与总结',
      children: (
        <>
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>选择题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题1：</b> 关于FCFS和SJF调度算法，下列说法正确的是：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. FCFS平均等待时间一定比SJF短</li>
            <li>B. SJF可能导致长作业饥饿</li>
            <li>C. FCFS适合实时系统</li>
            <li>D. SJF无需预知作业长度</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>B</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>SJF优先调度短作业，平均等待时间最短，但长作业可能长期得不到服务，出现饥饿现象。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>判断题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题2：</b> 时间片轮转调度算法适合分时系统。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>√</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>时间片轮转算法能保证每个进程公平获得CPU，响应快，特别适合分时系统。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>简答题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题3：</b> 简述HRRN算法的调度思想及其优缺点。
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案要点：</b>HRRN算法根据响应比=（等待时间+服务时间）/服务时间，响应比高者优先调度。优点是兼顾效率和公平，缺点是实现较复杂。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>HRRN算法通过提高等待时间较长进程的优先级，避免了长作业饥饿，适合交互式和批处理混合系统。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>计算题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题4：</b> 有3个作业A、B、C，到达时间均为0，服务时间分别为3、5、2，采用SJF算法，计算平均等待时间。
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>（0+2+5）/3=2.33
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>先执行C（2），A（3），B（5），等待时间分别为0、2、5，平均等待时间为2.33。
          </Paragraph>
        </>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>调度算法</Title>
      <Tabs defaultActiveKey="overview" type="card" size="large" items={tabItems} />
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>多画图理解调度流程和算法</li>
            <li>动手实现经典调度算法</li>
            <li>总结常见考点和易错点</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/io">
          上一章：输入输出与设备管理
        </Button>
        <Button type="primary" size="large" href="/study/os/sync">
          下一章：进程同步与互斥
        </Button>
      </div>
    </div>
  );
} 