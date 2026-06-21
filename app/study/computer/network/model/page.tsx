"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: 'OSI七层模型',
    children: (
      <Card>
        <Paragraph>
          OSI（Open System Interconnection）模型是国际标准化组织提出的网络分层参考模型，将网络通信过程分为七层，每层各司其职。
        </Paragraph>
        <ul>
          <li>物理层：比特流的传输，接口标准、传输介质</li>
          <li>数据链路层：成帧、差错检测、流量控制，典型协议如以太网、PPP</li>
          <li>网络层：路由选择、逻辑寻址，典型协议如IP、ICMP</li>
          <li>传输层：端到端通信、可靠性，典型协议如TCP、UDP</li>
          <li>会话层：建立、管理和终止会话</li>
          <li>表示层：数据格式转换、加密解密、压缩</li>
          <li>应用层：为用户提供网络服务，典型协议如HTTP、FTP、SMTP</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：OSI七层模型结构 */}
          <svg width="320" height="260">
            {[...Array(7)].map((_, i) => (
              <g key={i}>
                <rect x="80" y={20 + i * 30} width="160" height="28" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="160" y={38 + i * 30} textAnchor="middle" fontSize="14" fill="#386ff6">
                  {['应用层','表示层','会话层','传输层','网络层','数据链路层','物理层'][6-i]}
                </text>
              </g>
            ))}
            <text x="160" y="245" textAnchor="middle" fontSize="13" fill="#888">OSI七层模型结构示意图</text>
          </svg>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: 'TCP/IP四层模型',
    children: (
      <Card>
        <Paragraph>
          TCP/IP模型是互联网实际采用的分层模型，共四层，简化了OSI模型。
        </Paragraph>
        <ul>
          <li>应用层：对应OSI的应用层、表示层、会话层，协议如HTTP、FTP、SMTP、DNS</li>
          <li>传输层：端到端通信，协议如TCP、UDP</li>
          <li>网络层（网际层）：路由与寻址，协议如IP、ICMP、ARP</li>
          <li>网络接口层（链路层）：物理传输，协议如以太网、PPP</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：TCP/IP四层模型结构 */}
          <svg width="320" height="170">
            {[...Array(4)].map((_, i) => (
              <g key={i}>
                <rect x="80" y={20 + i * 30} width="160" height="28" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="160" y={38 + i * 30} textAnchor="middle" fontSize="14" fill="#386ff6">
                  {['应用层','传输层','网际层','网络接口层'][3-i]}
                </text>
              </g>
            ))}
            <text x="160" y="155" textAnchor="middle" fontSize="13" fill="#888">TCP/IP四层模型结构示意图</text>
          </svg>
        </div>
      </Card>
    ),
  },
  {
    key: '3',
    label: '模型对比与联系',
    children: (
      <Card>
        <Paragraph>
          OSI与TCP/IP模型虽然层数不同，但核心思想一致，都采用分层结构，便于网络设计和实现。
        </Paragraph>
        <ul>
          <li>OSI模型理论性强，层次细致，便于教学和理解</li>
          <li>TCP/IP模型实用性强，互联网广泛采用，层次简化</li>
          <li>两者层次对应关系：
            <ul>
              <li>OSI的应用层、表示层、会话层 ≈ TCP/IP的应用层</li>
              <li>OSI的传输层 ≈ TCP/IP的传输层</li>
              <li>OSI的网络层 ≈ TCP/IP的网际层</li>
              <li>OSI的数据链路层、物理层 ≈ TCP/IP的网络接口层</li>
            </ul>
          </li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：OSI与TCPIP模型对比 */}
          <svg width="420" height="260">
            {/* OSI七层 */}
            {[...Array(7)].map((_, i) => (
              <g key={i}>
                <rect x="40" y={20 + i * 30} width="100" height="28" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="90" y={38 + i * 30} textAnchor="middle" fontSize="13" fill="#386ff6">
                  {['应用层','表示层','会话层','传输层','网络层','数据链路层','物理层'][6-i]}
                </text>
              </g>
            ))}
            {/* TCP/IP四层 */}
            {[...Array(4)].map((_, i) => (
              <g key={i}>
                <rect x="280" y={50 + i * 45} width="100" height="38" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="330" y={75 + i * 45} textAnchor="middle" fontSize="13" fill="#386ff6">
                  {['应用层','传输层','网际层','网络接口层'][3-i]}
                </text>
              </g>
            ))}
            {/* 对应箭头 */}
            <polygon points="140,35 280,65 280,75 140,45" fill="#386ff6" opacity="0.15"/>
            <polygon points="140,65 280,110 280,120 140,75" fill="#386ff6" opacity="0.15"/>
            <polygon points="140,95 280,155 280,165 140,105" fill="#386ff6" opacity="0.15"/>
            <polygon points="140,125 280,200 280,210 140,135" fill="#386ff6" opacity="0.15"/>
            <text x="210" y="250" textAnchor="middle" fontSize="13" fill="#888">OSI与TCP/IP模型对比示意图</text>
          </svg>
        </div>
      </Card>
    ),
  },
];

const prevHref = "/study/network/comm-principle";
const nextHref = "/study/network/link";

const ModelPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>OSI与TCP/IP模型</Title>
        <Paragraph>
          本章详细介绍OSI七层模型与TCP/IP四层模型的结构、功能及其对比，帮助你理解网络分层思想。
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
          上一章：网络通信原理
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
          下一章：物理层与数据链路层
        </a>
      </div>
    </div>
  );
};

export default ModelPage; 