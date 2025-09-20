"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: 'HTTP协议',
    children: (
      <Card>
        <Paragraph>
          HTTP（超文本传输协议）是Web通信的基础协议，工作在应用层。
        </Paragraph>
        <ul>
          <li>基于请求-响应模式</li>
          <li>通常运行在TCP之上，端口号80</li>
          <li>通信前需通过DNS解析获得目标主机IP</li>
        </ul>
        <Title level={4}>HTTP通信流程与IP关系</Title>
        <ol>
          <li>用户输入URL（如http://www.example.com）</li>
          <li>浏览器通过DNS解析获得目标主机IP地址</li>
          <li>HTTP请求数据封装在TCP段，再封装在IP包，<b>目的IP为目标主机IP</b></li>
          <li>数据包在网络中通过路由器转发，最终到达目标主机</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：HTTP请求与IP寻址流程 */}
          <svg width="700" height="180">
            {/* 客户端 */}
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 192.168.1.2</text>
            {/* 路由器 */}
            <rect x="200" y="60" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">路由器</text>
            {/* 互联网云 */}
            <ellipse cx="400" cy="80" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="400" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            {/* 目标主机 */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">Web服务器</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 203.0.113.10</text>
            {/* 箭头 */}
            <line x1="150" y1="80" x2="200" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="80" x2="340" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="460" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#386ff6" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>HTTP请求：源IP→目的IP，数据包经路由器和互联网转发到目标主机</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          用户访问http://www.example.com，简述数据包从客户端到服务器的全过程，特别说明IP地址的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>浏览器通过DNS解析获得www.example.com的IP地址（如203.0.113.10）</li>
            <li>HTTP请求数据封装在TCP段，再封装在IP包，<b>目的IP为203.0.113.10</b></li>
            <li>数据包从客户端（源IP: 192.168.1.2）出发，经路由器和互联网转发，最终到达服务器（目的IP: 203.0.113.10）</li>
            <li>服务器收到数据包后，解析HTTP请求并响应</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: 'DNS协议',
    children: (
      <Card>
        <Paragraph>
          DNS（域名系统）用于将域名解析为IP地址，便于主机间通信。
        </Paragraph>
        <ul>
          <li>基于UDP（有时TCP）传输，端口号53</li>
          <li>每次查询都需指定目标DNS服务器的IP</li>
        </ul>
        <Title level={4}>DNS查询流程与IP关系</Title>
        <ol>
          <li>客户端向本地DNS服务器发送查询请求，<b>目的IP为DNS服务器IP</b></li>
          <li>若本地DNS无法解析，则递归/迭代查询其他DNS服务器，每次都根据目的IP路由到下一个DNS服务器</li>
          <li>最终获得目标主机的IP地址</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：DNS查询流程 */}
          <svg width="700" height="180">
            {/* 客户端 */}
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 192.168.1.2</text>
            {/* 本地DNS */}
            <rect x="200" y="60" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">本地DNS</text>
            <text x="260" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 114.114.114.114</text>
            {/* 权威DNS */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">权威DNS</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 198.51.100.1</text>
            {/* 箭头 */}
            <line x1="150" y1="80" x2="200" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#386ff6" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>DNS查询：每次请求都封装为UDP报文，外层IP包的目的地址为目标DNS服务器IP</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          DNS查询过程中，数据包如何到达权威DNS服务器？请写出IP相关过程。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>客户端将查询请求封装为UDP报文，外层IP包的目的地址为本地DNS服务器IP（如114.114.114.114）</li>
            <li>若本地DNS无法解析，则递归/迭代查询权威DNS服务器，数据包每次都根据目的IP路由到下一个DNS服务器（如198.51.100.1）</li>
            <li>路由器根据目的IP转发，最终到达权威DNS服务器</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'SMTP协议',
    children: (
      <Card>
        <Paragraph>
          SMTP（简单邮件传输协议）用于邮件发送，POP3/IMAP用于邮件接收。
        </Paragraph>
        <ul>
          <li>SMTP通常运行在TCP之上，端口号25</li>
          <li>邮件发送时，数据包的<b>目的IP为目标邮件服务器IP</b></li>
        </ul>
        <Title level={4}>SMTP通信流程与IP关系</Title>
        <ol>
          <li>客户端准备邮件内容，封装为SMTP报文</li>
          <li>SMTP报文封装在TCP段，再封装在IP包，<b>目的IP为目标邮件服务器IP</b></li>
          <li>数据包通过路由器和互联网转发，最终到达目标邮件服务器</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：SMTP邮件发送流程 */}
          <svg width="700" height="180">
            {/* 客户端 */}
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">发件人客户端</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 192.168.1.2</text>
            {/* 路由器 */}
            <rect x="200" y="60" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8"/>
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">路由器</text>
            {/* 互联网云 */}
            <ellipse cx="400" cy="80" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="400" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            {/* 目标邮件服务器 */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">邮件服务器</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 203.0.113.20</text>
            {/* 箭头 */}
            <line x1="150" y1="80" x2="200" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="80" x2="340" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="460" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#386ff6" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>SMTP邮件发送：源IP→目的IP，数据包经路由器和互联网转发到目标邮件服务器</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          SMTP发送邮件时，数据包如何到达目标邮件服务器？请说明IP的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>邮件内容封装为SMTP报文，外层IP包的目的地址为目标邮件服务器IP（如203.0.113.20）</li>
            <li>数据包从客户端（源IP: 192.168.1.2）出发，经路由器和互联网转发，最终到达目标邮件服务器（目的IP: 203.0.113.20）</li>
            <li>服务器收到数据包后，解析邮件内容并存储</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/tcp-udp";
const nextHref = "/study/network/lan-wan";

const ApplicationPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>应用层协议</Title>
        <Paragraph>
          本章详细介绍HTTP、DNS、SMTP等应用层协议，突出每个协议与IP的关系，所有通信流程、例题、流程图都明确写出终点IP的作用和数据包如何到达目标主机。
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
          上一章：TCP与UDP
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
          下一章：局域网与广域网
        </a>
      </div>
    </div>
  );
};

export default ApplicationPage; 