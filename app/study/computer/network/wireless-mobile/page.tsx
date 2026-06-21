"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '无线局域网（WLAN）与Wi-Fi',
    children: (
      <Card>
        <Paragraph>
          无线局域网（WLAN）是通过无线信号实现主机互联的局域网，最常见的实现是Wi-Fi（基于IEEE 802.11标准）。
        </Paragraph>
        <ul>
          <li>典型设备：无线AP（接入点）、无线路由器、无线网卡</li>
          <li>常用协议：802.11a/b/g/n/ac/ax</li>
          <li>IP分配：通常由无线路由器通过DHCP分配私有IP</li>
        </ul>
        <Title level={4}>WLAN结构与IP通信</Title>
        <Paragraph>
          无线主机通过AP接入网络，数据包通过IP地址定位终点主机。
        </Paragraph>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：无线局域网结构 */}
          <svg width="600" height="160">
            {/* AP */}
            <rect x="260" y="60" width="80" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">无线AP</text>
            {/* 主机A */}
            <rect x="60" y="30" width="80" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="100" y="55" textAnchor="middle" fontSize="14" fill="#386ff6">主机A</text>
            <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#888">IP: 192.168.1.10</text>
            {/* 主机B */}
            <rect x="60" y="110" width="80" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="100" y="135" textAnchor="middle" fontSize="14" fill="#386ff6">主机B</text>
            <text x="100" y="155" textAnchor="middle" fontSize="12" fill="#888">IP: 192.168.1.11</text>
            {/* 路由器 */}
            <rect x="460" y="60" width="80" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="500" y="85" textAnchor="middle" fontSize="14" fill="#faad14">路由器</text>
            {/* 线条和无线波 */}
            <line x1="140" y1="50" x2="260" y2="80" stroke="#386ff6" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="140" y1="130" x2="260" y2="100" stroke="#386ff6" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="340" y1="80" x2="460" y2="80" stroke="#faad14" strokeWidth="2"/>
            <path d="M180,60 Q200,40 220,60" stroke="#386ff6" strokeWidth="2" fill="none"/>
            <path d="M180,120 Q200,140 220,120" stroke="#386ff6" strokeWidth="2" fill="none"/>
          </svg>
          <div style={{color:'#888'}}>无线主机通过AP接入网络，终点IP用于定位目标主机</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          无线主机A（192.168.1.10）如何向主机B（192.168.1.11）发送数据？请说明IP的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>主机A构造数据包，目的IP为192.168.1.11</li>
            <li>数据包通过无线信号到达AP，再转发到主机B</li>
            <li>AP根据MAC地址转发，IP地址用于确定目标主机</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: '蓝牙与短距离无线',
    children: (
      <Card>
        <Paragraph>
          蓝牙（Bluetooth）和ZigBee等短距离无线技术，常用于设备间点对点或小范围组网。
        </Paragraph>
        <ul>
          <li>典型应用：无线耳机、智能家居、物联网终端</li>
          <li>通信距离：蓝牙约10米，ZigBee约100米</li>
          <li>IP分配：部分物联网协议支持IPv6寻址</li>
        </ul>
        <Title level={4}>蓝牙组网结构</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：蓝牙点对点与星型组网 */}
          <svg width="400" height="120">
            {/* 主设备 */}
            <circle cx="200" cy="60" r="20" fill="#e3eafe" stroke="#386ff6"/>
            <text x="200" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">主设备</text>
            {/* 从设备 */}
            <circle cx="80" cy="30" r="14" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">A</text>
            <circle cx="80" cy="90" r="14" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="95" textAnchor="middle" fontSize="12" fill="#386ff6">B</text>
            <circle cx="320" cy="30" r="14" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">C</text>
            <circle cx="320" cy="90" r="14" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="95" textAnchor="middle" fontSize="12" fill="#386ff6">D</text>
            <line x1="200" y1="60" x2="80" y2="30" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="80" y2="90" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="320" y2="30" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="320" y2="90" stroke="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>蓝牙星型组网：主设备与多个从设备通信</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          蓝牙主设备如何与多个从设备通信？IP地址在物联网中的作用是什么？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>主设备通过无线信号与各从设备建立连接</li>
            <li>部分物联网协议支持为每个设备分配IPv6地址，实现远程寻址</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: '蜂窝移动网络（2G/3G/4G/5G）',
    children: (
      <Card>
        <Paragraph>
          蜂窝移动网络通过基站实现大范围无线覆盖，支持移动终端高速接入互联网。
        </Paragraph>
        <ul>
          <li>典型技术：GSM、CDMA、LTE、5G NR</li>
          <li>IP分配：移动终端通过运营商分配公网/私网IP</li>
          <li>支持高速移动、广域覆盖</li>
        </ul>
        <Title level={4}>蜂窝网络结构与IP寻址</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：蜂窝网络结构 */}
          <svg width="600" height="160">
            {/* 基站 */}
            <rect x="260" y="60" width="80" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">基站</text>
            {/* 手机A */}
            <rect x="60" y="30" width="80" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="100" y="55" textAnchor="middle" fontSize="14" fill="#386ff6">手机A</text>
            <text x="100" y="75" textAnchor="middle" fontSize="12" fill="#888">IP: 10.0.0.10</text>
            {/* 手机B */}
            <rect x="60" y="110" width="80" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="100" y="135" textAnchor="middle" fontSize="14" fill="#386ff6">手机B</text>
            <text x="100" y="155" textAnchor="middle" fontSize="12" fill="#888">IP: 10.0.0.11</text>
            {/* 互联网 */}
            <ellipse cx="500" cy="80" rx="50" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="500" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            {/* 线条和无线波 */}
            <line x1="140" y1="50" x2="260" y2="80" stroke="#386ff6" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="140" y1="130" x2="260" y2="100" stroke="#386ff6" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="340" y1="80" x2="450" y2="80" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>移动终端通过基站接入互联网，IP地址用于全球唯一寻址</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          手机A（10.0.0.10）如何通过蜂窝网络访问互联网？请说明IP的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>手机A通过基站接入运营商网络，获得IP地址</li>
            <li>数据包通过基站、运营商核心网转发到互联网</li>
            <li>IP地址确保数据包能准确到达互联网目标主机</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '4',
    label: '无线网络安全与挑战',
    children: (
      <Card>
        <Paragraph>
          无线与移动网络面临信号干扰、窃听、伪造接入点等安全威胁。
        </Paragraph>
        <ul>
          <li>常见攻击：Wi-Fi钓鱼、信号劫持、未加密通信被窃听</li>
          <li>安全措施：WPA3加密、MAC过滤、VPN隧道</li>
        </ul>
        <Title level={4}>无线网络安全结构图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：无线安全防护 */}
          <svg width="600" height="120">
            {/* AP */}
            <rect x="260" y="40" width="80" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">无线AP</text>
            {/* 主机A */}
            <rect x="60" y="20" width="80" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="100" y="45" textAnchor="middle" fontSize="14" fill="#386ff6">主机A</text>
            {/* 攻击者 */}
            <rect x="60" y="80" width="80" height="40" fill="#fff1f0" stroke="#ff4d4f" rx="8"/>
            <text x="100" y="105" textAnchor="middle" fontSize="14" fill="#ff4d4f">攻击者</text>
            {/* 互联网 */}
            <ellipse cx="500" cy="60" rx="50" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="500" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            {/* 线条和无线波 */}
            <line x1="140" y1="40" x2="260" y2="60" stroke="#386ff6" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="140" y1="100" x2="260" y2="60" stroke="#ff4d4f" strokeWidth="2" strokeDasharray="4,4"/>
            <line x1="340" y1="60" x2="450" y2="60" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>无线网络安全：攻击者可伪造AP或窃听通信，需加密防护</div>
        </div>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 为什么无线网络更容易受到窃听和伪造攻击？
        </Paragraph>
        <Paragraph>
          2. 如何提升无线与移动网络的安全性？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/lan-wan";
const nextHref = "/study/network/vpn-proxy";

const WirelessMobilePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>无线与移动网络</Title>
        <Paragraph>
          本章介绍无线局域网（WLAN）、Wi-Fi、蓝牙、蜂窝移动网络等无线通信技术，重点讲解无线网络的IP寻址、终点通信与安全问题，配合结构图和例题帮助理解。
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
          上一章：局域网与广域网
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
          下一章：VPN与代理技术
        </a>
      </div>
    </div>
  );
};

export default WirelessMobilePage; 