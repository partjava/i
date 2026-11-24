'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Star, Box, Network, ArrowUpRight } from 'lucide-react';
import { ALGORITHM_REGISTRY } from './visualizer/registry';
import { navigationItems } from '../data/navigation';

const BINARY_STEPS = [
  { arr: [2, 5, 9, 14, 21], left: 0, mid: 2, right: 4, label: 'target = 14 · 比较 arr[2]=9' },
  { arr: [2, 5, 9, 14, 21], left: 3, mid: 3, right: 4, label: '收缩左界 · 命中 arr[3]=14 ✓' },
  { arr: [2, 5, 9, 14, 21], left: 0, mid: 1, right: 2, label: 'target = 5 · 命中 arr[1]=5 ✓' },
];

const CHALLENGE_STAGES = [
  { label: '01 基础', stageId: 1 },
  { label: '04 机器学习', stageId: 4 },
  { label: '08 大模型', stageId: 8 },
];

const GALAXY_DOMAINS = ['计算机', '人工智能', '软件工程', '网络安全'];

const ALGORITHM_COUNT = ALGORITHM_REGISTRY.length;
const LESSON_COUNT = Object.values(navigationItems)
  .flat()
  .reduce((acc, item) => acc + (item.subitems?.length || 1), 0);

export default function CoreEnginesShowcase({
  challengesCount = 215,
}: {
  challengesCount?: number;
} = {}) {
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % BINARY_STEPS.length);
    }, 2100);
    return () => clearInterval(timer);
  }, []);

  const currentBinary = BINARY_STEPS[stepIdx];

  return (
    <section ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-2.5">
      <style>{`
        @keyframes starRouteDash {
          to { stroke-dashoffset: -28; }
        }
        @keyframes pulseNode {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 0.95; transform: scale(1.15); }
        }
        .star-route-line {
          stroke-dasharray: 5 5;
          animation: starRouteDash 2.2s linear infinite;
        }
        .galaxy-star {
          animation: pulseNode 3.2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="flex items-baseline justify-between mb-2.5">
        <div className="flex items-baseline gap-3">
          <h2 className="text-base sm:text-lg font-display font-bold text-content-primary tracking-tight">
            三大核心学习模块
          </h2>
          <span className="hidden sm:inline text-xs text-content-muted">
            点击卡片或下方标签，直接进入对应学习模块
          </span>
        </div>
        <Link
          href="/study"
          className="text-xs font-medium text-brand-primary hover:underline inline-flex items-center gap-1"
        >
          <span>进入课程书院</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4">
        {/* 卡片 1：星图闯关（带流动星轨微动画 + 可点击直达阶段） */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push('/challenges')}
          onKeyDown={(e) => e.key === 'Enter' && router.push('/challenges')}
          className="group relative rounded-2xl bg-surface-raised border border-line-subtle p-3.5 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-[#1B3B6F]/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="font-code tabular-nums text-xl sm:text-2xl font-bold text-content-primary">
                  {inView ? <CountUp end={challengesCount} duration={1.8} /> : challengesCount}
                </span>
                <span className="text-xs text-content-muted ml-1">道精选题目</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-bold text-content-primary group-hover:text-brand-primary transition-colors">
                星图闯关训练
              </h3>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs text-content-secondary leading-snug mb-2.5">
              涵盖 11 个进阶阶段，支持在线编写提交代码、自动评测样例与 AI 思考题解析。
            </p>
          </div>

          {/* 动画星轨连线 + 阶段直达按钮 */}
          <div className="relative rounded-xl bg-surface-muted border border-line-subtle px-2.5 py-2 overflow-hidden">
            <svg className="w-full h-2.5 mb-1" viewBox="0 0 240 12" fill="none" aria-hidden="true">
              <line
                x1="18"
                y1="6"
                x2="222"
                y2="6"
                stroke="#D4AD72"
                strokeWidth="1.6"
                className="star-route-line"
              />
              <circle cx="24" cy="6" r="3" fill="#1B3B6F" />
              <circle cx="120" cy="6" r="3" fill="#D4AD72" />
              <circle cx="216" cy="6" r="3" fill="#1F7A5C" />
            </svg>
            <div className="flex items-center justify-between gap-1.5">
              {CHALLENGE_STAGES.map((st) => (
                <button
                  key={st.stageId}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/challenges?layer=tree&stage=${st.stageId}`);
                  }}
                  className="flex-1 px-2 py-1 rounded-md text-[11px] font-code text-content-secondary bg-surface-raised hover:bg-brand-soft hover:text-brand-primary border border-line-subtle transition-colors truncate"
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 卡片 2：代码实验室与 3D 算法（动态二分指针滑块演示 + 点击直达） */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push('/code/editor')}
          onKeyDown={(e) => e.key === 'Enter' && router.push('/code/editor')}
          className="group relative rounded-2xl bg-surface-raised border border-line-subtle p-3.5 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-[#1B3B6F]/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Box className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="font-code tabular-nums text-xl sm:text-2xl font-bold text-content-primary">
                  {inView ? <CountUp end={ALGORITHM_COUNT} duration={1.6} /> : ALGORITHM_COUNT}
                </span>
                <span className="text-xs text-content-muted ml-1">种算法演示</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-bold text-content-primary group-hover:text-brand-primary transition-colors">
                代码与 3D 算法演示
              </h3>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs text-content-secondary leading-snug mb-2.5">
              在线编写运行 C++、Java 与 Python，同步观察排序、搜索和机器学习三维过程演示。
            </p>
          </div>

          {/* 实时轮播的二分查找数组指针动画 */}
          <div className="rounded-xl bg-surface-muted border border-line-subtle px-2.5 py-2">
            <div className="grid grid-cols-5 gap-1.5 mb-1.5">
              {currentBinary.arr.map((num, idx) => {
                const isMid = idx === currentBinary.mid;
                const inRange = idx >= currentBinary.left && idx <= currentBinary.right;
                return (
                  <div
                    key={idx}
                    className={`relative rounded-md py-0.5 text-center font-code text-xs font-semibold transition-all duration-500 border ${
                      isMid
                        ? 'bg-[#0F1D33] text-[#D4AD72] border-[#D4AD72] scale-105 shadow-sm'
                        : inRange
                        ? 'bg-surface-raised text-content-primary border-line-strong'
                        : 'bg-surface-page text-content-muted border-transparent opacity-50'
                    }`}
                  >
                    {num}
                    {isMid && (
                      <span className="block text-[9px] leading-none mt-0.5 text-[#D4AD72]">
                        MID
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-code text-content-muted">
              <span className="truncate">{currentBinary.label}</span>
              <span className="text-brand-primary shrink-0 ml-2">点击运行 →</span>
            </div>
          </div>
        </div>

        {/* 卡片 3：全栈知识图谱与书院（深色墨砚强调卡 + 星光闪烁动效 + 学科直达） */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push('/knowledge-graph')}
          onKeyDown={(e) => e.key === 'Enter' && router.push('/knowledge-graph')}
          className="group relative rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden border border-[#D4AD72]/30"
          style={{ background: 'linear-gradient(155deg, #111927 0%, #0E1116 100%)', color: '#F2EDE4' }}
        >
          {/* 右上角微光星座动效 */}
          <svg className="pointer-events-none absolute -top-2 -right-2 w-28 h-28 opacity-40" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <line x1="25" y1="30" x2="72" y2="48" stroke="#D4AD72" strokeOpacity="0.35" strokeWidth="1" />
            <line x1="72" y1="48" x2="96" y2="24" stroke="#D4AD72" strokeOpacity="0.35" strokeWidth="1" />
            <line x1="72" y1="48" x2="88" y2="85" stroke="#8AB4F8" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="25" cy="30" r="2.2" fill="#D4AD72" className="galaxy-star" />
            <circle cx="72" cy="48" r="3" fill="#D4AD72" className="galaxy-star" style={{ animationDelay: '0.8s' }} />
            <circle cx="96" cy="24" r="2" fill="#F2EDE4" className="galaxy-star" style={{ animationDelay: '1.4s' }} />
            <circle cx="88" cy="85" r="2.2" fill="#8AB4F8" className="galaxy-star" style={{ animationDelay: '2.1s' }} />
          </svg>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#D4AD72]/15 text-[#D4AD72] border border-[#D4AD72]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Network className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="font-code tabular-nums text-xl sm:text-2xl font-bold text-[#D4AD72]">
                  {inView ? <CountUp end={LESSON_COUNT} duration={2.0} /> : LESSON_COUNT}
                </span>
                <span className="text-xs text-[#F2EDE4]/65 ml-1">课程章节</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-bold text-[#F2EDE4] group-hover:text-[#D4AD72] transition-colors">
                知识图谱与翻页课程
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#D4AD72]/70 group-hover:text-[#D4AD72] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs text-[#F2EDE4]/70 leading-snug mb-2.5">
              按学科梳理前后置学习路线，点击图谱任意节点直达翻书课程与配套笔记。
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-1.5 rounded-xl bg-white/[0.04] border border-white/10 p-1.5">
            {GALAXY_DOMAINS.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/knowledge-graph?domain=${encodeURIComponent(domain)}`);
                }}
                className="px-1.5 py-1 rounded-md text-[11px] font-medium text-[#D4AD72] hover:bg-[#D4AD72]/20 hover:text-[#F2EDE4] transition-colors truncate"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
