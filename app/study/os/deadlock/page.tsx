"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function OSDeadlockPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>死锁与避免</Title>
      <Tabs defaultActiveKey="concept" type="card" size="large">
        {/* Tab 1: 死锁基本概念 */}
        <Tabs.TabPane tab="死锁基本概念" key="concept">
          <Paragraph>
            <b>死锁的定义与条件：</b><br />
            死锁是指两个或多个进程在执行过程中，因争夺资源而造成的一种互相等待的现象，若无外力干涉，它们都无法推进。死锁发生需同时满足互斥、占有且等待、不剥夺、循环等待四个必要条件。
          </Paragraph>
          <Paragraph>
            <b>系统模型与死锁状态图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 死锁状态图SVG */}
            <svg width="600" height="180" viewBox="0 0 600 180">
              {/* 进程与资源 */}
              <rect x="80" y="40" width="80" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
              <text x="120" y="65" textAnchor="middle" fontSize="14">进程A</text>
              <rect x="80" y="120" width="80" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
              <text x="120" y="145" textAnchor="middle" fontSize="14">进程B</text>
              <rect x="320" y="40" width="60" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
              <text x="350" y="65" textAnchor="middle" fontSize="13">资源X</text>
              <rect x="320" y="120" width="60" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
              <text x="350" y="145" textAnchor="middle" fontSize="13">资源Y</text>
              {/* 占有与请求箭头 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="160" y1="60" x2="320" y2="60" />
                <line x1="160" y1="140" x2="320" y2="140" />
                <line x1="350" y1="80" x2="350" y2="120" />
                <line x1="350" y1="120" x2="350" y2="80" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
        </Tabs.TabPane>
        {/* Tab 2: 死锁检测与解除 */}
        <Tabs.TabPane tab="死锁检测与解除" key="detect">
          <Paragraph>
            <b>死锁检测算法与解除方法：</b><br />
            死锁检测通过资源分配图或检测算法（如银行家安全性算法）判断系统是否进入死锁状态。检测到死锁后，可通过撤销进程、抢占资源等方式解除死锁。
          </Paragraph>
          <Paragraph style={{marginTop: 16}}>
            <b>检测流程图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 死锁检测流程图SVG */}
            <svg width="700" height="160" viewBox="0 0 700 160">
              <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
              <text x="120" y="85" textAnchor="middle" fontSize="14">资源分配图</text>
              <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
              <text x="280" y="85" textAnchor="middle" fontSize="14">检测算法</text>
              <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
              <text x="440" y="85" textAnchor="middle" fontSize="14">死锁判断</text>
              <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
              <text x="600" y="85" textAnchor="middle" fontSize="14">解除方法</text>
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="180" y1="80" x2="220" y2="80" />
                <line x1="340" y1="80" x2="380" y2="80" />
                <line x1="500" y1="80" x2="540" y2="80" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          <Paragraph>
            <b>死锁检测伪代码（简化版）：</b>
          </Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 死锁检测算法伪代码
for each process P {
    if (P的请求量 <= 可用资源)
        分配资源给P，P完成后释放资源
}
// 若所有进程都能顺利完成，则无死锁，否则有死锁
`}</pre>
          </Card>
          {/* 新增：完整C/C++实现与详细注释 */}
          <Paragraph style={{marginTop: 24, fontWeight: 600, fontSize: 16}}>死锁检测算法C/C++实现（资源分配表法，含详细注释）</Paragraph>
          <Paragraph>该算法通过维护资源分配矩阵、请求矩阵和可用资源向量，循环判断哪些进程可以顺利完成，最终检测系统中是否存在死锁。</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// n个进程，m类资源
int Allocation[n][m]; // 当前分配
int Request[n][m];    // 当前请求
int Available[m];     // 可用资源
bool Finish[n];       // 完成标记

void DeadlockDetection() {
    // 初始化Finish数组
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
                    for (int j = 0; j < m; j++) Work[j] += Allocation[i][j];
                    Finish[i] = true;
                    found = true;
                }
            }
        }
    } while (found);

    // 检查是否有未完成进程
    for (int i = 0; i < n; i++)
        if (!Finish[i]) printf("进程%d发生死锁\n", i);
}
`}</pre>
          </Card>
          <Paragraph style={{marginTop: 24, fontWeight: 600, fontSize: 16}}>死锁解除常用策略（伪代码）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 死锁解除常用策略
// 1. 撤销进程：选择代价最小的进程终止，释放其资源
// 2. 资源抢占：强制回收部分资源，分配给其他进程
// 3. 进程回滚：将进程回退到安全点，释放资源后重试
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 3: 死锁预防与避免 */}
        <Tabs.TabPane tab="死锁预防与避免" key="avoid">
          <Paragraph>
            <b>死锁预防与避免策略：</b><br />
            死锁预防通过破坏死锁的必要条件（如资源一次性分配、请求前预占、资源可剥夺等）来避免死锁。死锁避免则采用如银行家算法等动态检测系统状态，确保系统始终处于安全状态。
          </Paragraph>
          <Paragraph style={{marginTop: 16}}>
            <b>银行家算法流程图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 银行家算法流程图SVG */}
            <svg width="700" height="180" viewBox="0 0 700 180">
              <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
              <text x="120" y="85" textAnchor="middle" fontSize="14">进程请求</text>
              <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
              <text x="280" y="85" textAnchor="middle" fontSize="14">安全性检查</text>
              <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
              <text x="440" y="85" textAnchor="middle" fontSize="14">资源分配</text>
              <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
              <text x="600" y="85" textAnchor="middle" fontSize="14">系统安全</text>
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="180" y1="80" x2="220" y2="80" />
                <line x1="340" y1="80" x2="380" y2="80" />
                <line x1="500" y1="80" x2="540" y2="80" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          <Paragraph>
            <b>银行家算法C语言伪代码（含详细注释）：</b>
          </Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 银行家算法伪代码
for each 请求进程P {
    if (P的请求量 <= P的最大需求 && P的请求量 <= 可用资源) {
        // 试分配资源
        if (分配后系统安全)
            分配资源
        else
            拒绝请求
    } else {
        拒绝请求
    }
}
`}</pre>
          </Card>
          {/* 新增：完整C/C++实现与详细注释 */}
          <Paragraph style={{marginTop: 24, fontWeight: 600, fontSize: 16}}>银行家算法C/C++实现（含安全性检查函数与详细注释）</Paragraph>
          <Paragraph>银行家算法通过试分配和安全性检查，动态判断资源分配是否会导致系统进入不安全状态，若安全则分配，否则拒绝请求。</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 银行家算法主流程
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
                    for (int j = 0; j < m; j++) Work[j] += Allocation[i][j];
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
            return false; // 请求不合法

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
}
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 4: 例题与解析 */}
        <Tabs.TabPane tab="例题与解析" key="examples">
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>选择题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题1：</b> 死锁发生的必要条件包括：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. 互斥、占有且等待、不剥夺、循环等待</li>
            <li>B. 互斥、可剥夺、顺序等待、死锁检测</li>
            <li>C. 资源充足、进程独立、顺序执行、抢占</li>
            <li>D. 互斥、抢占、死锁检测、资源分配</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>A</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>死锁发生需同时满足互斥、占有且等待、不剥夺、循环等待四个条件。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>判断题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题2：</b> 银行家算法能彻底消除死锁风险。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>×</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>银行家算法只能避免死锁，不能彻底消除死锁风险。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>简答题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题3：</b> 简述死锁的检测与解除方法。
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案要点：</b>通过资源分配图或检测算法判断死锁，检测到后可撤销进程、抢占资源等解除死锁。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>检测与解除是实际系统常用的死锁处理方法，需权衡系统开销和实时性。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>计算题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题4：</b> 某系统有3类资源，进程P1请求(1,0,2)，当前可用资源为(2,1,0)，请问该请求是否安全？
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>需用银行家算法判断，若分配后系统仍有安全序列，则安全，否则不安全。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>银行家算法通过模拟分配和安全性检查，判断系统是否进入安全状态。
          </Paragraph>
        </Tabs.TabPane>
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解死锁的定义、条件和系统模型</li>
            <li>掌握检测、预防、避免和解除死锁的方法</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/sync">
          上一章：进程同步与互斥
        </Button>
        <Button type="primary" size="large" href="/study/os/security">
          下一章：操作系统安全
        </Button>
      </div>
    </div>
  );
} 