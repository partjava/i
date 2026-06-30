'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import EyePet from '@shared/components/EyePet';
import InkWashDecoration from '@shared/components/InkWashDecoration';

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
    <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-paper-100 relative overflow-hidden font-sans text-ink">

      {/* 背景晕染 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#BBFF5C]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#6366f1]/5 blur-[100px] pointer-events-none" />
      </div>

      {/* 左侧品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10 border-r border-paper-300"
        style={{ background: 'radial-gradient(circle at 30% 30%, #eef2f8 0%, #EDF0F5 100%)' }}>

        {/* 水墨装饰 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 opacity-10">
          <InkWashDecoration variant="bamboo" height={700} />
        </div>
        <div className="absolute top-10 right-0 w-1/3 opacity-20">
          <InkWashDecoration variant="birds" height={200} />
        </div>

        <div className="absolute inset-0 opacity-15">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-brand-primary/20"
              style={{
                width: `${(i + 1) * 140}px`, height: `${(i + 1) * 140}px`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
          ))}
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20 text-ink">
          <div className="mb-8">
            <Image src="/images/logo-calligraphy-transparent.png" alt="PartJava" width={921} height={601} className="w-[280px] md:w-[360px] h-auto mx-auto" />
            <p className="text-lg text-ink-light mt-2 font-light text-center">水墨素笺与 Docker 沙箱交互式学习平台</p>
          </div>

          {/* 灵宠全息展示 */}
          <div className="flex justify-center mb-10 relative bg-white/60 py-6 rounded-2xl border border-paper-300" style={{ height: 180 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 to-transparent rounded-2xl pointer-events-none" />
            <EyePet />
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: '创建账号', desc: '填写基础及扩展属性，即可开启专属云端沙箱容器' },
              { step: '02', title: '开始记录', desc: '在每个行星关卡下撰写学习笔记，渲染精美 LaTeX 公式' },
              { step: '03', title: '坚持打卡', desc: '基于 Redis Bitmaps 统计 365 天打卡，激活大地图 3D 星环' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-9 h-9 bg-white border border-paper-300 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black text-brand-primary shadow-sm">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-ink text-base">{item.title}</div>
                  <div className="text-xs text-ink-lighter mt-1">{item.desc}</div>
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

      {/* 右侧表单区 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 z-10 overflow-y-auto max-h-screen my-auto">
        <div className="w-full max-w-md bg-white shadow-frost-lg border border-paper-300 p-8 rounded-3xl my-6">

          {/* 移动端 Logo */}
          <div className="lg:hidden text-center mb-8">
            <Image src="/images/logo-calligraphy-transparent.png" alt="PartJava" width={921} height={601} className="w-[140px] h-auto mx-auto" />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-ink tracking-wide">创建账号 🚀</h2>
            <p className="mt-2 text-ink-light text-sm">
              已有账号？{' '}
              <Link href="/auth/login" className="text-brand-primary hover:text-brand-hover transition-colors font-medium">
                立即登录
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-state-dangerSoft border border-state-danger/30 rounded-xl flex items-center gap-2.5 text-state-danger text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 用户名 */}
            <div>
              <label className="block text-xs font-semibold text-ink-light uppercase tracking-wider mb-1.5">登录用户名 (只能是英文和数字的组合)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 106 0" />
                  </svg>
                </div>
                <input type="text" required value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="请设置您的登录用户名 (如: liming123)"
                  className="w-full pl-10 pr-4 py-2.5 bg-paper-50 border border-paper-300 focus:border-brand-primary/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-primary/20 text-ink placeholder-ink-lighter transition-all text-sm font-sans" />
              </div>
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-xs font-semibold text-ink-light uppercase tracking-wider mb-1.5">邮箱地址</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="email" autoComplete="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-paper-50 border border-paper-300 focus:border-brand-primary/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-primary/20 text-ink placeholder-ink-lighter transition-all text-sm" />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-xs font-semibold text-ink-light uppercase tracking-wider mb-1.5">密码 (至少6位)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input type={showPassword ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="至少 6 位字符"
                  className="w-full pl-10 pr-12 py-2.5 bg-paper-50 border border-paper-300 focus:border-brand-primary/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-primary/20 text-ink placeholder-ink-lighter transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-lighter/50 hover:text-ink transition-colors">
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
              <label className="block text-xs font-semibold text-ink-light uppercase tracking-wider mb-1.5">确认密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-ink-lighter/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-lighter/50 hover:text-ink transition-colors">
                  <EyeIcon show={showConfirm} />
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.password && (
                <p className="mt-1 text-xs text-rose-400">两次密码输入不一致</p>
              )}
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

          <div className="mt-8 text-center text-xs text-ink-lighter">
            注册即代表您已仔细阅读并同意{' '}
            <span className="text-brand-primary hover:text-brand-hover cursor-pointer transition-colors">服务协议</span>
            与
            <span className="text-[#6366f1] hover:text-[#818cf8] cursor-pointer transition-colors">隐私权政策</span>
          </div>
        </div>
      </div>
    </div>
  );
}
