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
  stats?: any;
  isDark?: boolean;
}

export default function DashboardTab({
  users,
  containers,
  logs,
  restartingId,
  onRebootContainer,
  onLogAdd,
  sysInfo,
  stats,
  isDark = false,
}: DashboardTabProps) {
  const axisColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#252D3A' : '#E2E8F0';
  const primaryChart = isDark ? '#D4AD72' : '#1B3B6F';
  const primaryAreaTop = isDark ? 'rgba(212, 173, 114, 0.34)' : 'rgba(27, 59, 111, 0.28)';
  const secondaryChart = '#2F855A';
  const secondaryAreaTop = 'rgba(47, 133, 90, 0.28)';
  const piePalette = isDark
    ? ['#D4AD72', '#5B8DEF', '#34D399', '#C68B59', '#94A3B8', '#E2B478']
    : ['#1B3B6F', '#2F855A', '#C68B59', '#4A6FA5', '#64748B', '#D4AD72'];

  // ECharts Line Option
  const lineOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: isDark ? '#1C222D' : '#1B3B6F' } }
    },
    legend: {
      data: ['活跃学员人数', '代码提交评测次数'],
      textStyle: { color: axisColor }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: (stats?.weeklyTrend || []).length ? stats.weeklyTrend.map((t: any) => t.day) : ['周一', '周二', '周三', '周四', '周五', '周六', '今日'],
        axisLabel: { color: axisColor }
      }
    ],
    yAxis: [
      { type: 'value', axisLabel: { color: axisColor }, splitLine: { lineStyle: { color: gridColor } } }
    ],
    series: [
      {
        name: '活跃学员人数',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: primaryAreaTop }, { offset: 1, color: 'rgba(0, 0, 0, 0)' }]
          }
        },
        itemStyle: { color: primaryChart },
        lineStyle: { width: 2.5, color: primaryChart },
        data: (stats?.weeklyTrend || []).length ? stats.weeklyTrend.map((t: any) => t.activeUsers) : [120, 132, 101, 134, 190, 230, 210]
      },
      {
        name: '代码提交评测次数',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: secondaryAreaTop }, { offset: 1, color: 'rgba(0, 0, 0, 0)' }]
          }
        },
        itemStyle: { color: secondaryChart },
        lineStyle: { width: 2.5, color: secondaryChart },
        data: (stats?.weeklyTrend || []).length ? stats.weeklyTrend.map((t: any) => t.submissions) : [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };

  // ECharts Pie Option — 优先使用真实关卡阶段分布
  const stageDist = Array.isArray(stats?.stageDistribution) ? stats.stageDistribution : [];
  const pieOption = {
    backgroundColor: 'transparent',
    color: piePalette,
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    legend: { bottom: '0', left: 'center', textStyle: { color: axisColor }, type: 'scroll' },
    series: [
      {
        name: '关卡阶段分布',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: isDark ? '#151921' : '#FFFFFF', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: isDark ? '#F2EDE4' : '#0F1D33' } },
        labelLine: { show: false },
        data: stageDist.length > 0
          ? stageDist.map((item: any) => ({ value: Number(item.value || 0), name: item.name || `阶段 ${item.stageId}` }))
          : [{ value: stats?.challenges || 0, name: '暂无阶段分布数据' }]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 核心统计指标卡 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <Statistic
              title={<span className="text-content-muted text-xs font-medium">注册学员总量</span>}
              value={stats?.users ?? 0}
              prefix={<Users className="text-brand-primary mr-2" size={18} />}
              valueStyle={{ color: isDark ? '#F2EDE4' : '#0F1D33', fontWeight: 800 }}
            />
            <div className="text-[11px] text-emerald-600 mt-2">管理员 {stats?.admins ?? 0} 人</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <Statistic
              title={<span className="text-content-muted text-xs font-medium">学员笔记总量</span>}
              value={stats?.notes ?? 0}
              prefix={<FileText className="text-emerald-600 mr-2" size={18} />}
              valueStyle={{ color: isDark ? '#F2EDE4' : '#0F1D33', fontWeight: 800 }}
            />
            <div className="text-[11px] text-emerald-600 mt-2">公开 {stats?.publicNotes ?? 0} 篇</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <Statistic
              title={<span className="text-content-muted text-xs font-medium">沙箱评测容器</span>}
              value={containers.filter(c => c.status === 'RUNNING').length}
              suffix={`/ ${containers.length || 3}`}
              prefix={<Cpu className="text-[#D4AD72] mr-2" size={18} />}
              valueStyle={{ color: isDark ? '#F2EDE4' : '#0F1D33', fontWeight: 800 }}
            />
            <div className="text-[11px] text-content-muted mt-2">Docker 沙箱隔离评测中</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <Statistic
              title={<span className="text-content-muted text-xs font-medium">已发布关卡</span>}
              value={stats?.challenges ?? 0}
              prefix={<Activity className="text-[#C68B59] mr-2" size={18} />}
              valueStyle={{ color: isDark ? '#F2EDE4' : '#0F1D33', fontWeight: 800 }}
            />
            <div className="text-[11px] text-content-muted mt-2">封禁用户 {stats?.banned ?? 0} 人</div>
          </Card>
        </Col>
      </Row>

      {/* 数据图表展示 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title={<span className="text-content-primary font-bold flex items-center gap-2"><Activity size={16} className="text-brand-primary" /> 学员活跃度与代码评测频次趋势</span>} bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <ReactECharts option={lineOption} style={{ height: '270px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={<span className="text-content-primary font-bold flex items-center gap-2"><GraduationCap size={16} className="text-[#D4AD72]" /> 关卡技术类别覆盖图</span>} bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <ReactECharts option={pieOption} style={{ height: '270px' }} />
          </Card>
        </Col>
      </Row>

      {/* 沙箱节点监控 & 交互命令终端 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={<span className="text-content-primary font-bold flex items-center gap-2"><Server size={16} className="text-brand-primary" /> Docker 隔离评测容器监视器</span>} bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <Table
              dataSource={containers}
              rowKey="id"
              pagination={false}
              size="small"
              columns={[
                { title: '容器名称', dataIndex: 'name', key: 'name', render: text => <span className="font-mono text-xs">{text}</span> },
                { title: '状态', dataIndex: 'status', key: 'status', render: val => <Tag color={val === 'RUNNING' ? 'green' : 'default'}>{val}</Tag> },
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
          <TerminalConsole users={users} onLogAdd={onLogAdd} sysInfo={sysInfo} stats={stats} logs={logs} containers={containers} />
        </Col>
      </Row>

      {/* 实时滚动审计日志 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title={<span className="text-content-primary font-bold flex items-center gap-2"><Database size={16} className="text-brand-primary" /> 实时系统运行与安全审计日志</span>} bordered={false} className="bg-surface-raised border border-line-subtle shadow-sm rounded-2xl">
            <div className="flex flex-col gap-2 font-mono text-xs max-h-[160px] overflow-y-auto pr-2">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start border-b border-line-subtle pb-2">
                  <span className="text-content-muted">{log.time}</span>
                  <span className={log.type === 'SUCCESS' ? 'text-emerald-600' : log.type === 'WARN' ? 'text-amber-500' : 'text-brand-primary'}>
                    [{log.type}]
                  </span>
                  <span className="text-content-secondary break-all">{log.msg}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
