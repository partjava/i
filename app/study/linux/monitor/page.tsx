"use client";

import React from 'react';
import { Typography, Card, Alert, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function LinuxMonitorPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>性能监控与日志管理</Title>
      <Card title="性能监控" className="mb-4">
        <Paragraph>
          <b>CPU与内存监控：</b>
          <pre>{`
# 实时查看系统资源占用
top

# 更友好的交互式监控
top
htop

# 查看内存使用情况
free -h
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>进程与负载监控：</b>
          <pre>{`
# 查看进程状态
ps aux

# 查看系统平均负载
uptime

# 查看进程树
pstree -p
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>磁盘与I/O监控：</b>
          <pre>{`
# 查看磁盘使用情况
df -h

# 查看磁盘I/O
iotop

# 查看磁盘分区信息
lsblk
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>网络监控：</b>
          <pre>{`
# 查看网络流量
iftop

# 查看网络连接
ss -tulnp

# 查看网络统计
sar -n DEV 1 5
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>历史性能数据：</b>
          <pre>{`
# 安装并使用sysstat工具包
sudo apt install sysstat

# 收集和查看历史性能数据
sar -u 1 5
`}</pre>
        </Paragraph>
        <Alert
          message="性能监控要点"
          description={
            <ul>
              <li>top/htop：实时监控</li>
              <li>iotop/iftop：I/O与网络</li>
              <li>free/df：内存与磁盘</li>
              <li>sar：历史数据分析</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
      <Card title="日志管理" className="mb-4">
        <Paragraph>
          <b>系统日志管理：</b>
          <pre>{`
# 查看系统日志
journalctl -xe

# 查看指定服务日志
journalctl -u nginx

# 按时间查看日志
journalctl --since "2024-01-01" --until "2024-01-31"
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>传统日志文件：</b>
          <pre>{`
# 查看常见日志文件
cat /var/log/syslog
cat /var/log/messages
cat /var/log/auth.log
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>日志轮转与管理：</b>
          <pre>{`
# 手动触发日志轮转
sudo logrotate -f /etc/logrotate.conf

# 查看logrotate配置
cat /etc/logrotate.conf
cat /etc/logrotate.d/*
`}</pre>
        </Paragraph>
        <Alert
          message="日志管理要点"
          description={
            <ul>
              <li>journalctl：systemd日志</li>
              <li>/var/log：传统日志文件</li>
              <li>logrotate：日志轮转与归档</li>
            </ul>
          }
          type="success"
          showIcon
        />
      </Card>
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/network">
          上一章：网络与安全
        </Button>
        <Button type="primary" size="large" href="/study/linux/practice">
          下一章：实战与面试
        </Button>
      </div>
    </div>
  );
} 