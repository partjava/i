'use client';

import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@shared/hooks/useAuth';
import { message, Modal } from 'antd';
import EyePet from '@shared/components/EyePet';
import BrandLogo from '@shared/components/BrandLogo';
import SiteFooter from '@shared/components/SiteFooter';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal,
  BookOpen,
  Calendar,
  Bot,
  AlertCircle,
} from 'lucide-react';

function LoginStatusChecker({ onPrefillUsername }: { onPrefillUsername: (u: string) => void }) {
  const searchParams = useSearchParams();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (searchParams.get('expired') === 'true') {
      message.info({ content: '会话已过期，请重新登录', key: 'session_expired' });
    }
    if (searchParams.get('error') === 'true') {
      message.error({ content: '退出登录时发生错误', key: 'session_error' });
    }
    const msg = searchParams.get('message');
    if (msg) {
      message.success({ content: decodeURIComponent(msg), key: 'session_msg' });
    }
    const prefill = searchParams.get('username');
    if (prefill) {
      onPrefillUsername(decodeURIComponent(prefill));
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('user_data');
      if (
        searchParams.get('expired') ||
        searchParams.get('error') ||
        searchParams.get('message') ||
        searchParams.get('username')
      ) {
        const url = new URL(window.location.href);
        url.searchParams.delete('expired');
        url.searchParams.delete('error');
        url.searchParams.delete('message');
        url.searchParams.delete('username');
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      }
    }
  }, [searchParams, onPrefillUsername]);
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState<'none' | 'account' | 'password'>('none');
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const [form, setForm] = useState({ email: '', password: '', remember: true });

  const handlePrefillUsername = useCallback((u: string) => {
    setForm((prev) => (prev.email ? prev : { ...prev, email: u }));
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) router.push('/');
  }, [session, status, router]);

  const executeLogin = async (account: string, password: string) => {
    if (!account || !password) {
      setError('请填写用户名/邮箱和密码');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await signIn(account, password);
      if (result?.error) {
        setError(result.error || '用户名、邮箱或密码错误，请重试');
      } else if (result?.success) {
        setLoginSuccess(true);
        message.success({ content: '欢迎回来！登录成功', key: 'login_ok' });
        await new Promise((r) => setTimeout(r, 320));
        const params = new URLSearchParams(window.location.search);
        const redirectTarget = params.get('callbackUrl') || params.get('redirect') || '/';
        window.location.href = redirectTarget.startsWith('/') ? redirectTarget : '/';
      }
    } catch {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeLogin(form.email.trim(), form.password);
  };

  const handleQuickDemoLogin = async () => {
    setError('');
    await executeLogin('example@qq.com', '123456');
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (typeof e.getModifierState === 'function') {
      setCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col bg-surface-page relative overflow-hidden font-sans text-content-primary transition-colors">
      <Suspense fallback={null}>
        <LoginStatusChecker onPrefillUsername={handlePrefillUsername} />
      </Suspense>

      <div className="flex-1 flex">
      {/* 左侧：品牌美学与禾桔灵宠互动舞台 */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden z-10 bg-surface-muted border-r border-line-subtle">
        <div className="relative z-10 flex flex-col justify-center w-full max-w-xl mx-auto px-12 xl:px-16 py-10">
          {/* 顶部品牌区 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-line-subtle text-brand-primary text-xs font-mono font-semibold mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AD72]" />
              <span>UNOLGY · 禾硙交互式代码实训平台</span>
            </div>
            <div className="flex justify-center">
              <BrandLogo
                variant="full"
                priority
                className="h-16 xl:h-20 w-auto drop-shadow-sm"
              />
            </div>
            <p className="text-sm xl:text-base text-content-secondary mt-1.5 font-normal">
              禾硙 Unolgy · 交互式编程课程、算法推演与云端沙箱
            </p>
          </div>

          {/* 禾桔黑猫互动舞台 */}
          <div className="relative flex flex-col items-center justify-center mb-6 bg-white/95 pt-5 pb-3 px-6 rounded-3xl border border-line-subtle shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
            <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>禾桔安全守卫中</span>
            </div>
            <div className="absolute top-3 right-4 text-[11px] text-[#1B3B6F] font-medium">
              {focusField === 'password'
                ? showPassword
                  ? '🫣 悄悄检查密码'
                  : '🙈 闭眼保护隐私'
                : '👀 眼神实时跟随'}
            </div>
            <div className="mt-3">
              <EyePet
                focusField={focusField}
                showPassword={showPassword}
                hasError={!!error}
                isSuccess={loginSuccess}
                inputLength={form.email.length}
              />
            </div>
          </div>

          {/* 2x2 核心能力 Bento 矩阵 */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <BookOpen className="w-4 h-4 text-brand-primary" />,
                bg: 'bg-brand-soft border-line-subtle',
                title: '素笺知识笔记',
                desc: '支持 Markdown 与 LaTeX 数学公式推演',
              },
              {
                icon: <Calendar className="w-4 h-4 text-emerald-500" />,
                bg: 'bg-brand-soft border-line-subtle',
                title: '成长日历打卡',
                desc: 'Redis 位图驱动 365 天成长热力图',
              },
              {
                icon: <Terminal className="w-4 h-4 text-brand-primary" />,
                bg: 'bg-brand-soft border-line-subtle',
                title: 'Docker 容器判题',
                desc: '毫秒级隔离沙箱 + 37 种 3D 算法流形',
              },
              {
                icon: <Bot className="w-4 h-4 text-[#D4AD72]" />,
                bg: 'bg-brand-soft border-line-subtle',
                title: '禾桔 AI 伴学导师',
                desc: '报错堆栈自动溯源与一键 Diff 补丁',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-surface-raised border border-line-subtle shadow-sm hover:shadow-md transition-all flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-xl border ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-content-primary text-xs sm:text-sm truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-content-muted mt-0.5 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 手机端右上角灵宠挂件 */}
      <div className="lg:hidden fixed top-14 right-2 z-50">
        <EyePet
          compact
          focusField={focusField}
          showPassword={showPassword}
          hasError={!!error}
          isSuccess={loginSuccess}
        />
      </div>

      {/* 右侧：登录表单卡片区 */}
      <div className="w-full lg:w-[48%] flex items-center justify-center px-4 sm:px-6 py-10 z-10">
        <div className="w-full max-w-[440px] bg-surface-raised shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-line-subtle p-7 sm:p-9 rounded-3xl">
          {/* 移动端 Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <BrandLogo
              variant="full"
              className="h-14 w-auto"
            />
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft text-brand-primary text-xs font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>欢迎回到极客空间</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight">
              账号登录
            </h2>
            <p className="mt-1.5 text-content-secondary text-sm">
              还没有 禾硙 账号？{' '}
              <Link
                href="/auth/register"
                className="text-brand-primary hover:underline transition-colors font-semibold underline-offset-4"
              >
                立即免费注册 →
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-500 text-xs sm:text-sm font-medium animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 用户名或邮箱 */}
            <div>
              <label className="block text-xs font-bold text-content-secondary tracking-wide mb-2">
                用户名或注册邮箱
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-muted group-focus-within:text-brand-primary transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoComplete="username"
                  required
                  value={form.email}
                  onFocus={() => setFocusField('account')}
                  onBlur={() => setFocusField('none')}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="请输入用户名（如 example@qq.com）"
                  className="w-full pl-10 pr-4 py-3 bg-surface-muted focus:bg-surface-page border border-line-subtle focus:border-[#D4AD72] rounded-xl focus:outline-none text-content-primary placeholder:text-content-muted transition-all text-sm"
                />
              </div>
            </div>

            {/* 登录密码 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-content-secondary tracking-wide">
                  个人登录密码
                </label>
                {capsLockOn && (
                  <span className="text-[11px] font-medium text-amber-600 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span>⇪ 大写锁定已开启</span>
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-muted group-focus-within:text-brand-primary transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField('none')}
                  onKeyUp={handleKeyEvent}
                  onKeyDown={handleKeyEvent}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="请输入您的登录密码"
                  className="w-full pl-10 pr-11 py-3 bg-surface-muted focus:bg-surface-page border border-line-subtle focus:border-[#D4AD72] rounded-xl focus:outline-none text-content-primary placeholder:text-content-muted transition-all text-sm"
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-content-muted hover:text-brand-primary transition-colors"
                  title={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 记住登录 & 忘记密码 */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-line-strong text-brand-primary focus:ring-0 cursor-pointer"
                />
                <span className="text-content-secondary group-hover:text-content-primary transition-colors">
                  保持登录状态
                </span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-brand-primary hover:underline font-medium transition-colors"
              >
                忘记密码？
              </Link>
            </div>

            {/* 主登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 px-4 rounded-xl text-content-inverse font-bold text-sm sm:text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-brand-primary hover:bg-brand-hover shadow-sm active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>正在安全校验凭证...</span>
                </>
              ) : (
                <>
                  <span>立即登录</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* 体验账号快捷区 */}
            <div className="pt-4 border-t border-line-subtle">
              <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-surface-muted border border-line-subtle">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-content-primary flex items-center gap-1.5">
                    <span>🎯 访客极速体验通道</span>
                  </div>
                  <div className="text-[11px] text-content-muted truncate mt-0.5">
                    免注册体验完整云沙箱、知识图谱与 AI 伴学
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setForm({ ...form, email: 'example@qq.com', password: '123456' });
                      setError('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-content-secondary hover:text-content-primary bg-surface-raised border border-line-subtle hover:border-line-strong transition shadow-sm"
                  >
                    填入账号
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleQuickDemoLogin}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-brand-primary bg-brand-soft hover:bg-surface-muted border border-line-strong transition shadow-sm flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>一键体验</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* 底部协议说明 */}
          <div className="mt-6 text-center text-xs text-content-muted">
            登录即代表您已阅读并同意{' '}
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="text-brand-primary font-medium hover:underline"
            >
              《服务协议》
            </button>{' '}
            与{' '}
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="text-brand-primary font-medium hover:underline"
            >
              《隐私权政策》
            </button>
          </div>
        </div>
      </div>
      </div>

      <SiteFooter className="relative z-10 !py-3 border-t border-line-subtle bg-surface-page" />

      {/* 协议与隐私弹窗 */}
      <Modal
        open={legalModal !== null}
        onCancel={() => setLegalModal(null)}
        onOk={() => setLegalModal(null)}
        okText="我已了解"
        cancelButtonProps={{ style: { display: 'none' } }}
        title={legalModal === 'terms' ? '禾硙 Unolgy 平台服务协议' : '禾硙 Unolgy 隐私权保护政策'}
      >
        {legalModal === 'terms' ? (
          <div className="space-y-2.5 text-xs sm:text-sm text-content-secondary leading-relaxed py-2">
            <p>1. <strong>服务范围</strong>：禾硙 Unolgy 提供在线交互式编程教程、Markdown/LaTeX 学习笔记、3D 算法流形推演及 Docker 隔离代码沙箱服务。</p>
            <p>2. <strong>沙箱安全规范</strong>：请勿在在线代码编辑器与判题终端内运行恶意网络扫描、挖矿程序或破坏容器隔离的指令，系统配有 cgroups 资源配额与审计保护。</p>
            <p>3. <strong>知识产权</strong>：用户在平台撰写的原创学习笔记归用户所有；平台内置课程、3D 可视化模型与题库仅供个人学习交流使用。</p>
          </div>
        ) : (
          <div className="space-y-2.5 text-xs sm:text-sm text-content-secondary leading-relaxed py-2">
            <p>1. <strong>信息收集最小化</strong>：我们仅收集您注册时主动填写的账号、昵称与邮箱，用于跨设备同步学习进度、打卡日历与云端笔记。</p>
            <p>2. <strong>凭证加密存储</strong>：您的个人密码经过高强度单向哈希加盐加密存储，平台任何人员与 AI 伴学模块均无法读取您的明文密码。</p>
            <p>3. <strong>数据自主权</strong>：您可随时在个人中心导出、编辑或删除您的学习笔记与历史对话记录。</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
