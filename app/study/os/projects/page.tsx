"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function OSProjectsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>操作系统实战与面试</Title>
      <Tabs
        defaultActiveKey="interview"
        type="card"
        size="large"
        items={[
          {
            key: 'interview',
            label: '高频面试真题',
            children: (
          <>
          <Paragraph style={{fontWeight: 600, fontSize: 16}}>选择题</Paragraph>
          <Paragraph><b>1.</b> 下列关于进程和线程的说法正确的是：</Paragraph>
          <ul>
            <li>A. 线程是资源分配的基本单位</li>
            <li>B. 进程间可直接共享全部内存空间</li>
            <li>C. 线程间切换比进程间切换开销小</li>
            <li>D. 进程不能包含多个线程</li>
          </ul>
          <Paragraph style={{color: '#388e3c'}}><b>答案：</b>C</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>线程是CPU调度的基本单位，进程是资源分配单位，线程间切换开销小，进程可包含多个线程。</Paragraph>
          <Paragraph><b>2.</b> 关于虚拟内存，下列说法错误的是：</Paragraph>
          <ul>
            <li>A. 虚拟内存可让程序使用比物理内存更大的空间</li>
            <li>B. 虚拟内存实现依赖于地址映射和页面置换</li>
            <li>C. 所有虚拟地址都必须常驻内存</li>
            <li>D. 虚拟内存有助于多进程隔离</li>
          </ul>
          <Paragraph style={{color: '#388e3c'}}><b>答案：</b>C</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>虚拟地址可不常驻内存，只有被访问时才调入。</Paragraph>

          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>判断题</Paragraph>
          <Paragraph><b>3.</b> 死锁发生时，所有进程都必须被终止才能解除死锁。（  ）</Paragraph>
          <Paragraph style={{color: '#388e3c'}}><b>答案：</b>×</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>可通过撤销部分进程或资源抢占等方式解除死锁，无需全部终止。</Paragraph>

          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>简答题</Paragraph>
          <Paragraph><b>4.</b> 简述操作系统中页面置换算法的常见类型及优缺点。</Paragraph>
          <Paragraph style={{color: '#388e3c'}}><b>答案要点：</b>常见有FIFO、LRU、OPT等。FIFO实现简单但易抖动，LRU较优但需记录历史，OPT最优但不可实现。</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>页面置换算法影响缺页率和系统性能，实际多用LRU近似算法。</Paragraph>

          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>计算题</Paragraph>
          <Paragraph><b>5.</b> 某系统有3个进程，采用RR调度，时间片为2ms，进程到达与服务时间如下表，画出Gantt图并计算平均周转时间。</Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '进程', dataIndex: 'p', key: 'p' },
              { title: '到达时间', dataIndex: 'arr', key: 'arr' },
              { title: '服务时间', dataIndex: 'ser', key: 'ser' },
            ]}
            dataSource={[
              { key: 1, p: 'P1', arr: 0, ser: 4 },
              { key: 2, p: 'P2', arr: 1, ser: 5 },
              { key: 3, p: 'P3', arr: 2, ser: 2 },
            ]}
          />
          <Paragraph style={{color: '#388e3c'}}><b>答案要点：</b>Gantt图：P1(0-2)→P2(2-4)→P3(4-6)→P1(6-8)→P2(8-10)→P2(10-12)。平均周转时间=（8+11+4）/3=7.67ms。</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>按时间片轮转，依次调度，计算每个进程完成时间与到达时间之差。</Paragraph>

          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>案例题</Paragraph>
          <Paragraph><b>6.</b> 某服务器频繁出现高CPU占用和大量I/O等待，分析可能原因及排查思路。</Paragraph>
          <Paragraph style={{color: '#388e3c'}}><b>答案要点：</b>可能有死锁、进程饥饿、I/O瓶颈、内存泄漏等。应检查进程状态、资源分配、磁盘/内存使用、系统日志等。</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>结合系统监控和日志，定位瓶颈和异常进程，逐步排查。</Paragraph>
        </>
        ),
      },
      {
        key: 'tips',
        label: '易错点与答题技巧',
        children: (
          <>
          <Paragraph style={{fontWeight: 600, fontSize: 16}}>各知识点常见易错点</Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '知识点', dataIndex: 'point', key: 'point' },
              { title: '易错点', dataIndex: 'mistake', key: 'mistake' },
              { title: '答题技巧', dataIndex: 'tip', key: 'tip' },
            ]}
            dataSource={[
              { key: 1, point: '进程与线程', mistake: '混淆调度与分配单位', tip: '记住：进程分配资源，线程调度' },
              { key: 2, point: '虚拟内存', mistake: '以为所有虚拟地址都常驻内存', tip: '强调按需调入' },
              { key: 3, point: '死锁', mistake: '认为死锁只能全部终止', tip: '可部分撤销或抢占' },
              { key: 4, point: '文件分配', mistake: '混淆三种分配方式', tip: '画图记忆结构' },
              { key: 5, point: '调度算法', mistake: '不会画Gantt图', tip: '按时间片/优先级分步画' },
              { key: 6, point: '同步互斥', mistake: 'PV操作与信号量混用', tip: '区分P/V与信号量本质' },
              { key: 7, point: '安全', mistake: 'RBAC和DAC/MAC混淆', tip: 'RBAC基于角色，DAC自主，MAC强制' },
            ]}
          />
          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>面试官追问与答题模板</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 追问示例
面试官：你说LRU算法好，实际系统怎么实现？
答：可用链表、栈、时钟等近似实现，实际多用改进型LRU。

面试官：死锁检测和避免的区别？
答：检测是事后发现，避免是事前预防，检测需定期运行算法。
`}</pre>
          </Card>
          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>答题注意事项</Paragraph>
          <ul style={{fontSize: 15}}>
            <li>答题先写结论，再写理由，条理清晰</li>
            <li>遇到不会的题，先写相关知识点</li>
            <li>画图能加分，流程图/结构图辅助说明</li>
            <li>计算题步骤要写全，公式、过程、结论分开</li>
          </ul>
          </>
        ),
      },
      {
        key: 'cases',
        label: '操作系统实战案例',
        children: (
          <>
          <Paragraph style={{fontWeight: 600, fontSize: 16}}>典型实战案例</Paragraph>
          <Paragraph><b>1. 死锁定位与分析</b></Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 死锁定位流程
1. 监控进程状态，发现长时间等待
2. 检查资源分配表/等待图，找出循环等待
3. 用kill命令或系统API终止部分进程
4. 日志分析，定位死锁原因
`}</pre>
          </Card>
          <Paragraph><b>2. 文件系统损坏修复</b></Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 文件系统修复流程
1. 检查磁盘错误（如fsck）
2. 修复损坏的inode/目录项
3. 恢复丢失的数据块
4. 日志回滚或备份恢复
`}</pre>
          </Card>
          <Paragraph><b>3. 内存泄漏排查</b></Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 内存泄漏排查流程
1. 使用工具（如valgrind）检测内存分配
2. 检查未释放的指针/对象
3. 代码审查，查找循环引用
4. 修复并回归测试
`}</pre>
          </Card>
          <Paragraph><b>4. 系统安全加固</b></Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 安全加固流程
1. 关闭不必要的服务和端口
2. 配置最小权限和访问控制
3. 定期更新补丁和病毒库
4. 启用审计和入侵检测
`}</pre>
          </Card>
          </>
        ),
      },
      {
        key: 'review',
        label: '复习建议与自测',
        children: (
          <>
          <Paragraph style={{fontWeight: 600, fontSize: 16}}>复习路线与重点清单</Paragraph>
          <ul style={{fontSize: 15}}>
            <li>先掌握基本概念，再攻克难点与算法</li>
            <li>每章整理思维导图，梳理知识体系</li>
            <li>多做真题，查漏补缺</li>
            <li>重视实验与实战案例，提升应用能力</li>
          </ul>
          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>自测题区（做完再看解析）</Paragraph>
          <Paragraph><b>1. 简述操作系统中进程与线程的区别。</b></Paragraph>
          <Paragraph><b>2. 画出典型的页面置换流程图，并说明各步骤作用。</b></Paragraph>
          <Paragraph><b>3. 给出一个死锁发生的实际场景，并分析其四个必要条件。</b></Paragraph>
          <Paragraph><b>4. 解释RBAC与DAC、MAC的区别，并举例说明。</b></Paragraph>
          <Paragraph style={{fontWeight: 600, fontSize: 16, marginTop: 24}}>自测题答案要点</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
1. 进程是资源分配单位，线程是调度单位，进程间隔离，线程共享内存。
2. 页面置换流程：缺页→查表→换出→换入→更新表。
3. 死锁场景如两个进程互相等待对方释放资源，四条件：互斥、占有且等待、不剥夺、循环等待。
4. RBAC基于角色，DAC自主分配，MAC强制策略。例：RBAC如企业权限，DAC如文件属主，MAC如军事分级。
`}</pre>
          </Card>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>多做真题，查漏补缺，强化应用</li>
            <li>整理错题本，关注易错点和面试官追问</li>
            <li>结合实战案例，提升系统分析能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/security">
          上一章：操作系统安全
        </Button>
        <Button type="primary" size="large" href="/study/os/intro">
          返回目录
        </Button>
      </div>
      </>
  ),
}
        ]}
      />
    </div>
  );
}