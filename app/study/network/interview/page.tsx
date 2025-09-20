"use client";
import React from 'react';
import { Card, Typography, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const tabItems = [
  {
    key: '1',
    label: '高频面试题',
    children: (
      <Card>
        <Paragraph>
          本节汇总网络工程师面试中常见的高频问题，涵盖IP、路由、交换、协议、配置、云网络等核心知识点。
        </Paragraph>
        <ul>
          <li>OSI七层模型与TCP/IP模型的区别与对应关系</li>
          <li>子网划分与VLSM应用举例</li>
          <li>静态路由与动态路由的优缺点</li>
          <li>VLAN原理及配置方法</li>
          <li>常见协议（如ARP、DHCP、DNS、HTTP、TCP、UDP）作用与流程</li>
          <li>云网络与传统网络的主要区别</li>
        </ul>
      </Card>
    ),
  },
  {
    key: '2',
    label: '答题思路与解析',
    children: (
      <Card>
        <Paragraph>
          针对典型面试题，给出结构化答题思路与详细解析，帮助考生条理清晰地作答。
        </Paragraph>
        <ul>
          <li>问题拆解：明确考查点，分步作答</li>
          <li>结合实际场景举例说明</li>
          <li>答题结构建议：定义→原理→流程→应用→优缺点</li>
        </ul>
        <Title level={4}>结构化答题流程图</Title>
        <div style={{textAlign:'center',margin:'16px 0'}}>
          {/* SVG：答题流程 */}
          <svg width="700" height="60">
            <rect x="10" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="65" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">审题与拆解</text>
            <rect x="130" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="185" y="40" textAnchor="middle" fontSize="14" fill="#faad14">原理与定义</text>
            <rect x="250" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="305" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">流程与举例</text>
            <rect x="370" y="20" width="110" height="32" fill="#fff7e6" stroke="#faad14" rx="8"/>
            <text x="425" y="40" textAnchor="middle" fontSize="14" fill="#faad14">优缺点分析</text>
            <rect x="490" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8"/>
            <text x="545" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">实际应用</text>
            <line x1="120" y1="36" x2="130" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="240" y1="36" x2="250" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="360" y1="36" x2="370" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)"/>
            <line x1="480" y1="36" x2="490" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{color:'#888'}}>审题与拆解→原理与定义→流程与举例→优缺点分析→实际应用</div>
        </div>
      </Card>
    ),
  },
  {
    key: '3',
    label: '场景化问答与案例分析',
    children: (
      <Card>
        <Paragraph>
          结合实际网络场景，分析面试中常见的开放性问题与案例。
        </Paragraph>
        <ul>
          <li>如何排查企业网络中某部门无法访问互联网？</li>
          <li>数据中心出现广播风暴，如何定位与解决？</li>
          <li>云平台多租户隔离的技术实现方式？</li>
        </ul>
        <Title level={4}>案例分析答题建议</Title>
        <Paragraph>
          1. 明确问题背景与现象
          2. 梳理排查思路，逐步定位
          3. 结合配置、协议、日志等多角度分析
        </Paragraph>
      </Card>
    ),
  },
  {
    key: '4',
    label: '经典易错点与答疑',
    children: (
      <Card>
        <Paragraph>
          总结网络面试中常见易错点与高频疑问，帮助考生规避失分陷阱。
        </Paragraph>
        <ul>
          <li>子网掩码与可用主机数计算错误</li>
          <li>静态/动态路由混淆</li>
          <li>VLAN间通信与三层交换原理</li>
          <li>协议端口号记忆混乱</li>
          <li>云网络安全策略理解不清</li>
        </ul>
        <Divider />
        <b>答疑：</b>
        <Paragraph>
          Q：如何高效准备网络工程师面试？
        </Paragraph>
        <Paragraph type="secondary">
          A：建议梳理知识体系，整理常见配置与命令，多做真题和场景题，注重原理与实际结合。
        </Paragraph>
      </Card>
    ),
  },
];

const prevHref = "/study/network/projects";
const nextHref = "/study/network/advanced";

const InterviewPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>面试题与答疑</Title>
        <Paragraph>
          本章汇总网络高频面试题、答题思路、场景案例与易错点，配合结构化流程图和答疑建议，助力高效备考。
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
          上一章：网络项目实战
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
          下一章：网络进阶与拓展
          <span style={{fontSize:22,marginLeft:6,display:'flex',alignItems:'center'}}>&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default InterviewPage; 