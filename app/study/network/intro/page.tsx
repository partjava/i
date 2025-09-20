"use client";

import React from 'react';
import { Card, Typography, Space, Divider, List } from 'antd';

const { Title, Paragraph, Text } = Typography;

const NetworkIntroPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={1}>计算机网络基础</Title>
        <Paragraph>
          计算机网络是将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，
          在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。
        </Paragraph>
      </Typography>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="为什么学习计算机网络？">
          <List
            dataSource={[
              '🌐 互联网时代的基础技能',
              '💼 IT行业的必备知识',
              '🔧 解决网络问题的能力',
              '🚀 理解新技术的基础'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>

        <Card title="网络的基本分类">
          <Title level={4}>按覆盖范围分类：</Title>
          <List
            dataSource={[
              '个人区域网(PAN)：覆盖范围约10米内，如蓝牙设备、智能手表',
              '局域网(LAN)：覆盖范围在几百米到几公里，如办公室、教室网络',
              '城域网(MAN)：覆盖一个城市范围，如城市监控网络',
              '广域网(WAN)：跨国家、跨洲际的网络，如互联网'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Title level={4}>按拓扑结构分类：</Title>
          <List
            dataSource={[
              '星型网络：所有设备连接到中央节点，易于管理但依赖中心节点',
              '环形网络：设备形成闭合环路，传输距离远但单个故障影响大',
              '总线型网络：所有设备共享一条通信线路，结构简单但容易形成瓶颈',
              '网状网络：设备间有多条路径，可靠性高但造价昂贵'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>

        <Card title="网络的基本功能">
          <Title level={4}>1. 资源共享</Title>
          <List
            dataSource={[
              '硬件共享：打印机、存储设备、扫描仪等',
              '软件共享：应用程序、数据库、系统软件等',
              '数据共享：文件、信息、多媒体资源等'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Title level={4}>2. 信息传输与通信</Title>
          <List
            dataSource={[
              '电子邮件：快速、便捷的信息传递',
              '即时通讯：实时交流与协作',
              '视频会议：远程会议与沟通',
              '网络电话：低成本的长途通信'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Title level={4}>3. 分布式处理</Title>
          <List
            dataSource={[
              '提高系统可靠性：多节点备份，避免单点故障',
              '提高系统处理能力：多节点并行处理',
              '实现负载均衡：合理分配计算资源'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>

        <Card title="学习建议">
          <List
            dataSource={[
              '📚 从基础概念开始，循序渐进',
              '🔍 理解网络分层模型，掌握各层功能',
              '📝 熟悉常用网络协议，了解其工作原理',
              '🔧 动手实践网络配置，积累实战经验',
              '🛡️ 关注网络安全知识，培养安全意识'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>

        <Divider />
      </Space>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '48px 0 0 0' }}>
        <a
          href="/study/network/comm-principle"
          style={{
            background: '#386ff6',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '16px',
            fontSize: 20,
            fontWeight: 500,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(56,111,246,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2055c7')}
          onMouseOut={e => (e.currentTarget.style.background = '#386ff6')}
        >
          下一章：网络通信原理
        </a>
      </div>
    </div>
  );
};

export default NetworkIntroPage; 