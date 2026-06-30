'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '性能监控与日志管理',
  chapterNumber: 8,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '网络与安全', href: '/study/computer/linux/network' },
  nextChapter: { label: '实战与面试', href: '/study/computer/linux/practice' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '性能监控与日志管理',
    left: (
      <div className="space-y-4">
        <PageTitle>性能监控</PageTitle>
        <SectionTitle>CPU与内存监控</SectionTitle>
        <BookCode
          language="bash"
          code={`# 实时查看系统资源占用
top

# 更友好的交互式监控
top
htop

# 查看内存使用情况
free -h`}
        />
        <SectionTitle>进程与负载监控</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查看进程状态
ps aux

# 查看系统平均负载
uptime

# 查看进程树
pstree -p`}
        />
        <SectionTitle>磁盘与I/O监控</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查看磁盘使用情况
df -h

# 查看磁盘I/O
iotop

# 查看磁盘分区信息
lsblk`}
        />
        <SectionTitle>网络监控</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查看网络流量
iftop

# 查看网络连接
ss -tulnp

# 查看网络统计
sar -n DEV 1 5`}
        />
        <SectionTitle>历史性能数据</SectionTitle>
        <BookCode
          language="bash"
          code={`# 安装并使用sysstat工具包
sudo apt install sysstat

# 收集和查看历史性能数据
sar -u 1 5`}
        />
        <BookAlert type="info" message="性能监控要点">
          <BookList items={[
            'top/htop：实时监控',
            'iotop/iftop：I/O与网络',
            'free/df：内存与磁盘',
            'sar：历史数据分析',
          ]} />
        </BookAlert>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>日志管理</PageTitle>
        <SectionTitle>系统日志管理</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查看系统日志
journalctl -xe

# 查看指定服务日志
journalctl -u nginx

# 按时间查看日志
journalctl --since "2024-01-01" --until "2024-01-31"`}
        />
        <SectionTitle>传统日志文件</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查看常见日志文件
cat /var/log/syslog
cat /var/log/messages
cat /var/log/auth.log`}
        />
        <SectionTitle>日志轮转与管理</SectionTitle>
        <BookCode
          language="bash"
          code={`# 手动触发日志轮转
sudo logrotate -f /etc/logrotate.conf

# 查看logrotate配置
cat /etc/logrotate.conf
cat /etc/logrotate.d/*`}
        />
        <BookAlert type="success" message="日志管理要点">
          <BookList items={[
            'journalctl：systemd日志',
            '/var/log：传统日志文件',
            'logrotate：日志轮转与归档',
          ]} />
        </BookAlert>
      </div>
    ),
  },
]

export default function LinuxMonitorPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
