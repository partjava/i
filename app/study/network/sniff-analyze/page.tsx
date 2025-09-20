"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '抓包工具与原理',
    children: (
      <Card>
        <Paragraph>
          抓包是指捕获网络中传输的数据包，常用工具有Wireshark、tcpdump等。抓包可用于协议分析、故障排查和安全检测。
        </Paragraph>
        <ul>
          <li>Wireshark：图形化抓包与协议分析工具，支持多种协议解析</li>
          <li>tcpdump：命令行抓包工具，适合快速定位问题</li>
          <li>原理：通过网卡混杂模式捕获经过主机的所有数据包</li>
        </ul>
        <Title level={4}>典型抓包流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：抓包流程 */}
          <svg width="700" height="120">
            {/* 终端主机 */}
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">终端主机</text>
            {/* 抓包工具 */}
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">抓包工具</text>
            {/* 网络流量 */}
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">网络流量</text>
            {/* 线条 */}
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2"/>
            <line x1="400" y1="60" x2="540" y2="60" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>抓包工具捕获主机与网络间的所有数据包</div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '常见协议分析方法',
    children: (
      <Card>
        <Paragraph>
          协议分析是指对捕获的数据包进行解码和内容解析，常见协议有HTTP、TCP、DNS等。
        </Paragraph>
        <ul>
          <li>HTTP：分析请求/响应头、内容、状态码等</li>
          <li>TCP：分析三次握手、四次挥手、重传等过程</li>
          <li>DNS：分析域名解析请求与响应</li>
        </ul>
        <Title level={4}>协议分析流程</Title>
        <Paragraph>
          通过抓包工具查看协议字段，结合协议规范判断通信过程是否正常。
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: '抓包与协议分析应用',
    children: (
      <Card>
        <Paragraph>
          抓包与协议分析广泛应用于网络故障排查、安全检测、性能优化等场景。
        </Paragraph>
        <ul>
          <li>排查网络连接异常、丢包、延迟等问题</li>
          <li>检测恶意流量、入侵行为</li>
          <li>分析应用层协议性能瓶颈</li>
        </ul>
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
          使用Wireshark抓包时，如何定位TCP三次握手过程？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>在Wireshark中过滤"tcp.handshake"或"tcp.flags.syn==1"</li>
            <li>观察SYN、SYN-ACK、ACK三个数据包的时序</li>
            <li>结合源/目的IP和端口判断连接双方</li>
          </ol>
        </Paragraph>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 为什么抓包工具需要网卡混杂模式？
        </Paragraph>
        <Paragraph>
          2. 如何通过协议分析发现网络安全隐患？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/cloud-newtech";
const nextHref = "/study/network/config-manage";

const SniffAnalyzePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络抓包与协议分析</Title>
        <Paragraph>
          本章介绍抓包工具原理、常见协议分析方法及其在网络排障与安全中的应用，配合流程图和例题帮助理解。
        </Paragraph>
      </Typography>

      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginBottom: 32 }} />

      <Divider />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '48px 0 0 0' }}>
        <a
          href={prevHref}
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          ← 上一章：云网络与新技术
        </a>
        <a
          href={nextHref}
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '16px',
            fontSize: 18,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          下一章：网络配置与管理 →
        </a>
      </div>
    </div>
  );
};

export default SniffAnalyzePage; 