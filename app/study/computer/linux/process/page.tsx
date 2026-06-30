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
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '进程与服务管理',
  chapterNumber: 5,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '软件与包管理', href: '/study/computer/linux/package' },
  nextChapter: { label: 'Shell与脚本编程', href: '/study/computer/linux/shell' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '进程管理基础',
    left: (
      <div className="space-y-4">
        <PageTitle>进程管理基础</PageTitle>
        <BookParagraph><strong>进程概念：</strong></BookParagraph>
        <BookList items={[
          '进程：正在运行的程序实例',
          'PID：进程唯一标识符',
          'PPID：父进程ID',
          '前台/后台进程',
          '守护进程（Daemon）',
        ]} />
        <BookParagraph><strong>进程状态：</strong></BookParagraph>
        <BookList items={[
          '运行（R）：正在执行',
          '睡眠（S）：等待事件',
          '停止（T）：被信号停止',
          '僵尸（Z）：已终止但未回收',
        ]} />
        <BookAlert type="info" message="每个进程都有唯一的PID，进程可以创建子进程，进程可以相互通信，进程可以改变优先级" />
        <SectionTitle>进程管理命令</SectionTitle>
        <BookCode language="bash" code={`# 查看所有进程
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
fg %1`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>服务管理</PageTitle>
        <BookParagraph><strong>systemd服务管理常用命令：</strong></BookParagraph>
        <BookCode language="bash" code={`# 启动服务
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
systemctl list-dependencies service`} />
        <BookParagraph><strong>服务配置文件：</strong></BookParagraph>
        <BookList items={[
          '位置：/etc/systemd/system/',
          '格式：.service文件',
          '内容：服务描述、执行命令、依赖关系等',
        ]} />
        <BookAlert type="warning" message="修改配置后需要重载：systemctl daemon-reload，查看服务日志：journalctl -u service，检查服务依赖：systemctl list-dependencies" />
        <TagGrid items={['ps', 'top', 'kill', 'systemctl', 'journalctl', 'service']} />
      </div>
    ),
  },
  {
    label: '系统监控',
    left: (
      <div className="space-y-4">
        <PageTitle>系统监控</PageTitle>
        <BookParagraph><strong>常用监控命令：</strong></BookParagraph>
        <BookCode language="bash" code={`# 进程监控
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
dstat`} />
        <BookParagraph><strong>日志查看命令：</strong></BookParagraph>
        <BookCode language="bash" code={`# 查看系统日志
journalctl -xe

# 查看内核日志
dmesg

# 实时查看日志
tail -f /var/log/syslog

# 日志过滤
grep 'error' /var/log/syslog`} />
        <BookAlert type="info" message="定期检查系统负载，监控关键服务状态，关注异常日志信息，设置监控告警阈值" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">查找并终止占用CPU过高的进程</p>
          <BookCode language="bash" code={`top -c
# 找到PID后
kill -9 PID`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用top命令查看进程资源占用，找到问题进程后使用kill命令终止</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">后台运行程序并查看输出</p>
          <BookCode language="bash" code={`nohup command > output.log 2>&1 &
tail -f output.log`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>nohup使程序忽略挂起信号，&gt;重定向输出，2&gt;1将错误输出重定向，&amp;放入后台</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">监控特定进程的资源使用</p>
          <BookCode language="bash" code={`watch -n 1 'ps -p PID -o %cpu,%mem,cmd'`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用watch命令每秒监控一次进程的CPU、内存使用和命令</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">设置服务开机自启</p>
          <BookCode language="bash" code={`systemctl enable service`} />
        </div>
        <TagGrid items={['监控', 'vmstat', 'iostat', 'journalctl', 'dmesg', 'top']} />
      </div>
    ),
  },
  {
    label: '面试高频题',
    left: (
      <div className="space-y-4">
        <PageTitle>面试高频题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">解释进程和线程的区别</p>
          <BookList items={[
            '进程是资源分配的最小单位，线程是CPU调度的最小单位',
            '进程有独立的地址空间，线程共享进程的地址空间',
            '进程切换开销大，线程切换开销小',
            '进程间通信需要IPC机制，线程间可以直接通信',
          ]} />
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何排查系统性能问题？</p>
          <BookList items={[
            '使用top/htop查看系统负载',
            '检查CPU使用率（vmstat）',
            '检查内存使用（free）',
            '检查磁盘I/O（iostat）',
            '检查网络状况（netstat）',
            '分析系统日志',
          ]} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何实现服务高可用？</p>
          <BookList items={[
            '使用systemd的自动重启功能',
            '配置服务监控和告警',
            '实现服务集群和负载均衡',
            '定期备份和恢复测试',
            '设置合理的资源限制',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>服务管理案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">查看服务状态和日志</p>
          <BookCode language="bash" code={`systemctl status service
journalctl -u service`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>systemctl status查看状态，journalctl查看服务日志</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">重启失败的服务</p>
          <BookCode language="bash" code={`systemctl restart service
systemctl status service`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用restart命令重启服务，然后检查状态确认是否正常运行</p>
        </div>
        <BookParagraph>
          进程和服务管理是Linux运维的核心技能，需要熟练掌握常用命令和排查方法。
        </BookParagraph>
        <BookAlert type="info" message="top是最常用的系统监控工具，按P按CPU排序，按M按内存排序，按q退出。" />
        <TagGrid items={['面试题', '进程线程', '性能排查', '高可用', 'systemd']} />
      </div>
    ),
  },
]

export default function LinuxProcessPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
