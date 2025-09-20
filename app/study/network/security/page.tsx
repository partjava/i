"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '防火墙与ACL',
    children: (
      <Card>
        <Paragraph>
          防火墙和访问控制列表（ACL）是网络安全的基础手段，主要通过IP地址、端口等信息对数据包进行过滤和控制。
        </Paragraph>
        <ul>
          <li>防火墙根据源IP、目的IP、端口等规则决定是否允许数据包通过</li>
          <li>ACL常用于路由器、交换机上，基于IP地址进行访问控制</li>
        </ul>
        <Title level={4}>防火墙过滤流程与IP关系</Title>
        <ol>
          <li>数据包到达防火墙，检查<b>源IP</b>和<b>目的IP</b></li>
          <li>根据安全策略判断是否允许转发到目标主机</li>
          <li>若被拒绝，数据包被丢弃，无法到达终点IP</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：防火墙过滤流程 */}
          <svg width="700" height="180">
            {/* 外部主机 */}
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">外部主机</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 8.8.8.8</text>
            {/* 防火墙 */}
            <rect x="200" y="60" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#faad14">防火墙</text>
            {/* 内部服务器 */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">内部服务器</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 192.168.1.10</text>
            {/* 箭头 */}
            <line x1="150" y1="80" x2="200" y2="80" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>防火墙根据源IP和目的IP决定数据包能否到达终点</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          某防火墙规则禁止8.8.8.8访问192.168.1.10，若外部主机8.8.8.8尝试访问内部服务器192.168.1.10，数据包能否到达？请说明IP的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>数据包的源IP为8.8.8.8，目的IP为192.168.1.10</li>
            <li>防火墙检查到该规则，拒绝转发，数据包被丢弃</li>
            <li>数据包无法到达终点IP（192.168.1.10）</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: 'NAT与IP映射',
    children: (
      <Card>
        <Paragraph>
          NAT（网络地址转换）用于在私有网络和公网之间转换IP地址，实现地址复用和隐藏内部结构。
        </Paragraph>
        <ul>
          <li>源IP和/或目的IP在NAT设备处被转换</li>
          <li>常见有SNAT（源地址转换）、DNAT（目的地址转换）</li>
        </ul>
        <Title level={4}>NAT转换流程与IP关系</Title>
        <ol>
          <li>内部主机发送数据包，<b>源IP为私有地址</b></li>
          <li>NAT设备将源IP转换为公网IP，转发到目标主机</li>
          <li>响应数据包返回时，NAT设备将目的IP转换回内部主机IP</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：NAT转换流程 */}
          <svg width="700" height="180">
            {/* 内部主机 */}
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">内部主机</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 192.168.1.2</text>
            {/* NAT设备 */}
            <rect x="200" y="60" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#faad14">NAT设备</text>
            {/* 公网主机 */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">公网主机</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 8.8.8.8</text>
            {/* 箭头 */}
            <line x1="150" y1="80" x2="200" y2="80" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>NAT设备将源IP/目的IP进行转换，实现私有网络与公网通信</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          内部主机192.168.1.2访问公网主机8.8.8.8，NAT设备如何处理IP地址？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>内部主机发出数据包，源IP为192.168.1.2，目的IP为8.8.8.8</li>
            <li>NAT设备将源IP转换为公网IP（如203.0.113.5），转发到8.8.8.8</li>
            <li>响应包返回时，NAT设备将目的IP转换回192.168.1.2</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'IP欺骗与DDoS',
    children: (
      <Card>
        <Paragraph>
          IP欺骗和DDoS攻击是常见的网络攻击方式，均与IP地址密切相关。
        </Paragraph>
        <ul>
          <li>IP欺骗：攻击者伪造源IP，迷惑目标主机</li>
          <li>DDoS：大量主机向同一目的IP发起攻击，耗尽目标资源</li>
        </ul>
        <Title level={4}>攻击流程与IP关系</Title>
        <ol>
          <li>攻击者伪造源IP或控制大量主机，向目标IP发送大量数据包</li>
          <li>数据包在网络中路由，最终到达目标主机（终点IP）</li>
          <li>目标主机资源耗尽，服务中断</li>
        </ol>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：DDoS攻击流程 */}
          <svg width="700" height="180">
            {/* 攻击者群体 */}
            <rect x="30" y="30" width="120" height="40" fill="#fff1f0" stroke="#ff4d4f" rx="8"/>
            <text x="90" y="55" textAnchor="middle" fontSize="14" fill="#ff4d4f">攻击者群体</text>
            <text x="90" y="75" textAnchor="middle" fontSize="12" fill="#888">伪造/真实源IP</text>
            {/* 互联网云 */}
            <ellipse cx="400" cy="80" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="400" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            {/* 目标主机 */}
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">目标主机</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 203.0.113.10</text>
            {/* 箭头 */}
            <line x1="150" y1="50" x2="340" y2="80" stroke="#ff4d4f" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="460" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#ff4d4f" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>DDoS攻击：大量数据包最终到达目标主机（终点IP），导致服务瘫痪</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          DDoS攻击中，为什么目标主机的IP地址是攻击的关键？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>攻击者通过大量主机向同一目的IP发送数据包</li>
            <li>数据包在网络中路由，最终都到达目标主机（终点IP）</li>
            <li>目标主机因接收过多数据包，资源耗尽，服务中断</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/vpn-proxy";
const nextHref = "/study/network/cloud-newtech";

const SecurityPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络安全</Title>
        <Paragraph>
          本章详细介绍防火墙、ACL、NAT、IP欺骗、DDoS等网络安全机制与攻击方式，突出所有安全机制、攻击防护都与IP相关，所有通信流程、例题、流程图都明确写出终点IP的作用和数据包如何到达目标主机或被拦截。
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
          ← 上一章：VPN与代理技术
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
          下一章：云网络与新技术 →
        </a>
      </div>
    </div>
  );
};

export default SecurityPage; 