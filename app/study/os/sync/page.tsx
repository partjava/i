"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function OSSyncPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>进程同步与互斥</Title>
      <Tabs
        defaultActiveKey="concept"
        type="card"
        size="large"
        items={[
          {
            key: 'concept',
            label: '基本概念与原理',
            children: (
              <>
                <Paragraph>
                  <b>进程同步与互斥的基本原理：</b><br />
                  同步是指多个进程在执行过程中因共享资源或协作关系而需要协调执行顺序。互斥是指同一时刻只允许一个进程进入临界区访问共享资源。常见同步与互斥机制包括临界区、信号量、管程等。合理的同步与互斥机制能防止竞态条件、保证数据一致性，是并发程序设计的核心。
                </Paragraph>
                <Paragraph style={{marginTop: 16}}>
                  <b>原理结构图：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 优化后的SVG：同步与互斥原理结构图 */}
                  <svg width="600" height="220" viewBox="0 0 600 220">
                    {/* 进程1/2/3 */}
                    <rect x="60" y="30" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
                    <text x="110" y="55" textAnchor="middle" fontSize="14">进程1</text>
                    <rect x="60" y="90" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
                    <text x="110" y="115" textAnchor="middle" fontSize="14">进程2</text>
                    <rect x="60" y="150" width="100" height="40" fill="#90caf9" stroke="#1976d2" rx="10" />
                    <text x="110" y="175" textAnchor="middle" fontSize="14">进程3</text>
                    {/* 临界区 */}
                    <rect x="380" y="80" width="120" height="60" fill="#ffe082" stroke="#fbc02d" rx="12" />
                    <text x="440" y="115" textAnchor="middle" fontSize="15">临界区</text>
                    {/* 箭头 */}
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow0)">
                      <line x1="160" y1="50" x2="380" y2="110" />
                      <line x1="160" y1="110" x2="380" y2="110" />
                      <line x1="160" y1="170" x2="380" y2="110" />
                    </g>
                    <defs>
                      <marker id="arrow0" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </>
            ),
          },
          {
            key: 'mechanism',
            label: '经典同步机制',
            children: (
              <>
                <Paragraph>
                  <b>常见同步与互斥机制：</b>信号量（Semaphore）、管程（Monitor）、PV操作等。
                </Paragraph>
                <Paragraph style={{marginTop: 16}}>
                  <b>信号量机制流程图：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 复杂SVG：信号量PV操作流程图 */}
                  <svg width="700" height="160" viewBox="0 0 700 160">
                    <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
                    <text x="120" y="85" textAnchor="middle" fontSize="14">进程</text>
                    <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
                    <text x="280" y="85" textAnchor="middle" fontSize="14">P操作</text>
                    <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
                    <text x="440" y="85" textAnchor="middle" fontSize="14">信号量S--</text>
                    <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
                    <text x="600" y="85" textAnchor="middle" fontSize="14">进入临界区</text>
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow1)">
                      <line x1="180" y1="80" x2="220" y2="80" />
                      <line x1="340" y1="80" x2="380" y2="80" />
                      <line x1="500" y1="80" x2="540" y2="80" />
                    </g>
                    <defs>
                      <marker id="arrow1" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                <Paragraph>
                  <b>信号量C语言伪代码（含详细注释）：</b>
                </Paragraph>
                <Card style={{marginBottom: 16}}>
                  <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 信号量结构体
struct Semaphore {
    int value; // 信号量计数
    queue waitQ; // 等待队列
};

// P操作
void P(Semaphore *S) {
    S->value--;
    if (S->value < 0) {
        // 阻塞进程，加入等待队列
        block(S->waitQ);
    }
}

// V操作
void V(Semaphore *S) {
    S->value++;
    if (S->value <= 0) {
        // 唤醒等待队列中的进程
        wakeup(S->waitQ);
    }
}
`}</pre>
                </Card>
              </>
            ),
          },
          {
            key: 'problem',
            label: '典型同步问题',
            children: (
              <>
                <Paragraph>
                  <b>典型同步问题：</b>生产者-消费者、读者写者、哲学家就餐等。
                </Paragraph>
                <Paragraph style={{marginTop: 16}}>
                  <b>生产者-消费者问题流程图：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 复杂SVG：生产者-消费者同步流程图 */}
                  <svg width="700" height="180" viewBox="0 0 700 180">
                    <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
                    <text x="120" y="85" textAnchor="middle" fontSize="14">生产者</text>
                    <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
                    <text x="280" y="85" textAnchor="middle" fontSize="14">缓冲区</text>
                    <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
                    <text x="440" y="85" textAnchor="middle" fontSize="14">消费者</text>
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow2)">
                      <line x1="180" y1="80" x2="220" y2="80" />
                      <line x1="340" y1="80" x2="380" y2="80" />
                    </g>
                    <defs>
                      <marker id="arrow2" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                <Paragraph>
                  <b>生产者-消费者C语言伪代码（含详细注释）：</b>
                </Paragraph>
                <Card style={{marginBottom: 16}}>
                  <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 缓冲区大小N，信号量empty=N, full=0, mutex=1
semaphore empty = N, full = 0, mutex = 1;

// 生产者进程
void producer() {
    while (1) {
        P(&empty); // 等待空位
        P(&mutex); // 进入临界区
        // 放入产品
        V(&mutex); // 离开临界区
        V(&full);  // 增加产品数
    }
}

// 消费者进程
void consumer() {
    while (1) {
        P(&full);  // 等待产品
        P(&mutex); // 进入临界区
        // 取出产品
        V(&mutex); // 离开临界区
        V(&empty); // 增加空位
    }
}
`}</pre>
                </Card>
              </>
            ),
          },
          {
            key: 'examples',
            label: '例题与解析',
            children: (
              <>
                <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
                <Paragraph style={{fontSize: 16, marginBottom: 10}}>
                  <b>选择题：</b>
                </Paragraph>
                <Paragraph style={{fontSize: 15, marginBottom: 8}}>
                  <b>例题1：</b> 关于信号量机制，下列说法正确的是：
                </Paragraph>
                <ul style={{fontSize: 15, marginBottom: 8}}>
                  <li>A. 信号量只能用于互斥</li>
                  <li>B. P操作会增加信号量值</li>
                  <li>C. 信号量可用于同步和互斥</li>
                  <li>D. V操作会阻塞进程</li>
                </ul>
                <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>C</Paragraph>
                <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>信号量既可用于互斥（如二进制信号量），也可用于同步（如计数信号量），P操作减少信号量值，V操作增加。
                </Paragraph>

                <Paragraph style={{fontSize: 16, marginBottom: 10}}>
                  <b>判断题：</b>
                </Paragraph>
                <Paragraph style={{fontSize: 15, marginBottom: 8}}>
                  <b>例题2：</b> 管程机制只能用于单处理器系统。（  ）
                </Paragraph>
                <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>×</Paragraph>
                <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>管程是一种高级同步机制，适用于多处理器和多线程环境。
                </Paragraph>

                <Paragraph style={{fontSize: 16, marginBottom: 10}}>
                 <b>简答题：</b>
                </Paragraph>
                <Paragraph style={{fontSize: 15, marginBottom: 8}}>
                  <b>例题3：</b> 简述生产者-消费者问题的同步实现思路。
                </Paragraph>
                <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案要点：</b>用信号量empty、full、mutex分别控制空位、产品数和互斥，生产者和消费者通过P/V操作实现同步与互斥。
                </Paragraph>
                <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>信号量机制能有效防止竞态条件，保证缓冲区数据一致性，是并发程序设计的经典范例。
                </Paragraph>

                <Paragraph style={{fontSize: 16, marginBottom: 10}}>
                 <b>计算题：</b>
                </Paragraph>
                <Paragraph style={{fontSize: 15, marginBottom: 8}}>
                 <b>例题4：</b> 某缓冲区大小为5，初始empty=5, full=0, mutex=1，若连续3个生产者和2个消费者操作后，empty和full的值分别是多少？
                </Paragraph>
                <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>empty=4, full=1
                </Paragraph>
                <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>每生产一次empty-1, full+1，每消费一次empty+1, full-1，3次生产2次消费后empty=5-3+2=4, full=0+3-2=1。
                </Paragraph>
              </>
            ),
          },
        ]}
      >
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解同步与互斥的基本原理和常见机制</li>
            <li>掌握信号量、管程、PV操作等实现</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/schedule">
          上一章：调度算法
        </Button>
        <Button type="primary" size="large" href="/study/os/deadlock">
          下一章：死锁与避免
        </Button>
      </div>
    </div>
  );
}