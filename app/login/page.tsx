'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { message } from 'antd';
import EyePet from '@/app/components/EyePet';
import StitchLogo from '@/app/components/StitchLogo';
import InkWashDecoration from '@/app/components/InkWashDecoration';

function LoginStatusChecker() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('expired') === 'true') message.info('会话已过期，请重新登录');
    if (searchParams.get('error') === 'true') message.error('退出登录时发生错误');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('user_data');
    }
  }, [searchParams]);
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: true });

  useEffect(() => {
    if (status === 'authenticated' && session?.user) router.push('/');
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('请填写用户名/邮箱和密码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await signIn(form.email, form.password);
      if (result?.error) {
        setError(result.error || '用户名、邮箱或密码错误，请重试');
      } else if (result?.success) {
        message.success('登录成功');
        await new Promise(r => setTimeout(r, 300));
        window.location.href = '/';
      }
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0C1F3D] relative overflow-hidden font-sans text-[#EDF0F5]">
      
      {/* 🚀 背景动态晕染与系统预设的靛蓝/碧玉绿光晕 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#6366f1]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#BBFF5C]/5 blur-[100px] pointer-events-none" />
        
        {/* 系统水墨云雾/远山淡淡融入 */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <InkWashDecoration variant="landscape" height={800} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <InkWashDecoration variant="mist" height={800} className="w-full h-full object-cover" />
        </div>
      </div>

      <Suspense fallback={null}><LoginStatusChecker /></Suspense>

      {/* 左侧系统纸墨国潮展示 */}
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
                opacity: 1 - i * 0.2,
              }} />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#6366f1] to-[#BBFF5C] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
              <StitchLogo size={52} />
            </div>
            {/* 使用系统标准的宋体毛笔字感字体或加重粗体 */}
            <h1 className="text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d1d6e0] to-[#BBFF5C]">PartJava</h1>
            <p className="text-lg text-[#b8bfcc] mt-2 font-light">水墨素笺与 Docker 沙箱交互式学习平台</p>
          </div>

          {/* 灵宠展示 */}
          <div className="flex justify-center mb-10 relative bg-[#0C1F3D]/40 py-6 rounded-2xl border border-[#1e3e6e]/20" style={{ height: 180 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1]/5 to-transparent rounded-2xl pointer-events-none" />
            <EyePet />
          </div>

          <div className="space-y-4">
            {[
              { icon: '✍️', text: '记录学习笔记，沉淀知识体系', sub: '支持素笺渲染 Markdown 与 LaTeX 公式' },
              { icon: '🎋', text: '水墨日历打卡，见证每天进步', sub: '集成 Redis 位图日历打卡热力大图表' },
              { icon: '🎯', text: '关卡突破挑战，提升实战能力', sub: '基于 Docker 容器隔离的安全判题终端' },
              { icon: '💡', text: 'AI 智能导师，随时解答疑惑', sub: '支持会话首条消息标题自动归档与安全过滤' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start text-[#e2e6ed]">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white">{item.text}</div>
                  <div className="text-xs text-[#b8bfcc] mt-0.5">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 手机端挂件 */}
      <div className="lg:hidden fixed top-16 right-4 z-50">
        <EyePet />
      </div>

      {/* 右侧磨砂玻璃表单区 - 完全统一在系统藏青 (#0C1F3D) 配色下 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-md bg-[#132A4F]/40 backdrop-blur-md border border-[#234272]/60 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(12,31,61,0.3)]">
          
          {/* 移动端 Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#6366f1] to-[#BBFF5C] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <StitchLogo size={56} />
            </div>
            <h1 className="text-2xl font-black tracking-wider text-white">PartJava</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-wide">欢迎回来 👋</h2>
            <p className="mt-2 text-[#b8bfcc] text-sm">
              还没有账号？{' '}
              <Link href="/register" className="text-[#BBFF5C] hover:text-[#ccff7a] transition-colors font-medium">
                立即注册
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-2">用户名或邮箱</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="请输入您的用户名或邮箱"
                  className="w-full pl-10 pr-4 py-3 bg-[#08172F]/50 border border-[#234272] focus:border-[#6366f1]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#b8bfcc] uppercase tracking-wider mb-2">个人登录密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#b8bfcc]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="请输入您的登录密码"
                  className="w-full pl-10 pr-12 py-3 bg-[#08172F]/50 border border-[#234272] focus:border-[#6366f1]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6366f1]/20 text-[#EDF0F5] placeholder-[#5a6e8f] transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#b8bfcc]/50 hover:text-white transition-colors">
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={form.remember}
                  onChange={e => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#08172F] border-[#234272] text-[#6366f1] focus:ring-0 focus:ring-offset-0" />
                <span className="text-[#b8bfcc]">记住登录状态</span>
              </label>
              <Link href="/forgot-password" className="text-[#6366f1] hover:text-[#818cf8] transition-colors">
                忘记密码？
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:opacity-95"
              style={{ background: loading ? '#1e1b4b' : 'linear-gradient(135deg, #6366f1, #BBFF5C)', color: loading ? '#b8bfcc' : '#0C1F3D' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  凭证校验中...
                </span>
              ) : '登 录'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-[#5a6e8f]">
            登录即代表您已仔细阅读并同意{' '}
            <span className="text-[#6366f1] hover:text-[#818cf8] cursor-pointer transition-colors">服务协议</span>
            与
            <span className="text-[#6366f1] hover:text-[#818cf8] cursor-pointer transition-colors">隐私权政策</span>
          </div>
        </div>
      </div>
    </div>
  );
}
