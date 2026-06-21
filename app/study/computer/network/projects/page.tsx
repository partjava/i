"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '典型项目案例',
    children: (
      <Card>
        <Paragraph>
          本节以企业园区网和数据中心网络为例，介绍项目需求、设计思路与整体架构。
        </Paragraph>
        <ul>
          <li>企业园区网：多楼宇VLAN划分、核心/汇聚/接入三层架构、ACL安全隔离</li>
          <li>数据中心：服务器集群、虚拟化、负载均衡、冗余链路</li>
          <li>云平台部署：弹性资源、自动化运维、SDN/NFV新技术</li>
        </ul>
        <Title level={4}>项目网络结构图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：企业园区网结构 */}
          <svg width="700" height="180">
            {/* 核心交换机 */}
            <rect x="320" y="30" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="380" y="55" textAnchor="middle" fontSize="14" fill="#faad14">核心交换机</text>
            {/* 汇聚交换机 */}
            <rect x="120" y="90" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="180" y="115" textAnchor="middle" fontSize="14" fill="#386ff6">汇聚交换机A</text>
            <rect x="520" y="90" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="580" y="115" textAnchor="middle" fontSize="14" fill="#386ff6">汇聚交换机B</text>
            {/* 接入交换机 */}
            <rect x="60" y="150" width="60" height="30" fill="#fff7e6" stroke="#faad14" rx="6"/>
            <text x="90" y="170" textAnchor="middle" fontSize="12" fill="#faad14">接入A1</text>
            <rect x="180" y="150" width="60" height="30" fill="#fff7e6" stroke="#faad14" rx="6"/>
            <text x="210" y="170" textAnchor="middle" fontSize="12" fill="#faad14">接入A2</text>
            <rect x="520" y="150" width="60" height="30" fill="#fff7e6" stroke="#faad14" rx="6"/>
            <text x="550" y="170" textAnchor="middle" fontSize="12" fill="#faad14">接入B1</text>
            <rect x="640" y="150" width="60" height="30" fill="#fff7e6" stroke="#faad14" rx="6"/>
            <text x="670" y="170" textAnchor="middle" fontSize="12" fill="#faad14">接入B2</text>
            {/* 线条 */}
            <line x1="380" y1="70" x2="180" y2="90" stroke="#386ff6" strokeWidth="2"/>
            <line x1="380" y1="70" x2="580" y2="90" stroke="#386ff6" strokeWidth="2"/>
            <line x1="180" y1="130" x2="90" y2="150" stroke="#faad14" strokeWidth="2"/>
            <line x1="180" y1="130" x2="210" y2="150" stroke="#faad14" strokeWidth="2"/>
            <line x1="580" y1="130" x2="550" y2="150" stroke="#faad14" strokeWidth="2"/>
            <line x1="580" y1="130" x2="670" y2="150" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>三层架构：核心-汇聚-接入，VLAN与ACL实现隔离与安全</div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '项目需求分析与设计流程',
    children: (
      <Card>
        <Paragraph>
          网络项目实施前需明确业务需求、流量规模、安全策略等，设计流程如下：
        </Paragraph>
        <ol>
          <li>需求调研：梳理业务系统、用户数量、带宽需求</li>
          <li>网络规划：确定拓扑结构、VLAN划分、IP地址分配</li>
          <li>安全设计：制定ACL、隔离策略、冗余链路</li>
          <li>设备选型：核心/汇聚/接入设备、负载均衡、防火墙等</li>
          <li>方案评审与优化</li>
        </ol>
        <Title level={4}>设计流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：设计流程 */}
          <svg width="700" height="60">
            <rect x="10" y="20" width="90" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="55" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">需求调研</text>
            <rect x="120" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="165" y="40" textAnchor="middle" fontSize="14" fill="#faad14">网络规划</text>
            <rect x="230" y="20" width="90" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="275" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">安全设计</text>
            <rect x="340" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="385" y="40" textAnchor="middle" fontSize="14" fill="#faad14">设备选型</text>
            <rect x="450" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="505" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">方案评审与优化</text>
            <line x1="100" y1="36" x2="120" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="210" y1="36" x2="230" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="320" y1="36" x2="340" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="430" y1="36" x2="450" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>需求调研→网络规划→安全设计→设备选型→方案评审与优化</div>
        </div>
      </Card>
    ),
  },
  {
    key: '3',
    label: '关键技术与配置示例',
    children: (
      <Card>
        <Paragraph>
          项目实施中常用的关键技术及配置片段示例：
        </Paragraph>
        <ul>
          <li>VLAN划分：<pre style={{background:'#f6f8fa',padding:'8px',borderRadius:'6px'}}>{`interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10`}</pre></li>
          <li>静态路由：<pre style={{background:'#f6f8fa',padding:'8px',borderRadius:'6px'}}>{`ip route 192.168.2.0 255.255.255.0 192.168.1.254`}</pre></li>
          <li>ACL安全：<pre style={{background:'#f6f8fa',padding:'8px',borderRadius:'6px'}}>{`access-list 100 permit ip 192.168.1.0 0.0.0.255 any
access-list 100 deny ip any any`}</pre></li>
          <li>负载均衡：<pre style={{background:'#f6f8fa',padding:'8px',borderRadius:'6px'}}>{`ip nat inside source list 10 interface GigabitEthernet0/2 overload`}</pre></li>
        </ul>
      </Card>
    ),
  },
  {
    key: '4',
    label: '项目部署与测试流程',
    children: (
      <Card>
        <Paragraph>
          项目部署与测试流程如下：
        </Paragraph>
        <ol>
          <li>设备上架与物理连接</li>
          <li>基础配置与参数核查</li>
          <li>功能测试（VLAN、路由、ACL等）</li>
          <li>性能与安全测试</li>
          <li>正式上线与运维交接</li>
        </ol>
        <Title level={4}>部署与测试流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：部署与测试流程 */}
          <svg width="700" height="60">
            <rect x="10" y="20" width="90" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="55" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">设备上架</text>
            <rect x="120" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="175" y="40" textAnchor="middle" fontSize="14" fill="#faad14">基础配置</text>
            <rect x="240" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="295" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">功能测试</text>
            <rect x="360" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="415" y="40" textAnchor="middle" fontSize="14" fill="#faad14">性能安全测试</text>
            <rect x="480" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="535" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">正式上线</text>
            <rect x="600" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="645" y="40" textAnchor="middle" fontSize="14" fill="#faad14">运维交接</text>
            <line x1="100" y1="36" x2="120" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="230" y1="36" x2="240" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="350" y1="36" x2="360" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="470" y1="36" x2="480" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="590" y1="36" x2="600" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>设备上架→基础配置→功能测试→性能安全测试→正式上线→运维交接</div>
        </div>
      </Card>
    ),
  },
  {
    key: '5',
    label: '例题与思考题',
    children: (
      <Card>
        <b>例题：</b>
        <Paragraph>
          某企业新建办公楼，需实现不同部门隔离、核心链路冗余和安全访问，如何设计网络？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>部门隔离：VLAN划分，汇聚/核心交换机间配置Trunk</li>
            <li>链路冗余：生成树协议（STP）、双上联</li>
            <li>安全访问：ACL限制、服务器区单独VLAN</li>
          </ol>
        </Paragraph>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 项目部署中如何保证网络的高可用性？
        </Paragraph>
        <Paragraph>
          2. 网络项目上线后，如何进行持续运维与优化？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/config-manage";
const nextHref = "/study/network/interview";

const ProjectsPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络项目实战</Title>
        <Paragraph>
          本章以企业园区网、数据中心等典型项目为例，详细讲解需求分析、设计、部署、配置与测试流程，配合结构图、配置片段和例题帮助理解。
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
          上一章：网络配置与管理
        </a>
        <a
          href={nextHref}
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '12px 28px 12px 36px',
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
          下一章：面试题与答疑
          <span style={{fontSize:22,marginLeft:6,display:'flex',alignItems:'center'}}>&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsPage; 