"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 实战案例数据
const practicalCases = [
  {
    title: "网络配置案例",
    cases: [
      {
        problem: "如何配置静态IP地址？",
        solution: `# 编辑网络配置文件
sudo nano /etc/network/interfaces

# 添加以下配置
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4

# 重启网络服务
sudo systemctl restart networking`,
        explanation: "配置静态IP地址，设置网关和DNS服务器"
      },
      {
        problem: "如何配置防火墙规则？",
        solution: `# 使用ufw配置防火墙
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# 查看防火墙状态
sudo ufw status verbose`,
        explanation: "使用ufw配置基本的防火墙规则，保护系统安全"
      }
    ]
  }
];

const tabItems = [
  {
    key: 'network',
    label: '网络配置',
    children: (
      <Card title="网络配置" className="mb-4">
        <Paragraph>
          <b>网络接口配置：</b>
          <ul>
            <li>
              静态IP配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 编辑网络配置文件
sudo nano /etc/network/interfaces

# 添加以下配置
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
              `}</pre>
            </li>
            <li>
              DHCP配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 编辑网络配置文件
sudo nano /etc/network/interfaces

# 添加以下配置
auto eth0
iface eth0 inet dhcp
              `}</pre>
            </li>
            <li>
              网络接口管理：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看网络接口
ip addr show

# 启用/禁用网络接口
sudo ip link set eth0 up
sudo ip link set eth0 down

# 添加IP地址
sudo ip addr add 192.168.1.100/24 dev eth0
              `}</pre>
            </li>
            <li>
              路由配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看路由表
ip route show

# 添加默认网关
sudo ip route add default via 192.168.1.1

# 添加静态路由
sudo ip route add 10.0.0.0/24 via 192.168.1.2
              `}</pre>
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>网络服务：</b>
          <ul>
            <li>
              SSH服务配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 编辑SSH配置文件
sudo nano /etc/ssh/sshd_config

# 修改默认端口
Port 2222

# 禁用root登录
PermitRootLogin no

# 只允许特定用户登录
AllowUsers user1 user2

# 重启SSH服务
sudo systemctl restart sshd
              `}</pre>
            </li>
            <li>
              Web服务器配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 安装Nginx
sudo apt install nginx

# 配置虚拟主机
sudo nano /etc/nginx/sites-available/example.com

# 启用站点
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/

# 重启Nginx
sudo systemctl restart nginx
              `}</pre>
            </li>
            <li>
              DNS服务配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 安装BIND9
sudo apt install bind9

# 配置主区域文件
sudo nano /etc/bind/named.conf.local

# 创建区域文件
sudo nano /etc/bind/db.example.com

# 重启BIND服务
sudo systemctl restart bind9
              `}</pre>
            </li>
          </ul>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>熟悉网络配置文件位置</li>
              <li>掌握网络服务管理命令</li>
              <li>了解网络故障排查方法</li>
              <li>掌握网络性能优化技巧</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'security',
    label: '安全设置',
    children: (
      <Card title="安全设置" className="mb-4">
        <Paragraph>
          <b>系统安全：</b>
          <ul>
            <li>
              用户权限管理：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 创建新用户
sudo useradd -m -s /bin/bash username

# 设置密码
sudo passwd username

# 添加用户到sudo组
sudo usermod -aG sudo username

# 修改文件权限
sudo chmod 600 sensitive_file
sudo chown username:group file
              `}</pre>
            </li>
            <li>
              SELinux配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看SELinux状态
sestatus

# 修改SELinux模式
sudo setenforce 1  # 强制模式
sudo setenforce 0  # 宽容模式

# 修改文件上下文
sudo chcon -t httpd_sys_content_t /var/www/html/index.html

# 查看文件上下文
ls -Z file
              `}</pre>
            </li>
            <li>
              防火墙配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 使用iptables配置防火墙
# 允许已建立的连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许SSH连接
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许HTTP和HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 拒绝其他所有入站连接
sudo iptables -A INPUT -j DROP

# 保存规则
sudo iptables-save > /etc/iptables.rules
              `}</pre>
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>网络安全：</b>
          <ul>
            <li>SSH安全配置</li>
            <li>SSL/TLS配置：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 生成SSL证书
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx.key \
    -out /etc/ssl/certs/nginx.crt

# Nginx SSL配置
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /etc/ssl/certs/nginx.crt;
    ssl_certificate_key /etc/ssl/private/nginx.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
}
              `}</pre>
            </li>
            <li>
              VPN配置（OpenVPN）：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 安装OpenVPN
sudo apt install openvpn

# 生成证书
sudo ./easyrsa build-ca
sudo ./easyrsa gen-req server nopass
sudo ./easyrsa sign-req server server

# 服务器配置
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
server 10.8.0.0 255.255.255.0
push "route 192.168.1.0 255.255.255.0"
push "dhcp-option DNS 8.8.8.8"
              `}</pre>
            </li>
            <li>
              入侵检测（Fail2ban）：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 安装Fail2ban
sudo apt install fail2ban

# 配置SSH防护
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

# 重启服务
sudo systemctl restart fail2ban
              `}</pre>
            </li>
            <li>
              网络监控（tcpdump）：
              <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 捕获所有网络流量
sudo tcpdump -i any

# 捕获特定端口的流量
sudo tcpdump -i eth0 port 80

# 捕获特定IP的流量
sudo tcpdump -i eth0 host 192.168.1.100

# 保存捕获的数据包
sudo tcpdump -i eth0 -w capture.pcap

# 读取保存的数据包
tcpdump -r capture.pcap
              `}</pre>
            </li>
          </ul>
        </Paragraph>
        <Alert
          message="安全建议"
          description={
            <ul>
              <li>定期更新系统和软件</li>
              <li>使用强密码策略</li>
              <li>限制SSH访问</li>
              <li>启用防火墙</li>
              <li>定期检查日志</li>
            </ul>
          }
          type="warning"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'troubleshooting',
    label: '故障排查',
    children: (
      <Card title="故障排查" className="mb-4">
        <Paragraph>
          <b>网络连通性测试：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 测试网络连通性
ping 8.8.8.8

# 路由追踪
traceroute www.baidu.com
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>查看网络接口和路由：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看网络接口
ip addr

# 查看路由表
ip route show
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>检查端口和连接：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看所有监听端口
netstat -tulnp

# 查看TCP/UDP连接
ss -tulnp
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>检查DNS：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 使用nslookup测试DNS解析
nslookup www.baidu.com

# 使用dig测试DNS解析
dig www.baidu.com
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>检查防火墙：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看iptables防火墙规则
sudo iptables -L -n -v
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>查看日志：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看系统日志
journalctl -xe

# 查看通用日志
cat /var/log/syslog
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>安全排查命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查看登录记录
last

# 查看失败登录记录
lastb

# 显示失败登录尝试
faillog -a

# 检查是否有rootkit
sudo chkrootkit

# 查找可疑SUID文件
find / -perm -4000
`}</pre>
        </Paragraph>
        <Alert
          message="排查工具"
          description={
            <ul>
              <li>ping、traceroute：网络连通性</li>
              <li>ip、netstat、ss：接口与端口</li>
              <li>nslookup、dig：DNS</li>
              <li>iptables：防火墙</li>
              <li>journalctl、log：日志</li>
            </ul>
          }
          type="success"
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
        <Paragraph>
          <b>tcpdump抓包分析：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 抓取80端口(HTTP)流量并保存到http.pcap
sudo tcpdump -i eth0 port 80 -w http.pcap
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>fail2ban防SSH暴力破解：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# fail2ban SSH防护配置片段
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>iptables只允许指定IP访问SSH：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 允许192.168.1.100访问SSH
sudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 22 -j ACCEPT
# 拒绝其他IP访问SSH
sudo iptables -A INPUT -p tcp --dport 22 -j DROP
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>高频面试题命令归纳：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 允许本地回环
sudo iptables -A INPUT -i lo -j ACCEPT
# 允许已建立连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# 允许指定端口
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
# 默认拒绝
sudo iptables -P INPUT DROP
`}</pre>
        </Paragraph>
        <Alert
          message="实战与面试要点"
          description={
            <ul>
              <li>掌握常用网络与安全命令</li>
              <li>熟悉典型配置与排查方法</li>
              <li>理解命令背后的原理</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
];

export default function LinuxNetworkPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>Linux网络与安全</Title>
      <Tabs defaultActiveKey="network" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/shell">
          上一章：Shell与脚本编程
        </Button>
        <Button type="primary" size="large" href="/study/linux/monitor">
          下一章：性能监控与日志管理
        </Button>
      </div>
    </div>
  );
} 