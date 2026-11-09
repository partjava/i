'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { message } from 'antd';
import EyePet from '@shared/components/EyePet';
import {
  Mail,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('请输入有效的注册邮箱地址');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success !== false) {
        setSentSuccess(true);
        message.success(data?.message || '如果该邮箱存在，重置链接已发送到您的邮箱');
      } else {
        setError(data?.message || '发送重置邮件失败，请稍后重试');
      }
    } catch {
      setError('发送重置邮件失败，请检查网络后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden px-4 py-12 font-sans text-slate-800">
      {/* 柔和极光背景装饰 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[520px] h-[520px] rounded-full bg-indigo-500/8 blur-[120px]" />
        <div className="absolute bottom-[-12%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f050_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f050_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 p-7 sm:p-9 rounded-3xl">
        {/* 顶部禾桔灵宠守护 */}
        <div className="flex flex-col items-center mb-5">
          <Image
            src="/images/logo-calligraphy-transparent.png"
            alt="PartJava"
            width={921}
            height={601}
            className="w-[150px] h-auto mb-3"
          />
          <EyePet
            focusField={focused ? 'account' : 'none'}
            hasError={!!error}
            isSuccess={sentSuccess}
            inputLength={email.length}
            customBubble={
              sentSuccess
                ? '重置邮件已发出，快去邮箱看看喵 📬'
                : '别着急，输入注册邮箱我帮你找回密码喵 🔑'
            }
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            找回账号密码
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            输入您注册时绑定的电子邮箱，我们将为您发送密码重置指引
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-600 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {sentSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-emerald-900">重置请求已提交</div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              若 <span className="font-mono font-semibold">{email}</span> 已在平台注册，您将收到一封包含安全重置链接的邮件，请注意查收收件箱或垃圾箱。
            </p>
            <button
              type="button"
              onClick={() => setSentSuccess(false)}
              className="text-xs font-semibold text-indigo-600 hover:underline pt-1"
            >
              重新填写其他邮箱
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                注册邮箱地址
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="请输入您的注册邮箱 (如 example@qq.com)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-slate-900 placeholder-slate-400 transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm sm:text-base transition-all duration-300 disabled:opacity-60 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.45)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? '正在发送安全重置邮件...' : '发送密码重置链接'}</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回账号登录</span>
          </Link>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SSL 加密传输</span>
          </span>
        </div>
      </div>
    </div>
  );
}
