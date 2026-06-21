"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '物理层',
    children: (
      <Card>
        <Paragraph>
          物理层负责比特流的传输，是网络通信的基础。它定义了硬件设备的电气、机械、过程和功能特性。
        </Paragraph>
        <ul>
          <li>主要功能：实现0/1比特的透明传输</li>
          <li>常见设备：集线器、网线、光纤、调制解调器</li>
          <li>信号与编码：曼彻斯特编码、NRZ编码等</li>
          <li>传输介质：双绞线、同轴电缆、光纤、无线</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：物理层传输示意 */}
          <svg width="400" height="80">
            <rect x="30" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="60" y="50" textAnchor="middle" fontSize="14">主机A</text>
            <rect x="310" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="340" y="50" textAnchor="middle" fontSize="14">主机B</text>
            <rect x="110" y="40" width="180" height="10" fill="#386ff6" rx="5"/>
            <text x="200" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">物理介质</text>
          </svg>
          <div style={{color:'#888'}}>物理层比特流传输示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '数据链路层',
    children: (
      <Card>
        <Paragraph>
          数据链路层负责在物理层提供可靠的数据传输，主要实现成帧、差错检测、流量控制等功能。
        </Paragraph>
        <ul>
          <li>成帧：将比特流划分为帧，便于管理和差错检测</li>
          <li>差错检测：常用CRC校验、奇偶校验</li>
          <li>流量控制：防止发送方过快导致接收方缓冲区溢出</li>
          <li>常见协议：以太网、PPP、HDLC</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：数据链路层成帧与校验 */}
          <svg width="400" height="80">
            <rect x="30" y="40" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="60" y="55" textAnchor="middle" fontSize="12">帧头</text>
            <rect x="100" y="40" width="200" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="200" y="55" textAnchor="middle" fontSize="12">数据</text>
            <rect x="310" y="40" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="340" y="55" textAnchor="middle" fontSize="12">帧尾/校验</text>
          </svg>
          <div style={{color:'#888'}}>数据链路层成帧与校验示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '3',
    label: '两者关系与应用',
    children: (
      <Card>
        <Paragraph>
          物理层与数据链路层紧密配合，共同实现数据的可靠传输。物理层负责比特流的传输，数据链路层负责帧的可靠传递。
        </Paragraph>
        <ul>
          <li>物理层提供原始比特流，数据链路层将其组织成帧</li>
          <li>数据链路层通过差错检测和流量控制提升传输可靠性</li>
          <li>实际网络中，二者常集成在网卡、交换机等设备中</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：物理层与数据链路层协作 */}
          <svg width="400" height="100">
            <rect x="40" y="30" width="320" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="200" y="45" textAnchor="middle" fontSize="13">物理层：比特流传输</text>
            <rect x="100" y="60" width="200" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="200" y="75" textAnchor="middle" fontSize="13">数据链路层：帧的传输与校验</text>
          </svg>
          <div style={{color:'#888'}}>物理层与数据链路层协作示意图</div>
        </div>
      </Card>
    ),
  },
];

const prevHref = "/study/network/model";
const nextHref = "/study/network/ip-routing";

const LinkPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>物理层与数据链路层</Title>
        <Paragraph>
          本章详细介绍物理层与数据链路层的功能、实现方式及其在实际网络中的应用。
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
          上一章：OSI与TCPIP模型
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
          下一章：IP与路由
        </a>
      </div>
    </div>
  );
};

export default LinkPage; 