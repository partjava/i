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
        <span className="text-content-primary flex items-center gap-2 font-bold">
          <Server size={18} className="text-brand-primary" />
          禾硙 Unolgy 平台健康度体检诊断
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
      <div className="mt-4 flex flex-col gap-6 text-sm text-content-secondary">
        <div>
          <div className="flex justify-between mb-1">
            <span>Java JVM Heap (后端服务堆内存占用)</span>
            <span className="font-semibold text-content-primary">{processMem}MB / {maxProcessMem}MB</span>
          </div>
          <Progress
            percent={Math.min(100, Math.round((processMem / Math.max(1, maxProcessMem)) * 100))}
            strokeColor={{ '0%': '#1B3B6F', '100%': '#D4AD72' }}
            status="active"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Host CPU Core Load (1分钟负载: {loadAvg} / {cpuCores || 1} 核)</span>
            <span className="font-semibold text-content-primary">{cpuModel} ({cpuCores} 核)</span>
          </div>
          <Progress percent={cpuPercent} strokeColor="#1B3B6F" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Physical Memory Usage (服务器物理内存负载)</span>
            <span className="font-semibold text-content-primary">{usedMem}GB / {totalMem}GB</span>
          </div>
          <Progress percent={memPct} strokeColor="#D4AD72" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span>Root Disk Usage (根分区磁盘占用)</span>
            <span className="font-semibold text-content-primary">{usedDiskGB}GB / {totalDiskGB}GB</span>
          </div>
          <Progress percent={Math.min(100, Math.round(diskPct))} strokeColor="#2F855A" />
        </div>

        <Divider className="border-line-subtle my-2" />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              size="small"
              className="bg-surface-muted border border-line-subtle rounded-xl"
              title={
                <span className="text-xs text-content-muted flex items-center gap-1">
                  <Database size={12} /> MySQL 数据库状态
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>连接池:</span><span className="font-mono">HikariCP (SELECT 1)</span></div>
                <div className="flex justify-between">
                  <span>连通状态:</span>
                  <span className={`flex items-center gap-1 ${dbConnected ? 'text-emerald-600' : 'text-red-500'}`}>
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
              className="bg-surface-muted border border-line-subtle rounded-xl"
              title={
                <span className="text-xs text-content-muted flex items-center gap-1">
                  <HardDrive size={12} /> 宿主机与 JVM 环境
                </span>
              }
            >
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between"><span>操作系统:</span><span className="font-mono text-content-primary">{info.osType ?? '—'} ({info.osArch ?? '—'})</span></div>
                <div className="flex justify-between"><span>Java 版本:</span><span className="font-mono text-brand-primary">{info.nodeVersion ?? '—'}</span></div>
                <div className="flex justify-between"><span>CPU 使用率:</span><span className="font-mono text-emerald-600">{info.cpu ?? 0}%</span></div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
