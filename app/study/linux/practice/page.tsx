"use client";

import React from 'react';
import { Typography, Card, Alert, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function LinuxPracticePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>实战与面试</Title>
      <Card title="实战操作" className="mb-4">
        <Paragraph>
          <b>抓包分析（tcpdump）：</b>
          <pre>{`
# 抓取80端口(HTTP)流量并保存到http.pcap
sudo tcpdump -i eth0 port 80 -w http.pcap

# 读取分析抓包文件
tcpdump -r http.pcap
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>日志分析：</b>
          <pre>{`
# 查看最近的系统日志
journalctl -xe

# 检查SSH登录失败
cat /var/log/auth.log | grep 'Failed password'
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>服务排障：</b>
          <pre>{`
# 检查Nginx服务状态
sudo systemctl status nginx

# 查看Nginx错误日志
cat /var/log/nginx/error.log
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>权限加固：</b>
          <pre>{`
# 禁止root远程登录
sudo nano /etc/ssh/sshd_config
# 修改为：
PermitRootLogin no

# 只允许指定用户登录
AllowUsers user1 user2

# 重启SSH服务
sudo systemctl restart sshd
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>防火墙配置：</b>
          <pre>{`
# 只允许指定IP访问SSH
sudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j DROP
`}</pre>
        </Paragraph>
        <Alert
          message="实战要点"
          description={
            <ul>
              <li>掌握抓包、日志分析、服务排障等常用技能</li>
              <li>熟悉权限加固与防火墙配置</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
      <Card title="高频面试题" className="mb-4">
        <Paragraph>
          <b>如何排查Linux下的网络故障？</b>
          <pre>{`
# 检查物理连接和网卡状态
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
journalctl -xe
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>如何加固Linux服务器的SSH安全？</b>
          <pre>{`
# 修改默认端口
sudo nano /etc/ssh/sshd_config
Port 2222

# 禁用root远程登录
PermitRootLogin no

# 使用密钥认证
# 生成密钥对
ssh-keygen -t rsa
# 上传公钥到服务器
ssh-copy-id user@server
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>iptables常用配置有哪些？</b>
          <pre>{`
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
          message="面试要点"
          description={
            <ul>
              <li>面试注重实际操作与思路</li>
              <li>答题时结合命令和原理</li>
            </ul>
          }
          type="success"
          showIcon
        />
      </Card>
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/monitor">
          上一章：性能监控与日志管理
        </Button>
        <Button type="primary" size="large" href="/study/linux">
          返回Linux目录
        </Button>
      </div>
    </div>
  );
} 