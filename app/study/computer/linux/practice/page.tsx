'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '实战与面试',
  chapterNumber: 9,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '性能监控与日志管理', href: '/study/computer/linux/monitor' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '实战操作',
    left: (
      <div className="space-y-4">
        <PageTitle>实战操作</PageTitle>
        <SectionTitle>抓包分析（tcpdump）</SectionTitle>
        <BookCode language="bash" code={`# 抓取80端口(HTTP)流量并保存到http.pcap
sudo tcpdump -i eth0 port 80 -w http.pcap

# 读取分析抓包文件
tcpdump -r http.pcap`} />
        <SectionTitle>日志分析</SectionTitle>
        <BookCode language="bash" code={`# 查看最近的系统日志
journalctl -xe

# 检查SSH登录失败
cat /var/log/auth.log | grep 'Failed password'`} />
        <SectionTitle>服务排障</SectionTitle>
        <BookCode language="bash" code={`# 检查Nginx服务状态
sudo systemctl status nginx

# 查看Nginx错误日志
cat /var/log/nginx/error.log`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>权限加固与防火墙</PageTitle>
        <SectionTitle>权限加固</SectionTitle>
        <BookCode language="bash" code={`# 禁止root远程登录
sudo nano /etc/ssh/sshd_config
PermitRootLogin no

# 只允许指定用户登录
AllowUsers user1 user2

# 重启SSH服务
sudo systemctl restart sshd`} />
        <SectionTitle>防火墙配置</SectionTitle>
        <BookCode language="bash" code={`# 只允许指定IP访问SSH
sudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j DROP`} />
        <BookAlert type="info" message="掌握抓包、日志分析、服务排障等常用技能，熟悉权限加固与防火墙配置" />
        <TagGrid items={['tcpdump', '抓包', '日志分析', '服务排障', '权限加固', '防火墙']} />
      </div>
    ),
  },
  {
    label: '高频面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何排查Linux下的网络故障？</p>
          <BookCode language="bash" code={`# 检查物理连接和网卡状态
ip addr

# 测试网络连通性
ping 8.8.8.8

# 路由追踪
traceroute www.baidu.com

# 检查路由表
ip route show

# 检查防火墙规则
sudo iptables -L -n -v

# 查看日志
journalctl -xe`} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何加固Linux服务器的SSH安全？</p>
          <BookCode language="bash" code={`# 修改默认端口
sudo nano /etc/ssh/sshd_config
Port 2222

# 禁用root远程登录
PermitRootLogin no

# 使用密钥认证
ssh-keygen -t rsa
ssh-copy-id user@server`} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>iptables与面试要点</PageTitle>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">iptables常用配置有哪些？</p>
          <BookCode language="bash" code={`# 允许本地回环
sudo iptables -A INPUT -i lo -j ACCEPT

# 允许已建立连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许指定端口
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 默认拒绝
sudo iptables -P INPUT DROP`} />
        </div>
        <BookAlert type="success" message="面试注重实际操作与思路，答题时结合命令和原理" />
        <TagGrid items={['SSH安全', '密钥认证', 'iptables', '网络故障', '面试']} />
      </div>
    ),
  },
]

export default function LinuxPracticePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
