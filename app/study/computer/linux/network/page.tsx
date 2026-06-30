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
  chapterTitle: '网络与安全',
  chapterNumber: 7,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: 'Shell与脚本编程', href: '/study/computer/linux/shell' },
  nextChapter: { label: '性能监控与日志管理', href: '/study/computer/linux/monitor' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '网络配置',
    left: (
      <div className="space-y-4">
        <PageTitle>网络接口配置</PageTitle>
        <SectionTitle>静态IP配置</SectionTitle>
        <BookCode language="bash" code={`# 编辑网络配置文件
sudo nano /etc/network/interfaces

# 静态IP配置
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4`} />
        <SectionTitle>DHCP配置</SectionTitle>
        <BookCode language="bash" code={`# DHCP自动获取IP
auto eth0
iface eth0 inet dhcp`} />
        <SectionTitle>网络接口管理</SectionTitle>
        <BookCode language="bash" code={`# 查看网络接口
ip addr show

# 启用/禁用网络接口
sudo ip link set eth0 up
sudo ip link set eth0 down

# 添加IP地址
sudo ip addr add 192.168.1.100/24 dev eth0`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>路由与服务配置</PageTitle>
        <SectionTitle>路由配置</SectionTitle>
        <BookCode language="bash" code={`# 查看路由表
ip route show

# 添加默认网关
sudo ip route add default via 192.168.1.1

# 添加静态路由
sudo ip route add 10.0.0.0/24 via 192.168.1.2`} />
        <SectionTitle>SSH服务配置</SectionTitle>
        <BookCode language="bash" code={`# 编辑SSH配置
sudo nano /etc/ssh/sshd_config

Port 2222                    # 修改默认端口
PermitRootLogin no           # 禁用root登录
AllowUsers user1 user2       # 只允许特定用户登录

sudo systemctl restart sshd`} />
        <SectionTitle>Web服务器配置（Nginx）</SectionTitle>
        <BookCode language="bash" code={`# 安装Nginx
sudo apt install nginx

# 配置虚拟主机
sudo nano /etc/nginx/sites-available/example.com

# 启用站点
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/

# 重启Nginx
sudo systemctl restart nginx`} />
        <TagGrid items={['ip', 'route', 'SSH', 'Nginx', '静态IP', 'DHCP']} />
      </div>
    ),
  },
  {
    label: '安全设置',
    left: (
      <div className="space-y-4">
        <PageTitle>系统安全</PageTitle>
        <SectionTitle>用户权限管理</SectionTitle>
        <BookCode language="bash" code={`# 创建新用户
sudo useradd -m -s /bin/bash username
sudo passwd username
sudo usermod -aG sudo username

# 文件权限
sudo chmod 600 sensitive_file
sudo chown username:group file`} />
        <SectionTitle>SELinux配置</SectionTitle>
        <BookCode language="bash" code={`# 查看SELinux状态
sestatus

# 修改SELinux模式
sudo setenforce 1  # 强制模式
sudo setenforce 0  # 宽容模式

# 修改文件上下文
sudo chcon -t httpd_sys_content_t /var/www/html/index.html

# 查看文件上下文
ls -Z file`} />
        <SectionTitle>防火墙配置（iptables）</SectionTitle>
        <BookCode language="bash" code={`# 允许已建立的连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许HTTP和HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 拒绝其他入站
sudo iptables -A INPUT -j DROP

# 保存规则
sudo iptables-save > /etc/iptables.rules`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络安全</PageTitle>
        <SectionTitle>SSL/TLS配置</SectionTitle>
        <BookCode language="bash" code={`# 生成SSL证书
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
    -keyout /etc/ssl/private/nginx.key \\
    -out /etc/ssl/certs/nginx.crt

# Nginx SSL配置
server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /etc/ssl/certs/nginx.crt;
    ssl_certificate_key /etc/ssl/private/nginx.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}`} />
        <SectionTitle>入侵检测（Fail2ban）</SectionTitle>
        <BookCode language="bash" code={`# 安装Fail2ban
sudo apt install fail2ban

# /etc/fail2ban/jail.local 配置
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600

sudo systemctl restart fail2ban`} />
        <SectionTitle>网络监控（tcpdump）</SectionTitle>
        <BookCode language="bash" code={`# 捕获所有流量
sudo tcpdump -i any

# 捕获特定端口
sudo tcpdump -i eth0 port 80

# 保存捕获的数据包
sudo tcpdump -i eth0 -w capture.pcap

# 读取保存的数据包
tcpdump -r capture.pcap`} />
        <BookAlert type="warning" message="定期更新系统和软件，使用强密码策略，限制SSH访问，启用防火墙，定期检查日志。" />
        <TagGrid items={['SELinux', 'iptables', 'SSL/TLS', 'Fail2ban', 'tcpdump', 'OpenVPN']} />
      </div>
    ),
  },
  {
    label: '故障排查',
    left: (
      <div className="space-y-4">
        <PageTitle>网络故障排查</PageTitle>
        <SectionTitle>连通性测试</SectionTitle>
        <BookCode language="bash" code={`# 测试网络连通性
ping 8.8.8.8

# 路由追踪
traceroute www.baidu.com`} />
        <SectionTitle>查看网络接口和路由</SectionTitle>
        <BookCode language="bash" code={`# 查看网络接口
ip addr

# 查看路由表
ip route show`} />
        <SectionTitle>检查端口和连接</SectionTitle>
        <BookCode language="bash" code={`# 查看所有监听端口
netstat -tulnp

# 查看TCP/UDP连接
ss -tulnp`} />
        <SectionTitle>检查DNS</SectionTitle>
        <BookCode language="bash" code={`# 使用nslookup测试DNS解析
nslookup www.baidu.com

# 使用dig测试DNS解析
dig www.baidu.com`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全排查与案例</PageTitle>
        <SectionTitle>安全排查命令</SectionTitle>
        <BookCode language="bash" code={`# 查看登录记录
last

# 查看失败登录记录
lastb

# 显示失败登录尝试
faillog -a

# 检查是否有rootkit
sudo chkrootkit

# 查找可疑SUID文件
find / -perm -4000`} />
        <BookAlert type="success" message="ping、traceroute：网络连通性。ip、netstat、ss：接口与端口。nslookup、dig：DNS。iptables：防火墙。journalctl、log：日志。" />
        <SectionTitle>tcpdump抓包分析</SectionTitle>
        <BookCode language="bash" code={`sudo tcpdump -i eth0 port 80 -w http.pcap`} />
        <SectionTitle>iptables限制SSH访问</SectionTitle>
        <BookCode language="bash" code={`# 允许指定IP访问SSH
sudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 22 -j ACCEPT
# 拒绝其他IP访问SSH
sudo iptables -A INPUT -p tcp --dport 22 -j DROP`} />
        <TagGrid items={['ping', 'traceroute', 'netstat', 'ss', 'nslookup', 'dig']} />
      </div>
    ),
  },
  {
    label: '高频命令归纳',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试命令归纳</PageTitle>
        <BookCode language="bash" code={`# 允许本地回环
sudo iptables -A INPUT -i lo -j ACCEPT

# 允许已建立连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许指定端口
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 默认拒绝
sudo iptables -P INPUT DROP`} />
        <BookAlert type="info" message="实战与面试要点：掌握常用网络与安全命令，熟悉典型配置与排查方法，理解命令背后的原理。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络配置案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">配置静态IP地址</p>
          <p className="text-xs mb-2">配置网卡静态IP，设置网关和DNS服务器</p>
          <BookCode language="bash" code={`# 编辑网络配置文件
sudo nano /etc/network/interfaces

auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4

# 重启网络服务
sudo systemctl restart networking`} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">配置防火墙规则（ufw）</p>
          <BookCode language="bash" code={`sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw status verbose`} />
        </div>
        <TagGrid items={['iptables', 'ufw', 'tcpdump', 'fail2ban', 'SSL', '排查']} />
      </div>
    ),
  },
]

export default function LinuxNetworkPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
