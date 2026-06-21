"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

export default function OSIntroPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>操作系统概述</Title>
      <Card title="什么是操作系统？" className="mb-4">
        <Paragraph>
          操作系统（Operating System, OS）是管理计算机硬件与软件资源、为应用程序提供运行环境的系统软件，是计算机系统的核心。
        </Paragraph>
        <Paragraph>
          <b>核心作用：</b>
          <ul>
            <li>资源管理：统一管理CPU、内存、I/O、文件等资源</li>
            <li>程序运行控制：进程/线程调度与切换</li>
            <li>用户接口：命令行/图形界面</li>
            <li>安全与保护：权限、隔离、加密等</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>操作系统结构图：</b>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            <svg width="520" height="180" viewBox="0 0 520 180">
              {/* 用户层 */}
              <rect x="40" y="20" width="440" height="40" rx="10" fill="#e3f2fd" />
              <text x="260" y="45" textAnchor="middle" fontSize="16">用户/应用程序</text>
              {/* 系统调用箭头 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="260" y1="60" x2="260" y2="80" />
              </g>
              {/* OS内核层 */}
              <rect x="100" y="80" width="320" height="40" rx="10" fill="#bbdefb" />
              <text x="260" y="105" textAnchor="middle" fontSize="16">操作系统内核（进程管理 | 内存管理 | 文件系统 | 设备管理 | 安全）</text>
              {/* 硬件层 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="260" y1="120" x2="260" y2="140" />
              </g>
              <rect x="180" y="140" width="160" height="30" rx="8" fill="#c8e6c9" />
              <text x="260" y="160" textAnchor="middle" fontSize="15">硬件（CPU/内存/设备）</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
        </Paragraph>
      </Card>
      <Card title="发展历史" className="mb-4">
        <Paragraph>
          <b>操作系统发展时间轴：</b>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            <svg width="600" height="80" viewBox="0 0 600 80">
              <line x1="40" y1="40" x2="560" y2="40" stroke="#90caf9" strokeWidth="6" />
              {/* 节点 */}
              <g fontSize="13" fontFamily="monospace">
                <circle cx="60" cy="40" r="10" fill="#1976d2" />
                <text x="60" y="25" textAnchor="middle">1950s</text>
                <text x="60" y="65" textAnchor="middle">批处理</text>
                <circle cx="130" cy="40" r="10" fill="#1976d2" />
                <text x="130" y="25" textAnchor="middle">1960s</text>
                <text x="130" y="65" textAnchor="middle">分时</text>
                <circle cx="200" cy="40" r="10" fill="#1976d2" />
                <text x="200" y="25" textAnchor="middle">1970s</text>
                <text x="200" y="65" textAnchor="middle">UNIX</text>
                <circle cx="270" cy="40" r="10" fill="#1976d2" />
                <text x="270" y="25" textAnchor="middle">1980s</text>
                <text x="270" y="65" textAnchor="middle">微机OS</text>
                <circle cx="340" cy="40" r="10" fill="#1976d2" />
                <text x="340" y="25" textAnchor="middle">1990s</text>
                <text x="340" y="65" textAnchor="middle">Linux</text>
                <circle cx="410" cy="40" r="10" fill="#1976d2" />
                <text x="410" y="25" textAnchor="middle">2000s</text>
                <text x="410" y="65" textAnchor="middle">移动/嵌入式</text>
                <circle cx="480" cy="40" r="10" fill="#1976d2" />
                <text x="480" y="25" textAnchor="middle">2007</text>
                <text x="480" y="65" textAnchor="middle">ROS</text>
                <circle cx="550" cy="40" r="10" fill="#1976d2" />
                <text x="550" y="25" textAnchor="middle">未来</text>
                <text x="550" y="65" textAnchor="middle">云/智能</text>
              </g>
            </svg>
          </div>
        </Paragraph>
      </Card>
      <Card title="常见操作系统类型" className="mb-4">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>Windows</b>
              <Paragraph>微软公司开发，桌面和企业市场占有率高，界面友好。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>Linux</b>
              <Paragraph>开源、稳定，广泛用于服务器、嵌入式和云计算。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>macOS</b>
              <Paragraph>苹果公司开发，基于UNIX，界面美观，安全性高。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>Android/iOS</b>
              <Paragraph>主流移动操作系统，分别由Google和Apple开发。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>UNIX</b>
              <Paragraph>历史悠久，影响深远，许多现代OS源自UNIX。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>嵌入式/实时OS</b>
              <Paragraph>如RTOS，专为嵌入式和实时应用设计。</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered style={{marginBottom: 16}}>
              <b>机器人操作系统ROS</b>
              <Paragraph>开源机器人软件平台，推动机器人智能发展。</Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解操作系统的基本功能和作用</li>
            <li>关注主流操作系统的异同</li>
            <li>多做实验，结合实际理解原理</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-end mt-6">
        <Button type="primary" size="large" href="/study/os/process">
          下一章：进程与线程管理
        </Button>
      </div>
    </div>
  );
} 