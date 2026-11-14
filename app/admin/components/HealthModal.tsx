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
  const maxProcessMem = info.maxProcessMemoryMB ?? 512;
  const cpuModel = info.cpuModel ?? '—';
  const cpuCores = info.cpuCores ?? 0;
  const loadAvg = info.loadAvg1Min ?? 0;
  const cpuPercent = Math.min(100, Math.round((loadAvg / Math.max(1, cpuCores)) * 100));
  const usedMem = info.usedMemoryGB ?? 0;
  const totalMem = info.totalMemoryGB ?? 0;
  const memPct = info.memoryUsagePercent ?? 0;
  const diskPct = info.disk ?? 0;
  const usedDiskGB = info.usedDiskGB ?? 0;
  const totalDiskGB = info.totalDiskGB ?? 0;
  const dbConnected = info.dbConnected !== false;

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
            <span>Java JVM Heap (后端服务堆内存占用)</span>
            <span className="font-semibold text-slate-100">{processMem}MB / {maxProcessMem}MB</span>
          </div>
          <Progress
            percent={Math.min(100, Math.round((processMem / Math.max(1, maxProcessMem)) * 100))}
            strokeColor={{ '0%': '#6366f1', '100%': '#a855f7' }}
            status="active"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Host CPU Core Load (1分钟负载: {loadAvg} / {cpuCores || 1} 核)</span>
            <span className="font-semibold text-slate-100">{cpuModel} ({cpuCores} 核)</span>
          </div>
          <Progress percent={cpuPercent} strokeColor="#3b82f6" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Physical Memory Usage (服务器物理内存负载)</span>
            <span className="font-semibold text-slate-100">{usedMem}GB / {totalMem}GB</span>
          </div>
          <Progress percent={memPct} strokeColor="#eab308" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Root Disk Usage (根分区磁盘占用)</span>
            <span className="font-semibold text-slate-100">{usedDiskGB}GB / {totalDiskGB}GB</span>
          </div>
          <Progress percent={Math.min(100, Math.round(diskPct))} strokeColor="#10b981" />
        </div>

        <Divider className="border-slate-800 my-2" />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card 
              size="small" 
              className="bg-slate-900 border border-slate-800" 
              title={
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Database size={12} /> MySQL 数据库状态
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>连接池:</span><span className="font-mono">HikariCP (SELECT 1)</span></div>
                <div className="flex justify-between">
                  <span>连通状态:</span>
                  <span className={`flex items-center gap-1 ${dbConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                    <Heart size={10} /> {dbConnected ? '正常连通' : '连接异常'}
                  </span>
                </div>
                <div className="flex justify-between"><span>运行时长:</span><span className="font-mono">{info.uptimeHours ?? 0} 小时</span></div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              size="small" 
              className="bg-slate-900 border border-slate-800" 
              title={
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <HardDrive size={12} /> 宿主机与 JVM 环境
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>操作系统:</span><span className="font-mono text-slate-200">{info.osType ?? '—'} ({info.osArch ?? '—'})</span></div>
                <div className="flex justify-between"><span>Java 版本:</span><span className="font-mono text-indigo-400">{info.nodeVersion ?? '—'}</span></div>
                <div className="flex justify-between"><span>CPU 使用率:</span><span className="font-mono text-emerald-400">{info.cpu ?? 0}%</span></div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
