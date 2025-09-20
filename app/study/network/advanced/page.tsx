"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider, Table } from 'antd';

const { Title, Paragraph } = Typography;

const commandData = [
  { cmd: 'ping', desc: '测试主机连通性', example: 'ping www.baidu.com', tips: '可加-t持续测试，-n指定次数' },
  { cmd: 'tracert/traceroute', desc: '路由路径追踪', example: 'tracert www.baidu.com', tips: 'Linux用traceroute' },
  { cmd: 'ipconfig/ifconfig', desc: '查看/配置IP地址', example: 'ipconfig /all', tips: 'Linux用ifconfig或ip addr' },
  { cmd: 'netstat', desc: '查看网络连接与端口', example: 'netstat -an', tips: '-a显示所有，-n数字显示，-o显示PID' },
  { cmd: 'telnet', desc: '测试端口连通性', example: 'telnet 192.168.1.1 80', tips: '如无telnet需先安装' },
  { cmd: 'ssh', desc: '远程安全登录', example: 'ssh user@192.168.1.10', tips: '常用于Linux远程管理' },
  { cmd: 'curl', desc: '命令行HTTP请求', example: 'curl https://www.baidu.com', tips: '-I仅请求头，-d发送数据' },
  { cmd: 'arp', desc: '查看/管理ARP缓存', example: 'arp -a', tips: '可用于排查IP-MAC映射' },
  { cmd: 'route', desc: '查看/管理路由表', example: 'route print', tips: 'Linux用route -n或ip route' },
  { cmd: 'nslookup', desc: 'DNS解析测试', example: 'nslookup www.baidu.com', tips: '可指定DNS服务器' },
  { cmd: 'nmap', desc: '端口/主机扫描', example: 'nmap -sS 192.168.1.1', tips: '需单独安装，功能强大' },
];

const columns = [
  { title: '命令', dataIndex: 'cmd', key: 'cmd' },
  { title: '功能说明', dataIndex: 'desc', key: 'desc' },
  { title: '常用示例', dataIndex: 'example', key: 'example' },
  { title: '实用技巧', dataIndex: 'tips', key: 'tips' },
];

const tabItems = [
  {
    key: '1',
    label: '常用网络技巧',
    children: (
      <Card>
        <Paragraph>
          本节介绍电脑常用的网络诊断、排障与优化技巧，涵盖抓包、端口测试、远程连接等实用操作。
        </Paragraph>
        <ul>
          <li>网络连通性测试与路由追踪</li>
          <li>端口与服务状态检测</li>
          <li>远程登录与文件传输</li>
          <li>DNS与ARP排障</li>
          <li>批量脚本与自动化运维</li>
        </ul>
      </Card>
    ),
  },
  {
    key: '2',
    label: '终端命令与用法',
    children: (
      <Card>
        <Paragraph>
          下表汇总了常用网络命令的功能、用法与实用技巧，适用于Windows与Linux终端。
        </Paragraph>
        <Table columns={columns} dataSource={commandData} pagination={false} bordered size="middle" rowKey="cmd" style={{margin:'16px 0'}} />
      </Card>
    ),
  },
  {
    key: '3',
    label: '故障排查与优化建议',
    children: (
      <Card>
        <Paragraph>
          网络故障排查建议：
        </Paragraph>
        <ol>
          <li>先本地ping/ifconfig排查自身网络</li>
          <li>tracert/traceroute定位链路故障点</li>
          <li>netstat/arp/route分析端口与路由</li>
          <li>telnet/ssh/curl测试服务可达性</li>
          <li>结合抓包工具（如Wireshark）分析协议细节</li>
        </ol>
        <Paragraph>
          优化建议：合理配置DNS、定期清理ARP缓存、关闭无用端口、使用自动化脚本批量管理。
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '4',
    label: '例题与思考题',
    children: (
      <Card>
        <b>例题：</b>
        <Paragraph>
          某主机无法访问外网，如何用终端命令快速定位问题？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>用ipconfig/ifconfig检查本地IP与网关</li>
            <li>ping网关、8.8.8.8、域名，判断故障环节</li>
            <li>tracert/traceroute追踪路由路径</li>
            <li>nslookup测试DNS解析</li>
            <li>netstat/arp/route排查端口与路由</li>
          </ol>
        </Paragraph>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 如何用nmap快速发现局域网内存活主机？
        </Paragraph>
        <Paragraph>
          2. 批量脚本如何提升网络运维效率？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/interview";

const AdvancedPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络进阶与拓展</Title>
        <Paragraph>
          本章介绍电脑常用网络技巧与终端命令，涵盖诊断、抓包、远程、端口、路由、DNS等实用操作，配合命令表格和排障建议，助力实际工作。
        </Paragraph>
      </Typography>

      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginBottom: 32 }} />

      <Divider />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', margin: '48px 0 0 0' }}>
        <a
          href={prevHref}
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 36px 12px 28px',
            borderRadius: '20px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#2055c7';
            e.currentTarget.style.transform = 'scale(1.04)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(56,111,246,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#386ff6';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(56,111,246,0.15)';
          }}
        >
          <span style={{fontSize:22,marginRight:6,display:'flex',alignItems:'center'}}>&larr;</span>
          上一章：面试题与答疑
        </a>
      </div>
    </div>
  );
};

export default AdvancedPage; 