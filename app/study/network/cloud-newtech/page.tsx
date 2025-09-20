"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '云网络基本概念',
    children: (
      <Card>
        <Paragraph>
          云网络是指基于云计算平台构建的虚拟化网络环境，支持弹性资源分配、按需服务和多租户隔离。
        </Paragraph>
        <ul>
          <li>核心特征：虚拟化、弹性伸缩、集中管理、自动化运维</li>
          <li>典型结构：云数据中心、虚拟交换机、虚拟路由器、云主机</li>
        </ul>
        <Title level={4}>云网络结构图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：云网络结构 */}
          <svg width="700" height="180">
            {/* 云平台 */}
            <ellipse cx="350" cy="60" rx="80" ry="40" fill="#e3eafe" stroke="#386ff6" />
            <text x="350" y="65" textAnchor="middle" fontSize="16" fill="#386ff6">云平台</text>
            {/* 虚拟交换机 */}
            <rect x="120" y="120" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="180" y="145" textAnchor="middle" fontSize="14" fill="#faad14">虚拟交换机</text>
            <rect x="460" y="120" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="520" y="145" textAnchor="middle" fontSize="14" fill="#faad14">虚拟路由器</text>
            {/* 云主机 */}
            <rect x="60" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="90" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机A</text>
            <rect x="200" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="230" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机B</text>
            <rect x="500" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="530" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机C</text>
            {/* 线条 */}
            <line x1="350" y1="100" x2="180" y2="120" stroke="#386ff6" strokeWidth="2"/>
            <line x1="350" y1="100" x2="520" y2="120" stroke="#386ff6" strokeWidth="2"/>
            <line x1="180" y1="160" x2="90" y2="160" stroke="#faad14" strokeWidth="2"/>
            <line x1="180" y1="160" x2="230" y2="160" stroke="#faad14" strokeWidth="2"/>
            <line x1="520" y1="160" x2="530" y2="160" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>云平台通过虚拟交换机、虚拟路由器连接多台云主机</div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '云服务与新技术',
    children: (
      <Card>
        <Paragraph>
          云服务分为IaaS、PaaS、SaaS三种主要类型，支撑多样化的业务需求。新兴技术如SDN（软件定义网络）、NFV（网络功能虚拟化）、云安全等推动云网络发展。
        </Paragraph>
        <ul>
          <li>IaaS：基础设施即服务，提供虚拟机、存储、网络等资源</li>
          <li>PaaS：平台即服务，提供开发、运行环境</li>
          <li>SaaS：软件即服务，直接提供应用软件</li>
          <li>SDN：通过集中控制器灵活管理网络流量</li>
          <li>NFV：将网络功能以软件方式运行在通用硬件上</li>
          <li>云安全：包括访问控制、加密、隔离等多种安全机制</li>
        </ul>
        <Title level={4}>新技术结构与应用</Title>
        <Paragraph>
          SDN控制器可动态调整云网络流量，NFV实现弹性部署防火墙、负载均衡等功能，云安全保障多租户环境下的数据隔离与安全。
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'IP寻址与通信流程',
    children: (
      <Card>
        <Paragraph>
          云环境下每台云主机分配独立虚拟IP，支持弹性扩展。终端通信流程包括：
        </Paragraph>
        <ol>
          <li>云主机启动时由云平台分配虚拟IP</li>
          <li>虚拟交换机/路由器负责内部转发与隔离</li>
          <li>跨云通信通过公网IP或VPN等方式实现</li>
        </ol>
        <Title level={4}>通信流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：云主机通信流程 */}
          <svg width="700" height="120">
            {/* 云主机A */}
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">云主机A</text>
            {/* 虚拟交换机 */}
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">虚拟交换机</text>
            {/* 云主机B */}
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">云主机B</text>
            {/* 线条 */}
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2"/>
            <line x1="400" y1="60" x2="540" y2="60" stroke="#386ff6" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>云主机间通过虚拟交换机通信，IP寻址由云平台统一管理</div>
        </div>
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
          某企业在云平台上部署多台云主机，如何实现主机间的安全隔离与高效通信？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>通过虚拟局域网（VLAN）、安全组等机制实现隔离</li>
            <li>利用虚拟交换机/路由器进行高效转发</li>
            <li>采用云安全策略（如访问控制、加密）保障通信安全</li>
          </ol>
        </Paragraph>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. SDN和传统网络管理方式有何本质区别？
        </Paragraph>
        <Paragraph>
          2. 云环境下IP地址的动态分配对网络管理有何影响？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/security";
const nextHref = "/study/network/sniff-analyze";

const CloudNewTechPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>云网络与新技术</Title>
        <Paragraph>
          本章介绍云网络的基本结构、主流云服务类型、SDN/NFV等新技术，以及云环境下的IP寻址与终端通信流程，配合结构图和例题帮助理解。
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
          ← 上一章：网络安全基础
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
          下一章：网络抓包与协议分析 →
        </a>
      </div>
    </div>
  );
};

export default CloudNewTechPage; 