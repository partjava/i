"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '数据通信基础',
    children: (
      <Card>
        <Paragraph>
          数据通信是指数据在两台或多台设备之间的传输过程，是计算机网络的核心功能之一。
        </Paragraph>
        <ul>
          <li>通信系统组成：信源（发送方）、信宿（接收方）、信道（传输介质）、信号、噪声</li>
          <li>信号类型：
            <ul>
              <li>模拟信号：连续变化（如声音）</li>
              <li>数字信号：离散变化（如计算机数据）</li>
            </ul>
          </li>
          <li>信号特性：带宽、码元/比特、速率、信噪比</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：数据通信系统结构 */}
          <svg width="400" height="80">
            <rect x="10" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="40" y="50" textAnchor="middle" fontSize="14">信源</text>
            <rect x="90" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="120" y="50" textAnchor="middle" fontSize="14">信道</text>
            <rect x="170" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="200" y="50" textAnchor="middle" fontSize="14">噪声</text>
            <rect x="250" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="280" y="50" textAnchor="middle" fontSize="14">信道</text>
            <rect x="330" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="360" y="50" textAnchor="middle" fontSize="14">信宿</text>
            <polygon points="70,45 90,45 90,50 70,50" fill="#386ff6"/>
            <polygon points="150,45 170,45 170,50 150,50" fill="#386ff6"/>
            <polygon points="230,45 250,45 250,50 230,50" fill="#386ff6"/>
            <polygon points="310,45 330,45 330,50 310,50" fill="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>数据通信系统结构示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '2',
    label: '传输介质',
    children: (
      <Card>
        <Paragraph>
          传输介质分为有线和无线两大类，各有优缺点和典型应用。
        </Paragraph>
        <ul>
          <li>有线介质：
            <ul>
              <li>双绞线：常用于局域网，价格低，抗干扰一般</li>
              <li>同轴电缆：抗干扰强，常用于有线电视、早期以太网</li>
              <li>光纤：速率高，距离远，抗干扰强，适合骨干网</li>
            </ul>
          </li>
          <li>无线介质：
            <ul>
              <li>无线电波：Wi-Fi、蓝牙等</li>
              <li>微波：远距离点对点通信</li>
              <li>红外：短距离遥控</li>
              <li>卫星通信：全球覆盖，延迟高</li>
            </ul>
          </li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：常见传输介质 */}
          <svg width="420" height="80">
            <rect x="10" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="50" y="50" textAnchor="middle" fontSize="14">双绞线</text>
            <rect x="110" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="150" y="50" textAnchor="middle" fontSize="14">同轴电缆</text>
            <rect x="210" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="250" y="50" textAnchor="middle" fontSize="14">光纤</text>
            <rect x="310" y="30" width="80" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="350" y="50" textAnchor="middle" fontSize="14">无线</text>
          </svg>
          <div style={{color:'#888'}}>常见传输介质示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '3',
    label: '通信方式',
    children: (
      <Card>
        <Paragraph>
          通信方式包括单工、半双工、全双工，以及点对点和广播通信。
        </Paragraph>
        <ul>
          <li>单工通信：数据只能单向传输（如电视广播）</li>
          <li>半双工通信：数据可双向传输，但不能同时进行（如对讲机）</li>
          <li>全双工通信：数据可双向同时传输（如电话）</li>
          <li>点对点通信：两台设备直接通信</li>
          <li>广播通信：一个发送方对多个接收方</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：通信方式 */}
          <svg width="400" height="80">
            <circle cx="60" cy="40" r="20" fill="#e3eafe" stroke="#386ff6"/>
            <text x="60" y="45" textAnchor="middle" fontSize="14">A</text>
            <circle cx="160" cy="40" r="20" fill="#e3eafe" stroke="#386ff6"/>
            <text x="160" y="45" textAnchor="middle" fontSize="14">B</text>
            <polygon points="80,40 140,40 140,45 80,45" fill="#386ff6"/>
            <polygon points="140,50 80,50 80,55 140,55" fill="#386ff6" opacity="0.5"/>
            <text x="110" y="70" textAnchor="middle" fontSize="12" fill="#386ff6">全双工</text>
            <circle cx="260" cy="40" r="20" fill="#e3eafe" stroke="#386ff6"/>
            <text x="260" y="45" textAnchor="middle" fontSize="14">C</text>
            <circle cx="340" cy="40" r="20" fill="#e3eafe" stroke="#386ff6"/>
            <text x="340" y="45" textAnchor="middle" fontSize="14">D</text>
            <polygon points="280,40 320,40 320,45 280,45" fill="#386ff6"/>
            <text x="310" y="70" textAnchor="middle" fontSize="12" fill="#386ff6">单工</text>
          </svg>
          <div style={{color:'#888'}}>通信方式示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '4',
    label: '信号编码与调制',
    children: (
      <Card>
        <Paragraph>
          信号编码与调制是数据传输的关键，决定了信号的可靠性和效率。
        </Paragraph>
        <ul>
          <li>数字信号编码：NRZ、RZ、曼彻斯特编码、差分曼彻斯特编码</li>
          <li>模拟信号调制：ASK、FSK、PSK、QAM</li>
          <li>采样定理：采样频率要大于信号最高频率的2倍</li>
          <li>香农定理：信道最大数据速率 = 带宽 × log₂(1+信噪比)</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：曼彻斯特编码波形示意 */}
          <svg width="400" height="60">
            <polyline points="10,30 50,30 50,10 90,10 90,30 130,30 130,10 170,10 170,30 210,30" fill="none" stroke="#386ff6" strokeWidth="3"/>
            <line x1="10" y1="40" x2="210" y2="40" stroke="#aaa" strokeDasharray="4 2"/>
            <text x="110" y="55" textAnchor="middle" fontSize="12" fill="#386ff6">曼彻斯特编码波形</text>
          </svg>
        </div>
      </Card>
    ),
  },
  {
    key: '5',
    label: '多路复用与分用',
    children: (
      <Card>
        <Paragraph>
          多路复用技术可以让多路信号共享同一信道，提高信道利用率。
        </Paragraph>
        <ul>
          <li>频分复用（FDM）：不同信号占用不同频率带宽</li>
          <li>时分复用（TDM）：不同信号在不同时间片上传输</li>
          <li>统计时分复用（STDM）：动态分配时间片</li>
          <li>波分复用（WDM）：光纤通信中，不同信号用不同波长传输</li>
          <li>码分多址（CDMA）：每个信号用不同编码，互不干扰</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：多路复用示意 */}
          <svg width="400" height="80">
            <rect x="30" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="50" y="35" textAnchor="middle" fontSize="12">信号1</text>
            <rect x="30" y="50" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="50" y="65" textAnchor="middle" fontSize="12">信号2</text>
            <rect x="30" y="80" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="50" y="95" textAnchor="middle" fontSize="12">信号3</text>
            <polygon points="70,30 120,40 70,60" fill="#386ff6" opacity="0.2"/>
            <rect x="120" y="35" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="150" y="55" textAnchor="middle" fontSize="14">复用器</text>
            <polygon points="180,50 250,50 250,55 180,55" fill="#386ff6"/>
            <rect x="250" y="35" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="280" y="55" textAnchor="middle" fontSize="14">信道</text>
            <polygon points="310,50 360,40 310,70" fill="#386ff6" opacity="0.2"/>
            <rect x="360" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="380" y="35" textAnchor="middle" fontSize="12">信号1</text>
            <rect x="360" y="50" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="380" y="65" textAnchor="middle" fontSize="12">信号2</text>
            <rect x="360" y="80" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="380" y="95" textAnchor="middle" fontSize="12">信号3</text>
          </svg>
          <div style={{color:'#888'}}>多路复用技术示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '6',
    label: '差错控制',
    children: (
      <Card>
        <Paragraph>
          差错控制用于发现和纠正数据传输中的错误，保证通信可靠性。
        </Paragraph>
        <ul>
          <li>差错类型：单比特、多比特、突发误码</li>
          <li>检错技术：奇偶校验、CRC校验、校验和</li>
          <li>纠错技术：海明码、里德-所罗门码</li>
          <li>自动重传请求（ARQ）机制：发现错误自动重发</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：奇偶校验示意 */}
          <svg width="320" height="60">
            <rect x="20" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="40" y="35" textAnchor="middle" fontSize="12">数据</text>
            <rect x="80" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="100" y="35" textAnchor="middle" fontSize="12">校验位</text>
            <polygon points="60,30 80,30 80,35 60,35" fill="#386ff6"/>
            <rect x="140" y="20" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="170" y="35" textAnchor="middle" fontSize="12">发送帧</text>
            <polygon points="200,30 220,30 220,35 200,35" fill="#386ff6"/>
            <rect x="220" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="240" y="35" textAnchor="middle" fontSize="12">接收</text>
            <rect x="270" y="20" width="30" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="285" y="35" textAnchor="middle" fontSize="12">校验</text>
          </svg>
          <div style={{color:'#888'}}>奇偶校验示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '7',
    label: '数据交换技术',
    children: (
      <Card>
        <Paragraph>
          数据交换技术决定了数据在网络中的传输方式。
        </Paragraph>
        <ul>
          <li>电路交换：通信前建立专用通路，适合实时通信（如电话）</li>
          <li>报文交换：整包转发，适合大数据量但延迟高</li>
          <li>分组交换：数据分成小包独立转发，互联网采用</li>
          <li>分组交换优点：高效、灵活、资源利用率高</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：分组交换示意 */}
          <svg width="400" height="80">
            <rect x="20" y="30" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="40" y="45" textAnchor="middle" fontSize="12">主机A</text>
            <rect x="100" y="30" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="120" y="45" textAnchor="middle" fontSize="12">路由器1</text>
            <rect x="180" y="30" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="200" y="45" textAnchor="middle" fontSize="12">路由器2</text>
            <rect x="260" y="30" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="280" y="45" textAnchor="middle" fontSize="12">路由器3</text>
            <rect x="340" y="30" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="360" y="45" textAnchor="middle" fontSize="12">主机B</text>
            <polygon points="60,40 100,40 100,45 60,45" fill="#386ff6"/>
            <polygon points="140,40 180,40 180,45 140,45" fill="#386ff6"/>
            <polygon points="220,40 260,40 260,45 220,45" fill="#386ff6"/>
            <polygon points="300,40 340,40 340,45 300,45" fill="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>分组交换示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '8',
    label: '同步与异步通信',
    children: (
      <Card>
        <Paragraph>
          同步与异步通信方式决定了数据的传输节奏和同步机制。
        </Paragraph>
        <ul>
          <li>同步传输：数据流连续，需时钟同步，适合高速通信</li>
          <li>异步传输：数据以字符为单位，带起止位，适合低速通信</li>
          <li>位同步与帧同步：保证数据边界正确识别</li>
        </ul>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：同步与异步通信示意 */}
          <svg width="400" height="60">
            <rect x="20" y="20" width="80" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="60" y="35" textAnchor="middle" fontSize="12">同步传输</text>
            <rect x="120" y="20" width="80" height="20" fill="#e3eafe" stroke="#386ff6" rx="6"/>
            <text x="160" y="35" textAnchor="middle" fontSize="12">异步传输</text>
            <polygon points="100,30 120,30 120,35 100,35" fill="#386ff6"/>
          </svg>
          <div style={{color:'#888'}}>同步与异步通信示意图</div>
        </div>
      </Card>
    ),
  },
  {
    key: '9',
    label: '流量与拥塞控制',
    children: (
      <Card>
        <Paragraph>
          流量控制和拥塞控制用于保证网络高效、可靠地传输数据。
        </Paragraph>
        <ul>
          <li>流量控制：防止发送方过快导致接收方缓冲区溢出（如滑动窗口协议）</li>
          <li>拥塞控制：防止网络中数据过多导致性能下降（如TCP慢启动）</li>
        </ul>
      </Card>
    ),
  },
];

const prevHref = "/study/network/intro";
const nextHref = "/study/network/model";

const NetworkCommPrinciplePage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>网络通信原理</Title>
        <Paragraph>
          本章详细介绍计算机网络中数据通信的原理，包括通信基础、信号、介质、编码调制、差错控制、交换方式等核心知识点。
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
          上一章：网络基础与入门
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
          下一章：OSI与TCPIP模型
        </a>
      </div>
    </div>
  );
};

export default NetworkCommPrinciplePage;