"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 实战案例数据
const practicalCases = [
  {
    title: "进程管理案例",
    cases: [
      {
        problem: "查找并终止占用CPU过高的进程",
        solution: "top -c\n# 找到PID后\nkill -9 PID",
        explanation: "使用top命令查看进程资源占用情况，找到问题进程后使用kill命令终止"
      },
      {
        problem: "后台运行程序并查看输出",
        solution: "nohup command > output.log 2>&1 &\ntail -f output.log",
        explanation: "nohup使程序忽略挂起信号，>重定向输出，2>&1将错误输出也重定向，&放入后台运行"
      },
      {
        problem: "监控特定进程的资源使用",
        solution: "watch -n 1 'ps -p PID -o %cpu,%mem,cmd'",
        explanation: "使用watch命令每秒监控一次进程的CPU、内存使用情况和命令"
      }
    ]
  },
  {
    title: "服务管理案例",
    cases: [
      {
        problem: "设置服务开机自启",
        solution: "systemctl enable service",
        explanation: "使用systemctl enable命令设置服务开机自动启动"
      },
      {
        problem: "查看服务状态和日志",
        solution: "systemctl status service\njournalctl -u service",
        explanation: "systemctl status查看服务状态，journalctl查看服务日志"
      },
      {
        problem: "重启失败的服务",
        solution: "systemctl restart service\nsystemctl status service",
        explanation: "使用restart命令重启服务，然后检查状态确认是否正常运行"
      }
    ]
  }
];

const tabItems = [
  {
    key: 'basic',
    label: '进程管理基础',
    children: (
      <Card title="进程管理基础" className="mb-4">
        <Paragraph>
          <b>进程概念：</b>
          <ul>
            <li>进程：正在运行的程序实例</li>
            <li>PID：进程唯一标识符</li>
            <li>PPID：父进程ID</li>
            <li>前台/后台进程</li>
            <li>守护进程（Daemon）</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>进程状态：</b>
          <ul>
            <li>运行（R）：正在执行</li>
            <li>睡眠（S）：等待事件</li>
            <li>停止（T）：被信号停止</li>
            <li>僵尸（Z）：已终止但未回收</li>
          </ul>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>每个进程都有唯一的PID</li>
              <li>进程可以创建子进程</li>
              <li>进程可以相互通信</li>
              <li>进程可以改变优先级</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'command',
    label: '进程管理命令',
    children: (
      <Card title="进程管理命令" className="mb-4">
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 查看所有进程
ps aux

# 查找特定进程
ps aux | grep process

# 动态查看进程
top
htop

# 终止进程
kill -9 PID

# 按名称终止进程
pkill process

# 设置/修改优先级
nice -n 10 command
renice -n 5 PID

# 查看后台任务
jobs

# 后台/前台运行
command &
bg %1
fg %1
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>查看所有进程：<Text code>ps aux</Text></li>
              <li>查找特定进程：<Text code>ps aux | grep process</Text></li>
              <li>终止进程：<Text code>kill -9 PID</Text></li>
              <li>后台运行：<Text code>command &</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'service',
    label: '服务管理',
    children: (
      <Card title="服务管理" className="mb-4">
        <Paragraph>
          <b>systemd服务管理常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 启动服务
sudo systemctl start service

# 停止服务
sudo systemctl stop service

# 重启服务
sudo systemctl restart service

# 查看服务状态
sudo systemctl status service

# 设置开机自启
sudo systemctl enable service

# 禁用开机自启
sudo systemctl disable service

# 重载配置
sudo systemctl daemon-reload

# 查看服务日志
journalctl -u service

# 检查服务依赖
systemctl list-dependencies service
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>服务配置文件：</b>
          <ul>
            <li>位置：/etc/systemd/system/</li>
            <li>格式：.service文件</li>
            <li>内容：服务描述、执行命令、依赖关系等</li>
          </ul>
        </Paragraph>
        <Alert
          message="注意事项"
          description={
            <ul>
              <li>修改配置后需要重载：<Text code>systemctl daemon-reload</Text></li>
              <li>查看服务日志：<Text code>journalctl -u service</Text></li>
              <li>检查服务依赖：<Text code>systemctl list-dependencies</Text></li>
            </ul>
          }
          type="warning"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'monitor',
    label: '系统监控',
    children: (
      <Card title="系统监控" className="mb-4">
        <Paragraph>
          <b>常用监控命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 进程监控
top
htop

# 系统资源监控
vmstat 1 5

# 磁盘I/O监控
iostat -x 1 3

# 网络连接监控
netstat -tulnp

# 系统活动报告
sar -u 1 5

# 全能监控工具
dstat
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>日志查看命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 查看系统日志
journalctl -xe

# 查看内核日志
dmesg

# 实时查看日志
tail -f /var/log/syslog

# 日志过滤
grep 'error' /var/log/syslog
`}</pre>
        </Paragraph>
        <Alert
          message="监控要点"
          description={
            <ul>
              <li>定期检查系统负载</li>
              <li>监控关键服务状态</li>
              <li>关注异常日志信息</li>
              <li>设置监控告警阈值</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'case',
    label: '实战案例与面试题',
    children: (
      <Card title="实战案例与面试题" className="mb-4">
        {practicalCases.map((section, index) => (
          <div key={index} className="mb-6">
            <Title level={4}>{section.title}</Title>
            {section.cases.map((caseItem, caseIndex) => (
              <div key={caseIndex} className="mb-4">
                <Paragraph>
                  <b>问题：</b> {caseItem.problem}
                </Paragraph>
                <Collapse>
                  <Panel header="查看解决方案" key={caseIndex}>
                    <div className="space-y-2">
                      <Paragraph>
                        <b>命令：</b> <Text code>{caseItem.solution}</Text>
                      </Paragraph>
                      <Paragraph>
                        <b>解释：</b> {caseItem.explanation}
                      </Paragraph>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
          </div>
        ))}
        <div className="mt-6">
          <Title level={4}>面试高频题</Title>
          <Collapse>
            <Panel header="解释进程和线程的区别" key="1">
              <Paragraph>
                进程和线程的主要区别：
              </Paragraph>
              <ul>
                <li>进程是资源分配的最小单位，线程是CPU调度的最小单位</li>
                <li>进程有独立的地址空间，线程共享进程的地址空间</li>
                <li>进程切换开销大，线程切换开销小</li>
                <li>进程间通信需要IPC机制，线程间可以直接通信</li>
              </ul>
            </Panel>
            <Panel header="如何排查系统性能问题？" key="2">
              <Paragraph>
                排查性能问题的步骤：
              </Paragraph>
              <ul>
                <li>使用top/htop查看系统负载</li>
                <li>检查CPU使用率（vmstat）</li>
                <li>检查内存使用（free）</li>
                <li>检查磁盘I/O（iostat）</li>
                <li>检查网络状况（netstat）</li>
                <li>分析系统日志</li>
              </ul>
            </Panel>
            <Panel header="如何实现服务高可用？" key="3">
              <Paragraph>
                实现服务高可用的方法：
              </Paragraph>
              <ul>
                <li>使用systemd的自动重启功能</li>
                <li>配置服务监控和告警</li>
                <li>实现服务集群和负载均衡</li>
                <li>定期备份和恢复测试</li>
                <li>设置合理的资源限制</li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </Card>
    ),
  },
];

export default function LinuxProcessPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>进程与服务管理</Title>
      <Tabs defaultActiveKey="basic" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/package">
          上一章：软件与包管理
        </Button>
        <Button type="primary" size="large" href="/study/linux/shell">
          下一章：Shell与脚本编程
        </Button>
      </div>
    </div>
  );
} 