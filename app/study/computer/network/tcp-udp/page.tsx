"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: 'TCP协议',
    children: (
      <Card>
        <Paragraph>
          TCP（传输控制协议）是一种面向连接的、可靠的传输层协议。
        </Paragraph>
        <ul>
          <li>面向连接：通信前需要建立连接</li>
          <li>可靠传输：通过确认机制、重传机制等保证数据可靠传输</li>
          <li>流量控制：通过滑动窗口机制控制发送速率</li>
          <li>拥塞控制：通过慢启动、拥塞避免等算法控制网络拥塞</li>
        </ul>

        <Title level={4}>TCP连接建立与释放</Title>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：TCP三次握手 */}
          <svg width="600" height="200">
            {/* 客户端 */}
            <rect x="30" y="20" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="90" y="45" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            
            {/* 服务器端 */}
            <rect x="450" y="20" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="510" y="45" textAnchor="middle" fontSize="14" fill="#386ff6">服务器端</text>
            
            {/* 三次握手过程 */}
            <line x1="150" y1="40" x2="450" y2="40" stroke="#386ff6" strokeWidth="2"/>
            <text x="300" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">SYN=1, seq=x</text>
            
            <line x1="450" y1="60" x2="150" y2="60" stroke="#386ff6" strokeWidth="2"/>
            <text x="300" y="55" textAnchor="middle" fontSize="12" fill="#386ff6">SYN=1, ACK=1, seq=y, ack=x+1</text>
            
            <line x1="150" y1="80" x2="450" y2="80" stroke="#386ff6" strokeWidth="2"/>
            <text x="300" y="75" textAnchor="middle" fontSize="12" fill="#386ff6">ACK=1, seq=x+1, ack=y+1</text>
          </svg>
          <div style={{color:'#888'}}>TCP三次握手过程</div>
        </div>

        <Title level={4}>TCP可靠传输机制</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>机制</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>确认机制</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>接收方发送确认报文</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>重传机制</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>超时重传、快速重传</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>滑动窗口</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>流量控制</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>例题：</b>
        <Paragraph>
          简述TCP三次握手的过程。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>第一次握手：客户端发送SYN=1, seq=x</li>
            <li>第二次握手：服务器发送SYN=1, ACK=1, seq=y, ack=x+1</li>
            <li>第三次握手：客户端发送ACK=1, seq=x+1, ack=y+1</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: 'UDP协议',
    children: (
      <Card>
        <Paragraph>
          UDP（用户数据报协议）是一种无连接的、不可靠的传输层协议。
        </Paragraph>
        <ul>
          <li>无连接：通信前不需要建立连接</li>
          <li>不可靠传输：不保证数据可靠到达</li>
          <li>无流量控制：发送速率不受限制</li>
          <li>无拥塞控制：不控制网络拥塞</li>
        </ul>

        <Title level={4}>UDP报文格式</Title>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：UDP报文格式 */}
          <svg width="600" height="100">
            <rect x="30" y="20" width="540" height="60" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="165" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">源端口</text>
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">目的端口</text>
            <text x="435" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">长度</text>
            <text x="570" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">校验和</text>
            <line x1="270" y1="20" x2="270" y2="80" stroke="#386ff6" strokeWidth="1"/>
            <line x1="405" y1="20" x2="405" y2="80" stroke="#386ff6" strokeWidth="1"/>
            <line x1="540" y1="20" x2="540" y2="80" stroke="#386ff6" strokeWidth="1"/>
          </svg>
          <div style={{color:'#888'}}>UDP报文格式</div>
        </div>

        <Title level={4}>UDP应用场景</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>应用</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>DNS</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>域名解析</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>DHCP</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>动态主机配置</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>视频流</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>实时视频传输</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>思考题：</b>
        <Paragraph>
          为什么DNS使用UDP而不是TCP？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>DNS查询通常只需要一个请求和一个响应</li>
            <li>UDP无连接特性减少了建立连接的开销</li>
            <li>DNS数据包通常很小，UDP足够可靠</li>
            <li>UDP的传输延迟更低</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: 'TCP与UDP比较',
    children: (
      <Card>
        <Paragraph>
          TCP和UDP是传输层的两个主要协议，各有特点。
        </Paragraph>

        <Title level={4}>TCP与UDP对比</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>特性</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>TCP</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>UDP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>连接性</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>面向连接</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>无连接</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>可靠性</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>可靠</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>不可靠</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>流量控制</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>有</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>无</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>拥塞控制</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>有</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>无</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>传输效率</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>较低</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>较高</td>
            </tr>
          </tbody>
        </table>

        <Title level={4}>应用场景选择</Title>
        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：TCP与UDP应用场景 */}
          <svg width="600" height="200">
            {/* TCP应用 */}
            <rect x="30" y="20" width="260" height="160" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="160" y="40" textAnchor="middle" fontSize="16" fill="#386ff6">TCP应用场景</text>
            <text x="160" y="70" textAnchor="middle" fontSize="14" fill="#386ff6">HTTP/HTTPS</text>
            <text x="160" y="100" textAnchor="middle" fontSize="14" fill="#386ff6">FTP</text>
            <text x="160" y="130" textAnchor="middle" fontSize="14" fill="#386ff6">SMTP</text>
            <text x="160" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">SSH</text>
            
            {/* UDP应用 */}
            <rect x="310" y="20" width="260" height="160" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="440" y="40" textAnchor="middle" fontSize="16" fill="#386ff6">UDP应用场景</text>
            <text x="440" y="70" textAnchor="middle" fontSize="14" fill="#386ff6">DNS</text>
            <text x="440" y="100" textAnchor="middle" fontSize="14" fill="#386ff6">DHCP</text>
            <text x="440" y="130" textAnchor="middle" fontSize="14" fill="#386ff6">视频流</text>
            <text x="440" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">语音通话</text>
          </svg>
        </div>

        <Divider />
        <b>例题：</b>
        <Paragraph>
          为什么视频流媒体通常使用UDP而不是TCP？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>实时性要求高，UDP传输延迟更低</li>
            <li>视频流可以容忍少量数据丢失</li>
            <li>UDP无连接特性减少了建立连接的开销</li>
            <li>UDP没有拥塞控制，可以更好地利用带宽</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/ip-routing";
const nextHref = "/study/network/application";

const TcpUdpPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>TCP与UDP</Title>
        <Paragraph>
          本章详细介绍传输层的两个主要协议：TCP和UDP，包括它们的特点、区别、应用场景等，帮助你理解传输层协议的选择和使用。
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
          上一章：IP与路由
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
          下一章：应用层协议
        </a>
      </div>
    </div>
  );
};

export default TcpUdpPage; 