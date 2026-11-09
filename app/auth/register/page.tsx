'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Modal } from 'antd';
import EyePet from '@shared/components/EyePet';
import InkWashDecoration from '@shared/components/InkWashDecoration';
import {
  User,
  Smile,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Rocket,
  Code2,
  Award,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusField, setFocusField] = useState<'none' | 'account' | 'password' | 'confirm'>('none');
  const [regSuccess, setRegSuccess] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 实时校验辅助状态
  const cleanUsername = form.username.trim();
  const isUsernameValid = /^[a-zA-Z0-9_]{5,16}$/.test(cleanUsername);
  const cleanEmail = form.email.trim();
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  const hasLen = form.password.length >= 8 && form.password.length <= 20 && !/\s/.test(form.password);
  const hasLetter = /[A-Za-z]/.test(form.password);
  const hasDigit = /\d/.test(form.password);
  const hasSymbol = /[^A-Za-z0-9\s]/.test(form.password);
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,20}$/.test(form.password);
  const isConfirmMatch = Boolean(form.confirmPassword && form.confirmPassword === form.password);

  const passwordScore =
    (hasLen ? 1 : 0) +
    (hasLetter && hasDigit ? 1 : 0) +
    (form.password.length >= 12 ? 1 : 0) +
    (hasSymbol ? 1 : 0);

  const strengthMeta = [
    { label: '待完善', color: 'text-slate-400', bar: 'bg-slate-200' },
    { label: '弱', color: 'text-rose-500', bar: 'bg-rose-500' },
    { label: '中等', color: 'text-amber-500', bar: 'bg-amber-500' },
    { label: '强', color: 'text-indigo-600', bar: 'bg-indigo-500' },
    { label: '极高安全', color: 'text-emerald-600', bar: 'bg-emerald-500' },
  ][passwordScore];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanNickname = form.name.trim() || cleanUsername;

    if (!cleanUsername) {
      setError('登录账号不能为空');
      return;
    }
    if (!isUsernameValid) {
      setError('登录账号需为 5~16 位字母、数字或下划线');
      return;
    }
    if (!cleanEmail || !isEmailValid) {
      setError('请输入有效的邮箱地址');
      return;
    }
    if (!isPasswordValid) {
      setError('密码需为 8~20 位，且同时包含字母和数字');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: cleanUsername,
          nickname: cleanNickname,
          email: cleanEmail,
          password: form.password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== false) {
        setRegSuccess(true);
        router.push(
          `/auth/login?message=${encodeURIComponent('注册成功，请登录')}&username=${encodeURIComponent(cleanUsername)}`
        );
      } else {
        setError(data?.message || data?.error || '注册失败，请检查填写信息后重试');
      }
    } catch {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] relative overflow-hidden font-sans text-slate-800">
      {/* 柔和极光背景装饰 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-12%] right-[-8%] w-[520px] h-[520px] rounded-full bg-indigo-500/8 blur-[120px]" />
        <div className="absolute bottom-[-12%] left-[-8%] w-[520px] h-[520px] rounded-full bg-sky-400/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f050_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f050_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* 左侧：品牌展示与禾桔灵宠互动舞台 */}
      <div
        className="hidden lg:flex lg:w-[50%] relative overflow-hidden z-10 border-r border-slate-200/80"
        style={{
          background: 'radial-gradient(circle at 30% 25%, #f1f5f9 0%, #e8edf5 100%)',
        }}
      >
        {/* 水墨装饰 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 opacity-10 pointer-events-none">
          <InkWashDecoration variant="bamboo" height={700} />
        </div>
        <div className="absolute top-8 right-0 w-1/3 opacity-15 pointer-events-none">
          <InkWashDecoration variant="birds" height={200} />
        </div>

        <div className="relative z-10 flex flex-col justify-center w-full max-w-xl mx-auto px-12 xl:px-16 py-8">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-xs font-mono font-semibold mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>JOIN PARTJAVA DEVELOPER UNIVERSE</span>
            </div>
            <Image
              src="/images/logo-calligraphy-transparent.png"
              alt="PartJava"
              width={921}
              height={601}
              priority
              className="w-[230px] xl:w-[260px] h-auto mx-auto drop-shadow-sm"
            />
            <p className="text-sm xl:text-base text-slate-600 mt-1 font-normal">
              开启专属云端 Docker 沙箱与全栈进阶之旅
            </p>
          </div>

          {/* 禾桔黑猫互动舞台 */}
          <div className="relative flex flex-col items-center justify-center mb-5 bg-white/80 backdrop-blur-md pt-5 pb-3 px-6 rounded-3xl border border-white shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
            <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>禾桔隐私护航</span>
            </div>
            <div className="absolute top-3 right-4 text-[11px] text-indigo-500 font-medium">
              {focusField === 'password' || focusField === 'confirm'
                ? showPassword || showConfirm
                  ? '🫣 帮你核对密码'
                  : '🙈 捂眼防偷看中'
                : '🐾 陪伴注册中'}
            </div>
            <div className="mt-3">
              <EyePet
                focusField={focusField}
                showPassword={showPassword || showConfirm}
                hasError={!!error}
                isSuccess={regSuccess}
                inputLength={form.username.length + form.email.length}
              />
            </div>
          </div>

          {/* 三步进阶路径卡片 */}
          <div className="space-y-2.5">
            {[
              {
                step: '01',
                icon: <Rocket className="w-4 h-4 text-indigo-600" />,
                title: '初始化专属极客通行证',
                desc: '10 秒极速注册，立即分配独立云端学习档案与 Docker 编译沙箱配额',
              },
              {
                step: '02',
                icon: <Code2 className="w-4 h-4 text-sky-600" />,
                title: '沉浸式编程与 3D 算法推演',
                desc: '边学边练 31 种三维流形算法、JVM 栈帧回放与 Markdown/LaTeX 素笺笔记',
              },
              {
                step: '03',
                icon: <Award className="w-4 h-4 text-emerald-600" />,
                title: '点亮 365 天打卡热力星环',
                desc: '基于 Redis 位图记录每日成长轨迹，解锁全栈知识图谱与闯关勋章',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-sm border border-white/90 shadow-sm hover:shadow-md hover:bg-white transition-all flex items-center gap-3.5"
              >
                <div className="w-9 h-9 bg-indigo-50/80 border border-indigo-100 rounded-xl flex items-center justify-center shrink-0 text-xs font-black text-indigo-600">
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate">
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
          showPassword={showPassword || showConfirm}
          hasError={!!error}
          isSuccess={regSuccess}
        />
      </div>

      {/* 右侧：注册表单卡片区 */}
      <div className="w-full lg:w-[50%] flex items-center justify-center px-4 sm:px-6 py-8 z-10">
        <div className="w-full max-w-[480px] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 p-6 sm:p-8 rounded-3xl">
          {/* 移动端 Logo */}
          <div className="lg:hidden text-center mb-5">
            <Image
              src="/images/logo-calligraphy-transparent.png"
              alt="PartJava"
              width={921}
              height={601}
              className="w-[140px] h-auto mx-auto"
            />
          </div>

          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>免费开启云端实验室</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              创建极客账号
            </h2>
            <p className="mt-1 text-slate-500 text-sm">
              已有 PartJava 账号？{' '}
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:text-indigo-500 transition-colors font-semibold underline-offset-4 hover:underline"
              >
                直接登录 →
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-600 text-xs sm:text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 第一行：登录账号 + 用户昵称（桌面端双列并排，紧凑清爽） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* 登录账号 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  登录账号 <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={form.username}
                    onFocus={() => setFocusField('account')}
                    onBlur={() => setFocusField('none')}
                    onChange={(e) => {
                      setForm({ ...form, username: e.target.value });
                      if (error) setError('');
                    }}
                    placeholder="5~16位字母/数字/下划线"
                    className={`w-full pl-9 pr-8 py-2.5 bg-slate-50/80 focus:bg-white border rounded-xl focus:outline-none focus:ring-4 text-slate-900 placeholder-slate-400 transition-all text-xs sm:text-sm ${
                      form.username && !isUsernameValid
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                        : isUsernameValid
                        ? 'border-emerald-300 focus:border-indigo-500 focus:ring-indigo-500/10'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                    }`}
                  />
                  {isUsernameValid && (
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
                {form.username && !isUsernameValid && (
                  <p className="mt-1 text-[11px] text-rose-500">需 5~16 位字母、数字或 _</p>
                )}
              </div>

              {/* 用户昵称 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  显示昵称 <span className="font-normal text-slate-400">(选填，支持中文)</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                    <Smile className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={24}
                    value={form.name}
                    onFocus={() => setFocusField('account')}
                    onBlur={() => setFocusField('none')}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={cleanUsername ? `默认 "${cleanUsername}"` : '取个好听的昵称'}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-slate-900 placeholder-slate-400 transition-all text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 邮箱地址 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                电子邮箱 <span className="text-rose-500">*</span>{' '}
                <span className="font-normal text-slate-400">(支持直接作为登录账号及找回密码)</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onFocus={() => setFocusField('account')}
                  onBlur={() => setFocusField('none')}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="yourname@example.com"
                  className={`w-full pl-10 pr-9 py-2.5 bg-slate-50/80 focus:bg-white border rounded-xl focus:outline-none focus:ring-4 text-slate-900 placeholder-slate-400 transition-all text-sm ${
                    form.email && !isEmailValid
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : isEmailValid
                      ? 'border-emerald-300 focus:border-indigo-500 focus:ring-indigo-500/10'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                  }`}
                />
                {isEmailValid && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* 登录密码 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  设置登录密码 <span className="text-rose-500">*</span>
                </label>
                {form.password && (
                  <span className={`text-[11px] font-bold ${strengthMeta.color}`}>
                    安全强度：{strengthMeta.label}
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  maxLength={20}
                  value={form.password}
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField('none')}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="8~20位，需同时包含字母和数字"
                  className={`w-full pl-10 pr-11 py-2.5 bg-slate-50/80 focus:bg-white border rounded-xl focus:outline-none focus:ring-4 text-slate-900 placeholder-slate-400 transition-all text-sm ${
                    form.password && !isPasswordValid
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : isPasswordValid
                      ? 'border-emerald-300 focus:border-indigo-500 focus:ring-indigo-500/10'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                  }`}
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* 实时密码规则胶囊与强度进度条 */}
              <div className="mt-2 space-y-1.5">
                {form.password && (
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          passwordScore >= i ? strengthMeta.bar : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-md border transition-colors ${
                      hasLen
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {hasLen ? '✓' : '○'} 8~20 位长度
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md border transition-colors ${
                      hasLetter
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {hasLetter ? '✓' : '○'} 包含英文字母
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md border transition-colors ${
                      hasDigit
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {hasDigit ? '✓' : '○'} 包含数字
                  </span>
                </div>
              </div>
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                确认登录密码 <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onFocus={() => setFocusField('confirm')}
                  onBlur={() => setFocusField('none')}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    if (error) setError('');
                  }}
                  placeholder="请再次输入密码以确认无误"
                  className={`w-full pl-10 pr-11 py-2.5 bg-slate-50/80 focus:bg-white border rounded-xl focus:outline-none focus:ring-4 text-slate-900 placeholder-slate-400 transition-all text-sm ${
                    form.confirmPassword && !isConfirmMatch
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : isConfirmMatch
                      ? 'border-emerald-300 focus:border-indigo-500 focus:ring-indigo-500/10'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10'
                  }`}
                />
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && !isConfirmMatch && (
                <p className="mt-1 text-[11px] text-rose-500">两次输入的密码不一致</p>
              )}
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.45)] hover:shadow-[0_14px_30px_-5px_rgba(99,102,241,0.55)] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>正在初始化云端沙箱账号...</span>
                </>
              ) : (
                <>
                  <span>立即创建账号</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* 底部协议 */}
          <div className="mt-5 text-center text-xs text-slate-400">
            注册即代表您已阅读并同意{' '}
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="text-indigo-600 hover:text-indigo-500 font-medium hover:underline"
            >
              《服务协议》
            </button>{' '}
            与{' '}
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="text-indigo-600 hover:text-indigo-500 font-medium hover:underline"
            >
              《隐私权政策》
            </button>
          </div>
        </div>
      </div>

      {/* 协议与隐私弹窗 */}
      <Modal
        open={legalModal !== null}
        onCancel={() => setLegalModal(null)}
        onOk={() => setLegalModal(null)}
        okText="我已了解"
        cancelButtonProps={{ style: { display: 'none' } }}
        title={legalModal === 'terms' ? 'PartJava 平台服务协议' : 'PartJava 隐私权保护政策'}
      >
        {legalModal === 'terms' ? (
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed py-2">
            <p>1. <strong>服务范围</strong>：PartJava 提供在线交互式编程教程、Markdown/LaTeX 学习笔记、3D 算法流形推演及 Docker 隔离代码沙箱服务。</p>
            <p>2. <strong>沙箱安全规范</strong>：请勿在在线代码编辑器与判题终端内运行恶意网络扫描、挖矿程序或破坏容器隔离的指令，系统配有 cgroups 资源配额与审计保护。</p>
            <p>3. <strong>知识产权</strong>：用户在平台撰写的原创学习笔记归用户所有；平台内置课程、3D 可视化模型与题库仅供个人学习交流使用。</p>
          </div>
        ) : (
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed py-2">
            <p>1. <strong>信息收集最小化</strong>：我们仅收集您注册时主动填写的账号、昵称与邮箱，用于跨设备同步学习进度、打卡日历与云端笔记。</p>
            <p>2. <strong>凭证加密存储</strong>：您的个人密码经过高强度单向哈希加盐加密存储，平台任何人员与 AI 伴学模块均无法读取您的明文密码。</p>
            <p>3. <strong>数据自主权</strong>：您可随时在个人中心导出、编辑或删除您的学习笔记与历史对话记录。</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
