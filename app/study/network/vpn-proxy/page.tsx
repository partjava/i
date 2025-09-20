"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: 'VPN原理与类型',
    children: (
      <Card>
        <Paragraph>
          虚拟专用网络（VPN）通过加密隧道在公网上建立安全的专用通信通道，实现远程安全互联。
        </Paragraph>
        <ul>
          <li>常见类型：PPTP、L2TP、IPSec、SSL VPN、OpenVPN</li>
          <li>应用场景：企业远程办公、分支互联、科学上网</li>
        </ul>
        <Title level={4}>VPN结构与IP通信</Title>
        <Paragraph>
          VPN客户端与VPN服务器之间建立加密隧道，数据包在隧道内传输，终点IP可为内网或公网主机。
        </Paragraph>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：VPN隧道结构 */}
          <svg width="700" height="120">
            {/* 客户端 */}
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">VPN客户端</text>
            {/* VPN服务器 */}
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">VPN服务器</text>
            {/* 公网 */}
            <ellipse cx="350" cy="60" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">公网</text>
            {/* 隧道线 */}
            <line x1="140" y1="60" x2="290" y2="60" stroke="#faad14" strokeWidth="2" strokeDasharray="6,4"/>
            <line x1="410" y1="60" x2="560" y2="60" stroke="#faad14" strokeWidth="2" strokeDasharray="6,4"/>
            <line x1="290" y1="60" x2="410" y2="60" stroke="#faad14" strokeWidth="4"/>
          </svg>
          <div style={{color:'#888'}}>VPN客户端与服务器通过加密隧道安全通信，终点IP可为内网主机</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          企业员工在家通过VPN访问公司内网服务器，数据包的终点IP如何确定？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>员工电脑通过VPN客户端与公司VPN服务器建立隧道</li>
            <li>访问公司内网服务器时，数据包终点IP为内网服务器IP</li>
            <li>数据包在公网中加密传输，VPN服务器解密后转发到内网终点</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: '代理服务器原理与类型',
    children: (
      <Card>
        <Paragraph>
          代理服务器在客户端与目标服务器之间转发请求，实现访问控制、加速、隐藏真实IP等功能。
        </Paragraph>
        <ul>
          <li>正向代理：客户端通过代理访问外部资源，隐藏真实IP</li>
          <li>反向代理：代理服务器代表内部服务器响应外部请求</li>
          <li>透明代理：客户端无感知，流量自动转发</li>
        </ul>
        <Title level={4}>代理结构与IP通信</Title>
        <Paragraph>
          客户端请求先到代理服务器，由代理转发到目标服务器，终点IP可为外部或内部主机。
        </Paragraph>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：正向代理结构 */}
          <svg width="700" height="120">
            {/* 客户端 */}
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            {/* 代理服务器 */}
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">代理服务器</text>
            {/* 目标服务器 */}
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">目标服务器</text>
            {/* 线条 */}
            <line x1="140" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2"/>
            <line x1="400" y1="60" x2="560" y2="60" stroke="#faad14" strokeWidth="2"/>
          </svg>
          <div style={{color:'#888'}}>正向代理：客户端通过代理访问目标服务器，终点IP为目标服务器IP</div>
        </div>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          用户通过正向代理访问www.example.com，数据包的终点IP是什么？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>用户请求先到代理服务器，终点IP为代理服务器IP</li>
            <li>代理服务器再向www.example.com发起请求，终点IP为目标服务器IP</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'VPN与代理的安全问题',
    children: (
      <Card>
        <Paragraph>
          VPN和代理技术虽能提升安全性和隐私，但也存在被劫持、流量泄露、伪装攻击等风险。
        </Paragraph>
        <ul>
          <li>VPN劫持：攻击者伪造VPN服务器，窃取数据</li>
          <li>代理泄露：真实IP暴露、敏感信息被记录</li>
          <li>安全措施：使用可信VPN/代理、端到端加密</li>
        </ul>
        <Title level={4}>安全结构图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：VPN/代理安全风险 */}
          <svg width="700" height="120">
            {/* 客户端 */}
            <rect x="40" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            {/* 攻击者 */}
            <rect x="300" y="10" width="100" height="40" fill="#fff1f0" stroke="#ff4d4f" rx="8"/>
            <text x="350" y="35" textAnchor="middle" fontSize="14" fill="#ff4d4f">伪造VPN/代理</text>
            {/* 目标服务器 */}
            <rect x="560" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="610" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">目标服务器</text>
            {/* 线条 */}
            <line x1="140" y1="60" x2="300" y2="30" stroke="#ff4d4f" strokeWidth="2"/>
            <line x1="400" y1="30" x2="560" y2="60" stroke="#ff4d4f" strokeWidth="2"/>
            <line x1="140" y1="60" x2="560" y2="60" stroke="#386ff6" strokeWidth="2" strokeDasharray="6,4"/>
          </svg>
          <div style={{color:'#888'}}>安全风险：伪造VPN/代理可窃取数据，需端到端加密</div>
        </div>
        <Divider />
        <b>思考题：</b>
        <Paragraph>
          1. 为什么VPN和代理不能完全保证通信安全？
        </Paragraph>
        <Paragraph>
          2. 如何选择安全可靠的VPN或代理服务？
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/wireless-mobile";
const nextHref = "/study/network/security";

const VpnProxyPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>VPN与代理技术</Title>
        <Paragraph>
          本章介绍VPN原理、常见类型、代理服务器原理与类型，重点讲解VPN与代理的IP寻址、终点通信与安全问题，配合结构图和例题帮助理解。
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
          ← 上一章：无线与移动网络
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
          下一章：网络安全基础 →
        </a>
      </div>
    </div>
  );
};

export default VpnProxyPage; 