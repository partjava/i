'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { message } from 'antd';
import EyePet from '@shared/components/EyePet';
import BrandLogo from '@shared/components/BrandLogo';
import SiteFooter from '@shared/components/SiteFooter';
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
    <div className="min-h-[calc(100vh-70px)] flex flex-col justify-between bg-surface-page relative overflow-hidden font-sans text-content-primary transition-colors">
      <div className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="relative z-10 w-full max-w-[440px] bg-surface-raised shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-line-subtle p-7 sm:p-9 rounded-3xl">
        {/* 顶部禾桔灵宠守护 */}
        <div className="flex flex-col items-center mb-5">
          <BrandLogo
            variant="full"
            className="h-14 w-auto mb-3"
          />
          <div className="rounded-2xl bg-white/95 px-4 pt-3 pb-2 border border-line-subtle w-full flex justify-center">
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
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-content-primary tracking-tight">
            找回账号密码
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-content-secondary">
            输入您注册时绑定的电子邮箱，我们将为您发送密码重置指引
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-500 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {sentSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-content-primary">重置请求已提交</div>
            <p className="text-xs text-content-secondary leading-relaxed">
              若 <span className="font-mono font-semibold text-content-primary">{email}</span> 已在平台注册，您将收到一封包含安全重置链接的邮件，请注意查收收件箱或垃圾箱。
            </p>
            <button
              type="button"
              onClick={() => setSentSuccess(false)}
              className="text-xs font-semibold text-brand-primary hover:underline pt-1"
            >
              重新填写其他邮箱
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-content-secondary mb-2">
                注册邮箱地址
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-content-muted group-focus-within:text-brand-primary">
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
                  className="w-full pl-10 pr-4 py-3 bg-surface-muted focus:bg-surface-page border border-line-subtle focus:border-[#D4AD72] rounded-xl focus:outline-none text-content-primary placeholder:text-content-muted transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-content-inverse font-bold text-sm sm:text-base transition-all duration-300 disabled:opacity-60 bg-brand-primary hover:bg-brand-hover shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? '正在发送安全重置邮件...' : '发送密码重置链接'}</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-line-subtle flex items-center justify-between text-xs text-content-secondary">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-brand-primary hover:underline font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回账号登录</span>
          </Link>
          <span className="flex items-center gap-1 text-content-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SSL 加密传输</span>
          </span>
        </div>
      </div>
      </div>
      <SiteFooter className="relative z-10 !py-3" />
    </div>
  );
}
