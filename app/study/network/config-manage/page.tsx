"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '网络设备配置基础',
    children: (
      <Card>
        <Paragraph>
          网络配置是指对交换机、路由器等设备进行参数设置，实现网络的正常通信与安全隔离。
        </Paragraph>
        <ul>
          <li>交换机配置：VLAN划分、端口管理、生成树协议等</li>
          <li>路由器配置：静态路由、动态路由、NAT、ACL等</li>
          <li>常用命令：Cisco IOS、华为VRP等主流厂商命令</li>
        </ul>
        <Title level={4}>典型配置流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：配置流程 */}
          <svg width="700" height="120">
            {/* 管理终端 */}
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">管理终端</text>
            {/* 网络设备 */}
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">网络设备</text>
            {/* 网络运行 */}
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">网络运行</text>
            {/* 线条 */}
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2"/>
            <line x1="400" y1="60" x2="540" y2="60" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>通过管理终端配置网络设备，保障网络正常运行</div>
          <div style={{marginTop:16, textAlign:'left'}}>
            <b>典型配置流程：</b>
            <ol style={{margin:'8px 0 0 24px'}}>
              <li>管理终端通过Console/SSH等方式登录网络设备</li>
              <li>进入特权模式，配置接口、VLAN、路由、ACL等参数</li>
              <li>保存配置，确保重启后生效</li>
              <li>测试网络连通性与安全性</li>
              <li>设备投入正式运行</li>
            </ol>
            <div style={{textAlign:'center',margin:'16px 0'}}>
              {/* 简明流程SVG */}
              <svg width="600" height="60">
                <rect x="10" y="20" width="90" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="55" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">管理终端</text>
                <rect x="120" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
                <text x="165" y="40" textAnchor="middle" fontSize="14" fill="#faad14">登录设备</text>
                <rect x="230" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="285" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">配置参数</text>
                <rect x="350" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
                <text x="395" y="40" textAnchor="middle" fontSize="14" fill="#faad14">保存配置</text>
                <rect x="460" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
                <text x="515" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">网络运行</text>
                <line x1="100" y1="36" x2="120" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
                <line x1="210" y1="36" x2="230" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
                <line x1="340" y1="36" x2="350" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
                <line x1="440" y1="36" x2="460" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10" fill="#faad14" />
                  </marker>
                </defs>
              </svg>
              <div style={{color:'#888'}}>管理终端→登录设备→配置参数→保存配置→网络运行</div>
            </div>
          </div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '常见配置命令与管理方法',
    children: (
      <Card>
        <Paragraph>
          网络设备配置常用命令包括接口配置、VLAN划分、路由设置、ACL访问控制等。
        </Paragraph>
        <ul>
          <li>接口配置：interface、ip address、shutdown/no shutdown</li>
          <li>VLAN配置：vlan、switchport access vlan</li>
          <li>路由配置：ip route、router ospf、network</li>
          <li>ACL配置：access-list、permit/deny等</li>
        </ul>
        <Title level={4}>配置管理方法</Title>
        <Paragraph>
          通过命令行、Web界面或集中管理平台对设备进行批量配置和远程管理。
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: '配置管理应用',
    children: (
      <Card>
        <Paragraph>
          配置管理在企业网络、数据中心、云环境等场景广泛应用，保障网络安全、稳定与高效。
        </Paragraph>
        <ul>
          <li>企业网络：VLAN隔离、ACL安全策略</li>
          <li>数据中心：大规模设备自动化配置</li>
          <li>云环境：弹性网络资源自动部署</li>
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
          如何通过ACL实现只允许特定IP访问某台服务器？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>编写ACL规则，permit指定IP，deny其他</li>
            <li>将ACL应用到服务器接口的入方向</li>
            <li>验证配置生效</li>
          </ol>
        </Paragraph>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 为什么企业网络需要划分VLAN？
        </Paragraph>
        <Paragraph>
          2. 自动化配置管理对大规模网络有何意义？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/sniff-analyze";
const nextHref = "/study/network/projects";

const ConfigManagePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络配置与管理</Title>
        <Paragraph>
          本章介绍网络设备配置基础、常见命令与管理方法及其在实际网络中的应用，配合流程图和例题帮助理解。
        </Paragraph>
      </Typography>

      <Tabs defaultActiveKey="1" items={tabItems} style={{ marginBottom: 32 }} />

      <Divider />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '48px 0 0 0' }}>
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
          上一章：网络抓包与协议分析
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
          下一章：网络项目实战
          <span style={{fontSize:22,marginLeft:6,display:'flex',alignItems:'center'}}>&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default ConfigManagePage; 