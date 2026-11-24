'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalConsoleProps {
  users: Array<{ id?: number; username: string; role?: string; status?: string }>;
  onLogAdd: (msg: string, type: 'INFO' | 'WARN' | 'SUCCESS') => void;
  sysInfo: any;
  stats?: any;
  logs?: Array<{ time: string; type: string; msg: string }>;
  containers?: Array<{ id: string; name: string; status: string; cpu: string; memory: string; uptime: string }>;
}

export default function TerminalConsole({ users, onLogAdd, sysInfo, stats, logs = [], containers = [] }: TerminalConsoleProps) {
  const info = sysInfo || {};
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([
    '========================================',
    '   Unolgy Cloud Sandbox Console v2.0    ',
    '========================================',
    '输入 "help" 可以查看可执行的管理指令。',
    ''
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = terminalContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [cmdHistory]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const trimmedCmd = cmdInput.trim().toLowerCase();
    let response: string[] = [];

    switch (trimmedCmd) {
      case 'help':
        response = [
          '支持的可执行管理端命令：',
          '  help             - 显示此命令帮助列表',
          '  docker ps        - 查看当前评测沙箱运行时节点列表',
          '  system status    - 检查当前 Java JVM 堆内存、磁盘与宿主机负载',
          '  stats            - 查看全站用户/笔记/关卡实时汇总统计',
          '  users            - 列出最近已加载的用户账号概要',
          '  logs             - 查看最近系统运行与审计日志',
          '  clear            - 清理控制台屏幕历史'
        ];
        break;
      case 'docker ps':
        if (containers.length > 0) {
          response = [
            'ID               NAME                       STATUS     CPU      MEM        UPTIME',
            ...containers.map(c =>
              `${String(c.id).padEnd(16)} ${String(c.name).padEnd(26)} ${String(c.status).padEnd(10)} ${String(c.cpu).padEnd(8)} ${String(c.memory).padEnd(10)} ${c.uptime || '—'}`
            ),
            `Running Containers: ${containers.filter(c => c.status === 'RUNNING').length} / ${containers.length}`
          ];
        } else {
          response = ['暂无沙箱节点上报，请检查 /api/admin/containers 接口。'];
        }
        break;
      case 'system status':
        response = [
          '--- HOST & JVM SYSTEM STATUS ---',
          `Operating System : ${info.osType ?? '—'} (${info.osArch ?? '—'})`,
          `OS Kernel Release: ${info.osRelease ?? '—'}`,
          `CPU Processor    : ${info.cpuModel ?? '—'}`,
          `CPU Core Count   : ${info.cpuCores ?? 0} Cores / LoadAvg 1m: ${info.loadAvg1Min ?? 0}`,
          `Physical Memory  : ${info.usedMemoryGB ?? 0}GB / ${info.totalMemoryGB ?? 0}GB (${info.memoryUsagePercent ?? 0}%)`,
          `Root Disk Usage  : ${info.usedDiskGB ?? 0}GB / ${info.totalDiskGB ?? 0}GB (${info.disk ?? 0}%)`,
          `Java JVM Version : ${info.nodeVersion ?? '—'} (Uptime: ${info.uptimeHours ?? 0}h)`,
          `JVM Heap Memory  : ${info.processMemoryMB ?? 0} MB / ${info.maxProcessMemoryMB ?? 512} MB`,
          `Database Status  : ${info.dbConnected === false ? 'DISCONNECTED' : 'CONNECTED (MySQL)'}`
        ];
        break;
      case 'stats':
        response = [
          '--- REALTIME PLATFORM STATS ---',
          `Total Users      : ${stats?.users ?? users.length} (Admins: ${stats?.admins ?? 0}, Banned: ${stats?.banned ?? 0})`,
          `Total Notes      : ${stats?.notes ?? 0} (Public: ${stats?.publicNotes ?? 0})`,
          `Published Levels : ${stats?.challenges ?? 0}`,
        ];
        break;
      case 'users':
        response = [
          `--- LOADED USERS (${users.length} total, showing first 10) ---`,
          ...(users.length > 0
            ? users.slice(0, 10).map(u => `  #${u.id ?? '?'}  ${u.username}  [${u.role ?? 'USER'} / ${u.status ?? 'ACTIVE'}]`)
            : ['  (暂无用户数据)'])
        ];
        break;
      case 'logs':
        response = [
          '--- RECENT SYSTEM AUDIT LOGS ---',
          ...(logs.length > 0
            ? logs.slice(0, 10).map(l => `[${l.time}][${l.type}] ${l.msg}`)
            : ['  (暂无系统日志记录)'])
        ];
        break;
      case 'clear':
        setCmdHistory([]);
        setCmdInput('');
        return;
      default:
        response = [`bash: command not found: ${cmdInput}. 输入 "help" 获取提示.`];
    }

    setCmdHistory(prev => [...prev, `root@unolgy:~# ${cmdInput}`, ...response, '']);
    setCmdInput('');
    onLogAdd(`管理员在控制台执行了指令: "${trimmedCmd}"`, 'INFO');
  };

  return (
    <div className="bg-[#0E1116] p-4 rounded-2xl border border-line-subtle font-mono text-xs flex flex-col h-[230px] overflow-hidden shadow-sm">
      <div className="flex items-center gap-1.5 text-[#D4AD72] mb-2 border-b border-white/10 pb-1.5">
        <Terminal size={14} className="text-[#D4AD72]" />
        <span>OJ 交互式命令行控制台</span>
      </div>
      
      <div ref={terminalContainerRef} className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 select-text">
        {cmdHistory.map((h, i) => (
          <div key={i} className="whitespace-pre-wrap text-emerald-400">
            {h.startsWith('root@') ? (
              <span>
                <span className="text-[#D4AD72]">root@unolgy</span>
                <span className="text-slate-400">:~# </span>
                <span className="text-slate-200">{h.includes(':~# ') ? h.slice(h.indexOf(':~# ') + 4) : h}</span>
              </span>
            ) : (
              <span className="text-slate-300">{h}</span>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommandSubmit} className="flex gap-2 border-t border-white/10 pt-2 mt-2">
        <span className="text-[#D4AD72]">root@unolgy</span>
        <span className="text-slate-400">:~#</span>
        <input
          type="text"
          value={cmdInput}
          onChange={(e) => setCmdInput(e.target.value)}
          placeholder="输入 'help' 以列出控制台命令..."
          className="flex-1 bg-transparent border-none outline-none text-[#F2EDE4] caret-[#D4AD72]"
        />
      </form>
    </div>
  );
}
