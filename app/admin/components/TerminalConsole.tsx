'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalConsoleProps {
  users: Array<{ username: string }>;
  onLogAdd: (msg: string, type: 'INFO' | 'WARN' | 'SUCCESS') => void;
  sysInfo: any;
}

export default function TerminalConsole({ users, onLogAdd, sysInfo }: TerminalConsoleProps) {
  const info = sysInfo || {};
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([
    '========================================',
    '   PartJava Cloud Sandbox Console v1.2  ',
    '========================================',
    '输入 "help" 可以查看可执行的管理指令。',
    ''
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          '  docker ps        - 查看当前本地正在运行的 Docker 沙箱容器列表',
          '  system status    - 检查当前 Java JVM 堆内存与宿主机物理负载',
          '  logs             - 调出最近 3 条系统判题出错警报记录',
          '  clear            - 清理控制台屏幕历史'
        ];
        break;
      case 'docker ps':
        response = [
          'CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         NAMES',
          '9f82d12e3e4a   partjava/python-sb    "python3 -u run.py"      5 minutes ago   Up 5 minutes   sandbox-python-1',
          'c2a11b09ea88   partjava/python-sb    "python3 -u run.py"      2 hours ago     Up 2 hours     sandbox-python-2',
          'Active Container Count: 2 / Limit: 10'
        ];
        break;
      case 'system status':
        response = [
          '--- HOST PHYSICAL SYSTEM STATUS ---',
          `Operating System : ${info.osType ?? '—'} (${info.osArch ?? '—'})`,
          `OS Kernel Release: ${info.osRelease ?? '—'}`,
          `CPU Processor    : ${info.cpuModel ?? '—'}`,
          `CPU Core Count   : ${info.cpuCores ?? 0} Cores / LoadAvg 1m: ${info.loadAvg1Min ?? 0}`,
          `Physical Memory  : ${info.usedMemoryGB ?? 0}GB / ${info.totalMemoryGB ?? 0}GB (${info.memoryUsagePercent ?? 0}%)`,
          `Node.js version  : ${info.nodeVersion ?? '—'} (Uptime: ${info.uptimeHours ?? 0}h)`,
          `Process memory   : ${info.processMemoryMB ?? 0} MB (Heap footprint)`
        ];
        break;
      case 'logs':
        response = [
          '--- RECENT EXCEPTION ALERTS ---',
          '[15:10:02][ERROR] Connection timeout for AI agent subjective grading (retry after 2s)',
          '[15:10:14][WARN] User cyber_coder submitted empty file payload',
          '[15:11:03][ERROR] Docker daemon connection failed, fallback to JVM process execution'
        ];
        break;
      case 'clear':
        setCmdHistory([]);
        setCmdInput('');
        return;
      default:
        response = [`bash: command not found: ${cmdInput}. 输入 "help" 获取提示.`];
    }

    setCmdHistory(prev => [...prev, `root@partjava:~# ${cmdInput}`, ...response, '']);
    setCmdInput('');
    
    // Add audit entry in parent logs
    const timeStr = new Date().toTimeString().split(' ')[0];
    onLogAdd(`管理员在控制台执行了指令: "${trimmedCmd}"`, 'INFO');
  };

  return (
    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs flex flex-col h-[230px] overflow-hidden">
      <div className="flex items-center gap-1.5 text-slate-400 mb-2 border-b border-slate-900 pb-1">
        <Terminal size={14} className="text-indigo-400" />
        <span>OJ 交互式命令行控制台</span>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 select-text">
        {cmdHistory.map((h, i) => (
          <div key={i} className="whitespace-pre-wrap text-emerald-400">
            {h.startsWith('root@') ? (
              <span>
                <span className="text-indigo-400">root@partjava</span>
                <span className="text-slate-400">:~# </span>
                <span className="text-slate-200">{h.substring(13)}</span>
              </span>
            ) : (
              <span className="text-slate-300">{h}</span>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      
      <form onSubmit={handleCommandSubmit} className="flex gap-2 border-t border-slate-800 pt-2 mt-2">
        <span className="text-indigo-400">root@partjava</span>
        <span className="text-slate-400">:~#</span>
        <input
          type="text"
          value={cmdInput}
          onChange={(e) => setCmdInput(e.target.value)}
          placeholder="输入 'help' 以列出控制台命令..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 caret-indigo-400"
        />
      </form>
    </div>
  );
}
