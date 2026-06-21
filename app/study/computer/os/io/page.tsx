"use client";
import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const deviceData = [
  { key: 1, type: '块设备', desc: '以块为单位读写，如磁盘、U盘。' },
  { key: 2, type: '字符设备', desc: '以字符流方式读写，如键盘、串口。' },
  { key: 3, type: '网络设备', desc: '用于网络通信，如网卡。' },
];

export default function OSIOPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>输入输出与设备管理</Title>
      <Tabs
        defaultActiveKey="arch"
        type="card"
        size="large"
        items={[
          {
            key: 'arch',
            label: 'I/O系统结构',
            children: (
              <>
                <Paragraph>
                  <b>I/O系统结构主要包括：</b>CPU、主存、I/O控制器、I/O设备、缓冲区等。
                </Paragraph>
                <Paragraph style={{marginTop: 24}}>
                  <b>复杂结构示意图：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 复杂SVG：I/O系统结构 */}
                  <svg width="800" height="260" viewBox="0 0 800 260">
                    {/* CPU */}
                    <rect x="60" y="100" width="100" height="50" fill="#e3f2fd" stroke="#1976d2" rx="10" />
                    <text x="110" y="130" textAnchor="middle" fontSize="15">CPU</text>
                    {/* 主存 */}
                    <rect x="200" y="100" width="120" height="50" fill="#bbdefb" stroke="#1976d2" rx="10" />
                    <text x="260" y="130" textAnchor="middle" fontSize="15">主存</text>
                    {/* I/O控制器 */}
                    <rect x="370" y="80" width="120" height="50" fill="#fffde7" stroke="#fbc02d" rx="10" />
                    <text x="430" y="110" textAnchor="middle" fontSize="15">I/O控制器</text>
                    {/* 缓冲区 */}
                    <rect x="370" y="160" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="10" />
                    <text x="430" y="185" textAnchor="middle" fontSize="13">缓冲区</text>
                    {/* I/O设备 */}
                    <rect x="540" y="100" width="120" height="50" fill="#c8e6c9" stroke="#388e3c" rx="10" />
                    <text x="600" y="130" textAnchor="middle" fontSize="15">I/O设备</text>
                    {/* 箭头 */}
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                      <line x1="160" y1="125" x2="200" y2="125" />
                      <line x1="320" y1="125" x2="370" y2="105" />
                      <line x1="490" y1="105" x2="540" y2="125" />
                      <line x1="430" y1="130" x2="430" y2="160" />
                    </g>
                    <g stroke="#388e3c" strokeWidth="2" markerEnd="url(#arrow)">
                      <line x1="430" y1="200" x2="600" y2="150" />
                    </g>
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </>
            ),
          },
          {
            key: 'mode',
            label: '典型I/O方式',
            children: (
              <>
                <Paragraph>
                  <b>典型I/O方式包括程序直接I/O、中断驱动I/O、DMA：</b><br />
                  <b>程序直接I/O：</b> 由CPU主动控制I/O操作，CPU需等待I/O完成，期间不能做其他任务。实现简单，适合低速、简单设备，但CPU利用率低。
                  <br />
                  <b>中断驱动I/O：</b> 设备准备好后通过中断通知CPU，CPU只在I/O完成时被打断，平时可处理其他任务。适合大多数通用设备，响应快，但中断频繁时有一定开销。
                  <br />
                  <b>DMA（直接内存访问）：</b> 由DMA控制器直接在主存和I/O设备间搬运数据，CPU只需发起和收尾，数据传输期间可并行处理其他任务。适合大数据量、高速设备，效率高但硬件复杂。
                </Paragraph>
                <Paragraph style={{marginTop: 16}}>
                  <b>流程图与伪代码：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 复杂SVG：DMA流程图 */}
                  <svg width="800" height="180" viewBox="0 0 800 180">
                    <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
                    <text x="120" y="65" textAnchor="middle" fontSize="13">CPU发起I/O</text>
                    <rect x="220" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
                    <text x="280" y="65" textAnchor="middle" fontSize="13">DMA控制器</text>
                    <rect x="380" y="40" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
                    <text x="440" y="65" textAnchor="middle" fontSize="13">主存</text>
                    <rect x="540" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
                    <text x="600" y="65" textAnchor="middle" fontSize="13">I/O设备</text>
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                      <line x1="180" y1="60" x2="220" y2="60" />
                      <line x1="340" y1="60" x2="380" y2="60" />
                      <line x1="500" y1="60" x2="540" y2="60" />
                    </g>
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                <Paragraph>
                  <b>DMA方式伪代码（含详细注释）：</b>
                </Paragraph>
                <Card style={{marginBottom: 16}}>
                  <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// DMA方式伪代码
// 1. CPU设置DMA控制器，指定源/目的地址和传输长度
DMA_Controller.setup(src_addr, dst_addr, length);
// 2. CPU发起DMA传输请求
DMA_Controller.start();
// 3. DMA控制器自动完成数据搬运，CPU可做其它任务
while (!DMA_Controller.done()) {
    CPU.do_other_work();
}
// 4. 传输完成后，DMA控制器发中断通知CPU
on_DMA_interrupt() {
    CPU.handle_DMA_complete();
}
`}</pre>
                </Card>
              </>
            ),
          },
          {
            key: 'dev',
            label: '设备管理',
            children: (
              <>
                <Paragraph>
                  <b>设备分类与管理：</b>块设备、字符设备、虚拟设备等。常见管理策略包括缓冲、排队、调度等。
                </Paragraph>
                <Table
                  bordered
                  size="small"
                  pagination={false}
                  columns={[
                    { title: '设备类型', dataIndex: 'type', key: 'type' },
                    { title: '举例', dataIndex: 'example', key: 'example' },
                    { title: '管理策略', dataIndex: 'policy', key: 'policy' },
                  ]}
                  dataSource={[
                    { key: 1, type: '块设备', example: '磁盘、U盘', policy: '缓冲、调度、分区' },
                    { key: 2, type: '字符设备', example: '键盘、串口', policy: '中断、流控' },
                    { key: 3, type: '虚拟设备', example: 'RAM盘、伪终端', policy: '虚拟化、映射' },
                  ]}
                />
                <Paragraph style={{marginTop: 24}}>
                  <b>磁盘调度算法流程图（以电梯算法为例）：</b>
                </Paragraph>
                <div style={{overflowX: 'auto', margin: '16px 0'}}>
                  {/* 复杂SVG：电梯算法流程图 */}
                  <svg width="700" height="160" viewBox="0 0 700 160">
                    <rect x="60" y="40" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="8" />
                    <text x="120" y="65" textAnchor="middle" fontSize="13">请求队列</text>
                    <rect x="220" y="40" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="8" />
                    <text x="280" y="65" textAnchor="middle" fontSize="13">排序</text>
                    <rect x="380" y="40" width="120" height="40" fill="#e8f5e9" stroke="#388e3c" rx="8" />
                    <text x="440" y="65" textAnchor="middle" fontSize="13">磁头移动</text>
                    <rect x="540" y="40" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="8" />
                    <text x="600" y="65" textAnchor="middle" fontSize="13">完成服务</text>
                    <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                      <line x1="180" y1="60" x2="220" y2="60" />
                      <line x1="340" y1="60" x2="380" y2="60" />
                      <line x1="500" y1="60" x2="540" y2="60" />
                    </g>
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                <Paragraph>
                  <b>电梯算法（SCAN）伪代码（含详细注释）：</b>
                </Paragraph>
                <Card style={{marginBottom: 16}}>
                  <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// SCAN（电梯）算法伪代码
// 输入：请求队列reqs，当前磁头位置head，移动方向dir
function SCAN(reqs, head, dir):
    sort reqs by cylinder number
    while reqs not empty:
        if exists req in dir:
            service nearest req in dir
            move head to req
            remove req from reqs
        else:
            reverse dir
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
                  <b>例题1（单选）：</b> 关于DMA方式，下列说法正确的是：
                </Paragraph>
                <ul style={{fontSize: 15, marginBottom: 8}}>
                  <li>A. DMA方式下CPU需参与每个字节的传输</li>
                  <li>B. DMA方式可大幅减少CPU干预</li>
                  <li>C. DMA方式不需要I/O控制器</li>
                  <li>D. DMA方式只适用于字符设备</li>
                </ul>
                <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>B</Paragraph>
                <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>DMA方式由DMA控制器直接完成数据搬运，CPU只需发起和收尾。
                </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题2（判断）：</b> 程序直接I/O方式下，CPU可在I/O期间做其他任务。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>×</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>程序直接I/O方式下，CPU需等待I/O完成，不能并行处理其他任务。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题3（简答）：</b> 简述中断驱动I/O与DMA方式的主要区别。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案要点：</b><br />
            中断驱动I/O每次I/O操作都需CPU参与，中断频繁；DMA方式数据搬运由DMA控制器完成，CPU只需发起和收尾，效率更高。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题4（计算）：</b> 某磁盘I/O请求序列为[40, 10, 22, 7, 90]，初始磁头在20，采用SCAN算法（向上），请给出服务顺序及总移动距离。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b>20→22→40→90→10→7，总移动距离=2+18+50+80+3=153
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>先服务大于20的请求（22,40,90），再反向服务小于20的（10,7），累计移动距离。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题5（简答）：</b> 多缓冲区I/O的优缺点是什么？适用于哪些场景？
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案要点：</b><br />
            多缓冲区I/O可减少CPU等待，提高I/O吞吐量，适合数据流量大、I/O与CPU可并行的场景。缺点是实现复杂、内存占用增加。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>多缓冲区I/O常用于磁盘、网络等高吞吐场景，是面试常考的I/O优化技术。
          </Paragraph>
              </>
            ),
          },
          { key: 'interview',
            label: '高频面试题',
            children: (
              <>
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>高频面试题</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>面试题1：</b> 简述中断驱动I/O、DMA和程序直接I/O三种方式的优缺点及适用场景。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b><br />
            <b>程序直接I/O：</b>实现简单，CPU利用率低，适合简单低速设备。<br />
            <b>中断驱动I/O：</b>CPU响应快，适合大多数通用设备，但中断频繁有开销。<br />
            <b>DMA：</b>效率高，CPU开销低，适合大数据量高速设备，但硬件复杂。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>三种方式各有优缺点，面试常考对比和适用场景。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>面试题2：</b> 设备无关性是如何实现的？
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b>通过设备驱动程序和统一的I/O接口，操作系统屏蔽了硬件差异，实现了对不同设备的统一管理和访问。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>设备无关性是现代操作系统I/O管理的重要目标，便于扩展和维护。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>面试题3：</b> 比较FCFS、SSTF、SCAN三种磁盘调度算法的优缺点。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案：</b><br />
            <b>FCFS：</b>实现简单，公平但效率低。<br />
            <b>SSTF：</b>平均寻道时间短，但可能导致饥饿。<br />
            <b>SCAN：</b>兼顾效率和公平，适合负载较高场景。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>磁盘调度算法的对比和适用场景是面试高频考点。</Paragraph>
        </>
            ),
              },

        ]}
      />
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解I/O系统结构和各部件作用</li>
            <li>掌握典型I/O方式和DMA流程</li>
            <li>熟悉设备分类与磁盘调度算法</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/file">
          上一章：文件系统
        </Button>
        <Button type="primary" size="large" href="/study/os/schedule">
          下一章：调度算法
        </Button>
      </div>
    </div>
  );
}