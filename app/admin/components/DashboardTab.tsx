'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Table, Button, Tag } from 'antd';
import { Users, FileText, Cpu, Activity, Database, Server, RefreshCw, GraduationCap } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import TerminalConsole from './TerminalConsole';

interface DashboardTabProps {
  users: Array<{ username: string }>;
  containers: Array<{ id: string; name: string; status: string; cpu: string; memory: string; uptime: string }>;
  logs: Array<{ time: string; type: string; msg: string }>;
  restartingId: string | null;
  onRebootContainer: (id: string) => void;
  onLogAdd: (msg: string, type: 'INFO' | 'WARN' | 'SUCCESS') => void;
  sysInfo: any;
}

export default function DashboardTab({
  users,
  containers,
  logs,
  restartingId,
  onRebootContainer,
  onLogAdd,
  sysInfo
}: DashboardTabProps) {
  // ECharts Line Option
  const lineOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#1e293b' } }
    },
    legend: {
      data: ['活跃学员人数', '代码提交评测次数'],
      textStyle: { color: '#94a3b8' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '今日'],
        axisLabel: { color: '#94a3b8' }
      }
    ],
    yAxis: [
      { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } }
    ],
    series: [
      {
        name: '活跃学员人数',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.4)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
          }
        },
        itemStyle: { color: '#3b82f6' },
        data: [120, 132, 101, 134, 190, 230, 210]
      },
      {
        name: '代码提交评测次数',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(168, 85, 247, 0.4)' }, { offset: 1, color: 'rgba(168, 85, 247, 0)' }]
          }
        },
        itemStyle: { color: '#a855f7' },
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };

  // ECharts Pie Option
  const pieOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    legend: { bottom: '0', left: 'center', textStyle: { color: '#94a3b8' } },
    series: [
      {
        name: '关卡技术栈分布',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#0f172a', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' } },
        labelLine: { show: false },
        data: [
          { value: 1, name: '基础概念' },
          { value: 1, name: 'Python科学计算' },
          { value: 1, name: '高等数学与微积分' },
          { value: 1, name: '特征工程与清洗' },
          { value: 1, name: '经典机器学习分类器' }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 核心统计指标卡 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-slate-900 border border-slate-800 shadow-sm">
            <Statistic 
              title={<span className="text-slate-400">注册学员总量</span>} 
              value={1280} 
              prefix={<Users className="text-indigo-400 mr-2" size={20} />} 
              valueStyle={{ color: '#fff', fontWeight: 900 }} 
            />
            <div className="text-[11px] text-emerald-400 mt-2">↑ 较上周增长 12.4%</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-slate-900 border border-slate-800 shadow-sm">
            <Statistic 
              title={<span className="text-slate-400">学员笔记总量</span>} 
              value={3420} 
              prefix={<FileText className="text-emerald-400 mr-2" size={20} />} 
              valueStyle={{ color: '#fff', fontWeight: 900 }} 
            />
            <div className="text-[11px] text-emerald-400 mt-2">↑ 本周新增记录 140 篇</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-slate-900 border border-slate-800 shadow-sm">
            <Statistic 
              title={<span className="text-slate-400">活跃评测容器数</span>} 
              value={containers.filter(c => c.status === 'RUNNING').length} 
              suffix="/ 10" 
              prefix={<Cpu className="text-amber-400 mr-2" size={20} />} 
              valueStyle={{ color: '#fff', fontWeight: 900 }} 
            />
            <div className="text-[11px] text-slate-400 mt-2">Docker 沙箱隔离评测中</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-slate-900 border border-slate-800 shadow-sm">
            <Statistic 
              title={<span className="text-slate-400">挑战平均通关率</span>} 
              value={78.4} 
              suffix="%" 
              prefix={<Activity className="text-fuchsia-400 mr-2" size={20} />} 
              valueStyle={{ color: '#fff', fontWeight: 900 }} 
            />
            <div className="text-[11px] text-slate-400 mt-2">平台活跃转化平稳</div>
          </Card>
        </Col>
      </Row>

      {/* 数据图表展示 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title={<span className="text-slate-200 font-bold flex items-center gap-2"><Activity size={16} /> 学员活跃度与代码评测频次趋势</span>} bordered={false} className="bg-slate-900 border border-slate-800">
            <ReactECharts option={lineOption} style={{ height: '280px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={<span className="text-slate-200 font-bold flex items-center gap-2"><GraduationCap size={16} /> 关卡技术类别覆盖图</span>} bordered={false} className="bg-slate-900 border border-slate-800">
            <ReactECharts option={pieOption} style={{ height: '280px' }} />
          </Card>
        </Col>
      </Row>

      {/* 沙箱节点监控 & 交互命令终端 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={<span className="text-slate-200 font-bold flex items-center gap-2"><Server size={16} /> Docker 隔离评测容器监视器</span>} bordered={false} className="bg-slate-900 border border-slate-800">
            <Table
              dataSource={containers}
              rowKey="id"
              pagination={false}
              size="small"
              columns={[
                { title: '容器名称', dataIndex: 'name', key: 'name', render: text => <span className="font-mono text-xs">{text}</span> },
                { title: '状态', dataIndex: 'status', key: 'status', render: val => <Tag color={val === 'RUNNING' ? 'green' : 'gray'}>{val}</Tag> },
                { title: 'CPU 负载', dataIndex: 'cpu', key: 'cpu', render: val => <span className="font-mono text-xs text-amber-500">{val}</span> },
                { title: '内存开销', dataIndex: 'memory', key: 'memory', render: val => <span className="font-mono text-xs">{val}</span> },
                { title: '运行时长', dataIndex: 'uptime', key: 'uptime' },
                {
                  title: '运维',
                  key: 'reboot',
                  render: (_, record) => (
                    <Button
                      size="small"
                      icon={<RefreshCw size={10} className={`inline mr-1 ${restartingId === record.id ? 'animate-spin' : ''}`} />}
                      disabled={restartingId !== null}
                      onClick={() => onRebootContainer(record.id)}
                    >
                      重启
                    </Button>
                  )
                }
              ]}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <TerminalConsole users={users} onLogAdd={onLogAdd} sysInfo={sysInfo} />
        </Col>
      </Row>

      {/* 实时滚动审计日志 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title={<span className="text-slate-200 font-bold flex items-center gap-2"><Database size={16} /> 实时系统运行与安全审计日志</span>} bordered={false} className="bg-slate-900 border border-slate-800">
            <div className="flex flex-col gap-2 font-mono text-xs max-h-[160px] overflow-y-auto pr-2">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start border-b border-slate-800/40 pb-2">
                  <span className="text-slate-500">{log.time}</span>
                  <span className={log.type === 'SUCCESS' ? 'text-emerald-400' : log.type === 'WARN' ? 'text-amber-400' : 'text-indigo-400'}>
                    [{log.type}]
                  </span>
                  <span className="text-slate-300 break-all">{log.msg}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
