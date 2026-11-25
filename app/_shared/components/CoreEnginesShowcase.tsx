'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Star, Box, Network, ArrowUpRight } from 'lucide-react';
import { ALGORITHM_REGISTRY } from './visualizer/registry';
import { navigationItems } from '../data/navigation';
import type { SanctuaryFocusTarget } from './sanctuary/SanctuaryHero';

const SAMPLE_ARRAY = [2, 5, 9, 14, 21];
const AUTO_TARGETS = [14, 5, 21];

interface BinaryStep {
  arr: number[];
  target: number;
  left: number;
  mid: number;
  right: number;
  found: boolean;
  label: string;
}

function computeBinarySearchSteps(targetVal: number): BinaryStep[] {
  const steps: BinaryStep[] = [];
  let l = 0;
  let r = SAMPLE_ARRAY.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const val = SAMPLE_ARRAY[mid];
    if (val === targetVal) {
      steps.push({
        arr: SAMPLE_ARRAY,
        target: targetVal,
        left: l,
        mid,
        right: r,
        found: true,
        label: `target=${targetVal} · 命中 arr[${mid}]=${val} ✓`,
      });
      break;
    }
    const hint = val < targetVal ? '右移 L=MID+1' : '左移 R=MID-1';
    steps.push({
      arr: SAMPLE_ARRAY,
      target: targetVal,
      left: l,
      mid,
      right: r,
      found: false,
      label: `target=${targetVal} · arr[${mid}]=${val} → ${hint}`,
    });
    if (val < targetVal) l = mid + 1;
    else r = mid - 1;
  }
  return steps;
}

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
  onHoverEngine,
}: {
  challengesCount?: number;
  onHoverEngine?: (target: SanctuaryFocusTarget) => void;
} = {}) {
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const activeTarget = selectedTarget ?? AUTO_TARGETS[autoIdx % AUTO_TARGETS.length];
  const steps = useMemo(() => computeBinarySearchSteps(activeTarget), [activeTarget]);

  // 自动轮播演示（未手动点击目标值时）；一旦用户点击某数字则专注收敛到该目标
  useEffect(() => {
    if (selectedTarget !== null) {
      if (stepIdx >= steps.length - 1) return;
      const timer = setTimeout(() => {
        setStepIdx((prev) => Math.min(prev + 1, steps.length - 1));
      }, 720);
      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev + 1 < steps.length) return prev + 1;
        setAutoIdx((idx) => (idx + 1) % AUTO_TARGETS.length);
        return 0;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [selectedTarget, stepIdx, steps.length]);

  const currentBinary = steps[Math.min(stepIdx, steps.length - 1)] || steps[0];

  const handleSelectTarget = (num: number) => {
    setSelectedTarget(num);
    setStepIdx(0);
  };

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
            点击卡片直达对应模块 · 卡片二可点击数组元素演示二分查找
          </span>
        </div>
        <Link
          href="/study"
          className="text-xs font-medium text-brand-primary hover:underline inline-flex items-center gap-1 transition-transform active:scale-[0.97]"
        >
          <span>进入课程书院</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4">
        {/* 卡片 1：星图闯关 */}
        <article
          onMouseEnter={() => onHoverEngine?.('lamp')}
          onMouseLeave={() => onHoverEngine?.(null)}
          onClick={() => router.push('/challenges')}
          className="group relative rounded-2xl bg-surface-raised border border-line-subtle p-3.5 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-[#1B3B6F]/30 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
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
                <Link href="/challenges" onClick={(e) => e.stopPropagation()} className="focus:outline-none">
                  星图闯关训练
                </Link>
              </h3>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
            <p className="text-xs text-content-secondary leading-snug mb-2.5">
              涵盖 11 个进阶阶段，支持在线编写提交代码、自动评测样例与 AI 思考题解析。
            </p>
          </div>

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
                  className="flex-1 px-2 py-1 rounded-md text-[11px] font-code text-content-secondary bg-surface-raised hover:bg-brand-soft hover:text-brand-primary border border-line-subtle transition-[transform,color,background-color] duration-150 active:scale-[0.96] truncate"
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </article>

        {/* 卡片 2：代码与 3D 算法演示（可点击任一数组元素实时演示 L/MID/R 二分收敛） */}
        <article
          onMouseEnter={() => onHoverEngine?.('monitor')}
          onMouseLeave={() => onHoverEngine?.(null)}
          onClick={() => router.push('/code/editor?tab=visualizer&algo=binary')}
          className="group relative rounded-2xl bg-surface-raised border border-line-subtle p-3.5 sm:p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-[#1B3B6F]/30 active:scale-[0.99] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
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
                <Link
                  href="/code/editor?tab=visualizer&algo=binary"
                  onClick={(e) => e.stopPropagation()}
                  className="focus:outline-none"
                >
                  代码与 3D 算法演示
                </Link>
              </h3>
              <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
            <p className="text-xs text-content-secondary leading-snug mb-2.5">
              在线编写运行 C++、Java 与 Python，同步观察排序、搜索和机器学习三维过程演示。
            </p>
          </div>

          {/* 真可交互二分查找微实验室 */}
          <div className="rounded-xl bg-surface-muted border border-line-subtle px-2.5 py-2">
            <div className="grid grid-cols-5 gap-1.5 mb-1.5" role="group" aria-label="点击选择二分查找目标值">
              {currentBinary.arr.map((num, idx) => {
                const isMid = idx === currentBinary.mid;
                const inRange = idx >= currentBinary.left && idx <= currentBinary.right;
                const isChosenTarget = selectedTarget === num;
                return (
                  <button
                    key={num}
                    type="button"
                    data-binary-cell={num}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTarget(num);
                    }}
                    title={`点击以 ${num} 作为二分查找 target`}
                    className={`relative rounded-md py-0.5 text-center font-code text-xs font-semibold transition-[transform,background-color,color,border-color,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 border cursor-pointer ${
                      isMid
                        ? currentBinary.found
                          ? 'bg-[#0F1D33] text-[#D4AD72] border-[#D4AD72] scale-105 shadow-sm'
                          : 'bg-[#1B3B6F] text-white border-[#1B3B6F] scale-105 shadow-sm'
                        : inRange
                        ? 'bg-surface-raised text-content-primary border-line-strong hover:border-brand-primary/50'
                        : 'bg-surface-page text-content-muted border-transparent opacity-45 hover:opacity-85'
                    } ${isChosenTarget && !isMid ? 'ring-1 ring-[#D4AD72]/70' : ''}`}
                  >
                    {num}
                    <span
                      className={`block text-[9px] leading-none mt-0.5 ${
                        isMid ? 'text-[#D4AD72]' : 'text-content-muted'
                      }`}
                    >
                      {isMid
                        ? currentBinary.found
                          ? 'HIT'
                          : 'MID'
                        : idx === currentBinary.left
                        ? 'L'
                        : idx === currentBinary.right
                        ? 'R'
                        : '·'}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-code text-content-muted">
              <span data-binary-status className="truncate">
                {currentBinary.label}
              </span>
              <span className="text-brand-primary shrink-0 ml-2 font-medium">3D 推演 →</span>
            </div>
          </div>
        </article>

        {/* 卡片 3：全栈知识图谱与书院（保留墨砚暗卡高对比视觉节奏） */}
        <article
          onMouseEnter={() => onHoverEngine?.('book')}
          onMouseLeave={() => onHoverEngine?.(null)}
          onClick={() => router.push('/knowledge-graph')}
          className="group relative rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex flex-col justify-between overflow-hidden border border-[#D4AD72]/30"
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
              <div className="w-8 h-8 rounded-xl bg-[#D4AD72]/15 text-[#D4AD72] border border-[#D4AD72]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
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
                <Link href="/knowledge-graph" onClick={(e) => e.stopPropagation()} className="focus:outline-none">
                  知识图谱与翻页课程
                </Link>
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#D4AD72]/70 group-hover:text-[#D4AD72] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
                className="px-1.5 py-1 rounded-md text-[11px] font-medium text-[#D4AD72] hover:bg-[#D4AD72]/20 hover:text-[#F2EDE4] transition-[transform,background-color,color] duration-150 active:scale-[0.96] truncate"
              >
                {domain}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
