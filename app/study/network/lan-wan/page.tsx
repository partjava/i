"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '局域网（LAN）',
    children: (
      <Card>
        <Paragraph>
          局域网（LAN, Local Area Network）是覆盖范围较小、通常在同一建筑或园区内的计算机网络。
        </Paragraph>
        <ul>
          <li>常用技术：以太网（Ethernet）、Wi-Fi</li>
          <li>典型设备：交换机、集线器、无线AP</li>
          <li>IP分配：通常采用私有IP地址，通过DHCP自动分配</li>
        </ul>
        <Title level={4}>典型拓扑结构</Title>
        <Paragraph>
          局域网常见拓扑有：星型、总线型、环型、树型等。
        </Paragraph>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：星型拓扑 */}
          <svg width="400" height="120">
            <circle cx="200" cy="60" r="24" fill="#e3eafe" stroke="#386ff6"/>
            <text x="200" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">交换机</text>
            <circle cx="80" cy="30" r="16" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">A</text>
            <circle cx="80" cy="90" r="16" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="95" textAnchor="middle" fontSize="12" fill="#386ff6">B</text>
            <circle cx="320" cy="30" r="16" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">C</text>
            <circle cx="320" cy="90" r="16" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="95" textAnchor="middle" fontSize="12" fill="#386ff6">D</text>
            <line x1="200" y1="60" x2="80" y2="30" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="80" y2="90" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="320" y2="30" stroke="#386ff6"/>
            <line x1="200" y1="60" x2="320" y2="90" stroke="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>星型拓扑：所有主机通过交换机互联</div>
        </div>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：以太网帧结构 */}
          <svg width="500" height="60">
            <rect x="10" y="20" width="60" height="24" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="40" y="36" textAnchor="middle" fontSize="12" fill="#386ff6">目的MAC</text>
            <rect x="70" y="20" width="60" height="24" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="100" y="36" textAnchor="middle" fontSize="12" fill="#386ff6">源MAC</text>
            <rect x="130" y="20" width="40" height="24" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="150" y="36" textAnchor="middle" fontSize="12" fill="#386ff6">类型</text>
            <rect x="170" y="20" width="220" height="24" fill="#f0f5ff" stroke="#386ff6" rx="6"/>
            <text x="280" y="36" textAnchor="middle" fontSize="12" fill="#386ff6">数据</text>
            <rect x="390" y="20" width="60" height="24" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="420" y="36" textAnchor="middle" fontSize="12" fill="#386ff6">FCS</text>
          </svg>
          <div style={{color:'#888'}}>以太网帧结构：目的MAC | 源MAC | 类型 | 数据 | FCS</div>
        </div>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：VLAN逻辑分组 */}
          <svg width="400" height="100">
            <rect x="40" y="30" width="80" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="80" y="55" textAnchor="middle" fontSize="12" fill="#386ff6">VLAN 10</text>
            <rect x="280" y="30" width="80" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="320" y="55" textAnchor="middle" fontSize="12" fill="#386ff6">VLAN 20</text>
            <circle cx="80" cy="20" r="10" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="24" textAnchor="middle" fontSize="10" fill="#386ff6">A</text>
            <circle cx="80" cy="90" r="10" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="80" y="94" textAnchor="middle" fontSize="10" fill="#386ff6">B</text>
            <circle cx="320" cy="20" r="10" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="24" textAnchor="middle" fontSize="10" fill="#386ff6">C</text>
            <circle cx="320" cy="90" r="10" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="320" y="94" textAnchor="middle" fontSize="10" fill="#386ff6">D</text>
            <line x1="80" y1="40" x2="80" y2="80" stroke="#386ff6"/>
            <line x1="320" y1="40" x2="320" y2="80" stroke="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>VLAN逻辑分组：A、B属于VLAN10，C、D属于VLAN20，隔离广播域</div>
        </div>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：ARP工作流程 */}
          <svg width="500" height="80">
            <rect x="40" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="80" y="50" textAnchor="middle" fontSize="12" fill="#386ff6">主机A</text>
            <rect x="380" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="420" y="50" textAnchor="middle" fontSize="12" fill="#386ff6">主机B</text>
            <line x1="120" y1="45" x2="380" y2="45" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="250" y="35" textAnchor="middle" fontSize="12" fill="#faad14">ARP请求：谁是192.168.1.3？</text>
            <line x1="380" y1="60" x2="120" y2="60" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow2)"/>
            <text x="250" y="75" textAnchor="middle" fontSize="12" fill="#386ff6">ARP应答：我是192.168.1.3，MAC=xx:xx</text>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#386ff6" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>ARP流程：A广播ARP请求，B应答返回MAC，实现IP到MAC映射</div>
        </div>
        <Title level={4}>以太网帧结构与VLAN</Title>
        <Paragraph>
          以太网帧用于局域网内数据传输，VLAN可实现逻辑分组，提升安全性和管理灵活性。
        </Paragraph>
        <ul>
          <li>以太网帧头包含源MAC、目的MAC、类型等字段</li>
          <li>VLAN通过打标签（Tag）区分不同虚拟局域网</li>
        </ul>
        <Title level={4}>ARP协议与IP-MAC映射</Title>
        <Paragraph>
          ARP（地址解析协议）用于根据IP地址查询目标主机的MAC地址，实现IP到物理地址的映射。
        </Paragraph>
        <Title level={4}>常见局域网协议对比</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'16px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>协议</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>典型应用</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>优点</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>缺点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>Ethernet</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>有线局域网</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>速度快、成本低</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>受限于物理距离</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>Wi-Fi</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>无线局域网</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>灵活、易扩展</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>易受干扰</td>
            </tr>
          </tbody>
        </table>
        <Divider />
        <b>例题：</b>
        <Paragraph>
          局域网内主机A（192.168.1.2）如何向主机B（192.168.1.3）发送数据？请说明IP和MAC的作用。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>主机A构造数据包，目的IP为192.168.1.3</li>
            <li>通过ARP查询B的MAC地址，封装以太网帧</li>
            <li>数据包通过交换机转发，最终到达主机B</li>
            <li>交换机根据MAC地址转发，IP地址用于确定目标主机</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: '广域网（WAN）',
    children: (
      <Card>
        <Paragraph>
          广域网（WAN, Wide Area Network）是覆盖范围广、跨越城市/国家的计算机网络。
        </Paragraph>
        <ul>
          <li>常用技术：MPLS、帧中继、专线、互联网、VPN</li>
          <li>典型设备：路由器、光纤收发器、防火墙</li>
          <li>IP分配：通常采用公网IP地址，需全球唯一</li>
        </ul>
        <Title level={4}>WAN连接方式与路由器作用</Title>
        <Paragraph>
          广域网通过多种方式连接不同地理位置的网络，路由器负责跨网段转发数据包。
        </Paragraph>
        <ul>
          <li>专线：高可靠性，适合企业互联</li>
          <li>VPN：通过加密隧道在公网中建立虚拟专用网络</li>
          <li>MPLS：多协议标签交换，提升转发效率</li>
        </ul>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：典型广域网结构 */}
          <svg width="700" height="200">
            {/* 左侧LAN */}
            <rect x="60" y="80" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="110" y="105" textAnchor="middle" fontSize="14" fill="#386ff6">局域网A</text>
            {/* 路由器A */}
            <rect x="180" y="80" width="60" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="210" y="105" textAnchor="middle" fontSize="14" fill="#faad14">R1</text>
            {/* WAN云 */}
            <ellipse cx="350" cy="100" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="350" y="105" textAnchor="middle" fontSize="14" fill="#386ff6">广域网</text>
            {/* 路由器B */}
            <rect x="440" y="80" width="60" height="40" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="470" y="105" textAnchor="middle" fontSize="14" fill="#faad14">R2</text>
            {/* 右侧LAN */}
            <rect x="520" y="80" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="570" y="105" textAnchor="middle" fontSize="14" fill="#386ff6">局域网B</text>
            {/* 线条 */}
            <line x1="160" y1="100" x2="180" y2="100" stroke="#faad14" strokeWidth="2"/>
            <line x1="240" y1="100" x2="290" y2="100" stroke="#faad14" strokeWidth="2"/>
            <line x1="410" y1="100" x2="440" y2="100" stroke="#faad14" strokeWidth="2"/>
            <line x1="500" y1="100" x2="520" y2="100" stroke="#faad14" strokeWidth="2"/>
            <line x1="350" y1="130" x2="350" y2="170" stroke="#386ff6" strokeWidth="2" strokeDasharray="6,4"/>
          </svg>
          <div style={{color:'#888'}}>广域网通过路由器互联多个局域网，终点IP用于跨网段寻址</div>
        </div>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：VPN隧道传输 */}
          <svg width="600" height="100">
            <rect x="40" y="40" width="100" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="60" textAnchor="middle" fontSize="12" fill="#386ff6">总部主机</text>
            <rect x="460" y="40" width="100" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="510" y="60" textAnchor="middle" fontSize="12" fill="#386ff6">分支主机</text>
            <ellipse cx="250" cy="55" rx="40" ry="20" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="250" y="60" textAnchor="middle" fontSize="12" fill="#386ff6">公网</text>
            <ellipse cx="350" cy="55" rx="40" ry="20" fill="#f0f5ff" stroke="#386ff6"/>
            <text x="350" y="60" textAnchor="middle" fontSize="12" fill="#386ff6">VPN隧道</text>
            <line x1="140" y1="55" x2="210" y2="55" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="290" y1="55" x2="310" y2="55" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="390" y1="55" x2="460" y2="55" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>VPN隧道：总部与分支主机通过加密隧道安全互联</div>
        </div>
        <Title level={4}>常见广域网协议对比</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'16px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>协议</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>典型应用</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>优点</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>缺点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>MPLS</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>运营商骨干网</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>高效、可扩展</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>配置复杂</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>VPN</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>企业远程接入</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>安全、成本低</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>依赖公网质量</td>
            </tr>
          </tbody>
        </table>
        <Title level={4}>实际案例</Title>
        <Paragraph>
          某企业总部与分支机构通过VPN互联，总部IP为203.0.113.10，分支IP为10.0.0.2。总部主机如何访问分支主机？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>总部主机构造数据包，目的IP为10.0.0.2</li>
            <li>数据包通过VPN隧道加密传输，跨越公网</li>
            <li>分支路由器解密后转发到目标主机</li>
            <li>IP地址确保数据包准确到达终点</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'LAN与WAN对比与思考',
    children: (
      <Card>
        <Title level={4}>LAN与WAN主要区别与联系</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'16px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>对比项</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>局域网（LAN）</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>广域网（WAN）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>覆盖范围</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>小，通常为一栋楼或园区</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>大，跨城市/国家</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>典型设备</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>交换机、AP</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>路由器、防火墙</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>IP分配</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>私有IP</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>公网IP</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>协议</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>Ethernet, Wi-Fi</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>MPLS, VPN, Frame Relay</td>
            </tr>
          </tbody>
        </table>
        <Title level={4}>思考题</Title>
        <Paragraph>
          1. 为什么局域网内可以使用私有IP，而广域网必须使用公网IP？
        </Paragraph>
        <Paragraph>
          2. 企业如何实现多个分支机构之间的安全互联？
        </Paragraph>
        <Title level={4}>拓展阅读</Title>
        <ul>
          <li>《计算机网络（谢希仁）》第六章</li>
          <li>RFC 1918：私有IP地址空间</li>
          <li>以太网标准IEEE 802.3</li>
        </ul>
      </Card>
    ),
  },
];

const prevHref = "/study/network/application";
const nextHref = "/study/network/wireless-mobile";

const LanWanPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>局域网与广域网</Title>
        <Paragraph>
          本章介绍局域网（LAN）与广域网（WAN）的基本概念、典型结构、主要协议及与IP的关系，配合结构图和例题帮助理解网络分层与终点寻址。
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
          上一章：应用层协议
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
          下一章：无线与移动网络
        </a>
      </div>
    </div>
  );
};

export default LanWanPage; 