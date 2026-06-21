"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Row, Col, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

const processStateData = [
  { key: '1', state: '新建（new）', desc: '进程正在被创建' },
  { key: '2', state: '就绪（ready）', desc: '等待被调度到CPU' },
  { key: '3', state: '运行（running）', desc: '正在CPU上执行' },
  { key: '4', state: '阻塞（blocked）', desc: '等待某事件完成' },
  { key: '5', state: '终止（terminated）', desc: '执行完毕或被终止' },
];

export default function OSProcessPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>进程与线程管理</Title>
      <Tabs defaultActiveKey="process" type="card" size="large">
        <Tabs.TabPane tab="进程" key="process">
          <Paragraph>
            <b>定义：</b>进程是程序的一次执行过程，是系统进行资源分配和调度的基本单位。
          </Paragraph>
          <Paragraph>
            <b>特征：</b>
            <ul>
              <li>动态性：进程是程序的一次执行</li>
              <li>并发性：多个进程可以同时执行</li>
              <li>独立性：进程是资源分配的基本单位</li>
              <li>异步性：进程按各自独立、不可预知的速度推进</li>
            </ul>
          </Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane tab="线程" key="thread">
          <Paragraph>
            <b>定义：</b>线程是进程中的一个执行单元，是CPU调度和分派的基本单位。
          </Paragraph>
          <Paragraph>
            <b>特征：</b>
            <ul>
              <li>轻量级：创建和切换开销小</li>
              <li>共享性：同一进程的线程共享进程资源</li>
              <li>并发性：多个线程可以并发执行</li>
              <li>独立性：线程是CPU调度的基本单位</li>
            </ul>
          </Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane tab="状态转换" key="state">
          <Paragraph>
            <b>进程状态：</b>
            <ul>
              <li>新建（New）</li>
              <li>就绪（Ready）</li>
              <li>运行（Running）</li>
              <li>阻塞（Blocked）</li>
              <li>终止（Terminated）</li>
            </ul>
          </Paragraph>
          <Paragraph>
            <b>状态转换图：</b>
            <div style={{overflowX: 'auto', margin: '16px 0'}}>
              <svg width="400" height="200" viewBox="0 0 400 200">
                <g fontSize="14">
                  <circle cx="80" cy="40" r="30" fill="#e3f2fd" />
                  <text x="80" y="45" textAnchor="middle">新建</text>
                  <circle cx="200" cy="40" r="30" fill="#bbdefb" />
                  <text x="200" y="45" textAnchor="middle">就绪</text>
                  <circle cx="320" cy="40" r="30" fill="#90caf9" />
                  <text x="320" y="45" textAnchor="middle">运行</text>
                  <circle cx="200" cy="120" r="30" fill="#e1bee7" />
                  <text x="200" y="125" textAnchor="middle">阻塞</text>
                  <circle cx="320" cy="120" r="30" fill="#c8e6c9" />
                  <text x="320" y="125" textAnchor="middle">终止</text>
                </g>
                <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                  <line x1="110" y1="40" x2="170" y2="40" />
                  <line x1="230" y1="40" x2="290" y2="40" />
                  <line x1="320" y1="70" x2="320" y2="90" />
                  <line x1="290" y1="120" x2="230" y2="120" />
                  <line x1="200" y1="90" x2="200" y2="70" />
                </g>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                  </marker>
                </defs>
              </svg>
            </div>
          </Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane tab="进程与线程对比" key="compare">
          <Paragraph>
            <b>核心区别：</b>
          </Paragraph>
          <Table
            bordered
            size="small"
            pagination={false}
            columns={[
              { title: '对比项', dataIndex: 'item', key: 'item' },
              { title: '进程', dataIndex: 'process', key: 'process' },
              { title: '线程', dataIndex: 'thread', key: 'thread' },
            ]}
            dataSource={[
              { key: 1, item: '地址空间', process: '独立', thread: '共享' },
              { key: 2, item: '调度', process: '操作系统调度', thread: '同一进程内调度' },
              { key: 3, item: '资源拥有', process: '拥有全部资源', thread: '只拥有部分资源' },
              { key: 4, item: '通信', process: 'IPC机制', thread: '直接通信' },
              { key: 5, item: '开销', process: '大', thread: '小' },
            ]}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="例题与解析" key="examples">
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>例题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题1（单选）：</b> 下列关于进程和线程的说法，正确的是：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. 进程是CPU调度的基本单位，线程是资源分配的基本单位</li>
            <li>B. 线程是CPU调度的基本单位，进程是资源分配的基本单位</li>
            <li>C. 进程和线程都是资源分配的基本单位</li>
            <li>D. 线程和进程都不能并发执行</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>B</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>解析：</b>进程是资源分配的基本单位，线程是CPU调度的基本单位。</Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>例题2（简答）：</b> 简述进程的五种基本状态及其转换关系。
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>答案要点：</b><br />
            新建（New）：正在创建进程<br />
            就绪（Ready）：已具备运行条件，等待CPU<br />
            运行（Running）：正在CPU上执行<br />
            阻塞（Blocked）：等待某事件完成<br />
            终止（Terminated）：执行完毕或被终止<br />
            转换关系见上方状态转换图。
          </Paragraph>
        </Tabs.TabPane>
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解进程和线程的区别与联系</li>
            <li>掌握进程状态转换的过程</li>
            <li>熟悉进程和线程的创建、终止方法</li>
            <li>了解进程同步和通信机制</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/intro">
          上一章：操作系统概述
        </Button>
        <Button type="primary" size="large" href="/study/os/memory">
          下一章：内存管理
        </Button>
      </div>
    </div>
  );
} 