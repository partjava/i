'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EyePet from '@/app/components/EyePet';
import StitchLogo from '@/app/components/StitchLogo';
import InkWashDecoration from '@/app/components/InkWashDecoration';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ username: '', name: '', email: '', password: '', confirmPassword: '', bio: '', location: '', website: '', github: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.username) {
      setError('登录用户名不能为空');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(form.username)) {
      setError('登录用户名只能是英文和数字的组合');
      return;
    }
    if (!form.name) {
      setError('用户昵称不能为空');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (form.password.length < 6) {
      setError('密码至少需要 6 位字符');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, name: form.name, email: form.email, password: form.password, bio: form.bio, location: form.location, website: form.website, github: form.github }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/login?message=注册成功，请登录');
      } else {
        setError(data.error || '注册失败，请重试');
      }
    } catch {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }: { show: boolean }) => show ? (
    <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-[#0C1F3D] relative overflow-hidden font-sans text-[#EDF0F5]">
      
      {/* 背景晕染与水墨云雾景观 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#BBFF5C]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#6366f1]/10 blur-[100px] pointer-events-none" />
        
        {/* 系统水墨云山装饰 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <InkWashDecoration variant="landscape" height={900} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <InkWashDecoration variant="mist" height={900} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 左侧品牌区 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10 border-r border-[#1E3E6E]/30"
        style={{ background: 'radial-gradient(circle at 30% 30%, #132A4F 0%, #0C1F3D 100%)' }}>
        
        {/* 淡淡的水墨竹影/山水装饰 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 opacity-10">
          <InkWashDecoration variant="bamboo" height={700} />
        </div>
        <div className="absolute top-10 right-0 w-1/3 opacity-20">
          <InkWashDecoration variant="birds" height={200} />
        </div>

        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-[#6366f1]/10"
              style={{
                width: `${(i + 1) * 140}px`, height: `${(i + 1) * 140}px`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
          ))}
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#6366f1] to-[#BBFF5C] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <StitchLogo size={52} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d1d6e0] to-[#BBFF5C]">加入 PartJava</h1>
            <p className="text-lg text-[#b8bfcc] mt-2 font-light">水墨素笺与 Docker 沙箱交互式学习平台</p>
          </div>

          {/* 灵宠全息展示 */}
          <div className="flex justify-center mb-10 relative bg-[#0C1F3D]/40 py-6 rounded-2xl border border-[#1e3e6e]/20" style={{ height: 180 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#BBFF5C]/5 to-transparent rounded-2xl pointer-events-none" />
            <EyePet />
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: '创建账号', desc: '填写基础及扩展属性，即可开启专属云端沙箱容器' },
              { step: '02', title: '开始记录', desc: '在每个行星关卡下撰写学习笔记，渲染精美 LaTeX 公式' },
              { step: '03', title: '坚持打卡', desc: '基于 Redis Bitmaps 统计 365 天打卡，激活大地图 3D 星环' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gradient-to-br from-[#132A4F] to-[#0C1F3D] border border-[#234272]/80 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black text-[#BBFF5C] shadow-[0_4px_10px_rgba(187,255,92,0.15)]">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-white text-base">{item.title}</div>
                  <div className="text-xs text-[#b8bfcc] mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 手机端灵宠 */}
      <div className="lg:hidden fixed top-16 right-4 z-50">
        <EyePet />
      </div>

      {/* 右侧磨砂玻璃表单层 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 z-10 overflow-y-auto max-h-screen my-auto">
        <div className="w-full max-w-md bg-[#132A4F]/40 backdrop-blur-md border border-[#234272]/60 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(12,31,61,0.3)] my-6">
          
          {/* 移动端 Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#6366f1] to-[#BBFF5C] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <StitchLogo size={56} />
            </div>
            <h1 className="text-2xl font-black tracking-wider text-white">PartJava</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-wide">创建账号 🚀</h2>
            <p className="mt-2 text-[#b8bfcc] text-sm">
              已有账号？{' '}
              <Link href="/login" className="text-[#BBFF5C] hover:text-[#ccff7a] transition-colors font-medium">
                立即登录
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/20 border border-red-800/40 rounded-xl flex items-center gap-2.5 text-red-400 text-sm">
              <svg className="w-4.5 h-4.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 用户名 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">登录用户名 (只能是英文和数字的组合)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 106 0" />
                  </svg>
                </div>
                <input type="text" required value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="请设置您的登录用户名 (如: liming123)"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm font-sans" />
              </div>
            </div>

            {/* 昵称 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">用户昵称</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="请输入您的学名或昵称"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm" />
              </div>
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">邮箱地址</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="email" autoComplete="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all font-mono text-sm" />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">密码 (至少6位)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="至少 6 位字符"
                  className="w-full pl-10 pr-12 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#b8bfcc]/50 hover:text-white transition-colors">
                  <EyeIcon show={showPassword} />
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex gap-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                      form.password.length >= i * 3
                        ? i <= 1 ? 'bg-rose-500/80' : i <= 2 ? 'bg-amber-500/80' : i <= 3 ? 'bg-[#6366f1]/80' : 'bg-[#BBFF5C]/80'
                        : 'bg-[#0C1F3D]'
                    }`} />
                  ))}
                </div>
              )}
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">确认密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input type={showConfirm ? 'text' : 'password'} required value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="再次输入密码"
                  className={`w-full pl-10 pr-12 py-2.5 bg-[#08172F]/50 border focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm ${
                    form.confirmPassword && form.confirmPassword !== form.password
                      ? 'border-rose-900/40'
                      : 'border-[#234272]'
                  }`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#b8bfcc]/50 hover:text-white transition-colors">
                  <EyeIcon show={showConfirm} />
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p className="mt-1 text-xs text-rose-400">两次密码输入不一致</p>
              )}
            </div>

            {/* 简介 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">个性签名</label>
              <textarea value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                placeholder="简单介绍一下你自己..."
                rows={2}
                className="w-full px-4 py-2 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all resize-none text-sm" />
            </div>

            {/* 所在地 */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">所在地</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input type="text" value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  placeholder="如：北京、上海"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm" />
              </div>
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-1.5">GitHub 账号名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <input type="text" value={form.github}
                  onChange={e => setForm({ ...form, github: e.target.value })}
                  placeholder="您的 GitHub 用户名"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#08172F]/50 border border-[#234272] focus:border-[#BBFF5C]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BBFF5C]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-white font-black text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-4 shadow-[0_4px_15px_rgba(187,255,92,0.15)] hover:opacity-95"
              style={{ background: loading ? '#1e1b4b' : 'linear-gradient(135deg, #6366f1, #BBFF5C)', color: loading ? '#b8bfcc' : '#0C1F3D' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  云端账号初始化中...
                </span>
              ) : '注 册'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-[#5a6e8f]">
            注册即代表您已仔细阅读并同意{' '}
            <span className="text-[#6366f1] hover:text-[#818cf8] cursor-pointer transition-colors">服务协议</span>
            与
            <span className="text-[#6366f1] hover:text-[#818cf8] cursor-pointer transition-colors">隐私权政策</span>
          </div>
        </div>
      </div>
    </div>
  );
}
