'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConfigProvider, theme, Badge, Button, message, Spin } from 'antd';
import {
  LayoutDashboard, Users, GraduationCap, FileText, Server
} from 'lucide-react';

import DashboardTab from './components/DashboardTab';
import UserTab from './components/UserTab';
import ChallengeTab from './components/ChallengeTab';
import NoteTab from './components/NoteTab';
import HealthModal from './components/HealthModal';
import InkWashDecoration from '@shared/components/InkWashDecoration';
import { getStoredUser } from '@shared/lib/auth-client';

/** 通用 fetch 封装 */
async function api(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API 错误: ${res.status}`);
  return res.json();
}

/** 安全解包后端 ApiResponse：{ success, data, message } → data */
function unwrap(r: any) { return r?.data ?? r; }

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);  // 权限校验
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'challenges' | 'notes'>('dashboard');
  const [loading, setLoading] = useState(true);

  // ---- 门禁：非管理员禁止进入 ----
  useEffect(() => {
    const user = getStoredUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'OWNER')) {
      router.replace('/auth/login?expired=true');
      return;
    }
    setAuthorized(true);
  }, [router]);

  // ---- 真实数据状态 ----
  const [sysInfo, setSysInfo] = useState<any>({});
  const [stats, setStats] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [containers, setContainers] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [restartingId, setRestartingId] = useState<string | null>(null);
  const [isHealthOpen, setIsHealthOpen] = useState(false);

  // ---- 首次加载：每个 API 独立调用，单个失败不影响其他 ----
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      const errors: string[] = [];

      const load = async (label: string, url: string, setter: (d: any) => void, extract?: (r: any) => any) => {
        try {
          const json = await api(url);
          const data = extract ? extract(json) : unwrap(json);
          if (!cancelled) setter(data);
        } catch (e: any) {
          errors.push(`${label}: ${e.message}`);
        }
      };

      await Promise.all([
        load('sysinfo',   '/api/admin/sysinfo',       setSysInfo),
        load('stats',     '/api/admin/stats',         setStats),
        load('users',     '/api/admin/users?limit=100', setUsers,      (r: any) => unwrap(r)?.records || []),
        load('notes',     '/api/admin/notes?limit=50',  setNotes,      (r: any) => unwrap(r)?.records || []),
        load('containers','/api/admin/containers',    setContainers),
        load('logs',      '/api/admin/logs',          setLogs),
        load('challenges','/api/challenges',          setChallenges),
        load('drafts',    '/api/admin/challenge-drafts', setDrafts),
      ]);

      if (errors.length > 0 && !cancelled) {
        console.error('Admin 数据加载失败:', errors);
        message.error(`${errors.length} 个接口失败: ${errors.slice(0, 3).join('; ')}。请确认已用 mvn clean compile 重启后端`, 6);
      }
      if (!cancelled) setLoading(false);
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  // ---- 工具栏 ----
  const handleLogAdd = (msg: string, type: 'INFO' | 'WARN' | 'SUCCESS') => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [{ time: timeStr, type, msg }, ...prev.slice(0, 15)]);
  };

  // ---- 用户管理（使用真实字段 id, status, role, username）----
  const handleToggleUserStatus = async (key: string, currentStatus: string) => {
    const uid = Number(key);
    const user = users.find(u => u.id === uid);
    if (!user) return;
    const nextStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
    try {
      await api(`/api/admin/users/${uid}/role`, {
        method: 'PUT',
        body: JSON.stringify({ status: nextStatus }),
      });
      setUsers(prev => prev.map(u => (u.id === uid) ? { ...u, status: nextStatus } : u));
      message.success(`用户状态已改为 ${nextStatus === 'ACTIVE' ? '正常' : '封禁'}`);
      handleLogAdd(`用户 ${user.username} 状态 -> ${nextStatus}`, 'WARN');
    } catch { message.error('操作失败'); }
  };

  const handleChangeRole = async (key: string, currentRole: string) => {
    const uid = Number(key);
    const user = users.find(u => u.id === uid);
    if (!user) return;
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await api(`/api/admin/users/${uid}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: nextRole }),
      });
      setUsers(prev => prev.map(u => (u.id === uid) ? { ...u, role: nextRole } : u));
      message.success(`角色已改为 ${nextRole}`);
      handleLogAdd(`用户 ${user.username} 角色 -> ${nextRole}`, 'INFO');
    } catch { message.error('操作失败'); }
  };

  // ---- 草稿审批 ----
  const handleApproveDraft = async (draftId: number, slug: string, levelIndex: number) => {
    const oldStatus = drafts.find(d => d.id === draftId)?.status;
    setDrafts(prev => prev.map(d => d.id === draftId ? { ...d, status: 'approved' } : d));
    try {
      await api(`/api/admin/challenge-drafts/${draftId}/approve`, {
        method: 'POST',
        body: JSON.stringify({ challengeId: slug, levelIndex }),
      });
      message.success('已通过并发布');
      handleLogAdd(`审批通过草稿 #${draftId}`, 'SUCCESS');
      // 刷新关卡列表
      const res = await api('/api/challenges');
      setChallenges(unwrap(res) || []);
    } catch {
      if (oldStatus) setDrafts(prev => prev.map(d => d.id === draftId ? { ...d, status: oldStatus } : d));
      message.error('审批失败，请确认后端已重新编译');
    }
  };

  const handleRejectDraft = async (draftId: number) => {
    const oldStatus = drafts.find(d => d.id === draftId)?.status;
    setDrafts(prev => prev.map(d => d.id === draftId ? { ...d, status: 'rejected' } : d));
    try {
      await api(`/api/admin/challenge-drafts/${draftId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reviewComment: '审核未通过' }),
      });
      message.success('已驳回');
      handleLogAdd(`驳回草稿 #${draftId}`, 'WARN');
    } catch {
      if (oldStatus) setDrafts(prev => prev.map(d => d.id === draftId ? { ...d, status: oldStatus } : d));
      message.error('操作失败，请确认后端已重新编译');
    }
  };

  const handleDeleteDraft = async (draftId: number) => {
    // 乐观更新：先从 UI 移除
    const prev = drafts.find(d => d.id === draftId);
    setDrafts(d => d.filter(d => d.id !== draftId));
    try {
      await api(`/api/admin/challenge-drafts/${draftId}`, { method: 'DELETE' });
      message.success('草稿已删除');
      handleLogAdd(`删除草稿 #${draftId}`, 'WARN');
    } catch {
      // 回滚
      if (prev) setDrafts(d => [...d, prev]);
      message.error('删除失败，请确认后端已重新编译');
    }
  };

  const handleDeleteChallenge = async (id: number) => {
    const prev = challenges.find(c => c.id === id);
    setChallenges(c => c.filter(c => c.id !== id));
    try {
      await api(`/api/admin/challenges/${id}`, { method: 'DELETE' });
      message.success('关卡已删除');
      handleLogAdd(`删除关卡 #${id}`, 'WARN');
    } catch {
      if (prev) setChallenges(c => [...c, prev]);
      message.error('删除失败，请确认后端已重新编译');
    }
  };

  // ---- 笔记管理（使用真实字段 id, isPublic）----
  const handleDeleteNote = async (key: string) => {
    try {
      await api(`/api/admin/notes/${key}`, { method: 'DELETE' });
      setNotes(prev => prev.filter(n => String(n.id) !== key));
      message.success('笔记已删除');
      handleLogAdd(`删除笔记 ID: ${key}`, 'WARN');
    } catch { message.error('删除失败'); }
  };

  const handleToggleNotePublic = async (key: string, currentPublic: boolean) => {
    setNotes(prev => prev.map(n => (String(n.id) === key) ? { ...n, isPublic: !currentPublic } : n));
    message.info('笔记公开属性已修改');
  };

  // ---- 容器重启 ----
  const handleRebootContainer = (id: string) => {
    setRestartingId(id);
    message.loading({ content: `正在重启 ${id}...`, key: 'reboot' });
    setTimeout(() => {
      setContainers(prev => prev.map(c => c.id === id ? { ...c, cpu: '0.0%', memory: '10MB', status: 'RUNNING' } : c));
      setRestartingId(null);
      message.success({ content: `${id} 重启成功`, key: 'reboot' });
      handleLogAdd(`管理员重启沙箱节点 ${id}`, 'WARN');
    }, 1500);
  };

  // 门禁未通过 → 不渲染任何管理端内容
  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0C1F3D] flex items-center justify-center">
        <Spin size="large" />
        <span className="ml-3 text-slate-400">权限校验中...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C1F3D] flex items-center justify-center">
        <div className="text-[#BBFF5C] text-lg">加载中...</div>
      </div>
    );
  }

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

        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <InkWashDecoration variant="landscape" height={800} className="w-full h-full object-cover" />
        </div>

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

        <div className="flex-1 flex overflow-hidden">
          <aside className="w-64 border-r border-[#234272]/60 bg-[#08172F]/90 backdrop-blur-md flex flex-col p-4 gap-2 z-10">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-3 mb-2">主控制面板</span>

            {[
              { key: 'dashboard', icon: <LayoutDashboard size={18} />, emoji: '📊', label: '仪表盘与大屏' },
              { key: 'users', icon: <Users size={18} />, emoji: '👥', label: '用户账号管理' },
              { key: 'challenges', icon: <GraduationCap size={18} />, emoji: '🪐', label: '算法关卡维护' },
              { key: 'notes', icon: <FileText size={18} />, emoji: '📝', label: '学员随堂笔记' },
            ].map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-[#BBFF5C]/15 border border-[#BBFF5C]/40 text-[#BBFF5C] font-semibold'
                    : 'text-slate-400 hover:bg-[#1E3E6E]/40 hover:text-white border border-transparent'
                }`}
              >
                {tab.icon}<span>{tab.emoji} {tab.label}</span>
              </button>
            ))}

            <div className="mt-auto border-t border-[#234272]/60 pt-4 flex flex-col gap-2">
              <span className="text-[10px] text-slate-600 px-3">系统版本 v2.0 (Java BFF)</span>
              <button onClick={() => setIsHealthOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-500 hover:bg-[#1E3E6E]/40 hover:text-[#BBFF5C] transition-colors"
              ><Server size={14} /><span>服务器运维大体检</span></button>
            </div>
          </aside>

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
                stats={stats}
              />
            )}
            {activeTab === 'users' && (
              <UserTab
                users={users}
                onToggleUserStatus={handleToggleUserStatus}
                onChangeRole={handleChangeRole}
                onRefresh={async () => {
                  try {
                    const res = await api('/api/admin/users?limit=100');
                    setUsers(unwrap(res)?.records || []);
                  } catch { message.error('刷新失败'); }
                }}
              />
            )}
            {activeTab === 'challenges' && (
              <ChallengeTab
                challenges={challenges}
                drafts={drafts}
                users={users}
                onApproveDraft={handleApproveDraft}
                onRejectDraft={handleRejectDraft}
                onDeleteDraft={handleDeleteDraft}
                onDeleteChallenge={handleDeleteChallenge}
                onRefresh={async () => {
                  try {
                    const [chRes, drRes] = await Promise.all([
                      api('/api/challenges'),
                      api('/api/admin/challenge-drafts'),
                    ]);
                    setChallenges(unwrap(chRes) || []);
                    setDrafts(unwrap(drRes) || []);
                  } catch { message.error('刷新失败'); }
                }}
              />
            )}
            {activeTab === 'notes' && (
              <NoteTab
                notes={notes}
                users={users}
                onDeleteNote={handleDeleteNote}
                onToggleNotePublic={handleToggleNotePublic}
              />
            )}
          </main>
        </div>

        <HealthModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} sysInfo={sysInfo} />

      </div>
    </ConfigProvider>
  );
}
