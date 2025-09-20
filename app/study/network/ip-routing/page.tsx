"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: 'IP地址基础',
    children: (
      <Card>
        <Paragraph>
          IP地址用于唯一标识网络中的每一台主机。常见有IPv4和IPv6两种。
        </Paragraph>
        <ul>
          <li>IPv4地址：32位，点分十进制表示，如192.168.1.1</li>
          <li>IPv6地址：128位，冒号十六进制表示，如2001:0db8:85a3::8a2e:0370:7334</li>
          <li>IP地址分类：A类、B类、C类、D类、E类</li>
          <li>子网掩码：区分网络号和主机号，如255.255.255.0</li>
          <li>私有地址与公网地址</li>
        </ul>

        <Title level={4}>解题方法详解</Title>
        <Paragraph>
          1. IP地址计算题解题步骤：
        </Paragraph>
        <ol>
          <li>将IP地址和子网掩码转换为二进制</li>
          <li>进行"与"运算得到网络号</li>
          <li>主机号 = IP地址 - 网络号</li>
        </ol>

        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：IP地址计算过程 */}
          <svg width="600" height="200">
            {/* 原始IP地址 */}
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">
              IP地址：192.168.10.5
            </text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：原始IP地址</text>
            
            {/* 二进制转换 */}
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">
              11000000.10101000.00001010.00000101
            </text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：转换为二进制</text>
            
            {/* 与运算 */}
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">
              11000000.10101000.00001010.00000000
            </text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：与运算结果</text>
            
            {/* 最终结果 */}
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">
              网络号：192.168.10.0，主机号：0.0.0.5
            </text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：最终结果</text>
          </svg>
        </div>

        <Title level={4}>常用掩码对应表</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>掩码</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>位数</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>可用主机数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>255.255.255.0</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>/24</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>254</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>255.255.255.128</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>/25</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>126</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>255.255.255.192</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>/26</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>62</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>例题：</b>
        <Paragraph>
          某主机IP地址为192.168.10.5，子网掩码为255.255.255.0，请问其网络号和主机号分别是多少？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>IP地址：192.168.10.5 = 11000000.10101000.00001010.00000101</li>
            <li>子网掩码：255.255.255.0 = 11111111.11111111.11111111.00000000</li>
            <li>与运算：11000000.10101000.00001010.00000000</li>
            <li>结果：网络号为192.168.10.0，主机号为0.0.0.5</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '2',
    label: '子网划分与VLSM',
    children: (
      <Card>
        <Paragraph>
          子网划分用于提高IP地址利用率和网络管理灵活性。VLSM（可变长子网掩码）允许不同子网使用不同掩码。
        </Paragraph>
        <ul>
          <li>子网划分：将一个大网络分成多个小子网</li>
          <li>VLSM：根据实际需求灵活分配子网掩码</li>
          <li>CIDR表示法：如192.168.1.0/24</li>
        </ul>

        <Title level={4}>子网划分解题步骤</Title>
        <ol>
          <li>确定需要划分的子网数量</li>
          <li>计算需要借用的主机位数：2^n ≥ 子网数</li>
          <li>新的子网掩码 = 原掩码 + 借用的位数</li>
          <li>计算每个子网的网络号</li>
        </ol>

        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：子网划分过程 */}
          <svg width="600" height="200">
            {/* 原始网络 */}
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">
              原始网络：192.168.10.0/24
            </text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：原始网络</text>
            
            {/* 借用位数 */}
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">
              需要4个子网，借用2位（2^2=4）
            </text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：计算借用位数</text>
            
            {/* 新掩码 */}
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">
              新掩码：/26（255.255.255.192）
            </text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：计算新掩码</text>
            
            {/* 子网划分结果 */}
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">
              子网1：192.168.10.0/26，子网2：192.168.10.64/26，子网3：192.168.10.128/26，子网4：192.168.10.192/26
            </text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：子网划分结果</text>
          </svg>
        </div>

        <Title level={4}>子网划分公式</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>公式</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>2^n ≥ 子网数</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>计算需要借用的位数</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>2^m - 2 ≥ 主机数</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>计算每个子网的主机位数</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>256 - 2^n</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>计算子网大小</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>思考题：</b>
        <Paragraph>
          如果有一个192.168.10.0/24的网络，需要划分成4个大小相等的子网，每个子网的网络号和掩码是多少？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>需要4个子网，2^n ≥ 4，所以n=2</li>
            <li>原掩码/24，新掩码=/26（255.255.255.192）</li>
            <li>子网大小：256 - 2^2 = 64</li>
            <li>子网划分结果：
              <ul>
                <li>子网1：192.168.10.0/26</li>
                <li>子网2：192.168.10.64/26</li>
                <li>子网3：192.168.10.128/26</li>
                <li>子网4：192.168.10.192/26</li>
              </ul>
            </li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '3',
    label: '路由原理与协议',
    children: (
      <Card>
        <Paragraph>
          路由是指数据包在网络中从源主机到目的主机的路径选择。常见有静态路由和动态路由。
        </Paragraph>
        <ul>
          <li>静态路由：管理员手动配置，适合小型网络</li>
          <li>动态路由：路由器自动学习，适合大型网络</li>
          <li>常见动态路由协议：RIP、OSPF、BGP</li>
        </ul>

        <Title level={4}>路由选择题解题步骤</Title>
        <ol>
          <li>将目的地址转换为二进制</li>
          <li>比较所有可能路由的掩码</li>
          <li>应用最长前缀匹配原则</li>
          <li>选择掩码最长的匹配路由</li>
        </ol>

        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：路由选择过程 */}
          <svg width="600" height="200">
            {/* 目的地址 */}
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">
              目的地址：192.168.1.100 = 11000000.10101000.00000001.01100100
            </text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：目的地址</text>
            
            {/* 路由表 */}
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">
              路由1：192.168.1.0/24，路由2：192.168.1.0/25
            </text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：路由表</text>
            
            {/* 掩码比较 */}
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">
              掩码1：/24，掩码2：/25
            </text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：掩码比较</text>
            
            {/* 选择结果 */}
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">
              选择路由2：192.168.1.0/25（最长前缀匹配）
            </text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：选择结果</text>
          </svg>
        </div>

        <Title level={4}>路由协议比较</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>协议</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>算法</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>适用网络</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>收敛速度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>RIP</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>距离向量</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>小型网络</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>慢</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>OSPF</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>链路状态</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>大型网络</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>快</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>BGP</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>路径向量</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>互联网</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>较慢</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>例题：</b>
        <Paragraph>
          简述RIP和OSPF的主要区别。
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>算法不同：
              <ul>
                <li>RIP：基于距离向量算法</li>
                <li>OSPF：基于链路状态算法</li>
              </ul>
            </li>
            <li>适用场景不同：
              <ul>
                <li>RIP：适合小型网络，最大跳数15</li>
                <li>OSPF：适合大型网络，无跳数限制</li>
              </ul>
            </li>
            <li>收敛速度不同：
              <ul>
                <li>RIP：收敛慢，每30秒广播一次</li>
                <li>OSPF：收敛快，只在网络变化时更新</li>
              </ul>
            </li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '4',
    label: '路由表与查找',
    children: (
      <Card>
        <Paragraph>
          路由器通过查找路由表决定数据包的转发路径。
        </Paragraph>
        <ul>
          <li>路由表内容：目标网络、子网掩码、下一跳、接口</li>
          <li>最长前缀匹配原则</li>
          <li>默认路由（0.0.0.0/0）</li>
        </ul>

        <Title level={4}>路由表查找步骤</Title>
        <ol>
          <li>获取目的IP地址</li>
          <li>在路由表中查找匹配项</li>
          <li>应用最长前缀匹配原则</li>
          <li>确定下一跳和出接口</li>
        </ol>

        <div style={{textAlign:'center',margin:'24px 0'}}>
          {/* SVG：路由表查找过程 */}
          <svg width="600" height="200">
            {/* 路由表结构 */}
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">
              路由表结构：目标网络 | 子网掩码 | 下一跳 | 接口
            </text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：路由表结构</text>
            
            {/* 查找过程 */}
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">
              目的IP：192.168.1.100
            </text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：目的IP</text>
            
            {/* 匹配过程 */}
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">
              匹配项：192.168.1.0/25
            </text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：匹配过程</text>
            
            {/* 转发结果 */}
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">
              转发：下一跳192.168.1.1，接口eth0
            </text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：转发结果</text>
          </svg>
        </div>

        <Title level={4}>路由表查找规则</Title>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:'24px'}}>
          <thead>
            <tr style={{background:'#f0f5ff'}}>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>规则</th>
              <th style={{padding:'8px',border:'1px solid #d9d9d9'}}>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>最长前缀匹配</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>选择掩码最长的匹配项</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>默认路由</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>0.0.0.0/0作为最后选择</td>
            </tr>
            <tr>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>直连路由</td>
              <td style={{padding:'8px',border:'1px solid #d9d9d9'}}>优先于其他路由</td>
            </tr>
          </tbody>
        </table>

        <Divider />
        <b>思考题：</b>
        <Paragraph>
          路由器收到一个目的地址为192.168.1.100的数据包，路由表中有192.168.1.0/24和192.168.1.0/25两条路由，应该选哪一条？
        </Paragraph>
        <Paragraph type="secondary">
          解析：
          <ol>
            <li>目的地址：192.168.1.100 = 11000000.10101000.00000001.01100100</li>
            <li>路由1：192.168.1.0/24 = 11000000.10101000.00000001.00000000</li>
            <li>路由2：192.168.1.0/25 = 11000000.10101000.00000001.00000000</li>
            <li>应用最长前缀匹配：
              <ul>
                <li>路由1匹配前24位</li>
                <li>路由2匹配前25位</li>
              </ul>
            </li>
            <li>选择路由2：192.168.1.0/25（掩码更长）</li>
          </ol>
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/link";
const nextHref = "/study/network/tcp-udp";

const IpRoutingPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>IP与路由</Title>
        <Paragraph>
          本章详细介绍IP地址、子网划分、路由原理与协议、路由表查找等内容，配合丰富示意图和例题，帮助你掌握网络层核心知识。
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
          上一章：物理层与数据链路层
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
          下一章：TCP与UDP
        </a>
      </div>
    </div>
  );
};

export default IpRoutingPage; 