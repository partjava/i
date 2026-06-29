'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme, Badge, Button, message } from 'antd';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  Server, 
  Settings 
} from 'lucide-react';

// 导入拆分后的各子业务组件
import DashboardTab from './components/DashboardTab';
import UserTab from './components/UserTab';
import ChallengeTab from './components/ChallengeTab';
import NoteTab from './components/NoteTab';
import HealthModal from './components/HealthModal';
import InkWashDecoration from '@/app/components/InkWashDecoration';

// --- MOCK DATA ---
const INITIAL_USERS = [
  { key: '1', id: 1001, username: 'liming', email: 'liming@partjava.com', role: 'ADMIN', status: 'ACTIVE', regDate: '2026-01-10' },
  { key: '2', id: 1002, username: 'student_01', email: 'stu01@partjava.com', role: 'USER', status: 'ACTIVE', regDate: '2026-06-15' },
  { key: '3', id: 1003, username: 'cyber_coder', email: 'ccoder@partjava.com', role: 'USER', status: 'BANNED', regDate: '2026-06-20' },
  { key: '4', id: 1004, username: 'java_master', email: 'jmaster@partjava.com', role: 'USER', status: 'ACTIVE', regDate: '2026-06-25' },
  { key: '5', id: 1005, username: 'ai_learner', email: 'ailearn@partjava.com', role: 'USER', status: 'ACTIVE', regDate: '2026-06-27' },
];

const INITIAL_CHALLENGES = [
  { id: 1, name: '基础知识', desc: '掌握人工智能的起源与基本概念。', codeTemplate: 'def solve(x):\n    # 请在此处补全逻辑\n    return x', expectedOutput: 'Hello AI', topicCount: 5 },
  { id: 2, name: 'Python编程', desc: '学习并掌握 Python 中基本的数据分析包与运算。', codeTemplate: 'def calculate_mean(arr):\n    # 计算数组的平均值\n    return sum(arr) / len(arr)', expectedOutput: '5.0', topicCount: 8 },
  { id: 3, name: '数学基础', desc: '线性代数与梯度下降的基本数学原理。', codeTemplate: 'def gradient_descent(w, lr):\n    # 模拟单步梯度更新\n    return w - lr * 2 * w', expectedOutput: '0.8', topicCount: 10 },
  { id: 4, name: '数据预处理', desc: '缺失值填充与特征工程基本算法。', codeTemplate: 'def scale_feature(x, min_val, max_val):\n    # MinMax 归一化\n    return (x - min_val) / (max_val - min_val)', expectedOutput: '0.5', topicCount: 6 },
  { id: 5, name: '机器学习基础', desc: 'KNN 与分类器的搭建与判定。', codeTemplate: 'def knn_predict(train_x, train_y, test_x):\n    # 返回最近邻类别\n    return train_y[0]', expectedOutput: '1', topicCount: 7 },
];

const INITIAL_NOTES = [
  { key: '1', title: '关于梯度下降的直观数学理解', author: 'liming', category: '数学基础', isPublic: true, date: '2026-06-27 15:30' },
  { key: '2', title: 'Python List 推导式及其时间复杂度分析', author: 'student_01', category: 'Python编程', isPublic: true, date: '2026-06-28 09:12' },
  { key: '3', title: 'SVM分类间隔与支持向量的几何推导', author: 'java_master', category: '机器学习基础', isPublic: false, date: '2026-06-28 11:45' },
  { key: '4', title: 'K-Means 聚类中心点随机初始化的坑', author: 'ai_learner', category: '机器学习基础', isPublic: true, date: '2026-06-28 14:02' },
];

const INITIAL_CONTAINERS = [
  { id: 'sb-node-01', name: 'sandbox-python-1', status: 'RUNNING', cpu: '0.2%', memory: '42MB', uptime: '12h 45m' },
  { id: 'sb-node-02', name: 'sandbox-python-2', status: 'RUNNING', cpu: '0.0%', memory: '38MB', uptime: '12h 45m' },
  { id: 'sb-node-03', name: 'sandbox-python-3', status: 'IDLE', cpu: '0.0%', memory: '12MB', uptime: '3h 12m' },
];

const SYSTEM_LOGS = [
  { time: '15:10:02', type: 'INFO', msg: 'Docker判题沙箱心跳存活: OK. 运行容器数: 2' },
  { time: '15:10:14', type: 'SUCCESS', msg: '用户 student_01 提交 Python编程 评测通过: PASSED' },
  { time: '15:11:45', type: 'WARN', msg: '用户 cyber_coder 账户状态被置为 [BANNED]' },
  { time: '15:12:08', type: 'INFO', msg: '数据库连接正常. 数据库缓存命中率: 94.2%' },
  { time: '15:12:30', type: 'INFO', msg: 'LLM 智能评测打分引擎连接成功, API 可用性 100%' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'challenges' | 'notes'>('dashboard');
  
  // Host Telemetry State
  const [sysInfo, setSysInfo] = useState<any>({
    osType: 'Linux',
    osRelease: 'Loading...',
    osArch: 'x64',
    cpuModel: 'Intel Core CPU',
    cpuCores: 8,
    totalMemoryGB: 16.0,
    freeMemoryGB: 8.0,
    usedMemoryGB: 8.0,
    memoryUsagePercent: 50.0,
    loadAvg1Min: 0.1,
    loadAvg5Min: 0.2,
    loadAvg15Min: 0.15,
    nodeVersion: 'v20.20.2',
    uptimeHours: 0.0,
    processMemoryMB: 120.0
  });

  // Data States
  const [users, setUsers] = useState(INITIAL_USERS);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [logs, setLogs] = useState(SYSTEM_LOGS);
  const [containers, setContainers] = useState(INITIAL_CONTAINERS);

  // Health modal trigger
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [restartingId, setRestartingId] = useState<string | null>(null);

  // Fetch real-time physical system info
  useEffect(() => {
    const fetchSysInfo = async () => {
      try {
        const res = await fetch('/api/admin/sysinfo');
        if (res.ok) {
          const data = await res.json();
          setSysInfo(data);
        }
      } catch (err) {
        console.error("Failed to fetch system info:", err);
      }
    };
    fetchSysInfo();
    const interval = setInterval(fetchSysInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add a log entry dynamically
  const handleLogAdd = (msg: string, type: 'INFO' | 'WARN' | 'SUCCESS') => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [{ time: timeStr, type, msg }, ...prev.slice(0, 15)]);
  };

  // User tab events
  const handleToggleUserStatus = (key: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    setUsers(prev => prev.map(u => u.key === key ? { ...u, status: nextStatus } : u));
    message.success(`操作成功！已将用户状态置为 ${nextStatus === 'ACTIVE' ? '正常' : '封禁'}`);
    handleLogAdd(`用户状态变更: ${users.find(u => u.key === key)?.username} -> ${nextStatus}`, 'WARN');
  };

  const handleChangeRole = (key: string, currentRole: string) => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    setUsers(prev => prev.map(u => u.key === key ? { ...u, role: nextRole } : u));
    message.success(`角色变更成功！已设为 ${nextRole}`);
    handleLogAdd(`用户角色变更: ${users.find(u => u.key === key)?.username} -> ${nextRole}`, 'INFO');
  };

  // Note tab events
  const handleDeleteNote = (key: string) => {
    const title = notes.find(n => n.key === key)?.title;
    setNotes(prev => prev.filter(n => n.key !== key));
    message.success('笔记下架并删除成功！');
    handleLogAdd(`下架违规笔记: "${title}"`, 'WARN');
  };

  const handleToggleNotePublic = (key: string, currentPublic: boolean) => {
    setNotes(prev => prev.map(n => n.key === key ? { ...n, isPublic: !currentPublic } : n));
    message.info('笔记公开属性修改成功！');
    handleLogAdd(`修改笔记公开属性: "${notes.find(n => n.key === key)?.title}"`, 'INFO');
  };

  // Challenge tab events
  const handleSaveChallenge = (id: number, values: any) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, ...values } : c));
    message.success('关卡配置热更新成功！已同步至模拟数据库。');
    handleLogAdd(`编辑更新关卡配置: ST-0${id} "${values.name}"`, 'SUCCESS');
  };

  // Container reboot simulation
  const handleRebootContainer = (id: string) => {
    setRestartingId(id);
    message.loading({ content: `正在重启沙箱节点 ${id}...`, key: 'reboot' });
    
    setTimeout(() => {
      setContainers(prev => prev.map(c => c.id === id ? { ...c, cpu: '0.0%', memory: '10MB', status: 'RUNNING' } : c));
      setRestartingId(null);
      message.success({ content: `沙箱节点 ${id} 重启成功！系统负载已释放。`, key: 'reboot' });
      handleLogAdd(`系统运维: 管理员手动重启了沙箱运行节点 ${id}`, 'WARN');
    }, 1500);
  };

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#BBFF5C',
          colorBgContainer: '#08172F',
          colorBgElevated: '#112240',
          colorBgLayout: '#0C1F3D',
          colorBorder: '#234272',
          colorTextBase: '#EDF0F5',
          borderRadius: 12,
        }
      }}
    >
      <div className="min-h-screen bg-[#0C1F3D] text-[#EDF0F5] flex flex-col font-sans relative overflow-hidden">
        
        {/* 水墨装饰背景 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <InkWashDecoration variant="landscape" height={800} className="w-full h-full object-cover" />
        </div>

        {/* 顶部统一 Header 状态条 */}
        <header className="border-b border-[#234272]/60 bg-[#0C1F3D]/80 backdrop-blur px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#BBFF5C]/60 rounded flex items-center justify-center bg-[#BBFF5C]/10 shadow-[0_0_15px_rgba(187,255,92,0.2)]">
              <span className="text-[#BBFF5C] text-lg font-black font-serif">学</span>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">Part<span className="text-[#BBFF5C] font-light">Java</span></span>
              <span className="ml-2 text-[10px] bg-[#BBFF5C]/15 text-[#BBFF5C] px-1.5 py-0.5 rounded border border-[#BBFF5C]/30">管理系统</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-85" onClick={() => setIsHealthOpen(true)}>
              <Badge status="processing" />
              <span className="hover:text-indigo-400 transition-colors">沙箱节点: 3/3 正常 (体检)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-85" onClick={() => setIsHealthOpen(true)}>
              <Badge status="success" />
              <span className="hover:text-indigo-400 transition-colors">MySQL/Redis: 连接中</span>
            </div>
            <div className="w-px h-4 bg-[#234272]/60" />
            <span className="text-slate-300 font-medium">管理员: liming</span>
          </div>
        </header>

        {/* 核心内容区域 */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* 左侧侧边菜单栏 */}
          <aside className="w-64 border-r border-[#234272]/60 bg-[#08172F]/90 backdrop-blur-md flex flex-col p-4 gap-2 z-10">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2">主控制面板</span>
            
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-[#BBFF5C]/15 border border-[#BBFF5C]/40 text-[#BBFF5C] font-semibold' : 'text-slate-400 hover:bg-[#1E3E6E]/40 hover:text-white border border-transparent'}`}
            >
              <LayoutDashboard size={18} />
              <span>📊 仪表盘与大屏</span>
            </button>

            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeTab === 'users' ? 'bg-[#BBFF5C]/15 border border-[#BBFF5C]/40 text-[#BBFF5C] font-semibold' : 'text-slate-400 hover:bg-[#1E3E6E]/40 hover:text-white border border-transparent'}`}
            >
              <Users size={18} />
              <span>👥 用户账号管理</span>
            </button>

            <button 
              onClick={() => setActiveTab('challenges')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeTab === 'challenges' ? 'bg-[#BBFF5C]/15 border border-[#BBFF5C]/40 text-[#BBFF5C] font-semibold' : 'text-slate-400 hover:bg-[#1E3E6E]/40 hover:text-white border border-transparent'}`}
            >
              <GraduationCap size={18} />
              <span>🪐 算法关卡维护</span>
            </button>

            <button 
              onClick={() => setActiveTab('notes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${activeTab === 'notes' ? 'bg-[#BBFF5C]/15 border border-[#BBFF5C]/40 text-[#BBFF5C] font-semibold' : 'text-slate-400 hover:bg-[#1E3E6E]/40 hover:text-white border border-transparent'}`}
            >
              <FileText size={18} />
              <span>📝 学员随堂笔记</span>
            </button>

            <div className="mt-auto border-t border-[#234272]/60 pt-4 flex flex-col gap-2">
              <span className="text-[10px] text-slate-600 px-3">系统版本 v1.2.0 (Java BFF)</span>
              <button 
                onClick={() => setIsHealthOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-500 hover:bg-[#1E3E6E]/40 hover:text-[#BBFF5C] transition-colors"
              >
                <Server size={14} />
                <span>服务器运维大体检</span>
              </button>
            </div>
          </aside>

          {/* 右侧业务标签内容分发 */}
          <main className="flex-1 overflow-y-auto p-6 bg-[#0C1F3D]/40 backdrop-blur-sm z-10">
            {activeTab === 'dashboard' && (
              <DashboardTab 
                users={users}
                containers={containers}
                logs={logs}
                restartingId={restartingId}
                onRebootContainer={handleRebootContainer}
                onLogAdd={handleLogAdd}
                sysInfo={sysInfo}
              />
            )}

            {activeTab === 'users' && (
              <UserTab 
                users={users}
                onToggleUserStatus={handleToggleUserStatus}
                onChangeRole={handleChangeRole}
              />
            )}

            {activeTab === 'challenges' && (
              <ChallengeTab 
                challenges={challenges}
                onSaveChallenge={handleSaveChallenge}
              />
            )}

            {activeTab === 'notes' && (
              <NoteTab 
                notes={notes}
                onDeleteNote={handleDeleteNote}
                onToggleNotePublic={handleToggleNotePublic}
              />
            )}
          </main>

        </div>

        {/* 服务器健康监测诊断大弹窗 */}
        <HealthModal 
          isOpen={isHealthOpen} 
          onClose={() => setIsHealthOpen(false)} 
          sysInfo={sysInfo}
        />

      </div>
    </ConfigProvider>
  );
}
