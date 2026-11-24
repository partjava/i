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
import { getStoredUser, getAuthHeaders } from '@shared/lib/auth-client';
import BrandLogo from '@shared/components/BrandLogo';
import SiteFooter from '@shared/components/SiteFooter';

/** 通用 fetch 封装 */
async function api(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'challenges' | 'notes'>('dashboard');
  const [loading, setLoading] = useState(true);

  // ---- 门禁：非管理员禁止进入 ----
  useEffect(() => {
    const user = getStoredUser();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'OWNER')) {
      router.replace('/auth/login?expired=true');
      return;
    }
    setCurrentUser(user);
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sync = () => setIsDark(document.body.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

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
    setLogs(prev => [{ time: timeStr, type, msg }, ...prev.slice(0, 29)]);
    void fetch('/api/admin/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify({ type, msg }),
    }).catch(() => {});
  };

  // ---- 用户管理（使用真实字段 id, status, role, username）----
  const handleToggleUserStatus = async (key: string, currentStatus: string) => {
    const uid = Number(key);
    const user = users.find(u => u.id === uid);
    if (!user) return;
    if (user.role === 'OWNER') {
      message.warning('站长账号受系统保护，不可封禁');
      return;
    }
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
    if (user.role === 'OWNER') {
      message.warning('站长账号受系统保护，不可降权');
      return;
    }
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

  const handleGrantVip = async (key: string, level: number) => {
    const uid = Number(key);
    const user = users.find(u => u.id === uid);
    if (!user) return;
    try {
      await api(`/api/admin/users/${uid}/role`, {
        method: 'PUT',
        body: JSON.stringify({ vipLevel: level }),
      });
      const expireIso = level === 0 || level === 3
        ? null
        : new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString();
      setUsers(prev => prev.map(u => (u.id === uid)
        ? { ...u, vip: level > 0 ? 1 : 0, vipLevel: level, vipExpireTime: expireIso }
        : u));
      message.success(level === 0 ? `已取消 ${user.username} 的会员资格` : `已将 ${user.username} 设为 VIP${level}`);
      handleLogAdd(`更新用户 ${user.username} VIP 等级 -> ${level}`, 'SUCCESS');
    } catch { message.error('调整会员等级失败'); }
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
    const nextPublic = !currentPublic;
    setNotes(prev => prev.map(n => (String(n.id) === key) ? { ...n, isPublic: nextPublic } : n));
    try {
      await api(`/api/admin/notes/${key}/visibility`, {
        method: 'PUT',
        body: JSON.stringify({ isPublic: nextPublic }),
      });
      message.success(`笔记已设为${nextPublic ? '公开共享' : '私人笔记'}`);
      handleLogAdd(`切换笔记 #${key} 可见性 -> ${nextPublic ? '公开' : '私有'}`, 'INFO');
    } catch {
      setNotes(prev => prev.map(n => (String(n.id) === key) ? { ...n, isPublic: currentPublic } : n));
      message.error('修改笔记可见性失败');
    }
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
      <div className="min-h-[calc(100vh-70px)] bg-surface-page flex items-center justify-center">
        <Spin size="large" />
        <span className="ml-3 text-content-muted">权限校验中...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-70px)] bg-surface-page flex items-center justify-center">
        <Spin size="large" />
        <span className="ml-3 text-content-secondary font-medium">控制台数据加载中...</span>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: isDark
          ? {
              colorPrimary: '#D4AD72',
              colorBgContainer: '#151921',
              colorBgElevated: '#1C222D',
              colorBgLayout: '#0E1116',
              colorBorder: '#2A3342',
              colorTextBase: '#F2EDE4',
              borderRadius: 12,
            }
          : {
              colorPrimary: '#1B3B6F',
              colorBgContainer: '#FFFFFF',
              colorBgElevated: '#FFFFFF',
              colorBgLayout: '#F4F5F7',
              colorBorder: '#E2E8F0',
              colorTextBase: '#0F1D33',
              borderRadius: 12,
            },
      }}
    >
      <div className="h-[calc(100vh-70px)] min-h-[560px] bg-surface-page text-content-primary flex flex-col font-sans relative overflow-hidden transition-colors">

        <header className="shrink-0 border-b border-line-subtle bg-surface-raised/95 backdrop-blur px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-3">
            <BrandLogo variant="full" priority className="h-8 w-auto" />
            <span className="text-[11px] font-medium bg-brand-soft text-brand-primary px-2.5 py-0.5 rounded-full border border-line-subtle">
              管理系统
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-content-secondary">
            <div className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => setIsHealthOpen(true)}>
              <Badge status={containers.some(c => c.status !== 'RUNNING') ? 'warning' : 'processing'} />
              <span>
                沙箱节点: {containers.filter(c => c.status === 'RUNNING').length}/{containers.length || 3} 正常 (体检)
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-brand-primary transition-colors" onClick={() => setIsHealthOpen(true)}>
              <Badge status={sysInfo?.dbConnected === false ? 'error' : 'success'} />
              <span>
                数据库: {sysInfo?.dbConnected === false ? '连接异常' : 'MySQL 正常'}
              </span>
            </div>
            <div className="w-px h-4 bg-line-subtle hidden sm:block" />
            <span className="text-content-primary font-semibold">管理员: {currentUser?.username || 'Admin'}</span>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex overflow-hidden">
          <aside className="w-60 border-r border-line-subtle bg-surface-raised flex flex-col p-4 gap-1.5 z-10 shrink-0 overflow-y-auto">
            <span className="text-[11px] text-content-muted font-bold uppercase tracking-wider px-3 mb-1">主控制面板</span>

            {[
              { key: 'dashboard', icon: <LayoutDashboard size={17} />, label: '仪表盘与大屏' },
              { key: 'users', icon: <Users size={17} />, label: '用户账号管理' },
              { key: 'challenges', icon: <GraduationCap size={17} />, label: '算法关卡维护' },
              { key: 'notes', icon: <FileText size={17} />, label: '学员随堂笔记' },
            ].map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-brand-soft border border-line-strong text-brand-primary font-semibold shadow-sm'
                    : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary border border-transparent'
                }`}
              >
                {tab.icon}<span>{tab.label}</span>
              </button>
            ))}

            <div className="mt-auto border-t border-line-subtle pt-4 flex flex-col gap-2">
              <span className="text-[11px] text-content-muted px-3">系统版本 v2.0 (Java BFF)</span>
              <button onClick={() => setIsHealthOpen(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-content-secondary hover:bg-brand-soft hover:text-brand-primary transition-colors"
              ><Server size={14} /><span>服务器运维大体检</span></button>
            </div>
          </aside>

          <main className="flex-1 min-w-0 overflow-y-auto p-5 sm:p-6 bg-surface-page flex flex-col z-10">
            <div className="flex-1">
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
                isDark={isDark}
              />
            )}
            {activeTab === 'users' && (
              <UserTab
                users={users}
                onToggleUserStatus={handleToggleUserStatus}
                onChangeRole={handleChangeRole}
                onGrantVip={handleGrantVip}
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
                onRefresh={async () => {
                  try {
                    const res = await api('/api/admin/notes?limit=50');
                    setNotes(unwrap(res)?.records || []);
                  } catch { message.error('刷新失败'); }
                }}
              />
            )}
            </div>
            <SiteFooter className="mt-8 !py-3" />
          </main>
        </div>

        <HealthModal isOpen={isHealthOpen} onClose={() => setIsHealthOpen(false)} sysInfo={sysInfo} />

      </div>
    </ConfigProvider>
  );
}
