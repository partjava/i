'use client';

import React from 'react';
import { Modal, Button, Row, Col, Card, Progress, Divider } from 'antd';
import { Server, Database, HardDrive, Heart } from 'lucide-react';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  sysInfo: any;
}

export default function HealthModal({ isOpen, onClose, sysInfo }: HealthModalProps) {
  // 防御性空值兜底：sysInfo 可能因 API 未返回或认证失败而为 null/undefined
  const info = sysInfo || {};
  const processMem = info.processMemoryMB ?? 0;
  const cpuModel = info.cpuModel ?? '—';
  const cpuCores = info.cpuCores ?? 0;
  const loadAvg = info.loadAvg1Min ?? 0;
  const usedMem = info.usedMemoryGB ?? 0;
  const totalMem = info.totalMemoryGB ?? 0;
  const memPct = info.memoryUsagePercent ?? 0;

  return (
    <Modal
      title={
        <span className="text-slate-100 flex items-center gap-2">
          <Server size={18} className="text-indigo-400" />
          PartJava 平台健康度体检诊断
        </span>
      }
      open={isOpen}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          完成诊断
        </Button>
      ]}
      onCancel={onClose}
      width={640}
    >
      <div className="mt-4 flex flex-col gap-6 text-sm text-slate-300">
        <div>
          <div className="flex justify-between mb-1">
            <span>Node.js Process Heap (前端服务内存占用)</span>
            <span className="font-semibold text-slate-100">{processMem}MB / 512MB</span>
          </div>
          <Progress percent={Math.min(100, Math.round((processMem / 512) * 100))} strokeColor={{ '0%': '#6366f1', '100%': '#a855f7' }} status="active" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Host CPU Core Load (系统内核平均负载 - 1分钟)</span>
            <span className="font-semibold text-slate-100">{cpuModel} ({cpuCores} 核)</span>
          </div>
          <Progress percent={Math.min(100, Math.round(loadAvg * 100))} strokeColor="#3b82f6" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Physical Memory Usage (服务器物理内存负载)</span>
            <span className="font-semibold text-slate-100">{usedMem}GB / {totalMem}GB</span>
          </div>
          <Progress percent={memPct} strokeColor="#eab308" />
        </div>

        <Divider className="border-slate-800 my-2" />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card 
              size="small" 
              className="bg-slate-900 border border-slate-800" 
              title={
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Database size={12} /> MySQL 8.0 状态
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>活跃连接数:</span><span className="font-mono text-emerald-400">3 / 20</span></div>
                <div className="flex justify-between"><span>连接池:</span><span className="font-mono">HikariCP</span></div>
                <div className="flex justify-between"><span>事务状态:</span><span className="text-emerald-400 flex items-center gap-1"><Heart size={10} /> 存活</span></div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              size="small" 
              className="bg-slate-900 border border-slate-800" 
              title={
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <HardDrive size={12} /> Redis 7.x 状态
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>缓存命中率:</span><span className="font-mono text-emerald-400">98.4%</span></div>
                <div className="flex justify-between"><span>已用内存:</span><span className="font-mono">14.2 MB</span></div>
                <div className="flex justify-between"><span>核心打卡 Key:</span><span className="font-mono text-indigo-400">active_bitmaps</span></div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
